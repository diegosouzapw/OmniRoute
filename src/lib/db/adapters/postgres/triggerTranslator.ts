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
import type { TranslatedStatement } from "./sqlTranslator";

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

const RAISE_RE =
  /^\s*SELECT\s+RAISE\s*\(\s*(ABORT|FAIL|ROLLBACK|IGNORE)\s*(?:,\s*('(?:[^']|'')*'))?\s*\)\s*(?:WHERE\s+([\s\S]+))?$/i;

export function translateTrigger(
  tokens: Token[],
  translateBody: BodyTranslator,
  translateExpression: ExpressionTranslator
): TranslatedTrigger {
  let i = nextIndex(tokens, 0);
  if (isWord(tokens[i], "TEMP", "TEMPORARY")) i = nextIndex(tokens, i);
  i = nextIndex(tokens, i);
  if (isWord(tokens[i], "IF")) i = nextIndex(tokens, nextIndex(tokens, nextIndex(tokens, i)));
  const name = identifierName(tokens[i]) ?? tokens[i].value;
  i = nextIndex(tokens, i);
  let timing = "BEFORE";
  if (isWord(tokens[i], "BEFORE", "AFTER")) {
    timing = tokens[i].value.toUpperCase();
    i = nextIndex(tokens, i);
  } else if (isWord(tokens[i], "INSTEAD")) {
    throw new Error("[postgres] INSTEAD OF triggers are not supported");
  }
  const event = tokens[i].value.toUpperCase();
  i = nextIndex(tokens, i);
  const columns: string[] = [];
  if (event === "UPDATE" && isWord(tokens[i], "OF")) {
    i = nextIndex(tokens, i);
    while (i < tokens.length && !isWord(tokens[i], "ON")) {
      const column = identifierName(tokens[i]);
      if (column) columns.push(column);
      i = nextIndex(tokens, i);
    }
  }
  if (!isWord(tokens[i], "ON")) throw new Error(`[postgres] cannot parse trigger ${name}`);
  i = nextIndex(tokens, i);
  const table = identifierName(tokens[i]) ?? tokens[i].value;
  i = nextIndex(tokens, i);
  if (isWord(tokens[i], "FOR")) i = nextIndex(tokens, nextIndex(tokens, nextIndex(tokens, i)));
  let whenTokens: Token[] = [];
  if (isWord(tokens[i], "WHEN")) {
    const start = nextIndex(tokens, i);
    let depth = 0;
    let j = start;
    for (; j < tokens.length; j++) {
      const token = tokens[j];
      if (isOp(token, "(")) depth++;
      else if (isOp(token, ")")) depth--;
      else if (depth === 0 && isWord(token, "BEGIN")) break;
    }
    whenTokens = trimWs(tokens.slice(start, j));
    i = j;
  }
  if (!isWord(tokens[i], "BEGIN")) throw new Error(`[postgres] trigger ${name} has no body`);
  let end = tokens.length - 1;
  while (end > i && (tokens[end].type === "ws" || isOp(tokens[end], ";"))) end--;
  if (!isWord(tokens[end], "END"))
    throw new Error(`[postgres] trigger ${name} body is not terminated`);
  const bodySql = render(tokens.slice(i + 1, end));
  const bodyStatements = splitStatements(bodySql);
  const lines: string[] = [];
  if (whenTokens.length) {
    lines.push(
      `  IF NOT (${translateExpression(render(whenTokens))}) THEN RETURN ${timing === "BEFORE" ? (event === "DELETE" ? "OLD" : "NEW") : "NULL"}; END IF;`
    );
  }
  for (const statement of bodyStatements) {
    const raise = RAISE_RE.exec(statement);
    if (raise) {
      const action = raise[1].toUpperCase();
      const message = raise[2] ?? "'trigger aborted'";
      const condition = raise[3] ? translateExpression(raise[3]) : null;
      const body =
        action === "IGNORE"
          ? `RETURN ${event === "DELETE" ? "OLD" : "NEW"};`
          : `RAISE EXCEPTION ${message};`;
      lines.push(condition ? `  IF ${condition} THEN ${body} END IF;` : `  ${body}`);
      continue;
    }
    const translated = translateBody(statement);
    for (const sql of translated.statements) {
      const upper = sql.trimStart().toUpperCase();
      lines.push(
        `  ${upper.startsWith("SELECT") ? `PERFORM ${sql.trimStart().slice(6).trimStart()}` : sql};`
      );
    }
  }
  lines.push(`  RETURN ${timing === "BEFORE" ? (event === "DELETE" ? "OLD" : "NEW") : "NULL"};`);
  const functionName = triggerFunctionName(name);
  const triggerName = fitIdentifier(name);
  const eventClause =
    event === "UPDATE" && columns.length
      ? `UPDATE OF ${columns.map((c) => `"${c}"`).join(", ")}`
      : event;
  const statements = [
    `CREATE OR REPLACE FUNCTION "${functionName}"() RETURNS trigger LANGUAGE plpgsql AS $omniroute_trigger$\nBEGIN\n${lines.join("\n")}\nEND\n$omniroute_trigger$`,
    `DROP TRIGGER IF EXISTS "${triggerName}" ON "${table}"`,
    `CREATE TRIGGER "${triggerName}" ${timing} ${eventClause} ON "${table}" FOR EACH ROW EXECUTE FUNCTION "${functionName}"()`,
  ];
  return { statements, table, name };
}
