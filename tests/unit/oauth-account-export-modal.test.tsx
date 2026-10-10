import React from "react";
import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../src/i18n/messages/en.json";
import { OAuthExportImportModal } from "../../src/app/(dashboard)/dashboard/providers/components/OAuthExportImportModal";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function show(onImported = vi.fn(async () => {}), onClose = vi.fn()) {
  const view = render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <OAuthExportImportModal isOpen onClose={onClose} onImported={onImported} />
    </NextIntlClientProvider>
  );
  return { ...view, onImported, onClose };
}

function upload(records: unknown) {
  fireEvent.change(screen.getByLabelText("Account export JSON file"), {
    target: {
      files: [
        {
          name: "fixture.json",
          size: 200,
          text: async () => JSON.stringify(records),
        },
      ],
    },
  });
}

test("previews accounts, imports only selected rows, and refreshes providers", async () => {
  const fetch = vi.fn(async (_input: RequestInfo | URL, _init?: RequestInit) =>
    Response.json({ success: true, imported: 1, failed: 0, total: 1 })
  );
  vi.stubGlobal("fetch", fetch);
  const { onImported } = show();
  const records = [
    {
      email: "first@example.com",
      token: { access_token: "test-one", refresh_token: "test-refresh" },
    },
    { email: "second@example.com", token: { access_token: "test-two" } },
  ];
  upload({ accounts: records });
  await screen.findByText("first@example.com");
  fireEvent.click(screen.getByLabelText("Select account 2"));
  fireEvent.click(screen.getByRole("button", { name: /Import 1 account/ }));
  await screen.findByText(/Imported 1\/1/);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(JSON.parse(fetch.mock.calls[0][1]?.body as string)).toEqual({ accounts: [records[0]] });
  await waitFor(() => expect(onImported).toHaveBeenCalledTimes(1));
});

test("malformed JSON cannot enable import", async () => {
  show();
  fireEvent.change(screen.getByLabelText("Account export JSON file"), {
    target: {
      files: [
        {
          name: "fixture.json",
          size: 10,
          text: async () => "not-json",
        },
      ],
    },
  });
  await screen.findByText("Could not read any accounts from this file.");
  expect(screen.getByRole("button", { name: /Import 0 account/ }).hasAttribute("disabled")).toBe(
    true
  );
});

test("camel-case refresh token is previewed and file replacement is disabled during import", async () => {
  let complete!: (response: Response) => void;
  vi.stubGlobal(
    "fetch",
    vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          complete = resolve;
        })
    )
  );
  show();
  upload({
    accounts: [
      {
        email: "camel@example.com",
        token: { accessToken: "test-access", refreshToken: "test-refresh" },
      },
    ],
  });
  await screen.findByText("camel@example.com");
  expect(screen.getByText("yes")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: /Import 1 account/ }));
  expect(screen.getByRole("button", { name: /Choose.*file/i }).hasAttribute("disabled")).toBe(true);
  complete(Response.json({ success: true, imported: 1, failed: 0, total: 1 }));
  await screen.findByText(/Imported 1\/1/);
  expect(screen.getByRole("button", { name: /Choose.*file/i }).hasAttribute("disabled")).toBe(
    false
  );
});

test("closing clears account preview before reopening", async () => {
  const view = show();
  upload({ accounts: [{ email: "clear@example.com", token: { access_token: "test-one" } }] });
  await screen.findByText("clear@example.com");
  fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(view.onClose).toHaveBeenCalledOnce();
  expect(screen.queryByText("clear@example.com")).toBeNull();
});
