import { op, word, ws, type Token } from "./sqlTokenizer";

export function upper(token: Token | undefined): string {
  return token && token.type === "word" ? token.value.toUpperCase() : "";
}

export function call(name: string, ...args: Token[][]): Token[] {
  const out: Token[] = [word(name), op("(")];
  args.forEach((arg, index) => {
    if (index > 0) out.push(op(","), ws());
    out.push(...arg);
  });
  out.push(op(")"));
  return out;
}

export function paren(tokens: Token[]): Token[] {
  return [op("("), ...tokens, op(")")];
}

export function cast(tokens: Token[], type: string): Token[] {
  return [op("("), ...tokens, op(")"), op("::"), word(type)];
}
