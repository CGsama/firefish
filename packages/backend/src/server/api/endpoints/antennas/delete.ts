import define from "@/server/api/define.js";
import { ApiError } from "@/server/api/error.js";
import { Antennas } from "@/models/index.js";
import {
	InternalEvent,
	publishToInternalStream,
	updateAntennaCache,
} from "backend-rs";

export const meta = {
	tags: ["antennas"],

	requireCredential: true,

	kind: "write:account",

	errors: {
		noSuchAntenna: {
			message: "No such antenna.",
			code: "NO_SUCH_ANTENNA",
			id: "b34dcf9d-348f-44bb-99d0-6c9314cfe2df",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		antennaId: { type: "string", format: "misskey:id" },
	},
	required: ["antennaId"],
} as const;

export default define(meta, paramDef, async (ps, user) => {
	const antenna = await Antennas.findOneBy({
		id: ps.antennaId,
		userId: user.id,
	});

	if (antenna == null) {
		throw new ApiError(meta.errors.noSuchAntenna);
	}

	await Antennas.delete(antenna.id);

	await publishToInternalStream(InternalEvent.AntennaDeleted, antenna);
	await updateAntennaCache();
});
