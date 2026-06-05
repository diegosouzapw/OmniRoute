// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Step1ChooseIntegration } from "../components/steps/Step1ChooseIntegration";
import { Step3EventsAndTest } from "../components/steps/Step3EventsAndTest";
import { AddWebhookWizard } from "../components/AddWebhookWizard";

// Minimal t() mock that returns the key, letting tests assert on key presence.
function t(key: string): string {
  const overrides: Record<string, string> = {
    "wizard.step1Desc": "Select the platform",
    "wizard.step1Title": "Choose Integration",
    "wizard.step2Title": "Configure",
    "wizard.step3Title": "Events & Test",
    "wizard.next": "Next",
    "wizard.back": "Back",
    "wizard.finish": "Add Webhook",
    "wizard.cancel": "Cancel",
    addWebhook: "Add Webhook",
    "kinds.slack": "Slack",
    "kinds.slackDesc": "Slack desc",
    "kinds.telegram": "Telegram",
    "kinds.telegramDesc": "Telegram desc",
    "kinds.discord": "Discord",
    "kinds.discordDesc": "Discord desc",
    "kinds.custom": "Custom",
    "kinds.customDesc": "Custom desc",
    "kinds.email": "Email",
    "kinds.emailDesc": "Email desc",
    "kinds.pagerduty": "PagerDuty",
    "kinds.pagerdutyDesc": "PagerDuty desc",
    "kinds.teams": "Microsoft Teams",
    "kinds.teamsDesc": "Teams desc",
    "kinds.comingSoon": "Coming soon",
    "slack.webhookUrl": "Slack Webhook URL",
    "slack.webhookUrlPlaceholder": "https://hooks.slack.com/services/…",
    "slack.webhookUrlHint": "Create one in your Slack App.",
    "slack.tutorial": "How to get a Slack Webhook URL",
    "slack.tutorialStep1": "step1",
    "slack.tutorialStep2": "step2",
    "slack.tutorialStep3": "step3",
    "slack.tutorialStep4": "step4",
    "howItWorks.title": "How It Works",
    "howItWorks.step1": "step1",
    "howItWorks.step2": "step2",
    "howItWorks.step3": "step3",
    "howItWorks.step4": "step4",
    "howItWorks.hmacRecipeTitle": "Verify Signature",
    "howItWorks.hmacRecipe": "const sig = req.headers['x-webhook-signature'];",
    name: "Name",
    namePlaceholder: "Production monitoring",
    events: "Events",
    allEvents: "All events",
    enabled: "Enabled",
    enabledDesc: "Disabled webhooks remain saved.",
    testWebhook: "Send Test",
    testSuccess: "delivery confirmed",
    testFailed: "Test failed",
    testPayloadSent: "Payload sent",
    testResponse: "Endpoint response",
    saveFailed: "Failed to save",
  };
  return overrides[key] ?? key;
}

function getButton(text: string): HTMLButtonElement | null {
  return (
    (Array.from(document.querySelectorAll("button")).find((b) => b.textContent?.includes(text)) as
      | HTMLButtonElement
      | undefined) ?? null
  );
}

const roots: Array<{ unmount: () => void }> = [];

afterEach(() => {
  roots.forEach((r) => {
    act(() => r.unmount());
  });
  roots.length = 0;
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

function renderIntoBody(element: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(element);
  });
  roots.push({ unmount: () => root.unmount() });
  return container;
}

// ---------------------------------------------------------------------------
// Scenario 1: Step1 renders 7 cards (4 active + 3 greyed)
// ---------------------------------------------------------------------------
describe("Step1ChooseIntegration", () => {
  it("renders 4 active and 3 coming-soon cards", () => {
    const onSelect = vi.fn();
    renderIntoBody(<Step1ChooseIntegration selected="slack" onSelect={onSelect} t={t} />);

    const allButtons = Array.from(document.querySelectorAll("button"));
    expect(allButtons).toHaveLength(7);

    const disabledButtons = allButtons.filter((b) => b.disabled);
    expect(disabledButtons).toHaveLength(3);

    const activeButtons = allButtons.filter((b) => !b.disabled);
    expect(activeButtons).toHaveLength(4);
  });

  it("greyed cards show 'Coming soon' badge", () => {
    renderIntoBody(<Step1ChooseIntegration selected="slack" onSelect={vi.fn()} t={t} />);
    const badges = document.body.textContent?.match(/Coming soon/g) ?? [];
    expect(badges).toHaveLength(3);
  });

  // ---------------------------------------------------------------------------
  // Scenario 2: Clicking "Slack" → calls onSelect("slack")
  // ---------------------------------------------------------------------------
  it("clicking a kind card calls onSelect with that kind", () => {
    const onSelect = vi.fn();
    renderIntoBody(<Step1ChooseIntegration selected="telegram" onSelect={onSelect} t={t} />);

    const slackButton = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Slack")
    );
    expect(slackButton).toBeTruthy();
    act(() => slackButton!.click());
    expect(onSelect).toHaveBeenCalledWith("slack");
  });

  it("clicking a disabled coming-soon card does NOT call onSelect", () => {
    const onSelect = vi.fn();
    renderIntoBody(<Step1ChooseIntegration selected="slack" onSelect={onSelect} t={t} />);

    const emailButton = Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent?.includes("Email") && b.disabled
    );
    expect(emailButton).toBeTruthy();
    act(() => emailButton!.click());
    expect(onSelect).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Scenario 3: Step3 "Send test ping" calls /api/webhooks/[id]/test
// ---------------------------------------------------------------------------
describe("Step3EventsAndTest — test ping", () => {
  it("clicking Send Test calls the test endpoint and shows status + payload", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        delivered: true,
        status: 200,
        latencyMs: 42,
        payloadSent: { event: "test.ping" },
        responseBody: '{"ok":true}',
        error: null,
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    renderIntoBody(
      <Step3EventsAndTest
        webhookId="wh-test-123"
        events={["*"]}
        enabled={true}
        description=""
        onChangeEvents={vi.fn()}
        onChangeEnabled={vi.fn()}
        onChangeDescription={vi.fn()}
        t={t}
      />
    );

    const sendBtn = getButton("Send Test");
    expect(sendBtn).toBeTruthy();
    await act(async () => sendBtn!.click());

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/webhooks/wh-test-123/test",
      expect.objectContaining({ method: "POST" })
    );

    // Status + latency line should appear
    expect(document.body.textContent).toContain("200");
    expect(document.body.textContent).toContain("42ms");
    expect(document.body.textContent).toContain("delivery confirmed");
  });

  it("displays error message on failed test ping", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ delivered: false, error: "Connection refused", status: 0 }),
    });
    vi.stubGlobal("fetch", mockFetch);

    renderIntoBody(
      <Step3EventsAndTest
        webhookId="wh-err-456"
        events={["*"]}
        enabled={true}
        description=""
        onChangeEvents={vi.fn()}
        onChangeEnabled={vi.fn()}
        onChangeDescription={vi.fn()}
        t={t}
      />
    );

    const sendBtn = getButton("Send Test");
    await act(async () => sendBtn!.click());

    expect(document.body.textContent).toContain("Connection refused");
  });
});

// ---------------------------------------------------------------------------
// Scenario 4: Wizard flow — entering step 3 POSTs with kind: "slack"
// ---------------------------------------------------------------------------
describe("AddWebhookWizard — step 2→3 creates webhook with correct kind", () => {
  it("Next on step 2 posts kind:slack and saves createdId", async () => {
    const postResponse = { id: "wh-created-789", url: "https://hooks.slack.com/test" };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ webhook: postResponse }),
    });
    vi.stubGlobal("fetch", mockFetch);

    renderIntoBody(<AddWebhookWizard isOpen={true} onClose={vi.fn()} onCreated={vi.fn()} t={t} />);

    // Step 1: default is "slack", click Next
    const nextBtn1 = getButton("Next");
    expect(nextBtn1).toBeTruthy();
    await act(async () => nextBtn1!.click());

    // Now in step 2 (Slack config), fill in the URL using the native setter
    // so React's synthetic onChange fires properly on a controlled input.
    const input = document.querySelector(
      'input[placeholder="https://hooks.slack.com/services/…"]'
    ) as HTMLInputElement | null;
    expect(input).toBeTruthy();
    await act(async () => {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeSetter?.call(input, "https://hooks.slack.com/services/T00/B00/xxx");
      input!.dispatchEvent(new Event("input", { bubbles: true }));
    });

    // Click Next to go to step 3 (the button becomes enabled after value is set)
    const nextBtn2 = getButton("Next");
    expect(nextBtn2?.disabled).toBe(false);
    await act(async () => nextBtn2!.click());

    // Verify the POST was called with kind: "slack"
    const calls = mockFetch.mock.calls;
    const postCall = calls.find(
      ([url, opts]) => url === "/api/webhooks" && opts?.method === "POST"
    );
    expect(postCall).toBeTruthy();
    const body = JSON.parse(postCall![1].body as string);
    expect(body.kind).toBe("slack");
  });
});
