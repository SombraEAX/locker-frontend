<template>
	<page-body ref="body">
		<page-header
			title="Select a cell"
			ref="header"
			:back="ROUTE_NAME.SIZE_CELL"
		/>
		<LockerGrid
			ref="locker"
			@click="click"
			:cells="lockerCells"
			mode="user"
			:width="lockerWidth"
			:height="lockerHeight"
			:padding="10"
			:size="size"
		/>
		<div class="page__body-bottom" ref="footer">
			<button
				class="btn btn-primary"
				:disabled="btnDisabled"
				@click="next"
			>
				next
			</button>
		</div>
	</page-body>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";
import LockerGrid from "@components/LockerGrid.vue";
import { useOrderStore } from "@/store/modules/order";
import { getLocker } from "@/api";
import type { Locker } from "@/api/types";
import { getHeight } from "@/helpers/format";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		PageHeader,
		PageBody,
		LockerGrid,
	},
	data() {
		return {
			ROUTE_NAME,
			btnDisabled: true,
			size: null as string | null,
			cell: null as number | null,
			lockerCells: null as Locker | null,
			lockerWidth: 0,
			lockerHeight: 0,
		};
	},
	async mounted() {
		this.size = this.store.size;
		let header = (this.$refs.header as { $el: HTMLElement }).$el;
		let footer = this.$refs.footer as HTMLElement;
		let body = (this.$refs.body as { $refs: { body: HTMLElement } }).$refs
			.body;

		let bodyProps = window.getComputedStyle(body, null);

		let bodyHeight =
			body.clientHeight -
			parseFloat(bodyProps.getPropertyValue("padding-top")) -
			parseFloat(bodyProps.getPropertyValue("padding-bottom"));

		let height = bodyHeight - getHeight(header) - getHeight(footer);

		let width =
			body.clientWidth -
			parseFloat(bodyProps.getPropertyValue("padding-left")) -
			parseFloat(bodyProps.getPropertyValue("padding-right"));

		try {
			const cells = await getLocker();
			this.lockerCells = cells;
			this.lockerWidth = width;
			this.lockerHeight = height;
		} catch (error) {
			return this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
		}
	},
	methods: {
		click(id: number) {
			this.btnDisabled = false;
			this.cell = id;
		},
		next() {
			this.store.setCell(this.cell as number);
			this.$router.push({ name: this.ROUTE_NAME.SELECT_TIME_STORAGE });
		},
	},
};
</script>
