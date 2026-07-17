<template>
	<div class="listbox">
		<list-box-button
			direction="up"
			@mousedown="upPress"
			@mouseup="clearTimer"
			@mouseleave="clearTimer"
			@touchend="clearTimer"
			v-if="upVisible"
		/>

		<div class="listbox-list" ref="list">
			<slot></slot>
		</div>

		<list-box-button
			direction="dn"
			@mousedown="dnPress"
			@mouseup="clearTimer"
			@mouseleave="clearTimer"
			@touchend="clearTimer"
			v-if="dnVisible"
		/>
	</div>
</template>
<style scoped>
.listbox-list {
	width: 100%;
	height: 100%;
	position: absolute;
	overflow-y: hidden;
	z-index: 25;
}
.listbox {
	position: relative;
	overflow-y: hidden;
}
</style>
<script lang="ts">
const SCROLL_INTERVAL_MS = 16;
const SCROLL_STEP_PX = 3;

import ListBoxButton from "./ListBoxButton.vue";

export default {
	name: "ListBox",

	components: { ListBoxButton },

	data() {
		return {
			timer: null as ReturnType<typeof setInterval> | null,
			upVisible: false,
			dnVisible: false,
			_onMouseup: null as (() => void) | null,
			_onTouchend: null as (() => void) | null,
		};
	},

	mounted() {
		this._onMouseup = () => clearInterval(this.timer);
		this._onTouchend = () => clearInterval(this.timer);
		window.addEventListener("mouseup", this._onMouseup);
		window.addEventListener("touchend", this._onTouchend);
		this.refresh();
	},

	beforeUnmount() {
		clearInterval(this.timer);
		if (this._onMouseup)
			window.removeEventListener("mouseup", this._onMouseup);
		if (this._onTouchend)
			window.removeEventListener("touchend", this._onTouchend);
	},

	methods: {
		clearTimer() {
			clearInterval(this.timer);
		},
		up() {
			this.scroll(-SCROLL_STEP_PX);
		},
		dn() {
			this.scroll(SCROLL_STEP_PX);
		},
		upPress() {
			clearInterval(this.timer);
			this.up();
			this.timer = setInterval(() => this.up(), SCROLL_INTERVAL_MS);
		},
		dnPress() {
			clearInterval(this.timer);
			this.dn();
			this.timer = setInterval(() => this.dn(), SCROLL_INTERVAL_MS);
		},
		scroll(val: number) {
			const el = this.$refs.list as HTMLDivElement;
			el.scrollTop += val;
			this.refresh();
		},
		//call after list changes to show/hide scroll buttons
		refresh() {
			let el = this.$refs.list as HTMLDivElement;
			this.upVisible = !!el.scrollTop;
			this.dnVisible = !(
				el.scrollHeight <=
				el.scrollTop + el.clientHeight
			);
		},
		home() {
			const el = this.$refs.list as HTMLDivElement;
			el.scrollTop = 0;
			this.refresh();
		},
	},
};
</script>
