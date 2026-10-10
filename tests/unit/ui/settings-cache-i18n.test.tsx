import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CacheSettingsTab from "@/app/(dashboard)/dashboard/settings/components/CacheSettingsTab";
import zh from "@/i18n/messages/zh-CN.json";

const model = {
  id: "openai/text-embedding-3-small",
  rawId: "text-embedding-3-small",
  name: "text-embedding-3-small",
  dimensions: 1536,
  maxTokens: 8191,
  supportedInputTypes: ["text", "image"],
};
const config = {
  modelCatalogCacheTtlMs: 1500,
  semanticCacheEnabled: true,
  semanticCacheVectorEnabled: false,
  semanticCacheEmbeddingProvider: "openai",
  semanticCacheEmbeddingModel: model.rawId,
  semanticCacheEmbeddingDimension: 1536,
  embeddingOptions: [{ id: "openai", name: "OpenAI", hasConnection: true, models: [model] }],
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
      <CacheSettingsTab />
    </NextIntlClientProvider>
  );
}

async function loaded() {
  const view = mount();
  await waitFor(() => expect(screen.getAllByRole("combobox")[0]).toHaveProperty("disabled", false));
  return view;
}

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation(async () => reply(config));
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("cache settings with real Chinese catalogs", () => {
  it("localizes headings, metadata, accessible controls, Redis and advanced overrides", async () => {
    await loaded();
    expect(screen.getByText("语义缓存")).toBeTruthy();
    expect(screen.getByRole("switch", { name: "启用向量相似度层" })).toHaveProperty(
      "ariaChecked",
      "false"
    );
    expect(screen.getByRole("option", { name: "OpenAI（已配置）" })).toHaveProperty(
      "value",
      "openai"
    );
    expect(
      screen.getByRole("option", { name: "text-embedding-3-small（1,536 维）" })
    ).toHaveProperty("value", model.rawId);
    expect(screen.getByText("使用已配置的连接（默认 URL）")).toBeTruthy();
    expect(screen.getByText("维度：1,536")).toBeTruthy();
    expect(screen.getByText("词元上限：8,191")).toBeTruthy();
    expect(screen.getByText("输入：文本和图像")).toBeTruthy();
    fireEvent.click(screen.getByRole("tab", { name: "Redis 向量存储" }));
    expect(screen.getByLabelText("Redis 键前缀")).toHaveProperty("value", "omniroute:semcache:");
    expect(screen.getByLabelText("Redis URL")).toHaveProperty(
      "placeholder",
      "redis://127.0.0.1:6379"
    );
    fireEvent.click(screen.getByRole("button", { name: "显示高级端点覆盖设置" }));
    expect(screen.getByLabelText("自定义嵌入 API 密钥")).toHaveProperty(
      "placeholder",
      "Bearer 令牌或 API 密钥"
    );
    expect(
      screen.getByRole("button", { name: "隐藏高级端点覆盖设置" }).getAttribute("aria-expanded")
    ).toBe("true");
    fireEvent.click(screen.getByRole("switch", { name: "启用语义缓存" }));
    expect(screen.getByText("已禁用")).toBeTruthy();
  });

  it("renders translated TTL validation and saves the unchanged numeric API payload", async () => {
    await loaded();
    const ttl = screen.getByLabelText(zh.settings.modelCatalogCacheTtlLabel);
    fireEvent.change(ttl, { target: { value: "" } });
    expect(screen.getByText("必填")).toBeTruthy();
    const save = screen.getByRole("button", { name: zh.settings.modelCatalogCacheTtlSave });
    expect(save).toHaveProperty("disabled", true);
    fireEvent.change(ttl, { target: { value: "50" } });
    expect(save).toHaveProperty("disabled", true);
    fireEvent.change(ttl, { target: { value: "5000" } });
    fetchMock.mockResolvedValueOnce(reply({ modelCatalogCacheTtlMs: 5000 }));
    fireEvent.click(save);
    await screen.findByText(zh.settings.cacheConfigSaveSuccess);
    const call = fetchMock.mock.calls.find(([, init]) => init?.method === "PUT");
    expect(JSON.parse(String(call?.[1]?.body))).toEqual({ modelCatalogCacheTtlMs: 5000 });
  });

  it("localizes saving feedback without translating provider/model/backend wire values", async () => {
    await loaded();
    fireEvent.click(screen.getByRole("tab", { name: "Redis 向量存储" }));
    let resolve!: (value: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise((done) => {
          resolve = done;
        })
    );
    fireEvent.click(screen.getByRole("button", { name: "保存语义缓存" }));
    expect(screen.getByRole("button", { name: "正在保存…" })).toHaveProperty("disabled", true);
    resolve(reply({ ok: true }));
    await screen.findByText("语义缓存设置已保存。");
    const body = JSON.parse(String(fetchMock.mock.calls.at(-1)?.[1]?.body));
    expect(body).toMatchObject({
      semanticCacheBackend: "redis",
      semanticCacheEmbeddingProvider: "openai",
      semanticCacheEmbeddingModel: model.rawId,
      semanticCacheEmbeddingDimension: 1536,
      semanticCacheVectorEnabled: false,
      semanticCacheRedisPrefix: "omniroute:semcache:",
      semanticCacheTTL: 1800000,
    });
    fetchMock.mockResolvedValueOnce(reply({}, 500));
    fireEvent.click(screen.getByRole("button", { name: "保存语义缓存" }));
    await screen.findByText("无法保存语义缓存设置。");
  });

  it.each([undefined, "https://example.com/v1"])(
    "formats complete embedding success messages (endpoint %s)",
    async (url) => {
      await loaded();
      fetchMock.mockResolvedValueOnce(
        reply({ ok: true, dimensions: 1536, latencyMs: 25, resolvedBaseUrl: url })
      );
      fireEvent.click(screen.getByRole("button", { name: "测试嵌入模型" }));
      await screen.findByText("连接已验证：");
      expect(
        screen.getByText(
          url
            ? "已通过 https://example.com/v1 在 25 毫秒内生成 1,536 维嵌入。"
            : "已在 25 毫秒内生成 1,536 维嵌入。"
        )
      ).toBeTruthy();
      expect(JSON.parse(String(fetchMock.mock.calls.at(-1)?.[1]?.body))).toMatchObject({
        provider: "openai",
        model: model.rawId,
        dimensions: 1536,
      });
    }
  );

  it("localizes connection errors and missing diagnostics", async () => {
    await loaded();
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    fireEvent.click(screen.getByRole("button", { name: "测试嵌入模型" }));
    await screen.findByText("无法测试嵌入连接。");
    expect(screen.queryByText("Failed to fetch")).toBeNull();
    fetchMock.mockResolvedValueOnce(reply({ ok: false }, 400));
    fireEvent.click(screen.getByRole("button", { name: "测试嵌入模型" }));
    await screen.findByText("未知错误");
    fetchMock.mockResolvedValueOnce(reply({ ok: false, error: "upstream-diagnostic-code" }));
    fireEvent.click(screen.getByRole("button", { name: "测试嵌入模型" }));
    await screen.findByText("upstream-diagnostic-code");
  });

  it("localizes purge success and failure while retaining DELETE semantics", async () => {
    await loaded();
    fetchMock.mockResolvedValueOnce(reply({ ok: true }));
    fireEvent.click(screen.getByRole("button", { name: "清空缓存" }));
    await screen.findByText("语义缓存已清空。");
    expect(fetchMock).toHaveBeenLastCalledWith("/api/cache", { method: "DELETE" });
    fetchMock.mockResolvedValueOnce(reply({}, 500));
    fireEvent.click(screen.getByRole("button", { name: "清空缓存" }));
    await screen.findByText("无法清空缓存。 HTTP 500");
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    fireEvent.click(screen.getByRole("button", { name: "清空缓存" }));
    await screen.findByText("无法清空缓存。");
  });

  it("localizes initial load failure", async () => {
    fetchMock.mockResolvedValueOnce(reply({}, 503));
    mount();
    await screen.findByText(zh.settings.cacheConfigLoadFailed);
  });
});
