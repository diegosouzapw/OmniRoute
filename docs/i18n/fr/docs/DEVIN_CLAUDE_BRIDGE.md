# Devin Claude Bridge (Français)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` permet au véritable environnement d’exécution Claude Code d’utiliser le point de terminaison local Anthropic
Messages d’OmniRoute, tandis que le CLI Devin officiel fournit les réponses du modèle via ACP stdio. Il
ne modifie pas les fournisseurs Anthropic, Claude OAuth, Claude Web ou `devin-cli` existants.

> **État actuel : Claude Code épinglé à `2.1.258` ; dernière validation hors ligne et en direct
> enregistrée avec `2.1.220`.** L’épinglage à `2.1.220` a permis d’exécuter trois scénarios isolés via Devin CLI
> `3000.2.17` et le modèle `swe-1-7-lightning` ; cette dernière exécution en direct a confirmé les tours `Read`,
> `Edit` et `Bash` contrôlés par le client, la réussite de `npm test`, la détection des commandes et compétences
> du projet, le routage exclusif vers Devin et l’absence totale de trafic sortant vers Claude. L’épinglage a ensuite été porté à `2.1.258`
> (la génération du CLI dont OmniRoute usurpe l’identité Claude, et la première version qui intègre
> nativement le niveau Fable 5.1). Avec ce nouvel épinglage, la couche d’installation et `claude --version` ont
> été vérifiées sur l’image de base épinglée, et la suite de tests unitaires du pont, `compose config` ainsi que la
> preuve d’isolation statique réussissent — mais le scénario simulé hors ligne et la suite
> de trois scénarios en direct n’ont pas encore été réexécutés. Réexécutez-les (voir « Mise à jour des outils épinglés ») avant de vous fier
> au pont avec cet épinglage.

## Architecture

```text
Claude Code 2.1.258 (conteneur Linux non-root isolé)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (fournisseur au format Claude, sans authentification)
  -> devin acp --agent-type summarizer (ACP stdio officiel, sans outils Devin)
  -> Compte Devin dans le volume devin-auth dédié
```

L’agent ACP par défaut du CLI officiel peut exécuter ses propres outils ; ce pont ne
l’utilise donc pas. Il lance l’agent ACP fixe `summarizer`, dont le mode CLI officiel ne dispose d’aucun outil, et
encapsule la requête Anthropic sérialisée sous forme de trace d’exécution. Lorsqu’une autre
action contrôlée par Claude est nécessaire, la réponse doit contenir exactement une enveloppe d’outil client. Tout
`tool_call` ou `tool_call_update` ACP est rejeté avant qu’une réponse puisse être déclarée
réussie.

Le sérialiseur situé dans `open-sse/executors/devin-agentic/serializer.ts` préserve `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` et les
outils fournis par Claude Code. Les images et les blocs inconnus provoquent un échec explicite. Les résultats d’outils
volumineux utilisent un marqueur de troncature visible.

L’analyseur syntaxique accepte une enveloppe autonome `<tool>{...}</tool>` par tour du modèle. Il vérifie
le nom par rapport à la liste d’outils de la requête, valide les arguments par rapport au schéma JSON
de cet outil, rejette les réponses mêlant narration et actions, et autorise une seule tentative de correction limitée. Claude Code
exécute ensuite localement le `tool_use` Anthropic obtenu et renvoie le `tool_result` via
OmniRoute.

## Isolation et modèle de menace

L’installation, le compte et la configuration Claude de l’hôte sont hors périmètre et considérés comme
interdits. Les services Compose :

- s’exécutent avec l’UID/GID `10001:10001`, un système de fichiers racine en lecture seule, des capacités supprimées et
  `no-new-privileges` ;
- utilisent un `/home/bridge` privé, un volume de configuration Claude dédié, des données OmniRoute isolées
  et un volume `devin-auth` distinct ;
- montent uniquement des espaces de travail et éléments de preuve `.sandbox` jetables ;
- ne montent ni le répertoire personnel de l’hôte, ni le trousseau, ni les identifiants SSH ou cloud, ni le socket Docker ;
- construisent des environnements explicites et suppriment les variables d’API, d’OAuth et de routage Anthropic ;
- dirigent l’inférence Claude Code uniquement vers `http://omniroute:20128` avec une clé strictement locale.

Le profil hors ligne utilise un réseau interne. Dans le profil en direct, OmniRoute accède aux
points de terminaison Devin officiels uniquement via `network-guard` ; les destinations sans rapport sont refusées.
Claude Code dispose d’une protection distincte bloquant tout trafic sortant et ne peut atteindre que le service OmniRoute
local via `NO_PROXY`. Les fichiers d’audit des protections sont montés uniquement par leur processus de protection respectif. Les
scripts vérifient la propriété des fichiers, leur mode, leur nombre de liens et chaque décision avant d’exporter
des éléments de preuve exempts de jetons.

Exécutez indépendamment la preuve d’isolation :

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Elle valide la topologie, les montages nommés, les paramètres non-root et de lecture seule, le routage local explicite,
l’absence de variables d’environnement sensibles, l’absence du socket Docker, le blocage de l’accès à
`api.anthropic.com` et `claude.ai`, la sélection exclusive du fournisseur Devin et l’échec explicite lorsque
le backend ACP est indisponible.

## Configuration initiale et utilisation normale

Construisez l’image épinglée :

```bash
./scripts/devin-bridge/build
```

Authentifiez uniquement le volume Devin isolé :

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

La commande de connexion utilise le flux officiel par jeton manuel destiné aux environnements distants ou conteneurisés. La valeur est saisie directement dans l’invite de la CLI ; elle n’est ni transmise comme argument de processus, ni écrite dans Git, ni copiée depuis l’hôte.

Lancez l’environnement d’exécution Claude Code isolé :

```bash
./scripts/devin-bridge/launch
```

`launch` vérifie à nouveau l’isolation, l’authentification Devin et la détection des modèles avant de démarrer Claude Code dans le conteneur. Il n’exécute jamais l’exécutable Claude de l’hôte. Les alias de modèles peuvent être définis dans `.env.devin-bridge` ; chaque valeur configurée doit conserver le préfixe `devin-cli-agentic/`.

## Commandes de validation

Le parcours hors ligne reproductible ne nécessite aucun compte Devin et ne dispose d’aucun accès Internet lors de l’exécution :

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Le parcours en direct authentifié et facultatif est le suivant :

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Le lanceur en direct attend entre les scénarios afin d’éviter d’ouvrir des sessions ACP en rafale et valide les événements structurés du flux Claude au lieu de se fier à des affirmations textuelles. Ses trois scénarios démontrent :

1. la lecture directe du projet et l’analyse des défauts ;
2. une véritable opération `Edit`, un `npm test` via `Bash` détenu par le client et un résultat final ;
3. la détection de `/bridge-check` et de `bridge-proof`, la lecture du projet, un autre `npm test` réussi détenu par le client et l’achèvement sans tâche en attente.

Le contrôle final vérifie également l’audit réseau de Devin et exige que l’audit des sorties réseau de Claude reste vide.

## Mise à jour des outils épinglés

L’image épingle Node, Claude Code et Devin CLI dans
`docker/devin-bridge/Dockerfile`. Pour effectuer une mise à jour :

1. modifiez les versions explicites ;
2. remplacez les sommes de contrôle des archives Devin propres aux deux architectures par celles de l’artefact officiel ;
3. reconstruisez l’image et exécutez chaque commande de validation hors ligne ;
4. confirmez les versions à l’intérieur de l’image ;
5. réexécutez la suite authentifiée en direct composée de trois scénarios.

N’installez aucune des deux CLI globalement sur l’hôte et ne remplacez pas la vérification des sommes de contrôle par un téléchargement non vérifié.

## Diagnostic et nettoyage

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  affiche le routage local et les erreurs assainies de l’exécuteur.
- `.sandbox/evidence/mock-acp.jsonl` consigne les actions ACP simulées et déterministes.
- `.sandbox/evidence/claude-stream.jsonl` consigne l’exécution hors ligne réelle de Claude Code.
- `.sandbox/evidence/live-*.jsonl` consigne les trois flux en direct validés.
- `.sandbox/evidence/egress.jsonl` et `.sandbox/evidence/claude-egress.jsonl` sont des copies validées et exemptes de jetons des audits de protection.

Arrêtez les conteneurs et réseaux gérés tout en préservant les volumes de connexion et de configuration :

```bash
./scripts/devin-bridge/clean
```

Supprimez l’intégralité de l’environnement géré par le pont, y compris les volumes nommés :

```bash
./scripts/devin-bridge/clean --all
```

## Limites

- Le pont s’appuie sur le rôle fixe sans outils `summarizer`, car Devin CLI `3000.2.17`
  n’expose pas d’agent ACP neutre sans outils. L’adaptateur compense les réponses
  intermédiaires prenant la forme de résumés, mais une tentative de correction limitée peut
  toujours échouer explicitement.
- Les appels ACP en direct peuvent renvoyer des réponses transitoires `502`/`504`. Le banc
  de test espace les scénarios ; un échec persistant reste bloquant et n’entraîne jamais la
  sélection d’un autre fournisseur.
- Le contexte ACP est reconstruit à partir de chaque requête Anthropic ; il n’existe aucune
  affinité avec un processus ou une session.
- Un seul appel d’outil est pris en charge par réponse du modèle ; les appels parallèles sont
  rejetés.
- Les images ne sont explicitement pas prises en charge. Les capacités de vision, la sortie
  du raisonnement, les contrôles d’effort et une fenêtre de contexte de 1M ne sont pas
  annoncés.
- SSE utilise des événements de cycle de vie Anthropic valides, mais ceux-ci sont émis après
  la collecte du tour ACP limité ; les fragments ACP ne sont pas transmis progressivement.
