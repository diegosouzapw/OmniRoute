import test from "node:test";
import assert from "node:assert/strict";
import {
  AgentBridgeStateRowSchema,
  AgentBridgeMappingRowSchema,
  AgentBridgeBypassRowSchema,
  AgentBridgeServerActionSchema,
  AgentBridgeDnsActionSchema,
  AgentBridgeMappingPutSchema,
  AgentBridgeBypassUpsertSchema,
  AgentBridgeUpstreamCaPostSchema,
} from "../../src/shared/schemas/agentBridge.ts";
import {
  InspectorCustomHostSchema,
  InspectorSessionStartSchema,
  InspectorSessionPatchSchema,
  InspectorCaptureModeActionSchema,
  InspectorSystemProxyActionSchema,
  InspectorTlsInterceptToggleSchema,
  InspectorAnnotationPutSchema,
  InspectorListQuerySchema,
} from "../../src/shared/schemas/inspector.ts";

test("AgentBridgeStateRowSchema — round-trip", () => {
  const data = {
    agent_id: "copilot",
    dns_enabled: true,
    cert_trusted: false,
    setup_completed: false,
    last_started_at: null,
    last_error: null,
  };
  const r = AgentBridgeStateRowSchema.safeParse(data);
  assert.ok(r.success);
});

test("AgentBridgeMappingRowSchema — round-trip", () => {
  assert.ok(AgentBridgeMappingRowSchema.safeParse({
    agent_id: "copilot", source_model: "gpt-4o", target_model: "claude-sonnet-4-5", updated_at: new Date().toISOString(),
  }).success);
});

test("AgentBridgeBypassRowSchema — round-trip", () => {
  assert.ok(AgentBridgeBypassRowSchema.safeParse({
    pattern: "*.bank.com", source: "user", created_at: new Date().toISOString(),
  }).success);
});

test("AgentBridgeBypassRowSchema — rejects invalid source enum", () => {
  assert.ok(!AgentBridgeBypassRowSchema.safeParse({
    pattern: "x", source: "custom", created_at: new Date().toISOString(),
  }).success);
});

test("AgentBridgeServerActionSchema — all valid actions", () => {
  for (const action of ["start", "stop", "restart", "trust-cert", "regenerate-cert"]) {
    assert.ok(AgentBridgeServerActionSchema.safeParse({ action }).success, `accepted ${action}`);
  }
});

test("AgentBridgeServerActionSchema — rejects unknown action", () => {
  assert.ok(!AgentBridgeServerActionSchema.safeParse({ action: "delete" }).success);
});

test("AgentBridgeDnsActionSchema — round-trip", () => {
  assert.ok(AgentBridgeDnsActionSchema.safeParse({ enabled: true }).success);
});

test("AgentBridgeMappingPutSchema — round-trip", () => {
  assert.ok(AgentBridgeMappingPutSchema.safeParse({ mappings: [{ source: "a", target: "b" }] }).success);
});

test("AgentBridgeBypassUpsertSchema — round-trip", () => {
  assert.ok(AgentBridgeBypassUpsertSchema.safeParse({ patterns: ["*.bank.com"] }).success);
});

test("AgentBridgeUpstreamCaPostSchema — rejects empty path", () => {
  assert.ok(!AgentBridgeUpstreamCaPostSchema.safeParse({ path: "" }).success);
});

test("InspectorCustomHostSchema — default enabled=true", () => {
  const r = InspectorCustomHostSchema.safeParse({ host: "example.com" });
  assert.ok(r.success);
  assert.equal(r.data?.enabled, true);
});

test("InspectorCustomHostSchema — rejects empty host", () => {
  assert.ok(!InspectorCustomHostSchema.safeParse({ host: "" }).success);
});

test("InspectorSessionStartSchema — round-trip with name", () => {
  assert.ok(InspectorSessionStartSchema.safeParse({ name: "My Session" }).success);
});

test("InspectorSessionStartSchema — round-trip without name", () => {
  assert.ok(InspectorSessionStartSchema.safeParse({}).success);
});

test("InspectorSessionPatchSchema — stop action", () => {
  assert.ok(InspectorSessionPatchSchema.safeParse({ action: "stop" }).success);
});

test("InspectorCaptureModeActionSchema — start/stop", () => {
  assert.ok(InspectorCaptureModeActionSchema.safeParse({ action: "start" }).success);
  assert.ok(InspectorCaptureModeActionSchema.safeParse({ action: "stop" }).success);
});

test("InspectorSystemProxyActionSchema — apply with options", () => {
  assert.ok(InspectorSystemProxyActionSchema.safeParse({ action: "apply", port: 8080, guardMinutes: 30 }).success);
});

test("InspectorSystemProxyActionSchema — rejects invalid port", () => {
  assert.ok(!InspectorSystemProxyActionSchema.safeParse({ action: "apply", port: 99999 }).success);
});

test("InspectorTlsInterceptToggleSchema — round-trip", () => {
  assert.ok(InspectorTlsInterceptToggleSchema.safeParse({ enabled: false }).success);
});

test("InspectorAnnotationPutSchema — rejects over 10000 chars", () => {
  assert.ok(!InspectorAnnotationPutSchema.safeParse({ annotation: "x".repeat(10001) }).success);
});

test("InspectorListQuerySchema — round-trip with all filters", () => {
  assert.ok(InspectorListQuerySchema.safeParse({
    profile: "llm", host: "api.openai.com", agent: "copilot", status: "2xx",
    source: "agent-bridge", sessionId: "550e8400-e29b-41d4-a716-446655440000",
  }).success);
});

test("InspectorListQuerySchema — rejects non-uuid sessionId", () => {
  assert.ok(!InspectorListQuerySchema.safeParse({ sessionId: "not-a-uuid" }).success);
});

test("InspectorListQuerySchema — empty object is valid", () => {
  assert.ok(InspectorListQuerySchema.safeParse({}).success);
});
