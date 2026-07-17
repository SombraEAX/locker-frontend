import type { CellInfo, CheckCodeStatus, DateRange, Locker, LogEntry, PenaltyInfo, Size, Times } from './types'
import lockerJson from './locker.json'

let isDev =
  import.meta.env.MODE !== "production" || import.meta.env.VITE_USE_MOCK === "true";
const server: string = import.meta.env.VITE_API_URL;
const REQUEST_TIMEOUT = 15000;

export { server };

let debugTimeout = true;

// Dev mock state
let _isPaidCount = 0;
let _isOpenCount = 0;
let _scanCount = 0;

function buildUrl(path: string, params: Record<string, unknown> = {}): string {
  const query = Object.entries(params)
    .filter(([, val]) => val !== undefined && val !== null)
    .map(
      ([key, val]) => encodeURIComponent(key) + "=" + encodeURIComponent(String(val))
    )
    .join("&");

  return server + path + (query ? "?" + query : "");
}

function load(path: string, params: Record<string, unknown> = {}, options: { method?: string } = {}): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  return fetch(buildUrl(path, params), {
    method: options.method || "GET",
    signal: controller.signal,
  })
    .finally(() => clearTimeout(timer))
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.json();
    });
}

export async function extend(cell: number, hours: number): Promise<boolean | unknown> {
  if (isDev) return true;
  return load("extend", { cell, hours });
}

export async function isPaid(): Promise<string> {
  if (!isDev) return load("is-paid") as Promise<string>;

  if (_isPaidCount === 5) {
    _isPaidCount = 0;
    return "success";
  } else {
    _isPaidCount++;
    return "wait";
  }
}

export async function close(): Promise<boolean | unknown> {
  if (isDev) return true;
  return load("close");
}

export async function invoice(sum: number): Promise<boolean | unknown> {
  if (isDev) return true;
  return load("invoice", { sum });
}

export async function getLocker(): Promise<Locker> {
  if (isDev) return lockerJson as Locker;
  return load("get-locker") as Promise<Locker>;
}

export async function getSizes(): Promise<{ sizes: Size[] }> {
  if (isDev) {
    const sizes: Size[] = [
      { id: "M", size: "15x20", price: 50, available: true },
      { id: "L", size: "15x20", price: 100, available: true },
      { id: "XL", size: "15x20", price: 150, available: true },
    ];
    return { sizes };
  }

  return load("get-sizes") as Promise<{ sizes: Size[] }>;
}

export async function cellsBusy(): Promise<{ busy: boolean }> {
  if (isDev) return { busy: false };
  return load("busy") as Promise<{ busy: boolean }>;
}

export async function getTimeout(): Promise<number> {
  if (isDev) return 15;
  return load("get-timeout") as Promise<number>;
}

export async function isOpen(cell: number): Promise<boolean> {
  if (!isDev) return load("is-open", { cell }) as Promise<boolean>;

  if (_isOpenCount === 5) {
    _isOpenCount = 0;
    return false;
  } else {
    _isOpenCount++;
    return true;
  }
}

export async function openCell({ cell, phone = "", mail }: { cell: number; phone?: string; mail: string }): Promise<boolean | unknown> {
  if (isDev) return true;
  return load("open-cell", { cell, phone, mail });
}

export async function storageBegin(params: Record<string, unknown>): Promise<boolean | unknown> {
  if (isDev) return true;
  return load("storage-begin", params);
}

export async function checkCode(code: string): Promise<{ status: CheckCodeStatus; cell: number }> {
  if (isDev) {
    if (code === "0000") return { status: "block", cell: 1 };

    return { status: debugTimeout ? "timeout" : "ok", cell: 1 };
  }

  return load("check-code", { code }) as Promise<{ status: CheckCodeStatus; cell: number }>;
}

export async function startScan(): Promise<void | unknown> {
  if (isDev) return;
  return load("start-scan");
}

export async function stopScan(): Promise<void | unknown> {
  if (isDev) return;
  return load("stop-scan");
}

export async function scan(): Promise<string | null | unknown> {
  if (isDev) {
    if (_scanCount === 5) {
      _scanCount = 0;
      return "2022";
    }
    _scanCount++;
    return null;
  } else {
    return load("scan");
  }
}

export async function complete(cell: number): Promise<void | unknown> {
  if (isDev) return;
  return load("complete", { cell });
}

export async function getPenaltyInfo(cell: number): Promise<PenaltyInfo> {
  if (isDev) return { timeout: "6h", penalty: 500 };
  return load("get-penalty-info", { cell }) as Promise<PenaltyInfo>;
}

export async function finePaid(cell: number): Promise<boolean | unknown> {
  if (isDev) {
    debugTimeout = false;
    return true;
  }
  return load("fine-paid", { cell });
}

export async function getTime(cell: number): Promise<number> {
  if (isDev) return 10000;
  return load("get-time", { cell }) as Promise<number>;
}

export async function getPrice(cell: number): Promise<number> {
  if (isDev) return 150;
  return load("get-price", { cell }) as Promise<number>;
}

export async function shutdown(): Promise<void | unknown> {
  if (isDev)
    return new Promise((resolve) =>
      setTimeout(() => {
        // placeholder
        resolve(undefined);
      }, 1500)
    );

  return load("shutdown");
}

export async function reboot(): Promise<void | unknown> {
  if (isDev)
    return new Promise((resolve) =>
      setTimeout(() => {
        // placeholder
        resolve(undefined);
      }, 1500)
    );

  return load("reboot");
}

export async function getHardwareInfo(): Promise<{ temp: number; online: boolean }> {
  if (isDev) return { temp: 52, online: true };
  return load("get-hardware-info") as Promise<{ temp: number; online: boolean }>;
}

let dev_log_id = 0;

export async function getLog(start: DateRange, end: DateRange, offset: number): Promise<LogEntry[]> {
  if (isDev) {
    let res: LogEntry[] = [];
    const datetime: number = new Date().getTime() / 1000;

    for (let i = 0; i < 30; i++) {
      res.push({
        datetime,
        cell: 1,
        action: "open",
        mail: `page${offset}.item${i}@example.com`,
        phone: `+1${200 + Math.floor(Math.random() * 800)}${
          1000000 + Math.floor(Math.random() * 9000000)
        }`,
        id: dev_log_id++,
      });
    }

    return res;
  }

  const args: Record<string, unknown> = {
    "start-year": start.year,
    "start-month": start.month,
    "start-day": start.day,
    "end-year": end.year,
    "end-month": end.month,
    "end-day": end.day,
    offset: offset,
  };

  return load("get-log", args) as Promise<LogEntry[]>;
}

export async function block(id: number): Promise<void | unknown> {
  if (isDev) return;
  return load("block", { id });
}

export async function unblock(id: number): Promise<void | unknown> {
  if (isDev) return;
  return load("unblock", { id });
}

export async function getTimes(id: number): Promise<Times> {
  if (isDev)
    return {
      start: new Date().getTime(),
      end: new Date().getTime(),
    };
  return load("get-times", { id }) as Promise<Times>;
}

export async function getCellInfo(code: string): Promise<CellInfo> {
  if (isDev)
    return {
      phone: "6667771111",
      mail: "megaman@example.com",
    };
  return load("get-cell-info", { code }) as Promise<CellInfo>;
}
