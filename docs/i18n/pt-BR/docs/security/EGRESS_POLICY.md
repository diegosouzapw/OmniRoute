# Egress IP Family Policy (IPv4/IPv6) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Fixe o tráfego de saída em uma única família de IP — `auto`, `ipv4` ou `ipv6` — por proxy, para que uma saída exclusivamente IPv6 nunca volte silenciosamente para IPv4.**

> **Fonte da verdade:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

O OmniRoute permite que cada proxy tenha uma **diretiva de família de endereços para saída**. Por padrão, o sistema operacional escolhe IPv4 ou IPv6 (pilha dupla, "Happy Eyeballs"). Quando você define a diretiva como `ipv4` ou `ipv6`, o OmniRoute fixa todas as conexões por meio desse proxy na família escolhida e **falha de forma segura**, em vez de recorrer à outra família.

Esta página documenta o que é a diretiva, por que ela existe, onde configurá-la e como o runtime a resolve.

---

## Sumário

- [O que é](#what-it-is)
- [Por que existe](#why-it-exists)
- [Os três valores](#the-three-values)
- [Como configurá-la](#how-to-configure-it)
- [Como `auto` é resolvido](#how-auto-resolves)
- [Como `ipv4` / `ipv6` são aplicados](#how-ipv4--ipv6-are-enforced)
- [Compatibilidade com SOCKS5](#socks5-compatibility)
- [Comportamento de falha segura](#fail-closed-behavior)
- [Modelo de dados](#data-model)
- [Documentação relacionada](#related-documentation)

---

## O que é

Cada proxy no registro possui um campo `family` com três valores possíveis, validados por um enum do Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

O valor padrão do campo é `"auto"`, o que preserva o comportamento anterior de pilha dupla. Defini-lo como `ipv4` ou `ipv6` fixa a família de conexão desse proxy.

A diretiva é normalizada em todos os locais por meio de um único helper, de modo que qualquer valor desconhecido seja convertido em `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Por que existe

Introduzida no PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Os problemas que motivaram sua criação:

| Problema                                             | O que a diretiva corrige                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vazamento de saída exclusivamente IPv6 para IPv4** | Quando um host de proxy possui registros A e AAAA (ou o sistema operacional prefere IPv4), o Happy Eyeballs pode estabelecer a conexão de saída por IPv4 mesmo quando você pretende usar um caminho exclusivamente IPv6. Fixar `ipv6` elimina esse vazamento.                                                                                              |
| **Revogação por anomalia de saída compartilhada**    | Provedores com rotação (codex/openai) revogam tokens quando muitas contas usam o **mesmo** IP de saída em alto volume. Controlar a família de saída ajuda a manter as contas em caminhos de saída distintos e previsíveis (consulte [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) para ver os diagnósticos de IP de saída relacionados a isso). |
| **Saída determinística para conformidade/testes**    | Quando é necessário garantir que o tráfego saia por uma família específica, `auto` não é suficiente.                                                                                                                                                                                                                                                       |

A diretiva é intencionalmente definida **por proxy**, e não globalmente — proxies diferentes no seu pool podem ter políticas diferentes.

---

## Os Três Valores

| Valor  | Rótulo na UI              | Comportamento                                                                                                                                                                                     |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Automático (dual-stack)` | O sistema operacional escolhe a família. Para um host de proxy que seja um IP literal, a família é intrínseca ao literal; para um nome de host, ambas as famílias são elegíveis. Esse é o padrão. |
| `ipv4` | `Somente IPv4`            | Restringe a conexão ao IPv4. A conexão falha de forma segura se o host do proxy não tiver um registro IPv4 (A).                                                                                   |
| `ipv6` | `Somente IPv6`            | Restringe a conexão ao IPv6. A conexão falha de forma segura se o host do proxy não tiver um registro IPv6 (AAAA).                                                                                |

As strings da UI ficam em `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Como Configurar

### Painel

O seletor fica no formulário de proxy da aba **Pool de Proxies**:

1. Abra **Painel → Configurações → Proxy → Pool de Proxies**
2. Adicione ou edite um proxy
3. Defina o menu suspenso **Família de IP** como `Automático (dual-stack)`, `Somente IPv4` ou `Somente IPv6`
4. Salve

O controle é renderizado por `ProxyRegistryManager.tsx` (montado em `proxy/ProxyPoolTab.tsx`).

### API

O campo `family` faz parte dos payloads de criação/atualização do registro de proxies, é validado por `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) e processado por `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Criar um proxy somente IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Alterar um proxy existente para somente IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

O mesmo campo também é aceito pelo objeto de configuração de proxy inline usado para entradas de proxy upstream (`upstream_proxy_config.family`; consulte [Modelo de Dados](#data-model)).

Para o restante da API de CRUD/atribuição de proxies, consulte [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Como `auto` é Resolvido

Quando `family` é `auto`, o OmniRoute **não** acrescenta nenhuma diretiva — a URL do proxy é usada sem alterações, e a família da conexão é determinada intrinsecamente.

No momento da construção da URL (`proxyConfigToUrl` / `normalizeProxyUrl` em `open-sse/utils/proxyDispatcher.ts`), um proxy `auto` resulta em uma URL simples, sem marcador:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

No momento do despacho (`resolveDispatcherFamily`), `auto` é resolvido para a família intrínseca de um host com IP literal ou para `null` (deixando o sistema operacional decidir) no caso de um nome de host:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null para um nome de host → o sistema operacional escolhe
  // ...
}
```

Portanto:

- `auto` + host com IP literal (`192.0.2.1` / `[2001:db8::1]`) → família desse literal.
- `auto` + nome de host → `null` → resolução dual-stack padrão do sistema operacional.

---

## Como `ipv4` / `ipv6` São Aplicados

Uma diretiva diferente de `auto` é transmitida como um único marcador de consulta sintético — `?family=ipv4` ou `?family=ipv6` — anexado uma vez à URL normalizada do proxy. `normalizeProxyUrl` remove e anexa novamente esse marcador exatamente uma vez, garantindo que ele nunca corrompa a análise da porta.

Quando o dispatcher é criado, o marcador é lido e convertido em uma família de conexão concreta. Se o host for um literal de IP da família **oposta**, o OmniRoute lança um erro (a contradição resulta em falha fechada):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

A família concreta é então fixada no conector:

- **Proxies HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — desabilita o Happy Eyeballs para que a família escolhida seja a única utilizada na conexão.
- **Proxies SOCKS5**: um conector personalizado encaminha `socket_options: { family, autoSelectFamily: false }` ao cliente SOCKS (consulte [Compatibilidade com SOCKS5](#compatibilidade-com-socks5)).

---

## Compatibilidade com SOCKS5

A fixação de família funciona com proxies SOCKS5, mas o `fetch-socks` padrão não expõe as opções de socket necessárias para fixar a família do salto até o proxy. O OmniRoute inclui seu próprio conector para essa finalidade:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Todos os despachos SOCKS5 passam por `createSocksDispatcherWithFamily`, independentemente de `family` (incluindo `null` / `auto` sobre um nome de host): `buildSocksFamilySocketOptions(null)` produz `{}`, e o mesmo caminho de `SocksClient.createConnection` + `buildConnector` para TLS é usado com a fixação por `socket_options`, para que o Happy Eyeballs não possa escolher IPv4 para uma política de saída exclusiva de IPv6.

O suporte a SOCKS5 é habilitado por padrão (pode ser desabilitado por meio de `ENABLE_SOCKS5_PROXY=false`); consulte [PROXY_GUIDE.md → Variáveis de Ambiente](../ops/PROXY_GUIDE.md#environment-variables).

---

## Comportamento de Falha Fechada

O objetivo da diretiva é **recusar** a conexão em vez de recorrer silenciosamente à família errada. Duas proteções garantem isso:

1. **Contradição de literal** — uma diretiva que contradiz um host expresso como literal de IP lança um erro durante a criação do dispatcher (`resolveDispatcherFamily`, mostrado acima).

2. **Verificação preliminar de DNS do nome de host** — para um proxy com nome de host e uma família fixada, `proxyFetch.ts` verifica se o nome de host realmente possui um registro na família exigida **antes** de iniciar o tráfego de saída, por meio de `assertHostnameSupportsFamily`:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   Em caso de falha, `proxyFetch.ts` marca o erro com `code = "PROXY_FAMILY_UNAVAILABLE"` e `statusCode = 503`. Uma falha na resolução de DNS também é tratada como falha fechada (o tráfego de saída é recusado).

Hosts expressos como literais de IP não exigem ação na verificação preliminar de DNS — sua família é intrínseca e dispensa consulta.

---

## Modelo de Dados

A coluna `family` foi adicionada pela migração `099_proxy_family.sql` a **duas** tabelas:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — a diretiva por proxy para entradas do registro (`src/lib/db/proxies.ts`). As consultas de resolução selecionam `family` junto às demais colunas de proxy, e um valor ausente ou que não seja uma string é convertido em `"auto"`.
- `upstream_proxy_config.family` — a diretiva para entradas de proxy upstream (`src/lib/db/upstreamProxy.ts`), com o mesmo valor padrão `"auto"`.

Quando um objeto de proxy resolvido contém um `family` diferente de `auto`, `proxyConfigToUrl` acrescenta o marcador `?family=` para que a configuração fixada seja preservada até o dispatcher.

---

## Documentação Relacionada

> 📖 **Documentação relacionada:**
>
> - [Guia de Proxy](../ops/PROXY_GUIDE.md) — sistema de proxy completo: CRUD do registro, resolução em 4 níveis, rotação, verificação de integridade e referência da API
> - `docs/security/STEALTH_GUIDE.md` (git; não compilado em `/docs`) — camadas de impressão digital TLS e da CLI que operam sobre o proxy
> - [Níveis de Proteção de Rotas](./ROUTE_GUARD_TIERS.md) — aplicação obrigatória de loopback para rotas exclusivamente locais
