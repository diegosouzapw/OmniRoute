# Self-Hosted Runner Box Operations (.113 pool) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

O pool auto-hospedado (`self-hosted, omni-release` em todos os oito runners; `omni-build` em dois) é executado na máquina **.113**.
Medições de 2026-08-28 (post-mortem da v3.8.50, Parte III):

| recurso   | valor                                                                                                             | o que isso significa para o agendamento                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 núcleos** (eram 16 GB quando este documento foi escrito pela primeira vez)                           | um `next-build` atinge um pico de **~14 GB** → 2 builds pesados simultâneos saturam a máquina; 3 a derrubam (2026-08-28 06:42Z: carga 56, dois jobs perdidos) |
| swap      | 15 GB                                                                                                             | a máquina recorreu a swap durante a publicação da v3.8.50; a pressão aparece em `/proc/pressure/memory`                                                       |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                             | tudo o que for armazenado ali ocupa memória; resíduos são removidos após 3 h                                                                                  |
| disco     | 188 GB                                                                                                            | os checkouts em `_work` de 8 runners chegam a ~70 GB sem limite                                                                                               |
| runners   | **6 listeners**: 4 OmniRoute (1 `omni-build` + 1 somente `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | todos compartilham a memória acima; `omniroute-113-3/-4/-7/-8` estão desabilitados (`systemctl enable --now` reativa um deles)                                |

## Instale o janitor (uma única vez, na máquina)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): a cada 30 min, registrar em /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` é obrigatório: o janitor comprova que um caminho está ocioso usando um único snapshot dos arquivos
abertos antes de removê-lo e, sem a ferramenta, não remove nada e informa o motivo
(saída 1). Teste qualquer alteração primeiro com `--dry-run` — ele mostra exatamente o que faria
sem modificar nada.

O que ele faz a cada execução: remove nossos próprios resíduos (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) após **3 h no tmpfs** e 24 h no
`_work/_temp` do disco; encerra um `next-build` com mais de 75 min (nenhum job demora tanto — em
2026-08-27, um deles ficou em execução por 70 min depois que o GitHub declarou seu job como perdido);
remove checkouts com mais de 48 h de runners cuja unidade esteja **parada**; alerta quando o uso do disco
é ≥ 85%, o PSI de memória `full/avg60` é ≥ 10% e há mais listeners que o definido em
`MAX_ACTIVE_RUNNERS` (com detalhamento entre omniroute/outros). Saída 1 = atenção necessária; consulte o log.

## Unidades de runner: KillMode

O `KillMode=process` padrão do runner deixa `Runner.Worker → npm → next-build`
ativo quando uma unidade é interrompida ou reiniciada — uma build órfã continua consumindo RAM e
CPU sem nenhum job associado. Cada unidade do OmniRoute possui um drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
com `KillMode=mixed`: SIGTERM primeiro para o listener e SIGKILL para todo o cgroup ao
atingir `TimeoutStop`. Isso entra em vigor na próxima reinicialização da unidade — reinicie **um runner
por vez, somente quando estiver ocioso**, com a verificação de ociosidade e a reinicialização no mesmo comando.

## Regras operacionais

- **Limite de builds pesadas: UMA por vez — imposto por label (desde 2026-08-29).** Todo job
  que executa um `next build` completo tem como destino `[self-hosted, omni-build]`, e somente
  **`omniroute-113-5`** possui essa label (adicionada pela API de runners — sem
  novo registro): `ci.yml` `Build`, `npm-publish.yml` `publish`, ambas as
  validações de `nightly-release-green` e **amd64** de `docker-publish.yml` (o runner hospedado
  de 7 GB sofreu ResourceExhausted nessa árvore — #11976). A etapa arm64 do Docker permanece em
  `ubuntu-24.04-arm` (não há máquina ARM) com webpack. O Docker amd64 também usa webpack:
  o Turbopack entrou em pânico nessa árvore dentro do BuildKit (`TurbopackInternalError:
there must be a path to a root`, execução 33253576569), mesmo com 31 GB; a build
  arm64 com webpack da mesma árvore foi concluída com sucesso no ARM hospedado. O amd64 de
  `docker-publish` compartilha o grupo de concorrência `heavy-build-main` com o `Build`
  de `ci.yml` (`cancel-in-progress: false`), portanto entra na fila para a única vaga. O Docker Engine
  deve estar em `omniroute-113-5` (`docker info` é a primeira etapa do job de publicação).
  Duas era o limite anterior, e ele estava errado para 31 GB: em
  2026-08-29 17:26 UTC, dois `next-build`s simultâneos (15,4 GB + 17,2 GB de RSS) deixaram a máquina
  com 5 GB livres e 4 GB de swap em uso, e o OOM killer do kernel encerrou um deles — o systemd
  registrou o encerramento na unidade do _outro_ runner, `runsvc.sh` enviou SIGKILL àquele listener, e
  o job nele morreu com "O runner recebeu um sinal de desligamento" (o mesmo texto de um
  OOM em runner hospedado). `omniroute-113-6` mantém apenas `omni-release`. Builds pesadas de
  merges em `main`, PRs e da execução noturna agora são serializadas em uma única vaga; a fila é o preço.
  A segunda vaga retornará no dia em que a VM do Proxmox receber mais RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pool leve: `omni-light` (2026-08-29, #11965).** `omniroute-113` e `omniroute-113-2` possuem
  `omni-light` para jobs que precisam de um `next build` somente do backend (~5–6 GB), mas não de um completo: os
  jobs noturnos de Schemathesis, promptfoo, garak e axe-a11y. Eles eram executados no runner hospedado de 7 GB e
  morreram em `release/v3.8.51` sem ninguém monitorando. O pior caso na máquina é 2 pesadas + 2 leves ≈
  30 + 12 GB — acima dos 31 GB de RAM, mas dentro dos 16 GB de swap; a solução real para obter folga é mais RAM
  na VM do Proxmox (`tomni-proxmox-113`), o que transforma os limites por label em 3 pesadas + 2 leves.
- **Menos listeners de propósito.** Quatro unidades do OmniRoute foram desabilitadas em 2026-08-29 — como apenas
  o `Build` de `ci.yml` e as execuções noturnas usam a máquina, 8 listeners estavam ociosos, e cada listener adicional é um
  potencial ocupante de 14 GB. O limite do janitor é 6 (`MAX_ACTIVE_RUNNERS=6` no cron): ele contabiliza
  cada `Runner.Listener` na máquina, e OmniHeuris + OmniMind adicionam dois aos nossos quatro.
- **Nunca limpe `/tmp` ou `_work` manualmente enquanto qualquer runner estiver ocupado.** Uma
  verificação seguida de exclusão, com um intervalo entre as duas, foi o que fez um job de Build ativo perder seu
  `_work` em 2026-08-27. O janitor faz a verificação e a remoção em uma única etapa;
  deixe que ele faça isso.
- Interromper um runner no meio de um job cancela o job (observado ao vivo): use `systemctl stop` somente
  quando o listener não tiver nenhum processo filho `Runner.Worker` — e faça isso em um único comando.
- Os workflows não devem armazenar artefatos em `/tmp` (ele fica na RAM). Baixe para
  `$RUNNER_TEMP` (em disco, por runner) — o artefato de 1,3 GB de `next-build` levou de 27 a 32
  minutos para chegar ao tmpfs e 2 minutos para ser enviado a partir do disco.
- O VPS `.15` é somente para homologação — nunca executa runners de CI.
