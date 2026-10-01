# Management Authentication (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute dispose de **quatre familles d'identifiants** qui peuvent autoriser les routes de gestion.
Elles ne sont pas interchangeables. Les clés API d'inférence (`sk-…`) ne gèrent **pas** le
serveur, sauf si elles ont été explicitement autorisées avec la portée `manage` ou `admin`.

Implémentation canonique : `src/lib/api/requireManagementAuth.ts`.

| Identifiant                    | Forme typique                          | Créé où                                                | Utilisation prévue                  | Capacité de gestion                                                                                       |
| :----------------------------- | :------------------------------------- | :----------------------------------------------------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| Session JWT du tableau de bord | cookie `auth_token`                    | Connexion au tableau de bord                           | Interface utilisateur du navigateur | Gestion complète du tableau de bord, soumise aux règles CSRF, de localité et de routes toujours protégées |
| Jeton machine-id CLI           | interne / local                        | Démarrage CLI (`omniroute` sur la même machine)        | CLI locale                          | Gestion locale uniquement                                                                                 |
| Jeton d'accès scopé            | `oma_live_…`                           | **Paramètres → Jetons d'accès** ou `omniroute connect` | CLI distante et API de gestion      | Doit satisfaire la portée `read`, `write` ou `admin` requise par la route                                 |
| Clé API d'inférence            | `sk-…` (et autres préfixes de clé API) | **Gestionnaire d'API / Clés API**                      | inférence `/v1/*`                   | **Aucune** sauf si les métadonnées de la clé incluent `manage` ou `admin`                                 |

Les identifiants `oma_` sont des identifiants de gestion/CLI. Ce ne sont **pas** des clés API d'inférence.

Si la connexion/authentification par clé API est désactivée pour le serveur, certaines routes de gestion peuvent
accepter des appels non authentifiés. Les routes locales uniquement et toujours protégées appliquent toujours
leurs propres règles. La présentation de l'un de ces identifiants n'est donc pas universellement
obligatoire, et en posséder un n'est pas universellement suffisant sans la portée et la localité de route requises.

Lié : [Mode distant](./REMOTE-MODE.md) (comment `oma_live_…` est généré pour une CLI distante).

---

## Matrices de portée

Les scopes de gestion de clés API et les scopes de jetons d'accès sont des vocabulaires différents. Les scopes des outils MCP constituent un troisième vocabulaire, vérifié avec `scopeMatches` plutôt qu'avec l'une ou l'autre des fonctions des tableaux ci-dessous. Côte à côte : [Trois espaces de noms de scopes](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Scopes de jetons d'accès (`oma_live_…`)

| Scope   | Opérations typiques                                                                                         |
| ------- | ----------------------------------------------------------------------------------------------------------- |
| `read`  | GETs de liste/statut que le jeton est autorisé à voir                                                       |
| `write` | Mutations (création/mise à jour/suppression) inférieures à l'administrateur                                 |
| `admin` | CLI distante complète / jeton de connexion (les valeurs par défaut de l'amorçage par mot de passe sont ici) |

Un jeton avec `read` ne peut pas appeler une route `write`. Format du message d'exécution : `Access token scope '<have>' is insufficient; '<need>' required.`

### Scopes de gestion de clés API

| Scope    | Signification                                                                 |
| -------- | ----------------------------------------------------------------------------- |
| (aucun)  | Inférence uniquement. Les routes de gestion renvoient 403.                    |
| `manage` | API de gestion (même porte que la branche de clé API `requireManagementAuth`) |
| `admin`  | Satisfait également `hasManageScope` (traité comme capable de gestion)        |

Activez `manage` sur la clé dans l'interface utilisateur API Keys / API Manager. Ne réutilisez pas une clé de client de chat pour l'automatisation, sauf si vous avez délibérément accordé ce scope.

---

## Création et révocation

### Session JWT du tableau de bord

1. Ouvrez `/login`, puis connectez-vous avec le mot de passe de gestion (`INITIAL_PASSWORD` au premier démarrage).
2. Le cookie `auth_token` est HttpOnly. Le tableau de bord Web l’utilise automatiquement.
3. Déconnectez-vous via `/api/auth/logout`. Il n’existe aucun secret de longue durée à copier.

### Jeton d’identifiant machine de la CLI

1. Exécutez `omniroute` sur le **même hôte** que le serveur (boucle locale).
2. La CLI initialise un jeton d’identifiant machine sous `~/.omniroute/` (chmod 600).
3. Cela ne fonctionne **pas** depuis une autre machine. Utilisez un jeton d’accès pour une CLI distante.

### Jeton d’accès avec portée (`oma_live_…`)

1. Tableau de bord : **Paramètres → Jetons d’accès** → créer (nom + portée). **Le secret n’est affiché qu’une seule fois.**
2. Ou via la CLI : `omniroute connect <host>` (mot de passe → jeton). Consultez [Mode distant](./REMOTE-MODE.md).
3. En-tête : `Authorization: Bearer oma_live_…`
4. Révoquez-le depuis la même page Jetons d’accès (ou supprimez le contexte de la CLI).
5. Le serveur ne stocke qu’un condensat. Traitez le texte en clair comme un mot de passe.

### Clé d’API avec portée de gestion

1. Tableau de bord : **Gestionnaire d’API / Clés d’API** → créez ou modifiez une clé → activez `manage` (ou `admin`).
2. En-tête : `Authorization: Bearer sk-…` (le préfixe réel de la clé).
3. Révoquez la clé ou retirez-lui la portée `manage` dans la même interface.
4. Pour appliquer le principe du moindre privilège à une automatisation qui n’utilise pas la CLI : préférez un jeton d’accès `read` pour les tâches limitées aux requêtes GET ; n’utilisez `manage` sur une clé d’API que lorsque l’appelant doit également communiquer avec `/v1` et l’API de gestion.

---

## Format de l’en-tête

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Ne placez pas les identifiants de gestion dans le chemin de l’URL ni dans la chaîne de requête. L’authentification de gestion s’effectue uniquement par en-tête ou cookie.

---

## Exemples à copier-coller

Lecture seule (lister les fournisseurs). Utilisez un jeton d’accès `read` :

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modification (créer une connexion à un fournisseur). Utilisez un jeton d’accès `write`/`admin` ou une clé API dotée du périmètre `manage` :

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inférence (hors gestion). Clé API ordinaire, sans périmètre `manage` requis :

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Erreurs d'exécution actuelles (ne pas afficher les secrets)

| Situation                                           | Statut typique | Message (assaini)                                                                                   |
| :-------------------------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------- |
| Aucun identifiant                                   | 401            | `Authentification requise`                                                                          |
| `oma_live_…` invalide/expiré                        | 401            | `Jeton d'accès invalide ou expiré`                                                                  |
| Clé API valide sans `manage`/`admin`                | 403            | `La clé API ne dispose pas de la portée 'manage'. Activez-la dans le tableau de bord des clés API.` |
| Clé API ordinaire invalide sur une route de gestion | 403            | `Jeton de gestion invalide`                                                                         |
| Portée du jeton d'accès trop faible                 | 403            | `La portée du jeton d'accès '<have>' est insuffisante ; '<need>' est requise.`                      |

"Jeton de gestion invalide" signifie que le porteur n'a **pas** été accepté comme
identifiant de gestion. Il ne vous indique **pas** quelle famille créer.
Utilisez le tableau ci-dessus : les clés d'inférence nécessitent la portée `manage` ;
l'interface de ligne de commande distante nécessite `oma_live_…` ; le tableau de bord
utilise le cookie de session.

---

## Choix recommandé du moindre privilège

| Appelant                                                            | Utilisation                                             |
| :------------------------------------------------------------------ | :------------------------------------------------------ |
| Navigateur                                                          | Session du tableau de bord                              |
| CLI sur l'hôte du serveur                                           | Jeton de machine                                        |
| CLI sur un ordinateur portable communiquant avec un serveur distant | `oma_live_…` depuis `omniroute connect`                 |
| CI / scripts (gestion uniquement)                                   | `oma_live_…` avec la portée la plus restreinte possible |
| CI qui doit appeler à la fois `/v1` et `/api`                       | Clé API avec `manage` **ou** deux identifiants          |
