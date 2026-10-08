# SQLite Runtime Resolution (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute résout son pilote SQLite au démarrage au moyen d’une chaîne de repli en 5 étapes :

1. **`better-sqlite3` fourni** (via `dependencies` dans `package.json`)
   — le plus rapide, binaire natif, installé par `npm install` lorsque les outils de compilation sont présents.

2. **`better-sqlite3` installé à l’exécution** (dans `~/.omniroute/runtime/`)
   — installé à la demande lors de la première exécution **OU** par `scripts/build/postinstall.mjs → scripts/postinstall.mjs`.
   Valide les octets magiques du fichier natif `.node` (ELF / Mach-O / PE) avant son chargement
   afin de se protéger contre les binaires corrompus ou destinés à une autre plateforme.

3. **`node:sqlite`** (bibliothèque standard de Node ≥22.5) — aucune compilation native nécessaire ; utilisé lorsque
   les deux chemins de better-sqlite3 échouent. Ensemble de fonctionnalités limité.

4. **`sql.js`** (WASM) — ultime solution de repli. Fonctionne partout, mais est plus lent
   et écrit les données à intervalles réguliers plutôt que de manière synchrone.

## Pourquoi cette complexité ?

- **EBUSY sous Windows** : `npm install -g omniroute@latest` peut échouer si le fichier
  `better_sqlite3.node` de la version précédente est verrouillé par un processus en cours d’exécution. L’installation
  à l’exécution dans `~/.omniroute/runtime/` contourne le cache npm global.
- **Absence d’outils de compilation** : certains environnements (Windows d’entreprise sans VS Build
  Tools, images Docker minimales) ne peuvent pas compiler `better-sqlite3`. Le programme d’installation à l’exécution
  récupère un binaire précompilé depuis le registre npm ; les pilotes de repli
  garantissent qu’OmniRoute peut toujours démarrer même en cas d’échec.
- **Systèmes isolés du réseau** : si le registre npm est inaccessible, `node:sqlite`
  ou `sql.js` garantissent les fonctionnalités de base.

## Validation des octets magiques

Avant de charger un fichier `.node` installé à l’exécution, OmniRoute lit les 8 premiers
octets et les compare aux signatures connues des plateformes :

| Plateforme            | Octets (hex)  | Libellé     |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64 bits BE      | `FE ED FA CF` | `macho`     |
| macOS 64 bits LE      | `CF FA ED FE` | `macho-le`  |
| macOS fat (universel) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

En cas de signature non concordante, le fichier est ignoré et le repli se poursuit à l’étape suivante.

## Vérification du pilote actif

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Contrôle manuel

```bash
# Ignorer le préchauffage post-installation (pour des installations CI rapides)
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Forcer la réinstallation de better-sqlite3 à l’exécution
rm -rf ~/.omniroute/runtime
omniroute  # sera réinstallé au prochain démarrage

# Vérifier quel pilote est actif
omniroute config db-info  # (si la commande CLI existe)
```

## Référence

Implémentation :

- `bin/cli/runtime/magicBytes.mjs` — fonctions auxiliaires de validation des octets magiques des binaires
- `bin/cli/runtime/sqliteRuntime.mjs` — résolveur à l’exécution en 5 étapes + programme d’installation à la demande
- `bin/cli/runtime/index.mjs` — orchestrateur de démarrage (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — hook npm de post-installation (préchauffage non bloquant)
- `src/lib/db/core.ts` — exports `ensureDbInitialized()` / `getDriverInfo()`

## Topologie à instance d’écriture unique (HA non prise en charge)

La chaîne de repli des pilotes ci-dessus s’exécute toujours dans **un seul processus**. Avec SQLite
par défaut, OmniRoute ne prend en charge qu’**une seule instance d’écriture** :

- Ne connectez pas deux réplicas OmniRoute au même fichier `storage.sqlite`.
- Un redémarrage de conteneur, un déploiement Recreate, un arrêt dû à un manque de mémoire ou un redémarrage déclenché par HEALTHCHECK interrompt
  toutes les sessions SSE en cours. Le chemin standard ne prévoit aucune interruption progressive des sessions.
- Une sonde de vivacité de l’orchestrateur qui considère un `/healthz` lent comme indisponible arrêtera le seul
  réplica. Préférez une sonde de vivacité TCP et une sonde de disponibilité HTTP `/healthz`. Consultez le
  [Guide Docker — disponibilité](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  et les [recommandations relatives aux sondes Kubernetes](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
