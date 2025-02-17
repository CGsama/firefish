import { Notes, DriveFiles } from "@/models/index.js";

export async function setLocalInteraction(noteid: string) {
	const note = await Notes.findOneBy({ id: noteid });

	if (note.isInteractedByLocalUser) {
		return;
	}

	await Notes.update(noteid, { isInteractedByLocalUser: true });

	for (const fileid of note.fileIds) {
		await DriveFiles.update(fileid, { isInteractedByLocalUser: true });
	}

	if (note.replyId != null) {
		setLocalInteraction(note.replyId);
	}

	if (note.renoteId != null) {
		setLocalInteraction(note.replyId);
	}
}
