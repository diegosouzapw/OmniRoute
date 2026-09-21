# Stealth Guide (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../security/STEALTH_GUIDE.md) · 🇪🇹 [am](../../../am/docs/security/STEALTH_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/security/STEALTH_GUIDE.md) · 🇦🇿 [az](../../../az/docs/security/STEALTH_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/security/STEALTH_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/security/STEALTH_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/security/STEALTH_GUIDE.md) · 🇩🇰 [da](../../../da/docs/security/STEALTH_GUIDE.md) · 🇩🇪 [de](../../../de/docs/security/STEALTH_GUIDE.md) · 🇬🇷 [el](../../../el/docs/security/STEALTH_GUIDE.md) · 🇪🇸 [es](../../../es/docs/security/STEALTH_GUIDE.md) · 🇪🇪 [et](../../../et/docs/security/STEALTH_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/security/STEALTH_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/security/STEALTH_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/security/STEALTH_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/security/STEALTH_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/security/STEALTH_GUIDE.md) · 🇮🇱 [he](../../../he/docs/security/STEALTH_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/security/STEALTH_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/security/STEALTH_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/security/STEALTH_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/security/STEALTH_GUIDE.md) · 🇮🇩 [id](../../../id/docs/security/STEALTH_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/security/STEALTH_GUIDE.md) · 🇮🇹 [it](../../../it/docs/security/STEALTH_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/security/STEALTH_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/security/STEALTH_GUIDE.md) · 🇰🇭 [km](../../../km/docs/security/STEALTH_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/security/STEALTH_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/security/STEALTH_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/security/STEALTH_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/security/STEALTH_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/security/STEALTH_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/security/STEALTH_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/security/STEALTH_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/security/STEALTH_GUIDE.md) · 🇲🇲 [my](../../../my/docs/security/STEALTH_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/security/STEALTH_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/security/STEALTH_GUIDE.md) · 🇳🇴 [no](../../../no/docs/security/STEALTH_GUIDE.md) · 🇮🇳 [or](../../../or/docs/security/STEALTH_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/security/STEALTH_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/security/STEALTH_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/security/STEALTH_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/security/STEALTH_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/STEALTH_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/security/STEALTH_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/security/STEALTH_GUIDE.md) · 🇱🇰 [si](../../../si/docs/security/STEALTH_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/security/STEALTH_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/security/STEALTH_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/security/STEALTH_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/security/STEALTH_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/security/STEALTH_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/security/STEALTH_GUIDE.md) · 🇮🇳 [te](../../../te/docs/security/STEALTH_GUIDE.md) · 🇹🇭 [th](../../../th/docs/security/STEALTH_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/security/STEALTH_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/STEALTH_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/security/STEALTH_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/security/STEALTH_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/security/STEALTH_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/security/STEALTH_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/STEALTH_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/STEALTH_GUIDE.md)

---

> **Source de vérité :** `open-sse/utils/tlsClient.ts`, `open-sse/services/{tlsClientBase,claudeTlsClient,perplexityTlsClient,grokTlsClient,notionTlsClient,lmarenaTlsClient,claudeCodeCCH,claudeCodeFingerprint,claudeCodeObfuscation,claudeCodeCompatible}.ts`, `open-sse/config/cliFingerprints.ts`, `src/mitm/`
> **Dernière mise à jour :** 2026-09-02 — v3.8.51
> **Public visé :** ingénieurs chargés de la maintenance des intégrations furtives propres aux fournisseurs.

OmniRoute s'intègre à des fournisseurs dont les infrastructures périphériques procèdent activement à l'empreinte des clients non officiels (TLS JA3/JA4, ordre des en-têtes, structure du corps JSON, jetons d'intégrité). Cette page documente les surfaces de furtivité exposées par OmniRoute et leur emplacement d'implémentation.

## Mentions légales et éthiques

Les fonctionnalités de furtivité permettent à OmniRoute de servir de couche de compatibilité entre les comptes officiels détenus par les utilisateurs (Claude Code CLI, Codex, Antigravity, Cursor, etc.) et l'API unifiée d'OmniRoute. Elles ne sont **pas** destinées à contourner la détection des fraudes, à partager des identifiants ou à enfreindre les conditions d'utilisation des fournisseurs. Les mainteneurs attendent des opérateurs qu'ils respectent les conditions d'utilisation des services en amont qu'ils ont acceptées lors de la création de leurs comptes.

---

## Couche d'empreinte TLS

### `open-sse/utils/tlsClient.ts` — wreq-js (Chrome 124)

Des sessions `wreq-js` persistantes sont créées à la demande pour chaque périmètre de compte et proxy résolu. À l'échelle du processus, `TlsClient` regroupe au maximum 128 sessions qui se font passer pour **Chrome 124 sur macOS** auprès des services en amont protégés par Cloudflare. `TlsClient.fetch()` échoue de manière fermée lorsque l'environnement d'exécution natif est indisponible ; un appelant peut sélectionner explicitement une solution de repli en dehors de cet encapsuleur.

- Profil de session : `browser: "chrome_124", os: "macos"`
- Résolution du proxy (par ordre de priorité) : `HTTPS_PROXY` → `HTTP_PROXY` → `ALL_PROXY` (également en minuscules)
- Délai d'expiration : `TLS_CLIENT_TIMEOUT_MS` (hérite de `FETCH_TIMEOUT_MS`, valeur par défaut : 600000)
- La réponse de `wreq-js` est compatible avec fetch (`headers`, `text()`, `json()`, `clone()`, `body`).
- Chien de garde du premier octet (`open-sse/utils/tlsFirstByteWatchdog.ts`, #12656) : `TlsClient.fetch()`
  est résolue dès l'arrivée des en-têtes du service en amont ; `TLS_CLIENT_TIMEOUT_MS` ne peut donc
  pas, à lui seul, limiter l'attente d'un corps qui ne produit jamais de premier octet. `guardTlsFirstByte()` met en concurrence
  le premier `read()` du corps et `TLS_FIRST_BYTE_WATCHDOG_MS` (valeur par défaut : `10000` ; `0` le désactive) ; un corps sain
  n'est pas affecté, tandis qu'un corps bloqué entraîne l'annulation du lecteur wreq et permet à la logique
  existante de repli TLS de `proxyFetch` de poursuivre avec le répartiteur direct/proxy (une requête dont
  la réexécution n'est pas sûre, par exemple une requête POST avec un corps, génère toujours une erreur au lieu
  d'être réessayée silencieusement).

### Transport des fournisseurs par cookie web — wreq-js 3.2.0

`open-sse/services/tlsClientBase.ts` est l'adaptateur partagé par les cinq transports spécialisés
par cookie web ci-dessous. Chaque encapsuleur léger propre à un fournisseur sélectionne un profil de navigateur/système d'exploitation. L'adaptateur
utilise l'unique chargeur d'environnement d'exécution wreq et le pool de transports de `open-sse/utils/tlsClient.ts`, indexé par
profil + système d'exploitation + proxy résolu, tandis que chaque requête utilise `cookieMode: "ephemeral"`. Les comptes et
les requêtes partagent donc les connexions au niveau du transport, mais jamais une session wreq ni un magasin de cookies.

| Fournisseur | Profil        | Système d'exploitation émulé | Politique de fin de flux                           |
| ----------- | ------------- | ---------------------------- | -------------------------------------------------- |
| Claude      | `chrome_146`  | Linux                        | inclure `[DONE]`                                   |
| Perplexity  | `firefox_148` | macOS                        | inclure `event: end_of_stream`                     |
| Grok        | `chrome_146`  | Linux                        | exclure `[DONE]`                                   |
| Notion      | `chrome_146`  | Windows                      | inclure `[DONE]`                                   |
| LMArena     | `chrome_146`  | Windows                      | aucune sentinelle ; fermer à la fin de flux native |

- La diffusion en continu consomme directement le `ReadableStream` de la réponse native ; aucun fichier temporaire ni processus auxiliaire n'est
  créé.
- Jusqu'à 256 octets initiaux sont inspectés avant d'exposer un flux. Les fournisseurs SSE mettent en mémoire tampon les erreurs
  non-SSE ; Grok/LMArena convertissent les défis Cloudflare en `403` et les pages HTML interstitielles en `502`.
- Le délai d'expiration natif de la requête reste encadré par une échéance absolue stricte en JS. Un blocage invalide
  et ferme uniquement le transport concerné correspondant au profil/système d'exploitation/proxy avant que la requête suivante ne le recrée.
- L'ordre de priorité de la résolution du proxy est le suivant : `proxyUrl` propre à l'appel → contexte de compte/tableau de bord associé à la requête →
  `HTTPS_PROXY`/`HTTP_PROXY`/`ALL_PROXY` (y compris leurs variantes en minuscules). Les erreurs de résolution entraînent
  un échec fermé plutôt que la fuite d'une connexion directe. LMArena effectue délibérément la résolution par rapport à `arena.ai`.
- `byteResponse` renvoie une URL `data:` typée par contenu, sans corruption UTF-8.
- Les erreurs sont `TlsClientUnavailableError` (package/module complémentaire indisponible), `TlsClientHangError`
  (échéance dépassée) et `WreqTransportCapacityError` (code d'erreur partagé de capacité de session)
  lorsque les 128 emplacements bornés profil/système d'exploitation/proxy sont tous actifs ou en cours de fermeture.

La session générique `TlsClient` ci-dessus reste spécialisée dans l'état persistant des cookies
gérés par le navigateur. Les deux chemins réutilisent un même chargeur de module wreq mis en cache et le même hook de cycle de vie du processus ; leurs pools restent
séparés, car la durée de vie de leurs cookies est volontairement différente.

Les profils sont pris en charge par le package épinglé, mais l'acceptation effective par les WAF peut évoluer indépendamment
des tests de contrat locaux. Validez les modifications d'empreinte avec un compte actif explicitement autorisé
avant de revendiquer la parité avec un navigateur du service en amont.

---

## Pack de furtivité Claude Code

Lorsque `cliCompatMode` est activé, OmniRoute remodèle les requêtes Claude sortantes afin qu’elles soient impossibles à distinguer du trafic de `claude-cli`. Trois modules collaborent :

### `claudeCodeFingerprint.ts`

Calcule l’empreinte `cc_version` de 3 caractères intégrée à l’en-tête de facturation :

```
SHA256(SALT + msg[4] + msg[7] + msg[20] + version)[:3]
```

- `FINGERPRINT_SALT = "59cf53e54c78"` (codé en dur ; correspond au client officiel)
- Entrées : caractères aux indices 4, 7 et 20 du texte du premier message utilisateur + chaîne de version
- Sortie : préfixe hexadécimal de 3 caractères

### `claudeCodeCCH.ts` (hachage du contenu client)

Contrôle d’intégrité côté serveur que le CLI officiel Claude Code calcule via Bun/Zig. OmniRoute le réimplémente avec `xxhash-wasm` :

1. Sérialiser le corps avec l’espace réservé `cch=00000;`
2. `xxhash64(bytes, seed) & 0xFFFFF`
3. Valeur hexadécimale en minuscules de 5 caractères, complétée par des zéros
4. Remplacer `cch=00000;` par le jeton calculé

Constantes :

- Graine : `0x6e52736ac806831e`
- Motif : `/\bcch=([0-9a-f]{5});/`

### `claudeCodeObfuscation.ts`

Insère un **caractère de liaison sans chasse** Unicode (`U+200D`) après le premier caractère des noms de clients « sensibles » afin que les filtres en amont ne puissent pas les détecter avec grep. Liste de mots par défaut :

```
opencode, open-code, cline, roo-cline, roo_cline, cursor, windsurf,
aider, continue.dev, copilot, avante, codecompanion
```

Appliqué aux éléments suivants : blocs `system`, tous les `messages[].content` et `tools[].description` / `tools[].function.description`. Peut être remplacé par l’opérateur via `setSensitiveWords()`.

### `claudeCodeCompatible.ts` — fournisseurs `anthropic-compatible-cc-*`

Pour les relais Anthropic tiers qui n’acceptent que du trafic provenant du « vrai Claude Code » :

- `CLAUDE_CODE_COMPATIBLE_USER_AGENT = "claude-cli/2.1.258 (external, sdk-cli)"`
- `CLAUDE_CODE_COMPATIBLE_STAINLESS_PACKAGE_VERSION = "0.112.1"`
- `CLAUDE_CODE_COMPATIBLE_STAINLESS_RUNTIME_VERSION = "v26.3.0"`
- `anthropic-beta = "claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24"` par défaut
- L’option « Enable redact-thinking beta » propre à chaque connexion ajoute `redact-thinking-2026-02-12` lorsqu’un service en amont compatible CC exige spécifiquement des flux de réflexion expurgés
- L’option « Enable summarized thinking display » propre à chaque connexion stocke `providerSpecificData.requestDefaults.summarizeThinking` et ajoute `display: "summarized"` aux requêtes de réflexion compatibles CC qui ne définissent pas déjà de mode d’affichage
- `CONTEXT_1M_BETA_HEADER = "context-1m-2025-08-07"` (famille Opus/Sonnet 4.x)
- Chemin par défaut : `/v1/messages?beta=true`

Modules apparentés dans le même pack :

- `claudeCodeConstraints.ts` — règles de température et de contrôle du cache
- `claudeCodeToolRemapper.ts` — remappage des noms d’outils
- `claudeCodeExtraRemap.ts` — normalisation supplémentaire de la charge utile

---

## Furtivité Antigravity

Les requêtes Antigravity préservent le texte de l’appelant octet par octet. OmniRoute n’insère pas de caractères sans chasse dans les invites et ne renomme ni n’injecte d’outils pour imiter un client d’EDI.

### `antigravityHeaderScrub.ts`

Supprime les marqueurs du SDK Stainless (`x-stainless-lang`, `x-stainless-package-version`, `x-stainless-os`, `x-stainless-arch`, `x-stainless-runtime`, `x-stainless-runtime-version`, `x-stainless-timeout`, `x-stainless-retry-count`, `x-stainless-helper-method`) avant le transfert.

### ⚠️ Risque : `ANTIGRAVITY_CREDITS=always` (risque élevé de bannissement du compte)

`ANTIGRAVITY_CREDITS=always` (utilisé par `open-sse/executors/antigravity.ts`) achemine **chaque** requête via les dépassements de crédits Antigravity AI (crédits Google payants), au lieu de laisser le quota de l’offre gratuite de Google faire office de limite. Cette fonctionnalité est documentée, mais il s’agit de **la source la plus courante de signalements pour violation des conditions d’utilisation que nous observons** — plusieurs comptes Google Ultra ont été bannis avec `403 / "service disabled for ToS violation" / insufficient_quota` après quelques heures d’exécution avec `=always`.

L’application des règles en amont se fait **du côté de Google** et OmniRoute ne peut rien faire pour l’empêcher. Le nom de la variable d’environnement et la documentation existante donnent l’impression qu’il s’agit d’une option sans risque à activer ; ce n’est pas le cas.

**Pourquoi cela déclenche la détection des abus plus agressivement qu’une utilisation limitée à l’offre gratuite :**

- Des dépenses automatisées soutenues sur un seul compte Google sont signalées différemment des requêtes de l’offre gratuite qui atteignent le quota puis s’arrêtent.
- Les dépassements de crédits n’ont aucun plafond de débit ; un client mal configuré peut donc consommer plusieurs centaines de dollars américains en quelques minutes et ressembler à une revente de clé API ou à du trafic de robots.
- Plusieurs utilisateurs d’OmniRoute consommant en parallèle des crédits de dépassement depuis la même adresse IP externe amplifient le signal.

**Approche recommandée :**

1. Conserver la valeur par défaut `ANTIGRAVITY_CREDITS=off`, sauf si l’opérateur accepte explicitement les risques liés aux crédits payants et aux mesures appliquées au compte. `retry` envoie d’abord la requête normale et n’injecte les crédits qu’une seule fois au maximum après une erreur 429 de quota admissible ; `always` injecte les crédits dès la première requête.
2. **Répartir la charge entre les fournisseurs via Auto-Combo** (`model: "auto"` ou `kr/glm/etc`-combo) au lieu de saturer un seul compte Antigravity.
3. **Définir des limites de RPM par connexion** sur la page de modification du fournisseur Antigravity (Tableau de bord → Fournisseurs → Antigravity → connexion → limite de débit). Une valeur de 30 à 60 RPM constitue une limite supérieure raisonnable pour une utilisation soutenue.
4. **Utiliser un réseau en amont stable et contrôlé par l’opérateur**, et éviter de partager un même compte entre des utilisateurs ou des charges de travail sans rapport.
5. **En cas de bannissement** : envoyer un recours via `support.google.com` → « Restore Workspace/Account access » en incluant le corps exact de la réponse `quota_exceeded` / `service disabled` envoyée par Google. Le rétablissement n’est pas garanti.

La documentation de référence des variables d’environnement décrit les conséquences de chaque mode de crédits sur le compte et les dépenses.

Points d’intervention :

- `open-sse/executors/antigravity.ts` — lit `process.env.ANTIGRAVITY_CREDITS`
- `src/lib/oauth/providers/antigravity.ts` — gestion des identifiants
- Rapport d’incident d’origine : discussion [#1183](https://github.com/diegosouzapw/OmniRoute/discussions/1183)

---

## Registre d’empreintes CLI — `open-sse/config/cliFingerprints.ts`

Table par fournisseur qui fixe l’ordre **exact** des en-têtes et des champs du corps JSON, capturé à partir des traces mitmproxy des CLI officielles. Actuellement enregistrés : `codex`, `claude`, ainsi que les profils dérivés à l’exécution dans `providerHeaderProfiles.ts` pour `antigravity` et `github`.

```ts
interface CliFingerprint {
  headerOrder: string[]; // sensible à la casse
  bodyFieldOrder: string[]; // clés JSON de premier niveau
  userAgent?: string | (() => string);
  extraHeaders?: Record<string, string>;
}
```

Activation ou désactivation par fournisseur via les variables d’environnement (voir ci-dessous). Lorsque cette fonctionnalité est désactivée, les en-têtes et les clés du corps apparaissent dans l’ordre produit par Node/JSON — ce qui facilite leur identification par empreinte.

---

## Proxy MITM (Antigravity, Linux/macOS/Windows)

Pour les CLI dont les binaires ne peuvent pas être redirigés via `OPENAI_BASE_URL`, OmniRoute exécute un proxy local qui termine les connexions TLS. Les points de terminaison se trouvent sous `src/app/api/cli-tools/antigravity-mitm/`.

| Méthode | Point de terminaison                    | Objectif                                               |
| ------- | --------------------------------------- | ------------------------------------------------------ |
| GET     | `/api/cli-tools/antigravity-mitm`       | État — running, pid, dnsConfigured, certExists         |
| POST    | `/api/cli-tools/antigravity-mitm`       | Démarrer le MITM (nécessite `apiKey` + `sudoPassword`) |
| DELETE  | `/api/cli-tools/antigravity-mitm`       | Arrêter le MITM                                        |
| GET     | `/api/cli-tools/antigravity-mitm/alias` | Répertorier les alias de modèles                       |
| PUT     | `/api/cli-tools/antigravity-mitm/alias` | Enregistrer les alias de modèles pour un outil         |

Hôte cible intercepté : **`daily-cloudcode-pa.googleapis.com`** (serveur en amont d’Antigravity).

### Séquence de démarrage (`src/mitm/manager.ts::startMitm`)

1. Générer un certificat autosigné via `selfsigned` (RSA-2048, SHA-256, 1 an) — `cert/generate.ts`
2. Installer le certificat dans le magasin de confiance du système — `cert/install.ts`
3. Ajouter l’entrée hosts `127.0.0.1 daily-cloudcode-pa.googleapis.com` — `dns/dnsConfig.ts`
4. Lancer `src/mitm/server.cjs` avec `ROUTER_API_KEY` + `MITM_LOCAL_PORT` (valeur par défaut : `443`)
5. Enregistrer le PID dans `<DATA_DIR>/mitm/.mitm.pid`

### Détection dynamique du magasin de confiance sous Linux — `cert/install.ts`

`getLinuxCertConfig()` parcourt une liste de priorités et sélectionne le premier répertoire existant :

| Famille de distributions | Répertoire                                  | Commande de mise à jour  |
| ------------------------ | ------------------------------------------- | ------------------------ |
| Debian / Ubuntu          | `/usr/local/share/ca-certificates`          | `update-ca-certificates` |
| Arch / CachyOS / Manjaro | `/etc/ca-certificates/trust-source/anchors` | `update-ca-trust`        |
| Fedora / RHEL / CentOS   | `/etc/pki/ca-trust/source/anchors`          | `update-ca-trust`        |
| openSUSE                 | `/etc/pki/trust/anchors`                    | `update-ca-certificates` |

Nom de fichier du certificat : `omniroute-mitm.crt`. Correspondance des empreintes via `getCertFingerprint()` (SHA-1 du DER).

En outre, `updateNssDatabases()` installe le certificat dans les bases de données NSS de chaque utilisateur lorsque `certutil` est disponible : `~/.pki/nssdb`, `~/snap/chromium/.../nssdb`, tous les profils Firefox (y compris snap), sous le surnom **`OmniRoute MITM Root CA`**.

### macOS / Windows

- **macOS :** `security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain`
- **Windows :** PowerShell avec élévation de privilèges → `certutil -addstore Root`

### Authentification

Tous les points de terminaison MITM nécessitent une authentification de gestion (`requireCliToolsAuth`). Le mot de passe sudo est mis en cache dans la portée du module (jamais dans `globalThis`) et effacé lors de l’appel à `stopMitm()`.

---

## Remplacements du User-Agent — variables d’environnement (section 12 de `.env.example`)

| Variable                 | Valeur par défaut                                               |
| ------------------------ | --------------------------------------------------------------- |
| `CLAUDE_USER_AGENT`      | `claude-cli/2.1.258 (external, cli)`                            |
| `CODEX_USER_AGENT`       | `codex-cli/0.149.0 (Windows 10.0.26200; x64)`                   |
| `GITHUB_USER_AGENT`      | `GitHubCopilotChat/0.54.0`                                      |
| `ANTIGRAVITY_USER_AGENT` | `antigravity/2.0.1 linux/arm64 google-api-nodejs-client/10.3.0` |
| `KIRO_USER_AGENT`        | `AWS-SDK-JS/3.0.0 kiro-ide/1.0.0`                               |
| `QODER_USER_AGENT`       | `Qoder-Cli`                                                     |
| `CURSOR_USER_AGENT`      | `Cursor/3.4`                                                    |

Utilisées par `open-sse/executors/base.ts::buildHeaders()` via une recherche dynamique. **Mettez-les à jour lorsque les fournisseurs publient de nouvelles versions de leurs CLI** — les chaînes UA obsolètes finissent par être rejetées comme provenant de clients trop anciens.

## Options du mode de compatibilité CLI (section 13 de `.env.example`)

| Variable                   | Effet                                |
| -------------------------- | ------------------------------------ |
| `CLI_COMPAT_CODEX=1`       | Empreinte Codex                      |
| `CLI_COMPAT_CLAUDE=1`      | Empreinte claude-cli                 |
| `CLI_COMPAT_GITHUB=1`      | Empreinte GitHub Copilot Chat        |
| `CLI_COMPAT_ANTIGRAVITY=1` | Empreinte Antigravity                |
| `CLI_COMPAT_KIRO=1`        | Kiro                                 |
| `CLI_COMPAT_CURSOR=1`      | Cursor                               |
| `CLI_COMPAT_KIMI_CODING=1` | Kimi Coding                          |
| `CLI_COMPAT_KILOCODE=1`    | KiloCode                             |
| `CLI_COMPAT_CLINE=1`       | Cline                                |
| `CLI_COMPAT_ALL=1`         | Activer toutes les options ci-dessus |

L’adresse IP du fournisseur est **toujours préservée** — l’option ne fait que remodeler l’apparence de la requête sur le réseau ; elle ne modifie pas l’adresse IP de sortie.

---

## Nettoyage des en-têtes entrants

OmniRoute nettoie les en-têtes entrants du client avant leur transfert afin qu’une requête provenant de Cursor ne divulgue pas `User-Agent: Cursor/X.Y.Z` à un serveur Claude en amont. Consultez `src/shared/constants/upstreamHeaders.ts` pour la liste de blocage, maintenue en parfaite synchronisation avec les schémas Zod et les tests unitaires.

---

## Mise à jour des empreintes lorsqu’un fournisseur les modifie

1. Capturer le trafic du CLI officiel avec `mitmproxy` (interception TLS + vidage)
2. Extraire JA3/JA4 et l’ordre littéral des en-têtes
3. Mettre à jour l’entrée `CLI_FINGERPRINTS[...]` concernée
4. Mettre à jour la valeur par défaut `*_USER_AGENT` correspondante dans `.env.example`
5. Si la négociation TLS elle-même a changé, mettre à jour le wrapper du fournisseur concerné ou l’option `browser:` de wreq-js
6. Exécuter les tests TLS propres au fournisseur et un test canari manuel sur le fournisseur en production
7. Publier dans une version corrective et consigner le changement dans `CHANGELOG.md`

---

## Tests

- `open-sse/services/__tests__/claudeTlsClient.test.ts` — comportement du wrapper TLS partagé
- `tests/unit/anthropic-cache-fingerprint.test.ts` — déterminisme des empreintes
- `tests/unit/chatgpt-web-source-retirement.test.ts` — la source furtive commune de ChatGPT Web reste absente, tandis que Codex Web reste présente

---

## Voir aussi

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ce qui se passe lorsqu’un chemin furtif reçoit une réponse `403`
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md)
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — référence complète des variables d’environnement
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — vue opérateur du workflow MITM
