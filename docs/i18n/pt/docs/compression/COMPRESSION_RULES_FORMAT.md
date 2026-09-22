# Compression Rules Format (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

As regras de compressão são ficheiros JSON carregados em tempo de execução. São intencionalmente compostas apenas por dados, para que novos pacotes de idiomas e filtros de comandos RTK possam ser revistos sem alterar o código do motor.

> **Esquema canónico (fonte fidedigna):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> Os exemplos abaixo são ilustrativos — em caso de dúvida, valide o seu pacote com `_schema.json`.

## Pacotes de regras Caveman

Os pacotes de regras Caveman encontram-se em:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Cada pacote contém substituições que se aplicam a texto normal depois de as regiões protegidas serem isoladas.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Campos Caveman

| Campo                    | Obrigatório | Descrição                                                                                      |
| ------------------------ | ----------- | ---------------------------------------------------------------------------------------------- |
| `language`               | sim         | Chave de idioma semelhante a BCP-47, como `en`, `pt-BR`, `es`                                  |
| `category`               | sim         | Nome de ficheiro/categoria do pacote, por exemplo `filler` ou `dedup`                          |
| `rules`                  | sim         | Matriz de regras de substituição com expressões regulares                                      |
| `rules[].name`           | sim         | Nome estável da regra                                                                          |
| `rules[].pattern`        | sim         | Código-fonte da expressão regular JavaScript                                                   |
| `rules[].flags`          | não         | Sinalizadores de expressões regulares JavaScript; predefinição: `gi`                           |
| `rules[].replacement`    | não         | Cadeia de substituição ou alternativa quando `replacementMap` não encontra correspondência     |
| `rules[].replacementMap` | não         | Substituições específicas por correspondência, indexadas pelo texto correspondente normalizado |
| `rules[].context`        | não         | `all`, `user`, `assistant` ou `system`; predefinição: `all`                                    |
| `rules[].category`       | não         | `filler`, `context`, `structural`, `dedup`, `terse` ou `ultra`                                 |
| `rules[].minIntensity`   | não         | `lite`, `full` ou `ultra`; predefinição: `lite`                                                |
| `rules[].description`    | não         | Resumo da regra legível por humanos                                                            |

Utilize `flags` quando a correspondência sensível a maiúsculas e minúsculas for importante, por exemplo, ao remover artigos antes de texto em minúsculas sem remover `the OpenAI API`. Utilize `replacementMap` quando uma expressão regular tiver várias alternativas que necessitem de resultados diferentes; isto mantém os pacotes de regras JSON compostos apenas por dados, preservando o comportamento das funções de substituição TypeScript incorporadas mais avançadas.

## Pacotes de Filtros RTK

Os filtros RTK encontram-se em:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Cada filtro descreve como reconhecer e comprimir uma família de saídas de comandos.

```json
{
  "id": "test-vitest",
  "label": "Saída do Vitest",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "mantém os testes com falhas",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### Campos RTK

| Campo                      | Obrigatório | Descrição                                                                          |
| -------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `id`                       | sim         | ID estável do filtro                                                               |
| `label`                    | sim         | Nome legível no painel                                                             |
| `category`                 | sim         | Família do filtro: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | não         | A prioridade mais elevada prevalece quando há correspondência com vários filtros   |
| `match.outputTypes`        | não         | IDs de saída do detetor que selecionam este filtro                                 |
| `match.commands`           | não         | Tokens de comando que selecionam este filtro                                       |
| `match.patterns`           | não         | Padrões regex que selecionam este filtro a partir do texto de saída                |
| `rules.stripAnsi`          | não         | Remove sequências de escape ANSI antes das fases de regex                          |
| `rules.replace`            | não         | Substituições regex ordenadas, aplicadas linha a linha                             |
| `rules.matchOutput`        | não         | Regras de saída de curto-circuito com uma condição `unless` opcional               |
| `rules.includePatterns`    | não         | Linhas cuja preservação deve ser privilegiada                                      |
| `rules.dropPatterns`       | não         | Linhas a remover por constituírem ruído                                            |
| `rules.collapsePatterns`   | não         | Linhas correspondentes repetidas que podem ser agrupadas                           |
| `rules.deduplicate`        | não         | Agrupa linhas normalizadas duplicadas                                              |
| `rules.truncateLineAt`     | não         | Limite de carateres por linha compatível com Unicode                               |
| `rules.maxLines`           | não         | Número máximo de linhas mantidas antes da preservação das linhas finais            |
| `rules.headLines`          | não         | Linhas iniciais mantidas durante o truncamento                                     |
| `rules.tailLines`          | não         | Linhas finais mantidas para preservar o contexto recente                           |
| `rules.onEmpty`            | não         | Mensagem de recurso quando a filtragem remove todo o conteúdo                      |
| `rules.filterStderr`       | não         | Normaliza prefixos comuns de stderr antes das fases de filtragem subsequentes      |
| `preserve.errorPatterns`   | não         | Linhas de erro que devem sobreviver ao truncamento                                 |
| `preserve.summaryPatterns` | não         | Linhas de resumo que devem sobreviver ao truncamento                               |
| `tests[]`                  | não         | Amostras de verificação incorporadas utilizadas pela etapa de verificação RTK      |

O RTK aplica as fases declarativas por esta ordem: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` e `onEmpty`.

Os filtros personalizados podem ser carregados a partir de:

1. Ficheiros `.rtk/filters.json` do projeto apenas depois de estar presente um hash correspondente em `.rtk/trust.json` ou
   de `trustProjectFilters` estar ativado.
2. `DATA_DIR/rtk/filters.json` global.
3. Filtros incorporados.

Os ficheiros personalizados do projeto/globais podem conter um objeto de filtro ou uma matriz de objetos de filtro. Os filtros
personalizados inválidos são ignorados com diagnósticos; os filtros incorporados inválidos provocam uma falha de validação.

Ficheiro de confiança do projeto:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

A substituição de ambiente `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` considera os filtros do projeto fidedignos sem um
hash e deve ser limitada ao desenvolvimento local controlado.

## Regras de Segurança

- Mantenha as regras idempotentes: executar o mesmo filtro duas vezes não deve corromper a saída.
- Preserve o texto exato dos erros, os caminhos dos ficheiros, os números de linha e os resumos dos comandos sempre que possível.
- Evite regras que modifiquem blocos de código, conteúdos JSON, URLs ou segredos.
- Adicione cobertura unitária para novas famílias de comandos nos testes de detetores/filtros.
- Adicione exemplos em `tests[]` a cada filtro incorporado e aos filtros personalizados partilhados.

## Validação

Os pacotes de regras são validados antes da utilização. Os pacotes Caveman incorporados e os filtros RTK incorporados falham imediatamente durante a validação, para que os recursos de versão danificados sejam detetados antes da distribuição. Os filtros RTK personalizados são ignorados com diagnósticos quando a análise ou a validação de confiança falha.

Validação específica:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
