# Merge Queue & Manual Merge-Train Runbook (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Desde a v3.8.49 (WS3.2/WS3.4 do plano de qualidade/velocidade), o caminho de merge padrão para
PRs revisados em `release/vX.Y.Z` é a **fila de merge do Mergify** (`.mergify.yml`);
o **merge train manual** documentado abaixo é o FALLBACK — usado durante incidentes,
congelamentos de release ou caso o plano Open Source do Mergify venha a mudar.

## Caminho padrão: a fila do Mergify

1. O PR é revisado/aprovado pelas campanhas e aprovado pelo gate ⭐ pré-merge do
   proprietário (o relatório + a decisão por item — consulte `/merge-prs`, Etapa 0.75).
2. O proprietário (ou a sessão agindo com base na decisão do proprietário) aplica o
   rótulo **`queue`**. O rótulo É a aprovação do merge; o Mergify apenas a executa.
3. O Mergify agrupa até 10 PRs enfileirados, valida o lote nos fast-gates e faz o
   merge (squash). Um lote vermelho é **dividido automaticamente por bisseção** — o PR
   causador é isolado em aproximadamente log2(N) revalidações e removido da fila; os
   demais prosseguem.
4. Após o merge, o workflow contínuo release-green valida a nova ponta após o push
   e abre uma issue de atribuição caso a combinação tenha causado uma regressão
   (nunca faz auto-revert).

Proteções (refletem as Regras Rígidas nº 21/22 de `CLAUDE.md`):

- **Congelamento de release aberto** → NÃO rotule PRs direcionados à branch congelada;
  primeiro, redirecione-os para a `release/vX+1` ativa.
- **PR em andamento de outra sessão** → nunca o rotule; somente a sessão proprietária
  enfileira o próprio trabalho.
- Diffs apenas de testes e PRs com o rótulo `hotfix` já executam CI reduzida (consulte
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); as condições da fila aceitam qualquer
  conjunto de verificações que tenha sido efetivamente executado (`#check-failure=0`
  - `#check-pending=0`).

## Fallback: o merge train manual

Usado quando a fila está indisponível. Isso formaliza a prática que processou 33 PRs
em um dia durante o ciclo da v3.8.47:

1. **Monte o lote** (~10–30 PRs revisados+aprovados). Verifique colisões de `linked:`
   (mesmos `tap.testFiles`, mesmos trechos do CHANGELOG) e serialize esses casos.
2. **Valide UMA VEZ**: em uma worktree isolada a partir da ponta da release, faça
   localmente o merge de todos os heads do lote e, em seguida, execute a suíte
   equivalente à da release (`npm run check:release-green`; adicione `--with-build`
   antes de uma release). `scripts/release/merge-train.sh <base> <PR#>…` automatiza
   as etapas 1–2 (PRs conflitantes são ejetados e o train continua). O modo completo
   executa `npm run test:unit` — o executor ajustado para a máquina
   (`--test-concurrency=20`), **não** os dois shards sequenciais de CI com 4 núcleos,
   que faziam a fase dominante usar apenas ~25% de uma máquina de 16 núcleos
   (corrigido em 2026-07-18). `--fast` (processamento de mega-trains intradiários,
   aprovado pelo proprietário em 2026-07-18) mantém todos os gates estáticos + vitest,
   mas executa apenas os arquivos node:test alterados pelos PRs embarcados; a suíte
   COMPLETA ainda deve ser executada ao menos uma vez por dia na ponta acumulada
   (um train sem `--fast`).
3. **Verde** → faça o merge dos PRs em sequência (verificando novamente
   `state,headRefOid` antes de cada um — um PR cujo head tenha mudado retorna à
   revisão). Comprove que o diff líquido de cada merge corresponde à alteração do
   próprio PR (sem reverts por resolução automática: audite `git diff --stat` em
   busca de exclusões fora do escopo).
4. **Vermelho** → divida o lote em metades por bisseção (valide cada metade), em vez
   de revalidar um a um; devolva o PR causador à fila de revisão com as evidências.
5. **Nunca**: faça merge durante um congelamento na branch congelada; use `git stash`
   em qualquer lugar; execute novamente toda a CI esperando que um vermelho
   desapareça (regra: um vermelho é informação).

## Níveis (por que a fila é segura apenas com fast-gates)

- **Por PR** (fast-gates de quality.yml): testes afetados pela TIA + suíte unitária
  completa em 4 shards + vitest + conjunto de lint + typecheck + integridade da
  documentação/do changelog.
- **Por lote/ponta** (release-green contínuo): gates RÍGIDOS com `--quick` a cada push
  para a branch de release; varreduras completas com `--with-build --full-ci` 3×/dia.
- **Por release** (ci.yml no PR de release): a matriz completa, incluindo E2E ×9,
  artefato do pacote + boot-smoke do tarball, cobertura/ratchets.

Nada é validado menos do que antes — a superfície pesada apenas é executada por
lote/ponta, em vez de por PR, e é isso que elimina as idas e vindas O(N).
