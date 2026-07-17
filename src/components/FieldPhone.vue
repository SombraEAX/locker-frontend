<template>
	<div class="field-input">
		<input
			autofocus
			readonly
			autocomplete="off"
			placeholder=""
			:class="{ 'is-danger': validError }"
			:value="formattedValue"
			required
		/>
		<label class="is-danger-label" v-if="validError"
			>Invalid phone number</label
		>
	</div>
</template>

<style scoped>
input {
	width: 100%;
	border: 0.15vw solid lightblue;
	height: 10.42vh;
	border-radius: 5.21vh;
	font-size: 2.93vw;
	padding: 1.46vw;
	box-sizing: border-box;
}
input.is-danger {
	border-color: #ff4747;
}
.field-input {
	text-align: center;
	margin-bottom: 2.2vw;
	margin-top: 1.1vw;
}
.is-danger-label {
	display: block;
	color: #ff4747;
	font-size: 2.8rem;
	line-height: 1;
	text-align: center;
	margin-top: 1rem;
	position: absolute;
	left: 0;
	right: 0;
	top: -5rem;
}
@media (orientation: portrait) {
	.field-input {
		width: 80vw;
	}
}
</style>

<script lang="ts">
export default {
	props: ["validError", "value"],
	data() {
		return {
			formattedValue: "+1 ",
		};
	},
	watch: {
		value(value) {
			this.formattedValue =
				"+1 " +
				(value[0] ? "(" + value[0] : "") +
				(value[1] || "") +
				(value[2] ? value[2] + ") " : "") +
				(value[3] || "") +
				(value[4] || "") +
				(value[5] || "") +
				(value[6] ? "-" + value[6] : "") +
				(value[7] || "") +
				(value[8] || "") +
				(value[9] || "");
		},
	},
};
</script>
