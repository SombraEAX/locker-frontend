<template>
	<div class="bl-info-text waiting-time">
		<p>
			Waiting time: <span>{{ currentTimeFormat }}</span>
		</p>
	</div>
</template>

<style scoped>
.waiting-time {
	font-weight: 400;
	height: 9rem;
}
.waiting-time span {
	display: inline-block;
	width: 15rem;
	text-align: left;
}
</style>

<script lang="ts">
export default {
	props: {
		time: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			timer: null as ReturnType<typeof setInterval> | null,
			currentTime: this.time || 0,
		};
	},
	computed: {
		currentTimeFormat() {
			const t = Number.isFinite(this.currentTime) ? this.currentTime : 0;
			const minutes = Math.floor(t / 60);
			const seconds = t % 60;

			const minStr = minutes < 10 ? "0" + minutes : String(minutes);
			const secStr = seconds < 10 ? "0" + seconds : String(seconds);

			return `${minStr}:${secStr}`;
		},
	},
	methods: {
		startTimer() {
			this.timer = setInterval(() => {
				if (this.currentTime > 0) this.currentTime--;
			}, 1000);
		},
		stopTimer() {
			if (this.timer) clearInterval(this.timer);
		},
	},
	watch: {
		currentTime(time: number) {
			if (time <= 0) {
				this.currentTime = 0;
				this.stopTimer();
				this.$emit("stopTime");
			}
		},
	},
	mounted() {
		this.startTimer();
	},
	beforeUnmount() {
		if (this.timer) clearInterval(this.timer);
	},
};
</script>
