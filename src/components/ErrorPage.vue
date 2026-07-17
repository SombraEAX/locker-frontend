<template>
	<page-body>
		<div class="container">
			<div class="message">
				<p><slot></slot></p>
			</div>
			<div class="footer">
				<button class="btn btn-primary" @click="goback">Back</button>
			</div>
		</div>
	</page-body>
</template>

<style scoped>
.container {
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
}

.message {
	font-size: 2.93vw;
	flex: 1;
	display: flex;
}

.message > p {
	margin: auto;
	text-align: center;
}

.footer {
	display: flex;
}
.footer > button {
	margin: auto;
}
</style>

<script lang="ts">
import PageBody from "@components/PageBody.vue";
import * as timer from "@/helpers/timer.js";

export default {
	props: ["back", "timeout"],

	components: {
		PageBody,
	},

	data() {
		return { timerHandle: null };
	},

	mounted() {
		let timeout = (this.timeout || 5) * 1000;
		this.timerHandle = timer.timeout(() => this.goback(), timeout);
	},

	beforeUnmount() {
		if (this.timerHandle) this.timerHandle.clear();
	},

	methods: {
		goback() {
			try {
				if (!this.back) {
					if (window.history.length > 1) history.back();
					else this.$router.push({ name: "home" });
				} else if (
					typeof this.back === "string" &&
					this.back.startsWith("/")
				) {
					this.$router.push(this.back);
				} else if (isNaN(+this.back)) {
					this.$router.push({ name: this.back });
				} else {
					history.go(-this.back);
				}
			} catch (error) {
				this.$router.push({ name: "home" });
			}
		},
	},
};
</script>
