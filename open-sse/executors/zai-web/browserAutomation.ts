import type { Page } from "playwright";
import {
  browserModelName,
  getZaiModelCapabilities,
  type ZaiThinkingConfig,
  type ZaiVlmConfig,
} from "./protocol.ts";

/**
 * Run one Playwright interaction, re-throwing any failure tagged with the stage
 * that produced it. Every step below is a blind DOM poke against a UI we do not
 * control, so an untagged "click timed out" is unactionable in a bug report.
 */
async function runStage(name: string, action: () => Promise<void>): Promise<void> {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${name}: ${message}`);
  }
}

async function selectZaiBrowserModel(page: Page, modelName: string): Promise<void> {
  const selector = page.locator('[aria-label="Select a model"]').first();
  await selector.waitFor({ state: "visible", timeout: 10_000 });
  if ((await selector.getByText(modelName, { exact: true }).count()) > 0) return;

  // The landing-page hero animation can remain above the already-visible
  // selector and make coordinate-based clicks time out.
  await selector.evaluate((element) => (element as HTMLElement).click());
  const menu = page.locator('[role="menu"]').filter({ hasText: modelName }).first();
  await menu.waitFor({ state: "visible", timeout: 5_000 });
  const modelButton = menu
    .getByText(modelName, { exact: true })
    .first()
    .locator("xpath=ancestor::button[1]");
  await modelButton.evaluate((element) => (element as HTMLElement).click());
  await page
    .locator('[aria-label="Select a model"]')
    .filter({ hasText: modelName })
    .first()
    .waitFor({ state: "visible", timeout: 5_000 });
}

async function setZaiBrowserToggle(
  page: Page,
  label: "Deep think" | "Tools" | "Web search",
  dataAttribute: "data-autothink" | "data-selected",
  enabled: boolean
): Promise<void> {
  const wrapper = page.locator(`[aria-label^="${label} "]`).first();
  await wrapper.waitFor({ state: "visible", timeout: 5_000 });
  const button = wrapper.locator(`button[${dataAttribute}]`).first();
  const current = (await button.getAttribute(dataAttribute)) === "true";
  if (current !== enabled) await button.click({ timeout: 5_000 });
}

async function setZaiBrowserWebSearch(page: Page, enabled: boolean): Promise<void> {
  const labelledWrapper = page.locator('[aria-label^="Web search "]').first();
  if ((await labelledWrapper.count()) > 0) {
    await setZaiBrowserToggle(page, "Web search", "data-selected", enabled);
    return;
  }

  // Text-model UI: the globe button has no accessible label. Anchor the
  // lookup to the adjacent upload button instead of generated IDs.
  const button = page
    .locator("#upload-file-button")
    .locator("xpath=../../../following-sibling::div//button[@data-active]")
    .first();
  await button.waitFor({ state: "visible", timeout: 5_000 });
  const current = (await button.getAttribute("data-active")) === "true";
  if (current !== enabled) {
    await button.click({ timeout: 5_000 });
    await page.keyboard.press("Escape");
  }
}

/** Pick the Low/High/Max effort button inside an already-open Deep Think menu. */
async function selectZaiBrowserEffortLevel(
  menu: ReturnType<Page["locator"]>,
  effort: ZaiThinkingConfig["effort"]
): Promise<void> {
  const effortButton = menu.locator("button").filter({
    hasText: effort === "low" ? "Low" : effort === "high" ? "High" : "Max",
  });
  if ((await effortButton.getAttribute("data-selected")) === "true") return;
  await runStage(`select ${effort}`, () =>
    effortButton.evaluate((element) => (element as HTMLElement).click())
  );
}

async function configureZaiBrowserEffort(page: Page, config: ZaiThinkingConfig): Promise<void> {
  const trigger = page
    .locator("[data-dropdown-menu-trigger]")
    .filter({ hasText: "Deep Think" })
    .first();
  await trigger.waitFor({ state: "visible", timeout: 10_000 });
  await runStage("open menu", () =>
    trigger.evaluate((element) => (element as HTMLElement).click())
  );

  const menu = page.locator('[role="menu"]').filter({ hasText: "Deep Think" }).first();
  await menu.waitFor({ state: "visible", timeout: 5_000 });
  const toggle = menu.locator('[role="switch"]').first();
  const checked = (await toggle.getAttribute("aria-checked")) === "true";

  if (checked !== config.enabled) {
    await runStage(config.enabled ? "enable toggle" : "disable toggle", () =>
      toggle.click({ timeout: 5_000 })
    );
  }
  if (config.enabled) {
    await selectZaiBrowserEffortLevel(menu, config.effort);
  }

  if (await menu.isVisible()) {
    await page.keyboard.press("Escape");
  }
}

export async function configureZaiBrowserRequest(
  page: Page,
  input: {
    modelId: string;
    thinking: ZaiThinkingConfig;
    vlm: ZaiVlmConfig;
  }
): Promise<void> {
  await runStage("model selection", () =>
    selectZaiBrowserModel(page, browserModelName(input.modelId))
  );

  if (input.thinking.effortSupported) {
    await runStage("Deep Think effort", () => configureZaiBrowserEffort(page, input.thinking));
  } else if (input.thinking.supported) {
    await runStage("Deep Think toggle", () =>
      setZaiBrowserToggle(page, "Deep think", "data-autothink", input.thinking.enabled)
    );
  }

  const capabilities = getZaiModelCapabilities(input.modelId);
  if (capabilities.webSearch) {
    await runStage("web search toggle", () =>
      setZaiBrowserWebSearch(page, input.vlm.webSearchEnabled)
    );
  }
  if (capabilities.vlmTools) {
    await runStage("tools toggle", () =>
      setZaiBrowserToggle(page, "Tools", "data-selected", input.vlm.toolsEnabled)
    );
  }
}
