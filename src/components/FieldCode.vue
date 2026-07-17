<template>
	<div class="field-code1">
		<input
			ref="refInp_1"
			type="tel"
			autofocus
			autocomplete="off"
			placeholder=""
			readonly
			v-model="inp_1"
		/>
		<input
			ref="refInp_2"
			type="tel"
			autocomplete="off"
			placeholder=""
			readonly
			v-model="inp_2"
		/>
		<input
			ref="refInp_3"
			type="tel"
			autocomplete="off"
			placeholder=""
			readonly
			v-model="inp_3"
		/>
		<input
			ref="refInp_4"
			type="tel"
			autocomplete="off"
			placeholder=""
			readonly
			v-model="inp_4"
		/>
	</div>
</template>

<style scoped>
input {
	width: 7.32vw !important;
	min-width: 7.32vw !important;
	max-width: 7.32vw !important;
	background: transparent;
	border: 0px;
	border-bottom: 0.29vw solid #fff;
	border-radius: 0px;
	margin: 0.37vw;
	color: #fff;
	padding: 0px;
	text-align: center;
	outline: 0;
}

.field-code1 {
	margin: auto;
	display: flex;
}
</style>
<script lang="ts">
export default {
	props: ["modelValue"],
	emits: ["update:modelValue"],
	data() {
		return {
			inp_1: "",
			inp_2: "",
			inp_3: "",
			inp_4: "",
		};
	},
	watch: {
		modelValue(v) {
			this.inp_1 = v[0] || "";
			this.inp_2 = v[1] || "";
			this.inp_3 = v[2] || "";
			this.inp_4 = v[3] || "";
		},
	},
};
</script>
