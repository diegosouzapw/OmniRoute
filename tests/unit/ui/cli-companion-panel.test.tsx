import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CliCompanionPanel from "@/app/(dashboard)/dashboard/cli-code/components/CliCompanionPanel";
import type { CompanionTarget } from "@/shared/utils/cliCompanion";

const targets: CompanionTarget[] = [
  { id: "claude", name: "Claude Code", configure: true, run: true, requiresModel: false },
  { id: "qwen", name: "Qwen Code", configure: true, run: true, requiresModel: true },
  { id: "cline", name: "Cline", configure: true, run: false, requiresModel: false },
];
const writeText = vi.fn(async () => {});

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.reject(new Error("panel must not fetch")))
  );
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  writeText.mockReset();
  writeText.mockResolvedValue(undefined);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("CLI companion copy-only flow", () => {
  it("shows server scope, unknown state and copies a safe context runbook without network calls", async () => {
    render(<CliCompanionPanel targets={targets} statuses={null} loading={false} error={false} />);
    expect(screen.getByText(/Detection describes the OmniRoute server host/)).toBeTruthy();
    expect(screen.getAllByText("Unknown")).toHaveLength(3);
    fireEvent.change(screen.getByLabelText("Existing context name (optional)"), {
      target: { value: "office" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Copy: Preview the launch" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("omniroute run claude --context office --dry-run")
    );
    expect((await screen.findByText("Copied!")).getAttribute("role")).toBe("status");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("updates target capabilities and refuses unsafe context/model input", () => {
    render(<CliCompanionPanel targets={targets} statuses={null} loading={false} error={false} />);
    fireEvent.change(screen.getByLabelText("CLI tool"), { target: { value: "qwen" } });
    expect(screen.queryByRole("button", { name: "Copy: Preview the launch" })).toBeNull();
    fireEvent.change(screen.getByLabelText("Model"), { target: { value: "provider/model" } });
    expect(screen.getByText("omniroute run qwen --model provider/model --dry-run")).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Model"), { target: { value: "$(id)" } });
    expect(screen.queryByRole("button", { name: "Copy: Preview the launch" })).toBeNull();
    fireEvent.change(screen.getByLabelText("CLI tool"), { target: { value: "cline" } });
    expect(screen.queryByRole("button", { name: "Copy: Preview the launch" })).toBeNull();
    fireEvent.change(screen.getByLabelText("Existing context name (optional)"), {
      target: { value: "a;whoami" },
    });
    expect(screen.queryByRole("button", { name: "Copy: Choose a model and configure" })).toBeNull();
    expect(document.querySelectorAll("code").length).toBe(1);
  });

  it("distinguishes loading and sanitized detection errors while keeping terminal guidance", () => {
    const status = {
      claude: {
        detection: { installed: true, runnable: false, reason: "private-secret" },
        config: { status: "configured" as const, endpoint: "https://private-secret@example.test" },
        error: "private-secret",
      },
    };
    const view = render(
      <CliCompanionPanel targets={targets} statuses={status} loading error={false} />
    );
    expect(screen.getAllByText("Loading...")).toHaveLength(3);
    view.rerender(
      <CliCompanionPanel targets={targets} statuses={status} loading={false} error={false} />
    );
    expect(screen.getByRole("alert").textContent).toMatch(/Server detection unavailable/);
    expect(document.body.textContent).not.toContain("private-secret");
    expect(screen.getByRole("button", { name: "Copy: Check terminal contexts" })).toBeTruthy();
    view.rerender(<CliCompanionPanel targets={[]} statuses={null} loading={false} error={false} />);
    expect(screen.getByText(/No executable CLI targets/)).toBeTruthy();
  });

  it("announces clipboard failure without claiming success", async () => {
    writeText.mockRejectedValue(new Error("clipboard denied"));
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn(() => false),
    });
    render(<CliCompanionPanel targets={targets} statuses={null} loading={false} error={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy: Check terminal contexts" }));
    await waitFor(() =>
      expect(screen.getByText(/Could not copy/).getAttribute("role")).toBe("status")
    );
    expect(screen.queryByText("Copied!")).toBeNull();
  });
});
