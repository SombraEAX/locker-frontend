<template>
	<div class="bubble">
		<div
			ref="window"
			class="bubble-window"
			:style="{
				left: (visible ? wleft : -2000) + 'px',
				top: wtop + 'px',
			}"
		>
			<div class="bubble-titlebar">
				<div class="bubble-title">{{ title }}</div>
				<button class="bubble-close nerd" @click="hide"></button>
			</div>
			<slot></slot>
		</div>
		<div
			class="bubble-arrow"
			:data-direction="direction"
			:style="{
				left: (visible ? aleft : -2000) + 'px',
				top: atop + 'px',
			}"
		></div>
	</div>
</template>
<style scoped>
.bubble-close {
	width: 5.12vw;
	height: 5.12vw;
	font-size: 5.12vw;
	line-height: 5.12vw;
	box-sizing: border-box;
	padding: 0px;
	border: 0px;
	background: transparent;
}
.bubble-close:active {
	color: orange;
}
.bubble-titlebar {
	display: flex;
}
.bubble-title {
	font-weight: bolder;
	flex: 1;
	padding-left: 1.1vw;
	padding-top: 1.3vh;
}
.bubble-window {
	border: 0.37vw solid #000;
	background: #fff;
	position: fixed;
	font-size: 2.2vw;
	border-radius: 1.1vw;
	box-sizing: border-box;
}
.bubble-arrow {
	position: fixed;
	pointer-events: none;
	width: 2.93vw;
	height: 2.93vw;
	box-sizing: border-box;
	border: 1.46vw solid transparent;
}
.bubble-arrow[data-direction="left"] {
	border-right-color: #000;
}
.bubble-arrow[data-direction="right"] {
	border-left-color: #000;
}
</style>
<script lang="ts">
export default {
	name: "BubbleWindow",
	props: ["title"],
	data() {
		return {
			wleft: null,
			wtop: null,
			aleft: null,
			atop: null,
			direction: null,
			visible: false,
			element: null,
		};
	},
	mounted() {
		this._onDocClick = (event) => {
			if (!this.$refs.window.contains(event.target) && this.visible)
				this.hide();
		};
		this._onEscape = (event) => {
			if (event.key === "Escape" && this.visible) this.hide();
		};
		document.addEventListener("click", this._onDocClick);
		document.addEventListener("keydown", this._onEscape);
	},
	beforeUnmount() {
		document.removeEventListener("click", this._onDocClick);
		document.removeEventListener("keydown", this._onEscape);
	},
	updated() {
		if (this.visible) this.positioning();
	},
	methods: {
		show(element) {
			this.element = element;
			this.positioning();
			this.visible = true;
		},

		positioning() {
			if (!this.element) return;

			let rect = this.element.getBoundingClientRect();
			let w = document.documentElement.clientWidth;
			let h = document.documentElement.clientHeight;
			let left = rect.left;
			let right = w - rect.right;
			let y = rect.top + rect.height / 2;
			let bubble = this.$refs.window;
			let brect = bubble.getBoundingClientRect();
			let max = h - brect.height - 10;
			let arrowW = w * 0.0293;

			if (left > right) {
				this.direction = "right";
				this.wleft = rect.left - brect.width - 20;
				this.aleft = this.wleft + brect.width;
			} else {
				this.direction = "left";
				this.wleft = rect.right + 20;
				this.aleft = this.wleft - arrowW;
			}

			this.atop = y - arrowW / 2;
			this.wtop = Math.min(Math.max(y - brect.height / 2, 10), max);
		},

		hide() {
			this.visible = false;
			this.$emit("close");
		},
	},
};
</script>
