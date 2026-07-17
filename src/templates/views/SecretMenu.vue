<template>
	<page-with-keyboard stretch="stretch">
		<div class="auth-container">
			<div class="auth-leftbox">
				<page-header title="" :back="ROUTE_NAME.HOME" />
			</div>
			<div class="auth-form">
				<div class="auth-form-inner">
					<input ref="login" placeholder="Username" />
					<input
						ref="password"
						placeholder="Password"
						type="password"
					/>
					<button @click="next">Next</button>
				</div>
			</div>
		</div>
	</page-with-keyboard>
</template>
<style scoped>
.auth-container {
	height: 100%;
	display: flex;
}
.auth-leftbox {
	width: 33vw;
	padding-top: 2.93vw;
}
input {
	outline: none;
	border: 0.22vw solid lightblue;
	border-radius: 0.29vw;
}
input[data-focus] {
	border-color: orange;
}
.auth-form {
	display: flex;
	text-align: center;
	width: 33vw;
	height: 100%;
}
.auth-form-inner {
	width: 100%;
	margin: auto;
	display: flex;
	flex-direction: column;
}
.auth-form-inner > * {
	width: 100%;
	height: 10vh;
	margin: 0.73vw;
	box-sizing: border-box;
	font-size: 1.46vw;
	padding-left: 0.73vw;
}
@media (orientation: portrait) {
	.auth-container {
		justify-content: center;
	}
	.auth-leftbox {
		position: fixed;
		top: 0;
		left: 0;
		width: auto;
		padding: 2.93vw;
		z-index: 10;
	}
	.auth-form {
		width: 66vw;
	}
	.auth-form-inner > * {
		height: 5vh;
		font-size: 4.38vw;
	}
}
</style>

<style>
@media (orientation: portrait) {
	.pkb-kb {
		height: 22.5vh !important;
		width: 95vw !important;
		left: 2.5vw !important;
		right: 2.5vw !important;
	}
}
</style>
<script lang="ts">
import PageWithKeyboard from "@components/PageWithKB.vue";
import { ROUTE_NAME } from "@/helpers/constants";
import PageHeader from "@components/PageHeader.vue";

export default {
	components: {
		PageWithKeyboard,
		PageHeader,
	},
	data() {
		return {
			ROUTE_NAME,
		};
	},
	methods: {
		next() {
			let login = this.$refs.login.value;
			let password = this.$refs.password.value;

			if (
				login === import.meta.env.VITE_ADMIN_LOGIN &&
				password === import.meta.env.VITE_ADMIN_PASSWORD
			) {
				this.$router.push({ name: ROUTE_NAME.ADMIN });
			} else {
				this.$router.push({ name: ROUTE_NAME.AUTH_ERROR });
			}
		},
	},
};
</script>
