import fetch from "node-fetch";
import { Converter } from "opencc-js";
import { getAgentByUrl } from "@/misc/fetch.js";
import { fetchMeta } from "backend-rs";
import type { PostLanguage } from "@/misc/langmap";
import * as deepl from "deepl-node";

// DeepL translate and LibreTranslate don't provide
// zh-Hant-TW translations, so we convert zh-Hans-CN
// translations into zh-Hant-TW using opencc-js.
function convertChinese(convert: boolean, src: string) {
	if (!convert) return src;
	const converter = Converter({ from: "cn", to: "twp" });
	return converter(src);
}

function stem(lang: PostLanguage): string {
	let toReturn = lang as string;
	if (toReturn.includes("-")) toReturn = toReturn.split("-")[0];
	if (toReturn.includes("_")) toReturn = toReturn.split("_")[0];
	return toReturn;
}

export async function translate(
	text: string,
	from: PostLanguage | null,
	to: PostLanguage,
) {
	const instance = await fetchMeta();

	if (instance.deeplAuthKey == null && instance.libreTranslateApiUrl == null) {
		throw Error("No translator is set up on this server.");
	}

	const source = from == null ? null : stem(from);
	const target = stem(to);

	if (instance.libreTranslateApiUrl != null) {
		const jsonBody = {
			q: text,
			source: source ?? "auto",
			target,
			format: "text",
			api_key: instance.libreTranslateApiKey ?? "",
		};

		const url = new URL(instance.libreTranslateApiUrl);
		if (url.pathname.endsWith("/")) {
			url.pathname = url.pathname.slice(0, -1);
		}
		if (!url.pathname.endsWith("/translate")) {
			url.pathname += "/translate";
		}
		const res = await fetch(url.toString(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(jsonBody),
			agent: getAgentByUrl,
		});

		const json = (await res.json()) as {
			detectedLanguage?: {
				confidence: number;
				language: string;
			};
			translatedText: string;
		};

		return {
			sourceLang: source ?? json.detectedLanguage?.language,
			text: convertChinese(
				["zh-hant", "zh-TW"].includes(to),
				json.translatedText,
			),
		};
	}

	const deeplTranslator = new deepl.Translator(instance.deeplAuthKey ?? "");
	const result = await deeplTranslator.translateText(
		text,
		source as deepl.SourceLanguageCode | null,
		// DeepL API requires us to specify "en-US" or "en-GB" for English
		// translations ("en" does not work), so we need to address it
		(target === "en" ? to : target) as deepl.TargetLanguageCode,
	);

	return {
		sourceLang: source ?? result.detectedSourceLang,
		text: convertChinese(["zh-hant", "zh-TW"].includes(to), result.text),
	};
}
