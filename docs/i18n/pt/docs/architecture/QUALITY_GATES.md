# Quality Gates Reference (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Este documento é a referência oficial para todos os controlos de qualidade de CI no OmniRoute.
Descreve cada controlo, o que valida, a tarefa de CI em que é executado, se utiliza
uma linha de base ratchet ou uma política de aprovação/reprovação e se bloqueia a compilação ou é meramente consultivo.

Para um resumo breve e para a política da lista de permissões, consulte a secção "Controlos de qualidade e ratchets"
em `AGENTS.md`. Para a avaliação crítica, a classificação de maturidade e o plano de
replicação independente de ferramentas do mesmo sistema, consulte o
[Manual de controlos de qualidade](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventário de verificações (~90 scripts)

Os scripts encontram-se em `scripts/check/` (verificações de políticas) e `scripts/quality/` (motor de ratchet).
A fonte de verdade da CI é `.github/workflows/ci.yml`.

### Via rápida para PRs de lançamento (`quality.yml`)

`.github/workflows/quality.yml` é executado em PRs destinados a `release/**`. Mantém os ramos dos
contribuidores em movimento através de verificações rápidas filtradas por caminho, além de um sinal
consultivo de compilação de produção para alterações de código:

| Tarefa                                           | Âmbito                                                                                                                                                                                                                                                     | Bloqueante                                                                                                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PRs de código que não sejam rascunhos e ramos da fila do Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` com `OMNIROUTE_USE_TURBOPACK=1`; sem carregamento de artefactos porque nenhuma tarefa de qualidade subsequente os utiliza | **Consultivo** (`continue-on-error: true`; remover após uma semana de execuções estáveis em PRs de lançamento) |
| `Docs Gates (fast-path)`                         | PRs de documentação/código; referências da documentação da API e docs-all                                                                                                                                                                                  | Sim                                                                                                            |
| `Fast Quality Gates`                             | PRs de código; verificações estáticas, verificação de tipos, verificação de tipos do dashboard, testes unitários afetados                                                                                                                                  | Sim                                                                                                            |
| `Forgotten sibling tests`                        | PRs de código; módulos alterados rastreados até consumidores estáticos e testes irmãos candidatos; caminhos de barrel e de importação dinâmica são comunicados como diagnósticos consultivos, com as exceções referenciadas da lista de permissões         | **Consultivo**                                                                                                 |
| `Vitest (fast-path)`                             | PRs de código; conjunto rápido de testes vitest                                                                                                                                                                                                            | Sim                                                                                                            |
| `Unit Tests fast-path`                           | PRs de código; conjunto de testes unitários com 4 shards                                                                                                                                                                                                   | Sim                                                                                                            |
| `No new ESLint warnings`                         | PRs de código; proteção de lint com reconhecimento de supressões                                                                                                                                                                                           | Sim para a própria origem, consultivo para forks                                                               |
| `Merge integrity (changelog + generated skills)` | PRs que não sejam rascunhos; sincronização do registo de alterações e das competências geradas                                                                                                                                                             | Sim para a própria origem, consultivo para forks                                                               |

#### Relatório de testes irmãos esquecidos

`npm run check:forgotten-sibling-tests` reutiliza o resolvedor de importações subjacente ao mapa de
impacto dos testes. Para cada módulo de produção alterado, comunica cadeias determinísticas
`módulo/símbolo alterado -> consumidor estático -> teste irmão candidato` quando o teste candidato
não está presente no diff do pedido de integração. O resumo em Markdown e o resultado JSON são
mantidos como o artefacto de fluxo de trabalho `forgotten-sibling-tests` para calibração antes de
qualquer implementação bloqueante.

As reexportações de barrel e as importações dinâmicas são apenas diagnósticos de resolução; nunca
criam uma ocorrência bloqueante. As exceções revistas encontram-se em
`config/quality/forgotten-sibling-allowlist.json`. Cada entrada tem de indicar o consumidor e o teste
candidato, fornecer uma justificação específica e incluir uma ligação para uma issue ou um pedido de
integração do GitHub. As entradas malformadas falham de forma restritiva. As exceções não podem
suprimir um teste candidato eliminado nem um diff que adicione `.skip`/`.todo`; o enfraquecimento
de asserções e outras formas de ocultação continuam a ser responsabilidade da verificação
`check:test-masking`, que é bloqueante de forma independente.

### Tarefa: `lint`

É executada em todos os PRs para `main`. Bloqueia a integração em caso de falha.

| Script (`npm run ...`)            | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Bloqueante                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `check:node-runtime`              | A versão do Node.js encontra-se dentro do intervalo suportado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `check:cycles`                    | Importações circulares — todos os módulos em `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                         |
| `check:route-validation:t06`      | Presença de esquemas Zod em todas as rotas (política de Nível 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sim                                         |
| `check:any-budget:t11`            | A contagem de `@ts-expect-error // any` não excede o limite (catraca de Nível 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Sim                                         |
| `check:provider-consistency`      | Cada fornecedor em `providers.ts` tem uma entrada correspondente em `providerRegistry.ts` (e vice-versa, dentro da lista de permissões)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Sim                                         |
| `check:model-lifecycle`           | As três tabelas de encaminhamento mantidas manualmente permanecem consistentes com o instantâneo do ciclo de vida incluído no repositório (#11503): `FITNESS_TABLE` (`taskFitness.ts`) não atribui pontuação a nenhum id descontinuado que `REGISTRY` consiga encaminhar; cada destino de `BUILT_IN_ALIASES` está presente em `REGISTRY` e ausente do instantâneo de ids descontinuados; cada id descontinuado ainda presente em `REGISTRY` é reencaminhado ou listado em `allowedRetiredInCatalog`; e nenhuma origem ou destino de `DEFAULT_DEGRADATION_MAP` aparece como descontinuado nesse instantâneo. Isto não prova que um modelo seja atualmente disponibilizado por um serviço a montante ativo. Offline — compara com `config/quality/model-lifecycle.json`, atualizado manualmente com `npm run quality:refresh-model-lifecycle` (rede; não integrado na CI). `allowedRetiredInCatalog` é um mecanismo de redução progressiva: adicione uma entrada apenas com uma issue de acompanhamento. | Sim                                         |
| `check:fetch-targets`             | Cada `fetch("/api/...")` no `src/` do lado do cliente corresponde a um `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:deps`                      | Todas as dependências instaláveis com `npm install`, em todos os ficheiros `package.json` do repositório, constam de `dependency-allowlist.json`; novos pacotes sem versão fixada ou com nomes semelhantes a outros pacotes são sinalizados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim                                         |
| `audit:deps`                      | `npm audit` (raiz + electron) — sem avisos de gravidade alta/crítica (sobrepõe-se ao `check:vuln-ratchet` do osv; consulte a lista de pendências de racionalização)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                         |
| `check:lockfile`                  | Integridade de `package-lock.json` — registo https, hashes de integridade, sem substituições de anfitrião                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sim                                         |
| `check:licenses`                  | Lista de licenças SPDX permitidas para dependências de produção                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sim                                         |
| `check:tracked-artifacts`         | Sem artefactos de compilação / ligações simbólicas de `node_modules` submetidas (também executado no pre-commit do husky; o pre-push é intencionalmente leve — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sim                                         |
| `check:vitest-exclusions`         | Cada exclusão do Vitest menciona uma tarefa de acompanhamento e consta em `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                         |
| `check:file-size`                 | Nenhum ficheiro de código-fonte excede o limite por extensão (ratchet: ficheiros grandes congelados na lista `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:error-helper`              | As respostas de erro em executores/manipuladores utilizam `buildErrorBody()` / `sanitizeErrorMessage()` (Regra Rígida n.º 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sim                                         |
| `check:migration-numbering`       | Os ficheiros SQL de migração são numerados sequencialmente, sem lacunas nem duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sim                                         |
| `check:public-creds`              | Nenhum `client_id`/`client_secret` OAuth literal nem chaves Web do Firebase fora de `publicCreds.ts` (Regra Rígida n.º 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sim                                         |
| `check:db-rules`                  | Nenhum SQL em bruto fora dos módulos de `src/lib/db/`; nenhuma importação agregada a partir de `localDb.ts` (Regras Rígidas n.º 2/n.º 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sim                                         |
| `check:known-symbols`             | Os executores de fornecedores, as estratégias de encaminhamento e os tradutores registados nas respetivas tabelas de despacho correspondem aos ficheiros no disco — sem símbolos órfãos ou não declarados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sim                                         |
| `check:route-guard-membership`    | Todas as rotas que iniciam um processo subordinado são classificadas por `isLocalOnlyPath()` (Regras Rígidas n.º 15/n.º 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sim                                         |
| `check:test-discovery`            | Todos os ficheiros `*.test.ts` / `*.spec.ts` no repositório são recolhidos por, pelo menos, um executor de testes (mecanismo de retenção: a lista de órfãos em `test-discovery-baseline.json` apenas pode diminuir)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Sim                                         |
| `check:agent-skills-sync`         | Os artefactos de competências de agentes gerados correspondem ao respetivo catálogo de origem (sem divergências)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | Os logótipos/recursos dos fornecedores têm uma entrada de proveniência registada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | Os ficheiros de configuração JSON são analisados corretamente e cumprem as regras de lint do repositório                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Compilação TypeScript sem erros (apenas avisos informativos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Sim                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` estrito — orientado para o futuro; muitos locais de chamada preexistentes ainda necessitam de anotações                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Informativo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitado a `src/app/(dashboard)/**` (#7033) — a lista de permissões selecionada de 27 ficheiros de `typecheck:core` não inclui qualquer TSX do dashboard, e `next build` também nunca efetua a respetiva verificação de tipos (`next.config.mjs` define `ignoreBuildErrors: true`), pelo que as regressões de identificadores órfãos nessa área (#6625/#6909) eram invisíveis para o CI. Compara com uma linha de base fixa de contagens por ficheiro/por código TS (`config/quality/dashboard-typecheck-baseline.json`, o mesmo padrão de imposição de desatualização de `check:known-symbols`) — apenas erros NOVOS que excedam a contagem da linha de base fazem a verificação falhar; reduza-a progressivamente com `--update` quando um erro preexistente for corrigido.                                                                                                                                                                                                                    | Sim                                         |

### Tarefa: `quality-gate`

É executada após `test-coverage`. Bloqueia a integração em caso de falha.

| Script                       | Valida                                                                                                                                                                                               | Bloqueante                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `quality:collect`            | Emite `quality-metrics.json` (contagem de avisos do ESLint, cobertura do relatório combinado dos fragmentos)                                                                                         | Sim (a montante do ratchet) |
| `quality:ratchet`            | Cada métrica em `quality-baseline.json` não sofreu regressões (avisos do ESLint ≤ linha de base; cobertura ≥ linha de base)                                                                          | Sim                         |
| `check:duplication`          | A duplicação de código (jscpd@4) não excede a linha de base em `quality-baseline.json`                                                                                                               | Sim                         |
| `check:complexity`           | A complexidade ciclomática ao nível do ficheiro não excede o limite (regras principais `complexity` + `max-lines-per-function` do ESLint)                                                            | Sim                         |
| `check:cognitive-complexity` | Ratchet de complexidade cognitiva (`eslint-plugin-sonarjs`) — execução separada do ESLint; o CI executa ambos combinados num único passo `check:complexity-ratchets`                                 | Sim                         |
| `check:dead-code`            | O ratchet de exportações/ficheiros não utilizados (knip) não sofre regressões relativamente à linha de base                                                                                          | Sim                         |
| `check:compression-budget`   | Orçamento do benchmark de compressão — os limites mínimos de poupança de tokens por motor não podem sofrer regressões                                                                                | Sim                         |
| `check:type-coverage`        | O ratchet da percentagem de código com tipos (`type-coverage`) não sofre regressões; substitui em grande medida `typecheck:noimplicit:core`                                                          | Sim                         |
| `check:codeql-ratchet`       | A contagem de alertas CodeQL em aberto não sofre regressões (lida através de `gh api`; omissão segura sem token) — cadência de atualização e acionamento manual: consulte "Ratchet do CodeQL" abaixo | Sim                         |

### Tarefa: `quality-extended`

Toda a tarefa é consultiva (`continue-on-error: true`). Os mecanismos de controlo baseados em npm são executados
efetivamente; os analisadores externos são instalados através de `gh release download` e omitem automaticamente a execução (código de saída 0)
quando um binário continua ausente.

| Script                   | Valida                                                                                                                                                                                                                      | Bloqueante     |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check:circular-deps`    | Ausência de dependências circulares (dpdm)                                                                                                                                                                                  | **Consultivo** |
| `check:bundle-size`      | O tamanho do bundle não excede o limite                                                                                                                                                                                     | **Consultivo** |
| `check:secrets`          | Análise de segredos (gitleaks) — omitida se o binário estiver ausente                                                                                                                                                       | **Consultivo** |
| `check:vuln-ratchet`     | As vulnerabilidades das dependências (osv-scanner) não regridem — omitida se o binário estiver ausente                                                                                                                      | **Consultivo** |
| `check:workflows`        | Validação de workflows (actionlint + zizmor) — omitida se os binários estiverem ausentes                                                                                                                                    | **Consultivo** |
| `check:openapi-breaking` | Alterações incompatíveis no contrato da API pública (`openapi.yaml`) relativamente ao ramo base (oasdiff) — emite `openapiBreaking=N`; omitida se o oasdiff estiver ausente ou a especificação base não puder ser resolvida | **Consultivo** |

### Tarefa: `docs-sync-strict`

É executada em todos os PR para `main`. Bloqueia a integração em caso de falha.

| Script                         | Valida                                                                                                                                                                                                                     | Bloqueante                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:docs-all`               | Meta-verificação que executa sequencialmente as 6 subverificações abaixo                                                                                                                                                   | Sim                               |
| ↳ `check:docs-sync`            | Consistência das versões entre CHANGELOG / OpenAPI / llm.txt                                                                                                                                                               | Sim                               |
| ↳ `check:docs-counts`          | As contagens no texto (número de fornecedores, número de migrações, etc.) estão dentro da margem de controlo das contagens reais                                                                                           | Sim                               |
| ↳ `check:env-doc-sync`         | Todas as variáveis de ambiente em `.env.example` estão documentadas numa tabela da documentação e vice-versa                                                                                                               | Sim                               |
| ↳ `check:deprecated-versions`  | Ausência de cadeias de versões descontinuadas na documentação                                                                                                                                                              | Sim                               |
| ↳ `check:doc-links`            | As ligações Markdown internas da documentação resolvem para ficheiros reais (formato `[texto]`/`(caminho)`)                                                                                                                | Sim                               |
| ↳ `check:fabricated-docs`      | As rotas, variáveis de ambiente, comandos da CLI, nomes de hooks e caminhos de ficheiros mencionados na documentação existem na base de código. Verificação rígida através de `--strict`; falha não bloqueante sem a flag. | Sim (através de `--strict` no CI) |
| `check:cli-i18n`               | As cadeias de comandos da CLI estão presentes em todos os ficheiros de idiomas i18n                                                                                                                                        | Sim                               |
| `check:openapi-coverage`       | A especificação OpenAPI cobre, no mínimo, um patamar progressivo de rotas reais                                                                                                                                            | Sim                               |
| `check:openapi-security-tiers` | As anotações dos níveis de segurança em `openapi.yaml` são consistentes com as classificações de `routeGuard.ts`                                                                                                           | **Consultivo**                    |
| `check:openapi-routes`         | Todos os caminhos em `openapi.yaml` resolvem para um `route.ts` real (antialucinação)                                                                                                                                      | Sim                               |
| `check:docs-symbols`           | Todas as referências `/api/...` em `docs/**/*.md` resolvem para um `route.ts` real (antialucinação)                                                                                                                        | Sim                               |
| `i18n translation drift`       | Chaves não traduzidas nos ficheiros de idiomas i18n — apenas aviso                                                                                                                                                         | **Consultivo**                    |

### Tarefa: `i18n-ui-coverage`

| Script                            | Valida                                                                                                                                                                                                                     | Bloqueante     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | A cobertura de chaves de i18n da IU é ≥ 65%                                                                                                                                                                                | Sim            |
| `check-ui-value-drift` (inline)   | Um **valor** em inglês reescrito não deixa para trás nenhuma tradução desatualizada                                                                                                                                        | Sim            |
| `check-new-key-coverage` (inline) | Uma chave **nova** em inglês está traduzida em todas as configurações regionais — um marcador `__MISSING__:` é rejeitado                                                                                                   | Sim            |
| `check-translation-ratio`         | O rácio de traduções reais por configuração regional (folhas idênticas ao inglês / marcadores de posição / em falta fora da lista de permissões) não pode exceder `config/quality/i18n-translation-baseline.json` + margem | **Consultivo** |

Requer `fetch-depth: 0` — a verificação de divergência de valores compara `en.json` com a base de integração.

#### `check-ui-value-drift` — verificação de traduções desatualizadas

Deteta a única regressão de i18n que as outras verificações não conseguem identificar estruturalmente: um valor em inglês
é reescrito e as traduções derivadas do inglês _anterior_ permanecem, pelo que
os utilizadores que não falam inglês continuam a ler um texto formulado de forma convincente, mas agora incorreto.

Isto chegou efetivamente a produção. `oauthModal.googleOAuthWarning` foi reescrito quando o assistente de
início de sessão Antigravity foi introduzido (#5203); **39 de 43 configurações regionais** mantiveram texto que indicava aos operadores para «copiar o
URL completo e colá-lo abaixo» — um fluxo que não pode ser concluído para esse fornecedor. O problema
passou despercebido até ao #8463 porque:

- `sync-ui-keys` apenas preenche chaves que estão **ausentes**, nunca as que estão **desatualizadas**;
- `check-ui-keys-coverage` contabiliza a _presença_ da chave, pelo que uma tradução desatualizada é considerada coberta;
- `check-translation-drift` monitoriza os espelhos de documentação `docs/i18n/<locale>/**.md` —
  nunca lê `src/i18n/messages/*.json`. Bloqueante na tarefa `docs-sync-strict` desde a
  ressincronização de 2026-09: editar um documento principal → `npm run i18n:run -- --files=<doc>` (ao nível da secção, pouco dispendioso).

**Sensível às diferenças, sem suporte de uma linha de base.** Compara o `en.json` da base de integração com a
árvore de trabalho; para cada chave cujo valor em inglês tenha sido alterado, qualquer configuração regional que ainda contenha uma
tradução não modificada está desatualizada. Isto **congela deliberadamente a dívida preexistente** — uma diferença
não consegue revelar de que inglês antigo proveio uma tradução de longa data, pelo que a verificação avalia
apenas aquilo em que a alteração atual toca. A alternativa (uma linha de base de hashes por chave) exigiria
um ficheiro gerado de ~600 KB, 3× maior do que a maior linha de base existente, com alterações em cada PR de i18n.

Há duas formas de cumprir a verificação:

1. atualizar as traduções afetadas, ou
2. defini-las como `__MISSING__:<new english>` — o runtime fornece então o inglês corrigido
   (`src/i18n/request.ts::deepMergeFallback`, #7258) e a chave fica em fila para tradução.

Se o **significado** da cadeia tiver mudado, é preferível **mudar o nome da chave**: uma chave nova não pode herdar
uma tradução desatualizada. Foi esse o padrão utilizado pelo #8463.

```bash
npm run i18n:check-value-drift          # estrito (o que a CI executa)
npm run i18n:check-value-drift:warn     # apenas comunica
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Termina com código 0 e `SKIP reason=base-unresolved` quando o catálogo de base não pode ser lido (clone
superficial sem a referência de base), à semelhança de `check-openapi-breaking`.

### Tarefa: `i18n`

Matriz completa de validação de i18n (uma tarefa por configuração regional). Toda a tarefa é consultiva.

| Script                          | Valida                                            | Bloqueante                                                  |
| ------------------------------- | ------------------------------------------------- | ----------------------------------------------------------- |
| `validate_translation.py quick` | Integridade da tradução por configuração regional | **Consultivo** (`continue-on-error: true` em toda a tarefa) |

### Tarefa: `pr-test-policy`

É executada apenas em pull requests.

| Script                 | Valida                                                                                                                                            | Bloqueante |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | Os PRs que alteram código de produção em `src/`, `open-sse/`, `electron/` ou `bin/` têm de incluir ou atualizar testes (Regra Estrita n.º 8)      | Sim        |
| `check:test-masking`   | Os ficheiros de teste alterados não reduzem a contagem líquida de asserções nem adicionam tautologias `assert.ok(true)`                           | Sim        |
| `check:pr-evidence`    | O corpo do PR cita provas de testes/VPS relativas à alteração (automatiza a Regra Estrita n.º 18 pesquisando o texto do PR — frágil, ver Backlog) | Sim        |

### Tarefa: `test-vitest`

É executada após `build`. Bloqueia a integração em caso de falha.

| Conjunto         | Valida                                                           | Bloqueante                                                                                                                      |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 ferramentas), autoCombo, cache — runner vitest | Sim                                                                                                                             |
| `test:vitest:ui` | Testes de componentes da IU — runner vitest                      | **Bloqueante** — as falhas preexistentes são explicitamente excluídas em `vitest.config.ts`; novas falhas fazem a tarefa falhar |

### Workflows noturnos (agendados, consultivos)

Estes são executados segundo um agendamento cron (e `workflow_dispatch`), nunca em PRs. Todos são consultivos.

| Workflow               | Valida                                                                                                                                                                                       | Bloqueante     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | Testes baseados em propriedades com fast-check, com uma seed aleatória e um número elevado de execuções                                                                                      | **Consultivo** |
| `nightly-resilience`   | Limite de crescimento da heap, injeção caótica de falhas, testes de carga/prolongados com k6                                                                                                 | **Consultivo** |
| `nightly-llm-security` | Proteção contra injeção do promptfoo (modo de bloqueio) + sondas do garak (ignoradas sem o segredo de um fornecedor)                                                                         | **Consultivo** |
| `nightly-schemathesis` | Fuzzing de contratos OpenAPI (schemathesis) contra uma instância OmniRoute ativa, utilizando `docs/openapi.yaml` — identifica violações da especificação/erros 500 não tratados (Fase 8 B.4) | **Consultivo** |
| `nightly-mutation`     | Pontuação dos testes de mutação do Stryker na via rápida de testes unitários — mutantes sobreviventes revelam asserções fracas                                                               | **Consultivo** |
| `nightly-compat`       | Matriz de compatibilidade do motor Node nos intervalos suportados de `engines.node`                                                                                                          | **Consultivo** |

---

## Fase de velocidade (2026-08-30 → v4.0 LTS): todos os valores de referência flexibilizados em 20%

Decisão do responsável (2026-08-30): até à modularização da v4.0, a velocidade de entrega é mais importante
do que conter a dívida. Todos os valores de referência **numéricos** do mecanismo de ajuste progressivo foram flexibilizados em 20% numa única
operação auditável, e a fase é declarada em `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| O que mudou                                                                                                                                                                                                                                                  | Onde                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — contagens em que um valor inferior é melhor ×1,2, percentagens em que um valor superior é melhor ÷1,2 (mantido o mínimo de cobertura de 60, `eslintErrors` permanece em 0, `eslintWarnings` 0 → 20% da contagem de supressões congelada) | `quality-baseline.json` (a nota `_relax_velocity_2026_08_30` lista todos os valores antes → depois)    |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, todos os limites de linhas `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                                              | `file-size-baseline.json`                                                                              |
| contagens por ficheiro / por código TS ×1,2                                                                                                                                                                                                                  | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` passa a ser informativo enquanto `_policy.requireTighten === false`                                                                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| o `bank-ratchet-shrinks` noturno fica em pausa (registaria a redução medida e eliminaria a margem disponível)                                                                                                                                                | `.github/workflows/nightly-release-green.yml`                                                          |

As listas de permissões (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **não** são orçamentos e não foram alteradas. Os controlos de política de aprovação/reprovação (segredos, regras de SQL,
contrato de documentação/ambiente, paridade de i18n, testes unitários) permanecem inalterados — um teste a vermelho continua a ser um teste a vermelho.

**Ferramentas**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — a
  flexibilização de execução única (`scripts/quality/relax-baselines.mjs`); recusa uma segunda execução com a
  mesma nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mede todos os controlos numéricos da mesma forma que a CI e apresenta a margem restante por controlo
  (`scripts/quality/baseline-headroom.mjs`). A tarefa noturna `baseline-headroom` publica a
  tabela na ocorrência dinâmica **📈 Margem dos valores de referência (fase de velocidade)** e adiciona a
  etiqueta `headroom-alert` quando qualquer controlo está a menos de 10% do respetivo limite ou já o ultrapassou. Essa ocorrência
  é o aviso antecipado: um orçamento que se esgota em poucos dias significa que a flexibilização está a ser consumida por
  alguns PRs, não por toda a equipa — consulte as notas `_rebaseline_*` do controlo em causa.

**Modo de código novo (Clean-as-You-Code) — desde 2026-08-30, apenas no percurso rápido de PRs**

Em eventos `pull_request`, `quality.yml` transmite `--base-ref <PR base SHA>` a `check:file-size`,
`check:complexity-ratchets` e `check:dead-code`. Nesse modo, o controlo compara HEAD com a
base de integração **limitando-se aos ficheiros alterados pelo PR** (`scripts/check/newCodeMode.mjs`: a
base de integração é materializada num `git worktree` descartável, o ESLint/knip é executado nesse local e em HEAD, e é
calculada a diferença das contagens por ficheiro):

- **bloqueante** — o PR adicionou violações de complexidade ciclomática/cognitiva ou exportações não utilizadas nos ficheiros que alterou
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` no registo);
- **informativo** — o total global face ao valor de referência congelado. Os desvios herdados nunca colocam a vermelho um
  PR não responsável; o desvio volta a ser congelado durante a reconciliação da versão e é monitorizado pela tarefa de margem disponível.

As execuções de `workflow_dispatch`, a verificação release-green e a tarefa noturna de margem disponível não têm uma base de PR
e mantêm a comparação absoluta (global). A cobertura, a duplicação e a cobertura de tipos permanecem globais
por enquanto (as respetivas ferramentas não produzem uma diferença por ficheiro de forma eficiente) — são candidatas ao mesmo tratamento.

**Encerramento da fase na v4.0 (LTS = mais rigoroso do que antes, não «regresso ao normal»)**

1. Na ponta limpa de `release/v4.0.0`: execute `npm run quality:headroom --json` para fins de registo e, em seguida,
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` e o
   `--update` de cada verificação de tipos — cada linha de base desce para o valor medido.
2. Elimine `_policy` de `quality-baseline.json` (reativa `--require-tighten` e a
   acumulação noturna), reponha `THRESHOLD = 36` (ou superior) em `check-openapi-coverage.mjs`.
3. Aperte os limites para além dos valores medidos onde a modularização produziu resultados: `cap` do tamanho dos ficheiros novamente em 1000
   (ou 800), limites mínimos de cobertura +5, 0 exportações mortas para os pacotes modularizados.

## Linha de base do ratchet (`quality-baseline.json`)

O motor de ratchet (`scripts/quality/check-quality-ratchet.mjs`) lê `quality-baseline.json`
e compara-o com o `quality-metrics.json` recém-recolhido. Qualquer métrica que regrida
para além do respetivo épsilon faz com que a compilação falhe.

Métricas atualmente monitorizadas:

| Métrica               | Direção | Significado                                    |
| --------------------- | ------- | ---------------------------------------------- |
| `eslintWarnings`      | `down`  | O número de avisos do ESLint não pode aumentar |
| `coverage.statements` | `up`    | A cobertura de instruções não pode diminuir    |
| `coverage.lines`      | `up`    | A cobertura de linhas não pode diminuir        |
| `coverage.functions`  | `up`    | A cobertura de funções não pode diminuir       |
| `coverage.branches`   | `up`    | A cobertura de ramos não pode diminuir         |

Para atualizar a linha de base após uma melhoria efetiva:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

A opção `--update` escreve os valores atualmente medidos em `quality-baseline.json`.
Confirme este ficheiro juntamente com a alteração que melhorou a métrica. Um PR que melhore uma
métrica sem atualizar a linha de base será detetado por `--require-tighten` (Fase 6A.5,
implementação pendente).

### Ratchet do CodeQL: frequência de atualização e acionamento manual

`check:codeql-ratchet` lê **o estado do repositório, atualizado de acordo com um agendamento — não por PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` comunica
`state: configured`, `schedule: weekly`: a análise da configuração predefinida do GitHub, e não uma
análise por push. Consequência: após a integração de um PR que CORRIJA alertas, o ratchet continua a ler
a contagem antiga e mais elevada até à execução da próxima análise agendada — pelo que comunica uma regressão
em todos os PR abertos, incluindo nos PR subsequentes ao próprio PR de correção, até que a análise seja atualizada.

**Atualização manual**: `gh workflow run codeql.yml --ref release/vX.Y.Z` volta a executar a
análise e publica novamente os alertas em poucos minutos. Leia primeiro `.github/workflows/codeql.yml`
— o respetivo cabeçalho explica que é apenas para `workflow_dispatch` **porque entra em conflito com
a "configuração predefinida" do GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). A reposição dos acionadores `push`/`pull_request`/
`schedule` requer primeiro uma **ação do proprietário**: Settings → Code security →
CodeQL: Default → Advanced. Não adicione um acionador `schedule:` sem efetuar essa alteração — este
apenas produzirá execuções com falhas.

**Aperte a linha de base após a diminuição da contagem** — `node scripts/check/check-codeql-ratchet.mjs
--update` escreve a nova contagem medida em `quality-baseline.json` →
`metrics.codeqlAlerts.value`, para que o ratchet não permita silenciosamente uma regressão até
ao limite máximo anterior. Exemplo prático (2026-09-02/03): o PR #12502 corrigiu 7 alertas reais
(13 → 6 alertas abertos medidos); o PR #12530 apertou a linha de base fixa de 11 → 6 para corresponder; os
6 restantes foram depois dispensados, com uma justificação por alerta, reduzindo o número de alertas abertos para 0.

**As dispensas são uma decisão do operador (Regra Rígida #14)** — nunca dispense um alerta do CodeQL
sem registar a justificação técnica no comentário da dispensa: `won't fix` para
um requisito de protocolo a montante, `used in tests` para um fixture de teste, `false positive`
para um sanitizador que o CodeQL não consegue detetar (precedente: `docs/security/ERROR_SANITIZATION.md`).

---

## Política de repetição de testes (WS5.4, v3.8.49)

A repetição é definida por runner, nunca de forma global e indiscriminada — uma repetição indiscriminada transforma regressões reais
em falhas intermitentes invisíveis:

| Runner           | Política                                                                                                                              | Porquê                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` apenas em CI, com `trace: on-first-retry`                                                                                | A temporização do browser/da rede é genuinamente não determinística; uma repetição com um trace transforma uma falha intermitente num artefacto diagnosticável |
| Vitest           | SEM repetição global. Um teste comprovadamente intermitente recebe uma repetição explícita por teste (visível no diff, revista no PR) | Mantém a lista de quarentena no repositório, nunca opaca                                                                                                       |
| node:test (unit) | SEM repetição, em circunstância alguma                                                                                                | Um teste unitário intermitente é um erro no teste — corrija-o, não volte simplesmente a executá-lo                                                             |

SLOs pretendidos assim que a telemetria de falhas intermitentes estiver disponível (WS5.2/5.3): taxa de falhas intermitentes <1% por teste
(limiar de "corrigir agora"), taxa de sucesso ≥95% por pipeline. Valores de referência do setor —
recalibrar com base nas nossas próprias medições.

## Desvio dos limites progressivos ao nível da release (WS5.5, v3.8.49)

Quando um limite progressivo (tamanho de ficheiro, complexidade, avisos do eslint) regride na ponta PURA da release
— ou seja, a COMBINAÇÃO de merges causou a regressão e nenhum PR isolado a reproduz no
seu próprio branch — a correção cabe ao **responsável pela release, uma única vez, no
branch da release**: dar preferência à extração/refatorização; redefinir a baseline apenas com a entrada
de justificação documentada. Nunca transferir um desvio combinado para o PR de um colaborador e nunca
redefinir a baseline por PR (isso oculta regressões reais). Primeiro, fazer a distinção: reproduzir a
falha na ponta pura, numa worktree de teste, antes de assumir que foi causada pelo seu PR.

## Registar reduções dos limites progressivos — a direção descendente (#8584)

O mecanismo de limites progressivos é apenas parcialmente automático, e é a parte errada. **Aumentar** um limite é uma
edição manual de JSON que demora dez segundos e é a forma mais rápida de desbloquear um PR com falhas.
**Reduzir** um limite exige que alguém execute `--update` e faça commit do resultado — e, até
o job `bank-ratchet-shrinks` ser implementado, nenhum workflow o executava. A consequência medida
(2026-07-25): 18 ficheiros congelados já se encontravam no limite de 800 linhas para novos ficheiros ou abaixo dele, o pior
com 132× (`src/shared/validation/schemas.ts`, 19 linhas com um limite de 2,523); o
limite máximo de complexidade passou de `1794 → 2169` ao longo de ~37 notas de redefinição da baseline, com exatamente uma
redução (−1); e "apertar através de `--update` no próximo ciclo" foi escrito 31 vezes e cumprido
uma vez. Um limite que sobrevive ao código que o justificou transforma silenciosamente cada
decomposição concluída numa margem de crescimento para quem editar o ficheiro a seguir.

`nightly-release-green.yml` → o job **`bank-ratchet-shrinks`** fecha esse ciclo:

|            |                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| Executa em | `schedule` (3×/dia) + `workflow_dispatch` — deliberadamente **não** em `push`                                |
| Mede       | o `release/vX.Y.Z` mais elevado, com a mesma resolução + proteção contra injeção de `release-green`          |
| Escreve    | `check:file-size --update` e `check:complexity-ratchets --update` (ambos apenas reduzem por definição)       |
| Verifica   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                     |
| Entrega    | um único PR sempre atualizado para o branch da release — atualizado à força, nunca repetido de forma abusiva |

O registo é feito em lote, em vez de a cada push, porque não tem requisitos de latência (uma redução
registada no prazo de 8h é aceitável), enquanto uma execução por merge reconstruiria repetidamente o branch do PR
durante campanhas de merge e incorreria sempre no custo de uma verificação completa do ESLint. A deteção continua a ocorrer no
push (`release-green`); apenas o registo é processado em lote.

### O verificador de segurança

O job escreve nas baselines sem supervisão, pelo que `verify-ratchet-bank.mjs` é o que torna
isso aceitável. Compara a árvore posterior a `--update` com `HEAD` e **aborta o job
antes de existir qualquer commit** — sem abrir qualquer PR — a menos que todas as alterações sejam uma das seguintes:

- uma entrada numérica `frozen` / `testFrozen` **reduzida** ou **removida**
- `complexity-baseline.json` → `count` **reduzido**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **reduzido**

Qualquer outra alteração falha: aumentar um número, adicionar uma entrada, alterar `cap`/`testCap` ou
eliminar/reescrever uma nota `_rebaseline_*` (essas notas constituem o registo de auditoria que explica por que motivo existe cada
limite máximo e são armazenadas no mesmo objeto `frozen` que as entradas dos ficheiros).
Um bot capaz de aumentar um limite seria claramente pior do que a situação atual. Proteção contra regressões:
`tests/unit/verify-ratchet-bank.test.ts`.

O job nunca faz push para `release/*` — uma pessoa faz o merge do PR, pelo que uma medição incorreta
não pode ser integrada sem revisão.

## Política de Lista de Permissões

Cada verificação que não pode falhar devido a violações preexistentes utiliza uma lista de permissões imutável
(por exemplo, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A política é:

**Corrija a causa principal; utilize a lista de permissões apenas quando a violação for preexistente e
não puder ser corrigida no mesmo PR.**

Ao adicionar uma entrada a uma lista de permissões:

1. Inclua um comentário com a justificação.
2. Indique a issue de acompanhamento (por exemplo, `// #3498 — Funcionalidade da Fase 2, ainda não implementada`).
3. Remova a entrada no mesmo PR que corrige a violação — uma entrada obsoleta que já não
   suprime uma violação ativa constitui, por si só, um defeito (a verificação de entradas obsoletas 6A.3
   fará com que uma entrada órfã na lista de permissões provoque a falha da verificação após a respetiva implementação).

**Não** adicione entradas à lista de permissões para fazer com que os testes passem mais depressa. Uma verificação bem-sucedida com uma
lista de permissões crescente cria uma falsa sensação de qualidade.

### Quando uma verificação falha no seu PR

1. **Leia atentamente o resultado da verificação** — este indica exatamente qual o ficheiro ou símbolo que violou
   a regra.
2. **Corrija a violação** — a maioria das verificações consiste em verificações determinísticas do sistema de ficheiros que são aprovadas assim que
   o código estiver correto.
3. **Se a violação for preexistente** (ou seja, não foi introduzida por si, mas passou agora a ser abrangida
   pela verificação): adicione uma entrada à lista de permissões com um comentário de justificação e uma issue de acompanhamento.
4. **Se a verificação for incremental** (cobertura, avisos do ESLint, duplicação, complexidade):
   a sua alteração agravou a métrica. Corrija o problema subjacente ou, em casos raros, execute
   `npm run quality:ratchet -- --update` se a alteração for intencional e a degradação da métrica
   for aceitável — mas documente o motivo na descrição do PR.
5. **As verificações consultivas** (`continue-on-error: true`) são informativas — não bloqueiam
   a integração, mas aparecem no resumo da CI. Corrija-as na mesma.

---

## Adicionar uma Nova Verificação

1. Crie `scripts/check/check-<name>.mjs` (ou `.ts`). As verificações de políticas terminam com o código 0/1.
   As verificações de estilo incremental emitem uma métrica para `quality-metrics.json` através de `collect-metrics.mjs`.
2. Adicione `"check:<name>": "node scripts/check/check-<name>.mjs"` a `package.json`.
3. Integre-a em `.github/workflows/ci.yml` no job adequado
   (política → `lint` ou `docs-sync-strict`; incremental → `quality-gate`).
4. Se tiver uma lista de permissões, aplique `reportStaleEntries()` de
   `scripts/check/lib/allowlist.mjs` para que as entradas obsoletas sejam detetadas automaticamente.
5. Escreva um teste em `tests/unit/build/` que abranja a lógica de deteção da verificação.
6. Atualize este documento (adicione uma linha à tabela do job relevante).

---

## Ferramentas para agentes: LSP integrado no ciclo (opcional)

Para além das verificações de CI, o OmniRoute inclui uma estrutura `agent-lsp` **opcional**
(um `.mcp.json` ao nível do projeto, Fase 7 Tarefa 15). Crie `.mcp.json`
para disponibilizar um servidor de linguagem TypeScript aos agentes de programação, para que estes resolvam símbolos /
diagnósticos **antes** de escreverem código — um complemento de compilação antes da validação para
`typecheck:core`, que elimina na origem os erros de «símbolo inventado». Intencionalmente,
não é carregado de forma automática (cabe-lhe escolher e verificar a ponte MCP↔LSP); uma entrada inválida apenas regista um
erro de ligação e nunca interrompe as sessões.

---

## Lista de Pendentes de Racionalização (revisão de ROI — Fase 9 Onda 3)

Este inventário foi reconciliado com `ci.yml` em 2026-06-17 (a versão anterior omitia
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Uma revisão de ROI do conjunto reconciliado
identificou os seguintes candidatos a racionalização. **As fusões são alterações mecânicas
de CI; as inversões/remoções são decisões de política reservadas ao operador.** Nada do que
se segue foi ainda aplicado.

**Também não documentados acima** (consultivos, baixo sinal): a tarefa `docs-lint`
(markdownlint + Vale, tarefa completa com `continue-on-error`) e os fluxos de trabalho de análise autónomos
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` está em
`quality-baseline.json`, mas não está ligado a um mecanismo de bloqueio progressivo em `ci.yml` — a métrica
está atualmente órfã.

### Fusão / desduplicação (mecânica, menor risco)

Cada candidato foi validado relativamente ao estado real dos controlos em 2026-06-17 (confiar, mas verificar);
várias fusões "óbvias" revelaram ocultar dívida e **não** são substituições diretas sem riscos.

- **`check:docs-sync` é executado duas vezes** — de forma autónoma na tarefa `lint` e novamente dentro de `check:docs-all` (`docs-sync-strict`) e do hook de pre-commit do husky. ✅ **CONCLUÍDO** — invocação autónoma em `lint` removida.
- **Análise de CVE** — ❌ **NÃO é uma fusão simples.** `audit:deps` falha de forma definitiva perante qualquer CVE de gravidade alta/crítica; `check:vuln-ratchet` (osv) apenas falha perante uma _regressão_ relativamente à referência (atualmente 1 MODERATE). Semânticas diferentes — remover `audit:deps` eliminaria o controlo absoluto de gravidade alta/crítica. Manter ambos.
- **Deteção de ciclos** — ❌ **NÃO é uma fusão simples.** `check:circular-deps` (dpdm) comunica **91 ciclos** (razão pela qual é consultivo); não pode ser promovido a bloqueante sem os resolver primeiro e tem um âmbito mais abrangente do que o `check:cycles`, que está verde e foi cuidadosamente delimitado. Manter `check:cycles` como bloqueante; resolver os 91 ciclos do dpdm constitui uma tarefa pendente própria.
- **Complexidade** — ✅ **CONCLUÍDO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): uma passagem do ESLint, com contagens por ruleId, para que os valores de referência de complexidade ciclomática+máximo de linhas e de complexidade cognitiva permaneçam independentes; os comandos individuais `check:complexity` / `check:cognitive-complexity` permanecem disponíveis para `--update` local.
- **Anti-alucinação de `/api`** — ✅ **CONCLUÍDO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): um inventário do sistema de ficheiros de `src/app/api`; openapi-routes + docs-symbols continuam a produzir relatórios independentes; os comandos individuais permanecem disponíveis para execuções locais.
- **`check:node-runtime` é executado em 11 tarefas** — ⚠️ **ROI baixo.** Cada uma utiliza um executor separado e a verificação demora <1s; poupança total de ~10s, em troca da perda de uma salvaguarda económica por tarefa. Não justifica a perturbação.
- **`typecheck:noimplicit:core` no lint de CI** — ✅ **removido da tarefa lint** (era consultivo com `continue-on-error`); a superfície de tipos bloqueante é `typecheck:core` + `check:type-coverage`. Script local mantido.

### Inverter / decidir (política do operador)

- `check:openapi-security-tiers` (consultivo) — ❌ **NÃO pode ser simplesmente tornado bloqueante.** Termina com 0, mas avisa que várias rotas de `traffic-inspector` sob `LOCAL_ONLY_API_PREFIXES` não têm a anotação `x-loopback-only: true`. A sua aplicação obrigatória requer primeiro a adição dessas anotações a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — amplamente substituído pelo mecanismo progressivo bloqueante `check:type-coverage`. Converter num mecanismo progressivo ou remover a segunda passagem redundante de `tsc`.
- `test:vitest:ui` (agora **bloqueante**) — as falhas preexistentes estão explicitamente excluídas em `vitest.config.ts` através de comentários de acompanhamento `// #8618`; novas falhas fazem a tarefa falhar.
- `check:secrets` (gitleaks, mecanismo progressivo bloqueante fixado em 3 falsos positivos documentados) — adicionar os 3 à lista de permissões para chegar a 0 ou despromover para consultivo. Sobrepõe-se à análise de segredos nativa do GitHub + `check:public-creds`.
- `check:pr-evidence` (bloqueante, procura padrões no texto do corpo do PR) — elevado risco de falsos positivos; a remoção enfraquece a aplicação da Regra Rígida #18, pelo que esta é uma verdadeira decisão de política.
- `semgrep` (autónomo consultivo) — sobrepõe-se ao CodeQL para as famílias OWASP; ligar o respetivo valor de referência a um mecanismo progressivo ou remover.

---

## Documentação relacionada

- Cadeia de fornecimento (proveniência, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — controlo da paridade dos conjuntos de chaves

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, tarefa `i18n-ui-coverage`).
Compara o conjunto de chaves terminais de cada `src/i18n/messages/<locale>.json` com `en.json` e falha
perante qualquer chave terminal em falta ou adicional, independentemente de quando a chave foi adicionada. Os marcadores de posição `__MISSING__:`
contam como presentes (o respetivo conteúdo é da responsabilidade do controlo de proporção). É o complemento absoluto
dos dois controlos baseados em diferenças/percentagens: `check-ui-keys-coverage` impõe um mínimo de 80 % por
idioma (43 chaves em falta entre ~13 000 ainda resultam em 99,7 %) e `check-new-key-coverage` avalia
apenas as chaves que um PR adiciona a `en.json`. Um lote de idiomas é gerado a partir do `en.json` do dia
em que o respetivo ramo é criado e é traduzido durante vários dias, enquanto a base continua a receber chaves; o PR do lote não adiciona
qualquer chave por si só, pelo que ambos os controlos relacionados permaneceram silenciosos quando o lote 1 (#13044) foi integrado com menos 43 chaves em nove
idiomas e o lote 2 (#13660) com menos 10 chaves em oito (2026-09-15). Corrija uma falha com
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; uma chave terminal `extra`
significa que foi removida da origem — elimine-a do idioma. `--warn` comunica o problema sem provocar uma falha.
`--catalog=cli` executa a mesma comparação em `bin/cli/locales` (`npm run i18n:check-keys:cli`);
ambos os passos fazem parte da tarefa `i18n-ui-coverage`.

#### `check-new-key-coverage` — controlo de i18n para novas chaves

Controlo relacionado com `check-ui-value-drift`. Este último deteta um valor em inglês que foi **reescrito**
sem que as respetivas traduções fossem atualizadas; este deteta uma chave em inglês que foi **adicionada**
sem que alguns idiomas alguma vez a tenham recebido.

`check-ui-keys-coverage` não consegue detetar esta categoria: impõe um mínimo percentual por idioma, e
onze chaves em falta entre ~13 000 deixam a cobertura nos 99,9%. Uma percentagem por idioma não consegue
exprimir «esta funcionalidade foi disponibilizada sem tradução» — uma funcionalidade inteira pode ser integrada num novo idioma sem qualquer
texto e sem nunca alterar esse número.

O incidente que este controlo codifica: a Fase 3 do Orchestration Canvas traduziu as suas onze chaves para
os 42 idiomas existentes na altura. Horas mais tarde, o lote de idiomas da UE (#13044) aumentou o repositório
para 51 idiomas, e os nove recém-chegados (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nunca
as receberam. `deepMergeFallback` substitui por inglês uma chave em falta, pelo que o modo de falha era
uma IU não traduzida, em vez de uma IU vazia — um problema real e silencioso por definição.

Tal como o controlo relacionado, este é **sensível às diferenças**, comparando o inglês no ponto de base da integração com a árvore
de trabalho, pelo que as lacunas preexistentes permanecem congeladas e não foi necessária qualquer migração para ativar o controlo.

**Um marcador `__MISSING__:<english>` não satisfaz este controlo (desde 2026-09-17).** Era anteriormente o
adiamento documentado — durante a execução é usado o inglês correto como alternativa — até oito PRs de funcionalidades, em
2026-09-16, terem adicionado 61 chaves e aplicado o marcador em todos os 65 idiomas em vez de as traduzirem: este
controlo aceitou todos os casos, nada bloqueou os PRs, e o controlo bloqueante da proporção de traduções reais
falhou depois na ponta da versão para todos (pt-BR 3,2 % > 2,5 % + 0,5). Um marcador é agora tratado
como uma tradução em falta. Corrija uma falha com
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ou
todos os idiomas em paralelo com `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
seguro em modo desacoplado, recusa iniciar sem as variáveis de ambiente `OMNIROUTE_TRANSLATION_*`). Uma chave que tenha de permanecer
em inglês (o nome fixo de um produto/motor/sinalizador) deve constar de `scripts/i18n/untranslatable-keys.json`,
nunca ficar atrás de um marcador. `vi` proíbe totalmente os marcadores (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — controlo de testes suspensos

Um ficheiro na lista `exclude` de `vitest.config.ts` é um teste que não é executado e parece
cobertura para quem consulta a árvore. Acumularam-se sessenta e dois ficheiros atrás do comentário
`// #8618 — pre-existing failure; remove this exclusion when fixed`. O problema #8618 foi encerrado em
2026-08-11, enquanto a lista que acompanhava cresceu de 45 entradas para 62, tendo cada nova entrada herdado um comentário
que remetia para um problema encerrado. Quando a lista foi finalmente medida ficheiro a ficheiro (#13204), **51 dos 62
passaram na árvore atual sem qualquer alteração ao código-fonte**.

O controlo exige que cada exclusão que corresponda a um ficheiro real (a) indique um problema de acompanhamento e
(b) conste de `config/quality/vitest-exclusions.json` com o respetivo estado medido, para que adicionar uma seja
uma diferença passível de revisão num ficheiro dedicado, em vez de apenas mais uma linha numa matriz com 60 entradas. Deliberadamente,
não volta a executar os testes excluídos — isso demora ~10 minutos e deve ser feito numa tarefa periódica; o
inventário regista quando cada um foi medido pela última vez.
