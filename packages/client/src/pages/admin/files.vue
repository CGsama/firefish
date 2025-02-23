<template>
	<div>
		<MkStickyContainer>
			<template #header
				><MkPageHeader :actions="headerActions"
			/></template>
			<MkSpacer :content-max="900">
				<div class="xrmjdkdw">
					<div>
						<div
							class="inputs"
							style="
								display: flex;
								gap: var(--margin);
								flex-wrap: wrap;
							"
						>
							<MkSelect
								v-model="origin"
								style="margin: 0; flex: 1"
							>
								<template #label>{{
									i18n.ts.instance
								}}</template>
								<option value="combined">
									{{ i18n.ts.all }}
								</option>
								<option value="local">
									{{ i18n.ts.local }}
								</option>
								<option value="remote">
									{{ i18n.ts.remote }}
								</option>
							</MkSelect>
							<MkInput
								v-model="searchHost"
								:debounce="true"
								type="search"
								style="margin: 0; flex: 1"
								:disabled="pagination.params.origin === 'local'"
							>
								<template #label>{{ i18n.ts.host }}</template>
							</MkInput>
						</div>
						<div
							class="inputs"
							style="
								display: flex;
								gap: var(--margin);
								flex-wrap: wrap;
								padding-block-start: 1.2em;
							"
						>
							<MkInput
								v-model="userId"
								:debounce="true"
								type="search"
								style="margin: 0; flex: 1"
							>
								<template #label>User ID</template>
							</MkInput>
							<MkInput
								v-model="type"
								:debounce="true"
								type="search"
								style="margin: 0; flex: 1"
							>
								<template #label>MIME type</template>
							</MkInput>
						</div>
						<MkFileListForAdmin
							:pagination="pagination"
							:view-mode="viewMode"
						/>
					</div>
				</div>
			</MkSpacer>
		</MkStickyContainer>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import MkInput from "@/components/form/input.vue";
import MkSelect from "@/components/form/select.vue";
import MkFileListForAdmin from "@/components/MkFileListForAdmin.vue";
import { lookupFile } from "@/scripts/lookup-file";
import * as os from "@/os";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import icon from "@/scripts/icon";

const origin = ref("local");
const type = ref(null);
const searchHost = ref("");
const userId = ref("");
const viewMode = ref<"list" | "grid">("grid");
const pagination = {
	endpoint: "admin/drive/files" as const,
	limit: 10,
	params: computed(() => ({
		type: type.value && type.value !== "" ? type.value : null,
		userId: userId.value && userId.value !== "" ? userId.value : null,
		origin: origin.value,
		hostname:
			searchHost.value && searchHost.value !== "" ? searchHost.value : null,
	})),
};

function clear() {
	os.confirm({
		type: "warning",
		text: i18n.ts.clearCachedFilesConfirm,
	}).then(({ canceled }) => {
		if (canceled) return;

		os.apiWithDialog("admin/drive/clean-remote-files", {});
	});
}

const headerActions = computed(() => [
	{
		text: i18n.ts.lookup,
		icon: `${icon("ph-magnifying-glass")}`,
		handler: lookupFile,
	},
	{
		text: i18n.ts.clearCachedFiles,
		icon: `${icon("ph-trash")}`,
		handler: clear,
	},
]);

definePageMetadata(
	computed(() => ({
		title: i18n.ts.files,
		icon: `${icon("ph-cloud")}`,
	})),
);
</script>

<style lang="scss" scoped>
.xrmjdkdw {
	margin: var(--margin);
}
</style>
