# Egress IP Family Policy (IPv4/IPv6) (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Fixe o tráfego de saída a uma única família de IP — `auto`, `ipv4` ou `ipv6` — por proxy, para que uma saída exclusiva por IPv6 nunca reverta silenciosamente para IPv4.**

> **Fonte fidedigna:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

O OmniRoute permite que cada proxy tenha uma **diretiva de família de endereços para saída**. Por predefinição, o sistema operativo escolhe IPv4 ou IPv6 (pilha dupla, "Happy Eyeballs"). Quando define a diretiva como `ipv4` ou `ipv6`, o OmniRoute fixa todas as ligações através desse proxy à família escolhida e **falha de forma segura**, em vez de reverter para a outra família.

Esta página documenta o que é a diretiva, por que motivo existe, onde pode configurá-la e como o ambiente de execução a resolve.

---

## Índice

- [O Que É](#what-it-is)
- [Por Que Motivo Existe](#why-it-exists)
- [Os Três Valores](#the-three-values)
- [Como Configurá-la](#how-to-configure-it)
- [Como `auto` É Resolvido](#how-auto-resolves)
- [Como `ipv4` / `ipv6` São Aplicados](#how-ipv4--ipv6-are-enforced)
- [Compatibilidade com SOCKS5](#socks5-compatibility)
- [Comportamento de Falha Segura](#fail-closed-behavior)
- [Modelo de Dados](#data-model)
- [Documentação Relacionada](#related-documentation)

---

## O Que É

Cada proxy no registo tem um campo `family` com três valores possíveis, validados por uma enumeração Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

O valor predefinido do campo é `"auto"`, o que preserva o comportamento anterior de pilha dupla. Defini-lo como `ipv4` ou `ipv6` fixa a família de ligação para esse proxy.

A diretiva é normalizada em todos os locais através de uma única função auxiliar, para que qualquer valor desconhecido seja convertido em `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Por Que Motivo Existe

Introduzida no PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Os problemas que motivaram esta funcionalidade:

| Problema                                          | O que a diretiva corrige                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Saída exclusiva por IPv6 com fuga para IPv4**   | Quando um anfitrião proxy tem registos A e AAAA (ou o sistema operativo dá preferência ao IPv4), o Happy Eyeballs pode estabelecer a ligação de saída através de IPv4, mesmo quando pretende um caminho exclusivo por IPv6. Fixar `ipv6` elimina essa fuga.                                                                                                                                 |
| **Revogação por anomalia de saída partilhada**    | Os fornecedores com rotação (codex/openai) revogam tokens quando muitas contas utilizam o **mesmo** IP para saída com um volume elevado. Controlar a família de saída ajuda a manter as contas em caminhos de saída distintos e previsíveis (consulte [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) para obter os diagnósticos de IP de saída associados a esta funcionalidade). |
| **Saída determinística para conformidade/testes** | Quando é necessário garantir que o tráfego sai através de uma família específica, `auto` não é suficiente.                                                                                                                                                                                                                                                                                  |

A diretiva é intencionalmente definida **por proxy**, e não globalmente — proxies diferentes no seu conjunto podem ter políticas diferentes.

---

## Os Três Valores

| Valor  | Etiqueta da UI      | Comportamento                                                                                                                                                                                                   |
| ------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | O SO escolhe a família. Para um anfitrião proxy especificado por um endereço IP literal, a família é intrínseca ao endereço; para um nome de anfitrião, ambas as famílias são elegíveis. Esta é a predefinição. |
| `ipv4` | `IPv4 only`         | Limita a ligação a IPv4. Falha de forma segura se o anfitrião proxy não tiver um registo IPv4 (A).                                                                                                              |
| `ipv6` | `IPv6 only`         | Limita a ligação a IPv6. Falha de forma segura se o anfitrião proxy não tiver um registo IPv6 (AAAA).                                                                                                           |

As cadeias da UI encontram-se em `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Como Configurar

### Painel

O seletor encontra-se no formulário de proxy do separador **Proxy Pool**:

1. Abra **Dashboard → Settings → Proxy → Proxy Pool**
2. Adicione ou edite um proxy
3. Defina a lista pendente **IP family** como `Auto (dual-stack)`, `IPv4 only` ou `IPv6 only`
4. Guarde

O controlo é renderizado por `ProxyRegistryManager.tsx` (montado em `proxy/ProxyPoolTab.tsx`).

### API

O campo `family` faz parte dos payloads de criação/atualização do registo de proxies, validados por `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) e processados por `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Criar um proxy exclusivo de IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Alterar um proxy existente para exclusivo de IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

O mesmo campo também é aceite pelo objeto de configuração de proxy inline utilizado para entradas de proxy a montante (`upstream_proxy_config.family`, consulte [Modelo de Dados](#data-model)).

Para o resto da API CRUD/de atribuição de proxies, consulte [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Como `auto` é Resolvido

Quando `family` é `auto`, o OmniRoute **não** acrescenta qualquer diretiva — o URL do proxy é utilizado tal como está e a família da ligação é determinada intrinsecamente.

Durante a construção do URL (`proxyConfigToUrl` / `normalizeProxyUrl` em `open-sse/utils/proxyDispatcher.ts`), um proxy `auto` produz um URL simples sem qualquer marcador:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Durante o despacho (`resolveDispatcherFamily`), `auto` é resolvido para a família intrínseca de um anfitrião especificado por um endereço IP literal ou para `null` (permitindo que o SO decida) no caso de um nome de anfitrião:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null para um nome de anfitrião → o SO escolhe
  // ...
}
```

Assim:

- `auto` + anfitrião especificado por um endereço IP literal (`192.0.2.1` / `[2001:db8::1]`) → família desse endereço.
- `auto` + nome de anfitrião → `null` → resolução dual-stack padrão do SO.

---

## Como `ipv4` / `ipv6` São Aplicados

Uma diretiva diferente de `auto` é transmitida como um único marcador sintético de consulta — `?family=ipv4` ou `?family=ipv6` — acrescentado uma vez ao URL normalizado do proxy. `normalizeProxyUrl` tem o cuidado de remover e voltar a acrescentar este marcador exatamente uma vez, para que nunca corrompa a análise da porta.

Quando o dispatcher é criado, o marcador é lido e convertido numa família de ligação concreta. Se o host for um literal de IP da família **oposta**, o OmniRoute lança um erro (a contradição segue uma política de falha fechada):

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

- **Proxies HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — desativa o Happy Eyeballs, para que apenas seja estabelecida ligação através da família escolhida.
- **Proxies SOCKS5**: um conector personalizado transmite `socket_options: { family, autoSelectFamily: false }` ao cliente SOCKS (consulte [Compatibilidade com SOCKS5](#compatibilidade-com-socks5)).

---

## Compatibilidade com SOCKS5

A fixação da família funciona com proxies SOCKS5, mas o `fetch-socks` padrão não expõe as opções de socket necessárias para fixar a família do salto do proxy. O OmniRoute inclui o seu próprio conector para esse efeito:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Todos os envios SOCKS5 passam por `createSocksDispatcherWithFamily`, independentemente de `family` (incluindo `null` / `auto` através de um nome de host): `buildSocksFamilySocketOptions(null)` devolve `{}`, e é utilizado o mesmo caminho `SocksClient.createConnection` + `buildConnector` TLS, com a fixação através de `socket_options`, para que o Happy Eyeballs não possa escolher IPv4 para uma política de saída exclusiva por IPv6.

O próprio suporte para SOCKS5 está ativado por predefinição (pode ser desativado através de `ENABLE_SOCKS5_PROXY=false`); consulte [PROXY_GUIDE.md → Variáveis de Ambiente](../ops/PROXY_GUIDE.md#environment-variables).

---

## Comportamento de Falha Fechada

O objetivo da diretiva é **recusar** em vez de reverter silenciosamente para a família errada. Duas salvaguardas garantem este comportamento:

1. **Contradição de literal** — uma diretiva que contradiga um host indicado como literal de IP lança um erro durante a criação do dispatcher (`resolveDispatcherFamily`, apresentado acima).

2. **Verificação DNS preliminar do nome de host** — para um proxy com nome de host e uma família fixada, `proxyFetch.ts` verifica se o nome de host possui efetivamente um registo da família exigida **antes** da saída, através de `assertHostnameSupportsFamily`:

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

   Em caso de falha, `proxyFetch.ts` identifica o erro com `code = "PROXY_FAMILY_UNAVAILABLE"` e `statusCode = 503`. Uma falha de resolução DNS é igualmente tratada como uma falha fechada (a saída é recusada).

Os hosts indicados como literais de IP não requerem qualquer ação na verificação DNS preliminar — a respetiva família é intrínseca e não necessita de consulta.

---

## Modelo de Dados

A coluna `family` foi adicionada pela migração `099_proxy_family.sql` a **duas** tabelas:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — a diretiva por proxy para entradas do registo (`src/lib/db/proxies.ts`). As consultas de resolução selecionam `family` juntamente com as outras colunas do proxy, e um valor em falta ou que não seja uma cadeia de caracteres é convertido em `"auto"`.
- `upstream_proxy_config.family` — a diretiva para entradas de proxy upstream (`src/lib/db/upstreamProxy.ts`), com o mesmo valor predefinido `"auto"`.

Quando um objeto de proxy resolvido contém um valor de `family` diferente de `auto`, `proxyConfigToUrl` acrescenta o marcador `?family=` para que a configuração fixa seja preservada até ao dispatcher.

---

## Documentação Relacionada

> 📖 **Documentação relacionada:**
>
> - [Guia de Proxies](../ops/PROXY_GUIDE.md) — sistema de proxies completo: operações CRUD do registo, resolução em 4 níveis, rotação, verificação de estado e referência da API
> - `docs/security/STEALTH_GUIDE.md` (git; não compilado em `/docs`) — camadas de fingerprint TLS e de fingerprint da CLI que funcionam sobre o proxy
> - [Níveis de Proteção de Rotas](./ROUTE_GUARD_TIERS.md) — imposição de loopback para rotas exclusivamente locais
