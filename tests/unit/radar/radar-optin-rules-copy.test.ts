import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import i18nConfig from "../../../config/i18n.json" with { type: "json" };

function radarCopy(locale: "en" | "pt-BR"): Record<string, string> {
  const file = path.resolve(process.cwd(), `src/i18n/messages/${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(file, "utf8")) as {
    radarPage?: Record<string, unknown>;
  };
  assert.ok(messages.radarPage, `${locale}: missing radarPage messages`);
  return messages.radarPage as Record<string, string>;
}

const ENGLISH_RULES = {
  accessScaleTitle: "Understand Radar access before activating",
  accessScaleIntro:
    "Radar stays network-inert until you opt in. Choose Community access or activate a personal supporter key after reviewing these rules.",
  accessCommunityRule: "Community — no key required: the complete catalog with a 30-day delay.",
  accessSingleUseRule:
    "Star + follow — after GitHub OAuth verifies both, your GitHub account receives one live catalog read; then access returns to Community. This one-time access cannot be reissued for that account.",
  accessContributorRule:
    "Contributors — merged PRs, commits, and lines only order the weekly ranking. Top 10 receive 365 days; ranks 11–100 receive 90 days; contributors outside the Top 100 receive no grant regardless of PR count. Leaving the ranking never shortens time already granted.",
  accessSupporterRule:
    "Supporters — one-time purchases grant 6 months, 1 year, or lifetime with no automatic renewal. Purchases, donations, contributor periods, and manual grants accumulate; lifetime always prevails.",
  accessUseTitle: "Personal use, recovery, and review",
  accessInstallationRule:
    "Personal license — use the key on one active installation at a time. OmniRoute does not fingerprint hardware. Recovery revokes and replaces a lost key without resetting its expiration.",
  accessAbuseRule:
    "Abuse review — the 4th distinct IP in 24 hours creates a manual review flag only; it never blocks or revokes a key automatically.",
  accessOffersRule: "Live offers are manually curated and may change or expire.",
  privacyTitle: "What Radar exchanges",
  privacyDownloadsRule:
    "Downloads — your installation receives cryptographically signed catalog and referral metadata; a valid live key also unlocks signed offers and Intel.",
  privacySendsRule:
    "Sends — server-side sync sends the supporter key as a Bearer token, and the HTTPS infrastructure receives the connection IP. Feed-request accounting stores neither value raw: it keeps key hashes, aggregate usage, and a daily rotating truncated IP HMAC for abuse review.",
  privacyNeverRule:
    "Never collected — prompts, responses, conversations, provider credentials, model traffic, uptime, latency, and local provider configuration are never sent to Radar.",
} as const;

const PORTUGUESE_RULES = {
  accessScaleTitle: "Entenda o acesso ao Radar antes de ativar",
  accessScaleIntro:
    "O Radar permanece sem fazer chamadas de rede até você aceitar o opt-in. Depois de revisar estas regras, escolha o acesso Comunidade ou ative uma chave pessoal de apoiador.",
  accessCommunityRule: "Comunidade — sem chave: catálogo completo com 30 dias de atraso.",
  accessSingleUseRule:
    "Estrela + seguir — depois que o GitHub OAuth confirmar as duas ações, sua conta do GitHub recebe uma única leitura do catálogo ao vivo; depois o acesso volta para Comunidade. Esse acesso único não pode ser reemitido para essa conta.",
  accessContributorRule:
    "Contribuidores — PRs mergeadas, commits e linhas servem somente para ordenar o ranking semanal. Top 10 recebem 365 dias; posições 11–100 recebem 90 dias; fora do Top 100 não há concessão, independentemente da quantidade de PRs. Sair do ranking nunca encurta o período já concedido.",
  accessSupporterRule:
    "Apoiadores — compras únicas concedem 6 meses, 1 ano ou acesso vitalício, sem renovação automática. Compras, doações, períodos de contribuidor e concessões manuais se acumulam; o vitalício sempre prevalece.",
  accessUseTitle: "Uso pessoal, recuperação e revisão",
  accessInstallationRule:
    "Licença pessoal — use a chave em uma instalação ativa por vez. O OmniRoute não cria fingerprint de hardware. A recuperação revoga e substitui uma chave perdida sem reiniciar a validade.",
  accessAbuseRule:
    "Revisão de abuso — o 4º IP distinto em 24 horas cria somente uma sinalização para revisão manual; nunca bloqueia nem revoga a chave automaticamente.",
  accessOffersRule: "As ofertas ao vivo passam por curadoria manual e podem mudar ou expirar.",
  privacyTitle: "O que o Radar troca com o serviço",
  privacyDownloadsRule:
    "Download — sua instalação recebe metadados assinados criptograficamente de catálogo e indicações; uma chave ao vivo válida também libera ofertas e Intel assinados.",
  privacySendsRule:
    "Envio — a sincronização server-side envia a chave de apoiador como token Bearer, e a infraestrutura HTTPS recebe o IP da conexão. A contabilidade das requisições não guarda nenhum dos dois em formato bruto: mantém hashes de chave, uso agregado e um HMAC truncado do IP com rotação diária para revisão de abuso.",
  privacyNeverRule:
    "Nunca coletado — prompts, respostas, conversas, credenciais de provedores, tráfego de modelos, uptime, latência e configuração local de provedores nunca são enviados ao Radar.",
} as const;

test("English Radar opt-in copy states the complete D32 contract without a PR-count grant", () => {
  const copy = radarCopy("en");

  for (const [key, expected] of Object.entries(ENGLISH_RULES)) {
    assert.equal(copy[key], expected, `en: radarPage.${key}`);
  }

  const allRadarCopy = Object.values(copy).join("\n");
  assert.doesNotMatch(
    allRadarCopy,
    /(?:5\+|five or more|\d+\+?)\s+merged pull requests.{0,100}(?:key|grant|unlock|access)/i,
    "en: a fixed number of merged PRs must never grant Radar access"
  );
});

test("Brazilian Portuguese Radar opt-in copy states D32 without a PR-count grant", () => {
  const copy = radarCopy("pt-BR");

  for (const [key, expected] of Object.entries(PORTUGUESE_RULES)) {
    assert.equal(copy[key], expected, `pt-BR: radarPage.${key}`);
  }

  const allRadarCopy = Object.values(copy).join("\n");
  assert.doesNotMatch(
    allRadarCopy,
    /(?:5\+|cinco ou mais|\d+\+?)\s+(?:PRs?|pull requests?).{0,100}(?:chave|concessão|libera|acesso)/i,
    "pt-BR: uma quantidade fixa de PRs nunca pode conceder acesso ao Radar"
  );
  assert.equal(copy.activateButton, "Ativar Comunidade");
  assert.equal(copy.activateWithKeyButton, "Ativar como apoiador");
  assert.equal(copy.contributorButton, "Sou contribuidor");
  assert.equal(copy.supporterButton, "Apoiar o projeto");
});

test("every UI locale carries the D32 keys and none retains the superseded 5+ PR promise", () => {
  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");
  const files = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));
  assert.equal(
    files.length,
    i18nConfig.locales.length,
    `expected the complete ${i18nConfig.locales.length}-locale UI catalog`
  );

  for (const file of files) {
    const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf8")) as {
      radarPage?: Record<string, unknown>;
    };
    const copy = messages.radarPage;
    assert.ok(copy, `${file}: missing radarPage messages`);
    for (const key of Object.keys(ENGLISH_RULES)) {
      assert.equal(typeof copy[key], "string", `${file}: radarPage.${key} must be a string`);
      assert.ok((copy[key] as string).length > 0, `${file}: radarPage.${key} must not be empty`);
    }
    assert.doesNotMatch(
      String(copy.contributorHint),
      /5\+\s+(?:merged pull requests|PRs?)/i,
      `${file}: contributorHint still contains the superseded fixed-PR grant`
    );
    for (const removedKey of ["privacyNoUpload", "privacyOnlySigned", "privacyLocalOnly"]) {
      assert.ok(!(removedKey in copy), `${file}: ${removedKey} is superseded and must be removed`);
    }
  }
});
