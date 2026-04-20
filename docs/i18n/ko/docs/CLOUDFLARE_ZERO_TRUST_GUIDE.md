# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

이 가이드에서는**OmniRoute**를 보호하고**포트를 열지 않고도(Zero Inbound)**애플리케이션을 인터넷에 안전하게 노출하기 위한 네트워크 인프라의 표준을 문서화합니다.## What was done on your VM?

PM2를 통해**분할 포트**모드에서 OmniRoute를 활성화했습니다.

-**포트 `20128`:\*\***API**`/v1`만 실행합니다. -**포트 `20129`:\***\*관리 대시보드**만 실행합니다.

또한 내부 서비스에는 `REQUIRE_API_KEY=true`가 필요합니다. 이는 어떤 에이전트도 대시보드의 API 키 탭에서 생성된 합법적인 "전달자 토큰"을 보내지 않고는 API 엔드포인트를 사용할 수 없음을 의미합니다.

이를 통해 완전히 독립적인 두 개의 네트워크 규칙을 만들 수 있습니다.**Cloudflare Tunnel(cloudflared)**이 들어오는 곳입니다.---

## 1. How to Create the Tunnel in Cloudflare

'cloudflared' 유틸리티가 이미 컴퓨터에 설치되어 있습니다. 클라우드에서 다음 단계를 따르세요.

1.**Cloudflare Zero Trust**대시보드(one.dash.cloudflare.com)에 액세스하세요. 2. 왼쪽 메뉴에서**네트워크 > 터널**로 이동합니다. 3.**터널 추가**를 클릭하고**Cloudflared**를 선택한 후 이름을 'OmniRoute-VM'으로 지정합니다. 4. 화면에 "커넥터 설치 및 실행"이라는 명령이 생성됩니다.**토큰(`--token` 뒤의 긴 문자열)만 복사하면 됩니다**. 5. SSH를 통해 가상 머신(또는 Proxmox 터미널)에 로그인하고 다음을 실행합니다. ```bash

# Starts and permanently binds the tunnel to your account

cloudflared service install YOUR_GIANT_TOKEN_HERE

```

---

## 2. Configuring Routing (Public Hostnames)

새로 생성된 터널 화면에서**Public Hostnames**탭으로 이동하고**두**경로를 추가하여 우리가 만든 분리를 활용합니다.### Route 1: Secure API (Limited)

-**하위 도메인:**`api`
-**도메인:**`yourglobal.com`(실제 도메인 선택)
-**서비스 유형:**`HTTP`
-**URL:**`127.0.0.1:20128` *(내부 API 포트)*### Route 2: Zero Trust Dashboard (Closed)

-**하위 도메인:**`omniroute` 또는 `panel`
-**도메인:**`yourglobal.com`
-**서비스 유형:**`HTTP`
-**URL:**`127.0.0.1:20129` *(내부 앱/비주얼 포트)*

이 시점에서 "물리적" 연결이 해결됩니다. 이제 진정으로 보호해 봅시다.---

## 3. Shielding the Dashboard with Zero Trust (Access)

공개 인터넷에서 대시보드에 대한 액세스를 완전히 제거하는 것보다 대시보드를 더 잘 보호하는 로컬 비밀번호는 없습니다.

1. 제로 트러스트 대시보드에서**액세스 > 애플리케이션 > 애플리케이션 추가**로 이동합니다.
2.**자체 호스팅**을 선택합니다.
3.**애플리케이션 이름**에 'OmniRoute Panel'을 입력합니다.
4.**애플리케이션 도메인**에 'omniroute.yourglobal.com'("Route 2"에서 사용한 것과 동일)을 입력합니다.
5.**다음**을 클릭합니다.
6.**규칙 작업**에서 '허용'을 선택합니다. 규칙 이름에는 'Admin Only'를 입력합니다.
7.**포함**의 '선택기' 드롭다운에서 '이메일'을 선택하고 이메일을 입력하세요(예: 'admin@spgeo.com.br').
8. 저장합니다(`애플리케이션 추가`).

>**이렇게 한 결과:**`omniroute.yourglobal.com`을 열려고 하면 더 이상 OmniRoute 애플리케이션에 연결되지 않습니다! 이메일을 입력하라는 우아한 Cloudflare 화면이 나타납니다. 여기에 귀하(또는 귀하가 입력한 이메일)를 입력한 경우에만 Outlook/Gmail에서 '20129' 포트에 대한 터널의 잠금을 해제하는 임시 6자리 코드를 받게 됩니다.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

제로 트러스트 대시보드는 브라우저 없이 자동화된 도구(에이전트)를 통한 프로그래밍 방식의 액세스이기 때문에 API 경로(`api.yourglobal.com`)에는 적용되지 않습니다. 이를 위해 Cloudflare의 기본 방화벽(WAF)을 사용하겠습니다.

1.**일반 Cloudflare Dashboard**(dash.cloudflare.com)에 액세스하고 도메인으로 이동합니다.
2. 왼쪽 메뉴에서**보안 > WAF > 속도 제한 규칙**으로 이동합니다.
3.**규칙 만들기**를 클릭합니다.
4.**이름:**`OmniRoute API 남용 방지`
5.**수신 요청이 일치하는 경우...**
- 필드 선택: `호스트 이름`
- 연산자: `같음`
- 값: `api.yourglobal.com`
6.**동일한 특성으로:**에서 `IP`를 유지합니다.
7. 한도(Limit)의 경우:
-**요청량이 초과되는 경우:**`50`
-**기간:**`1분`
8. 마지막에**Action**: `Block`에서 차단이 1분 동안 지속될지 또는 1시간 동안 지속될지 결정합니다.
9.**배포**.

>**이렇게 한 결과:**누구도 귀하의 API URL에 60초 동안 50개 이상의 요청을 보낼 수 없습니다. 여러 에이전트를 실행하고 그 뒤의 소비가 이미 속도 제한에 도달하고 토큰을 추적하므로 이는 트래픽이 터널을 통과하기 전에 열 스트레스로 인해 온프레미스 인스턴스가 다운되지 않도록 보호하는 인터넷 엣지 레이어의 조치일 뿐입니다.---

## Finalization

1. VM의 `/etc/ufw`에**노출된 포트가 없습니다**.
2. OmniRoute는 HTTPS 아웃바운드('cloudflared')만 통신하며 외부로부터 직접 TCP를 수신하지 않습니다.
3. OpenAI에 대한 귀하의 요청은 SOCKS5 프록시를 통과하도록 전역적으로 구성되었기 때문에 난독화됩니다(클라우드는 SOCKS5가 인바운드로 제공되기 때문에 신경 쓰지 않습니다).
4. 웹 대시보드에는 이메일을 통한 2단계 인증이 있습니다.
5. API는 Cloudflare에 의해 에지에서 속도가 제한되며 전달자 토큰만 트래픽합니다.
```
