# Zed IDE Integration in Docker Environments (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute가 Docker 내부에서 실행되는 경우, 컨테이너가 호스트 OS의 키체인 데몬(Linux의 libsecret, macOS의 Keychain, Windows의 Credential Manager)에 접근할 수 없고 호스트 파일 시스템의 Zed 설정 디렉터리가 기본적으로 컨테이너 내부에 표시되지 않기 때문에 표준 "Zed Keychain에서 가져오기" 절차가 실패합니다.

## Docker에서 키체인 가져오기가 실패하는 이유

컨테이너 내부에서는 다음 두 가지 차단 문제가 발생합니다.

1. **파일 시스템 격리** — `isZedInstalled()`는 `~/.config/zed`(Linux),
   `~/Library/Application Support/Zed`(macOS) 또는 이에 해당하는 Windows 경로를 찾습니다. 이러한 경로는
   호스트에 있으며 명시적으로 볼륨 마운트하지 않는 한 사용할 수 없습니다.
2. **IPC 격리** — 설정 디렉터리를 마운트하더라도 `keytar` 네이티브
   모듈은 Unix 소켓 또는 D-Bus 세션을 통해 OS 키체인 서비스와 통신합니다.
   어느 쪽도 기본적으로 컨테이너에 연결되지 않으므로 자격 증명 읽기는 항상 실패합니다.

OmniRoute는 다음 두 가지 휴리스틱을 통해 Docker 환경을 감지합니다.

- `/.dockerenv` 존재 여부(Docker 데몬이 컨테이너 시작 시 작성).
- `/proc/1/cgroup`에 `docker` 문자열이 포함되어 있는지 여부(Linux cgroup v1).

두 휴리스틱 중 하나라도 해당하면 가져오기 경로는
`zedDockerEnvironment: true` 및 수동 토큰 가져오기 탭을 사용하라는 메시지와 함께 HTTP 422를 반환합니다.

## 수동 토큰 가져오기 탭 사용

1. **대시보드 → 공급자 → Zed**를 엽니다.
2. **수동 토큰 가져오기** 패널이 키체인 가져오기 카드 아래에 표시됩니다.
   OmniRoute가 Docker를 감지하면 키체인 가져오기가 처음 실패한 후 이 패널이 자동으로 펼쳐집니다.
3. 드롭다운에서 공급자를 선택합니다(OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter 또는 DeepSeek).
4. 비밀번호 필드에 API 키를 붙여넣습니다.
5. **가져오기**를 클릭합니다.

키는 다음 이름의 새 공급자 연결로 저장됩니다.
`Zed Manual Import (<provider>)`

## Zed가 호스트에서 API 키를 저장하는 위치

Zed는 AI 공급자 키를 `zed-openai`, `ai.zed.openai`, `zed-anthropic` 등의
서비스 이름으로 OS 키체인에 저장합니다. 수동 가져오기에 사용할 키를 검색하려면 다음 위치를 확인하세요.

**Linux**

```
~/.config/zed/settings.json
```

`language_models` 섹션에는 공급자 설정이 포함되어 있습니다. Zed UI를 통해
키체인에 저장된 키는 `settings.json`에 일반 텍스트로 저장되지 않습니다. GNOME Keyring / Seahorse와 같은
키체인 뷰어를 사용하거나 다음 명령을 실행하여 검색하세요.

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed`를 검색하면 **Keychain Access.app**에서 키체인 항목을 찾을 수 있습니다.

## 볼륨 마운트 옵션(고급)

선택적으로 Zed 설정 디렉터리를 읽기 전용으로 컨테이너에 마운트할 수 있습니다.
이 방법으로 키체인 문제를 해결할 수는 없지만, 비밀 정보가 아닌 Zed 설정 값(예: 모델 환경설정)을 읽는
향후 기능에 유용할 수 있습니다.

```yaml
# docker-compose.yml 일부
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux 호스트
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS 호스트(대신 사용하려면 주석 해제)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # 향후 지원: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

참고: `ZED_CONFIG_PATH` 환경 변수 재정의는 아직 구현되지 않았습니다. 이
스니펫은 해당 기능이 추가될 때를 위한 참고 자료로 제공됩니다.

## 수동 가져오기 API

수동 가져오기 엔드포인트를 직접 호출할 수도 있습니다.

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // 선택 사항
}
```

성공하면 다음을 반환합니다.

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## 문제 해결

| 증상                                 | 원인                         | 해결 방법                           |
| ------------------------------------ | ---------------------------- | ----------------------------------- |
| 422 + `zedDockerEnvironment: true`   | Docker 내부에서 실행 중      | 수동 토큰 가져오기 탭 사용          |
| 404 + `zedInstalled: false`          | 호스트에 Zed가 설치되지 않음 | Zed를 설치하거나 수동 가져오기 사용 |
| 403 + 키체인 접근 거부               | OS에서 키체인 접근을 거부함  | OS 프롬프트에서 권한 부여           |
| 404 + 키체인 서비스를 사용할 수 없음 | Linux에 `libsecret`이 없음   | `libsecret-1-dev` 설치              |
