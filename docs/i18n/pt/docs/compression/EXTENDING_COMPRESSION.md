# Extending the Compression Pipeline (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **RESUMO**: O motor de compressão do OmniRoute é **extensível** — pode registar motores personalizados, distribuir pacotes de idiomas para novos idiomas e compor pipelines encadeados. Este guia mostra como fazê-lo.

**Guias relacionados:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Visão geral completa do pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registo de motores e motores incorporados
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Motor RTK e filtros personalizados
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referência do formato dos pacotes de regras

---

## Visão geral

O sistema de compressão tem **3 pontos de extensão**:

| Ponto de extensão       | Caso de utilização                                                                  | Dificuldade |
| ----------------------- | ----------------------------------------------------------------------------------- | ----------- |
| **Motor personalizado** | Adicionar um algoritmo de compressão totalmente novo (p. ex., resumo especializado) | Avançada    |
| **Pacote de idioma**    | Adicionar suporte para um novo idioma natural (p. ex., hindi, árabe)                | Média       |
| **Pipeline encadeado**  | Compor motores existentes numa ordem personalizada                                  | Iniciante   |

```
┌─────────────────────────────────────────────────────────────┐
│                    Estratégia de compressão                  │
│                                                              │
│   Mensagens de entrada ──▶ getEffectiveMode() ──▶ modo       │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   Motor     Motor    Motor     engines[]    │
│                   RTK       Lite     Caveman   encadeados   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Saída comprimida              │
└─────────────────────────────────────────────────────────────┘

O seletor de estratégia BASEIA-SE NO MODO: cada pedido seleciona UM modo
(rtk / lite / standard / aggressive / ultra / stacked / off).
Apenas o modo "stacked" encadeia vários motores em sequência.
O modo de ativação automática predefinido é "lite" (não uma cadeia de
prioridade com 3 níveis).
```

---

## Criar um motor de compressão personalizado

A interface do motor (`open-sse/services/compression/engines/types.ts`) é o contrato que todos os motores têm de cumprir. Tem 5 métodos obrigatórios.

### A interface `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID exclusivo do motor
  name: string; // Nome de apresentação
  description: string; // Descrição breve
  icon: string; // Ícone (emoji ou URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Pode ser utilizado num pipeline encadeado
  stackPriority: number; // Ordem nos pipelines encadeados (menor = mais cedo)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Exemplo mínimo: motor de espaços em branco

O motor mais simples possível — remove os espaços em branco adicionais das mensagens.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Dividir pelos marcadores de blocos de código e preservar os espaços em branco no interior dos mesmos
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Não modificar os blocos de código
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Aplicar apenas à prosa
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
  stackPriority: 100, // Executar DEPOIS de caveman/rtk

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

    // Percorrer o array de mensagens — processar conteúdo de texto e multipartes
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
      // Conteúdo multipartes: percorrer as partes e comprimir apenas as partes de texto
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
          return part; // preservar image_url, tool_use, etc.
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

// Registar globalmente
registerCompressionEngine(whitespaceEngine);
````

### Onde Colocar Motores Personalizados

```
~/.omniroute/compression/engines/my-engine.ts    # Ao nível do utilizador
<project>/compression-engines/my-engine.ts        # Ao nível do projeto (carregado no arranque)
```

Ou carregue-os programaticamente a partir de um plugin:

```ts
// No seu plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // O SDK do plugin disponibiliza os hooks onRequest / onResponse / onError. Registe o
  // motor quando o módulo do plugin for carregado (ou no primeiro onRequest); anule o registo
  // no seu próprio fluxo de desmontagem.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Durante a desmontagem:
// unregisterCompressionEngine("my-engine");
```

### Testar o Seu Motor

Registe o seu motor num plugin ou numa função de arranque. Depois de registado, o motor ficará disponível
no seletor de estratégias através do respetivo `id`. Teste a integração compondo-o num pipeline empilhado:

---

## Criar Pacotes de Idioma

A compressão ao estilo Caveman utiliza **pacotes de regras específicos de cada idioma** para processar bordões, expressões de hesitação e padrões verbosos em cada língua natural. O OmniRoute inclui **6 pacotes de idioma**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Estrutura do Pacote

Um pacote de idioma é um diretório de **ficheiros JSON** em `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Saudações, hesitação, cortesia
│   ├── context.json         # Regras de redução de contexto
│   ├── dedup.json           # Regras de eliminação de duplicados
│   ├── structural.json      # Pontuação, formatação
│   └── ultra.json           # Regras de compressão agressiva
├── es/  (mesma estrutura)
├── fr/  (mesma estrutura)
├── de/  (mesma estrutura)
├── ja/  (mesma estrutura)
└── pt-BR/ (mesma estrutura)
```

### Anatomia de uma Regra

Cada regra tem esta estrutura (de `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Nome legível por humanos (kebab-case)
  pattern: string; // Padrão de expressão regular JavaScript
  replacement?: string; // Valor pelo qual substituir a correspondência
  replacementMap?: Record<string, string>; // OU um mapa chave→substituição
  flags?: string; // Modificadores da expressão regular (normalmente "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Ignorar abaixo desta intensidade
  description?: string; // Documentação
}
```

### Exemplo: Adicionar Regras de Bordões em Hindi

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "abertura_cortês",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Remover aberturas corteses como 'नमस्ते'"
    },
    {
      "name": "bordão_na_verdade",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Remover bordões equivalentes a 'na verdade'"
    },
    {
      "name": "pedido_verboso",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Remover 'por favor' em hindi"
    }
  ]
}
```

### Validação

Os pacotes de regras são validados em relação a `_schema.json` durante o carregamento. Um pacote com uma estrutura incorreta não será carregado e será registado um erro:

```
RULE_LOADER: o pacote "hi/filler.json" falhou na validação:
  - rules.0.pattern: Expressão regular inválida
  - rules.1.context: deve ser um de [all, user, system, assistant]
```

A validação é executada automaticamente quando um pacote é carregado (em relação a `_schema.json`); um
pacote inválido é rejeitado e o erro acima é registado. Não existe um script
`npm run` separado para a validação de pacotes — carregue o pacote (por exemplo, iniciando o servidor ou
executando o fluxo de compressão) e observe os registos.

### Carregar um Pacote de Idioma Personalizado

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Em alternativa, coloque-o numa localização reconhecida:

```
~/.omniroute/compression/rules/hi/filler.json  # Ao nível do utilizador
<project>/.compression/rules/hi/filler.json   # Ao nível do projeto
```

### Boas Práticas para Pacotes de Idioma

1. **Comece por `filler`** — estas são as regras com maior impacto
2. **Utilize `minIntensity`** para restringir regras agressivas — protege contra compressão excessiva
3. **Inclua casos de teste** — adicione um array `tests[]` ao JSON para verificar o comportamento
4. **A ordem é importante** — as regras anteriores são aplicadas primeiro; coloque primeiro as regras com maior impacto
5. **Seja prudente com `replacement`** — uma cadeia vazia é normalmente a opção correta; nunca introduza conteúdo novo

### Estratégia de Tradução

Ao localizar pacotes de regras para um novo idioma:

1. **Traduza os nomes das regras** — aparecem na saída de depuração
2. **Adapte os padrões de expressões regulares** — a tradução direta falha frequentemente (os limites das palavras diferem)
3. **Teste com conversas reais** — o pacote deve ser seguro com entradas reais
4. **Respeite as convenções culturais** — os pacotes de japonês, por exemplo, têm mais bordões honoríficos do que os de inglês

---

## Pipelines Empilhados

Um **pipeline empilhado** executa vários motores em sequência, sendo a saída de cada motor encaminhada para o seguinte. É assim que `mode: stacked` funciona internamente.

### Como Funciona o Empilhamento

```
Entrada (10,000 tokens)
        │
        ▼
   ┌──────────┐
   │  Motor   │  prioridade 10
   │  A       │  ──▶ saída: 6,000 tokens (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioridade 50
   │  B       │  ──▶ saída: 2,400 tokens (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioridade 100
   │  C       │  ──▶ saída: 1,200 tokens (-80%)
   └────┬─────┘
        │
        ▼
Saída final (1,200 tokens, ~88% de poupança combinada)
```

Quando `mode: "stacked"` é selecionado, os motores são executados sequencialmente pela ordem especificada no array `pipeline`.
A saída do motor N torna-se a entrada do motor N+1.

### Modos de Compressão

O OmniRoute seleciona **UM modo por pedido** com base na configuração, nos limiares de ativação automática e nas substituições de combinações.
Os modos disponíveis estão definidos em `open-sse/services/compression/types.ts` (tipo `CompressionMode`):

| Modo         | Motores                | Caso de utilização                                                                                                                                                                                                               |
| ------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Nenhum                 | Desativar toda a compressão                                                                                                                                                                                                      |
| `rtk`        | Apenas RTK             | Sessões com uma grande quantidade de resultados de comandos (mais de 80% de poupança)                                                                                                                                            |
| `lite`       | Apenas Lite            | Compressão conservadora (rápida e segura)                                                                                                                                                                                        |
| `standard`   | Caveman                | Compressão de prosa com pacotes de idiomas                                                                                                                                                                                       |
| `aggressive` | Caveman + Aggressive   | Prosa agressiva + passagem final agressiva                                                                                                                                                                                       |
| `ultra`      | Ultra                  | Compressão máxima (com perdas, último recurso). Opcionalmente encaminhada através do motor SLM **LLMLingua-2** quando `ultra.modelPath` está definido (recorre ao método baseado em regras quando o modelo não está disponível). |
| `stacked`    | Pipeline personalizado | Combinar motores por qualquer ordem (ver abaixo)                                                                                                                                                                                 |

> Para além dos motores dos modos acima, o registo também inclui motores empilháveis especializados —
> **CCR**, **headroom**, **ionizer** e **session-dedup** — documentados em
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

A seleção do modo é determinada por `getEffectiveMode()` em `open-sse/services/compression/strategySelector.ts`:

1. Se a compressão estiver desativada: `"off"`
2. Se existir uma substituição de combinação: utilizar a substituição
3. Se o limiar de ativação automática for excedido: utilizar `autoTriggerMode` (predefinição: `"lite"`)
4. Caso contrário: utilizar `defaultMode`

### O Pipeline Empilhado Predefinido

Quando `mode: "stacked"` é configurado explicitamente, o pipeline predefinido combina:

1. **RTK** — remove ruído dos resultados de comandos (poupança de ~80% nos resultados do terminal)
2. **Caveman** — remove elementos supérfluos e torna a prosa mais concisa (~46% no texto restante)
3. **Lite** — passagem final de espaços em branco + eliminação de duplicados

Esta composição alcança uma **poupança de 78-95%** em sessões com utilização intensiva de ferramentas.

### Configurar Pipelines Empilhados

Na configuração da combinação:

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

Pode omitir motores, adicionar motores personalizados ou reordená-los.

### Passagem de Estado

Os motores podem ler metadados do contexto do pedido (em `options`):

```ts
compress(body, config) {
  // Ler metadados de motores anteriores
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Os metadados são **só de leitura** — os motores não podem alterar o contexto do pedido, apenas a saída do seu próprio corpo.

### Aspetos a Ter em Conta na Ordem de Execução

| Ordem dos motores                          | Efeito                                                                                                     |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                       | **Recomendada** (remove primeiro o ruído, depois a linguagem e, por fim, os espaços em branco)             |
| Lite → RTK → Caveman                       | Má — o Lite remove espaços em branco da saída em bruto, fazendo falhar a correspondência de padrões do RTK |
| Caveman → RTK                              | Má — o Caveman pode reescrever o texto de formas que o RTK não reconhece                                   |
| Qualquer ordem com `tool_results` primeiro | Melhor — os resultados das ferramentas são o conteúdo com mais ruído                                       |

### Quando NÃO Empilhar

O empilhamento nem sempre é melhor:

- **Mensagens simples** (sem resultados de ferramentas) — basta utilizar apenas o Caveman ou o Lite
- **Sensibilidade a custos** — cada motor acrescenta ~5-50ms de latência
- **Ferramentas específicas** — normalmente, o RTK é suficiente para resultados da shell

### Criar um Pipeline Personalizado

Não existe um registo de pipelines com nome. Um pipeline empilhado é apenas um **array inline
de passos** passado a `applyStackedCompression()` (exportado de
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Quando não é fornecido um pipeline, a predefinição é `rtk(standard) → caveman(full)`.

Para o controlar através da configuração, defina `mode: "stacked"` e forneça o array de passos em
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

## Política de Sincronização com Upstream

Os mecanismos de compressão do OmniRoute atribuem créditos no README a vários projetos upstream
(«inspirado no RTK, Caveman, LLMLingua-2, Troglodita»). Uma pergunta comum dos
contribuidores é: **quando o RTK upstream adiciona um novo filtro de ferramentas ou o Caveman adiciona um pacote
de regras, como é que isso chega ao OmniRoute?** Esta secção contém a resposta oficial.

### Cópias integradas vs. implementações independentes

| Mecanismo                    | Relação com o upstream                                                                                                                                       | Localização                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **RTK**                      | **Reimplementação independente** (inspirada, não uma cópia)                                                                                                  | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Reimplementação independente** (inspirada)                                                                                                                 | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Maioritariamente interno; apenas o codec `gcf/` é **genuinamente integrado** a partir de `gcf-typescript` (MIT, assinalado com SPDX, apenas perfil genérico) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirados nestes projetos (servem de base aos mecanismos `llmlingua` + `session-dedup`)                                                                     | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Ponto-chave: **o RTK e o Caveman são implementações TypeScript em sala limpa das
_ideias_ (regras de filtragem, pacotes de regras), não árvores de código-fonte integradas.** Não existe
qualquer cópia upstream a partir da qual executar `git pull` — e é precisamente por isso que o README diz
«inspirado em» em vez de «incluído».

### Como são integradas as melhorias upstream

**Não existe qualquer acompanhamento automatizado de lançamentos upstream nem uma etiqueta `compression-sync`
** — intencionalmente. Como os mecanismos são reimplementações, um filtro RTK
ou pacote de regras Caveman upstream não é integrado como código; é **reformulado como uma nova
regra/filtro no formato próprio do OmniRoute** (consulte
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) e é integrado pontualmente através de
um PR normal. Os pontos de extensão acima (mecanismo personalizado, pacote de idioma, filtro RTK)
são a forma aprovada de contribuir com uma destas melhorias.

Exemplos recentes deste fluxo:

- Filtros RTK para a saída de compilação do Gradle e do `dotnet` (v3.8.42)
- Filtros RTK para kubectl / docker-build / composer / gh (#2824)
- Pacote de idioma indonésio do Caveman (#3975), além de pacotes em alemão / francês / japonês / chinês

### Headroom (proxy de compressão de entrada)

O Headroom é **totalmente interno** — uma captura integrada e fixada do codec `gcf`, mais
as camadas `smartcrusher` / `toon` / `tabular` próprias do OmniRoute. Não existe qualquer upstream ativo
a acompanhar para além da cópia integrada; as atualizações do `gcf` são aplicadas
manualmente quando o codec muda e novamente validadas face ao controlo de orçamento de compressão
(`check:compression-budget`).

### Propor uma melhoria inspirada no upstream

1. **Não integre uma cópia** — reformule a regra/filtro upstream no formato do OmniRoute.
2. Adicione-a através do ponto de extensão correspondente abaixo (pacote de idioma, filtro RTK ou
   mecanismo personalizado).
3. Mencione o projeto upstream na descrição do PR (atribuição), em vez de
   copiar o respetivo código-fonte sujeito a licença.
4. Inclua testes e confirme que o controlo `check:compression-budget` continua a passar.

---

## Adicionar um Estilo de Saída

Os estilos de saída (consulte a [tabela de catálogo do guia](./COMPRESSION_GUIDE.md#output-styles-catalog))
são o equivalente, no lado da resposta, aos motores de entrada: em vez de comprimirem o que
envia, instruem o modelo a produzir uma saída mais económica. O registo é
`OUTPUT_STYLE_CATALOG` em `open-sse/services/compression/outputStyles/catalog.ts`, e
**uma entrada no catálogo constitui toda a funcionalidade**: o injetor, o painel de definições
do dashboard, a persistência e a telemetria enumeram o catálogo — não existe qualquer outra lista a atualizar.

1. **Adicione uma entrada a `OUTPUT_STYLE_CATALOG`** com `id`, `label`, `description` e os
   três `levels` em inglês (`lite`, `full`, `ultra`). Cada nível tem de terminar com
   `${SHARED_BOUNDARIES}` para que código, caminhos, comandos, erros e URLs permaneçam textualmente inalterados.
   O texto das instruções tem de ser **estático e determinístico** por
   `(id, level, language)` — `${SHARED_BOUNDARIES}` é a única interpolação permitida.
2. **Traduza-a.** Inclua, no mínimo, um bloco `pt-BR` em `i18n`; `ponytail` e
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) são o formato de referência. Um estilo deliberadamente
   limitado a um único idioma define `locale` em alternativa (como `terse-cjk` → `zh`) e, nesse caso,
   só é disponibilizado nesse idioma.
3. **Atualize a verificação da matriz** — adicione os idiomas do estilo a `BASELINE_LANGUAGES` em
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. A validação rejeita qualquer novo
   estilo sem restrição de idioma que não tenha as traduções necessárias, a menos que tenha uma
   entrada `KNOWN_ENGLISH_ONLY` explícita com uma tarefa de acompanhamento.
4. **Adicione um teste específico do estilo** baseado em
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: formato do catálogo, cláusula de limites
   por nível e uma verificação de referência que confirme que cada tradução está escrita no respetivo
   idioma, em vez de ser uma cópia do inglês.
5. **Atribuição**: se o estilo for adaptado de um projeto externo, atribua-lhe os devidos créditos num
   comentário de origem na entrada (por exemplo, `i-have-adhd` → ayghri/i-have-adhd, MIT) — aplica-se
   a mesma regra indicada acima em "Propor uma melhoria inspirada num projeto externo".

Não é necessária qualquer alteração à IU, ao esquema ou à telemetria — essas interfaces são geradas a partir do catálogo.

---

## Boas Práticas

### Desenvolvimento de Motores

1. **Implemente sempre `validateConfig`** — os motores sem validação causam falhas silenciosas
2. **Defina um `targetLatencyMs` realista** — é utilizado pelo seletor de estratégias para escolher motores
3. **Utilize `getConfigSchema` para o dashboard** — nunca oculte a configuração dos utilizadores
4. **Suporte `stackable: true` se o seu motor for puro** — os motores com efeitos secundários não devem ser combinados
5. **Escreva testes inline** — os motores devem poder ser verificados em menos de 1 segundo

### Desenvolvimento de Pacotes de Idioma

1. **Comece pela intensidade `lite`** — as suas regras devem ser seguras na definição mais baixa
2. **Utilize `context` para limitar o âmbito das regras** — as regras exclusivas de `user` não podem afetar acidentalmente os prompts de sistema
3. **Evite capturar chaves JSON** — `\\bword\\b` pode corresponder a texto dentro de JSON, danificando os dados estruturados
4. **Teste casos extremos** — entrada vazia, Unicode, texto RTL, emojis
5. **Utilize os pacotes existentes como modelos** — `en/filler.json` é o exemplo mais desenvolvido

### Conceção do Pipeline

1. **Analise o desempenho antes de otimizar** — comece por medir com `compression_stats`
2. **Prefira a composição à reimplementação** — amplie as regras do Caveman antes de escrever um novo motor
3. **Documente a justificação da ordem** — explique num comentário por que razão o motor A precede o motor B
4. **Teste nos 3 níveis de intensidade** — `lite` é rápido, mas apresenta perdas; `ultra` é lento, mas preciso

---

## Referência: Motores incorporados

| ID do motor          | Empilhável | stackPriority predefinida | Alvos                                                  |
| -------------------- | ---------- | ------------------------- | ------------------------------------------------------ |
| `lite`               | Sim        | 5                         | mensagens, resultados_de_ferramentas                   |
| `rtk`                | Sim        | 10                        | resultados_de_ferramentas                              |
| `standard` (caveman) | Sim        | 20                        | mensagens, resultados_de_ferramentas, blocos_de_código |
| `aggressive`         | Sim        | 30                        | mensagens                                              |
| `ultra`              | Sim        | 40                        | mensagens, blocos_de_código                            |

### Ver também

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Visão geral do pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referência do registo de motores
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Especificação do formato das regras
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Detalhes dos pacotes de idiomas
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Motor RTK e filtros personalizados
- Código-fonte: `open-sse/services/compression/` (117 ficheiros, ~250 KB)
