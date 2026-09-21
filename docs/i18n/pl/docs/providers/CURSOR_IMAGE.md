# Cursor Image Generation (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute udostępnia **generowanie obrazów** w planie Cursor pod adresem `POST /v1/images/generations`, używając tego samego identyfikatora dostawcy co dla czatu: `cursor` (alias `cu`).

| Pole                            | Wartość                                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| Identyfikator `IMAGE_PROVIDERS` | `cursor`                                                                                        |
| Format                          | `cursor-agent-image`                                                                            |
| Uwierzytelnianie                | To samo połączenie OAuth / klucza API co dla czatu (`provider_connections.provider = "cursor"`) |
| Modele                          | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                       |

## Dlaczego Agent CLI

Czat Cursor w OmniRoute używa `agent.v1.AgentService/Run` (protobuf). Ta ścieżka **odrzuca** wbudowane narzędzia klienta (powłokę, zapis, …). Generowanie obrazów jest natywnym narzędziem Cursor wykonywanym przez interfejs **`agent` CLI** względem stanowiska. Dlatego procedura obsługi obrazów uruchamia proces `agent` z zablokowanym monitem i tymczasowym obszarem roboczym dla każdego żądania (w tej samej postaci co społecznościowe mosty stanowisk), a następnie zwraca zgodne z OpenAI dane `b64_json`.

## Ograniczenie dostępu (twarde reguły nr 15 i 17)

Jest to jedyny format `IMAGE_PROVIDERS`, który uruchamia proces potomny (plik binarny `agent`). Ponieważ `POST /v1/images/generations` jest współdzielony przez około 40 innych dostawców obrazów, którzy nie uruchamiają procesów i z których legalnie korzystają zdalni klienci, cała trasa **nie** jest sklasyfikowana jako `LOCAL_ONLY` — zamiast tego `handleCursorAgentImageGeneration` egzekwuje własną kontrolę dostępu przy użyciu zaufanego werdyktu `AUTHZ_HEADER_PEER_LOCALITY`, którym potok autoryzacji oznacza każde żądanie (na podstawie rzeczywistego peera TCP, nigdy podatnego na podszywanie się nagłówka `Host`): tylko wywołujący z sieci `loopback` i `lan` mogą doprowadzić do uruchomienia procesu; wszystkie pozostałe żądania (w tym użycie ujawnionego klucza API przez publiczny tunel) otrzymują odpowiedź `403`, zanim nastąpi jakiekolwiek wyszukiwanie danych uwierzytelniających lub uruchomienie procesu. Tę samą zasadę zastosowaną do pozostałej części poziomu `LOCAL_ONLY` opisano w `src/server/authz/policies/management.ts`.

## Bramka współbieżności działa na poziomie modułu (ograniczenie pojedynczej instancji)

`CURSOR_IMG_MAX_CONCURRENT` jest egzekwowane przez licznik/kolejkę w pamięci, której zakres jest ograniczony do instancji modułu Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). Poprawnie ogranicza to liczbę jednoczesnych uruchomień procesu `agent` w obrębie jednego procesu OmniRoute, ale **nie** koordynuje wielu procesów/instancji współdzielących to samo stanowisko Cursor (np. we wdrożeniu z wieloma replikami) — każda instancja egzekwuje własny, niezależny limit. W przypadku wdrożenia z jedną instancją (domyślnego) limit jest dokładny; wdrożenia skalowane horyzontalnie powinny zachować ostrożną wartość `CURSOR_IMG_MAX_CONCURRENT` dla każdej instancji lub kierować ruch generowania obrazów Cursor do pojedynczej instancji.

## Wymagania

1. Połączone konto Cursor w panelu (OAuth lub klucz API `crsr_…`).
2. Plik binarny Cursor Agent dostępny dla procesu OmniRoute:
   - zmienna środowiskowa `CURSOR_AGENT_BIN=/path/to/agent` lub
   - `~/.local/bin/agent`, lub
   - `providerSpecificData.agentBin` w połączeniu Cursor.

Opcjonalne dostrajanie:

| Zmienna środowiskowa        | Wartość domyślna           | Znaczenie                                            |
| --------------------------- | -------------------------- | ---------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                   | Limit czasu rzeczywistego na obraz                   |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                        | Bramka współbieżności dla współdzielonego stanowiska |
| `CURSOR_IMG_MODEL`          | (model z żądania / `auto`) | Zastępuje opcję CLI `--model`                        |

## Przykład

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generowanie zwykle trwa 1–2 minuty. Zalecane jest korzystanie z wewnętrznej ścieżki sieciowej; serwery proxy na brzegu sieci z limitami czasu wynoszącymi około 100 s zakończą się niepowodzeniem.

## LiteLLM

Zarejestruj model obrazu z ustawieniami `mode: image_generation`, `api_base: http://omniroute:20128/v1` oraz `model: openai/cursor/auto` (lub samo `cursor/auto`, zależnie od wersji LiteLLM).
