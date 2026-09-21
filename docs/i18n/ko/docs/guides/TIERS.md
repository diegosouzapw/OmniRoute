# OmniRoute Tiers — User Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇻🇳 [vi](../../../vi/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute는 지원되는 352개 제공자를 3개의 경제적 티어로 분류합니다. 각
요청은 성공적으로 응답하는 제공자가 나올 때까지 순서대로 전달됩니다. 따라서
폴백 코드를 작성하지 않고도 가장 저렴하면서 사용 가능한 응답을 얻을 수 있습니다.

## 티어 1 — 구독

**이미 비용을 지불하고 있는 제공자입니다.** OmniRoute는 할당량이
만료되기 전에 최대한 활용합니다.

| 제공자                      | 티어 1인 이유                                 |
| --------------------------- | --------------------------------------------- |
| Claude Code OAuth           | Anthropic Pro/Team — 정액제이며 자주 미사용됨 |
| OpenAI Codex (ChatGPT 구독) | Plus/Team에 Codex 할당량 포함                 |
| GitHub Copilot              | 사용자별 과금 — 할당량이 매월 초기화됨        |
| Cursor IDE                  | Pro 플랜 할당량                               |
| Antigravity / Devin Desktop | 기본 제공 할당량                              |

**전략**: 모델의 강점에 부합하는 모든 요청을 먼저 이 티어로 라우팅합니다.
할당량 추적기는 초기화 시점이 다가오는지 모니터링하며, `reset-aware`
콤보 전략은 이를 기준으로 우선순위를 정합니다. 티어 1로 먼저 라우팅하고
할당량이 소진될 때만 유료 티어로 전환하려면 `auto/thrifty` ID를 사용하세요. 또는
플랜에 포함된 용량만 사용하고 사용 불가 시 즉시 실패하게 하려면 `auto/subscription`을
사용하세요. [구독 우선 라우팅](../routing/SUBSCRIPTION_LADDER.md)을 참조하세요.

## 티어 2 — 저비용

**100만 토큰당 $1 미만인 토큰별 과금 제공자입니다.** 대량 작업을
처리하거나 티어 1 할당량이 한도에 도달한 후를 위해 사용합니다.

| 제공자                   | 가격(입력/출력)       | 강점                         |
| ------------------------ | --------------------- | ---------------------------- |
| DeepSeek V4 Pro          | 100만당 $0.27 / $1.10 | 코드, 추론                   |
| GLM-4.5                  | 100만당 $0.60 / $2.20 | 긴 컨텍스트                  |
| MiniMax M1               | 100만당 $0.20 / $1.10 | 속도                         |
| Qwen Coder               | 100만당 $0.30 / $1.20 | 코드                         |
| OpenRouter (가격 최적화) | 변동                  | 100개 이상의 모델, 동적 선택 |

**전략**: `cost-optimized` 콤보는 작업의 기능 필터(비전, JSON 모드, 도구,
최대 컨텍스트)를 충족하는 모델 중 토큰당 비용이 가장 낮은 모델을 선택합니다.

## 티어 3 — 무료

**비용이 들지 않는 제공자** — 무료 티어, 크레딧 프로그램, OAuth 일일 할당량.

| 제공자           | 무료 할당량 / 크레딧                    |
| ---------------- | --------------------------------------- |
| Kiro AI          | 무료 Claude 티어(넉넉한 공정 사용 정책) |
| OpenCode Free    | 인증 불필요, 넉넉한 요청 한도           |
| Qoder            | 무료 OAuth                              |
| Google Vertex AI | 신규 계정 크레딧 $300                   |
| Amazon Q         | AWS 사용자를 위한 무료 티어             |
| Pollinations     | 공개형 개방 API                         |
| Cloudflare AI    | Workers AI 무료 티어                    |

**전략**: 예산 상한이 설정된 `auto` 콤보는 티어 1과 2가 실패하거나
`useFreeOnly=true`로 설정된 경우 이 티어로 라우팅합니다. 무료 제공자는
요청 한도가 더 낮은 경우가 많으며, 서킷 브레이커는 백오프 후 해당 제공자를 복구합니다.

## 티어 구성

대시보드 → **티어** → 제공자를 할당합니다. 기본값(`tierDefaults.json`에서 제공)은
적절하게 설정되어 있습니다. 우선시할 특정 구독이 있거나 제외할 제공자가 있다면 수정하세요.

Auto-Combo의 16개 요소 점수 계산에서도 티어를 고려합니다.
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md)를 참조하세요.

## 텔레메트리

대시보드 → **사용량**에는 티어별 일일 토큰 사용량이 표시됩니다. 이를 사용하여 다음을 수행할 수 있습니다.

- 티어 1이 완전히 활용되고 있는지 확인합니다(그렇지 않다면 구독 가치를 낭비하고 있는 것입니다).
- 가장 많이 선택되는 티어 2 모델을 파악합니다(1~2개로 통합하세요).
- 테스트/탐색 워크로드에서 티어 3가 비용을 절감하는지 확인합니다.

## 일반적인 패턴

### 완전 무료 워크로드

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

티어 3을 강하게 우선시하며, 티어 3을 사용할 수 없는 경우에만 티어 2를 사용합니다.

### 저비용 폴백을 사용하는 구독 우선 구성

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

티어 1 → 티어 2 → 티어 3 순서와 일치하는 명시적인 정렬 목록입니다.
