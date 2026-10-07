# CLAUDE.md (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Todas as regras do projeto encontram-se em [`AGENTS.md`](AGENTS.md)** — a única fonte de verdade para todos os
assistentes de IA (arquitetura, convenções, testes, critérios de qualidade, fluxo de trabalho git, as 23 Regras Rígidas,
aprendizagens sobre PII). Leia-o na íntegra; não volte a adicionar aqui as regras do projeto. Tudo o que se segue aplica-se APENAS
ao Claude Code — aperfeiçoamentos operacionais das regras já definidas em `AGENTS.md`.

## Isolamento de worktrees — especificidades do Claude Code

O protocolo obrigatório completo de worktrees (confirmação do ramo base, caminho canónico
`.claude/worktrees/`, `cp -al` node_modules, regras de desmontagem) encontra-se em `AGENTS.md` → Fluxo de Trabalho Git → "Isolamento de
worktrees". Pontos específicos do Claude Code:

- Confirme o ramo base com o operador através de `AskUserQuestion` (Regra Rígida n.º 19), exceto se este
  já lho tiver indicado.
- Dê preferência à ferramenta nativa `EnterWorktree` — esta já cria worktrees em
  `.claude/worktrees/` (o caminho canónico). Crie a worktree com o comando `git
worktree add` documentado e, em seguida, invoque `EnterWorktree` com o respetivo `path`.

## Segurança entre sessões — especificidades do Claude Code

As Regras Rígidas n.º 19/21/22 (em `AGENTS.md`) regem as sessões paralelas. Lembretes operacionais para este
ambiente:

- **Replique literalmente a proibição de `git stash` no prompt de cada subagente que interaja com git**
  (ferramenta Agent/scripts de Workflow) — os subagentes não herdam este ficheiro e a recorrência
  registada do incidente com stash ocorreu através de um subagente.
- Antes de fazer merge ou push para qualquer PR que não tenha criado _nesta sessão_, execute `git worktree list`
  e volte a verificar `gh pr view <N> --json state,headRefOid` (Regra Rígida n.º 22b).
- Termine todas as sessões com o checkout principal no ramo em que começou.

## Superpowers/artefactos de planeamento — substituições de caminhos

A convenção `_tasks/` encontra-se definida em `AGENTS.md` → "Artefactos de Planeamento e Investigação". As
skills de superpowers incluem predefinições que apontam para `docs/…` — essas predefinições são **substituídas
aqui**. Quando uma skill de superpowers anunciar um caminho como "guardado em `docs/superpowers/plans/…`",
reescreva-o para o equivalente em `_tasks/…` antes de escrever:

| Artefacto (skill)                       | Predefinição (NÃO usar)   | Guardar aqui em alternativa                                   |
| --------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Planos (`writing-plans`)                | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Especificações/design (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Investigação (`deep-research`, ad hoc)  | `docs/research/`          | `_tasks/research/…`                                           |
| Transferências (`/handoff`)             | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Faça commit desses artefactos dentro do repositório `_tasks/` (`git -C _tasks …`), nunca no repositório principal.

## Ficheiros de rascunho/temporários — utilize `_artifacts/`, não `/tmp`

Este projeto substitui o bloco de notas temporário predefinido do ambiente (`/tmp/claude-*/…`). Escreva
ficheiros temporários/de trabalho — exportações, ficheiros zip gerados, resultados intermédios pontuais, tudo o que
de outro modo colocaria em `/tmp` — em `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` é um caminho `_*` na raiz: já é ignorado pelo git (`AGENTS.md` → "Caminhos `_*` na raiz"), existe
  apenas no disco e nunca é controlado por versão.
- Motivo: manter os resultados temporários dentro do projeto (em vez de `/tmp`) permite ao operador
  encontrar e eliminar facilmente tudo o que é temporário num único local, em vez de procurar em
  diretórios `/tmp` efémeros e específicos de cada sessão, que desaparecem ou acumulam ficheiros não controlados.
- **Não** confunda isto com `_tasks/` (Regra Rígida n.º 23, o seu próprio repositório git privado para
  planos/especificações/investigação/transferências duradouros) — `_artifacts/` destina-se apenas a ficheiros de trabalho descartáveis; nada
  aqui precisa de persistir ou ser controlado por versão.

## Base verde antes de abrir PRs

Antes de criar um ramo ou abrir um PR, execute a verificação base-green (`AGENTS.md` → Fluxo de Trabalho Git →
"Verificação base-green"; as skills do projeto referenciam-na como `.agents/skills/_shared/base-green.md`). Um PR
aberto enquanto a ponta da base está vermelha deve incluir `⚠️ base-red inherited: #<issue>` no respetivo corpo. Para
resolver um estado vermelho acumulado (ponta da base + PRs vermelhos), utilize a skill `/sweep-reds`.
