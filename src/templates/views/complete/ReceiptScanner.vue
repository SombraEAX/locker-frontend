<template>
	<page-body ref="body">
		<page-header
			title="Hold your receipt up to the camera"
			ref="header"
			:back="back"
		/>
		<canvas height="320" width="480" ref="canvas"></canvas>
	</page-body>
</template>

<script lang="ts">
import PageBody from "@components/PageBody.vue";
import PageHeader from "@components/PageHeader.vue";
import { ROUTE_NAME } from "@/helpers/constants";
import { server, startScan, stopScan, scan, checkCode } from "@/api";
import * as timer from "@/helpers/timer";
import { getHeight } from "@/helpers/format";

import { useOrderStore } from "@/store/modules/order";

type TimerHandle = { clear(): void };

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		PageBody,
		PageHeader,
	},
	data() {
		return {
			ROUTE_NAME,
			back: null as string | null,
			action: null as string | null,
			timers: [] as TimerHandle[],
			codeProcessed: false,
			_context: null as CanvasRenderingContext2D | null,
			_canvasW: 0,
			_canvasH: 0,
		};
	},
	methods: {
		//code read
		async done(code: string) {
			if (this.codeProcessed) return;
			this.codeProcessed = true;
			this.timers.forEach((t: TimerHandle) => t.clear());
			this.store.setCode(code);

			try {
				const res = await checkCode(code);
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
				}
			} catch (error) {
				return this.$router.push({
					name: this.ROUTE_NAME.INTERNAL_ERROR,
				});
			}
		},
		//navigate to next page
		next() {
			let { action } = this.$route.query;

			if (action === "extend") {
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
	async mounted() {
		let { action } = this.$route.query;

		this.action = action as string;
		this.back =
			action === "extend"
				? ROUTE_NAME.EXTEND_MENU
				: ROUTE_NAME.COMPLETE_MENU;

		let header = (this.$refs.header as InstanceType<typeof PageHeader>)
			.$el as HTMLElement;
		let body = (this.$refs.body as InstanceType<typeof PageBody>).$refs
			.body as HTMLElement;
		let canvas = this.$refs.canvas as HTMLCanvasElement;

		let bodyProps = window.getComputedStyle(body, null);

		let bodyHeight =
			body.clientHeight -
			parseFloat(bodyProps.getPropertyValue("padding-top")) -
			parseFloat(bodyProps.getPropertyValue("padding-bottom"));

		canvas.width =
			body.clientWidth -
			parseFloat(bodyProps.getPropertyValue("padding-left")) -
			parseFloat(bodyProps.getPropertyValue("padding-right"));

		canvas.height = bodyHeight - getHeight(header);

		let context = canvas.getContext("2d")!;
		this._context = context;
		this._canvasW = canvas.width;
		this._canvasH = canvas.height;
		let flag = 0;

		const isDev =
			import.meta.env.MODE !== "production" ||
			import.meta.env.VITE_USE_MOCK === "true";

		function draw() {
			let img = new Image();

			if (isDev) {
				img.src = "/scan-placeholder.svg";
			} else {
				img.src = server + "cam/" + Date.now();
			}

			img.onload = function (this: HTMLImageElement) {
				let nw = (canvas.height / this.height) * this.width;
				let w: number, h: number;

				if (nw <= canvas.width) {
					w = nw;
					h = canvas.height;
				} else {
					h = (canvas.width / this.width) * this.height;
					w = canvas.width;
				}

				context.drawImage(
					img,
					(canvas.width - w) / 2,
					(canvas.height - h) / 2,
					w,
					h
				);
				flag = 0;
			};
		}

		await startScan();

		//poll server every second to get the code from receipt
		this.timers.push(
			timer.interval(async () => {
				try {
					const code = await scan();
					if (code) {
						context.clearRect(0, 0, canvas.width, canvas.height);
						this.done(code as string);
					}
				} catch (error) {
					console.error(error);
					this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
				}
			}, 1000)
		);

		//redraw camera image every 10 milliseconds
		this.timers.push(
			timer.interval(function () {
				if (!flag) {
					flag = 1;
					draw();
				}
			}, 10)
		);
	},
	beforeUnmount() {
		this.timers.forEach((t: TimerHandle) => t.clear());
		stopScan().catch(() => {});
		if (this._context)
			this._context.clearRect(0, 0, this._canvasW, this._canvasH);
	},
};
</script>
