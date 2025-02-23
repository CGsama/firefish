<template>
	<transition
		:name="defaultStore.state.animation ? 'window' : ''"
		appear
		@after-leave="$emit('closed')"
	>
		<div
			v-if="showing"
			ref="rootEl"
			class="ebkgocck"
			:class="{ maximized }"
			v-bind="$attrs"
		>
			<div
				class="body _shadow _narrow_"
				@mousedown="onBodyMousedown"
				@keydown="onKeydown"
			>
				<div
					class="header"
					:class="{ mini }"
					@contextmenu.prevent.stop="onContextmenu"
				>
					<span class="left">
						<button
							v-for="button in buttonsLeft"
							v-tooltip="button.title"
							class="button _button"
							:class="{ highlighted: button.highlighted }"
							@click="button.onClick"
						>
							<i :class="button.icon"></i>
						</button>
					</span>
					<span
						class="title"
						@mousedown.prevent="onHeaderMousedown"
						@touchstart.prevent="onHeaderMousedown"
					>
						<slot name="header"></slot>
					</span>
					<span class="right">
						<button
							v-for="button in buttonsRight"
							v-tooltip="button.title"
							class="button _button"
							:class="{ highlighted: button.highlighted }"
							@click="button.onClick"
						>
							<i :class="button.icon"></i>
						</button>
						<button
							v-if="canResize && maximized"
							class="button _button"
							@click="unMaximize()"
						>
							<i :class="icon('ph-copy')"></i>
						</button>
						<button
							v-else-if="canResize && !maximized"
							class="button _button"
							@click="maximize()"
						>
							<i :class="icon('ph-browser')"></i>
						</button>
						<button
							v-if="closeButton"
							class="button _button"
							@click="close()"
						>
							<i :class="icon('ph-x')"></i>
						</button>
					</span>
				</div>
				<div class="body">
					<slot></slot>
				</div>
			</div>
			<template v-if="canResize">
				<div
					class="handle top"
					@mousedown.prevent="onTopHandleMousedown"
				></div>
				<div
					class="handle right"
					@mousedown.prevent="onRightHandleMousedown"
				></div>
				<div
					class="handle bottom"
					@mousedown.prevent="onBottomHandleMousedown"
				></div>
				<div
					class="handle left"
					@mousedown.prevent="onLeftHandleMousedown"
				></div>
				<div
					class="handle top-left"
					@mousedown.prevent="onTopLeftHandleMousedown"
				></div>
				<div
					class="handle top-right"
					@mousedown.prevent="onTopRightHandleMousedown"
				></div>
				<div
					class="handle bottom-right"
					@mousedown.prevent="onBottomRightHandleMousedown"
				></div>
				<div
					class="handle bottom-left"
					@mousedown.prevent="onBottomLeftHandleMousedown"
				></div>
			</template>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, provide, ref } from "vue";
import contains from "@/scripts/contains";
import * as os from "@/os";
import type { MenuItem } from "@/types/menu";
import { defaultStore } from "@/store";
import icon from "@/scripts/icon";

const minHeight = 50;
const minWidth = 250;

function dragListen(fn: (ev: MouseEvent) => void) {
	window.addEventListener("mousemove", fn);
	window.addEventListener("touchmove", fn);
	window.addEventListener("mouseleave", dragClear.bind(null, fn));
	window.addEventListener("mouseup", dragClear.bind(null, fn));
	window.addEventListener("touchend", dragClear.bind(null, fn));
}

function dragClear(fn) {
	window.removeEventListener("mousemove", fn);
	window.removeEventListener("touchmove", fn);
	window.removeEventListener("mouseleave", dragClear);
	window.removeEventListener("mouseup", dragClear);
	window.removeEventListener("touchend", dragClear);
}

const props = withDefaults(
	defineProps<{
		initialWidth?: number;
		initialHeight?: number | null;
		canResize?: boolean;
		closeButton?: boolean;
		mini?: boolean;
		front?: boolean;
		contextmenu?: MenuItem[] | null;
		buttonsLeft?: any[];
		buttonsRight?: any[];
	}>(),
	{
		initialWidth: 400,
		initialHeight: null,
		canResize: false,
		closeButton: true,
		mini: false,
		front: false,
		contextmenu: null,
		buttonsLeft: () => [],
		buttonsRight: () => [],
	},
);

const emit = defineEmits<{
	(ev: "closed"): void;
}>();

provide("inWindow", true);

const rootEl = ref<HTMLElement | null>();
const showing = ref(true);
let beforeClickedAt = 0;
const maximized = ref(false);
let unMaximizedTop = "";
let unMaximizedLeft = "";
let unMaximizedWidth = "";
let unMaximizedHeight = "";

function close() {
	showing.value = false;
}

function onKeydown(evt) {
	if (evt.which === 27) {
		// Esc
		evt.preventDefault();
		evt.stopPropagation();
		close();
	}
}

function onContextmenu(ev: MouseEvent) {
	if (props.contextmenu) {
		os.contextMenu(props.contextmenu, ev);
	}
}

// 最前面へ移動
function top() {
	if (rootEl.value) {
		rootEl.value.style.zIndex = os.claimZIndex(props.front ? "middle" : "low");
	}
}

function maximize() {
	maximized.value = true;
	unMaximizedTop = rootEl.value.style.top;
	unMaximizedLeft = rootEl.value.style.left;
	unMaximizedWidth = rootEl.value.style.width;
	unMaximizedHeight = rootEl.value.style.height;
	rootEl.value.style.top = "0";
	rootEl.value.style.left = "0";
	rootEl.value.style.width = "100%";
	rootEl.value.style.height = "100%";
}

function unMaximize() {
	maximized.value = false;
	rootEl.value.style.top = unMaximizedTop;
	rootEl.value.style.left = unMaximizedLeft;
	rootEl.value.style.width = unMaximizedWidth;
	rootEl.value.style.height = unMaximizedHeight;
}

function onBodyMousedown() {
	top();
}

function onDblClick() {
	maximize();
}

function onHeaderMousedown(evt: MouseEvent) {
	// 右クリックはコンテキストメニューを開こうとした可能性が高いため無視
	if (evt.button === 2) return;

	let beforeMaximized = false;

	if (maximized.value) {
		beforeMaximized = true;
		unMaximize();
	}

	// ダブルクリック判定
	if (Date.now() - beforeClickedAt < 300) {
		beforeClickedAt = Date.now();
		onDblClick();
		return;
	}

	beforeClickedAt = Date.now();

	const main = rootEl.value;
	if (main == null) return;

	if (!contains(main, document.activeElement)) main.focus();

	const position = main.getBoundingClientRect();

	const clickX =
		evt.touches && evt.touches.length > 0
			? evt.touches[0].clientX
			: evt.clientX;
	const clickY =
		evt.touches && evt.touches.length > 0
			? evt.touches[0].clientY
			: evt.clientY;
	const moveBaseX = beforeMaximized
		? Number.parseInt(unMaximizedWidth, 10) / 2
		: clickX - position.left; // TODO: parseIntやめる
	const moveBaseY = beforeMaximized ? 20 : clickY - position.top;
	const browserWidth = window.innerWidth;
	const browserHeight = window.innerHeight;
	const windowWidth = main.offsetWidth;
	const windowHeight = main.offsetHeight;

	function move(x: number, y: number) {
		let moveLeft = x - moveBaseX;
		let moveTop = y - moveBaseY;

		// 下はみ出し
		if (moveTop + windowHeight > browserHeight)
			moveTop = browserHeight - windowHeight;

		// 左はみ出し
		if (moveLeft < 0) moveLeft = 0;

		// 上はみ出し
		if (moveTop < 0) moveTop = 0;

		// 右はみ出し
		if (moveLeft + windowWidth > browserWidth)
			moveLeft = browserWidth - windowWidth;

		rootEl.value.style.left = moveLeft + "px";
		rootEl.value.style.top = moveTop + "px";
	}

	if (beforeMaximized) {
		move(clickX, clickY);
	}

	// 動かした時
	dragListen((me) => {
		const x =
			me.touches && me.touches.length > 0 ? me.touches[0].clientX : me.clientX;
		const y =
			me.touches && me.touches.length > 0 ? me.touches[0].clientY : me.clientY;

		move(x, y);
	});
}

// 上ハンドル掴み時
function onTopHandleMousedown(evt) {
	const main = rootEl.value;

	const base = evt.clientY;
	const height = Number.parseInt(getComputedStyle(main, "").height, 10);
	const top = Number.parseInt(getComputedStyle(main, "").top, 10);

	// 動かした時
	dragListen((me) => {
		const move = me.clientY - base;
		if (top + move > 0) {
			if (height + -move > minHeight) {
				applyTransformHeight(height + -move);
				applyTransformTop(top + move);
			} else {
				// 最小の高さより小さくなろうとした時
				applyTransformHeight(minHeight);
				applyTransformTop(top + (height - minHeight));
			}
		} else {
			// 上のはみ出し時
			applyTransformHeight(top + height);
			applyTransformTop(0);
		}
	});
}

// 右ハンドル掴み時
function onRightHandleMousedown(evt) {
	const main = rootEl.value;

	const base = evt.clientX;
	const width = Number.parseInt(getComputedStyle(main, "").width, 10);
	const left = Number.parseInt(getComputedStyle(main, "").left, 10);
	const browserWidth = window.innerWidth;

	// 動かした時
	dragListen((me) => {
		const move = me.clientX - base;
		if (left + width + move < browserWidth) {
			if (width + move > minWidth) {
				applyTransformWidth(width + move);
			} else {
				// 最小の幅より小さくなろうとした時
				applyTransformWidth(minWidth);
			}
		} else {
			// 右のはみ出し時
			applyTransformWidth(browserWidth - left);
		}
	});
}

// 下ハンドル掴み時
function onBottomHandleMousedown(evt) {
	const main = rootEl.value;

	const base = evt.clientY;
	const height = Number.parseInt(getComputedStyle(main, "").height, 10);
	const top = Number.parseInt(getComputedStyle(main, "").top, 10);
	const browserHeight = window.innerHeight;

	// 動かした時
	dragListen((me) => {
		const move = me.clientY - base;
		if (top + height + move < browserHeight) {
			if (height + move > minHeight) {
				applyTransformHeight(height + move);
			} else {
				// 最小の高さより小さくなろうとした時
				applyTransformHeight(minHeight);
			}
		} else {
			// 下のはみ出し時
			applyTransformHeight(browserHeight - top);
		}
	});
}

// 左ハンドル掴み時
function onLeftHandleMousedown(evt) {
	const main = rootEl.value;

	const base = evt.clientX;
	const width = Number.parseInt(getComputedStyle(main, "").width, 10);
	const left = Number.parseInt(getComputedStyle(main, "").left, 10);

	// 動かした時
	dragListen((me) => {
		const move = me.clientX - base;
		if (left + move > 0) {
			if (width + -move > minWidth) {
				applyTransformWidth(width + -move);
				applyTransformLeft(left + move);
			} else {
				// 最小の幅より小さくなろうとした時
				applyTransformWidth(minWidth);
				applyTransformLeft(left + (width - minWidth));
			}
		} else {
			// 左のはみ出し時
			applyTransformWidth(left + width);
			applyTransformLeft(0);
		}
	});
}

// 左上ハンドル掴み時
function onTopLeftHandleMousedown(evt) {
	onTopHandleMousedown(evt);
	onLeftHandleMousedown(evt);
}

// 右上ハンドル掴み時
function onTopRightHandleMousedown(evt) {
	onTopHandleMousedown(evt);
	onRightHandleMousedown(evt);
}

// 右下ハンドル掴み時
function onBottomRightHandleMousedown(evt) {
	onBottomHandleMousedown(evt);
	onRightHandleMousedown(evt);
}

// 左下ハンドル掴み時
function onBottomLeftHandleMousedown(evt) {
	onBottomHandleMousedown(evt);
	onLeftHandleMousedown(evt);
}

// 高さを適用
function applyTransformHeight(height) {
	if (height > window.innerHeight) height = window.innerHeight;
	rootEl.value.style.height = height + "px";
}

// 幅を適用
function applyTransformWidth(width) {
	if (width > window.innerWidth) width = window.innerWidth;
	rootEl.value.style.width = width + "px";
}

// Y座標を適用
function applyTransformTop(top) {
	rootEl.value.style.top = top + "px";
}

// X座標を適用
function applyTransformLeft(left) {
	rootEl.value.style.left = left + "px";
}

function onBrowserResize() {
	const main = rootEl.value;
	const position = main.getBoundingClientRect();
	const browserWidth = window.innerWidth;
	const browserHeight = window.innerHeight;
	const windowWidth = main.offsetWidth;
	const windowHeight = main.offsetHeight;
	if (position.left < 0) main.style.left = "0"; // 左はみ出し
	if (position.top + windowHeight > browserHeight)
		main.style.top = browserHeight - windowHeight + "px"; // 下はみ出し
	if (position.left + windowWidth > browserWidth)
		main.style.left = browserWidth - windowWidth + "px"; // 右はみ出し
	if (position.top < 0) main.style.top = "0"; // 上はみ出し
}

onMounted(() => {
	if (props.initialWidth) applyTransformWidth(props.initialWidth);
	if (props.initialHeight) applyTransformHeight(props.initialHeight);

	applyTransformTop(window.innerHeight / 2 - rootEl.value.offsetHeight / 2);
	applyTransformLeft(window.innerWidth / 2 - rootEl.value.offsetWidth / 2);

	// 他のウィンドウ内のボタンなどを押してこのウィンドウが開かれた場合、親が最前面になろうとするのでそれに隠されないようにする
	top();

	window.addEventListener("resize", onBrowserResize);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", onBrowserResize);
});

defineExpose({
	close,
});
</script>

<style lang="scss" scoped>
.window-enter-active,
.window-leave-active {
	transition:
		opacity 0.2s,
		transform 0.2s !important;
}
.window-enter-from,
.window-leave-to {
	pointer-events: none;
	opacity: 0;
	transform: scale(0.9);
}

.ebkgocck {
	position: fixed;
	inset-block-start: 0;
	inset-inline-start: 0;

	> .body {
		overflow: clip;
		display: flex;
		flex-direction: column;
		contain: content;
		inline-size: 100%;
		block-size: 100%;
		border-radius: var(--radius);

		> .header {
			--height: 42px;

			&.mini {
				--height: 38px;
			}

			& {
				display: flex;
				position: relative;
				z-index: 1;
				flex-shrink: 0;
				user-select: none;
				block-size: var(--height);
				background: var(--windowHeader);
				-webkit-backdrop-filter: var(--blur, blur(15px));
				backdrop-filter: var(--blur, blur(15px));
				//border-block-end: solid 1px var(--divider);
				font-size: 95%;
				font-weight: bold;
			}

			> .left,
			> .right {
				> .button {
					block-size: var(--height);
					inline-size: var(--height);

					&:hover {
						color: var(--fgHighlighted);
					}

					&.highlighted {
						color: var(--accent);
					}
				}
			}

			> .left {
				margin-inline-end: 16px;
			}

			> .right {
				min-inline-size: 16px;
			}

			> .title {
				flex: 1;
				position: relative;
				line-height: var(--height);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				cursor: move;
			}
		}

		> .body {
			flex: 1;
			overflow: auto;
			background: var(--panel);
		}
	}

	&.page-window > .body > .body {
		background: var(--bg);
		scrollbar-gutter: stable;
	}

	> .handle {
		$size: 8px;

		position: absolute;

		&.top {
			inset-block-start: -($size);
			inset-inline-start: 0;
			inline-size: 100%;
			block-size: $size;
			cursor: ns-resize;
		}

		&.right {
			inset-block-start: 0;
			inset-inline-end: -($size);
			inline-size: $size;
			block-size: 100%;
			cursor: ew-resize;
		}

		&.bottom {
			inset-block-end: -($size);
			inset-inline-start: 0;
			inline-size: 100%;
			block-size: $size;
			cursor: ns-resize;
		}

		&.left {
			inset-block-start: 0;
			inset-inline-start: -($size);
			inline-size: $size;
			block-size: 100%;
			cursor: ew-resize;
		}

		&.top-left {
			inset-block-start: -($size);
			inset-inline-start: -($size);
			inline-size: $size * 2;
			block-size: $size * 2;
			cursor: nwse-resize;
		}

		&.top-right {
			inset-block-start: -($size);
			inset-inline-end: -($size);
			inline-size: $size * 2;
			block-size: $size * 2;
			cursor: nesw-resize;
		}

		&.bottom-right {
			inset-block-end: -($size);
			inset-inline-end: -($size);
			inline-size: $size * 2;
			block-size: $size * 2;
			cursor: nwse-resize;
		}

		&.bottom-left {
			inset-block-end: -($size);
			inset-inline-start: -($size);
			inline-size: $size * 2;
			block-size: $size * 2;
			cursor: nesw-resize;
		}
	}

	&.maximized {
		> .body {
			border-radius: 0;
		}
	}
}
</style>
