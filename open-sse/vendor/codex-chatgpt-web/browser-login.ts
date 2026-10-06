/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { chromium, type BrowserContextOptions } from "playwright-core";
import type { AppConfig } from "./config";
import { atomicWriteFile } from "./config";
import {
  assertAuthenticatedChatGptPage,
  assertTemporaryChatPage,
  CHATGPT_COMPOSER_SELECTOR,
  CHATGPT_TEMPORARY_CHAT_URL,
  detectChatGptAccountCapabilities,
} from "./chatgpt-session";
import type { ChatGptWebAccountCapabilities } from "./chatgpt-web-models";

export interface BrowserLoginResult {
  storageStatePath: string;
  accountSurfaceUrl: string;
  solAvailable: boolean;
  proAvailable: boolean;
}

export type BrowserLoginConfig = Pick<
  AppConfig,
  "appName" | "storageStatePath" | "headed" | "proAvailable" | "autoApproveToolCalls"
> & {
  chromeExecutablePath?: string;
  cdpEndpoint?: string;
};

interface LoginVerificationMarker {
  version: 1;
  authenticated: true;
  verifiedAt: string;
  solAvailable?: boolean;
  proAvailable?: boolean;
  cookieFingerprint?: string;
  storageStateFingerprint?: string;
  pendingBrowserVerification?: boolean;
}

export function loginVerificationMarkerPath(storageStatePath: string): string {
  return `${storageStatePath}.verified.json`;
}

export function writeVerificationMarker(
  storageStatePath: string,
  capabilities: ChatGptWebAccountCapabilities
): void {
  let previous: Partial<LoginVerificationMarker> = {};
  try {
    previous = JSON.parse(
      readFileSync(loginVerificationMarkerPath(storageStatePath), "utf8")
    ) as Partial<LoginVerificationMarker>;
  } catch {
    // No prior cookie-injection marker.
  }
  let storageStateFingerprint = previous.storageStateFingerprint;
  try {
    const state = JSON.parse(readFileSync(storageStatePath, "utf8")) as Record<string, unknown>;
    storageStateFingerprint = createHash("sha256").update(JSON.stringify(state)).digest("hex");
  } catch {
    // The caller that owns storage-state validation reports malformed state.
  }
  const marker: LoginVerificationMarker = {
    version: 1,
    authenticated: true,
    verifiedAt: new Date().toISOString(),
    ...capabilities,
    ...(previous.cookieFingerprint ? { cookieFingerprint: previous.cookieFingerprint } : {}),
    ...(storageStateFingerprint ? { storageStateFingerprint } : {}),
    pendingBrowserVerification: false,
  };
  atomicWriteFile(loginVerificationMarkerPath(storageStatePath), `${JSON.stringify(marker)}\n`);
}

async function inspectStoredState(
  config: BrowserLoginConfig,
  storageState: NonNullable<BrowserContextOptions["storageState"]>
): Promise<ChatGptWebAccountCapabilities & { url: string }> {
  if (!config.cdpEndpoint && !config.chromeExecutablePath) {
    throw new Error("ChatGPT browser verification requires Chrome or a CDP endpoint");
  }
  const verifierBrowser = config.cdpEndpoint
    ? await chromium.connectOverCDP(config.cdpEndpoint)
    : await chromium.launch({
        executablePath: config.chromeExecutablePath,
        headless: false,
        ignoreDefaultArgs: ["--password-store=basic", "--use-mock-keychain"],
        args: ["--no-first-run", "--no-default-browser-check"],
      });
  try {
    const verifierContext = await verifierBrowser.newContext({ storageState });
    try {
      const verifierPage = await verifierContext.newPage();
      await verifierPage.goto(CHATGPT_TEMPORARY_CHAT_URL, {
        waitUntil: "domcontentloaded",
        timeout: 60_000,
      });
      await verifierPage
        .locator(CHATGPT_COMPOSER_SELECTOR)
        .first()
        .waitFor({ state: "visible", timeout: 60_000 });
      await assertAuthenticatedChatGptPage(verifierPage);
      await assertTemporaryChatPage(verifierPage);
      return { ...(await detectChatGptAccountCapabilities(verifierPage)), url: verifierPage.url() };
    } finally {
      await verifierContext.close();
    }
  } finally {
    await verifierBrowser.close();
  }
}

export async function inspectBrowserLoginCapabilities(
  config: BrowserLoginConfig
): Promise<ChatGptWebAccountCapabilities> {
  if (
    !existsSync(config.storageStatePath) ||
    !existsSync(loginVerificationMarkerPath(config.storageStatePath))
  ) {
    throw new Error("ChatGPT login state is missing");
  }
  const inspected = await inspectStoredState(config, config.storageStatePath);
  writeVerificationMarker(config.storageStatePath, inspected);
  return { solAvailable: inspected.solAvailable, proAvailable: inspected.proAvailable };
}

export function storedBrowserLoginCapabilities(
  config: BrowserLoginConfig
): Partial<ChatGptWebAccountCapabilities> {
  if (!browserLoginStateExists(config)) return {};
  try {
    const marker = JSON.parse(
      readFileSync(loginVerificationMarkerPath(config.storageStatePath), "utf8")
    ) as Partial<LoginVerificationMarker>;
    return {
      ...(typeof marker.solAvailable === "boolean" ? { solAvailable: marker.solAvailable } : {}),
      ...(typeof marker.proAvailable === "boolean" ? { proAvailable: marker.proAvailable } : {}),
    };
  } catch {
    return {};
  }
}

export async function loginToChatGpt(
  config: AppConfig,
  options: { timeoutMs?: number } = {}
): Promise<BrowserLoginResult> {
  if (!existsSync(config.chromeExecutablePath)) {
    throw new Error(
      `Google Chrome was not found at ${config.chromeExecutablePath}. Pass --chrome with its executable path.`
    );
  }
  const profileDir = join(dirname(config.storageStatePath), "login-profile");
  mkdirSync(profileDir, { recursive: true, mode: 0o700 });
  process.stdout.write(
    "A normal Chrome window is open. Sign in to ChatGPT, confirm that the composer is visible, then quit this dedicated Chrome instance completely.\n"
  );
  const loginBrowser = spawn(
    config.chromeExecutablePath,
    [
      `--user-data-dir=${profileDir}`,
      "--new-window",
      "--disable-background-mode",
      "--no-first-run",
      "--no-default-browser-check",
      CHATGPT_TEMPORARY_CHAT_URL,
    ],
    { env: process.env, stdio: "ignore" }
  );
  const loginExit = await new Promise<number>((resolveExit, rejectExit) => {
    loginBrowser.once("error", rejectExit);
    loginBrowser.once("exit", (code, signal) => {
      if (signal) rejectExit(new Error(`Normal Chrome login window exited from signal ${signal}`));
      else resolveExit(code ?? 1);
    });
  });
  if (loginExit !== 0)
    throw new Error(`Normal Chrome login window exited with status ${loginExit}`);

  const context = await chromium.launchPersistentContext(profileDir, {
    executablePath: config.chromeExecutablePath,
    headless: false,
    ignoreDefaultArgs: ["--password-store=basic", "--use-mock-keychain"],
    args: ["--no-first-run", "--no-default-browser-check"],
  });
  try {
    const page = context.pages()[0] ?? (await context.newPage());
    await page.goto(CHATGPT_TEMPORARY_CHAT_URL, {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    const composer = page.locator(CHATGPT_COMPOSER_SELECTOR).first();
    try {
      await composer.waitFor({ state: "visible", timeout: options.timeoutMs ?? 60_000 });
    } catch {
      throw new Error("The authenticated ChatGPT page did not produce a visible composer");
    }
    await assertAuthenticatedChatGptPage(page);
    await assertTemporaryChatPage(page);
    const state = await context.storageState();

    const inspected = await inspectStoredState(config, state);
    atomicWriteFile(config.storageStatePath, `${JSON.stringify(state)}\n`);
    writeVerificationMarker(config.storageStatePath, inspected);
    return {
      storageStatePath: config.storageStatePath,
      accountSurfaceUrl: page.url(),
      solAvailable: inspected.solAvailable,
      proAvailable: inspected.proAvailable,
    };
  } finally {
    await context.close();
    if (browserLoginStateExists(config)) rmSync(profileDir, { recursive: true, force: true });
  }
}

export function browserLoginStateExists(
  config: Pick<BrowserLoginConfig, "storageStatePath">
): boolean {
  if (!existsSync(config.storageStatePath)) return false;
  const markerPath = loginVerificationMarkerPath(config.storageStatePath);
  if (!existsSync(markerPath)) return false;
  try {
    const marker = JSON.parse(readFileSync(markerPath, "utf8")) as Partial<LoginVerificationMarker>;
    return (
      marker.version === 1 &&
      marker.authenticated === true &&
      marker.pendingBrowserVerification !== true &&
      typeof marker.verifiedAt === "string"
    );
  } catch {
    return false;
  }
}

export async function checkBrowserEngine(config: AppConfig): Promise<void> {
  if (!existsSync(config.chromeExecutablePath))
    throw new Error(`Google Chrome was not found at ${config.chromeExecutablePath}`);
  const browser = await chromium.launch({
    executablePath: config.chromeExecutablePath,
    headless: true,
    args: ["--no-first-run", "--no-default-browser-check"],
  });
  try {
    const page = await browser.newPage();
    await page.goto("about:blank");
    if ((await page.evaluate(() => document.readyState)) !== "complete")
      throw new Error("Browser page did not reach complete state");
  } finally {
    await browser.close();
  }
}
