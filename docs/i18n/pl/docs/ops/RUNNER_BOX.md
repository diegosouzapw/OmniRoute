---
title: Operacje self-hosted runner box
---

# Operacje self-hosted runner box (pula .113)

Pula self-hosted (etykiety `self-hosted, omni-release`) działa na maszynie 16 GB pod
`192.168.0.113`. Dwa tryby awarii powtarzały się w dniach releasu i do v3.8.49 były
manualną dyscypliną; **skrypt janitor je kodyfikuje** (WS3.3 planu jakości):

1. **Osierocone katalogi temp/work** zapełniające dysk → błędy SQLite „disk-full” w trakcie joba.
2. **>4 równoległych runnerów** → joby zabijane przez OOM (8-wide zabijało joby dwukrotnie w dniu
   releasu v3.8.47; 4-wide to sprawdzony sufit).

## Instalacja janitora (jednorazowo, na maszynie)

```bash
sudo mkdir -p /opt/omniroute-ops
sudo cp scripts/ops/runner-janitor.sh /opt/omniroute-ops/
sudo chmod +x /opt/omniroute-ops/runner-janitor.sh
( sudo crontab -l 2>/dev/null; echo '*/30 * * * * /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1' ) | sudo crontab -
```

Co robi co 30 min: czyści pozostałości temp runnerów starsze niż 24h, alarmuje przy
≥85% zajętości dysku root oraz gdy liczba procesów `Runner.Listener` przekracza sufit runnerów
(domyślnie 4, regulowany własnym środowiskiem skryptu). Alerty trafiają do `/var/log/runner-janitor.log`
z niezerowym kodem wyjścia (szukaj `⚠`).

## Zasady operacyjne

- **Sufit: 4 runnery** na maszynie 16 GB. Runnery 5–8 pozostają STOPPED poza
  jawnymi eksperymentami poza szczytem — nigdy w oknie releasu.
- Zatrzymanie runnera w trakcie joba anuluje job (zaobserwowane na żywo): `systemctl stop`
  tylko gdy runner jest bezczynny (`Runner.Listener` bez potomka `Runner.Worker`).
- VPS `.15` jest wyłącznie do homologacji — nigdy nie uruchamia runnerów CI.
