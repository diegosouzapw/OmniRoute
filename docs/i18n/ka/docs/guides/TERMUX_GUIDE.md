# Termux Headless Setup (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute-ს შეუძლია Android-ზე Termux-ის მეშვეობით headless სერვერის სახით მუშაობა. Electron-ის დესკტოპის აპლიკაცია Termux-ში მხარდაჭერილი არ არის, თუმცა ვებ-პანელი და OpenAI-თან თავსებადი API ხელმისაწვდომია როგორც ადგილობრივი ბრაუზერიდან, ისე იმავე ქსელში ჩართული სხვა მოწყობილობებიდან.

## წინაპირობები

დააყენეთ Termux F-Droid-იდან ან GitHub-ის გამოშვებებიდან, შემდეგ განაახლეთ პაკეტები და დააყენეთ აწყობის ინსტრუმენტები, რომლებიც საჭიროა ისეთი ნატიური დამოკიდებულებებისთვის, როგორიცაა `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js-ის ვერსია:** OmniRoute საჭიროებს Node-ის ვერსიას `>=22.22.2 <23 || >=24.0.0 <27` (შეესაბამება `package.json`-ში მოცემულ `engines`-ს / `SUPPORTED_NODE_RANGE`-ს). Termux-ის `nodejs-lts`, როგორც წესი, შეიცავს Node 20 LTS-ს, რომელიც **აღარ არის მხარდაჭერილი** — მის ნაცვლად დააყენეთ მიმდინარე ვერსია ბრძანებით `pkg install nodejs` და გადაამოწმეთ, რომ `node --version` აჩვენებს 22.x/24.x+ ხაზის ვერსიას.

თუ ნატიური პაკეტის კომპილაცია ვერ მოხერხდა, ხელახლა გაუშვით ზემოთ მოცემული `pkg install` ბრძანება და შემდეგ კვლავ სცადეთ OmniRoute-ის დაყენება.

## დაყენება

პირდაპირ გაუშვით უახლესი გამოქვეყნებული პაკეტი:

```bash
npx -y omniroute@latest
```

ასევე შეგიძლიათ მისი გლობალურად დაყენება:

```bash
npm install -g omniroute
omniroute
```

## გაშვება

გაუშვით OmniRoute headless სერვერის რეჟიმში:

```bash
omniroute
```

ან:

```bash
npx omniroute
```

პანელი ხელმისაწვდომია მისამართზე:

```text
http://localhost:20128
```

გახსენით ეს URL Android-ის ბრაუზერში. თუ კლიენტებს Termux-ის შიგნით უშვებთ, OpenAI-თან თავსებადი საბაზისო URL-ისთვის გამოიყენეთ იგივე ჰოსტი და პორტი.

## ფონურ რეჟიმში გაშვება

მარტივი ფონური პროცესისთვის:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

მის გასაჩერებლად:

```bash
pkill -f omniroute
```

მოწყობილობის ჩატვირთვის შემდეგ ავტომატურად გასაშვებად დააყენეთ Termux:Boot დამატება და შექმენით ჩატვირთვის სკრიპტი:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android-ის ბატარეის ოპტიმიზაციას შეუძლია ხანგრძლივად მომუშავე ფონური პროცესების შეჩერება. თუ სერვერი მუდმივად ონლაინ უნდა დარჩეს, გამორთეთ ბატარეის ოპტიმიზაცია Termux-ისთვის.

## სხვა მოწყობილობებიდან წვდომა

იპოვეთ ტელეფონის IP მისამართი WiFi ქსელში:

```bash
ip addr show wlan0
```

შემდეგ გახსენით პანელი სხვა მოწყობილობიდან:

```text
http://PHONE_IP:20128
```

მაგალითად:

```text
http://192.168.1.50:20128
```

ტელეფონი და კლიენტი ერთსა და იმავე სანდო ქსელში გქონდეთ ჩართული. თუ OmniRoute-ს ტელეფონის გარეთ ხელმისაწვდომს ხდით, ჩართეთ API გასაღებები და პანელის ავთენტიფიკაცია.

## მონაცემთა დირექტორია

ნაგულისხმევად OmniRoute მონაცემებს Termux-ის საშინაო დირექტორიაში ინახავს და იყენებს სერვერის მხარეს Linux-ზე გამოყენებული მონაცემთა გზის იმავე ქცევას. მონაცემთა ბაზის კონკრეტულ ადგილას განსათავსებლად:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## შეზღუდვები

- Electron Termux-ში არ მუშაობს.
- სისტემური პანელი ან დესკტოპთან ინტეგრაცია ხელმისაწვდომი არ არის.
- ეს კონფიგურაცია მხოლოდ სერვერისთვისაა: გამოიყენეთ ბრაუზერის პანელი.
- ნატიურ დამოკიდებულებებს შესაძლოა ადგილობრივი კომპილაცია დასჭირდეს.
- მცირე მეხსიერების მქონე Android მოწყობილობებზე შესაძლოა ნაკლები ერთდროული მოთხოვნის გამოყენება გახდეს საჭირო.
- MITM/სისტემური სერტიფიკატების ფუნქციებს შესაძლოა Termux-ის გარეთ, Android-ის დონეზე, ნდობის საცავთან მუშაობა დასჭირდეს.

## პრობლემების მოგვარება

### მხარდაუჭერელი პლატფორმა: android (ყოველი მოთხოვნა აბრუნებს HTTP 500-ს)

**სიმპტომი:** `omniroute` / `omniroute serve` ბეჭდავს `✔ OmniRoute is running!`, მაგრამ პანელის ან API-ის ყოველი მოთხოვნა აბრუნებს მხოლოდ `500 Internal Server Error`-ს. `~/.omniroute/logs/application/app.log` ცარიელი რჩება, `APP_LOG_LEVEL=debug` სასარგებლოს არაფერს ბეჭდავს, ხოლო პასუხის სხეული უბრალო ტექსტია (`Internal Server Error`) JSON-ის დეტალების გარეშე.

**მიზეზი:** Termux/Node-ის ზოგიერთი ანაწყობი აბრუნებს `process.platform === "android"`-ს. Next.js-ის `getCacheDirectory()` ამ პლატფორმას არ ამუშავებს: მისთვის აუცილებელია, რომ `~/.cache` (ან ზოგადი დროებითი დირექტორია) _უკვე_ არსებობდეს, წინააღმდეგ შემთხვევაში instrumentation hook-ის ჩატვირთვისას წარმოიქმნება შეცდომა:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

რადგან hook საერთოდ არ იტვირთება, ჟურნალში ჩაწერა არ იწყება — ამიტომ 500 შეცდომის დიაგნოსტიკა სრულიად შეუძლებელი ჩანს. OmniRoute Android/Termux-ზე Next.js-ის გაშვებამდე CLI-ის შესვლის წერტილში ქმნის `~/.cache`-ს (და თუ `XDG_CACHE_HOME` მითითებული არ არის, მასაც აყენებს), რათა ეს შემოწმება წარმატებით დასრულდეს.

**მხარდაჭერილი გადაწყვეტა (პაკეტის შეცვლის გარეშე):**

```bash
mkdir -p ~/.cache
omniroute serve
```

OmniRoute-ის მიმდინარე ანაწყობებში CLI ამას Android/Termux-ზე ავტომატურად აკეთებს — `npx -y omniroute@latest`-ით ახალი გაშვებისას ან გლობალური დაყენებისას ეს ხელით შესასრულებელი ნაბიჯი საჭირო არ უნდა იყოს. თუ განახლების შემდეგ შეცდომას კვლავ ხედავთ, ზემოთ ნაჩვენები წესით ერთხელ შექმენით `~/.cache` და ხელახლა გაუშვით.

**არ** შეცვალოთ `dist/server.js`, რათა იძულებით დააყენოთ `process.platform = "linux"`. პაკეტის ასეთი ცვლილება ყოველი ხელახალი დაყენების/განახლებისას გადაიწერება და ქეშის დირექტორიის არსებობის შემთხვევაში საჭირო არ არის.

### better-sqlite3-ის აწყობის შეცდომები

დააყენეთ Termux-ის აწყობის ინსტრუმენტების ნაკრები:

```bash
pkg install nodejs python build-essential
```

შემდეგ ხელახლა გაუშვით:

```bash
npx -y omniroute@latest
```

### პორტი უკვე გამოიყენება

შეამოწმეთ, რა უსმენს ნაგულისხმევ პორტს:

```bash
ss -ltnp | grep 20128
```

გააჩერეთ ძველი პროცესი:

```bash
pkill -f omniroute
```

### პანელი სხვა მოწყობილობიდან მიუწვდომელია

დარწმუნდით, რომ ორივე მოწყობილობა ერთსა და იმავე WiFi ქსელშია ჩართული, შემდეგ შეამოწმეთ Termux-იდან:

```bash
curl http://localhost:20128
```

თუ ადგილობრივი წვდომა მუშაობს, მაგრამ LAN-იდან წვდომა — არა, შეამოწმეთ Android-ის hotspot/WiFi იზოლაცია და ტელეფონზე არსებული firewall-ის ან VPN-ის პროფილები.
