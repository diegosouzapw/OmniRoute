-- TokenSaver Guard — health-check :4000 и авто-рестарт при падении.
-- Запуск вручную: osascript scripts/context-optimizer/tokensaver-guard.applescript
-- Автозапуск: launchd plist com.serpent.tokensaver-guard.plist (каждые 10 мин).
on run
	set healthCmd to "curl -s -m 5 http://localhost:4000/health || true"
	set healthOut to do shell script healthCmd
	if healthOut contains "\"status\":\"ok\"" then
		return "OK: " & healthOut
	end if
	-- прокси лежит: перезапуск
	do shell script "pkill -f 'tokensaver.py --server' || true"
	delay 1
	do shell script "nohup /usr/bin/python3 $HOME/token-saver/tokensaver.py --server >> $HOME/.tokensaver/tokensaver.log 2>&1 & echo restarted"
	delay 6
	set healthOut2 to do shell script healthCmd
	if healthOut2 contains "\"status\":\"ok\"" then
		display notification "TokenSaver перезапущен на :4000" with title "Serpent OS"
		return "RESTARTED: " & healthOut2
	else
		display notification "TokenSaver НЕ поднялся — смотри ~/.tokensaver/tokensaver.log" with title "Serpent OS" sound name "Basso"
		return "FAILED: см. ~/.tokensaver/tokensaver.log"
	end if
end run
