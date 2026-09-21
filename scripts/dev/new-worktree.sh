#!/usr/bin/env sh
# Cria uma worktree isolada seguindo o protocolo obrigatório do AGENTS.md
# (Git Workflow → "Worktree isolation" / Hard Rule #19), incluindo os dois
# passos que são fáceis de esquecer e falham em silêncio:
#
#   1. node_modules por HARD LINK (`cp -al`), nunca symlink — um symlink que
#      resolve fora da raiz mata o Turbopack com um FATAL que culpa a
#      "filesystem root" e não a worktree (incidente 2026-07-31, #9043).
#   2. `.husky/_` copiado — é gitignored, então uma worktree nova NÃO o tem, e
#      `core.hooksPath=.husky/_` aponta para um diretório inexistente: TODOS os
#      hooks de pre-commit ficam mudos, sem aviso nenhum. Foi assim que 59
#      commits com identidade trocada passaram pelo gate entre 29/08 e 02/09
#      (ver .mailmap e scripts/check/check-git-identity.sh).
#
# Uso:  scripts/dev/new-worktree.sh <branch> [base-branch]
# Ex.:  scripts/dev/new-worktree.sh fix/12345-algo release/v3.8.51

set -e

BRANCH="$1"
BASE="$2"

if [ -z "$BRANCH" ]; then
  echo "uso: scripts/dev/new-worktree.sh <branch> [base-branch]" >&2
  echo "  ex: scripts/dev/new-worktree.sh fix/12345-algo release/v3.8.51" >&2
  exit 1
fi

# O checkout PRINCIPAL, mesmo quando este script roda de dentro de outra worktree:
# `--show-toplevel` devolveria a worktree atual, e a nova nasceria aninhada nela.
MAIN=$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")
cd "$MAIN"

# Sem base explícita, usa a release ativa (maior release/* por semver) — nunca
# `main` e nunca "a branch em que eu estou", conforme a Hard Rule #19.
if [ -z "$BASE" ]; then
  BASE=$(git ls-remote --heads origin 'refs/heads/release/*' \
    | sed 's#.*refs/heads/##' | sort -V | tail -1)
  [ -z "$BASE" ] && { echo "não consegui resolver a release ativa; passe a base explicitamente" >&2; exit 1; }
  echo "base não informada — usando a release ativa: $BASE"
fi

DIR=".claude/worktrees/${BRANCH##*/}"
[ -e "$DIR" ] && { echo "já existe: $DIR" >&2; exit 1; }

git fetch origin "$BASE" --quiet
git worktree add "$DIR" -b "$BRANCH" "origin/$BASE"

# `.husky/_` PRIMEIRO: é minúsculo e é o que decide se os gates locais rodam.
# Copiar node_modules antes seria arriscar abortar (set -e) numa árvore de ~10 GB
# e deixar a worktree sem hook nenhum — exatamente o defeito que este script existe
# para impedir.
if [ -d "$MAIN/.husky/_" ]; then
  cp -a "$MAIN/.husky/_" "$DIR/.husky/_"
else
  echo "AVISO: .husky/_ não existe no checkout principal — rode 'npm install' lá primeiro" >&2
fi

# node_modules: hard links, ~5s e disco quase zero (inodes compartilhados).
# Um `cp -al SRC DEST` com DEST já existente aninharia SRC DENTRO dele
# (node_modules/node_modules), então DEST não pode existir aqui.
if [ -d "$MAIN/node_modules/node_modules" ]; then
  echo "AVISO: $MAIN/node_modules/node_modules existe — resíduo de um cp -al aninhado." >&2
  echo "       Ele infla a cópia e esgota o limite de hard links; convém removê-lo." >&2
fi
if [ -d "$MAIN/node_modules" ]; then
  # Falha parcial (limite de hard links, disco) não pode derrubar a worktree inteira:
  # os hooks já estão no lugar e o npm install continua sendo uma saída válida.
  if cp -al "$MAIN/node_modules" "$DIR/node_modules" 2>"$DIR/.cp-node-modules.log"; then
    echo "node_modules: $(ls "$DIR/node_modules" | wc -l) entradas (hard links)"
    rm -f "$DIR/.cp-node-modules.log"
  else
    echo "AVISO: a cópia de node_modules falhou parcialmente (veja $DIR/.cp-node-modules.log)." >&2
    echo "       Primeiras linhas:" >&2
    head -3 "$DIR/.cp-node-modules.log" >&2
  fi
else
  echo "AVISO: node_modules não existe no checkout principal — rode 'npm install' lá primeiro" >&2
fi

# Verificação: o hook precisa estar REALMENTE ativo, não apenas presente.
HOOKS_PATH=$(git -C "$DIR" config --get core.hooksPath || echo ".git/hooks")
if [ -x "$DIR/$HOOKS_PATH/pre-commit" ]; then
  echo "hooks: ativos ($HOOKS_PATH/pre-commit)"
else
  echo "AVISO: pre-commit NÃO está ativo em $DIR/$HOOKS_PATH — os gates locais não vão rodar" >&2
  exit 1
fi

echo
echo "pronto: $DIR  (branch $BRANCH, base $BASE)"
echo "  cd $DIR"
