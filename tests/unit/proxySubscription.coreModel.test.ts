import test from "node:test";
import assert from "node:assert/strict";

const parse = await import("../../src/lib/proxySubscription/parse.ts");
const model = await import("../../src/lib/proxySubscription/coreConfig/model.ts");
const { parseSubscription, redactedNodeSummary } = parse;
const { buildCoreModel, OWNED_TAG_PREFIX } = model;

function clashYaml(): string {
  return `proxies:
  - name: "Direct HTTP"
    type: http
    server: 1.2.3.4
    port: 8080
    username: u
    password: p
  - name: "Node A"
    type: ss
    server: 9.9.9.9
    port: 8388
  - name: "Node B"
    type: vmess
    server: 11.11.11.11
    port: 443
  - name: "Node C"
    type: vless
    server: 12.12.12.12
    port: 443
  - name: "Extra"
    type: socks5
    server: 5.6.7.8
    port: 1080
`;
}

test("duplicate node names get identity suffixes, stable under permutation", () => {
  const feed = "vless://u@1.1.1.1:443#dup\nvless://u@2.2.2.2:443#dup\nvless://u@3.3.3.3:443#dup";
  const parsed = parseSubscription(feed);
  assert.equal(parsed.needsCore.length, 3);
  const m = buildCoreModel(["socks5://127.0.0.1:1080 selector=g"], parsed.needsCore);
  const tags = m.nodes.map((n) => n.tag);
  assert.equal(new Set(tags).size, 3);
  assert.ok(tags.every((t) => t.startsWith("dup-") && t !== "dup" && !/-2$/.test(t)));
  const rev = buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=g"],
    [...parsed.needsCore].reverse()
  );
  const byServer = (model: typeof m): Map<string, string> =>
    new Map(model.nodes.map((n) => [(n.source as { kind: "uri"; value: string }).value, n.tag]));
  for (const [source, tag] of byServer(m)) assert.equal(byServer(rev).get(source), tag);
});

test("no-suffix, valid and non-loopback entries sort into skipped vs groups", () => {
  const parsed = parseSubscription("vless://u@1.1.1.1:443#n");
  const m = buildCoreModel(
    [
      "socks5://127.0.0.1:1080",
      "socks5://127.0.0.1:1081 selector=g",
      "http://192.168.1.10:8080 selector=lan",
    ],
    [...parsed.nodes, ...parsed.needsCore]
  );
  assert.equal(m.groups.length, 1);
  assert.equal(m.groups[0].tag, `${OWNED_TAG_PREFIX}g`);
  const reasons = m.skipped.map((s) => s.reason).sort();
  assert.deepEqual(reasons, ["invalid_endpoint", "no_selector_tag"]);
});

test("one group keeps every node, two groups split, zero groups stay empty", () => {
  const parsed = parseSubscription(
    "vless://u@example.com:443#alpha\nvless://u@example.net:443#beta"
  );
  const all = [...parsed.nodes, ...parsed.needsCore];
  const one = buildCoreModel(["socks5://127.0.0.1:1080 selector=g"], all);
  assert.equal(one.groups.length, 1);
  assert.equal(one.groups[0].members.length, 2);

  const two = buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=g1", "socks5://127.0.0.1:1081 selector=g2"],
    all
  );
  assert.equal(two.groups.length, 2);
  const assigned = two.groups.flatMap((g) => g.members).sort();
  assert.deepEqual(assigned, two.nodes.map((n) => n.tag).sort());

  const none = buildCoreModel([], all);
  assert.deepEqual(none.listeners, []);
  assert.deepEqual(none.groups, []);
  assert.deepEqual(none.nodes, []);
});

test("adding a node keeps every group assignment (rendezvous)", () => {
  const before = buildCoreModel(
    [
      "socks5://127.0.0.1:1080 selector=g1",
      "socks5://127.0.0.1:1081 selector=g2",
      "socks5://127.0.0.1:1082 selector=g3",
    ],
    distinctServerNodes(4)
  );
  const after = buildCoreModel(
    [
      "socks5://127.0.0.1:1080 selector=g1",
      "socks5://127.0.0.1:1081 selector=g2",
      "socks5://127.0.0.1:1082 selector=g3",
    ],
    distinctServerNodes(5)
  );
  const groupOf = (m: typeof before, tag: string): string | undefined =>
    m.groups.find((g) => g.members.includes(tag))?.tag;
  for (const n of before.nodes) assert.equal(groupOf(after, n.tag), groupOf(before, n.tag));
  const used = new Set(before.nodes.map((n) => groupOf(before, n.tag)));
  assert.ok(used.size > 1, `expected spread across groups, got ${[...used]}`);
});

test("lines and clash-yaml feeds each keep their source shape", () => {
  const uri = parseSubscription("vless://u@example.com:443#alpha");
  assert.equal(uri.needsCore[0].source?.kind, "uri");
  const yaml = parseSubscription(clashYaml());
  assert.equal(yaml.nodes[0].source?.kind, "object");
  assert.equal(yaml.needsCore[0].source?.kind, "object");
});

test("redacted summary never leaks password or source", () => {
  const parsed = parseSubscription(clashYaml());
  const text = JSON.stringify(redactedNodeSummary(parsed));
  assert.ok(!text.includes('"password"'));
  assert.ok(!text.includes(" p"));
  assert.ok(!text.includes('"source"'));
});

test("end to end: clash yaml with 5 nodes builds stable groups", () => {
  const parsed = parseSubscription(clashYaml());
  assert.equal(parsed.nodes.length + parsed.needsCore.length, 5);
  const m = buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=main", "http://127.0.0.1:8080 selector=web"],
    [...parsed.nodes, ...parsed.needsCore]
  );
  assert.equal(m.listeners.length, 2);
  assert.equal(m.groups.length, 2);
  assert.equal(m.nodes.length, 5);
  assert.deepEqual(m.groups.flatMap((g) => g.members).sort(), m.nodes.map((n) => n.tag).sort());
  // Deterministic: same input gives the same output.
  assert.deepEqual(
    buildCoreModel(
      ["socks5://127.0.0.1:1080 selector=main", "http://127.0.0.1:8080 selector=web"],
      [...parsed.nodes, ...parsed.needsCore]
    ),
    m
  );
});

function exactDuplicateNodes(count: number, name = "shared"): never[] {
  return Array.from({ length: count }, () => ({
    name,
    source: {
      kind: "object" as const,
      value: {
        type: "vless",
        server: "10.9.0.7",
        server_port: 443,
        uuid: "uuid-same",
      },
    },
  })) as never[];
}

const THREE_GROUPS = [
  "socks5://127.0.0.1:1080 selector=g1",
  "socks5://127.0.0.1:1081 selector=g2",
  "socks5://127.0.0.1:1082 selector=g3",
];

test("lines sharing a selector form one group (no member reset)", () => {
  const parsed = parseSubscription("vless://u@10.7.0.1:443#only");
  const m = buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=g", "socks5://127.0.0.1:1081 selector=g"],
    [...parsed.nodes, ...parsed.needsCore]
  );
  assert.equal(m.listeners.length, 2);
  assert.equal(m.groups.length, 1);
  assert.equal(m.groups[0].members.length, 1);
});

test("exact duplicates share one group, the other groups stay reported", () => {
  const m = buildCoreModel(THREE_GROUPS, exactDuplicateNodes(60));
  const sizes = m.groups.map((g) => g.members.length).sort((a, b) => a - b);
  assert.deepEqual(sizes, [0, 0, 60]);
  assert.equal(m.skipped.filter((s) => s.reason === "empty_group").length, 2);
});

test("populated groups report no empty_group", () => {
  const nodes = Array.from({ length: 60 }, (_, i) => ({
    name: `node-${i + 1}`,
    source: {
      kind: "object" as const,
      value: {
        type: "vless",
        server: `10.8.0.${i + 1}`,
        server_port: 443,
        uuid: `uuid-${i + 1}`,
      },
    },
  })) as never[];
  const m = buildCoreModel(THREE_GROUPS, nodes);
  assert.ok(m.groups.every((g) => g.members.length > 0));
  assert.equal(m.skipped.filter((s) => s.reason === "empty_group").length, 0);
});

test("groups with only sourceless nodes report one empty_group each", () => {
  const nodes = [{ name: "ghost-a" }, { name: "ghost-b" }, { name: "ghost-c" }] as never[];
  const m = buildCoreModel(THREE_GROUPS, nodes);
  const empty = m.skipped.filter((s) => s.reason === "empty_group");
  assert.equal(empty.length, 3);
  assert.deepEqual(empty.map((s) => s.node).sort(), m.groups.map((g) => g.tag).sort());
});

function distinctServerNodes(count: number, name = "shared"): never[] {
  return Array.from({ length: count }, (_, i) => ({
    name,
    source: {
      kind: "object" as const,
      value: {
        type: "vless",
        server: `10.9.0.${i + 1}`,
        server_port: 443,
        uuid: `uuid-${i + 1}`,
      },
    },
  })) as never[];
}

test("same display name nodes spread across every group", () => {
  const m = buildCoreModel(THREE_GROUPS, distinctServerNodes(60));
  assert.ok(m.groups.every((g) => g.members.length > 0));
});

test("permuted same-name nodes keep their server tag", () => {
  const mk = (server: string) =>
    ({
      name: "shared",
      source: {
        kind: "object" as const,
        value: { type: "vless", server, server_port: 443, uuid: "uuid-x" },
      },
    }) as never;
  const forward = buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=g"],
    [mk("10.9.0.1"), mk("10.9.0.2")]
  );
  const backward = buildCoreModel(
    ["socks5://127.0.0.1:1080 selector=g"],
    [mk("10.9.0.2"), mk("10.9.0.1")]
  );
  const tagOf = (tag: string): string | undefined => forward.nodes.find((n) => n.tag === tag)?.tag;
  assert.ok(typeof tagOf === "function");
  assert.deepEqual(forward.nodes.map((n) => n.tag).sort(), backward.nodes.map((n) => n.tag).sort());
  const byServerFwd = new Map(forward.nodes.map((n) => [n.source.value.server, n.tag]));
  const byServerBwd = new Map(backward.nodes.map((n) => [n.source.value.server, n.tag]));
  assert.equal(byServerFwd.get("10.9.0.1"), byServerBwd.get("10.9.0.1"));
  assert.equal(byServerFwd.get("10.9.0.2"), byServerBwd.get("10.9.0.2"));
});

test("removing a group moves only its members", () => {
  const nodes = distinctServerNodes(60);
  const three = buildCoreModel(THREE_GROUPS, nodes);
  const tagIndex = new Map(three.nodes.map((n) => [n.tag, n.tag]));
  assert.equal(tagIndex.size, three.nodes.length);
  const groupOf = (m: typeof three, tag: string): string | undefined =>
    m.groups.find((g) => g.members.includes(tag))?.tag;
  const removedGroup = three.groups
    .map((g) => g.tag)
    .sort()
    .pop()!;
  const keptEntries = THREE_GROUPS.filter(
    (e) => !e.includes(`selector=${removedGroup.replace(OWNED_TAG_PREFIX, "")}`)
  );
  const two = buildCoreModel(keptEntries, nodes);
  const moved = three.nodes.filter((n) => groupOf(three, n.tag) !== groupOf(two, n.tag));
  const removedMembers = new Set(three.groups.find((g) => g.tag === removedGroup)?.members ?? []);
  assert.ok(moved.length > 0);
  assert.ok(moved.every((n) => removedMembers.has(n.tag)));
});

test("sourceless nodes keep current names and groups", () => {
  const nodes = [
    { name: "dup", source: { kind: "uri" as const, value: "not a url at all" } },
    { name: "dup", source: { kind: "uri" as const, value: "also not a url" } },
    { name: "dup", source: { kind: "uri" as const, value: "still not a url" } },
  ] as never[];
  const m = buildCoreModel(["socks5://127.0.0.1:1080 selector=g"], nodes);
  assert.deepEqual(
    m.nodes.map((n) => n.tag),
    ["dup", "dup-2", "dup-3"]
  );
});

test("mixed sourced and sourceless nodes stay deterministic", () => {
  const sourced = distinctServerNodes(3);
  const mixed = [...sourced, { name: "ghost" } as never];
  const first = buildCoreModel(THREE_GROUPS, mixed);
  const second = buildCoreModel(THREE_GROUPS, mixed);
  assert.deepEqual(first, second);
});

test("object and uri forms of one node share tag and group", () => {
  const objectNode = {
    name: "same",
    source: {
      kind: "object" as const,
      value: { type: "vless", server: "EXAMPLE.com", server_port: 443, uuid: "u" },
    },
  } as never;
  const uriNode = {
    name: "same",
    source: { kind: "uri" as const, value: "vless://u@EXAMPLE.com:443#same" },
  } as never;
  const fromObject = buildCoreModel(THREE_GROUPS, [objectNode]);
  const fromUri = buildCoreModel(THREE_GROUPS, [uriNode]);
  assert.deepEqual(
    fromObject.nodes.map((n) => n.tag),
    fromUri.nodes.map((n) => n.tag)
  );
  const groupOf = (m: typeof fromObject, tag: string): string | undefined =>
    m.groups.find((g) => g.members.includes(tag))?.tag;
  assert.equal(
    groupOf(fromObject, fromObject.nodes[0].tag),
    groupOf(fromUri, fromUri.nodes[0].tag)
  );
});

test("missing port and explicit port stay distinct", () => {
  const noPort = {
    name: "same",
    source: { kind: "object" as const, value: { type: "vless", server: "10.9.0.1", uuid: "u" } },
  } as never;
  const explicit = {
    name: "same",
    source: {
      kind: "object" as const,
      value: { type: "vless", server: "10.9.0.1", server_port: 443, uuid: "u" },
    },
  } as never;
  const uriNoPort = {
    name: "same",
    source: { kind: "uri" as const, value: "vless://u@10.9.0.1#same" },
  } as never;
  const a = buildCoreModel(THREE_GROUPS, [noPort]);
  const b = buildCoreModel(THREE_GROUPS, [uriNoPort]);
  const c = buildCoreModel(THREE_GROUPS, [explicit]);
  assert.deepEqual(
    a.nodes.map((n) => n.tag),
    b.nodes.map((n) => n.tag)
  );
  assert.notEqual(a.nodes[0].tag, c.nodes[0].tag);
});

test("nfc-equivalent names share tag base and fallback group", () => {
  const composed = "caf\u00e9";
  const decomposed = "café";
  assert.notEqual(composed, decomposed);
  const mk = (name: string) =>
    ({
      name,
      source: { kind: "uri" as const, value: "not a url" },
    }) as never;
  const first = buildCoreModel(["socks5://127.0.0.1:1080 selector=g"], [mk(composed)]);
  const second = buildCoreModel(["socks5://127.0.0.1:1080 selector=g"], [mk(decomposed)]);
  assert.deepEqual(
    first.nodes.map((n) => n.tag),
    second.nodes.map((n) => n.tag)
  );
  assert.deepEqual(first.groups, second.groups);
});
