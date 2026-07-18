import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProviderCard from "../ProviderCard";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));
vi.mock("@/shared/components/ProviderTestSlideOver", () => ({ default: () => null }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => null }));

describe("ProviderCard — #6936 audio-transcriptions provider badge", () => {
  let container: HTMLDivElement | null = null;

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it("does NOT label an audio-transcriptions compatible node as Chat", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(
        <ProviderCard
          providerId="openai-compatible-speaches-stt"
          provider={{
            id: "openai-compatible-speaches-stt",
            name: "Speaches-stt",
            apiType: "audio-transcriptions",
            serviceKinds: [],
          }}
          stats={{ total: 1, connected: 1, error: 0, warning: 0 }}
          authType="apikey"
          onToggle={() => {}}
        />
      );
    });
    const text = (container.textContent || "").toLowerCase();
    expect(text).not.toContain("chat");
    expect(text).toContain("stt");
  });

  it("labels an audio-speech compatible node as TTS", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(
        <ProviderCard
          providerId="openai-compatible-speaches-tts"
          provider={{
            id: "openai-compatible-speaches-tts",
            name: "Speaches-tts",
            apiType: "audio-speech",
            serviceKinds: [],
          }}
          stats={{ total: 1, connected: 1, error: 0, warning: 0 }}
          authType="apikey"
          onToggle={() => {}}
        />
      );
    });
    const text = (container.textContent || "").toLowerCase();
    expect(text).not.toContain("chat");
    expect(text).toContain("tts");
  });

  it("still labels a plain chat compatible node as Chat", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(
        <ProviderCard
          providerId="openai-compatible-plain"
          provider={{
            id: "openai-compatible-plain",
            name: "Plain-chat",
            apiType: "chat",
            serviceKinds: [],
          }}
          stats={{ total: 1, connected: 1, error: 0, warning: 0 }}
          authType="apikey"
          onToggle={() => {}}
        />
      );
    });
    const text = (container.textContent || "").toLowerCase();
    expect(text).toContain("chat");
  });
});
