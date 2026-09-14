import { isOp, matchingParen, type Token } from "./sqlTokenizer";
import { TEXT_TYPES, INT_TYPES, REAL_TYPES, BLOB_TYPES } from "./translationCore";

export const CONSTRAINT_WORDS = new Set([
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

export function mapColumnType(typeWords: string[]): string {
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

export interface ColumnTypeScan {
  typeWords: string[];
  end: number;
}

export function scanColumnType(def: Token[]): ColumnTypeScan {
  const typeWords: string[] = [];
  let i = 1;
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
  return { typeWords, end: i };
}
