import { ROUTE_NAME } from "@/helpers/constants";

const HomeView = () => import("@/templates/views/HomeView.vue");
const LicenseAgreement = () => import("@/templates/views/passForStorage/LicenseAgreement.vue");
const CellsBusy = () =>
  import("@/templates/views/passForStorage/CellsBusy.vue");
const NotEnoughMoney = () =>
  import("@/templates/views/passForStorage/NotEnoughMoney.vue");
const InternalError = () =>
  import("@/templates/views/passForStorage/InternalError.vue");
const TimeoutPage = () => import("@/templates/views/passForStorage/TimeoutPage.vue");
const SizeCell = () => import("@/templates/views/passForStorage/SizeCell.vue");
const SelectCell = () =>
  import("@/templates/views/passForStorage/SelectCell.vue");
const SelectTimeStorage = () =>
  import("@/templates/views/passForStorage/SelectTimeStorage.vue");
const SelectTimeStorageExtend = () =>
  import("@/templates/views/extend/SelectTimeStorageExtend.vue");
const SelectRenewalAction = () =>
  import("@/templates/views/complete/SelectRenewalAction.vue");
const CurrentTimeStorageExtend = () =>
  import("@/templates/views/extend/CurrentTimeStorageExtend.vue");
const CurrentTimeStorageCompleteOpen = () =>
  import("@/templates/views/complete/CurrentTimeStorageCompleteOpen.vue");
const CurrentTimeStorageCompleteClose = () =>
  import("@/templates/views/complete/CurrentTimeStorageCompleteClose.vue");
const PaidSuccessfullyStorage = () =>
  import("@/templates/views/passForStorage/PaidSuccessfullyStorage.vue");
const PaidSuccessfullyStorageExtend = () =>
  import("@/templates/views/extend/PaidSuccessfullyStorageExtend.vue");
const CellIsOpen = () =>
  import("@/templates/views/passForStorage/CellIsOpen.vue");
const CellIsOpenCompleteTime = () =>
  import("@/templates/views/complete/CellIsOpenCompleteTime.vue");
const CellIsOpenCompleteOpen = () =>
  import("@/templates/views/complete/CellIsOpenCompleteOpen.vue");
const CompletionMenu = () => import("@/templates/views/complete/CompletionMenu.vue");
const ExtendMenuPage = () => import("@/templates/views/extend/ExtendMenuPage.vue");
const ReceiptScanner = () => import("@/templates/views/complete/ReceiptScanner.vue");
const PickupPage = () => import("@/templates/views/complete/PickupPage.vue");
const PenaltyPage = () => import("@/templates/views/complete/PenaltyPage.vue");
const FinePaid = () => import("@/templates/views/complete/FinePaid.vue");
const BlockedPage = () => import("@/templates/views/BlockedPage.vue");
const StorageBegin = () =>
  import("@/templates/views/passForStorage/StorageBegin.vue");
const StorageCloseComplete = () =>
  import("@/templates/views/complete/StorageCloseComplete.vue");
const StorageFinishComplete = () =>
  import("@/templates/views/complete/StorageFinishComplete.vue");
const ErrorView = () => import("@/templates/views/ErrorView.vue");
const InputPhone = () =>
  import("@/templates/views/passForStorage/InputPhone.vue");
const InputMail = () =>
  import("@/templates/views/passForStorage/InputMail.vue");
const InputCodeComplete = () =>
  import("@/templates/views/complete/InputCodeComplete.vue");
const StorageConfirmation = () =>
  import("@/templates/views/passForStorage/StorageConfirmation.vue");
const ConfirmationExtend = () =>
  import("@/templates/views/extend/ConfirmationExtend.vue");
const StoragePayment = () => import("@/templates/views/passForStorage/StoragePayment.vue");
const PaymentExtend = () =>
  import("@/templates/views/extend/PaymentExtend.vue");
const NotFoundPage = () => import("@/templates/views/NotFoundPage.vue");
const ReportPage = () => import("@/templates/views/ReportPage.vue");
const AuthError = () => import("@/templates/views/AuthError.vue");
const BadCode = () => import("@/templates/views/complete/BadCode.vue");
const SecretMenu = () => import("@/templates/views/SecretMenu.vue");
const AdminPanel = () => import("@/templates/views/AdminPanel.vue");
const ShutdownPage = () => import("@/templates/views/ShutdownPage.vue");

export const routes = [
  {
    name: ROUTE_NAME.BLOCKED,
    path: "/blocked",
    component: BlockedPage,
  },
  {
    name: ROUTE_NAME.SHUTDOWN,
    path: "/shutdown",
    component: ShutdownPage,
  },
  {
    name: ROUTE_NAME.ADMIN,
    path: "/admin",
    component: AdminPanel,
  },
  {
    name: ROUTE_NAME.AUTH_ERROR,
    path: "/auth-error",
    component: AuthError,
  },
  {
    name: ROUTE_NAME.SECRET_MENU,
    path: "/secret-menu",
    component: SecretMenu,
  },
  {
    name: ROUTE_NAME.EXTEND_MENU,
    path: "/extend-menu",
    component: ExtendMenuPage,
  },
  {
    name: ROUTE_NAME.FINE_PAID,
    path: "/fine-paid",
    component: FinePaid,
  },
  {
    name: ROUTE_NAME.PICKUP,
    path: "/pickup",
    component: PickupPage,
  },
  {
    name: ROUTE_NAME.PENALTY,
    path: "/penalty",
    component: PenaltyPage,
  },
  {
    name: ROUTE_NAME.SCAN,
    path: "/scan",
    component: ReceiptScanner,
  },
  {
    name: ROUTE_NAME.BAD_CODE,
    path: "/bad-code",
    component: BadCode,
  },
  {
    name: ROUTE_NAME.COMPLETE_MENU,
    path: "/complete-menu",
    component: CompletionMenu,
  },
  {
    name: ROUTE_NAME.INTERNAL_ERROR,
    path: "/internal-error",
    component: InternalError,
  },
  {
    name: ROUTE_NAME.TIMEOUT,
    path: "/timeout",
    component: TimeoutPage,
  },
  {
    name: ROUTE_NAME.NOT_ENOUGH_MONEY,
    path: "/not-enough-money",
    component: NotEnoughMoney,
  },
  {
    name: ROUTE_NAME.CELLS_BUSY,
    path: "/cells-busy",
    component: CellsBusy,
  },
  {
    name: ROUTE_NAME.REPORT,
    path: "/report",
    component: ReportPage,
  },
  {
    name: ROUTE_NAME.INPUT_MAIL,
    path: "/input-mail",
    component: InputMail,
  },
  {
    name: ROUTE_NAME.LICENSE,
    path: "/license",
    component: LicenseAgreement,
  },
  {
    name: ROUTE_NAME.HOME,
    path: "/",
    component: HomeView,
  },
  {
    name: ROUTE_NAME.SIZE_CELL,
    path: "/size-cell",
    component: SizeCell,
  },
  {
    name: ROUTE_NAME.SELECT_CELL,
    path: "/select-cell",
    component: SelectCell,
  },
  {
    name: ROUTE_NAME.SELECT_TIME_STORAGE,
    path: "/select-time-storage",
    component: SelectTimeStorage,
  },
  {
    name: ROUTE_NAME.SELECT_TIME_STORAGE_EXTEND,
    path: "/select-time-storage-extend",
    component: SelectTimeStorageExtend,
  },
  {
    name: ROUTE_NAME.INPUT_PHONE,
    path: "/input-phone",
    component: InputPhone,
  },
  {
    name: ROUTE_NAME.CONFIRMATION,
    path: "/confirmation",
    component: StorageConfirmation,
  },
  {
    name: ROUTE_NAME.CONFIRMATION_EXTEND,
    path: "/confirmation-extend",
    component: ConfirmationExtend,
  },
  {
    name: ROUTE_NAME.PAYMENT,
    path: "/payment",
    component: StoragePayment,
  },
  {
    name: ROUTE_NAME.PAYMENT_EXTEND,
    path: "/payment-extend",
    component: PaymentExtend,
  },
  {
    name: ROUTE_NAME.INPUT_CODE_COMPLETE,
    path: "/input-code-complete",
    component: InputCodeComplete,
  },
  {
    name: ROUTE_NAME.CURRENT_TIME_STORAGE_EXTEND,
    path: "/current-time-storage-extend",
    component: CurrentTimeStorageExtend,
  },
  {
    name: ROUTE_NAME.CURRENT_TIME_STORAGE_COMPLETE_OPEN,
    path: "/current-time-storage-complete-open",
    component: CurrentTimeStorageCompleteOpen,
  },
  {
    name: ROUTE_NAME.CURRENT_TIME_STORAGE_COMPLETE_CLOSE,
    path: "/current-time-storage-complete-close",
    component: CurrentTimeStorageCompleteClose,
  },
  {
    name: ROUTE_NAME.SELECT_RENEWAL_ACTION,
    path: "/select-renewal-action",
    component: SelectRenewalAction,
  },
  {
    name: ROUTE_NAME.PAID_SUCCESSFULLY_STORAGE,
    path: "/paid-successfully-storage",
    component: PaidSuccessfullyStorage,
  },
  {
    name: ROUTE_NAME.PAID_SUCCESSFULLY_STORAGE_EXTEND,
    path: "/paid-successfully-storage-extend",
    component: PaidSuccessfullyStorageExtend,
  },
  {
    name: ROUTE_NAME.CELL_IS_OPEN,
    path: "/cell-is-open",
    component: CellIsOpen,
  },
  {
    name: ROUTE_NAME.CELL_IS_OPEN_COMPLETE_TIME,
    path: "/cell-is-open-complete-time",
    component: CellIsOpenCompleteTime,
  },
  {
    name: ROUTE_NAME.CELL_IS_OPEN_COMPLETE_OPEN,
    path: "/cell-is-open-complete-open",
    component: CellIsOpenCompleteOpen,
  },
  {
    name: ROUTE_NAME.STORAGE_BEGIN,
    path: "/storage-begin",
    component: StorageBegin,
  },
  {
    name: ROUTE_NAME.STORAGE_CLOSE_COMPLETE,
    path: "/storage-close-complete",
    component: StorageCloseComplete,
  },
  {
    name: ROUTE_NAME.STORAGE_FINISH_COMPLETE,
    path: "/storage-finish-complete",
    component: StorageFinishComplete,
  },
  {
    name: ROUTE_NAME.ERROR,
    path: "/error",
    component: ErrorView,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
    name: "404",
  },
];
