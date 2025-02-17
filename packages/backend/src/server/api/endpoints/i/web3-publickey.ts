import define from "@/server/api/define.js";
import { Users, UserProfiles } from "@/models/index.js";
import { publishToMainStream, verifyPassword } from "backend-rs"; 
import { ApiError } from "@/server/api/error.js";

export const meta = {
	requireCredential: true,

	secure: true,

	errors: {
		incorrectPassword: {
			message: "Incorrect password.",
			code: "INCORRECT_PASSWORD",
			id: "e54c1d7e-e7d6-4103-86b6-0a95069b4ad3",
		},

		pubKeyErr: {
			message: "Not Valid Publickey",
			code: "NOT_VALID_PUBLICKEY",
			id: "500d81e3-5f62-48c6-99d3-c8c9d9d0a154",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		password: { type: "string" },
		value: { type: "string" },
	},
	required: ["password", "value"],
} as const;

export default define(meta, paramDef, async (ps, user) => {
	const profile = await UserProfiles.findOneByOrFail({ userId: user.id });

	// Compare password
	const same = await verifyPassword(ps.password, profile.password!);

	if (!same) {
		throw new ApiError(meta.errors.incorrectPassword);
	}

	if (!ps.value || ps.value + "" !== ps.value) {
		throw new ApiError(meta.errors.pubKeyErr);
	}

	await UserProfiles.update(user.id, {
		web3Publickey: ps.value,
	});

	const iObj = await Users.pack(user.id, user, {
		detail: true,
		includeSecrets: true,
	});

	publishToMainStream(user.id, "meUpdated", iObj);
});
