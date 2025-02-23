export type FirefishVisibility =
	| "public"
	| "home"
	| "followers"
	| "specified"
	| "hidden";
export type MastodonVisibility = "public" | "unlisted" | "private" | "direct";

export class VisibilityConverter {
	public static encode(v: FirefishVisibility): MastodonVisibility {
		switch (v) {
			case "public":
				return v;
			case "home":
				return "unlisted";
			case "followers":
				return "private";
			case "specified":
				return "direct";
			case "hidden":
				throw new Error();
		}
	}

	public static decode(v: MastodonVisibility): FirefishVisibility {
		switch (v) {
			case "public":
				return v;
			case "unlisted":
				return "home";
			case "private":
				return "followers";
			case "direct":
				return "specified";
		}
	}
}
