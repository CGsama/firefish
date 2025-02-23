import { Event, publishToMainStream } from "backend-rs";
import define from "@/server/api/define.js";
import { MessagingMessages, UserGroupJoinings } from "@/models/index.js";

export const meta = {
	tags: ["account", "messaging"],

	requireCredential: true,

	kind: "write:account",
} as const;

export const paramDef = {
	type: "object",
	properties: {},
	required: [],
} as const;

export default define(meta, paramDef, async (_ps, user) => {
	// Update documents
	await MessagingMessages.update(
		{
			recipientId: user.id,
			isRead: false,
		},
		{
			isRead: true,
		},
	);

	const joinings = await UserGroupJoinings.findBy({ userId: user.id });

	await Promise.all(
		joinings.map((j) =>
			MessagingMessages.createQueryBuilder()
				.update()
				.set({
					reads: (() => `array_append("reads", '${user.id}')`) as any,
				})
				.where("groupId = :groupId", { groupId: j.userGroupId })
				.andWhere("userId != :userId", { userId: user.id })
				.andWhere("NOT (:userId = ANY(reads))", { userId: user.id })
				.execute(),
		),
	);

	publishToMainStream(user.id, Event.ReadAllChats, {});
});
