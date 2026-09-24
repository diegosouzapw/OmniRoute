# Release-Green: keeping the queue and release branch green (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## O problema que isso resolve

O **gate completo** (`.github/workflows/ci.yml` — shards de testes unitários, vitest, ratchets,
`package-artifact`, SonarQube, E2E) é executado **apenas no PR de release** (PR → `main`). PRs direcionados
a `release/**` recebem os **fast-gates** (`quality.yml`: testes impactados por TIA + verificação de tipos + lint)
e, para alterações de código, um build de produção **consultivo**. Consequência: falhas exclusivas de release ainda podem
se acumular silenciosamente na branch de release e **explodir em etapas de aproximadamente 40 min** no momento da release,
uma de cada vez.

A "família release-green" existe para **antecipar** essas falhas — validar o equivalente ao gate completo
**localmente / fora da release**, a qualquer momento, para que o PR de release já esteja
verde em sua primeira execução de CI.

> **Princípio inegociável:** nada disso bloqueia o contribuidor. Não adicionamos uma verificação obrigatória
> que faça o PR dele falhar. O **drift** (ratchets) cabe ao mantenedor recalibrar na release —
> nunca é uma preocupação do contribuidor. Nenhuma parte **fecha** um PR (roubo de crédito), nem
> **enfraquece** um teste para fazê-lo passar.

## A família (4 partes) — e como cada uma é executada de forma independente

| Parte                                                                     | O que é                                                                                   | Quando executar                                                                                 | Escopo                                  |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------- |
| **`/green-prs`** (Solução A)                                              | Varredura sob demanda, pelo mantenedor, da **fila de PRs abertos**                        | **Independentemente, de forma periódica** — e especialmente **antes** de um `/generate-release` | Toda a fila de PRs → `release/**`       |
| **`/validate-release-green`** (Solução C — `npm run check:release-green`) | Mecanismo de validação: reproduz o gate completo em uma branch OU em um candidato a merge | Independentemente, a qualquer momento                                                           | Uma branch específica ou um PR de merge |
| **`/babysit <PR#>`**                                                      | Conduz a **CI ativa** de **um** PR até ficar verde                                        | Independentemente, por PR                                                                       | Um único PR                             |
| **`nightly-release-green.yml`** (Solução D)                               | Workflow noturno automatizado; abre uma issue em caso de falha GRAVE                      | Automático (cron)                                                                               | A branch de release ativa               |

**Resposta curta para "isso serve apenas para releases?":** **não.** `/green-prs` foi projetado para
ser executado **periodicamente, entre releases**. Executá-lo de forma independente é o uso normal — a release é apenas
o momento em que sua execução gera mais valor.

## Build consultivo de PR para release

`quality.yml` agora inclui `Build (advisory)` para PRs de código que não sejam rascunhos e branches da fila do Mergify.
Ele replica a receita de build de produção de `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` e `npm run build` com `OMNIROUTE_USE_TURBOPACK=1`. Intencionalmente,
ele não faz upload de um artefato de build, pois nenhum job de qualidade subsequente consome um neste workflow.
Remova `continue-on-error` após uma semana de execuções estáveis de PRs de release para que o sinal se torne um
gate bloqueante de PR para release.

## Solução C — `npm run check:release-green` (o mecanismo)

Reproduz a validação equivalente à de release na árvore de trabalho atual e classifica cada resultado vermelho:

- **HARD** (verificação de tipos, erros de lint, testes unitários, vitest, db-rules, public-creds,
  `package-artifact` opcional) → **defeito real**; `exit 1`. Corrigido na branch de origem (TDD, Regra nº 18).
- **DRIFT** (**avisos** do eslint, complexidade cognitiva, tamanho de arquivo) → desvio incremental acumulado no
  ciclo, **não é culpa do colaborador**; ele é apenas relatado e **tem sua linha de base redefinida pelo mantenedor no
  release**. DRIFT **nunca** altera o código de saída — portanto, nunca bloqueia ninguém.

```bash
npm run check:release-green                 # branch atual (árvore de trabalho)
node scripts/quality/validate-release-green.mjs --json   # saída estruturada
node scripts/quality/validate-release-green.mjs --quick  # ignora unit+vitest (somente drift+verificação de tipos+lint)
node scripts/quality/validate-release-green.mjs --with-build  # inclui package-artifact (lento)
```

Apenas diagnostica e **relata** (sem correção automática). A orquestração para corrigir até ficar verde reside em
`/green-prs` e `/review-prs`.

## Solução A — `/green-prs` (a varredura da fila)

Procedimento (resumo — consulte a skill `green-prs` para obter detalhes):

1. **Inventarie** a fila de PRs abertos em relação à branch de release ativa.
2. **Faça a triagem** de cada PR (viável / passível de rejeição / precisa do autor) — os casos de rejeição/que precisam do autor são
   **relatados, não fechados** (o autor decide).
3. Para cada PR viável, em uma **árvore de trabalho isolada** (Regra nº 19), atualize o PR até a ponta da branch de release e execute
   `npm run check:release-green`:
   - **HARD** → corrija **na branch do colaborador** por meio de coautoria (preserva o status "Merged" do autor),
     execute novamente até que todos os HARDs sejam resolvidos.
   - **DRIFT** → deixe como está; sua linha de base será redefinida no release.
4. **Relate** uma tabela PR × (veredito, resultados HARD vermelhos, corrigido?, DRIFT, release verde agora?).

Pode **preparar** a fila sem realizar merges; só faz merge quando solicitado explicitamente — e nunca fecha um PR.

## Cadência recomendada

- Execute **`/green-prs` periodicamente** (por exemplo, semanalmente) e **sempre antes de um
  `/generate-release`**.
- Mantenha **`nightly-release-green.yml`** (Solução D) como um sinal contínuo: quando ele abrir uma
  issue por um resultado HARD vermelho, é hora de realizar uma varredura.
- Use **`/validate-release-green`** sob demanda para verificar uma branch ou um candidato específico a merge.
- Use **`/babysit <PR#>`** quando um PR específico precisar ser conduzido até ficar verde no CI ativo.

## Relação com o release

- `/generate-release` chama a validação na **Fase 0 (pré-verificação)**: redefine a linha de base de DRIFT e corrige
  HARD antes de abrir o PR de release.
- `/review-prs` usa o gate de release verde na etapa de decisão de merge (verde antes do merge).

O objetivo de todas as partes é o mesmo: **um PR de release verde na primeira execução do CI**, em vez de enfrentar
resultados vermelhos em camadas de 40 minutos no dia do release.
