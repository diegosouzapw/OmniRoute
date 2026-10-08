# Extending the Compression Pipeline (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Resumindo**: o mecanismo de compactação do OmniRoute é **conectável** — você pode registrar mecanismos personalizados, distribuir pacotes de idiomas para novos idiomas e compor pipelines empilhados. Este guia mostra como.

**Guias relacionados:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Visão geral completa do pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registro de mecanismos e mecanismos integrados
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Mecanismo RTK e filtros personalizados
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referência do formato de pacotes de regras

---

## Visão geral

O sistema de compactação tem **3 pontos de extensão**:

| Ponto de extensão           | Caso de uso                                                                                               | Dificuldade |
| --------------------------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| **Mecanismo personalizado** | Adicionar um algoritmo de compactação totalmente novo (por exemplo, um sumarizador específico de domínio) | Avançada    |
| **Pacote de idioma**        | Adicionar suporte a um novo idioma natural (por exemplo, hindi ou árabe)                                  | Média       |
| **Pipeline empilhado**      | Compor mecanismos existentes em uma ordem personalizada                                                   | Iniciante   |

```
┌─────────────────────────────────────────────────────────────┐
│                  Estratégia de compactação                   │
│                                                              │
│ Mensagens de entrada ──▶ getEffectiveMode() ──▶ modo         │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   mecanismo mecanismo mecanismo encadeados │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Saída compactada              │
└─────────────────────────────────────────────────────────────┘

O seletor de estratégia é BASEADO EM MODO: cada solicitação seleciona UM modo
(rtk / lite / standard / aggressive / ultra / stacked / off).
Somente o modo "stacked" encadeia vários mecanismos em sequência.
O modo padrão de acionamento automático é "lite" (não uma cadeia de prioridade de 3 níveis).
```

---

## Criando um mecanismo de compactação personalizado

A interface do mecanismo (`open-sse/services/compression/engines/types.ts`) é o contrato que todo mecanismo deve cumprir. Ela tem 5 métodos obrigatórios.

### A interface `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID exclusivo do mecanismo
  name: string; // Nome de exibição
  description: string; // Descrição curta
  icon: string; // Ícone (emoji ou URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Pode ser usado em um pipeline empilhado
  stackPriority: number; // Ordem em pipelines empilhados (menor = mais cedo)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Exemplo mínimo: mecanismo de espaços em branco

O mecanismo mais simples possível — remover espaços em branco excedentes das mensagens.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Divide pelos marcadores de blocos de código e preserva os espaços em branco dentro deles
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Não modifica blocos de código
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Aplica somente ao texto
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // Executa DEPOIS de caveman/rtk

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // Percorre o array de mensagens — lida com conteúdo de string e multipartes
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // Conteúdo multipartes: percorre as partes e compacta somente as partes de texto
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // preserva image_url, tool_use etc.
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// Registra globalmente
registerCompressionEngine(whitespaceEngine);
````

### Onde colocar mecanismos personalizados

```
~/.omniroute/compression/engines/my-engine.ts    # Nível do usuário
<project>/compression-engines/my-engine.ts        # Nível do projeto (carregado na inicialização)
```

Ou carregue programaticamente a partir de um plugin:

```ts
// No seu plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // O SDK do plugin expõe os hooks onRequest / onResponse / onError. Registre o
  // mecanismo quando o módulo do plugin for carregado (ou no primeiro onRequest); cancele o registro
  // por meio do seu próprio fluxo de encerramento.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// No encerramento:
// unregisterCompressionEngine("my-engine");
```

### Testando seu mecanismo

Registre seu mecanismo em um plugin ou em uma função de inicialização. Após o registro, o mecanismo estará disponível
no seletor de estratégias por meio de seu `id`. Teste a integração compondo-o em um pipeline empilhado:

---

## Criando pacotes de idioma

A compactação no estilo Caveman usa **pacotes de regras específicos para cada idioma** para lidar com expressões de preenchimento, linguagem evasiva e padrões prolixos em cada idioma natural. O OmniRoute inclui **6 pacotes de idioma**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Estrutura do pacote

Um pacote de idioma é um diretório de **arquivos JSON** em `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Gentilezas, linguagem evasiva, polidez
│   ├── context.json         # Regras de redução de contexto
│   ├── dedup.json           # Regras de desduplicação
│   ├── structural.json      # Pontuação, formatação
│   └── ultra.json           # Regras de compactação agressiva
├── es/  (mesma estrutura)
├── fr/  (mesma estrutura)
├── de/  (mesma estrutura)
├── ja/  (mesma estrutura)
└── pt-BR/ (mesma estrutura)
```

### Anatomia de uma regra

Cada regra tem este formato (de `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Nome legível por humanos (kebab-case)
  pattern: string; // Padrão de expressão regular do JavaScript
  replacement?: string; // Texto que substituirá a correspondência
  replacementMap?: Record<string, string>; // OU um mapa de chave→substituição
  flags?: string; // Flags de expressão regular (geralmente "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Ignorar abaixo desta intensidade
  description?: string; // Documentação
}
```

### Exemplo: adicionando regras de preenchimento em hindi

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip polite openers like 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip 'actually' fillers"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Strip 'please' in Hindi"
    }
  ]
}
```

### Validação

Os pacotes de regras são validados em relação a `_schema.json` durante o carregamento. Um pacote com uma estrutura inválida não será carregado e registrará um erro:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

A validação é executada automaticamente quando um pacote é carregado (em relação a `_schema.json`); um
pacote inválido é rejeitado e o erro acima é registrado. Não há um script
`npm run` separado para validar pacotes — carregue o pacote (por exemplo, inicie o servidor ou
execute o fluxo de compactação) e acompanhe os logs.

### Carregando um pacote de idioma personalizado

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Ou coloque-o em um local reconhecido:

```
~/.omniroute/compression/rules/hi/filler.json  # Nível do usuário
<project>/.compression/rules/hi/filler.json   # Nível do projeto
```

### Práticas recomendadas para pacotes de idioma

1. **Comece com `filler`** — essas são as regras de maior impacto
2. **Use `minIntensity`** para restringir regras agressivas — isso protege contra compactação excessiva
3. **Inclua casos de teste** — adicione o array `tests[]` ao JSON para verificar o comportamento
4. **A ordem importa** — as regras anteriores são aplicadas primeiro; coloque as regras de maior impacto no início
5. **Seja conservador com `replacement`** — uma string vazia geralmente é a escolha correta; nunca introduza conteúdo novo

### Estratégia de tradução

Ao localizar pacotes de regras para um novo idioma:

1. **Traduza os nomes das regras** — eles aparecem na saída de depuração
2. **Adapte os padrões de expressão regular** — a tradução direta frequentemente falha (os limites de palavras variam)
3. **Teste com conversas reais** — o pacote deve ser seguro para entradas reais
4. **Considere as convenções culturais** — pacotes em japonês, por exemplo, têm mais expressões honoríficas de preenchimento do que pacotes em inglês

---

## Pipelines Empilhados

Um **pipeline empilhado** executa vários mecanismos em sequência, com a saída de cada mecanismo alimentando o próximo. É assim que `mode: stacked` funciona internamente.

### Como o Empilhamento Funciona

```
Entrada (10.000 tokens)
        │
        ▼
   ┌──────────┐
   │ Mecanismo│  prioridade 10
   │  A       │  ──▶ saída: 6.000 tokens (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Mecanismo│  prioridade 50
   │  B       │  ──▶ saída: 2.400 tokens (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Mecanismo│  prioridade 100
   │  C       │  ──▶ saída: 1.200 tokens (-80%)
   └────┬─────┘
        │
        ▼
Saída final (1.200 tokens, ~88% de economia combinada)
```

Quando `mode: "stacked"` é selecionado, os mecanismos são executados sequencialmente na ordem especificada no array `pipeline`.
A saída do mecanismo N torna-se a entrada do mecanismo N+1.

### Modos de Compressão

O OmniRoute seleciona **UM modo por solicitação** com base na configuração, nos limites de acionamento automático e nas substituições de combos.
Os modos disponíveis são definidos em `open-sse/services/compression/types.ts` (tipo `CompressionMode`):

| Modo         | Mecanismos             | Caso de uso                                                                                                                                                                                                                                          |
| ------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Nenhum                 | Desativa toda a compressão                                                                                                                                                                                                                           |
| `rtk`        | Somente RTK            | Sessões com grande volume de saídas de comandos (economia de mais de 80%)                                                                                                                                                                            |
| `lite`       | Somente Lite           | Compressão conservadora (rápida e segura)                                                                                                                                                                                                            |
| `standard`   | Caveman                | Compressão de prosa com pacotes de idiomas                                                                                                                                                                                                           |
| `aggressive` | Caveman + Aggressive   | Prosa agressiva + passagem final agressiva                                                                                                                                                                                                           |
| `ultra`      | Ultra                  | Compressão máxima (com perdas, último recurso). Opcionalmente encaminhada pelo mecanismo SLM **LLMLingua-2** quando `ultra.modelPath` está definido (em caso de indisponibilidade do modelo, recorre ao caminho baseado em regras sem causar falha). |
| `stacked`    | Pipeline personalizado | Combina mecanismos em qualquer ordem (veja abaixo)                                                                                                                                                                                                   |

> Além dos mecanismos de modo acima, o registro também inclui mecanismos especializados e empilháveis —
> **CCR**, **headroom**, **ionizer** e **session-dedup** — documentados em
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

A seleção do modo é determinada por `getEffectiveMode()` em `open-sse/services/compression/strategySelector.ts`:

1. Se a compressão estiver desativada: `"off"`
2. Se existir uma substituição de combo: usa a substituição
3. Se o limite de acionamento automático for excedido: usa `autoTriggerMode` (padrão: `"lite"`)
4. Caso contrário: usa `defaultMode`

### O Pipeline Empilhado Padrão

Quando `mode: "stacked"` é configurado explicitamente, o pipeline padrão combina:

1. **RTK** — remove ruídos da saída de comandos (~80% de economia na saída do terminal)
2. **Caveman** — remove palavras supérfluas e torna a prosa mais concisa (~46% no texto restante)
3. **Lite** — passagem final de espaços em branco + desduplicação

Essa composição proporciona **78-95% de economia** em sessões com uso intensivo de ferramentas.

### Configurando Pipelines Empilhados

Na configuração do combo:

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

Você pode omitir mecanismos, adicionar mecanismos personalizados ou reordená-los.

### Transferência de Estado

Os mecanismos podem ler metadados do contexto da solicitação (em `options`):

```ts
compress(body, config) {
  // Lê metadados dos mecanismos anteriores
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Os metadados são **somente leitura** — os mecanismos não podem alterar o contexto da solicitação, apenas a saída do próprio corpo.

### Armadilhas da Ordem de Execução

| Ordem dos mecanismos                       | Efeito                                                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                       | **Recomendado** (remove primeiro o ruído, depois a linguagem e, por fim, os espaços em branco)            |
| Lite → RTK → Caveman                       | Ruim — o Lite remove espaços em branco da saída bruta, fazendo a correspondência de padrões do RTK falhar |
| Caveman → RTK                              | Ruim — o Caveman pode reescrever o texto de maneiras que o RTK não reconhece                              |
| Qualquer ordem com `tool_results` primeiro | Melhor — a saída das ferramentas é o conteúdo mais ruidoso                                                |

### Quando NÃO Empilhar

O empilhamento nem sempre é melhor:

- **Mensagens simples** (sem saída de ferramentas) — apenas Caveman ou Lite é suficiente
- **Sensibilidade a custos** — cada mecanismo adiciona ~5-50 ms de latência
- **Ferramentas específicas** — somente RTK geralmente é suficiente para saídas do shell

### Criando um Pipeline Personalizado

Não há um registro de pipelines nomeados. Um pipeline empilhado é apenas um **array inline
de etapas** passado para `applyStackedCompression()` (exportado de
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Quando você não fornece um pipeline, o padrão é `rtk(standard) → caveman(full)`.

Para defini-lo por meio da configuração, defina `mode: "stacked"` e forneça o array de etapas em
`stackedPipeline` (lido de `config.stackedPipeline`):

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## Política de sincronização com projetos upstream

Os mecanismos de compressão do OmniRoute dão crédito a vários projetos upstream no README
("inspirado por RTK, Caveman, LLMLingua-2, Troglodita"). Uma dúvida comum entre
colaboradores é: **quando o RTK upstream adiciona um novo filtro de ferramenta ou o Caveman adiciona um pacote de
regras, como isso chega ao OmniRoute?** Esta seção contém a resposta oficial.

### Cópias incorporadas vs. implementações independentes

| Mecanismo                    | Relação com o upstream                                                                                                                         | Localização                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Reimplementação independente** (inspirada, não uma cópia)                                                                                    | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Reimplementação independente** (inspirada)                                                                                                   | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Principalmente interno; somente o codec `gcf/` é **realmente incorporado** do `gcf-typescript` (MIT, marcado com SPDX, apenas perfil genérico) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirados por esses projetos (alimentam os mecanismos `llmlingua` + `session-dedup`)                                                          | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Ponto principal: **RTK e Caveman são implementações TypeScript feitas do zero a partir das
_ideias_ (regras de filtro, pacotes de regras), e não árvores de código-fonte incorporadas.** Não há
uma cópia upstream da qual executar `git pull` — e é exatamente por isso que o README diz
"inspirado por", em vez de "incluído".

### Como as melhorias upstream são integradas

**Não há rastreamento automatizado de versões upstream nem um rótulo
`compression-sync`** — por decisão de projeto. Como os mecanismos são reimplementações, um filtro
upstream do RTK ou um pacote de regras do Caveman não é integrado como código; ele é **reexpresso como uma nova
regra/filtro no próprio formato do OmniRoute** (consulte
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) e é incorporado de maneira pontual por meio
de um PR normal. Os pontos de extensão acima (mecanismo personalizado, pacote de idioma, filtro RTK)
são a forma oficialmente aceita de contribuir com um deles.

Exemplos recentes exatamente desse fluxo:

- Filtros RTK para a saída de compilação do Gradle e do `dotnet` (v3.8.42)
- Filtros RTK para kubectl / docker-build / composer / gh (#2824)
- Pacote de idioma indonésio do Caveman (#3975), além de pacotes em alemão / francês / japonês / chinês

### Headroom (proxy de compressão de entrada)

O Headroom é **totalmente interno** — um snapshot fixado e incorporado do codec `gcf`, além das
camadas `smartcrusher` / `toon` / `tabular` próprias do OmniRoute. Não há um
upstream ativo para acompanhar além da cópia incorporada; as atualizações do `gcf` são feitas
manualmente quando o codec muda e são validadas novamente em relação à verificação do orçamento de compressão
(`check:compression-budget`).

### Como propor uma melhoria inspirada em um projeto upstream

1. **Não incorpore o código** — reexpresse a regra/filtro upstream no formato do OmniRoute.
2. Adicione-a por meio do ponto de extensão correspondente abaixo (pacote de idioma, filtro RTK ou
   mecanismo personalizado).
3. Mencione o projeto upstream na descrição do PR (atribuição), em vez de
   copiar o código-fonte sujeito à licença.
4. Inclua testes e confirme que a verificação `check:compression-budget` continua passando.

---

## Como adicionar um estilo de saída

Os estilos de saída (consulte a [tabela do catálogo no guia](./COMPRESSION_GUIDE.md#output-styles-catalog))
são a contraparte, no lado da resposta, dos mecanismos de entrada: em vez de compactar o que você
envia, eles instruem o modelo a produzir uma saída mais econômica. O registro é
`OUTPUT_STYLE_CATALOG` em `open-sse/services/compression/outputStyles/catalog.ts`, e
**uma entrada no catálogo constitui toda a funcionalidade**: o injetor, o painel de configurações do dashboard,
a persistência e a telemetria percorrem o catálogo — não há nenhuma outra lista para atualizar.

1. **Adicione uma entrada a `OUTPUT_STYLE_CATALOG`** com `id`, `label`, `description` e os
   três `levels` em inglês (`lite`, `full`, `ultra`). Cada nível deve terminar com
   `${SHARED_BOUNDARIES}` para que código, caminhos, comandos, erros e URLs permaneçam literais.
   O texto da instrução deve ser **estático e determinístico** para cada
   `(id, level, language)` — `${SHARED_BOUNDARIES}` é a única interpolação permitida.
2. **Traduza-a.** Inclua pelo menos um bloco `pt-BR` em `i18n`; `ponytail` e
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) servem como modelo de estrutura. Um estilo
   deliberadamente restrito a um único idioma define `locale` em vez disso (como `terse-cjk` → `zh`) e, nesse caso,
   é oferecido apenas nessa localidade.
3. **Atualize a verificação da matriz** — adicione os idiomas do estilo a `BASELINE_LANGUAGES` em
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. A validação rejeita qualquer novo estilo
   sem restrição de localidade que não tenha as traduções necessárias, a menos que ele contenha uma
   entrada explícita em `KNOWN_ENGLISH_ONLY` com uma issue de acompanhamento.
4. **Adicione um teste específico para o estilo**, baseado em
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: formato do catálogo, cláusula de limites
   por nível e uma asserção de referência que confirme que cada tradução está escrita em seu próprio
   idioma, em vez de ser uma cópia do inglês.
5. **Atribuição**: se o estilo for adaptado de um projeto upstream, dê os créditos em um
   comentário de origem na entrada (por exemplo, `i-have-adhd` → ayghri/i-have-adhd, MIT) — a mesma
   regra da seção "Como propor uma melhoria inspirada em um projeto upstream" acima.

Nenhuma alteração de UI, esquema ou telemetria é necessária — essas superfícies são renderizadas com base no catálogo.

---

## Boas práticas

### Desenvolvimento de mecanismos

1. **Sempre implemente `validateConfig`** — mecanismos sem validação causam falhas silenciosas
2. **Defina um `targetLatencyMs` realista** — usado pelo seletor de estratégias para escolher mecanismos
3. **Use `getConfigSchema` para o dashboard** — nunca oculte configurações dos usuários
4. **Ofereça suporte a `stackable: true` se o mecanismo for puro** — mecanismos com efeitos colaterais não devem ser empilhados
5. **Escreva testes inline** — os mecanismos devem poder ser verificados em menos de 1 segundo

### Desenvolvimento de pacotes de idioma

1. **Comece com a intensidade `lite`** — suas regras devem ser seguras na configuração mais baixa
2. **Use `context` para delimitar o escopo das regras** — regras exclusivas de `user` não podem afetar acidentalmente os prompts do sistema
3. **Evite capturar chaves JSON** — `\\bword\\b` pode encontrar correspondências dentro de JSON, corrompendo dados estruturados
4. **Teste casos extremos** — entrada vazia, Unicode, texto RTL e emojis
5. **Use pacotes existentes como modelos** — `en/filler.json` é o exemplo mais desenvolvido

### Projeto do pipeline

1. **Faça o perfil antes de otimizar** — primeiro faça medições com `compression_stats`
2. **Prefira composição à reimplementação** — estenda as regras do Caveman antes de escrever um novo mecanismo
3. **Documente a justificativa da ordem** — explique em um comentário por que o mecanismo A vem antes do mecanismo B
4. **Teste nos 3 níveis de intensidade** — `lite` é rápido, mas apresenta perdas; `ultra` é lento, mas preciso

---

## Referência: mecanismos integrados

| ID do mecanismo      | Empilhável | stackPriority padrão | Alvos                                                  |
| -------------------- | ---------- | -------------------- | ------------------------------------------------------ |
| `lite`               | Sim        | 5                    | mensagens, resultados de ferramentas                   |
| `rtk`                | Sim        | 10                   | resultados de ferramentas                              |
| `standard` (caveman) | Sim        | 20                   | mensagens, resultados de ferramentas, blocos de código |
| `aggressive`         | Sim        | 30                   | mensagens                                              |
| `ultra`              | Sim        | 40                   | mensagens, blocos de código                            |

### Veja também

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Visão geral do pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referência do registro de mecanismos
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Especificação do formato de regras
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Detalhes dos pacotes de idiomas
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Mecanismo RTK e filtros personalizados
- Fonte: `open-sse/services/compression/` (117 arquivos, ~250 KB)
