# Release-Green: keeping the queue and release branch green (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## O problema que isto resolve

O **gate completo** (`.github/workflows/ci.yml` — shards de testes unitários, vitest, ratchets,
`package-artifact`, SonarQube, E2E) é executado **apenas no PR de release** (PR → `main`). Os PRs direcionados
para `release/**` recebem os **fast-gates** (`quality.yml`: testes afetados por TIA + verificação de tipos + lint)
e, no caso de alterações de código, uma compilação de produção **consultiva**. Consequência: as falhas exclusivas
da release podem continuar a acumular-se silenciosamente no ramo de release e **explodir em camadas de ~40 min**
aquando da release, uma de cada vez.

A «família release-green» existe para **antecipar** essas falhas — validar o equivalente ao gate completo
**localmente / fora da release**, a qualquer momento, para que o PR de release esteja
verde logo na sua primeira execução de CI.

> **Princípio não negociável:** nada disto bloqueia o contribuidor. Não adicionamos uma verificação obrigatória
> que faça o respetivo PR falhar. O **desvio** (ratchets) cabe ao responsável de manutenção recalibrar aquando da release —
> nunca é uma preocupação do contribuidor. Nenhuma parte **fecha** um PR (roubo de crédito), nem
> **enfraquece** um teste para que passe.

## A família (4 componentes) — e como cada um é executado de forma independente

| Componente                                                                | O que é                                                                        | Quando executar                                                                         | Âmbito                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------ |
| **`/green-prs`** (Solução A)                                              | Análise a pedido pelo responsável de manutenção da **fila de PRs abertos**     | **De forma independente e periódica** — e sobretudo **antes** de um `/generate-release` | Fila completa de PRs → `release/**`  |
| **`/validate-release-green`** (Solução C — `npm run check:release-green`) | Motor de validação: reproduz o gate completo num ramo OU num candidato a merge | De forma independente, a qualquer momento                                               | Um ramo específico ou um PR de merge |
| **`/babysit <PR#>`**                                                      | Conduz o **CI em tempo real** de **um** PR até ficar verde                     | De forma independente, por PR                                                           | Um único PR                          |
| **`nightly-release-green.yml`** (Solução D)                               | Workflow noturno automatizado; abre um issue em caso de falha HARD             | Automaticamente (cron)                                                                  | O ramo de release ativo              |

**Resposta curta à pergunta «isto destina-se apenas a releases?»:** **não.** `/green-prs` foi concebido para
ser executado **periodicamente, entre releases**. A execução independente é a utilização normal — a release é apenas
o momento em que executá-lo proporciona mais valor.

## Compilação consultiva entre PR e lançamento

`quality.yml` inclui agora `Build (advisory)` para PRs de código que não estejam em rascunho e branches da fila do Mergify.
Replica o procedimento de compilação de produção de `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` e `npm run build` com `OMNIROUTE_USE_TURBOPACK=1`. Intencionalmente,
não carrega um artefacto de compilação, porque nenhum job de qualidade subsequente o utiliza neste workflow.
Remova `continue-on-error` após uma semana de execuções estáveis de PRs de lançamento, para que o sinal se torne num
bloqueio entre o PR e o lançamento.

## Solução C — `npm run check:release-green` (o motor)

Reproduz uma validação equivalente à de lançamento na árvore de trabalho atual e classifica cada falha:

- **HARD** (verificação de tipos, erros de lint, unitários, vitest, db-rules, public-creds,
  `package-artifact` opcional) → **defeito real**; `exit 1`. Corrigido na branch de origem (TDD, Regra n.º 18).
- **DRIFT** (**avisos** do eslint, complexidade cognitiva, tamanho de ficheiros) → desvio do limite progressivo acumulado no
  ciclo, **não é culpa do colaborador**; é apenas comunicado e **é recalibrado pelo responsável pela manutenção no
  lançamento**. O desvio **nunca** altera o código de saída — por isso, nunca bloqueia ninguém.

```bash
npm run check:release-green                 # branch atual (árvore de trabalho)
node scripts/quality/validate-release-green.mjs --json   # saída estruturada
node scripts/quality/validate-release-green.mjs --quick  # ignora unitários+vitest (apenas desvio+verificação de tipos+lint)
node scripts/quality/validate-release-green.mjs --with-build  # inclui package-artifact (lento)
```

Apenas diagnostica e **comunica** (sem correções automáticas). A orquestração da correção até ficar verde encontra-se em
`/green-prs` e `/review-prs`.

## Solução A — `/green-prs` (a análise da fila)

Procedimento (resumo — consulte a skill `green-prs` para obter detalhes):

1. **Inventariar** a fila de PRs abertos em relação à branch de lançamento ativa.
2. **Fazer a triagem** de cada PR (viável / deve ser rejeitado / requer intervenção do autor) — os que devem ser rejeitados ou requerem intervenção do autor são
   **comunicados, não fechados** (o autor decide).
3. Para cada PR viável, numa **árvore de trabalho isolada** (Regra n.º 19), atualizar o PR para a ponta da branch de lançamento e executar
   `npm run check:release-green`:
   - **HARD** → corrigir **na branch do colaborador** através de coautoria (preserva o estado "Merged" do autor),
     voltar a executar até todos os problemas HARD estarem resolvidos.
   - **DRIFT** → deixá-lo como está; será recalibrado no lançamento.
4. **Apresentar** uma tabela PR × (veredicto, falhas HARD, corrigido?, DRIFT, release-green agora?).

Pode **preparar** a fila sem efetuar merges; só efetua merges quando explicitamente solicitado — e nunca fecha um PR.

## Cadência recomendada

- Execute **`/green-prs` periodicamente** (por exemplo, semanalmente) e **sempre antes de um
  `/generate-release`**.
- Mantenha **`nightly-release-green.yml`** (Solução D) como um sinal contínuo: quando abrir uma
  issue de falha HARD, é altura de efetuar uma análise.
- Utilize **`/validate-release-green`** pontualmente para verificar uma branch ou um candidato específico a merge.
- Utilize **`/babysit <PR#>`** quando for necessário acompanhar um PR específico até ficar verde no CI em execução.

## Relação com o lançamento

- `/generate-release` chama a validação na **Fase 0 (pré-verificação)**: recalibra o DRIFT e corrige
  os problemas HARD antes de abrir o PR de lançamento.
- `/review-prs` utiliza a verificação release-green na etapa de decisão do merge (verde antes do merge).

O objetivo de todas as partes é o mesmo: **um PR de lançamento verde na primeira execução de CI**, em vez de lidar com
falhas em camadas de 40 minutos no dia do lançamento.
