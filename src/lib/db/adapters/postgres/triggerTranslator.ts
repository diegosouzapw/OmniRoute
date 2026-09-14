import {
  identifierName,
  isOp,
  isWord,
  nextIndex,
  render,
  splitStatements,
  trimWs,
  type Token,
} from "./sqlTokenizer";
import { createHash } from "node:crypto";
import type { TranslatedStatement } from "./translationCore";

const MAX_IDENTIFIER_LENGTH = 63;

export function fitIdentifier(name: string): string {
  if (Buffer.byteLength(name, "utf8") <= MAX_IDENTIFIER_LENGTH) return name;
  const digest = createHash("sha1").update(name).digest("hex").slice(0, 8);
  return `${name.slice(0, MAX_IDENTIFIER_LENGTH - digest.length - 1)}_${digest}`;
}

export function triggerFunctionName(triggerName: string): string {
  return fitIdentifier(`omniroute_trg_${triggerName}`);
}

export interface TranslatedTrigger {
  statements: string[];
  table: string;
  name: string;
}

type BodyTranslator = (sql: string) => TranslatedStatement;
type ExpressionTranslator = (expr: string) => string;

interface TriggerHeader {
  name: string;
  timing: string;
  event: string;
  columns: string[];
  table: string;
  whenTokens: Token[];
  bodyStart: number;
}

const RAISE_RE =
  /^\s*SELECT\s+RAISE\s*\(\s*(ABORT|FAIL|ROLLBACK|IGNORE)\s*(?:,\s*('(?:[^']|'')*'))?\s*\)\s*(?:WHERE\s+([\s\S]+))?$/i;

function parseTriggerName(tokens: Token[]): { name: string; next: number } {
  let i = nextIndex(tokens, 0);
  if (isWord(tokens[i], "TEMP", "TEMPORARY")) i = nextIndex(tokens, i);
  i = nextIndex(tokens, i);
  if (isWord(tokens[i], "IF")) i = nextIndex(tokens, nextIndex(tokens, nextIndex(tokens, i)));
  return { name: identifierName(tokens[i]) ?? tokens[i].value, next: nextIndex(tokens, i) };
}

function parseTiming(tokens: Token[], start: number): { timing: string; next: number } {
  if (isWord(tokens[start], "BEFORE", "AFTER")) {
    return { timing: tokens[start].value.toUpperCase(), next: nextIndex(tokens, start) };
  }
  if (isWord(tokens[start], "INSTEAD")) {
    throw new Error("[postgres] INSTEAD OF triggers are not supported");
  }
  return { timing: "BEFORE", next: start };
}

function parseUpdateColumns(
  tokens: Token[],
  start: number,
  event: string
): { columns: string[]; next: number } {
  const columns: string[] = [];
  if (event !== "UPDATE" || !isWord(tokens[start], "OF")) return { columns, next: start };
  let i = nextIndex(tokens, start);
  while (i < tokens.length && !isWord(tokens[i], "ON")) {
    const column = identifierName(tokens[i]);
    if (column) columns.push(column);
    i = nextIndex(tokens, i);
  }
  return { columns, next: i };
}

function parseWhenClause(tokens: Token[], start: number): { whenTokens: Token[]; next: number } {
  if (!isWord(tokens[start], "WHEN")) return { whenTokens: [], next: start };
  const exprStart = nextIndex(tokens, start);
  let depth = 0;
  let j = exprStart;
  for (; j < tokens.length; j++) {
    const token = tokens[j];
    if (isOp(token, "(")) depth++;
    else if (isOp(token, ")")) depth--;
    else if (depth === 0 && isWord(token, "BEGIN")) break;
  }
  return { whenTokens: trimWs(tokens.slice(exprStart, j)), next: j };
}

function parseTriggerHeader(tokens: Token[]): TriggerHeader {
  const { name, next: timingIndex } = parseTriggerName(tokens);
  const { timing, next: eventIndex } = parseTiming(tokens, timingIndex);
  const event = tokens[eventIndex].value.toUpperCase();
  const { columns, next: onIndex } = parseUpdateColumns(
    tokens,
    nextIndex(tokens, eventIndex),
    event
  );
  if (!isWord(tokens[onIndex], "ON")) throw new Error(`[postgres] cannot parse trigger ${name}`);
  const tableIndex = nextIndex(tokens, onIndex);
  const table = identifierName(tokens[tableIndex]) ?? tokens[tableIndex].value;
  let i = nextIndex(tokens, tableIndex);
  if (isWord(tokens[i], "FOR")) i = nextIndex(tokens, nextIndex(tokens, nextIndex(tokens, i)));
  const { whenTokens, next: bodyStart } = parseWhenClause(tokens, i);
  return { name, timing, event, columns, table, whenTokens, bodyStart };
}

function extractBody(tokens: Token[], bodyStart: number, name: string): string[] {
  if (!isWord(tokens[bodyStart], "BEGIN"))
    throw new Error(`[postgres] trigger ${name} has no body`);
  let end = tokens.length - 1;
  while (end > bodyStart && (tokens[end].type === "ws" || isOp(tokens[end], ";"))) end--;
  if (!isWord(tokens[end], "END"))
    throw new Error(`[postgres] trigger ${name} body is not terminated`);
  return splitStatements(render(tokens.slice(bodyStart + 1, end)));
}

function rowResult(event: string): string {
  return event === "DELETE" ? "OLD" : "NEW";
}

function returnValue(timing: string, event: string): string {
  return timing === "BEFORE" ? rowResult(event) : "NULL";
}

function translateRaise(
  raise: RegExpExecArray,
  event: string,
  translateExpression: ExpressionTranslator
): string {
  const action = raise[1].toUpperCase();
  const message = raise[2] ?? "'trigger aborted'";
  const condition = raise[3] ? translateExpression(raise[3]) : null;
  const body = action === "IGNORE" ? `RETURN ${rowResult(event)};` : `RAISE EXCEPTION ${message};`;
  return condition ? `  IF ${condition} THEN ${body} END IF;` : `  ${body}`;
}

function toPlpgsqlLine(sql: string): string {
  const upper = sql.trimStart().toUpperCase();
  return `  ${upper.startsWith("SELECT") ? `PERFORM ${sql.trimStart().slice(6).trimStart()}` : sql};`;
}

function translateBodyStatement(
  statement: string,
  event: string,
  translateBody: BodyTranslator,
  translateExpression: ExpressionTranslator
): string[] {
  const raise = RAISE_RE.exec(statement);
  if (raise) return [translateRaise(raise, event, translateExpression)];
  return translateBody(statement).statements.map(toPlpgsqlLine);
}

function buildFunctionLines(
  header: TriggerHeader,
  bodyStatements: string[],
  translateBody: BodyTranslator,
  translateExpression: ExpressionTranslator
): string[] {
  const returned = returnValue(header.timing, header.event);
  const lines: string[] = [];
  if (header.whenTokens.length) {
    lines.push(
      `  IF NOT (${translateExpression(render(header.whenTokens))}) THEN RETURN ${returned}; END IF;`
    );
  }
  for (const statement of bodyStatements) {
    lines.push(
      ...translateBodyStatement(statement, header.event, translateBody, translateExpression)
    );
  }
  lines.push(`  RETURN ${returned};`);
  return lines;
}

function buildTriggerStatements(header: TriggerHeader, lines: string[]): string[] {
  const functionName = triggerFunctionName(header.name);
  const triggerName = fitIdentifier(header.name);
  const eventClause =
    header.event === "UPDATE" && header.columns.length
      ? `UPDATE OF ${header.columns.map((c) => `"${c}"`).join(", ")}`
      : header.event;
  return [
    `CREATE OR REPLACE FUNCTION "${functionName}"() RETURNS trigger LANGUAGE plpgsql AS $omniroute_trigger$\nBEGIN\n${lines.join("\n")}\nEND\n$omniroute_trigger$`,
    `DROP TRIGGER IF EXISTS "${triggerName}" ON "${header.table}"`,
    `CREATE TRIGGER "${triggerName}" ${header.timing} ${eventClause} ON "${header.table}" FOR EACH ROW EXECUTE FUNCTION "${functionName}"()`,
  ];
}

export function translateTrigger(
  tokens: Token[],
  translateBody: BodyTranslator,
  translateExpression: ExpressionTranslator
): TranslatedTrigger {
  const header = parseTriggerHeader(tokens);
  const bodyStatements = extractBody(tokens, header.bodyStart, header.name);
  const lines = buildFunctionLines(header, bodyStatements, translateBody, translateExpression);
  return {
    statements: buildTriggerStatements(header, lines),
    table: header.table,
    name: header.name,
  };
}
