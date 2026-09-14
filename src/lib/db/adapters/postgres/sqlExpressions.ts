import {
  identifierName,
  isOp,
  isWord,
  matchingParen,
  nextIndex,
  op,
  prevIndex,
  splitTopLevel,
  str,
  stringValue,
  trimWs,
  word,
  ws,
  type Token,
} from "./sqlTokenizer";
import { ROWID_COLUMN, type TranslationContext, type ParamState } from "./translationCore";
import { call, upper } from "./sqlBuilders";
import { functionHandler } from "./sqlFunctionHandlers";

export { upper, call, paren } from "./sqlBuilders";

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

function isSqlKeyword(value: string): boolean {
  return KEYWORDS.has(value.toUpperCase());
}

function argsOf(inner: Token[]): Token[][] {
  const trimmed = trimWs(inner);
  if (trimmed.length === 0) return [];
  return splitTopLevel(trimmed, ",").map(trimWs);
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

function callCloseIndex(tokens: Token[], nameIndex: number): number {
  const openIndex = nextIndex(tokens, nameIndex);
  return isOp(tokens[openIndex], "(") ? matchingParen(tokens, openIndex) : -1;
}

interface Rewritten {
  tokens: Token[];
  next: number;
}

type CallHandler = (name: string, args: Token[][], inner: Token[]) => Token[] | null;

function rewriteCallAt(tokens: Token[], i: number, handler: CallHandler): Rewritten | null {
  const token = tokens[i];
  if (token.type !== "word" || NOT_FUNCTION_WORDS.has(token.value.toUpperCase())) return null;
  const close = callCloseIndex(tokens, i);
  if (close === -1) return null;
  const inner = rewriteCalls(tokens.slice(nextIndex(tokens, i) + 1, close), handler);
  const replacement = handler(token.value, argsOf(inner), inner);
  return { tokens: replacement ?? [token, op("("), ...inner, op(")")], next: close + 1 };
}

function rewriteGroupAt(tokens: Token[], i: number, handler: CallHandler): Rewritten | null {
  if (!isOp(tokens[i], "(")) return null;
  const close = matchingParen(tokens, i);
  if (close === -1) return null;
  const inner = rewriteCalls(tokens.slice(i + 1, close), handler);
  return { tokens: [op("("), ...inner, op(")")], next: close + 1 };
}

function rewriteCalls(tokens: Token[], handler: CallHandler): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < tokens.length) {
    const rewritten = rewriteCallAt(tokens, i, handler) ?? rewriteGroupAt(tokens, i, handler);
    if (rewritten) {
      out.push(...rewritten.tokens);
      i = rewritten.next;
      continue;
    }
    out.push(tokens[i]);
    i++;
  }
  return out;
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

type OperatorRewrite = (tokens: Token[], i: number, out: Token[]) => number | null;

const IS_LITERAL_WORDS = new Set(["NULL", "DISTINCT", "TRUE", "FALSE", "UNKNOWN"]);

function rewriteIs(tokens: Token[], i: number, out: Token[]): number | null {
  const nextI = nextIndex(tokens, i);
  const nextUpper = upper(tokens[nextI]);
  if (nextUpper === "NOT") {
    if (IS_LITERAL_WORDS.has(upper(tokens[nextIndex(tokens, nextI)]))) return null;
    out.push(word("IS"), ws(), word("DISTINCT"), ws(), word("FROM"));
    return nextI;
  }
  if (IS_LITERAL_WORDS.has(nextUpper)) return null;
  out.push(word("IS"), ws(), word("NOT"), ws(), word("DISTINCT"), ws(), word("FROM"));
  return i;
}

function replaceWithWord(value: string): OperatorRewrite {
  return (_tokens, i, out) => {
    out.push(word(value));
    return i;
  };
}

function replaceWithNowCall(fn: string): OperatorRewrite {
  return (_tokens, i, out) => {
    out.push(...call(fn, [str("now")]));
    return i;
  };
}

function rewritePatternMatch(tokens: Token[], i: number, out: Token[]): number {
  const previousI = prevIndex(out, out.length);
  const negated = isWord(out[previousI], "NOT");
  if (negated) out.splice(previousI, 1);
  out.push(op(negated ? "!~" : "~"));
  const nextI = nextIndex(tokens, i);
  const next = tokens[nextI];
  if (isWord(tokens[i], "GLOB") && next && next.type === "string") {
    out.push(ws(), str(globToRegex(stringValue(next))));
    return nextI;
  }
  return i;
}

function skipIndexedBy(tokens: Token[], i: number): number | null {
  const nextI = nextIndex(tokens, i);
  if (upper(tokens[nextI]) !== "BY") return null;
  return nextIndex(tokens, nextI);
}

function skipNotIndexed(tokens: Token[], i: number): number | null {
  const nextI = nextIndex(tokens, i);
  return upper(tokens[nextI]) === "INDEXED" ? nextI : null;
}

const WORD_OPERATOR_REWRITES: ReadonlyMap<string, OperatorRewrite> = new Map(
  Object.entries({
    IS: rewriteIs,
    LIKE: replaceWithWord("ILIKE"),
    CURRENT_TIMESTAMP: replaceWithNowCall("omniroute_datetime"),
    CURRENT_DATE: replaceWithNowCall("omniroute_date"),
    CURRENT_TIME: replaceWithNowCall("omniroute_time"),
    GLOB: rewritePatternMatch,
    REGEXP: rewritePatternMatch,
    INDEXED: skipIndexedBy,
    NOT: skipNotIndexed,
  } satisfies Record<string, OperatorRewrite>)
);

function findGroupStart(out: Token[], closeIndex: number): number {
  let depth = 0;
  for (let k = closeIndex; k >= 0; k--) {
    if (isOp(out[k], ")")) depth++;
    if (isOp(out[k], "(")) depth--;
    if (depth === 0) return k;
  }
  return closeIndex;
}

function findJsonArrowLhsStart(out: Token[]): number {
  let start = out.length - 1;
  while (start >= 0 && out[start].type === "ws") start--;
  if (start >= 0 && isOp(out[start], ")")) {
    start = findGroupStart(out, start);
    const prevWord = out[prevIndex(out, start)];
    if (prevWord && (prevWord.type === "word" || prevWord.type === "qident"))
      start = prevIndex(out, start);
    return start;
  }
  while (start - 1 >= 0 && isOp(out[start - 1], ".")) start -= 2;
  return start;
}

function rewriteJsonArrow(token: Token, i: number, out: Token[]): number {
  const lhs = out.splice(findJsonArrowLhsStart(out));
  out.push(op("("), ...trimWs(lhs), op("::"), word("jsonb"), op(")"), ws(), op(token.value));
  return i;
}

function rewriteOperatorAt(tokens: Token[], i: number, out: Token[]): number | null {
  const token = tokens[i];
  if (isOp(token, "==")) {
    out.push(op("="));
    return i;
  }
  if (token.type === "word") {
    const rewrite = WORD_OPERATOR_REWRITES.get(token.value.toUpperCase());
    const consumed = rewrite ? rewrite(tokens, i, out) : null;
    if (consumed !== null) return consumed;
  }
  if (isOp(token, "->") || isOp(token, "->>")) return rewriteJsonArrow(token, i, out);
  return null;
}

function rewriteOperators(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const consumed = rewriteOperatorAt(tokens, i, out);
    if (consumed === null) out.push(tokens[i]);
    else i = consumed;
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

const OPERAND_BOUNDARY_WORDS = new Set([
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
]);

function isOperandBoundary(token: Token): boolean {
  if (token.type === "op") return token.value === ",";
  return token.type === "word" && OPERAND_BOUNDARY_WORDS.has(token.value.toUpperCase());
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
    } else if (depth === 0 && isOperandBoundary(token)) return i + 1;
  }
  return 0;
}

function prependLateralJoin(out: Token[]): void {
  let cursor = out.length - 1;
  while (cursor >= 0 && out[cursor].type === "ws") cursor--;
  if (!isWord(out[cursor], "JOIN")) return;
  let before = cursor - 1;
  while (before >= 0 && out[before].type === "ws") before--;
  if (!isWord(out[before], "CROSS", "LEFT", "INNER", "OUTER", "RIGHT", "FULL", "NATURAL")) {
    out.splice(cursor, 0, word("CROSS"), ws());
  }
  out.push(word("LATERAL"), ws());
}

function pushJsonEachAlias(tokens: Token[], close: number, out: Token[]): number {
  let afterIndex = close + 1;
  while (afterIndex < tokens.length && tokens[afterIndex].type === "ws") afterIndex++;
  const alias = tokens[afterIndex];
  const aliasAfterAs = isWord(alias, "AS") ? tokens[nextIndex(tokens, afterIndex)] : alias;
  const aliasName = aliasAfterAs ? identifierName(aliasAfterAs) : null;
  const aliasIsName = aliasName !== null && !isSqlKeyword(aliasName) && !isOp(aliasAfterAs, "(");
  if (aliasIsName) {
    out.push(ws(), word("AS"), ws(), { type: "qident", value: aliasName });
    return isWord(alias, "AS") ? nextIndex(tokens, afterIndex) : afterIndex;
  }
  out.push(ws(), word("AS"), ws(), word("json_each"));
  return close;
}

function isFunctionNamed(token: Token, name: string): boolean {
  return token.type === "word" && token.value.toLowerCase() === name;
}

function rewriteJsonEach(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const close = isFunctionNamed(token, "json_each") ? callCloseIndex(tokens, i) : -1;
    if (close === -1) {
      out.push(token);
      continue;
    }
    const inner = tokens.slice(nextIndex(tokens, i) + 1, close);
    prependLateralJoin(out);
    out.push(...call("omniroute_json_each", trimWs(inner)));
    i = pushJsonEachAlias(tokens, close, out);
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

interface CaseBranch {
  keyword: string;
  tokens: Token[];
}

function splitCaseBranches(inner: Token[]): { parts: CaseBranch[] } {
  const parts: CaseBranch[] = [];
  let current: CaseBranch = { keyword: "CASE", tokens: [] };
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

function isResultBranch(part: CaseBranch): boolean {
  return part.keyword === "THEN" || part.keyword === "ELSE";
}

function coerceBooleanBranch(body: Token[]): Token[] {
  if (isBooleanExpression(body)) return body;
  const trimmed = trimWs(body);
  if (isNumericLiteral(trimmed)) return [word(trimmed[0].value === "0" ? "FALSE" : "TRUE")];
  if (trimmed.length && !isWord(trimmed[0], "NULL"))
    return [op("("), ...trimmed, ws(), op("<>"), ws(), word("0"), op(")")];
  return body;
}

function rewriteCaseExpression(inner: Token[]): Token[] {
  const { parts } = splitCaseBranches(inner);
  const results = parts.filter(isResultBranch);
  const anyBoolean = results.some((part) => isBooleanExpression(part.tokens));
  const anyNumeric = results.some((part) => isNumericLiteral(part.tokens));
  const coerce = anyBoolean && anyNumeric;
  const out: Token[] = [word("CASE")];
  for (const part of parts) {
    if (part.keyword !== "CASE") out.push(ws(), word(part.keyword), ws());
    const body = coerce && isResultBranch(part) ? coerceBooleanBranch(part.tokens) : part.tokens;
    out.push(...body);
  }
  out.push(ws(), word("END"));
  return out;
}

function rewriteCaseBranches(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const end = isWord(token, "CASE") ? findCaseEnd(tokens, i) : -1;
    if (end === -1) {
      out.push(token);
      continue;
    }
    out.push(...rewriteCaseExpression(rewriteCaseBranches(tokens.slice(i + 1, end))));
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

function isNumericComparison(operator: Token | undefined, operand: Token | undefined): boolean {
  return (
    !!operator &&
    operator.type === "op" &&
    COMPARISON_OPS.has(operator.value) &&
    !!operand &&
    operand.type === "number"
  );
}

function isArithmeticOp(token: Token | undefined): boolean {
  return !!token && token.type === "op" && ARITHMETIC_OPS.has(token.value);
}

function isMinusOperand(token: Token | undefined): boolean {
  return !!token && (token.type === "number" || token.type === "word" || isOp(token, ")"));
}

function isNumericContext(out: Token[], tokens: Token[], close: number): boolean {
  const previous = out[prevIndex(out, out.length)];
  const following = tokens[nextIndex(tokens, close)];
  const afterFollowing = following
    ? tokens[nextIndex(tokens, nextIndex(tokens, close))]
    : undefined;
  const beforePrevious = previous ? out[prevIndex(out, prevIndex(out, out.length))] : undefined;
  return (
    isNumericComparison(following, afterFollowing) ||
    isNumericComparison(previous, beforePrevious) ||
    isArithmeticOp(following) ||
    (isArithmeticOp(previous) && !isOp(previous, "-")) ||
    (isOp(previous, "-") && isMinusOperand(beforePrevious))
  );
}

function rewriteTextHelperArithmetic(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const isHelper = token.type === "word" && TEXT_HELPERS.has(token.value.toLowerCase());
    const close = isHelper ? callCloseIndex(tokens, i) : -1;
    if (close === -1) {
      out.push(token);
      continue;
    }
    const callTokens = tokens.slice(i, close + 1);
    if (isNumericContext(out, tokens, close)) out.push(...call("omniroute_to_real", callTokens));
    else out.push(...callTokens);
    i = close;
  }
  return out;
}

function isColumnPart(token: Token): boolean {
  return token.type === "qident" || (token.type === "word" && !isSqlKeyword(token.value));
}

function collectColumnChain(tokens: Token[], start: number): { chain: Token[]; end: number } {
  const chain: Token[] = [];
  let j = start;
  while (j < tokens.length) {
    const current = tokens[j];
    if (!isColumnPart(current)) break;
    chain.push(current);
    const dotIndex = j + 1;
    if (!isOp(tokens[dotIndex], ".")) {
      j++;
      break;
    }
    chain.push(op("."));
    j = dotIndex + 1;
  }
  return { chain, end: j };
}

function isBareColumnChain(chain: Token[]): boolean {
  if (chain.length === 0 || isOp(chain[chain.length - 1], ".")) return false;
  return !(chain.length === 1 && isWord(chain[0], "NEW", "OLD"));
}

function isBooleanTerminator(follower: Token | undefined): boolean {
  return (
    follower === undefined ||
    isOp(follower, ")") ||
    isOp(follower, ";") ||
    (follower.type === "word" && BOOLEAN_FOLLOWERS.has(follower.value.toUpperCase()))
  );
}

function rewriteBooleanColumns(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    out.push(token);
    if (token.type !== "word" || !BOOLEAN_CONTEXT_WORDS.has(token.value.toUpperCase())) continue;
    const start = nextIndex(tokens, i);
    const { chain, end: j } = collectColumnChain(tokens, start);
    const followerIndex =
      j < tokens.length && tokens[j].type === "ws" ? nextIndex(tokens, j - 1) : j;
    if (!isBareColumnChain(chain) || !isBooleanTerminator(tokens[followerIndex])) continue;
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

export interface TableRefs {
  primary: string | null;
  aliases: Map<string, string>;
  all: string[];
}

const TABLE_INTRO_WORDS = new Set(["FROM", "JOIN", "INTO", "UPDATE"]);

function registerTableRef(
  refs: TableRefs,
  tokens: Token[],
  nameToken: Token | undefined,
  index: number
): void {
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
}

function isUnquotedName(token: Token | undefined): boolean {
  return (
    !!token && (token.type === "word" || token.type === "qident") && !isSqlKeyword(token.value)
  );
}

function registerFromList(refs: TableRefs, tokens: Token[], nameIndex: number): void {
  let cursor = nameIndex;
  while (true) {
    const commaIndex = nextIndex(tokens, cursor);
    const afterName = tokens[commaIndex];
    if (isWord(afterName, "AS")) {
      cursor = nextIndex(tokens, commaIndex);
      continue;
    }
    if (isUnquotedName(afterName) && cursor === nameIndex) {
      cursor = commaIndex;
      continue;
    }
    if (!isOp(afterName, ",")) break;
    const nextName = nextIndex(tokens, commaIndex);
    if (isOp(tokens[nextName], "(")) break;
    registerTableRef(refs, tokens, tokens[nextName], nextName);
    cursor = nextName;
  }
}

export function collectTableRefs(tokens: Token[]): TableRefs {
  const refs: TableRefs = { primary: null, aliases: new Map(), all: [] };
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "word") continue;
    const value = token.value.toUpperCase();
    if (!TABLE_INTRO_WORDS.has(value)) continue;
    const nameIndex = nextIndex(tokens, i);
    const nameToken = tokens[nameIndex];
    if (nameToken && !isOp(nameToken, "(") && !isWord(nameToken, "OR", "OF"))
      registerTableRef(refs, tokens, nameToken, nameIndex);
    if (value === "FROM") registerFromList(refs, tokens, nameIndex);
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

const STRING_CONTEXT_OPS = new Set(["=", "<>", "!=", "<", ">", "<=", ">=", "||"]);

function isStringContextOp(token: Token | undefined): boolean {
  return !!token && token.type === "op" && STRING_CONTEXT_OPS.has(token.value);
}

function isStringLiteralPosition(tokens: Token[], index: number, resolved: boolean): boolean {
  const previous = tokens[prevIndex(tokens, index)];
  const following = tokens[nextIndex(tokens, index)];
  if (isOp(previous, ".") || isOp(following, ".") || isOp(following, "(")) return false;
  const afterValueKeyword = isWord(previous, "THEN", "ELSE", "DEFAULT");
  if (afterValueKeyword || isStringContextOp(previous)) return true;
  if (!resolved) return false;
  const inList = isOp(previous, ",") || isOp(previous, "(");
  return isStringContextOp(following) || inList;
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
  return tokens.map((token, index) => {
    if (token.type !== "qident" || known.has(token.value.toLowerCase())) return token;
    return isStringLiteralPosition(tokens, index, resolved) ? str(token.value) : token;
  });
}

export function applyExpressionRules(
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
