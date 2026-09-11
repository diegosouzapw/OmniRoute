# Tarefa compartilhada: Claude Code + Codex

## Objetivo

Estabelecer um protocolo auditável para que o Codex implemente mudanças e o Claude Code faça uma revisão independente em worktree próprio.

## Base confirmada pelo operador

- Repositório: `diegosouzapw/OmniRoute`
- Branch-base: `release/v3.8.51`
- Base usada no worktree: `e243b04de22da2d78900c27fde5f83f4fbc3d7f9`
- Branch desta tarefa: `chore/claude-codex-handoff`
- Worktree: `.claude/worktrees/claude-codex-handoff`

## Estado da base

A checagem autenticada anterior ao push não encontrou `release-freeze` nem issue `base-red` aberta para `release/v3.8.51`. A issue histórica `#12335` está encerrada desde 2 de setembro de 2026 às 00:59:31 UTC.

## Responsabilidades

1. Codex implementa no worktree dedicado da tarefa e registra commit, testes, decisões e riscos em `codex-implementation.md`.
2. Claude Code revisa o commit indicado sem reutilizar as conclusões do implementador e registra achados em `claude-review.md`.
3. Codex avalia os achados aceitos, aplica correções e documenta os testes finais em `final-verification.md`.
4. O operador decide sobre push, PR e merge.

## Regras

- Nunca usar `git stash` ou `git stash pop`.
- Nunca alterar worktrees ou branches pertencentes a outras sessões.
- Nunca registrar segredos, tokens, cookies, `.env`, bancos locais ou dados pessoais.
- Trocar trabalho por commits/SHA; não depender de mudanças soltas.
- Não atribuir autoria de commits ou PRs a agentes de IA.
- Não fazer push, merge, rebase ou force-push sem a autorização e autenticação correspondentes.
