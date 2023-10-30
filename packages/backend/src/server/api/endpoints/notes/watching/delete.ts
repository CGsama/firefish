import unwatch from "@/services/note/unwatch.js";
import define from "@/server/api/define.js";
import { getNote } from "@/server/api/common/getters.js";
import { ApiError } from "@/server/api/error.js";

export const meta = {
	tags: ["notes"],

	requireCredential: true,

	kind: "write:account",

	errors: {
		noSuchNote: {
			message: "No such note.",
			code: "NO_SUCH_NOTE",
			id: "09b3695c-f72c-4731-a428-7cff825fc82e",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		noteId: { type: "string", format: "misskey:id" },
	},
	required: ["noteId"],
} as const;

export default define(meta, paramDef, async (ps, user) => {
	const note = await getNote(ps.noteId, user).catch((err) => {
		if (err.id === "9725d0ce-ba28-4dde-95a7-2cbb2c15de24")
			throw new ApiError(meta.errors.noSuchNote);
		throw err;
	});

	await unwatch(user.id, note);
});
