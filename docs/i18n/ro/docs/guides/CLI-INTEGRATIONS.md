# CLI Integrations (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute include o familie de comenzi `setup-*` care configurează un CLI de programare (Codex, Claude Code, OpenCode, Cline, …) pentru a utiliza OmniRoute ca backend — astfel încât unealta comunică cu **un singur** punct final, iar OmniRoute redirecționează către furnizorul corect cu recădere automată (auto-fallback). Fiecare comandă citește catalogul de modele **activ** de la un OmniRoute în execuție (local sau la distanță) și scrie propriul fișier de configurare al uneltei pe **mașina ta**. Cheia API este referențiată printr-o variabilă de mediu oriunde unealta acceptă acest lucru. Comenzile care persistă un fișier de mediu local uneltei sunt menționate mai jos.

Există, de asemenea, un lansator generic — `omniroute run <target>` — care lansează `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` sau `gemini` cu mediul corect injectat, fără a scrie nicio configurare. Țintele și aliasurile lor provin din manifestul canonic `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), iar `omniroute completion` oferă aceleași cuvinte țintă derivate din manifest. Lansatoarele vechi specifice uneltelor — `omniroute launch` (Claude Code) și `omniroute launch-codex` (Codex) — rămân disponibile.

Integrarea furnizorilor (provider onboarding) este disponibilă din același context local/la distanță. Comenzile orientate spre API de mai jos mențin autentificarea de gestionare separată de acreditările furnizorului și nu afișează niciodată o acreditare în ieșirea structurată:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Pentru scripturi, preferați `--credential-stdin` sau `--credential-env`; `--credential` este păstrat pentru utilizare locală controlată. `providers remove` necesită `--yes` pe un terminal neinteractiv, iar toate cele cinci comenzi respectă contextul activ sau opțiunile globale `--base-url`/`--api-key`.

Selectorii de furnizori resping prefixele de ID, numele sau numele de furnizori ambigue; folosiți un ID de conexiune complet atunci când se potrivesc mai multe conexiuni. Comenzile de creare și editare citesc înapoi conexiunea salvată, iar eliminarea verifică dacă aceasta nu mai poate fi citită. O importare omite o pereche furnizor/nume existentă. Intrările importate nu pot suprascrie punctul final de gestionare, contextul sau acreditările de gestionare furnizate CLI-ului.

Pentru configurarea de bază unică, realizată manual, a celor mai bogate două integrări, consultați ghidurile detaliate per unealtă:

- [Configurarea Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configurarea Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modul la distanță (Remote Mode)](./REMOTE-MODE.md) — controlează un OmniRoute la distanță (VPS / Tailnet) de pe laptopul tău
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — extensia OmniCopilot; poate rula, de asemenea, aceste comenzi `setup-*` pentru tine din interiorul editorului

---

## Tabel principal

Fiecare comandă respectă **contextul activ** (setat cu `omniroute connect`, consultați
[Modul la distanță](./REMOTE-MODE.md)) sau opțiunile explicite `--remote <url> --api-key <key>`.
„Local sau la distanță” de mai jos înseamnă: fără opțiuni, țintește `http://localhost:20128`;
cu `--remote` (sau un context activ la distanță), preia catalogul de pe acel
server și scrie configurația local.

| Comandă                    | Instrument                     | Ce scrie                                                                                                                                                                                 | Opțiuni principale                                                                                                                         | Local vs. la distanță |
| -------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — câte un profil pentru fiecare model de text compatibil (`codex --profile <name>`)                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Ambele                |
| `omniroute setup-claude`   | Claude Code                    | `~/.claude/profiles/<name>/settings.json` — câte un profil pentru fiecare model corespunzător (`CLAUDE_CONFIG_DIR`)                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Ambele                |
| `omniroute setup-opencode` | OpenCode (compatibil OpenAI)   | `~/.config/opencode/opencode.json` — furnizorul `omniroute` cu fiecare model din catalog (`opencode -m omniroute/<model>`)                                                               | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Ambele                |
| `omniroute setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (mod CLI) + afișează setările extensiei VS Code                                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Ambele                |
| `omniroute setup-kilo`     | Kilo Code                      | `~/.local/share/kilo/auth.json` (CLI) + îmbină `kilocode.*` în `settings.json` din VS Code, dacă există                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Ambele                |
| `omniroute setup-continue` | Continue / CLI-ul `cn`         | `~/.continue/config.yaml` — modele cu `provider: openai`, cheia prin `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambele                |
| `omniroute setup-cursor`   | Cursor                         | Nimic — afișează pașii din aplicație (configurația Cursor este într-o bază de date SQLite opacă)                                                                                         | `--remote` `--api-key` `--only` `--port`                                                                                                   | Ambele                |
| `omniroute setup-roo`      | Roo Code                       | `~/.omniroute/roo-settings.json` (document de import) + setează `roo-cline.autoImportSettingsPath` dacă există un `settings.json` pentru VS Code                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Ambele                |
| `omniroute setup-crush`    | Crush                          | `~/.config/crush/crush.json` — furnizor `openai-compat`, cheia prin `$OMNIROUTE_API_KEY`                                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambele                |
| `omniroute setup-goose`    | Goose                          | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + afișează instrucțiunile pentru variabilele de mediu                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambele                |
| `omniroute setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + afișează instrucțiunile pentru variabilele de mediu                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambele                |
| `omniroute setup-qwen`     | Qwen Code                      | `~/.qwen/settings.json` — matricea V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` în `~/.qwen/.env`                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Ambele                |
| `omniroute setup-5dive`    | 5dive (flotă de agenți)        | Nimic în `$HOME` — scrie un **profil de autentificare** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) prin `5dive agent auth set`; necesită root, rulează pe gazda flotei               | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Ambele                |
| `omniroute run <target>`   | Lansare în execuție (generică) | Nimic — pornește `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` cu variabilele de mediu și argumentele corecte; Qwen și Gemini folosesc un director home temporar și izolat | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Ambele                |
| `omniroute launch`         | Claude Code                    | Nimic — pornește `claude` cu `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injectate                                                                                                       | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Ambele                |
| `omniroute launch-codex`   | OpenAI Codex CLI               | Nimic — pornește `codex` cu furnizorul `omniroute` injectat prin opțiunile `-c`                                                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Ambele                |

Note despre opțiuni (verificate în sursa comenzii):

- `--remote <url>` — preia catalogul de la un OmniRoute la distanță (suprascrie `--port`
  și contextul activ). `--api-key <key>` furnizează datele de autentificare pentru acel
  server (valoarea implicită este variabila de mediu `OMNIROUTE_API_KEY` sau tokenul contextului activ).
- `--only <patterns>` — subșiruri separate prin virgulă; păstrează numai ID-urile modelelor care corespund
  (de exemplu, `--only glm,kimi`). Disponibilă pentru `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — afișează exact ce s-ar scrie, fără a modifica sistemul
  de fișiere. Disponibilă pentru fiecare comandă `setup-*`, **cu excepția** `setup-cursor`
  (care nu scrie niciodată într-un fișier).
- `--model <id>` — obligatorie (sau selectată interactiv) pentru instrumentele care nu au
  detectare automată a modelelor: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Aceste instrumente
  acceptă și `--yes` pentru execuții neinteractive (caz în care este necesară `--model`).
  `setup-opencode` acceptă `--model` pentru a seta modelul implicit de nivel superior.
- `--model <id>` pentru `omniroute run` urmează configurarea specifică fiecărei ținte din manifest
  (`bin/cli/cli-manifest.mjs`): **aider** primește `--model openai/<id>`, iar
  **opencode**, `--model omniroute/<id>` (prefixul este adăugat numai atunci când ID-ul
  nu îl conține deja); **qwen** și **gemini** primesc ID-ul ca atare;
  **claude** îl primește prin `ANTHROPIC_MODEL`, **goose** prin `GOOSE_MODEL`, iar
  **codex** prin argumentele `-c model_providers.omniroute.*`. **Qwen este singura țintă de execuție
  care necesită obligatoriu `--model`** — `omniroute run qwen` fără aceasta se încheie
  cu codul `2` și o eroare explicită.
- `--port <port>` — portul local OmniRoute (implicit `20128`, ignorat când este setată `--remote`).
  Este prezentă pentru toate comenzile `setup-*` și pentru ambele lansatoare.
- Codurile de ieșire pentru `omniroute run`: codul de ieșire propriu al CLI-ului copil este propagat
  ca atare; `2` = argumente nevalide (țintă neacceptată, opțiunea obligatorie
  `--model` lipsește, protecție pentru containere); `127` = binarul țintă nu se află în `PATH`;
  `130`/`143`/`129` când lansarea este încheiată de `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = altă eroare de lansare în timpul execuției.
- Cele două lansatoare (`launch`, `launch-codex`) acceptă `--profile <name>` pentru a selecta
  un profil scris de `setup-claude` / `setup-codex`, precum și argumente transmise mai departe către
  binarul `claude` / `codex` subiacent.

Selectorul interactiv este utilizat și de rețetele de configurare:

```bash
# Selectați din catalogul activ de modele locale sau la distanță și configurați ținta.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

În prezent, `configure` deleagă către rețetele testate pentru `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` și `5dive`.
Intrările din catalog destinate exclusiv IDE-urilor,
MITM și ghidurilor rămân fluxuri explicite `setup-*`/manuale și
nu sunt prezentate ca ținte care pot fi lansate.

> `setup-opencode` este integrarea OpenCode **minimală, compatibilă cu openai**.
> Există și o integrare mai complexă prin plugin — `omniroute setup opencode` — care
> instalează `@omniroute/opencode-plugin`. Sunt comenzi diferite; tabelul
> de mai sus documentează `setup-opencode`.
>
> Pluginul este furnizat în două pachete, câte unul pentru fiecare versiune majoră OpenCode, deoarece cele două
> mecanisme de încărcare necesită puncte de intrare diferite:
> `@omniroute/opencode-plugin` pentru OpenCode v1 și
> `@omniroute/opencode-plugin-v2` pentru OpenCode v2. Pachetul v2 este nou
> (`0.1.0`) și respectă un contract cu gazda care este încă în schimbare, așadar citește
> structura pe care OpenCode o introduce în schița catalogului, în loc să presupună una. Instalați-l
> adăugând o intrare `plugins` în `opencode.json`; `omniroute setup opencode`
> instalează în continuare pachetul v1. Opțiunile și ordinea de căutare a datelor de autentificare se află în
> fișierul README al pachetului.

---

## Utilizare locală

Cu OmniRoute rulând pe `localhost:20128`, executați pur și simplu comanda de configurare pentru
instrumentul dvs. Catalogul este preluat de la serverul local.

```bash
# Codex: scrie un profil pentru fiecare model corespunzător în ~/.codex/
omniroute setup-codex
codex --profile glm52            # utilizează un profil generat

# Claude Code: scrie profiluri pentru fiecare model, apoi lansează unul
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: scrie furnizorul compatibil cu openai, cu toate modelele din catalog
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referențiat prin {env:OMNIROUTE_API_KEY}, niciodată pe disc
opencode -m omniroute/glm/glm-5.2 "..."

# Instrumentele fără descoperire automată necesită un model explicit:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Previzualizare fără a scrie nimic:
omniroute setup-continue --dry-run
```

Lansați fără a scrie nicio configurație (doar injectarea variabilelor de mediu):

```bash
omniroute launch                 # Claude Code → OmniRoute local
omniroute launch-codex           # Codex CLI → OmniRoute local
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Cale explicită a comenzii: transmite mai departe tot ce urmează după --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Utilizare la distanță

Direcționați orice comandă de configurare către o instanță OmniRoute la distanță folosind `--remote` + `--api-key`. Catalogul
este preluat de la instanța la distanță; configurația este scrisă pe mașina dvs. locală.

```bash
# OpenCode cu un VPS la distanță, păstrând doar modelele glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exportați mai întâi OMNIROUTE_API_KEY

# Profiluri Codex dintr-un catalog la distanță
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Lansați un CLI direct cu instanța la distanță
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

În loc să transmiteți `--remote`/`--api-key` de fiecare dată, autentificați-vă o dată și permiteți
**contextului activ** să le furnizeze automat:

```bash
omniroute connect 192.168.0.15        # emite un token cu domeniu limitat și stochează contextul
omniroute setup-codex                 # ← acum utilizează catalogul la distanță
omniroute setup-opencode              # ← la fel
omniroute launch                      # ← Claude Code cu instanța la distanță
```

Consultați [Modul la distanță](./REMOTE-MODE.md) pentru contexte, domenii de acces și gestionarea tokenurilor.

---

## Flote de agenți 5dive

[5dive](https://5dive.ai) rulează o flotă de agenți de programare de lungă durată, fiecare fiind o
unitate systemd sub propriul utilizator Unix. Nu este el însuși un CLI de programare, așadar nu există
nimic ce `omniroute run` să poată lansa — `5dive` este o țintă **doar pentru configurare**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Ambele forme scriu un **profil de autentificare** 5dive, iar fiecare post `claude` asociat profilului
respectiv comunică apoi cu OmniRoute. Trei aspecte sunt specifice acestei ținte:

- **Rulează pe gazda flotei, ca root.** Verbele 5dive acționează asupra unităților systemd locale
  și a unui director de stare deținut de root; nu există un mod la distanță. Procedura se reexecută prin
  `sudo` atunci când nu rulează deja ca root (`--no-sudo` dezactivează acest comportament și afișează în schimb
  comanda).
- **Endpointul trebuie să fie `https://`, exceptând cazul în care este loopback.** Cheia API a agentului
  este transmisă prin acel URL la fiecare solicitare, iar 5dive refuză un endpoint necriptat aflat pe altă mașină.
  O adresă LAN privată nu constituie o excepție.
- **Modelul fixat pentru fiecare post are prioritate față de profil.** Profilul conține
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, însă un post încă fixat la un id de model standard
  eșuează la prima interacțiune cu _"There's an issue with the selected model"_.
  Transmiteți `--agent <name>` (poate fi repetat) pentru a fixa și modelele posturilor; procedura afișează
  comanda atunci când nu faceți acest lucru.

Cheia API este transmisă către 5dive prin **stdin** (`--api-key=-`), astfel încât nu apare niciodată în
ieșirea `ps`.

Direcționarea profilului către o **combinație** OmniRoute, în locul unui singur model, este ceea ce
oferă flotei mecanismul de comutare în caz de defecțiune a furnizorului: când endpointul principal a devenit complet indisponibil în timpul unei interacțiuni
în execuția înregistrată în
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agentul și-a finalizat
pașii rămași folosind alternativa și nu a expus niciodată întreruperea.

---

## Convenții pentru URL-ul de bază (ce instrumente necesită `/v1`)

OmniRoute expune interfața OpenAI la `/v1`, interfața Anthropic la rădăcină,
iar o interfață Gemini nativă la `/v1beta`. Fiecare integrare este configurată în forma
pe care o așteaptă instrumentul său (verificată în sursa comenzii):

| Integrare                                                                  | URL de bază scris | `/v1`?                                     |
| -------------------------------------------------------------------------- | ----------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | rădăcină          | Nu — Cline adaugă `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | rădăcină          | Nu — Goose adaugă calea                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | rădăcină          | Nu — LiteLLM adaugă `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | cu `/v1`          | Da                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | rădăcină          | Nu — Claude Code adaugă `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | cu `/v1`          | Da                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | cu `/v1`          | Da                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | rădăcină          | Nu — SDK-ul adaugă `/v1beta/models/…`      |
| `setup-5dive` (`ANTHROPIC_BASE_URL` în profilul de autentificare)          | rădăcină          | Nu — Claude Code adaugă `/v1/messages`     |

---

## Păstrarea dependențelor native la actualizare: `--include=optional`

Când actualizați cu `omniroute update` (după confirmare sau folosind `--apply`),
OmniRoute rulează instalarea având `--include=optional` inclus implicit:

```bash
npm install -g omniroute@latest --include=optional
```

Acesta **nu** este un indicator pe care îl transmiteți comenzii `omniroute update` — este aplicat întotdeauna de
programul de actualizare. Acesta garantează că `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, stiva SLM LLMLingua) rămân după actualizare chiar dacă în configurația npm
este setat `omit=optional`, ceea ce, în caz contrar, ar elimina fără avertisment driverul SQLite
nativ și integrarea cu sistemul de stocare securizată al sistemului de operare. Pentru a previzualiza comanda exactă fără a o aplica:

```bash
omniroute update --dry-run
# [RULARE SIMULATĂ] S-ar executa: npm install -g omniroute@latest --include=optional
```

Alți indicatori pentru `omniroute update` (verificați în sursă): `--check` (iese cu codul 1 dacă
versiunea este învechită), `--apply` (instalează fără solicitarea confirmării), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI prin `omniroute run gemini`

Contract verificat cu `@google/gemini-cli` 0.50.0: CLI-ul respectă
`GOOGLE_GEMINI_BASE_URL` și trimite `POST /v1beta/models/<model>:generateContent`
(și `:streamGenerateContent?alt=sse`) către acesta — exact interfața Gemini nativă
a OmniRoute (`/v1beta`). `omniroute run gemini` configurează automat acest lucru:

- `GOOGLE_GEMINI_BASE_URL` → URL-ul de bază OmniRoute activ (rădăcină, fără `/v1`);
- `GEMINI_API_KEY` → acreditarea OmniRoute rezolvată (opțiune/mediu/context);
- un **`GEMINI_CLI_HOME` temporar și izolat**, al cărui `.gemini/settings.json`
  selectează autentificarea `gemini-api-key`, astfel încât o sesiune Google OAuth stocată (Code Assist)
  să nu suprascrie niciodată lansarea direcționată către OmniRoute — este eliminat după ieșire;
- **igiena mediului**: din mediul procesului copil sunt eliminate `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` și `GOOGLE_GENAI_USE_GCA` (care ar redirecționa
  autentificarea către Vertex/Code Assist), iar `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` este
  setată ca măsură suplimentară de siguranță — celelalte ținte `run` beneficiază de același
  tratament pentru propriile variabile conflictuale;
- injectarea `--model <id>` din `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Mecanismul de protecție privind încrederea în spațiul de lucru din Gemini se aplică în continuare în modul fără interfață — transmiteți
personal `--skip-trust` (sau acordați interactiv încredere directorului); lansatorul
nu îl ocolește în mod deliberat. Acest lansator este distinct de **înregistrarea ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), care rămâne integrarea
protocolului pentru agenți pentru `/dashboard/acp-agents`.

---

## Verificare rapidă reală (opțională)

Rulările deterministe de regresie pentru planul de lansare sunt executate în CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Pentru validarea binarelor REALE cu un server OmniRoute REAL,
există un instrument opțional la
`tests/integration/upstream-cli-smoke.int.test.ts`. Acesta nu rulează niciodată automat
(fiecare subtest este omis dacă `RUN_CLI_SMOKE=1` nu este setată), transmite acreditarea prin NUMELE
variabilei de mediu (niciodată prin valoare), maschează șirurile care seamănă cu chei din orice ieșire
înregistrată, omite țintele al căror binar nu este instalat și clasifică erorile drept
autentificare / upstream / configurare, în locul unei simple valori booleene:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opțional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` restrânge verificarea;
`OMNIROUTE_SMOKE_TIMEOUT_MS` suprascrie timpul-limită de 120s pentru fiecare țintă.

---

## Consultați și

- [Configurarea Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — ghidul detaliat pentru Claude Code
- [Configurarea Codex CLI](./CODEX-CLI-CONFIGURATION.md) — configurarea inițială unică pentru `[model_providers.omniroute]`
- [Modul la distanță](./REMOTE-MODE.md) — contexte, tokenuri de acces cu domeniu limitat, controlarea unui server la distanță
- [Referința instrumentelor CLI](../reference/CLI-TOOLS.md) — catalogul complet al instrumentelor acceptate și al paginilor tabloului de bord
- [Ghid de configurare](./SETUP_GUIDE.md) — metode de instalare și inițializarea la prima rulare
