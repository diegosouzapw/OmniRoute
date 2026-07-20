// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) =>
    params ? `${key}:${JSON.stringify(params)}` : key,
}));

const { default: RtkTomlImportCard } =
  await import("@/app/(dashboard)/dashboard/context/rtk/RtkTomlImportCard");

const containers: HTMLElement[] = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  act(() => createRoot(container).render(ui));
  return container;
}

async function setTextarea(container: HTMLElement, value: string) {
  const input = container.querySelector("[data-testid='rtk-toml-content']") as HTMLTextAreaElement;
  await act(async () => {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    )!.set!;
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function click(element: Element | null) {
  await act(async () => (element as HTMLElement).click());
}

async function selectFile(container: HTMLElement, file: File) {
  const input = container.querySelector("[data-testid='rtk-toml-file']") as HTMLInputElement;
  Object.defineProperty(input, "files", { configurable: true, value: [file] });
  await act(async () => input.dispatchEvent(new Event("change", { bubbles: true })));
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (containers.length) containers.pop()?.remove();
  document.body.innerHTML = "";
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("RtkTomlImportCard", () => {
  it("validates TOML without requesting installation", async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({
        sha256: "abc",
        passed: true,
        filters: [
          {
            id: "my-tool",
            description: "",
            category: "generic",
            commandPatterns: ["^my-tool"],
            testCount: 1,
          },
        ],
        outcomes: [{ filterId: "my-tool", testName: "works", passed: true }],
        warnings: [],
      })
    );
    vi.stubGlobal("fetch", fetchMock);
    const container = mount(<RtkTomlImportCard />);

    await setTextarea(container, "schema_version = 1");
    await click(container.querySelector("[data-testid='rtk-toml-validate']"));

    const [, options] = fetchMock.mock.calls[0];
    expect(JSON.parse(String(options?.body))).toMatchObject({
      action: "validate",
      overwrite: false,
    });
    expect(container.querySelector("[data-testid='rtk-toml-result']")?.textContent).toContain(
      "my-tool"
    );
  });

  it("installs with explicit overwrite and refreshes the filter catalog", async () => {
    const onInstalled = vi.fn(async () => {});
    const fetchMock = vi.fn(async () =>
      Response.json({
        sha256: "abc",
        passed: true,
        filters: [],
        outcomes: [],
        warnings: [],
        installedPath: "rtk/filters.toml",
        backupCreated: true,
      })
    );
    vi.stubGlobal("fetch", fetchMock);
    const container = mount(<RtkTomlImportCard onInstalled={onInstalled} />);

    await setTextarea(container, "schema_version = 1");
    await click(container.querySelector("[data-testid='rtk-toml-overwrite']"));
    await click(container.querySelector("[data-testid='rtk-toml-install']"));

    const [, options] = fetchMock.mock.calls[0];
    expect(JSON.parse(String(options?.body))).toMatchObject({ action: "install", overwrite: true });
    expect(onInstalled).toHaveBeenCalledOnce();
    expect(container.querySelector("[data-testid='rtk-toml-result']")?.textContent).toContain(
      "tomlBackupCreated"
    );
  });

  it("shows the sanitized API error message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({ error: { message: "filter 'bad' has an unsafe regex" } }, { status: 400 })
      )
    );
    const container = mount(<RtkTomlImportCard />);

    await setTextarea(container, "schema_version = 1");
    await click(container.querySelector("[data-testid='rtk-toml-validate']"));

    expect(container.querySelector("[data-testid='rtk-toml-error']")?.textContent).toContain(
      "unsafe regex"
    );
  });

  it("shows failing inline-test outcomes without reporting a successful validation", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          sha256: "abc",
          passed: false,
          filters: [],
          outcomes: [{ filterId: "bad", testName: "expected output", passed: false }],
          warnings: [],
        })
      )
    );
    const container = mount(<RtkTomlImportCard />);

    await setTextarea(container, "schema_version = 1");
    await click(container.querySelector("[data-testid='rtk-toml-validate']"));

    const result = container.querySelector("[data-testid='rtk-toml-result']")?.textContent ?? "";
    expect(result).toContain("tomlValidationFailed");
    expect(result).toContain("tomlTestFailed");
    expect(result).not.toContain("tomlValidationPassed");
  });

  it("rejects oversized files before reading them", async () => {
    const container = mount(<RtkTomlImportCard />);
    await setTextarea(container, "existing content");
    const file = new File([new Uint8Array(1024 * 1024 + 1)], "filters.toml");
    const text = vi.spyOn(file, "text");

    await selectFile(container, file);

    expect(text).not.toHaveBeenCalled();
    expect(container.querySelector("[data-testid='rtk-toml-error']")?.textContent).toContain(
      "tomlFileReadError"
    );
    expect(
      (container.querySelector("[data-testid='rtk-toml-content']") as HTMLTextAreaElement).value
    ).toBe("existing content");
  });
});
