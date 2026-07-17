<template>
	<div class="counter">
		<div class="counter__minus" @click="minus">-</div>
		<div class="counter__input">
			<input type="text" placeholder="" :value="counterFormat" readonly />
		</div>
		<div class="counter__plus" @click="plus">+</div>
	</div>
</template>

<style scoped>
.counter {
	display: flex;
	align-items: center;
	height: 100%;
	max-height: 16.8rem;
	margin-bottom: 3rem;
}
.counter__input {
	height: 100%;
	width: 100%;
	max-width: 24rem;
	margin: 0 2rem;
}
.counter__input input {
	text-align: center;
	font-size: 6.9rem;
	font-weight: 700;
	padding-bottom: 0;
}
.counter__minus,
.counter__plus {
	font-size: 9rem;
	line-height: 0.7;
	font-weight: 700;
	margin-bottom: 1rem;
	cursor: default;
}
@media (orientation: portrait) {
	.counter {
		max-height: 50.4rem;
		margin-bottom: 9rem;
	}
	.counter__input {
		max-width: 72rem;
		margin: 0 6rem;
	}
	.counter__input input {
		font-size: 20.7rem;
	}
	.counter__minus,
	.counter__plus {
		font-size: 27rem;
	}
}
</style>

<script lang="ts">
export default {
	props: {
		initial: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			counter: this.initial,
		};
	},
	computed: {
		counterFormat() {
			return `${this.counter} hr`;
		},
	},
	watch: {
		initial(val) {
			this.counter = val;
		},
		counter(val) {
			this.$emit("changeHandler", val);
		},
	},
	methods: {
		plus() {
			this.counter++;
		},
		minus() {
			if (this.counter > 1) {
				this.counter--;
			}
		},
	},
};
</script>
