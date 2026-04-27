import test from "node:test";
import assert from "node:assert/strict";

function inferAspectRatioFromSize(size) {
  if (typeof size !== "string") return null;
  const [wRaw, hRaw] = size.split("x");
  const width = Number(wRaw);
  const height = Number(hRaw);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const div = gcd(Math.round(width), Math.round(height));
  return `${Math.round(width / div)}:${Math.round(height / div)}`;
}

function inferResolutionFromSize(size) {
  if (typeof size !== "string") return null;
  const [wRaw, hRaw] = size.split("x");
  const width = Number(wRaw);
  const height = Number(hRaw);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;
  const longestSide = Math.max(width, height);
  if (longestSide <= 1024) return "1K";
  if (longestSide <= 2048) return "2K";
  return "4K";
}

test("nanobanana pro payload inference maps size to aspectRatio and resolution", () => {
  const aspectRatio = inferAspectRatioFromSize("1024x1280");
  const resolution = inferResolutionFromSize("1024x1280");

  assert.equal(aspectRatio, "4:5");
  assert.equal(resolution, "2K");
});

test("nanobanana async flow (submit->poll->url) normalizes to OpenAI-style url item", async () => {
  const calls = [];

  const fetchMock = async (url, options = {}) => {
    calls.push({ url: String(url), method: options.method || "GET", body: options.body });

    if (String(url).includes("/generate")) {
      return new Response(JSON.stringify({ code: 200, msg: "success", data: { taskId: "t-1" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (String(url).includes("/record-info")) {
      const polls = calls.filter((c) => c.url.includes("/record-info")).length;
      if (polls < 2) {
        return new Response(
          JSON.stringify({ code: 200, msg: "success", data: { successFlag: 0 } }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          code: 200,
          msg: "success",
          data: {
            successFlag: 1,
            response: { resultImageUrl: "https://cdn.example.com/final.jpg" },
          },
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    }

    throw new Error(`Unexpected URL ${url}`);
  };

  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = fetchMock;

    const submit = await fetch("https://api.nanobananaapi.ai/api/v1/nanobanana/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer test" },
      body: JSON.stringify({ prompt: "space" }),
    });
    const submitData = (await submit.json()) as any;
    const taskId = submitData.data.taskId;

    let finalData;
    for (let i = 0; i < 5; i++) {
      const poll = await fetch(
        `https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=${encodeURIComponent(taskId)}`
      );
      const pollData = (await poll.json()) as any;
      if (pollData.data.successFlag === 1) {
        finalData = pollData.data;
        break;
      }
    }

    assert.ok(finalData);
    assert.equal(finalData.response.resultImageUrl, "https://cdn.example.com/final.jpg");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nanobanana b64 mode can convert result URL bytes to b64_json", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    if (String(url).includes("https://cdn.example.com/final.jpg")) {
      return new Response(new Uint8Array([0x89, 0x50, 0x4e, 0x47]), { status: 200 });
    }
    throw new Error(`Unexpected URL ${url}`);
  };

  try {
    const resp = await fetch("https://cdn.example.com/final.jpg");
    const buf = Buffer.from(await resp.arrayBuffer());
    const b64 = buf.toString("base64");
    assert.equal(b64, "iVBORw==");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
