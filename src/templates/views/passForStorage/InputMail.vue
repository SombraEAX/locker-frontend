<template>
	<page-body>
		<page-header
			:back="ROUTE_NAME.INPUT_PHONE"
			title="Enter your email"
			subtitle="A QR code to open your cell will be sent here"
		/>

		<div class="textbox-outer">
			<div class="textbox-inner">
				<field-mail :value="mail" :valid-error="validError" />
			</div>
		</div>

		<div class="kb-outer">
			<div class="kb-inner">
				<virtual-keyboard
					row1="1 2 3 4 5 6 7 8 9 0"
					row2="q w e r t y u i o p"
					row3="a s d f g h j k l backspace"
					row4="@ z x c v b n m . -"
					clear="X"
					backspace="⌫"
					@input="input"
					@backspace="backspace"
					margin="0.29vw"
					height="100%"
					width="100%"
					font-size="5.76vh"
				/>
			</div>
		</div>

		<div class="page__body-bottom">
			<button class="btn btn-primary" @click="click">{{ text }}</button>
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
	width: 100%;
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
		height: 33.3%;
	}
}
</style>

<style>
@media (orientation: portrait) {
	.kb-inner .keyboard-button {
		font-size: 2.88vh !important;
	}
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import FieldMail from "@components/FieldMail.vue";
import VirtualKeyboard from "@components/VirtualKeyboard.vue";
import { useOrderStore } from "@/store/modules/order";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
		text() {
			return this.mail ? "next" : "skip";
		},
	},
	components: {
		PageHeader,
		PageBody,
		VirtualKeyboard,
		FieldMail,
	},
	data() {
		return {
			ROUTE_NAME,
			mail: "",
			validError: false,
		};
	},
	mounted() {
		this.mail = this.store.mail || "";
	},
	methods: {
		click() {
			if (
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
					this.mail
				) ||
				this.mail === ""
			) {
				this.store.setMail(this.mail);
				this.$router.push({ name: this.ROUTE_NAME.CONFIRMATION });
			} else {
				this.validError = true;
			}
		},
		input(value) {
			this.validError = false;
			this.mail += value;
		},
		backspace() {
			this.validError = false;
			this.mail = this.mail.substring(0, this.mail.length - 1);
		},
	},
};
</script>
