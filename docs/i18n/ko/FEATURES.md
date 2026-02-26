# OmniRoute — 대시보드 기능 갤러리

🌐 **Languages:** 🇺🇸 [English](../../FEATURES.md) | 🇧🇷 [Português (Brasil)](../pt-BR/FEATURES.md) | 🇪🇸 [Español](../es/FEATURES.md) | 🇫🇷 [Français](../fr/FEATURES.md) | 🇮🇹 [Italiano](../it/FEATURES.md) | 🇷🇺 [Русский](../ru/FEATURES.md) | 🇨🇳 [中文 (简体)](../zh-CN/FEATURES.md) | 🇩🇪 [Deutsch](../de/FEATURES.md) | 🇮🇳 [हिन्दी](../in/FEATURES.md) | 🇹🇭 [ไทย](../th/FEATURES.md) | 🇺🇦 [Українська](../uk-UA/FEATURES.md) | 🇸🇦 [العربية](../ar/FEATURES.md) | 🇯🇵 [日本語](../ja/FEATURES.md) | 🇻🇳 [Tiếng Việt](../vi/FEATURES.md) | 🇧🇬 [Български](../bg/FEATURES.md) | 🇩🇰 [Dansk](../da/FEATURES.md) | 🇫🇮 [Suomi](../fi/FEATURES.md) | 🇮🇱 [עברית](../he/FEATURES.md) | 🇭🇺 [Magyar](../hu/FEATURES.md) | 🇮🇩 [Bahasa Indonesia](../id/FEATURES.md) | 🇰🇷 [한국어](../ko/FEATURES.md) | 🇲🇾 [Bahasa Melayu](../ms/FEATURES.md) | 🇳🇱 [Nederlands](../nl/FEATURES.md) | 🇳🇴 [Norsk](../no/FEATURES.md) | 🇵🇹 [Português (Portugal)](../pt/FEATURES.md) | 🇷🇴 [Română](../ro/FEATURES.md) | 🇵🇱 [Polski](../pl/FEATURES.md) | 🇸🇰 [Slovenčina](../sk/FEATURES.md) | 🇸🇪 [Svenska](../sv/FEATURES.md) | 🇵🇭 [Filipino](../phi/FEATURES.md)

OmniRoute 대시보드의 모든 섹션에 대한 시각적 가이드입니다.

---

## 🔌 제공업체

AI 공급자 연결 관리: OAuth 공급자(Claude Code, Codex, Gemini CLI), API 키 공급자(Groq, DeepSeek, OpenRouter) 및 무료 공급자(iFlow, Qwen, Kiro).

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 콤보

채우기 우선, 라운드 로빈, 두 가지 선택의 힘, 무작위, 최소 사용, 비용 최적화 등 6가지 전략을 사용하여 모델 라우팅 콤보를 만듭니다. 각 콤보는 자동 폴백을 통해 여러 모델을 연결합니다.

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 분석

토큰 소비, 비용 추정, 활동 히트맵, 주간 분포 차트 및 공급자별 분석을 포함한 포괄적인 사용량 분석입니다.

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 시스템 상태

실시간 모니터링: 가동 시간, 메모리, 버전, 대기 시간 백분위수(p50/p95/p99), 캐시 통계 및 공급자 회로 차단기 상태.

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 번역기 놀이터

API 번역 디버깅을 위한 4가지 모드: **플레이그라운드**(형식 변환기), **채팅 테스터**(실시간 요청), **테스트 벤치**(일괄 테스트), **라이브 모니터**(실시간 스트림).

![Translator Playground](screenshots/05-translator.png)

---

## ⚙️ 설정

일반 설정, 시스템 스토리지, 백업 관리(데이터베이스 내보내기/가져오기), 모양(어둡게/밝게 모드), 보안(API 엔드포인트 보호 및 사용자 정의 공급자 차단 포함), 라우팅, 복원력 및 고급 구성.

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI 도구

AI 코딩 도구에 대한 원클릭 구성: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code 및 Antigravity.

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 📝 요청 로그

공급자, 모델, 계정 및 API 키별로 필터링하여 실시간 요청 로깅. 상태 코드, 토큰 사용량, 대기 시간 및 응답 세부 정보를 표시합니다.

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API 엔드포인트

기능 분석이 포함된 통합 API 엔드포인트: 채팅 완료, 임베딩, 이미지 생성, 순위 재지정, 오디오 전사 및 등록된 API 키.

![Endpoint Dashboard](screenshots/09-endpoint.png)
