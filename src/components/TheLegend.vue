<template>
	<div class="legend">
		<div class="legend-icon-outer" :style="{ background: color }">
			<div class="legend-icon-inner nerd">{{ icon }}</div>
		</div>
		<div class="legend-text-outer">
			<div class="legend-text-inner">{{ text }}</div>
		</div>
	</div>
</template>
<style scoped>
.legend {
	height: 5.86vh;
	font-size: 1.83vw;
	margin-bottom: 0.65vh;
	margin-left: 0.37vw;
}
.legend,
.legend-text-outer {
	display: flex;
	align-items: center;
}
.legend-icon-outer {
	color: #fff;
	border-radius: 50%;
	font-size: 2.2vw;
	width: 3.29vw;
	height: 3.29vw;
	display: flex;
	align-items: center;
	justify-content: center;
}
.legend-text-inner {
	padding-left: 0.73vw;
	padding-right: 2.2vw;
}
.legend-icon-inner,
.legend-text-inner {
	margin: auto;
	text-align: center;
}
</style>
<script lang="ts">
export default {
	name: "TheLegend",
	props: ["icon", "color", "text"],
};
</script>
