# AgentBridge (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENTBRIDGE.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENTBRIDGE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENTBRIDGE.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENTBRIDGE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENTBRIDGE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENTBRIDGE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENTBRIDGE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENTBRIDGE.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENTBRIDGE.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENTBRIDGE.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENTBRIDGE.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENTBRIDGE.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENTBRIDGE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENTBRIDGE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENTBRIDGE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENTBRIDGE.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENTBRIDGE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENTBRIDGE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENTBRIDGE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENTBRIDGE.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENTBRIDGE.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENTBRIDGE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENTBRIDGE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENTBRIDGE.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENTBRIDGE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENTBRIDGE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENTBRIDGE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENTBRIDGE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENTBRIDGE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENTBRIDGE.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENTBRIDGE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENTBRIDGE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENTBRIDGE.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENTBRIDGE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENTBRIDGE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENTBRIDGE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENTBRIDGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENTBRIDGE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENTBRIDGE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENTBRIDGE.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENTBRIDGE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENTBRIDGE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENTBRIDGE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENTBRIDGE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENTBRIDGE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENTBRIDGE.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENTBRIDGE.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENTBRIDGE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENTBRIDGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENTBRIDGE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENTBRIDGE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENTBRIDGE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENTBRIDGE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENTBRIDGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENTBRIDGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENTBRIDGE.md)

---

AgentBridge est le proxy MITM (Man-in-the-Middle, ou « homme du milieu ») d’OmniRoute qui intercepte le trafic HTTPS des agents d’IA intégrés aux IDE et le réachemine via le moteur de routage unifié d’OmniRoute. Il prend en charge **10 agents d’IDE** — Antigravity, Kiro, GitHub Copilot, GHE Copilot, OpenAI Codex, Cursor, Zed, Claude Code, Open Code et Trae (en cours d’étude) — ce qui fait d’OmniRoute le proxy MITM offrant la couverture la plus étendue du marché pour les assistants de programmation basés sur l’IA.

**Emplacement du tableau de bord :** `/dashboard/tools/agent-bridge`
**Groupe de la barre latérale :** Outils (après Agents cloud)
**Voir aussi :** [`TRAFFIC_INSPECTOR.md`](./TRAFFIC_INSPECTOR.md) — surveillez en temps réel l’ensemble du trafic intercepté ; `docs/security/MITM-TPROXY-DECRYPT.md` (git ; non intégré à `/docs`) — le mode de capture Linux TPROXY avec déchiffrement transparent, piloté par la route `/api/tools/agent-bridge/tproxy`.

---

## §1 Vue d’ensemble

### Qu’est-ce qu’AgentBridge ?

Lorsqu’un agent d’IDE (par exemple GitHub Copilot, Cursor ou Claude Code) effectue un appel d’API, il se connecte directement au fournisseur d’IA en amont (OpenAI, Anthropic, etc.). AgentBridge intercepte cette connexion de manière transparente au niveau TLS — sans nécessiter la moindre modification de la configuration de l’agent — et réécrit la requête afin qu’elle transite par OmniRoute.

Vous pouvez ainsi :

- **Réacheminer n’importe quel agent vers n’importe quel fournisseur** : Copilot communique avec OpenAI ? Redirigez-le vers Anthropic Claude, Gemini ou l’un des 352 fournisseurs d’OmniRoute.
- **Appliquer des correspondances de modèles** : `gemini-3-flash` → `claude-sonnet-4.7` de manière transparente au niveau du gestionnaire.
- **Observer l’ensemble du trafic des agents** : chaque requête interceptée est publiée dans l’[Inspecteur de trafic](./TRAFFIC_INSPECTOR.md).
- **Appliquer les mécanismes de résilience d’OmniRoute** : le routage combiné, les disjoncteurs, les solutions de repli et le suivi des coûts fonctionnent également pour le trafic des agents d’IDE.

### Positionnement par rapport au marché

| Fonctionnalité                          | 9router | anti-api | llm-interceptor | **OmniRoute AgentBridge** |
| --------------------------------------- | :-----: | :------: | :-------------: | :-----------------------: |
| Antigravity                             |    ✓    |    ✓     |        —        |             ✓             |
| GitHub Copilot                          |    ✓    |    ✓     |        —        |             ✓             |
| Kiro (AWS)                              |    ✓    |    ✓     |        —        |             ✓             |
| OpenAI Codex                            |    —    |    ✓     |        —        |             ✓             |
| Cursor IDE                              |    ✓    |    ✓     |        —        |             ✓             |
| Zed Industries                          |    —    |    ✓     |        —        |             ✓             |
| Claude Code                             |    —    |    —     |        ✓        |             ✓             |
| Open Code                               |    —    |    —     |        ✓        |             ✓             |
| Trae                                    |    —    |    —     |        —        |    🔍 En cours d’étude    |
| Interface du tableau de bord            |    ✓    |    ✗     |        ✗        |             ✓             |
| Inspecteur de trafic                    |    ✗    |    ✗     |        ✓        |             ✓             |
| Routage OmniRoute                       |    ✗    |    ✗     |        ✗        |             ✓             |
| Interface de correspondance des modèles |    ✗    |    ✗     |        ✗        |             ✓             |
| Liste d’exclusion                       |    ✗    |    ✗     |        ✓        |             ✓             |
| Certificat de l’AC en amont             |    ✗    |    ✗     |        ✓        |             ✓             |

---

## §2 Architecture

### 2.1 Vue d’ensemble des composants

```
Agent IDE (VS Code / Cursor / etc.)
    │  HTTPS (port 443)
    ▼
/etc/hosts — 127.0.0.1 api.githubcopilot.com   ← redirection DNS
    │
    ▼
src/mitm/server.cjs  (port 443, processus enfant CJS)
    │  résout la cible selon le SNI de l’en-tête Host
    │  génère un certificat TLS propre à chaque SNI, signé par l’AC AgentBridge
    ├── Correspondance avec la liste de contournement ? → transfert TCP direct (sans déchiffrement)
    ├── Correspondance avec une cible ? → fetch → routeur OmniRoute (port 20128)
    │       └── handler.intercept() — TypeScript
    │               ├── maskSecrets() sur le corps/les en-têtes de la requête
    │               ├── TrafficBuffer.push() — publie dans l’Inspecteur de trafic
    │               └── fetchRouter() → /v1/chat/completions
    └── Aucune correspondance ? → transfert TCP direct (sans déchiffrement)
```

### 2.2 Serveur MITM (`src/mitm/server.cjs`)

Le serveur MITM principal s’exécute en tant que processus enfant CJS Node.js (afin d’éviter de réécrire la base de code CJS existante). Il :

- Écoute sur le port 443 (nécessite des privilèges ou `authbind`/`setcap`)
- Reçoit les tunnels CONNECT du système d’exploitation (via la redirection DNS de `/etc/hosts`)
- Génère des certificats TLS propres à chaque SNI, signés par l’AC AgentBridge (`DATA_DIR/mitm/ca.crt`)
- Résout l’agent cible selon l’en-tête Host via le registre `targets/index.ts`
- Transmet les requêtes à la couche de gestionnaires TypeScript par HTTP vers `http://127.0.0.1:20128`

`TARGET_HOSTS` est chargé depuis `DATA_DIR/mitm/targets.json` (écrit par `targets/index.ts` au démarrage), ce qui permet des mises à jour dynamiques sans redémarrer le serveur CJS.

> **Modèle d’AC racine (#6684).** La description ci-dessus, dans laquelle un certificat propre à chaque SNI est signé par une AC,
> correspond au modèle d’AC racine persistante ajouté dans #6684 (`src/mitm/cert/rootCa.ts` +
> `src/mitm/_internal/rootCaShim.cjs`, réutilisant les mécanismes cryptographiques d’AC/de certificat terminal déjà
> éprouvés pour TPROXY dans `src/mitm/tproxy/dynamicCert.ts`) — il remplace l’ancien
> certificat terminal autosigné statique unique (`src/mitm/cert/generate.ts`, toujours
> limité aux seuls hôtes antigravity) qu’indique la présence d’une simple paire
> `server.crt`/`server.key` sur le disque. **Comportement de migration** : une nouvelle installation (sans
> `server.crt` préexistant) utilise automatiquement le modèle d’AC racine ; une installation qui faisait déjà
> confiance à l’ancien certificat terminal statique continue de l’utiliser jusqu’à ce que l’opérateur définisse
> `MITM_ROOT_CA_ENABLED=true` et redémarre le bridge (`src/mitm/cert/migration.ts`
> est la fonction de décision pure — une AC MITM approuvée capable de signer un certificat terminal pour
> **n’importe quel** hôte est nettement plus puissante que l’ancien certificat terminal à SAN fixes, de sorte que le
> basculement n’est jamais silencieux pour une installation qui lui faisait déjà confiance). Le certificat d’AC est installé
> dans le même emplacement `omniroute-mitm.crt` du magasin de confiance que celui utilisé par l’ancien certificat terminal
> (`cert/install.ts::installCaCert`) — aucun nettoyage lié à une double approbation n’est nécessaire.

### 2.3 Gestionnaire de base (`src/mitm/handlers/base.ts`)

Tous les gestionnaires d’agents étendent `MitmHandlerBase` :

```ts
export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void>;

  // Assistants protégés : fetchRouter, pipeSSE, hookBufferStart, hookBufferUpdate
}
```

Chaque gestionnaire appelle `hookBufferStart()` avant la transmission par proxy et `hookBufferUpdate()` une fois l’opération terminée. Ces appels ajoutent des entrées `InterceptedRequest` à `globalTrafficBuffer` (voir [Inspecteur de trafic](./TRAFFIC_INSPECTOR.md) §4).

### 2.4 Registre des cibles (`src/mitm/targets/`)

Chaque agent dispose d’un fichier de cible déclaratif :

```ts
// src/mitm/targets/copilot.ts
export const COPILOT_TARGET: MitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  hosts: ["api.githubcopilot.com", "copilot-proxy.githubusercontent.com"],
  port: 443,
  endpointPatterns: ["/chat/completions", "/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  handler: () => import("../handlers/copilot"),
  riskNoticeKey: "providers.riskNotice.oauth",
};
```

Le registre (`targets/index.ts`) exporte `ALL_TARGETS` et génère `DATA_DIR/mitm/targets.json` au démarrage.

### 2.5 Transfert direct et liste de contournement (`src/mitm/passthrough.ts`)

**Liste de contournement** (vérifiée en premier, avec priorité sur la correspondance avec une cible) :

- Motifs par défaut : hôtes bancaires, `.gov.`, fournisseurs OAuth/SSO (Okta, Auth0), etc.
- Motifs utilisateur : stockés dans la table de base de données `agent_bridge_bypass`
- Les hôtes contournés bénéficient d’un tunnel TCP transparent — le trafic TLS n’est **jamais déchiffré**

**Transfert direct par défaut** (aucune correspondance avec une cible et hôte absent de la liste de contournement) :

- Bénéficie également d’un tunnel TCP — les connexions ne sont jamais interrompues
- Empêche AgentBridge de perturber le trafic HTTPS général du système

Ordre de priorité du routage :

```
liste de contournement → correspondance avec une cible → transfert direct
```

### 2.6 Certificat d’AC en amont (`src/mitm/upstreamTrust.ts`)

Pour les environnements réseau d’entreprise utilisant une AC personnalisée :

```bash
AGENTBRIDGE_UPSTREAM_CA_CERT=/path/to/corporate-ca.pem
```

Lorsque cette variable est définie, elle configure le répartiteur global d’`undici` avec le certificat d’AC supplémentaire, ce qui permet à AgentBridge d’atteindre les fournisseurs en amont via les proxys d’entreprise assurant la terminaison TLS.

### 2.7 Masquage des secrets (`src/mitm/maskSecrets.ts`)

Le scanner indépendant développé en salle blanche est appliqué aux corps des requêtes et aux en-têtes contenant des identifiants
**avant** qu’ils n’entrent dans le tampon de l’Inspecteur de trafic ou dans un quelconque journal. Il effectue un seul parcours linéaire :

- Jetons préfixés par `sk-` / `ak-` / `pk-` (de type OpenAI/Anthropic)
- Identifiants RFC 6750 `Authorization: Bearer <token>`, avec priorité au jeton entier
- Jetons opaques longs génériques (≥40 caractères), y compris les formes contenant des points ou du remplissage

`sanitizeHeaders()` convertit en minuscules les noms conservés, concatène les valeurs de tableaux de manière déterministe, supprime la
liste d’exclusion partagée des en-têtes saut par saut/de cadrage (y compris l’authentification du proxy), masque entièrement `cookie` et
`set-cookie`, et délègue au scanner le traitement des valeurs d’identifiants.

---

## §3 Configuration

### 3.1 Démarrer/arrêter le serveur MITM

Utilisez la carte AgentBridge Server à l’adresse `/dashboard/tools/agent-bridge` :

| Action                        | Description                                                                                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Démarrer le serveur           | Lance `src/mitm/server.cjs` sur le port 443                                                                 |
| Arrêter le serveur            | Arrête proprement le processus enfant                                                                       |
| Redémarrer le serveur         | Arrête puis redémarre le serveur (prend en compte les modifications apportées aux cibles)                   |
| Faire confiance au certificat | Installe `DATA_DIR/mitm/ca.crt` dans le magasin de certificats de confiance du système d’exploitation       |
| Télécharger le certificat     | Télécharge `ca.crt` pour une installation manuelle                                                          |
| Régénérer le certificat       | Crée une nouvelle paire de clés d’AC (tous les certificats existants propres à chaque agent sont invalidés) |

### 3.2 Faire confiance au certificat

Le certificat de l’AC AgentBridge doit être approuvé par le système d’exploitation avant que les IDE puissent accepter la connexion MITM.

**Linux (NSS — Chrome/Firefox) :**

```bash
certutil -A -d sql:$HOME/.pki/nssdb -n "OmniRoute AgentBridge" -t CT,, -i ~/.omniroute/mitm/ca.crt
```

**macOS (Trousseau) :**

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain ~/.omniroute/mitm/ca.crt
```

**Windows (certmgr) :**

```powershell
certutil -addstore -f Root $env:USERPROFILE\.omniroute\mitm\ca.crt
```

Vous pouvez également utiliser le bouton « Trust Cert » dans le tableau de bord (il exécute la commande appropriée pour votre système d’exploitation, avec une demande sudo si nécessaire).

#### Les IDE basés sur Electron ignorent le magasin de certificats de confiance du système d’exploitation (`NODE_EXTRA_CA_CERTS`)

Certains IDE — notamment **Antigravity IDE**, ainsi que d’autres applications Electron ou dérivées de VS Code — embarquent
leur propre environnement d’exécution Node.js, qui **ne consulte pas le magasin de certificats de confiance du système d’exploitation** pour les requêtes
`fetch`/HTTPS sortantes. Faire confiance à l’AC au niveau du système d’exploitation/NSS suffit pour le **backend** natif
de l’IDE (par exemple, un serveur de langage Go qui utilise l’ensemble d’AC du système), mais le **frontend Electron**
échouera toujours lors de la connexion TLS — cela se manifeste par une _déconnexion_ de l’application ou par
l’affichage d’une _« erreur de connexion »_, même si le journal MITM indique que les appels d’amorçage du backend
renvoient `200`. Deux étapes sont nécessaires, et toutes deux sont importantes :

1. Indiquez explicitement l’AC à l’environnement d’exécution :
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/omniroute-agentbridge-ca.crt
   ```
2. **Lancez l’IDE depuis ce shell.** Un lancement depuis l’icône du bureau, le Dock ou le menu Démarrer
   **n’hérite pas** des variables exportées par le shell, et `~/.config/environment.d/*.conf` ne s’applique qu’après
   une nouvelle ouverture de session graphique. Quittez d’abord complètement l’IDE — le verrou d’instance unique
   d’Electron signifie qu’un second lancement se contente d’afficher le processus existant et que le nouvel environnement est ignoré.

L’approbation par le système d’exploitation et l’étape NSS ci-dessus restent nécessaires (la pile réseau Chromium utilisée par certains flux
d’authentification consulte le magasin NSS propre à l’utilisateur et possède ses propres épingles statiques pour `*.googleapis.com`,
qu’une AC approuvée localement remplace). `NODE_EXTRA_CA_CERTS` couvre en complément le chemin `fetch` de Node.

### 3.3 Routage DNS

Pour chaque agent que vous souhaitez intercepter, ses hôtes d’API doivent être résolus vers `127.0.0.1`. AgentBridge gère automatiquement les entrées `/etc/hosts` lorsque vous activez ou désactivez le DNS d’un agent dans l’assistant de configuration.

Exemples d’entrées `/etc/hosts` pour GitHub Copilot :

```
127.0.0.1 api.githubcopilot.com
127.0.0.1 copilot-proxy.githubusercontent.com
```

### 3.4 Mappage des modèles

Utilisez le tableau de mappage des modèles dans la carte de chaque agent afin de définir les mappages source → cible :

| Modèle source (natif de l’agent) | Modèle cible (OmniRoute) |
| -------------------------------- | ------------------------ |
| `gpt-4o`                         | `claude-sonnet-4.7`      |
| `*` (caractère générique)        | `claude-haiku-4.7`       |

Le caractère générique `*` associe tout modèle non reconnu à la cible indiquée. Les mappages sont conservés dans la table `agent_bridge_mappings`.

> **Conseil — identifiez les véritables identifiants de modèle de l’agent.** Un IDE peut envoyer des noms de modèles qui diffèrent
> des libellés de son interface utilisateur et qui changent entre les versions majeures. Par exemple, **Antigravity 2** envoie
> `gemini-3.1-pro-low`, `gemini-pro-agent` et `gemini-3.1-flash-lite` sur le réseau — et non
> le modèle `gemini-2.5-pro` indiqué dans l’ancienne documentation. Envoyez un message sans qu’aucun mappage correspondant soit configuré : le MITM
> consigne la valeur exacte du champ `model:` entrant et transmet la requête. Mappez cette valeur littérale ; la requête
> suivante sera alors interceptée et routée vers votre cible.

### 3.5 Avis relatif aux risques

AgentBridge intercepte les identifiants (jetons OAuth, clés d’API) que l’IDE utilise pour s’authentifier auprès des fournisseurs en amont. Ceux-ci sont **masqués avant leur journalisation** (voir §2.7), mais restent visibles par la couche MITM d’OmniRoute. Lors de la première activation de chaque agent, une fenêtre modale d’avertissement relatif aux risques pouvant être fermée s’affiche.

### 3.6 Maintenance et diagnostics

Le tableau de bord contient une carte **Maintenance et diagnostics** (`AgentBridgeMaintenanceCard`, dans `src/app/(dashboard)/dashboard/tools/agent-bridge/components/`) qui présente les routes MITM opérationnelles qui ne disposaient auparavant d’aucune interface utilisateur. Son sous-titre est : _« Testez automatiquement le pipeline de capture, annulez l’état système résiduel et transférez votre configuration d’une machine à une autre. »_ Les fonctions auxiliaires clientes de la carte se trouvent dans `src/lib/inspector/agentBridgeMaintenanceApi.ts`.

| Bouton                  | Route                                  | Fonction                                                                                                                                                                                                                                            |
| ----------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Diagnostiquer**       | `GET /api/tools/agent-bridge/diagnose` | Exécute l’autotest du pipeline de capture et affiche un rapport pour chaque vérification (✓/✗ + conseil de résolution).                                                                                                                             |
| **Réparer**             | `POST /api/tools/agent-bridge/repair`  | Annule l’état système MITM orphelin (entrées d’usurpation DNS, AC racine, proxy système) laissé par un plantage ou SIGKILL. Idempotent — indique « Rien à réparer » lorsque l’état est propre.                                                      |
| **Supprimer l’AC**      | `DELETE /api/tools/agent-bridge/cert`  | Révoque la confiance et supprime l’AC racine MITM du magasin de confiance du système d’exploitation (explicite, idempotent). Affiché uniquement lorsque l’AC est actuellement approuvée ; nécessite une confirmation intégrée « Supprimer l’AC ? ». |
| **Exporter la config.** | `GET /api/tools/agent-bridge/config`   | Télécharge la configuration JSON portable (voir §3.7).                                                                                                                                                                                              |
| **Importer la config.** | `POST /api/tools/agent-bridge/config`  | Téléverse une configuration JSON précédemment exportée (voir §3.7).                                                                                                                                                                                 |

**Vérifications de diagnostic** (`summarizeDiagnostics()` dans `src/mitm/inspector/diagnostics.ts`). La route exécute la sonde avec effets pour chacune d’elles et transmet les valeurs booléennes au récapitulateur pur ; un verdict `healthy` unique ainsi qu’un conseil pour chaque échec sont renvoyés :

| Nom de la vérification | Ce qu’elle vérifie                                                                | Conseil en cas d’échec                                                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `server-running`       | Le processus du serveur MITM est actif                                            | « Le serveur MITM n’est pas en cours d’exécution. Démarrez-le depuis l’onglet AgentBridge. »                                                                                             |
| `server-reachable`     | Le serveur MITM accepte les connexions sur son port (sonde TCP)                   | « Le serveur MITM n’accepte pas les connexions sur son port. Vérifiez que le port est libre et que vous disposez des privilèges nécessaires pour vous y lier. »                          |
| `cert-exists`          | Le certificat MITM a été généré sur le disque                                     | « Aucun certificat MITM n’a encore été généré. Générez-en un depuis l’onglet AgentBridge. »                                                                                              |
| `cert-trusted`         | L’AC racine MITM se trouve dans le magasin de confiance du système d’exploitation | « L’AC racine MITM n’est pas approuvée par le magasin du système d’exploitation ; l’interception TLS échouera donc. Approuvez le certificat depuis l’onglet AgentBridge. »               |
| `dns-configured`       | Les noms d’hôtes cibles sont usurpés dans `/etc/hosts`                            | « Les noms d’hôtes cibles ne sont pas usurpés dans /etc/hosts ; le trafic n’atteint donc jamais le proxy. Activez le DNS pour le ou les agents dont vous souhaitez capturer le trafic. » |

**Bannière d’état orphelin :** lorsque la page détecte un état laissé par un plantage (usurpation DNS / AC / proxy système), la carte affiche une bannière orange — _« Une session précédente a laissé un état système résiduel (usurpation DNS, AC ou proxy système). Exécutez Réparer pour le nettoyer. »_ — et met en évidence le bouton **Réparer**. `Repair` est l’équivalent, au niveau de l’application, de l’option `--cleanup` de ProxyBridge (il délègue à `repairMitm()` dans `src/mitm/manager.ts`).

> L’AC racine MITM reste installée entre les arrêts et les démarrages afin d’éviter
> les demandes sudo répétées (le même comportement que mitmproxy/Charles) ; sa suppression constitue donc une action
> **Supprimer l’AC** explicite plutôt qu’une opération effectuée automatiquement lors de l’arrêt.

### 3.7 Importation/exportation d’une configuration portable

AgentBridge peut sérialiser l’état **réglable par l’opérateur** dans un objet JSON versionné afin qu’une configuration puisse être reproduite sur plusieurs machines. Le sérialiseur est `src/lib/inspector/configPortability.ts` (`exportConfig()` / `importConfig()`), validé par `AgentBridgeConfigSchema`.

L’exportation comprend exactement trois éléments (les valeurs par défaut intégrées ne sont volontairement **PAS** exportées, afin que l’importation ne les duplique jamais et n’entre pas en conflit avec elles) :

| Champ            | Source                                                                    | Remarques                                                                     |
| ---------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `bypassPatterns` | motifs de contournement définis par l’utilisateur (`agent_bridge_bypass`) | les motifs bank/gov/okta par défaut sont exclus                               |
| `customHosts`    | hôtes personnalisés de l’Inspecteur de trafic (`inspector_custom_hosts`)  | chacun : `{ host, kind: "llm"\|"app"\|"custom", label? }`                     |
| `agentMappings`  | mappages de modèles par agent (`agent_bridge_mappings`)                   | `{ [agentId]: [{ source, target }] }` pour chaque agent disposant de mappages |

```jsonc
// GET /api/tools/agent-bridge/config
{
  "version": 1,
  "bypassPatterns": ["*.internal.example.com"],
  "customHosts": [{ "host": "api.example.com", "kind": "llm", "label": null }],
  "agentMappings": {
    "copilot": [{ "source": "gpt-4o", "target": "claude-sonnet-4.7" }],
  },
}
```

**Comportement de l’importation** (`POST /api/tools/agent-bridge/config`) : les motifs de contournement et les mappages par agent sont **entièrement remplacés** ; les hôtes personnalisés sont ajoutés de manière **idempotente** (`INSERT OR IGNORE`). La réponse indique combien d’éléments de chaque type ont été appliqués :

```jsonc
{ "ok": true, "bypassPatterns": 1, "customHosts": 1, "agents": 1 }
```

Ce qui ne figure **PAS** dans la configuration : l’état d’exécution du serveur, les chemins des certificats, l’état DNS de chaque agent, le chemin de l’autorité de certification en amont et les paramètres TPROXY — il s’agit de l’état de l’hôte ou de l’environnement d’exécution, et non de préférences portables.

---

## §4 Référence par agent

| #   | Agent              | Statut              | Hôtes interceptés                                                  | Type d’authentification |
| --- | ------------------ | ------------------- | ------------------------------------------------------------------ | ----------------------- |
| 1   | **Antigravity**    | ✅ Pris en charge   | `daily-cloudcode-pa.googleapis.com`, `cloudcode-pa.googleapis.com` | OAuth Firebase          |
| 2   | **Kiro (AWS)**     | ✅ Pris en charge   | `prod.kiro.aws`, `dev.kiro.aws`                                    | AWS SigV4               |
| 3   | **GitHub Copilot** | ✅ Pris en charge   | `api.githubcopilot.com`, `copilot-proxy.githubusercontent.com`     | OAuth GitHub            |
| 4   | **OpenAI Codex**   | ✅ Pris en charge   | `api.openai.com` (chemins Codex), `chatgpt.com`                    | Clé OpenAI              |
| 5   | **Cursor IDE**     | ✅ Pris en charge   | `api2.cursor.sh`, `api.cursor.sh`                                  | OAuth Cursor            |
| 6   | **Zed Industries** | ✅ Pris en charge   | `api.zed.dev`, `llm.zed.dev`                                       | OAuth Zed               |
| 7   | **Claude Code**    | ✅ Pris en charge   | `api.anthropic.com` (sur inscription)                              | Clé Anthropic           |
| 8   | **Open Code**      | ✅ Pris en charge   | `openrouter.ai`, `api.openai.com` (chemins zen)                    | Clé API                 |
| 9   | **Trae**           | 🔍 En cours d’étude | À déterminer — voir §8                                             | À déterminer            |

### Étapes de l’assistant de configuration (par agent)

Chaque fiche d’agent comporte un assistant de configuration en 3 étapes :

1. **Vérifier les prérequis** — Le serveur fonctionne-t-il ? Le certificat est-il approuvé ? L’IDE est-il installé (détection automatique) ?
2. **Activer le DNS** — Ajoute des entrées dans `/etc/hosts` (nécessite sudo). Affiche exactement les lignes qui seront ajoutées.
3. **Mapper les modèles** — Table facultative de mappage des modèles. Les caractères génériques sont acceptés.

### Détection des agents

Pour les agents 1 à 8, AgentBridge tente de détecter automatiquement l’installation de l’IDE :

```ts
export async function detectAgent(agentId: AgentId): Promise<DetectionResult>;
// Renvoie : { installed: boolean, version?: string, path?: string }
```

La détection utilise des chemins propres au système d’exploitation et des vérifications de binaires (par exemple, `code --list-extensions | grep github.copilot` pour Copilot, `~/.config/antigravity/` pour Antigravity).

---

## §5 Sécurité

### Règles strictes appliquées

| Règle                                            | Application                                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`                   | Toutes les erreurs des gestionnaires sont nettoyées avant d’être incluses dans une réponse ou un tampon                   |
| **#13** Transmission de l’environnement au shell | Les modifications de `/etc/hosts` utilisent l’option `env` — aucune interpolation de chaînes pour les chemins             |
| **#15 + #17** `isLocalOnlyPath()`                | `/api/tools/agent-bridge/` est LOCAL_ONLY + SPAWN_CAPABLE — l’accès par boucle locale est imposé avant l’authentification |

### Liste de contournement pour les hôtes sensibles

La liste de contournement garantit que les établissements financiers, les fournisseurs OAuth/SSO et les autres hôtes sensibles ne sont **jamais déchiffrés**. Leur trafic TLS transite sous forme de tunnel TCP transparent — OmniRoute n’accède jamais au texte en clair.

Les motifs de contournement par défaut comprennent :

- `*.bank.*`, `*.gov.*` (finance/administration publique)
- `*.okta.com`, `*.auth0.com`, `*.microsoft.com` (SSO/identité)
- `*.apple.com`, `*.icloud.com` (services système Apple)

Les motifs de contournement ajoutés par l’utilisateur sont stockés dans la table `agent_bridge_bypass` et prévalent sur toutes les autres règles.

### Masquage des secrets

La fonction `maskSecrets()` de `src/mitm/maskSecrets.ts` est appliquée :

- À chaque corps de requête avant `TrafficBuffer.push()`
- À chaque en-tête avant sa journalisation ou sa diffusion

Motifs : jetons comportant les préfixes `sk-`/`ak-`/`pk-`, jetons `Bearer` et jetons génériques d’au moins 40 caractères.

### Certificat d’AC en amont

Lorsque `AGENTBRIDGE_UPSTREAM_CA_CERT` est défini, le fichier est lu au démarrage. Si le chemin existe, mais que le fichier est illisible, AgentBridge journalise une erreur explicite et refuse de démarrer (afin d’éviter les défaillances TLS silencieuses dans les environnements d’entreprise).

### Limitations connues

- **Le port 443 nécessite des privilèges** : sous Linux, AgentBridge nécessite l’application de `setcap 'cap_net_bind_service=+ep'` au binaire Node, ou doit être exécuté via `authbind`. L’assistant de configuration affiche des instructions propres au système d’exploitation.
- **Le redémarrage de l’IDE est requis** : après la redirection DNS, l’IDE doit être redémarré afin que la nouvelle résolution d’hôte prenne effet.
- **Jetons OAuth codés en dur** : certains agents (Kiro, Antigravity) stockent localement les jetons d’actualisation OAuth. Ceux-ci sont transparents pour AgentBridge — il voit le jeton Bearer dans chaque requête, lequel est masqué avant la journalisation.
- **Les interfaces Electron nécessitent `NODE_EXTRA_CA_CERTS`** : les IDE dont l’interface s’exécute dans un environnement d’exécution Node/Electron intégré ignorent le magasin de confiance du système d’exploitation/NSS et doivent être lancés depuis un shell dans lequel `NODE_EXTRA_CA_CERTS` est défini (voir §3.2). Symptôme en cas d’absence : le backend de l’IDE s’authentifie (le MITM affiche des réponses `200`), mais l’interface reste déconnectée.
- **Les installations multiples d’un même IDE sont indépendantes** : une installation système (par exemple `/usr/share/antigravity/antigravity`) et une installation « Full » locale à l’utilisateur (par exemple `~/AntigravityIDE_Full/antigravity-ide`) sont des processus distincts dotés de leurs propres environnements d’exécution — chacun doit être relancé avec l’AC injectée. Identifiez l’installation en cours d’exécution grâce au chemin de son binaire avant de la relancer.
- **L’identité est définie par le prompt système de l’agent, et non par le modèle routé** : lorsque vous remappez le modèle d’un agent vers un autre fournisseur, la réponse continue de revendiquer l’identité native de l’agent (par exemple, Antigravity répond « Je fonctionne grâce à Gemini »), car l’IDE l’injecte dans le prompt système. Vérifiez le backend réel dans `call_logs` / `proxy_logs` (`provider`, `model`, `target_format`), plutôt qu’en demandant au modèle qui il est.

---

## §6 Dépannage

### Conflit sur le port 443

Si un autre processus écoute déjà sur le port 443 (serveur web, VPN, etc.) :

```bash
lsof -i :443          # trouver le processus
sudo fuser -k 443/tcp  # forcer son arrêt (à utiliser avec précaution)
```

Vous pouvez également configurer un port non privilégié dans les paramètres d’AgentBridge et mettre en place des règles de redirection `iptables` / `pf`.

### Certificat non approuvé

Si l’IDE affiche des erreurs TLS après le démarrage d’AgentBridge :

1. Vérifiez que le certificat a été installé : `security find-certificate -c "OmniRoute AgentBridge"` (macOS) ou `certutil -L -d sql:$HOME/.pki/nssdb` (Linux/NSS)
2. Certaines applications utilisent leur propre magasin de certificats de confiance (Firefox, Chrome sous Linux). Exécutez de nouveau « Trust Cert » et vérifiez le magasin de certificats propre à NSS/Firefox.
3. Redémarrez l’IDE après avoir approuvé le certificat — les sessions TLS en cours utilisent l’ancien état de confiance.

### IDE déconnecté / « erreur de connexion » malgré une AC approuvée

Symptôme : après avoir redirigé le DNS et approuvé l’AC, un IDE basé sur Electron (par exemple Antigravity)
s’ouvre **déconnecté** ou affiche une erreur d’authentification/de connexion, alors que le journal MITM indique que les
appels d’amorçage (`loadCodeAssist`, `fetchAvailableModels`, …) renvoient `200`.

Cause : l’environnement d’exécution **Node/Electron intégré de l’IDE ignore le magasin de certificats de confiance du système d’exploitation**. Le
backend natif (un serveur de langage Go) fait confiance à l’AC du système d’exploitation et s’authentifie, mais pas le frontend Electron
— l’interface utilisateur considère donc qu’elle est hors ligne.

Solution (les deux étapes) : exportez `NODE_EXTRA_CA_CERTS=<ca.crt>` **et relancez l’IDE depuis ce
shell**, et non depuis l’icône du bureau. Quittez d’abord complètement l’IDE — en raison du verrou d’instance unique d’Electron,
un deuxième lancement ne fait que remettre au premier plan le processus existant et le nouvel environnement est ignoré. Voir §3.2.
Cela correspond à un rapport amont ouvert dans lequel un agent autonome fonctionne via un MITM, tandis que la variante IDE
échoue avec la même configuration.

### DNS non propagé

Vérifiez que `/etc/hosts` a été mis à jour :

```bash
grep "omniroute\|127.0.0.1.*github\|127.0.0.1.*cursor" /etc/hosts
```

Videz le cache DNS :

```bash
# macOS
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
# Linux (systemd-resolved)
sudo systemctl restart systemd-resolved
# Windows
ipconfig /flushdns
```

### IDE non détecté

La détection automatique utilise les chemins d’installation courants. Si la détection échoue alors que l’IDE est installé :

- Vérifiez si le binaire de l’IDE se trouve dans un emplacement non standard
- L’assistant de configuration fonctionne tout de même — l’échec de la détection signifie simplement que le badge n’affichera pas le chemin d’installation

### Erreurs du gestionnaire (échec de la requête en amont)

Si AgentBridge intercepte les requêtes, mais qu’elles échouent toutes :

1. Vérifiez qu’au moins un fournisseur est connecté dans `/dashboard/providers`
2. Consultez les journaux du serveur OmniRoute : `APP_LOG_LEVEL=debug` dans `.env`
3. Vérifiez que `OMNIROUTE_BASE_URL` pointe vers le bon point de terminaison du routeur (valeur par défaut : `http://127.0.0.1:20128`)

---

## §7 Référence de l’API

Toutes les routes sont `LOCAL_ONLY` (accessibles uniquement via l’interface de bouclage, restriction appliquée avant l’authentification) et `SPAWN_CAPABLE`. Voir `src/server/authz/routeGuard.ts`.

Chemin de base : `/api/tools/agent-bridge/`

| Méthode             | Chemin                                         | Description                                                                                                                          |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| GET                 | `/api/tools/agent-bridge/state`                | État global du serveur + détection/état par agent                                                                                    |
| GET                 | `/api/tools/agent-bridge/agents`               | Liste des agents enregistrés (id, nom, hôtes, viabilité, état)                                                                       |
| GET                 | `/api/tools/agent-bridge/agents/{id}`          | État d’un agent (configuration cible + détection + état stocké)                                                                      |
| PATCH               | `/api/tools/agent-bridge/agents/{id}`          | Mettre à jour `setup_completed` pour l’agent                                                                                         |
| GET                 | `/api/tools/agent-bridge/agents/{id}/detect`   | Exécuter la sonde de détection pour l’agent (`installed`, `version?`, `path?`)                                                       |
| POST                | `/api/tools/agent-bridge/agents/{id}/dns`      | Activer/désactiver le DNS pour l’agent (`{enabled: boolean}`)                                                                        |
| GET                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Mappages de modèles pour l’agent                                                                                                     |
| PUT                 | `/api/tools/agent-bridge/agents/{id}/mappings` | Remplacer les mappages de modèles                                                                                                    |
| POST                | `/api/tools/agent-bridge/server`               | Démarrer/arrêter/redémarrer le serveur (`action: "start"\|"stop"\|"restart"\|"trust-cert"\|"regenerate-cert"`)                       |
| GET                 | `/api/tools/agent-bridge/cert`                 | État du certificat (`exists`, `trusted`, `path`)                                                                                     |
| POST                | `/api/tools/agent-bridge/cert`                 | Approuver (installer) l’AC racine MITM                                                                                               |
| DELETE              | `/api/tools/agent-bridge/cert`                 | Révoquer l’approbation (supprimer) de l’AC racine MITM — idempotent (voir §3.6)                                                      |
| POST                | `/api/tools/agent-bridge/cert/regenerate`      | Régénérer le certificat MITM autosigné                                                                                               |
| GET                 | `/api/tools/agent-bridge/cert/download`        | Transmettre le certificat PEM en flux pour téléchargement                                                                            |
| GET                 | `/api/tools/agent-bridge/bypass`               | Lister les motifs de contournement (`default` + `user`)                                                                              |
| POST                | `/api/tools/agent-bridge/bypass`               | Remplacer intégralement les motifs de contournement définis par l’utilisateur                                                        |
| DELETE              | `/api/tools/agent-bridge/bypass?pattern=...`   | Supprimer un seul motif de contournement défini par l’utilisateur                                                                    |
| GET                 | `/api/tools/agent-bridge/diagnose`             | Autotest du pipeline de capture (voir §3.6)                                                                                          |
| POST                | `/api/tools/agent-bridge/repair`               | Annuler l’état système MITM orphelin (voir §3.6)                                                                                     |
| GET                 | `/api/tools/agent-bridge/config`               | Exporter la configuration JSON portable (voir §3.7)                                                                                  |
| POST                | `/api/tools/agent-bridge/config`               | Importer la configuration JSON portable (voir §3.7)                                                                                  |
| GET                 | `/api/tools/agent-bridge/upstream-ca`          | Obtenir le chemin configuré de l’AC en amont                                                                                         |
| POST                | `/api/tools/agent-bridge/upstream-ca`          | Valider + conserver le chemin de l’AC en amont                                                                                       |
| POST                | `/api/tools/agent-bridge/upstream-ca/test`     | Valider uniquement (simulation) un chemin d’AC en amont — sans le conserver                                                          |
| GET / POST / DELETE | `/api/tools/agent-bridge/tproxy`               | Mode de capture avec déchiffrement transparent TPROXY — voir `docs/security/MITM-TPROXY-DECRYPT.md` (git ; non compilé dans `/docs`) |

Schémas OpenAPI complets : `docs/openapi.yaml` → balise `AgentBridge`.

---

## §8 Feuille de route

### Étude de Trae

Trae est un assistant de programmation basé sur l’IA relativement récent. Avant d’implémenter un gestionnaire :

1. Identifier le binaire/l’extension dans les boutiques VS Code / JetBrains ou en tant qu’application autonome
2. Capturer le trafic avec mitmproxy afin de découvrir les hôtes d’API et la structure des points de terminaison
3. Déterminer le mécanisme d’authentification
4. Évaluer la décision de poursuivre ou non en fonction des conditions d’utilisation et de la facilité d’identification de l’API

Jusqu’à la fin de l’étude, la carte Trae du tableau de bord affiche un badge « En cours d’étude » avec un lien « Signaler la viabilité ». Le squelette du gestionnaire situé dans `src/mitm/handlers/trae.ts` lève une erreur structurée `Not yet implemented`.

### Agents en attente (MITM requis — aucune prise en charge d’une URL de base personnalisée)

Les outils suivants ne prennent pas en charge les URL de base personnalisées dans leurs versions actuelles, ce qui fait de MITM la seule méthode d’interception. Leur viabilité reste à évaluer :

- **Windsurf** (Codeium/Cognition)
- **Amp** (Sourcegraph)
- **Amazon Q / Kiro CLI** (AWS Bedrock — distinct de Kiro IDE)
- **Cowork** (application de bureau Anthropic)

Remarque : GitHub Copilot CLI ≥v1.0.19 prend en charge `COPILOT_PROVIDER_BASE_URL` — utilisez une configuration directe plutôt que MITM pour cet outil.
