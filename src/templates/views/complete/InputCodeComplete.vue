<template>
	<page-body>
		<page-header title="Enter the code from your receipt" :back="back" />
		<div class="page__body-center">
			<field-code v-model="code" />
			<div class="placeholder"></div>

			<virtual-keyboard
				clear="X"
				backspace="⌫"
				row1="1 2 3"
				row2="4 5 6"
				row3="7 8 9"
				row4="backspace 0 clear"
				@input="input"
				@backspace="backspace"
				@clear="clear"
				ref="numpad"
				height="100%"
				width="30%"
				margin="0.22vw"
				font-size="4.12vh"
			/>
		</div>

		<div class="page__body-bottom">
			<report-problem :back="ROUTE_NAME.HOME" />
		</div>
	</page-body>
</template>

<style scoped>
.placeholder {
	height: 2.6vh;
}
</style>

<style>
@media (orientation: portrait) {
	.field-code1 input {
		font-size: 16.25rem !important;
		width: 18.3vw !important;
		min-width: 18.3vw !important;
		max-width: 18.3vw !important;
		height: 10vh !important;
	}
	.page__body-center > .keyboard {
		height: 50% !important;
		width: 60% !important;
	}
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import VirtualKeyboard from "@components/VirtualKeyboard.vue";
import ReportProblem from "@components/ReportProblem.vue";
import FieldCode from "@components/FieldCode.vue";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";
import { useOrderStore } from "@/store/modules/order";
import * as api from "@/api";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		VirtualKeyboard,
		PageHeader,
		PageBody,
		ReportProblem,
		FieldCode,
	},
	data() {
		return {
			ROUTE_NAME,
			code: "",
			back: null,
			action: null,
		};
	},
	mounted() {
		let { action } = this.$route.query;
		this.action = action;
		this.back =
			action === "extend"
				? ROUTE_NAME.EXTEND_MENU
				: ROUTE_NAME.COMPLETE_MENU;
	},
	methods: {
		input(value) {
			if (this.code.length < 4) this.code += value;
		},
		backspace() {
			this.code = this.code.substring(0, this.code.length - 1);
		},
		clear() {
			this.code = "";
		},
		next() {
			let action = this.action;

			if (this.action === "extend") {
				if (this.store.timeout)
					this.$router.push({
						name: this.ROUTE_NAME.PENALTY,
						query: { action },
					});
				else
					this.$router.push({
						name: this.ROUTE_NAME.CURRENT_TIME_STORAGE_EXTEND,
						query: { action },
					});
			} else {
				this.$router.push({
					name: this.ROUTE_NAME.SELECT_RENEWAL_ACTION,
					query: { action },
				});
			}
		},
	},
	watch: {
		async code(val) {
			const valStr = String(val);

			if (valStr.length === 4) {
				this.store.setCode(this.code);

				try {
					const res = await api.checkCode(this.code);
					let { status, cell } = res;

					this.store.setCell(cell);

					if (status === "error")
						return this.$router.push({
							name: this.ROUTE_NAME.INTERNAL_ERROR,
						});

					switch (status) {
						case "not found": {
							return this.$router.push({
								name: this.ROUTE_NAME.BAD_CODE,
							});
						}
						case "timeout": {
							this.store.setHasTimeout(true);
							return this.next();
						}
						case "ok": {
							this.store.setHasTimeout(false);
							return this.next();
						}
						case "block": {
							return this.$router.push({
								name: this.ROUTE_NAME.BLOCKED,
							});
						}
					}
				} catch (error) {
					return this.$router.push({
						name: this.ROUTE_NAME.INTERNAL_ERROR,
					});
				}
			}
		},
	},
};
</script>
