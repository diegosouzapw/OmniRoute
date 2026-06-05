import test from "node:test";
import assert from "node:assert/strict";

import {
  ObsidianAuthError,
  ObsidianNotFoundError,
  ObsidianServerError,
  ObsidianTimeoutError,
} from "../../src/lib/obsidian/api.ts";

test("ObsidianAuthError has correct name", () => {
  const err = new ObsidianAuthError("bad token");
  assert.equal(err.name, "ObsidianAuthError");
  assert.equal(err.message, "bad token");
});

test("ObsidianNotFoundError has correct name", () => {
  const err = new ObsidianNotFoundError("not found");
  assert.equal(err.name, "ObsidianNotFoundError");
});

test("ObsidianServerError has correct name", () => {
  const err = new ObsidianServerError("server error");
  assert.equal(err.name, "ObsidianServerError");
});

test("ObsidianTimeoutError has correct name", () => {
  const err = new ObsidianTimeoutError("timed out");
  assert.equal(err.name, "ObsidianTimeoutError");
});

test("createObsidianClient returns object with all 17 expected methods", async () => {
  const { createObsidianClient } = await import("../../src/lib/obsidian/api.ts");
  const client = createObsidianClient("test-token");
  assert.equal(typeof client.checkStatus, "function");
  assert.equal(typeof client.searchSimple, "function");
  assert.equal(typeof client.searchStructured, "function");
  assert.equal(typeof client.readNote, "function");
  assert.equal(typeof client.listVault, "function");
  assert.equal(typeof client.getDocumentMap, "function");
  assert.equal(typeof client.getNoteMetadata, "function");
  assert.equal(typeof client.getActiveFile, "function");
  assert.equal(typeof client.getPeriodicNote, "function");
  assert.equal(typeof client.getTags, "function");
  assert.equal(typeof client.commandList, "function");
  assert.equal(typeof client.writeNote, "function");
  assert.equal(typeof client.appendNote, "function");
  assert.equal(typeof client.patchNote, "function");
  assert.equal(typeof client.deleteNote, "function");
  assert.equal(typeof client.moveNote, "function");
  assert.equal(typeof client.executeCommand, "function");
  assert.equal(typeof client.openFile, "function");
});

test("createObsidianClient accepts optional baseUrl", async () => {
  const { createObsidianClient } = await import("../../src/lib/obsidian/api.ts");

  const defaultClient = createObsidianClient("test-token");
  assert.ok(defaultClient);

  const remoteClient = createObsidianClient("test-token", "http://100.64.0.1:27123");
  assert.ok(remoteClient);
  assert.equal(typeof remoteClient.checkStatus, "function");
});

test("createObsidianClient works with trailing-slash baseUrl", async () => {
  const { createObsidianClient } = await import("../../src/lib/obsidian/api.ts");
  const client = createObsidianClient("test-token", "http://100.64.0.1:27123/");
  assert.ok(client);
  assert.equal(typeof client.checkStatus, "function");
});
