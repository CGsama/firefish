<template>
	<transition :name="defaultStore.state.animation ? 'fade' : ''" appear>
		<div
			ref="rootEl"
			class="nvlagfpb"
			:style="{ zIndex }"
			@contextmenu.prevent.stop="() => {}"
		>
			<MkMenu :items="items" :align="'left'" @close="$emit('closed')" />
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import MkMenu from "@/components/MkMenu.vue";
import type { MenuItem } from "@/types/menu";
import contains from "@/scripts/contains";
import * as os from "@/os";
import { defaultStore } from "@/store";

const props = defineProps<{
	items: MenuItem[];
	ev: MouseEvent;
}>();

const emit = defineEmits<{
	(ev: "closed"): void;
}>();

const rootEl = ref<HTMLDivElement | null>(null);

const zIndex = ref<number>(os.claimZIndex("high"));

onMounted(() => {
	let left = props.ev.pageX + 1; // 間違って右ダブルクリックした場合に意図せずアイテムがクリックされるのを防ぐため + 1
	let top = props.ev.pageY + 1; // 間違って右ダブルクリックした場合に意図せずアイテムがクリックされるのを防ぐため + 1

	const width = rootEl.value!.offsetWidth;
	const height = rootEl.value!.offsetHeight;

	if (left + width - window.scrollX > window.innerWidth) {
		left = window.innerWidth - width + window.scrollX;
	}

	if (top + height - window.scrollY > window.innerHeight) {
		top = window.innerHeight - height + window.scrollY;
	}

	if (top < 0) {
		top = 0;
	}

	if (left < 0) {
		left = 0;
	}

	rootEl.value!.style.top = `${top}px`;
	rootEl.value!.style.left = `${left}px`;

	document.body.addEventListener("mousedown", onMousedown);
});

onBeforeUnmount(() => {
	document.body.removeEventListener("mousedown", onMousedown);
});

function onMousedown(evt: Event) {
	if (!contains(rootEl.value, evt.target) && rootEl.value !== evt.target)
		emit("closed");
}
</script>

<style lang="scss" scoped>
.nvlagfpb {
	position: absolute;
}

.fade-enter-active,
.fade-leave-active {
	transition:
		opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
		transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	transform-origin: left top;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scale(0.9);
}
</style>
