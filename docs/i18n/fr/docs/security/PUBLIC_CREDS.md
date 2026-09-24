# Public Credentials Handling (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Source de référence :** `open-sse/utils/publicCreds.ts`
> **Tests :** `tests/unit/publicCreds.test.ts`
> **Dernière mise à jour :** 2026-08-07 — v3.8.50
> **Public visé :** ingénieurs intégrant des fournisseurs qui distribuent des client_id / client_secret OAuth publics ou des clés d’API Web Firebase dans leurs CLI publics.
> **Statut :** **OBLIGATOIRE** pour tout nouveau code qui intègre des identifiants provenant de services en amont.

## Pourquoi cela existe

- [OAuth 2.0 pour les applications natives (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — les client_id / client_secret OAuth des applications installées sont publics ; PKCE assure la sécurité réelle.
- [Clés d’API Firebase](https://firebase.google.com/docs/projects/api-keys) — les identifiants des clients Web sont publics par conception.

OmniRoute doit intégrer ces valeurs afin que les utilisateurs qui ne configurent pas de fichier `.env` bénéficient tout de même d’un flux OAuth fonctionnel dès le départ. Sans valeur de secours intégrée, les fournisseurs Gemini / Antigravity cessent de fonctionner pour tout utilisateur qui suit la méthode « cloner et exécuter ».

Cependant, les valeurs littérales telles que `AIzaSy…`, `GOCSPX-…` et `…apps.googleusercontent.com` sont détectées par **GitHub Secret Scanning**, **Semgrep** et d’autres analyseurs de motifs similaires. Chaque version génère un flux bruyant de faux positifs, la protection contre les poussées bloque des commits légitimes et les opérateurs finissent par ne plus faire confiance au flux d’alertes.

L’utilitaire `open-sse/utils/publicCreds.ts` répond simultanément à ces deux contraintes :

- Il intègre l’identifiant public sous la forme d’une **séquence d’octets masquée par XOR** (aucun motif détectable par les analyseurs dans le code source).
- Il le décode à l’exécution via `decodePublicCred` / `resolvePublicCred`.
- Il détecte les valeurs brutes qui suivent déjà des préfixes connus (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) et les transmet sans modification, afin que les utilisateurs disposant de valeurs brutes dans leur fichier `.env` existant continuent à bénéficier d’un fonctionnement correct avec **zéro migration**.

Il s’agit d’**obscurcissement, et non de chiffrement.** Toute personne lisant le code source peut récupérer la valeur — ce qui est acceptable, car cette valeur est publique par conception. Le seul objectif est d’éviter les correspondances avec les expressions régulières des analyseurs.

## Le modèle obligatoire

### 1. Ajout d’un nouvel identifiant public

Lorsque vous devez intégrer une nouvelle valeur fournie par un service en amont qui :

- provient d’un CLI public, d’une application de bureau publique ou d’un bundle de navigateur public, **et**
- est documentée (ou traitée) par le fournisseur en amont comme un identifiant client public, **et**
- serait autrement détectée par un analyseur de motifs (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, etc.),

…suivez cette liste de contrôle :

1. Générez la séquence d’octets masquée :

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Ajoutez une nouvelle entrée à `EMBEDDED_DEFAULTS` dans `open-sse/utils/publicCreds.ts` avec un **nom de clé neutre** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, etc.). N’utilisez **pas** de noms tels que `client_secret` ou `api_key` dans l’utilitaire — ces termes déclenchent les règles génériques de détection de secrets de Semgrep.

3. Ajoutez un `keyof typeof EMBEDDED_DEFAULTS` à l’union de types publique (il est déduit automatiquement).

4. Dans le code consommateur, remplacez la valeur littérale codée en dur par :

   ```ts
   // remplacement par une seule variable d’environnement
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // plusieurs alias de variables d’environnement (le premier non vide l’emporte)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // aucun remplacement par une variable d’environnement (toujours la valeur intégrée par défaut)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Supprimez la valeur littérale de `.env.example` (remplacez-la par une documentation sous forme de commentaires uniquement, orientant les lecteurs vers ce document) :

   ```dotenv
   # ── Fournisseur (Google / Firebase / etc.) ──
   # Les identifiants OAuth publics sont intégrés au code via
   # open-sse/utils/publicCreds.ts. Définissez ces variables uniquement pour utiliser les vôtres.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Mettez à jour `tests/unit/publicCreds.test.ts` afin d’ajouter une assertion de forme pour la nouvelle clé (vérifiez le format, pas la valeur littérale — consultez les tests existants pour suivre le modèle).

7. N’ajoutez **jamais** de valeurs littérales `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` aux fichiers de test. Utilisez les constantes `FAKE_*` construites à partir de fragments assemblés avec `.join("")` (consultez les tests existants).

### 2. Consommateurs

- **Lisez uniquement les valeurs à partir de `resolvePublicCred()` / `resolvePublicCredMulti()`** — n’appelez jamais directement `decodePublicCredBytes()` en dehors de l’utilitaire.
- L’utilitaire est volontairement peu coûteux (XOR linéaire sur les octets) et peut être appelé sans risque lors du chargement du module ; les valeurs par défaut ne sont calculées qu’une seule fois.
- La valeur définie dans l’environnement a toujours priorité. Si un utilisateur définit `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, l’utilitaire transmet directement cette valeur brute sans la modifier.

### 3. Modèles interdits

❌ Ne faites **jamais** ce qui suit dans le code de production (`src/`, `open-sse/`, `electron/`, `bin/`) :

```ts
// MAUVAIS : la valeur littérale déclenche Secret Scanning et Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// MAUVAIS : valeur littérale en base64 — GitHub la détecte toujours depuis févr. 2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// MAUVAIS : concaténation de chaînes qui reconstitue le motif à l’exécution
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// MAUVAIS : encodage hexadécimal/ROT13 — autre obscurcissement, même risque de détection
clientSecret: hexDecode("474f4353..."),
```

Toutes ces méthodes finissent par déclencher un analyseur. Utilisez `resolvePublicCred()`.

❌ N’ajoutez **jamais** d’identifiants littéraux à `.env.example`. Les utilisateurs qui ont besoin de véritables valeurs provenant du service en amont peuvent les extraire eux-mêmes du CLI public ou utiliser leur propre enregistrement OAuth.

❌ N’ignorez **jamais** une nouvelle alerte de détection de secrets sans vérifier au préalable si l’identifiant doit être déplacé vers cet utilitaire.

## Contrôles associés

- `RAW_VALUE_PATTERN` dans `publicCreds.ts` répertorie les préfixes qui déclenchent la transmission sans modification (rétrocompatibilité). Ne l’étendez qu’aux formats d’identifiants publics documentés, jamais à des secrets propriétaires.
- `.env.example` est contrôlé par le script `check-env-doc-sync` de la CI — lorsque vous supprimez une variable ici, assurez-vous que la documentation reste cohérente.
- Les suites `npm run test:vitest` et `node --import tsx/esm --test tests/unit/publicCreds.test.ts` doivent toutes deux continuer à réussir.

## Quand NE PAS utiliser cet utilitaire

Cet utilitaire est **uniquement** destiné aux identifiants qui sont :

1. Distribués publiquement par le fournisseur en amont (binaire CLI, bundle pour navigateur, documentation officielle).
2. Documentés ou fortement présumés non confidentiels (protégés par PKCE, clé Web Firebase ou équivalent).

Pour tout le reste — jetons émis par l’opérateur, secrets propres à chaque locataire, `client_secret` de votre propre application OAuth, clés de chiffrement, secrets JWT, mots de passe de base de données — utilisez **uniquement des variables d’environnement** (`process.env.FOO`, avec `||` comme valeur de repli vide ou une erreur explicite). Ces éléments doivent être stockés dans `.env` et dans le [magasin chiffré d’identifiants](./COMPLIANCE.md), et non dans le code source.

## Références

- [Google : OAuth 2.0 pour les applications natives](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase : clés API pour l’identification des clients](https://firebase.google.com/docs/projects/api-keys)
- [Secrets pris en charge par l’analyse des secrets GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub : détection en base64 des jetons (févr. 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit introduisant cet utilitaire : `1a39c31f` — _fix(security): masquer les identifiants publics en amont et centraliser l’assainissement des erreurs_
