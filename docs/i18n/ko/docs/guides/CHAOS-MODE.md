# Chaos Mode (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **대시보드:** **Chaos Mode**(사이드바) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run`(대시보드 세션) · `POST /api/skills/collect/chaos`(API 키)  
> **소스:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode는 **하나의 작업을 여러 제공자에게 동시에 전송**합니다. 참여하는 각 제공자는
하나의 모델 인스턴스를 제공하며, 모든 답변을 나란히 보거나 체인 형태로 확인할 수 있습니다. 이는
라우팅 전략이 아니라 다중 모델 실행 인터페이스입니다. 따라서 일반적인 `/v1/chat/completions`
트래픽에는 영향을 주지 않습니다.

**구분 — 이름에 "chaos"가 포함된 기능은 세 가지입니다:**

| 항목            | 설명                                                                                                             | 문서 위치                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**  | 여기에서 설명하는 대시보드 페이지와 API로, 하나의 작업을 여러 제공자에게 분산합니다(병렬 또는 협업 방식).        | 이 가이드                                    |
| `auto/chaos`    | 복원력 테스트를 위해 장애 주입 점수 가중치를 사용하는 Auto-Combo 모델 ID입니다. 구성할 사항은 없습니다.          | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos 콤보 구성 | `config.chaos.enabled`를 사용해 선택적 심사 모델이 포함된 패널로 작업을 분산하는 영구 저장 콤보입니다(API 전용). | `open-sse/services/autoCombo/chaosEngine.ts` |

## 설정

1. **대시보드 → Chaos Mode**(`/dashboard/chaos`)를 엽니다.
2. 기능을 **활성화**합니다. Chaos Mode는 **기본적으로 비활성화**되어 제공됩니다
   (`src/lib/chaos/chaosConfig.ts`의 `enabled: false`). 비활성화된 상태에서는
   `POST /api/chaos/run`이 `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`로
   응답합니다.
3. 참여 제공자와 기본값을 선택합니다(설정 저장소를 통해 인스턴스별로 영구 저장됨).

   | 필드                | 의미                                                          | 기본값 / 제한                            |
   | ------------------- | ------------------------------------------------------------- | ---------------------------------------- |
   | `enabled`           | 마스터 스위치                                                 | `false`                                  |
   | `defaultMode`       | `parallel` 또는 `collaborative`(아래 참조)                    | `parallel`                               |
   | `providerOverrides` | 제공자별 참여 설정(`providerId`, 선택적 `modelId`, `enabled`) | 비어 있으면 모든 활성 제공자, 최대 200개 |
   | `systemPrompt`      | 기본 제공되는 Chaos 시스템 프롬프트 재정의                    | 선택 사항, 최대 10,000자                 |
   | `timeoutMs`         | 모델 호출당 최대 시간                                         | `120000`(5,000–600,000)                  |
   | `maxTokens`         | 모델 호출당 `max_tokens`                                      | `4096`(256–128,000)                      |

4. **페이지에서 직접 테스트를 실행**합니다. 결과 패널에는 각 제공자의 답변,
   상태 및 소요 시간이 표시됩니다.

## 실행 모드

- **`parallel`** — 모든 모델이 동일한 작업을 동시에 받으며, 각 답변을
  독립적으로 받습니다.
- **`collaborative`** — 모델이 **체인 형태로** 실행됩니다. 각 모델은 이전 모델의 출력을 확인하고
  이를 개선하거나 확장하고, 비평하거나 대안을 제시하도록 요청받습니다. 응답의 `summary` 필드는
  성공한 출력을 체인 순서대로 이어 붙입니다(`parallel` 실행에는 `summary`가 없음).

## API

### `POST /api/chaos/run` — 대시보드 세션

쿠키 인증 방식입니다(관리 세션 — [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) 참조).
대시보드 페이지에서 사용됩니다.

```jsonc
// 본문
{
  "task": "Compare approaches to X", // 필수
  "providers": ["glm", "kimi"], // 선택적 필터
  "mode": "parallel", // 선택 사항 — defaultMode 재정의
  "systemPrompt": "…", // 선택적 재정의
  "maxTokens": 4096, // 선택적 재정의
}
```

### `POST /api/skills/collect/chaos` — API 키

외부 호출자를 위한 Bearer 토큰 방식입니다. 키에는 **Chaos Mode 권한**
(`chaosModeEnabled`)이 있어야 합니다. 이 권한은 **기본적으로 비활성화**되어 있으므로 키별로
**대시보드 → API Manager → 키 편집 → 권한 → Chaos Mode**에서 활성화하십시오. 요청 본문은 위와 같습니다.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

두 엔드포인트는 모두 동일한 구조로 응답합니다.

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative 모드에서만 제공
}
```

## 문제 해결

- **`400 Chaos Mode is not enabled`** — 위의 2단계를 확인하십시오. 전역 스위치가 꺼져 있습니다.
- **`/api/skills/collect/chaos`에서 API 키가 거부됨** — 해당 키에 키별
  `chaosModeEnabled` 권한이 없습니다(기본적으로 비활성화되어 있으며, 이는 오류가 아니라 설정입니다).
- **예상한 제공자가 결과에 없음** — Chaos Mode 페이지에서 `providerOverrides`를 확인하고
  (비활성화된 재정의는 해당 제공자를 제외함) 제공자 연결이 활성 상태인지 확인하십시오.
