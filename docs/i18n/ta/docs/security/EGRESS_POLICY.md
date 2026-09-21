# Egress IP Family Policy (IPv4/IPv6) (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **வெளிச்செல்லும் போக்குவரத்தை ஒவ்வொரு proxy-க்கும் ஒரே IP family-க்கு — `auto`, `ipv4`, அல்லது `ipv6` — கட்டுப்படுத்துங்கள்; இதனால் IPv6-மட்டுமே கொண்ட egress ஒருபோதும் கவனிக்கப்படாமல் மீண்டும் IPv4-க்கு கசிவதில்லை.**

> **உண்மைக்கான ஆதாரம்:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

ஒவ்வொரு proxy-யும் ஓர் **முகவரி-family egress வழிகாட்டுதலை** கொண்டிருக்க OmniRoute அனுமதிக்கிறது. இயல்புநிலையில் OS ஆனது IPv4 அல்லது IPv6-ஐத் தேர்ந்தெடுக்கிறது (dual-stack, "Happy Eyeballs"). வழிகாட்டுதலை `ipv4` அல்லது `ipv6` என அமைக்கும்போது, அந்த proxy வழியாகச் செல்லும் ஒவ்வொரு இணைப்பையும் OmniRoute தேர்ந்தெடுக்கப்பட்ட family-க்குக் கட்டுப்படுத்தி, மற்றொரு family-க்கு மாறுவதற்குப் பதிலாக **மூடிய நிலையில் தோல்வியடைகிறது**.

வழிகாட்டுதல் என்றால் என்ன, அது ஏன் உள்ளது, அதை எங்கு உள்ளமைப்பது, runtime அதை எவ்வாறு resolve செய்கிறது ஆகியவற்றை இந்தப் பக்கம் ஆவணப்படுத்துகிறது.

---

## உள்ளடக்க அட்டவணை

- [அது என்ன](#what-it-is)
- [அது ஏன் உள்ளது](#why-it-exists)
- [மூன்று மதிப்புகள்](#the-three-values)
- [அதை எவ்வாறு உள்ளமைப்பது](#how-to-configure-it)
- [`auto` எவ்வாறு resolve செய்யப்படுகிறது](#how-auto-resolves)
- [`ipv4` / `ipv6` எவ்வாறு அமல்படுத்தப்படுகின்றன](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 இணக்கத்தன்மை](#socks5-compatibility)
- [Fail-Closed நடத்தை](#fail-closed-behavior)
- [தரவு மாதிரி](#data-model)
- [தொடர்புடைய ஆவணங்கள்](#related-documentation)

---

## அது என்ன

பதிவகத்திலுள்ள ஒவ்வொரு proxy-க்கும் மூன்று சாத்தியமான மதிப்புகளைக் கொண்ட `family` புலம் உள்ளது; இது Zod enum மூலம் சரிபார்க்கப்படுகிறது:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

இந்தப் புலத்தின் இயல்புநிலை `"auto"`; இது முந்தைய dual-stack நடத்தையைத் தக்கவைக்கிறது. அதை `ipv4` அல்லது `ipv6` என அமைப்பது, அந்த proxy-க்கான இணைப்பு family-யைக் கட்டுப்படுத்துகிறது.

அறியப்படாத எந்த மதிப்பும் `auto` ஆகச் சுருங்கும் வகையில், ஒரே helper மூலம் இந்த வழிகாட்டுதல் எல்லா இடங்களிலும் இயல்பாக்கப்படுகிறது:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## அது ஏன் உள்ளது

PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777)-இல் அறிமுகப்படுத்தப்பட்டது. இதைத் தூண்டிய சிக்கல்கள்:

| சிக்கல்                                             | வழிகாட்டுதல் சரிசெய்வது                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IPv6-மட்டுமே கொண்ட egress, IPv4-க்குக் கசிவது**   | ஒரு proxy host-இல் A மற்றும் AAAA பதிவுகள் இரண்டும் இருக்கும்போது (அல்லது OS IPv4-க்கு முன்னுரிமை அளிக்கும்போது), நீங்கள் IPv6-மட்டுமே கொண்ட பாதையை நோக்கமாகக் கொண்டிருந்தாலும் Happy Eyeballs ஆனது IPv4 வழியாக வெளியே இணைக்கக்கூடும். `ipv6`-க்குக் கட்டுப்படுத்துவது அந்தக் கசிவை நீக்குகிறது.                                                                                               |
| **பகிரப்பட்ட-egress ஒழுங்கின்மைக்கான அணுகல் ரத்து** | பல கணக்குகள் அதிக அளவில் **ஒரே** IP வழியாக egress செய்யும்போது, சுழற்சி வழங்குநர்கள் (codex/openai) token-களை ரத்து செய்கின்றனர். கணக்குகளைத் தனித்துவமான, முன்கணிக்கக்கூடிய egress பாதைகளில் வைத்திருப்பதன் ஒரு பகுதியாக egress family-யைக் கட்டுப்படுத்துவது அமைகிறது (இதனுடன் இணையும் egress-IP கண்டறிதல்களுக்கு [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts)-ஐப் பார்க்கவும்). |
| **இணக்கம்/சோதனைக்கான தீர்மானகரமான egress**          | குறிப்பிட்ட family வழியாகவே போக்குவரத்து வெளியேறுவதை நீங்கள் உறுதிசெய்ய வேண்டியிருக்கும்போது, `auto` போதாது.                                                                                                                                                                                                                                                                                   |

இந்த வழிகாட்டுதல் வேண்டுமென்றே global ஆக அல்லாமல் **ஒவ்வொரு proxy-க்கும் தனித்தனியாக** அமைக்கப்பட்டுள்ளது — உங்கள் pool-இல் உள்ள வெவ்வேறு proxy-கள் வெவ்வேறு கொள்கைகளைக் கொண்டிருக்கலாம்.

---

## மூன்று மதிப்புகள்

| மதிப்பு | UI குறிச்சொல்                 | நடத்தை                                                                                                                                                                               |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`  | `தானியக்கம் (இரட்டை அடுக்கு)` | OS குடும்பத்தைத் தேர்ந்தெடுக்கிறது. IP-literal ப்ராக்ஸி ஹோஸ்டுக்கு, குடும்பம் அந்த literal-இல் இயல்பாகவே உள்ளது; ஹோஸ்ட்பெயருக்கு, இரு குடும்பங்களும் தகுதியுடையவை. இதுவே இயல்புநிலை. |
| `ipv4`  | `IPv4 மட்டும்`                | இணைப்பை IPv4-க்கு நிலைப்படுத்துகிறது. ப்ராக்ஸி ஹோஸ்டுக்கு IPv4 (A) பதிவு இல்லையெனில், பாதுகாப்பாகத் தோல்வியடைகிறது.                                                                  |
| `ipv6`  | `IPv6 மட்டும்`                | இணைப்பை IPv6-க்கு நிலைப்படுத்துகிறது. ப்ராக்ஸி ஹோஸ்டுக்கு IPv6 (AAAA) பதிவு இல்லையெனில், பாதுகாப்பாகத் தோல்வியடைகிறது.                                                               |

UI சரங்கள் `src/i18n/messages/en.json`-இல் உள்ளன (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## இதை எவ்வாறு உள்ளமைப்பது

### கட்டுப்பாட்டுப் பலகம்

தேர்வி **ப்ராக்ஸி தொகுப்பு** தாவலின் ப்ராக்ஸி படிவத்தில் உள்ளது:

1. **கட்டுப்பாட்டுப் பலகம் → அமைப்புகள் → ப்ராக்ஸி → ப்ராக்ஸி தொகுப்பு** என்பதைத் திறக்கவும்
2. ஒரு ப்ராக்ஸியைச் சேர்க்கவும் அல்லது திருத்தவும்
3. **IP குடும்பம்** கீழ்தோன்றும் பட்டியலை `தானியக்கம் (இரட்டை அடுக்கு)`, `IPv4 மட்டும்`, அல்லது `IPv6 மட்டும்` என அமைக்கவும்
4. சேமிக்கவும்

கட்டுப்பாடு `ProxyRegistryManager.tsx` மூலம் காட்சிப்படுத்தப்படுகிறது (`proxy/ProxyPoolTab.tsx`-இல் பொருத்தப்பட்டுள்ளது).

### API

`family` புலம் ப்ராக்ஸி பதிவேட்டை உருவாக்கும்/புதுப்பிக்கும் பேலோடுகளின் ஒரு பகுதியாகும்; இது `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) மூலம் சரிபார்க்கப்பட்டு, `POST` / `PATCH /api/v1/management/proxies` மூலம் கையாளப்படுகிறது:

```bash
# IPv6-மட்டும் கொண்ட ப்ராக்ஸியை உருவாக்கவும்
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# ஏற்கனவே உள்ள ப்ராக்ஸியை IPv4-மட்டும் என மாற்றவும்
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

அப்ஸ்ட்ரீம்-ப்ராக்ஸி உள்ளீடுகளுக்குப் பயன்படுத்தப்படும் இன்லைன் ப்ராக்ஸி உள்ளமைவுப் பொருளும் இதே புலத்தை ஏற்றுக்கொள்கிறது (`upstream_proxy_config.family`, [தரவு மாதிரி](#data-model) என்பதைப் பார்க்கவும்).

ப்ராக்ஸியின் மீதமுள்ள CRUD/ஒதுக்கீட்டு API விவரங்களுக்கு, [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md) என்பதைப் பார்க்கவும்.

---

## `auto` எவ்வாறு தீர்மானிக்கப்படுகிறது

`family` என்பது `auto` ஆக இருக்கும்போது, OmniRoute எந்த உத்தரவையும் **சேர்ப்பதில்லை** — ப்ராக்ஸி URL உள்ளபடியே பயன்படுத்தப்படுகிறது; மேலும் இணைப்புக் குடும்பம் இயல்பாகவே தீர்மானிக்கப்படுகிறது.

URL உருவாக்கும் நேரத்தில் (`open-sse/utils/proxyDispatcher.ts`-இல் உள்ள `proxyConfigToUrl` / `normalizeProxyUrl`), ஓர் `auto` ப்ராக்ஸி எந்தக் குறிப்பானும் இல்லாத எளிய URL-ஐ வழங்குகிறது:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

அனுப்பும் நேரத்தில் (`resolveDispatcherFamily`), IP-literal ஹோஸ்டின் உள்ளார்ந்த குடும்பமாக `auto` தீர்மானிக்கப்படுகிறது; அல்லது ஹோஸ்ட்பெயருக்கு `null` ஆகிறது (OS முடிவெடுக்க அனுமதிக்கிறது):

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // ஹோஸ்ட்பெயருக்கு null → OS தேர்ந்தெடுக்கிறது
  // ...
}
```

எனவே:

- `auto` + IP-literal ஹோஸ்ட் (`192.0.2.1` / `[2001:db8::1]`) → அந்த literal-இன் குடும்பம்.
- `auto` + ஹோஸ்ட்பெயர் → `null` → நிலையான இரட்டை-அடுக்கு OS தீர்மானம்.

---

## `ipv4` / `ipv6` எவ்வாறு அமல்படுத்தப்படுகின்றன

`auto` அல்லாத ஒரு directive, இயல்பாக்கப்பட்ட proxy URL-இல் ஒரே முறை சேர்க்கப்படும் `?family=ipv4` அல்லது `?family=ipv6` என்ற ஒற்றை செயற்கை query marker ஆகப் பயணிக்கிறது. இந்த marker-ஐ மிகச் சரியாக ஒரே முறை நீக்கி மீண்டும் சேர்ப்பதில் `normalizeProxyUrl` கவனமாகச் செயல்படுவதால், அது port parsing-ஐ ஒருபோதும் சிதைக்காது.

dispatcher உருவாக்கப்படும்போது, marker வாசிக்கப்பட்டு ஒரு திட்டவட்டமான connect family ஆக மாற்றப்படுகிறது. host ஆனது **எதிர்** family-ஐச் சேர்ந்த IP literal ஆக இருந்தால், OmniRoute ஒரு பிழையை எறியும் (முரண்பாடு ஏற்பட்டால் fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

பின்னர் திட்டவட்டமான family connector-இல் நிலைநிறுத்தப்படுகிறது:

- **HTTP/HTTPS proxy-கள்** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — Happy Eyeballs-ஐ முடக்குகிறது; இதனால் தேர்ந்தெடுக்கப்பட்ட family மட்டுமே தொடர்புகொள்ளப்படும்.
- **SOCKS5 proxy-கள்**: தனிப்பயன் connector ஒன்று SOCKS client-க்குள் `socket_options: { family, autoSelectFamily: false }`-ஐ அனுப்புகிறது ([SOCKS5 இணக்கத்தன்மை](#socks5-compatibility) என்பதைப் பார்க்கவும்).

---

## SOCKS5 இணக்கத்தன்மை

family pin, SOCKS5 proxy-களுடன் செயல்படும்; ஆனால் வழக்கமான `fetch-socks`, proxy hop-இன் family-ஐ நிலைநிறுத்துவதற்குத் தேவையான socket option-களை வெளிப்படுத்துவதில்லை. இதற்காக OmniRoute தனது சொந்த connector-ஐ வழங்குகிறது:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

`family` எதுவாக இருந்தாலும் (hostname வழியாக `null` / `auto` பயன்படுத்தப்படுவதும் உட்பட), அனைத்து SOCKS5 dispatch-களும் `createSocksDispatcherWithFamily` வழியாகவே செல்கின்றன: `buildSocksFamilySocketOptions(null)` ஆனது `{}`-ஐ வழங்குகிறது; மேலும், IPv6-only egress கொள்கைக்காக Happy Eyeballs ஆனது IPv4-ஐத் தேர்ந்தெடுக்க முடியாதவாறு `socket_options` pinning உடன் அதே `SocksClient.createConnection` + TLS `buildConnector` பாதை பயன்படுத்தப்படுகிறது.

SOCKS5 ஆதரவு இயல்பாகவே இயக்கப்பட்டுள்ளது (`ENABLE_SOCKS5_PROXY=false` மூலம் விலகலாம்); [PROXY_GUIDE.md → சூழல் மாறிகள்](../ops/PROXY_GUIDE.md#environment-variables) என்பதைப் பார்க்கவும்.

---

## Fail-Closed நடத்தை

இந்த directive-இன் முழு நோக்கமும், தவறான family-க்கு அமைதியாக fallback செய்வதற்குப் பதிலாக அதை **மறுப்பதே** ஆகும். இரண்டு பாதுகாப்புச் சோதனைகள் இதை அமல்படுத்துகின்றன:

1. **Literal முரண்பாடு** — IP-literal host-உடன் முரண்படும் ஒரு directive, dispatcher உருவாக்கப்படும் நேரத்தில் பிழையை எறியும் (மேலே காட்டப்பட்டுள்ள `resolveDispatcherFamily`).

2. **Hostname pre-flight DNS சோதனை** — pinned family கொண்ட hostname proxy-க்கு, egress செய்வதற்கு **முன்பாகவே**, hostname-இல் தேவையான family-க்கான record உண்மையாக உள்ளதா என்பதை `assertHostnameSupportsFamily` வழியாக `proxyFetch.ts` சரிபார்க்கிறது:

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

   தோல்வி ஏற்பட்டால், `proxyFetch.ts` அந்தப் பிழைக்கு `code = "PROXY_FAMILY_UNAVAILABLE"` மற்றும் `statusCode = 503` ஆகியவற்றைக் குறியிடுகிறது. DNS resolution தோல்வியும் அதேபோல் fail-closed ஆகக் கருதப்படுகிறது (egress செய்ய மறுக்கப்படும்).

IP-literal host-களுக்கு DNS pre-flight எந்தச் செயலையும் செய்யாது — அவற்றின் family இயல்பாகவே உள்ளார்ந்ததாக இருப்பதால் lookup தேவையில்லை.

---

## தரவு மாதிரி

`family` நெடுவரிசை, `099_proxy_family.sql` இடம்பெயர்வால் **இரண்டு** அட்டவணைகளில் சேர்க்கப்பட்டது:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — பதிவக உள்ளீடுகளுக்கான ஒவ்வொரு proxy-க்கும் உரிய வழிகாட்டுதல் (`src/lib/db/proxies.ts`). தீர்மான வினவல்கள் மற்ற proxy நெடுவரிசைகளுடன் `family`-ஐயும் தேர்ந்தெடுக்கின்றன; விடுபட்ட அல்லது string அல்லாத மதிப்பு `"auto"` ஆக மாற்றப்படுகிறது.
- `upstream_proxy_config.family` — upstream-proxy உள்ளீடுகளுக்கான வழிகாட்டுதல் (`src/lib/db/upstreamProxy.ts`); இதற்கும் அதே `"auto"` இயல்புநிலை பயன்படுத்தப்படுகிறது.

தீர்மானிக்கப்பட்ட proxy பொருள், `auto` அல்லாத `family` மதிப்பைக் கொண்டிருந்தால், அந்தப் பிணைப்பு dispatcher வரை நிலைத்திருக்கும்படி `proxyConfigToUrl`, `?family=` குறிப்பானைச் சேர்க்கிறது.

---

## தொடர்புடைய ஆவணங்கள்

> 📖 **தொடர்புடைய ஆவணங்கள்:**
>
> - [Proxy வழிகாட்டி](../ops/PROXY_GUIDE.md) — முழுமையான proxy அமைப்பு: பதிவக CRUD, 4-நிலைத் தீர்மானம், சுழற்சி, ஆரோக்கியச் சரிபார்ப்பு, API குறிப்பு
> - `docs/security/STEALTH_GUIDE.md` (git; `/docs`-இல் தொகுக்கப்படவில்லை) — proxy-க்கு மேல் செயல்படும் TLS fingerprint மற்றும் CLI fingerprint அடுக்குகள்
> - [Route Guard நிலைகள்](./ROUTE_GUARD_TIERS.md) — உள்ளூர் வழித்தடங்களுக்கு மட்டும் loopback அமலாக்கம்
