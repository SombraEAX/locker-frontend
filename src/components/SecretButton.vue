<template>
	<div class="secret-button" @click="click"></div>
</template>
<style scoped>
.secret-button {
	position: fixed;
	top: 0px;
	left: 0px;
	bottom: 0px;
	width: 7.32vw;
}
</style>
<script lang="ts">
const SECRET_CLICK_THRESHOLD = 3;

export default {
	emits: ["activate"],
	data() {
		return {
			count: 0,
		};
	},
	methods: {
		click() {
			if (++this.count === SECRET_CLICK_THRESHOLD) {
				this.count = 0;
				this.$emit("activate");
			}
		},
	},
};
</script>
