# Egress IP Family Policy (IPv4/IPv6) (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **프록시별로 아웃바운드 트래픽을 단일 IP 패밀리(`auto`, `ipv4`, `ipv6`)에 고정하여 IPv6 전용 이그레스가 자신도 모르게 IPv4로 다시 유출되지 않도록 합니다.**

> **신뢰할 수 있는 원본:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute에서는 각 프록시에 **주소 패밀리 이그레스 지시문**을 지정할 수 있습니다. 기본적으로는 OS가 IPv4 또는 IPv6를 선택합니다(듀얼 스택, "Happy Eyeballs"). 지시문을 `ipv4` 또는 `ipv6`로 설정하면 OmniRoute는 해당 프록시를 통과하는 모든 연결을 선택한 패밀리에 고정하며, 다른 패밀리로 폴백하지 않고 **실패 시 차단**합니다.

이 페이지에서는 지시문이 무엇인지, 왜 필요한지, 어디에서 구성하는지, 런타임에서 이를 어떻게 해석하는지 설명합니다.

---

## 목차

- [개요](#what-it-is)
- [필요한 이유](#why-it-exists)
- [세 가지 값](#the-three-values)
- [구성 방법](#how-to-configure-it)
- [`auto` 해석 방식](#how-auto-resolves)
- [`ipv4` / `ipv6` 적용 방식](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 호환성](#socks5-compatibility)
- [실패 시 차단 동작](#fail-closed-behavior)
- [데이터 모델](#data-model)
- [관련 문서](#related-documentation)

---

## 개요

레지스트리의 모든 프록시에는 세 가지 값 중 하나를 가질 수 있는 `family` 필드가 있으며, Zod 열거형으로 검증됩니다.

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

이 필드의 기본값은 `"auto"`이며, 기존의 듀얼 스택 동작을 유지합니다. 이를 `ipv4` 또는 `ipv6`로 설정하면 해당 프록시의 연결 패밀리가 고정됩니다.

지시문은 단일 헬퍼를 통해 모든 위치에서 정규화되므로, 알 수 없는 값은 모두 `auto`로 처리됩니다.

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## 필요한 이유

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777)에서 도입되었습니다. 이를 도입하게 된 주요 문제는 다음과 같습니다.

| 문제                                          | 지시문으로 해결되는 사항                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IPv6 전용 이그레스가 IPv4로 유출됨**        | 프록시 호스트에 A 레코드와 AAAA 레코드가 모두 있거나 OS가 IPv4를 선호하면 IPv6 전용 경로를 사용하려는 경우에도 Happy Eyeballs가 IPv4를 통해 연결할 수 있습니다. `ipv6`로 고정하면 이러한 유출을 방지할 수 있습니다.                                                                                                                           |
| **공유 이그레스 이상으로 인한 취소**          | 로테이션 제공업체(codex/openai)는 많은 계정이 대량의 트래픽을 **동일한** IP를 통해 송신하면 토큰을 취소합니다. 이그레스 패밀리를 제어하는 것은 계정별로 서로 구분되고 예측 가능한 이그레스 경로를 유지하는 방법 중 하나입니다(이와 함께 사용되는 이그레스 IP 진단은 [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts)를 참조하십시오). |
| **규정 준수/테스트를 위한 결정론적 이그레스** | 트래픽이 특정 패밀리를 통해 송신됨을 보장해야 하는 경우 `auto`만으로는 충분하지 않습니다.                                                                                                                                                                                                                                                     |

이 지시문은 의도적으로 전역이 아닌 **프록시별**로 적용됩니다. 따라서 풀에 포함된 각 프록시에 서로 다른 정책을 지정할 수 있습니다.

---

## 세 가지 값

| 값     | UI 레이블         | 동작                                                                                                                                                                    |
| ------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `자동(듀얼 스택)` | OS가 주소 패밀리를 선택합니다. 프록시 호스트가 IP 리터럴이면 패밀리는 해당 리터럴에 내재되어 있으며, 호스트 이름이면 두 패밀리를 모두 사용할 수 있습니다. 기본값입니다. |
| `ipv4` | `IPv4 전용`       | 연결을 IPv4로 고정합니다. 프록시 호스트에 IPv4(A) 레코드가 없으면 연결에 실패합니다.                                                                                    |
| `ipv6` | `IPv6 전용`       | 연결을 IPv6로 고정합니다. 프록시 호스트에 IPv6(AAAA) 레코드가 없으면 연결에 실패합니다.                                                                                 |

UI 문자열은 `src/i18n/messages/en.json`의 `labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`에 있습니다.

---

## 구성 방법

### 대시보드

선택기는 **프록시 풀** 탭의 프록시 양식에 있습니다.

1. **대시보드 → 설정 → 프록시 → 프록시 풀**을 엽니다.
2. 프록시를 추가하거나 편집합니다.
3. **IP 패밀리** 드롭다운을 `자동(듀얼 스택)`, `IPv4 전용` 또는 `IPv6 전용`으로 설정합니다.
4. 저장합니다.

이 컨트롤은 `ProxyRegistryManager.tsx`에서 렌더링됩니다(`proxy/ProxyPoolTab.tsx`에 마운트됨).

### API

`family` 필드는 프록시 레지스트리 생성/업데이트 페이로드의 일부이며, `createProxyRegistrySchema` / `updateProxyRegistrySchema`(`src/shared/validation/schemas.ts`)에 의해 검증되고 `POST` / `PATCH /api/v1/management/proxies`에서 처리됩니다.

```bash
# IPv6 전용 프록시 생성
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# 기존 프록시를 IPv4 전용으로 변경
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

동일한 필드는 업스트림 프록시 항목에 사용되는 인라인 프록시 구성 객체에서도 허용됩니다(`upstream_proxy_config.family`, [데이터 모델](#data-model) 참조).

나머지 프록시 CRUD/할당 API에 대해서는 [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md)를 참조하세요.

---

## `auto` 해석 방식

`family`가 `auto`이면 OmniRoute는 어떤 지시자도 추가하지 **않습니다**. 프록시 URL은 그대로 사용되며, 연결 패밀리는 URL 자체의 특성에 따라 결정됩니다.

URL 빌드 시점(`open-sse/utils/proxyDispatcher.ts`의 `proxyConfigToUrl` / `normalizeProxyUrl`)에 `auto` 프록시는 마커가 없는 일반 URL을 생성합니다.

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

디스패치 시점(`resolveDispatcherFamily`)에 `auto`는 IP 리터럴 호스트의 내재된 패밀리로 해석되며, 호스트 이름의 경우에는 `null`(OS가 결정하도록 함)로 해석됩니다.

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // 호스트 이름이면 null → OS가 선택
  // ...
}
```

따라서 다음과 같이 동작합니다.

- `auto` + IP 리터럴 호스트(`192.0.2.1` / `[2001:db8::1]`) → 해당 리터럴의 패밀리.
- `auto` + 호스트 이름 → `null` → 표준 듀얼 스택 OS 해석.

---

## `ipv4` / `ipv6` 적용 방식

`auto`가 아닌 지시자는 정규화된 프록시 URL에 한 번만 추가되는 단일 합성 쿼리 마커인 `?family=ipv4` 또는 `?family=ipv6`로 전달됩니다. `normalizeProxyUrl`은 포트 구문 분석을 손상시키지 않도록 이 마커를 정확히 한 번 제거한 후 다시 추가합니다.

디스패처를 빌드할 때 마커를 읽어 구체적인 연결 패밀리로 변환합니다. 호스트가 **반대** 패밀리의 IP 리터럴이면 OmniRoute는 오류를 발생시킵니다(모순이 있으면 실패로 종료):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

그런 다음 구체적인 패밀리가 커넥터에 고정됩니다.

- **HTTP/HTTPS 프록시** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs를 비활성화하여 선택한 패밀리로만 연결합니다.
- **SOCKS5 프록시**: 사용자 정의 커넥터가 `socket_options: { family, autoSelectFamily: false }`를 SOCKS 클라이언트에 전달합니다([SOCKS5 호환성](#socks5-compatibility) 참조).

---

## SOCKS5 호환성

패밀리 고정은 SOCKS5 프록시에서도 작동하지만, 기본 `fetch-socks`는 프록시 홉의 패밀리를 고정하는 데 필요한 소켓 옵션을 노출하지 않습니다. 이를 위해 OmniRoute는 자체 커넥터를 제공합니다.

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

모든 SOCKS5 디스패치는 `family` 값과 관계없이(호스트 이름에 대해 `null` / `auto`인 경우 포함) `createSocksDispatcherWithFamily`을 거칩니다. `buildSocksFamilySocketOptions(null)`은 `{}`를 반환하며, `socket_options` 고정과 함께 동일한 `SocksClient.createConnection` + TLS `buildConnector` 경로를 사용하므로 Happy Eyeballs가 IPv6 전용 이그레스 정책에서 IPv4를 선택할 수 없습니다.

SOCKS5 지원 자체는 기본적으로 활성화되어 있습니다(`ENABLE_SOCKS5_PROXY=false`로 비활성화 가능). [PROXY_GUIDE.md → 환경 변수](../ops/PROXY_GUIDE.md#environment-variables)를 참조하세요.

---

## 실패 시 차단 동작

이 지시자의 핵심 목적은 잘못된 패밀리로 조용히 폴백하는 대신 연결을 **거부**하는 것입니다. 다음 두 가지 보호 장치가 이를 보장합니다.

1. **리터럴 모순** — IP 리터럴 호스트와 모순되는 지시자가 있으면 디스패처 빌드 시점에 오류가 발생합니다(위에 표시된 `resolveDispatcherFamily`).

2. **호스트 이름 사전 DNS 검사** — 패밀리가 고정된 호스트 이름 프록시의 경우, `proxyFetch.ts`는 이그레스 전에 `assertHostnameSupportsFamily`을 통해 해당 호스트 이름에 필요한 패밀리의 레코드가 실제로 존재하는지 확인합니다.

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

   실패하면 `proxyFetch.ts`는 오류에 `code = "PROXY_FAMILY_UNAVAILABLE"` 및 `statusCode = 503`을 지정합니다. DNS 확인 실패도 마찬가지로 실패 시 차단으로 처리됩니다(이그레스 거부).

IP 리터럴 호스트의 경우 DNS 사전 검사는 아무 작업도 수행하지 않습니다. 패밀리가 리터럴 자체에 내재되어 있어 조회가 필요하지 않기 때문입니다.

---

## 데이터 모델

`family` 열은 마이그레이션 `099_proxy_family.sql`을 통해 **두 개**의 테이블에 추가되었습니다.

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — 레지스트리 항목별 프록시 지시자입니다(`src/lib/db/proxies.ts`). 확인 쿼리는 다른 프록시 열과 함께 `family`를 선택하며, 값이 없거나 문자열이 아니면 `"auto"`로 강제 변환됩니다.
- `upstream_proxy_config.family` — 업스트림 프록시 항목의 지시자입니다(`src/lib/db/upstreamProxy.ts`). 동일하게 `"auto"`가 기본값입니다.

확인된 프록시 객체의 `family`가 `auto`가 아닌 경우, `proxyConfigToUrl`은 `?family=` 표시자를 추가하여 고정 설정이 디스패처까지 계속 유지되도록 합니다.

---

## 관련 문서

> 📖 **관련 문서:**
>
> - [프록시 가이드](../ops/PROXY_GUIDE.md) — 전체 프록시 시스템: 레지스트리 CRUD, 4단계 확인, 로테이션, 상태 검사, API 레퍼런스
> - `docs/security/STEALTH_GUIDE.md` (git에만 있으며 `/docs`에는 컴파일되지 않음) — 프록시 위에서 동작하는 TLS 지문 및 CLI 지문 계층
> - [라우트 가드 등급](./ROUTE_GUARD_TIERS.md) — 로컬 전용 라우트에 대한 루프백 강제 적용
