<template>
	<MkStickyContainer>
		<template #header
			><MkPageHeader
				:actions="headerActions"
				:tabs="headerTabs"
				:display-back-button="true"
		/></template>
		<MkSpacer :content-max="700" :margin-min="16" :margin-max="32">
			<FormSuspense :p="init"> none </FormSuspense>
		</MkSpacer>
	</MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import FormSuspense from "@/components/form/suspense.vue";
import * as os from "@/os";
import { updateInstanceCache } from "@/instance";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import icon from "@/scripts/icon";

async function init() {
	await os.api("admin/meta");
}

function save() {
	os.apiWithDialog("admin/update-meta").then(() => {
		updateInstanceCache();
	});
}

const headerActions = computed(() => [
	{
		asFullButton: true,
		icon: `${icon("ph-check")}`,
		text: i18n.ts.save,
		handler: save,
	},
]);

const headerTabs = computed(() => []);

definePageMetadata({
	title: i18n.ts.other,
	icon: `${icon("ph-gear-six")}`,
});
</script>
