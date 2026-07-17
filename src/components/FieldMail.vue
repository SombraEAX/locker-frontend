<template>
	<div class="field-input">
		<label :class="{ error: true, visible: validError }"
			>Invalid email</label
		>
		<input
			autofocus
			readonly
			autocomplete="off"
			placeholder="Enter email"
			:class="{ 'is-danger': validError }"
			:value="value"
			required
		/>
	</div>
</template>

<style scoped>
.error {
	font-size: 1.83vw;
	color: #ff4747;
	visibility: hidden;
	line-height: 1.83vw;
	height: 3.26vh;
	display: inline-block;
	margin-bottom: 0.73vw;
}
.visible {
	visibility: visible;
}
input {
	border: 0.15vw solid lightblue;
	height: 10.42vh;
	width: 100%;
	border-radius: 5.21vh;
	font-size: 2.93vw !important;
	padding: 1.46vw;
	box-sizing: border-box;
}
input.is-danger {
	border-color: #ff4747;
}
.field-input {
	text-align: center;
	padding-bottom: 2.2vw;
	margin-top: -2.2vw;
}
</style>

<script lang="ts">
export default {
	props: ["validError", "value"],
};
</script>
