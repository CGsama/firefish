import { genId } from "@/misc/gen-id.js";
import type { User } from "@/models/entities/user.js";
import { ModerationLogs } from "@/models/index.js";

export async function insertModerationLog(
	moderator: { id: User["id"] },
	type: string,
	info?: Record<string, any>,
) {
	await ModerationLogs.insert({
		id: genId(),
		createdAt: new Date(),
		userId: moderator.id,
		type: type,
		info: info || {},
	});
}
