<template>
	<button
		:class="'listbox-' + direction"
		@mousedown="$emit('mousedown')"
		@mouseup="$emit('mouseup')"
		@mouseleave="$emit('mouseleave')"
		@touchstart.prevent="$emit('mousedown')"
		@touchend="$emit('touchend')"
		@contextmenu.prevent
	>
		<span v-if="direction === 'up'">▲</span>
		<span v-else>▼</span>
	</button>
</template>
<style scoped>
button {
	z-index: 50;
	width: 100%;
	height: 10.42vh;
	font-size: 2.2vw;
	position: absolute;
	left: 0px;
	right: 0px;
	border-radius: 0px;
	border: 0px;
	background: #ccc;
	touch-action: manipulation;
	-webkit-user-select: none;
	user-select: none;
}
button:active {
	background: orange;
}
.listbox-up {
	top: 0px;
	border-bottom: 1px solid grey;
}
.listbox-dn {
	bottom: 0px;
	border-top: 1px solid grey;
}
</style>
<style>
@media (orientation: portrait) {
	.listbox-up, .listbox-dn {
		height: 5.21vh !important;
	}
}
</style>
<script lang="ts">
export default {
	name: "ListBoxButton",
	props: ["direction"],
};
</script>
