# CORS Configuration & Security (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute controla quais as **origens de browser** que podem ler respostas entre origens
a partir de uma única lista de permissões centralizada. O modelo é **fechado por predefinição**:
nenhuma origem é permitida até que a autorize explicitamente. Esta página documenta como a lista de permissões
é resolvida, o que `CORS_ALLOW_ALL=true` expõe efetivamente (e, sobretudo, o que
**não** expõe), como configurar os ambientes de desenvolvimento e produção em segurança e o aviso em tempo de execução
que o painel apresenta quando está ativo um caráter universal.

**Fonte fidedigna:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). A lista de permissões é aplicada uma única vez, no
middleware (`src/server/authz/pipeline.ts`) — os processadores de cada rota não definem
`Access-Control-Allow-Origin` diretamente.

## Como é resolvida uma origem

Para cada pedido, o middleware calcula o valor de `Access-Control-Allow-Origin`
pela seguinte ordem:

1. **`CORS_ALLOW_ALL=true`** (ou a opção legada `CORS_ORIGIN=*`) → devolve a
   `Origin` do autor da chamada (ou `*` quando não existe um cabeçalho `Origin`), com `Vary: Origin`
   para manter as caches corretas. O mesmo ponto de controlo `applyCorsHeaders()` também acrescenta
   `Vary: Accept-Encoding` a todas as respostas 2xx com corpo na superfície autenticada
   por token `/v1*`/`/v1beta*` (`relaxForTokenAuth`, RFC 9110 §12.5.5, problema #6737), para que
   as caches partilhadas/a jusante consigam distinguir corretamente as variantes comprimidas
   das não comprimidas.
2. Caso contrário, a `Origin` do pedido é normalizada (convertida para minúsculas e sem a
   barra final) e comparada com a **lista de permissões combinada**:
   - variável de ambiente **`CORS_ALLOWED_ORIGINS`** — lista separada por vírgulas, e
   - a definição de execução **`corsOrigins`** (Painel → Segurança → _Origens CORS
     permitidas_), injetada através de `setRuntimeAllowedOrigins()` a partir de
     `src/lib/config/runtimeSettings.ts`.
3. Sem correspondência → **não é emitido qualquer cabeçalho `Access-Control-Allow-Origin`**. O browser
   bloqueia a leitura entre origens. Este é o comportamento fechado por predefinição pretendido.

| Variável de ambiente   | Significado                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV de origens exatas a permitir (recomendado).                                                         |
| `CORS_ALLOW_ALL`       | `true`/`1` → devolve qualquer origem (caráter universal). Apenas para desenvolvimento.                  |
| `CORS_ORIGIN`          | Opção legada. `*` comporta-se como `CORS_ALLOW_ALL`; um único valor é adicionado à lista de permissões. |

## Modelo de ameaças — o que `CORS_ALLOW_ALL=true` expõe realmente

Vale a pena levar a sério o aviso genérico da OWASP ("CORS universal = qualquer site
pode chamar a sua API"), mas a exposição do OmniRoute é **mais limitada do que no caso genérico**,
devido a um facto concreto da implementação:

> **O `applyCorsHeaders()` central nunca emite
> `Access-Control-Allow-Credentials`.** Um browser não expõe uma resposta entre origens
> _com credenciais_ (com cookies), a menos que o servidor envie
> `Access-Control-Allow-Credentials: true`. O caminho CORS partilhado do OmniRoute nunca
> o faz.

Isto significa o seguinte para cada superfície, mesmo com `CORS_ALLOW_ALL=true`:

| Superfície                          | Mecanismo de autenticação      | Efeito do CORS universal                                                                                                                                                                                                                      |
| ----------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Painel / GESTÃO `/api/*`            | Sessão com cookie              | A origem é devolvida, mas **sem `Allow-Credentials`** o browser **bloqueia** a leitura com credenciais. Um site malicioso de outra origem **não consegue ler** as respostas autenticadas do seu painel e o cookie de sessão não é exposto.    |
| API de cliente `/v1/*`, `/v1beta/*` | Cabeçalho Bearer / `x-api-key` | Já é permissiva **por conceção** (`relaxForTokenAuth`): os browsers nunca anexam automaticamente `Authorization`/`x-api-key`, pelo que a página de um atacante não consegue fornecer a sua chave. `CORS_ALLOW_ALL` não amplia esta exposição. |
| Leitura pública (`/api/health`, …)  | Nenhum                         | Não contém dados sensíveis; o caráter universal é inofensivo.                                                                                                                                                                                 |

Assim, a exposição **residual** de `CORS_ALLOW_ALL=true` limita-se a: (a)
**leituras** entre origens sem credenciais de dados que já não exigem autenticação e (b)
permitir que a **comprovação prévia** CORS seja aprovada em rotas de gestão — que continuam a exigir autenticação
que uma página de outra origem não consegue fornecer. **Não** constitui um vetor de apropriação de sessão ou
roubo de credenciais no caminho CORS partilhado.

### Uma exceção real — `/api/v1/agents/`

As rotas Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) definem
os seus **próprios** cabeçalhos CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) e **emitem**
`Access-Control-Allow-Origin: <origin>|*` juntamente com
`Access-Control-Allow-Credentials: true`. Esta é a única superfície em que a
devolução da origem e as credenciais coexistem, sendo **independente de
`CORS_ALLOW_ALL`**. Estas rotas são autenticadas para gestão
(`requireManagementAuth`); os operadores que exponham o painel fora do anfitrião devem
estar cientes de que este é o único local onde os cabeçalhos de resposta permitem uma leitura
entre origens com credenciais. A respetiva restrição a uma lista de permissões explícita é acompanhada
separadamente destas orientações de CORS.

## Lista de verificação para produção

- **Nunca defina `CORS_ALLOW_ALL=true` em produção.** Deixe esta variável por definir.
- Defina uma lista **explícita** de origens — através da variável de ambiente ou do campo no separador Segurança:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Se o OmniRoute for executado atrás de um proxy inverso/túnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), o CORS **não** é o seu único controlo — a proteção de rotas de
  loopback continua a proteger as rotas capazes de iniciar processos (consulte
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Não falsifique
  `X-Forwarded-For: 127.0.0.1` para «corrigir» um erro 403; isso reabre a classe de RCE
  que a proteção de rotas bloqueia.
- Confirme o estado em tempo de execução: o painel apresenta uma **faixa âmbar persistente**
  em Painel → Segurança → Inventário de autorizações sempre que
  `CORS_ALLOW_ALL=true` estiver ativo, e `/api/settings/authz-inventory` devolve um
  invólucro `cors: { allowAll, allowedOrigins }` que as ferramentas de monitorização podem consultar.

## Conveniência no desenvolvimento — permitir origens locais específicas

Raramente é necessário usar o carácter universal, mesmo durante o desenvolvimento. Permita apenas os servidores de desenvolvimento que utiliza:

```bash
# Servidores de desenvolvimento Vite (5173) + Next.js (3000) a chamar um OmniRoute local
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

A correspondência das origens não distingue maiúsculas de minúsculas e ignora a barra final, pelo que
`http://localhost:3000` e `http://localhost:3000/` são equivalentes. A mesma lista CSV
pode ser definida em tempo de execução em **Painel → Segurança → Origens CORS permitidas** sem
reiniciar.

## Chaves de API vs. sessões com cookies

- **Bearer / `x-api-key` (a superfície de inferência `/v1/*`):** os browsers nunca as anexam
  automaticamente. O CORS não constitui uma barreira significativa neste caso — a chave de API é a
  barreira —, motivo pelo qual esta superfície é intencionalmente permissiva, para que os clientes
  de browser e Electron possam ler respostas às quais já têm direito.
- **Sessão com cookies (o painel):** protegida pela predefinição de bloqueio em caso de falha **e**
  pela ausência de `Access-Control-Allow-Credentials` no caminho partilhado. Mantenha
  as origens de gestão/do painel fora de qualquer configuração permissiva; estas devem permanecer
  estritamente bloqueadas em caso de falha.

## Exemplo: proxy inverso à frente do OmniRoute

O CORS é aplicado pelo próprio OmniRoute, pelo que, em geral, o proxy **não** deve adicionar nem
reescrever cabeçalhos `Access-Control-*` (cabeçalhos duplicados causam problemas nos browsers). Termine o TLS
e reencaminhe — permita que o OmniRoute responda ao pedido de verificação prévia:

```nginx
# nginx — reencaminhar para o OmniRoute; NÃO injetar Access-Control-* aqui
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NÃO definir X-Forwarded-For como 127.0.0.1 — isso neutraliza a proteção de rotas de loopback.
}
```

Defina as origens permitidas do browser no OmniRoute (`CORS_ALLOWED_ORIGINS` ou no
separador Segurança), não no proxy.

## Ficheiros de origem

| Aspeto                                               | Ficheiro                                                             |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Resolução da lista de permissões + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Aplicação do middleware (fonte única de verdade)     | `src/server/authz/pipeline.ts`                                       |
| Definições → injeção de origens em tempo de execução | `src/lib/config/runtimeSettings.ts`                                  |
| Estado em tempo de execução para o painel            | `src/app/api/settings/authz-inventory/route.ts`                      |
| Faixa de aviso do painel                             | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Campo Origens CORS permitidas                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS por rota do Cloud-Agent (a exceção)             | `src/lib/cloudAgent/api.ts`                                          |

## Ver também

- [Níveis de proteção de rotas](./ROUTE_GUARD_TIERS.md) — aplicação obrigatória de loopback para
  rotas com capacidade de criação de processos (um controlo separado e complementar).
- [Guia de autorização](../architecture/AUTHZ_GUIDE.md) — o pipeline completo de autenticação.
