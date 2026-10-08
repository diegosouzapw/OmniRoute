# RTK Compression (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

A compressão RTK é o motor de compressão sensível aos comandos do OmniRoute para resultados de terminal e de ferramentas. Foi
concebida para sessões de agentes de programação, nas quais a maior parte do crescimento do contexto resulta de registos de testes, resultados de compilação,
ruído dos gestores de pacotes, transcrições de shell, resultados do Docker, resultados do git e rastreios de pilha.

O RTK pode ser executado diretamente com `defaultMode: "rtk"` ou como o primeiro passo de um pipeline encadeado, geralmente:

```txt
rtk -> caveman
```

Esta ordem comprime primeiro os resultados de máquina com ruído e, em seguida, permite que o Caveman condense a prosa restante.

O RTK original indica uma poupança de `60-90%` nos resultados de comandos. A sessão de exemplo no respetivo README passa de
`~118,000` tokens padrão para `~23,900` tokens RTK, o que representa uma poupança de `79.7%` (`~80%`). O OmniRoute utiliza
essa média original para o cálculo da poupança do encadeamento com a compressão de entrada do Caveman:

```txt
Média do RTK:     80% de poupança
Entrada Caveman:  46% de poupança
Encadeamento:     1 - (1 - 0.80) * (1 - 0.46) = 89.2% de poupança
Intervalo:        1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## O Que Comprime

Atualmente, o catálogo incorporado inclui 49 filtros distribuídos pelas seguintes categorias:

| Categoria | Exemplos                                                                  |
| --------- | ------------------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`                         |
| `test`    | Vitest, Jest, Pytest, Playwright, testes Go, testes Cargo                 |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx             |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler             |
| `shell`   | `ls`, `find`, `grep`, registos de shell genéricos                         |
| `docker`  | `docker ps`, registos do Docker                                           |
| `infra`   | Terraform, OpenTofu, `systemctl status`                                   |
| `generic` | Resultados JSON, rastreios de pilha, alternativa genérica para resultados |

O detetor em `open-sse/services/compression/engines/rtk/commandDetector.ts` classifica os resultados
antes da seleção dos filtros. Os filtros também podem corresponder através de um padrão de comando ou de uma expressão regular aplicada aos resultados quando uma classe
de comandos não é suficiente.

## Resolução de Filtros

O RTK carrega os filtros por esta ordem:

1. Filtros do projeto provenientes de `.rtk/filters.toml` e `.rtk/filters.json`, apenas quando considerados fidedignos.
2. Filtros globais provenientes de `DATA_DIR/rtk/filters.toml` e `DATA_DIR/rtk/filters.json`.
3. Filtros incorporados provenientes de `open-sse/services/compression/engines/rtk/filters/`.

No mesmo âmbito, os filtros do esquema TOML v1 do RTK têm precedência sobre os filtros JSON do OmniRoute. As expressões TOML
`match_command` são verificadas antes da correspondência por tipo de comando, para que um filtro importado específico de um comando
possa substituir um filtro mais abrangente nesse âmbito. O âmbito do projeto continua a ter precedência sobre o âmbito
global, independentemente do formato do ficheiro.

Os filtros do projeto estão intencionalmente sujeitos a uma verificação de confiança, porque os filtros de expressões regulares podem alterar a forma como os resultados das ferramentas são
apresentados aos agentes. Um ficheiro de filtros do projeto é aceite quando uma das seguintes condições é verdadeira:

- `rtkConfig.trustProjectFilters` é `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` está definido.
- `.rtk/trust.json` contém o hash SHA-256 correspondente ao ficheiro de filtros do projeto.

Exemplo de ficheiro de confiança:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Os hashes são independentes: `filtersSha256` considera fidedigno `.rtk/filters.json`, enquanto `filtersTomlSha256`
considera fidedigno `.rtk/filters.toml`. A edição de qualquer um dos ficheiros invalida apenas a respetiva entrada de confiança. Os ficheiros globais
são instalados pelo administrador e utilizam o comportamento de confiança existente para filtros globais.

Os filtros personalizados podem ser um único objeto de filtro ou uma matriz de objetos de filtro. Os filtros personalizados inválidos são
ignorados e indicados pelos diagnósticos de `/api/context/rtk/filters`. Os filtros incorporados inválidos provocam uma falha imediata.

## Compatibilidade com o esquema RTK TOML v1

O OmniRoute consegue analisar, validar, testar e instalar ficheiros de filtros declarativos que utilizem o esquema RTK TOML v1.
Os campos suportados são `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` e testes incorporados `[[tests.<filter>]]`.
São rejeitados campos desconhecidos, expressões regulares inválidas ou inseguras, regras simultâneas de remoção/manutenção, ficheiros com mais de
1 MiB e referências a filtros desconhecidos. Um ficheiro cujos testes incorporados falhem pode ser
validado para inspeção, mas não pode ser instalado nem carregado. As falhas no carregamento de ficheiros personalizados continuam
a ser permissivas: o ficheiro inválido é ignorado e os restantes filtros continuam a funcionar.

O OmniRoute recebe o resultado da ferramenta depois de o cliente já o ter capturado, pelo que `filter_stderr = true`
não pode alterar a captura do processo. O campo é aceite como uma operação sem efeito e a validação devolve um aviso.
Isto é descrito intencionalmente como **compatibilidade com o esquema RTK TOML v1**, e não como compatibilidade total
com o executável RTK, os hooks da shell, as implementações de comandos em Rust ou a disposição do respetivo arquivo de confiança.

A vista avançada de RTK do dashboard aceita TOML colado ou carregado. A validação é apenas de leitura.
A instalação escreve `DATA_DIR/rtk/filters.toml` atomicamente, com permissões restritivas, e atualiza
o catálogo de filtros ativo sem reiniciar. A substituição de um ficheiro existente requer uma confirmação explícita de `overwrite`
e cria primeiro `DATA_DIR/rtk/filters.toml.bak`.

## DSL de filtros

Os filtros utilizam o esquema JSON descrito em [Formato das regras de compressão](./COMPRESSION_RULES_FORMAT.md).
O ambiente de execução aplica estas fases pela seguinte ordem:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Campos importantes:

| Campo                        | Finalidade                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Remover sequências de cor/controlo do terminal antes da correspondência         |
| `rules.filterStderr`         | Normalizar prefixos comuns de stderr antes da correspondência/filtragem         |
| `rules.replace`              | Aplicar substituições ordenadas com expressões regulares                        |
| `rules.matchOutput`          | Devolver um resumo compacto quando a saída corresponde a uma condição conhecida |
| `rules.matchOutput[].unless` | Ignorar o atalho quando estiver presente um padrão de erro/falha                |
| `rules.dropPatterns`         | Remover linhas irrelevantes                                                     |
| `rules.includePatterns`      | Dar preferência a linhas que permitem tomar medidas                             |
| `rules.collapsePatterns`     | Agrupar linhas correspondentes repetidas                                        |
| `rules.deduplicate`          | Opção por filtro: agrupar linhas duplicadas consecutivas                        |
| `rules.truncateLineAt`       | Truncagem por linha segura para Unicode                                         |
| `rules.onEmpty`              | Mensagem alternativa caso todas as linhas sejam removidas pela filtragem        |
| `tests[]`                    | Exemplos incorporados utilizados pela validação de verificação                  |

Espera-se que os filtros integrados incluam exemplos de `tests[]` incorporados. Os filtros personalizados também os devem incluir,
especialmente quando são partilhados entre projetos.

## Desduplicação de linhas (duas camadas)

O RTK elimina linhas duplicadas em duas camadas independentes:

1. **`deduplicate` por filtro (ativação opcional, predefinição `false`).** Um filtro pode definir `rules.deduplicate: true`
   para eliminar linhas duplicadas consecutivas _na saída correspondente desse filtro_, antes do truncamento.
   Isto é executado em `lineFilter.ts`. Para filtros legados, é ativado automaticamente quando o filtro define
   `collapsePatterns`. Esquema: `deduplicate: z.boolean().default(false)` em
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` ao nível do motor (predefinição `3`).** Depois de todos os filtros serem executados, o motor elimina
   qualquer sequência de `>= deduplicateThreshold` linhas consecutivas idênticas em todo o resultado
   (`deduplicateRepeatedLines`, aplicado em `engines/rtk/index.ts`). O valor é limitado ao intervalo 2–100 durante
   a normalização.

A passagem por filtro é executada primeiro (dentro do filtro) e a passagem ao nível do motor é executada por último (sobre a saída
combinada), pelo que ambas se conjugam sem dupla contagem.

## Agrupamento de linhas (`enableGrouping`)

Quando `rtkConfig.enableGrouping` é `true` (predefinição `false`), o RTK executa uma passagem adicional de `groupSimilarLines`
sobre o resultado após a desduplicação, que compacta sequências de linhas consecutivas _quase equivalentes_ (não idênticas byte a byte).
`rtkConfig.groupingThreshold` (predefinição `3`) é o comprimento mínimo da sequência que aciona
o agrupamento. Esta é a contraparte estrutural de `deduplicateThreshold`: a desduplicação trata repetições exatas,
enquanto o agrupamento trata «a mesma estrutura com pequenas diferenças». Ambas as opções fazem parte do JSON de `rtkConfig`
guardado na tabela `key_value` (consulte a secção Configuração acima), pelo que a definição é mantida após reinícios.

## Remoção de comentários de código (`stripCodeComments` / `preserveDocstrings`)

Quando `rtkConfig.applyToCodeBlocks` está ativado, o RTK também pode remover comentários de blocos de código delimitados:

- `stripCodeComments` (predefinição `false`) — ativação opcional. Quando é `true`, o RTK remove comentários de blocos delimitados
  de JavaScript e TypeScript. Historicamente, esta opção era lida, mas nunca aplicada, pelo que a predefinição continua
  a ser «preservar», para evitar uma alteração silenciosa em produção.
- `preserveDocstrings` (predefinição `true`) — ao remover comentários, os comentários de bloco JSDoc/`/** … */` são
  mantidos (contêm documentação da API que vale mais do que os bytes que ocupam). Defina como `false` para também os
  remover.

A remoção de comentários está implementada em `open-sse/services/compression/engines/rtk/codeStripper.ts`. Utiliza
o **analisador sintático de TypeScript** (não uma expressão regular), para que literais de cadeia, de modelo e de expressão regular nunca sejam
confundidos com comentários, e interrompe totalmente o processamento quando é detetado JSX (para que os comentários de contentores de expressões JSX
nunca sejam corrompidos). Atualmente, a remoção de comentários aplica-se **apenas a JavaScript e TypeScript** — as outras
linguagens no conjunto `CodeLanguage` do removedor (Python, Rust, Go, Ruby, Java) têm eliminação de linhas vazias e
de espaços em branco, mas não remoção de comentários. A execução do bloco processado recebe a etiqueta `rtk:code-strip` em
`rulesApplied`.

> **Nota — GCF / codificação tabular é um motor separado.** O RTK **não** contém o codificador JSON tabular/colunar «GCF»
> (Graph Compact Format). Esse codificador — que substituiu um codificador `omni-tabular` mais antigo — encontra-se no motor
> **headroom** (`open-sse/services/compression/engines/headroom/`, com o codec incorporado em
> `headroom/gcf/`). Não está relacionado com o pipeline de filtros do RTK aqui documentado.

## Configuração

As definições globais estão disponíveis através de `/api/settings/compression`. As definições específicas do RTK também estão
disponíveis através de `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` e `disabledFilters` utilizam identificadores de filtro, por exemplo, `test-vitest` ou `git-diff`.

A estrutura completa de `rtkConfig` é definida por `RtkConfig` / `DEFAULT_RTK_CONFIG` em
`open-sse/services/compression/types.ts`. O objeto completo é guardado como um único valor JSON na
tabela `key_value` do SQLite, em `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), e normalizado durante a leitura por `normalizeRtkConfig`. Assim, todos os campos abaixo
— incluindo `enableGrouping`, `groupingThreshold`, `stripCodeComments` e `preserveDocstrings` —
percorrem o mesmo armazenamento e persistem após um reinício.

| Chave                  | Predefinição | Finalidade                                                                                 |
| ---------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| `deduplicateThreshold` | `3`          | Ao nível do motor: número mínimo de linhas idênticas consecutivas a agrupar (2–100)        |
| `enableGrouping`       | `false`      | Opcional: agrupar sequências de linhas consecutivas quase equivalentes                     |
| `groupingThreshold`    | `3`          | Sequência mínima de linhas semelhantes consecutivas que aciona o agrupamento               |
| `stripCodeComments`    | `false`      | Opcional: remover comentários de blocos de código delimitados (requer `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`       | Ao remover comentários, manter blocos JSDoc/`/** … */`                                     |

## API

| Rota                               | Método | Finalidade                                                     |
| ---------------------------------- | ------ | -------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Ler a configuração do RTK                                      |
| `/api/context/rtk/config`          | PUT    | Atualizar a configuração do RTK                                |
| `/api/context/rtk/filters`         | GET    | Listar o catálogo de filtros e os diagnósticos de carregamento |
| `/api/context/rtk/import`          | POST   | Validar ou instalar ficheiros RTK TOML do esquema v1           |
| `/api/context/rtk/test`            | POST   | Pré-visualizar a compressão RTK para um conteúdo de texto      |
| `/api/context/rtk/raw-output/[id]` | GET    | Ler o resultado bruto anonimizado retido                       |
| `/api/compression/preview`         | POST   | Pré-visualizar qualquer modo de compressão                     |

Conteúdo do teste RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Conteúdo da pré-visualização da compressão:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

As rotas de gestão requerem autenticação de gestão do painel ou a política de chave de API correspondente.

Conteúdo da validação RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Utilize `"action": "install"` para instalar globalmente o ficheiro validado. Adicione `"overwrite": true` apenas
depois de rever e confirmar a substituição de um ficheiro global existente.

## Recuperação do Resultado Bruto

Normalmente, o RTK devolve apenas texto comprimido. Para depuração, `rawOutputRetention` pode reter o resultado bruto com dados sensíveis ocultados:

| Valor      | Comportamento                                                       |
| ---------- | ------------------------------------------------------------------- |
| `never`    | Não reter o resultado bruto                                         |
| `failures` | Reter apenas o resultado de falhas prováveis                        |
| `always`   | Reter todos os resultados brutos comprimidos do RTK, após ocultação |

Os ficheiros retidos são guardados em:

```txt
DATA_DIR/rtk/raw-output/
```

Os segredos são ocultados antes da persistência, incluindo tokens de portador comuns, chaves de API, tokens do Slack, chaves de acesso da AWS e valores no formato de atribuição `token=...`, `secret=...`, `password=...`. A análise armazena apenas o ID do apontador, o tamanho e os metadados do hash.

## Porta de Verificação

A porta de verificação específica executa testes integrados de filtros inline sem recorrer a comandos externos da shell:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

A porta de RTK mais abrangente é:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Execute a porta de compressão abrangente antes do lançamento:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Extensão do RTK

1. Adicione ou atualize um ficheiro JSON de filtros.
2. Inclua pelo menos um exemplo em `tests[]` que comprove o comportamento importante.
3. Adicione um fixture em `tests/unit/compression/fixtures/rtk/` para novas famílias de comandos.
4. Adicione cobertura de deteção de comandos ao introduzir uma nova classe de resultado.
5. Execute as portas de verificação e de RTK abrangente.
6. Se o filtro for local ao projeto, faça commit de `.rtk/filters.json` e atualize `.rtk/trust.json` apenas após revisão.

---

## Níveis de Intensidade (v3.8.16+)

O RTK suporta **3 níveis de intensidade** que equilibram a **agressividade da compressão** e a **segurança**. O nível é definido através de `config.intensity` na configuração do motor.

### Os 3 Níveis

| Nível                | Limite de truncagem  | Poupança de tokens | Risco       | Mais adequado para              |
| -------------------- | -------------------- | ------------------ | ----------- | ------------------------------- |
| `minimal`            | 24 linhas por secção | ~20-40%            | Muito baixo | Produção com contexto crítico   |
| `standard` (predef.) | 24 linhas por secção | ~50-70%            | Baixo       | Sessões diárias de programação  |
| `aggressive`         | 16 linhas por secção | ~70-90%            | Médio       | Sessões longas, poupança máxima |

### Onde Ocorre a Truncagem

O limite de truncagem afeta `lineFilter.ts`:

```ts
// De open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Tanto o **início** como o **fim** de cada secção são preservados; o conteúdo intermédio é eliminado quando a truncagem é acionada.

### O Que É Mantido e o Que É Cortado

| Conteúdo                            | minimal       | standard      | aggressive    |
| ----------------------------------- | ------------- | ------------- | ------------- |
| Erros/rastreios de pilha            | ✅ preservado | ✅ preservado | ✅ preservado |
| Falhas de testes                    | ✅ preservado | ✅ preservado | ✅ preservado |
| Erros de compilação                 | ✅ preservado | ✅ preservado | ✅ preservado |
| Testes aprovados (detalhados)       | ✅ preservado | 🟡 condensado | 🟡 condensado |
| Resultado de rotina (registos info) | 🟡 condensado | 🟡 condensado | ❌ eliminado  |
| Barras de progresso                 | 🟡 condensado | ❌ eliminado  | ❌ eliminado  |
| Faixa/arte ASCII                    | 🟡 condensado | ❌ eliminado  | ❌ eliminado  |

### Escolher a Intensidade Certa

```
                  Perder contexto é catastrófico?
                  │
      ┌───────────┼───────────┐
      │           │           │
     SIM         NÃO       NÃO TEM A CERTEZA
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Quão crítico é  Experimente primeiro `standard`
      │      o débito?       (funciona em 80% dos
      │           │          casos)
      │      ┌────┴────┐
      │      │         │
      │    BAIXO      ALTO
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Configurar a Intensidade

**Por combo** (na configuração do combo):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Programaticamente**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) é um
`CompressionEngine` e não possui um método `updateConfig`. Em vez disso, atualize a configuração
de um motor através da função auxiliar do registo:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Verificar o Efeito

Utilize a **Porta de Verificação** (ver abaixo) para confirmar que o filtro é seguro com a intensidade escolhida:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filters failed at aggressive intensity");
}
```

---

## Desenvolvimento de filtros personalizados (v3.8.16+)

O diretório `engines/rtk/filters/` contém **mais de 49 ficheiros JSON de filtros incorporados**. Pode adicionar os seus próprios filtros para comprimir a saída de ferramentas personalizadas não abrangidas pelas predefinições.

### Esquema de filtros (Zod)

```ts
{
  "id": "string",                      // Obrigatório. Identificador do filtro (kebab-case, por exemplo, "python-traceback")
  "label": "string",                   // Obrigatório. Nome do filtro legível por humanos
  "description": "string",             // Opcional (predefinição: ""). Breve descrição do que o filtro faz
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Opcional (0-100, predefinição: 50). Ordem de execução (mais alto = primeiro)
  "match": {
    "commands": ["string"],            // Nomes de comandos a corresponder (por exemplo, "python", "pytest")
    "patterns": ["string"],            // Padrões de expressões regulares a corresponder na saída
    "outputTypes": ["string"]          // Classes de saída detetadas (por exemplo, "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Opcional (predefinição: false). Remover códigos de cor ANSI
    "replace": [                       // Regras de pesquisa e substituição (predefinição: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Interromper antecipadamente quando o padrão corresponder (predefinição: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Ignorar se este padrão corresponder
      }
    ],
    "includePatterns": ["string"],     // Linhas a manter (padrões de expressões regulares, predefinição: [])
    "dropPatterns": ["string"],        // Linhas a remover (padrões de expressões regulares, predefinição: [])
    "collapsePatterns": ["string"],    // Linhas a reduzir a uma única ocorrência (predefinição: [])
    "deduplicate": boolean,            // Opcional (predefinição: false). Remover linhas duplicadas
    "truncateLineAt": number,          // Opcional (predefinição: 0). Truncar linhas ao número máximo de caracteres
    "maxLines": number,                // Opcional (predefinição: 0). Limite rígido para o número total de linhas
    "headLines": number,               // Opcional (predefinição: 20). Manter as primeiras N linhas da saída correspondente
    "tailLines": number,               // Opcional (predefinição: 20). Manter as últimas N linhas da saída correspondente
    "onEmpty": "string",               // Opcional (predefinição: ""). Mensagem alternativa se todas as linhas forem filtradas
    "filterStderr": boolean            // Opcional (predefinição: false). Filtrar também a saída stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Padrões que têm de ser sempre preservados (predefinição: [])
    "summaryPatterns": ["string"]      // Padrões para a linha de resumo final (predefinição: [])
  },
  "tests": [                           // Testes inline para verificação (predefinição: [])
    {
      "name": "string",               // Obrigatório. Nome do teste
      "input": "sample output",        // Obrigatório. Texto de entrada de exemplo
      "expected": "expected output",   // Obrigatório. Saída comprimida esperada
      "command": "optional command"    // Opcional. Contexto do comando
    }
  ]
}
```

### Exemplo: filtro de traceback do Python

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Carregar filtros personalizados

Coloque o ficheiro numa localização reconhecida:

```
~/.omniroute/rtk/filters/my-filter.json     # Ao nível do utilizador
<project>/.rtk/filters/my-filter.json      # Ao nível do projeto
```

Os filtros são carregados automaticamente no arranque através de `loadRtkFilters()` em `open-sse/services/compression/engines/rtk/filterLoader.ts`. O carregador deteta filtros a partir de:

- Catálogo incorporado: `open-sse/services/compression/engines/rtk/filters/`
- Diretório do utilizador: `~/.omniroute/rtk/filters/`
- Diretório do projeto: `<project>/.rtk/filters/`

Para carregar filtros programaticamente:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opções: customFiltersEnabled (carrega filtros do utilizador/projeto, ativado por predefinição),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validação

Os filtros são validados em relação ao esquema Zod durante o carregamento. Um filtro com uma estrutura incorreta não será carregado e será registado um erro:

```
RTK_FILTER_LOADER: o filtro "my-filter" falhou a validação:
  - rules.replace.0.pattern: Expressão regular inválida
  - match.commands: não pode estar vazio
```

Para validar todos os filtros instalados, chame `runRtkFilterTests()`, que é exportado a partir de `open-sse/services/compression/engines/rtk/verify.ts`.

### Boas práticas

1. **Inclua sempre `tests[]`** — comprovam que o seu filtro funciona e evitam regressões
2. **Use `matchOutput` para interrupções antecipadas** — se uma única linha contar toda a história, substitua o bloco inteiro
3. **Prefira `keep` a `strip`** — regras explícitas de "preservar sempre" são mais seguras do que "remover sempre"
4. **Teste nos 3 níveis de intensidade** — `minimal` não deve produzir alterações, `aggressive` deve continuar a preservar os erros
5. **Use o campo `unless`** — proteja as interrupções antecipadas com "não ativar se X estiver presente"

---

## Recuperação do Output Original e Gate de Verificação

Quando o RTK comprime o output de forma agressiva, pode **recuperar o texto original** para depuração, auditoria ou repetição.

### Como Funciona a Recuperação do Output Original

```
Output original (10K tokens)
        │
        ▼
Compressão RTK (com rawOutput.enabled=true)
        │
        ├─▶ Output comprimido (2K tokens)  ──▶ para o LLM
        │
        └─▶ Output original (10K tokens)   ──▶ armazenado na BD
                                                  (associado por request_id)
```

### Ativar o Armazenamento do Output Original

**Por pedido** (na configuração combinada):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // limite de 1 MB
    }
  }
}
```

**Predefinição**: `rawOutput.enabled: false` (poupa armazenamento).

### Custo de Armazenamento

| Por pedido                 | Limite de 1 MB | Limite de 10 MB |
| -------------------------- | -------------- | --------------- |
| Output comprimido médio    | ~5KB           | ~5KB            |
| Output original armazenado | ~50-500KB      | ~500KB-5MB      |
| Com 1000 pedidos/dia       | 50-500MB/dia   | 500MB-5GB/dia   |

> **Recomendação**: Ative o output original apenas para **sessões de depuração** ou **auditorias por amostragem**, e não de forma permanente.

### Recuperar o Original

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId das estatísticas de compressão
if (raw) {
  console.log("Original output:", raw);
}
```

O `pointerId` é devolvido em `CompressionStats.rtkRawOutputPointers[]` após a compressão.
Consulte `open-sse/services/compression/engines/rtk/rawOutput.ts:102` para ver a assinatura da função.

### O Gate de Verificação

A **Verificação de Filtros RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) valida todos os filtros relativamente aos respetivos `tests[]` e garante que o comportamento está correto nos 3 níveis de intensidade.

**Chame `runRtkFilterTests()`** para executar a verificação:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**O que valida**:

1. Todos os filtros são carregados e passam a validação do esquema
2. Cada entrada de `tests[]` produz o output esperado
3. A intensidade `minimal` não realiza alterações (preserva o original e aplica apenas filtros estruturais)
4. A intensidade `aggressive` preserva erros, falhas de testes e rastreios da pilha
5. O output comprimido nunca é maior do que o input original

- Código-fonte: `open-sse/services/compression/engines/rtk/` (63 ficheiros, ~70KB)

- **Antes de integrar uma alteração a um filtro** — certifique-se sempre de que os testes passam
- **Depois de atualizar o motor RTK** — o esquema pode ter sido alterado
- **Periodicamente durante a monitorização** — protege contra divergências nos fixtures de teste
- **Ao adicionar uma nova família de ferramentas/comandos** — comprova que o novo filtro funciona

---

## Consulte Também

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Visão geral completa do pipeline de compressão
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registo de motores e motores integrados
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Motores personalizados, pacotes de idiomas, pipelines encadeados
- Código-fonte: `open-sse/services/compression/engines/rtk/` (63 ficheiros, ~70 KB)
