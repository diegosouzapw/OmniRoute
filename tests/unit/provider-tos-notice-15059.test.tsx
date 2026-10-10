// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Socket } from "node:net";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-tos-notice-15059-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  API_KEY_SECRET: "synthetic-tos-notice-only-15059",
  JWT_SECRET: "synthetic-tos-notice-jwt-only-15059",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
});

const navigation = vi.hoisted(() => ({
  providerId: "kiro",
  search: new URLSearchParams(),
  router: { push: vi.fn(), replace: vi.fn(), back: vi.fn(), refresh: vi.fn() },
}));
vi.mock("next/navigation", () => ({
  useParams: () => ({ id: navigation.providerId }),
  useSearchParams: () => navigation.search,
  usePathname: () => `/dashboard/providers/${navigation.providerId}`,
  useRouter: () => navigation.router,
}));
vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

let Notice: React.ComponentType<{ providerId: string }>;
let Detail: React.ComponentType;
let Wizard: React.ComponentType;
let root: Root;
let container: HTMLDivElement;
const originalFetch = globalThis.fetch;
const connectGuard = vi.spyOn(Socket.prototype, "connect").mockImplementation(() => {
  throw new Error("15059 notice fixture forbids real sockets");
});

async function render(component: React.ReactNode) {
  await act(async () => {
    root.render(component);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

async function clickButton(text: string) {
  const button = [...container.querySelectorAll("button")].find((entry) =>
    entry.textContent?.includes(text)
  );
  expect(button, `visible button: ${text}`).toBeTruthy();
  await act(async () => {
    button!.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function policyLink() {
  return container.querySelector('a[href="/dashboard/combos#auto-tos-policy"]');
}

describe("#15059 provider connection notice", () => {
  beforeAll(async () => {
    ({ default: Notice } = await import("@/shared/components/ProviderTosNotice"));
    ({ default: Detail } =
      await import("@/app/(dashboard)/dashboard/providers/[id]/ProviderDetailPageClient"));
    ({ default: Wizard } =
      await import("@/app/(dashboard)/dashboard/providers/components/onboarding/ProviderOnboardingWizard"));
  }, 180_000);

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    navigation.providerId = "kiro";
    localStorage.clear();
    globalThis.fetch = vi.fn(async (_input, init) => {
      if (init?.method && init.method !== "GET") {
        throw new Error("Connection notice must not change settings or start authentication");
      }
      return Response.json({ connections: [], nodes: [], models: [], settings: {} });
    });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    globalThis.fetch = originalFetch;
  });

  afterAll(() => {
    connectGuard.mockRestore();
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  it.each(["agy", "antigravity", "kiro", "amazon-q", "opencode"])(
    "shows the curated avoid policy for %s",
    async (providerId) => {
      await render(<Notice providerId={providerId} />);
      expect(policyLink()).not.toBeNull();
      expect(container.textContent).toContain("excluded from auto by default");
      expect(globalThis.fetch).not.toHaveBeenCalled();
    }
  );

  it.each(["openai", "opencode-zen", "custom-node"])(
    "does not borrow an avoid verdict for %s",
    async (providerId) => {
      await render(<Notice providerId={providerId} />);
      expect(policyLink()).toBeNull();
      expect(container.textContent).toBe("");
    }
  );

  it("renders a normal provider without a ToS-avoid notice", async () => {
    navigation.providerId = "openai";
    await render(<Detail />);
    expect(container.textContent).toContain("OpenAI");
    expect(policyLink()).toBeNull();
  });

  it("explains the default auto policy before connecting Kiro even after generic acknowledgment", async () => {
    localStorage.setItem("omniroute-risk-acknowledged", JSON.stringify({ kiro: true }));
    await render(<Detail />);
    expect(container.textContent).toContain("Kiro AI");
    expect(policyLink(), "provider detail must point to the explicit auto policy").not.toBeNull();
    expect(container.textContent).toContain("Connecting an account does not change this policy");
    expect(
      vi
        .mocked(globalThis.fetch)
        .mock.calls.every(([, init]) => !init?.method || init.method === "GET")
    ).toBe(true);
  });

  it("shows the same warning in onboarding before starting the Kiro auth-method flow", async () => {
    await render(<Wizard />);
    await clickButton("OAuth provider");
    await clickButton("Kiro AI");
    expect(container.textContent).toContain("Start OAuth flow");
    expect(policyLink(), "onboarding must warn before the connection action").not.toBeNull();
    expect(container.textContent).toContain("Connecting an account does not change this policy");
  });
});
