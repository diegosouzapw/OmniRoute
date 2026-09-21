# Developer environment notes (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

이 페이지에서는 프로젝트의 로컬 `.env` 동작과 OmniRoute 개발 시 환경 파일 및 시크릿을 처리하는 방법을 설명합니다.

## .env postinstall 동작

개발자 편의를 위해 프로젝트는 `npm install` / `postinstall` 실행 중에 로컬 `.env` 파일을 생성할 수 있습니다. 이 파일은 로컬 개발 및 테스트 전용이며, 절대로 버전 관리 시스템에 커밋해서는 안 됩니다.

핵심 사항:

- 저장소의 `.gitignore`는 이미 `.env*` 파일을 무시하도록 설정되어 있습니다(`.gitignore` 항목 참조). 특정 예제 파일을 커밋하려는 명확한 의도가 있고 이를 위한 절차가 문서화되어 있지 않다면 해당 규칙을 제거하거나 변경하지 마세요.
- 실제 시크릿이 실수로 저장소에 커밋된 경우, 해당 자격 증명을 즉시 교체하거나 폐기하고 저장소 기록에서도 제거하세요(예: `git filter-repo` 또는 이에 준하는 복구 워크플로 사용). 도움이 필요하면 보안 담당자 또는 연락 담당자에게 문의하세요.
- CI 및 프로덕션 환경에서는 시크릿을 파일에 커밋하는 대신 CI 시크릿 또는 시크릿 관리자(GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault 등)를 사용하세요.

## 권장 로컬 워크플로

- `.env`는 로컬 작업 공간에만 보관하세요. 필요한 변수와 허용되는 예제 값을 문서화하려면 이미 추적 중인 `.env.example`을 사용하세요.
- 시크릿과 유사한 값이 필요한 테스트를 로컬에서 실행할 때는 실제 자격 증명 대신 합성된 플레이스홀더나 런타임에 생성되는 임시 키를 사용하는 것이 좋습니다.
- 플레이스홀더를 사용하는 테스트에는 해당 픽스처가 합성된 것임을 검토자가 이해할 수 있도록 짧은 주석을 추가하세요.

## 스캐너 참고 사항

- 일부 컴파일된 자산이나 바이너리 자산(예: 내장된 base64 WASM 블롭)에는 자격 증명처럼 보이는 ASCII 부분 문자열이 포함될 수 있으며, 이로 인해 텍스트 기반 시크릿 스캐너가 작동할 수 있습니다. 이러한 자산이 정상적인 것이라면 스캐너의 허용 목록에 추가하거나 스캐너 설정에서 해당 디렉터리를 제외하세요.

## 유출을 발견한 경우

1. 키를 즉시 교체하거나 폐기하세요.
2. 기록에서 시크릿을 제거하고, 필요한 경우 정리된 브랜치를 강제 푸시하세요.
3. 유지관리자에게 알리고 조직의 인시던트 대응 체크리스트를 따르세요.
