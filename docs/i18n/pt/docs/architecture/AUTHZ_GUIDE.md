# Authorization Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Fonte fidedigna:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute possui um pipeline de autorização sensível às rotas que controla todos os pedidos à API. A classificação é **determinística** e **fechada em caso de falha** — tudo o que não puder ser classificado acaba como `MANAGEMENT` e exige uma sessão ou um token com privilégios de gestão. Esta página explica o modelo aos engenheiros responsáveis pela manutenção de rotas ou pela conceção de novos endpoints.

![Pipeline de AuthZ (3 classes de rotas + avaliação de políticas)](../diagrams/exported/authz-pipeline.svg)

> Fonte: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dois modos de autenticação

### 1. Chave de API (Bearer)

Utilizada nas APIs de cliente compatíveis com OpenAI/Anthropic/Gemini e em algumas rotas de gestão quando a chave tem o âmbito `manage`.

```
Authorization: Bearer <api-key>
```

Validada por `isValidApiKey()` / `extractApiKey()` em `src/sse/services/auth.ts` e reexportada através de `src/shared/utils/apiAuth.ts`. O validador também aceita as variáveis de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` como chaves persistentes de passagem direta (incidência #1350).

### 2. Sessão do dashboard (cookie auth_token)

Para páginas do dashboard e operações administrativas.

```
Cookie: auth_token=<JWT assinado com JWT_SECRET>
```

Um cookie só é uma sessão quando o JWT é validado **e** contém `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Todos os
consumidores do cookie (proteção de rotas, atualização do pipeline de AuthZ, handshake
WebSocket, servidor em direto, `/api/settings/require-login`, `/api/auth/status`) passam
por esse auxiliar. Existem outros JWT assinados com `JWT_SECRET` — a passagem direta da
CLI do Cursor emite tokens `iss "omniroute" / aud "cursor-cli"` para detentores de
chaves — e estes nunca são sessões (#13298).

Validada por `isDashboardSessionAuthenticated()` em `src/shared/utils/apiAuth.ts`. O pipeline atualiza automaticamente o JWT quando faltam menos de 7 dias para o fim do seu período de validade de 30 dias.

Algumas rotas de gestão aceitam **qualquer um** dos modos: cookie OU `Bearer <key>` quando a chave de API tem o âmbito `manage` (ou `admin`). É isto que permite o fluxo de trabalho «configurável através de chamadas à API» adicionado na v3.8.

#### Controlo de início de sessão OIDC opcional (#6973)

O início de sessão administrativo do dashboard também suporta um fluxo OIDC (OpenID Connect)
**facultativo**, em conjunto com o início de sessão predefinido por palavra-passe — o início
de sessão por palavra-passe nunca é removido, sendo apenas complementado:

- Está desativado, exceto se `settings.oidcEnabled === true` **e** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` estiverem todos configurados (Definições → Autenticação).
  Caso contrário, `GET /api/auth/oidc/login` devolve `400`.
- `GET /api/auth/oidc/login` obtém o `authorization_endpoint` a partir do
  `/.well-known/openid-configuration` do emissor (recorrendo a
  `<issuer>/authorize` como alternativa), constrói o URI de redirecionamento a partir do pedido
  recebido (tendo em conta `x-forwarded-proto`) e redireciona para o IdP com um `state`
  aleatório armazenado num cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` valida o `state`, troca o código de autorização
  e verifica a assinatura do token de ID através do JWKS do emissor
  (`createRemoteJWKSet` de `jose`, mantido em cache por URI de JWKS), com verificações de
  `issuer`/`audience`. Uma lista de permissões opcional `oidcAllowedSubjects` compara a
  declaração `sub` do token ou a respetiva declaração `email` — a declaração de email
  só é aceite quando `email_verified === true`, pelo que um email não verificado no IdP
  nunca pode passar o controlo.
- Em caso de sucesso, emite **exatamente o mesmo** JWT `auth_token` de 30 dias emitido
  pelo início de sessão por palavra-passe (`src/app/api/auth/login/route.ts`), pelo que o
  restante pipeline da sessão do dashboard (atualização automática, atributos do cookie)
  permanece inalterado — o OIDC apenas substitui a forma como o cookie é emitido, não as
  permissões que este concede.

## Classes de Rotas

`src/server/authz/types.ts` define três classes; qualquer rota que não possa ser classificada de forma determinística recorre a `MANAGEMENT`.

| Classe       | Descrição                                                                                                                                                                   | Autenticação necessária                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `PUBLIC`     | Rotas explicitamente seguras — início de sessão, fim de sessão, estado, inicialização, integridade, arranque da integração inicial.                                         | Nenhuma                                                                   |
| `CLIENT_API` | Endpoints de disponibilização de modelos — `/api/v1/*`, `/api/v1beta/*`, e ainda os aliases `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Chave Bearer quando o feature flag efetivo `REQUIRE_API_KEY` está ativado |
| `MANAGEMENT` | Páginas do painel, definições, fornecedores, chaves, endpoints de administração e diagnóstico.                                                                              | Sessão do painel OU Bearer com o âmbito `manage`                          |

## Pipeline

```
Pedido recebido → src/proxy.ts
  → runAuthzPipeline() em src/server/authz/pipeline.ts
    1. Remover cabeçalhos internos fidedignos (x-omniroute-auth-*, x-omniroute-route-class)
    2. Gerar o ID do pedido, classificar a rota através de classifyRoute()
    3. Se pathname == "/" → redirecionar para /dashboard
    4. Se estiver em esvaziamento (encerramento gracioso) e /api/* → 503
    5. Se não for GET em /api/* → proteção checkBodySize()
    6. Se for OPTIONS → preflight CORS 204
    7. Se options.enforce == false → deixar passar com os cabeçalhos da classe de rota
    8. Caso contrário: POLICIES[routeClass].evaluate(ctx)
       - permitir  → aplicar x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - rejeitar → erro JSON com correlation_id (páginas do painel → 302 /login)
```

Os cabeçalhos internos fidedignos (definidos em `src/server/authz/headers.ts`) são **removidos dos pedidos recebidos** antes da classificação — os clientes não podem preencher previamente `x-omniroute-auth-*` para se fazerem passar por um sujeito.

### Contratos das políticas

Cada classe de rota tem uma política em `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — devolve sempre `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrai o Bearer e valida-o através de `validateApiKey()`. Só recorre ao acesso anónimo quando o feature flag efetivo `REQUIRE_API_KEY` está desativado. O valor efetivo do flag é determinado através de `isRequireApiKeyEnabled()` (`substituição do feature flag da BD > process.env.REQUIRE_API_KEY > predefinição`), para que os Feature Flags do Painel e as variáveis de ambiente controlem `/api/v1/*`, `/api/v1beta/*` e os aliases de forma consistente; as falhas do resolvedor resultam em negação por predefinição. Permite pedidos com sessão do painel nas rotas da API de cliente (incluindo `/api/v1/models`, utilizada pelo catálogo de modelos do painel).
- **`managementPolicy`** (`policies/management.ts`) — aceita uma sessão do painel, pedidos internos de sincronização de modelos (correspondentes a `/api/providers/[name]/(sync-models|models)`) ou ignora totalmente a autenticação se `isAuthRequired()` devolver false. Devolve 403 (`AUTH_001`) quando está presente um token Bearer inválido e 401 nos restantes casos. Também aplica os níveis de proteção de rotas (LOCAL_ONLY / ALWAYS_PROTECTED) antes de qualquer ramificação de autenticação — consulte [Níveis de Proteção de Rotas](../security/ROUTE_GUARD_TIERS.md). Os caminhos LOCAL_ONLY em `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (atualmente: `/api/mcp/`) podem ser acedidos a partir de um endereço que não seja loopback quando a chave Bearer inclui o âmbito `manage`; todos os restantes caminhos LOCAL_ONLY continuam estritamente limitados a loopback, independentemente do âmbito.

Uma política bem-sucedida devolve `AuthSubject` com `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Os handlers a jusante podem lê-lo através de `assertAuth(request, "CLIENT_API")` em `src/server/authz/assertAuth.ts`, em vez de voltarem a executar a lógica de autenticação.

## Lista de Rotas Públicas

`src/shared/constants/publicApiRoutes.ts` é a lista de permissões explícita:

A lista está dividida por **formato**, e esta divisão é essencial (GHSA-74g9-q8f6-793h): um prefixo é
comparado com `startsWith()`, pelo que também corresponde a todos os caminhos adjacentes que partilhem os respetivos caracteres iniciais.
Usar `/api/usage/om-usage` como prefixo tornou `/api/usage/om-usage<anything>` PÚBLICO, e o Next resolve
isso como `/api/usage/[connectionId]` — um handler sem autenticação própria.

```ts
// Subárvores genuínas. Cada entrada DEVE terminar em "/" (verificado por um teste unitário).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // tratado como CLIENT_API em classify, não como público "sem autenticação"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rotas individuais, comparadas EXATAMENTE (com ou sem uma barra final).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Rotas individuais só de leitura que também recebem a flexibilização da origem CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Rota individual só de leitura SEM a flexibilização de CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

As rotas só de leitura são públicas **apenas** para métodos seguros. Nota: `classifyRoute()` exclui `/api/v1/*` e `/api/v1beta/*` do caso geral PUBLIC — estas são sempre `CLIENT_API`, para que a política de chave Bearer continue a ser aplicada.

## Adicionar uma Nova Rota

### Padrão 1 — Endpoint público da API de cliente (autenticação Bearer)

As rotas em `/api/v1/` e `/api/v1beta/` são classificadas automaticamente como `CLIENT_API`. O middleware aplica a verificação Bearer; os handlers das rotas não precisam de a repetir, mas podem ler o sujeito se tal for útil.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... lógica do handler
}
```

### Padrão 2 — Endpoint de gestão (sessão ou Bearer + manage)

Utilize `requireManagementAuth()` de `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... lógica do handler
}
```

`requireManagementAuth()` devolve `null` em caso de sucesso ou uma `Response` de erro JSON:

- 401 `AUTH_001` "Autenticação necessária" — não existem quaisquer credenciais
- 403 — Bearer inválido **ou** Bearer presente, mas a chave não tem o âmbito `manage` / `admin`

`hasManageScope(scopes)` devolve true para `"manage"` ou `"admin"`.

### Padrão 3 — Adicionar à lista de permissões pública

Escolha o conjunto com base no formato, não na conveniência. Uma rota deve ser adicionada a `PUBLIC_API_ROUTES_EXACT` (ou a `PUBLIC_READONLY_CORS_API_ROUTES` se for apenas GET); apenas uma subárvore genuína deve ser adicionada a `PUBLIC_API_ROUTE_PREFIXES`, e esta **deve terminar em `/`**. Colocar uma única rota na lista de prefixos também torna público qualquer caminho adjacente que partilhe os respetivos caracteres iniciais — incluindo caminhos irmãos com segmentos dinâmicos adicionados posteriormente (GHSA-74g9-q8f6-793h). Atualize os testes unitários em `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` e `tests/unit/authz/classify.test.ts`.

## Âmbitos

As chaves de API incluem um array `scopes` (armazenado como JSON em `api_keys.scopes`; consulte `src/lib/db/apiKeys.ts`).

### Âmbito de gestão

- `manage` / `admin` — concede à chave acesso aos endpoints da API de gestão quando enviada como Bearer.

### Âmbitos MCP (`src/shared/constants/mcpScopes.ts`)

Cada ferramenta MCP requer âmbitos específicos através de `MCP_TOOL_SCOPES`. Lista completa (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

A aplicação dos âmbitos em `open-sse/mcp-server/server.ts` passa a lista de âmbitos de cada ferramenta para
`evaluateToolScopes()` depois de `resolveCallerScopeContext()` resolver os âmbitos a partir das informações de autenticação MCP,
dos metadados do pedido ou de `OMNIROUTE_MCP_SCOPES`.

## Ativação da autenticação obrigatória

`isAuthRequired()` em `src/shared/utils/apiAuth.ts` determina se **alguma** autenticação é aplicada a um pedido:

- `settings.requireLogin === false` → a autenticação é desativada globalmente.
- Nenhuma palavra-passe configurada **e** nenhuma variável de ambiente `INITIAL_PASSWORD` → o modo de inicialização permite o assistente de configuração inicial e pedidos de loopback, mas os pedidos de rede expostos continuam a exigir credenciais.
- Qualquer erro da BD → bloqueia o acesso (seguro por predefinição).

A aplicação de chaves de API de cliente utiliza `isRequireApiKeyEnabled()` em `src/shared/utils/featureFlags.ts`, e não uma leitura direta de `process.env.REQUIRE_API_KEY`. Isto é importante para instâncias implementadas: alternar `REQUIRE_API_KEY` em Dashboard → Feature Flags armazena uma substituição na BD e afeta imediatamente `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` e outras verificações de autenticação da API de cliente que partilham esta função auxiliar. Se não for possível ler o armazenamento de indicadores de funcionalidades, a autenticação da API de cliente bloqueia o acesso e exige uma chave.

## Alteração incompatível — v3.8.0

Os endpoints `/api/v1/agents/tasks/*` e `/api/resilience/model-cooldowns` **agora requerem autenticação de gestão** (commit `588a0333`). Os clientes que anteriormente enviavam uma chave de API normal sem o âmbito `manage` recebem `403`. Migração: atribua à chave o âmbito `manage` no painel API Keys ou utilize uma sessão autenticada no painel.

## Alteração de comportamento — v3.8.2

`/api/mcp/*` (o servidor MCP remoto) continua a ser LOCAL_ONLY por predefinição, mas agora aceita pedidos que não sejam de loopback quando o cabeçalho `Authorization: Bearer <api-key>` inclui o âmbito `manage`. A exceção é explicitamente controlada por caminho através de `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` em `src/server/authz/routeGuard.ts`; o prefixo LOCAL_ONLY relacionado `/api/cli-tools/runtime/*` não pode, intencionalmente, contornar esta restrição, pois pode iniciar subprocessos arbitrários. Os pedidos anónimos para `/api/mcp/*` que não sejam de loopback continuam a devolver `403 LOCAL_ONLY` — a predefinição para qualquer novo caminho LOCAL_ONLY continua a exigir estritamente loopback. Consulte [Níveis de proteção de rotas](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testes

- Testes unitários: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista de permissões pública: `tests/unit/public-api-routes.test.ts`.
- Execução focada: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Depuração

O pipeline adiciona sempre os seguintes cabeçalhos às respostas:

```
x-request-id:               <id de correlação, repetido nos corpos dos erros>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Para pedidos autenticados, os cabeçalhos do pedido a montante (do lado do handler) também incluem:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<últimos-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opcional)
x-omniroute-auth-scopes:    lista separada por vírgulas
```

Utilize `assertAuth(req, expectedClass)` nos handlers — lança `AuthzAssertionError` com o código `AUTHZ_NOT_INITIALIZED` caso o middleware tenha sido ignorado (útil para detetar regressões de configuração nos testes).

## Consulte também

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcador de autenticação por endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — registo de auditoria para eventos de autenticação
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — detalhes da aplicação de âmbitos MCP
- Código-fonte: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
