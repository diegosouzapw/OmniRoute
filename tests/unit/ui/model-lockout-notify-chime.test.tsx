// @vitest-environment jsdom
import fs from "node:fs";
import path from "node:path";
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const translate = (key: string) => key;
const notifications = {
  error: vi.fn(),
  success: vi.fn(),
};

vi.mock("next-intl", () => ({
  useTranslations: () => translate,
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => notifications,
}));

import ModelLockoutCard from "../../../src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard";

type OscillatorMock = {
  connect: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  frequency: { setValueAtTime: ReturnType<typeof vi.fn> };
  onended: (() => void) | null;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  type: OscillatorType;
};

function createAudioContextMock(
  options: { resumeRejects?: boolean; state?: AudioContextState } = {}
) {
  const contexts: AudioContextMock[] = [];
  const oscillators: OscillatorMock[] = [];
  const gains: Array<{
    connect: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
    gain: {
      cancelScheduledValues: ReturnType<typeof vi.fn>;
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>;
      setValueAtTime: ReturnType<typeof vi.fn>;
    };
  }> = [];

  class AudioContextMock {
    close = vi.fn().mockResolvedValue(undefined);
    currentTime = 1;
    destination = {};
    state: AudioContextState = options.state ?? "running";
    resume = options.resumeRejects
      ? vi.fn().mockRejectedValue(new Error("audio resume denied"))
      : vi.fn().mockResolvedValue(undefined);

    constructor() {
      contexts.push(this);
    }

    createOscillator() {
      const oscillator: OscillatorMock = {
        connect: vi.fn(),
        disconnect: vi.fn(),
        frequency: { setValueAtTime: vi.fn() },
        onended: null,
        start: vi.fn(),
        stop: vi.fn(),
        type: "sine",
      };
      oscillators.push(oscillator);
      return oscillator;
    }

    createGain() {
      const gain = {
        connect: vi.fn(),
        disconnect: vi.fn(),
        gain: {
          cancelScheduledValues: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
          setValueAtTime: vi.fn(),
        },
      };
      gains.push(gain);
      return gain;
    }
  }

  return { AudioContextMock, contexts, gains, oscillators };
}

const roots: Array<{ container: HTMLDivElement; root: Root }> = [];

async function renderCard(): Promise<{ container: HTMLDivElement; root: Root }> {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push({ container, root });

  await act(async () => {
    root.render(<ModelLockoutCard />);
    await Promise.resolve();
    await Promise.resolve();
  });

  return { container, root };
}

function disposeCard(rendered: { container: HTMLDivElement; root: Root }): void {
  act(() => rendered.root.unmount());
  rendered.container.remove();
  const index = roots.findIndex(({ root }) => root === rendered.root);
  if (index >= 0) roots.splice(index, 1);
}

describe("Model lockout optional notification sound", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            modelLockout: {
              enabled: false,
              errorCodes: [403, 404, 429, 502, 503, 504],
              baseCooldownMs: 120_000,
              maxCooldownMs: 1_800_000,
              maxBackoffSteps: 10,
              useExponentialBackoff: true,
            },
          }),
          { status: 200 }
        )
      )
    );
  });

  afterEach(() => {
    for (const { container, root } of roots) {
      act(() => root.unmount());
      container.remove();
    }
    roots.length = 0;
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("does not ship or reference the unprovenanced MP3", () => {
    const legacyAssetName = "ui-notify.mp3";
    const legacyAssetUrl = ["/audio", legacyAssetName].join("/");
    const assetPath = path.join(process.cwd(), "public/audio", legacyAssetName);
    const componentPath = path.join(
      process.cwd(),
      "src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx"
    );

    expect(fs.existsSync(assetPath)).toBe(false);
    expect(fs.readFileSync(componentPath, "utf8")).not.toContain(legacyAssetUrl);
  });

  it("plays generated feedback for both model-lockout toggles", async () => {
    const { AudioContextMock, contexts, gains, oscillators } = createAudioContextMock();
    vi.stubGlobal("AudioContext", AudioContextMock);
    const legacyAudio = vi.fn(() => ({
      currentTime: 0,
      pause: vi.fn(),
      play: vi.fn(),
      volume: 1,
    }));
    vi.stubGlobal("Audio", legacyAudio);

    const { container } = await renderCard();
    const toggles = [...container.querySelectorAll<HTMLButtonElement>('button[role="switch"]')];
    expect(toggles).toHaveLength(2);

    act(() => toggles[0]?.click());
    act(() => toggles[1]?.click());

    expect(contexts).toHaveLength(1);
    expect(oscillators).toHaveLength(2);
    expect(gains).toHaveLength(2);
    oscillators.forEach((oscillator, index) => {
      const gain = gains[index];
      expect(gain).toBeDefined();
      expect(oscillator.type).toBe("sine");
      expect(oscillator.frequency.setValueAtTime).toHaveBeenCalledWith(880, 1);
      expect(oscillator.connect).toHaveBeenCalledWith(gain);
      expect(gain?.connect).toHaveBeenCalledWith(contexts[0]?.destination);
      expect(gain?.gain.setValueAtTime).toHaveBeenCalledWith(0.0001, 1);
      expect(gain?.gain.exponentialRampToValueAtTime).toHaveBeenNthCalledWith(1, 0.045, 1.012);
      expect(gain?.gain.exponentialRampToValueAtTime).toHaveBeenNthCalledWith(2, 0.0001, 1.09);
      expect(oscillator.start).toHaveBeenCalledWith(1);
      expect(oscillator.stop).toHaveBeenCalledWith(1.1);

      oscillator.onended?.();
      expect(oscillator.disconnect).toHaveBeenCalledOnce();
      expect(gain?.disconnect).toHaveBeenCalledOnce();
    });
    expect(legacyAudio).not.toHaveBeenCalled();
  });

  it("uses the prefixed Web Audio constructor when AudioContext is unavailable", async () => {
    const { AudioContextMock, contexts, oscillators } = createAudioContextMock();
    vi.stubGlobal("AudioContext", undefined);
    vi.stubGlobal("webkitAudioContext", AudioContextMock);

    const { container } = await renderCard();
    const toggle = container.querySelector<HTMLButtonElement>('button[role="switch"]');
    act(() => toggle?.click());

    expect(contexts).toHaveLength(1);
    expect(oscillators).toHaveLength(1);
  });

  it("starts the optional chime after a suspended context resumes", async () => {
    const { AudioContextMock, contexts, oscillators } = createAudioContextMock({
      state: "suspended",
    });
    vi.stubGlobal("AudioContext", AudioContextMock);

    const { container } = await renderCard();
    const toggle = container.querySelector<HTMLButtonElement>('button[role="switch"]');
    await act(async () => {
      toggle?.click();
      await Promise.resolve();
    });

    expect(contexts[0]?.resume).toHaveBeenCalledOnce();
    expect(oscillators).toHaveLength(1);
  });

  it("keeps both toggles working when Web Audio is unavailable", async () => {
    vi.stubGlobal("AudioContext", undefined);

    const { container } = await renderCard();
    const toggles = [...container.querySelectorAll<HTMLButtonElement>('button[role="switch"]')];
    act(() => toggles[0]?.click());
    act(() => toggles[1]?.click());

    expect(toggles[0]?.getAttribute("aria-checked")).toBe("true");
    expect(toggles[1]?.getAttribute("aria-checked")).toBe("false");
  });

  it("keeps the toggle working when a suspended context cannot resume", async () => {
    const { AudioContextMock, contexts, oscillators } = createAudioContextMock({
      resumeRejects: true,
      state: "suspended",
    });
    vi.stubGlobal("AudioContext", AudioContextMock);

    const { container } = await renderCard();
    const toggle = container.querySelector<HTMLButtonElement>('button[role="switch"]');
    await act(async () => {
      toggle?.click();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(toggle?.getAttribute("aria-checked")).toBe("true");
    expect(contexts[0]?.resume).toHaveBeenCalledOnce();
    expect(oscillators).toHaveLength(0);
  });

  it("releases its audio context when the settings card unmounts", async () => {
    const { AudioContextMock, contexts } = createAudioContextMock();
    vi.stubGlobal("AudioContext", AudioContextMock);

    const rendered = await renderCard();
    const toggle = rendered.container.querySelector<HTMLButtonElement>('button[role="switch"]');
    act(() => toggle?.click());
    expect(contexts).toHaveLength(1);

    disposeCard(rendered);

    expect(contexts[0]?.close).toHaveBeenCalledOnce();
  });
});
