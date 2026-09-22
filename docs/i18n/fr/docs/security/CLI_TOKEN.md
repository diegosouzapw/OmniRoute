# CLI Machine-ID Token (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Vue d’ensemble

Les commandes de l’interface en ligne de commande OmniRoute s’authentifient auprès de l’API de gestion locale à l’aide d’un jeton
`HMAC-SHA256(machine-id, salt)` envoyé via l’en-tête de requête
`x-omniroute-cli-token`.

Cela permet aux sous-commandes de l’interface en ligne de commande (`omniroute status`, `omniroute providers`, etc.)
d’appeler les points de terminaison de gestion sans obliger l’utilisateur à fournir un JWT ou un
mot de passe à chaque invocation.

## Fonctionnement

1. `getMachineTokenSync()` lit l’identifiant matériel de la machine via `node-machine-id`
   (et utilise une chaîne vide en cas d’échec, ce qui désactive l’authentification de l’interface en ligne de commande).
2. Cette fonction calcule `HMAC-SHA256(machine_id, salt)` et renvoie l’empreinte hexadécimale
   complète de 64 caractères — un jeton déterministe, non réversible et lié à cette machine.
3. L’interface en ligne de commande envoie le jeton sous la forme `x-omniroute-cli-token` uniquement lorsque la
   destination résolue est une URL de bouclage explicite (`localhost`, `127.0.0.0/8` ou
   une adresse IPv6 de bouclage). Les requêtes contenant le jeton utilisent `redirect: error`, afin qu’une
   redirection locale ne puisse pas le transmettre à une autre origine. Les contextes distants utilisent à la place
   des jetons d’accès à portée limitée. Si la dérivation n’est pas disponible, l’interface en ligne de commande omet l’en-tête
   et `omniroute doctor` signale l’échec au lieu de considérer un jeton vide
   comme valide.
4. Le serveur (`src/server/authz/policies/management.ts`) recalcule le
   jeton attendu avec le même sel et le compare via `timingSafeEqual` afin
   d’empêcher son extraction par analyse temporelle.

## Propriétés de sécurité

| Propriété                                         | Détail                                                                                                                                                                                                                                              |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bouclage uniquement**                           | Accepté uniquement lorsque l’indicateur fiable de localité du pair du serveur (dérivé de l’adresse réelle du pair TCP) indique une adresse de bouclage. L’en-tête `Host`, contrôlé par le client, n’est jamais utilisé pour déterminer la localité. |
| **Comparaison en temps constant**                 | `crypto.timingSafeEqual` empêche les attaques temporelles.                                                                                                                                                                                          |
| **Non réversible**                                | La sortie HMAC ne permet pas de retrouver l’identifiant de la machine.                                                                                                                                                                              |
| **Aucun contournement de la protection `always`** | `isAlwaysProtectedPath()` est évaluée avant la vérification du jeton de l’interface en ligne de commande. `/api/shutdown` et `/api/settings/database` nécessitent toujours un JWT.                                                                  |
| **Non exportable**                                | Le jeton n’est jamais écrit sur le disque ni consigné dans les journaux.                                                                                                                                                                            |

## Sel par défaut (aléatoire pour chaque installation)

Lorsque `OMNIROUTE_CLI_SALT` n’est pas définie, le sel est une chaîne hexadécimale aléatoire de 64 caractères,
générée une seule fois et conservée dans `<DATA_DIR>/cli-token-salt.json` (mode `0600`) —
et non la valeur littérale `omniroute-cli-auth-v1` enregistrée dans le dépôt. `getActiveSalt()` dans
`src/lib/machineToken.ts` et son équivalent dans `bin/cli/utils/cliToken.mjs` lisent tous deux le
même fichier, de sorte que le serveur et chaque invocation de l’interface en ligne de commande sur cette installation convergent vers la
même valeur ; la valeur littérale enregistrée dans le dépôt n’est utilisée qu’en dernier recours lorsqu’aucun
sel conservé ou issu de l’environnement ne peut encore être établi (par exemple, lors d’une nouvelle installation
de l’interface en ligne de commande uniquement, avant que le serveur n’ait été exécuté). Cela corrige une faiblesse de l’ancienne
valeur littérale fixe par défaut : `/etc/machine-id` est généralement lisible par tous les utilisateurs, de sorte que n’importe quel utilisateur local pouvait
autrement dériver le même jeton pour chaque installation n’ayant jamais défini
`OMNIROUTE_CLI_SALT`.

## Rotation du sel

Définissez `OMNIROUTE_CLI_SALT` pour renouveler le jeton dérivé sans modifier le code — cette variable
est toujours prioritaire sur le sel propre à l’installation qui est enregistré. Après la rotation, tous les processus CLI
sur cette machine utiliseront automatiquement le nouveau jeton. Utile après une fuite de la
liste des processus susceptible d’avoir exposé la valeur dérivée précédente.

```bash
# Rotation persistante (à ajouter au profil du shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Vérifier que le nouveau jeton est utilisé
omniroute status
```

## Format historique (SHA-256, 32 caractères) — toujours accepté

Avant le format HMAC ci-dessus, la CLI dérivait son jeton selon la formule
`SHA-256(machineId + salt).hex[0..32]` (un préfixe de 32 caractères) dans
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` dans `src/lib/machineToken.ts`).

Pour assurer la rétrocompatibilité, le serveur accepte **les deux** formats : le vérificateur construit
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` et compare
l’en-tête reçu à chacun d’eux avec `timingSafeEqual`
(`src/server/authz/policies/management.ts` et `src/lib/middleware/cliTokenAuth.ts`).
Ainsi, un jeton est valide s’il correspond **soit** au condensat HMAC de 64 caractères, **soit** au préfixe
SHA-256 historique de 32 caractères.

**Désactivation :** définissez `OMNIROUTE_DISABLE_CLI_TOKEN=true` (dans l’environnement ou `.env`) pour désactiver entièrement le
mécanisme de jeton CLI ; tout accès nécessite alors une clé API explicite. Sur les hôtes multi-utilisateurs,
cette configuration est recommandée, car `machine-id` est propre à l’appareil (et non à l’utilisateur) et un autre
utilisateur du même hôte pourrait calculer le même jeton.

## Fichiers

| Fichier                                   | Rôle                                                  |
| ----------------------------------------- | ----------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Dérivation du jeton (`getMachineTokenSync`)           |
| `bin/cli/utils/cliToken.mjs`              | Réplication côté CLI de la même dérivation            |
| `<DATA_DIR>/cli-token-salt.json`          | Sel aléatoire propre à l’installation enregistré      |
| `src/server/authz/headers.ts`             | Constante `CLI_TOKEN_HEADER`                          |
| `src/server/authz/policies/management.ts` | Vérification côté serveur                             |
| `src/server/authz/routeGuard.ts`          | Vérification de l’hôte de bouclage (`isLoopbackHost`) |

## Voir aussi

- `docs/security/ROUTE_GUARD_TIERS.md` — niveaux de protection des routes
- `docs/architecture/AUTHZ_GUIDE.md` — pipeline d’autorisation complet
