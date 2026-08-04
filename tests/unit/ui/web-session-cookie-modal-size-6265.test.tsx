// @vitest-environment jsdom
// Issue #6265 — the "Add session cookie" modal (AddApiKeyModal, shared by every
// `-web` cookie provider) was undersized on a 1920x1080 viewport: users had to
// scroll *inside* the modal to reach Save, and the top of the cookie helper text
// was clipped. Root cause: the height cap (`max-h-*` + `overflow-y-auto`) lived on
// the INNER body div only, while the OUTERMOST dialog wrapper had no height bound
// at all — so the whole box (header + body) could grow taller than the viewport
// and get clipped by the centering flexbox, independent of the inner scrollbar.
//
// Fix: move the single height cap to the outermost dialog wrapper (`role="dialog"`)
// and stop giving the inner body container its own independent `max-h-`/`overflow`
// cap, so there is exactly one scroll owner for the whole modal.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: AddApiKeyModal } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal");

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: Record<string, unknown>) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <AddApiKeyModal
        isOpen
        onSave={async () => undefined}
        onClose={() => {}}
        {...(props as any)}
      />
    );
  });
  containers.push({ root, el });
  return el;
}

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe("AddApiKeyModal — cookie modal sizing (#6265)", () => {
  it("caps height on the OUTERMOST dialog wrapper, not on an inner body div", () => {
    // chatgpt-web is a `kind: "cookie"` web-session provider — same shared modal
    // path lmarena/claude-web/gemini-web/kimi-web/z-ai all go through.
    const el = render({ provider: "chatgpt-web", providerName: "ChatGPT (Web)" });

    const dialog = el.querySelector<HTMLElement>('[role="dialog"]');
    expect(dialog).toBeTruthy();

    // The outermost wrapper must be the single owner of the height cap + scroll.
    expect(dialog!.className).toMatch(/max-h-\[90vh\]/);
    expect(dialog!.className).toMatch(/overflow-y-auto/);

    // The body container (last child of the dialog — header is first, no footer
    // prop is used by AddApiKeyModal) must NOT carry its own independent max-h/
    // overflow cap — otherwise the outer cap and the inner cap fight (double cap),
    // clipping content before the outer 90vh bound ever kicks in.
    const bodyDiv = dialog!.children[dialog!.children.length - 1] as HTMLElement;
    expect(bodyDiv).toBeTruthy();
    expect(bodyDiv.className).not.toMatch(/max-h-/);
    expect(bodyDiv.className).not.toMatch(/overflow-y-auto/);

    // Sanity: the cookie helper text and Save button are both present in the DOM
    // (this modal renders the full guide + form Save/Cancel inline in the body).
    expect(el.textContent).toContain("How to get the session credential");
    const saveBtn = Array.from(el.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "save"
    );
    expect(saveBtn).toBeTruthy();
  });
});
