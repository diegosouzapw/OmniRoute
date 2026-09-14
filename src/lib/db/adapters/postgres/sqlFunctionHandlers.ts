import { isWord, op, str, trimWs, word, ws, type Token } from "./sqlTokenizer";
import { TEXT_TYPES, INT_TYPES, REAL_TYPES, BLOB_TYPES } from "./translationCore";
import { call, cast, paren, upper } from "./sqlBuilders";

type FunctionRewrite = (args: Token[][], inner: Token[]) => Token[] | null;

function renamed(target: string): FunctionRewrite {
  return (args) => call(target, ...args);
}

function renamedDefaultingToNow(target: string): FunctionRewrite {
  return (args) => call(target, ...(args.length ? args : [[str("now")]]));
}

function castCall(target: string, type: string): FunctionRewrite {
  return (args) => cast(call(target, ...args), type);
}

function extremum(target: string): FunctionRewrite {
  return (args) => (args.length >= 2 ? call(target, ...args) : null);
}

function stripDistinct(arg: Token[]): { distinct: boolean; tokens: Token[] } {
  if (isWord(arg[0], "DISTINCT")) return { distinct: true, tokens: trimWs(arg.slice(1)) };
  return { distinct: false, tokens: arg };
}

function groupConcat(args: Token[][]): Token[] {
  const { distinct, tokens } = stripDistinct(args[0] ?? []);
  const separator = args[1] ?? [str(",")];
  const first = distinct ? [word("DISTINCT"), ws(), ...cast(tokens, "text")] : cast(tokens, "text");
  return call("string_agg", first, separator);
}

function charFromCodes(args: Token[][]): Token[] {
  const parts: Token[] = [];
  args.forEach((arg, index) => {
    if (index > 0) parts.push(ws(), op("||"), ws());
    parts.push(...call("chr", cast(arg, "int")));
  });
  return paren(parts);
}

function iif(args: Token[][]): Token[] | null {
  if (args.length !== 3) return null;
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
}

function castExpression(_args: Token[][], inner: Token[]): Token[] | null {
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

const FUNCTION_REWRITES: ReadonlyMap<string, FunctionRewrite> = new Map(
  Object.entries({
    datetime: renamedDefaultingToNow("omniroute_datetime"),
    date: renamedDefaultingToNow("omniroute_date"),
    time: renamedDefaultingToNow("omniroute_time"),
    julianday: renamedDefaultingToNow("omniroute_julianday"),
    strftime: renamed("omniroute_strftime"),
    unixepoch: renamedDefaultingToNow("omniroute_unixepoch"),
    json_extract: renamed("omniroute_json_extract"),
    json_type: renamed("omniroute_json_type"),
    json_valid: renamed("omniroute_json_valid"),
    json_set: renamed("omniroute_json_set"),
    json_insert: renamed("omniroute_json_insert"),
    json_replace: renamed("omniroute_json_replace"),
    json_remove: renamed("omniroute_json_remove"),
    json_array_length: renamed("omniroute_json_array_length"),
    json_quote: castCall("to_jsonb", "text"),
    json: renamed("omniroute_json"),
    json_object: castCall("jsonb_build_object", "text"),
    json_array: castCall("jsonb_build_array", "text"),
    json_group_array: (args) =>
      call("COALESCE", [...call("jsonb_agg", ...args), op("::"), word("text")], [str("[]")]),
    json_group_object: (args) =>
      cast(
        call("COALESCE", call("jsonb_object_agg", ...args), [str("{}"), op("::"), word("jsonb")]),
        "text"
      ),
    max: extremum("GREATEST"),
    min: extremum("LEAST"),
    ifnull: renamed("COALESCE"),
    instr: renamed("strpos"),
    group_concat: groupConcat,
    total: (args) => cast(call("COALESCE", call("SUM", ...args), [word("0")]), "double precision"),
    random: () => call("omniroute_random"),
    randomblob: renamed("omniroute_randomblob"),
    hex: renamed("omniroute_hex"),
    char: charFromCodes,
    trim: (args) => (args.length === 2 ? call("btrim", ...args) : null),
    round: (args) => (args.length === 2 ? call("round", cast(args[0], "numeric"), args[1]) : null),
    typeof: renamed("omniroute_typeof"),
    iif,
    last_insert_rowid: () => call("lastval"),
    sqlite_version: () => [str("3.46.0")],
    printf: renamed("format"),
    format: renamed("format"),
    unicode: renamed("ascii"),
    substr: renamed("omniroute_substr"),
    substring: renamed("omniroute_substr"),
    cast: castExpression,
  } satisfies Record<string, FunctionRewrite>)
);

export function functionHandler(name: string, args: Token[][], inner: Token[]): Token[] | null {
  const rewrite = FUNCTION_REWRITES.get(name.toLowerCase());
  return rewrite ? rewrite(args, inner) : null;
}
