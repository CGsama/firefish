import { genId } from "@/misc/gen-id.js";
import { NoteThreadMutings, Notes } from "@/models/index.js";
import { getNote } from "@/server/api/common/getters.js";
import define from "@/server/api/define.js";
import { ApiError } from "@/server/api/error.js";
import readNote from "@/services/note/read.js";

export const meta = {
	tags: ["notes"],

	requireCredential: true,

	kind: "write:account",

	errors: {
		noSuchNote: {
			message: "No such note.",
			code: "NO_SUCH_NOTE",
			id: "5ff67ada-ed3b-2e71-8e87-a1a421e177d2",
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

	const mutedNotes = await Notes.find({
		where: [
			{
				id: note.threadId || note.id,
			},
			{
				threadId: note.threadId || note.id,
			},
		],
	});

	await readNote(user.id, mutedNotes);

	await NoteThreadMutings.insert({
		id: genId(),
		createdAt: new Date(),
		threadId: note.threadId || note.id,
		userId: user.id,
	});
});
