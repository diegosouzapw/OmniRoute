# Plugin Marketplace (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Fonte fidedigna:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` e
> `src/app/(dashboard)/dashboard/plugins/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute inclui um sistema de plugins semelhante ao do WordPress. Os plugins são
diretórios autónomos — cada um com um manifesto `plugin.json` e um ficheiro de entrada — que se
ligam ao pipeline de pedidos (`onRequest` / `onResponse` / `onError`) e a
eventos do ciclo de vida (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

O **Marketplace de Plugins** é a camada de descoberta sobre esse sistema.
Disponibiliza um catálogo navegável de plugins instaláveis. Por predefinição, o catálogo é um
pequeno registo inicial incorporado; um operador pode configurá-lo para usar um URL de registo
remoto personalizado, caso em que a obtenção é protegida por uma salvaguarda contra SSRF
com resolução de DNS (consulte [Segurança](#security)).

Todas as rotas de plugins são **exclusivas de loopback** (Nível 1 — `LOCAL_ONLY`): os plugins carregam
e executam código em processos-filho, pelo que as rotas estão inacessíveis a partir de uma
origem que não seja loopback, independentemente da autenticação. Consulte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Como Tudo Se Encaixa

```
Painel (/dashboard/plugins)
  ├─ separador "Instalados"  → GET /api/plugins            (listPlugins)
  │                            POST /api/plugins/scan      (pluginManager.scan)
  │                            POST /api/plugins/{name}/activate|deactivate
  │                            DELETE /api/plugins/{name}   (desinstalar)
  └─ separador "Marketplace" → GET /api/plugins/marketplace
                                 → listMarketplacePlugins()
                                   ├─ sem URL personalizado → SEED_REGISTRY incorporado
                                   └─ URL personalizado → salvaguarda SSRF isSafeMarketplaceUrl()
                                                       → safeOutboundFetch(guard:"public-only")
```

- **Camada de registo** — `src/lib/plugins/marketplace.ts`: lista/pesquisa o
  catálogo, recorrendo ao registo inicial em caso de qualquer falha.
- **Camada de ciclo de vida** — `src/lib/plugins/manager.ts` (singleton `pluginManager`):
  instalação, atualização, ativação, desativação, desinstalação, análise e carregamento no arranque.
- **Camada de manifesto** — `src/lib/plugins/manifest.ts`: esquema Zod + predefinições para
  `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: deteta plugins no disco, dentro
  do diretório de plugins.
- **Loader** — `src/lib/plugins/loader.ts`: inicia cada plugin num
  processo-filho isolado e gere as chamadas de hooks através de IPC.

## Catálogo do Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) devolve uma lista de
objetos `MarketplaceEntry`:

| Campo         | Tipo     | Notas                                             |
| ------------- | -------- | ------------------------------------------------- |
| `name`        | string   | Nome do plugin em kebab-case                      |
| `version`     | string   | semver                                            |
| `description` | string   | Resumo breve                                      |
| `author`      | string   | Autor/organização                                 |
| `license`     | string   | Identificador de licença ao estilo SPDX           |
| `downloadUrl` | string   | URL de transferência da origem (pode estar vazio) |
| `repository`  | string?  | URL opcional do repositório                       |
| `tags`        | string[] | Etiquetas de pesquisa/filtragem                   |
| `downloads`   | number   | Número de transferências                          |
| `rating`      | number   | 0–5                                               |
| `verified`    | boolean  | Indica se a entrada está marcada como verificada  |
| `lastUpdated` | string   | String de data semelhante ao formato ISO          |

Quando não está configurado nenhum URL de registo personalizado, o catálogo é o
`SEED_REGISTRY` incorporado (atualmente `request-logger`, `rate-limiter`, `cost-tracker` e
`theme-manager`). O registo inicial está sempre disponível — se um registo remoto
configurado estiver inacessível, devolver um estado diferente de `200` ou devolver um corpo
não reconhecido, `listMarketplacePlugins()` regista um aviso e recorre à lista inicial.

> Nota: o **catálogo** do marketplace (navegação/pesquisa) está totalmente integrado, mas
> a **instalação** com um clique a partir do catálogo ainda não está implementada — atualmente,
> o botão "Instalar" do painel numa entrada do marketplace apresenta um aviso de
> "disponível em breve". Atualmente, a instalação é efetuada através do fluxo de instalação
> por caminho local (`POST /api/plugins`) e da deteção no disco (`POST /api/plugins/scan`).

## API REST

Todos os endpoints exigem autenticação de gestão (`requireManagementAuth`) **e**
só estão acessíveis via loopback — `/api/plugins` e `/api/plugins/` estão
incluídos em `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Método | Descrição                                                    |
| -------------------------------- | ------ | ------------------------------------------------------------ |
| `/api/plugins`                   | GET    | Lista os plugins instalados (filtro `?status=` opcional)     |
| `/api/plugins`                   | POST   | Instala um plugin a partir de um caminho local absoluto      |
| `/api/plugins/scan`              | POST   | Analisa o diretório de plugins e regista novos plugins       |
| `/api/plugins/marketplace`       | GET    | Lista as entradas do catálogo do marketplace                 |
| `/api/plugins/[name]`            | GET    | Obtém os detalhes do plugin instalado                        |
| `/api/plugins/[name]`            | DELETE | Desinstala um plugin                                         |
| `/api/plugins/[name]/activate`   | POST   | Ativa (carrega + regista hooks)                              |
| `/api/plugins/[name]/deactivate` | POST   | Desativa (aciona `onDeactivate`, remove o registo dos hooks) |
| `/api/plugins/[name]/config`     | GET    | Obtém a configuração do plugin + esquema de configuração     |
| `/api/plugins/[name]/config`     | PUT    | Atualiza a configuração do plugin (validada face ao esquema) |

O filtro `status` de `GET /api/plugins` aceita um dos seguintes valores:
`installed` / `active` / `inactive` / `error`. Um valor inválido devolve `400`.

### Listar os plugins instalados

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

O `path` tem de ser **absoluto** e não pode conter segmentos transversais `..`
nem bytes nulos (restrições impostas pelo Zod). O diretório de origem tem de
conter um `plugin.json` válido (ou ser o diretório principal de um que o
contenha). Em caso de sucesso, a resposta é `201` com o registo do plugin
instalado.

### Consultar o marketplace

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

`PUT .../config` valida cada valor fornecido face ao `configSchema` do plugin
(declarado no manifesto): os campos `number` respeitam `min`/`max` e os campos
`select` têm de corresponder ao `enum` declarado. São permitidas chaves que não
estejam presentes no esquema.

## Configuração

### Diretório de plugins

Os plugins encontram-se no diretório de dados do OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ou aquilo para que manifest.main aponta)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) determina esse diretório
em três passos:

1. **`OMNIROUTE_PLUGINS_DIR`**, quando definida — utilizada literalmente,
   independentemente do valor de `HOME`. Esta é a opção explícita para Docker/K8s,
   onde a árvore de plugins é montada por bind num caminho que, normalmente, nada
   tem que ver com o diretório pessoal do contentor (#11827).
2. `<home>/.omniroute/plugins`, em que `<home>` provém das variáveis de ambiente
   `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, quando o processo não exporta qualquer diretório
   pessoal.

O diretório determinado é registado uma vez no arranque como
`scanner.dir_resolved`, indicando a entrada que prevaleceu
(`OMNIROUTE_PLUGINS_DIR`, `home` ou `no-home-fallback`) — assim, uma imagem que
acabe silenciosamente no passo 3 indica-o, em vez de apenas comunicar uma lista
de plugins vazia. `POST /api/plugins/scan` deteta qualquer subdiretório nesse
local que contenha um `plugin.json` válido e regista-o; o mesmo diretório é a
raiz para a qual `pluginManager.install()` copia os plugins, pelo que uma
substituição move em conjunto a deteção e a instalação.

> **`OMNIROUTE_PLUGINS_DIR` não é `OMNIROUTE_PLUGIN_PATH`.** Esta última é lida apenas
> pelo carregador de plugins de comandos da CLI (`bin/cli/plugins.mjs`) para localizar
> pacotes npm `omniroute-cmd-*` que adicionam subcomandos a `omniroute` — não tem
> qualquer efeito no analisador em tempo de execução aqui descrito. Consulte
> [PLUGINS.md](./PLUGINS.md) para obter informações sobre esse componente.

### URL personalizada do registo do marketplace

A origem do catálogo do marketplace é lida a partir da definição
`pluginMarketplaceUrl` (`src/lib/plugins/marketplace.ts` lê
`settings.pluginMarketplaceUrl`). Quando definida como um URL `http(s)`,
`listMarketplacePlugins()` obtém esse URL e aceita um array JSON de entradas ao
nível superior ou um objeto com um array `plugins`; as entradas sem um `name`
do tipo string são filtradas. Quando não está definida (ou quando o pedido
falha na proteção SSRF/devolve uma resposta inválida), é utilizado o registo
inicial incorporado.

O separador "Marketplace" do dashboard disponibiliza um campo para este URL
(lido novamente a partir de `GET /api/settings`).

> Nota de implementação: a ação "Save" do dashboard envia
> `pluginMarketplaceUrl` para `PATCH /api/settings`. À data da redação, esta
> chave não está declarada em `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), pelo que deve verificar a
> persistência na sua versão antes de depender desta funcionalidade — o caminho
> de **leitura** (`getSettings()` → `listMarketplacePlugins()`) respeita a chave
> assim que esta esteja presente no armazenamento de definições.

## Segurança

### Nível da rota — apenas loopback

Os plugins executam código em processos filhos iniciados, pelo que toda a superfície `/api/plugins` é classificada como `LOCAL_ONLY` (Nível 1). A imposição de loopback é executada incondicionalmente **antes** de qualquer verificação de autenticação, pelo que um token de gestão exposto que chegue à máquina através de um túnel continua sem poder instalar, ativar ou desinstalar um plugin.
Consulte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) e as Regras Rígidas #15 / #17.

### Proteção SSRF do registo do marketplace

Um URL de registo personalizado é uma configuração influenciável por um atacante, pelo que, antes de o obter, `listMarketplacePlugins()` faz com que passe por duas camadas:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Rejeita tudo o que não seja `http:` / `https:`.
   - Rejeita hosts literais privados/loopback/link-local/ULA (IPv4 **e** IPv6, incluindo IPv4 mapeado) através da função canónica `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Resolve registos `A` **e** `AAAA` e rejeita se **qualquer** endereço resolvido for privado — eliminando o bypass nome de host público → IP privado.
   - **Falha de forma fechada**: uma falha de resolução DNS faz com que o URL seja rejeitado.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): reaplica a proteção de URL apenas público no momento da obtenção e **bloqueia redirecionamentos** (sem pivô `30x` de público → privado).

Um URL que falhe em qualquer uma das camadas não interrompe o pedido — o marketplace recorre silenciosamente ao registo de origem incorporado e regista um aviso.

> Esta proteção foi reforçada no PR #3774 especificamente para resolver A + AAAA e utilizar a função canónica `isPrivateHost` em vez de uma verificação exclusiva para IPv4.

### Isolamento da execução de plugins

- **Isolamento de processos** — `loadPlugin()` (`src/lib/plugins/loader.ts`) inicia cada plugin num processo filho separado do Node.js e comunica através de IPC. As chamadas de hooks têm um tempo limite com escalamento de `SIGTERM` → `SIGKILL`.
- **Lista de permissões de variáveis de ambiente** — o processo filho recebe apenas um conjunto autorizado de variáveis de ambiente; o conjunto mais abrangente só é concedido quando o manifesto solicita a permissão `env`.
- **Confinamento de caminhos** — as operações de instalação/atualização/desinstalação confirmam que o diretório do plugin e `manifest.main` são resolvidos **dentro** da raiz de plugins gerida antes de qualquer cópia ou eliminação recursiva (proteção contra caminhos adulterados na BD e travessia `../` em `manifest.main`). A ativação resolve ligações simbólicas através de `realpath` e recusa-se a carregar um ponto de entrada que saia do diretório do plugin.
- **Pin de integridade opcional** — um manifesto pode declarar um campo `integrity` (`sha256-<base64>`, formato SRI). Quando presente, o carregador verifica o hash do ficheiro de entrada no momento do carregamento e recusa a ativação em caso de divergência. Trata-se de deteção de adulteração opcional, **não** de uma fronteira de segurança — o encaminhamento exclusivo por loopback e o modelo de permissões são as verdadeiras fronteiras.

## Manifesto (`plugin.json`)

Validado por `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Campo              | Tipo      | Notas                                                                 |
| ------------------ | --------- | --------------------------------------------------------------------- |
| `name`             | string    | Obrigatório; kebab-case (`^[a-z0-9-]+$`), 1–100 caracteres            |
| `version`          | string    | Obrigatório; semver (`MAJOR.MINOR.PATCH`)                             |
| `description`      | string?   | ≤ 500 caracteres                                                      |
| `author`           | string?   | ≤ 200 caracteres                                                      |
| `license`          | string?   | Predefinido como `MIT`                                                |
| `main`             | string?   | Ficheiro de entrada; predefinido como `index.js`                      |
| `source`           | enum?     | `local` \| `marketplace` (predefinido como `local`)                   |
| `tags`             | string[]? | Etiquetas de pesquisa                                                 |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                       |
| `hooks`            | object?   | Booleanos que declaram os hooks implementados pelo plugin             |
| `skills`           | object[]? | Definições de competências opcionais                                  |
| `enabledByDefault` | boolean?  | Ativar automaticamente durante a instalação                           |
| `configSchema`     | object?   | Mapa de campos de configuração (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Pin opcional `sha256-<base64>` do ficheiro de entrada                 |

As permissões são obtidas a partir da enumeração
`network` / `file-read` / `file-write` / `env` / `exec`.

## Fluxo do Ciclo de Vida

```
instalar (POST /api/plugins, caminho)
  → analisar/validar manifesto → copiar para staging → confirmar que main está dentro do diretório
  → renomear atomicamente para ~/.omniroute/plugins/<name> → inserir linha na BD
  → acionar onInstall → se enabledByDefault: ativar

ativar (POST /api/plugins/{name}/activate)
  → verificar contenção com realpath → loadPlugin() (iniciar processo filho)
  → registar hooks declarados → status = "active" → acionar onActivate

desativar (POST /api/plugins/{name}/deactivate)
  → acionar onDeactivate (ANTES de anular o registo) → anular o registo dos hooks
  → terminar processo filho → status = "inactive"

desinstalar (DELETE /api/plugins/{name})
  → desativar se estiver ativo → acionar onUninstall
  → eliminar recursivamente o diretório do plugin, após verificar a contenção → eliminar linha da BD
```

Executar novamente `install` num diretório cuja versão no manifesto seja
**estritamente mais recente** do que a versão instalada efetua uma atualização
automática (reinstalação limpa; a configuração é reposta para os valores
predefinidos). Uma versão igual ou anterior é rejeitada.

## Base de Dados

Tabela `plugins` (migração `076_create_plugins.sql`):

| Coluna          | Tipo    | Notas                                                        |
| --------------- | ------- | ------------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                         |
| `name`          | TEXT    | Único                                                        |
| `version`       | TEXT    | semver; predefinição `1.0.0`                                 |
| `description`   | TEXT    | Opcional                                                     |
| `author`        | TEXT    | Opcional                                                     |
| `license`       | TEXT    | Predefinição `MIT`                                           |
| `main`          | TEXT    | Ficheiro de entrada; predefinição `index.js`                 |
| `source`        | TEXT    | Predefinição `local`                                         |
| `tags`          | TEXT    | Matriz JSON; predefinição `[]`                               |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`             |
| `enabled`       | INT     | 0/1; predefinição 0                                          |
| `manifest`      | TEXT    | JSON completo do manifesto                                   |
| `config`        | TEXT    | JSON; predefinição `{}`                                      |
| `config_schema` | TEXT    | JSON; predefinição `{}`                                      |
| `hooks`         | TEXT    | Matriz JSON com nomes de hooks declarados; predefinição `[]` |
| `permissions`   | TEXT    | Matriz JSON; predefinição `[]`                               |
| `plugin_dir`    | TEXT    | Diretório absoluto de instalação                             |
| `error_message` | TEXT    | Definido quando `status = "error"`                           |
| `installed_at`  | TEXT    | `datetime('now')`                                            |
| `updated_at`    | TEXT    | `datetime('now')`                                            |
| `activated_at`  | TEXT    | Definido aquando da ativação                                 |

As métricas/análises dos plugins são monitorizadas em tabelas adicionais
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Painel

A página do painel em `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) disponibiliza dois separadores:

- **Instalados** — apresenta os plugins instalados com os respetivos hooks
  declarados, um botão de alternância para ativar/desativar, um botão de
  desinstalação e uma ação "Procurar plugins"
  (`POST /api/plugins/scan`).
- **Marketplace** — apresenta o catálogo de `GET /api/plugins/marketplace` com um
  campo para definir o URL do registo personalizado.

Existe uma página de configuração por plugin em `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Ver também

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  porque `/api/plugins` está limitado à interface de loopback (Nível 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — a framework de competências relacionada
  (`src/lib/skills/`); os plugins podem declarar competências no respetivo manifesto
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrações de saída
  orientadas por eventos
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  o padrão `buildErrorBody()` utilizado por todas as rotas de plugins nas respostas de erro
