import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  collectChatGptWebFirstPartyAssetCandidates,
  executeChatGptWebFirstPartyTurn,
  extractChatGptWebFirstPartyAssetReferences,
  parseChatGptWebFirstPartyModuleContract,
  type ChatGptWebFirstPartyModuleContract,
} from "../../open-sse/utils/chatgptWebFirstParty.ts";
import type { ChatGptWebResolvedAttachment } from "../../open-sse/utils/chatgptWebAttachments.ts";

type SafePost = (path: string, options: Record<string, unknown>) => Promise<unknown>;

const BRIDGE_KEY = "__omnirouteChatGptFirstPartyV1";
const ABORT_KEY = "__omnirouteChatGptAbortV1";

function createDirectPage(): import("playwright").Page {
  return {
    async evaluate(
      pageFunction: (argument: unknown) => unknown | Promise<unknown>,
      argument: unknown
    ) {
      return pageFunction(argument);
    },
  } as unknown as import("playwright").Page;
}

function installFirstPartyBridge(safePost: SafePost): () => void {
  const root = globalThis as typeof globalThis & Record<string, unknown>;
  const previousBridge = root[BRIDGE_KEY];
  const previousAbortStore = root[ABORT_KEY];
  root[BRIDGE_KEY] = {
    finalizeRequirements: async () => ({}),
    proofManager: { getEnforcementToken: async () => "proof" },
    turnstileManager: { getEnforcementToken: async () => "turnstile" },
    requestClient: { safePost },
    buildSentinelHeaders: () => ({ "OpenAI-Sentinel-Proof-Token": "proof" }),
  };
  return () => {
    if (previousBridge === undefined) delete root[BRIDGE_KEY];
    else root[BRIDGE_KEY] = previousBridge;
    if (previousAbortStore === undefined) delete root[ABORT_KEY];
    else root[ABORT_KEY] = previousAbortStore;
  };
}

describe("ChatGPT Web first-party module contract discovery", () => {
  test("discovers semantic helpers without pinning minified export names", () => {
    const source = [
      "async function aa(e,t){let[r,i]=await Promise.all([cc.getEnforcementToken(t,{forceSync:!0}),dd.getEnforcementToken(t)]);return[r,i]}",
      "function ff(e=!1,t=`none`){return gg(`finalized`,e,t)}",
      "async function hh(){return ee.safePost(`/sentinel/chat-requirements/prepare`,{})}",
      "function ii(e,t,n,r,i,a){let o={};return e?.token?o[`OpenAI-Sentinel-Chat-Requirements-Token`]=e.token:o}",
      "export{ff as A,cc as B,dd as C,ee as D,ii as E};",
    ].join(";");

    assert.deepEqual(parseChatGptWebFirstPartyModuleContract(source), {
      finalizeRequirements: "A",
      proofManager: "B",
      turnstileManager: "C",
      requestClient: "D",
      buildSentinelHeaders: "E",
    } satisfies ChatGptWebFirstPartyModuleContract);
  });

  test("accepts the optional first-party send policy on requirement finalization", () => {
    const source = [
      "async function aa(e,t){let[r,i]=await Promise.all([cc.getEnforcementToken(t,{forceSync:!0}),dd.getEnforcementToken(t)]);return[r,i]}",
      "function ff(e=!1,t=`none`,n=rr.SendIfAvailable){return gg(`finalized`,e,t,n)}",
      "async function hh(){return ee.safePost(`/sentinel/chat-requirements/prepare`,{})}",
      "function ii(e,t,n,r,i,a){let o={};return e?.token?o[`OpenAI-Sentinel-Chat-Requirements-Token`]=e.token:o}",
      "export{ff as A,cc as B,dd as C,ee as D,ii as E};",
    ].join(";");

    assert.deepEqual(parseChatGptWebFirstPartyModuleContract(source), {
      finalizeRequirements: "A",
      proofManager: "B",
      turnstileManager: "C",
      requestClient: "D",
      buildSentinelHeaders: "E",
    } satisfies ChatGptWebFirstPartyModuleContract);
  });

  test("fails closed when an upstream asset no longer exposes the observed contract", () => {
    assert.throws(
      () => parseChatGptWebFirstPartyModuleContract("export{unrelated as A};"),
      /first-party module contract/
    );
  });

  test("follows only strict first-party relative chunk references", () => {
    const parent = "https://chatgpt.com/cdn/assets/entry-current.js";
    const source = [
      'import{a}from"./4813494d-current.js";',
      'import("./lazy_chunk-2.js");',
      'import("https://example.com/foreign.js");',
      'const ignored="../outside.js";',
    ].join("");

    assert.deepEqual(extractChatGptWebFirstPartyAssetReferences(source, parent), [
      "https://chatgpt.com/cdn/assets/4813494d-current.js",
      "https://chatgpt.com/cdn/assets/lazy_chunk-2.js",
    ]);
  });

  test("discovers first-party modules exposed only through modulepreload links", () => {
    assert.deepEqual(
      collectChatGptWebFirstPartyAssetCandidates(
        [],
        [
          "https://chatgpt.com/cdn/assets/4813494d-current.js",
          "https://chatgpt.com/cdn/assets/root-current.css",
        ]
      ),
      ["https://chatgpt.com/cdn/assets/4813494d-current.js"]
    );
  });
});

describe("ChatGPT Web first-party request execution", () => {
  test("uploads image and file inputs before submitting the observed conversation body", async () => {
    const originalFetch = globalThis.fetch;
    const uploadedTypes: string[] = [];
    let registrationIndex = 0;
    let conversationOptions: Record<string, unknown> | null = null;
    globalThis.fetch = (async (_input, init) => {
      uploadedTypes.push(new Headers(init?.headers).get("content-type") ?? "");
      return new Response(null, { status: 201 });
    }) as typeof fetch;
    const restoreBridge = installFirstPartyBridge(async (path, options) => {
      if (path === "/files") {
        registrationIndex += 1;
        return {
          file_id: `file-${registrationIndex}`,
          upload_url: `https://uploads.oaiusercontent.com/file-${registrationIndex}`,
        };
      }
      if (path === "/files/process_upload_stream") {
        return new Response(null, { status: 200 });
      }
      if (path === "/f/conversation") {
        conversationOptions = options;
        return new Response("data: [DONE]\n\n", { status: 200 });
      }
      throw new Error(`Unexpected first-party path: ${path}`);
    });
    const attachments: ChatGptWebResolvedAttachment[] = [
      {
        kind: "image",
        name: "pixel.png",
        mimeType: "image/png",
        size: 4,
        data: Buffer.from([1, 2, 3, 4]),
        width: 1,
        height: 1,
      },
      {
        kind: "file",
        name: "notes.txt",
        mimeType: "text/plain",
        size: 5,
        data: Buffer.from("hello"),
      },
    ];

    try {
      const body = await executeChatGptWebFirstPartyTurn(createDirectPage(), {
        prompt: "Inspect both attachments.",
        attachments,
        selection: { kind: "free", thinkEnabled: true },
      });

      assert.equal(body, "data: [DONE]\n\n");
      assert.deepEqual(uploadedTypes, ["image/png", "text/plain"]);
      const requestBody = conversationOptions?.requestBody as Record<string, unknown>;
      assert.equal(requestBody.model, "auto");
      assert.deepEqual(requestBody.system_hints, ["reason"]);
      const messages = requestBody.messages as Array<Record<string, unknown>>;
      const content = messages[0].content as Record<string, unknown>;
      assert.equal(content.content_type, "multimodal_text");
      assert.deepEqual(content.parts, [
        {
          content_type: "image_asset_pointer",
          asset_pointer: "sediment://file-1",
          size_bytes: 4,
          width: 1,
          height: 1,
        },
        "Inspect both attachments.",
      ]);
      const metadata = messages[0].metadata as Record<string, unknown>;
      const registered = metadata.attachments as Array<Record<string, unknown>>;
      assert.deepEqual(
        registered.map(({ id, mime_type: mimeType, name }) => ({ id, mimeType, name })),
        [
          { id: "file-1", mimeType: "image/png", name: "pixel.png" },
          { id: "file-2", mimeType: "text/plain", name: "notes.txt" },
        ]
      );
    } finally {
      restoreBridge();
      globalThis.fetch = originalFetch;
    }
  });

  test("preserves an upstream conversation 429 for account fallback", async () => {
    const restoreBridge = installFirstPartyBridge(async (path) => {
      if (path === "/f/conversation") return new Response(null, { status: 429 });
      throw new Error(`Unexpected first-party path: ${path}`);
    });
    try {
      await assert.rejects(
        executeChatGptWebFirstPartyTurn(createDirectPage(), {
          prompt: "quota probe",
          attachments: [],
          selection: { kind: "free", thinkEnabled: false },
        }),
        /conversation failed with status 429/
      );
    } finally {
      restoreBridge();
    }
  });

  test("preserves an attachment registration 429 for account fallback", async () => {
    const restoreBridge = installFirstPartyBridge(async (path) => {
      if (path === "/files") return new Response(null, { status: 429 });
      throw new Error(`Unexpected first-party path: ${path}`);
    });
    try {
      await assert.rejects(
        executeChatGptWebFirstPartyTurn(createDirectPage(), {
          prompt: "quota probe",
          attachments: [
            {
              kind: "image",
              name: "pixel.png",
              mimeType: "image/png",
              size: 1,
              data: Buffer.from([1]),
              width: 1,
              height: 1,
            },
          ],
          selection: { kind: "free", thinkEnabled: false },
        }),
        /file registration failed with status 429/
      );
    } finally {
      restoreBridge();
    }
  });
});
