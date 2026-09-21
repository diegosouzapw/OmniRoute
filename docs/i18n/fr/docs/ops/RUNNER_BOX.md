# Self-Hosted Runner Box Operations (.113 pool) (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Le pool auto-hébergé (`self-hosted, omni-release` sur les huit runners ; `omni-build` sur deux) s’exécute sur la machine **.113**.
Mesures effectuées le 2026-08-28 (post-mortem de la v3.8.50, partie III) :

| ressource | valeur                                                                                                               | incidence sur la planification                                                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 Go / 32 cœurs** (contre 16 Go lors de la rédaction initiale de ce document)                                     | un `next-build` atteint un pic d’environ **14 Go** → 2 builds lourds simultanés saturent la machine, 3 la font tomber (2026-08-28 06:42Z : charge de 56, deux jobs perdus) |
| swap      | 15 Go                                                                                                                | la publication de la v3.8.50 a abouti grâce au swap ; la pression est visible dans `/proc/pressure/memory`                                                                 |
| `/tmp`    | **tmpfs de 12 Go = RAM**                                                                                             | tout ce qui y est stocké consomme de la mémoire ; les résidus sont supprimés après 3 h                                                                                     |
| disque    | 188 Go                                                                                                               | les checkouts `_work` de 8 runners atteignent environ 70 Go sans limite                                                                                                    |
| runners   | **6 listeners** : 4 OmniRoute (1 `omni-build` + 1 réservé à `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | tous partagent la mémoire ci-dessus ; `omniroute-113-3/-4/-7/-8` sont désactivés (`systemctl enable --now` en réactive un)                                                 |

## Installer le nettoyeur (une seule fois, sur la machine)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root) : toutes les 30 min, journalisation dans /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` est requis : le nettoyeur vérifie qu’un chemin est inactif à l’aide d’un instantané des fichiers ouverts avant de le supprimer ; sans cet outil, il ne supprime rien et le signale (exit 1). Testez d’abord toute modification avec `--dry-run` — cette option affiche exactement ce qui serait fait sans rien modifier.

Ce qu’il fait à chaque exécution : supprime nos propres résidus (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) après **3 h sur tmpfs** et 24 h dans `_work/_temp` sur disque ; arrête tout `next-build` datant de plus de 75 min (aucun job ne s’exécute aussi longtemps — le 2026-08-27, l’un d’eux a continué pendant 70 min après que GitHub a déclaré son job perdu) ; supprime les checkouts datant de plus de 48 h des runners dont l’unité est **arrêtée** ; émet une alerte lorsque l’utilisation du disque est ≥ 85 %, que la pression mémoire PSI `full/avg60` est ≥ 10 % ou que le nombre de listeners dépasse `MAX_ACTIVE_RUNNERS` (avec une répartition omniroute/autres). Exit 1 = intervention requise ; consultez le journal.

## Unités de runners : KillMode

Le paramètre par défaut `KillMode=process` du runner laisse `Runner.Worker → npm → next-build`
actif lorsqu’une unité est arrêtée ou redémarrée — un build orphelin continue de consommer de la RAM et
du CPU sans qu’aucun job ne lui soit associé. Chaque unité OmniRoute comporte un drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
avec `KillMode=mixed` : SIGTERM est d’abord envoyé au listener, puis SIGKILL à l’ensemble du cgroup à
`TimeoutStop`. Il prend effet au prochain redémarrage de l’unité — redémarrez **un seul runner à
la fois, uniquement lorsqu’il est inactif**, en exécutant la vérification d’inactivité et le redémarrage dans la même commande.

## Règles d’exploitation

- **Plafond des builds lourds : UN à la fois — imposé par label (depuis le 2026-08-29).** Chaque job
  qui exécute un `next build` complet cible `[self-hosted, omni-build]`, et seul
  **`omniroute-113-5`** porte ce label (ajouté via l’API des runners — sans
  réenregistrement) : `Build` dans `ci.yml`, `publish` dans `npm-publish.yml`, les deux
  validations `nightly-release-green`, ainsi que **amd64** dans `docker-publish.yml` (les
  7 Go de l’hébergement ont provoqué un ResourceExhausted sur cet arbre — #11976). La partie Docker arm64 reste sur
  `ubuntu-24.04-arm` (aucune machine ARM) avec webpack. Docker amd64 utilise également webpack :
  Turbopack a paniqué sur cet arbre dans BuildKit (`TurbopackInternalError:
there must be a path to a root`, exécution 33253576569), même avec 31 Go ; le build
  webpack arm64 du même arbre a réussi sur un environnement ARM hébergé. La partie amd64 de
  `docker-publish` partage le groupe de concurrence `heavy-build-main` avec `Build`
  dans `ci.yml` (`cancel-in-progress: false`) afin d’attendre dans la file du seul créneau disponible. Docker Engine
  doit être présent sur `omniroute-113-5` (`docker info` est la première étape du job de publication).
  Deux était l’ancien plafond, et il était incorrect pour 31 Go : le
  2026-08-29 à 17:26 UTC, deux `next-build` simultanés (15,4 Go + 17,2 Go de RSS) ont fait tomber la mémoire
  libre de la machine à 5 Go, avec 4 Go de swap utilisés, et le mécanisme OOM du noyau a tué l’un d’eux — systemd
  a attribué l’arrêt à l’unité de l’_autre_ runner, `runsvc.sh` a envoyé SIGKILL à ce listener, et
  le job qui s’y exécutait est mort avec « The runner has received a shutdown signal » (le même texte que lors d’un
  OOM sur un runner hébergé). `omniroute-113-6` conserve uniquement `omni-release`. Les builds lourds issus
  des fusions dans `main`, des PR et du nightly sont désormais exécutés en série sur un seul créneau ; la file d’attente en est le prix.
  Le second créneau reviendra le jour où la VM Proxmox disposera de davantage de RAM (48–64 Go) :
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pool léger : `omni-light` (2026-08-29, #11965).** `omniroute-113` et `omniroute-113-2` portent
  `omni-light` pour les jobs qui nécessitent un `next build` limité au backend (~5–6 Go), mais pas un build complet : les
  jobs nightly Schemathesis, promptfoo, garak et axe-a11y. Ils s’exécutaient sur le runner hébergé de 7 Go et
  ont échoué sur `release/v3.8.51` sans que personne ne le remarque. Dans le pire des cas, la machine exécute 2 builds lourds + 2 légers ≈
  30 + 12 Go — au-delà des 31 Go de RAM, mais dans les limites des 16 Go de swap ; la véritable solution pour obtenir de la marge est d’ajouter de la RAM
  à la VM Proxmox (`tomni-proxmox-113`), ce qui porte les plafonds par label à 3 builds lourds + 2 légers.
- **Moins de listeners, volontairement.** Quatre unités OmniRoute ont été désactivées le 2026-08-29 — puisque seuls
  `Build` dans `ci.yml` et les nightlies utilisent la machine, 8 listeners étaient inactifs et chacun d’eux constituait un
  locataire potentiel de 14 Go. Le plafond du janitor est de 6 (`MAX_ACTIVE_RUNNERS=6` dans cron) : il compte
  chaque `Runner.Listener` sur la machine, et OmniHeuris + OmniMind en ajoutent deux à nos quatre.
- **Ne nettoyez jamais `/tmp` ni `_work` manuellement lorsqu’un runner est occupé.** Une
  vérification suivie d’une suppression, avec un intervalle entre les deux, a entraîné la perte du répertoire
  `_work` d’un job Build actif le 2026-08-27. Le janitor effectue la vérification et la suppression en une seule étape ;
  laissez-le faire.
- L’arrêt d’un runner en cours de job annule ce dernier (constaté en conditions réelles) : utilisez `systemctl stop` uniquement
  lorsque son listener n’a aucun processus enfant `Runner.Worker` — et effectuez cela dans une seule commande.
- Les workflows ne doivent pas stocker d’artefacts dans `/tmp` (il réside en RAM). Téléchargez-les dans
  `$RUNNER_TEMP` (sur disque, propre à chaque runner) — l’artefact `next-build` de 1,3 Go a mis 27 à 32
  minutes à arriver sur le tmpfs, contre 2 minutes pour être téléversé depuis le disque.
- Le VPS `.15` est réservé à l’homologation — il n’exécute jamais de runners CI.
