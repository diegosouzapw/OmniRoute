import test from "node:test";
import assert from "node:assert/strict";

const { buildCoreModel, OWNED_TAG_PREFIX } =
  await import("../../src/lib/proxySubscription/coreConfig/model.ts");
const { renderSingBox, isSingBoxShape } =
  await import("../../src/lib/proxySubscription/coreConfig/singbox.ts");
const renderers = await import("../../src/lib/proxySubscription/coreConfig/renderers.ts");

function objNode(name: string, extra: Record<string, unknown> = {}): never {
  throw new Error(`test helper miswired: ${name} ${JSON.stringify(extra)}`);
}

function modelOf(count: number, opts?: { clash?: boolean; uri?: boolean }) {
  const nodes = Array.from({ length: count }, (_, i) => ({
    name: `node-${i + 1}`,
    source:
      opts?.clash || opts?.uri
        ? { kind: "uri" as const, value: `vless://u@example.com:443#node-${i + 1}` }
        : {
            kind: "object" as const,
            value: {
              type: "vless",
              server: `10.0.0.${i + 1}`,
              server_port: 443 + i,
              uuid: `uuid-${i + 1}`,
            },
          },
  }));
  return buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=a", "http://127.0.0.1:8080 selector=b"],
    nodes as never
  );
}

function realisticExisting(): string {
  return JSON.stringify(
    {
      log: { level: "info" },
      dns: { servers: ["https://1.1.1.1/dns-query"] },
      experimental: { clash_api: { external_controller: "127.0.0.1:9090" } },
      inbounds: [{ type: "mixed", tag: "user-in", listen: "127.0.0.1", listen_port: 7890 }],
      outbounds: [
        { type: "direct", tag: "direct" },
        { type: "selector", tag: "user-pick", outbounds: ["direct"] },
      ],
      route: {
        rules: [{ outbound: "direct", inbound: ["user-in"] }],
        final: "direct",
      },
    },
    null,
    2
  );
}

test("preserves dns, log, clash_api and user rules verbatim (deep compare)", () => {
  const before = JSON.parse(realisticExisting());
  const res = renderSingBox(modelOf(4), realisticExisting());
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const after = JSON.parse(res.text);
  assert.deepEqual(after.log, before.log);
  assert.deepEqual(after.dns, before.dns);
  assert.deepEqual(after.experimental, before.experimental);
  assert.ok(after.inbounds.some((i: { tag: string }) => i.tag === "user-in"));
  assert.ok(after.outbounds.some((o: { tag: string }) => o.tag === "direct"));
  assert.ok(after.outbounds.some((o: { tag: string }) => o.tag === "user-pick"));
  assert.ok(after.route.rules.some((r: { outbound: string }) => r.outbound === "direct"));
  assert.equal(after.route.final, "direct");
});

test("second render is unchanged", () => {
  const first = renderSingBox(modelOf(4), realisticExisting());
  assert.equal(first.ok, true);
  if (!first.ok) return;
  assert.equal(first.unchanged, false);
  const second = renderSingBox(modelOf(4), first.text);
  assert.equal(second.ok, true);
  if (!second.ok) return;
  assert.equal(second.unchanged, true);
  assert.equal(second.text, first.text);
});

test("removed member disappears, neighbors stay", () => {
  const m = modelOf(4);
  const first = renderSingBox(m, null);
  assert.equal(first.ok, true);
  if (!first.ok) return;
  const removedTag = `${OWNED_TAG_PREFIX}${m.nodes[3].tag}`;
  const small = buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=a", "http://127.0.0.1:8080 selector=b"],
    m.nodes.slice(0, 3) as never
  );
  const second = renderSingBox(small, first.text);
  assert.equal(second.ok, true);
  if (!second.ok) return;
  const after = JSON.parse(second.text);
  const tags = after.outbounds.map((o: { tag: string }) => o.tag);
  assert.ok(!tags.includes(removedTag), `removed ${removedTag} still present`);
  for (const n of small.nodes) assert.ok(tags.includes(`${OWNED_TAG_PREFIX}${n.tag}`));
});

test("refuses {} / not-json / array roots", () => {
  assert.deepEqual(renderSingBox(modelOf(1), "{}"), { ok: false, reason: "no_ownable_section" });
  assert.deepEqual(renderSingBox(modelOf(1), "not json"), { ok: false, reason: "unparseable" });
  assert.deepEqual(renderSingBox(modelOf(1), "[]"), { ok: false, reason: "not_an_object" });
});

test("clash or uri nodes are skipped, never converted", () => {
  const m = modelOf(2, { uri: true });
  const res = renderSingBox(m, null);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const shape = res.skipped.filter((s) => s.reason === "source_not_singbox_shape");
  assert.equal(shape.length, 2);
  const empty = res.skipped.filter((s) => s.reason === "empty_group");
  assert.equal(empty.length, m.groups.filter((g) => g.members.length > 0).length);
  const after = JSON.parse(res.text);
  assert.ok(!after.outbounds.some((o: { tag: string }) => m.nodes.some((n) => n.tag === o.tag)));
});

test("group with only skipped nodes emits neither group nor listener", () => {
  const single = buildCoreModel(["socks5://127.0.0.1:1080 selector=solo"], [
    { name: "x", source: { kind: "uri", value: "vless://u@1.1.1.1:443#x" } },
  ] as never);
  const res = renderSingBox(single, null);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const after = JSON.parse(res.text);
  assert.deepEqual(after.outbounds, []);
  assert.deepEqual(after.inbounds, []);
});

test("pre-existing owned-prefix tag is treated as owned (documented)", () => {
  const existing = JSON.stringify({
    inbounds: [
      { type: "socks", tag: `${OWNED_TAG_PREFIX}in-old`, listen: "127.0.0.1", listen_port: 1080 },
    ],
    outbounds: [{ type: "selector", tag: `${OWNED_TAG_PREFIX}old`, outbounds: ["direct"] }],
  });
  const res = renderSingBox(modelOf(2), existing);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  assert.ok(!res.text.includes(`${OWNED_TAG_PREFIX}old"`));
});

test("functional: realistic file with 2 listeners, 2 groups, 6 nodes", () => {
  const nodes = Array.from({ length: 6 }, (_, i) => ({
    name: `n${i + 1}`,
    source: {
      kind: "object" as const,
      value: { type: "vless", server: `10.1.0.${i + 1}`, server_port: 443 },
    },
  }));
  const m = buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=a", "socks5://127.0.0.1:1081 selector=b"],
    nodes as never
  );
  const res = renderSingBox(m, realisticExisting());
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const after = JSON.parse(res.text);
  const selectors = after.outbounds.filter(
    (o: { type: string; tag: string }) =>
      o.type === "selector" && o.tag.startsWith(OWNED_TAG_PREFIX)
  );
  assert.equal(selectors.length, 2);
  assert.deepEqual(after.dns, JSON.parse(realisticExisting()).dns);
  assert.deepEqual(after.log, JSON.parse(realisticExisting()).log);
});

test("groups with only unrenderable members are reported as empty_group", () => {
  const nodes = Array.from({ length: 6 }, (_, i) => ({
    name: `u${i + 1}`,
    source: { kind: "uri" as const, value: `vless://u@10.2.0.${i + 1}:443#u${i + 1}` },
  })) as never[];
  const m = buildCoreModel(
    [
      "socks5://127.0.0.1:1080 selector=g1",
      "socks5://127.0.0.1:1081 selector=g2",
      "socks5://127.0.0.1:1082 selector=g3",
    ],
    nodes
  );
  assert.ok(m.groups.every((g) => g.members.length > 0));
  const res = renderSingBox(m, null);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const empty = res.skipped.filter((s) => s.reason === "empty_group");
  assert.equal(empty.length, m.groups.filter((g) => g.members.length > 0).length);
  assert.deepEqual(empty.map((s) => s.node).sort(), m.groups.map((g) => g.tag).sort());
});

test("mixed rendered and unrenderable groups report only the unrenderable ones", () => {
  const rendered = {
    name: "ok",
    source: {
      kind: "object" as const,
      value: { type: "vless", server: "10.3.0.1", server_port: 443, uuid: "u-ok" },
    },
  } as never;
  const m = buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=solo", "socks5://127.0.0.1:1081 selector=other"],
    [rendered, { name: "x", source: { kind: "uri", value: "vless://u@10.3.0.2:443#x" } } as never]
  );
  const res = renderSingBox(m, null);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const empty = res.skipped.filter((s) => s.reason === "empty_group");
  assert.ok(
    empty.every((s) =>
      m.groups.some((g) => g.tag === s.node && g.members.every((tag) => tag !== "ok"))
    )
  );
});

test("fully rendered groups report no empty_group", () => {
  const res = renderSingBox(modelOf(4), null);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  assert.equal(res.skipped.filter((s) => s.reason === "empty_group").length, 0);
});

test("default core resolves through the renderer table", () => {
  assert.equal(renderers.DEFAULT_CORE, "sing-box");
  assert.equal(renderers.RENDERERS["sing-box"], renderSingBox);
  assert.equal(isSingBoxShape({ type: "vless", server: "x", server_port: 1 }), true);
  assert.equal(isSingBoxShape({ type: "vless", server: "x" }), false);
  void objNode;
});
