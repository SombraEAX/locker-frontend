<template>
	<div class="pkb-main" :data-keyboard="showVirtualKeyboard">
		<div class="pkb-body" ref="body" :style="{ height: bodyHeight }">
			<slot></slot>
		</div>

		<div class="pkb-kb" ref="kb-container">
			<div class="pkb-kb-inner">
				<div
					class="pkb-kb-layer"
					v-for="Layer in layers"
					:key="Layer.id"
					:data-id="Layer.id"
					:data-visible="Layer.id === layer || undefined"
				>
					<virtual-keyboard
						ref="kb"
						:row1="Layer.row1"
						:row2="Layer.row2"
						:row3="Layer.row3"
						:row4="Layer.row4"
						:background="buttonStyles.normal.background"
						:textcolor="buttonStyles.normal.textcolor"
						:active-background="buttonStyles.active.background"
						:active-textcolor="buttonStyles.active.textcolor"
						backspace="⌫"
						@input="keypress"
						@backspace="backspace"
						margin="0.29vw"
						height="100%"
						width="100%"
						font-size="3vh"
						:buttons-params="buttons"
						:checked-buttons="checkedShiftKeys"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.pkb-kb-layer {
	height: 100%;
}

.pkb-kb-layer:not([data-visible]) {
	display: none;
}

.pkb-main {
	width: 100%;
	height: 100%;
}

.pkb-main[data-keyboard="false"] .pkb-kb {
	display: none;
}

.pkb-body {
	height: 100%;
}

.pkb-kb {
	position: fixed;
	bottom: 0px;
	background: #000000;
	border-radius: 0.73vw 0.73vw 0px 0px;
	left: 20vw;
	right: 20vw;
	height: 45vh;
	text-align: center;
	width: 60vw;
}
.pkb-kb-inner {
	width: 100%;
	height: 100%;
	display: inline-block;
}
</style>
<script lang="ts">
import { defineComponent } from "vue";
import VirtualKeyboard from "@components/VirtualKeyboard.vue";

export default defineComponent({
	props: ["stretch"],
	components: {
		VirtualKeyboard,
	},
	name: "page-with-keyboard",

	data() {
		return {
			showVirtualKeyboard: false,
			textbox: null as HTMLInputElement | null,
			prevLayer: null as string | null,
			layer: "en",
			mode: "normal",
			pressed: false,
			bodyControlsPressed: false,
			bodyInputPressed: false,
			bodyHeight: "100%",
			focusedInputEl: null as HTMLElement | null,

			buttonStyles: {
				normal: { background: "#2B2931", textcolor: "#fff" },
				active: { background: "yellow", textcolor: "#000" },
				checked: { background: "lightblue", textcolor: "#000" },
			},

			buttons: {
				space: { flex: 5, caption: " " },
				shift: { caption: "Shift" },
				alt: { caption: "!$%", fontSize: "1.76vw" },
				alt1: { caption: "ABC", fontSize: "1.76vw" },
			},

			checkedShiftKeys: [] as string[],
			_kbMousedown: null as (() => void) | null,
			_onMouseup: null as (() => void) | null,
			_bodyButtons: [] as Array<{ el: Element; handler: () => void }>,
			_inputs: [] as Array<{
				el: Element;
				mousedownHandler: () => void;
				clickHandler: () => void;
				blurHandler: () => void;
			}>,

			layers: [
				{
					id: "en",
					visible: true,
					row1: "q w e r t y u i o p",
					row2: "a s d f g h j k l",
					row3: "shift z x c v b n m backspace",
					row4: "alt { } space , . < >",
				},
				{
					id: "en-capital",
					row1: "Q W E R T Y U I O P",
					row2: "A S D F G H J K L",
					row3: "shift Z X C V B N M backspace",
					row4: "alt { } space , . < >",
				},
				{
					id: "numbers",
					row1: "1 2 3 4 5 6 7 8 9 0",
					row2: "@ # $ % ^ & * ( ) - +",
					row3: "! \" № ; : ? \\ | / ~ ' backspace",
					row4: "alt1 [ ] space - + < >",
				},
			],
		};
	},

	mounted() {
		this._kbMousedown = () => {
			this.pressed = true;
		};
		(this.$refs["kb-container"] as HTMLElement).addEventListener(
			"mousedown",
			this._kbMousedown!
		);

		this._onMouseup = () => {
			if (this.pressed === true) this.textbox?.focus();

			if (this.bodyControlsPressed) {
				this.hide();
				if (this.focusedInputEl) {
					delete this.focusedInputEl.dataset.focus;
					this.focusedInputEl = null;
				}
			}

			if (!this.textbox) this.hide();

			this.pressed = false;
			this.bodyControlsPressed = false;
		};
		window.addEventListener("mouseup", this._onMouseup);

		this._bodyButtons = [];
		this.$el
			.querySelectorAll(".pkb-body button")
			.forEach((button: Element) => {
				const handler = () => (this.bodyControlsPressed = true);
				button.addEventListener("mousedown", handler);
				this._bodyButtons.push({ el: button, handler });
			});

		this._inputs = [];
		this.$el
			.querySelectorAll(
				'input[type="text"], input[type="password"], input:not([type]), textarea'
			)
			.forEach((input: HTMLInputElement) => {
				const mousedownHandler = () => (this.bodyInputPressed = true);
				const clickHandler = () => {
					this.bodyInputPressed = false;
					input.dataset.focus = "focus";
					this.focusedInputEl = input;
					this.show();
					this.textbox = input;
				};
				const blurHandler = () => {
					if (!this.pressed && !this.bodyControlsPressed) {
						delete input.dataset.focus;
						if (this.focusedInputEl === input)
							this.focusedInputEl = null;
						this.textbox = null;
					}
				};
				input.addEventListener("mousedown", mousedownHandler);
				input.addEventListener("click", clickHandler);
				input.addEventListener("blur", blurHandler);
				this._inputs.push({
					el: input,
					mousedownHandler,
					clickHandler,
					blurHandler,
				});
			});
	},

	beforeUnmount() {
		(this.$refs["kb-container"] as HTMLElement).removeEventListener(
			"mousedown",
			this._kbMousedown!
		);
		window.removeEventListener("mouseup", this._onMouseup!);
		this._bodyButtons.forEach(({ el, handler }) =>
			el.removeEventListener("mousedown", handler)
		);
		this._inputs.forEach(
			({ el, mousedownHandler, clickHandler, blurHandler }) => {
				el.removeEventListener("mousedown", mousedownHandler);
				el.removeEventListener("click", clickHandler);
				el.removeEventListener("blur", blurHandler);
			}
		);
	},

	methods: {
		show() {
			this.showVirtualKeyboard = true;
			if (this.stretch) this.bodyHeight = "55vh";
		},
		hide() {
			this.showVirtualKeyboard = false;
			if (this.stretch) this.bodyHeight = "100%";
		},
		input(layer: string, key: string) {
			if (!this.textbox) return;
			this.textbox.focus();

			let start = this.textbox.selectionStart!;
			let end = this.textbox.selectionEnd!;
			this.textbox.value =
				this.textbox.value.substring(0, start) +
				key +
				this.textbox.value.substring(end);

			this.textbox.selectionEnd = start + 1;
			this.textbox.dispatchEvent(new Event("input"));

			if (this.mode === "shift" && this.layer !== "numbers") {
				if (layer === "en-capital") this.switchto("en");
				this.mode = "normal";
			}
		},

		switchto(layer: string) {
			this.prevLayer = this.layer;
			this.layer = layer;
		},

		shift(_id?: string) {
			switch (this.mode) {
				case "normal": {
					this.mode = "shift";
					this.switchto("en-capital");
					break;
				}
				case "shift": {
					this.mode = "caps";
					this.checkedShiftKeys = ["shift"];
					break;
				}
				case "caps": {
					this.mode = "normal";
					this.checkedShiftKeys = [];
					this.switchto("en");
					break;
				}
			}
		},

		keypress(key: string, layer: any) {
			let id = layer.$el.parentNode.dataset.id;

			switch (key) {
				case "shift":
					return this.shift(id);
				case "backspace":
					return this.backspace(id);
				case "alt":
					return this.switchto("numbers");
				case "alt1":
					return this.switchto(this.prevLayer!);
				case "space":
					return this.input(id, " ");
				default:
					return this.input(id, key);
			}
		},

		backspace(_id?: string) {
			if (!this.textbox) return;
			let start = this.textbox.selectionStart!;
			let end = this.textbox.selectionEnd!;

			if (start !== end) {
				this.textbox.value =
					this.textbox.value.substring(0, start) +
					this.textbox.value.substring(end);
				this.textbox.selectionEnd = start;
				this.textbox.dispatchEvent(new Event("input"));
			} else if (start) {
				this.textbox.value =
					this.textbox.value.substring(0, start - 1) +
					this.textbox.value.substring(end);
				this.textbox.selectionEnd = start - 1;
				this.textbox.dispatchEvent(new Event("input"));
			}
		},
	},
});
</script>
