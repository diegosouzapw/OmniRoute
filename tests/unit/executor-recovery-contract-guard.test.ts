import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

import {
  EXECUTOR_RECOVERY_CONTRACT_DOC,
  EXECUTOR_RECOVERY_MODES,
  EXECUTOR_RECOVERY_TAGS,
} from "../../open-sse/executors/base/recoveryContract.ts";

// This guards explicit ownership, not arbitrary recovery semantics. A declaration
// and a test path cannot prove that an envelope's inner payload is recovered.
// That remains the linked behavioral test's job. Legacy identities are only a
// historical boundary, never evidence that an old executor satisfies the contract.
const ROOT = path.resolve(import.meta.dirname, "../..");
const ORIGIN = "122b43b35dbacab03ea67d0f0b46e713280ccd86";
const SNAPSHOT = "tests/fixtures/executor-recovery-legacy-122b43.json";

type Override = {
  identity: string;
  line: number;
  member: ts.ClassElement;
  implementation: ts.MethodDeclaration | ts.Expression;
  source: ts.SourceFile;
  directBase: boolean;
};

function memberName(member: ts.ClassElement): string | null {
  const name = member.name;
  if (!name) return null;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name) && ts.isStringLiteral(name.expression)) {
    return name.expression.text;
  }
  if (ts.isComputedPropertyName(name)) {
    throw new Error("Computed executor member needs a literal name for contract review");
  }
  return null;
}

function className(node: ts.ClassDeclaration | ts.ClassExpression): string {
  if (node.name) return node.name.text;
  if (ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name)) {
    return node.parent.name.text;
  }
  if (ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)) {
    return "default";
  }
  throw new Error("Unnamed executor class needs a stable identity for contract review");
}

function baseImports(source: ts.SourceFile, file: string): Set<string> {
  const names = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
      continue;
    }
    const specifier = statement.moduleSpecifier.text;
    const resolved = specifier.startsWith(".")
      ? path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier))
      : specifier.replace(/^@omniroute\/open-sse\//, "open-sse/");
    if (resolved !== "open-sse/executors/base.ts") continue;
    const bindings = statement.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings) || statement.importClause?.isTypeOnly) continue;
    for (const binding of bindings.elements) {
      if (!binding.isTypeOnly && (binding.propertyName ?? binding.name).text === "BaseExecutor") {
        names.add(binding.name.text);
      }
    }
  }
  return names;
}

function collectOverrides(file: string, text: string): Override[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const bases = baseImports(source, file);
  const overrides: Override[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      // Only a module-level declaration has an unambiguous imported base here.
      // Nested classes/expressions may shadow it and must declare ownership.
      const directBase =
        ts.isClassDeclaration(node) &&
        ts.isSourceFile(node.parent) &&
        Boolean(
          node.heritageClauses?.some(
            (clause) =>
              clause.token === ts.SyntaxKind.ExtendsKeyword &&
              clause.types.some(
                (type) =>
                  ts.isIdentifier(type.expression) &&
                  bases.has(type.expression.text) &&
                  node.name?.text !== type.expression.text
              )
          )
        );
      for (const member of node.members) {
        if (
          ts.canHaveModifiers(member) &&
          ts.getModifiers(member)?.some((m) => m.kind === ts.SyntaxKind.StaticKeyword)
        )
          continue;
        if (memberName(member) !== "execute") continue;
        const implementation = ts.isMethodDeclaration(member)
          ? member.body && member
          : ts.isPropertyDeclaration(member) && member.initializer;
        if (!implementation) {
          if (ts.isGetAccessorDeclaration(member) || ts.isSetAccessorDeclaration(member)) {
            throw new Error(`${file}: execute accessor needs explicit contract review`);
          }
          continue;
        }
        const name = className(node);
        if (file === "open-sse/executors/base.ts" && name === "BaseExecutor") continue;
        overrides.push({
          identity: `${file}::${name}::execute`,
          line: source.getLineAndCharacterOfPosition(member.getStart(source)).line + 1,
          member,
          implementation,
          source,
          directBase,
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  assert.equal(
    new Set(overrides.map((o) => o.identity)).size,
    overrides.length,
    `${file}: duplicate identities`
  );
  return overrides;
}

function delegatesToBase(override: Override): boolean {
  const fn = override.implementation;
  if (
    !override.directBase ||
    (!ts.isMethodDeclaration(fn) && !ts.isArrowFunction(fn) && !ts.isFunctionExpression(fn))
  ) {
    return false;
  }
  if (fn.parameters.length !== 1 || !ts.isIdentifier(fn.parameters[0].name)) return false;
  if (!fn.body || !ts.isBlock(fn.body) || fn.body.statements.length !== 1) return false;
  const statement = fn.body.statements[0];
  if (!ts.isReturnStatement(statement) || !statement.expression) return false;
  const expression = ts.isAwaitExpression(statement.expression)
    ? statement.expression.expression
    : statement.expression;
  return (
    ts.isCallExpression(expression) &&
    ts.isPropertyAccessExpression(expression.expression) &&
    expression.expression.expression.kind === ts.SyntaxKind.SuperKeyword &&
    expression.expression.name.text === "execute" &&
    expression.arguments.length === 1 &&
    ts.isIdentifier(expression.arguments[0]) &&
    expression.arguments[0].text === fn.parameters[0].name.text
  );
}

function readContractTag(member: ts.ClassElement, name: string): string | null {
  const source = member.getSourceFile();
  const comments = ts.getLeadingCommentRanges(source.text, member.getFullStart()) ?? [];
  // TypeScript deliberately drops non-overload tags from earlier JSDoc blocks.
  // Reject multiple blocks instead of silently accepting only the last decision.
  const blocks = comments.filter((comment) => source.text.startsWith("/**", comment.pos));
  if (blocks.length !== 1) return null;
  const tags = ts
    .getJSDocCommentsAndTags(member)
    .flatMap((doc) => (ts.isJSDoc(doc) ? [...(doc.tags ?? [])] : [doc]))
    .filter((tag) => tag.tagName.text === name);
  if (tags.length !== 1) return null;
  const comment = tags[0].comment;
  return (
    typeof comment === "string" ? comment : (comment?.map((part) => part.text).join("") ?? "")
  ).trim();
}

function validTestReference(root: string, reference: string): boolean {
  const parts = reference.split("/");
  if (parts[0] !== "tests" || parts.some((part) => ["", ".", ".."].includes(part))) return false;
  if (reference.includes("\\") || !/\.(?:test|spec)\.[cm]?[jt]sx?$/.test(reference)) return false;
  try {
    const testRoot = fs.realpathSync(path.join(root, "tests"));
    const resolved = fs.realpathSync(path.join(root, reference));
    return resolved.startsWith(`${testRoot}${path.sep}`) && fs.statSync(resolved).isFile();
  } catch {
    return false;
  }
}

function contractIssues(overrides: Override[], legacy: Set<string>, root: string): string[] {
  return overrides.flatMap((override) => {
    if (legacy.has(override.identity) || delegatesToBase(override)) return [];
    const mode = readContractTag(override.member, EXECUTOR_RECOVERY_TAGS.mode);
    const reason = readContractTag(override.member, EXECUTOR_RECOVERY_TAGS.reason);
    const reference = readContractTag(override.member, EXECUTOR_RECOVERY_TAGS.test);
    const missing = [];
    if (!(EXECUTOR_RECOVERY_MODES as readonly string[]).includes(mode ?? "")) {
      missing.push("one custom/native declaration");
    }
    if (!reason) missing.push("one nonempty recovery reason");
    if (!reference || !validTestReference(root, reference))
      missing.push("one existing test under tests/");
    return missing.length
      ? [
          `${override.identity}:${override.line}: requires ${missing.join(", ")} (see ${EXECUTOR_RECOVERY_CONTRACT_DOC})`,
        ]
      : [];
  });
}

function executorSources(root: string, directory = "open-sse/executors"): string[] {
  return fs
    .readdirSync(path.join(root, directory), { withFileTypes: true })
    .flatMap((entry) => {
      const file = `${directory}/${entry.name}`;
      if (entry.isDirectory()) return executorSources(root, file);
      return entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")
        ? [file]
        : [];
    })
    .sort();
}

function inspectExecutors(
  root: string,
  legacy: Set<string>
): { identities: string[]; issues: string[] } {
  const overrides = executorSources(root).flatMap((file) =>
    collectOverrides(file, fs.readFileSync(path.join(root, file), "utf8"))
  );
  return {
    identities: overrides.map((o) => o.identity).sort(),
    issues: contractIssues(overrides, legacy, root),
  };
}

// FIXTURES: this section is preserved across the guard's RED/GREEN pair.
const NEW_FILE = "open-sse/executors/example.ts";
const IDENTITY = `${NEW_FILE}::ExampleExecutor::execute`;
const TEST_REFERENCE = "tests/unit/example-recovery.test.ts";
const declaration = (
  mode = "custom",
  reason = "Owns the native envelope and bounded recovery.",
  reference = TEST_REFERENCE
) => `/**
 * @executorRecovery ${mode}
 * @executorRecoveryReason ${reason}
 * @executorRecoveryTest ${reference}
 */\n`;
const sourceOf = (member: string, parent = "BaseExecutor") =>
  `import { BaseExecutor } from "./base.ts"; export class ExampleExecutor extends ${parent} {\n${member}\n}`;

const CASES = [
  {
    name: "raw response bypass",
    member: "async execute(input) { return fetch(input.url); }",
    rejected: true,
  },
  {
    name: "helper on the outer envelope is no automatic proof",
    member:
      "async execute(input) { await applyReasoningEffortRecovery({ body: input }); return input; }",
    rejected: true,
  },
  {
    name: "comment mentioning super",
    member: "async execute(input) { /* return super.execute(input) */ return input; }",
    rejected: true,
  },
  {
    name: "string mentioning super",
    member: 'async execute(input) { return "super.execute(input)"; }',
    rejected: true,
  },
  {
    name: "conditional super",
    member: "async execute(input) { if (input.ok) return super.execute(input); return input; }",
    rejected: true,
  },
  {
    name: "nested callback super",
    member: "async execute(input) { const later = () => super.execute(input); return input; }",
    rejected: true,
  },
  {
    name: "discarded super result",
    member: "async execute(input) { super.execute(input); return input; }",
    rejected: true,
  },
  {
    name: "changed super argument",
    member: "async execute(input) { return super.execute(input.body); }",
    rejected: true,
  },
  {
    name: "trivial super",
    member: "execute(input) { return super.execute(input); }",
    rejected: false,
  },
  {
    name: "trivial awaited super",
    member: "async execute(input) { return await super.execute(input); }",
    rejected: false,
  },
  {
    name: "unknown parent",
    member: "execute(input) { return super.execute(input); }",
    parent: "OtherExecutor",
    rejected: true,
  },
  {
    name: "promise without async",
    member: "execute(input) { return Promise.resolve(input); }",
    rejected: true,
  },
  { name: "arrow property", member: "execute = async (input) => input;", rejected: true },
  {
    name: "literal computed member",
    member: 'async ["execute"](input) { return input; }',
    rejected: true,
  },
  {
    name: "custom ownership declaration",
    member: declaration() + "async execute(input) { return input; }",
    rejected: false,
  },
  {
    name: "native ownership declaration",
    member:
      declaration("native", "Native chatbot input/history has no reasoning or Gemini carriers.") +
      "async execute(input) { return input; }",
    rejected: false,
  },
  {
    name: "missing reason",
    member: declaration("native", "") + "async execute(input) { return input; }",
    rejected: true,
  },
  {
    name: "unknown mode",
    member: declaration("skip") + "async execute(input) { return input; }",
    rejected: true,
  },
  {
    name: "missing test",
    member:
      declaration("custom", "Owns recovery.", "tests/unit/missing.test.ts") +
      "async execute(input) { return input; }",
    rejected: true,
  },
  {
    name: "duplicate declaration",
    member: declaration() + declaration() + "async execute(input) { return input; }",
    rejected: true,
  },
  {
    name: "path traversal",
    member:
      declaration("native", "Native payload.", "tests/../outside.test.ts") +
      "async execute(input) { return input; }",
    rejected: true,
  },
  {
    name: "absolute test",
    member:
      declaration("native", "Native payload.", "/tests/unit/example-recovery.test.ts") +
      "async execute(input) { return input; }",
    rejected: true,
  },
];

function fixtureRoot(t: { after: (fn: () => void) => void }): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "executor-contract-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, "tests/unit"), { recursive: true });
  fs.mkdirSync(path.join(root, "open-sse/executors"), { recursive: true });
  fs.writeFileSync(
    path.join(root, TEST_REFERENCE),
    "// Structural reference only; never imported.\n"
  );
  return root;
}

for (const entry of CASES) {
  test(`new execute ownership: ${entry.name}`, (t) => {
    const root = fixtureRoot(t);
    const overrides = collectOverrides(NEW_FILE, sourceOf(entry.member, entry.parent));
    assert.deepEqual(
      overrides.map((o) => o.identity),
      [IDENTITY]
    );
    const issues = contractIssues(overrides, new Set(), root);
    assert.equal(issues.length, entry.rejected ? 1 : 0);
    if (entry.rejected) assert.ok(issues[0].includes(IDENTITY));
  });
}

test("legacy identity is exact; copying its class name does not inherit an exemption", (t) => {
  const root = fixtureRoot(t);
  const text = sourceOf("async execute(input) { return input; }");
  const legacy = new Set([IDENTITY]);
  assert.deepEqual(contractIssues(collectOverrides(NEW_FILE, text), legacy, root), []);
  const copied = collectOverrides("open-sse/executors/copied.ts", text);
  assert.equal(contractIssues(copied, legacy, root).length, 1);
});

test("inherited, abstract and static methods do not introduce an instance implementation", () => {
  const text =
    "abstract class Abstract { abstract execute(input: unknown): Promise<unknown>; } class Helper { static execute() {} } class Inherited extends BaseExecutor {}";
  assert.deepEqual(collectOverrides(NEW_FILE, text), []);
});

test("direct BaseExecutor import aliases still allow a trivial delegation", () => {
  const text =
    'import { BaseExecutor as Base } from "./base.ts"; class Example extends Base { execute(input) { return super.execute(input); } }';
  assert.equal(delegatesToBase(collectOverrides(NEW_FILE, text)[0]), true);
});

for (const [name, body] of [
  [
    "a factory parameter shadows the import",
    "function make(Base) { return class Example extends Base { execute(input) { return super.execute(input); } }; }",
  ],
  [
    "a block binding shadows the import",
    "{ const Base = OtherExecutor; class Example extends Base { execute(input) { return super.execute(input); } } }",
  ],
  [
    "a nested class needs an explicit decision even without visible shadowing",
    "function make() { return class Example extends Base { execute(input) { return super.execute(input); } }; }",
  ],
]) {
  test(`trivial delegation requires an unambiguous module binding: ${name}`, (t) => {
    const root = fixtureRoot(t);
    const text = `import { BaseExecutor as Base } from "./base.ts"; ${body}`;
    const overrides = collectOverrides(NEW_FILE, text);
    assert.equal(overrides.length, 1);
    assert.equal(contractIssues(overrides, new Set(), root).length, 1);
  });
}

test("nested class can declare explicit recovery ownership", (t) => {
  const root = fixtureRoot(t);
  const text = `import { BaseExecutor as Base } from "./base.ts";
function make(Base) { return class Example extends Base {
${declaration()}execute(input) { return super.execute(input); }
}; }`;
  assert.deepEqual(contractIssues(collectOverrides(NEW_FILE, text), new Set(), root), []);
});

test("unclassifiable computed members are reported rather than silently skipped", () => {
  assert.throws(
    () => collectOverrides(NEW_FILE, "class Example { [memberName](input) { return input; } }"),
    /literal name/
  );
});

test("test references reject symlinks outside tests and directories", (t) => {
  const root = fixtureRoot(t);
  const outside = path.join(root, "outside.test.ts");
  fs.writeFileSync(outside, "// outside\n");
  fs.symlinkSync(outside, path.join(root, "tests/unit/link.test.ts"));
  fs.mkdirSync(path.join(root, "tests/unit/directory.test.ts"));
  assert.equal(validTestReference(root, "tests/unit/link.test.ts"), false);
  assert.equal(validTestReference(root, "tests/unit/directory.test.ts"), false);
  assert.equal(validTestReference(root, TEST_REFERENCE), true);
});

test("filesystem scanner enforces the same policy on a newly introduced executor", (t) => {
  const root = fixtureRoot(t);
  fs.writeFileSync(path.join(root, NEW_FILE), sourceOf("async execute(input) { return input; }"));
  const rejected = inspectExecutors(root, new Set());
  assert.deepEqual(rejected.identities, [IDENTITY]);
  assert.equal(rejected.issues.length, 1);
  fs.writeFileSync(
    path.join(root, NEW_FILE),
    sourceOf(
      declaration("native", "Native payload omits recovery carriers.") +
        "async execute(input) { return input; }"
    )
  );
  assert.deepEqual(inspectExecutors(root, new Set()).issues, []);
});

test("new executor overrides have explicit recovery ownership", () => {
  const snapshot: { originCommit: string; identities: string[] } = JSON.parse(
    fs.readFileSync(path.join(ROOT, SNAPSHOT), "utf8")
  );
  assert.equal(snapshot.originCommit, ORIGIN);
  assert.deepEqual(snapshot.identities, [...new Set(snapshot.identities)].sort());
  assert.ok(
    snapshot.identities.includes("open-sse/executors/commandCode.ts::CommandCodeExecutor::execute")
  );
  const result = inspectExecutors(ROOT, new Set(snapshot.identities));
  assert.ok(
    result.identities.includes("open-sse/executors/commandCode.ts::CommandCodeExecutor::execute")
  );
  assert.deepEqual(result.issues, [], result.issues.join("\n"));
});
