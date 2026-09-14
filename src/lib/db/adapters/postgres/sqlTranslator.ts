import {
  identifierName,
  isOp,
  isWord,
  nextIndex,
  render,
  tokenize,
  trimWs,
  ws,
  type Token,
} from "./sqlTokenizer";
import {
  finish,
  SqliteEmulationError,
  type StatementKind,
  type TranslationContext,
  type TranslatedStatement,
  type ParamState,
} from "./translationCore";
import { upper, collectTableRefs, applyExpressionRules } from "./sqlExpressions";
import {
  translateCreateTable,
  translateCreateIndex,
  translateAlterTable,
  findTableNameIndex,
  quoteTableName,
} from "./sqlDdl";
import { fitIdentifier, translateTrigger, triggerFunctionName } from "./triggerTranslator";
import { translateInsert, translateTransaction, translateUpdateOrDelete } from "./sqlDml";
export {
  ROWID_COLUMN,
  SqliteEmulationError,
  type TableSchema,
  type TranslatedStatement,
  type TranslationContext,
} from "./translationCore";

type StatementHandler = (
  tokens: Token[],
  ctx: TranslationContext,
  params: ParamState
) => TranslatedStatement;

function translatePragma(tokens: Token[], _ctx: TranslationContext, params: ParamState) {
  const result = finish("pragma", [], params, []);
  result.pragma = render(trimWs(tokens.slice(1)));
  return result;
}

function translateNoop(_tokens: Token[], _ctx: TranslationContext, params: ParamState) {
  return finish("noop", [], params, []);
}

function translateAnalyze(_tokens: Token[], _ctx: TranslationContext, params: ParamState) {
  return finish("other", ["ANALYZE"], params, []);
}

function translateTransactionStatement(
  tokens: Token[],
  _ctx: TranslationContext,
  params: ParamState
) {
  return translateTransaction(tokens, params);
}

function translateCreateVirtualTable(tokens: Token[]): never {
  const usingIndex = tokens.findIndex((t) => isWord(t, "USING"));
  const moduleName = tokens[nextIndex(tokens, usingIndex)]?.value ?? "unknown";
  throw new SqliteEmulationError(`no such module: ${moduleName}`);
}

function translateCreateTrigger(tokens: Token[], ctx: TranslationContext, params: ParamState) {
  const result = translateTrigger(
    tokens,
    (bodySql) => translateStatement(bodySql, ctx),
    (expr) => render(applyExpressionRules(tokenize(expr), ctx, { names: [], positional: 0 }))
  );
  return finish("ddl", result.statements, params, [result.table]);
}

function translateCreateView(tokens: Token[], ctx: TranslationContext, params: ParamState) {
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

const CREATE_HANDLERS = new Map<string, StatementHandler>([
  ["VIRTUAL", translateCreateVirtualTable],
  ["TRIGGER", translateCreateTrigger],
  ["TABLE", translateCreateTable],
  ["INDEX", translateCreateIndex],
  ["VIEW", translateCreateView],
]);

function translateCreate(tokens: Token[], ctx: TranslationContext, params: ParamState) {
  let cursor = nextIndex(tokens, 0);
  if (isWord(tokens[cursor], "TEMP", "TEMPORARY", "UNIQUE")) cursor = nextIndex(tokens, cursor);
  const handler = CREATE_HANDLERS.get(upper(tokens[cursor]));
  if (handler) return handler(tokens, ctx, params);
  return finish("ddl", [render(applyExpressionRules(tokens, ctx, params))], params, []);
}

function translateDrop(tokens: Token[], _ctx: TranslationContext, params: ParamState) {
  const kind = upper(tokens[nextIndex(tokens, 0)]);
  const name = identifierName(tokens[findTableNameIndex(tokens)]) ?? "";
  const ifExists = tokens.some((t) => isWord(t, "IF")) ? "IF EXISTS " : "";
  switch (kind) {
    case "TRIGGER":
      return finish(
        "ddl",
        [`DROP FUNCTION IF EXISTS "${triggerFunctionName(name)}"() CASCADE`],
        params,
        []
      );
    case "TABLE":
      return finish("ddl", [`DROP TABLE ${ifExists}"${name}" CASCADE`], params, [name]);
    case "INDEX":
      return finish("ddl", [`DROP INDEX ${ifExists}"${fitIdentifier(name)}"`], params, []);
    case "VIEW":
      return finish("ddl", [`DROP VIEW ${ifExists}"${name}" CASCADE`], params, [name]);
    default:
      return finish("ddl", [render(tokens)], params, []);
  }
}

function translateUpdate(tokens: Token[], ctx: TranslationContext, params: ParamState) {
  return translateUpdateOrDelete(tokens, "update", ctx, params);
}

function translateDelete(tokens: Token[], ctx: TranslationContext, params: ParamState) {
  return translateUpdateOrDelete(tokens, "delete", ctx, params);
}

function withStatementKind(tokens: Token[]): StatementKind {
  const has = (name: string) => tokens.some((t) => isWord(t, name));
  if (has("INSERT")) return "insert";
  if (has("UPDATE")) return "update";
  if (has("DELETE")) return "delete";
  return "select";
}

function translateWith(tokens: Token[], ctx: TranslationContext, params: ParamState) {
  const refs = collectTableRefs(tokens);
  const body = applyExpressionRules(tokens, ctx, params);
  return finish(withStatementKind(tokens), [render(body)], params, refs.all);
}

function translateExplain(tokens: Token[], ctx: TranslationContext) {
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

function translateSelect(tokens: Token[], ctx: TranslationContext, params: ParamState) {
  const refs = collectTableRefs(tokens);
  return finish("select", [render(applyExpressionRules(tokens, ctx, params))], params, refs.all);
}

function translateOther(tokens: Token[], ctx: TranslationContext, params: ParamState) {
  const second = upper(tokens[nextIndex(tokens, 0)]);
  if (second === "") return finish("other", [render(tokens)], params, []);
  return finish("other", [render(applyExpressionRules(tokens, ctx, params))], params, []);
}

const STATEMENT_HANDLERS = new Map<string, StatementHandler>([
  ["PRAGMA", translatePragma],
  ["VACUUM", translateNoop],
  ["REINDEX", translateNoop],
  ["ATTACH", translateNoop],
  ["DETACH", translateNoop],
  ["ANALYZE", translateAnalyze],
  ["BEGIN", translateTransactionStatement],
  ["COMMIT", translateTransactionStatement],
  ["END", translateTransactionStatement],
  ["ROLLBACK", translateTransactionStatement],
  ["SAVEPOINT", translateTransactionStatement],
  ["RELEASE", translateTransactionStatement],
  ["CREATE", translateCreate],
  ["DROP", translateDrop],
  ["ALTER", translateAlterTable],
  ["INSERT", translateInsert],
  ["REPLACE", translateInsert],
  ["UPDATE", translateUpdate],
  ["DELETE", translateDelete],
  ["WITH", translateWith],
  ["EXPLAIN", translateExplain],
  ["SELECT", translateSelect],
  ["VALUES", translateSelect],
]);

export function translateStatement(sql: string, ctx: TranslationContext): TranslatedStatement {
  const params: ParamState = { names: [], positional: 0 };
  const tokens = trimWs(tokenize(sql));
  if (tokens.length === 0) return finish("noop", [], params, []);
  if (isOp(tokens[tokens.length - 1], ";")) tokens.pop();
  const handler = STATEMENT_HANDLERS.get(upper(tokens[0])) ?? translateOther;
  return handler(tokens, ctx, params);
}
