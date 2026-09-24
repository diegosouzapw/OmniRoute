# Management Authentication (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ha **quattro famiglie di credenziali** che possono autorizzare le route di gestione.
Non sono interscambiabili. Le chiavi API di inferenza (`sk-…`) **non** gestiscono il
server a meno che non sia stato loro esplicitamente concesso lo scope `manage` o `admin`.

Implementazione canonica: `src/lib/api/requireManagementAuth.ts`.

| Credenziale                  | Forma tipica                            | Creata dove                                               | Uso previsto                   | Capacità di gestione                                                                              |
| :--------------------------- | :-------------------------------------- | :-------------------------------------------------------- | :----------------------------- | :------------------------------------------------------------------------------------------------ |
| Sessione JWT della Dashboard | `auth_token` cookie                     | Login della Dashboard                                     | Interfaccia utente del browser | Gestione completa della dashboard, soggetta a regole CSRF, di località e di route sempre protette |
| Token ID macchina CLI        | interno / locale                        | Bootstrap CLI (`omniroute` sulla stessa macchina)         | CLI locale                     | Solo gestione locale                                                                              |
| Token di accesso con scope   | `oma_live_…`                            | **Impostazioni → Token di accesso** o `omniroute connect` | CLI remota e API di gestione   | Deve soddisfare lo scope `read`, `write` o `admin` richiesto dalla route                          |
| Chiave API di inferenza      | `sk-…` (e altri prefissi di chiavi API) | **Gestore API / Chiavi API**                              | Inferenza `/v1/*`              | **Nessuna** a meno che i metadati della chiave non includano `manage` o `admin`                   |

Le credenziali `oma_` sono credenziali di gestione/CLI. Non sono chiavi API di inferenza.

Se l'autenticazione tramite login/chiave API è disabilitata per il server, alcune route di gestione potrebbero
accettare chiamate non autenticate. Le route solo locali e sempre protette applicano comunque
le proprie regole. Presentare una di queste credenziali non è quindi universalmente
obbligatorio, e possederne una non è universalmente sufficiente senza lo scope e la località
di route richiesti.

Correlato: [Modalità remota](./REMOTE-MODE.md) (come `oma_live_…` viene generato per una CLI remota).

---

## Matrici degli scope

Gli scope di gestione delle chiavi API e gli scope dei token di accesso sono vocabolari diversi.
Gli scope degli strumenti MCP sono un terzo vocabolario, verificato con `scopeMatches` piuttosto che
con una delle funzioni nelle tabelle seguenti. Fianco a fianco:
[Tre namespace di scope](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Scope dei token di accesso (`oma_live_…`)

| Scope   | Operazioni tipiche                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------ |
| `read`  | GET di elenchi/stato che il token è autorizzato a visualizzare                                         |
| `write` | Mutazioni (creazione/aggiornamento/eliminazione) al di sotto dell'amministratore                       |
| `admin` | CLI remota completa / token di connessione (i valori predefiniti di bootstrap della password sono qui) |

Un token con `read` non può chiamare una route `write`. Formato del messaggio di runtime:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Scope di gestione delle chiavi API

| Scope     | Significato                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| (nessuno) | Solo inferenza. Le route di gestione restituiscono 403.                      |
| `manage`  | API di gestione (stesso gate del ramo di chiavi API `requireManagementAuth`) |
| `admin`   | Soddisfa anche `hasManageScope` (trattato come capace di gestione)           |

Abilita `manage` sulla chiave nell'interfaccia utente di API Keys / API Manager. Non riutilizzare una
chiave client di chat per l'automazione a meno che tu non abbia deliberatamente concesso quello scope.

---

## Come creare e revocare

### Sessione JWT della dashboard

1. Apri `/login` e accedi con la password di gestione (`INITIAL_PASSWORD` al primo avvio).
2. Il cookie `auth_token` è HttpOnly. La dashboard nel browser lo utilizza automaticamente.
3. Esci tramite `/api/auth/logout`. Non esiste alcun segreto persistente da copiare.

### Token machine-id della CLI

1. Esegui `omniroute` sullo **stesso host** del server (loopback).
2. La CLI esegue il bootstrap di un token machine-id in `~/.omniroute/` (chmod 600).
3. Questo **non** funziona da un'altra macchina. Usa un Access Token per la CLI remota.

### Access Token con scope (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → crea (nome + scope). **Il segreto viene mostrato una sola volta.**
2. Oppure tramite CLI: `omniroute connect <host>` (password → token). Consulta [Modalità remota](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Revocalo dalla stessa pagina Access Tokens (oppure elimina il contesto della CLI).
5. Il server memorizza solo un hash. Tratta il testo in chiaro come una password.

### Chiave API con scope `manage`

1. Dashboard: **API Manager / API Keys** → crea o modifica una chiave → abilita `manage` (oppure `admin`).
2. Header: `Authorization: Bearer sk-…` (il prefisso effettivo della chiave).
3. Revoca la chiave o rimuovi `manage` dalla stessa interfaccia.
4. Per garantire il privilegio minimo nell'automazione che non usa la CLI: preferisci un Access Token `read` per le attività che eseguono solo richieste GET; usa `manage` su una chiave API soltanto quando il chiamante deve comunicare sia con `/v1` sia con l'interfaccia di gestione.

---

## Formato dell'header

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Non inserire le credenziali di gestione nel percorso URL o nella stringa di query. L'autenticazione di gestione è consentita solo tramite header/cookie.

---

## Esempi da copiare e incollare

Sola lettura (elenco dei provider). Usa un Access Token `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modifica (creazione di una connessione a un provider). Usa un Access Token `write`/`admin` o una chiave API con ambito `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferenza (non gestione). Chiave API ordinaria, non è richiesto `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Errori di runtime attuali (non mostrare segreti)

| Situazione                                               | Stato tipico | Messaggio (sanificato)                                               |
| :------------------------------------------------------- | :----------- | :------------------------------------------------------------------- |
| Nessuna credenziale                                      | 401          | `Authentication required`                                            |
| `oma_live_…` non valido/scaduto                          | 401          | `Invalid or expired access token`                                    |
| Chiave API valida senza `manage`/`admin`                 | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Chiave API ordinaria non valida su una rotta di gestione | 403          | `Invalid management token`                                           |
| Scope del token di accesso troppo basso                  | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" significa che il bearer **non** è stato accettato come credenziale di gestione. **Non** ti dice quale famiglia coniare. Usa la tabella sopra: le chiavi di inferenza necessitano dello scope `manage`; la CLI remota necessita di `oma_live_…`; la dashboard usa il cookie di sessione.

---

## Scelta consigliata con privilegi minimi

| Chiamante                                          | Utilizzo                                           |
| :------------------------------------------------- | :------------------------------------------------- |
| Browser                                            | Sessione della dashboard                           |
| CLI sull'host del server                           | Token macchina                                     |
| CLI su un laptop che comunica con un server remoto | `oma_live_…` da `omniroute connect`                |
| CI / script (solo gestione)                        | `oma_live_…` con l'ambito più piccolo che funziona |
| CI che deve chiamare sia `/v1` che `/api`          | Chiave API con `manage` **o** due credenziali      |
