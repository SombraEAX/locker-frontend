<template>
	<page-body>
		<page-header
			:back="ROUTE_NAME.LICENSE"
			title="Enter your phone number"
			subtitle="A code to open your cell will be sent here"
		/>

		<div class="textbox-outer">
			<div class="textbox-inner">
				<field-phone :value="phone" :valid-error="validError" />
			</div>
		</div>

		<div class="kb-outer">
			<div class="kb-inner">
				<virtual-keyboard
					row1="1 2 3"
					row2="4 5 6"
					row3="7 8 9"
					row4="backspace 0 clear"
					clear="X"
					backspace="⌫"
					@input="input"
					@backspace="backspace"
					@clear="clear"
					margin="0.29vw"
					height="100%"
					width="100%"
					font-size="4.12vh"
				/>
			</div>
		</div>

		<div class="page__body-bottom">
			<button class="btn btn-primary" @click="next">{{ text }}</button>
		</div>
	</page-body>
</template>
<style scoped>
.kb-outer {
	text-align: center;
	flex: 1;
}
.kb-inner {
	height: 100%;
	width: 30vw;
	max-width: 100%;
	display: inline-block;
}
.textbox-outer {
	text-align: center;
}
.textbox-inner {
	display: inline-block;
}
@media (orientation: portrait) {
	.kb-inner {
		width: 80vw;
		height: 50%;
	}
	.textbox-outer {
		width: 100%;
	}
	.textbox-inner {
		display: block;
		width: 80vw;
		margin: 0 auto;
	}
}
</style>

<style>
@media (orientation: portrait) {
	.textbox-inner {
		display: block !important;
		width: 80vw !important;
		margin: 0 auto !important;
	}
	.textbox-inner .field-input {
		width: 80vw !important;
		box-sizing: border-box;
	}
	.textbox-inner input {
		width: 80vw !important;
		font-size: 5vw;
		padding: 2vw;
		box-sizing: border-box;
	}
}
</style>
<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import PageHeader from "@components/PageHeader.vue";
import VirtualKeyboard from "@components/VirtualKeyboard.vue";
import PageBody from "@components/PageBody.vue";
import FieldPhone from "@components/FieldPhone.vue";
import { useOrderStore } from "@/store/modules/order";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
		text() {
			return this.phone.length ? "next" : "skip";
		},
	},
	components: {
		PageHeader,
		VirtualKeyboard,
		PageBody,
		FieldPhone,
	},
	data() {
		return {
			ROUTE_NAME,
			phone: "",
			validError: false,
		};
	},
	mounted() {
		this.phone = this.store.phone || "";
	},
	methods: {
		next() {
			if (this.phone.length === 10 || this.phone.length === 0) {
				this.store.setPhone(this.phone);
				this.$router.push({ name: this.ROUTE_NAME.INPUT_MAIL });
			} else {
				this.validError = true;
			}
		},
		input(value) {
			this.validError = false;
			if (this.phone.length === 10) return;
			this.phone += value;
		},
		backspace() {
			this.validError = false;
			this.phone = this.phone.substring(0, this.phone.length - 1);
		},
		clear() {
			this.validError = false;
			this.phone = "";
		},
	},
};
</script>
