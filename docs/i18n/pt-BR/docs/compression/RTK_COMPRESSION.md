# RTK Compression (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

A compressão RTK é o mecanismo de compressão do OmniRoute que considera os comandos para compactar a saída de terminais e ferramentas. Ela foi
projetada para sessões de agentes de programação, nas quais a maior parte do crescimento do contexto vem de logs de testes, saída de compilação,
ruído de gerenciadores de pacotes, transcrições de shell, saída do Docker, saída do git e rastreamentos de pilha.

O RTK pode ser executado diretamente com `defaultMode: "rtk"` ou como a primeira etapa de um pipeline encadeado, geralmente:

```txt
rtk -> caveman
```

Essa ordem primeiro comprime saídas de máquina com muito ruído e depois permite que o Caveman condense o texto restante.

O RTK original relata uma economia de `60-90%` nas saídas de comandos. A sessão de exemplo em seu README passa de
`~118,000` tokens padrão para `~23,900` tokens RTK, o que representa uma economia de `79.7%` (`~80%`). O OmniRoute usa
essa média original no cálculo de economia do encadeamento com a compressão de entrada do Caveman:

```txt
Média do RTK:     80% de economia
Entrada Caveman:  46% de economia
Encadeados:       1 - (1 - 0.80) * (1 - 0.46) = 89.2% de economia
Intervalo:        1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## O Que Ele Comprime

Atualmente, o catálogo integrado inclui 49 filtros nestas categorias:

| Categoria | Exemplos                                                       |
| --------- | -------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`              |
| `test`    | Vitest, Jest, Pytest, Playwright, testes Go, testes Cargo      |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx  |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler  |
| `shell`   | `ls`, `find`, `grep`, logs genéricos do shell                  |
| `docker`  | `docker ps`, logs do Docker                                    |
| `infra`   | Terraform, OpenTofu, `systemctl status`                        |
| `generic` | saída JSON, rastreamentos de pilha, fallback de saída genérica |

O detector em `open-sse/services/compression/engines/rtk/commandDetector.ts` classifica a saída
antes da seleção do filtro. Os filtros também podem corresponder por padrão de comando ou expressão regular da saída quando uma classe de
comando não é suficiente.

## Resolução de Filtros

O RTK carrega os filtros nesta ordem:

1. Filtros do projeto em `.rtk/filters.toml` e `.rtk/filters.json`, somente quando confiáveis.
2. Filtros globais em `DATA_DIR/rtk/filters.toml` e `DATA_DIR/rtk/filters.json`.
3. Filtros integrados em `open-sse/services/compression/engines/rtk/filters/`.

No mesmo escopo, os filtros do esquema TOML v1 do RTK têm precedência sobre os filtros JSON do OmniRoute. As expressões TOML
`match_command` são verificadas antes da correspondência por tipo de comando, para que um filtro importado específico de um comando
possa substituir um filtro mais abrangente nesse escopo. O escopo do projeto ainda tem precedência sobre o escopo global,
independentemente do formato do arquivo.

Os filtros do projeto exigem confiança explicitamente porque filtros de expressão regular podem alterar como a saída das ferramentas é
mostrada aos agentes. Um arquivo de filtros do projeto é aceito quando uma destas condições é verdadeira:

- `rtkConfig.trustProjectFilters` é `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` está definido.
- `.rtk/trust.json` contém o hash SHA-256 correspondente ao arquivo de filtros do projeto.

Exemplo de arquivo de confiança:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Os hashes são separados: `filtersSha256` torna `.rtk/filters.json` confiável, enquanto `filtersTomlSha256`
torna `.rtk/filters.toml` confiável. A edição de qualquer um dos arquivos invalida apenas sua própria entrada de confiança. Os arquivos globais
são instalados pelo administrador e usam o comportamento existente de confiança em filtros globais.

Os filtros personalizados podem ser um objeto de filtro ou um array de objetos de filtro. Filtros personalizados inválidos são
ignorados e informados pelo diagnóstico de `/api/context/rtk/filters`. Filtros integrados inválidos provocam falha imediata.

## Compatibilidade com o esquema TOML v1 do RTK

O OmniRoute pode analisar, validar, testar e instalar arquivos de filtro declarativos usando o esquema TOML v1 do RTK.
Os campos compatíveis são `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` e os testes inline `[[tests.<filter>]]`.
Campos desconhecidos, expressões regulares inválidas ou inseguras, regras simultâneas de remoção/manutenção, arquivos com mais de
1 MiB e referências a filtros desconhecidos são rejeitados. Um arquivo cujos testes inline falhem pode ser
validado para inspeção, mas não pode ser instalado nem carregado. Falhas no carregamento de arquivos personalizados permanecem
fail-open: o arquivo inválido é ignorado e os filtros restantes continuam funcionando.

O OmniRoute recebe a saída da ferramenta depois que o cliente já a capturou, portanto `filter_stderr = true`
não pode alterar a captura do processo. O campo é aceito como no-op, e a validação retorna um aviso.
Isso é intencionalmente descrito como **compatibilidade com o esquema TOML v1 do RTK**, e não como compatibilidade total
com o executável do RTK, hooks de shell, implementações de comandos em Rust ou seu layout de armazenamento de confiança.

A visualização avançada do RTK no dashboard aceita TOML colado ou enviado por upload. A validação é somente leitura.
A instalação grava `DATA_DIR/rtk/filters.toml` atomicamente com permissões restritivas e atualiza
o catálogo de filtros ativo sem reinicialização. A substituição de um arquivo existente exige confirmação explícita de `overwrite`
e primeiro cria `DATA_DIR/rtk/filters.toml.bak`.

## DSL de filtros

Os filtros usam o esquema JSON descrito em [Formato das regras de compressão](./COMPRESSION_RULES_FORMAT.md).
O runtime aplica estes estágios na seguinte ordem:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> remover/incluir linhas
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Campos importantes:

| Campo                        | Finalidade                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Remover sequências de cor/controle do terminal antes da correspondência          |
| `rules.filterStderr`         | Normalizar prefixos comuns de stderr antes da correspondência/filtragem          |
| `rules.replace`              | Aplicar substituições ordenadas com expressões regulares                         |
| `rules.matchOutput`          | Retornar um resumo compacto quando a saída corresponder a uma condição conhecida |
| `rules.matchOutput[].unless` | Ignorar o atalho quando houver um padrão de erro/falha                           |
| `rules.dropPatterns`         | Remover linhas irrelevantes                                                      |
| `rules.includePatterns`      | Priorizar linhas que permitam ações                                              |
| `rules.collapsePatterns`     | Recolher linhas repetidas correspondentes                                        |
| `rules.deduplicate`          | Adesão por filtro: recolher linhas duplicadas consecutivas                       |
| `rules.truncateLineAt`       | Truncamento por linha compatível com Unicode                                     |
| `rules.onEmpty`              | Mensagem alternativa caso todas as linhas sejam filtradas                        |
| `tests[]`                    | Amostras inline usadas pelo gate de verificação                                  |

Espera-se que os filtros integrados incluam amostras inline em `tests[]`. Filtros personalizados também devem
incluí-las, especialmente quando forem compartilhados entre projetos.

## Desduplicação de linhas (duas camadas)

O RTK elimina linhas duplicadas em duas camadas independentes:

1. **`deduplicate` por filtro (opcional, padrão `false`).** Um filtro pode definir `rules.deduplicate: true`
   para eliminar linhas duplicadas consecutivas _dentro da saída correspondente desse filtro_, antes do truncamento.
   Isso é executado dentro de `lineFilter.ts`. Para filtros legados, é habilitado automaticamente quando o filtro define
   `collapsePatterns`. Esquema: `deduplicate: z.boolean().default(false)` em
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` para todo o mecanismo (padrão `3`).** Após a execução de todos os filtros, o mecanismo elimina
   qualquer sequência de `>= deduplicateThreshold` linhas consecutivas idênticas em todo o resultado
   (`deduplicateRepeatedLines`, aplicado em `engines/rtk/index.ts`). O valor é limitado ao intervalo de 2 a 100 durante
   a normalização.

A etapa por filtro é executada primeiro (dentro do filtro), e a etapa para todo o mecanismo é executada por último (sobre a saída
combinada), portanto, as duas são aplicadas em conjunto sem contagem duplicada.

## Agrupamento de linhas (`enableGrouping`)

Quando `rtkConfig.enableGrouping` é `true` (padrão `false`), o RTK executa uma etapa adicional de `groupSimilarLines`
sobre o resultado após a desduplicação, eliminando sequências de linhas consecutivas _quase equivalentes_ (não idênticas byte a byte).
`rtkConfig.groupingThreshold` (padrão `3`) é o comprimento mínimo da sequência que aciona
o agrupamento. Esse é o equivalente estrutural de `deduplicateThreshold`: a desduplicação trata repetições exatas,
enquanto o agrupamento trata linhas com "o mesmo formato, mas com pequenas diferenças". Ambas as opções fazem parte do JSON `rtkConfig`
persistido na tabela `key_value` (consulte Configuração acima), portanto, a configuração é preservada após reinicializações.

## Remoção de comentários de código (`stripCodeComments` / `preserveDocstrings`)

Quando `rtkConfig.applyToCodeBlocks` está habilitado, o RTK também pode remover comentários de blocos de código delimitados:

- `stripCodeComments` (padrão `false`) — opcional. Quando `true`, o RTK remove comentários de blocos delimitados de JavaScript
  e TypeScript. Historicamente, essa opção era lida, mas nunca aplicada; portanto, o padrão continua sendo
  "preservar" para evitar uma alteração silenciosa em produção.
- `preserveDocstrings` (padrão `true`) — ao remover comentários, os comentários de bloco JSDoc/`/** … */` são
  mantidos (eles contêm documentação de API que vale mais do que os bytes que consomem). Defina como `false` para removê-los
  também.

A remoção de comentários é implementada em `open-sse/services/compression/engines/rtk/codeStripper.ts`. Ela usa
o **parser do TypeScript** (não uma expressão regular), para que literais de string, template e regex nunca sejam confundidos
com comentários, e interrompe todo o processamento quando JSX é detectado (para que comentários em contêineres de expressão JSX nunca sejam
corrompidos). Atualmente, a remoção de comentários se aplica **somente a JavaScript e TypeScript** — outras
linguagens no conjunto `CodeLanguage` do removedor (Python, Rust, Go, Ruby, Java) têm eliminação de linhas vazias e
espaços em branco, mas não remoção de comentários. A execução do bloco processado recebe a tag `rtk:code-strip` em
`rulesApplied`.

> **Observação — a codificação GCF/tabular é um mecanismo separado.** O RTK **não** contém o codificador JSON
> tabular/colunar "GCF" (Graph Compact Format). Esse codificador — que substituiu um codificador
> `omni-tabular` mais antigo — está localizado no mecanismo **headroom**
> (`open-sse/services/compression/engines/headroom/`, com o codec incorporado em
> `headroom/gcf/`). Ele não está relacionado ao pipeline de filtros do RTK documentado aqui.

## Configuração

As configurações globais estão disponíveis por meio de `/api/settings/compression`. As configurações específicas do RTK também estão
disponíveis por meio de `/api/context/rtk/config`.

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

`enabledFilters` e `disabledFilters` usam IDs de filtro, por exemplo, `test-vitest` ou `git-diff`.

A estrutura completa de `rtkConfig` é definida por `RtkConfig` / `DEFAULT_RTK_CONFIG` em
`open-sse/services/compression/types.ts`. O objeto inteiro é persistido como um único valor JSON na
tabela SQLite `key_value`, em `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), e normalizado durante a leitura por `normalizeRtkConfig`. Portanto, todos os campos abaixo
— incluindo `enableGrouping`, `groupingThreshold`, `stripCodeComments` e `preserveDocstrings` —
fazem o ciclo completo pelo mesmo armazenamento e persistem após uma reinicialização.

| Chave                  | Padrão  | Finalidade                                                                                                    |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`     | Aplicado a todo o mecanismo: número mín. de linhas idênticas consecutivas para agrupamento (limitado a 2–100) |
| `enableGrouping`       | `false` | Opcional: agrupa sequências de linhas consecutivas quase equivalentes                                         |
| `groupingThreshold`    | `3`     | Número mín. de linhas semelhantes consecutivas que aciona o agrupamento                                       |
| `stripCodeComments`    | `false` | Opcional: remove comentários de blocos de código delimitados (requer `applyToCodeBlocks`)                     |
| `preserveDocstrings`   | `true`  | Ao remover comentários, mantém blocos JSDoc/`/** … */`                                                        |

## API

| Rota                               | Método | Finalidade                                                     |
| ---------------------------------- | ------ | -------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Ler a configuração do RTK                                      |
| `/api/context/rtk/config`          | PUT    | Atualizar a configuração do RTK                                |
| `/api/context/rtk/filters`         | GET    | Listar o catálogo de filtros e os diagnósticos de carregamento |
| `/api/context/rtk/import`          | POST   | Validar ou instalar arquivos do esquema TOML v1 do RTK         |
| `/api/context/rtk/test`            | POST   | Visualizar a compressão RTK para uma carga de texto            |
| `/api/context/rtk/raw-output/[id]` | GET    | Ler a saída bruta retida e anonimizada                         |
| `/api/compression/preview`         | POST   | Visualizar qualquer modo de compressão                         |

Carga útil de teste do RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Carga útil de visualização da compressão:

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

As rotas de gerenciamento exigem autenticação de gerenciamento do dashboard ou a política de chave de API correspondente.

Carga útil de validação TOML do RTK:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Use `"action": "install"` para instalar globalmente o arquivo validado. Adicione `"overwrite": true` somente
após revisar e confirmar a substituição de um arquivo global existente.

## Recuperação da Saída Bruta

O RTK normalmente retorna apenas texto compactado. Para depuração, `rawOutputRetention` pode reter a saída bruta com dados confidenciais removidos:

| Valor      | Comportamento                                                                     |
| ---------- | --------------------------------------------------------------------------------- |
| `never`    | Não retém a saída bruta                                                           |
| `failures` | Retém apenas saídas que provavelmente correspondem a falhas                       |
| `always`   | Retém toda saída bruta compactada pelo RTK, após a remoção de dados confidenciais |

Os arquivos retidos são gravados em:

```txt
DATA_DIR/rtk/raw-output/
```

Os segredos são removidos antes da persistência, incluindo tokens bearer comuns, chaves de API, tokens do Slack, chaves de acesso da AWS e valores no estilo de atribuição `token=...`, `secret=...`, `password=...`. A análise armazena apenas o ID do ponteiro e os metadados de tamanho e hash.

## Gate de Verificação

O gate de verificação focado executa testes de filtros integrados em linha sem recorrer a comandos externos:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

O gate mais abrangente do RTK é:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Execute o gate amplo de compactação antes do lançamento:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Estendendo o RTK

1. Adicione ou atualize um arquivo JSON de filtro.
2. Inclua pelo menos um exemplo em `tests[]` que comprove o comportamento importante.
3. Adicione um fixture em `tests/unit/compression/fixtures/rtk/` para novas famílias de comandos.
4. Adicione cobertura de detecção de comandos ao introduzir uma nova classe de saída.
5. Execute os gates de verificação e o gate amplo do RTK.
6. Se o filtro for local ao projeto, faça commit de `.rtk/filters.json` e atualize `.rtk/trust.json` somente após a revisão.

---

## Níveis de Intensidade (v3.8.16+)

O RTK oferece **3 níveis de intensidade** que equilibram a **agressividade da compactação** e a **segurança**. O nível é definido por meio de `config.intensity` na configuração do mecanismo.

### Os 3 Níveis

| Nível               | Limite de truncamento | Economia de tokens | Risco       | Mais adequado para              |
| ------------------- | --------------------- | ------------------ | ----------- | ------------------------------- |
| `minimal`           | 24 linhas por seção   | ~20-40%            | Muito baixo | Produção com contexto crítico   |
| `standard` (padrão) | 24 linhas por seção   | ~50-70%            | Baixo       | Sessões diárias de programação  |
| `aggressive`        | 16 linhas por seção   | ~70-90%            | Médio       | Sessões longas, economia máxima |

### Onde Ocorre o Truncamento

O limite de truncamento afeta `lineFilter.ts`:

```ts
// De open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Tanto o **início** quanto o **fim** de cada seção são preservados; o conteúdo intermediário é descartado quando o truncamento entra em ação.

### O Que Permanece e o Que É Cortado

| Conteúdo                       | minimal        | standard       | aggressive     |
| ------------------------------ | -------------- | -------------- | -------------- |
| Erros / rastreamentos de pilha | ✅ preservados | ✅ preservados | ✅ preservados |
| Falhas em testes               | ✅ preservadas | ✅ preservadas | ✅ preservadas |
| Erros de build                 | ✅ preservados | ✅ preservados | ✅ preservados |
| Testes aprovados (detalhados)  | ✅ preservados | 🟡 condensados | 🟡 condensados |
| Saída rotineira (logs de info) | 🟡 condensada  | 🟡 condensada  | ❌ descartada  |
| Barras de progresso            | 🟡 condensadas | ❌ descartadas | ❌ descartadas |
| Banner / arte ASCII            | 🟡 condensados | ❌ descartados | ❌ descartados |

### Escolhendo a Intensidade Correta

```
                  Perder contexto seria catastrófico?
                  │
      ┌───────────┼───────────┐
      │           │           │
    SIM          NÃO       NÃO SEI
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Quão crítico    Tente `standard` primeiro
      │      é o desempenho? (funciona em 80% dos
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

### Configurando a Intensidade

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
de um mecanismo por meio do helper do registro:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Verificando o Efeito

Use o **Gate de Verificação** (veja abaixo) para confirmar que seu filtro é seguro na intensidade escolhida:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Os filtros falharam na intensidade agressiva");
}
```

---

## Desenvolvimento de filtros personalizados (v3.8.16+)

O diretório `engines/rtk/filters/` contém **mais de 49 arquivos JSON de filtros integrados**. Você pode adicionar seus próprios filtros para compactar a saída de ferramentas personalizadas não abrangidas pelos padrões.

### Esquema do filtro (Zod)

```ts
{
  "id": "string",                      // Obrigatório. Identificador do filtro (kebab-case, por exemplo, "python-traceback")
  "label": "string",                   // Obrigatório. Nome legível do filtro
  "description": "string",             // Opcional (padrão: ""). Breve descrição do que o filtro faz
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Opcional (0-100, padrão: 50). Ordem de execução (maior = primeiro)
  "match": {
    "commands": ["string"],            // Nomes de comandos a serem correspondidos (por exemplo, "python", "pytest")
    "patterns": ["string"],            // Padrões de regex para correspondência com a saída
    "outputTypes": ["string"]          // Classes de saída detectadas (por exemplo, "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Opcional (padrão: false). Remove códigos de cores ANSI
    "replace": [                       // Regras de localização e substituição (padrão: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Encerra antecipadamente ao encontrar correspondência com o padrão (padrão: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Ignora se houver correspondência com este padrão
      }
    ],
    "includePatterns": ["string"],     // Linhas a serem mantidas (padrões de regex, padrão: [])
    "dropPatterns": ["string"],        // Linhas a serem descartadas (padrões de regex, padrão: [])
    "collapsePatterns": ["string"],    // Linhas a serem reduzidas a uma única ocorrência (padrão: [])
    "deduplicate": boolean,            // Opcional (padrão: false). Remove linhas duplicadas
    "truncateLineAt": number,          // Opcional (padrão: 0). Trunca as linhas no número máximo de caracteres
    "maxLines": number,                // Opcional (padrão: 0). Limite rígido para o total de linhas
    "headLines": number,               // Opcional (padrão: 20). Mantém as primeiras N linhas da saída correspondente
    "tailLines": number,               // Opcional (padrão: 20). Mantém as últimas N linhas da saída correspondente
    "onEmpty": "string",               // Opcional (padrão: ""). Mensagem alternativa se todas as linhas forem filtradas
    "filterStderr": boolean            // Opcional (padrão: false). Também filtra a saída de stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Padrões que sempre devem ser preservados (padrão: [])
    "summaryPatterns": ["string"]      // Padrões para a linha de resumo final (padrão: [])
  },
  "tests": [                           // Testes embutidos para verificação (padrão: [])
    {
      "name": "string",               // Obrigatório. Nome do teste
      "input": "sample output",        // Obrigatório. Texto de entrada de exemplo
      "expected": "expected output",   // Obrigatório. Saída compactada esperada
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

### Carregamento de filtros personalizados

Coloque o arquivo em um local reconhecido:

```
~/.omniroute/rtk/filters/my-filter.json     # Nível do usuário
<project>/.rtk/filters/my-filter.json      # Nível do projeto
```

Os filtros são carregados automaticamente na inicialização por meio de `loadRtkFilters()` em `open-sse/services/compression/engines/rtk/filterLoader.ts`. O carregador encontra filtros em:

- Catálogo integrado: `open-sse/services/compression/engines/rtk/filters/`
- Diretório do usuário: `~/.omniroute/rtk/filters/`
- Diretório do projeto: `<project>/.rtk/filters/`

Para carregar filtros programaticamente:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opções: customFiltersEnabled (carrega filtros do usuário/projeto, ativado por padrão),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validação

Os filtros são validados em relação ao esquema Zod durante o carregamento. Um filtro com uma estrutura inválida não será carregado e um erro será registrado:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Para validar todos os filtros instalados, chame `runRtkFilterTests()`, que é exportada de `open-sse/services/compression/engines/rtk/verify.ts`.

### Práticas recomendadas

1. **Sempre inclua `tests[]`** — eles comprovam que seu filtro funciona e evitam regressões
2. **Use `matchOutput` para curtos-circuitos** — se uma única linha contar toda a história, substitua o bloco inteiro
3. **Prefira `keep` a `strip`** — regras explícitas de "sempre preservar" são mais seguras do que "sempre remover"
4. **Teste em todos os 3 níveis de intensidade** — `minimal` deve ser uma operação nula, e `aggressive` ainda deve preservar erros
5. **Use o campo `unless`** — proteja os curtos-circuitos com "não acione se X estiver presente"

---

## Recuperação da saída bruta e etapa de verificação

Quando o RTK comprime a saída agressivamente, você pode **recuperar o texto original** para depuração, auditoria ou reprodução.

### Como funciona a recuperação da saída bruta

```
Saída original (10 mil tokens)
        │
        ▼
Compressão do RTK (com rawOutput.enabled=true)
        │
        ├─▶ Saída comprimida (2 mil tokens)  ──▶ para o LLM
        │
        └─▶ Saída original (10 mil tokens)   ──▶ armazenada no banco de dados
                                                  (vinculada por request_id)
```

### Habilitando o armazenamento da saída bruta

**Por solicitação** (na configuração do combo):

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

**Padrão**: `rawOutput.enabled: false` (economiza armazenamento).

### Custo de armazenamento

| Por solicitação           | Limite de 1 MB | Limite de 10 MB |
| ------------------------- | -------------- | --------------- |
| Média da saída comprimida | ~5KB           | ~5KB            |
| Saída bruta armazenada    | ~50-500KB      | ~500KB-5MB      |
| Com 1000 solicitações/dia | 50-500MB/dia   | 500MB-5GB/dia   |

> **Recomendação**: habilite a saída bruta apenas para **sessões de depuração** ou **auditoria por amostragem**, não de forma permanente.

### Recuperando o original

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId das estatísticas de compressão
if (raw) {
  console.log("Original output:", raw);
}
```

O `pointerId` é retornado em `CompressionStats.rtkRawOutputPointers[]` após a compressão.
Consulte `open-sse/services/compression/engines/rtk/rawOutput.ts:102` para ver a assinatura da função.

### A etapa de verificação

A **verificação dos filtros do RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) valida todos os filtros em relação aos respectivos `tests[]` e garante que o comportamento esteja correto nos três níveis de intensidade.

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

**O que é validado**:

1. Todos os filtros são carregados e passam na validação do esquema
2. Cada entrada de `tests[]` produz a saída esperada
3. A intensidade `minimal` não realiza nenhuma operação (preserva o original e aplica apenas filtros estruturais)
4. A intensidade `aggressive` preserva erros, falhas de testes e rastreamentos de pilha
5. A saída comprimida nunca é maior que a entrada original

- Fonte: `open-sse/services/compression/engines/rtk/` (63 arquivos, ~70KB)

- **Antes de mesclar uma alteração em um filtro** — sempre garanta que os testes sejam aprovados
- **Após atualizar o mecanismo RTK** — o esquema pode ter mudado
- **Periodicamente durante o monitoramento** — protege contra divergências nos fixtures de teste
- **Ao adicionar uma nova família de ferramentas/comandos** — comprova que o novo filtro funciona

---

## Veja também

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Visão geral completa do pipeline de compressão
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registro de mecanismos e mecanismos integrados
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Mecanismos personalizados, pacotes de idiomas e pipelines empilhados
- Código-fonte: `open-sse/services/compression/engines/rtk/` (63 arquivos, ~70 KB)
