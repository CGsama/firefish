import { config } from "@/config.js";
import type { User } from "@/models/entities/user.js";

export default (user: { id: User["id"] }, target: any, object: any) => ({
	type: "Remove",
	actor: `${config.url}/users/${user.id}`,
	target,
	object,
});
