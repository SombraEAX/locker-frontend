<template>
	<div class="log-item">
		<div class="log-datetime">{{ datetime }}</div>
		<div class="log-action">Cell #{{ cell }} {{ action }}</div>
		<div class="log-phone">
			<span class="nerd" v-if="phone"> </span> {{ phone }}
		</div>
		<div class="log-mail flex">
			<span class="nerd" v-if="mail">
				<span v-if="mail == 'admin'"></span>
				<span v-else></span>
			</span>
			{{ mail }}
		</div>
	</div>
</template>
<style scoped>
.flex {
	flex: 1;
}
.log-datetime {
	width: 11.71vw;
}
.log-action {
	width: 10.62vw;
}
.log-phone {
	width: 15.36vw;
}
.log-item {
	display: flex;
	font-size: 1.35vw;
	border-bottom: 1px solid #ccc;
	padding: 0.29vw;
}
.log-item > div {
	white-space: nowrap;
	padding-left: 1.46vw;
	overflow-x: hidden;
}
</style>
<script lang="ts">
export default {
	name: "log-item",
	props: ["datetime", "cell", "action", "phone", "mail"],
};
</script>
