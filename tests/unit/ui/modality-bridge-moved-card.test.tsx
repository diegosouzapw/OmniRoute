// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import MediaProviderPageClient from "@/app/(dashboard)/dashboard/media-providers/[kind]/[id]/MediaProviderPageClient";
import SettingsAiPage from "@/app/(dashboard)/dashboard/settings/ai/page";
import ModalityBridgeMovedCard from "@/app/(dashboard)/dashboard/settings/components/ModalityBridgeMovedCard";

vi.mock("next-intl", () => ({
  useTranslations: () =>
    Object.assign((key: string) => key, {
      rich: (key: string) => key,
    }),
}));

vi.mock("@/shared/components", () => ({
  Button: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
}));

vi.mock("@/app/(dashboard)/dashboard/settings/components/ThinkingBudgetTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/SystemPromptTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/ResponsesStatePolicyTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/CodexFastTierTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/CodexAutoPingTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/ClaudeFastModeTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/MemorySkillsTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/ModelsDevSyncTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/UsageTokenBufferTab", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/settings/components/ModelCapabilityOverridesTab", () => ({
  default: () => null,
}));

vi.mock("@/app/(dashboard)/dashboard/media-providers/components/MediaProviderHeader", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/MediaProviderKindNav", () => ({
  default: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/EmbeddingExampleCard", () => ({
  EmbeddingExampleCard: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/ImageExampleCard", () => ({
  ImageExampleCard: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/TtsExampleCard", () => ({
  TtsExampleCard: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/SttExampleCard", () => ({
  SttExampleCard: () => <div data-testid="stt-playground">stt</div>,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/WebSearchExampleCard", () => ({
  WebSearchExampleCard: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/WebFetchExampleCard", () => ({
  WebFetchExampleCard: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/VideoExampleCard", () => ({
  VideoExampleCard: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/MusicExampleCard", () => ({
  MusicExampleCard: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/media-providers/components/OcrExampleCard", () => ({
  OcrExampleCard: () => null,
}));

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

async function render(node: React.ReactNode): Promise<HTMLDivElement> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(node);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  roots.push({ root, el });
  return el;
}

describe("Modality Bridge relocation and shortcuts", () => {
  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ connections: [] }), { status: 200 }))
    );
  });

  afterEach(() => {
    for (const { root, el } of roots.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    vi.unstubAllGlobals();
  });

  it("renders the moved card as a link and removes the legacy settings card", async () => {
    const card = await render(<ModalityBridgeMovedCard />);
    expect(card.querySelector('a[href="/dashboard/settings/modality-bridge"]')).toBeTruthy();

    const page = await render(<SettingsAiPage />);
    expect(page.textContent).not.toContain("visionBridgeEnabledLabel");
    expect(page.textContent).toContain("modalityBridgeMovedTitle");
  });

  it("links Image-to-Text providers to the Vision tab", async () => {
    const el = await render(
      <MediaProviderPageClient
        providerId="openai"
        providerName="OpenAI"
        kindLabel="Image to Text"
        activeKind="imageToText"
      />
    );
    expect(
      el.querySelector('a[href="/dashboard/settings/modality-bridge?tab=vision"]')
    ).toBeTruthy();
    expect(el.textContent).toContain("imageToTextBridgeCta");
  });

  it("adds the Audio shortcut without removing the existing STT playground", async () => {
    const el = await render(
      <MediaProviderPageClient
        providerId="openrouter"
        providerName="OpenRouter"
        kindLabel="Speech to Text"
        activeKind="stt"
      />
    );
    expect(el.querySelector('[data-testid="stt-playground"]')).toBeTruthy();
    expect(
      el.querySelector('a[href="/dashboard/settings/modality-bridge?tab=audio"]')
    ).toBeTruthy();
    expect(el.textContent).toContain("sttBridgeCta");
  });
});
