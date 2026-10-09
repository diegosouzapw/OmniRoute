// @vitest-environment jsdom
//
// Add-form context-window override: o form de CADASTRO de modelo custom deve
// enviar contextWindowOverride no POST /api/provider-models quando preenchido
// (antes só a EDIÇÃO tinha o campo — #4125), e validar entrada inválida.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { parseContextWindowOverrideInput } from "../../providerPageHelpers";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "test-provider" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/providers/test-provider",
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const notifyError = vi.fn();
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: notifyError,
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

vi.mock("@/shared/components", () => ({
  Badge: ({ children }: any) => <span>{children}</span>,
  Button: ({ children, onClick, disabled }: any) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

import CustomModelsSection from "../CustomModelsSection";

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

describe("parseContextWindowOverrideInput (moved to providerPageHelpers)", () => {
  it("blank → null/no error; positive int → value; junk → invalid", () => {
    expect(parseContextWindowOverrideInput("")).toEqual({ value: null, invalid: false });
    expect(parseContextWindowOverrideInput(" 1000000 ")).toEqual({
      value: 1_000_000,
      invalid: false,
    });
    expect(parseContextWindowOverrideInput("0")).toEqual({ value: null, invalid: true });
    expect(parseContextWindowOverrideInput("1e6")).toEqual({ value: null, invalid: true });
  });
});

describe("CustomModelsSection add form", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.useRealTimers();
    notifyError.mockClear();
    fetchMock.mockReset();
    // GET on mount → lista vazia; POST → sucesso.
    fetchMock.mockImplementation(async (_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return new Response(JSON.stringify({ model: { id: "m1" } }), { status: 200 });
      }
      return new Response(JSON.stringify({ models: [], modelCompatOverrides: [] }), {
        status: 200,
      });
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it("sends contextWindowOverride in the POST body when filled", async () => {
    await act(async () => {
      root.render(
        <CustomModelsSection
          providerId="qwen-cloud-token-plan"
          providerAlias="qct"
          onCopy={() => {}}
        />
      );
    });

    const idInput = container.querySelector<HTMLInputElement>("#custom-model-id")!;
    const ctxInput = container.querySelector<HTMLInputElement>("#custom-model-context-window");
    expect(ctxInput, "add form should render the context-window field").toBeTruthy();

    await act(async () => {
      setInputValue(idInput, "qwen3.8-max");
      setInputValue(ctxInput!, "1000000");
    });

    const addButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "add"
    )!;
    await act(async () => {
      addButton.click();
    });

    const postCall = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
    expect(postCall, "POST should have been sent").toBeTruthy();
    const sent = JSON.parse(String(postCall![1]!.body));
    expect(sent.contextWindowOverride).toBe(1_000_000);
    expect(sent.modelId).toBe("qwen3.8-max");

    // #4125 fix-round-1: the field must reset to blank after a successful add, like
    // the other add-form fields (setNewContextWindowOverride("") inside `res.ok`).
    // Re-query rather than reuse the earlier reference, in case React swapped the node.
    const ctxInputAfterAdd = container.querySelector<HTMLInputElement>(
      "#custom-model-context-window"
    );
    expect(ctxInputAfterAdd!.value).toBe("");
  });

  it("rejects an invalid context window before POSTing", async () => {
    await act(async () => {
      root.render(<CustomModelsSection providerId="p" providerAlias="p" onCopy={() => {}} />);
    });
    const idInput = container.querySelector<HTMLInputElement>("#custom-model-id")!;
    const ctxInput = container.querySelector<HTMLInputElement>("#custom-model-context-window")!;
    await act(async () => {
      setInputValue(idInput, "m1");
      setInputValue(ctxInput, "not-a-number");
    });
    const addButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "add"
    )!;
    await act(async () => {
      addButton.click();
    });
    expect(notifyError).toHaveBeenCalledWith("contextWindowOverrideInvalid");
    expect(fetchMock.mock.calls.find(([, init]) => init?.method === "POST")).toBeUndefined();
  });
});
