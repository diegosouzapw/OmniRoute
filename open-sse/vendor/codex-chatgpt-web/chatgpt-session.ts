/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
import type { Locator, Page } from "playwright-core";

export const CHATGPT_TEMPORARY_CHAT_URL = "https://chatgpt.com/?temporary-chat=true";

async function anyVisible(locator: Locator): Promise<boolean> {
  const count = await locator.count();
  for (let index = 0; index < count; index += 1) {
    if (
      await locator
        .nth(index)
        .isVisible()
        .catch(() => false)
    )
      return true;
  }
  return false;
}

export async function assertAuthenticatedChatGptPage(page: Page): Promise<void> {
  const loginButtons = page.getByRole("button", { name: "Log in", exact: true });
  if (await anyVisible(loginButtons)) {
    throw new Error("ChatGPT is signed out: a visible Log in button is present");
  }
  const accountControl = page
    .getByRole("button", { name: /(?:profile|account) menu/i })
    .or(page.locator('[data-testid="profile-button"], button[aria-label*="account" i]'));
  if (!(await anyVisible(accountControl))) {
    throw new Error(
      "ChatGPT authentication could not be verified: no visible account control is present"
    );
  }
}

export async function assertTemporaryChatPage(page: Page): Promise<void> {
  const url = new URL(page.url());
  const expected = new URL(CHATGPT_TEMPORARY_CHAT_URL);
  if (
    url.origin !== expected.origin ||
    url.pathname !== expected.pathname ||
    url.searchParams.get("temporary-chat") !== "true"
  ) {
    throw new Error(`ChatGPT left the isolated Temporary Chat surface (${page.url()})`);
  }
  await page
    .getByRole("heading", { name: "Temporary Chat", exact: true })
    .waitFor({ state: "visible", timeout: 20_000 });
}

export async function detectChatGptProCapability(page: Page): Promise<boolean> {
  const effortButton = page
    .getByRole("button", {
      name: /^(?:Instant(?:\s+5\.5)?|Medium|High|Extra High|Pro)$/,
    })
    .last();
  await effortButton.waitFor({ state: "visible", timeout: 30_000 });
  await effortButton.click();
  try {
    const pro = page
      .getByRole("menuitem", { name: "Pro", exact: true })
      .or(page.getByRole("menuitemradio", { name: "Pro", exact: true }))
      .last();
    return await pro.isVisible().catch(() => false);
  } finally {
    await page.keyboard.press("Escape").catch(() => {});
  }
}
