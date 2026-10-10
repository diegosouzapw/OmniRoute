// #13382: one Chromium process, a fresh context per request. Contexts are
// not shared, so two accounts never type into the same page. The process
// closes after it has been idle.

export const GEMINI_WEB_BROWSER_IDLE_MS = 60_000;

type Launch = (options: { headless: true }) => Promise<GeminiBrowser>;

export type GeminiBrowser = {
  isConnected?: () => boolean;
  close: () => Promise<void>;
  newContext: (options: unknown) => Promise<unknown>;
};

type Slot = { launch: Launch; browser: GeminiBrowser };

let slot: Slot | null = null;
let inflight = 0;
let idleTimer: ReturnType<typeof setTimeout> | null = null;

function alive(browser: GeminiBrowser): boolean {
  if (typeof browser.isConnected !== "function") return true;
  return browser.isConnected();
}

function clearIdle() {
  if (!idleTimer) return;
  clearTimeout(idleTimer);
  idleTimer = null;
}

export async function acquireGeminiBrowser(launch: Launch): Promise<GeminiBrowser> {
  clearIdle();
  if (slot && slot.launch === launch && alive(slot.browser)) {
    inflight += 1;
    return slot.browser;
  }
  if (slot) {
    const previous = slot.browser;
    slot = null;
    await previous.close().catch(() => undefined);
  }
  const browser = await launch({ headless: true });
  slot = { launch, browser };
  inflight += 1;
  return browser;
}

export async function releaseGeminiBrowser(browser: GeminiBrowser): Promise<void> {
  inflight = Math.max(0, inflight - 1);
  if (inflight > 0 || slot?.browser !== browser) return;
  clearIdle();
  idleTimer = setTimeout(() => {
    idleTimer = null;
    if (inflight === 0 && slot?.browser === browser) {
      slot = null;
      void browser.close().catch(() => undefined);
    }
  }, GEMINI_WEB_BROWSER_IDLE_MS);
  idleTimer.unref?.();
}

export async function resetGeminiBrowserLeaseForTests(): Promise<void> {
  clearIdle();
  inflight = 0;
  const previous = slot?.browser;
  slot = null;
  if (previous) await previous.close().catch(() => undefined);
}
