import test from "node:test";
import assert from "node:assert/strict";
import { preserveIcuLiteralQuotes } from "../../scripts/i18n/lib/translate-backend.mjs";

// The English catalog escapes angle placeholders for ICU: the single quotes in
// '<name>' make the span literal text. Translation backends drop them, and the
// message then parses as an unclosed ICU tag — every locale added in batch 1
// shipped two such strings before CI caught them.
test("re-escapes an angle span the translation left bare", () => {
  assert.equal(
    preserveIcuLiteralQuotes(
      "Regenerate ~/.claude/profiles/'<name>'/settings.json",
      "Regenerar ~/.claude/profiles/<nome>/settings.json"
    ),
    "Regenerar ~/.claude/profiles/'<nome>'/settings.json"
  );
});

test("doubles an apostrophe inside the span, which would close the literal early", () => {
  assert.equal(
    preserveIcuLiteralQuotes("'<your OmniRoute API key>'", "<teie OmniRoute'i API-võti>"),
    "'<teie OmniRoute''i API-võti>'"
  );
});

test("leaves a translation that already carries the quotes untouched", () => {
  const already = "'<seu token>'";
  assert.equal(preserveIcuLiteralQuotes("'<your token>'", already), already);
});

test("does not touch messages whose English has a real unquoted tag", () => {
  // <b> here is markup the translation must keep as markup, not literal text.
  const translated = "Clique em <b>Salvar</b> e em '<nome>'";
  assert.equal(preserveIcuLiteralQuotes("Click <b>Save</b> and '<name>'", translated), translated);
});

test("leaves messages without angle spans alone", () => {
  assert.equal(preserveIcuLiteralQuotes("Settings", "Nastavitve"), "Nastavitve");
  assert.equal(
    preserveIcuLiteralQuotes("Restricted to {count} endpoints", "Omejeno na {count} točk"),
    "Omejeno na {count} točk"
  );
});
