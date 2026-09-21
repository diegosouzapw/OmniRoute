# CORS Configuration & Security (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

O OmniRoute controla quais **origens de navegador** podem ler respostas entre origens
a partir de uma única lista de permissões centralizada. O modelo é **restritivo por padrão**:
nenhuma origem é permitida até que você a autorize explicitamente. Esta página documenta como a lista de permissões
é resolvida, o que `CORS_ALLOW_ALL=true` realmente expõe (e, principalmente, o que
**não** expõe), como configurar os ambientes de desenvolvimento e produção com segurança e o aviso em tempo de execução
que o dashboard exibe quando um curinga está ativo.

**Fonte da verdade:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). A lista de permissões é aplicada uma única vez, no
middleware (`src/server/authz/pipeline.ts`) — os manipuladores específicos de cada rota não definem
`Access-Control-Allow-Origin` por conta própria.

## Como uma origem é resolvida

Para cada solicitação, o middleware calcula o valor de `Access-Control-Allow-Origin`
nesta ordem:

1. **`CORS_ALLOW_ALL=true`** (ou o `CORS_ORIGIN=*` legado) → reflete de volta a
   `Origin` do solicitante (ou `*` quando não há um cabeçalho `Origin`), com `Vary: Origin`
   para manter os caches corretos. O mesmo ponto de controle `applyCorsHeaders()` também acrescenta
   `Vary: Accept-Encoding` a todas as respostas 2xx com corpo na superfície
   `/v1*`/`/v1beta*` autenticada por token (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), para que
   caches downstream/compartilhados possam distinguir corretamente as variantes compactadas das não compactadas.
2. Caso contrário, a `Origin` da solicitação é normalizada (convertida para minúsculas, com a barra
   final removida) e comparada à **lista de permissões combinada**:
   - a variável de ambiente **`CORS_ALLOWED_ORIGINS`** — lista separada por vírgulas; e
   - a configuração **`corsOrigins`** em tempo de execução (Dashboard → Security → _CORS Allowed
     Origins_), injetada por meio de `setRuntimeAllowedOrigins()` a partir de
     `src/lib/config/runtimeSettings.ts`.
3. Sem correspondência → **nenhum cabeçalho `Access-Control-Allow-Origin` é emitido**. O navegador
   bloqueia a leitura entre origens. Esse é o comportamento restritivo padrão pretendido.

| Variável de ambiente   | Significado                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV de origens exatas a serem permitidas (recomendado).                                           |
| `CORS_ALLOW_ALL`       | `true`/`1` → reflete qualquer origem (curinga). Somente para desenvolvimento.                     |
| `CORS_ORIGIN`          | Legado. `*` se comporta como `CORS_ALLOW_ALL`; um único valor é adicionado à lista de permissões. |

## Modelo de ameaças — o que `CORS_ALLOW_ALL=true` realmente expõe

Vale a pena levar a sério o alerta genérico da OWASP ("CORS com curinga = qualquer site
pode chamar sua API"), mas a exposição do OmniRoute é **mais restrita do que no caso genérico**,
devido a um fato concreto da implementação:

> **O `applyCorsHeaders()` central nunca emite
> `Access-Control-Allow-Credentials`.** Um navegador não expõe uma resposta entre origens
> _com credenciais_ (contendo cookies), a menos que o servidor envie
> `Access-Control-Allow-Credentials: true`. O caminho CORS compartilhado do OmniRoute nunca
> faz isso.

O que isso significa para cada superfície, mesmo com `CORS_ALLOW_ALL=true`:

| Superfície                         | Mecanismo de autenticação      | Efeito do CORS com curinga                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`    | Sessão por cookie              | A origem é refletida, mas **sem `Allow-Credentials`** o navegador **bloqueia** a leitura com credenciais. Um site mal-intencionado de outra origem **não pode ler** as respostas autenticadas do seu dashboard, e o cookie de sessão não é exposto. |
| Client API `/v1/*`, `/v1beta/*`    | Cabeçalho Bearer / `x-api-key` | Já é permissiva **por design** (`relaxForTokenAuth`): navegadores nunca anexam automaticamente `Authorization`/`x-api-key`, portanto a página de um invasor não pode fornecer sua chave. `CORS_ALLOW_ALL` não amplia esse acesso.                   |
| Leitura pública (`/api/health`, …) | Nenhum                         | Não contém dados confidenciais; o curinga é inofensivo.                                                                                                                                                                                             |

Portanto, a exposição **residual** de `CORS_ALLOW_ALL=true` limita-se a: (a)
**leituras** entre origens sem credenciais de dados que já não exigem autenticação; e (b)
permitir que o **preflight** CORS seja aprovado em rotas de gerenciamento — que ainda exigem uma autenticação
que uma página de outra origem não consegue fornecer. Isso **não** constitui um vetor de sequestro de sessão ou
roubo de credenciais no caminho CORS compartilhado.

### Uma exceção real — `/api/v1/agents/`

As rotas do Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) definem
seus **próprios** cabeçalhos CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) e **emitem**
`Access-Control-Allow-Origin: <origin>|*` juntamente com
`Access-Control-Allow-Credentials: true`. Essa é a única superfície em que
o reflexo da origem e as credenciais coexistem, e ela é **independente de
`CORS_ALLOW_ALL`**. Essas rotas são autenticadas para gerenciamento
(`requireManagementAuth`); operadores que expõem o dashboard fora do host devem
estar cientes de que esse é o único local onde uma leitura entre origens com credenciais é permitida pelos
cabeçalhos da resposta. A restrição a uma lista de permissões explícita é acompanhada
separadamente desta orientação sobre CORS.

## Checklist de produção

- **Nunca defina `CORS_ALLOW_ALL=true` em produção.** Deixe essa variável sem valor.
- Defina uma lista **explícita** de origens — usando a variável de ambiente ou o campo da aba Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Se o OmniRoute for executado atrás de um proxy reverso/túnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), o CORS **não** será seu único controle — a proteção de rotas
  de loopback continuará protegendo as rotas capazes de iniciar processos (consulte
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Não falsifique
  `X-Forwarded-For: 127.0.0.1` para "corrigir" um erro 403; isso reabre a classe de
  vulnerabilidades RCE que a proteção de rotas bloqueia.
- Confirme o estado de execução: o dashboard exibe um **banner âmbar persistente**
  em Dashboard → Security → Authorization Inventory sempre que
  `CORS_ALLOW_ALL=true` estiver ativo, e `/api/settings/authz-inventory` retorna um
  envelope `cors: { allowAll, allowedOrigins }` que pode ser consultado periodicamente
  por ferramentas de monitoramento.

## Conveniência no desenvolvimento — permitir origens locais específicas

Raramente é necessário usar o curinga, mesmo em desenvolvimento. Permita apenas os
servidores de desenvolvimento que você utiliza:

```bash
# Servidores de desenvolvimento Vite (5173) + Next.js (3000) acessando um OmniRoute local
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

As origens são comparadas sem diferenciar maiúsculas de minúsculas e ignorando a
barra final, portanto `http://localhost:3000` e `http://localhost:3000/` são
equivalentes. O mesmo CSV pode ser definido em tempo de execução em **Dashboard →
Security → CORS Allowed Origins**, sem necessidade de reinicialização.

## Chaves de API versus sessões por cookie

- **Bearer / `x-api-key` (a superfície de inferência `/v1/*`):** os navegadores
  nunca os anexam automaticamente. O CORS não é uma barreira significativa aqui —
  a chave de API é a barreira — e é por isso que essa superfície é intencionalmente
  permissiva, permitindo que clientes em navegadores e Electron leiam respostas às
  quais já têm direito.
- **Sessão por cookie (o dashboard):** protegida pelo padrão de bloqueio seguro
  **e** pela ausência de `Access-Control-Allow-Credentials` no caminho compartilhado.
  Mantenha as origens de gerenciamento/dashboard fora de qualquer configuração
  permissiva; elas devem permanecer estritamente bloqueadas por padrão.

## Exemplo: proxy reverso na frente do OmniRoute

O CORS é aplicado pelo próprio OmniRoute, portanto, em geral, o proxy **não** deve
adicionar nem reescrever cabeçalhos `Access-Control-*` (cabeçalhos duplicados
causam falhas nos navegadores). Encerre o TLS e encaminhe a requisição — deixe que
o OmniRoute responda à solicitação de preflight:

```nginx
# nginx — encaminhe para o OmniRoute; NÃO injete Access-Control-* aqui
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NÃO defina X-Forwarded-For como 127.0.0.1 — isso neutraliza a proteção de rotas de loopback.
}
```

Defina as origens permitidas do navegador no OmniRoute (`CORS_ALLOWED_ORIGINS` ou
na aba Security), e não no proxy.

## Arquivos de origem

| Aspecto                                              | Arquivo                                                              |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Resolução da lista de permissões + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Aplicação do middleware (fonte única da verdade)     | `src/server/authz/pipeline.ts`                                       |
| Settings → injeção de origens em tempo de execução   | `src/lib/config/runtimeSettings.ts`                                  |
| Status de execução para o dashboard                  | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner de aviso do dashboard                         | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Campo CORS Allowed Origins                           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS por rota do Cloud-Agent (a exceção)             | `src/lib/cloudAgent/api.ts`                                          |

## Veja também

- [Níveis de proteção de rotas](./ROUTE_GUARD_TIERS.md) — aplicação de loopback para
  rotas capazes de gerar processos (um controle separado e complementar).
- [Guia de autorização](../architecture/AUTHZ_GUIDE.md) — o pipeline completo de autenticação e autorização.
