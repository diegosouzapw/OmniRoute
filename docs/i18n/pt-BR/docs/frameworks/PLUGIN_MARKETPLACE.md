# Plugin Marketplace (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Fonte da verdade:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` e
> `src/app/(dashboard)/dashboard/plugins/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute inclui um sistema de plugins no estilo do WordPress. Os plugins são
diretórios autocontidos — cada um com um manifesto `plugin.json` e um arquivo de
entrada — que se conectam ao pipeline de requisições (`onRequest` / `onResponse` /
`onError`) e aos eventos do ciclo de vida (`onInstall` / `onActivate` /
`onDeactivate` / `onUninstall`).

O **Marketplace de Plugins** é a camada de descoberta sobre esse sistema. Ele
disponibiliza um catálogo navegável de plugins instaláveis. Por padrão, o catálogo
é um pequeno registro inicial integrado; um operador pode configurá-lo para usar
uma URL de registro remoto personalizado e, nesse caso, a busca é protegida por
uma defesa contra SSRF com resolução de DNS (consulte
[Segurança](#security)).

Todas as rotas de plugins são **exclusivas de loopback** (Nível 1 — `LOCAL_ONLY`):
os plugins carregam e executam código em processos filhos, portanto as rotas ficam
inacessíveis a partir de uma origem que não seja loopback, independentemente da
autenticação. Consulte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Como Tudo se Encaixa

```
Dashboard (/dashboard/plugins)
  ├─ Aba "Instalados"   → GET /api/plugins            (listPlugins)
  │                       POST /api/plugins/scan      (pluginManager.scan)
  │                       POST /api/plugins/{name}/activate|deactivate
  │                       DELETE /api/plugins/{name}   (desinstalação)
  └─ Aba "Marketplace" → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ sem URL personalizada → SEED_REGISTRY integrado
                            └─ URL personalizada → proteção SSRF isSafeMarketplaceUrl()
                                                → safeOutboundFetch(guard:"public-only")
```

- **Camada de registro** — `src/lib/plugins/marketplace.ts`: lista/pesquisa o
  catálogo, recorrendo ao registro inicial em caso de qualquer falha.
- **Camada de ciclo de vida** — `src/lib/plugins/manager.ts` (singleton
  `pluginManager`): instalação, atualização, ativação, desativação,
  desinstalação, varredura e carregamento na inicialização.
- **Camada de manifesto** — `src/lib/plugins/manifest.ts`: esquema Zod + valores
  padrão para `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: descobre plugins no disco, dentro
  do diretório de plugins.
- **Carregador** — `src/lib/plugins/loader.ts`: inicia cada plugin em um processo
  filho isolado e intermedeia chamadas de hooks por IPC.

## Catálogo do Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) retorna uma lista
de objetos `MarketplaceEntry`:

| Campo         | Tipo     | Observações                                      |
| ------------- | -------- | ------------------------------------------------ |
| `name`        | string   | Nome do plugin em kebab-case                     |
| `version`     | string   | semver                                           |
| `description` | string   | Resumo breve                                     |
| `author`      | string   | Autor/organização                                |
| `license`     | string   | ID de licença no estilo SPDX                     |
| `downloadUrl` | string   | URL de download da fonte (pode estar vazia)      |
| `repository`  | string?  | URL opcional do repositório                      |
| `tags`        | string[] | Tags de pesquisa/filtragem                       |
| `downloads`   | number   | Número de downloads                              |
| `rating`      | number   | 0–5                                              |
| `verified`    | boolean  | Indica se a entrada está marcada como verificada |
| `lastUpdated` | string   | String de data em formato semelhante ao ISO      |

Quando nenhuma URL de registro personalizado está configurada, o catálogo usa o
`SEED_REGISTRY` integrado (atualmente `request-logger`, `rate-limiter`,
`cost-tracker` e `theme-manager`). O registro inicial está sempre disponível —
se um registro remoto configurado estiver inacessível, retornar um status
diferente de `200` ou retornar um corpo não reconhecido,
`listMarketplacePlugins()` registrará um aviso e usará a lista inicial como
alternativa.

> Observação: o **catálogo** do marketplace (navegação/pesquisa) está integrado
> de ponta a ponta, mas a **instalação** com um clique a partir do catálogo ainda
> não foi implementada — o botão "Instalar" do dashboard em uma entrada do
> marketplace atualmente exibe um aviso de "em breve". Atualmente, a instalação
> é realizada pelo fluxo de instalação via caminho local (`POST /api/plugins`) e
> pela descoberta no disco (`POST /api/plugins/scan`).

## API REST

Todos os endpoints exigem autenticação de gerenciamento (`requireManagementAuth`) **e**
são restritos ao loopback — `/api/plugins` e `/api/plugins/` estão listados em
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Método | Descrição                                                       |
| -------------------------------- | ------ | --------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Lista os plugins instalados (filtro `?status=` opcional)        |
| `/api/plugins`                   | POST   | Instala um plugin a partir de um caminho local absoluto         |
| `/api/plugins/scan`              | POST   | Verifica o diretório de plugins e registra novos plugins        |
| `/api/plugins/marketplace`       | GET    | Lista as entradas do catálogo do marketplace                    |
| `/api/plugins/[name]`            | GET    | Obtém os detalhes de um plugin instalado                        |
| `/api/plugins/[name]`            | DELETE | Desinstala um plugin                                            |
| `/api/plugins/[name]/activate`   | POST   | Ativa (carrega + registra hooks)                                |
| `/api/plugins/[name]/deactivate` | POST   | Desativa (dispara `onDeactivate`, cancela o registro de hooks)  |
| `/api/plugins/[name]/config`     | GET    | Obtém a configuração do plugin + esquema de configuração        |
| `/api/plugins/[name]/config`     | PUT    | Atualiza a configuração do plugin (validada conforme o esquema) |

O filtro `status` de `GET /api/plugins` aceita um dos seguintes valores:
`installed` / `active` / `inactive` / `error`. Um valor inválido retorna `400`.

### Listar plugins instalados

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalar a partir de um caminho local

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

O `path` deve ser **absoluto** e não pode conter segmentos transversais `..` nem
bytes nulos (restrição imposta pelo Zod). O diretório de origem deve conter um
`plugin.json` válido (ou ser o diretório pai de um). Em caso de sucesso, a resposta
é `201` com o registro do plugin instalado.

### Navegar pelo marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Atualizar a configuração do plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` valida cada valor fornecido conforme o `configSchema` do plugin
(declarado no manifesto): campos `number` respeitam `min`/`max`, e campos
`select` devem corresponder ao `enum` declarado. Chaves que não estão presentes
no esquema são permitidas.

## Configuração

### Diretório de plugins

Os plugins ficam no diretório de dados do OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ou o arquivo apontado por manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) resolve esse diretório em
três etapas:

1. **`OMNIROUTE_PLUGINS_DIR`**, quando definida — usada literalmente,
   independentemente do valor de `HOME`. Esse é o controle explícito para
   Docker/K8s, onde a árvore de plugins é montada por bind em um caminho que
   geralmente não tem relação com o diretório inicial do contêiner (#11827).
2. `<home>/.omniroute/plugins`, em que `<home>` vem das variáveis de ambiente
   `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, quando o processo não exporta nenhum diretório
   inicial.

O diretório resolvido é registrado uma vez na inicialização como
`scanner.dir_resolved`, indicando a entrada escolhida (`OMNIROUTE_PLUGINS_DIR`,
`home` ou `no-home-fallback`) — assim, uma imagem que silenciosamente recorra à
etapa 3 informa isso, em vez de apenas relatar uma lista de plugins vazia.
`POST /api/plugins/scan` encontra qualquer subdiretório nesse local que contenha
um `plugin.json` válido e o registra; o mesmo diretório é a raiz para a qual
`pluginManager.install()` copia os plugins, de modo que uma substituição move
juntas a descoberta e a instalação.

> **`OMNIROUTE_PLUGINS_DIR` não é `OMNIROUTE_PLUGIN_PATH`.** Esta última é lida apenas
> pelo carregador de plugins de comandos da CLI (`bin/cli/plugins.mjs`) para localizar
> pacotes npm `omniroute-cmd-*` que adicionam subcomandos ao `omniroute` — ela não
> afeta o scanner em tempo de execução descrito aqui. Consulte
> [PLUGINS.md](./PLUGINS.md) para obter informações sobre esse mecanismo.

### URL personalizada do registro do marketplace

A origem do catálogo do marketplace é lida da configuração
`pluginMarketplaceUrl` (`src/lib/plugins/marketplace.ts` lê
`settings.pluginMarketplaceUrl`). Quando definida como uma URL `http(s)`,
`listMarketplacePlugins()` busca essa URL e aceita tanto um array JSON de nível
superior contendo entradas quanto um objeto com um array `plugins`; entradas sem
um `name` do tipo string são filtradas. Quando não está definida (ou quando a
busca é bloqueada pela proteção contra SSRF / retorna uma resposta inválida), o
registro inicial integrado é usado.

A aba "Marketplace" do painel disponibiliza um campo para essa URL (lida
novamente por meio de `GET /api/settings`).

> Nota de implementação: a ação "Salvar" do painel envia
> `pluginMarketplaceUrl` para `PATCH /api/settings`. No momento da redação deste
> documento, essa chave não está declarada em `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), portanto, verifique a persistência
> na sua versão antes de depender dela — o caminho de **leitura**
> (`getSettings()` → `listMarketplacePlugins()`) respeita a chave assim que ela
> estiver presente no armazenamento de configurações.

## Segurança

### Nível da rota — somente loopback

Os plugins executam código em processos filhos iniciados, portanto toda a
superfície `/api/plugins` é classificada como `LOCAL_ONLY` (Nível 1). A restrição
de loopback é aplicada incondicionalmente **antes** de qualquer verificação de
autenticação, portanto nem mesmo um token de gerenciamento vazado que chegue à
máquina por meio de um túnel pode instalar, ativar ou desinstalar um plugin.
Consulte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)
e as Regras Rígidas nº 15 / nº 17.

### Proteção contra SSRF no registro do marketplace

Uma URL de registro personalizada é uma configuração que pode ser influenciada
por um invasor, portanto, antes de buscá-la, `listMarketplacePlugins()` a
submete a duas camadas:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rejeita tudo que não seja `http:` / `https:`.
   - Rejeita hosts literais privados/de loopback/link-local/ULA (IPv4 **e**
     IPv6, incluindo IPv4 mapeado) por meio da função canônica `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`).
   - Resolve registros **tanto** `A` quanto `AAAA` e rejeita se **qualquer**
     endereço resolvido for privado — eliminando a evasão por nome de host
     público → IP privado.
   - **Falha de forma segura**: uma falha na resolução de DNS faz com que a URL
     seja rejeitada.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): reaplica a proteção de URL
   somente pública no momento da busca e **bloqueia redirecionamentos** (sem
   pivô público → privado via `30x`).

Uma URL que falhe em qualquer uma das camadas não interrompe a solicitação — o
marketplace recorre silenciosamente ao registro inicial integrado e registra um
aviso.

> Essa proteção foi reforçada no PR nº 3774 especificamente para resolver A +
> AAAA e usar a função canônica `isPrivateHost` em vez de uma verificação
> limitada a IPv4.

### Isolamento da execução de plugins

- **Isolamento de processo** — `loadPlugin()` (`src/lib/plugins/loader.ts`)
  inicia cada plugin em um processo filho separado do Node.js e se comunica por
  IPC. As chamadas de hooks têm um tempo limite com escalonamento de `SIGTERM`
  → `SIGKILL`.
- **Lista de permissões de variáveis de ambiente** — o processo filho recebe
  apenas um conjunto permitido de variáveis de ambiente; o conjunto mais amplo
  só é concedido quando o manifesto solicita a permissão `env`.
- **Contenção de caminho** — a instalação/atualização/desinstalação verifica se
  o diretório do plugin e `manifest.main` são resolvidos **dentro** da raiz
  gerenciada de plugins antes de qualquer cópia ou exclusão recursiva (isso
  protege contra caminhos de banco de dados adulterados e travessia `../` em
  `manifest.main`). A ativação resolve links simbólicos por meio de `realpath`
  e se recusa a carregar um ponto de entrada que saia do diretório do plugin.
- **Fixação opcional de integridade** — um manifesto pode declarar um campo
  `integrity` (`sha256-<base64>`, formato SRI). Quando presente, o carregador
  verifica o hash do arquivo de entrada no momento do carregamento e se recusa
  a ativá-lo em caso de divergência. Trata-se de uma detecção opcional de
  adulteração, **não** de uma fronteira de segurança — o roteamento restrito a
  loopback e o modelo de permissões são as verdadeiras fronteiras.

## Manifesto (`plugin.json`)

Validado por `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Campo              | Tipo      | Observações                                                           |
| ------------------ | --------- | --------------------------------------------------------------------- |
| `name`             | string    | Obrigatório; kebab-case (`^[a-z0-9-]+$`), de 1 a 100 caracteres       |
| `version`          | string    | Obrigatório; semver (`MAJOR.MINOR.PATCH`)                             |
| `description`      | string?   | ≤ 500 caracteres                                                      |
| `author`           | string?   | ≤ 200 caracteres                                                      |
| `license`          | string?   | O padrão é `MIT`                                                      |
| `main`             | string?   | Arquivo de entrada; o padrão é `index.js`                             |
| `source`           | enum?     | `local` \| `marketplace` (o padrão é `local`)                         |
| `tags`             | string[]? | Tags de pesquisa                                                      |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                       |
| `hooks`            | object?   | Booleanos que declaram quais hooks o plugin implementa                |
| `skills`           | object[]? | Definições opcionais de habilidades                                   |
| `enabledByDefault` | boolean?  | Ativação automática na instalação                                     |
| `configSchema`     | object?   | Mapa de campos de configuração (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Fixação opcional `sha256-<base64>` do arquivo de entrada              |

As permissões são obtidas do enum
`network` / `file-read` / `file-write` / `env` / `exec`.

## Fluxo do ciclo de vida

```
install (POST /api/plugins, caminho)
  → verificar/validar manifesto → copiar para staging → confirmar que main está dentro do diretório
  → renomear atomicamente para ~/.omniroute/plugins/<name> → inserir linha no banco de dados
  → disparar onInstall → se enabledByDefault: activate

activate (POST /api/plugins/{name}/activate)
  → verificar contenção com realpath → loadPlugin() (iniciar processo filho)
  → registrar hooks declarados → status = "active" → disparar onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → disparar onDeactivate (ANTES de cancelar o registro) → cancelar o registro dos hooks
  → encerrar processo filho → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactivate se estiver ativo → disparar onUninstall
  → excluir recursivamente o diretório do plugin com verificação de contenção → excluir linha do banco de dados
```

Executar `install` novamente em um diretório cuja versão do manifesto seja **estritamente
mais recente** que a versão instalada realiza uma atualização automática (reinstalação limpa; a configuração é redefinida
para os valores padrão). Uma versão igual ou anterior é rejeitada.

## Banco de dados

Tabela `plugins` (migração `076_create_plugins.sql`):

| Coluna          | Tipo    | Observações                                               |
| --------------- | ------- | --------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                      |
| `name`          | TEXT    | Único                                                     |
| `version`       | TEXT    | semver; padrão `1.0.0`                                    |
| `description`   | TEXT    | Opcional                                                  |
| `author`        | TEXT    | Opcional                                                  |
| `license`       | TEXT    | Padrão `MIT`                                              |
| `main`          | TEXT    | Arquivo de entrada; padrão `index.js`                     |
| `source`        | TEXT    | Padrão `local`                                            |
| `tags`          | TEXT    | Array JSON; padrão `[]`                                   |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`          |
| `enabled`       | INT     | 0/1; padrão 0                                             |
| `manifest`      | TEXT    | JSON completo do manifesto                                |
| `config`        | TEXT    | JSON; padrão `{}`                                         |
| `config_schema` | TEXT    | JSON; padrão `{}`                                         |
| `hooks`         | TEXT    | Array JSON com os nomes dos hooks declarados; padrão `[]` |
| `permissions`   | TEXT    | Array JSON; padrão `[]`                                   |
| `plugin_dir`    | TEXT    | Diretório absoluto de instalação                          |
| `error_message` | TEXT    | Definido quando `status = "error"`                        |
| `installed_at`  | TEXT    | `datetime('now')`                                         |
| `updated_at`    | TEXT    | `datetime('now')`                                         |
| `activated_at`  | TEXT    | Definido na ativação                                      |

As métricas/análises dos plugins são registradas em tabelas adicionais
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Painel

A página do painel em `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) oferece duas abas:

- **Instalados** — lista os plugins instalados com seus hooks declarados, um
  controle para ativar/desativar, um botão de desinstalação e uma ação "Procurar plugins"
  (`POST /api/plugins/scan`).
- **Marketplace** — exibe o catálogo de `GET /api/plugins/marketplace` com um
  campo para definir a URL personalizada do registro.

Uma página de configuração específica para cada plugin está disponível em `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Veja também

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  por que `/api/plugins` é acessível apenas via loopback (Nível 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — o framework de habilidades relacionado
  (`src/lib/skills/`); os plugins podem declarar habilidades em seu manifesto
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrações de saída
  orientadas a eventos
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  o padrão `buildErrorBody()` que todas as rotas de plugins usam para respostas de erro
