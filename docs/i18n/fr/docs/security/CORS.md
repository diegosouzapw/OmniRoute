# CORS Configuration & Security (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute contrôle quelles **origines de navigateur** peuvent lire les réponses interorigines
à partir d’une liste d’autorisation unique et centralisée. Le modèle est **fermé par défaut** :
aucune origine n’est autorisée tant que vous ne l’avez pas explicitement ajoutée. Cette page explique comment la liste d’autorisation
est résolue, ce que `CORS_ALLOW_ALL=true` expose réellement (et, surtout, ce qu’il
**n’expose pas**), comment configurer les environnements de développement et de production de manière sécurisée, ainsi que l’avertissement d’exécution
affiché par le tableau de bord lorsqu’un caractère générique est actif.

**Source de vérité :** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). La liste d’autorisation est appliquée une seule fois, dans le
middleware (`src/server/authz/pipeline.ts`) — les gestionnaires propres à chaque route ne définissent pas eux-mêmes
`Access-Control-Allow-Origin`.

## Comment une origine est résolue

Pour chaque requête, le middleware calcule la valeur de `Access-Control-Allow-Origin`
dans l’ordre suivant :

1. **`CORS_ALLOW_ALL=true`** (ou l’ancienne variable `CORS_ORIGIN=*`) → renvoie l’en-tête
   `Origin` de l’appelant tel quel (ou `*` lorsqu’il n’y a pas d’en-tête `Origin`), avec `Vary: Origin`
   afin que les caches restent corrects. Le même point de passage unique `applyCorsHeaders()` ajoute également
   `Vary: Accept-Encoding` à chaque réponse 2xx comportant un corps sur la surface
   `/v1*`/`/v1beta*` authentifiée par jeton (`relaxForTokenAuth`, RFC 9110 §12.5.5, problème #6737), afin que
   les caches en aval/partagés puissent correctement distinguer les variantes compressées et non compressées.
2. Sinon, l’en-tête `Origin` de la requête est normalisé (converti en minuscules, barre oblique finale
   supprimée), puis comparé à la **liste d’autorisation fusionnée** :
   - variable d’environnement **`CORS_ALLOWED_ORIGINS`** — liste séparée par des virgules, et
   - paramètre d’exécution **`corsOrigins`** (Tableau de bord → Sécurité → _Origines CORS
     autorisées_), injecté via `setRuntimeAllowedOrigins()` depuis
     `src/lib/config/runtimeSettings.ts`.
3. Aucune correspondance → **aucun en-tête `Access-Control-Allow-Origin` n’est émis**. Le navigateur
   bloque la lecture interorigine. Il s’agit du comportement fermé par défaut prévu.

| Variable d’environnement | Signification                                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS`   | Liste CSV des origines exactes à autoriser (recommandé).                                                             |
| `CORS_ALLOW_ALL`         | `true`/`1` → renvoie toute origine (caractère générique). Développement uniquement.                                  |
| `CORS_ORIGIN`            | Ancienne variable. `*` se comporte comme `CORS_ALLOW_ALL` ; une valeur unique est ajoutée à la liste d’autorisation. |

## Modèle de menace — ce que `CORS_ALLOW_ALL=true` expose réellement

L’avertissement générique de l’OWASP (« CORS avec caractère générique = n’importe quel site peut appeler votre API ») mérite
d’être pris au sérieux, mais l’exposition d’OmniRoute est **plus limitée que dans le cas générique**,
en raison d’un fait concret lié à l’implémentation :

> **Le mécanisme central `applyCorsHeaders()` n’émet jamais
> `Access-Control-Allow-Credentials`.** Un navigateur n’exposera pas une réponse interorigine
> _avec informations d’identification_ (contenant un cookie), sauf si le serveur envoie
> `Access-Control-Allow-Credentials: true`. Le chemin CORS partagé d’OmniRoute ne le fait
> jamais.

Voici ce que cela signifie pour chaque surface, même avec `CORS_ALLOW_ALL=true` :

| Surface                                        | Mécanisme d’authentification | Effet du CORS avec caractère générique                                                                                                                                                                                                                                                  |
| ---------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tableau de bord / MANAGEMENT `/api/*`          | Session par cookie           | L’origine est renvoyée, mais **sans `Allow-Credentials`**, le navigateur **bloque** la lecture avec informations d’identification. Un site interorigine malveillant **ne peut pas lire** les réponses authentifiées de votre tableau de bord, et le cookie de session n’est pas exposé. |
| API cliente `/v1/*`, `/v1beta/*`               | En-tête Bearer / `x-api-key` | Déjà permissive **par conception** (`relaxForTokenAuth`) : les navigateurs ne joignent jamais automatiquement `Authorization`/`x-api-key`, si bien que la page d’un attaquant ne peut pas fournir votre clé. `CORS_ALLOW_ALL` n’élargit pas cette exposition.                           |
| Lecture publique uniquement (`/api/health`, …) | Aucun                        | Non sensible ; le caractère générique est sans danger.                                                                                                                                                                                                                                  |

L’exposition **résiduelle** de `CORS_ALLOW_ALL=true` se limite donc à : (a)
des **lectures** interorigines sans informations d’identification de données déjà accessibles sans authentification, et (b)
l’autorisation de la **requête préliminaire** CORS sur les routes de gestion — lesquelles exigent toujours une authentification
qu’une page interorigine ne peut pas fournir. Il ne s’agit **pas** d’un vecteur de détournement de session ni
de vol d’informations d’identification sur le chemin CORS partagé.

### Une véritable exception — `/api/v1/agents/`

Les routes Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) définissent
leurs **propres** en-têtes CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) et **émettent bien**
`Access-Control-Allow-Origin: <origin>|*` avec
`Access-Control-Allow-Credentials: true`. Il s’agit de la seule surface où
le renvoi de l’origine et les informations d’identification coexistent, et elle est **indépendante de
`CORS_ALLOW_ALL`**. Ces routes utilisent l’authentification de gestion
(`requireManagementAuth`) ; les opérateurs qui exposent le tableau de bord hors de l’hôte doivent savoir
qu’il s’agit du seul endroit où une lecture interorigine avec informations d’identification est autorisée par
les en-têtes de réponse. Son durcissement au moyen d’une liste d’autorisation explicite fait l’objet d’un suivi
distinct de ces recommandations CORS.

## Liste de contrôle pour la production

- **Ne définissez jamais `CORS_ALLOW_ALL=true` en production.** Laissez cette variable non définie.
- Définissez une liste **explicite** d’origines, soit avec la variable d’environnement, soit avec le champ de l’onglet Sécurité :

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Si OmniRoute s’exécute derrière un proxy inverse ou un tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS n’est **pas** votre seul mécanisme de contrôle : la protection
  des routes limitée à l’interface de bouclage protège toujours les routes capables de
  lancer des processus (voir [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Ne falsifiez
  pas `X-Forwarded-For: 127.0.0.1` pour « corriger » une erreur 403 ; cela réintroduit la
  catégorie de vulnérabilités RCE neutralisée par la protection des routes.
- Vérifiez l’état d’exécution : le tableau de bord affiche une **bannière orange persistante**
  sous Tableau de bord → Sécurité → Inventaire des autorisations chaque fois que
  `CORS_ALLOW_ALL=true` est actif, et `/api/settings/authz-inventory` renvoie une
  enveloppe `cors: { allowAll, allowedOrigins }` que les outils de surveillance peuvent
  interroger.

## Commodité de développement — autoriser des origines locales spécifiques

Même en développement, vous avez rarement besoin du caractère générique. Autorisez
uniquement les serveurs de développement que vous utilisez :

```bash
# Serveurs de développement Vite (5173) et Next.js (3000) appelant un OmniRoute local
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Les origines sont comparées sans tenir compte de la casse et en ignorant la barre oblique
finale ; `http://localhost:3000` et `http://localhost:3000/` sont donc équivalentes. La
même liste CSV peut être définie à l’exécution dans **Tableau de bord → Sécurité →
Origines CORS autorisées**, sans redémarrage.

## Clés d’API et sessions par cookie

- **Bearer / `x-api-key` (la surface d’inférence `/v1/*`) :** les navigateurs ne les
  joignent jamais automatiquement. CORS ne constitue pas ici une barrière pertinente :
  la clé d’API est la barrière. C’est pourquoi cette surface est volontairement
  permissive, afin que les clients de navigateur et Electron puissent lire les réponses
  auxquelles ils ont déjà droit.
- **Session par cookie (le tableau de bord) :** elle est protégée par le comportement
  fermé par défaut **et** par l’absence de `Access-Control-Allow-Credentials` sur le
  chemin partagé. N’incluez pas les origines de gestion ou du tableau de bord dans une
  configuration permissive ; elles doivent rester strictement fermées par défaut.

## Exemple : proxy inverse devant OmniRoute

CORS est appliqué par OmniRoute lui-même ; le proxy ne doit donc généralement **pas**
ajouter ou réécrire les en-têtes `Access-Control-*` (les en-têtes en double perturbent
les navigateurs). Terminez TLS et transférez les requêtes : laissez OmniRoute répondre
aux requêtes préliminaires :

```nginx
# nginx — transférer vers OmniRoute ; ne PAS injecter Access-Control-* ici
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Ne définissez PAS X-Forwarded-For sur 127.0.0.1 : cela neutralise la protection des routes limitée à l’interface de bouclage.
}
```

Définissez les origines de navigateur autorisées dans OmniRoute
(`CORS_ALLOWED_ORIGINS` ou l’onglet Sécurité), et non dans le proxy.

## Fichiers sources

| Élément concerné                                          | Fichier                                                              |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| Résolution de la liste d’autorisation + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Application du middleware (source unique de vérité)       | `src/server/authz/pipeline.ts`                                       |
| Paramètres → injection des origines à l’exécution         | `src/lib/config/runtimeSettings.ts`                                  |
| État d’exécution pour le tableau de bord                  | `src/app/api/settings/authz-inventory/route.ts`                      |
| Bannière d’avertissement du tableau de bord               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Champ Origines CORS autorisées                            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS par route de Cloud-Agent (l’exception)               | `src/lib/cloudAgent/api.ts`                                          |

## Voir aussi

- [Niveaux de protection des routes](./ROUTE_GUARD_TIERS.md) — application de la restriction à l’interface de bouclage pour
  les routes capables de lancer des processus (un contrôle distinct et complémentaire).
- [Guide d’autorisation](../architecture/AUTHZ_GUIDE.md) — le pipeline d’authentification complet.
