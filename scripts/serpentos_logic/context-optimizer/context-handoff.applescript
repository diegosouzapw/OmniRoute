-- Context Handoff — протокол context-90: wip-коммит + handoff-файл + уведомление.
-- Запуск: osascript scripts/context-optimizer/context-handoff.applescript
on run
	set repoPath to "/Users/work/serpentos"
	set ts to do shell script "date +%Y%m%d-%H%M"
	set handoffFile to repoPath & "/docs/handoff-" & ts & ".md"
	-- wip-коммит текущего состояния (на текущей ветке; NEVER push в main)
	do shell script "cd " & quoted form of repoPath & " && git add -A && git commit -m 'wip: handoff (context-90 protocol)' >/dev/null 2>&1 || true"
	set branchName to do shell script "cd " & quoted form of repoPath & " && git branch --show-current"
	set lastCommit to do shell script "cd " & quoted form of repoPath & " && git log -1 --oneline"
	set md to "# Handoff " & ts & " (context-90 protocol)" & linefeed & linefeed & "- Branch: `" & branchName & "`" & linefeed & "- Last commit: " & lastCommit & linefeed & "- Триггер: контекст ~90%" & linefeed & "- Следующий шаг: новая сессия → /gsd:resume-work, прочитать этот файл + tail -30 OS-NOTES.md" & linefeed
	do shell script "printf '%s' " & quoted form of md & " > " & quoted form of handoffFile
	display notification "Handoff записан: docs/handoff-" & ts & ".md (" & branchName & ")" with title "Serpent OS — Context 90%"
	return handoffFile
end run
