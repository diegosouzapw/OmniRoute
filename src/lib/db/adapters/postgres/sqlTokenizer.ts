export type TokenType = "ws" | "word" | "qident" | "string" | "blob" | "number" | "param" | "op";

export interface Token {
  type: TokenType;
  value: string;
}

interface Scan {
  token: Token | null;
  end: number;
}

type Scanner = (sql: string, i: number) => Scan | null;

interface SplitState {
  statements: string[];
  current: string;
  inTrigger: boolean;
  triggerDepth: number;
  caseDepth: number;
}

const WORD_START = /[A-Za-z_À-￿]/;
const WORD_CHAR = /[A-Za-z0-9_À-￿]/;
const DIGIT = /[0-9]/;
const HEX_DIGIT = /[0-9a-fA-F]/;
const ASCII_WORD_START = /[A-Za-z_]/;
const ASCII_WORD_CHAR = /[A-Za-z0-9_]/;
const CREATE_TRIGGER_PREFIX = /CREATE\s+(TEMP\s+|TEMPORARY\s+)?$/i;
const WS_CHARS = new Set([" ", "\t", "\n", "\r"]);
const MULTI_CHAR_OPS = ["<>", "!=", "<=", ">=", "==", "||", "->>", "->", "<<", ">>", "::"];

export function tokenize(sql: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < sql.length) {
    const scan = scanToken(sql, i);
    if (scan.token) tokens.push(scan.token);
    else pushWs(tokens, " ");
    i = scan.end;
  }
  return tokens;
}

const SCANNERS: Scanner[] = [
  scanWhitespace,
  scanLineComment,
  scanBlockComment,
  scanString,
  scanBlob,
  scanQuotedIdentifier,
  scanPositionalParam,
  scanNamedParam,
  scanNumber,
  scanWord,
];

function scanToken(sql: string, i: number): Scan {
  for (const scanner of SCANNERS) {
    const scan = scanner(sql, i);
    if (scan) return scan;
  }
  return scanOperator(sql, i);
}

function scanWhile(sql: string, from: number, test: (ch: string) => boolean): number {
  let j = from;
  while (j < sql.length && test(sql[j])) j++;
  return j;
}

function skipPast(sql: string, needle: string, from: number): number {
  const end = sql.indexOf(needle, from);
  return end === -1 ? sql.length : end + needle.length;
}

function stringEnd(sql: string, open: number): number {
  let j = open + 1;
  while (j < sql.length) {
    if (sql[j] !== "'") {
      j++;
      continue;
    }
    if (sql[j + 1] !== "'") return j;
    j += 2;
  }
  return j;
}

function scanWhitespace(sql: string, i: number): Scan | null {
  if (!WS_CHARS.has(sql[i])) return null;
  const end = scanWhile(sql, i, (ch) => WS_CHARS.has(ch));
  return { token: { type: "ws", value: sql.slice(i, end) }, end };
}

function scanLineComment(sql: string, i: number): Scan | null {
  if (!sql.startsWith("--", i)) return null;
  return { token: null, end: scanWhile(sql, i + 2, (ch) => ch !== "\n") };
}

function scanBlockComment(sql: string, i: number): Scan | null {
  if (!sql.startsWith("/*", i)) return null;
  return { token: null, end: skipPast(sql, "*/", i + 2) };
}

function scanString(sql: string, i: number): Scan | null {
  if (sql[i] !== "'") return null;
  const j = stringEnd(sql, i);
  return {
    token: { type: "string", value: sql.slice(i, Math.min(j + 1, sql.length)) },
    end: j + 1,
  };
}

function scanBlob(sql: string, i: number): Scan | null {
  const ch = sql[i];
  if ((ch !== "x" && ch !== "X") || sql[i + 1] !== "'") return null;
  const end = sql.indexOf("'", i + 2);
  const stop = end === -1 ? sql.length : end;
  return { token: { type: "blob", value: sql.slice(i + 2, stop) }, end: stop + 1 };
}

function scanQuotedIdentifier(sql: string, i: number): Scan | null {
  const ch = sql[i];
  if (ch !== '"' && ch !== "`" && ch !== "[") return null;
  const close = ch === "[" ? "]" : ch;
  let j = i + 1;
  let name = "";
  while (j < sql.length) {
    if (sql[j] !== close) {
      name += sql[j];
      j++;
      continue;
    }
    if (close === "]" || sql[j + 1] !== close) break;
    name += close;
    j += 2;
  }
  return { token: { type: "qident", value: name }, end: j + 1 };
}

function scanPositionalParam(sql: string, i: number): Scan | null {
  if (sql[i] !== "?") return null;
  const end = scanWhile(sql, i + 1, (ch) => DIGIT.test(ch));
  return { token: { type: "param", value: sql.slice(i, end) }, end };
}

function scanNamedParam(sql: string, i: number): Scan | null {
  const ch = sql[i];
  if (ch !== "@" && ch !== ":" && ch !== "$") return null;
  if (i + 1 >= sql.length || !WORD_START.test(sql[i + 1])) return null;
  if (ch === ":" && sql[i - 1] === ":") return { token: op(ch), end: i + 1 };
  const end = scanWhile(sql, i + 1, (c) => WORD_CHAR.test(c));
  return { token: { type: "param", value: sql.slice(i, end) }, end };
}

function scanNumber(sql: string, i: number): Scan | null {
  const ch = sql[i];
  if (!DIGIT.test(ch) && !(ch === "." && DIGIT.test(sql[i + 1] ?? ""))) return null;
  if (ch === "0" && (sql[i + 1] === "x" || sql[i + 1] === "X")) return scanHexNumber(sql, i);
  const mantissaEnd = scanWhile(sql, i, (c) => DIGIT.test(c) || c === ".");
  const end = scanExponent(sql, mantissaEnd);
  return { token: { type: "number", value: sql.slice(i, end) }, end };
}

function scanHexNumber(sql: string, i: number): Scan {
  const end = scanWhile(sql, i + 2, (c) => HEX_DIGIT.test(c));
  return { token: { type: "number", value: String(parseInt(sql.slice(i + 2, end), 16)) }, end };
}

function scanExponent(sql: string, j: number): number {
  if (j >= sql.length || (sql[j] !== "e" && sql[j] !== "E")) return j;
  let k = j + 1;
  if (sql[k] === "+" || sql[k] === "-") k++;
  if (!DIGIT.test(sql[k] ?? "")) return j;
  return scanWhile(sql, k, (c) => DIGIT.test(c));
}

function scanWord(sql: string, i: number): Scan | null {
  if (!WORD_START.test(sql[i])) return null;
  const end = scanWhile(sql, i + 1, (c) => WORD_CHAR.test(c));
  return { token: { type: "word", value: sql.slice(i, end) }, end };
}

function scanOperator(sql: string, i: number): Scan {
  const multi = MULTI_CHAR_OPS.find((candidate) => sql.startsWith(candidate, i));
  const value = multi ?? sql[i];
  return { token: op(value), end: i + value.length };
}

function pushWs(tokens: Token[], value: string): void {
  const last = tokens[tokens.length - 1];
  if (last && last.type === "ws") return;
  tokens.push({ type: "ws", value });
}

export function isWord(token: Token | undefined, ...names: string[]): boolean {
  if (!token || token.type !== "word") return false;
  const upper = token.value.toUpperCase();
  return names.some((name) => name === upper);
}

export function isOp(token: Token | undefined, value: string): boolean {
  return !!token && token.type === "op" && token.value === value;
}

export function nextIndex(tokens: Token[], from: number): number {
  let i = from + 1;
  while (i < tokens.length && tokens[i].type === "ws") i++;
  return i;
}

export function prevIndex(tokens: Token[], from: number): number {
  let i = from - 1;
  while (i >= 0 && tokens[i].type === "ws") i--;
  return i;
}

export function matchingParen(tokens: Token[], openIndex: number): number {
  let depth = 0;
  for (let i = openIndex; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type !== "op") continue;
    if (token.value === "(") depth++;
    else if (token.value === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

export function splitTopLevel(tokens: Token[], separator: string): Token[][] {
  const parts: Token[][] = [];
  let current: Token[] = [];
  let depth = 0;
  for (const token of tokens) {
    if (token.type === "op") {
      if (token.value === "(") depth++;
      else if (token.value === ")") depth--;
      else if (token.value === separator && depth === 0) {
        parts.push(current);
        current = [];
        continue;
      }
    }
    current.push(token);
  }
  parts.push(current);
  return parts;
}

export function trimWs(tokens: Token[]): Token[] {
  let start = 0;
  let end = tokens.length;
  while (start < end && tokens[start].type === "ws") start++;
  while (end > start && tokens[end - 1].type === "ws") end--;
  return tokens.slice(start, end);
}

export function render(tokens: Token[]): string {
  let out = "";
  let previous: Token | null = null;
  for (const token of tokens) {
    const text = renderToken(token);
    if (previous && needsSpace(previous, token)) out += " ";
    out += text;
    previous = token;
  }
  return out;
}

function needsSpace(previous: Token, current: Token): boolean {
  if (previous.type === "ws" || current.type === "ws") return false;
  const tight = (t: Token) =>
    t.type === "op" &&
    (t.value === "(" ||
      t.value === ")" ||
      t.value === "," ||
      t.value === "." ||
      t.value === "::" ||
      t.value === ";");
  if (
    tight(previous) &&
    (previous.value === "(" || previous.value === "." || previous.value === "::")
  )
    return false;
  if (tight(current) && current.value !== "(") return false;
  if (previous.type === "word" && current.type === "op" && current.value === "(") return false;
  if (previous.type === "qident" && current.type === "op" && current.value === "(") return false;
  return true;
}

export function renderToken(token: Token): string {
  switch (token.type) {
    case "qident":
      return `"${token.value.replace(/"/g, '""')}"`;
    case "blob":
      return `'\\x${token.value}'::bytea`;
    default:
      return token.value;
  }
}

export function word(value: string): Token {
  return { type: "word", value };
}

export function op(value: string): Token {
  return { type: "op", value };
}

export function str(value: string): Token {
  return { type: "string", value: `'${value.replace(/'/g, "''")}'` };
}

export function ws(): Token {
  return { type: "ws", value: " " };
}

export function stringValue(token: Token): string {
  return token.value.slice(1, -1).replace(/''/g, "'");
}

export function identifierName(token: Token): string | null {
  if (token.type === "word") return token.value;
  if (token.type === "qident") return token.value;
  return null;
}

export function splitStatements(sql: string): string[] {
  const state: SplitState = {
    statements: [],
    current: "",
    inTrigger: false,
    triggerDepth: 0,
    caseDepth: 0,
  };
  let i = 0;
  while (i < sql.length) i = consumeStatementChunk(sql, i, state);
  flushStatement(state);
  return state.statements;
}

function consumeStatementChunk(sql: string, i: number, state: SplitState): number {
  const ch = sql[i];
  if (sql.startsWith("--", i)) {
    state.current += " ";
    const end = sql.indexOf("\n", i);
    return end === -1 ? sql.length : end;
  }
  if (sql.startsWith("/*", i)) {
    state.current += " ";
    return skipPast(sql, "*/", i + 2);
  }
  if (ch === "'") {
    const end = stringEnd(sql, i) + 1;
    state.current += sql.slice(i, end);
    return end;
  }
  if (ch === '"' || ch === "`") return consumeQuotedIdentifier(sql, i, state);
  if (ASCII_WORD_START.test(ch)) return consumeKeyword(sql, i, state);
  if (ch === ";") return consumeSemicolon(i, state);
  state.current += ch;
  return i + 1;
}

function consumeQuotedIdentifier(sql: string, i: number, state: SplitState): number {
  const end = sql.indexOf(sql[i], i + 1);
  const stop = end === -1 ? sql.length : end;
  state.current += sql.slice(i, stop + 1);
  return stop + 1;
}

function consumeKeyword(sql: string, i: number, state: SplitState): number {
  const end = scanWhile(sql, i, (c) => ASCII_WORD_CHAR.test(c));
  const wordText = sql.slice(i, end);
  trackBlockDepth(state, wordText.toUpperCase());
  state.current += wordText;
  return end;
}

function trackBlockDepth(state: SplitState, upper: string): void {
  if (upper === "TRIGGER" && CREATE_TRIGGER_PREFIX.test(state.current)) state.inTrigger = true;
  if (upper === "CASE") state.caseDepth++;
  if (upper === "END") closeBlock(state);
  if (upper === "BEGIN" && state.inTrigger) state.triggerDepth++;
}

function closeBlock(state: SplitState): void {
  if (state.caseDepth > 0) state.caseDepth--;
  else if (state.inTrigger && state.triggerDepth > 0) state.triggerDepth--;
}

function consumeSemicolon(i: number, state: SplitState): number {
  if (state.inTrigger && state.triggerDepth > 0) {
    state.current += ";";
    return i + 1;
  }
  flushStatement(state);
  state.inTrigger = false;
  return i + 1;
}

function flushStatement(state: SplitState): void {
  const text = state.current.trim();
  if (text) state.statements.push(text);
  state.current = "";
}
