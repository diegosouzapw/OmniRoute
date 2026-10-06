---
title: Self-Hosted Runner Box Operations
---

# Self-Hosted Runner Box Operations (.113 pool)

The self-hosted pool (`self-hosted, omni-release` on all eight runners; `omni-build` on two) runs on the **.113** box.
Measured 2026-08-28 (v3.8.50 postmortem, Parte III):

| resource  | value                                                                                                          | what it means for scheduling                                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 cores** (was 16 GB when this doc was first written)                                               | one `next-build` peaks at **~14 GB** → 2 concurrent heavy builds saturate the box, 3 take it down (2026-08-28 06:42Z: load 56, two jobs lost) |
| swap      | 15 GB                                                                                                          | it swapped its way through the v3.8.50 publish; pressure shows in `/proc/pressure/memory`                                                     |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                          | anything parked there is memory; leftovers are swept after 3 h                                                                                |
| disk      | 188 GB                                                                                                         | `_work` checkouts of 8 runners reach ~70 GB with no cap                                                                                       |
| runners   | **6 listeners**: 4 OmniRoute (1 `omni-build` + 1 `omni-release`-only + 2 `omni-light`) + OmniHeuris + OmniMind | all share the memory above; `omniroute-113-3/-4/-7/-8` are disabled (`systemctl enable --now` brings one back)                                |

## Install the janitor (one-time, on the box)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): every 30 min, log to /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` is required: the janitor proves a path is idle with one snapshot of open
files before removing it, and without the tool it removes nothing and says so
(exit 1). Try any change with `--dry-run` first — it prints exactly what it would
do and touches nothing.

What it does every run: sweeps our own leftovers (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) after **3 h on tmpfs** and 24 h on disk
`_work/_temp`; kills a `next-build` older than 75 min (no job runs that long — on
2026-08-27 one ran 70 min after GitHub had declared its job lost); prunes 48 h-old
checkouts of runners whose unit is **stopped**; alerts on disk ≥ 85 %, memory PSI
`full/avg60` ≥ 10 %, and more listeners than `MAX_ACTIVE_RUNNERS` (with an
omniroute/other breakdown). Exit 1 = attention needed; read the log.

## Runner units: KillMode

The runner's default `KillMode=process` leaves `Runner.Worker → npm → next-build`
alive when a unit is stopped or restarted — an orphan build keeps eating RAM and
CPU with no job attached. Every OmniRoute unit carries a drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
with `KillMode=mixed`: SIGTERM to the listener first, SIGKILL to the whole cgroup at
`TimeoutStop`. It takes effect on the unit's next restart — restart **one runner at
a time, only when idle**, with the idle check and the restart in the same command.

## Operating rules

- **Heavy-build ceiling: ONE at a time — enforced by label (since 2026-08-29).** Every job
  that runs a full `next build` targets `[self-hosted, omni-build]`, and only
  **`omniroute-113-5`** carries that label (added through the runners API — no
  re-registration): `ci.yml` `Build`, `npm-publish.yml` `publish`, both
  `nightly-release-green` validations, and `docker-publish.yml` **amd64** (hosted
  7 GB ResourceExhausted this tree — #11976). The arm64 Docker leg stays on
  `ubuntu-24.04-arm` (no ARM box) with webpack. Docker amd64 also uses webpack:
  Turbopack on this tree panicked inside BuildKit (`TurbopackInternalError:
  there must be a path to a root`, run 33253576569) even with 31 GB; the same
  tree's arm64 webpack build on hosted ARM succeeded. `docker-publish` amd64
  shares the `heavy-build-main` concurrency group with `ci.yml` `Build`
  (`cancel-in-progress: false`) so it queues on the one slot. Docker Engine
  must be on `omniroute-113-5` (`docker info` is the first step of the publish
  job). Two was the previous ceiling and it was wrong for 31 GB: on
  2026-08-29 17:26 UTC two concurrent `next-build`s (15.4 GB + 17.2 GB RSS) drove the box
  to 5 GB free with 4 GB of swap in use and the kernel OOM-killed one of them — systemd
  booked the kill on the _other_ runner's unit, `runsvc.sh` SIGKILLed that listener, and
  the job on it died with "The runner has received a shutdown signal" (same text as a
  hosted-runner OOM). `omniroute-113-6` keeps `omni-release` only. Heavy builds from
  `main` merges, PRs and the nightly now serialize on one slot; the queue is the price.
  The second slot comes back the day the Proxmox VM gets more RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Light pool: `omni-light` (2026-08-29, #11965).** `omniroute-113` and `omniroute-113-2` carry
  `omni-light` for jobs that need a backend-only `next build` (~5–6 GB) but not a full one: the
  nightly Schemathesis, promptfoo, garak and axe-a11y jobs. They ran on the hosted 7 GB runner and
  died on `release/v3.8.51` with nobody watching. Worst case on the box is 2 heavy + 2 light ≈
  30 + 12 GB — over 31 GB of RAM, inside the 16 GB of swap; the real fix for headroom is more RAM
  on the Proxmox VM (`tomni-proxmox-113`), which turns the label ceilings into 3 heavy + 2 light.
- **Fewer listeners on purpose.** Four OmniRoute units were disabled on 2026-08-29 — with only
  `ci.yml` `Build` and the nightlies using the box, 8 listeners were idle and each extra one is a
  potential 14 GB tenant. The janitor ceiling is 6 (`MAX_ACTIVE_RUNNERS=6` in cron): it counts
  every `Runner.Listener` on the box, and OmniHeuris + OmniMind add two to our four.
- **Never clean `/tmp` or `_work` by hand while any runner is busy.** A
  check-then-delete with a gap between the two is how a live Build job lost its
  `_work` on 2026-08-27. The janitor does the check and the removal in one step;
  let it.
- Stopping a runner mid-job cancels the job (observed live): `systemctl stop` only
  when its listener has no `Runner.Worker` child — and do it in one command.
- Workflows must not park artefacts in `/tmp` (it is RAM). Download to
  `$RUNNER_TEMP` (on disk, per runner) — the 1.3 GB `next-build` artefact took 27–32
  minutes to land on the tmpfs and 2 minutes to upload from disk.
- The `.15` VPS is homologation-only — never runs CI runners.
