<template>
	<div class="sqxihjet">
		<div v-if="narrow === false" class="wide">
			<div class="content">
				<MkA to="/" class="link" active-class="active"
					><i :class="icon('ph-house icon')"></i
					>{{ i18n.ts.home }}</MkA
				>
				<MkA to="/explore" class="link" active-class="active"
					><i :class="icon('ph-compass icon')"></i
					>{{ i18n.ts.explore }}</MkA
				>
				<MkA to="/channels" class="link" active-class="active"
					><i :class="icon('ph-television icon')"></i
					>{{ i18n.ts.channel }}</MkA
				>
				<MkA to="/pages" class="link" active-class="active"
					><i :class="icon('ph-file-text ph-dir icon')"></i
					>{{ i18n.ts.pages }}</MkA
				>
				<MkA to="/gallery" class="link" active-class="active"
					><i :class="icon('ph-image-square icon')"></i
					>{{ i18n.ts.gallery }}</MkA
				>
				<div v-if="info" class="page active link">
					<div class="title">
						<i v-if="info.icon" class="icon" :class="info.icon"></i>
						<MkAvatar
							v-else-if="info.avatar"
							class="avatar"
							:user="info.avatar"
							:disable-preview="true"
							:show-indicator="true"
						/>
						<span v-if="info.title" class="text">{{
							info.title
						}}</span>
						<MkUserName
							v-else-if="info.userName"
							:user="info.userName"
							:nowrap="false"
							class="text"
						/>
					</div>
					<button
						v-if="info.action"
						class="_button action"
						@click.stop="info.action.handler"
					>
						<!-- TODO -->
					</button>
				</div>
				<div class="right">
					<button class="_button search" @click="search()">
						<i :class="icon('ph-magnifying-glass icon')"></i
						><span>{{ i18n.ts.search }}</span>
					</button>
					<button class="_buttonPrimary signup" @click="signup()">
						{{ i18n.ts.signup }}
					</button>
					<button class="_button login" @click="signin()">
						{{ i18n.ts.login }}
					</button>
				</div>
			</div>
		</div>
		<div v-else-if="narrow === true" class="narrow">
			<button class="menu _button" @click="$parent.showMenu = true">
				<i :class="icon('ph-list icon')"></i>
			</button>
			<div v-if="info" class="title">
				<i v-if="info.icon" class="icon" :class="info.icon"></i>
				<MkAvatar
					v-else-if="info.avatar"
					class="avatar"
					:user="info.avatar"
					:disable-preview="true"
					:show-indicator="true"
				/>
				<span v-if="info.title" class="text">{{ info.title }}</span>
				<MkUserName
					v-else-if="info.userName"
					:user="info.userName"
					:nowrap="false"
					class="text"
				/>
			</div>
			<button
				v-if="info && info.action"
				class="action _button"
				@click.stop="info.action.handler"
			>
				<!-- TODO -->
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import XSigninDialog from "@/components/MkSigninDialog.vue";
import XSignupDialog from "@/components/MkSignupDialog.vue";
import * as os from "@/os";
import { search } from "@/scripts/search";
import { i18n } from "@/i18n";
import icon from "@/scripts/icon";

export default defineComponent({
	props: {
		info: {
			required: true,
		},
	},

	data() {
		return {
			narrow: null,
			showMenu: false,
			i18n,
		};
	},

	mounted() {
		this.narrow = this.$el.clientWidth < 1300;
	},

	methods: {
		signin() {
			os.popup(
				XSigninDialog,
				{
					autoSet: true,
				},
				{},
				"closed",
			);
		},

		signup() {
			os.popup(
				XSignupDialog,
				{
					autoSet: true,
				},
				{},
				"closed",
			);
		},

		search,
		icon,
	},
});
</script>

<style lang="scss" scoped>
.sqxihjet {
	$height: 60px;
	position: sticky;
	inset-block-start: 0;
	inset-inline-start: 0;
	z-index: 1000;
	line-height: $height;
	-webkit-backdrop-filter: var(--blur, blur(32px));
	backdrop-filter: var(--blur, blur(32px));
	background-color: var(--X16);

	> .wide {
		> .content {
			max-inline-size: 1400px;
			margin-block: 0;
			margin-inline: auto;
			display: flex;
			align-items: center;

			> .link {
				$line: 3px;
				display: inline-block;
				padding-block: 0;
				padding-inline: 16px;
				line-height: $height - ($line * 2);
				border-block-start: solid $line transparent;
				border-block-end: solid $line transparent;

				> .icon {
					margin-inline-end: 0.5em;
				}

				&.page {
					border-block-end-color: var(--accent);
				}
			}

			> .page {
				> .title {
					display: inline-block;
					vertical-align: bottom;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					position: relative;

					> .icon + .text {
						margin-inline-start: 8px;
					}

					> .avatar {
						$size: 32px;
						display: inline-block;
						inline-size: $size;
						block-size: $size;
						vertical-align: middle;
						margin-inline-end: 8px;
						pointer-events: none;
					}

					&._button {
						&:hover {
							color: var(--fgHighlighted);
						}
					}

					&.selected {
						box-shadow: 0 -2px 0 0 var(--accent) inset;
						color: var(--fgHighlighted);
					}
				}

				> .action {
					padding-block-start: 0;
					padding-inline-end: 0;
					padding-block-end: 0;
					padding-inline-start: 16px;
				}
			}

			> .right {
				margin-inline-start: auto;

				> .search {
					background: var(--bg);
					border-radius: 999px;
					inline-size: 230px;
					line-height: $height - 20px;
					margin-inline-end: 16px;
					text-align: start;

					> * {
						opacity: 0.7;
					}

					> .icon {
						padding-block: 0;
						padding-inline: 16px;
					}
				}

				> .signup {
					border-radius: 999px;
					padding-block: 0;
					padding-inline: 24px;
					line-height: $height - 20px;
				}

				> .login {
					padding-block: 0;
					padding-inline: 16px;
				}
			}
		}
	}

	> .narrow {
		display: flex;

		> .menu,
		> .action {
			inline-size: $height;
			block-size: $height;
			font-size: 20px;
		}

		> .title {
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			position: relative;
			text-align: center;

			> .icon + .text {
				margin-inline-start: 8px;
			}

			> .avatar {
				$size: 32px;
				display: inline-block;
				inline-size: $size;
				block-size: $size;
				vertical-align: middle;
				margin-inline-end: 8px;
				pointer-events: none;
			}
		}
	}
}
</style>
