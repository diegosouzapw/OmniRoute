import test from "node:test";
import assert from "node:assert/strict";
import {
  SELF_HOP_HEADER,
  isOwnListenerSelfHop,
  isOwnListenerUrl,
  ownListenerSelfHopToken,
  stampOwnListenerSelfHop,
} from "../../open-sse/utils/selfHop.ts";
import { isInternalAdmissionBypass } from "../../src/shared/middleware/chatAdmissionIdentity.ts";

test("#13593 own-listener URLs are the loopback listen port only", () => {
  const previous = process.env.PORT;
  process.env.PORT = "20128";
  try {
    assert.equal(isOwnListenerUrl("http://127.0.0.1:20128/v1/chat/completions"), true);
    assert.equal(isOwnListenerUrl("http://localhost:20128/v1/messages"), true);
    assert.equal(isOwnListenerUrl("http://127.0.0.1:9/v1/chat/completions"), false);
    assert.equal(isOwnListenerUrl("https://api.openai.com/v1/chat/completions"), false);
  } finally {
    if (previous === undefined) delete process.env.PORT;
    else process.env.PORT = previous;
  }
});

test("#13593 a matching self-hop token skips public admission pressure", () => {
  const previous = process.env.PORT;
  process.env.PORT = "20128";
  const init: { headers?: HeadersInit } = { headers: new Headers() };
  stampOwnListenerSelfHop("http://127.0.0.1:20128/v1/chat/completions", init);
  const request = new Request("http://127.0.0.1:20128/v1/chat/completions", {
    headers: init.headers,
  });
  assert.equal(request.headers.get(SELF_HOP_HEADER), ownListenerSelfHopToken());
  assert.equal(isInternalAdmissionBypass(request), true);

  const forged = new Request("http://127.0.0.1:20128/v1/chat/completions", {
    headers: { [SELF_HOP_HEADER]: "internal" },
  });
  assert.equal(isOwnListenerSelfHop("internal"), false);
  assert.equal(isInternalAdmissionBypass(forged), false);
  if (previous === undefined) delete process.env.PORT;
  else process.env.PORT = previous;
});
