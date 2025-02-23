import define from "@/server/api/define.js";
import Resolver from "@/remote/activitypub/resolver.js";
import { HOUR } from "@/const.js";

export const meta = {
	tags: ["federation"],

	requireCredential: true,
	requireAdmin: true,

	limit: {
		duration: HOUR,
		max: 30,
	},

	errors: {},

	res: {
		type: "object",
		optional: false,
		nullable: false,
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		uri: { type: "string" },
	},
	required: ["uri"],
} as const;

export default define(meta, paramDef, async (ps) => {
	const resolver = new Resolver();
	const object = await resolver.resolve(ps.uri);
	return object;
});
