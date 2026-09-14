import {
  identifierName,
  isOp,
  isWord,
  matchingParen,
  nextIndex,
  op,
  render,
  splitTopLevel,
  trimWs,
  word,
  ws,
  type Token,
} from "./sqlTokenizer";
import {
  ROWID_COLUMN,
  finish,
  SqliteEmulationError,
  type TableSchema,
  type TranslationContext,
  type TranslatedStatement,
  type ParamState,
} from "./translationCore";
import { upper, applyExpressionRules } from "./sqlExpressions";

type InsertMode = "plain" | "replace" | "ignore";

interface InsertHead {
  mode: InsertMode;
  tableName: string;
  columns: string[] | null;
  bodyStart: number;
}

interface InsertBody {
  body: Token[];
  existingConflict: Token[];
  returning: Token[];
}

const ROWID_ALIAS = "__omniroute_rowid";

function qident(value: string): Token {
  return { type: "qident", value };
}

function qidentList(names: string[]): Token[] {
  const out: Token[] = [];
  names.forEach((name, index) => {
    if (index > 0) out.push(op(","), ws());
    out.push(qident(name));
  });
  return out;
}

function parseInsertMode(tokens: Token[]): { mode: InsertMode; cursor: number } {
  let cursor = nextIndex(tokens, -1);
  if (upper(tokens[cursor]) === "REPLACE") {
    return { mode: "replace", cursor: nextIndex(tokens, cursor) };
  }
  cursor = nextIndex(tokens, cursor);
  if (!isWord(tokens[cursor], "OR")) return { mode: "plain", cursor };
  const conflictAction = upper(tokens[nextIndex(tokens, cursor)]);
  const mode: InsertMode =
    conflictAction === "REPLACE" ? "replace" : conflictAction === "IGNORE" ? "ignore" : "plain";
  return { mode, cursor: nextIndex(tokens, nextIndex(tokens, cursor)) };
}

function parseInsertHead(tokens: Token[]): InsertHead {
  const { mode, cursor } = parseInsertMode(tokens);
  if (!isWord(tokens[cursor], "INTO"))
    throw new SqliteEmulationError(`near "${tokens[cursor]?.value}": syntax error`);
  const tableIndex = nextIndex(tokens, cursor);
  const tableName = identifierName(tokens[tableIndex]) ?? "";
  const afterTable = nextIndex(tokens, tableIndex);
  if (!isOp(tokens[afterTable], "(")) {
    return { mode, tableName, columns: null, bodyStart: afterTable };
  }
  const columnsClose = matchingParen(tokens, afterTable);
  const columns = splitTopLevel(tokens.slice(afterTable + 1, columnsClose), ",")
    .map(trimWs)
    .map((c) => identifierName(c[0]) ?? c[0].value);
  return { mode, tableName, columns, bodyStart: columnsClose + 1 };
}

function translateInsertBody(
  tokens: Token[],
  bodyStart: number,
  ctx: TranslationContext,
  params: ParamState
): InsertBody {
  const returningIndex = findTopLevelWord(tokens, "RETURNING", bodyStart);
  const onConflictIndex = findTopLevelWord(tokens, "ON", bodyStart, "CONFLICT");
  const tailStart = returningIndex !== -1 ? returningIndex : tokens.length;
  const bodyEnd = onConflictIndex !== -1 ? onConflictIndex : tailStart;
  const translate = (from: number, to: number) =>
    applyExpressionRules(tokens.slice(from, to), ctx, params);
  return {
    body: translate(bodyStart, bodyEnd),
    existingConflict: onConflictIndex !== -1 ? translate(onConflictIndex, tailStart) : [],
    returning: returningIndex !== -1 ? translate(returningIndex, tokens.length) : [],
  };
}

function insertHeadTokens(tableName: string, columns: string[] | null): Token[] {
  const head: Token[] = [word("INSERT"), ws(), word("INTO"), ws(), qident(tableName), ws()];
  if (columns) head.push(op("("), ...qidentList(columns), op(")"), ws());
  return head;
}

function insertConflictTokens(
  head: InsertHead,
  schema: TableSchema | null,
  existingConflict: Token[]
): Token[] | null {
  if (head.mode === "ignore") {
    return [word("ON"), ws(), word("CONFLICT"), ws(), word("DO"), ws(), word("NOTHING")];
  }
  if (head.mode === "replace") {
    return buildReplaceConflictClause(head.tableName, head.columns, schema);
  }
  return existingConflict.length ? existingConflict : null;
}

function identityReturningTokens(identityColumn: string): Token[] {
  return [
    word("RETURNING"),
    ws(),
    qident(identityColumn),
    ws(),
    word("AS"),
    ws(),
    qident(ROWID_ALIAS),
  ];
}

export function translateInsert(
  tokens: Token[],
  ctx: TranslationContext,
  params: ParamState
): TranslatedStatement {
  const head = parseInsertHead(tokens);
  const { body, existingConflict, returning } = translateInsertBody(
    tokens,
    head.bodyStart,
    ctx,
    params
  );
  const schema = ctx.lookupTable(head.tableName);
  const out: Token[] = [...insertHeadTokens(head.tableName, head.columns), ...body];
  const conflict = insertConflictTokens(head, schema, existingConflict);
  if (conflict) out.push(ws(), ...conflict);
  let returningColumn: string | undefined;
  if (returning.length) {
    out.push(ws(), ...returning);
  } else if (schema?.identityColumn) {
    returningColumn = ROWID_ALIAS;
    out.push(ws(), ...identityReturningTokens(schema.identityColumn));
  }
  const result = finish("insert", [render(out)], params, [head.tableName]);
  if (returningColumn) result.returningColumn = returningColumn;
  return result;
}

function replaceAssignments(schema: TableSchema, inserted: string[], arbiter: string[]): Token[][] {
  const arbiterLower = arbiter.map((c) => c.toLowerCase());
  const assignments: Token[][] = [];
  for (const column of schema.columns) {
    const lower = column.toLowerCase();
    if (arbiterLower.includes(lower) || lower === ROWID_COLUMN) continue;
    if (inserted.includes(lower)) {
      assignments.push([
        qident(column),
        ws(),
        op("="),
        ws(),
        word("EXCLUDED"),
        op("."),
        qident(column),
      ]);
    } else if (schema.identityColumn !== column) {
      assignments.push([qident(column), ws(), op("="), ws(), word("DEFAULT")]);
    }
  }
  return assignments;
}

export function buildReplaceConflictClause(
  tableName: string,
  columns: string[] | null,
  schema: TableSchema | null
): Token[] {
  if (!schema) throw new SqliteEmulationError(`no such table: ${tableName}`);
  const inserted = (columns ?? schema.columns.filter((c) => c !== ROWID_COLUMN)).map((c) =>
    c.toLowerCase()
  );
  const covers = (index: string[]) =>
    index.length > 0 && index.every((c) => inserted.includes(c.toLowerCase()));
  const arbiter = covers(schema.primaryKey)
    ? schema.primaryKey
    : (schema.uniqueIndexes.find(covers) ?? null);
  if (!arbiter) return [];
  const assignments = replaceAssignments(schema, inserted, arbiter);
  const out: Token[] = [word("ON"), ws(), word("CONFLICT"), ws(), op("(")];
  out.push(...qidentList(arbiter), op(")"), ws(), word("DO"), ws());
  if (assignments.length === 0) {
    out.push(word("NOTHING"));
    return out;
  }
  out.push(word("UPDATE"), ws(), word("SET"), ws());
  assignments.forEach((assignment, index) => {
    if (index > 0) out.push(op(","), ws());
    out.push(...assignment);
  });
  return out;
}

function findTopLevelWord(tokens: Token[], name: string, from: number, second?: string): number {
  let depth = 0;
  for (let i = from; i < tokens.length; i++) {
    const token = tokens[i];
    if (isOp(token, "(")) depth++;
    else if (isOp(token, ")")) depth--;
    else if (depth === 0 && isWord(token, name)) {
      if (!second || isWord(tokens[nextIndex(tokens, i)], second)) return i;
    }
  }
  return -1;
}

export function translateUpdateOrDelete(
  tokens: Token[],
  kind: "update" | "delete",
  ctx: TranslationContext,
  params: ParamState
): TranslatedStatement {
  let cursor = nextIndex(tokens, -1);
  const out: Token[] = [];
  if (kind === "update") {
    out.push(word("UPDATE"), ws());
    cursor = nextIndex(tokens, cursor);
    if (isWord(tokens[cursor], "OR")) cursor = nextIndex(tokens, nextIndex(tokens, cursor));
  } else {
    out.push(word("DELETE"), ws(), word("FROM"), ws());
    cursor = nextIndex(tokens, nextIndex(tokens, cursor));
  }
  const tableName = identifierName(tokens[cursor]) ?? "";
  out.push(qident(tableName), ws());
  const rest = trimWs(applyExpressionRules(tokens.slice(cursor + 1), ctx, params));
  out.push(...rest);
  return finish(kind, [render(out)], params, [tableName]);
}

export function translateTransaction(tokens: Token[], params: ParamState): TranslatedStatement {
  const first = upper(tokens[nextIndex(tokens, -1)]);
  const words = tokens.filter((t) => t.type === "word").map((t) => t.value.toUpperCase());
  const identifiers = tokens.filter((t) => t.type === "word" || t.type === "qident");
  const lastName = () => identifiers[identifiers.length - 1].value;
  if (first === "BEGIN") return finish("transaction", ["BEGIN"], params, []);
  if (first === "COMMIT" || first === "END") return finish("transaction", ["COMMIT"], params, []);
  if (first === "ROLLBACK") {
    if (words.includes("TO")) {
      return finish("transaction", [`ROLLBACK TO SAVEPOINT "${lastName()}"`], params, []);
    }
    return finish("transaction", ["ROLLBACK"], params, []);
  }
  if (first === "SAVEPOINT")
    return finish("transaction", [`SAVEPOINT "${lastName()}"`], params, []);
  if (first === "RELEASE") {
    return finish("transaction", [`RELEASE SAVEPOINT "${lastName()}"`], params, []);
  }
  return finish("transaction", [render(tokens)], params, []);
}
