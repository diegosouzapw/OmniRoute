# Zed IDE Integration in Docker Environments (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Quando OmniRoute viene eseguito all'interno di Docker, il normale flusso "Importa dal portachiavi di Zed" non riesce
perché il container non può raggiungere il daemon del portachiavi del sistema operativo host (libsecret su Linux,
Portachiavi su macOS, Gestione credenziali su Windows) e le directory di configurazione di Zed nel
file system host non sono visibili all'interno del container per impostazione predefinita.

## Perché l'importazione dal portachiavi non riesce in Docker

All'interno di un container si verificano due problemi bloccanti:

1. **Isolamento del file system** — `isZedInstalled()` cerca `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) o il percorso equivalente su Windows. Questi percorsi
   si trovano sull'host e non sono disponibili a meno che non vengano montati esplicitamente come volumi.
2. **Isolamento IPC** — Anche quando la directory di configurazione è montata, il modulo nativo
   `keytar` comunica con il servizio del portachiavi del sistema operativo tramite un socket Unix o una sessione D-Bus.
   Nessuno dei due viene collegato al container per impostazione predefinita, quindi la lettura delle credenziali non riesce mai.

OmniRoute rileva l'ambiente Docker tramite due euristiche:

- Presenza di `/.dockerenv` (scritto dal daemon Docker all'avvio del container).
- Presenza della stringa `docker` in `/proc/1/cgroup` (cgroup v1 di Linux).

Quando una delle due euristiche viene attivata, la route di importazione restituisce HTTP 422 con
`zedDockerEnvironment: true` e un messaggio che indica di utilizzare la scheda Importazione manuale del token.

## Utilizzo della scheda Importazione manuale del token

1. Apri **Dashboard → Provider → Zed**.
2. Il pannello **Importazione manuale del token** viene visualizzato sotto la scheda di importazione dal portachiavi. Quando
   OmniRoute rileva Docker, questo pannello si espande automaticamente dopo il primo tentativo non riuscito
   di importazione dal portachiavi.
3. Seleziona il provider dal menu a discesa (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter o DeepSeek).
4. Incolla la chiave API nel campo della password.
5. Fai clic su **Importa**.

La chiave viene salvata come nuova connessione al provider con il nome
`Zed Manual Import (<provider>)`.

## Dove Zed memorizza le chiavi API sull'host

Zed memorizza le chiavi dei provider di IA nel portachiavi del sistema operativo con nomi di servizio come
`zed-openai`, `ai.zed.openai`, `zed-anthropic` e così via. Per recuperarle per
l'importazione manuale, cerca in:

**Linux**

```
~/.config/zed/settings.json
```

La sezione `language_models` contiene le configurazioni dei provider. Le chiavi salvate nel
portachiavi tramite l'interfaccia utente di Zed non sono in formato testo normale in `settings.json`; recuperale tramite
un visualizzatore del portachiavi come GNOME Keyring / Seahorse oppure eseguendo:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Le voci del portachiavi possono essere trovate in **Accesso Portachiavi.app** cercando `zed`.

## Opzione di montaggio del volume (avanzata)

Facoltativamente, puoi montare la directory di configurazione di Zed in sola lettura nel container.
Questo non risolve il problema del portachiavi, ma può essere utile per funzionalità future che leggono
valori di configurazione non sensibili di Zed (ad esempio, le preferenze dei modelli).

```yaml
# Frammento di docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Host Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Host macOS (rimuovere invece il commento)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Futuro: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Nota: la possibilità di sovrascrivere il percorso tramite la variabile d'ambiente `ZED_CONFIG_PATH` non è ancora implementata. Questo
frammento viene fornito come riferimento per quando sarà aggiunta tale funzionalità.

## API di importazione manuale

L'endpoint di importazione manuale può anche essere chiamato direttamente:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "La mia chiave OpenAI di Zed"   // facoltativo
}
```

In caso di successo, restituisce:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Risoluzione dei problemi

| Sintomo                                        | Causa                                                   | Soluzione                                                      |
| ---------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`             | Esecuzione all'interno di Docker                        | Usa la scheda Importazione manuale del token                   |
| 404 + `zedInstalled: false`                    | Zed non è installato sull'host                          | Installa Zed o usa l'importazione manuale                      |
| 403 + accesso al portachiavi negato            | Il sistema operativo ha negato l'accesso al portachiavi | Concedi l'autorizzazione nella richiesta del sistema operativo |
| 404 + servizio del portachiavi non disponibile | `libsecret` non presente su Linux                       | Installa `libsecret-1-dev`                                     |
