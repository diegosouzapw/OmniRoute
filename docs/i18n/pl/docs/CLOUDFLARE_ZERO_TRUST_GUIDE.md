# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Ten przewodnik dokumentuje złoty standard infrastruktury sieciowej chroniącej**OmniRoute**i bezpiecznie udostępniającej Twoją aplikację w Internecie,**bez otwierania jakichkolwiek portów (zero ruchu przychodzącego)**.## What was done on your VM?

Włączyliśmy OmniRoute w trybie**Split-Port**poprzez PM2:

-**Port `20128`:**Obsługuje**tylko API**`/v1`. -**Port `20129`:**Uruchamia**tylko Panel administracyjny**.

Co więcej, usługa wewnętrzna wymaga `REQUIRE_API_KEY=true`, co oznacza, że ​​żaden agent nie może korzystać z punktów końcowych API bez wysłania prawidłowego „Tokenu nośnika” wygenerowanego na karcie Klucze API w panelu kontrolnym.

Dzięki temu możemy stworzyć dwie całkowicie niezależne reguły sieciowe. W tym miejscu pojawia się**Tunel Cloudflare (rozbłyskujący chmurą)**.---

## 1. How to Create the Tunnel in Cloudflare

Narzędzie `cloudflared` jest już zainstalowane na twoim komputerze. Wykonaj następujące kroki w chmurze:

1. Uzyskaj dostęp do panelu**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. W lewym menu przejdź do**Sieci > Tunele**.
3. Kliknij**Dodaj tunel**, wybierz**Cloudflared**i nazwij go `OmniRoute-VM`.
4. Wygeneruje na ekranie polecenie „Zainstaluj i uruchom konektor”.**Wystarczy tylko skopiować Token (długi ciąg znaków po `--token`)**.
5. Zaloguj się przez SSH do swojej maszyny wirtualnej (lub terminala Proxmox) i wykonaj: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Wciąż na ekranie nowo utworzonego tunelu przejdź do zakładki**Nazwy hostów publicznych**i dodaj**dwie**trasy, korzystając z dokonanej przez nas separacji:### Route 1: Secure API (Limited)

-**Subdomena:**`api` -**Domena:**`yourglobal.com` (wybierz swoją prawdziwą domenę) -**Typ usługi:**`HTTP` -**URL:**`127.0.0.1:20128` _(Wewnętrzny port API)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdomena:**`omniroute` lub `panel` -**Domena:**`twojaglobal.com` -**Typ usługi:**`HTTP` -**URL:**`127.0.0.1:20129` _(Aplikacja wewnętrzna/port graficzny)_

W tym momencie łączność „fizyczna” została rozwiązana. Teraz naprawdę go chrońmy.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Żadne lokalne hasło nie chroni Twojego panelu lepiej niż całkowite usunięcie dostępu do niego z otwartego Internetu.

1. W panelu Zero Trust przejdź do**Dostęp > Aplikacje > Dodaj aplikację**.
2. Wybierz**Własny hosting**.
3. W**Nazwa aplikacji**wpisz `Panel OmniRoute`.
4. W**Domena aplikacji**wpisz `omniroute.yourglobal.com` (ten sam, którego użyłeś w „Route 2”).
5. Kliknij**Dalej**.
6. W**Akcja reguły**wybierz opcję „Zezwalaj”. W polu Nazwa reguły wpisz „Tylko administrator”.
7. W**Uwzględnij**w menu rozwijanym „Selektor” wybierz „E-maile” i wpisz swój adres e-mail, na przykład „admin@spgeo.com.br”.
8. Zapisz („Dodaj aplikację”).

> **Co to spowodowało:**Jeśli spróbujesz otworzyć „omniroute.yourglobal.com”, nie pojawi się ona już w Twojej aplikacji OmniRoute! Ląduje na eleganckim ekranie Cloudflare z prośbą o podanie adresu e-mail. Tylko jeśli wpiszesz tam siebie (lub wpisany adres e-mail), otrzymasz tymczasowy 6-cyfrowy kod w Outlooku/Gmailu, który odblokuje tunel do portu „20129”.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Panel Zero Trust Dashboard nie dotyczy ścieżki API (`api.yourglobal.com`), ponieważ jest to programowy dostęp za pośrednictwem zautomatyzowanych narzędzi (agentów) bez przeglądarki. W tym celu użyjemy głównej zapory ogniowej Cloudflare (WAF).

1. Uzyskaj dostęp do**Normalnego panelu Cloudflare**(dash.cloudflare.com) i przejdź do swojej domeny.
2. W lewym menu wybierz**Bezpieczeństwo > WAF > Reguły ograniczania szybkości**.
3. Kliknij**Utwórz regułę**. 4.**Nazwa:**`OmniRoute API Anti-Abuse` 5.**Jeśli przychodzące żądania odpowiadają...**
   - Wybierz pole: `Nazwa hosta`
   - Operator: `równa się`
   - Wartość: `api.yourglobal.com`
4. W**Z tymi samymi cechami:**Zachowaj `IP`.
5. Dla limitów (Limit): -**Gdy żądania przekraczają:**`50` -**Okres:**`1 minuta`
6. Na koniec w**Akcja**: `Blokuj` i zdecyduj, czy blokada ma trwać 1 minutę czy 1 godzinę. 9.**Wdrożenie**.

> **Co to spowodowało:**Nikt nie może wysłać więcej niż 50 żądań w ciągu 60 sekund na adres URL Twojego interfejsu API. Ponieważ uruchamiasz wielu agentów, a zużycie za nimi osiąga już limity szybkości i śledzi tokeny, jest to po prostu środek w warstwie brzegowej Internetu, który chroni instancję lokalną przed awarią z powodu stresu termicznego, zanim ruch przejdzie przez tunel.---

## Finalization

1. Twoja maszyna wirtualna**nie ma odsłoniętych portów**w `/etc/ufw`.
2. OmniRoute rozmawia tylko z wychodzącym protokołem HTTPS („cloudflared”) i nie otrzymuje bezpośredniego protokołu TCP ze świata.
3. Twoje żądania kierowane do OpenAI są zaciemniane, ponieważ globalnie skonfigurowaliśmy je tak, aby przechodziły przez serwer proxy SOCKS5 (chmura nie przejmuje się SOCKS5, ponieważ przychodzi).
4. Twój panel internetowy obsługuje uwierzytelnianie dwuskładnikowe za pomocą poczty e-mail.
5. Twój interfejs API jest ograniczony szybkością na brzegu przez Cloudflare i przesyła tylko tokeny na okaziciela.
