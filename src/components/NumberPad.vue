<template>
	<div class="numpad">
		<div class="row">
			<button @click="input(1)">1</button>
			<button @click="input(2)">2</button>
			<button @click="input(3)">3</button>
		</div>
		<div class="row">
			<button @click="input(4)">4</button>
			<button @click="input(5)">5</button>
			<button @click="input(6)">6</button>
		</div>
		<div class="row">
			<button @click="input(7)">7</button>
			<button @click="input(8)">8</button>
			<button @click="input(9)">9</button>
		</div>
		<div class="row">
			<button @click="backspace">⌫</button>
			<button @click="input(0)">0</button>
			<button @click="clear">x</button>
		</div>
	</div>
</template>

<style scoped>
button {
	width: 5.49vw;
	height: 7.81vh;
	margin: 0.29vw;
	border: 0px;
	border-radius: 0.29vw;
	background: #fff;
	font-size: 2.2vw;
}
button:active {
	background: yellow;
}
</style>

<script lang="ts">
export default {
	name: "NumberPad",
	methods: {
		input(value) {
			this.$emit("input", value);
		},
		backspace() {
			this.$emit("backspace");
		},
		clear() {
			this.$emit("clear");
		},
	},
};
</script>
