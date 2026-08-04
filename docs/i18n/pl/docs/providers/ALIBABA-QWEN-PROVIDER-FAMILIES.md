---
title: "Rodziny providerów Alibaba i Qwen"
description: "Regionalny projekt providerów dla produktów Alibaba Model Studio i Qwen Cloud"
---

# Rodziny providerów Alibaba i Qwen

Ten dokument zapisuje decyzję implementacyjną dla
[Issue #7854](https://github.com/diegosouzapw/OmniRoute/issues/7854). Publiczne produkty są
reprezentowane jako cztery rodziny providerów. Region to dane połączenia, a nie osobny produkt.

## Decyzja

| Rodzina providera                          | ID OmniRoute            | Region globalny | Region Chiny |
| ------------------------------------------ | ----------------------- | --------------- | ------------ |
| Alibaba Cloud Model Studio (pay as you go) | `alibaba`               | Singapore       | Beijing      |
| Alibaba Cloud Token Plan                   | `bailian-coding-plan`   | Singapore       | Beijing      |
| Qwen Cloud (pay as you go)                 | `qwen-cloud`            | Global          | Beijing      |
| Qwen Cloud Token Plan                      | `qwen-cloud-token-plan` | Singapore       | Beijing      |

Istniejące ID `alibaba-cn` pozostaje aliasem kompatybilności runtime dla zapisanych połączeń, tras
modeli, combo i historycznego użycia. Jego karta na dashboardzie jest włączona do `alibaba`; przepisanie
bazy danych nie jest wymagane.

Qwen Cloud pay-as-you-go i Alibaba Cloud Model Studio obecnie współdzielą hosty runtime zgodne z
DashScope, ale pozostają osobnymi tożsamościami providerów, ponieważ użytkownicy uzyskują klucze i
zarządzają kontami przez różne powierzchnie produktów. Produkty Alibaba i Qwen Cloud Token Plan używają
innych rodzin endpointów, więc wszystkie cztery produkty pozostają osobnymi ID providerów.

## Macierz endpointów

| Rodzina providera       | `global-sg`                                                              | `china-beijing`                                                      | Format wire |
| ----------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- | ----------- |
| `alibaba`               | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`                 | `https://dashscope.aliyuncs.com/compatible-mode/v1`                  | OpenAI      |
| `bailian-coding-plan`   | `https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1`           | `https://coding.dashscope.aliyuncs.com/apps/anthropic/v1`            | Anthropic   |
| `qwen-cloud`            | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`                 | `https://dashscope.aliyuncs.com/compatible-mode/v1`                  | OpenAI      |
| `qwen-cloud-token-plan` | `https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1` | `https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1` | OpenAI      |

Klucz API i endpoint muszą należeć do tego samego produktu i regionu. Wybór regionu zmienia
preset endpointu używany przy walidacji i zwykłych żądaniach.

## Kontrakt połączenia

Nowe połączenia przechowują stabilny klucz regionu w `providerSpecificData`:

```json
{
  "region": "global-sg"
}
```

Dozwolone wartości to `global-sg` i `china-beijing`. Endpoint jest wyprowadzany centralnie z
ID providera i regionu. Niepresetowe `providerSpecificData.baseUrl` pozostaje jawnym nadpisaniem
operatora i ma pierwszeństwo, natomiast stare zapisane URL-e presetów są normalizowane z powrotem do
macierzy regionalnej.

To utrzymuje schemat połączenia rozszerzalnym: kolejny region można dodać do resolvera bez
tworzenia kolejnej karty providera ani zmiany zapisanych ID providerów.

## Kompatybilność i wdrożenie

1. Dodać regionalny resolver endpointów i zachować obecne domyślne wartości globalne.
2. Używać żywego regionalnego odkrywania DashScope `/models` dla `alibaba`, jego ID kompatybilności
   `alibaba-cn` oraz `qwen-cloud`. Ich odpowiedzi najpierw przechodzą przez jeden filtr generacji tekstu,
   ponieważ generyczny endpoint zwraca też modele obrazu, wideo, audio, embedding i inne modele
   nie-chatowe. `qwen-cloud` następnie stosuje utrzymywaną listę dozwoloną zadeklarowaną w jego rejestrze
   providera. Alibaba Model Studio i Qwen Cloud zachowują osobne kuratorowane katalogi, mimo że obecnie
   współdzielą hosty runtime.
3. Zarejestrować `qwen-cloud-token-plan` z obecną listą dozwoloną modeli tekstowych Token Plan.
4. Dodać typowany selektor regionu do dialogów dodawania/edycji połączenia.
5. Ukryć zduplikowaną kartę `alibaba-cn` i uwzględnić jej istniejące połączenia na stronie providera
   `alibaba`.
6. Zachować niestandardowe nadpisania endpointów dla zaawansowanych i workspace-specific wdrożeń.

Modele mediów Token Plan pozostają poza katalogiem czatu, ponieważ używają dedykowanych endpointów.
`wan2.7-image` i `wan2.7-image-pro` są zarejestrowane w `open-sse/config/imageRegistry.ts`;
`happyhorse-1.1-i2v`, `happyhorse-1.1-t2v` i `happyhorse-1.1-r2v` są zarejestrowane w
`open-sse/config/videoRegistry.ts`. Oba rejestry ponownie wykorzystują tożsamość połączenia
`qwen-cloud-token-plan` oraz jej region-specific credentials.

Zwykły Qwen Cloud ma osobne katalogi obrazu i wideo pay-as-you-go pod tożsamością `qwen-cloud`.
Jego modele obrazu to `wan2.7-image-pro`, `wan2.7-image`, `qwen-image-3.0-pro`,
`qwen-image-2.0-pro-2026-06-22`, `qwen-image-2.0-2026-03-03` i `z-image-turbo`. Jego modele
wideo to `happyhorse-1.1-i2v`, `happyhorse-1.1-t2v`, `happyhorse-1.1-r2v`,
`happyhorse-1.0-video-edit`, `wan2.7-t2v`, `wan2.7-i2v`, `wan2.7-r2v-2026-06-12` i
`wan2.7-videoedit`. Te modele ponownie wykorzystują wyłącznie zwykłe połączenie `qwen-cloud` oraz
regionalny endpoint mediów DashScope. Rejestry Token Plan i pay-as-you-go nie dziedziczą ani nie
scalają swoich list modeli.

Tożsamość `bailian-coding-plan` ma też własne listy dozwolone mediów:
`wan2.7-image`, `wan2.7-image-pro`, `qwen-image-2.0` i `qwen-image-2.0-pro` dla generacji
obrazu oraz
`happyhorse-1.1-i2v`, `happyhorse-1.1-t2v` i `happyhorse-1.1-r2v` dla generacji
wideo. Używa wyłącznie połączenia Bailian Coding Plan i regionalnego endpointu Coding Plan.
Jej rejestry obrazu i wideo nie dziedziczą ani nie scalają się z żadnym providerem Qwen Cloud.

Zwykła tożsamość `alibaba` ma osobne listy dozwolone obrazu i wideo. Jej modele obrazu to
`qwen-image-3.0-pro`, `qwen-image-2.0-pro-2026-06-22`, `qwen-image-2.0`,
`z-image-turbo` i `wan2.6-t2i`. Jej dodane modele wideo to `happyhorse-1.1-i2v`,
`happyhorse-1.1-t2v`, `happyhorse-1.1-r2v`, `happyhorse-1.0-video-edit`,
`wan2.7-i2v-2026-04-25`, `wan2.6-i2v-flash`, `wan2.7-t2v-2026-06-12`,
`wan2.7-r2v-2026-06-12` i `wan2.7-videoedit`. Te modele używają wyłącznie połączenia Alibaba Model Studio
i wybranego regionalnego endpointu mediów; nie są dodawane do żadnego rejestru Coding Plan ani Qwen
Cloud.

Katalog czatu Qwen Cloud Token Plan podąża za dokładną listą dozwoloną tekstu planu Individual:
`qwen3.8-max-preview`, `qwen3.7-max`, `qwen3.7-plus`, `qwen3.6-flash`, `glm-5.2` i
`deepseek-v4-pro`. Wpisy Wan i HappyHorse należą do osobnych API generacji obrazu/wideo.

Alibaba Token Plan udostępnia te same sześć bieżących ID modeli generacji tekstu przez swój
endpoint zgodny z Anthropic. Opcja Singapore przechowuje istniejący klucz regionu `global-sg`;
różni się jedynie etykieta widoczna dla użytkownika względem rodzin providerów, które nazywają region Global.

Zwykły katalog czatu Qwen Cloud jest celowo węższy niż pełna żywa odpowiedź tekstowa. Jego
utrzymywana lista dozwolona znajduje się w `open-sse/config/providers/registry/qwen-cloud/index.ts`; żywe
odkrywanie zwraca tylko ID obecne zarówno w odpowiedzi upstream, jak i na tej liście rejestru.

Alibaba Model Studio stosuje tę samą regułę żywego przecięcia z niezależnie utrzymywaną
listą dozwoloną w `open-sse/config/providers/registry/alibaba/index.ts`. Provider kompatybilności
`alibaba-cn` ponownie wykorzystuje ten katalog, rozwiązując odkrywanie względem endpointu Beijing.

## Źródło prawdy

- [Alibaba Cloud Model Studio base URLs](https://www.alibabacloud.com/help/en/model-studio/base-url)
- [Alibaba Cloud Token Plan overview](https://www.alibabacloud.com/help/en/model-studio/token-plan-overview)
- [Alibaba Cloud Token Plan quick start](https://www.alibabacloud.com/help/en/model-studio/token-plan-quickstart)
- [China Token Plan overview](https://help.aliyun.com/zh/model-studio/token-plan-overview)
- [Qwen Cloud Global Token Plan](https://www.qwencloud.com/pricing/token-plan)
- [Qwen Cloud Token Plan Individual model allowlist](https://docs.qwencloud.com/token-plan/personal/token-plan-personal-overview)
- [Qwen Cloud China Token Plan](https://platform.qianwenai.com/pricing/token-plan)
- [Qwen Cloud OpenAI compatibility](https://docs.qwencloud.com/api-reference/toolkitframework/openai-compatible/overview)

Źródła na poziomie kodu to `src/shared/constants/alibabaProviderRegions.ts`,
`open-sse/config/providers/registry/alibaba/index.ts`,
`open-sse/config/providers/registry/bailian-coding-plan/index.ts`,
`open-sse/config/providers/registry/qwen-cloud/index.ts` oraz
`open-sse/config/providers/registry/qwen-cloud-token-plan/index.ts`.
