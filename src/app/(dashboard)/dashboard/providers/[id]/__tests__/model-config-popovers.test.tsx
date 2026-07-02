// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CompatibleModelsSection from "../components/CompatibleModelsSection";
import ModelCompatPopover from "../components/ModelCompatPopover";
import PassthroughModelsSection from "../components/PassthroughModelsSection";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "test-provider" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/providers/test-provider",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values) {
      return Object.entries(values).reduce((acc, [k, v]) => acc.replace(`{${k}}`, String(v)), key);
    }
    return key;
  },
}));

vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

vi.mock("@/shared/components", () => ({
  Badge: ({ children }: any) => <span>{children}</span>,
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
  Input: (props: any) => <input {...props} />,
  Toggle: ({ checked, disabled, label, onChange }: any) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
      {label}
    </label>
  ),
}));

async function openFirstCompatPopover() {
  await act(async () => {
    document.querySelector<HTMLButtonElement>('button[title="compatAdjustmentsTitle"]')?.click();
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function getTargetFormatSelect() {
  return Array.from(document.body.querySelectorAll<HTMLSelectElement>("select")).find((select) =>
    Array.from(select.options).some((option) => option.value === "antigravity")
  );
}

function getResetButton() {
  return document.querySelector<HTMLButtonElement>('button[title="Restore the model baseline"]');
}

function setInputValue(input: HTMLInputElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  valueSetter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function setTextareaValue(textarea: HTMLTextAreaElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
  valueSetter?.call(textarea, value);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

describe("Compatible and passthrough model config popovers", () => {
  let container: HTMLElement;
  let root: ReturnType<typeof createRoot>;

  const t = (key: string, values?: Record<string, unknown>) => {
    if (values) {
      return Object.entries(values).reduce((acc, [k, v]) => acc.replace(`{${k}}`, String(v)), key);
    }
    return key;
  };

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("passes configured target format and unsupported params through compatible rows", async () => {
    await act(async () => {
      root.render(
        <CompatibleModelsSection
          providerStorageAlias="openai-compatible-demo"
          providerDisplayAlias="demo"
          modelAliases={{}}
          availableModels={[{ id: "demo-model", name: "Demo model" }]}
          modelCompatOverrides={[
            {
              id: "demo-model",
              targetFormat: "claude",
              unsupportedParams: ["temperature", "top_p"],
            },
          ]}
          fallbackModels={[]}
          allowImport={false}
          description="description"
          inputLabel="modelId"
          inputPlaceholder="model"
          onCopy={vi.fn()}
          onSetAlias={vi.fn(async () => {})}
          onDeleteAlias={vi.fn()}
          connections={[]}
          onImportWithProgress={vi.fn(async () => {})}
          t={t}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({})}
          saveModelCompatFlags={vi.fn(async () => {})}
          resetModelConfig={vi.fn(async () => {})}
          isModelHidden={() => false}
          onToggleHidden={vi.fn(async () => {})}
          onBulkToggleHidden={vi.fn(async () => {})}
        />
      );
    });
    await openFirstCompatPopover();

    expect(getTargetFormatSelect()?.value).toBe("claude");
    expect(document.body.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "temperature\ntop_p"
    );
  });

  it("passes configured target format and unsupported params through passthrough rows", async () => {
    await act(async () => {
      root.render(
        <PassthroughModelsSection
          providerAlias="openrouter"
          providerId="openrouter"
          connectionId="conn-1"
          modelAliases={{}}
          availableModels={[{ id: "openrouter-model", name: "OpenRouter model" }]}
          customModels={[]}
          modelCompatOverrides={[
            {
              id: "openrouter-model",
              targetFormat: "gemini",
              unsupportedParams: ["frequency_penalty", "presence_penalty"],
            },
          ]}
          description="description"
          inputLabel="modelId"
          inputPlaceholder="model"
          onCopy={vi.fn()}
          onSetAlias={vi.fn(async () => {})}
          onDeleteAlias={vi.fn()}
          t={t}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({})}
          saveModelCompatFlags={vi.fn(async () => {})}
          resetModelConfig={vi.fn(async () => {})}
          isModelHidden={() => false}
          onToggleHidden={vi.fn(async () => {})}
          onBulkToggleHidden={vi.fn(async () => {})}
        />
      );
    });
    await openFirstCompatPopover();

    expect(getTargetFormatSelect()?.value).toBe("gemini");
    expect(document.body.querySelector<HTMLTextAreaElement>("textarea")?.value).toBe(
      "frequency_penalty\npresence_penalty"
    );
  });

  it("does not restore stale upstream headers after reset while the popover is open", async () => {
    const onCompatPatch = vi.fn();

    function Wrapper() {
      const [headers, setHeaders] = React.useState<Record<string, string>>({
        "X-Test": "old",
      });
      return (
        <ModelCompatPopover
          t={(key) => key}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => headers}
          onCompatPatch={onCompatPatch}
          onReset={() => setHeaders({})}
          hasModelConfigOverride
        />
      );
    }

    await act(async () => {
      root.render(<Wrapper />);
    });
    await openFirstCompatPopover();
    await act(async () => {
      Array.from(document.querySelectorAll<HTMLButtonElement>("button"))
        .find((button) => button.textContent === "compatUpstreamAddRow")
        ?.click();
      await Promise.resolve();
    });
    await act(async () => {
      getResetButton()?.click();
      await Promise.resolve();
    });
    await openFirstCompatPopover();

    expect(onCompatPatch).not.toHaveBeenCalled();
  });

  it("suppresses focused-field blur autosave when reset is clicked", async () => {
    const onCompatPatch = vi.fn();

    function Wrapper() {
      const [headers, setHeaders] = React.useState<Record<string, string>>({
        "X-Test": "old",
      });
      return (
        <ModelCompatPopover
          t={(key) => key}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => headers}
          onCompatPatch={onCompatPatch}
          onReset={() => setHeaders({})}
          hasModelConfigOverride
        />
      );
    }

    await act(async () => {
      root.render(<Wrapper />);
    });
    await openFirstCompatPopover();

    const headerName = document.querySelector<HTMLInputElement>(
      'input[placeholder="compatUpstreamHeaderNamePlaceholder"]'
    );
    expect(headerName).toBeTruthy();
    await act(async () => {
      headerName?.focus();
      setInputValue(headerName!, "X-Race");
      await Promise.resolve();
    });

    const resetButton = getResetButton();
    expect(resetButton).toBeTruthy();
    await act(async () => {
      resetButton?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      headerName?.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
      resetButton?.click();
      await Promise.resolve();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(onCompatPatch).not.toHaveBeenCalled();
  });

  it("clears uncommitted numeric and metadata drafts when reset is clicked", async () => {
    const onCapabilitiesPatch = vi.fn();
    const onModelConfigPatch = vi.fn();

    await act(async () => {
      root.render(
        <ModelCompatPopover
          t={(key) => key}
          effectiveModelNormalize={() => false}
          effectiveModelPreserveDeveloper={() => true}
          getUpstreamHeadersRecord={() => ({})}
          configuredCapabilities={{ contextWindow: 128000, maxOutputTokens: 8192 }}
          configuredUnsupportedParams={["temperature"]}
          onCapabilitiesPatch={onCapabilitiesPatch}
          onModelConfigPatch={onModelConfigPatch}
          onCompatPatch={vi.fn()}
          onReset={vi.fn()}
          hasModelConfigOverride
        />
      );
    });
    await openFirstCompatPopover();

    const numberInputs = document.querySelectorAll<HTMLInputElement>('input[type="number"]');
    const textarea = document.querySelector<HTMLTextAreaElement>("textarea");
    await act(async () => {
      setInputValue(numberInputs[0], "32000");
      setInputValue(numberInputs[1], "4096");
      setTextareaValue(textarea!, "top_p");
      getResetButton()?.click();
      await Promise.resolve();
    });

    expect(numberInputs[0]?.value).toBe("128000");
    expect(numberInputs[1]?.value).toBe("8192");
    expect(textarea?.value).toBe("temperature");
    expect(onCapabilitiesPatch).not.toHaveBeenCalled();
    expect(onModelConfigPatch).not.toHaveBeenCalled();
  });
});
