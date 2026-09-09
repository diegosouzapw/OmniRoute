import {
  identifierName,
  isOp,
  isWord,
  matchingParen,
  nextIndex,
  op,
  prevIndex,
  render,
  splitTopLevel,
  str,
  stringValue,
  tokenize,
  trimWs,
  word,
  ws,
  type Token,
} from "./sqlTokenizer";
import { fitIdentifier, translateTrigger, triggerFunctionName } from "./triggerTranslator";

export interface TableSchema {
  columns: string[];
  columnTypes: Record<string, string>;
  primaryKey: string[];
  uniqueIndexes: string[][];
  identityColumn: string | null;
}

export interface TranslationContext {
  lookupTable(name: string): TableSchema | null;
}

export type StatementKind =
  "select" | "insert" | "update" | "delete" | "ddl" | "pragma" | "transaction" | "noop" | "other";

export interface TranslatedStatement {
  kind: StatementKind;
  statements: string[];
  paramNames: string[] | null;
  paramCount: number;
  pragma?: string;
  returningColumn?: string;
  tables: string[];
}

export class SqliteEmulationError extends Error {
  code: string;
  constructor(message: string, code = "SQLITE_ERROR") {
    super(message);
    this.code = code;
  }
}

export const ROWID_TABLES = new Set([
  "call_logs",
  "conversation_turn_nodes",
  "memories",
  "domain_fallback_chains",
  "domain_lockout_state",
  "domain_circuit_breakers",
]);

export const ROWID_COLUMN = "rowid";

const KEYWORDS = new Set(
  `ABORT ACTION ADD AFTER ALL ALTER ALWAYS ANALYZE AND ANY ARRAY AS ASC ATTACH AUTOINCREMENT BEFORE BEGIN BETWEEN BIGINT BINARY BLOB BOOL BOOLEAN BOTH BY BYTEA CASCADE CASE CAST CHAR CHARACTER CHECK COLLATE COLUMN COMMIT CONFLICT CONSTRAINT CREATE CROSS CURRENT CURRENT_DATE CURRENT_TIME CURRENT_TIMESTAMP DATABASE DATE DATETIME DECIMAL DEFAULT DEFERRABLE DEFERRED DELETE DESC DETACH DISTINCT DO DOUBLE DROP EACH ELSE END ESCAPE EXCEPT EXCLUDE EXCLUDED EXCLUSIVE EXISTS EXPLAIN FAIL FALSE FILTER FIRST FLOAT FOLLOWING FOR FOREIGN FROM FULL GENERATED GLOB GROUP GROUPS HAVING IDENTITY IF IGNORE ILIKE IMMEDIATE IN INDEX INDEXED INITIALLY INNER INSERT INSTEAD INT INT2 INT4 INT8 INTEGER INTERSECT INTERVAL INTO IS ISNULL JOIN JSON KEY LAST LATERAL LEFT LIKE LIMIT MATCH MATERIALIZED NATURAL NO NOT NOTHING NOTNULL NULL NULLS NUMERIC OF OFFSET ON OR ORDER OTHERS OUTER OVER PARTITION PLAN PRAGMA PRECEDING PRECISION PRIMARY QUERY RAISE RANGE REAL RECURSIVE REFERENCES REGEXP REINDEX RELEASE RENAME REPLACE RESTRICT RETURNING RIGHT ROLLBACK ROW ROWS SAVEPOINT SELECT SET SMALLINT STORED STRICT TABLE TEMP TEMPORARY TEXT THEN TIES TIME TIMESTAMP TO TRANSACTION TRIGGER TRUE UNBOUNDED UNION UNIQUE UPDATE USING VACUUM VALUES VARCHAR VIEW VIRTUAL WHEN WHERE WINDOW WITH WITHOUT NEW OLD VARIADIC LANGUAGE FUNCTION RETURNS PERFORM EXECUTE PROCEDURE SCHEMA CONCURRENTLY TINYINT MEDIUMINT UNSIGNED NVARCHAR CLOB STRING NCHAR`.split(
    /\s+/
  )
);

const NOT_FUNCTION_WORDS = new Set(
  `IN VALUES EXISTS AND OR NOT WHERE ON SELECT FROM AS THEN ELSE WHEN BY SET INTO ALL ANY SOME DISTINCT RETURNING KEY REFERENCES CHECK UNIQUE DEFAULT USING CONFLICT ORDER GROUP HAVING LIMIT OFFSET JOIN LATERAL UPDATE INSERT DELETE TABLE INDEX PRIMARY FOREIGN CASE END INTERVAL BETWEEN LIKE ILIKE GLOB ESCAPE IS NULL OVER PARTITION WINDOW FILTER WITHIN EXCEPT UNION INTERSECT ROWS RANGE LEFT RIGHT INNER OUTER CROSS NATURAL MATCH REGEXP ADD COLUMN GENERATED ALWAYS STORED VIRTUAL TEMP TEMPORARY IF EXCLUDE FOLLOWING PRECEDING UNBOUNDED`.split(
    /\s+/
  )
);

const TEXT_TYPES = new Set([
  "TEXT",
  "VARCHAR",
  "CHAR",
  "CHARACTER",
  "CLOB",
  "DATETIME",
  "TIMESTAMP",
  "DATE",
  "TIME",
  "JSON",
  "STRING",
  "NVARCHAR",
  "NCHAR",
  "VARYING",
]);
const INT_TYPES = new Set([
  "INTEGER",
  "INT",
  "INT2",
  "INT4",
  "INT8",
  "BIGINT",
  "SMALLINT",
  "TINYINT",
  "MEDIUMINT",
  "BOOLEAN",
  "BOOL",
  "UNSIGNED",
]);
const REAL_TYPES = new Set(["REAL", "FLOAT", "DOUBLE", "NUMERIC", "DECIMAL", "NUMBER"]);
const BLOB_TYPES = new Set(["BLOB", "BYTEA"]);

const CONSTRAINT_WORDS = new Set([
  "NOT",
  "NULL",
  "PRIMARY",
  "UNIQUE",
  "CHECK",
  "DEFAULT",
  "COLLATE",
  "REFERENCES",
  "GENERATED",
  "AS",
  "CONSTRAINT",
  "AUTOINCREMENT",
]);

const BOOLEAN_CONTEXT_WORDS = new Set(["WHERE", "AND", "OR", "NOT", "WHEN", "HAVING"]);
const BOOLEAN_FOLLOWERS = new Set([
  "AND",
  "OR",
  "THEN",
  "ORDER",
  "GROUP",
  "LIMIT",
  "OFFSET",
  "HAVING",
  "UNION",
  "RETURNING",
  "WINDOW",
  "ELSE",
  "END",
  "EXCEPT",
  "INTERSECT",
]);

interface ParamState {
  names: string[];
  positional: number;
}

function isSqlKeyword(value: string): boolean {
  return KEYWORDS.has(value.toUpperCase());
}

function upper(token: Token | undefined): string {
  return token && token.type === "word" ? token.value.toUpperCase() : "";
}

function call(name: string, ...args: Token[][]): Token[] {
  const out: Token[] = [word(name), op("(")];
  args.forEach((arg, index) => {
    if (index > 0) out.push(op(","), ws());
    out.push(...arg);
  });
  out.push(op(")"));
  return out;
}

function paren(tokens: Token[]): Token[] {
  return [op("("), ...tokens, op(")")];
}

function cast(tokens: Token[], type: string): Token[] {
  return [op("("), ...tokens, op(")"), op("::"), word(type)];
}

function argsOf(inner: Token[]): Token[][] {
  const trimmed = trimWs(inner);
  if (trimmed.length === 0) return [];
  return splitTopLevel(trimmed, ",").map(trimWs);
}

function stripDistinct(arg: Token[]): { distinct: boolean; tokens: Token[] } {
  if (isWord(arg[0], "DISTINCT")) return { distinct: true, tokens: trimWs(arg.slice(1)) };
  return { distinct: false, tokens: arg };
}

function globToRegex(glob: string): string {
  let out = "^";
  for (let i = 0; i < glob.length; i++) {
    const ch = glob[i];
    if (ch === "*") out += ".*";
    else if (ch === "?") out += ".";
    else if (ch === "[") {
      const end = glob.indexOf("]", i + 1);
      if (end === -1) out += "\\[";
      else {
        out += glob.slice(i, end + 1);
        i = end;
      }
    } else if (/[.+^${}()|\\]/.test(ch)) out += `\\${ch}`;
    else out += ch;
  }
  return out + "$";
}

function rewriteCalls(
  tokens: Token[],
  handler: (name: string, args: Token[][], inner: Token[]) => Token[] | null
): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    const openIndex = nextIndex(tokens, i);
    if (
      token.type === "word" &&
      isOp(tokens[openIndex], "(") &&
      !NOT_FUNCTION_WORDS.has(token.value.toUpperCase())
    ) {
      const close = matchingParen(tokens, openIndex);
      if (close !== -1) {
        const inner = rewriteCalls(tokens.slice(openIndex + 1, close), handler);
        const replacement = handler(token.value, argsOf(inner), inner);
        if (replacement) out.push(...replacement);
        else out.push(token, op("("), ...inner, op(")"));
        i = close + 1;
        continue;
      }
    }
    if (token.type === "op" && token.value === "(") {
      const close = matchingParen(tokens, i);
      if (close !== -1) {
        out.push(op("("), ...rewriteCalls(tokens.slice(i + 1, close), handler), op(")"));
        i = close + 1;
        continue;
      }
    }
    out.push(token);
    i++;
  }
  return out;
}

function functionHandler(name: string, args: Token[][], inner: Token[]): Token[] | null {
  const lower = name.toLowerCase();
  switch (lower) {
    case "datetime":
      return call("omniroute_datetime", ...(args.length ? args : [[str("now")]]));
    case "date":
      return call("omniroute_date", ...(args.length ? args : [[str("now")]]));
    case "time":
      return call("omniroute_time", ...(args.length ? args : [[str("now")]]));
    case "julianday":
      return call("omniroute_julianday", ...(args.length ? args : [[str("now")]]));
    case "strftime":
      return call("omniroute_strftime", ...args);
    case "unixepoch":
      return call("omniroute_unixepoch", ...(args.length ? args : [[str("now")]]));
    case "json_extract":
      return call("omniroute_json_extract", ...args);
    case "json_type":
      return call("omniroute_json_type", ...args);
    case "json_valid":
      return call("omniroute_json_valid", ...args);
    case "json_set":
      return call("omniroute_json_set", ...args);
    case "json_insert":
      return call("omniroute_json_insert", ...args);
    case "json_replace":
      return call("omniroute_json_replace", ...args);
    case "json_remove":
      return call("omniroute_json_remove", ...args);
    case "json_array_length":
      return call("omniroute_json_array_length", ...args);
    case "json_quote":
      return cast(call("to_jsonb", ...args), "text");
    case "json":
      return call("omniroute_json", ...args);
    case "json_object":
      return cast(call("jsonb_build_object", ...args), "text");
    case "json_array":
      return cast(call("jsonb_build_array", ...args), "text");
    case "json_group_array":
      return [
        ...call("COALESCE", [...call("jsonb_agg", ...args), op("::"), word("text")], [str("[]")]),
      ];
    case "json_group_object":
      return cast(
        call("COALESCE", call("jsonb_object_agg", ...args), [str("{}"), op("::"), word("jsonb")]),
        "text"
      );
    case "max":
    case "min":
      if (args.length >= 2) return call(lower === "max" ? "GREATEST" : "LEAST", ...args);
      return null;
    case "ifnull":
      return call("COALESCE", ...args);
    case "instr":
      return call("strpos", ...args);
    case "group_concat": {
      const { distinct, tokens } = stripDistinct(args[0] ?? []);
      const separator = args[1] ?? [str(",")];
      const first = distinct
        ? [word("DISTINCT"), ws(), ...cast(tokens, "text")]
        : cast(tokens, "text");
      return call("string_agg", first, separator);
    }
    case "total":
      return cast(call("COALESCE", call("SUM", ...args), [word("0")]), "double precision");
    case "random":
      return call("omniroute_random");
    case "randomblob":
      return call("omniroute_randomblob", ...args);
    case "hex":
      return call("omniroute_hex", ...args);
    case "char": {
      const parts: Token[] = [];
      args.forEach((arg, index) => {
        if (index > 0) parts.push(ws(), op("||"), ws());
        parts.push(...call("chr", cast(arg, "int")));
      });
      return paren(parts);
    }
    case "trim":
      if (args.length === 2) return call("btrim", ...args);
      return null;
    case "round":
      if (args.length === 2) return call("round", cast(args[0], "numeric"), args[1]);
      return null;
    case "typeof":
      return call("omniroute_typeof", ...args);
    case "iif":
      if (args.length === 3)
        return [
          word("CASE"),
          ws(),
          word("WHEN"),
          ws(),
          ...args[0],
          ws(),
          word("THEN"),
          ws(),
          ...args[1],
          ws(),
          word("ELSE"),
          ws(),
          ...args[2],
          ws(),
          word("END"),
        ];
      return null;
    case "last_insert_rowid":
      return call("lastval");
    case "sqlite_version":
      return [str("3.46.0")];
    case "printf":
    case "format":
      return call("format", ...args);
    case "unicode":
      return call("ascii", ...args);
    case "substr":
    case "substring":
      return call("omniroute_substr", ...args);
    case "cast": {
      const asIndex = inner.findIndex((token) => isWord(token, "AS"));
      if (asIndex === -1) return null;
      const expr = trimWs(inner.slice(0, asIndex));
      const type = upper(trimWs(inner.slice(asIndex + 1))[0]);
      if (INT_TYPES.has(type)) return call("omniroute_to_integer", expr);
      if (REAL_TYPES.has(type)) return call("omniroute_to_real", expr);
      if (TEXT_TYPES.has(type)) return cast(expr, "text");
      if (BLOB_TYPES.has(type)) return cast(expr, "bytea");
      return null;
    }
    default:
      return null;
  }
}

function convertPlaceholders(tokens: Token[], state: ParamState): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "param") {
      out.push(token);
      continue;
    }
    let index: number;
    if (token.value.startsWith("?")) {
      const explicit = token.value.slice(1);
      if (explicit) {
        index = Number(explicit);
        state.positional = Math.max(state.positional, index);
      } else {
        state.positional += 1;
        index = state.positional;
      }
    } else {
      const name = token.value.slice(1);
      let position = state.names.indexOf(name);
      if (position === -1) {
        state.names.push(name);
        position = state.names.length - 1;
      }
      index = position + 1;
    }
    out.push({ type: "param", value: `$${index}` });
    const following = tokens[nextIndex(tokens, i)];
    if (isWord(following, "IS")) out.push(op("::"), word("text"));
  }
  return out;
}

function quoteMixedCaseIdentifiers(tokens: Token[]): Token[] {
  return tokens.map((token, index) => {
    if (token.type !== "word") return token;
    const value = token.value;
    if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) return token;
    if (isSqlKeyword(value)) return token;
    if (/^omniroute_/i.test(value)) return token;
    const following = tokens[nextIndex(tokens, index)];
    if (isOp(following, "(")) return token;
    const preceding = tokens[prevIndex(tokens, index)];
    if (isOp(preceding, "::")) return token;
    return { type: "qident", value };
  });
}

function rewriteOperators(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (isOp(token, "==")) {
      out.push(op("="));
      continue;
    }
    if (token.type === "word") {
      const value = token.value.toUpperCase();
      const nextI = nextIndex(tokens, i);
      const next = tokens[nextI];
      if (value === "IS") {
        const nextUpper = upper(next);
        if (nextUpper === "NOT") {
          const afterNot = tokens[nextIndex(tokens, nextI)];
          const afterUpper = upper(afterNot);
          if (
            afterUpper !== "NULL" &&
            afterUpper !== "DISTINCT" &&
            afterUpper !== "TRUE" &&
            afterUpper !== "FALSE" &&
            afterUpper !== "UNKNOWN"
          ) {
            out.push(word("IS"), ws(), word("DISTINCT"), ws(), word("FROM"));
            i = nextI;
            continue;
          }
        } else if (
          nextUpper !== "NULL" &&
          nextUpper !== "DISTINCT" &&
          nextUpper !== "TRUE" &&
          nextUpper !== "FALSE" &&
          nextUpper !== "UNKNOWN"
        ) {
          out.push(word("IS"), ws(), word("NOT"), ws(), word("DISTINCT"), ws(), word("FROM"));
          continue;
        }
      }
      if (value === "LIKE") {
        out.push(word("ILIKE"));
        continue;
      }
      if (value === "CURRENT_TIMESTAMP" || value === "CURRENT_DATE" || value === "CURRENT_TIME") {
        const fn =
          value === "CURRENT_DATE"
            ? "omniroute_date"
            : value === "CURRENT_TIME"
              ? "omniroute_time"
              : "omniroute_datetime";
        out.push(...call(fn, [str("now")]));
        continue;
      }
      if (value === "GLOB" || value === "REGEXP") {
        const previousI = prevIndex(out, out.length);
        const negated = isWord(out[previousI], "NOT");
        if (negated) out.splice(previousI, 1);
        out.push(op(negated ? "!~" : "~"));
        if (value === "GLOB" && next && next.type === "string") {
          out.push(ws(), str(globToRegex(stringValue(next))));
          i = nextI;
        }
        continue;
      }
      if (value === "INDEXED" && upper(next) === "BY") {
        i = nextIndex(tokens, nextI);
        continue;
      }
      if (value === "NOT" && upper(next) === "INDEXED") {
        i = nextI;
        continue;
      }
    }
    if (isOp(token, "->") || isOp(token, "->>")) {
      const lhsStart = out.length - 1;
      let start = lhsStart;
      while (start >= 0 && out[start].type === "ws") start--;
      if (start >= 0 && isOp(out[start], ")")) {
        let depth = 0;
        for (let k = start; k >= 0; k--) {
          if (isOp(out[k], ")")) depth++;
          if (isOp(out[k], "(")) depth--;
          if (depth === 0) {
            start = k;
            break;
          }
        }
        const prevWord = out[prevIndex(out, start)];
        if (prevWord && (prevWord.type === "word" || prevWord.type === "qident"))
          start = prevIndex(out, start);
      } else {
        while (start - 1 >= 0 && isOp(out[start - 1], ".")) start -= 2;
      }
      const lhs = out.splice(start);
      out.push(op("("), ...trimWs(lhs), op("::"), word("jsonb"), op(")"), ws(), op(token.value));
      continue;
    }
    out.push(token);
  }
  return out;
}

function rewriteCollate(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!isWord(token, "COLLATE")) {
      out.push(token);
      continue;
    }
    const collation = upper(tokens[nextIndex(tokens, i)]);
    i = nextIndex(tokens, i);
    if (collation !== "NOCASE") continue;
    const operandStart = findOperandStart(out);
    const operand = trimWs(out.splice(operandStart));
    const eqIndex = findTopLevelEquals(operand);
    if (eqIndex !== -1) {
      const left = trimWs(operand.slice(0, eqIndex));
      const right = trimWs(operand.slice(eqIndex + 1));
      out.push(...call("lower", left), ws(), op("="), ws(), ...call("lower", right));
    } else {
      out.push(...call("lower", operand));
    }
  }
  return out;
}

function findTopLevelEquals(tokens: Token[]): number {
  let depth = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (isOp(token, "(")) depth++;
    else if (isOp(token, ")")) depth--;
    else if (depth === 0 && isOp(token, "=")) return i;
  }
  return -1;
}

function findOperandStart(out: Token[]): number {
  let i = out.length - 1;
  while (i >= 0 && out[i].type === "ws") i--;
  let depth = 0;
  for (; i >= 0; i--) {
    const token = out[i];
    if (isOp(token, ")")) depth++;
    else if (isOp(token, "(")) {
      if (depth === 0) return i + 1;
      depth--;
    } else if (depth === 0) {
      if (token.type === "op" && token.value === ",") return i + 1;
      if (
        token.type === "word" &&
        [
          "WHERE",
          "AND",
          "OR",
          "BY",
          "SELECT",
          "ON",
          "WHEN",
          "THEN",
          "ELSE",
          "HAVING",
          "SET",
        ].includes(token.value.toUpperCase())
      )
        return i + 1;
    }
  }
  return 0;
}

function rewriteJsonEach(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "word" || token.value.toLowerCase() !== "json_each") {
      out.push(token);
      continue;
    }
    const openIndex = nextIndex(tokens, i);
    const close = matchingParen(tokens, openIndex);
    if (!isOp(tokens[openIndex], "(") || close === -1) {
      out.push(token);
      continue;
    }
    const inner = tokens.slice(openIndex + 1, close);
    let cursor = out.length - 1;
    while (cursor >= 0 && out[cursor].type === "ws") cursor--;
    if (isWord(out[cursor], "JOIN")) {
      let before = cursor - 1;
      while (before >= 0 && out[before].type === "ws") before--;
      if (!isWord(out[before], "CROSS", "LEFT", "INNER", "OUTER", "RIGHT", "FULL", "NATURAL")) {
        out.splice(cursor, 0, word("CROSS"), ws());
      }
      out.push(word("LATERAL"), ws());
    }
    out.push(...call("omniroute_json_each", trimWs(inner)));
    let afterIndex = close + 1;
    while (afterIndex < tokens.length && tokens[afterIndex].type === "ws") afterIndex++;
    const alias = tokens[afterIndex];
    const aliasAfterAs = isWord(alias, "AS") ? tokens[nextIndex(tokens, afterIndex)] : alias;
    const aliasName = aliasAfterAs ? identifierName(aliasAfterAs) : null;
    const aliasIsName = aliasName !== null && !isSqlKeyword(aliasName) && !isOp(aliasAfterAs, "(");
    if (aliasIsName) {
      out.push(ws(), word("AS"), ws(), { type: "qident", value: aliasName });
      i = isWord(alias, "AS") ? nextIndex(tokens, afterIndex) : afterIndex;
    } else {
      out.push(ws(), word("AS"), ws(), word("json_each"));
      i = close;
    }
  }
  return out;
}

const COMPARISON_OPS = new Set(["=", "<>", "!=", "<", ">", "<=", ">=", "~", "!~"]);
const BOOLEAN_WORDS = new Set([
  "IS",
  "LIKE",
  "ILIKE",
  "IN",
  "EXISTS",
  "BETWEEN",
  "AND",
  "OR",
  "NOT",
  "TRUE",
  "FALSE",
]);

function isBooleanExpression(tokens: Token[]): boolean {
  let depth = 0;
  for (const token of tokens) {
    if (isOp(token, "(")) depth++;
    else if (isOp(token, ")")) depth--;
    else if (depth === 0) {
      if (token.type === "op" && COMPARISON_OPS.has(token.value)) return true;
      if (token.type === "word" && BOOLEAN_WORDS.has(token.value.toUpperCase())) return true;
    }
  }
  const first = trimWs(tokens)[0];
  return (
    !!first &&
    first.type === "word" &&
    (first.value.toLowerCase() === "omniroute_json_valid" || first.value.toUpperCase() === "EXISTS")
  );
}

function isNumericLiteral(tokens: Token[]): boolean {
  const trimmed = trimWs(tokens);
  return trimmed.length === 1 && trimmed[0].type === "number";
}

function findCaseEnd(tokens: Token[], start: number): number {
  let depth = 0;
  for (let i = start; i < tokens.length; i++) {
    if (isWord(tokens[i], "CASE")) depth++;
    else if (isWord(tokens[i], "END")) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function splitCaseBranches(inner: Token[]): { parts: Array<{ keyword: string; tokens: Token[] }> } {
  const parts: Array<{ keyword: string; tokens: Token[] }> = [];
  let current: { keyword: string; tokens: Token[] } = { keyword: "CASE", tokens: [] };
  let depth = 0;
  let caseDepth = 0;
  for (const token of inner) {
    if (isOp(token, "(")) depth++;
    else if (isOp(token, ")")) depth--;
    else if (isWord(token, "CASE")) caseDepth++;
    else if (isWord(token, "END")) caseDepth--;
    else if (depth === 0 && caseDepth === 0 && isWord(token, "WHEN", "THEN", "ELSE")) {
      parts.push(current);
      current = { keyword: token.value.toUpperCase(), tokens: [] };
      continue;
    }
    current.tokens.push(token);
  }
  parts.push(current);
  return { parts };
}

function rewriteCaseBranches(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!isWord(token, "CASE")) {
      out.push(token);
      continue;
    }
    const end = findCaseEnd(tokens, i);
    if (end === -1) {
      out.push(token);
      continue;
    }
    const inner = rewriteCaseBranches(tokens.slice(i + 1, end));
    const { parts } = splitCaseBranches(inner);
    const results = parts.filter((part) => part.keyword === "THEN" || part.keyword === "ELSE");
    const anyBoolean = results.some((part) => isBooleanExpression(part.tokens));
    const anyNumeric = results.some((part) => isNumericLiteral(part.tokens));
    out.push(word("CASE"));
    for (const part of parts) {
      if (part.keyword !== "CASE") out.push(ws(), word(part.keyword), ws());
      let body = part.tokens;
      if (
        (part.keyword === "THEN" || part.keyword === "ELSE") &&
        anyBoolean &&
        anyNumeric &&
        !isBooleanExpression(body)
      ) {
        const trimmed = trimWs(body);
        if (isNumericLiteral(trimmed)) body = [word(trimmed[0].value === "0" ? "FALSE" : "TRUE")];
        else if (trimmed.length && !isWord(trimmed[0], "NULL"))
          body = [op("("), ...trimmed, ws(), op("<>"), ws(), word("0"), op(")")];
      }
      out.push(...body);
    }
    out.push(ws(), word("END"));
    i = end;
  }
  return out;
}

const TEXT_HELPERS = new Set([
  "omniroute_json_extract",
  "omniroute_strftime",
  "omniroute_json_type",
  "omniroute_hex",
  "omniroute_substr",
]);
const ARITHMETIC_OPS = new Set(["+", "-", "*", "/", "%"]);

function rewriteTextHelperArithmetic(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "word" || !TEXT_HELPERS.has(token.value.toLowerCase())) {
      out.push(token);
      continue;
    }
    const openIndex = nextIndex(tokens, i);
    const close = isOp(tokens[openIndex], "(") ? matchingParen(tokens, openIndex) : -1;
    if (close === -1) {
      out.push(token);
      continue;
    }
    const callTokens = tokens.slice(i, close + 1);
    const previous = out[prevIndex(out, out.length)];
    const following = tokens[nextIndex(tokens, close)];
    const afterFollowing = following
      ? tokens[nextIndex(tokens, nextIndex(tokens, close))]
      : undefined;
    const beforePrevious = previous ? out[prevIndex(out, prevIndex(out, out.length))] : undefined;
    const numericAfter =
      !!following &&
      following.type === "op" &&
      COMPARISON_OPS.has(following.value) &&
      !!afterFollowing &&
      afterFollowing.type === "number";
    const numericBefore =
      !!previous &&
      previous.type === "op" &&
      COMPARISON_OPS.has(previous.value) &&
      !!beforePrevious &&
      beforePrevious.type === "number";
    const arithmetic =
      (!!following && following.type === "op" && ARITHMETIC_OPS.has(following.value)) ||
      (!!previous &&
        previous.type === "op" &&
        ARITHMETIC_OPS.has(previous.value) &&
        !isOp(previous, "-")) ||
      (!!previous &&
        isOp(previous, "-") &&
        !!beforePrevious &&
        (beforePrevious.type === "number" ||
          beforePrevious.type === "word" ||
          isOp(beforePrevious, ")")));
    if (numericAfter || numericBefore || arithmetic)
      out.push(...call("omniroute_to_real", callTokens));
    else out.push(...callTokens);
    i = close;
  }
  return out;
}

function rewriteBooleanColumns(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    out.push(token);
    if (token.type !== "word" || !BOOLEAN_CONTEXT_WORDS.has(token.value.toUpperCase())) continue;
    const start = nextIndex(tokens, i);
    const chain: Token[] = [];
    let j = start;
    while (j < tokens.length) {
      const current = tokens[j];
      if (current.type === "word" && !isSqlKeyword(current.value)) chain.push(current);
      else if (current.type === "qident") chain.push(current);
      else break;
      const dotIndex = j + 1;
      if (isOp(tokens[dotIndex], ".")) {
        chain.push(op("."));
        j = dotIndex + 1;
        continue;
      }
      j++;
      break;
    }
    if (chain.length === 0 || isOp(chain[chain.length - 1], ".")) continue;
    const followerIndex =
      j < tokens.length && tokens[j].type === "ws" ? nextIndex(tokens, j - 1) : j;
    const follower = tokens[followerIndex];
    const terminates =
      follower === undefined ||
      isOp(follower, ")") ||
      isOp(follower, ";") ||
      (follower.type === "word" && BOOLEAN_FOLLOWERS.has(follower.value.toUpperCase()));
    if (!terminates) continue;
    if (isWord(chain[0], "NEW", "OLD") && chain.length === 1) continue;
    for (let k = i + 1; k < start; k++) out.push(tokens[k]);
    out.push(op("("), ...chain, ws(), op("<>"), ws(), word("0"), op(")"));
    i = j - 1;
  }
  return out;
}

function rewriteJsonValidComparisons(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "word" || token.value.toLowerCase() !== "omniroute_json_valid") {
      out.push(token);
      continue;
    }
    const openIndex = nextIndex(tokens, i);
    const close = matchingParen(tokens, openIndex);
    const callTokens = tokens.slice(i, close + 1);
    const eqIndex = nextIndex(tokens, close);
    const eq = tokens[eqIndex];
    const literal = tokens[nextIndex(tokens, eqIndex)];
    if (
      (isOp(eq, "=") || isOp(eq, "==") || isOp(eq, "<>") || isOp(eq, "!=")) &&
      literal &&
      literal.type === "number"
    ) {
      const truthy = (literal.value === "1") === (isOp(eq, "=") || isOp(eq, "=="));
      if (truthy) out.push(...callTokens);
      else out.push(word("NOT"), ws(), ...callTokens);
      i = nextIndex(tokens, eqIndex);
      continue;
    }
    out.push(...callTokens);
    i = close;
  }
  return out;
}

interface TableRefs {
  primary: string | null;
  aliases: Map<string, string>;
  all: string[];
}

function collectTableRefs(tokens: Token[]): TableRefs {
  const refs: TableRefs = { primary: null, aliases: new Map(), all: [] };
  const register = (nameToken: Token | undefined, index: number) => {
    if (!nameToken) return;
    const name = identifierName(nameToken);
    if (!name || isSqlKeyword(name)) return;
    refs.all.push(name);
    if (!refs.primary) refs.primary = name;
    let aliasIndex = nextIndex(tokens, index);
    if (isWord(tokens[aliasIndex], "AS")) aliasIndex = nextIndex(tokens, aliasIndex);
    const aliasToken = tokens[aliasIndex];
    const alias = aliasToken ? identifierName(aliasToken) : null;
    if (alias && !isSqlKeyword(alias) && !isOp(tokens[nextIndex(tokens, aliasIndex)], "(")) {
      refs.aliases.set(alias.toLowerCase(), name);
    }
    refs.aliases.set(name.toLowerCase(), name);
  };
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "word") continue;
    const value = token.value.toUpperCase();
    if (value === "FROM" || value === "JOIN" || value === "INTO" || value === "UPDATE") {
      const nameIndex = nextIndex(tokens, i);
      const nameToken = tokens[nameIndex];
      if (nameToken && !isOp(nameToken, "(") && !isWord(nameToken, "OR", "OF"))
        register(nameToken, nameIndex);
      if (value === "FROM") {
        let cursor = nameIndex;
        while (true) {
          const commaIndex = nextIndex(tokens, cursor);
          const afterName = tokens[commaIndex];
          if (isWord(afterName, "AS")) {
            cursor = nextIndex(tokens, commaIndex);
            continue;
          }
          if (
            afterName &&
            (afterName.type === "word" || afterName.type === "qident") &&
            !isSqlKeyword(afterName.value) &&
            cursor === nameIndex
          ) {
            cursor = commaIndex;
            continue;
          }
          if (!isOp(afterName, ",")) break;
          const nextName = nextIndex(tokens, commaIndex);
          if (isOp(tokens[nextName], "(")) break;
          register(tokens[nextName], nextName);
          cursor = nextName;
        }
      }
    }
  }
  return refs;
}

function rewriteRowid(tokens: Token[], ctx: TranslationContext, refs: TableRefs): Token[] {
  return tokens.map((token, index) => {
    if (token.type !== "word" || token.value.toLowerCase() !== "rowid") return token;
    const previous = tokens[prevIndex(tokens, index)];
    if (isWord(previous, "AS")) return token;
    let table = refs.primary;
    if (isOp(previous, ".")) {
      const qualifier = tokens[prevIndex(tokens, prevIndex(tokens, index))];
      const qualifierName = qualifier ? identifierName(qualifier) : null;
      if (qualifierName) table = refs.aliases.get(qualifierName.toLowerCase()) ?? qualifierName;
    }
    if (!table) return token;
    const schema = ctx.lookupTable(table);
    if (schema?.identityColumn && schema.identityColumn !== ROWID_COLUMN)
      return word(schema.identityColumn);
    return token;
  });
}

function rewriteQuotedStringLiterals(
  tokens: Token[],
  ctx: TranslationContext,
  refs: TableRefs
): Token[] {
  const known = new Set<string>();
  let resolved = false;
  for (const table of refs.all) {
    const schema = ctx.lookupTable(table);
    if (!schema) continue;
    resolved = true;
    for (const column of schema.columns) known.add(column.toLowerCase());
  }
  const comparisons = new Set(["=", "<>", "!=", "<", ">", "<=", ">=", "||"]);
  return tokens.map((token, index) => {
    if (token.type !== "qident") return token;
    if (known.has(token.value.toLowerCase())) return token;
    const previous = tokens[prevIndex(tokens, index)];
    const following = tokens[nextIndex(tokens, index)];
    if (isOp(previous, ".") || isOp(following, ".") || isOp(following, "(")) return token;
    const afterValueKeyword = isWord(previous, "THEN", "ELSE", "DEFAULT");
    const afterComparison = !!previous && previous.type === "op" && comparisons.has(previous.value);
    if (afterValueKeyword || afterComparison) return str(token.value);
    if (!resolved) return token;
    const beforeComparison =
      !!following && following.type === "op" && comparisons.has(following.value);
    const inList = isOp(previous, ",") || isOp(previous, "(");
    if (beforeComparison || inList) return str(token.value);
    return token;
  });
}

function applyExpressionRules(
  tokens: Token[],
  ctx: TranslationContext,
  params: ParamState
): Token[] {
  let out = tokens;
  out = rewriteQuotedStringLiterals(out, ctx, collectTableRefs(out));
  out = rewriteJsonEach(out);
  out = rewriteCalls(out, functionHandler);
  out = rewriteJsonValidComparisons(out);
  out = rewriteTextHelperArithmetic(out);
  out = rewriteCollate(out);
  out = rewriteOperators(out);
  out = rewriteCaseBranches(out);
  out = rewriteBooleanColumns(out);
  out = rewriteRowid(out, ctx, collectTableRefs(out));
  out = quoteMixedCaseIdentifiers(out);
  out = convertPlaceholders(out, params);
  return out;
}

function mapColumnType(typeWords: string[]): string {
  if (typeWords.length === 0) return "TEXT";
  const first = typeWords[0].toUpperCase();
  if (INT_TYPES.has(first)) return "BIGINT";
  if (REAL_TYPES.has(first)) return "DOUBLE PRECISION";
  if (BLOB_TYPES.has(first)) return "BYTEA";
  if (TEXT_TYPES.has(first)) return "TEXT";
  if (first.includes("INT")) return "BIGINT";
  if (first.includes("CHAR") || first.includes("TEXT") || first.includes("CLOB")) return "TEXT";
  if (first.includes("REAL") || first.includes("FLOA") || first.includes("DOUB"))
    return "DOUBLE PRECISION";
  return "TEXT";
}

interface ColumnDef {
  name: string;
  tokens: Token[];
  isIntegerPrimaryKey: boolean;
}

function translateColumnDef(
  def: Token[],
  withoutRowid: boolean,
  ctx: TranslationContext,
  params: ParamState,
  currentTable = "",
  localDefs: Token[][] | null = null
): ColumnDef {
  const nameToken = def[0];
  const name = identifierName(nameToken) ?? nameToken.value;
  let i = 1;
  const typeWords: string[] = [];
  while (i < def.length) {
    const token = def[i];
    if (token.type === "ws") {
      i++;
      continue;
    }
    if (token.type === "word" && !CONSTRAINT_WORDS.has(token.value.toUpperCase())) {
      typeWords.push(token.value);
      i++;
      continue;
    }
    if (isOp(token, "(") && typeWords.length > 0) {
      const close = matchingParen(def, i);
      i = close === -1 ? def.length : close + 1;
      continue;
    }
    break;
  }
  const rest = def.slice(i);
  const restUpper = rest.filter((t) => t.type === "word").map((t) => t.value.toUpperCase());
  const hasPrimaryKey = restUpper.includes("PRIMARY");
  const mapped = mapColumnType(typeWords);
  const isIntegerPrimaryKey = mapped === "BIGINT" && hasPrimaryKey && !withoutRowid;
  const constraints = translateConstraintTail(rest, ctx, params, currentTable, mapped, localDefs);
  const typeTokens: Token[] = isIntegerPrimaryKey
    ? [
        word("BIGINT"),
        ws(),
        word("GENERATED"),
        ws(),
        word("BY"),
        ws(),
        word("DEFAULT"),
        ws(),
        word("AS"),
        ws(),
        word("IDENTITY"),
      ]
    : mapped.split(" ").flatMap((part, index) => (index === 0 ? [word(part)] : [ws(), word(part)]));
  const tokens: Token[] = [{ type: "qident", value: name }, ws(), ...typeTokens];
  if (constraints.length) tokens.push(ws(), ...constraints);
  return { name, tokens, isIntegerPrimaryKey };
}

function translateConstraintTail(
  rest: Token[],
  ctx: TranslationContext,
  params: ParamState,
  currentTable = "",
  columnType = "",
  localDefs: Token[][] | null = null
): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < rest.length) {
    const token = rest[i];
    const value = upper(token);
    if (value === "AUTOINCREMENT") {
      i++;
      continue;
    }
    if (value === "COLLATE") {
      i = nextIndex(rest, i) + 1;
      continue;
    }
    if (value === "REFERENCES") {
      const end = skipReferences(rest, i);
      const clause = referenceClause(rest.slice(i, end), ctx, currentTable, columnType, localDefs);
      if (clause) out.push(ws(), ...clause);
      i = end;
      continue;
    }
    if (value === "ON" && upper(rest[nextIndex(rest, i)]) === "CONFLICT") {
      i = nextIndex(rest, nextIndex(rest, i)) + 1;
      continue;
    }
    if ((value === "ASC" || value === "DESC") && isWord(out[prevIndex(out, out.length)], "KEY")) {
      i++;
      continue;
    }
    if (value === "DEFAULT") {
      const valueIndex = nextIndex(rest, i);
      const valueToken = rest[valueIndex];
      const valueUpper = upper(valueToken);
      if (
        valueUpper === "CURRENT_TIMESTAMP" ||
        valueUpper === "CURRENT_DATE" ||
        valueUpper === "CURRENT_TIME"
      ) {
        const fn =
          valueUpper === "CURRENT_DATE"
            ? "omniroute_date"
            : valueUpper === "CURRENT_TIME"
              ? "omniroute_time"
              : "omniroute_datetime";
        out.push(word("DEFAULT"), ws(), ...paren(call(fn, [str("now")])));
        i = valueIndex + 1;
        continue;
      }
      if (isOp(valueToken, "(")) {
        const close = matchingParen(rest, valueIndex);
        const inner = applyExpressionRules(rest.slice(valueIndex + 1, close), ctx, params);
        out.push(word("DEFAULT"), ws(), ...paren(inner));
        i = close + 1;
        continue;
      }
      if (
        valueToken &&
        valueToken.type === "op" &&
        (valueToken.value === "-" || valueToken.value === "+")
      ) {
        out.push(word("DEFAULT"), ws(), valueToken, rest[valueIndex + 1]);
        i = valueIndex + 2;
        continue;
      }
      out.push(
        word("DEFAULT"),
        ws(),
        valueToken.type === "qident" ? str(valueToken.value) : valueToken
      );
      i = valueIndex + 1;
      continue;
    }
    if (value === "CHECK") {
      const openIndex = nextIndex(rest, i);
      const close = matchingParen(rest, openIndex);
      const inner = applyExpressionRules(rest.slice(openIndex + 1, close), ctx, params);
      out.push(word("CHECK"), ws(), ...paren(inner));
      i = close + 1;
      continue;
    }
    if (value === "GENERATED") {
      const asIndex = rest.findIndex((t, idx) => idx > i && isWord(t, "AS"));
      const openIndex = nextIndex(rest, asIndex);
      const close = matchingParen(rest, openIndex);
      const inner = applyExpressionRules(rest.slice(openIndex + 1, close), ctx, params);
      out.push(
        word("GENERATED"),
        ws(),
        word("ALWAYS"),
        ws(),
        word("AS"),
        ws(),
        ...paren(inner),
        ws(),
        word("STORED")
      );
      i = close + 1;
      if (isWord(rest[nextIndex(rest, close)], "STORED", "VIRTUAL")) i = nextIndex(rest, close) + 1;
      continue;
    }
    out.push(token);
    i++;
  }
  return trimWs(out);
}

function skipReferences(tokens: Token[], start: number): number {
  let i = nextIndex(tokens, start);
  i = nextIndex(tokens, i);
  if (isOp(tokens[i], "(")) i = matchingParen(tokens, i) + 1;
  while (i < tokens.length) {
    const value = upper(tokens[nextIndex(tokens, i - 1)]);
    const at = nextIndex(tokens, i - 1);
    if (value === "ON") {
      i = nextIndex(tokens, nextIndex(tokens, at));
      const action = upper(tokens[i]);
      if (action === "SET" || action === "NO") i = nextIndex(tokens, i);
      i++;
      continue;
    }
    if (value === "MATCH") {
      i = nextIndex(tokens, at) + 1;
      continue;
    }
    if (value === "NOT" && upper(tokens[nextIndex(tokens, at)]) === "DEFERRABLE") {
      i = nextIndex(tokens, at) + 1;
      continue;
    }
    if (value === "DEFERRABLE") {
      i = at + 1;
      continue;
    }
    if (value === "INITIALLY") {
      i = nextIndex(tokens, at) + 1;
      continue;
    }
    break;
  }
  return i;
}

function referencedColumnType(
  ctx: TranslationContext,
  table: string,
  column: string | null,
  currentTable: string,
  localDefs: Token[][] | null
): string | null {
  if (table.toLowerCase() === currentTable.toLowerCase()) {
    if (!localDefs || !column) return null;
    for (const def of localDefs) {
      const name = identifierName(def[0]);
      if (name && name.toLowerCase() === column.toLowerCase()) {
        const typeWords: string[] = [];
        for (let k = 1; k < def.length; k++) {
          const t = def[k];
          if (t.type === "ws") continue;
          if (t.type === "word" && !CONSTRAINT_WORDS.has(t.value.toUpperCase()))
            typeWords.push(t.value);
          else break;
        }
        return mapColumnType(typeWords);
      }
    }
    return null;
  }
  const schema = ctx.lookupTable(table);
  if (!schema) return null;
  const target = column ?? schema.primaryKey[0];
  if (!target) return null;
  return schema.columnTypes[target.toLowerCase()] ?? null;
}

function parseReferences(
  tokens: Token[]
): { table: string; columns: string[]; actions: Token[] } | null {
  let i = nextIndex(tokens, -1);
  if (!isWord(tokens[i], "REFERENCES")) return null;
  i = nextIndex(tokens, i);
  const table = identifierName(tokens[i]);
  if (!table) return null;
  i = nextIndex(tokens, i);
  const columns: string[] = [];
  if (isOp(tokens[i], "(")) {
    const close = matchingParen(tokens, i);
    for (const part of splitTopLevel(tokens.slice(i + 1, close), ",")) {
      const name = identifierName(trimWs(part)[0]);
      if (name) columns.push(name);
    }
    i = close + 1;
  }
  const actions: Token[] = [];
  let cursor = i;
  while (cursor < tokens.length) {
    const t = tokens[cursor];
    const value = upper(t);
    if (value === "ON") {
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
      cursor = actionIndex + 1;
      continue;
    }
    if (value === "DEFERRABLE") {
      actions.push(ws(), word("DEFERRABLE"));
      cursor = nextIndex(tokens, cursor);
      continue;
    }
    if (value === "NOT" || value === "INITIALLY") {
      const following = upper(tokens[nextIndex(tokens, cursor)]);
      actions.push(ws(), word(value), ws(), word(following));
      cursor = nextIndex(tokens, nextIndex(tokens, cursor));
      continue;
    }
    if (value === "MATCH") {
      cursor = nextIndex(tokens, nextIndex(tokens, cursor));
      continue;
    }
    cursor++;
  }
  return { table, columns, actions };
}

function referenceClause(
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
  if (parsed.columns.length) {
    out.push(op("("));
    parsed.columns.forEach((c, idx) => {
      if (idx > 0) out.push(op(","), ws());
      out.push({ type: "qident", value: c });
    });
    out.push(op(")"));
  }
  out.push(...parsed.actions);
  return out;
}

function foreignKeyConstraint(
  def: Token[],
  ctx: TranslationContext,
  tableName: string,
  defs: Token[][]
): Token[] | null {
  const openIndex = def.findIndex((t) => isOp(t, "("));
  if (openIndex === -1) return null;
  const close = matchingParen(def, openIndex);
  const localColumns = splitTopLevel(def.slice(openIndex + 1, close), ",").map(
    (part) => identifierName(trimWs(part)[0]) ?? ""
  );
  const referencesIndex = def.findIndex((t, idx) => idx > close && isWord(t, "REFERENCES"));
  if (referencesIndex === -1) return null;
  const localType =
    referencedColumnType(ctx, tableName, localColumns[0] ?? null, tableName, defs) ?? "";
  const clause = referenceClause(def.slice(referencesIndex), ctx, tableName, localType, defs);
  if (!clause) return null;
  const out: Token[] = [word("FOREIGN"), ws(), word("KEY"), ws(), op("(")];
  localColumns.forEach((c, idx) => {
    if (idx > 0) out.push(op(","), ws());
    out.push({ type: "qident", value: c });
  });
  out.push(op(")"), ws(), ...clause);
  return out;
}

function translateCreateTable(
  tokens: Token[],
  ctx: TranslationContext,
  params: ParamState
): TranslatedStatement {
  const openIndex = tokens.findIndex((t) => isOp(t, "("));
  const asIndex = tokens.findIndex((t) => isWord(t, "AS"));
  const tableIndex = findTableNameIndex(tokens);
  const tableName = identifierName(tokens[tableIndex]) ?? "";
  if (asIndex !== -1 && (openIndex === -1 || asIndex < openIndex)) {
    const head = tokens.slice(0, asIndex + 1);
    const body = applyExpressionRules(tokens.slice(asIndex + 1), ctx, params);
    return finish("ddl", [render([...quoteTableName(head, tableIndex), ...body])], params, [
      tableName,
    ]);
  }
  const close = matchingParen(tokens, openIndex);
  const tail = tokens.slice(close + 1);
  const withoutRowid = tail.some((t) => isWord(t, "WITHOUT"));
  const defs = splitTopLevel(tokens.slice(openIndex + 1, close), ",")
    .map(trimWs)
    .filter((d) => d.length);
  const outDefs: Token[][] = [];
  let hasIntegerPk = false;
  for (const def of defs) {
    const first = upper(def[0]);
    if (first === "PRIMARY" || first === "UNIQUE" || first === "CHECK" || first === "CONSTRAINT") {
      const constraint = translateTableConstraint(def, ctx, params);
      if (constraint) outDefs.push(constraint);
      continue;
    }
    if (first === "FOREIGN") {
      const fk = foreignKeyConstraint(def, ctx, tableName, defs);
      if (fk) outDefs.push(fk);
      continue;
    }
    const column = translateColumnDef(def, withoutRowid, ctx, params, tableName, defs);
    if (column.isIntegerPrimaryKey) hasIntegerPk = true;
    outDefs.push(column.tokens);
  }
  if (ROWID_TABLES.has(tableName.toLowerCase()) && !hasIntegerPk) {
    outDefs.push([
      { type: "qident", value: ROWID_COLUMN },
      ws(),
      word("BIGINT"),
      ws(),
      word("GENERATED"),
      ws(),
      word("BY"),
      ws(),
      word("DEFAULT"),
      ws(),
      word("AS"),
      ws(),
      word("IDENTITY"),
    ]);
  }
  const head = quoteTableName(tokens.slice(0, openIndex), tableIndex);
  const body: Token[] = [];
  outDefs.forEach((def, index) => {
    if (index > 0) body.push(op(","), ws());
    body.push(...def);
  });
  return finish("ddl", [render([...head, op("("), ...body, op(")")])], params, [tableName]);
}

function translateTableConstraint(
  def: Token[],
  ctx: TranslationContext,
  params: ParamState
): Token[] | null {
  const out: Token[] = [];
  let i = 0;
  while (i < def.length) {
    const token = def[i];
    const value = upper(token);
    if (value === "FOREIGN") return null;
    if (value === "CHECK") {
      const openIndex = nextIndex(def, i);
      const close = matchingParen(def, openIndex);
      out.push(
        word("CHECK"),
        ws(),
        ...paren(applyExpressionRules(def.slice(openIndex + 1, close), ctx, params))
      );
      i = close + 1;
      continue;
    }
    if (value === "ON" && upper(def[nextIndex(def, i)]) === "CONFLICT") {
      i = nextIndex(def, nextIndex(def, i)) + 1;
      continue;
    }
    if (isOp(token, "(")) {
      const close = matchingParen(def, i);
      const inner = def.slice(i + 1, close).map((t) => {
        if (isWord(t, "ASC", "DESC", "COLLATE", "NOCASE", "BINARY")) return ws();
        return t;
      });
      out.push(op("("), ...inner, op(")"));
      i = close + 1;
      continue;
    }
    out.push(token);
    i++;
  }
  return trimWs(out);
}

function findTableNameIndex(tokens: Token[]): number {
  let i = 0;
  let sawTable = false;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token.type === "ws") {
      i++;
      continue;
    }
    if (sawTable) {
      if (isWord(token, "IF")) {
        const afterIf = nextIndex(tokens, i);
        i = (isWord(tokens[afterIf], "NOT") ? nextIndex(tokens, afterIf) : afterIf) + 1;
        continue;
      }
      return i;
    }
    if (isWord(token, "TABLE", "INDEX", "TRIGGER", "VIEW")) sawTable = true;
    i++;
  }
  return -1;
}

function quoteTableName(tokens: Token[], index: number): Token[] {
  return tokens.map((token, i) =>
    i === index && token.type === "word" ? { type: "qident", value: token.value } : token
  );
}

function translateCreateIndex(
  tokens: Token[],
  ctx: TranslationContext,
  params: ParamState
): TranslatedStatement {
  const onIndex = tokens.findIndex((t) => isWord(t, "ON"));
  const indexNameIndex = findTableNameIndex(tokens);
  const head = tokens
    .slice(0, onIndex + 1)
    .map((t, i) =>
      i === indexNameIndex && (t.type === "word" || t.type === "qident")
        ? ({ type: "qident", value: fitIdentifier(t.value) } as Token)
        : t
    );
  const tail = applyExpressionRules(tokens.slice(onIndex + 1), ctx, params).filter(
    (t, i, arr) =>
      !(
        isWord(t, "COLLATE") ||
        (isWord(t, "NOCASE", "BINARY") && isWord(arr[prevIndex(arr, i)], "COLLATE"))
      )
  );
  const tableIndex = nextIndex(tail, -1);
  const tableName = identifierName(tail[tableIndex]) ?? "";
  return finish("ddl", [render([...head, ...quoteTableName(tail, tableIndex)])], params, [
    tableName,
  ]);
}

function translateAlterTable(
  tokens: Token[],
  ctx: TranslationContext,
  params: ParamState
): TranslatedStatement {
  const tableIndex = nextIndex(tokens, nextIndex(tokens, 0));
  const tableName = identifierName(tokens[tableIndex]) ?? "";
  const actionIndex = nextIndex(tokens, tableIndex);
  const action = upper(tokens[actionIndex]);
  const tablePrefix: Token[] = [
    word("ALTER"),
    ws(),
    word("TABLE"),
    ws(),
    { type: "qident", value: tableName },
    ws(),
  ];
  if (action === "ADD") {
    let cursor = nextIndex(tokens, actionIndex);
    if (isWord(tokens[cursor], "COLUMN")) cursor = nextIndex(tokens, cursor);
    const def = translateColumnDef(trimWs(tokens.slice(cursor)), false, ctx, params, tableName);
    return finish(
      "ddl",
      [
        render([
          ...tablePrefix,
          word("ADD"),
          ws(),
          word("COLUMN"),
          ws(),
          word("IF"),
          ws(),
          word("NOT"),
          ws(),
          word("EXISTS"),
          ws(),
          ...def.tokens,
        ]),
      ],
      params,
      [tableName]
    );
  }
  if (action === "DROP") {
    let cursor = nextIndex(tokens, actionIndex);
    if (isWord(tokens[cursor], "COLUMN")) cursor = nextIndex(tokens, cursor);
    const column = identifierName(tokens[cursor]) ?? "";
    return finish(
      "ddl",
      [
        render([
          ...tablePrefix,
          word("DROP"),
          ws(),
          word("COLUMN"),
          ws(),
          word("IF"),
          ws(),
          word("EXISTS"),
          ws(),
          { type: "qident", value: column },
        ]),
      ],
      params,
      [tableName]
    );
  }
  if (action === "RENAME") {
    const afterRename = nextIndex(tokens, actionIndex);
    if (isWord(tokens[afterRename], "TO")) {
      const target = identifierName(tokens[nextIndex(tokens, afterRename)]) ?? "";
      const statements = [
        render([
          ...tablePrefix,
          word("RENAME"),
          ws(),
          word("TO"),
          ws(),
          { type: "qident", value: target },
        ]),
      ];
      const schema = ctx.lookupTable(tableName);
      if (
        ROWID_TABLES.has(target.toLowerCase()) &&
        schema &&
        !schema.columns.includes(ROWID_COLUMN) &&
        !schema.identityColumn
      ) {
        statements.push(
          `ALTER TABLE "${target}" ADD COLUMN IF NOT EXISTS "${ROWID_COLUMN}" BIGINT GENERATED BY DEFAULT AS IDENTITY`
        );
      }
      return finish("ddl", statements, params, [tableName, target]);
    }
    let cursor = afterRename;
    if (isWord(tokens[cursor], "COLUMN")) cursor = nextIndex(tokens, cursor);
    const from = identifierName(tokens[cursor]) ?? "";
    const to = identifierName(tokens[nextIndex(tokens, nextIndex(tokens, cursor))]) ?? "";
    return finish(
      "ddl",
      [
        render([
          ...tablePrefix,
          word("RENAME"),
          ws(),
          word("COLUMN"),
          ws(),
          { type: "qident", value: from },
          ws(),
          word("TO"),
          ws(),
          { type: "qident", value: to },
        ]),
      ],
      params,
      [tableName]
    );
  }
  return finish("ddl", [render(applyExpressionRules(tokens, ctx, params))], params, [tableName]);
}

function translateInsert(
  tokens: Token[],
  ctx: TranslationContext,
  params: ParamState
): TranslatedStatement {
  let i = 0;
  let mode: "plain" | "replace" | "ignore" = "plain";
  const first = upper(tokens[nextIndex(tokens, -1)]);
  let cursor = nextIndex(tokens, -1);
  if (first === "REPLACE") {
    mode = "replace";
    cursor = nextIndex(tokens, cursor);
  } else {
    cursor = nextIndex(tokens, cursor);
    if (isWord(tokens[cursor], "OR")) {
      const conflictAction = upper(tokens[nextIndex(tokens, cursor)]);
      if (conflictAction === "REPLACE") mode = "replace";
      else if (conflictAction === "IGNORE") mode = "ignore";
      cursor = nextIndex(tokens, nextIndex(tokens, cursor));
    }
  }
  if (!isWord(tokens[cursor], "INTO"))
    throw new SqliteEmulationError(`near "${tokens[cursor]?.value}": syntax error`);
  const tableIndex = nextIndex(tokens, cursor);
  const tableName = identifierName(tokens[tableIndex]) ?? "";
  i = nextIndex(tokens, tableIndex);
  let columns: string[] | null = null;
  let columnsClose = -1;
  if (isOp(tokens[i], "(")) {
    columnsClose = matchingParen(tokens, i);
    columns = splitTopLevel(tokens.slice(i + 1, columnsClose), ",")
      .map(trimWs)
      .map((c) => identifierName(c[0]) ?? c[0].value);
    i = columnsClose + 1;
  }
  const bodyStart = i;
  const returningIndex = findTopLevelWord(tokens, "RETURNING", bodyStart);
  const onConflictIndex = findTopLevelWord(tokens, "ON", bodyStart, "CONFLICT");
  const bodyEnd =
    onConflictIndex !== -1
      ? onConflictIndex
      : returningIndex !== -1
        ? returningIndex
        : tokens.length;
  const body = applyExpressionRules(tokens.slice(bodyStart, bodyEnd), ctx, params);
  const existingConflict =
    onConflictIndex !== -1
      ? applyExpressionRules(
          tokens.slice(onConflictIndex, returningIndex !== -1 ? returningIndex : tokens.length),
          ctx,
          params
        )
      : [];
  const returning =
    returningIndex !== -1 ? applyExpressionRules(tokens.slice(returningIndex), ctx, params) : [];
  const schema = ctx.lookupTable(tableName);
  const head: Token[] = [
    word("INSERT"),
    ws(),
    word("INTO"),
    ws(),
    { type: "qident", value: tableName },
    ws(),
  ];
  if (columns) {
    head.push(op("("));
    columns.forEach((column, index) => {
      if (index > 0) head.push(op(","), ws());
      head.push({ type: "qident", value: column });
    });
    head.push(op(")"), ws());
  }
  const out: Token[] = [...head, ...body];
  if (mode === "ignore") {
    out.push(ws(), word("ON"), ws(), word("CONFLICT"), ws(), word("DO"), ws(), word("NOTHING"));
  } else if (mode === "replace") {
    out.push(ws(), ...buildReplaceConflictClause(tableName, columns, schema));
  } else if (existingConflict.length) {
    out.push(ws(), ...existingConflict);
  }
  let returningColumn: string | undefined;
  if (returning.length) {
    out.push(ws(), ...returning);
  } else if (schema?.identityColumn) {
    returningColumn = "__omniroute_rowid";
    out.push(
      ws(),
      word("RETURNING"),
      ws(),
      { type: "qident", value: schema.identityColumn },
      ws(),
      word("AS"),
      ws(),
      { type: "qident", value: returningColumn }
    );
  }
  const result = finish("insert", [render(out)], params, [tableName]);
  if (returningColumn) result.returningColumn = returningColumn;
  return result;
}

function buildReplaceConflictClause(
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
  const arbiterLower = arbiter.map((c) => c.toLowerCase());
  const assignments: Token[][] = [];
  for (const column of schema.columns) {
    const lower = column.toLowerCase();
    if (arbiterLower.includes(lower) || lower === ROWID_COLUMN) continue;
    if (inserted.includes(lower)) {
      assignments.push([
        { type: "qident", value: column },
        ws(),
        op("="),
        ws(),
        word("EXCLUDED"),
        op("."),
        { type: "qident", value: column },
      ]);
    } else if (schema.identityColumn !== column) {
      assignments.push([{ type: "qident", value: column }, ws(), op("="), ws(), word("DEFAULT")]);
    }
  }
  const out: Token[] = [word("ON"), ws(), word("CONFLICT"), ws(), op("(")];
  arbiter.forEach((column, index) => {
    if (index > 0) out.push(op(","), ws());
    out.push({ type: "qident", value: column });
  });
  out.push(op(")"), ws(), word("DO"), ws());
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

function translateUpdateOrDelete(
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
  out.push({ type: "qident", value: tableName }, ws());
  const rest = trimWs(applyExpressionRules(tokens.slice(cursor + 1), ctx, params));
  out.push(...rest);
  return finish(kind, [render(out)], params, [tableName]);
}

function translateTransaction(tokens: Token[], params: ParamState): TranslatedStatement {
  const first = upper(tokens[nextIndex(tokens, -1)]);
  const words = tokens.filter((t) => t.type === "word").map((t) => t.value.toUpperCase());
  const identifiers = tokens.filter((t) => t.type === "word" || t.type === "qident");
  if (first === "BEGIN") return finish("transaction", ["BEGIN"], params, []);
  if (first === "COMMIT" || first === "END") return finish("transaction", ["COMMIT"], params, []);
  if (first === "ROLLBACK") {
    if (words.includes("TO")) {
      const name = identifiers[identifiers.length - 1];
      return finish("transaction", [`ROLLBACK TO SAVEPOINT "${name.value}"`], params, []);
    }
    return finish("transaction", ["ROLLBACK"], params, []);
  }
  if (first === "SAVEPOINT")
    return finish(
      "transaction",
      [`SAVEPOINT "${identifiers[identifiers.length - 1].value}"`],
      params,
      []
    );
  if (first === "RELEASE")
    return finish(
      "transaction",
      [`RELEASE SAVEPOINT "${identifiers[identifiers.length - 1].value}"`],
      params,
      []
    );
  return finish("transaction", [render(tokens)], params, []);
}

function finish(
  kind: StatementKind,
  statements: string[],
  params: ParamState,
  tables: string[]
): TranslatedStatement {
  return {
    kind,
    statements,
    paramNames: params.names.length ? params.names : null,
    paramCount: params.names.length ? params.names.length : params.positional,
    tables,
  };
}

export function translateStatement(sql: string, ctx: TranslationContext): TranslatedStatement {
  const params: ParamState = { names: [], positional: 0 };
  const tokens = trimWs(tokenize(sql));
  if (tokens.length === 0) return finish("noop", [], params, []);
  if (isOp(tokens[tokens.length - 1], ";")) tokens.pop();
  const first = upper(tokens[0]);
  const second = upper(tokens[nextIndex(tokens, 0)]);
  switch (first) {
    case "PRAGMA": {
      const result = finish("pragma", [], params, []);
      result.pragma = render(trimWs(tokens.slice(1)));
      return result;
    }
    case "VACUUM":
    case "REINDEX":
    case "ATTACH":
    case "DETACH":
      return finish("noop", [], params, []);
    case "ANALYZE":
      return finish("other", ["ANALYZE"], params, []);
    case "BEGIN":
    case "COMMIT":
    case "END":
    case "ROLLBACK":
    case "SAVEPOINT":
    case "RELEASE":
      return translateTransaction(tokens, params);
    case "CREATE": {
      let cursor = nextIndex(tokens, 0);
      if (isWord(tokens[cursor], "TEMP", "TEMPORARY", "UNIQUE")) cursor = nextIndex(tokens, cursor);
      const kind = upper(tokens[cursor]);
      if (kind === "VIRTUAL") {
        const usingIndex = tokens.findIndex((t) => isWord(t, "USING"));
        const moduleName = tokens[nextIndex(tokens, usingIndex)]?.value ?? "unknown";
        throw new SqliteEmulationError(`no such module: ${moduleName}`);
      }
      if (kind === "TRIGGER") {
        const result = translateTrigger(
          tokens,
          (bodySql) => translateStatement(bodySql, ctx),
          (expr) => render(applyExpressionRules(tokenize(expr), ctx, { names: [], positional: 0 }))
        );
        return finish("ddl", result.statements, params, [result.table]);
      }
      if (kind === "TABLE") return translateCreateTable(tokens, ctx, params);
      if (kind === "INDEX") return translateCreateIndex(tokens, ctx, params);
      if (kind === "VIEW") {
        const tableIndex = findTableNameIndex(tokens);
        const asIndex = tokens.findIndex((t, i) => i > tableIndex && isWord(t, "AS"));
        const body = applyExpressionRules(tokens.slice(asIndex + 1), ctx, params);
        const head = quoteTableName(tokens.slice(0, asIndex + 1), tableIndex).map((t) =>
          isWord(t, "TEMP", "TEMPORARY") ? ws() : t
        );
        return finish("ddl", [render([...head, ws(), ...body])], params, [
          identifierName(tokens[tableIndex]) ?? "",
        ]);
      }
      return finish("ddl", [render(applyExpressionRules(tokens, ctx, params))], params, []);
    }
    case "DROP": {
      const kind = upper(tokens[nextIndex(tokens, 0)]);
      const nameIndex = findTableNameIndex(tokens);
      const name = identifierName(tokens[nameIndex]) ?? "";
      const ifExists = tokens.some((t) => isWord(t, "IF"));
      if (kind === "TRIGGER")
        return finish(
          "ddl",
          [`DROP FUNCTION IF EXISTS "${triggerFunctionName(name)}"() CASCADE`],
          params,
          []
        );
      if (kind === "TABLE")
        return finish(
          "ddl",
          [`DROP TABLE ${ifExists ? "IF EXISTS " : ""}"${name}" CASCADE`],
          params,
          [name]
        );
      if (kind === "INDEX")
        return finish(
          "ddl",
          [`DROP INDEX ${ifExists ? "IF EXISTS " : ""}"${fitIdentifier(name)}"`],
          params,
          []
        );
      if (kind === "VIEW")
        return finish(
          "ddl",
          [`DROP VIEW ${ifExists ? "IF EXISTS " : ""}"${name}" CASCADE`],
          params,
          [name]
        );
      return finish("ddl", [render(tokens)], params, []);
    }
    case "ALTER":
      return translateAlterTable(tokens, ctx, params);
    case "INSERT":
    case "REPLACE":
      return translateInsert(tokens, ctx, params);
    case "UPDATE":
      return translateUpdateOrDelete(tokens, "update", ctx, params);
    case "DELETE":
      return translateUpdateOrDelete(tokens, "delete", ctx, params);
    case "WITH": {
      const refs = collectTableRefs(tokens);
      const body = applyExpressionRules(tokens, ctx, params);
      const kind = tokens.some((t) => isWord(t, "INSERT"))
        ? "insert"
        : tokens.some((t) => isWord(t, "UPDATE"))
          ? "update"
          : tokens.some((t) => isWord(t, "DELETE"))
            ? "delete"
            : "select";
      return finish(kind, [render(body)], params, refs.all);
    }
    case "EXPLAIN": {
      let cursor = nextIndex(tokens, 0);
      if (isWord(tokens[cursor], "QUERY")) cursor = nextIndex(tokens, nextIndex(tokens, cursor));
      const inner = translateStatement(render(tokens.slice(cursor)), ctx);
      return finish(
        "select",
        inner.statements.map((statement) => `EXPLAIN ${statement}`),
        { names: inner.paramNames ?? [], positional: inner.paramCount },
        inner.tables
      );
    }
    case "SELECT":
    case "VALUES": {
      const refs = collectTableRefs(tokens);
      return finish(
        "select",
        [render(applyExpressionRules(tokens, ctx, params))],
        params,
        refs.all
      );
    }
    default:
      if (second === "") return finish("other", [render(tokens)], params, []);
      return finish("other", [render(applyExpressionRules(tokens, ctx, params))], params, []);
  }
}
