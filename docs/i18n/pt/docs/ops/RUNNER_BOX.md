# Self-Hosted Runner Box Operations (.113 pool) (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

O conjunto autoalojado (`self-hosted, omni-release` nos oito runners; `omni-build` em dois) é executado na máquina **.113**.
Medições de 2026-08-28 (análise post-mortem da v3.8.50, Parte III):

| recurso   | valor                                                                                                            | implicações para o agendamento                                                                                                                                             |
| --------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 núcleos** (eram 16 GB quando este documento foi escrito pela primeira vez)                          | um `next-build` atinge picos de **~14 GB** → 2 builds pesadas em simultâneo saturam a máquina; 3 deixam-na inoperacional (2026-08-28 06:42Z: carga 56, dois jobs perdidos) |
| swap      | 15 GB                                                                                                            | conseguiu concluir a publicação da v3.8.50 recorrendo a swap; a pressão é visível em `/proc/pressure/memory`                                                               |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                            | tudo o que aí for colocado ocupa memória; os resíduos são limpos ao fim de 3 h                                                                                             |
| disco     | 188 GB                                                                                                           | os checkouts em `_work` dos 8 runners chegam a ~70 GB sem qualquer limite                                                                                                  |
| runners   | **6 listeners**: 4 OmniRoute (1 `omni-build` + 1 apenas `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | todos partilham a memória acima indicada; `omniroute-113-3/-4/-7/-8` estão desativados (`systemctl enable --now` reativa um deles)                                         |

## Instalar o processo de limpeza (uma única vez, na máquina)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): a cada 30 min, registar em /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

O `lsof` é obrigatório: o processo de limpeza confirma que um caminho está inativo através de uma única captura dos ficheiros abertos antes de o remover; sem esta ferramenta, não remove nada e informa desse facto (exit 1). Teste primeiro qualquer alteração com `--dry-run` — este mostra exatamente o que faria e não altera nada.

O que faz em cada execução: limpa os nossos próprios resíduos (`runner-*`, `omniroute-*`, `next-build*`, `e2e-build.tar.gz`) após **3 h em tmpfs** e 24 h no `_work/_temp` do disco; termina um `next-build` com mais de 75 min (nenhum job demora tanto tempo — em 2026-08-27, um deles continuou a ser executado durante 70 min depois de o GitHub ter declarado o respetivo job como perdido); elimina checkouts com 48 h de runners cuja unidade esteja **parada**; emite alertas quando a utilização do disco é ≥ 85 %, o PSI de memória `full/avg60` é ≥ 10 % e existem mais listeners do que `MAX_ACTIVE_RUNNERS` (com uma discriminação entre omniroute/outros). Exit 1 = é necessária atenção; consulte o registo.

## Unidades de runner: KillMode

O `KillMode=process` predefinido do runner deixa `Runner.Worker → npm → next-build`
em execução quando uma unidade é parada ou reiniciada — uma compilação órfã continua a consumir RAM e
CPU sem qualquer tarefa associada. Cada unidade OmniRoute inclui um drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
com `KillMode=mixed`: SIGTERM primeiro para o listener, SIGKILL para todo o cgroup ao
atingir `TimeoutStop`. Entra em vigor no reinício seguinte da unidade — reinicie **um runner de
cada vez, apenas quando estiver inativo**, com a verificação de inatividade e o reinício no mesmo comando.

## Regras de operação

- **Limite de compilações pesadas: UMA de cada vez — imposto por label (desde 2026-08-29).** Todas as tarefas
  que executam um `next build` completo têm como destino `[self-hosted, omni-build]`, e apenas
  **`omniroute-113-5`** possui esse label (adicionado através da API de runners — sem
  novo registo): `ci.yml` `Build`, `npm-publish.yml` `publish`, ambas as
  validações de `nightly-release-green` e **amd64** de `docker-publish.yml` (o runner alojado
  de 7 GB sofreu ResourceExhausted nesta árvore — #11976). A etapa Docker arm64 permanece em
  `ubuntu-24.04-arm` (não existe máquina ARM) com webpack. Docker amd64 também utiliza webpack:
  nesta árvore, o Turbopack entrou em pânico dentro do BuildKit (`TurbopackInternalError:
there must be a path to a root`, execução 33253576569), mesmo com 31 GB; a compilação
  arm64 com webpack da mesma árvore foi bem-sucedida no ARM alojado. O amd64 de
  `docker-publish` partilha o grupo de concorrência `heavy-build-main` com `Build` de
  `ci.yml` (`cancel-in-progress: false`), pelo que fica em fila para o único slot. O Docker Engine
  tem de estar em `omniroute-113-5` (`docker info` é o primeiro passo da tarefa de publicação).
  Dois era o limite anterior e estava errado para 31 GB: em
  2026-08-29 17:26 UTC, dois `next-build`s em simultâneo (15,4 GB + 17,2 GB de RSS) deixaram a máquina
  com 5 GB livres e 4 GB de swap em utilização, e o OOM do kernel terminou um deles — o systemd
  registou o processo terminado na unidade do _outro_ runner, `runsvc.sh` enviou SIGKILL para esse listener e
  a tarefa nele morreu com "The runner has received a shutdown signal" (o mesmo texto de um
  OOM num runner alojado). `omniroute-113-6` mantém apenas `omni-release`. As compilações pesadas
  provenientes de merges para `main`, PRs e da execução noturna são agora serializadas num único slot; a fila é o preço.
  O segundo slot regressa quando a VM Proxmox receber mais RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Pool leve: `omni-light` (2026-08-29, #11965).** `omniroute-113` e `omniroute-113-2` possuem
  `omni-light` para tarefas que necessitam apenas de um `next build` do backend (~5–6 GB), mas não de um completo: as
  tarefas noturnas Schemathesis, promptfoo, garak e axe-a11y. Eram executadas no runner alojado de 7 GB e
  falharam em `release/v3.8.51` sem ninguém estar a monitorizar. O pior caso na máquina é 2 pesadas + 2 leves ≈
  30 + 12 GB — acima dos 31 GB de RAM, mas dentro dos 16 GB de swap; a verdadeira solução para obter margem é adicionar mais RAM
  à VM Proxmox (`tomni-proxmox-113`), o que aumenta os limites dos labels para 3 pesadas + 2 leves.
- **Menos listeners de propósito.** Quatro unidades OmniRoute foram desativadas em 2026-08-29 — com apenas
  `Build` de `ci.yml` e as execuções noturnas a utilizarem a máquina, 8 listeners estavam inativos e cada listener adicional é um
  potencial ocupante de 14 GB. O limite do janitor é 6 (`MAX_ACTIVE_RUNNERS=6` no cron): este contabiliza
  todos os `Runner.Listener` na máquina, e OmniHeuris + OmniMind acrescentam dois aos nossos quatro.
- **Nunca limpe `/tmp` nem `_work` manualmente enquanto qualquer runner estiver ocupado.** Uma
  verificação seguida de eliminação, com um intervalo entre ambas, foi a causa de uma tarefa Build ativa perder o respetivo
  `_work` em 2026-08-27. O janitor efetua a verificação e a remoção num único passo;
  deixe-o fazê-lo.
- Parar um runner a meio de uma tarefa cancela-a (observado em produção): utilize `systemctl stop` apenas
  quando o respetivo listener não tiver um processo filho `Runner.Worker` — e faça-o num único comando.
- Os workflows não podem guardar artefactos em `/tmp` (está em RAM). Transfira-os para
  `$RUNNER_TEMP` (em disco, por runner) — o artefacto `next-build` de 1,3 GB demorou 27–32
  minutos a chegar ao tmpfs e 2 minutos a ser carregado a partir do disco.
- O VPS `.15` destina-se apenas a homologação — nunca executa runners de CI.
