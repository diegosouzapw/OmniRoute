# Authorization Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Fonte oficial:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute possui um pipeline de autorização ciente de rotas que controla cada solicitação à API. A classificação é **determinística** e **fechada em caso de falha** — tudo o que não puder ser classificado será considerado `MANAGEMENT` e exigirá uma sessão ou um token com privilégios de gerenciamento. Esta página explica o modelo para engenheiros que mantêm rotas ou projetam novos endpoints.

![Pipeline de AuthZ (3 classes de rota + avaliação de políticas)](../diagrams/exported/authz-pipeline.svg)

> Fonte: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dois modos de autenticação

### 1. Chave de API (Bearer)

Usada para as APIs de cliente compatíveis com OpenAI/Anthropic/Gemini e para algumas rotas de gerenciamento quando a chave possui o escopo `manage`.

```
Authorization: Bearer <api-key>
```

Validada por `isValidApiKey()` / `extractApiKey()` em `src/sse/services/auth.ts` e reexportada por meio de `src/shared/utils/apiAuth.ts`. O validador também aceita as variáveis de ambiente `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` como chaves persistentes de passagem direta (issue #1350).

### 2. Sessão do dashboard (cookie auth_token)

Para páginas do dashboard e operações administrativas.

```
Cookie: auth_token=<JWT assinado com JWT_SECRET>
```

Um cookie será considerado uma sessão somente quando o JWT for verificado **e** contiver `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Todo
consumidor do cookie (proteção de rota, renovação do pipeline de AuthZ, handshake de WebSocket, servidor
ao vivo, `/api/settings/require-login`, `/api/auth/status`) passa por esse helper.
Existem outros JWTs assinados com `JWT_SECRET` — a passagem direta da CLI do Cursor emite
tokens `iss "omniroute" / aud "cursor-cli"` para detentores de chaves — e eles nunca são considerados sessões
(#13298).

Verificada por `isDashboardSessionAuthenticated()` em `src/shared/utils/apiAuth.ts`. O pipeline renova automaticamente o JWT quando restam menos de 7 dias de sua validade de 30 dias.

Algumas rotas de gerenciamento aceitam **qualquer um** dos modos: cookie OU `Bearer <key>` quando a chave de API possui o escopo `manage` (ou `admin`). Isso é o que viabiliza o fluxo de trabalho "configurável por meio de chamadas de API" adicionado na v3.8.

#### Controle opcional de login via OIDC (#6973)

O login administrativo do dashboard também oferece suporte a um fluxo **opcional** de OIDC (OpenID Connect)
em conjunto com o login padrão por senha — o login por senha nunca é removido, apenas
complementado:

- Fica desabilitado, a menos que `settings.oidcEnabled === true` **e** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` estejam todos configurados (Configurações → Autenticação).
  Caso contrário, `GET /api/auth/oidc/login` retorna `400`.
- `GET /api/auth/oidc/login` descobre o `authorization_endpoint` a partir do
  `/.well-known/openid-configuration` do emissor (usando
  `<issuer>/authorize` como fallback), cria o URI de redirecionamento com base na solicitação recebida
  (considerando `x-forwarded-proto`) e redireciona para o IdP com um `state`
  aleatório armazenado em um cookie `oidc_state` com `httpOnly`.
- `GET /api/auth/oidc/callback` valida o `state`, troca o código de autorização
  e verifica a assinatura do token de ID por meio do JWKS do emissor
  (`createRemoteJWKSet` do `jose`, armazenado em cache por URI do JWKS), com verificações de `issuer`/`audience`.
  Uma lista de permissões opcional `oidcAllowedSubjects` compara a claim
  `sub` ou a claim `email` do token — a claim de e-mail só é aceita quando
  `email_verified === true`, portanto um e-mail não verificado no IdP nunca poderá passar
  pelo controle.
- Em caso de sucesso, ele emite **exatamente o mesmo** JWT `auth_token` de 30 dias emitido pelo login
  por senha (`src/app/api/auth/login/route.ts`), portanto o restante do
  pipeline de sessão do dashboard (renovação automática, flags do cookie) permanece inalterado —
  o OIDC apenas substitui a forma como o cookie é emitido, não o que ele concede.

## Classes de rota

`src/server/authz/types.ts` define três classes; qualquer rota que não possa ser classificada de forma determinística assume `MANAGEMENT` como padrão.

| Classe       | Descrição                                                                                                                                                                 | Autenticação necessária                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PUBLIC`     | Rotas explicitamente seguras — login, logout, status, init, integridade, inicialização do onboarding.                                                                     | Nenhuma                                                                      |
| `CLIENT_API` | Endpoints de disponibilização de modelos — `/api/v1/*`, `/api/v1beta/*`, além dos aliases `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Chave Bearer quando a feature flag efetiva `REQUIRE_API_KEY` está habilitada |
| `MANAGEMENT` | Páginas do Dashboard, configurações, provedores, chaves e endpoints administrativos e de diagnóstico.                                                                     | Sessão do Dashboard OU Bearer com escopo `manage`                            |

## Pipeline

```
Requisição recebida → src/proxy.ts
  → runAuthzPipeline() em src/server/authz/pipeline.ts
    1. Remover cabeçalhos internos confiáveis (x-omniroute-auth-*, x-omniroute-route-class)
    2. Gerar o ID da requisição e classificar a rota por meio de classifyRoute()
    3. Se pathname == "/" → redirecionar para /dashboard
    4. Se estiver em escoamento (encerramento normal) e /api/* → 503
    5. Se não for GET em /api/* → aplicar a proteção checkBodySize()
    6. Se for OPTIONS → preflight CORS 204
    7. Se options.enforce == false → encaminhar sem alterações com os cabeçalhos da classe da rota
    8. Caso contrário: POLICIES[routeClass].evaluate(ctx)
       - permitir → adicionar x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - rejeitar → erro JSON com correlation_id (páginas do Dashboard → 302 /login)
```

Os cabeçalhos internos confiáveis (definidos em `src/server/authz/headers.ts`) são **removidos das requisições recebidas** antes da classificação — os clientes não podem preencher previamente `x-omniroute-auth-*` para se passar por um sujeito.

### Contratos das políticas

Cada classe de rota possui uma política em `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — sempre retorna `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — extrai o Bearer e o valida por meio de `validateApiKey()`. Só permite acesso anônimo quando a feature flag efetiva `REQUIRE_API_KEY` está desabilitada. A flag efetiva é resolvida por meio de `isRequireApiKeyEnabled()` (`substituição pela feature flag do banco de dados > process.env.REQUIRE_API_KEY > valor padrão`), de modo que as Feature Flags do Dashboard e as variáveis de ambiente controlem `/api/v1/*`, `/api/v1beta/*` e os aliases de forma consistente; falhas no resolvedor resultam em bloqueio. Permite requisições com sessão do Dashboard em rotas da API do cliente (incluindo `/api/v1/models`, usada pelo catálogo de modelos do Dashboard).
- **`managementPolicy`** (`policies/management.ts`) — aceita sessão do Dashboard e requisições internas de sincronização de modelos (correspondentes a `/api/providers/[name]/(sync-models|models)`), ou ignora totalmente a verificação se `isAuthRequired()` retornar false. Retorna 403 (`AUTH_001`) quando um token Bearer está presente, mas é inválido; caso contrário, retorna 401. Também aplica os níveis de proteção de rota (LOCAL_ONLY / ALWAYS_PROTECTED) antes de qualquer ramificação de autenticação — consulte [Níveis de proteção de rota](../security/ROUTE_GUARD_TIERS.md). Caminhos LOCAL_ONLY em `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (atualmente: `/api/mcp/`) podem ser acessados fora do loopback quando a chave Bearer contém o escopo `manage`; todos os demais caminhos LOCAL_ONLY permanecem restritos estritamente ao loopback, independentemente do escopo.

Uma política bem-sucedida retorna `AuthSubject` com `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Os manipuladores posteriores podem acessá-lo por meio de `assertAuth(request, "CLIENT_API")` em `src/server/authz/assertAuth.ts`, em vez de executar novamente a lógica de autenticação.

## Lista de rotas públicas

`src/shared/constants/publicApiRoutes.ts` é a lista explícita de permissões:

A lista é dividida por **formato**, e essa divisão é essencial (GHSA-74g9-q8f6-793h): um prefixo é
comparado com `startsWith()`, portanto também corresponde a todos os caminhos adjacentes que compartilham seus caracteres iniciais.
`/api/usage/om-usage` como prefixo tornou `/api/usage/om-usage<anything>` PÚBLICO, e o Next resolve
isso para `/api/usage/[connectionId]` — um handler sem autenticação própria.

```ts
// Subárvores genuínas. Cada entrada DEVE terminar em "/" (validado por um teste unitário).
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

// Rotas individuais somente para leitura que também recebem a flexibilização de origem do CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Rota individual somente para leitura SEM a flexibilização de CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

As rotas somente para leitura são públicas **apenas** para métodos seguros. Observação: `classifyRoute()` exclui `/api/v1/*` e `/api/v1beta/*` do fluxo alternativo PUBLIC — elas são sempre `CLIENT_API`, portanto a política de chave Bearer continua sendo aplicada.

## Adição de uma nova rota

### Padrão 1 — Endpoint público da API do cliente (autenticação Bearer)

As rotas em `/api/v1/` e `/api/v1beta/` são classificadas automaticamente como `CLIENT_API`. O middleware aplica a verificação Bearer; os handlers de rota não precisam repeti-la, mas podem ler o sujeito, se isso for útil.

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

### Padrão 2 — Endpoint de gerenciamento (sessão ou Bearer + manage)

Use `requireManagementAuth()` de `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... lógica do handler
}
```

`requireManagementAuth()` retorna `null` em caso de sucesso ou uma `Response` de erro em JSON:

- 401 `AUTH_001` "Autenticação obrigatória" — nenhuma credencial fornecida
- 403 — Bearer inválido **ou** Bearer presente, mas a chave não possui o escopo `manage` / `admin`

`hasManageScope(scopes)` retorna verdadeiro para `"manage"` ou `"admin"`.

### Padrão 3 — Adição à lista pública de permissões

Escolha o conjunto pelo formato, não pela conveniência. Uma única rota deve ser adicionada a `PUBLIC_API_ROUTES_EXACT` (ou a `PUBLIC_READONLY_CORS_API_ROUTES` se aceitar apenas GET); somente uma subárvore genuína deve ser adicionada a `PUBLIC_API_ROUTE_PREFIXES`, e ela **deve terminar em `/`**. Colocar uma única rota na lista de prefixos também torna público todo caminho adjacente que compartilhe seus caracteres iniciais — incluindo caminhos irmãos com segmentos dinâmicos adicionados posteriormente (GHSA-74g9-q8f6-793h). Atualize os testes unitários em `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` e `tests/unit/authz/classify.test.ts`.

## Escopos

As chaves de API contêm um array `scopes` (armazenado como JSON em `api_keys.scopes`; consulte `src/lib/db/apiKeys.ts`).

### Escopo de gerenciamento

- `manage` / `admin` — concede à chave acesso aos endpoints da API de gerenciamento quando enviada como Bearer.

### Escopos MCP (`src/shared/constants/mcpScopes.ts`)

Cada ferramenta MCP exige escopos específicos por meio de `MCP_TOOL_SCOPES`. Lista completa (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

A aplicação de escopos em `open-sse/mcp-server/server.ts` passa a lista de escopos de cada ferramenta para
`evaluateToolScopes()` depois que `resolveCallerScopeContext()` resolve os escopos a partir das informações de autenticação do MCP,
dos metadados da requisição ou de `OMNIROUTE_MCP_SCOPES`.

## Alternância da exigência de autenticação

`isAuthRequired()` em `src/shared/utils/apiAuth.ts` decide se **alguma** autenticação será exigida para uma requisição:

- `settings.requireLogin === false` → a autenticação é desabilitada globalmente.
- Nenhuma senha configurada **e** nenhuma variável de ambiente `INITIAL_PASSWORD` → o modo de inicialização permite o assistente de integração e as requisições de loopback, mas as requisições de rede expostas ainda exigem credenciais.
- Qualquer erro de banco de dados → falha de forma fechada (seguro por padrão).

A exigência de chave de API do cliente usa `isRequireApiKeyEnabled()` em `src/shared/utils/featureFlags.ts`, em vez de uma leitura direta de `process.env.REQUIRE_API_KEY`. Isso é importante para instâncias implantadas: alternar `REQUIRE_API_KEY` em Dashboard → Feature Flags armazena uma substituição no banco de dados e afeta imediatamente `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` e outras verificações de autenticação da API do cliente que compartilham esse helper. Se o armazenamento de feature flags não puder ser lido, a autenticação da API do cliente falha de forma fechada e exige uma chave.

## Alteração incompatível — v3.8.0

Os endpoints `/api/v1/agents/tasks/*` e `/api/resilience/model-cooldowns` **agora exigem autenticação de gerenciamento** (commit `588a0333`). Clientes que anteriormente enviavam uma chave de API normal sem o escopo `manage` recebem `403`. Migração: conceda à chave o escopo `manage` no painel API Keys ou use uma sessão autenticada no painel.

## Alteração de comportamento — v3.8.2

`/api/mcp/*` (o servidor MCP remoto) ainda é LOCAL_ONLY por padrão, mas agora aceita requisições que não sejam de loopback quando o cabeçalho `Authorization: Bearer <api-key>` contém o escopo `manage`. A exceção é habilitada explicitamente para cada caminho por meio de `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` em `src/server/authz/routeGuard.ts`; o prefixo LOCAL_ONLY relacionado `/api/cli-tools/runtime/*` intencionalmente NÃO pode ser ignorado, pois pode iniciar subprocessos arbitrários. Requisições anônimas para `/api/mcp/*` que não sejam de loopback continuam retornando `403 LOCAL_ONLY` — o padrão para qualquer novo caminho LOCAL_ONLY continua sendo estritamente loopback. Consulte [Níveis do Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testes

- Testes unitários: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Lista de permissões públicas: `tests/unit/public-api-routes.test.ts`.
- Executar teste específico: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Depuração

O pipeline sempre adiciona os seguintes cabeçalhos às respostas:

```
x-request-id:               <id de correlação, repetido nos corpos de erro>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Para solicitações autenticadas, os cabeçalhos da solicitação no upstream (no lado do handler) também incluem:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<últimos-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opcional)
x-omniroute-auth-scopes:    lista separada por vírgulas
```

Use `assertAuth(req, expectedClass)` dentro dos handlers — essa função lança `AuthzAssertionError` com o código `AUTHZ_NOT_INITIALIZED` se o middleware tiver sido ignorado (útil para detectar regressões de configuração em testes).

## Veja também

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — marcador de autenticação por endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — log de auditoria para eventos de autenticação
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — detalhes da aplicação de escopos do MCP
- Código-fonte: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
