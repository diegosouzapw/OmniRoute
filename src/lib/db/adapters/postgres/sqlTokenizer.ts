export type TokenType = "ws" | "word" | "qident" | "string" | "blob" | "number" | "param" | "op";

export interface Token {
  type: TokenType;
  value: string;
}

const WORD_START = /[A-Za-z_À-￿]/;
const WORD_CHAR = /[A-Za-z0-9_À-￿]/;
const DIGIT = /[0-9]/;
const MULTI_CHAR_OPS = ["<>", "!=", "<=", ">=", "==", "||", "->>", "->", "<<", ">>", "::"];

export function tokenize(sql: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = sql.length;
  while (i < n) {
    const ch = sql[i];
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      let j = i;
      while (j < n && (sql[j] === " " || sql[j] === "\t" || sql[j] === "\n" || sql[j] === "\r"))
        j++;
      tokens.push({ type: "ws", value: sql.slice(i, j) });
      i = j;
      continue;
    }
    if (ch === "-" && sql[i + 1] === "-") {
      let j = i + 2;
      while (j < n && sql[j] !== "\n") j++;
      pushWs(tokens, " ");
      i = j;
      continue;
    }
    if (ch === "/" && sql[i + 1] === "*") {
      const end = sql.indexOf("*/", i + 2);
      i = end === -1 ? n : end + 2;
      pushWs(tokens, " ");
      continue;
    }
    if (ch === "'") {
      let j = i + 1;
      while (j < n) {
        if (sql[j] === "'") {
          if (sql[j + 1] === "'") {
            j += 2;
            continue;
          }
          break;
        }
        j++;
      }
      tokens.push({ type: "string", value: sql.slice(i, Math.min(j + 1, n)) });
      i = j + 1;
      continue;
    }
    if ((ch === "x" || ch === "X") && sql[i + 1] === "'") {
      const end = sql.indexOf("'", i + 2);
      const stop = end === -1 ? n : end;
      tokens.push({ type: "blob", value: sql.slice(i + 2, stop) });
      i = stop + 1;
      continue;
    }
    if (ch === '"' || ch === "`" || ch === "[") {
      const close = ch === "[" ? "]" : ch;
      let j = i + 1;
      let name = "";
      while (j < n) {
        if (sql[j] === close) {
          if (close !== "]" && sql[j + 1] === close) {
            name += close;
            j += 2;
            continue;
          }
          break;
        }
        name += sql[j];
        j++;
      }
      tokens.push({ type: "qident", value: name });
      i = j + 1;
      continue;
    }
    if (ch === "?") {
      let j = i + 1;
      while (j < n && DIGIT.test(sql[j])) j++;
      tokens.push({ type: "param", value: sql.slice(i, j) });
      i = j;
      continue;
    }
    if ((ch === "@" || ch === ":" || ch === "$") && i + 1 < n && WORD_START.test(sql[i + 1])) {
      if (ch === ":" && sql[i - 1] === ":") {
        tokens.push({ type: "op", value: ch });
        i++;
        continue;
      }
      let j = i + 1;
      while (j < n && WORD_CHAR.test(sql[j])) j++;
      tokens.push({ type: "param", value: sql.slice(i, j) });
      i = j;
      continue;
    }
    if (DIGIT.test(ch) || (ch === "." && DIGIT.test(sql[i + 1] ?? ""))) {
      let j = i;
      if (ch === "0" && (sql[i + 1] === "x" || sql[i + 1] === "X")) {
        j = i + 2;
        while (j < n && /[0-9a-fA-F]/.test(sql[j])) j++;
        tokens.push({ type: "number", value: String(parseInt(sql.slice(i + 2, j), 16)) });
        i = j;
        continue;
      }
      while (j < n && (DIGIT.test(sql[j]) || sql[j] === ".")) j++;
      if (j < n && (sql[j] === "e" || sql[j] === "E")) {
        let k = j + 1;
        if (sql[k] === "+" || sql[k] === "-") k++;
        if (DIGIT.test(sql[k] ?? "")) {
          while (k < n && DIGIT.test(sql[k])) k++;
          j = k;
        }
      }
      tokens.push({ type: "number", value: sql.slice(i, j) });
      i = j;
      continue;
    }
    if (WORD_START.test(ch)) {
      let j = i + 1;
      while (j < n && WORD_CHAR.test(sql[j])) j++;
      tokens.push({ type: "word", value: sql.slice(i, j) });
      i = j;
      continue;
    }
    const multi = MULTI_CHAR_OPS.find((op) => sql.startsWith(op, i));
    if (multi) {
      tokens.push({ type: "op", value: multi });
      i += multi.length;
      continue;
    }
    tokens.push({ type: "op", value: ch });
    i++;
  }
  return tokens;
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
  const statements: string[] = [];
  let current = "";
  let i = 0;
  const n = sql.length;
  let triggerDepth = 0;
  let inTrigger = false;
  let caseDepth = 0;
  while (i < n) {
    const ch = sql[i];
    if (ch === "-" && sql[i + 1] === "-") {
      const end = sql.indexOf("\n", i);
      i = end === -1 ? n : end;
      current += " ";
      continue;
    }
    if (ch === "/" && sql[i + 1] === "*") {
      const end = sql.indexOf("*/", i + 2);
      i = end === -1 ? n : end + 2;
      current += " ";
      continue;
    }
    if (ch === "'") {
      let j = i + 1;
      while (j < n) {
        if (sql[j] === "'") {
          if (sql[j + 1] === "'") {
            j += 2;
            continue;
          }
          break;
        }
        j++;
      }
      current += sql.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    if (ch === '"' || ch === "`") {
      const end = sql.indexOf(ch, i + 1);
      const stop = end === -1 ? n : end;
      current += sql.slice(i, stop + 1);
      i = stop + 1;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_]/.test(sql[j])) j++;
      const wordText = sql.slice(i, j);
      const upper = wordText.toUpperCase();
      if (upper === "TRIGGER" && /CREATE\s+(TEMP\s+|TEMPORARY\s+)?$/i.test(current))
        inTrigger = true;
      if (upper === "CASE") caseDepth++;
      if (upper === "END") {
        if (caseDepth > 0) caseDepth--;
        else if (inTrigger && triggerDepth > 0) triggerDepth--;
      }
      if (upper === "BEGIN" && inTrigger) triggerDepth++;
      current += wordText;
      i = j;
      continue;
    }
    if (ch === ";") {
      if (inTrigger && triggerDepth > 0) {
        current += ch;
        i++;
        continue;
      }
      if (current.trim()) statements.push(current.trim());
      current = "";
      inTrigger = false;
      i++;
      continue;
    }
    current += ch;
    i++;
  }
  if (current.trim()) statements.push(current.trim());
  return statements;
}
