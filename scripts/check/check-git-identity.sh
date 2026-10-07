#!/usr/bin/env sh
# Guard de identidade de commit — previne misattribution de autoria.
#
# Contexto (ver .mailmap na raiz): este checkout já produziu DUAS janelas de
# commits com autoria trocada, ambas por um override de identidade deixado para
# trás por uma sessão automatizada:
#   1. 2026-08-13..26 — nome "Xiangzhe" + e-mail de @backryun (237 commits)
#   2. 2026-08-29..09-02 — nome "Markus Hartung" + e-mail do mantenedor (59 commits)
#
# Este gate NÃO impõe uma identidade única: contribuidores commitam normalmente
# com a sua, e creditar um contribuidor via `--author` continua funcionando.
# Ele bloqueia apenas as duas assinaturas do defeito:
#   (a) um COMMITTER que não é a identidade desta máquina (pega ambas as janelas);
#   (b) um AUTHOR com o e-mail do mantenedor sob o nome de outra pessoa;
#   (c) um e-mail explicitamente aposentado (`omniroute.legacyEmail`).
#
# Ativação — opcional e por máquina; sem ela o gate é inerte:
#   git config --global omniroute.expectedName  "diegosouzapw"
#   git config --global omniroute.expectedEmail "8016841+diegosouzapw@users.noreply.github.com"
#   git config --global --add omniroute.legacyEmail "diegosouzapw@users.noreply.github.com"

expected_name=$(git config --get omniroute.expectedName 2>/dev/null)
expected_email=$(git config --get omniroute.expectedEmail 2>/dev/null)
legacy_emails=$(git config --get-all omniroute.legacyEmail 2>/dev/null)

# Sem configuração nesta máquina o gate não opina — contribuidores não são afetados.
[ -z "$expected_email" ] && exit 0

an=$(git var GIT_AUTHOR_IDENT    2>/dev/null | sed 's/ <.*//')
ae=$(git var GIT_AUTHOR_IDENT    2>/dev/null | sed 's/.*<//; s/>.*//')
cn=$(git var GIT_COMMITTER_IDENT 2>/dev/null | sed 's/ <.*//')
ce=$(git var GIT_COMMITTER_IDENT 2>/dev/null | sed 's/.*<//; s/>.*//')

fail=0

# (a) O COMMITTER é quem executa o commit — nesta máquina, sempre o dono dela.
#     Um override de identidade esquecido por uma sessão aparece exatamente aqui,
#     e foi o que passou despercebido nas duas janelas: em agosto NEM o nome NEM
#     o e-mail eram do mantenedor, então checar só o e-mail dele não bastaria.
if [ "$ce" != "$expected_email" ] || { [ -n "$expected_name" ] && [ "$cn" != "$expected_name" ]; }; then
  echo "🛑 COMMITTER não é a identidade desta máquina: $cn <$ce>" >&2
  fail=1
fi

# (b) O AUTHOR pode ser um contribuidor (crédito via --author), mas nunca pode
#     carregar o e-mail do mantenedor sob o nome de outra pessoa.
if [ -n "$expected_name" ] && [ "$ae" = "$expected_email" ] && [ "$an" != "$expected_name" ]; then
  echo "🛑 AUTHOR combina o e-mail do mantenedor com outro nome: $an <$ae>" >&2
  fail=1
fi

# (c) e-mails aposentados que já causaram misattribution.
for legacy in $legacy_emails; do
  if [ "$ae" = "$legacy" ]; then
    echo "🛑 AUTHOR usa e-mail aposentado: $an <$ae>" >&2
    fail=1
  fi
  if [ "$ce" = "$legacy" ]; then
    echo "🛑 COMMITTER usa e-mail aposentado: $cn <$ce>" >&2
    fail=1
  fi
done

[ "$fail" = "0" ] && exit 0

cat >&2 <<MSG

   Identidade esperada nesta máquina: $expected_name <$expected_email>
   Corrija com:
     git config --global user.name  "$expected_name"
     git config --global user.email "$expected_email"
   Para creditar um contribuidor, use o E-MAIL DELE (nunca o seu):
     git commit --author="Nome <email-do-contribuidor>"
MSG
exit 1
