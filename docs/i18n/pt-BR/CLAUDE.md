# CLAUDE.md (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Todas as regras do projeto estão em [`AGENTS.md`](AGENTS.md)** — a única fonte de verdade para todos os
assistentes de IA (arquitetura, convenções, testes, critérios de qualidade, fluxo de trabalho do git, as 23 Regras Rígidas,
aprendizados sobre PII). Leia-o por completo; não adicione novamente as regras do projeto aqui. Tudo abaixo se aplica SOMENTE
ao Claude Code — refinamentos operacionais das regras já definidas em `AGENTS.md`.

## Isolamento de worktree — especificidades do Claude Code

O protocolo obrigatório completo de worktree (confirmação da branch base, caminho canônico
`.claude/worktrees/`, `cp -al` de node_modules, regras de desmontagem) está em `AGENTS.md` → Fluxo de Trabalho do Git → "Isolamento de
worktree". Pontos específicos do Claude Code:

- Confirme a branch base com o operador por meio de `AskUserQuestion` (Regra Rígida nº 19), a menos que ele
  já tenha informado.
- Prefira a ferramenta nativa `EnterWorktree` — ela já cria worktrees em
  `.claude/worktrees/` (o caminho canônico). Crie o worktree com o comando documentado `git
worktree add` e, em seguida, chame `EnterWorktree` com seu `path`.

## Segurança entre sessões — especificidades do Claude Code

As Regras Rígidas nº 19/21/22 (em `AGENTS.md`) regem sessões paralelas. Lembretes operacionais para este
ambiente:

- **Replique literalmente a proibição de `git stash` no prompt de cada subagente que interagir com o git**
  (ferramenta Agent / scripts de Workflow) — os subagentes não herdam este arquivo, e a recorrência
  registrada do incidente com stash ocorreu por meio de um subagente.
- Antes de fazer merge ou push em qualquer PR que você não criou _nesta sessão_, execute `git worktree list`
  e verifique novamente `gh pr view <N> --json state,headRefOid` (Regra Rígida nº 22b).
- Encerre cada sessão com o checkout principal na branch em que ela começou.

## Superpowers / artefatos de planejamento — substituições de caminhos

A convenção `_tasks/` está definida em `AGENTS.md` → "Artefatos de Planejamento e Pesquisa". As
skills do superpowers são fornecidas com padrões que apontam para `docs/…` — esses padrões são **substituídos
aqui**. Quando uma skill do superpowers anunciar um caminho como "salvo em `docs/superpowers/plans/…`",
reescreva-o para o equivalente em `_tasks/…` antes de gravar:

| Artefato (skill)                          | Padrão (NÃO use)          | Salve aqui em vez disso                                       |
| ----------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Planos (`writing-plans`)                  | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Especificações / design (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Pesquisa (`deep-research`, ad hoc)        | `docs/research/`          | `_tasks/research/…`                                           |
| Transferências (`/handoff`)               | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Faça commit desses artefatos dentro do repositório `_tasks/` (`git -C _tasks …`), nunca no repositório principal.

## Arquivos temporários / descartáveis — use `_artifacts/`, não `/tmp`

Este projeto substitui o diretório temporário de sessão padrão do ambiente (`/tmp/claude-*/…`). Grave
arquivos temporários/de trabalho — exportações, zips gerados, saídas intermediárias avulsas, qualquer coisa que você
normalmente colocaria em `/tmp` — em `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` é um caminho `_*` na raiz: já ignorado pelo git (`AGENTS.md` → "Caminhos `_*` da raiz"), existe
  somente no disco e nunca é rastreado.
- Motivo: manter a saída temporária dentro do projeto (em vez de `/tmp`) facilita para o operador
  encontrar e excluir tudo que é temporário em um único lugar, em vez de procurar em diretórios
  efêmeros `/tmp` específicos de sessão que desaparecem ou acumulam arquivos não rastreados.
- **Não** confunda isso com `_tasks/` (Regra Rígida nº 23, seu próprio repositório git privado para
  planos/especificações/pesquisas/transferências duráveis) — `_artifacts/` destina-se somente a arquivos de trabalho descartáveis; nada
  aqui precisa persistir ou ser versionado.

## Base verde antes de abrir PRs

Antes de criar uma branch ou abrir um PR, execute a verificação de base verde (`AGENTS.md` → Fluxo de Trabalho do Git →
"Verificação de base verde"; as skills do projeto fazem referência a ela como `.agents/skills/_shared/base-green.md`). Um PR
aberto enquanto o topo da base está vermelho deve incluir `⚠️ base-red inherited: #<issue>` em seu corpo. Para
eliminar um estado vermelho acumulado (topo da base + PRs vermelhos), use a skill `/sweep-reds`.
