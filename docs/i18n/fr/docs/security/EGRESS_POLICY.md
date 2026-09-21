# Egress IP Family Policy (IPv4/IPv6) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Épinglez le trafic sortant à une seule famille IP — `auto`, `ipv4` ou `ipv6` — par proxy, afin qu’une sortie exclusivement IPv6 ne rebascule jamais silencieusement vers IPv4.**

> **Source de référence :** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute permet à chaque proxy de porter une **directive de famille d’adresses pour le trafic sortant**. Par défaut, le système d’exploitation choisit IPv4 ou IPv6 (double pile, « Happy Eyeballs »). Lorsque vous définissez la directive sur `ipv4` ou `ipv6`, OmniRoute épingle chaque connexion passant par ce proxy à la famille choisie et **échoue de manière fermée** au lieu de se rabattre sur l’autre famille.

Cette page décrit la directive, sa raison d’être, l’endroit où la configurer et la manière dont elle est résolue à l’exécution.

---

## Table des matières

- [Présentation](#what-it-is)
- [Pourquoi elle existe](#why-it-exists)
- [Les trois valeurs](#the-three-values)
- [Comment la configurer](#how-to-configure-it)
- [Comment `auto` est résolu](#how-auto-resolves)
- [Comment `ipv4` / `ipv6` sont appliqués](#how-ipv4--ipv6-are-enforced)
- [Compatibilité avec SOCKS5](#socks5-compatibility)
- [Comportement d’échec fermé](#fail-closed-behavior)
- [Modèle de données](#data-model)
- [Documentation associée](#related-documentation)

---

## Présentation

Chaque proxy du registre possède un champ `family` avec trois valeurs possibles, validées par une énumération Zod :

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

La valeur par défaut du champ est `"auto"`, ce qui préserve le comportement double pile antérieur. Le définir sur `ipv4` ou `ipv6` épingle la famille de connexion pour ce proxy.

La directive est normalisée partout à l’aide d’une fonction utilitaire unique, de sorte que toute valeur inconnue est ramenée à `auto` :

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Pourquoi elle existe

Introduite dans la PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Problèmes à l’origine de cette fonctionnalité :

| Problème                                                | Ce que la directive corrige                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fuite d’une sortie exclusivement IPv6 vers IPv4**     | Lorsqu’un hôte proxy possède à la fois des enregistrements A et AAAA (ou que le système d’exploitation préfère IPv4), Happy Eyeballs peut établir la connexion sortante via IPv4, même si vous souhaitez un chemin exclusivement IPv6. L’épinglage sur `ipv6` élimine cette fuite.                                                                                                                                                  |
| **Révocation pour anomalie de sortie partagée**         | Les fournisseurs avec rotation (codex/openai) révoquent les jetons lorsque de nombreux comptes utilisent à fort volume la **même** adresse IP de sortie. Le contrôle de la famille de sortie contribue à maintenir les comptes sur des chemins de sortie distincts et prévisibles (consultez [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) pour les diagnostics d’adresse IP de sortie associés à cette fonctionnalité). |
| **Sortie déterministe pour la conformité et les tests** | Lorsque vous devez garantir que le trafic sort via une famille spécifique, `auto` ne suffit pas.                                                                                                                                                                                                                                                                                                                                    |

La directive est volontairement définie **par proxy**, et non globalement : les différents proxies de votre pool peuvent appliquer des politiques différentes.

---

## Les trois valeurs

| Valeur | Libellé dans l’interface | Comportement                                                                                                                                                                                                                           |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (double pile)`     | Le système d’exploitation choisit la famille. Pour un hôte proxy défini par une adresse IP littérale, la famille est intrinsèque à celle-ci ; pour un nom d’hôte, les deux familles sont possibles. Il s’agit de la valeur par défaut. |
| `ipv4` | `IPv4 uniquement`        | Force la connexion à utiliser IPv4. La connexion échoue de manière sécurisée si l’hôte proxy ne possède aucun enregistrement IPv4 (A).                                                                                                 |
| `ipv6` | `IPv6 uniquement`        | Force la connexion à utiliser IPv6. La connexion échoue de manière sécurisée si l’hôte proxy ne possède aucun enregistrement IPv6 (AAAA).                                                                                              |

Les chaînes de l’interface se trouvent dans `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Comment le configurer

### Tableau de bord

Le sélecteur se trouve dans le formulaire de proxy de l’onglet **Pool de proxys** :

1. Ouvrez **Tableau de bord → Paramètres → Proxy → Pool de proxys**
2. Ajoutez ou modifiez un proxy
3. Définissez la liste déroulante **Famille IP** sur `Auto (double pile)`, `IPv4 uniquement` ou `IPv6 uniquement`
4. Enregistrez

Le contrôle est rendu par `ProxyRegistryManager.tsx` (monté dans `proxy/ProxyPoolTab.tsx`).

### API

Le champ `family` fait partie des charges utiles de création/mise à jour du registre de proxys. Il est validé par `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) et traité par `POST` / `PATCH /api/v1/management/proxies` :

```bash
# Créer un proxy IPv6 uniquement
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Faire passer un proxy existant en IPv4 uniquement
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Le même champ est également accepté par l’objet de configuration de proxy en ligne utilisé pour les entrées de proxy en amont (`upstream_proxy_config.family`, voir [Modèle de données](#data-model)).

Pour le reste de l’API CRUD/d’affectation des proxys, consultez [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Comment `auto` est résolu

Lorsque `family` vaut `auto`, OmniRoute n’ajoute **aucune** directive : l’URL du proxy est utilisée telle quelle et la famille de connexion est déterminée de manière intrinsèque.

Au moment de la construction de l’URL (`proxyConfigToUrl` / `normalizeProxyUrl` dans `open-sse/utils/proxyDispatcher.ts`), un proxy `auto` produit une URL simple sans marqueur :

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Au moment de la répartition (`resolveDispatcherFamily`), `auto` est résolu vers la famille intrinsèque d’un hôte défini par une adresse IP littérale, ou vers `null` (pour laisser le système d’exploitation décider) dans le cas d’un nom d’hôte :

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null pour un nom d’hôte → le système d’exploitation choisit
  // ...
}
```

Ainsi :

- `auto` + hôte défini par une adresse IP littérale (`192.0.2.1` / `[2001:db8::1]`) → famille de cette adresse.
- `auto` + nom d’hôte → `null` → résolution double pile standard du système d’exploitation.

---

## Comment `ipv4` / `ipv6` sont appliqués

Une directive autre que `auto` est transmise sous la forme d’un marqueur de requête synthétique unique — `?family=ipv4` ou `?family=ipv6` — ajouté une seule fois à l’URL normalisée du proxy. `normalizeProxyUrl` veille à supprimer puis à rajouter ce marqueur exactement une fois afin qu’il ne perturbe jamais l’analyse du port.

Lors de la création du répartiteur, le marqueur est lu et converti en une famille de connexion concrète. Si l’hôte est une adresse IP littérale de la famille **opposée**, OmniRoute lève une exception (toute contradiction entraîne un refus par défaut) :

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

La famille concrète est ensuite imposée au connecteur :

- **Proxys HTTP/HTTPS** (`ProxyAgent`) : `proxyTls: { family, autoSelectFamily: false }` — désactive Happy Eyeballs afin que seule la famille choisie soit utilisée pour la connexion.
- **Proxys SOCKS5** : un connecteur personnalisé transmet `socket_options: { family, autoSelectFamily: false }` au client SOCKS (voir [Compatibilité SOCKS5](#compatibilité-socks5)).

---

## Compatibilité SOCKS5

L’imposition de la famille fonctionne avec les proxys SOCKS5, mais la version standard de `fetch-socks` n’expose pas les options de socket nécessaires pour imposer la famille utilisée lors de la connexion au proxy. OmniRoute fournit son propre connecteur à cet effet :

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Toutes les transmissions SOCKS5 passent par `createSocksDispatcherWithFamily`, quelle que soit la valeur de `family` (y compris `null` / `auto` avec un nom d’hôte) : `buildSocksFamilySocketOptions(null)` produit `{}`, et le même chemin `SocksClient.createConnection` + TLS `buildConnector` est utilisé avec l’imposition via `socket_options`, afin que Happy Eyeballs ne puisse pas choisir IPv4 pour une politique de sortie limitée à IPv6.

La prise en charge de SOCKS5 est elle-même activée par défaut (désactivation possible avec `ENABLE_SOCKS5_PROXY=false`) ; voir [PROXY_GUIDE.md → Variables d’environnement](../ops/PROXY_GUIDE.md#environment-variables).

---

## Comportement de refus par défaut

L’objectif même de la directive est de **refuser** plutôt que de revenir silencieusement à la mauvaise famille. Deux protections garantissent ce comportement :

1. **Contradiction avec une adresse littérale** — une directive qui contredit la famille d’un hôte exprimé sous forme d’adresse IP littérale lève une exception lors de la création du répartiteur (`resolveDispatcherFamily`, présenté ci-dessus).

2. **Vérification DNS préalable du nom d’hôte** — pour un proxy désigné par un nom d’hôte et dont la famille est imposée, `proxyFetch.ts` vérifie que le nom d’hôte possède bien un enregistrement dans la famille requise **avant** d’effectuer la sortie réseau, via `assertHostnameSupportsFamily` :

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

   En cas d’échec, `proxyFetch.ts` associe à l’erreur `code = "PROXY_FAMILY_UNAVAILABLE"` et `statusCode = 503`. Un échec de résolution DNS est également traité selon le principe de refus par défaut (la sortie réseau est refusée).

La vérification DNS préalable n’effectue aucune opération pour les hôtes exprimés sous forme d’adresse IP littérale : leur famille est intrinsèque et ne nécessite aucune résolution.

---

## Modèle de données

La colonne `family` a été ajoutée par la migration `099_proxy_family.sql` à **deux** tables :

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — la directive propre à chaque proxy pour les entrées du registre (`src/lib/db/proxies.ts`). Les requêtes de résolution sélectionnent `family` avec les autres colonnes du proxy, et une valeur manquante ou qui n’est pas une chaîne est convertie en `"auto"`.
- `upstream_proxy_config.family` — la directive pour les entrées de proxy en amont (`src/lib/db/upstreamProxy.ts`), avec la même valeur par défaut `"auto"`.

Lorsqu’un objet proxy résolu comporte une valeur `family` différente de `auto`, `proxyConfigToUrl` ajoute le marqueur `?family=` afin que l’épinglage soit conservé jusqu’au répartiteur.

---

## Documentation connexe

> 📖 **Documentation connexe :**
>
> - [Guide des proxys](../ops/PROXY_GUIDE.md) — système de proxy complet : opérations CRUD du registre, résolution à 4 niveaux, rotation, vérification de l’état, référence de l’API
> - `docs/security/STEALTH_GUIDE.md` (git ; non compilé dans `/docs`) — couches d’empreinte TLS et d’empreinte CLI qui s’appuient sur le proxy
> - [Niveaux de protection des routes](./ROUTE_GUARD_TIERS.md) — application de l’accès en boucle locale pour les routes locales uniquement
