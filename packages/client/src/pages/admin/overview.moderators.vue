<template>
	<div>
		<Transition
			:name="defaultStore.state.animation ? '_transition_zoom' : ''"
			mode="out-in"
		>
			<MkLoading v-if="fetching" />
			<div v-else :class="$style.root" class="_panel">
				<MkA
					v-for="user in moderators"
					:key="user.id"
					class="user"
					:to="`/user-info/${user.id}`"
				>
					<MkAvatar
						:user="user"
						class="avatar"
						indicator
						disable-link
					/>
				</MkA>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as os from "@/os";
import { defaultStore } from "@/store";

const moderators = ref<any>(null);
const fetching = ref(true);

onMounted(async () => {
	moderators.value = await os.api("admin/show-users", {
		sort: "+updatedAt",
		state: "adminOrModerator",
		limit: 30,
	});

	fetching.value = false;
});
</script>

<style lang="scss" module>
.root {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(30px, 40px));
	grid-gap: 12px;
	place-content: center;
	padding: 12px;

	&:global {
		> .user {
			inline-size: 100%;
			block-size: 100%;
			aspect-ratio: 1;

			> .avatar {
				inline-size: 100%;
				block-size: 100%;
			}
		}
	}
}
</style>
