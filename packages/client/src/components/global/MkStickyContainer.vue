<template>
	<div class="sticky-container">
		<div ref="headerEl">
			<slot name="header"></slot>
		</div>
		<div ref="bodyEl" :data-sticky-container-header-height="headerHeight">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
// なんか動かない
// const CURRENT_STICKY_TOP = Symbol('CURRENT_STICKY_TOP');
const CURRENT_STICKY_TOP = "CURRENT_STICKY_TOP";
</script>

<script lang="ts" setup>
import type { Ref } from "vue";
import { inject, onMounted, onUnmounted, provide, ref, watch } from "vue";

const headerEl = ref<HTMLElement>();
const bodyEl = ref<HTMLElement>();

const headerHeight = ref<string | undefined>();
const childStickyTop = ref(0);
const parentStickyTop = inject<Ref<number>>(CURRENT_STICKY_TOP, ref(0));
provide(CURRENT_STICKY_TOP, childStickyTop);

const calc = () => {
	const property = getComputedStyle(headerEl.value ?? document.body)["writing-mode"].startsWith('vertical') ? 'offsetWidth' : 'offsetHeight';
	childStickyTop.value = parentStickyTop.value + (headerEl.value?.[property] ?? 0);
	headerHeight.value = headerEl.value![property].toString();
};

const observer = new ResizeObserver(() => {
	window.setTimeout(() => {
		calc();
	}, 100);
});

onMounted(() => {
	calc();

	watch(parentStickyTop, calc);

	watch(
		childStickyTop,
		() => {
			bodyEl.value!.style.setProperty(
				"--stickyTop",
				`${childStickyTop.value}px`,
			);
		},
		{
			immediate: true,
		},
	);

	observer.observe(headerEl.value!);
});

onUnmounted(() => {
	observer.disconnect();
});
</script>

<style lang="scss">
.sticky-container {
	display: flex;
	flex-direction: column;
	> div:first-child {
		position: sticky;
		inset-block-start: var(--stickyTop, 0);
		z-index: 1000;
	}
	> div:last-child {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}
}
</style>
