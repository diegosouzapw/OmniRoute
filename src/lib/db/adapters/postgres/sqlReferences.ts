import {
  identifierName,
  isOp,
  isWord,
  matchingParen,
  nextIndex,
  op,
  splitTopLevel,
  trimWs,
  word,
  ws,
  type Token,
} from "./sqlTokenizer";
import { type TranslationContext } from "./translationCore";
import { upper } from "./sqlExpressions";
import { mapColumnType, scanColumnType } from "./sqlColumnTypes";

interface ParsedReferences {
  table: string;
  columns: string[];
  actions: Token[];
}

export function joinTokenLists(parts: Token[][]): Token[] {
  const out: Token[] = [];
  parts.forEach((part, index) => {
    if (index > 0) out.push(op(","), ws());
    out.push(...part);
  });
  return out;
}

export function quotedColumnList(columns: string[]): Token[] {
  const quoted = columns.map((c): Token[] => [{ type: "qident", value: c }]);
  return [op("("), ...joinTokenLists(quoted), op(")")];
}

function skipReferenceAction(tokens: Token[], at: number): number {
  let i = nextIndex(tokens, nextIndex(tokens, at));
  const action = upper(tokens[i]);
  if (action === "SET" || action === "NO") i = nextIndex(tokens, i);
  return i + 1;
}

function skipReferenceOption(tokens: Token[], i: number): number | null {
  const at = nextIndex(tokens, i - 1);
  const value = upper(tokens[at]);
  if (value === "ON") return skipReferenceAction(tokens, at);
  if (value === "MATCH" || value === "INITIALLY") return nextIndex(tokens, at) + 1;
  if (value === "NOT" && upper(tokens[nextIndex(tokens, at)]) === "DEFERRABLE") {
    return nextIndex(tokens, at) + 1;
  }
  if (value === "DEFERRABLE") return at + 1;
  return null;
}

export function skipReferences(tokens: Token[], start: number): number {
  let i = nextIndex(tokens, nextIndex(tokens, start));
  if (isOp(tokens[i], "(")) i = matchingParen(tokens, i) + 1;
  while (i < tokens.length) {
    const next = skipReferenceOption(tokens, i);
    if (next === null) break;
    i = next;
  }
  return i;
}

function localColumnType(localDefs: Token[][] | null, column: string | null): string | null {
  if (!localDefs || !column) return null;
  const target = column.toLowerCase();
  const def = localDefs.find((d) => identifierName(d[0])?.toLowerCase() === target);
  return def ? mapColumnType(scanColumnType(def).typeWords) : null;
}

export function referencedColumnType(
  ctx: TranslationContext,
  table: string,
  column: string | null,
  currentTable: string,
  localDefs: Token[][] | null
): string | null {
  if (table.toLowerCase() === currentTable.toLowerCase()) {
    return localColumnType(localDefs, column);
  }
  const schema = ctx.lookupTable(table);
  if (!schema) return null;
  const target = column ?? schema.primaryKey[0];
  if (!target) return null;
  return schema.columnTypes[target.toLowerCase()] ?? null;
}

function referencedColumnNames(tokens: Token[]): string[] {
  const columns: string[] = [];
  for (const part of splitTopLevel(tokens, ",")) {
    const name = identifierName(trimWs(part)[0]);
    if (name) columns.push(name);
  }
  return columns;
}

function parseOnAction(tokens: Token[], cursor: number, actions: Token[]): number {
  const target = upper(tokens[nextIndex(tokens, cursor)]);
  let actionIndex = nextIndex(tokens, nextIndex(tokens, cursor));
  const action = upper(tokens[actionIndex]);
  const words = [action];
  if (action === "SET" || action === "NO") {
    actionIndex = nextIndex(tokens, actionIndex);
    words.push(upper(tokens[actionIndex]));
  }
  actions.push(ws(), word("ON"), ws(), word(target));
  for (const w of words) actions.push(ws(), word(w));
  return actionIndex + 1;
}

function parseReferenceAction(tokens: Token[], cursor: number, actions: Token[]): number {
  const value = upper(tokens[cursor]);
  if (value === "ON") return parseOnAction(tokens, cursor, actions);
  if (value === "DEFERRABLE") {
    actions.push(ws(), word("DEFERRABLE"));
    return nextIndex(tokens, cursor);
  }
  if (value === "NOT" || value === "INITIALLY") {
    const following = upper(tokens[nextIndex(tokens, cursor)]);
    actions.push(ws(), word(value), ws(), word(following));
    return nextIndex(tokens, nextIndex(tokens, cursor));
  }
  if (value === "MATCH") return nextIndex(tokens, nextIndex(tokens, cursor));
  return cursor + 1;
}

function parseReferenceActions(tokens: Token[], start: number): Token[] {
  const actions: Token[] = [];
  let cursor = start;
  while (cursor < tokens.length) cursor = parseReferenceAction(tokens, cursor, actions);
  return actions;
}

function parseReferences(tokens: Token[]): ParsedReferences | null {
  let i = nextIndex(tokens, -1);
  if (!isWord(tokens[i], "REFERENCES")) return null;
  i = nextIndex(tokens, i);
  const table = identifierName(tokens[i]);
  if (!table) return null;
  i = nextIndex(tokens, i);
  const columns: string[] = [];
  if (isOp(tokens[i], "(")) {
    const close = matchingParen(tokens, i);
    columns.push(...referencedColumnNames(tokens.slice(i + 1, close)));
    i = close + 1;
  }
  return { table, columns, actions: parseReferenceActions(tokens, i) };
}

export function referenceClause(
  tokens: Token[],
  ctx: TranslationContext,
  currentTable: string,
  columnType: string,
  localDefs: Token[][] | null = null
): Token[] | null {
  const parsed = parseReferences(tokens);
  if (!parsed) return null;
  const targetType = referencedColumnType(
    ctx,
    parsed.table,
    parsed.columns[0] ?? null,
    currentTable,
    localDefs
  );
  if (targetType === null || (columnType && targetType !== columnType)) return null;
  const out: Token[] = [word("REFERENCES"), ws(), { type: "qident", value: parsed.table }];
  if (parsed.columns.length) out.push(...quotedColumnList(parsed.columns));
  out.push(...parsed.actions);
  return out;
}
