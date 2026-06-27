---
title: "Release-Green — fila e release branch verdes"
---

# Release-Green: mantendo a fila e a release branch verdes

## O problema que isto resolve

O **gate completo** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) roda **apenas na release PR** (PR → `main`). PRs para
`release/**` recebem só as **fast-gates** (`quality.yml`: testes TIA-impactados + typecheck +
lint). Consequência: reds se acumulam silenciosamente na release branch e **explodem em camadas
de ~40 min** no momento do release, uma de cada vez.

A "família release-green" existe para **antecipar** esses reds — validar o equivalente ao gate
completo **localmente / fora do release**, a qualquer momento, para que a release PR já nasça
verde na primeira CI.

> **Princípio inegociável:** nada disto bloqueia o contribuidor. Não adicionamos um required
> check que falhe o PR dele. O **drift** (ratchets) é do mantenedor rebaselinar no release —
> nunca uma preocupação do contribuidor. Nenhuma peça **fecha** um PR (roubo de crédito) nem
> **enfraquece** um teste para passar.

## A família (4 peças) — e como cada uma roda à parte

| Peça                                                                      | O que é                                                                              | Quando rodar                                                                  | Escopo                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------ |
| **`/green-prs`** (Solução A)                                              | Varredura sob demanda do mantenedor sobre a **fila de PRs abertos**                  | **À parte, periódico** — e principalmente **antes** de um `/generate-release` | Fila inteira de PRs → `release/**`   |
| **`/validate-release-green`** (Solução C — `npm run check:release-green`) | Motor de validação: reproduz o gate completo contra uma branch OU um merge-candidato | À parte, a qualquer momento                                                   | Uma branch específica ou um PR-merge |
| **`/babysit <PR#>`**                                                      | Conduz a **CI ao vivo** de **um** PR até o verde                                     | À parte, por PR                                                               | Um PR                                |
| **`nightly-release-green.yml`** (Solução D)                               | Workflow noturno automático; abre issue em HARD red                                  | Automático (cron)                                                             | A release branch ativa               |

**Resposta curta à pergunta "é só para release?":** **não.** O `/green-prs` foi desenhado para
rodar **de tempos em tempos, entre releases**. Rodar à parte é o uso normal — o release é apenas
o momento em que rodá-lo dá mais retorno.

## Solução C — `npm run check:release-green` (o motor)

Reproduz a validação release-equivalente contra a árvore de trabalho atual e classifica cada red:

- **HARD** (typecheck, lint errors, unit, vitest, db-rules, public-creds, opcional
  `package-artifact`) → **defeito real**; `exit 1`. Conserta-se na branch de origem (TDD, Rule #18).
- **DRIFT** (eslint **warnings**, cognitive-complexity, file-size) → drift de ratchet acumulado no
  ciclo, **não é culpa do contribuidor**; é só reportado e **rebaselinado pelo mantenedor no
  release**. Drift **nunca** muda o exit code — então nunca bloqueia ninguém.

```bash
npm run check:release-green                 # branch atual (working tree)
node scripts/quality/validate-release-green.mjs --json   # saída estruturada
node scripts/quality/validate-release-green.mjs --quick  # pula unit+vitest (só drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # inclui package-artifact (lento)
```

Diagnostica e **reporta** apenas (sem auto-fix). A orquestração de fix-to-green vive no
`/green-prs` e no `/review-prs`.

## Solução A — `/green-prs` (a varredura da fila)

Procedimento (resumo — ver a skill `green-prs` para o detalhe):

1. **Inventariar** a fila de PRs abertos contra a release branch ativa.
2. **Triar** cada PR (viável / reject-worthy / needs-author) — reject/needs-author são
   **reportados, não fechados** (o dono decide).
3. Para cada viável, em **worktree isolado** (Rule #19), trazer o PR ao tip da release e rodar
   `npm run check:release-green`:
   - **HARD** → consertar **na branch do contribuidor** via coautoria (mantém o "Merged" do autor),
     re-rodar até zerar os HARD.
   - **DRIFT** → deixar; é rebaselinado no release.
4. **Reportar** uma tabela PR × (verdict, HARD reds, fixado?, DRIFT, release-green agora?).

Pode **preparar** a fila sem mergear; só mergeia quando explicitamente pedido — e nunca fecha PR.

## Cadência recomendada

- Rode **`/green-prs` periodicamente** (ex.: semanalmente) e **sempre antes de um
  `/generate-release`**.
- Deixe o **`nightly-release-green.yml`** (Solução D) como sinal contínuo: quando ele abrir issue
  de HARD red, é hora de uma varredura.
- Use **`/validate-release-green`** ad-hoc para checar uma branch ou um merge-candidato pontual.
- Use **`/babysit <PR#>`** quando um PR específico precisa ser conduzido ao verde na CI ao vivo.

## Relação com o release

- `/generate-release` chama a validação na **Fase 0 (pré-flight)**: rebaselina o DRIFT e conserta
  o HARD antes de abrir a release PR.
- `/review-prs` usa o gate release-green no passo de decisão de merge (verde-antes-de-merge).

O objetivo de todas as peças é o mesmo: **a release PR verde na primeira CI**, em vez de surfar
reds em camadas de 40 min no dia do release.
