import { watchNote } from "backend-rs";
import define from "@/server/api/define.js";
import { getNote } from "@/server/api/common/getters.js";
import { ApiError } from "@/server/api/error.js";
import { setLocalInteraction } from "@/misc/set-local-interaction.js";

export const meta = {
	tags: ["notes"],

	requireCredential: true,

	kind: "write:account",

	errors: {
		noSuchNote: {
			message: "No such note.",
			code: "NO_SUCH_NOTE",
			id: "ea0e37a6-90a3-4f58-ba6b-c328ca206fc7",
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

	await watchNote(user.id, note.userId, note.id);
	setLocalInteraction(note.id);
});
