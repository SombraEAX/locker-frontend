<template>
	<div class="popup-wrapper" v-if="display">
		<div class="popup-pad" @click="hide"></div>

		<div class="popup-window" :style="wstyle">
			<div class="popup-header">
				<div class="popup-title">{{ wtitle }}</div>
				<button class="popup-close nerd" @click="hide"></button>
			</div>
			<div class="popup-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<style scoped>
.popup-wrapper {
	position: fixed;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	display: flex;
	text-align: center;
	z-index: 900;
}
.popup-pad {
	position: fixed;
	left: 0px;
	right: 0px;
	top: 0px;
	bottom: 0px;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1000;
}
.popup-window {
	margin: auto;
	display: flex;
	flex-direction: column;
	z-index: 2000;
}
.popup-header {
	border-radius: 1.1vw 1.1vw 0px 0px;
	font-size: 2.93vw;
	height: 10.42vh;
	background: rgb(31, 181, 170);
	color: #fff;
	display: flex;
}
.popup-content {
	border: 0.73vw solid rgb(31, 181, 170);
	background: #fff;
	border-top: 0px;
	flex: 1;
}
.popup-title {
	flex: 1;
	padding-left: 1.46vw;
	padding-top: 1.3vh;
	text-align: left;
}
.popup-close {
	box-sizing: border-box;
	width: 5.86vw;
	text-align: center;
	border: 0px;
	background: transparent;
	color: #fff;
}
.popup-close:active {
	background: rgb(11, 161, 150);
	border-radius: 0px 1.1vw 0px 0px;
}
@media (orientation: portrait) {
	.popup-header {
		border-radius: 2vw 2vw 0px 0px;
		font-size: 4vw;
		height: 5.2vh;
	}
	.popup-content {
		border-width: 1vw;
		border-radius: 0px 0px 2vw 2vw;
	}
	.popup-title {
		padding-left: 2vw;
		padding-top: 0;
		display: flex;
		align-items: center;
	}
	.popup-close {
		width: 8vw;
		font-size: 4vw;
	}
}
</style>
<script lang="ts">
export default {
	name: "PopupWindow",
	props: ["wtitle", "wstyle"],
	data() {
		return {
			display: false as boolean,
			_onEscape: null as ((e: KeyboardEvent) => void) | null,
		};
	},
	methods: {
		show() {
			this.hide();
			this.display = true;
			this._onEscape = (e) => {
				if (e.key === "Escape") this.hide();
			};
			document.addEventListener("keydown", this._onEscape);
		},
		hide() {
			this.display = false;
			if (this._onEscape) {
				document.removeEventListener("keydown", this._onEscape);
				this._onEscape = null;
			}
		},
	},
	beforeUnmount() {
		this.hide();
	},
};
</script>
