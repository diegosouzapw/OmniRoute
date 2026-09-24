# Egress IP Family Policy (IPv4/IPv6) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Vincola il traffico in uscita a una singola famiglia IP — `auto`, `ipv4` o `ipv6` — per ciascun proxy, in modo che un'uscita esclusivamente IPv6 non torni mai silenziosamente a IPv4.**

> **Fonte di riferimento:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute consente di associare a ciascun proxy una **direttiva per la famiglia di indirizzi in uscita**. Per impostazione predefinita, il sistema operativo sceglie IPv4 o IPv6 (dual-stack, "Happy Eyeballs"). Quando imposti la direttiva su `ipv4` o `ipv6`, OmniRoute vincola ogni connessione tramite quel proxy alla famiglia scelta e **interrompe la connessione in modo sicuro** anziché ripiegare sull'altra famiglia.

Questa pagina descrive cos'è la direttiva, perché esiste, dove configurarla e come viene risolta in fase di esecuzione.

---

## Indice

- [Cos'è](#what-it-is)
- [Perché esiste](#why-it-exists)
- [I tre valori](#the-three-values)
- [Come configurarla](#how-to-configure-it)
- [Come viene risolto `auto`](#how-auto-resolves)
- [Come vengono applicati `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Compatibilità con SOCKS5](#socks5-compatibility)
- [Comportamento fail-closed](#fail-closed-behavior)
- [Modello dati](#data-model)
- [Documentazione correlata](#related-documentation)

---

## Cos'è

Ogni proxy nel registro dispone di un campo `family` con tre valori possibili, convalidati da un enum Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Il valore predefinito del campo è `"auto"`, che mantiene il precedente comportamento dual-stack. Impostandolo su `ipv4` o `ipv6`, la famiglia di connessione viene vincolata a quella specificata per il proxy.

La direttiva viene normalizzata ovunque tramite un unico helper, in modo che qualsiasi valore sconosciuto venga ricondotto ad `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Perché esiste

Introdotta nella PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). I problemi che ne hanno motivato l'introduzione:

| Problema                                          | Cosa risolve la direttiva                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Perdita dell'uscita solo IPv6 verso IPv4**      | Quando un host proxy dispone sia di record A sia di record AAAA (oppure il sistema operativo preferisce IPv4), Happy Eyeballs può stabilire la connessione in uscita tramite IPv4 anche se si intende utilizzare un percorso esclusivamente IPv6. Il vincolo `ipv6` elimina questa perdita.                                                                                                                                 |
| **Revoca dovuta ad anomalie di uscita condivisa** | I provider con rotazione (codex/openai) revocano i token quando molti account generano un volume elevato di traffico in uscita tramite lo **stesso** IP. Il controllo della famiglia di uscita contribuisce a mantenere gli account su percorsi di uscita distinti e prevedibili (consulta [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) per la diagnostica degli IP di uscita associata a questa funzionalità). |
| **Uscita deterministica per conformità/test**     | Quando è necessario garantire che il traffico esca tramite una famiglia specifica, `auto` non è sufficiente.                                                                                                                                                                                                                                                                                                                |

La direttiva è intenzionalmente definita **per ciascun proxy**, non a livello globale: proxy diversi nel pool possono adottare criteri differenti.

---

## I tre valori

| Valore | Etichetta UI        | Comportamento                                                                                                                                                                                                                |
| ------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | Il sistema operativo sceglie la famiglia. Per l'host di un proxy espresso come IP letterale, la famiglia è intrinseca al letterale; per un nome host, entrambe le famiglie sono idonee. Questa è l'impostazione predefinita. |
| `ipv4` | `Solo IPv4`         | Vincola la connessione a IPv4. La connessione non viene effettuata se l'host del proxy non dispone di un record IPv4 (A).                                                                                                    |
| `ipv6` | `Solo IPv6`         | Vincola la connessione a IPv6. La connessione non viene effettuata se l'host del proxy non dispone di un record IPv6 (AAAA).                                                                                                 |

Le stringhe dell'interfaccia utente si trovano in `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Come configurarlo

### Dashboard

Il selettore si trova nel modulo del proxy della scheda **Pool di proxy**:

1. Apri **Dashboard → Impostazioni → Proxy → Pool di proxy**
2. Aggiungi o modifica un proxy
3. Imposta il menu a discesa **Famiglia IP** su `Auto (dual-stack)`, `Solo IPv4` o `Solo IPv6`
4. Salva

Il controllo viene renderizzato da `ProxyRegistryManager.tsx` (montato in `proxy/ProxyPoolTab.tsx`).

### API

Il campo `family` fa parte dei payload di creazione/aggiornamento del registro dei proxy, viene convalidato da `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) e gestito da `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Crea un proxy solo IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Imposta un proxy esistente come solo IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Lo stesso campo è accettato anche dall'oggetto di configurazione inline del proxy utilizzato per le voci del proxy upstream (`upstream_proxy_config.family`; consulta il [Modello dei dati](#data-model)).

Per il resto dell'API CRUD/assegnazione dei proxy, consulta [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Come viene risolto `auto`

Quando `family` è impostato su `auto`, OmniRoute **non** aggiunge alcuna direttiva: l'URL del proxy viene utilizzato così com'è e la famiglia di connessione viene determinata in modo intrinseco.

Durante la costruzione dell'URL (`proxyConfigToUrl` / `normalizeProxyUrl` in `open-sse/utils/proxyDispatcher.ts`), un proxy `auto` produce un URL semplice senza indicatori:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Durante il dispatch (`resolveDispatcherFamily`), `auto` viene risolto nella famiglia intrinseca di un host espresso come IP letterale oppure in `null` (lasciando decidere al sistema operativo) per un nome host:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null per un nome host → sceglie il sistema operativo
  // ...
}
```

Quindi:

- `auto` + host espresso come IP letterale (`192.0.2.1` / `[2001:db8::1]`) → famiglia di tale letterale.
- `auto` + nome host → `null` → risoluzione dual-stack standard del sistema operativo.

---

## Come vengono applicati `ipv4` / `ipv6`

Una direttiva diversa da `auto` viene trasmessa come singolo marcatore di query sintetico — `?family=ipv4` o `?family=ipv6` — aggiunto una sola volta all'URL normalizzato del proxy. `normalizeProxyUrl` rimuove e riaggiunge con attenzione questo marcatore esattamente una volta, in modo che non comprometta mai l'analisi della porta.

Quando viene creato il dispatcher, il marcatore viene letto e convertito in una famiglia di connessione concreta. Se l'host è un indirizzo IP letterale della famiglia **opposta**, OmniRoute genera un'eccezione (in caso di contraddizione, il comportamento è fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

La famiglia concreta viene quindi fissata sul connettore:

- **Proxy HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — disabilita Happy Eyeballs, in modo che venga tentata la connessione solo alla famiglia scelta.
- **Proxy SOCKS5**: un connettore personalizzato passa `socket_options: { family, autoSelectFamily: false }` al client SOCKS (vedere [Compatibilità con SOCKS5](#socks5-compatibility)).

---

## Compatibilità con SOCKS5

Il vincolo della famiglia funziona con i proxy SOCKS5, ma la versione standard di `fetch-socks` non espone le opzioni del socket necessarie per fissare la famiglia del salto verso il proxy. OmniRoute include un proprio connettore a tale scopo:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Tutti gli inoltri SOCKS5 passano attraverso `createSocksDispatcherWithFamily`, indipendentemente da `family` (inclusi `null` / `auto` su un hostname): `buildSocksFamilySocketOptions(null)` restituisce `{}` e viene utilizzato lo stesso percorso `SocksClient.createConnection` + TLS `buildConnector`, con il vincolo tramite `socket_options`, affinché Happy Eyeballs non possa scegliere IPv4 per una policy di uscita che consente solo IPv6.

Il supporto SOCKS5 è abilitato per impostazione predefinita (è possibile disattivarlo tramite `ENABLE_SOCKS5_PROXY=false`); vedere [PROXY_GUIDE.md → Variabili di ambiente](../ops/PROXY_GUIDE.md#environment-variables).

---

## Comportamento fail-closed

Lo scopo della direttiva è **rifiutare** la connessione anziché ripiegare silenziosamente sulla famiglia errata. Questo comportamento è garantito da due controlli:

1. **Contraddizione con un indirizzo letterale** — una direttiva che contraddice un host rappresentato da un indirizzo IP letterale genera un'eccezione durante la creazione del dispatcher (`resolveDispatcherFamily`, mostrato sopra).

2. **Controllo DNS preliminare dell'hostname** — per un proxy con hostname e famiglia fissata, `proxyFetch.ts` verifica che l'hostname disponga effettivamente di un record nella famiglia richiesta **prima** di effettuare il traffico in uscita, tramite `assertHostnameSupportsFamily`:

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

   In caso di errore, `proxyFetch.ts` contrassegna l'errore con `code = "PROXY_FAMILY_UNAVAILABLE"` e `statusCode = 503`. Anche un errore di risoluzione DNS viene gestito in modalità fail-closed (il traffico in uscita viene rifiutato).

Per gli host rappresentati da indirizzi IP letterali, il controllo DNS preliminare non esegue alcuna operazione: la loro famiglia è intrinseca e non richiede alcuna risoluzione.

---

## Modello dati

La colonna `family` è stata aggiunta dalla migrazione `099_proxy_family.sql` a **due** tabelle:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — la direttiva per singolo proxy relativa alle voci del registro (`src/lib/db/proxies.ts`). Le query di risoluzione selezionano `family` insieme alle altre colonne del proxy e un valore mancante o non stringa viene convertito in `"auto"`.
- `upstream_proxy_config.family` — la direttiva per le voci del proxy upstream (`src/lib/db/upstreamProxy.ts`), con lo stesso valore predefinito `"auto"`.

Quando un oggetto proxy risolto contiene un valore `family` diverso da `auto`, `proxyConfigToUrl` aggiunge l'indicatore `?family=`, in modo che il vincolo venga mantenuto fino al dispatcher.

---

## Documentazione correlata

> 📖 **Documentazione correlata:**
>
> - [Guida ai proxy](../ops/PROXY_GUIDE.md) — sistema proxy completo: operazioni CRUD del registro, risoluzione a 4 livelli, rotazione, controlli di integrità, riferimento API
> - `docs/security/STEALTH_GUIDE.md` (git; non compilato in `/docs`) — livelli di fingerprint TLS e della CLI applicati al di sopra del proxy
> - [Livelli delle protezioni delle route](./ROUTE_GUARD_TIERS.md) — applicazione dell'accesso tramite loopback per le route esclusivamente locali
