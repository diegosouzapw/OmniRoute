import test from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity } = await import(
  "../../open-sse/translator/helpers/geminiHelper.ts"
);

// Reproduces the Vertex 400:
//   Invalid value at 'tools[0].function_declarations[43].parameters.properties[8].value'
//   (type.googleapis.com/google.cloud.aiplatform.v1.Schema), "object"
// The github-custom_properties_write tool declares a legitimate parameter named
// `properties`. The type:"object" injection visitor mistook the root property
// MAP for a schema node (because `map.properties !== undefined`) and wrote
// `type: "object"` into the map, turning it into a 9th, non-Schema entry.
const githubCustomPropertiesWriteSchema = () => ({
  type: "object",
  properties: {
    security_risk: { type: "string" },
    summary: { type: "string" },
    enterprise: { type: "string" },
    level: { type: "string" },
    org: { type: "string" },
    owner: { type: "string" },
    properties: {
      type: "array",
      items: {
        type: "object",
        properties: {},
        additionalProperties: true,
      },
    },
    repo: { type: "string" },
  },
  required: ["level", "properties"],
});

test("a tool parameter named `properties` does not inject type into the property map", () => {
  const result = cleanJSONSchemaForAntigravity(
    githubCustomPropertiesWriteSchema()
  ) as Record<string, unknown>;

  const props = result.properties as Record<string, unknown>;

  assert.deepEqual(
    Object.keys(props).sort(),
    [
      "enterprise",
      "level",
      "org",
      "owner",
      "properties",
      "repo",
      "security_risk",
      "summary",
    ],
    "the root property map must keep exactly the declared parameter names"
  );
  assert.ok(
    !Object.prototype.hasOwnProperty.call(props, "type"),
    "no synthetic `type` entry may be added to the property map"
  );
  assert.equal(result.type, "object", "the root schema itself must stay type:object");
});

test("the legitimate `properties` parameter keeps its own array schema", () => {
  const result = cleanJSONSchemaForAntigravity(
    githubCustomPropertiesWriteSchema()
  ) as Record<string, unknown>;

  const props = result.properties as Record<string, unknown>;
  const propertiesParam = props.properties as Record<string, unknown>;

  assert.ok(propertiesParam, "the `properties` parameter must survive cleaning");
  assert.equal(propertiesParam.type, "array", "its type:array must be preserved");

  const items = propertiesParam.items as Record<string, unknown>;
  assert.ok(items, "its items schema must be preserved");
  assert.equal(items.type, "object", "its items schema must stay a valid object schema");
  assert.ok(
    !("additionalProperties" in items),
    "Gemini/Vertex sanitisation must still remove additionalProperties"
  );
});

test("other schema keyword names used as parameter names are not treated as metadata", () => {
  const input = {
    type: "object",
    properties: {
      required: { type: "string" },
      items: { type: "string" },
      type: { type: "string" },
      description: { type: "string" },
    },
    required: ["required"],
  };

  const result = cleanJSONSchemaForAntigravity(input) as Record<string, unknown>;
  const props = result.properties as Record<string, unknown>;

  assert.deepEqual(
    Object.keys(props).sort(),
    ["description", "items", "required", "type"],
    "keyword-named parameters must survive untouched and gain no siblings"
  );
  for (const [name, subSchema] of Object.entries(props)) {
    assert.equal(
      (subSchema as Record<string, unknown>).type,
      "string",
      `parameter \`${name}\` must keep its declared string type`
    );
  }
  assert.equal(result.type, "object");
  assert.deepEqual(result.required, ["required"]);
});
