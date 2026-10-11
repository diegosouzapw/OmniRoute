# 🐳 Docker Guide — OmniRoute (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Référence complète du déploiement Docker. Pour démarrer rapidement, consultez la [section Docker du README](../README.md#-docker).

## Table des matières

- [Exécution rapide](#quick-run)
- [Avec un fichier d’environnement](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profils disponibles](#available-profiles)
- [Configuration des outils CLI de l’hôte lorsqu’OmniRoute s’exécute dans Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Conteneur auxiliaire Redis](#redis-sidecar)
- [Compose pour la production](#production-compose)
- [Étapes du Dockerfile](#dockerfile-stages)
- [Variables d’environnement critiques](#critical-environment-variables)
- [Docker Compose avec Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Tunnel rapide Cloudflare](#cloudflare-quick-tunnel)
- [Tags d’image](#image-tags)
- [Disponibilité : SQLite par défaut ne prend en charge qu’un seul réplica](#availability-default-sqlite-is-single-replica)
- [Erreurs régionales Gemini dans Docker](#gemini-regional-errors-inside-docker)
- [Remarques importantes](#important-notes)

---

## Exécution rapide

> **Vous souhaitez l’auto-héberger avec une seule commande ?** Consultez le
> [guide d’auto-hébergement](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image publiée +
> Redis, écoute uniquement sur l’interface de bouclage, aucun choix de profil). L’exécution rapide ci-dessous correspond à
> l’approche à conteneur unique destinée aux utilisateurs qui exécutent déjà Redis ailleurs.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Avec un fichier d’environnement

```bash
# Commencez par copier et modifier .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Profil de base (sans outils CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex et OpenClaw intégrés)
docker compose --profile cli up -d

# Profil hôte (principalement pour Linux ; monte les exécutables CLI de l’hôte en lecture seule)
docker compose --profile host up -d

# Profil Web (Chromium/Playwright pour les fournisseurs reposant sur des sessions Web)
docker compose --profile web up -d

# Combiner CLI et le conteneur auxiliaire CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profils disponibles

OmniRoute fournit des profils Compose adaptés aux principaux types de déploiement. Choisissez celui qui correspond à votre environnement.

| Profil          | Service          | Quand l’utiliser                                                                                                                                                   | Commande                                     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (défaut) | `omniroute-base` | Serveur sans interface graphique / environnement d’exécution minimal, sans CLI de fournisseurs intégrées                                                           | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Flux de travail agentiques qui appellent `omniroute providers/setup/doctor` et les CLI intégrées (Codex, Claude Code, Droid, OpenClaw)                             | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Hôtes Linux souhaitant un accès de type `network_mode` aux CLI de l’hôte en montant `~/.local/bin`, `~/.codex`, `~/.claude`, etc. en lecture seule                 | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Exécute le conteneur auxiliaire [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sur le port `8317` pour le proxy en amont des CLI                      | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Fournisseurs reposant sur des sessions Web et nécessitant un navigateur : `gemini-web`, `claude-web`, `claude-turnstile` (construit `runner-web`, Chromium inclus) | `docker compose --profile web up -d`         |

> Plusieurs profils peuvent être combinés : `docker compose --profile cli --profile cliproxyapi up -d`.

## Configuration des outils CLI de l’hôte lorsqu’OmniRoute s’exécute dans Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` et le bouton
**Enregistrer la configuration** du tableau de bord écrivent tous des fichiers tels que `~/.codex/*.config.toml`. Ces chemins
n’ont de sens que sur la machine où la CLI s’exécute réellement. Si vous les exécutez
dans le conteneur, l’écriture s’effectue dans le répertoire personnel du conteneur (`/home/node` —
l’image s’exécute avec `USER node`), qu’aucune CLI de l’hôte ne consultera jamais et dont le contenu est
supprimé dès que le conteneur est recréé.

OmniRoute détecte cette situation et refuse l’écriture en fournissant des instructions au lieu de
signaler une réussite dont vous ne pourriez pas profiter : la CLI se termine avec le code `2` et l’API répond `422`
avec `containerEphemeralTarget: true`.

### Recommandation : exécuter la CLI sur l’hôte et OmniRoute dans Docker

Le conteneur fournit l’API ; la CLI configure vos outils sur l’hôte.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # fait pointer la CLI vers le conteneur
omniroute setup-codex                      # écrit dans le véritable ~/.codex de votre hôte
```

C’est le bon choix lorsque Codex, Claude Code, Cursor ou des outils similaires s’exécutent sur votre
ordinateur portable — ce qui constitue la configuration habituelle.

### Alternative : monter les répertoires de configuration de l’hôte par liaison (profil `host`)

Si vous souhaitez que le conteneur lui-même écrive la configuration de votre hôte, montez les
répertoires et faites pointer `CLI_CONFIG_HOME` vers la racine du montage. Le profil `host`
le fait déjà :

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Un montage par liaison est ce qui rend le chemin fiable : OmniRoute lit
`/proc/self/mountinfo` et autorise les écritures dans les chemins montés (ainsi que dans les répertoires
dont les enfants sont des montages, ce qui correspond exactement à la structure `/host-home` ci-dessus), tout en
continuant à refuser les chemins non montés.

### Solution de dernier recours : configurer les CLI propres au conteneur (à utiliser avec parcimonie)

Lorsque les CLI résident réellement dans le conteneur (profil `cli`), l’écriture
est intentionnelle. Transmettez `--allow-container-write` à n’importe quelle commande `setup-*`, ou définissez
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` pour le serveur. L’écriture est effectuée
avec un avertissement indiquant qu’elle ne survivra pas au conteneur.

> **Avertissement de sécurité — profil `cli` + montage de `docker.sock`.**
> Le profil `cli` monte `/var/run/docker.sock` par liaison afin que le programme de
> mise à jour automatique intégré au conteneur puisse recréer la pile via le démon de l’hôte
> (`src/lib/system/autoUpdate.ts` recherche ce socket et ignore le chemin
> Docker lorsqu’il est absent). Ce socket constitue **une frontière de confiance donnant les
> privilèges root sur l’hôte** : tout ce qui peut y accéder contrôle le démon Docker de l’hôte en tant que
> root — et peut créer, inspecter, arrêter et supprimer n’importe quel conteneur sur l’hôte.
> Conséquences :
>
> 1. **N’exposez jamais le port du profil `cli` sur le réseau.** Publiez-le
>    sur `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — un profil `cli` accessible depuis le réseau local transforme toute exécution de code à distance au niveau
>    du tableau de bord en compromission totale de l’hôte.
> 2. **Ne montez aucun répertoire supplémentaire de l’hôte dans le profil `cli`.**
>    Le socket Docker associé à tout montage supplémentaire donne au conteneur un accès complet en
>    lecture/écriture à votre système de fichiers et à la configuration de l’hôte. Si un outil doit
>    accéder à un projet, exécutez-le localement avec le binaire de la CLI — ne montez pas le projet
>    dans le conteneur `cli`.
>
> Si vous n’avez pas besoin de la mise à jour automatique depuis le conteneur, laissez le profil `cli` désactivé
> (`COMPOSE_PROFILES=core,redis` ou une valeur plus courte). Les autres profils ne
> montent pas le socket Docker.
>
> Consultez `docs/security/MITM-TPROXY-DECRYPT.md` (git ; non compilé dans `/docs`) pour le modèle de menace associé
> aux attaques MITM, ainsi que `docs/security/SUPPLY_CHAIN.md` pour la chaîne de provenance
> des binaires `codex`/`claude-code`/`droid`/`openclaw`.

## Conteneur auxiliaire Redis

OmniRoute s’appuie sur Redis pour assurer le fonctionnement du limiteur de débit distribué et du cache partagé. Le service `redis` est **toujours défini** dans `docker-compose.yml` (il n’est soumis à aucun profil) et démarre avec n’importe quel autre profil.

| Détail                      | Valeur                                              |
| --------------------------- | --------------------------------------------------- |
| Image                       | `redis:7-alpine`                                    |
| Nom du conteneur            | `omniroute-redis`                                   |
| Port interne                | `6379`                                              |
| Port hôte (remplacement)    | `REDIS_PORT` (valeur par défaut : `6379`)           |
| Liaison hôte (remplacement) | `REDIS_BIND_HOST` (valeur par défaut : `127.0.0.1`) |
| Volume                      | `omniroute-redis-data` → `/data`                    |
| Vérification de l’état      | `redis-cli ping` (intervalle de 10 s)               |

Variables d’environnement associées :

- `REDIS_URL` — chaîne de connexion injectée dans l’application (`redis://redis:6379` par défaut).
- `REDIS_PORT` — mappage du port côté hôte pour le conteneur Redis.
- `REDIS_BIND_HOST` — interface hôte sur laquelle le port est publié. La valeur par défaut est `127.0.0.1`.

> **Pourquoi l’interface de bouclage est utilisée par défaut :** le conteneur auxiliaire s’exécute sans `requirepass`, et les conteneurs
> de l’application y accèdent via le réseau Compose (`redis:6379`) — le port publié est
> uniquement destiné aux outils côté hôte (`redis-cli`, un `npm run dev` local). Une publication sur
> `0.0.0.0` exposerait une instance Redis non authentifiée à chaque hôte de votre réseau local. Si vous définissez
> `REDIS_BIND_HOST=0.0.0.0`, ajoutez également `--requirepass` au champ `command:` du service.

La **désactivation de Redis** n’est pas recommandée (le limiteur de débit basculera vers une solution de secours en mémoire). Si vous devez le faire, supprimez ou commentez le bloc du service `redis:` dans `docker-compose.yml`, ou réduisez-le à zéro instance :

```bash
docker compose up -d --scale redis=0
```

## Compose de production

Pour disposer d’un instantané de production isolé s’exécutant parallèlement à l’environnement de développement, utilisez `docker-compose.prod.yml`.

| Détail                             | Valeur                                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------- |
| Fichier                            | `docker-compose.prod.yml`                                                                    |
| Port du tableau de bord par défaut | `PROD_DASHBOARD_PORT=20130` (mappé vers le port interne `${DASHBOARD_PORT:-20128}`)          |
| Port de l’API par défaut           | `PROD_API_PORT=20131`                                                                        |
| Image                              | `omniroute:prod` (construite à partir de la cible `runner-cli`)                              |
| Conteneur Redis                    | `omniroute-redis-prod` (`redis:8.6.2`, volume dédié `redis-prod-data`)                       |
| Volume de données                  | `omniroute-prod-data` (nommé, conservé entre les reconstructions)                            |
| Vérifications de l’état            | `node healthcheck.mjs` + `redis-cli ping`, avec `depends_on` conditionné par l’état de Redis |

Utilisation :

```bash
# Construire et démarrer la pile de production
docker compose -f docker-compose.prod.yml up -d --build

# Afficher les journaux en continu
docker compose -f docker-compose.prod.yml logs -f

# Arrêter la pile (conserver les volumes)
docker compose -f docker-compose.prod.yml down
```

La pile de production s’exécute en parallèle de la configuration Compose de développement (avec des noms de conteneurs, des ports et des volumes différents), ce qui vous permet de poursuivre vos itérations locales tandis que l’environnement de production reste actif.

## Étapes du Dockerfile

Le dépôt fournit un Dockerfile multi-étapes (`Dockerfile`). Quatre étapes sont exposées ; choisissez la bonne `target` pour votre cas d’utilisation.

| Étape         | Image de base         | Objectif                                                                                                                                                                                                                                                                                                                                              |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Installe les dépendances (`npm ci --legacy-peer-deps`) et exécute `npm run build` (Turbopack par défaut — voir Ressources de compilation ci-dessous)                                                                                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | Environnement d’exécution de production avec la sortie autonome de Next.js. **Aucune CLI de fournisseur incluse.**                                                                                                                                                                                                                                    |
| `runner-cli`  | `runner-base`         | Ajoute `git`, `docker.io`, `docker-compose` et les CLI globales : `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Choisissez cette étape pour les workflows agentiques.**                                                                                                                                                        |
| `runner-web`  | `runner-base`         | Ajoute Playwright et un navigateur Chromium (`--with-deps`) pour les fournisseurs de sessions web : `gemini-web`, `claude-web`, `claude-turnstile`. **Choisissez cette étape lorsque vous utilisez ces fournisseurs** — l’image standard échoue au moment de la requête sans ces composants (voir la remarque sur `-web` dans Canaux de publication). |

Construisez manuellement une cible spécifique :

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Ressources de compilation

Trois arguments de compilation contrôlent les ressources consommées par l’étape `builder`. Ils s’appliquent uniquement à la compilation —
`OMNIROUTE_MEMORY_MB` (ci-dessous) est un réglage d’exécution distinct.

| Argument de compilation     | Valeur par défaut | Effet                                                                                               |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`               | `0` compile avec webpack : pic de mémoire plus faible, mais plus lent. `1` active Turbopack.        |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`            | Plafond du tas V8 (`--max-old-space-size`) pour le processus `next build` lancé.                    |
| `OMNIROUTE_BUILD_WORKERS`   | `2`               | Alimente `CIRCLE_NODE_TOTAL` ; Next calcule `workers = N - 1` pour la collecte des données de page. |

`OMNIROUTE_BUILD_WORKERS` est le paramètre à augmenter sur une machine de compilation puissante et celui
à suspecter lorsqu’une compilation aux ressources limitées échoue **après** `✓ Compiled successfully`. Chaque
worker de données de page est un processus distinct, tout comme le processus parent `next build` lui-même ;
une reproduction sur un VPS réel (problème #7518) a mesuré le pic de RSS de chaque processus à
~4,5 Go, indépendamment de l’option de tas `NODE_OPTIONS` (Turbopack compile dans de la
mémoire native/Rust en dehors du tas V8). La valeur par défaut de `2` (→ 1 worker, 2
processus au total) est dimensionnée pour les runners hébergés par GitHub dotés de 16 Go / 4 vCPU que
le pipeline de publication utilise. Avec `8` (→ 7 workers), ce runner a manqué de mémoire et
buildkit a fait échouer l’étape avec `ResourceExhausted: ... cannot allocate memory` ;
`3` (→ 2 workers) ne tenait toujours pas une fois la RSS par processus mesurée
directement plutôt que déduite. `tests/unit/docker-build-memory-budget.test.ts`
effectue les calculs à partir de la valeur mesurée et échoue si l’un ou l’autre des réglages
dépasse les capacités du runner.

Turbopack compile dans de la mémoire Rust native qui réside **en dehors** du tas V8 ; par conséquent,
`OMNIROUTE_BUILD_MEMORY_MB` ne la limite pas. Sur un hôte doté d’un plafond de mémoire, la
compilation est alors interrompue par un SIGKILL de l’OOM killer, sans aucun message d’erreur — elle
s’arrête simplement au milieu de `Creating an optimized production build`, ce qui ressemble davantage
à un blocage qu’à un manque de mémoire. C’est pourquoi le `Dockerfile` utilise webpack par défaut
(`OMNIROUTE_USE_TURBOPACK=0`), contrairement à `npm run dev` / `npm run build`, où
Turbopack est le choix par défaut dans le code : un simple `docker build .` sans argument de compilation (ce que
Railway et d’autres hébergeurs en un clic exécutent) ne doit pas échouer silencieusement sur une
machine de compilation dont la mémoire est limitée. Les images publiées transmettent déjà explicitement
`OMNIROUTE_USE_TURBOPACK=0` dans `docker-publish.yml`. Sur une machine de compilation disposant de suffisamment
de RAM, activez Turbopack pour accélérer la compilation :

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` est activé, de sorte que `next build` exécute un processus parent **et** un processus
worker, chacun respectant séparément `OMNIROUTE_BUILD_MEMORY_MB`. Dimensionnez le plafond
du conteneur à environ plus de deux fois cette valeur, et non à une seule fois.

Mesures effectuées sur cette arborescence (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`) :

| Bundler   | Plafond du conteneur | Résultat                                                       |
| --------- | -------------------- | -------------------------------------------------------------- |
| Turbopack | 8 Gio / 16 Gio       | interrompu par l’OOM killer dans les deux cas, silencieusement |
| webpack   | 8 Gio                | worker de compilation interrompu par un SIGKILL                |
| webpack   | 12 Gio               | réussite, avec un pic à 11,1 Gio                               |

### Valeurs d’exécution par défaut

Valeurs par défaut exportées par `runner-base` : `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportement de la mémoire dans Docker :

- L’image définit `OMNIROUTE_MEMORY_MB=1024` et en dérive `NODE_OPTIONS=--max-old-space-size=1024`.
- Le processus serveur réel est démarré par le lanceur autonome, qui lit `OMNIROUTE_MEMORY_MB` et ajoute `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utilise la dernière valeur répétée de `--max-old-space-size` ; définir `OMNIROUTE_MEMORY_MB` permet donc de contrôler la limite effective du tas dans Docker.
- Comme l’image la définit systématiquement, la valeur de repli du lanceur, calibrée en fonction de la RAM, ne s’applique jamais sous Docker. Augmentez-la explicitement selon la charge de travail (voir le tableau ci-dessous). `2048` reste insuffisant pour `/v1/responses` avec des agents de codage.

### RAM d’exécution pour les agents de codage

La valeur Docker par défaut de 1 Gio constitue un minimum pour le tableau de bord et les conversations légères, et non une configuration adaptée à la production. Les corps volumineux de requêtes `POST /v1/responses` (des centaines de messages et des dizaines d’outils) conservent plusieurs graphes en mémoire pendant la compression. Deux requêtes simultanées d’environ 3 Mio / 750 000 jetons ont provoqué l’arrêt de V8 avec un espace ancien de **12 Gio** (`FATAL ERROR: Reached heap limit`) et ont également déclenché une erreur OOM du cgroup à 16 Gio. Voir [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensionnez la **mémoire du cgroup `--memory` au-dessus de la taille du tas** — les tampons natifs, SQLite et les données intermédiaires de compression résident hors de V8.

| Charge de travail                                 | `OMNIROUTE_MEMORY_MB`                 | Conteneur / cgroup       | Remarques                                                                                                                                  |
| ------------------------------------------------- | ------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Tableau de bord, une conversation légère          | `1024` (valeur par défaut de l’image) | ≥2 Gio                   |                                                                                                                                            |
| Un agent de codage (Claude/Codex/Grok)            | `8192`                                | ≥10 Gio                  | Session unique `/v1/responses` typique                                                                                                     |
| Deux longues requêtes `/v1/responses` simultanées | `10240`–`12288`                       | ≥12–16 Gio               | Arrêt de V8 observé avec un tas d’environ 12 Gio                                                                                           |
| Trois longs contextes simultanés ou plus          | à éviter dans un seul processus       | sérialiser / plus de RAM | Par défaut, l’admission des charges lourdes est limitée à 1 requête en cours ; l’augmenter sans ajouter de RAM provoque de nouveau l’arrêt |

Sur une machine physique, `omniroute serve` calibre la limite à environ 35 % de la RAM (bornée à `[512, 4096]`) lorsque `OMNIROUTE_MEMORY_MB` est **non définie**. Docker définit toujours `1024` ; ce calibrage n’est donc jamais exécuté dans l’image officielle.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variables d’environnement critiques

Au-delà des valeurs par défaut documentées dans [ENVIRONMENT.md](../reference/ENVIRONMENT.md), les variables suivantes sont les plus importantes lors de l’exécution sous Docker :

| Variable                      | Rôle                                                                                                                                                                                                                                                                                                                   | Valeur par défaut               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Secret partagé pour la passerelle WebSocket. **Obligatoire en production** — définissez-le sur une chaîne aléatoire robuste.                                                                                                                                                                                           | non définie (doit être fournie) |
| `REDIS_URL`                   | Chaîne de connexion pour le limiteur de débit / backend de cache                                                                                                                                                                                                                                                       | `redis://redis:6379`            |
| `REDIS_PORT`                  | Port côté hôte pour le conteneur Redis inclus                                                                                                                                                                                                                                                                          | `6379`                          |
| `REDIS_BIND_HOST`             | Interface de l’hôte sur laquelle le port Redis inclus est publié (interface de bouclage, sauf si vous ajoutez AUTH)                                                                                                                                                                                                    | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Chemin de l’hôte monté dans le profil `cli` à l’emplacement `/workspace/omniroute` pour les workflows de mise à jour automatique                                                                                                                                                                                       | `.` (répertoire actuel)         |
| `OMNIROUTE_MEMORY_MB`         | Limite du tas Node à l’exécution pour le serveur Docker autonome ; remplace la valeur par défaut de l’image indiquée ci-dessus. Agents de codage : `8192`+ (voir la [RAM d’exécution](#runtime-ram-for-coding-agents)).                                                                                                | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Remplace les ports exposés pour le tableau de bord (20128) et l’API (20129)                                                                                                                                                                                                                                            | `20128` / `20129`               |
| `APP_BIND_HOST`               | Interface de l’hôte sur laquelle docker-compose publie les ports du tableau de bord, de l’API et du WebSocket en direct. Avec `REQUIRE_API_KEY=false` (valeur par défaut), `0.0.0.0` expose le proxy `/v1` anonyme au réseau local — n’élargissez l’accès qu’avec `REQUIRE_API_KEY=true` ou un proxy inverse en amont. | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | Interface de l’hôte sur laquelle docker-compose publie le side-car `cliproxyapi` — son volume de données contient les identifiants des fournisseurs.                                                                                                                                                                   | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Répertoire lu par l’analyseur de plugins à l’exécution et dans lequel il les installe. Définissez-le lorsque les plugins sont montés par liaison : la valeur par défaut dépend de `HOME`, qu’une image n’exporte pas nécessairement.                                                                                   | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | Sous-chemin d’URL lorsque l’application est publiée derrière un proxy inverse (par ex. `/omniroute`)                                                                                                                                                                                                                   | _(vide = racine)_               |
| `NEXT_PUBLIC_BASE_URL`        | Origine publique du navigateur incluant le sous-chemin (par ex. `https://host/omniroute`)                                                                                                                                                                                                                              | non définie                     |
| `PROD_DASHBOARD_PORT`         | Port du tableau de bord côté hôte pour `docker-compose.prod.yml`                                                                                                                                                                                                                                                       | `20130`                         |
| `CLIPROXYAPI_PORT`            | Port côté hôte pour le side-car `cliproxyapi`                                                                                                                                                                                                                                                                          | `8317`                          |

## Proxy inverse sur un sous-chemin (Traefik / nginx)

Le `basePath` de Next.js est compilé dans le bundle autonome. OmniRoute enregistre la
valeur intégrée dans un fichier sentinelle à la racine de l’application (écrit pendant
`npm run build` ; lu par `scripts/docker/ensure-docker-base-path.mjs`) et la compare à
`OMNIROUTE_BASE_PATH` au démarrage du conteneur. Lorsque ces valeurs diffèrent et que
l’image a été construite pour la racine du domaine, le point d’entrée réécrit les
manifestes autonomes, les littéraux `basePath`/`assetPrefix` intégrés (Next 16 génère
les URL des ressources SSR uniquement à partir de `assetPrefix` — l’outil de correctif
y reproduit le sous-chemin), les URL des ressources `/_next/static` intégrées
(manifestes de références client, importations de médias, pages d’erreur prérendues)
ainsi que la couche de compatibilité cliente `process.env`, avant l’exécution de
`node dev/run-standalone.mjs`.

### Construction avec Compose (recommandée)

Définissez les deux variables dans `.env`, puis reconstruisez afin que l’image et
l’environnement d’exécution concordent :

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` transmet `OMNIROUTE_BASE_PATH` en tant qu’argument de construction
Docker et en tant que variable d’environnement d’exécution.

### Image racine préconstruite + sous-chemin à l’exécution

Les images publiées `diegosouzapw/omniroute:*` sont construites pour la racine du
domaine. Vous pouvez néanmoins définir `OMNIROUTE_BASE_PATH` à l’exécution ; le
conteneur corrige le bundle une fois au démarrage. Associez-le à l’origine publique
correspondante :

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configurez le proxy inverse pour transmettre le chemin externe **complet** (ne
supprimez pas le préfixe). Traefik doit acheminer `PathPrefix(`/omniroute`)` vers le
conteneur sans `StripPrefix`, afin que Next.js reçoive `/omniroute/...` et serve les
ressources depuis `/omniroute/_next/...`.

Le contrôle d’intégrité Docker interroge le point de terminaison léger de cycle de vie
`/healthz`, préfixé par la valeur active de `OMNIROUTE_BASE_PATH`.
`/api/monitoring/health` reste disponible pour les diagnostics humains ou ceux des
tableaux de bord ; pour que le HEALTHCHECK du conteneur l’utilise à nouveau (par
exemple, afin d’appliquer un contrôle d’intégrité approfondi), définissez
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Ce chemin effectue un contrôle
**approfondi** (base de données + synthèse de la surveillance) — adapté au
`HEALTHCHECK` peu fréquent de Docker si vous choisissez de le réactiver, mais **pas**
aux intervalles de `livenessProbe` de Kubernetes.

Pour les orchestrateurs (Kubernetes, Nomad, etc.) :

| Sonde                  | À privilégier                                                                | À éviter                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Activité               | HTTP `GET /livez`, ou TCP sur le port principal (`PORT`, `20128` par défaut) | `/api/monitoring/health` comme contrôle d’activité                            |
| Disponibilité          | HTTP `GET /healthz`                                                          | Les délais courts qui considèrent une boucle d’événements occupée comme morte |
| Approfondie / blackbox | `/api/monitoring/health`                                                     | —                                                                             |

`/healthz` indique l’état du cycle de vie du processus (`ok` / `starting` /
`stopping`). `/livez` vérifie uniquement que le processus est actif (200 dès que le
gestionnaire peut s’exécuter ; il n’attend pas que le service soit prêt). Les deux
s’exécutent néanmoins sur la même boucle d’événements Node que le traitement des
requêtes ; les opérations de catalogue ou de compression fortement dépendantes du
processeur peuvent donc les retarder — occupé ≠ mort. Privilégiez une sonde d’activité
TCP si les sondes HTTP expirent. Guide complet sur les sondes :
[Guide de surveillance — recommandations relatives aux sondes Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose avec Caddy (TLS HTTPS automatique)

OmniRoute peut être exposé de manière sécurisée grâce au provisionnement SSL automatique de Caddy. Assurez-vous que l’enregistrement DNS A de votre domaine pointe vers l’adresse IP de votre serveur.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origine visible par le navigateur pour les rappels OAuth, les liens du tableau de bord et les URL publiques générées.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interne de serveur à serveur pour les tâches planifiées et les auto-requêtes.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy définit les en-têtes de transfert standard pour le conteneur en amont. OmniRoute utilise
`NEXT_PUBLIC_BASE_URL` comme origine publique canonique pour les rappels OAuth et les liens publics
générés ; les écritures authentifiées du tableau de bord utilisent des requêtes de même origine ainsi qu’une protection CSRF
liée à la session. N’activez `OMNIROUTE_TRUST_PROXY` que pour les déploiements avancés dans lesquels vous souhaitez délibérément
qu’OmniRoute déduise l’origine publique à partir d’en-têtes de transfert approuvés plutôt qu’à partir d’une
configuration explicite.

## Tunnel rapide Cloudflare

La prise en charge du tableau de bord pour les déploiements Docker comprend un **Tunnel rapide Cloudflare** en un clic dans `Dashboard → Endpoints`. La première activation télécharge `cloudflared` uniquement lorsque cela est nécessaire, démarre un tunnel temporaire vers votre point de terminaison `/v1` actuel et affiche l’URL `https://*.trycloudflare.com/v1` générée directement sous votre URL publique habituelle.

Les panneaux de tunnel des points de terminaison (Cloudflare, Tailscale, ngrok) peuvent être affichés ou masqués depuis `Settings → Appearance` sans modifier l’état actif des tunnels.

### Remarques sur les tunnels

- Les URL des tunnels rapides sont temporaires et changent après chaque redémarrage.
- Les tunnels rapides ne sont pas restaurés automatiquement après le redémarrage d’OmniRoute ou du conteneur. Réactivez-les depuis le tableau de bord lorsque nécessaire.
- L’installation gérée prend actuellement en charge Linux, macOS et Windows sur `x64` / `arm64`.
- Les tunnels rapides gérés utilisent par défaut le transport HTTP/2 afin d’éviter les avertissements bruyants relatifs aux tampons UDP de QUIC dans les environnements de conteneurs aux ressources limitées. Définissez `CLOUDFLARED_PROTOCOL=quic` ou `auto` si vous souhaitez utiliser un autre transport.
- Les images Docker incluent les autorités de certification racines du système et les transmettent à l’instance gérée de `cloudflared`, ce qui évite les échecs de validation TLS lorsque le tunnel s’amorce à l’intérieur du conteneur.
- Définissez `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` si vous souhaitez qu’OmniRoute utilise un binaire existant au lieu d’en télécharger un.

## Étiquettes d’image

| Image                    | Étiquette | Taille | Description                                                          |
| ------------------------ | --------- | ------ | -------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest`  | ~250MB | Version SemVer stable **publiée** la plus élevée (et non git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`   | ~250MB | Épinglez cette catégorie d’étiquette pour GitOps                     |

Manifeste multiplateforme : `linux/amd64` + `linux/arm64` natifs (Apple Silicon, AWS Graviton, Raspberry Pi). Docker sélectionne automatiquement l’architecture correspondante ; transmettez `--platform linux/amd64` si vous devez forcer l’émulation AMD64 sur des hôtes ARM.

### Canaux de publication

OmniRoute publie des canaux Docker distincts pour les versions stables, les tests de la branche de publication active et les versions de développement.

| Canal                           | Source                                           | Mutabilité                           | Utilisation recommandée                                                                                                              |
| ------------------------------- | ------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Version signée/versionnée                        | Immuable                             | Déploiements en production qui épinglent une version exacte                                                                          |
| `:latest` / `:latest-web`       | Version SemVer stable **publiée** la plus élevée | Pointeur stable modifiable           | Suit les versions stables **après** une tâche de publication SemVer — ne suit **pas** `main` ni les commits `release/v*` non publiés |
| `:next` / `:next-web`           | Branche `release/v*` par défaut actuelle         | Pointeur de préversion modifiable    | Test des correctifs intégrés à la branche de publication active, mais qui ne figurent pas encore dans une version stable             |
| `:main` / `:main-web`           | Branche `main`                                   | Pointeur de développement modifiable | Développement et tests d’intégration uniquement                                                                                      |

#### Fournisseurs de sessions web : les images `-web`

Chaque canal ci-dessus existe également sous forme d’étiquette `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), construite à partir de l’étape `runner-web` — la même image, avec Playwright et un navigateur Chromium en plus. L’image standard est fournie **sans** Chromium ; `gemini-web`, `claude-web` et `claude-turnstile` en ont besoin.

L’échec est différé et ne survient pas au démarrage : ces fournisseurs répertorient leurs modèles et apparaissent comme connectés dans le tableau de bord, et seule la première requête échoue avec

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Si vous utilisez ces fournisseurs, récupérez l’étiquette `-web` du canal que vous utilisez déjà — rien d’autre ne change. Pour une installation npm/CLI (sans image Docker), l’élément manquant équivalent est le binaire du navigateur : exécutez `npx playwright install chromium` sur l’hôte.

#### Utilisation du canal de préversion

Le canal `next` est reconstruit à chaque push vers la branche `release/v*` par défaut actuelle et est publié pour AMD64 et ARM64. Les anciennes branches de maintenance ne peuvent pas l’écraser. Ce canal fournit une image récupérable contenant les correctifs fusionnés dans la branche de version active avant la création du prochain tag stable.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Pour Docker Compose, remplacez le tag de l’image utilisé par le profil sélectionné, puis récupérez l’image et recréez le service :

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Sécurité et retour en arrière

`next` est un canal de préversion flottant. Il peut changer à chaque push vers la branche de version active et **n’est pas pris en charge pour une utilisation en production**. Épinglez le digest de l’image pendant l’évaluation d’un build spécifique :

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Avant d’effectuer des tests, sauvegardez le volume de données OmniRoute ou le répertoire de données monté par liaison. Pour revenir en arrière, restaurez la version stable ou le digest précédemment utilisé, puis recréez le conteneur :

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Un build de branche de version ne peut jamais déplacer `latest` ; seule une version sémantique stable admissible peut promouvoir le pointeur stable. Les images `next` conservent l’inspection des images de version ainsi que le mécanisme de blocage en cas de vulnérabilité CRITICAL.

**`latest` ne garantit pas l’actualité par rapport à git.** Les correctifs fusionnés dans `main` ou dans la branche `release/v*` active ne sont **pas** inclus dans `:latest` tant qu’une image SemVer stable n’a pas été publiée et que la tâche de publication n’a pas promu `:latest` (avec le même digest que cette version SemVer). Si `latest` semble figé alors que GitHub affiche déjà le correctif, récupérez `:next` pour tester la branche de version ou attendez le tag SemVer.

| Votre objectif                                                                   | Utilisation                                 |
| -------------------------------------------------------------------------------- | ------------------------------------------- |
| GitOps / production ne devant subir aucune dérive                                | Épingler `:X.Y.Z` (ou le digest de l’image) |
| Suivre les versions stables publiées et accepter une recréation à chaque version | `:latest`                                   |
| Tester les commits `release/v*` non publiés                                      | `:next` (pas pour la production)            |
| Tester `main`                                                                    | `:main` (pas pour la production)            |

## Disponibilité : SQLite par défaut fonctionne avec une seule réplique

La configuration Docker / Kubernetes standard d’OmniRoute repose sur **un processus Node + un seul processus d’écriture SQLite**. La haute disponibilité n’est **pas prise en charge** avec cette topologie.

| Contrainte                                       | Conséquence                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Processus d’écriture unique                      | N’exécutez **pas** plusieurs répliques utilisant le même fichier SQLite. Cela corrompt la base de données.                                                                                                                                                                                                                                                                                          |
| Recréation / redémarrage / arrêt par HEALTHCHECK | **Interruption complète** des flux SSE en cours, des sessions du tableau de bord et de l’état en mémoire. Chaque client connecté est déconnecté. Les nouvelles requêtes pendant la période sans endpoint reçoivent du proxy inverse une erreur **`502 Bad Gateway: Unknown error`**, et non du JSON OmniRoute — les clients ne peuvent pas la distinguer d’une défaillance du fournisseur (#11015). |
| Même boucle d’événements que `/healthz`          | Un cycle chargé du catalogue ou de compression peut retarder les sondes ; un délai d’expiration court redémarre alors l’**unique** réplique.                                                                                                                                                                                                                                                        |

**Matrice des sondes** (voir également les [recommandations relatives aux sondes Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)) :

| Sonde                 | Cible                                                              | À ne pas utiliser                                                                             |
| --------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Disponibilité         | TCP sur `PORT` (`20128` par défaut), ou HTTP souple sur `/healthz` | `/api/monitoring/health`                                                                      |
| État de préparation   | HTTP `GET /healthz`                                                | Des délais d’expiration stricts qui considèrent une boucle d’événements occupée comme arrêtée |
| Approfondie / humaine | `/api/monitoring/health`                                           | Sonde de disponibilité automatisée du kubelet                                                 |

**Mises à niveau :** attendez-vous à ce que chaque session soit interrompue. Drainez les clients si vous le pouvez ; aucune mise à jour progressive n’est possible avec SQLite par défaut. La combinaison de `restart: unless-stopped` dans Compose et du `HEALTHCHECK` Docker remplacera également l’unique processus lorsque le conteneur est non sain — avec le même rayon d’impact.

Extrait Kubernetes pour une **réplique unique** (Recreate est obligatoire ; n’augmentez pas `replicas` pour un même fichier SQLite) :

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

La pause `preStop` permet à Kubernetes de retirer les endpoints du Service avant SIGTERM, afin que le **nouveau** trafic cesse d’atteindre le processus en cours d’arrêt. Les flux SSE `/v1/responses` en cours sont drainés pendant une durée maximale définie par `SHUTDOWN_TIMEOUT_MS` (30 s par défaut), au moyen de baux d’admission lourds (#11015). Les nouvelles requêtes qui atteignent encore le processus reçoivent `503` + `Retry-After: 5`. La période sans endpoint de Recreate, jusqu’à ce que le remplacement soit prêt, reste une interruption complète — elle est inhérente à la topologie SQLite et ne résulte pas d’une mauvaise configuration des sondes.

Postgres externe / la haute disponibilité avec plusieurs processus d’écriture ne constitue **pas** une voie standard documentée. Si vous avez besoin de haute disponibilité, conservez une seule réplique ou exécutez une topologie que le projet a testée et documentée séparément. Les travaux sur Postgres/MySQL sont suivis dans [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Jusqu’à leur livraison, la seule méthode prise en charge pour multiplier la capacité des **grandes** requêtes `/v1/responses` consiste à utiliser N processus indépendants (section suivante), et non `replicas > 1` sur un même volume.

## Mise à l’échelle horizontale : N processus indépendants

Un processus Node correspond à **un tas V8**. Deux requêtes d’agent de codage `POST /v1/responses` (RTK + Caveman) simultanées d’environ 3 Mio / 750 000 tokens interrompent ce tas vers 12 Gio (`FATAL ERROR: Reached heap limit`) et peuvent provoquer une saturation mémoire dans un cgroup de 16 Gio. Voir [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Cette mesure constitue un avertissement relatif au **budget mémoire**, et non une limite maximale du produit fixée à deux longues requêtes `/v1/responses` simultanées. L’admission des chats lourds est contrôlée par un budget d’octets d’entrée calculé automatiquement (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionné à partir de cette même limite V8/cgroup — l’augmenter manuellement (ou définir l’ancienne limite `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` basée sur le nombre de requêtes) sur un processus déjà dimensionné réintroduit l’interruption. Les petits chats, `/healthz`, `/v1/models` et MCP ne sont **pas** soumis à cette limite.

### Un seul processus : plus de deux longues requêtes `/v1/responses`

Un processus **sain** (tas inférieur à `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, valeur par défaut `0.75`) **peut** exécuter plus de deux longues requêtes `POST /v1/responses` simultanées lorsque le budget d’octets en vol à l’échelle du processus (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) dispose encore de capacité. Les corps dont la taille est supérieure ou égale à `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (256 Kio par défaut) acquièrent le même bail de ressources lourdes que les requêtes structurellement complexes et utilisent le même mécanisme d’échappement `tryAcquireHealthyHeadroom` de [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). La prise en charge de dizaines de clients SSE de longue durée simultanés (les opérateurs en ont souvent besoin de 40 à 50) est une question de **budget mémoire** — dimensionnez le tas, les emplacements principaux/de réserve et `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — et non une limite stricte du produit fixée à « 2 maximum ». Un tas sous pression continue de délester la charge avec une erreur `503` permettant une nouvelle tentative, afin d’éviter le retour du problème #7849.

Pour **multiplier les tas** (anciens espaces V8 indépendants) **dès aujourd’hui** :

| À faire                                                                                                                                                                                            | À ne pas faire                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Exécuter **N conteneurs/pods**, chacun avec son **propre** `DATA_DIR` / volume                                                                                                                     | Définir `replicas > 1` pour un même fichier SQLite                                  |
| Dimensionner les requêtes lourdes en vol et la réserve saine selon le budget du tas / des octets en vol ; 1 à 2 est la valeur par défaut prudente pour #7849, et non une limite stricte du produit | Attribuer 8× plus de RAM à un processus et une limite de nombre illimitée           |
| Facultatif : `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` pour des **compteurs de quotas partagés**                                                                                        | Considérer Redis comme un SQLite partagé — ce n’est pas le cas                      |
| Dupliquer les secrets des fournisseurs dans chaque instance (ou accepter des tableaux de bord partitionnés)                                                                                        | S’attendre à un tableau de bord / journal d’appels unique pour toutes les instances |
| Placer n’importe quel équilibreur de charge en frontal ; une affinité par clé d’API ou session suffit                                                                                              | Exiger un middleware tenant compte de la taille et propre à un fournisseur          |

Matériel : le nombre de longues requêtes `/v1/responses` simultanées par instance est une question de **budget mémoire** (tas + octets en vol / #10110). Avec `N` répertoires `DATA_DIR` indépendants, les tas sont toujours multipliés : la RAM de l’hôte doit prendre en charge `N × cgroup`, et non « un pod de 16 Gio avec N=8 ». N’utilisez jamais `replicas > 1` sur un même fichier SQLite.

Exemple Compose (deux tas, deux volumes — pas `deploy.replicas: 2`) :

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

La densité au sein d’un même processus (compression en dehors de l’isolat HTTP) est traitée dans [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). La mise en place d’un cluster logique unique reposant sur un état durable partagé est traitée dans [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Erreurs régionales Gemini dans Docker

Google AI Studio / l’API Gemini peut renvoyer une erreur HTTP 400 avec FAILED_PRECONDITION et
`User location is not supported for the API use.` Une requête réussie sur l’hôte
ne prouve pas que le conteneur utilise la même route sortante. L’ordre DNS,
la connectivité IPv4/IPv6, le routage VPN et les proxys configurés peuvent différer. Consultez
[les régions prises en charge par Google](https://ai.google.dev/gemini-api/docs/available-regions)
ainsi que la route de connexion réelle ; cette erreur ne permet pas à elle seule de conclure que la clé API est incorrecte.

### Privilégier un proxy spécifique à la connexion

Utilisez la [configuration de proxy par connexion](../ops/PROXY_GUIDE.md#4-level-proxy-system)
d’OmniRoute pour la connexion Gemini concernée, puis relancez **Test Connection** et une petite requête
avec le même modèle. Ainsi, la modification du routage reste limitée à cette connexion. Vérifiez
que le proxy est accessible depuis le conteneur et que la connexion le sélectionne réellement.
La modification de la route ne garantit pas l’éligibilité régionale en amont.

### Comparer la mise en réseau de l’hôte et du conteneur

Conservez la même clé, le même modèle et la même requête lors de la comparaison des résultats authentifiés ; ne
publiez jamais d’identifiants, de mots de passe de proxy ou d’en-têtes d’autorisation complets dans un ticket.
Commencez par vérifier les familles d’adresses proposées par le résolveur du système d’exploitation, en utilisant la même commande
sur l’hôte et dans le conteneur :

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Remplacez `omniroute` par le service que vous exécutez (par exemple, `omniroute-web`). Ces
commandes affichent les familles d’adresses sans identifiants ni adresses IP. Une valeur `6`
renvoyée indique uniquement un résultat DNS IPv6 : elle ne prouve **pas** qu’une route IPv6 utilisable ou qu’un accès à l’API existe.
Lorsque `curl` est installé, comparez `curl -4 -I https://generativelanguage.googleapis.com`
à `curl -6 -I https://generativelanguage.googleapis.com` dans les deux environnements.
Une réponse HTTP prouve la connectivité pour ce test, même s’il s’agit d’une erreur liée à l’absence d’authentification ;
seule la requête authentifiée au modèle permet de tester l’éligibilité à Gemini.

### Autre solution au niveau de l’hôte : IPv6 fonctionnel et politique du résolveur

L’auteur du signalement [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) a rétabli
l’accès dans son environnement en activant IPv6 pour les conteneurs et en modifiant la sélection
des adresses de glibc. Considérez cette approche comme une solution propre à l’environnement. Vérifiez le bon fonctionnement d’IPv6
sur l’hôte, la sortie et le routage du conteneur ainsi que les règles du pare-feu avant d’ajuster les préférences du résolveur.
Une adresse ULA privée ne suffit pas, à elle seule, à établir une connectivité IPv6 publique.

Pour les services déjà rattachés au réseau par défaut de Compose, ce fragment active
IPv6 sur ce réseau ; conservez le reste de la configuration de votre service, de ses ports et de ses volumes :

```yaml
networks:
  default:
    enable_ipv6: true
```

Pour un réseau nommé, activez cette option sur le réseau auquel le service est effectivement rattaché. Docker peut
allouer un sous-réseau ULA ; ne sélectionnez un sous-réseau explicite et sans chevauchement que si votre réseau
l’exige. Consultez [la mise en réseau IPv6 de Docker](https://docs.docker.com/engine/daemon/ipv6/)
et [les options réseau de Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Sur une **image basée sur glibc**, `/etc/gai.conf` peut modifier la sélection des adresses. Le Dockerfile actuel
du dépôt utilise Debian ; les images personnalisées basées sur musl n’utilisent pas ce mécanisme.
La modification signalée remplace le libellé ULA `label fc00::/7 6` par
`label fc00::/7 1`. Partez de la table de politiques complète de l’image et conservez ses autres
entrées : l’ajout d’une entrée `label` ou `precedence` remplace cette table par défaut, de sorte qu’un fichier
ne contenant que la ligne modifiée est insuffisant. La
[référence de configuration de glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documente cette sémantique. Montez le fichier vérifié en lecture seule à l’emplacement `/etc/gai.conf`
et recréez le service pour appliquer la modification.

Cette modification affecte la sélection des adresses par le système d’exploitation pour **tout le trafic sortant de ce conteneur**.
Elle ne force pas toutes les applications à choisir IPv6 : l’ordre DNS et la sélection
des connexions de Node ont également leur importance. En particulier, `--dns-result-order=ipv4first` privilégie IPv4 et
ne résout pas une défaillance propre à IPv4. Consultez [l’ordre DNS de Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Testez à nouveau Gemini et vos autres fournisseurs après toute modification au niveau de l’hôte. Pour revenir en arrière,
supprimez le montage personnalisé de `gai.conf`, restaurez la configuration réseau précédente et
recréez le service/réseau concerné pendant une fenêtre de maintenance. La recréation d’un réseau
peut interrompre les autres conteneurs qui y sont rattachés ; ne supprimez pas le volume de données persistantes.

## Remarques importantes

- **Mode WAL de SQLite :** Il faut laisser `docker stop` se terminer afin qu’OmniRoute puisse réintégrer les dernières modifications dans `storage.sqlite` via un point de contrôle. Les fichiers Compose fournis définissent déjà un délai d’arrêt de 40 s. Si vous exécutez directement l’image, conservez `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP` :** Définissez cette variable sur `true` si les sauvegardes périodiques/avant écriture sont gérées en externe. Les migrations de bases de données existantes nécessitent toujours leur propre instantané de sécurité durable ainsi qu’un mécanisme de protection pour les migrations de masse.
- **Persistance des données :** Montez toujours un volume sur `/app/data` afin de conserver votre base de données, vos clés et vos configurations lors des redémarrages du conteneur.
- **Configuration du port :** Remplacez la variable d’environnement `PORT` pour modifier le port par défaut `20128`.

## Voir aussi

- [Guide de déploiement sur une VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuration d’une VM avec nginx et Cloudflare
- [Guide de déploiement sur Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Déployer sur Fly.io
- [Configuration de l’environnement](../reference/ENVIRONMENT.md) — Référence complète du fichier `.env`
