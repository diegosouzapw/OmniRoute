# Termux Headless Setup (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute는 Termux를 통해 Android에서 헤드리스 서버로 실행할 수 있습니다. Electron 데스크톱 앱은 Termux에서 지원되지 않지만, 웹 대시보드와 OpenAI 호환 API는 로컬 브라우저 또는 동일한 네트워크에 있는 다른 기기에서 사용할 수 있습니다.

## 사전 요구 사항

F-Droid 또는 GitHub 릴리스에서 Termux를 설치한 후, 패키지를 업데이트하고 `better-sqlite3` 같은 네이티브 종속성에 필요한 빌드 도구를 설치하세요.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js 버전:** OmniRoute에는 Node `>=22.22.2 <23 || >=24.0.0 <27`이 필요합니다(`package.json`의 `engines` / `SUPPORTED_NODE_RANGE`와 일치). Termux의 `nodejs-lts`는 일반적으로 Node 20 LTS를 제공하지만, 이 버전은 **더 이상 지원되지 않습니다**. 대신 `pkg install nodejs`로 최신 버전을 설치하고 `node --version`이 22.x/24.x 이상의 버전을 표시하는지 확인하세요.

네이티브 패키지 컴파일이 실패하면 위의 `pkg install` 명령을 다시 실행한 다음 OmniRoute 설치를 재시도하세요.

## 설치

최신 게시 패키지를 직접 실행하세요.

```bash
npx -y omniroute@latest
```

전역으로 설치할 수도 있습니다.

```bash
npm install -g omniroute
omniroute
```

## 실행

OmniRoute를 헤드리스 서버 모드로 시작하세요.

```bash
omniroute
```

또는:

```bash
npx omniroute
```

대시보드는 다음 주소에서 수신 대기합니다.

```text
http://localhost:20128
```

Android 브라우저에서 해당 URL을 여세요. Termux 내부에서 클라이언트를 실행하는 경우 OpenAI 호환 기본 URL로 동일한 호스트와 포트를 사용하세요.

## 백그라운드 실행

간단한 백그라운드 프로세스로 실행하려면 다음 명령을 사용하세요.

```bash
nohup omniroute > omniroute.log 2>&1 &
```

중지하려면:

```bash
pkill -f omniroute
```

기기가 부팅된 후 자동으로 시작하려면 Termux:Boot 애드온을 설치하고 부팅 스크립트를 만드세요.

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android의 배터리 최적화로 인해 장시간 실행되는 백그라운드 프로세스가 중지될 수 있습니다. 서버를 계속 온라인 상태로 유지해야 한다면 Termux의 배터리 최적화를 비활성화하세요.

## 다른 기기에서 접속

WiFi 네트워크에서 휴대전화의 IP 주소를 확인하세요.

```bash
ip addr show wlan0
```

그런 다음 다른 기기에서 대시보드를 여세요.

```text
http://PHONE_IP:20128
```

예:

```text
http://192.168.1.50:20128
```

휴대전화와 클라이언트를 신뢰할 수 있는 동일한 네트워크에 연결하세요. OmniRoute를 휴대전화 외부에 노출하는 경우 API 키와 대시보드 인증을 활성화하세요.

## 데이터 디렉터리

기본적으로 OmniRoute는 Linux에서 사용하는 것과 동일한 서버 측 데이터 경로 동작에 따라 Termux 홈 디렉터리 아래에 데이터를 저장합니다. 데이터베이스를 명시적인 위치에 저장하려면 다음과 같이 설정하세요.

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## 제한 사항

- Electron은 Termux에서 실행되지 않습니다.
- 시스템 트레이 또는 데스크톱 통합 기능이 없습니다.
- 이 구성은 서버 전용입니다. 브라우저 대시보드를 사용하세요.
- 네이티브 종속성은 로컬 컴파일이 필요할 수 있습니다.
- 메모리가 적은 Android 기기에서는 동시 요청 수를 줄여야 할 수 있습니다.
- MITM/시스템 인증서 기능에는 Termux 외부에서 Android 수준의 신뢰 저장소 설정이 필요할 수 있습니다.

## 문제 해결

### 지원되지 않는 플랫폼: android(모든 요청에서 HTTP 500 반환)

**증상:** `omniroute` / `omniroute serve`가 `✔ OmniRoute is running!`을 출력하지만, 모든 대시보드 또는 API 요청에서 내용 없이 `500 Internal Server Error`가 반환됩니다. `~/.omniroute/logs/application/app.log`는 비어 있고, `APP_LOG_LEVEL=debug`를 설정해도 유용한 정보가 출력되지 않으며, 응답 본문은 JSON 세부 정보 없이 일반 텍스트(`Internal Server Error`)로 표시됩니다.

**원인:** 일부 Termux/Node 빌드는 `process.platform === "android"`를 반환합니다. Next.js의 `getCacheDirectory()`는 해당 플랫폼을 처리하지 못합니다. `~/.cache`(또는 일반 임시 디렉터리)가 _이미_ 존재해야 하며, 그렇지 않으면 instrumentation hook을 로드하는 동안 다음 오류가 발생합니다.

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

hook이 로드되지 않으므로 로깅도 시작되지 않습니다. 따라서 500 오류는 원인을 전혀 진단할 수 없는 것처럼 보입니다. OmniRoute는 Android/Termux에서 이 검사가 성공하도록 Next.js가 시작되기 전에 CLI 진입점에서 `~/.cache`를 생성하고, `XDG_CACHE_HOME`이 설정되지 않은 경우 이를 설정합니다.

**지원되는 해결 방법(패키지 패치 불필요):**

```bash
mkdir -p ~/.cache
omniroute serve
```

현재 OmniRoute 빌드에서는 Android/Termux에서 CLI가 이 작업을 자동으로 수행합니다. 새로 `npx -y omniroute@latest`를 실행하거나 전역 설치한 경우에는 수동 단계가 필요하지 않습니다. 업그레이드 후에도 이 오류가 계속 발생하면 위와 같이 `~/.cache`를 한 번 생성한 다음 다시 시작하세요.

`process.platform = "linux"`를 강제로 설정하도록 `dist/server.js`를 패치하지 **마세요**. 이러한 패키지 패치는 재설치하거나 업그레이드할 때마다 덮어쓰기되며, 캐시 디렉터리가 존재하면 필요하지 않습니다.

### better-sqlite3 빌드 오류

Termux 빌드 도구 체인을 설치하세요.

```bash
pkg install nodejs python build-essential
```

그런 다음 다시 실행하세요.

```bash
npx -y omniroute@latest
```

### 포트가 이미 사용 중임

기본 포트에서 수신 대기 중인 항목을 확인하세요.

```bash
ss -ltnp | grep 20128
```

기존 프로세스를 중지하세요.

```bash
pkill -f omniroute
```

### 다른 기기에서 대시보드에 접속할 수 없음

두 기기가 동일한 WiFi 네트워크에 연결되어 있는지 확인한 다음 Termux에서 테스트하세요.

```bash
curl http://localhost:20128
```

로컬 접속은 가능하지만 LAN을 통한 접속이 불가능한 경우 Android 핫스팟/WiFi 격리 설정과 휴대전화의 방화벽 또는 VPN 프로필을 확인하세요.
