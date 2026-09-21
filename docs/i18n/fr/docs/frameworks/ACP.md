# ACP (Agent Client Protocol) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR** : ACP permet à OmniRoute de lancer des agents CLI (comme Claude Code, Codex) en tant que processus enfants au lieu d’utiliser des API HTTP. Vous bénéficiez ainsi d’un transport « CLI comme backend ».

---

## Qu’est-ce qu’ACP ?

ACP (Agent Client Protocol) est un transport **« CLI comme backend »** pour OmniRoute. Au lieu d’intercepter les appels aux API HTTP des fournisseurs d’IA, ACP **lance des agents CLI en tant que processus enfants** et leur transmet les prompts via leur interface native.

### Pourquoi utiliser ACP ?

| Avantage                   | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| **Aucune clé API requise** | Utilise l’authentification existante de votre CLI     |
| **Protocole natif**        | Utilise le format d’entrée/sortie natif de chaque CLI |
| **Détection automatique**  | Détecte les CLI installées sur votre système          |
| **15 agents intégrés**     | Préconfiguré pour les outils CLI populaires           |
| **Agents personnalisés**   | Ajoutez vos propres outils CLI via les paramètres     |
| **Gestion des processus**  | Gère le cycle de vie (lancement, envoi, arrêt)        |

---

## Agents CLI pris en charge

ACP prend en charge **15 agents CLI intégrés** prêts à l’emploi :

| ID de l’agent | Nom d’affichage    | Binaire       | Protocole |
| ------------- | ------------------ | ------------- | --------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio     |
| `claude`      | Claude Code CLI    | `claude`      | stdio     |
| `goose`       | Goose CLI          | `goose`       | stdio     |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio     |
| `aider`       | Aider              | `aider`       | stdio     |
| `opencode`    | OpenCode           | `opencode`    | stdio     |
| `cline`       | Cline              | `cline`       | stdio     |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio     |
| `forge`       | ForgeCode          | `forge`       | stdio     |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio     |
| `interpreter` | Open Interpreter   | `interpreter` | stdio     |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio     |
| `warp`        | Warp AI            | `warp`        | stdio     |
| `gemini`      | Gemini CLI         | `gemini`      | stdio     |
| `zcode`       | ZCode              | `zcode`       | stdio     |

### Agents personnalisés

Vous pouvez ajouter vos propres agents CLI via les paramètres. Les agents personnalisés prennent en charge les mêmes fonctionnalités que les agents intégrés.

---

## Démarrage rapide

### Étape 1 : Installer un agent CLI

```bash
# Exemple : installer Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Vérifier l’installation
claude --version
```

### Étape 2 : Détection automatique par ACP

ACP détecte automatiquement les agents CLI installés sur votre système. Aucune configuration n’est nécessaire !

### Étape 3 : Utiliser le transport ACP

Une fois détecté, ACP peut être utilisé comme transport pour tout fournisseur pris en charge. OmniRoute utilisera automatiquement ACP lorsque la CLI sera disponible.

---

## Fonctionnement d’ACP

### Architecture

```
┌─────────────────┐
│  OmniRoute      │
│  (Proxy HTTP)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Processus enfant│
│  (Agent CLI)    │
│                 │
│  stdin  ◄──────┤  Envoyer le prompt
│  stdout ──────►│  Recevoir la réponse
│  stderr ──────►│  Recevoir les erreurs
└─────────────────┘
```

### Cycle de vie du processus

1. **Lancement** — ACP crée un processus enfant pour l’agent CLI
2. **Envoi** — ACP écrit les prompts dans le flux stdin du processus
3. **Réception** — ACP lit les réponses depuis stdout/stderr
4. **Détection de l’inactivité** — ACP attend 2 secondes d’inactivité avant de considérer la réponse comme terminée
5. **Arrêt** — ACP met fin au processus (SIGTERM, puis SIGKILL après 5 s)

### Protocole de communication

ACP utilise **stdio** (entrée/sortie standard) pour communiquer avec les agents CLI. Le protocole est le suivant :

1. **Envoyer le prompt** — Écrire dans stdin avec un saut de ligne
2. **Attendre la réponse** — Lire depuis stdout jusqu’à détection d’une période d’inactivité (aucune sortie pendant 2 s)
3. **Délai d’expiration** — 120 secondes par défaut (configurable)

---

## Référence de l’API

### Fonctions du registre

#### `detectInstalledAgents()`

Détecte tous les agents CLI installés sur le système. Les résultats sont mis en cache pendant 60 secondes.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Renvoie : CliAgentInfo[]

interface CliAgentInfo {
  id: string; // p. ex. « codex », « claude »
  name: string; // Nom d’affichage
  binary: string; // Nom du binaire à lancer
  versionCommand: string; // Commande de détection de la version
  version: string | null; // Version détectée (null si non installé)
  installed: boolean; // Indique si l’agent est installé
  providerAlias: string; // ID du fournisseur dans OmniRoute
  spawnArgs: string[]; // Arguments à transmettre lors du lancement
  protocol: "stdio" | "http"; // Protocole de communication
  isCustom?: boolean; // Indique s’il s’agit d’un agent personnalisé défini par l’utilisateur
}
```

#### `getAvailableAgents()`

Obtient uniquement les agents installés et disponibles pour ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Renvoie : CliAgentInfo[] (uniquement les agents installés)
```

#### `getAgentById(id)`

Obtient un agent spécifique à partir de son ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Renvoie : CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Définit les agents personnalisés à partir des paramètres.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### Fonctions du gestionnaire

#### `acpManager.spawn(agentId, binary, args, env)`

Lance un nouveau processus d’agent CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* variables d’environnement personnalisées */
});
// Renvoie : AcpSession
```

**ID d’agents autorisés** : `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Envoie une invite à un agent CLI et collecte la réponse.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // délai d’expiration de 2 minutes
);
// Renvoie : Promise<string>
```

#### `acpManager.kill(sessionId)`

Arrête une session et effectue le nettoyage.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Renvoie : boolean
```

#### `acpManager.getActiveSessions()`

Obtient toutes les sessions actives.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Renvoie : AcpSession[]
```

#### `acpManager.killAll()`

Arrête toutes les sessions.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interface de session

```typescript
interface AcpSession {
  id: string; // ID de session unique
  agentId: string; // ID de l’agent (p. ex. « claude »)
  process: ChildProcess; // Référence au processus enfant
  alive: boolean; // Indique si le processus est actif
  stdoutBuffer: string; // Tampon stdout accumulé
  stderrBuffer: string; // Tampon stderr accumulé
  createdAt: Date; // Horodatage de création
}
```

### Événements

`AcpManager` étend `EventEmitter` et émet les événements suivants :

#### `stdout`

Émis lorsque l’agent CLI écrit dans stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Émis lorsque l’agent CLI écrit dans stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Émis lorsque le processus de l’agent CLI se termine.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Émis lorsqu’une erreur survient dans le processus de l’agent CLI.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Configuration

### Variables d’environnement

ACP hérite de toutes les variables d’environnement du processus parent et peut être étendu avec des variables d’environnement personnalisées :

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Arguments de lancement

Chaque agent possède des arguments de lancement par défaut définis dans le registre. Vous pouvez les remplacer :

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Délais d’expiration

Le délai d’expiration par défaut d’une requête est de **120 secondes** (2 minutes). Vous pouvez le remplacer :

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutes
```

### Cache de détection

La détection des agents est mise en cache pendant **60 secondes** afin d’éviter des analyses coûteuses du système de fichiers. Pour forcer l’actualisation :

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Sécurité

### Prévention des injections de commandes

ACP valide les commandes de version afin d’empêcher les attaques par injection de commandes :

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Les commandes de version contenant ces caractères sont rejetées :

- `;` — Séparateur de commandes
- `&` — Processus en arrière-plan
- `|` — Tube
- `<`, `>` — Redirection
- `` ` `` — Substitution de commande
- `$` — Expansion de variable
- `\r`, `\n` — Sauts de ligne

### Validation du nom du binaire

ACP vérifie que le binaire de la commande de version correspond au nom de binaire attendu (sauf s’il s’agit d’un agent personnalisé).

### Isolation des processus

Chaque session ACP s’exécute dans son propre processus enfant. Le processus est arrêté lorsque la session se termine ou atteint son délai d’expiration.

---

## Performances

### Performances de la détection

- **Premier appel** : ~50-200ms (exécute la commande `version` pour chaque agent)
- **Appels mis en cache** : <1ms (retour depuis le cache)
- **Durée de vie du cache** : 60 secondes

### Performances des requêtes

- **Lancement** : ~50-100ms
- **Envoi de la requête** : ~10-50ms
- **Attente de la réponse** : dépend de l’agent CLI (généralement 1 à 30 secondes)
- **Arrêt** : ~5 secondes (SIGTERM) + immédiat (SIGKILL)

### Utilisation des ressources

- **Mémoire par session** : ~10-50MB (dépend de l’agent CLI)
- **CPU** : minimale (limitée par les E/S)
- **Disque** : aucune

---

## Dépannage

### Erreur « Unknown agent »

**Problème** : `acpManager.spawn()` lève l’erreur `Unknown agent: <id>`

**Solution** : seuls les agents suivants sont autorisés dans `spawn()` :

- `claude`
- `codex`
- `gemini`
- `qwen`

Les autres agents doivent être lancés manuellement ou à l’aide de définitions d’agents personnalisés.

### Erreur « Session not alive »

**Problème** : `acpManager.sendPrompt()` lève l’erreur `Session ${sessionId} is not alive`

**Solution** : la session peut s’être terminée ou avoir été arrêtée. Vérifiez son état :

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Relancer la session
  acpManager.spawn("claude", "claude", [], {});
}
```

### Erreur « ACP timeout »

**Problème** : `acpManager.sendPrompt()` lève l’erreur `ACP timeout after 120000ms`

**Solution** : augmentez le délai d’expiration :

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutes
```

### CLI non détectée

**Problème** : `detectInstalledAgents()` ne trouve pas votre CLI

**Solutions** :

1. **Vérifiez PATH** : assurez-vous que la CLI figure dans le PATH de votre système
2. **Vérifiez la commande de version** : exécutez manuellement `claude --version`
3. **Vérifiez les autorisations** : assurez-vous que la CLI est exécutable
4. **Agent personnalisé** : ajoutez une définition d’agent personnalisé pour les CLI non standard

### Permission refusée

**Problème** : ACP ne peut pas exécuter la CLI

**Solutions** :

1. **Vérifiez les autorisations du fichier** : `chmod +x /usr/local/bin/claude`
2. **Vérifiez le propriétaire** : assurez-vous qu’OmniRoute dispose des autorisations de lecture et d’exécution
3. **Vérifiez SELinux/AppArmor** : ces systèmes peuvent bloquer le lancement de processus

---

## Exemples

### Exemple 1 : Lancer et utiliser Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Détecter les agents installés
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Lancer une nouvelle session
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Envoyer une requête
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Nettoyer les ressources
  acpManager.kill(session.id);
}
```

### Exemple 2 : Découverte automatique avec solution de repli

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Essayer d'abord Claude, puis utiliser Codex comme solution de repli
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### Exemple 3 : Agent personnalisé

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Enregistrer un agent CLI personnalisé
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// Désormais, detectInstalledAgents() inclura "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Et ensuite ?

- **[Référence de l’API](../reference/API_REFERENCE.md)** — Points de terminaison de l’API REST
- **[Référence des fournisseurs](../reference/PROVIDER_REFERENCE.md)** — Les 352 fournisseurs
- **[Serveur MCP](./MCP-SERVER.md)** — Intégration du Model Context Protocol
- **[Serveur A2A](./A2A-SERVER.md)** — Protocole Agent-to-Agent
- **[Agent cloud](./CLOUD_AGENT.md)** — Agents basés dans le cloud

---

## Références

- [Projet AionUi](https://github.com/iOfficeAI/AionUi) — Source d’inspiration pour la détection automatique ACP
- [Code source ACP](../../src/lib/acp/) — Détails de l’implémentation
  - `manager.ts` — Gestion du cycle de vie des processus
  - `registry.ts` — Découverte et enregistrement des agents
  - `index.ts` — Exportations de l’API publique
