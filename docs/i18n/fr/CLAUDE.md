# CLAUDE.md (Français)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Toutes les règles du projet se trouvent dans [`AGENTS.md`](AGENTS.md)** — l’unique source de vérité pour chaque assistant
IA (architecture, conventions, tests, critères de qualité, workflow git, les 23 règles strictes,
enseignements sur les PII). Lisez-le intégralement ; ne rajoutez pas ici les règles du projet. Tout ce qui suit s’applique UNIQUEMENT
à Claude Code — il s’agit de précisions opérationnelles concernant des règles déjà définies dans `AGENTS.md`.

## Isolation des worktrees — spécificités de Claude Code

Le protocole obligatoire complet relatif aux worktrees (confirmation de la branche de base, chemin canonique
`.claude/worktrees/`, `cp -al` node_modules, règles de suppression) se trouve dans `AGENTS.md` → Workflow Git → « Isolation
des worktrees ». Points propres à Claude Code :

- Confirmez la branche de base avec l’opérateur via `AskUserQuestion` (règle stricte nº 19), sauf s’il
  vous l’a déjà indiquée.
- Privilégiez l’outil natif `EnterWorktree` — il crée déjà les worktrees sous
  `.claude/worktrees/` (le chemin canonique). Créez le worktree avec la commande `git
worktree add` documentée, puis appelez `EnterWorktree` avec son `path`.

## Sécurité intersessions — spécificités de Claude Code

Les règles strictes nº 19/nº 21/nº 22 (dans `AGENTS.md`) régissent les sessions parallèles. Rappels opérationnels pour ce
harness :

- **Reproduisez mot pour mot l’interdiction de `git stash` dans le prompt de chaque sous-agent qui manipule git**
  (outil Agent / scripts de workflow) — les sous-agents n’héritent pas de ce fichier, et la récurrence
  consignée de l’incident lié à stash provenait d’un sous-agent.
- Avant de fusionner ou de pousser vers une PR que vous n’avez pas créée _pendant cette session_, exécutez `git worktree list`
  et vérifiez à nouveau `gh pr view <N> --json state,headRefOid` (règle stricte nº 22b).
- Terminez chaque session avec le checkout principal sur la branche sur laquelle il se trouvait au démarrage.

## Superpowers / artefacts de planification — substitutions de chemins

La convention `_tasks/` est définie dans `AGENTS.md` → « Artefacts de planification et de recherche ». Les
skills superpowers sont fournis avec des valeurs par défaut qui pointent vers `docs/…` — ces valeurs sont **remplacées
ici**. Lorsqu’un skill superpowers annonce un chemin tel que « enregistré dans `docs/superpowers/plans/…` »,
remplacez-le par son équivalent sous `_tasks/…` avant d’écrire :

| Artefact (skill)                              | Valeur par défaut (à NE PAS utiliser) | Enregistrer ici à la place                                    |
| --------------------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| Plans (`writing-plans`)                       | `docs/superpowers/plans/`             | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Spécifications / conception (`brainstorming`) | `docs/superpowers/specs/`             | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Recherche (`deep-research`, ad hoc)           | `docs/research/`                      | `_tasks/research/…`                                           |
| Transferts (`/handoff`)                       | —                                     | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commitez ces artefacts dans le dépôt `_tasks/` (`git -C _tasks …`), jamais dans le dépôt principal.

## Fichiers de travail / temporaires — utilisez `_artifacts/`, pas `/tmp`

Ce projet remplace le bloc-notes temporaire de session par défaut du harness (`/tmp/claude-*/…`). Écrivez
les fichiers temporaires/de travail — exports, archives zip générées, sorties intermédiaires ponctuelles, tout ce que vous
placeriez autrement dans `/tmp` — dans `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` à la place.

- `_artifacts/` est un chemin racine `_*` : il est déjà ignoré par git (`AGENTS.md` → « Chemins racine `_*` »), existe
  uniquement sur le disque et n’est jamais suivi.
- Raison : conserver les sorties temporaires dans le projet (plutôt que dans `/tmp`) permet à l’opérateur
  de trouver et de supprimer facilement tout ce qui est temporaire en un seul endroit, au lieu de devoir chercher dans des
  répertoires `/tmp` éphémères propres aux sessions, qui disparaissent ou accumulent des fichiers non suivis.
- Ne confondez **pas** cela avec `_tasks/` (règle stricte nº 23, son propre dépôt git privé pour les
  plans/spécifications/recherches/transferts durables) — `_artifacts/` est réservé aux fichiers de travail jetables ; aucun élément
  ici n’a besoin d’être conservé ou versionné.

## Vérification de la branche de base avant l’ouverture de PR

Avant de créer une branche ou d’ouvrir une PR, exécutez la vérification de la branche de base (`AGENTS.md` → Workflow Git →
« Vérification de la branche de base » ; les skills du projet y font référence sous `.agents/skills/_shared/base-green.md`). Une PR
ouverte alors que la pointe de la branche de base est en échec doit contenir `⚠️ base-red inherited: #<issue>` dans son corps. Pour
résorber un état d’échec accumulé (pointe de la branche de base + PR en échec), utilisez le skill `/sweep-reds`.
