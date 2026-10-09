import test from "node:test";
import assert from "node:assert/strict";
import { DeepSeekWebExecutor, tokenCache } from "../../open-sse/executors/deepseek-web.ts";

const PNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP1sAAAAASUVORK5CYII=";
const imageMessage = {
  role: "user",
  content: [
    { type: "text", text: "What is pictured?" },
    { type: "image_url", image_url: { url: `data:image/png;base64,${PNG}` } },
  ],
};
const json = (biz: unknown) =>
  new Response(JSON.stringify({ code: 0, data: { biz_code: 0, biz_data: biz } }));

test("executor uploads an inline photo and sends the resulting ref_file_ids", async () => {
  const originalFetch = globalThis.fetch;
  tokenCache.clear();
  let uploads = 0;
  let completion: Record<string, unknown> | undefined;
  const targets: string[] = [];
  globalThis.fetch = async (input, init = {}) => {
    const url = String(input);
    if (url.includes("/users/current")) return json({ token: "synthetic-image-access-token" });
    if (url.includes("/create_pow_challenge")) {
      const target = JSON.parse(String(init.body)).target_path;
      targets.push(target);
      return json({
        challenge: {
          algorithm: "DeepSeekHashV1",
          challenge: "311b26ae1e0fe7375e242958ce46db5552a6c67fea3f96880dcd846c63a74286",
          salt: "1122334455667788",
          signature: "synthetic",
          difficulty: 1,
          expire_at: 1778891543095,
          expire_after: 300000,
          target_path: target,
        },
      });
    }
    if (url.includes("/upload_file")) {
      uploads++;
      assert.ok(init.body instanceof ArrayBuffer);
      const multipart = await new Request(url, {
        method: "POST",
        headers: init.headers,
        body: init.body,
      }).formData();
      const file = multipart.get("file");
      assert.ok(file instanceof Blob);
      assert.equal(file.type, "image/png");
      assert.match(
        new Headers(init.headers).get("Content-Type")!,
        /multipart\/form-data; boundary=/
      );
      const pow = JSON.parse(
        Buffer.from(new Headers(init.headers).get("X-DS-PoW-Response")!, "base64").toString()
      );
      assert.equal(pow.target_path, "/api/v0/file/upload_file");
      return json({ id: "uploaded-image", status: "SUCCESS" });
    }
    if (url.includes("/chat_session/create"))
      return json({ chat_session: { id: "image-session" } });
    if (url.includes("/chat_session/delete")) return json({});
    if (url.includes("/chat/completion")) {
      completion = JSON.parse(String(init.body));
      return new Response(
        'data: {"v":{"response":{"fragments":[{"type":"RESPONSE","content":"a circle"}]}}}\n\ndata: {"p":"response/status","o":"SET","v":"FINISHED"}\n\n'
      );
    }
    throw new Error("Unexpected request");
  };
  try {
    const result = await new DeepSeekWebExecutor().execute({
      model: "deepseek-v4-flash",
      stream: false,
      credentials: { apiKey: "synthetic-image-user-token" },
      body: { messages: [imageMessage], ref_file_ids: ["existing-file"] },
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 200, await result.response.text());
    assert.equal(uploads, 1);
    assert.deepEqual(completion?.ref_file_ids, ["existing-file", "uploaded-image"]);
    assert.match(String(completion?.prompt), /What is pictured/);
    assert.deepEqual(targets, ["/api/v0/file/upload_file", "/api/v0/chat/completion"]);
  } finally {
    globalThis.fetch = originalFetch;
    tokenCache.clear();
  }
});

const { uploadDeepSeekImages, resolveDeepSeekImages, DeepSeekImageError } =
  await import("../../open-sse/executors/deepseek-web/image-upload.ts");

async function withImageFetch(impl: typeof fetch, fn: () => Promise<void>) {
  const previous = globalThis.fetch;
  globalThis.fetch = impl;
  try {
    await fn();
  } finally {
    globalThis.fetch = previous;
  }
}

const uploadOptions = (account: string) => ({
  messages: [imageMessage],
  headers: { Authorization: `Bearer synthetic-${account}`, "Content-Type": "application/json" },
  createPowHeader: async () => "synthetic-pow",
  pollMs: 1,
});

test("waits for processing and preserves the same account credentials", async () => {
  let polls = 0;
  await withImageFetch(
    async (input, init) => {
      assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer synthetic-polling");
      if (String(input).includes("upload_file"))
        return json({ id: "pending-image", status: "PENDING" });
      assert.match(String(input), /fetch_files\?file_ids=pending-image/);
      polls++;
      return json({
        files: [{ id: "pending-image", status: polls === 1 ? "PARSING" : "SUCCESS" }],
      });
    },
    async () => {
      assert.deepEqual(await uploadDeepSeekImages(uploadOptions("polling")), ["pending-image"]);
      assert.equal(polls, 2);
    }
  );
});

test("caches only completed file IDs and isolates accounts", async () => {
  let uploads = 0;
  await withImageFetch(
    async () => json({ id: `cache-file-${++uploads}`, status: "SUCCESS" }),
    async () => {
      assert.deepEqual(await uploadDeepSeekImages(uploadOptions("cache-one")), ["cache-file-1"]);
      assert.deepEqual(await uploadDeepSeekImages(uploadOptions("cache-one")), ["cache-file-1"]);
      assert.deepEqual(await uploadDeepSeekImages(uploadOptions("cache-two")), ["cache-file-2"]);
      assert.equal(uploads, 2);
    }
  );
});

test("deduplicates repeated photos within a request", async () => {
  let uploads = 0;
  await withImageFetch(
    async () => {
      uploads++;
      return json({ id: "dedup-file", status: "SUCCESS" });
    },
    async () => {
      const options = uploadOptions("dedup");
      options.messages.push(imageMessage);
      assert.deepEqual(await uploadDeepSeekImages(options), ["dedup-file"]);
      assert.equal(uploads, 1);
    }
  );
});

test("rejects malformed base64 and MIME-spoofed non-images", async () => {
  for (const url of [
    "data:image/png;base64,%%%%",
    "data:image/png;base64,aGVsbG8=",
    "data:image/svg+xml;base64,PHN2Zz4=",
    "data:image/png;base64,A",
  ]) {
    await assert.rejects(
      resolveDeepSeekImages([{ content: [{ type: "image_url", image_url: { url } }] }]),
      (error: unknown) => error instanceof DeepSeekImageError && error.status === 400
    );
  }
});

test("rejects private remote images without making an HTTP request", async () => {
  await withImageFetch(
    async () => {
      throw new Error("Must not fetch a private address");
    },
    async () => {
      await assert.rejects(
        resolveDeepSeekImages([
          { content: [{ type: "image_url", image_url: { url: "https://127.0.0.1/private" } }] },
        ]),
        /public HTTPS/
      );
    }
  );
});

test("text-only requests do not fetch or compute upload PoW", async () => {
  await withImageFetch(
    async () => {
      throw new Error("Must not fetch");
    },
    async () => {
      assert.deepEqual(
        await uploadDeepSeekImages({
          ...uploadOptions("text"),
          messages: [{ role: "user", content: "Hello" }],
          createPowHeader: async () => {
            throw new Error("Must not solve");
          },
        }),
        []
      );
    }
  );
});

test("rejects a failed processing status and missing file ID", async () => {
  for (const biz of [{ id: "failed-file", status: "FAILED" }, {}]) {
    await withImageFetch(
      async () => json(biz),
      async () => {
        await assert.rejects(uploadDeepSeekImages(uploadOptions("failed")), DeepSeekImageError);
      }
    );
  }
});

test("preserves upstream auth and rate-limit HTTP errors without exposing response text", async () => {
  for (const status of [401, 403, 429]) {
    await withImageFetch(
      async () => new Response("sensitive upstream body", { status }),
      async () => {
        await assert.rejects(
          uploadDeepSeekImages(uploadOptions(`http-${status}`)),
          (error: unknown) =>
            error instanceof DeepSeekImageError &&
            error.status === status &&
            !error.message.includes("sensitive")
        );
      }
    );
  }
});

test("HTTP 200 business errors are failures even when they contain file IDs", async () => {
  await withImageFetch(
    async () =>
      new Response(
        JSON.stringify({
          code: 0,
          data: { biz_code: 123, biz_data: { id: "must-not-cache", status: "SUCCESS" } },
        })
      ),
    async () => {
      await assert.rejects(uploadDeepSeekImages(uploadOptions("business")), /rejected/);
    }
  );
});

test("processing timeout is bounded and caller cancellation propagates", async () => {
  await withImageFetch(
    async () => json({ id: "timeout-file", status: "PENDING" }),
    async () => {
      await assert.rejects(
        uploadDeepSeekImages({ ...uploadOptions("timeout"), timeoutMs: 10, pollMs: 100 }),
        (error: unknown) => error instanceof DeepSeekImageError && error.status === 504
      );
      const controller = new AbortController();
      controller.abort();
      await assert.rejects(
        uploadDeepSeekImages({ ...uploadOptions("cancel"), signal: controller.signal }),
        (error: unknown) => error instanceof Error && error.name === "AbortError"
      );
    }
  );
});

const { deepseek_webProvider } =
  await import("../../open-sse/config/providers/registry/deepseek/web/index.ts");
test("the live-validated Flash model advertises vision to combo routing", () => {
  assert.equal(
    deepseek_webProvider.models.find((model) => model.id === "deepseek-v4-flash")?.supportsVision,
    true
  );
});
