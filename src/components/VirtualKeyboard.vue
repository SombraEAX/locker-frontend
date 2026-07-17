<template>
	<div class="keyboard" :style="rootStyle">
		<div v-for="(row, ri) in rows" :key="ri" class="keyboard-row">
			<button
				v-for="item in row"
				:key="item.value"
				class="keyboard-button"
				:style="item.style"
				:data-value="item.value"
				@click="handleClick"
				@mousedown="mousedown"
				@touchstart="mousedown"
			>
				{{ item.caption }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.keyboard {
	display: flex;
	height: 26.04vh;
	flex-direction: column;
}
.keyboard-row {
	display: flex;
	flex: 1;
	min-height: 0;
}
.keyboard-button {
	flex: var(--btn-flex, 1);
	min-height: 0;
	border: 0px;
	background: #fff;
	border-radius: 5px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

const CLICK_DEBOUNCE_MS = 100;

interface ButtonParams {
	fontSize?: string;
	flex?: string;
	caption?: string;
}

interface ButtonStyle {
	"font-size": string | undefined;
	margin: string | undefined;
	"--btn-flex"?: number | string;
	background?: string;
	color?: string;
}

export default defineComponent({
	name: "VirtualKeyboard",

	props: {
		row1: String,
		row2: String,
		row3: String,
		row4: String,
		row5: String,
		row6: String,
		row7: String,
		row8: String,
		row9: String,
		row10: String,
		backspace: String,
		clear: String,
		width: String,
		minWidth: String,
		maxWidth: String,
		height: String,
		minHeight: String,
		maxHeight: String,
		fontSize: String,
		margin: String,
		background: String,
		textcolor: String,
		buttonsParams: Object as () => Record<string, ButtonParams> | undefined,
		activeBackground: String,
		activeTextcolor: String,
		checkedButtons: Array as () => string[] | undefined,
	},

	data() {
		return {
			pressedButton: null as string | null,
			_onMouseup: null as (() => void) | null,
			_onTouchend: null as (() => void) | null,
			_lastClick: 0 as number,
		};
	},

	computed: {
		rootStyle() {
			return {
				width: this.width,
				height: this.height,
				"min-height": this.minHeight,
				"min-width": this.minWidth,
				"max-height": this.maxHeight,
				"max-width": this.maxWidth,
			};
		},

		rows() {
			const result: {
				value: string;
				caption: string;
				style: ButtonStyle;
			}[][] = [];
			for (let i = 1; i <= 10; i++) {
				const data = (this as any)["row" + i];
				if (!data) break;
				result.push(
					data.split(/ +/).map((value: string) => {
						const buttonsParams = this.buttonsParams;
						const checkedButtons = this.checkedButtons;
						const params: ButtonParams =
							(buttonsParams && buttonsParams[value]) || {};
						const isChecked =
							checkedButtons && checkedButtons.includes(value);
						const isPressed = this.pressedButton === value;
						const style: ButtonStyle = {
							"font-size": params.fontSize || this.fontSize,
							margin: this.margin,
							"--btn-flex": String(params.flex || 1),
						};
						if (isPressed) {
							style.background = this.activeBackground;
							style.color = this.activeTextcolor;
						} else if (isChecked) {
							style.background = this.activeBackground;
							style.color = this.activeTextcolor;
						} else {
							if (this.background)
								style.background = this.background;
							if (this.textcolor) style.color = this.textcolor;
						}

						let caption: string;
						if (value === "clear") caption = this.clear;
						else if (value === "backspace")
							caption = this.backspace;
						else caption = params.caption || value;

						return { value, caption, style };
					})
				);
			}
			return result;
		},
	},

	mounted() {
		this._onMouseup = () => {
			this.pressedButton = null;
		};
		this._onTouchend = () => {
			this.pressedButton = null;
		};
		window.addEventListener("mouseup", this._onMouseup);
		window.addEventListener("touchend", this._onTouchend);
	},

	beforeUnmount() {
		if (this._onMouseup)
			window.removeEventListener("mouseup", this._onMouseup);
		if (this._onTouchend)
			window.removeEventListener("touchend", this._onTouchend);
	},

	methods: {
		mousedown({ target }: Event) {
			this.$emit("mousedown");
			this.pressedButton = (target as HTMLElement).dataset.value ?? null;
		},

		handleClick({ target }: Event) {
			const value = (target as HTMLElement).dataset.value;
			if (value === "clear") return this.fClear();
			if (value === "backspace") return this.fBackspace();

			const now = Date.now();
			if (this._lastClick && now - this._lastClick < CLICK_DEBOUNCE_MS)
				return;
			this._lastClick = now;
			this.$emit("input", value, this);
		},

		fClear() {
			this.$emit("clear");
		},

		fBackspace() {
			this.$emit("backspace");
		},
	},
});
</script>
