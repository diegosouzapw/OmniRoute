# Release Checklist (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Última atualização:** 2026-08-28 — v3.8.51
> Fluxo de lançamento simplificado que utiliza as skills do Claude Code para automatização.
>
> **Mantenha a fila/branch verde entre lançamentos:** consulte [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (família `/green-prs` + `npm run check:release-green` + `/babysit` + execução noturna). Executar
> isto periodicamente — e especialmente **antes** desta lista de verificação — faz com que o PR de lançamento comece verde.

## Resumo

```bash
# 1. Incrementar a versão + gerar o CHANGELOG (skill)
/version-bump-cc patch    # ou minor/major

# 2. Executar localmente a validação de qualidade
npm run check              # lint + testes
npm run test:coverage      # validação de cobertura completa (60/60/60/60)

# 3. Compilar e executar o teste de fumo
npm run build
npm run test:e2e           # opcional, mas recomendado

# 4. Gerar o lançamento (skill)
/generate-release-cc

# 5. Implementar (skill)
/deploy-vps-both-cc        # ou akamai-cc / local-cc

# 6. Capturar evidências do lançamento (skill)
/capture-release-evidences-cc
```

## Publicação fidedigna no npm (predefinição desde a v3.8.51) — faseada mediante pedido, direta como alternativa

O `npm-publish.yml` publica através do **npm Trusted Publishing (OIDC)** por predefinição: o
job `stage-npm` (alojado no GitHub) troca o id-token do GitHub por uma credencial npm
de curta duração para essa execução — sem token npm de longa duração nos segredos do repositório, sem pedido de 2FA e com proveniência anexada.
Esta é a alternativa que o npm agora permite, dado que os tokens que ignoram a 2FA estão a ser descontinuados;
restaura o fluxo totalmente automático que o projeto tinha até à v3.8.48, mantendo simultaneamente a
garantia WS1.3 (um token exposto não pode publicar por si só — não existe qualquer token).

**Configuração única (proprietário):** npmjs.com → pacote `omniroute` → Settings → _Trusted
Publisher_ → GitHub: proprietário `diegosouzapw`, repositório `OmniRoute`, workflow `npm-publish.yml`
(ambiente: nenhum). Até isto existir, o passo automático falha com `ENEEDAUTH`:
volte a acionar com `publish_mode=staged` (abaixo) ou `direct`.

### Publicação faseada (mediante pedido — `publish_mode=staged`)

O workflow npm-publish já não publica diretamente: inicia o tarball empacotado
(`check:pack-boot`) e, em seguida, executa `npm stage publish` — os bytes exatos ficam armazenados no
registo, **não sendo instaláveis** até que o proprietário os aprove. A validação humana por 2FA passou
para DEPOIS da prova, não antes.

**Fluxo do proprietário depois de o workflow ficar verde:**

1. `npm stage list omniroute` — localize o id da fase (também apresentado no resumo do workflow).
2. Verifique os bytes faseados (recomendado): `npm stage download <id>` e, em seguida, instale o
   tarball transferido num prefixo temporário e inicie-o (`npm run check:pack-boot` automatiza
   o mesmo veredito empacotar→instalar→iniciar na CI).
3. `npm stage approve <id>` — o pedido de 2FA É a publicação. `npm stage reject <id>` descarta-a.
4. Rede de segurança pós-publicação: o verificador pós-publicação (WS1.4 do plano da v3.8.49) instala a
   versão publicada a partir do registo público num contentor limpo e inicia-a.

**Alternativa de emergência:** `workflow_dispatch` com `publish_mode=direct` restaura o
`npm publish` imediato antigo (utilize apenas se o próprio faseamento não funcionar corretamente; registe o motivo).

**Reforço único (proprietário, npmjs.com):** configure o Trusted Publisher para
`omniroute` no modo exclusivo de faseamento, para que um token de longa duração exposto não possa executar `npm publish`
diretamente a partir de qualquer lugar — a CI apenas pode fasear; só a 2FA do proprietário efetua o lançamento.

**Procedimento para artefactos danificados (inalterado):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
como reação predefinida (demora minutos e é reversível); utilize `npm unpublish` apenas dentro do período de 72 horas/sem dependentes
e nunca como primeira medida. Docker: nunca reescreva uma tag de versão — a reversão consiste em
redirecionar `latest` para o último digest válido.

**`latest` no Docker Hub (obrigatório em cada publicação SemVer estável):** o
workflow `docker-publish` tem de atribuir a tag **tanto** a `X.Y.Z` **como**, quando
`should-promote-latest.sh` confirmar que esta é a versão SemVer estável mais elevada, a `:latest`,
com o **mesmo digest**. Após o job: o digest `latest` do Hub é igual ao novo
digest SemVer e o `last_updated` foi atualizado. Não deixe `:latest` apontado para uma
build mais antiga enquanto as notas de lançamento mencionam correções que só existem no git. Os inícios rápidos
do Compose utilizam `:latest`; o GitOps deve continuar a fixar `X.Y.Z`. Consulte
[Canais de lançamento do Docker](../guides/DOCKER_GUIDE.md#release-channels) e #10317.

## Via Rápida de Hotfix (etiqueta `hotfix`)

Um PR com a etiqueta `hotfix` ignora a pesada matriz de CI (E2E com 9 shards, incremento de cobertura,
quality-gate, quality-extended) e mantém as verificações rápidas e de elevado valor: build,
shards unitários, integração, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
e o teste de fumo de arranque do tarball (`check:pack-boot`). Objetivo: ficar verde em ≤15min em vez de ~33min.

**Política de entrada — todos os quatro requisitos são obrigatórios (inspirada nas vias de emergência do Chromium/VS Code/Node):**

1. **Gravidade**: a produção está avariada — um artefacto publicado falha no arranque /
   uma correção de segurança / todos os utilizadores da versão são afetados. «Importante» não significa «avariado».
2. **Autoridade**: apenas o proprietário do repositório aplica a etiqueta `hotfix`. A etiqueta É
   a aprovação — nunca deve ser aplicada autonomamente num PR de campanha.
3. **Provas**: o corpo do PR inclui uma ligação para a execução pesada anterior totalmente verde (a suite que
   as tarefas ignoradas voltariam a validar), bem como o teste da própria correção, primeiro a falhar e depois a passar.
4. **Âmbito**: apenas cherry-pick — a correção mínima, sem refatorações nem alterações adicionais.

A superfície de cobertura/incremento ignorada é novamente validada pela execução completa seguinte no
ramo de lançamento (lançamento continuamente verde) — esta via ignora a ESPERA, nunca a validação.
As diferenças apenas em testes (todos os ficheiros em `tests/`, nenhum em `tests/e2e/`) ignoram automaticamente
a matriz E2E, sem qualquer etiqueta.

## Lista de Verificação Detalhada

### Pré-lançamento

- [ ] Todos os PRs destinados a esta versão estão integrados em `release/vX.Y.0`
- [ ] Todos os itens abertos no Linear/issues para esta versão estão fechados ou foram movidos para o marco seguinte
- [ ] CI verde no ramo `release/vX.Y.0`
- [ ] Sem marcadores `TODO(release)` no código: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Imagem base do Docker atualizada (atualmente `node:24.15.0-trixie-slim`)

### Versão e Registo de Alterações

- [ ] Executar `/version-bump-cc <patch|minor|major>` (skill do Claude Code)
  - Atualiza as versões em `package.json`, `electron/package.json`
  - Volta a gerar `CHANGELOG.md` a partir dos commits do git desde a última tag
  - Atualiza os badges do README.md
- [ ] Rever manualmente o CHANGELOG.md e corrigir as mensagens de commit, se necessário
- [ ] Garantir que a secção semver mais recente em `CHANGELOG.md` corresponde à versão de `package.json`
- [ ] Manter `## [Unreleased]` como a primeira secção do registo de alterações para trabalho futuro
- [ ] Atualizar `docs/openapi.yaml` → `info.version` deve corresponder à versão de `package.json`

### Qualidade do Código

- [ ] `npm run lint` — 0 erros (os avisos já existiam)
- [ ] `npm run typecheck:core` — sem problemas
- [ ] `npm run typecheck:noimplicit:core` — sem problemas (estrito)
- [ ] `npm run check:cycles` — sem dependências circulares
- [ ] `npm run check:any-budget:t11` — dentro do limite
- [ ] `npm run check:route-validation:t06` — sem problemas
- [ ] `npm run check:node-runtime` — requisito mínimo de runtime suportado cumprido (`>=22.22.2 <23`, `>=24.0.0 <27`, de acordo com `SUPPORTED_NODE_RANGE` em `src/shared/utils/nodeRuntimeSupport.ts`; alinhado com `engines` de `package.json`)

### Testes

- [ ] `npm run test:unit` — passa
- [ ] `npm run test:vitest` — passa (servidor MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — limiar 60/60/60/60 cumprido (instruções/linhas/funções/ramos)
- [ ] `npm run test:integration` — passa (se as alterações afetarem a BD / handlers)
- [ ] `npm run test:combo:matrix` — passa (matriz de estratégias combo: comprova de forma determinística as decisões de seleção das 19 estratégias públicas de encaminhamento; executar ao alterar o encaminhamento combo, a resolução de estratégias ou a lógica de fallback)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcional/manual** (teste de fumo condicionado com upstream real; obtém um snapshot só de leitura da BD a partir do VPS `root@192.168.0.15`; contacta fornecedores reais, consome créditos; nunca é executado em CI; é ignorado de forma limpa sem a condição)
- [ ] `npm run test:combo:live:vps` — **opcional/manual** (teste de fumo em produção no VPS da Fase 3: 7 cenários HTTP contra o servidor `.15` em produção através de Node ESM simples; requer `ssh root@192.168.0.15`; cria/elimina apenas combos `__live_test__*`; contacta fornecedores reais; nunca é executado em CI)
- [ ] `npm run test:e2e` — passa (alterações na IU)
- [ ] `npm run test:protocols:e2e` — passa (alterações MCP/A2A)
- [ ] `npm run test:ecosystem` — passa

### Hooks (validados pelo Husky)

Os hooks do Husky encontram-se em `.husky/` e são executados automaticamente durante operações do git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** verificações rápidas e determinísticas — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (ativadas em 2026-06-13). Exclui intencionalmente `test:unit` (lento; abrangido pela tarefa de CI `test-unit`).
  - Executar `npm run test:unit` manualmente antes de fazer push de ramos de lançamento.

Se um hook falhar: corrija o problema subjacente, não o contorne com `--no-verify`.

### Commits Convencionais

Todos os commits destinados ao lançamento devem seguir o formato `type(scope): subject`.

**Tipos válidos:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Âmbitos válidos:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Alterações incompatíveis: adicionar o rodapé `BREAKING CHANGE:` ou `!` após o âmbito (por exemplo, `feat(api)!: drop /v0`).

### Documentação

- [ ] `npm run check:docs-sync` passa (executado automaticamente pelo pre-commit)
- [ ] `npm run check:docs-all` passa (agregador: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` termina com 0 — o contrato de ambiente entre o código ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` está intacto
- [ ] `npm run check:doc-links` termina com 0 — não existem referências internas de markdown inválidas após a reestruturação
- [ ] `docs/architecture/ARCHITECTURE.md` revisto quanto a divergências de armazenamento/tempo de execução
- [ ] `docs/guides/TROUBLESHOOTING.md` revisto quanto a divergências de variáveis de ambiente e operacionais
- [ ] Se `.env.example` foi alterado: `docs/reference/ENVIRONMENT.md` atualizado
- [ ] Se a nova funcionalidade tiver uma IU: `docs/guides/USER_GUIDE.md` menciona-a
- [ ] Se a nova funcionalidade tiver uma API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` atualizados
- [ ] Se a nova funcionalidade for um módulo: existe um `docs/<MODULE>.md` dedicado
- [ ] Se for uma alteração incompatível: `docs/guides/TROUBLESHOOTING.md` inclui uma nota de migração

### i18n

- [ ] `npm run i18n:check` termina com 0 — o estado das traduções (`.i18n-state.json`) está sincronizado com a documentação de origem (sem fontes divergentes no modo estrito; um aviso no modo de aviso é aceitável para pequenos ajustes de última hora na documentação, mas deve ser 0 antes de criar a etiqueta)
- [ ] `npm run i18n:check-ui-coverage` termina com 0 — todos os idiomas da IU estão no mínimo de cobertura de 80% ou acima
- [ ] `npm run i18n:sync-ui:dry` comunica 0 chaves em falta em todos os 42 idiomas
- [ ] Se a documentação de origem em inglês foi alterada, execute `npm run i18n:run` (requer `OMNIROUTE_TRANSLATION_API_KEY` em `.env`) antes de criar a etiqueta
- [ ] As contribuições de tradução podem ser adiadas para a próxima versão se forem menores (registar no CHANGELOG)

### Migrações da base de dados

- [ ] Se `src/lib/db/migrations/` tiver novos ficheiros:
  - [ ] Cada migração é idempotente (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] As migrações estão encapsuladas em transações
  - [ ] Estão numeradas corretamente (sem lacunas na sequência)
- [ ] Testar numa instalação nova: elimine `~/.omniroute/omniroute.db` e execute `npm run dev`
- [ ] Testar numa instalação existente: faça uma cópia de segurança da BD, execute a migração e verifique o esquema
- [ ] Os ficheiros WAL (`-wal`, `-shm`) são tratados corretamente se a migração reescrever tabelas

### Catálogo de fornecedores (validado por Zod)

- [ ] O esquema Zod de `src/shared/constants/providers.ts` é válido no momento do carregamento
  - [ ] Todos os fornecedores têm os campos obrigatórios (`id`, `label`, `kind`, etc.)
  - [ ] `freeNote` fornecido para novos fornecedores gratuitos
  - [ ] Os fornecedores OAuth têm `oauthConfig` registado em `src/lib/oauth/constants/oauth.ts`
- [ ] Se for adicionado um novo fornecedor: executor correspondente em `open-sse/executors/`
- [ ] Se não usar o formato OpenAI: tradutor em `open-sse/translator/`
- [ ] Modelos registados em `open-sse/config/providerRegistry.ts`
- [ ] Os testes unitários em `tests/unit/` abrangem a classificação e o encaminhamento de fornecedores

### Ambiente de trabalho (Electron)

Se `electron/` foi alterado:

- [ ] `npm run electron:smoke:packaged` passa
- [ ] Compilações testadas para pelo menos um de `:win`, `:mac`, `:linux`
- [ ] Os certificados de assinatura de código não expiraram (se aplicável)
- [ ] A versão de `electron/package.json` corresponde à de `package.json` na raiz
- [ ] O apontador do canal de atualização automática foi atualizado se o lançamento for para `stable`

### Estrutura da compilação

O repositório utiliza três diretórios de saída distintos — nunca os confunda:

| Diretório | Finalidade                                                       | Controlado?             |
| --------- | ---------------------------------------------------------------- | ----------------------- |
| `src/`    | Código-fonte da aplicação (TypeScript / TSX)                     | Sim                     |
| `.build/` | Intermediários da compilação — saída de `next build` (`distDir`) | Não (ignorado pelo git) |
| `dist/`   | Pacote npm distribuível — montado por `assembleStandalone`       | Não (ignorado pelo git) |

> **Nota para o operador:** o diretório da imagem do VPS remoto continua a ser `/usr/lib/node_modules/omniroute/app/`.
> Apenas a saída de compilação **dentro do repositório** foi movida (`app/` → `dist/`). As ferramentas de implementação sincronizam
> o conteúdo de `dist/` por rsync para o diretório remoto `app/` — não são necessárias alterações aos caminhos do VPS.

**Fluxo de compilação única:**

```
npm run build:release
  └─ rm -rf .build dist          (limpeza)
  └─ next build → .build/next/   (intermediários)
  └─ assembleStandalone          (copia standalone + static + public + natives → dist/)
  └─ escreve dist/BUILD_SHA      (sentinela HEAD)
```

NÃO execute `npm run build` seguido de um `npm run build:cli` separado para a implementação — utilize
`npm run build:release`, que efetua uma recompilação limpa + sentinela num único comando.

### Validação dos artefactos

- [ ] `npm run build:release` é concluído com êxito e `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` sem problemas — sem `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ou outros resíduos locais
- [ ] `dist/server.js` existe após a compilação

### Etiquetagem e lançamento

- [ ] Execute `/generate-release-cc` (ferramenta do Claude Code):
  - Cria a etiqueta `vX.Y.Z`
  - Envia a etiqueta e o ramo
  - Abre uma versão no GitHub com o corpo do registo de alterações
  - Anexa os instaladores do Electron (se tiverem sido compilados)
- [ ] Ou manualmente:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Implementação

As ferramentas de implementação utilizam o fluxo rsync ligeiro — sem `npm pack` nem `npm i -g`:

- [ ] Utilize a ferramenta de implementação que corresponde ao destino:
  - `/deploy-vps-local-cc` — VPS local (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS da Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — ambos
- [ ] Antes da implementação, confirme que `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] A compilação tem de ser executada onde `node_modules` seja real (checkout principal ou árvore de trabalho com `npm ci` executado — NÃO uma árvore de trabalho com ligações simbólicas)
- [ ] Efetue um teste rápido à instância implementada:
  - Abra `/dashboard/health` → confirme que a cadeia da versão corresponde à versão lançada
  - Execute um pedido a `/v1/chat/completions` através de um fornecedor conhecido
  - Verifique se `/api/monitoring/health` devolve disjuntores `CLOSED`
  - Confirme que os transportes MCP respondem (`/mcp` HTTP, `/mcp-sse` SSE)

### Pós-lançamento

- [ ] Executar `/capture-release-evidences-cc` (skill do Claude Code)
  - Captura imagens/gravações WebP das novas funcionalidades
  - Anexa-as às notas de versão / publicação do blogue
- [ ] Atualizar as GitHub Discussions / o Discord com o anúncio da versão
- [ ] Abrir um marco para a próxima versão
- [ ] Se for crítico: afixar a discussão ou publicar em `news.json` para apresentar uma faixa na aplicação

### Critérios para o lançamento público do Radar

O anúncio do Radar é intencionalmente consolidado com `active: false`. A ativação é uma alteração
separada, efetuada depois de todos os itens abaixo terem sido comprovados:

- [ ] Todos os PRs encadeados do Radar estão integrados e o CI da versão final está verde
- [ ] Implementar e efetuar testes rápidos às rotas OSS do Radar, mantendo `RADAR_ENABLED` desativado por predefinição
- [ ] Efetuar testes rápidos a `GET /planos`, `/termos`, `/privacidade` e `/reembolso` no anfitrião designado do Radar
- [ ] Registar a identidade/contacto/morada do operador e a revisão jurídica aprovada pelo proprietário no serviço privado
- [ ] Testar o Stripe Checkout e o webhook assinado apenas em modo de teste
- [ ] Testar a entrega de um e-mail transacional encriptado com o remetente/domínio aprovado
- [ ] Comprovar o restauro da cópia de segurança e uma execução de investigação supervisionada e com orçamento limitado
- [ ] Aprovar a política de revisão de BRL/PIX antes de aceitar comprovativos de donativos
- [ ] Ativar o Checkout público apenas após os critérios anteriores terem sido cumpridos e, em seguida, ativar o novo ID de `news.json`
- [ ] Verificar se a faixa da página inicial utiliza texto localizado e se um novo ID reaparece depois de um ID anterior ser dispensado

## Teste de fumo dos Serviços Incorporados (v3.8.4+)

Antes de disponibilizar qualquer versão que inclua alterações aos serviços incorporados, verifique:

### Arranque com BD nova (deteta colisões de migrações — adicionado após a correção urgente da v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — aguarde 10 s pelo arranque
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` devolve `"9router"` (NÃO 404, NÃO 500). Confirma que a migração `071_services.sql` foi aplicada e que a linha foi criada.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` devolve 3 linhas.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` devolve 2 linhas (valida que `070_webhooks_kind_metadata.sql` foi aplicada).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` é concluído com êxito — protege contra futuras colisões.

### 9Router

- [ ] `POST /api/services/9router/install` devolve 200 com `installedVersion` em menos de 2 min
- [ ] `POST /api/services/9router/start` devolve 200 e `state: "running"` em menos de 30 s
- [ ] `GET /api/services/9router/status` indica `health: "healthy"`
- [ ] `POST /v1/chat/completions` com `"model": "9router/auto/..."` devolve 200 (encaminhamento de ponta a ponta através do 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` apresenta a interface nativa do 9Router dentro do proxy (sem iframe direto para `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` devolve `{ keyRotated: true }` e o serviço reinicia sem problemas
- [ ] `POST /api/services/9router/stop` devolve 200 e `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` devolve um fluxo SSE com um evento `snapshot` que contém as linhas recentes
- [ ] A instalação num ambiente sem `npm` no PATH devolve 500 com uma mensagem de erro clara (sem rastreio da pilha)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` devolve 200 em menos de 2 min
- [ ] `POST /api/services/cliproxy/start` devolve 200 e `state: "running"` em menos de 30 s
- [ ] `GET /api/services/cliproxy/status` indica `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` devolve 200 e `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` devolve um fluxo SSE

### Regressão de segurança

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` devolve `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` devolve `403 LOCAL_ONLY`
- [ ] As respostas de erro de `/api/services/*` não contêm `err.stack` nem caminhos de ficheiros absolutos

## Verificações para a v3.8.0+

Antes de disponibilizar qualquer versão v3.8.x, verifique também estes itens:

- [ ] `omniroute --tray` arranca no macOS (systray2 instalado em `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` arranca no Linux (requer DISPLAY; apresenta um erro claro se não estiver definido)
- [ ] `omniroute --tray` arranca no Windows (PowerShell NotifyIcon, sem binários adicionais)
- [ ] `omniroute config tray enable` cria uma entrada de arranque automático; a desativação remove-a
- [ ] `npm install -g omniroute@<this-version>` executa o postinstall sem terminar com um erro fatal
- [ ] O processo de atualização mantém as dependências opcionais: `omniroute update --apply` e o atualizador automático
      executam `npm install -g … --include=optional` para que as `optionalDependencies` (better-sqlite3,
      keytar, tls-client e a pilha SLM do llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) sejam preservadas após uma atualização. O nível SLM ultra `modelPath` também requer o
      modelo tinybert, transferido automaticamente para `${DATA_DIR}/models/llmlingua` na primeira utilização. Em seguida, o postinstall
      (`scripts/build/colocateOptionals.mjs`) coloca o conjunto de dependências opcionais do SLM em
      `dist/node_modules`, para que o worker resolva uma ÚNICA instância de `@huggingface/transformers` ^4.2.0
      — o rastreio autónomo inclui apenas transformers, não as dependências opcionais importadas dinamicamente;
      sem isto, o worker carregaria llmlingua-2 com transformers da raiz e o nível SLM faria silenciosamente
      uma recuperação em modo aberto.
- [ ] `omniroute status` funciona sem `.env` (caminho do token da CLI, apenas loopback)
- [ ] `curl http://localhost:20128/api/shutdown` devolve 401 (rota sempre protegida)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` devolve 401 (proteção de loopback)
- [ ] O runtime do SQLite é resolvido como `bundled` na primeira execução (binário incluído válido para a plataforma)
- [ ] O runtime do SQLite recorre a `runtime` quando `node_modules/better-sqlite3` é eliminado
- [ ] O filtro MCP inteligente comprime a saída real de `playwright-mcp browser_snapshot` (redução ≥50%)
- [ ] Todos os 10 ficheiros `skills/omniroute*/SKILL.md` estão acessíveis publicamente através de um URL raw do GitHub
- [ ] O assistente de integração apresenta o passo de introdução aos níveis "Como funciona" numa configuração nova
- [ ] O widget de cobertura de níveis do painel principal apresenta as contagens configuradas/ativas

---

## Reversão

Se a versão tiver um problema crítico:

1. `gh release edit vX.Y.Z --prerelease` (marca-a como não sendo a mais recente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (apenas se ainda não tiver sido adotada pelos utilizadores)
3. Ou: correção urgente em `release/vX.Y.0` → versão de correção `vX.Y.(Z+1)`
4. Comunicar imediatamente no GitHub Discussions e no Discord

## Regras obrigatórias

- Nunca fazer commit diretamente em `main`
- Nunca utilizar `git push --force` em `main` ou em branches `release/*`
- Nunca ignorar os hooks do Husky (`--no-verify`)
- Nunca incluir segredos, credenciais ou ficheiros `.env` num commit
- A cobertura tem de permanecer ≥60/60/60/60 (instruções/linhas/funções/branches)
- Incluir ou atualizar sempre os testes ao alterar código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`

## Verificação automática de sincronização

Executar localmente a verificação de sincronização da documentação antes de abrir um PR:

```bash
npm run check:docs-sync
```

O CI também executa esta verificação em `.github/workflows/ci.yml` (tarefa de lint).
