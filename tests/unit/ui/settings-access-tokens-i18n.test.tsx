import React from "react";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AccessTokensTab from "@/app/(dashboard)/dashboard/settings/components/AccessTokensTab";
import zh from "@/i18n/messages/zh-CN.json";

const token = {
  id: "demo/read",
  name: "Laptop",
  scope: "read",
  tokenPrefix: "omni_demo",
  createdAt: "2026-01-02T03:04:00Z",
  lastUsedAt: "2026-01-03T04:05:00Z",
  expiresAt: "2027-01-02T03:04:00Z",
  revokedAt: null,
};
// Exercise the real catalog and formatter, not the global key-only test mock.
vi.unmock("next-intl");

const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
const fetchMock = vi.fn<typeof fetch>();
function mount() {
  return render(
    <NextIntlClientProvider
      locale="zh-CN"
      timeZone="UTC"
      messages={{ settings: zh.settings, common: zh.common }}
      onError={(error) => {
        throw error;
      }}
    >
      <AccessTokensTab />
    </NextIntlClientProvider>
  );
}
beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation(async () => reply({ tokens: [token] }));
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("access-token settings with real Chinese catalogs", () => {
  it("translates the table, scope badges and status, and formats dates in the UI locale", async () => {
    fetchMock.mockResolvedValueOnce(
      reply({
        tokens: [
          token,
          { ...token, id: "write", name: "Writer", scope: "write" },
          {
            ...token,
            id: "admin",
            name: "Admin machine",
            scope: "admin",
            revokedAt: "2026-01-04T00:00:00Z",
            lastUsedAt: null,
            expiresAt: null,
          },
        ],
      })
    );
    mount();
    const table = await screen.findByRole("table");
    expect(screen.getByRole("heading", { name: "访问令牌" })).toBeTruthy();
    for (const label of ["权限范围", "上次使用", "到期时间", "读取", "写入", "管理员", "已撤销"])
      expect(within(table).getByText(label)).toBeTruthy();
    const expected = new Intl.DateTimeFormat("zh-CN", {
      timeZone: "UTC",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(token.lastUsedAt));
    expect(within(table).getAllByText(expected)).toHaveLength(2);
    expect(within(table).getAllByText("—")).toHaveLength(2);
    expect(within(table).queryByText("read")).toBeNull();
  });

  it("keeps malformed dates from breaking the translated token table", async () => {
    fetchMock.mockResolvedValueOnce(
      reply({ tokens: [{ ...token, lastUsedAt: "not-a-date", expiresAt: "invalid" }] })
    );
    mount();
    const table = await screen.findByRole("table");
    expect(within(table).getByText("Laptop")).toBeTruthy();
    expect(within(table).getAllByText("—")).toHaveLength(2);
  });

  it("creates, copies and dismisses a token without translating its secret or scope payload", async () => {
    mount();
    await screen.findByRole("table");
    const copy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: copy },
    });
    fireEvent.change(screen.getByPlaceholderText("名称（例如：笔记本电脑）"), {
      target: { value: "  Remote laptop  " },
    });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "admin" } });
    fireEvent.change(screen.getByPlaceholderText("有效期（天，可选）"), { target: { value: "7" } });
    let resolve!: (value: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise((done) => {
          resolve = done;
        })
    );
    fireEvent.click(screen.getByRole("button", { name: "创建" }));
    expect(screen.getByRole("button", { name: "正在创建…" })).toHaveProperty("disabled", true);
    const call = fetchMock.mock.calls.at(-1);
    expect(call?.[1]?.method).toBe("POST");
    expect(JSON.parse(String(call?.[1]?.body))).toEqual({
      name: "Remote laptop",
      scope: "admin",
      expiresInDays: 7,
    });
    resolve(reply({ token: "omni_disposable_test_secret" }));
    await screen.findByText("请立即复制此令牌，之后将不再显示：");
    expect(screen.getByText("omni_disposable_test_secret")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "复制" }));
    await screen.findByRole("button", { name: "已复制" });
    expect(copy).toHaveBeenCalledWith("omni_disposable_test_secret");
    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    expect(screen.queryByText("omni_disposable_test_secret")).toBeNull();
  });

  it("uses a localized create failure instead of surfacing English transport errors", async () => {
    mount();
    await screen.findByRole("table");
    fireEvent.change(screen.getByPlaceholderText("名称（例如：笔记本电脑）"), {
      target: { value: "demo" },
    });
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    fireEvent.click(screen.getByRole("button", { name: "创建" }));
    await screen.findByText("无法创建令牌。");
    expect(screen.queryByText("Failed to fetch")).toBeNull();
  });

  it.each([
    [
      { error: { message: "expiresInDays must not exceed 3650" } },
      "expiresInDays must not exceed 3650",
    ],
    [{ error: "Permission denied by policy" }, "Permission denied by policy"],
    [{ error: {} }, "HTTP 400"],
  ])(
    "retains server diagnostics with a localized create error prefix (%j)",
    async (body, detail) => {
      mount();
      await screen.findByRole("table");
      fireEvent.change(screen.getByPlaceholderText("名称（例如：笔记本电脑）"), {
        target: { value: "demo" },
      });
      fetchMock.mockResolvedValueOnce(reply(body, 400));
      fireEvent.click(screen.getByRole("button", { name: "创建" }));
      await screen.findByText(`无法创建令牌。 ${detail}`);
    }
  );

  it("localizes revoke confirmation, cancel and errors, retaining the encoded token id", async () => {
    mount();
    await screen.findByRole("table");
    fireEvent.click(screen.getByRole("button", { name: "撤销" }));
    let dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("撤销访问令牌")).toBeTruthy();
    expect(within(dialog).getByText(zh.settings.accessTokensRevokeConfirm)).toBeTruthy();
    fireEvent.click(within(dialog).getByRole("button", { name: zh.common.cancel }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(fetchMock.mock.calls.some(([, init]) => init?.method === "DELETE")).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "撤销" }));
    dialog = screen.getByRole("dialog");
    fetchMock.mockResolvedValueOnce(reply({}, 500));
    fireEvent.click(within(dialog).getByRole("button", { name: "撤销" }));
    await screen.findByText("无法撤销令牌。");
    expect(fetchMock).toHaveBeenLastCalledWith("/api/cli/tokens/demo%2Fread", { method: "DELETE" });
  });

  it("reloads the localized status after successful revocation", async () => {
    mount();
    await screen.findByRole("table");
    fireEvent.click(screen.getByRole("button", { name: "撤销" }));
    fetchMock.mockResolvedValueOnce(reply({ ok: true }));
    fetchMock.mockResolvedValueOnce(
      reply({ tokens: [{ ...token, revokedAt: "2026-01-04T00:00:00Z" }] })
    );
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "撤销" }));
    await screen.findByText("已撤销");
    await waitFor(() => expect(screen.queryByRole("button", { name: "撤销" })).toBeNull());
  });

  it("translates empty and failed-load states", async () => {
    fetchMock.mockResolvedValueOnce(reply({ tokens: [] }));
    const view = mount();
    await screen.findByText("暂无访问令牌。");
    view.unmount();
    fetchMock.mockResolvedValueOnce(reply({}, 503));
    mount();
    await screen.findByText("无法加载访问令牌。");
  });
});
