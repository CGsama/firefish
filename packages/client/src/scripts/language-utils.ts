import { supportedLangs } from "@/scripts/langmap"

export function isSupportedLang(langCode: string | null) {
	if (!langCode) return false;
	return supportedLangs[langCode] ?? false;
}

/**
 * Compare two language codes to determine whether they are decisively different
 * @returns false if they are close enough
 */
export function isSameLanguage(langCode1: string | null, langCode2: string | null) {
	return (
		languageContains(langCode1, langCode2) ||
		languageContains(langCode2, langCode1)
	);
}

/**
 * Returns true if langCode1 contains langCode2
 */
export function languageContains(langCode1: string | null, langCode2: string | null) {
	if (!langCode1 || !langCode2) return false;

	return parentLanguage(langCode2) === langCode1;
}

export function parentLanguage(langCode: string | null) {
	if (!langCode) return null;
	if (["zh-hant", "zh-hans", "yue", "nan"].includes(langCode)) {
		return "zh";
	}
	if (["nb", "nn"].includes(langCode)) {
		return "no";
	}
	return langCode;
}
