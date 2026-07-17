<template>
	<div class="shutdown-outer">
		<div class="shutdown-inner">Shutting down...</div>
	</div>
</template>
<style scoped>
.shutdown-outer {
	width: 100%;
	height: 100%;
	background: #000;
	color: #fff;
	font-size: 2.93vw;
	text-align: center;
	display: flex;
}
.shutdown-inner {
	margin: auto;
	display: inline-block;
}
</style>
<script lang="ts">
import * as api from "@/api";

export default {
	name: "ShutdownPage",

	async mounted() {
		let { action } = this.$route.query;

		if (action === "reboot") await api.reboot();
		else await api.shutdown();
	},
};
</script>
