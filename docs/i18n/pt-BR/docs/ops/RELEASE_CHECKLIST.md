# Release Checklist (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Última atualização:** 2026-08-28 — v3.8.51
> Fluxo de lançamento simplificado que utiliza skills do Claude Code para automação.
>
> **Mantenha a fila/branch verde entre lançamentos:** consulte [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (família `/green-prs` + `npm run check:release-green` + `/babysit` + execução noturna). Executar
> isso periodicamente — e especialmente **antes** deste checklist — faz com que o PR de lançamento comece verde.

## Resumo

```bash
# 1. Incrementar a versão + gerar o CHANGELOG (skill)
/version-bump-cc patch    # ou minor/major

# 2. Executar a verificação de qualidade localmente
npm run check              # lint + testes
npm run test:coverage      # verificação completa de cobertura (60/60/60/60)

# 3. Compilar e executar o teste de fumaça
npm run build
npm run test:e2e           # opcional, mas recomendado

# 4. Gerar o lançamento (skill)
/generate-release-cc

# 5. Implantar (skill)
/deploy-vps-both-cc        # ou akamai-cc / local-cc

# 6. Capturar evidências do lançamento (skill)
/capture-release-evidences-cc
```

## Publicação confiável do npm (padrão desde a v3.8.51) — preparada mediante solicitação, direta como alternativa

O `npm-publish.yml` publica por meio do **npm Trusted Publishing (OIDC)** por padrão: o
job `stage-npm` (hospedado pelo GitHub) troca o id-token do GitHub por uma credencial
npm de curta duração para essa execução — sem token npm de longa duração nos segredos do repositório, sem solicitação de 2FA, com proveniência anexada.
Esse é o mecanismo de bypass aprovado pelo npm agora que os tokens que ignoram a 2FA estão sendo descontinuados;
ele restaura o fluxo totalmente automático que o projeto tinha até a v3.8.48, mantendo a
garantia da WS1.3 (um token vazado não pode publicar sozinho — não há token).

**Configuração única (proprietário):** npmjs.com → pacote `omniroute` → Settings → _Trusted
Publisher_ → GitHub: proprietário `diegosouzapw`, repositório `OmniRoute`, workflow `npm-publish.yml`
(ambiente: nenhum). Até que isso exista, a etapa automática falhará com `ENEEDAUTH`:
execute novamente com `publish_mode=staged` (abaixo) ou `direct`.

### Publicação preparada (mediante solicitação — `publish_mode=staged`)

O workflow npm-publish não publica mais diretamente: ele inicializa o tarball empacotado
(`check:pack-boot`) e então executa `npm stage publish` — os bytes exatos ficam armazenados no
registro, **não instaláveis** até que o proprietário aprove. A barreira humana de 2FA foi movida
para DEPOIS da comprovação, e não antes dela.

**Fluxo do proprietário após o workflow ficar verde:**

1. `npm stage list omniroute` — encontre o ID da preparação (também exibido no resumo do workflow).
2. Verifique os bytes preparados (recomendado): `npm stage download <id>` e, em seguida, instale o
   tarball baixado em um prefixo temporário e inicialize-o (`npm run check:pack-boot` automatiza
   o mesmo veredito de empacotar→instalar→inicializar na CI).
3. `npm stage approve <id>` — a solicitação de 2FA É a publicação. `npm stage reject <id>` descarta.
4. Proteção pós-publicação: o verificador pós-publicação (WS1.4 do plano da v3.8.49) instala a
   versão publicada a partir do registro público em um contêiner limpo e a inicializa.

**Alternativa de emergência:** `workflow_dispatch` com `publish_mode=direct` restaura a
publicação imediata legada com `npm publish` (use apenas se a própria preparação apresentar problemas; registre o motivo).

**Reforço de segurança único (proprietário, npmjs.com):** configure o Trusted Publisher para
`omniroute` no modo somente preparação, de forma que um token de longa duração vazado não possa executar `npm publish`
diretamente de nenhum lugar — a CI só pode preparar; somente a 2FA do proprietário libera a publicação.

**Procedimento para artefato com defeito (inalterado):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
como reação padrão (leva minutos, reversível); `npm unpublish` somente dentro da janela de 72 horas/sem dependentes
e nunca como primeira medida. Docker: nunca sobrescreva uma tag de versão — o rollback consiste em
redirecionar `latest` para o último digest válido.

**`latest` no Docker Hub (obrigatório em toda publicação SemVer estável):** o
workflow `docker-publish` deve marcar **tanto** `X.Y.Z` quanto, quando
`should-promote-latest.sh` confirmar que essa é a maior SemVer estável, `:latest`
com o **mesmo digest**. Após o job: o digest de `latest` no Hub deve ser igual ao novo
digest SemVer e `last_updated` deve ter sido atualizado. Não deixe `:latest` apontando para uma
compilação mais antiga enquanto as notas de lançamento mencionam correções que só existem no git. Os inícios rápidos do Compose
usam `:latest`; o GitOps deve continuar fixando `X.Y.Z`. Consulte
[Canais de lançamento do Docker](../guides/DOCKER_GUIDE.md#release-channels) e #10317.

## Via Rápida de Hotfix (rótulo `hotfix`)

Uma PR com o rótulo `hotfix` ignora a matriz pesada de CI (E2E com 9 shards, mecanismo incremental de cobertura,
quality-gate, quality-extended) e mantém as verificações rápidas e de alto valor: build,
shards de testes unitários, integração, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
e o smoke test de inicialização do tarball (`check:pack-boot`). Meta: ficar verde em ≤15min, em vez de ~33min.

**Política de entrada — todos os quatro requisitos são obrigatórios (baseada nas vias emergenciais do Chromium/VS Code/Node):**

1. **Severidade**: a produção está quebrada — um artefato publicado falha ao inicializar / uma
   correção de segurança / todos os usuários da versão são afetados. "Importante" não significa "quebrado".
2. **Autoridade**: somente o proprietário do repositório aplica o rótulo `hotfix`. O rótulo É
   a aprovação — nunca deve ser aplicado por iniciativa própria em uma PR de campanha.
3. **Evidência**: o corpo da PR contém um link para a execução pesada anterior totalmente verde (a suíte que
   os jobs ignorados revalidariam), além do teste da própria correção, primeiro falhando e depois passando.
4. **Escopo**: somente cherry-pick — a correção mínima, sem refatorações nem alterações adicionais.

A superfície ignorada de cobertura/mecanismo incremental é revalidada pela próxima execução completa na
branch de release (release continuamente verde) — a via ignora a ESPERA, nunca a validação.
Diffs somente de testes (todos os arquivos em `tests/`, nenhum em `tests/e2e/`) ignoram a matriz E2E
automaticamente, sem nenhum rótulo.

## Checklist Detalhado

### Pré-release

- [ ] Todas as PRs destinadas a esta release estão mescladas em `release/vX.Y.0`
- [ ] Todos os itens abertos no Linear/issues desta versão estão fechados ou movidos para o próximo marco
- [ ] CI verde na branch `release/vX.Y.0`
- [ ] Nenhum marcador `TODO(release)` no código: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Imagem base do Docker atualizada (atualmente `node:24.15.0-trixie-slim`)

### Versão e Changelog

- [ ] Execute `/version-bump-cc <patch|minor|major>` (skill do Claude Code)
  - Atualiza as versões em `package.json`, `electron/package.json`
  - Regenera `CHANGELOG.md` a partir dos commits do git desde a última tag
  - Atualiza os badges de README.md
- [ ] Revise manualmente CHANGELOG.md e ajuste as mensagens de commit, se necessário
- [ ] Garanta que a seção semver mais recente em `CHANGELOG.md` corresponda à versão de `package.json`
- [ ] Mantenha `## [Unreleased]` como a primeira seção do changelog para trabalhos futuros
- [ ] Atualize `docs/openapi.yaml` → `info.version` deve corresponder à versão de `package.json`

### Qualidade do Código

- [ ] `npm run lint` — 0 erros (os avisos já existiam)
- [ ] `npm run typecheck:core` — sem problemas
- [ ] `npm run typecheck:noimplicit:core` — sem problemas (estrito)
- [ ] `npm run check:cycles` — sem dependências circulares
- [ ] `npm run check:any-budget:t11` — dentro do limite
- [ ] `npm run check:route-validation:t06` — sem problemas
- [ ] `npm run check:node-runtime` — requisito mínimo de runtime compatível atendido (`>=22.22.2 <23`, `>=24.0.0 <27`, conforme `SUPPORTED_NODE_RANGE` em `src/shared/utils/nodeRuntimeSupport.ts`; alinhado com `engines` de `package.json`)

### Testes

- [ ] `npm run test:unit` — aprovado
- [ ] `npm run test:vitest` — aprovado (servidor MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — requisito 60/60/60/60 atendido (instruções/linhas/funções/branches)
- [ ] `npm run test:integration` — aprovado (se as alterações afetarem o DB / handlers)
- [ ] `npm run test:combo:matrix` — aprovado (matriz de estratégias de combo: comprova deterministicamente as decisões de seleção de todas as 19 estratégias públicas de roteamento; execute ao alterar o roteamento de combos, a resolução de estratégias ou a lógica de fallback)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcional/manual** (smoke test controlado com upstreams reais; obtém um snapshot somente leitura do DB no VPS `root@192.168.0.15`; acessa provedores reais, consome créditos; nunca é executado no CI; é ignorado corretamente sem a condição de ativação)
- [ ] `npm run test:combo:live:vps` — **opcional/manual** (smoke test ao vivo da Fase 3 no VPS: 7 cenários HTTP no servidor `.15` ativo via Node ESM puro; exige `ssh root@192.168.0.15`; cria/exclui somente combos `__live_test__*`; acessa provedores reais; nunca é executado no CI)
- [ ] `npm run test:e2e` — aprovado (alterações na UI)
- [ ] `npm run test:protocols:e2e` — aprovado (alterações em MCP/A2A)
- [ ] `npm run test:ecosystem` — aprovado

### Hooks (validados pelo Husky)

Os hooks do Husky ficam em `.husky/` e são executados automaticamente nas operações do git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** verificações rápidas e determinísticas — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (ativadas em 2026-06-13). Exclui intencionalmente `test:unit` (lento; coberto pelo job `test-unit` do CI).
  - Execute `npm run test:unit` manualmente antes de enviar branches de release.

Se um hook falhar: corrija o problema subjacente; não o ignore com `--no-verify`.

### Commits Convencionais

Todos os commits destinados à release devem seguir o formato `type(scope): subject`.

**Tipos válidos:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Escopos válidos:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Alterações incompatíveis: adicione o rodapé `BREAKING CHANGE:` ou `!` após o escopo (por exemplo, `feat(api)!: drop /v0`).

### Documentação

- [ ] `npm run check:docs-sync` passa (executado automaticamente pelo pre-commit)
- [ ] `npm run check:docs-all` passa (agregador: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` encerra com código 0 — o contrato de variáveis de ambiente entre o código ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` está íntegro
- [ ] `npm run check:doc-links` encerra com código 0 — nenhuma referência interna de markdown quebrada após a reestruturação
- [ ] `docs/architecture/ARCHITECTURE.md` revisado quanto a divergências de armazenamento/runtime
- [ ] `docs/guides/TROUBLESHOOTING.md` revisado quanto a divergências de variáveis de ambiente e operação
- [ ] Se `.env.example` foi alterado: `docs/reference/ENVIRONMENT.md` atualizado
- [ ] Se o novo recurso tem uma interface: `docs/guides/USER_GUIDE.md` o menciona
- [ ] Se o novo recurso tem uma API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` atualizados
- [ ] Se o novo recurso é um módulo: existe um `docs/<MODULE>.md` dedicado
- [ ] Se é uma alteração incompatível: `docs/guides/TROUBLESHOOTING.md` contém uma nota de migração

### i18n

- [ ] `npm run i18n:check` encerra com código 0 — o estado das traduções (`.i18n-state.json`) está sincronizado com a documentação de origem (nenhuma fonte divergente no modo estrito; o aviso no modo de advertência é aceitável para ajustes de última hora na documentação, mas deve estar em 0 antes de criar a tag)
- [ ] `npm run i18n:check-ui-coverage` encerra com código 0 — todos os locales da interface estão no mínimo de cobertura de 80% ou acima dele
- [ ] `npm run i18n:sync-ui:dry` informa 0 chaves ausentes em todos os 42 locales
- [ ] Se a documentação de origem em inglês foi alterada, execute `npm run i18n:run` (requer `OMNIROUTE_TRANSLATION_API_KEY` no `.env`) antes de criar a tag
- [ ] Contribuições de tradução podem ser adiadas para a próxima versão se forem pequenas (registre no CHANGELOG)

### Migrações de Banco de Dados

- [ ] Se `src/lib/db/migrations/` contém novos arquivos:
  - [ ] Cada migração é idempotente (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Migrações encapsuladas em transações
  - [ ] Numeração correta (sem lacunas na sequência)
- [ ] Teste em uma instalação nova: exclua `~/.omniroute/omniroute.db` e execute `npm run dev`
- [ ] Teste em uma instalação existente: faça backup do banco de dados, execute a migração e verifique o esquema
- [ ] Arquivos WAL (`-wal`, `-shm`) tratados corretamente se a migração reescrever tabelas

### Catálogo de Provedores (validado pelo Zod)

- [ ] O esquema Zod de `src/shared/constants/providers.ts` é válido no carregamento
  - [ ] Todos os provedores têm os campos obrigatórios (`id`, `label`, `kind`, etc.)
  - [ ] `freeNote` fornecido para novos provedores gratuitos
  - [ ] Provedores OAuth têm `oauthConfig` registrado em `src/lib/oauth/constants/oauth.ts`
- [ ] Se um novo provedor foi adicionado: executor correspondente em `open-sse/executors/`
- [ ] Se o formato não for OpenAI: tradutor em `open-sse/translator/`
- [ ] Modelos registrados em `open-sse/config/providerRegistry.ts`
- [ ] Testes unitários em `tests/unit/` cobrem a classificação e o roteamento de provedores

### Desktop (Electron)

Se `electron/` foi alterado:

- [ ] `npm run electron:smoke:packaged` passa
- [ ] Builds testados em pelo menos um destes destinos: `:win`, `:mac`, `:linux`
- [ ] Certificados de assinatura de código não expiraram (se houver assinatura)
- [ ] A versão em `electron/package.json` corresponde à do `package.json` raiz
- [ ] Ponteiro do canal de atualização automática atualizado se a versão for publicada em `stable`

### Layout de Build

O repositório usa três diretórios de saída distintos — nunca os confunda:

| Diretório | Finalidade                                                  | Rastreado?              |
| --------- | ----------------------------------------------------------- | ----------------------- |
| `src/`    | Código-fonte da aplicação (TypeScript / TSX)                | Sim                     |
| `.build/` | Intermediários de build — saída de `next build` (`distDir`) | Não (ignorado pelo git) |
| `dist/`   | Pacote npm distribuível — montado por `assembleStandalone`  | Não (ignorado pelo git) |

> **Nota para operadores:** o diretório da imagem no VPS remoto continua sendo `/usr/lib/node_modules/omniroute/app/`.
> Apenas a saída de build **dentro do repositório** foi movida (`app/` → `dist/`). As skills de implantação sincronizam
> o conteúdo de `dist/` via rsync para o diretório remoto `app/` — nenhuma alteração nos caminhos do VPS é necessária.

**Fluxo de build único:**

```
npm run build:release
  └─ rm -rf .build dist          (limpeza)
  └─ next build → .build/next/   (intermediários)
  └─ assembleStandalone          (copia standalone + static + public + natives → dist/)
  └─ grava dist/BUILD_SHA        (sentinela do HEAD)
```

NÃO execute `npm run build` seguido por um `npm run build:cli` separado para a implantação — use
`npm run build:release`, que executa uma recompilação limpa + sentinela em um único comando.

### Validação de Artefatos

- [ ] `npm run build:release` é concluído com sucesso e `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` sem problemas — nenhum `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ou outro resíduo local
- [ ] `dist/server.js` existe após o build

### Criação de Tag e Release

- [ ] Execute `/generate-release-cc` (skill do Claude Code):
  - Cria a tag `vX.Y.Z`
  - Envia a tag e a branch
  - Abre uma Release no GitHub com o corpo do changelog
  - Anexa os instaladores do Electron (se tiverem sido criados)
- [ ] Ou manualmente:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Implantação

As skills de implantação usam o fluxo leve com rsync — sem `npm pack`, sem `npm i -g`:

- [ ] Use a skill de implantação correspondente ao destino:
  - `/deploy-vps-local-cc` — VPS local (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS da Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — ambos
- [ ] Antes de implantar, confirme que `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] O build deve ser executado onde `node_modules` seja real (checkout principal ou worktree preparado com `npm ci` — NÃO um worktree com link simbólico)
- [ ] Faça um teste de fumaça na instância implantada:
  - Abra `/dashboard/health` → verifique se a string da versão corresponde à release
  - Execute uma solicitação para `/v1/chat/completions` usando um provedor conhecido
  - Verifique se `/api/monitoring/health` retorna circuit breakers `CLOSED`
  - Confirme que os transportes MCP respondem (`/mcp` HTTP, `/mcp-sse` SSE)

### Pós-release

- [ ] Execute `/capture-release-evidences-cc` (skill do Claude Code)
  - Captura screenshots/gravações em WebP das novas funcionalidades
  - Anexa às notas da versão / postagem do blog
- [ ] Atualize o GitHub Discussions / Discord com o anúncio da versão
- [ ] Abra um marco para a próxima versão
- [ ] Se for crítico: fixe a discussão ou publique em `news.json` para exibir um banner no aplicativo

### Critérios para o lançamento público do Radar

O anúncio do Radar foi intencionalmente commitado com `active: false`. A ativação é uma alteração
separada, realizada depois que todos os itens abaixo tiverem suas evidências registradas:

- [ ] Todos os PRs empilhados do Radar estão mesclados e a CI da ponta da versão está verde
- [ ] Faça o deploy e o smoke test das rotas OSS do Radar com `RADAR_ENABLED` ainda desativado por padrão
- [ ] Faça o smoke test de `GET /planos`, `/termos`, `/privacidade` e `/reembolso` no host designado do Radar
- [ ] Registre a identidade/o contato/o endereço do operador e a revisão jurídica aprovada pelo proprietário no serviço privado
- [ ] Teste o Stripe Checkout e o webhook assinado somente no modo de teste
- [ ] Teste uma entrega de e-mail transacional criptografado com o remetente/domínio aprovado
- [ ] Comprove a restauração do backup e uma execução de pesquisa supervisionada e com orçamento limitado
- [ ] Aprove a política de revisão de BRL/PIX antes de aceitar comprovantes de doação
- [ ] Ative o Checkout público somente após os critérios anteriores e, em seguida, ative o novo ID de `news.json`
- [ ] Verifique se o banner da página inicial usa texto localizado e se um novo ID reaparece depois que um ID anterior é dispensado

## Teste de fumaça dos Serviços Incorporados (v3.8.4+)

Antes de publicar qualquer versão que inclua alterações nos serviços incorporados, verifique:

### Inicialização com banco de dados novo (detecta colisões de migração — adicionado após o hotfix da v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — aguarde 10 s para a inicialização
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` retorna `"9router"` (NÃO 404, NÃO 500). Confirma que a migração `071_services.sql` foi aplicada e que a linha foi inserida.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` retorna 3 linhas.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` retorna 2 linhas (valida que `070_webhooks_kind_metadata.sql` foi aplicada).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` passa — protege contra colisões futuras.

### 9Router

- [ ] `POST /api/services/9router/install` retorna 200 com `installedVersion` em menos de 2 min
- [ ] `POST /api/services/9router/start` retorna 200 e `state: "running"` em menos de 30 s
- [ ] `GET /api/services/9router/status` informa `health: "healthy"`
- [ ] `POST /v1/chat/completions` com `"model": "9router/auto/..."` retorna 200 (roteamento de ponta a ponta por meio do 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderiza a interface nativa do 9Router dentro do proxy (sem iframe direto para `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` retorna `{ keyRotated: true }` e o serviço reinicia corretamente
- [ ] `POST /api/services/9router/stop` retorna 200 e `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` retorna um fluxo SSE com um evento `snapshot` contendo linhas recentes
- [ ] A instalação em um ambiente sem `npm` no PATH retorna 500 com uma mensagem de erro amigável (sem rastreamento de pilha)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` retorna 200 em menos de 2 min
- [ ] `POST /api/services/cliproxy/start` retorna 200 e `state: "running"` em menos de 30 s
- [ ] `GET /api/services/cliproxy/status` informa `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` retorna 200 e `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` retorna um fluxo SSE

### Regressão de segurança

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` retorna `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` retorna `403 LOCAL_ONLY`
- [ ] As respostas de erro de `/api/services/*` não contêm `err.stack` nem caminhos absolutos de arquivos

## Verificações para v3.8.0+

Antes de publicar qualquer versão v3.8.x, verifique também estes itens:

- [ ] `omniroute --tray` inicializa no macOS (systray2 instalado em `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` inicializa no Linux (requer DISPLAY; erro tratado adequadamente caso não esteja definido)
- [ ] `omniroute --tray` inicializa no Windows (PowerShell NotifyIcon, sem binários adicionais)
- [ ] `omniroute config tray enable` cria uma entrada de inicialização automática; a desativação a remove
- [ ] `npm install -g omniroute@<this-version>` executa o postinstall sem encerramento fatal
- [ ] O processo de atualização mantém as dependências opcionais: `omniroute update --apply` e o atualizador automático
      executam `npm install -g … --include=optional` para que as `optionalDependencies` (better-sqlite3,
      keytar, tls-client e a pilha SLM do llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) sejam preservadas após uma atualização. O nível SLM ultra `modelPath` também precisa do
      modelo tinybert, baixado automaticamente para `${DATA_DIR}/models/llmlingua` no primeiro uso. Em seguida, o postinstall
      (`scripts/build/colocateOptionals.mjs`) coloca o conjunto opcional do SLM junto em
      `dist/node_modules` para que o worker resolva uma ÚNICA instância de `@huggingface/transformers` ^4.2.0
      — o rastreamento independente inclui apenas transformers, não os opcionais importados dinamicamente;
      sem isso, o worker carregaria llmlingua-2 usando transformers da raiz, e o nível SLM silenciosamente
      adotaria o comportamento de fail-open.
- [ ] `omniroute status` funciona sem `.env` (caminho de token da CLI, somente loopback)
- [ ] `curl http://localhost:20128/api/shutdown` retorna 401 (rota sempre protegida)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` retorna 401 (proteção de loopback)
- [ ] O runtime do SQLite é resolvido como `bundled` na primeira execução (binário empacotado válido para a plataforma)
- [ ] O runtime do SQLite usa `runtime` como fallback quando `node_modules/better-sqlite3` é excluído
- [ ] O filtro MCP inteligente compacta a saída real de `playwright-mcp browser_snapshot` (redução ≥50%)
- [ ] Todos os 10 arquivos `skills/omniroute*/SKILL.md` podem ser acessados publicamente por meio da URL raw do GitHub
- [ ] O assistente de integração exibe a etapa de apresentação dos níveis "How It Works" em uma configuração nova
- [ ] O widget de cobertura de níveis do painel inicial exibe as quantidades configuradas/ativas

---

## Reversão

Se a versão tiver um problema crítico:

1. `gh release edit vX.Y.Z --prerelease` (marca como não sendo a mais recente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (somente se ainda não tiver sido adotada pelos usuários)
3. Ou: correção emergencial em `release/vX.Y.0` → versão de correção `vX.Y.(Z+1)`
4. Comunique imediatamente no GitHub Discussions e no Discord

## Regras Rígidas

- Nunca faça commit diretamente em `main`
- Nunca use `git push --force` nas branches `main` ou `release/*`
- Nunca ignore os hooks do Husky (`--no-verify`)
- Nunca faça commit de segredos, credenciais ou arquivos `.env`
- A cobertura deve permanecer ≥60/60/60/60 (instruções/linhas/funções/branches)
- Sempre inclua ou atualize testes ao alterar código de produção em `src/`, `open-sse/`, `electron/` ou `bin/`

## Verificação Automatizada de Sincronização

Execute localmente a verificação de sincronização da documentação antes de abrir um PR:

```bash
npm run check:docs-sync
```

A CI também executa essa verificação em `.github/workflows/ci.yml` (job de lint).
