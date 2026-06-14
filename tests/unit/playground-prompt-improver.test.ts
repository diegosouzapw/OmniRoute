import test from "node:test";
import assert from "node:assert/strict";

const { buildImproveChatBody, parseImprovedContent, META_SYSTEM_PROMPT, ImprovePromptRequestSchema } =
  await import("../../src/lib/playground/promptImprover.ts");

// ── META_SYSTEM_PROMPT ────────────────────────────────────────────────────────

test("META_SYSTEM_PROMPT is a non-empty string", () => {
  assert.ok(typeof META_SYSTEM_PROMPT === "string", "is string");
  assert.ok(META_SYSTEM_PROMPT.length > 0, "is non-empty");
  assert.ok(META_SYSTEM_PROMPT.includes("<<SYSTEM>>"), "contains <<SYSTEM>> marker");
  assert.ok(META_SYSTEM_PROMPT.includes("<<PROMPT>>"), "contains <<PROMPT>> marker");
  assert.ok(META_SYSTEM_PROMPT.includes("prompt engineer"), "mentions prompt engineer");
});

// ── buildImproveChatBody ──────────────────────────────────────────────────────

// Scenario 1: only system, concise tone
test("buildImproveChatBody: only system, concise tone", () => {
  const body = buildImproveChatBody({
    system: "You are a helpful assistant.",
    model: "gpt-4o-mini",
    tone: "concise",
  });

  assert.equal(body.model, "gpt-4o-mini");
  assert.equal(body.temperature, 0.3);
  assert.equal(body.max_tokens, 2048);
  assert.equal(body.stream, false);
  assert.equal(body.messages.length, 2);
  assert.equal(body.messages[0].role, "system");
  assert.equal(body.messages[0].content, META_SYSTEM_PROMPT);
  assert.equal(body.messages[1].role, "user");
  assert.ok(body.messages[1].content.includes("Be concise and direct."), "concise prefix");
  assert.ok(body.messages[1].content.includes("<<SYSTEM>>"), "system marker in user msg");
  assert.ok(
    body.messages[1].content.includes("You are a helpful assistant."),
    "system content present",
  );
  // Must NOT include <<PROMPT>> when no prompt was given
  assert.ok(!body.messages[1].content.includes("<<PROMPT>>"), "no prompt marker when no prompt");
});

// Scenario 2: only prompt, detailed tone
test("buildImproveChatBody: only prompt, detailed tone", () => {
  const body = buildImproveChatBody({
    prompt: "Fix this code for me please.",
    model: "claude-sonnet-4-6",
    tone: "detailed",
  });

  assert.equal(body.model, "claude-sonnet-4-6");
  assert.equal(body.temperature, 0.3);
  assert.equal(body.max_tokens, 2048);
  assert.equal(body.stream, false);
  assert.ok(
    body.messages[1].content.includes("Be detailed and explicit in the rewrite."),
    "detailed prefix",
  );
  assert.ok(body.messages[1].content.includes("<<PROMPT>>"), "prompt marker present");
  assert.ok(
    body.messages[1].content.includes("Fix this code for me please."),
    "prompt content present",
  );
  // Must NOT include <<SYSTEM>> when no system was given
  assert.ok(!body.messages[1].content.includes("<<SYSTEM>>"), "no system marker when no system");
});

// Scenario 3: both system and prompt, concise tone
test("buildImproveChatBody: both system and prompt, concise tone", () => {
  const body = buildImproveChatBody({
    system: "You are a coder.",
    prompt: "Write hello world.",
    model: "gpt-4o",
    tone: "concise",
  });

  assert.ok(body.messages[1].content.includes("<<SYSTEM>>"), "system marker present");
  assert.ok(body.messages[1].content.includes("<<PROMPT>>"), "prompt marker present");
  assert.ok(body.messages[1].content.includes("You are a coder."), "system content");
  assert.ok(body.messages[1].content.includes("Write hello world."), "prompt content");
  assert.ok(body.messages[1].content.includes("Be concise and direct."), "concise prefix");
});

// Scenario 4: both, detailed tone
test("buildImproveChatBody: both system and prompt, detailed tone", () => {
  const body = buildImproveChatBody({
    system: "You are expert.",
    prompt: "Summarize this.",
    model: "gpt-4o",
    tone: "detailed",
  });

  assert.ok(
    body.messages[1].content.includes("Be detailed and explicit in the rewrite."),
    "detailed prefix",
  );
});

// Scenario 5: only system, detailed tone
test("buildImproveChatBody: only system, detailed tone", () => {
  const body = buildImproveChatBody({
    system: "You are a researcher.",
    model: "gpt-4o-mini",
    tone: "detailed",
  });

  assert.ok(
    body.messages[1].content.includes("Be detailed and explicit in the rewrite."),
    "detailed prefix",
  );
  assert.ok(body.messages[1].content.includes("<<SYSTEM>>"), "system marker");
});

// Scenario 6: only prompt, concise tone
test("buildImproveChatBody: only prompt, concise tone", () => {
  const body = buildImproveChatBody({
    prompt: "Explain quantum computing.",
    model: "gemini-2.0-flash",
    tone: "concise",
  });

  assert.ok(body.messages[1].content.includes("Be concise and direct."), "concise prefix");
  assert.ok(body.messages[1].content.includes("<<PROMPT>>"), "prompt marker");
});

// ── parseImprovedContent ──────────────────────────────────────────────────────

test("parseImprovedContent: only system marker present, hadSystem=true", () => {
  const raw = "<<SYSTEM>>\nYou are a professional assistant.";
  const result = parseImprovedContent(raw, true, false);
  assert.equal(result.improvedSystem, "You are a professional assistant.");
  assert.equal(result.improvedPrompt, undefined);
});

test("parseImprovedContent: only prompt marker present, hadPrompt=true", () => {
  const raw = "<<PROMPT>>\nWrite clean code with comments.";
  const result = parseImprovedContent(raw, false, true);
  assert.equal(result.improvedPrompt, "Write clean code with comments.");
  assert.equal(result.improvedSystem, undefined);
});

test("parseImprovedContent: both markers present, hadSystem+hadPrompt", () => {
  const raw = "<<SYSTEM>>\nYou are a professional assistant.\n\n<<PROMPT>>\nWrite clean code.";
  const result = parseImprovedContent(raw, true, true);
  assert.equal(result.improvedSystem, "You are a professional assistant.");
  assert.equal(result.improvedPrompt, "Write clean code.");
});

test("parseImprovedContent: no markers, hadSystem only", () => {
  const raw = "You are a professional assistant.";
  const result = parseImprovedContent(raw, true, false);
  assert.equal(result.improvedSystem, "You are a professional assistant.");
  assert.equal(result.improvedPrompt, undefined);
});

test("parseImprovedContent: no markers, hadPrompt only", () => {
  const raw = "Write clean code with good comments.";
  const result = parseImprovedContent(raw, false, true);
  assert.equal(result.improvedPrompt, "Write clean code with good comments.");
  assert.equal(result.improvedSystem, undefined);
});

test("parseImprovedContent: no markers, both had — fallback to prompt", () => {
  const raw = "Some improved content.";
  const result = parseImprovedContent(raw, true, true);
  // Fallback: entire content goes to prompt
  assert.equal(result.improvedPrompt, "Some improved content.");
});

test("parseImprovedContent: empty raw string returns empty object", () => {
  const result = parseImprovedContent("", true, true);
  assert.equal(result.improvedSystem, undefined);
  assert.equal(result.improvedPrompt, undefined);
});

test("parseImprovedContent: trims whitespace", () => {
  const raw = "<<SYSTEM>>\n  You are an assistant.  \n\n<<PROMPT>>\n  Fix this code.  ";
  const result = parseImprovedContent(raw, true, true);
  assert.equal(result.improvedSystem, "You are an assistant.");
  assert.equal(result.improvedPrompt, "Fix this code.");
});

test("parseImprovedContent: reversed order (<<PROMPT>> before <<SYSTEM>>)", () => {
  // LLM might respond with <<PROMPT>> first then <<SYSTEM>>
  const raw = "<<PROMPT>>\nWrite clean code.\n\n<<SYSTEM>>\nYou are a helpful coder.";
  const result = parseImprovedContent(raw, true, true);
  // Both markers present, <<PROMPT>> is at index < <<SYSTEM>> index
  // sysStart > promptStart in this case — covers else branch for sysContent
  // and the if(hasSystemMarker && systemIndex > promptStart) branch for promptContent
  assert.ok(result.improvedSystem !== undefined || result.improvedPrompt !== undefined,
    "should parse at least one field from reversed markers");
});

// ── ImprovePromptRequestSchema validation ─────────────────────────────────────

test("ImprovePromptRequestSchema: valid with system only", () => {
  const parsed = ImprovePromptRequestSchema.safeParse({
    system: "You are helpful.",
    model: "gpt-4o",
    tone: "concise",
  });
  assert.ok(parsed.success, "valid request with system only");
});

test("ImprovePromptRequestSchema: valid with prompt only", () => {
  const parsed = ImprovePromptRequestSchema.safeParse({
    prompt: "Tell me about AI.",
    model: "gpt-4o",
  });
  assert.ok(parsed.success, "valid request with prompt only");
});

test("ImprovePromptRequestSchema: invalid when both system and prompt are empty", () => {
  const parsed = ImprovePromptRequestSchema.safeParse({
    system: "   ",
    prompt: "  ",
    model: "gpt-4o",
  });
  assert.ok(!parsed.success, "should fail when both are empty/whitespace");
});

test("ImprovePromptRequestSchema: invalid when model is empty", () => {
  const parsed = ImprovePromptRequestSchema.safeParse({
    prompt: "Tell me something",
    model: "",
  });
  assert.ok(!parsed.success, "should fail with empty model");
});
