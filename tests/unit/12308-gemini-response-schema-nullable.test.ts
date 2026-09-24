// Regression for #12308: cleanJSONSchemaForAntigravity flattened every union
// spelling of "nullable" (type arrays, anyOf, oneOf) before the schema reached
// Gemini, which is correct for tool parameters and wrong for response schemas —
// a model with nothing to say could no longer answer null, so it returned the
// *string* "null" or fabricated a value. With { preserveNullable: true } the
// union is recorded as Gemini's `nullable: true` sibling key before Phase 2
// destroys it; the key is absent from GEMINI_UNSUPPORTED_SCHEMA_KEYS, so it
// survives sanitizing. Tool parameters keep the default (no flag, no change).
import test from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity, GEMINI_UNSUPPORTED_SCHEMA_KEYS } = await import(
  "../../open-sse/translator/helpers/geminiHelper.ts"
);

const clean = (schema: unknown) => cleanJSONSchemaForAntigravity(schema, { preserveNullable: true });
const valueProp = (out: unknown) =>
  (out as { properties: { value: Record<string, unknown> } }).properties.value;

const wrap = (value: unknown) => ({
  type: "object",
  properties: { value },
  required: ["value"],
  additionalProperties: false,
});

test("type-array union survives as nullable: true", () => {
  const out = valueProp(clean(wrap({ type: ["string", "null"] })));
  assert.equal(out.type, "string");
  assert.equal(out.nullable, true);
});

test("anyOf union survives as nullable: true (the Pydantic Optional[str] shape)", () => {
  const out = valueProp(clean(wrap({ anyOf: [{ type: "string" }, { type: "null" }] })));
  assert.equal(out.type, "string");
  assert.equal(out.nullable, true);
});

test("oneOf union survives as nullable: true", () => {
  const out = valueProp(clean(wrap({ oneOf: [{ type: "number" }, { type: "null" }] })));
  assert.equal(out.type, "number");
  assert.equal(out.nullable, true);
});

test("nested nullable fields are marked too", () => {
  const out = clean({
    type: "object",
    properties: {
      items: {
        type: "array",
        items: { type: "object", properties: { note: { type: ["string", "null"] } } },
      },
    },
  }) as Record<string, never>;
  const note = out.properties["items"]["items"]["properties"]["note"];
  assert.equal(note.type, "string");
  assert.equal(note.nullable, true);
});

test("a union without a null branch is left alone", () => {
  const out = valueProp(clean(wrap({ anyOf: [{ type: "string" }, { type: "number" }] })));
  assert.ok(!("nullable" in out));
});

test("an explicit nullable: true sent by the caller still passes through", () => {
  const out = valueProp(clean(wrap({ type: "string", nullable: true })));
  assert.equal(out.type, "string");
  assert.equal(out.nullable, true);
});

test("default call (tool parameters) is unchanged: unions flatten, nothing is marked", () => {
  const out = cleanJSONSchemaForAntigravity(wrap({ type: ["string", "null"] })) as {
    properties: { value: Record<string, unknown> };
  };
  assert.equal(out.properties.value.type, "string");
  assert.ok(!("nullable" in out.properties.value));
});

test("guard: nullable must stay out of GEMINI_UNSUPPORTED_SCHEMA_KEYS or the fix silently dies", () => {
  assert.ok(!GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("nullable"));
});
