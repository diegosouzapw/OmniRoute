# Thinking Budget (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **대시보드:** 설정 → **AI** → 사고 예산  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **소스:** `open-sse/services/thinkingBudget.ts`

사고 예산은 OmniRoute가 제공자에게 요청을 전달하는 과정에서 **클라이언트의 사고/추론 매개변수를 재작성할지 여부**를 제어합니다. 압축, 라우팅 또는 프롬프트 캐시를 켜거나 끄는 기능은 **아닙니다**.

## 모드

| 모드                       | OmniRoute의 동작                                                                                                      | 사용 시점                                                                                                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (기본값) | 클라이언트 필드(`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` 등)를 그대로 유지합니다. | **Codex / Desktop / 노력 수준 및 추론 요약을 클라이언트가 제어해야 하는 모든 클라이언트.** 클라이언트가 `reasoning.summary`를 요청할 때 사고 패널을 표시하려면 필수입니다. |
| **`auto`**                 | 업스트림으로 전달하기 전에 요청 본문에서 모든 사고/추론 필드를 **제거합니다**.                                        | 의도적으로 **제공자**가 기본값을 정하도록 하고 클라이언트가 제어하는 사고 기능이 필요하지 않은 경우에만 사용합니다. “사고 자동 표시”를 의미하지 **않습니다**.              |
| **`custom`**               | 모든 요청을 고정된 사고 토큰 예산으로 덮어씁니다.                                                                     | 모든 트래픽의 사고 토큰에 하드 한도를 적용할 때 사용합니다.                                                                                                                |
| **`adaptive`**             | 메시지 수, 도구 및 프롬프트 길이를 기준으로 기본 노력 수준에서 예산을 조정합니다.                                     | 클라이언트 의도를 완전히 제거하지 않으면서 토큰 사용량을 유연하게 제어할 때 사용합니다.                                                                                    |

### `auto`가 제거하는 항목

모드가 `auto`이면 `stripThinkingConfig()`는 다음 항목 등을 삭제합니다.

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking`, 그리고 존재하는 경우 `output_config.effort`
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

클라이언트(예: Codex Desktop)가 `reasoning: { effort: "ultra", summary: "detailed" }`를 전송한 경우 **auto는 해당 객체를 제거합니다**. 업스트림에서 여전히 일부 추론 토큰에 요금을 부과할 수 있지만, 흔히 **비어 있거나 암호화된 항목만 포함된** 추론 항목을 반환하므로 UI에는 유용한 사고 스트림이 표시되지 않습니다.

## 이 기능이 **아닌 것**

| 기능                                | 관계                                                                                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **압축** (Caveman, RTK, stacked, …) | 별도의 파이프라인입니다. 모든 사고 예산 모드에서 작동합니다.                                                                        |
| **프롬프트 / 시맨틱 캐시**          | 별도의 기능입니다. 사고 예산 모드의 영향을 받지 않습니다.                                                                           |
| **콤보 라우팅 / 폴백**              | 별도의 기능입니다. 영향을 받지 않습니다.                                                                                            |
| **API 키 토큰 한도 / 비용 예산**    | 별도의 기능입니다. 영향을 받지 않습니다.                                                                                            |
| **추론 재생 캐시**                  | 엄격한 제공자(DeepSeek, Kimi, Qwen-thinking 등)를 위한 멀티턴 재주입 기능입니다. Desktop의 “사고 표시”와는 다릅니다.                |
| **`encrypted_content` 복호화**      | **불가능합니다.** OpenAI/Codex의 비공개 추론 블롭은 불투명합니다. OmniRoute는 이를 절대 복호화하지 않습니다(#7095 / #7176 / #7304). |

## 표시되는 사고 과정(Codex / Responses 클라이언트)

클라이언트에 사고 과정 텍스트를 표시하려면 다음 조건을 **모두** 충족해야 합니다.

1. Thinking Budget 모드 = **`passthrough`**(또는 사용하는 경로에서 요약 요청이 충분히 그대로 유지되는 custom/adaptive).
2. 클라이언트가 요약을 요청해야 합니다. 예: Codex `model_reasoning_summary = "detailed"` / `auto`(`none`이 아님).
3. 업스트림이 실제로 `response.reasoning_summary_text.*`(또는 항목의 비어 있지 않은 `reasoning.summary`)를 스트리밍해야 합니다.

“암호화된 비공개 추론”만 표시되는 경우, 다음 중 하나에 해당합니다.

- 모드가 **`auto`**여서 클라이언트 요청이 제거되었거나
- 업스트림이 요약 텍스트 없이 `encrypted_content`를 반환한 경우(제공업체의 제한 사항이며, OmniRoute는 평문이 아닌 자리표시자만 표시할 수 있음).

## API 예제

```bash
# 조회
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Codex / Desktop에서 사고 과정을 표시하기 위한 권장 설정
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

스키마(`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; 선택 사항: `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### 영속성 / 재시작

값은 설정 키 `thinkingBudget`에 저장되며 프로세스 시작 시 로드됩니다(`hydrateThinkingBudgetConfig`). DB 또는 API가 아닌 일부 경로를 통해 변경한 후에는 메모리 내 싱글턴이 디스크의 값과 일치하도록 **OmniRoute 프로세스를 재시작**하세요.

## 운영자 체크리스트

- [ ] Codex / Desktop 사용자: 모드 = **passthrough**
- [ ] 사고 과정을 제거하는 대신 **메시지**의 토큰을 절약하려면 압축을 계속 활성화
- [ ] `auto`가 “더 많은 사고 과정 표시”를 제공할 것으로 기대하지 않기
- [ ] 암호화된 요약만 제공되는 것은 **제공업체**의 동작이며, passthrough로는 이를 복호화할 수 없음

## 관련 문서

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — 다중 턴 `reasoning_content` 캐시
- [USER_GUIDE.md](./USER_GUIDE.md) — 설정 대시보드 탭
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 설정 엔드포인트
