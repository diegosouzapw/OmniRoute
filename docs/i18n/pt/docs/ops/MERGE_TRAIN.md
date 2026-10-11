# Merge Queue & Manual Merge-Train Runbook (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Desde a v3.8.49 (WS3.2/WS3.4 do plano de qualidade/velocidade), o caminho de integração predefinido para
PRs revistos em `release/vX.Y.Z` é a **fila de integração do Mergify** (`.mergify.yml`);
o **comboio de integração manual** documentado abaixo é a ALTERNATIVA — utilizado durante incidentes,
congelamentos de versões ou caso o plano Open Source do Mergify venha a mudar.

## Caminho predefinido: a fila do Mergify

1. O PR é revisto/validado pelas campanhas e aprovado pela barreira ⭐ de pré-fusão
   do proprietário (o relatório + a decisão por item — consulte o Passo 0.75 de `/merge-prs`).
2. O proprietário (ou a sessão que atua com base na decisão do proprietário) aplica a
   etiqueta **`queue`**. A etiqueta É a aprovação da fusão; o Mergify limita-se a executá-la.
3. O Mergify valida os PRs em fila **sequencialmente** (um de cada vez) relativamente
   às verificações rápidas e efetua a fusão (squash). O processamento em lotes + a
   bisseção automática fazem parte de um nível pago do Mergify ("Cannot use Merge
   Queue batch" no plano gratuito, #7220), pelo que `.mergify.yml` não define qualquer
   `batch_size`; o processamento em lotes continua a ser tarefa do comboio de fusão
   manual abaixo. Um PR cujas verificações ainda estejam pendentes após
   `checks_timeout` (240 min = 2× o p95 medido de `quality.yml`) é removido da fila,
   em vez de a bloquear.
4. Após a fusão, o fluxo de trabalho contínuo de validação da versão valida a nova
   ponta após o push e abre um issue de atribuição se a combinação tiver introduzido
   uma regressão (nunca efetua uma reversão automática).

Proteções (refletem as Regras Rígidas #21/#22 de `CLAUDE.md`):

- **Congelamento da versão ativo** → NÃO aplique etiquetas a PRs destinados ao ramo
  congelado; redirecione-os primeiro para o `release/vX+1` ativo.
- **PR em curso de outra sessão** → nunca lhe aplique uma etiqueta; apenas a sessão
  proprietária coloca o seu próprio trabalho na fila.
- As alterações apenas a testes e os PRs com a etiqueta `hotfix` já executam CI
  reduzida (consulte `RELEASE_CHECKLIST.md` → Via Rápida de Hotfix); as condições da
  fila aceitam qualquer conjunto de verificações que tenha sido efetivamente
  executado (`#check-failure=0` + `#check-pending=0`).

## Alternativa: o comboio de integração manual

Utilizado quando a fila não está disponível. Isto formaliza a prática que processou 33 PRs num
só dia durante o ciclo da v3.8.47:

1. **Prepare o lote** (~10–30 PRs revistos+aprovados). Verifique colisões em `linked:`
   (os mesmos `tap.testFiles`, os mesmos trechos do CHANGELOG) e processe-os sequencialmente.
2. **Valide UMA VEZ**: num worktree isolado a partir da ponta da versão, integre localmente todas as
   cabeças do lote e, em seguida, execute o conjunto equivalente ao da versão
   (`npm run check:release-green`, adicionando `--with-build` antes de uma versão).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiza os passos 1–2 (os PRs em conflito
   são ejetados e o comboio prossegue). O modo completo executa `npm run test:unit` — o
   executor otimizado para a máquina (`--test-concurrency=20`), **não** os dois shards sequenciais
   de CI com 4 núcleos, que faziam com que a fase dominante utilizasse apenas ~25% de uma máquina
   com 16 núcleos (corrigido em 2026-07-18). `--fast` (processamento de megacomboios no mesmo dia,
   aprovado pelo proprietário em 2026-07-18) mantém todas as barreiras estáticas + vitest, mas executa
   apenas os ficheiros node:test alterados pelos PRs embarcados; o conjunto COMPLETO tem, ainda assim,
   de ser executado pelo menos uma vez por dia na ponta acumulada (um comboio sem `--fast`).
3. **Válido** → integre os PRs sequencialmente (voltando a verificar `state,headRefOid` antes de cada um —
   um PR cuja cabeça tenha mudado volta a entrar em revisão). Comprove que o diff líquido de cada integração
   corresponde à alteração do próprio PR (sem reversões por resolução automática: audite `git diff --stat`
   para detetar eliminações fora do âmbito).
4. **Com falhas** → divida o lote sucessivamente ao meio (validando cada metade), em vez de voltar a validar
   um a um; devolva o PR problemático à fila de revisão juntamente com as provas.
5. **Nunca**: integre no ramo congelado durante um congelamento; utilize `git stash` em qualquer lado;
   volte a executar indiscriminadamente a CI na esperança de que uma falha desapareça (regra: uma falha é informação).

## Níveis (por que motivo a fila é segura apenas com verificações rápidas)

- **Por PR** (verificações rápidas de quality.yml): testes afetados segundo a TIA + conjunto completo de testes
  unitários em 4 shards + vitest + conjunto de verificações lint + verificação de tipos + integridade da documentação/CHANGELOG.
- **Por lote/ponta** (validação contínua da versão): barreiras OBRIGATÓRIAS `--quick` em cada push para
  o ramo da versão; execuções completas com `--with-build --full-ci` 3×/dia.
- **Por versão** (ci.yml no PR da versão): a matriz completa, incluindo E2E ×9,
  artefacto de pacote + teste rápido de arranque do tarball, cobertura/limiares progressivos.

Nada é menos validado do que anteriormente — a superfície pesada é simplesmente executada por lote/ponta,
em vez de por PR, o que elimina as viagens de ida e volta O(N).

## Pré-requisitos de um checkout novo para `merge-train.sh`

O script executa uma **pré-verificação** com falha imediata no checkout raiz (antes de qualquer trabalho
no worktree), para que uma instalação danificada nunca possa fazer-se passar por um comboio com falhas:

1. Execute `npm ci` e, em seguida, o postinstall de `bun` que o npm bloqueia:
   `(cd node_modules/bun && node install.js)` — caso contrário, `check:provider-consistency`
   e `check:known-symbols` (ambos `bun scripts/…`) falham tanto no comboio COMO na base,
   sem qualquer linha de violação.
2. Não pode existir um `node_modules/node_modules` perdido (uma árvore de dependências duplicada; o React é
   carregado duas vezes e os conjuntos de testes vitest da interface falham imediatamente).
3. `node_modules/.bin/tsc` tem de estar presente e ser executável (uma instalação parcial não o inclui).

O comboio executa o `npm run check:cycles:ratchet` bloqueante; o simples `npm run check:cycles`
é informativo (lista os SCCs e termina com um código diferente de zero, mesmo numa base íntegra).
