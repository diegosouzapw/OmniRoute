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
  trimWs,
  word,
  ws,
  type Token,
} from "./sqlTokenizer";
import {
  ROWID_TABLES,
  ROWID_COLUMN,
  finish,
  type TranslationContext,
  type TranslatedStatement,
  type ParamState,
} from "./translationCore";
import { upper, call, paren, applyExpressionRules } from "./sqlExpressions";
import { fitIdentifier } from "./triggerTranslator";
import { mapColumnType, scanColumnType } from "./sqlColumnTypes";
import {
  joinTokenLists,
  quotedColumnList,
  referenceClause,
  referencedColumnType,
  skipReferences,
} from "./sqlReferences";

const TABLE_CONSTRAINT_WORDS = new Set(["PRIMARY", "UNIQUE", "CHECK", "CONSTRAINT"]);

const DATETIME_DEFAULTS = new Map([
  ["CURRENT_TIMESTAMP", "omniroute_datetime"],
  ["CURRENT_DATE", "omniroute_date"],
  ["CURRENT_TIME", "omniroute_time"],
]);

interface TranslatedDef {
  tokens: Token[];
  isIntegerPrimaryKey: boolean;
}

interface ConstraintScan {
  rest: Token[];
  out: Token[];
  ctx: TranslationContext;
  params: ParamState;
}

interface ColumnConstraintScan extends ConstraintScan {
  currentTable: string;
  columnType: string;
  localDefs: Token[][] | null;
}

type ConstraintHandler = (scan: ColumnConstraintScan, i: number) => number | null;

function identityTypeTokens(): Token[] {
  return [
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
  ];
}

function translateColumnDef(
  def: Token[],
  withoutRowid: boolean,
  ctx: TranslationContext,
  params: ParamState,
  currentTable = "",
  localDefs: Token[][] | null = null
): TranslatedDef {
  const nameToken = def[0];
  const name = identifierName(nameToken) ?? nameToken.value;
  const { typeWords, end } = scanColumnType(def);
  const rest = def.slice(end);
  const restUpper = rest.filter((t) => t.type === "word").map((t) => t.value.toUpperCase());
  const hasPrimaryKey = restUpper.includes("PRIMARY");
  const mapped = mapColumnType(typeWords);
  const isIntegerPrimaryKey = mapped === "BIGINT" && hasPrimaryKey && !withoutRowid;
  const constraints = translateConstraintTail(rest, ctx, params, currentTable, mapped, localDefs);
  const typeTokens: Token[] = isIntegerPrimaryKey
    ? identityTypeTokens()
    : mapped.split(" ").flatMap((part, index) => (index === 0 ? [word(part)] : [ws(), word(part)]));
  const tokens: Token[] = [{ type: "qident", value: name }, ws(), ...typeTokens];
  if (constraints.length) tokens.push(ws(), ...constraints);
  return { tokens, isIntegerPrimaryKey };
}

function skipOnConflict(tokens: Token[], i: number): number | null {
  if (upper(tokens[i]) !== "ON" || upper(tokens[nextIndex(tokens, i)]) !== "CONFLICT") return null;
  return nextIndex(tokens, nextIndex(tokens, i)) + 1;
}

function appendCheck({ rest, out, ctx, params }: ConstraintScan, i: number): number {
  const openIndex = nextIndex(rest, i);
  const close = matchingParen(rest, openIndex);
  const inner = applyExpressionRules(rest.slice(openIndex + 1, close), ctx, params);
  out.push(word("CHECK"), ws(), ...paren(inner));
  return close + 1;
}

function skipKeyOrder({ out }: ColumnConstraintScan, i: number): number | null {
  return isWord(out[prevIndex(out, out.length)], "KEY") ? i + 1 : null;
}

function appendReferences(scan: ColumnConstraintScan, i: number): number {
  const { rest, out, ctx, currentTable, columnType, localDefs } = scan;
  const end = skipReferences(rest, i);
  const clause = referenceClause(rest.slice(i, end), ctx, currentTable, columnType, localDefs);
  if (clause) out.push(ws(), ...clause);
  return end;
}

function appendDefault({ rest, out, ctx, params }: ColumnConstraintScan, i: number): number {
  const valueIndex = nextIndex(rest, i);
  const valueToken = rest[valueIndex];
  const fn = DATETIME_DEFAULTS.get(upper(valueToken));
  if (fn) {
    out.push(word("DEFAULT"), ws(), ...paren(call(fn, [str("now")])));
    return valueIndex + 1;
  }
  if (isOp(valueToken, "(")) {
    const close = matchingParen(rest, valueIndex);
    const inner = applyExpressionRules(rest.slice(valueIndex + 1, close), ctx, params);
    out.push(word("DEFAULT"), ws(), ...paren(inner));
    return close + 1;
  }
  if (isOp(valueToken, "-") || isOp(valueToken, "+")) {
    out.push(word("DEFAULT"), ws(), valueToken, rest[valueIndex + 1]);
    return valueIndex + 2;
  }
  out.push(
    word("DEFAULT"),
    ws(),
    valueToken.type === "qident" ? str(valueToken.value) : valueToken
  );
  return valueIndex + 1;
}

function appendGenerated({ rest, out, ctx, params }: ColumnConstraintScan, i: number): number {
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
  const after = nextIndex(rest, close);
  return isWord(rest[after], "STORED", "VIRTUAL") ? after + 1 : close + 1;
}

const CONSTRAINT_HANDLERS = new Map<string, ConstraintHandler>([
  ["AUTOINCREMENT", (_scan, i) => i + 1],
  ["COLLATE", ({ rest }, i) => nextIndex(rest, i) + 1],
  ["REFERENCES", appendReferences],
  ["ON", ({ rest }, i) => skipOnConflict(rest, i)],
  ["ASC", skipKeyOrder],
  ["DESC", skipKeyOrder],
  ["DEFAULT", appendDefault],
  ["CHECK", appendCheck],
  ["GENERATED", appendGenerated],
]);

function translateConstraintTail(
  rest: Token[],
  ctx: TranslationContext,
  params: ParamState,
  currentTable = "",
  columnType = "",
  localDefs: Token[][] | null = null
): Token[] {
  const scan: ColumnConstraintScan = {
    rest,
    out: [],
    ctx,
    params,
    currentTable,
    columnType,
    localDefs,
  };
  let i = 0;
  while (i < rest.length) {
    const handler = CONSTRAINT_HANDLERS.get(upper(rest[i]));
    const next = handler ? handler(scan, i) : null;
    if (next === null) {
      scan.out.push(rest[i]);
      i++;
    } else {
      i = next;
    }
  }
  return trimWs(scan.out);
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
  return [
    word("FOREIGN"),
    ws(),
    word("KEY"),
    ws(),
    ...quotedColumnList(localColumns),
    ws(),
    ...clause,
  ];
}

function asTranslatedDef(tokens: Token[] | null): TranslatedDef | null {
  return tokens ? { tokens, isIntegerPrimaryKey: false } : null;
}

function translateTableDef(
  def: Token[],
  defs: Token[][],
  tableName: string,
  withoutRowid: boolean,
  ctx: TranslationContext,
  params: ParamState
): TranslatedDef | null {
  const first = upper(def[0]);
  if (TABLE_CONSTRAINT_WORDS.has(first)) {
    return asTranslatedDef(translateTableConstraint(def, ctx, params));
  }
  if (first === "FOREIGN") return asTranslatedDef(foreignKeyConstraint(def, ctx, tableName, defs));
  return translateColumnDef(def, withoutRowid, ctx, params, tableName, defs);
}

function translateTableDefs(
  defs: Token[][],
  tableName: string,
  withoutRowid: boolean,
  ctx: TranslationContext,
  params: ParamState
): Token[][] {
  const outDefs: Token[][] = [];
  let hasIntegerPk = false;
  for (const def of defs) {
    const translated = translateTableDef(def, defs, tableName, withoutRowid, ctx, params);
    if (!translated) continue;
    if (translated.isIntegerPrimaryKey) hasIntegerPk = true;
    outDefs.push(translated.tokens);
  }
  if (ROWID_TABLES.has(tableName.toLowerCase()) && !hasIntegerPk) {
    outDefs.push([{ type: "qident", value: ROWID_COLUMN }, ws(), ...identityTypeTokens()]);
  }
  return outDefs;
}

export function translateCreateTable(
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
  const withoutRowid = tokens.slice(close + 1).some((t) => isWord(t, "WITHOUT"));
  const defs = splitTopLevel(tokens.slice(openIndex + 1, close), ",")
    .map(trimWs)
    .filter((d) => d.length);
  const outDefs = translateTableDefs(defs, tableName, withoutRowid, ctx, params);
  const head = quoteTableName(tokens.slice(0, openIndex), tableIndex);
  const body = joinTokenLists(outDefs);
  return finish("ddl", [render([...head, op("("), ...body, op(")")])], params, [tableName]);
}

function appendIndexedColumns({ rest, out }: ConstraintScan, i: number): number {
  const close = matchingParen(rest, i);
  const inner = rest
    .slice(i + 1, close)
    .map((t) => (isWord(t, "ASC", "DESC", "COLLATE", "NOCASE", "BINARY") ? ws() : t));
  out.push(op("("), ...inner, op(")"));
  return close + 1;
}

function translateTableConstraint(
  def: Token[],
  ctx: TranslationContext,
  params: ParamState
): Token[] | null {
  const scan: ConstraintScan = { rest: def, out: [], ctx, params };
  let i = 0;
  while (i < def.length) {
    const token = def[i];
    const value = upper(token);
    if (value === "FOREIGN") return null;
    if (value === "CHECK") {
      i = appendCheck(scan, i);
      continue;
    }
    const afterConflict = skipOnConflict(def, i);
    if (afterConflict !== null) {
      i = afterConflict;
      continue;
    }
    if (isOp(token, "(")) {
      i = appendIndexedColumns(scan, i);
      continue;
    }
    scan.out.push(token);
    i++;
  }
  return trimWs(scan.out);
}

export function findTableNameIndex(tokens: Token[]): number {
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

export function quoteTableName(tokens: Token[], index: number): Token[] {
  return tokens.map((token, i) =>
    i === index && token.type === "word" ? { type: "qident", value: token.value } : token
  );
}

export function translateCreateIndex(
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

interface AlterTable {
  tokens: Token[];
  tableName: string;
  actionIndex: number;
  ctx: TranslationContext;
  params: ParamState;
}

function alterTablePrefix(tableName: string): Token[] {
  return [word("ALTER"), ws(), word("TABLE"), ws(), { type: "qident", value: tableName }, ws()];
}

function alterStatement(
  tableName: string,
  action: Token[],
  params: ParamState
): TranslatedStatement {
  return finish("ddl", [render([...alterTablePrefix(tableName), ...action])], params, [tableName]);
}

function skipColumnKeyword(tokens: Token[], cursor: number): number {
  return isWord(tokens[cursor], "COLUMN") ? nextIndex(tokens, cursor) : cursor;
}

function translateAddColumn({
  tokens,
  tableName,
  actionIndex,
  ctx,
  params,
}: AlterTable): TranslatedStatement {
  const cursor = skipColumnKeyword(tokens, nextIndex(tokens, actionIndex));
  const def = translateColumnDef(trimWs(tokens.slice(cursor)), false, ctx, params, tableName);
  return alterStatement(
    tableName,
    [
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
    ],
    params
  );
}

function translateDropColumn({
  tokens,
  tableName,
  actionIndex,
  params,
}: AlterTable): TranslatedStatement {
  const cursor = skipColumnKeyword(tokens, nextIndex(tokens, actionIndex));
  const column = identifierName(tokens[cursor]) ?? "";
  return alterStatement(
    tableName,
    [
      word("DROP"),
      ws(),
      word("COLUMN"),
      ws(),
      word("IF"),
      ws(),
      word("EXISTS"),
      ws(),
      { type: "qident", value: column },
    ],
    params
  );
}

function translateRenameTable(
  { tokens, tableName, ctx, params }: AlterTable,
  afterRename: number
): TranslatedStatement {
  const target = identifierName(tokens[nextIndex(tokens, afterRename)]) ?? "";
  const statements = [
    render([
      ...alterTablePrefix(tableName),
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

function translateRename(alter: AlterTable): TranslatedStatement {
  const { tokens, tableName, actionIndex, params } = alter;
  const afterRename = nextIndex(tokens, actionIndex);
  if (isWord(tokens[afterRename], "TO")) return translateRenameTable(alter, afterRename);
  const cursor = skipColumnKeyword(tokens, afterRename);
  const from = identifierName(tokens[cursor]) ?? "";
  const to = identifierName(tokens[nextIndex(tokens, nextIndex(tokens, cursor))]) ?? "";
  return alterStatement(
    tableName,
    [
      word("RENAME"),
      ws(),
      word("COLUMN"),
      ws(),
      { type: "qident", value: from },
      ws(),
      word("TO"),
      ws(),
      { type: "qident", value: to },
    ],
    params
  );
}

export function translateAlterTable(
  tokens: Token[],
  ctx: TranslationContext,
  params: ParamState
): TranslatedStatement {
  const tableIndex = nextIndex(tokens, nextIndex(tokens, 0));
  const tableName = identifierName(tokens[tableIndex]) ?? "";
  const actionIndex = nextIndex(tokens, tableIndex);
  const action = upper(tokens[actionIndex]);
  const alter: AlterTable = { tokens, tableName, actionIndex, ctx, params };
  if (action === "ADD") return translateAddColumn(alter);
  if (action === "DROP") return translateDropColumn(alter);
  if (action === "RENAME") return translateRename(alter);
  return finish("ddl", [render(applyExpressionRules(tokens, ctx, params))], params, [tableName]);
}
