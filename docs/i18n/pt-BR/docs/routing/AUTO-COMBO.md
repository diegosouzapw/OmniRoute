# OmniRoute Auto-Combo Engine (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Para usuários**: Está procurando um início rápido? Consulte o [Guia do usuário do Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) para obter explicações simples e exemplos.

> Cadeias de modelos autogerenciáveis com pontuação adaptativa + roteamento automático sem configuração

## Roteamento automático sem configuração (prefixo `auto/`)

> **NOVO:** Não é necessário criar um combo. Use o prefixo `auto/` diretamente em qualquer cliente.

### Exemplos rápidos

| ID do modelo   | Variante | Comportamento                                                                       |
| -------------- | -------- | ----------------------------------------------------------------------------------- |
| `auto`         | padrão   | Todos os provedores conectados, estratégia LKGP, pesos equilibrados                 |
| `auto/coding`  | coding   | Pesos que priorizam qualidade, adequados para geração de código                     |
| `auto/fast`    | fast     | Seleção ponderada de baixa latência                                                 |
| `auto/cheap`   | cheap    | Roteamento otimizado para custo (menor custo primeiro)                              |
| `auto/offline` | offline  | Favorece provedores com maior disponibilidade de cota                               |
| `auto/smart`   | smart    | Prioriza qualidade + maior taxa de exploração (10%) para descobrir modelos melhores |
| `auto/lkgp`    | lkgp     | LKGP explícito (igual ao `auto` padrão)                                             |
| `auto/chaos`   | chaos    | Pesos de injeção de falhas para testes de resiliência (engenharia do caos)          |

### Composição categoria × nível (`auto/<category>:<tier>`)

Os sufixos no estilo OpenRouter separam **o tipo de rota** (categoria) de **como otimizá-la** (nível), permitindo que você os componha livremente (#4235 Fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorias** (filtram o conjunto de candidatos por capacidade): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` mantêm modelos compatíveis com visão; `reasoning` mantém modelos de raciocínio/pensamento.
- **Níveis** (selecionam os pesos de pontuação/filtro do conjunto): `fast` (entrega rápida) · `cheap` (alias `floor`, economia de custos) · `reliable` (integridade do circuit breaker + estabilidade de latência) · `free` / `pro` (filtram o conjunto por nível de modelo via `classifyTier` — nível gratuito vs. premium).

| Exemplo                | Resolve para                                                         |
| ---------------------- | -------------------------------------------------------------------- |
| `auto/coding:fast`     | conjunto de coding, pesos de baixa latência                          |
| `auto/coding:cheap`    | conjunto de coding, otimizado para custo (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | apenas modelos de raciocínio/pensamento, nível premium               |
| `auto/vision`          | modelos compatíveis com visão (sem nível → pesos equilibrados)       |
| `auto/multimodal:free` | modelos compatíveis com multimodalidade, apenas nível gratuito       |

Qualquer `auto/<category>[:<tier>]` válido é resolvido sob demanda; um subconjunto selecionado é anunciado em `/v1/models` e no painel (`AUTO_SUFFIX_VARIANTS` em `open-sse/services/autoCombo/builtinCatalog.ts`). A filtragem é **fail-open** — se uma restrição não corresponder a nenhum modelo conectado, o conjunto completo será usado para que o roteamento nunca falhe. O mecanismo principal de pontuação (`combo.ts`) permanece inalterado; o filtro de categoria/nível é aplicado em `buildAutoCandidates`.

> **Inteligência de modelos em tempo real:** a adequação do roteamento automático é orientada pelas classificações em tempo real do **Arena ELO** + dados de nível do **models.dev** quando a flag `ARENA_ELO_SYNC_ENABLED` está habilitada (caso contrário, usa o mapa estático de adequação como fallback).

**Como usar:**

```bash
# Qualquer IDE ou ferramenta de CLI compatível com o formato OpenAI
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# Em seu código/configuração, defina o modelo como:
model: "auto"                 # padrão equilibrado
model: "auto/coding"          # melhor para tarefas de programação
model: "auto/fast"            # mais rápido disponível
model: "auto/cheap"           # mais barato por token
```

**O que acontece:**

1. O OmniRoute detecta o prefixo `auto/` em `src/sse/handlers/chat.ts`
2. Consulta todas as **conexões ativas de provedores** no banco de dados
3. Filtra aquelas com credenciais válidas (chave de API ou token OAuth)
4. Determina o modelo por conexão (`connection.defaultModel` ou o primeiro modelo do provedor)
5. Cria um **combo virtual** na memória (não armazenado no banco de dados)
6. Faz o roteamento usando o perfil de pesos da variante selecionada + estratégia LKGP

**Principais propriedades:**

- ✅ **Sempre ativo:** Nenhuma opção, criação de combo ou configuração necessária
- ✅ **Dinâmico:** Reflete automaticamente os provedores conectados atualmente
- ✅ **Afinidade de sessão:** O LKGP garante que o último provedor bem-sucedido seja priorizado
- ✅ **Compatível com várias contas:** Cada conexão de provedor se torna um candidato separado
- ✅ **Sem gravações no banco de dados:** O combo virtual existe apenas durante a solicitação, sem sobrecarga de persistência

### Controle de candidatos por chave (#7819, Nível 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = o sufixo após `auto/`, ou
o valor literal `auto` para o canal base) é um endpoint **somente leitura** que lista o
conjunto atual de candidatos de um canal `auto/*`, enriquecido com informações de
acessibilidade em tempo real e reutilizando as leituras de resiliência existentes
(nunca o `state` bruto do breaker):

- circuit breaker do provedor — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- cooldown da conexão — `rateLimitedUntil` / `testStatus` na linha resolvida de
  `provider_connections`
- bloqueio do modelo — `isModelLocked(provider, connectionId, model)`

Cada candidato também contém a flag `excluded` desta chave de API. As exclusões são
armazenadas por chave de API (tabela `auto_candidate_overrides`, migração `128`) — o
OmniRoute é de locatário único e não possui uma tabela `users`, portanto `apiKeyId`
é a identidade real por chamador mais próxima — e aplicadas no ponto de controle do
conjunto de candidatos em `open-sse/services/autoCombo/virtualFactory.ts` por meio
da função pura e testada por unidade `filterExcludedCandidates()`
(`open-sse/services/autoCombo/candidateOverrides.ts`). O filtro é **fail-open**:
um apiKeyId/canal não definido ou uma falha na consulta ao banco de dados deixam o
conjunto sem filtragem, portanto um operador sem substituições configuradas obtém um
roteamento idêntico, byte por byte, ao comportamento anterior a este recurso.

**Adiado para uma issue de acompanhamento:** pesos por candidato + ordenação explícita (Nível 3
— alimenta os fluxos existentes de estratégias ponderadas/por prioridade) e fixação de uma
estratégia específica de `combo.ts` por canal `auto/*` (Nível 4). Consulte o plano da #7819 para a questão
em aberto sobre se as substituições devem permanecer por chave de API ou se tornar globais, considerando o
modelo de locatário único.

**Nos bastidores:**

```txt
Requisição: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detecta o prefixo
   ↓
createVirtualAutoCombo('coding') → candidatePool das conexões ativas
   ↓
handleComboChat (mesmo mecanismo dos combos persistidos)
   ↓
A pontuação automática seleciona o melhor provedor/modelo por requisição
```

**Arquivos de implementação:**

| Arquivo                                                   | Finalidade                                            |
| --------------------------------------------------------- | ----------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analisador de prefixo (`parseAutoPrefix`)             |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Cria objetos virtuais `AutoComboConfig`               |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Gancho de teste para simular o registro de provedores |
| `src/sse/handlers/chat.ts`                                | Integração: desvio antecipado do prefixo automático   |
| `src/shared/constants/providers.ts`                       | Entrada de sistema `SYSTEM_PROVIDERS.auto`            |

## Nomes de combos que correspondem a um ID de modelo real

Um combo cujo `name` é idêntico a um ID de modelo simples (por exemplo, um combo chamado
`gpt-5.5`) é um **padrão intencional e compatível**, não um bug: esse é o
mecanismo para fallback de provedor por ID de modelo documentado em
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Como a resolução
de combos é verificada antes da resolução de IDs de modelo simples
(`getComboForModel()` em `src/sse/services/model.ts`), uma solicitação para o
ID simples `gpt-5.5` é encaminhada pelos destinos do combo (por exemplo,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) em vez de ir diretamente
para um único provedor — isso reutiliza a precedência de combo antes da
reescrita criada para
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) e é
testado contra regressões por `tests/unit/responses-combo-resolution-3227.test.ts` e
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

A criação ou renomeação de um combo para um nome que oculta um ID de modelo
real **nunca é rejeitada** — fazer isso interromperia esse fluxo de trabalho
documentado. Em vez disso (#8530), `POST /api/combos` e
`PUT /api/combos/[id]` anexam um campo `warning` não bloqueante à resposta
quando o nome (novo) entra em conflito com um ID de modelo real:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Na inicialização, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) também registra um aviso `[STARTUP]` de uma
linha enumerando todos os combos existentes que ocultam um ID de modelo,
para que os operadores que se depararem com isso acidentalmente (em vez de
intencionalmente, conforme o #6940) recebam um sinal. O auxiliar de detecção
fica em `src/lib/combos/modelNameCollision.ts`.

## Chamando um combo personalizado a partir de um cliente

Os combos persistidos (Configurações → Combos) são usados somente quando o cliente envia o **nome exato** do combo no campo `model` — não há correspondência aproximada ou parcial do nome do combo, nem qualquer prefixo `auto/` envolvido. Ordem de resolução (`getComboForModel()` em `src/sse/services/model.ts`):

1. correspondência exata do nome do combo (`model: "my-combo"`),
2. prefixo `combo/<name>` (`model: "combo/my-combo"`),
3. mapeamentos glob de modelo→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Duas armadilhas comuns:

- **`auto` não usa seus combos.** `auto`/`auto/*` cria seu próprio conjunto de candidatos sem configuração e só consulta combos persistidos se um combo tiver literalmente o nome `auto` (não recomendado). Para encaminhar por meio de um combo, envie o nome exato dele — não `auto`.
- **`openrouter/auto` é um produto pago real da OpenRouter** ("Auto Best Available"), não um alias do OmniRoute. Ele é a única entrada de modelo estático do registro da OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) e é cobrado separadamente. Use Configurações → Roteamento → Ocultar modelos pagos para excluí-lo dos conjuntos de `auto`.

Consulte [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) e [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) para ver a confusão original documentada aqui.

## Como Funciona (Combos Automáticos Persistidos)

O Mecanismo de Combo Automático seleciona dinamicamente o melhor provedor/modelo para cada solicitação usando uma **função de pontuação de 16 fatores** (definida em `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). A soma dos pesos padrão é `1.0`; pesos personalizados são renormalizados por `normalizeScoringWeights()`. Dois dos dezesseis — `cacheAffinity` e `resetWindowAffinity` — têm peso padrão `0`; `reliability` tem `0` em `DEFAULT_WEIGHTS`, mas `0.03` nos pacotes genéricos e `0.04` em `reliability-first`, enquanto `quality` tem `0.02` nos pacotes (`0.03` em `quality-first`): eles ainda são calculados para cada candidato, e `cacheAffinity` condiciona a desduplicação do cache de prompts fora da pontuação; portanto, os fatores com padrão zero simplesmente não influenciam por padrão, enquanto os pacotes influenciam.

![Pontuação de 16 fatores do Combo Automático](../diagrams/exported/auto-combo-scoring.svg)

> Fonte: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (gere novamente por meio de `npm run docs:render-diagrams`). O nome do arquivo é histórico; o código-fonte e o diagrama renderizado mostram todos os 16 fatores declarados em `DEFAULT_WEIGHTS`.

| Fator                 | Peso Padrão | Descrição                                                                                                                                                                                                                                 |
| :-------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429      | Margem restante de cota/limite de taxa [0..1]                                                                                                                                                                                             |
| `health`              | 0.1605      | Pontuação de integridade do disjuntor (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                               |
| `costInv`             | 0.1429      | Inverso do custo **combinado** (60% do preço dos tokens de entrada + 40% do preço dos tokens de saída, normalizado) — mais barato = pontuação mais alta                                                                                   |
| `latencyInv`          | 0.1143      | Latência p95 inversa normalizada em relação ao pool — mais rápido = pontuação mais alta                                                                                                                                                   |
| `taskFit`             | 0.0762      | Adequação ao tipo de tarefa (programação, revisão, planejamento, análise, depuração, documentação)                                                                                                                                        |
| `stability`           | 0.0476      | Estabilidade baseada na variância do desvio padrão da latência — um candidato cujo tempo de resposta oscila recebe uma pontuação menor                                                                                                    |
| `tierPriority`        | 0.0476      | Prioridade do nível da conta — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                               |
| `tierAffinity`        | 0.0476      | Afinidade entre o nível do candidato e o nível recomendado pelo manifesto                                                                                                                                                                 |
| `specificityMatch`    | 0.0476      | Correspondência entre a especificidade da solicitação (indicação do manifesto) e o nível do modelo                                                                                                                                        |
| `contextAffinity`     | 0.0476      | Afinidade entre a necessidade de janela de contexto da solicitação e a janela de contexto do modelo                                                                                                                                       |
| `sessionAvailability` | 0.0476      | Disponibilidade da sessão OAuth da conexão candidata para esta sessão (`getOAuthSessionAvailability()`; conexões que não usam OAuth recebem pontuação 1.0)                                                                                |
| `connectionDensity`   | 0.0476      | Distribui a carga entre conexões do mesmo provedor (anticconcentração)                                                                                                                                                                    |
| `cacheAffinity`       | 0.00        | Afinidade de hash de rendezvous com a conexão que provavelmente já contém o prefixo do cache de prompts desta solicitação (`open-sse/services/combo/promptCacheAffinity.ts`); desativada por padrão (#8008)                               |
| `resetWindowAffinity` | 0.00        | Tendência a favorecer conexões cuja janela de redefinição de cota seja favorável (desativada por padrão)                                                                                                                                  |
| `quality`             | 0.03        | Sinal de qualidade da saída orientado por feedback, proveniente do rastreador de qualidade de eventos de roteamento; candidatos sem observações recebem um valor neutro de 0.5                                                            |
| `reliability`         | 0.00        | Proporção de sucessos observada, `1 - failureRate`, com base em 24h de histórico de uso e um mínimo de dez amostras (caso contrário, métricas em tempo real); candidatos sem observações são considerados como 1.0. Desativada por padrão |

**Soma:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, conforme declarado em `DEFAULT_WEIGHTS`; pesos configurados pelo usuário são renormalizados em uma distribuição por `normalizeScoringWeights()` antes do cálculo da pontuação.

## Pacotes de Modo

6 perfis de peso predefinidos em `open-sse/services/autoCombo/modePacks.ts`. Cada pacote substitui integralmente os pesos padrão para direcionar a seleção a um objetivo. Cada pacote já totaliza `1.0` (`0.9999` quando exibido com quatro casas decimais), portanto `normalizeScoringWeights()` não tem nada significativo a corrigir quando um pacote está ativo — os valores abaixo são, considerando o arredondamento, os aplicados pelo avaliador.

| Fator                 | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Observações:

- **Os pacotes incluem `quality` e `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) e substituem integralmente o mapa de pesos (`weights = pack`, não uma mesclagem). `DEFAULT_WEIGHTS` inclui `quality 0.03 / reliability 0`; selecionar `balanced`/`default` mantém esses padrões, enquanto selecionar um pacote usa os valores acima. Em um pool sem dados prévios (ainda sem observações, portanto `quality 0.5` e `reliability 1`), esses dois fatores adicionam `+0.04` em um pacote genérico (`0.03 + 0.01`), `+0.045` em `quality-first` e `+0.05` em `reliability-first`.
- `tierAffinity`, `specificityMatch` e `resetWindowAffinity` são explicitamente `0` em todos os pacotes.
- Resumo da ênfase de cada pacote:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (conexões saudáveis e de baixa latência)
  - **cost-saver** → costInv 0.3324 (os tokens mais baratos vencem)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, o maior valor entre todos os pacotes (melhor modelo para a tarefa, com consistência)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (máxima margem disponível, independentemente da velocidade/do custo)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, o maior valor entre todos os pacotes (menos surpresas)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (perfil de injeção de falhas)

### Controles por Requisição (cabeçalhos) — #6023 / #6024 / #6025 / #3470

Um combo `auto` pode ser direcionado **por requisição** por meio de três cabeçalhos, sem alterar a
configuração armazenada do combo. Eles se aplicam somente à estratégia `auto` e somente à requisição
que os contém; os valores `modePack`/`budgetCap`/`budgetFallback` salvos do combo são usados
quando o cabeçalho está ausente.

| Cabeçalho                     | Aceita                                                                                                                                                                                                    | Efeito                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-OmniRoute-Mode`            | um alias de predefinição (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ou um nome de pacote bruto (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Substitui os pesos de pontuação para esta solicitação. `balanced`/`default` forçam os pesos padrão (sem pacote). Valores desconhecidos são ignorados (a configuração é preservada).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `X-OmniRoute-Budget`          | um número positivo (máximo em USD por solicitação)                                                                                                                                                        | Limite rígido de custo: candidatos cujo custo estimado o exceda são filtrados antes da seleção. O que acontece quando **todos** os candidatos o excedem é controlado por `X-OmniRoute-Budget-Fallback` abaixo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (padrão, aliases: `cheapest-viable`, `soft`) ou `strict` (aliases: `block`, `hard`)                                                                                                            | `cheapest`: recorre ao candidato globalmente mais barato, mesmo que ele ainda exceda o limite (comportamento legado). `strict`: recusa-se a selecionar — a solicitação falha imediatamente com `HTTP 402`, em vez de exceder silenciosamente o orçamento. Valores desconhecidos são ignorados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Effort`          | `auto` (outros valores reservados)                                                                                                                                                                        | Orçamento de raciocínio adaptativo: quando a solicitação **não** contém nenhum campo de raciocínio, independentemente do formato (`reasoning_effort`, `reasoning`, `thinking`), o gateway resolve `auto` como `low`/`medium`/`high` com base em sinais determinísticos da estrutura da solicitação (tamanho da última mensagem do usuário, tamanho do contexto até a última mensagem do usuário, resultados anteriores de ferramentas, profundidade do loop de ferramentas). Os sinais são limitados ao turno atual — tudo após a última mensagem do usuário é ignorado —, portanto, todas as solicitações em um loop de ferramentas são resolvidas para o mesmo nível (fixação sem estado por turno, sem estado de sessão e sem escalonamento no meio do loop que interromperia os prefixos do cache de prompts upstream). Um campo de raciocínio explícito do cliente sempre prevalece. Limitado a solicitações cujo despacho upstream seja resolvido para o formato OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` é um campo no formato da OpenAI, portanto, o cabeçalho não tem efeito em uma solicitação direcionada ao Claude ou Gemini (consulte `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Força o perfil mais rápido, limita esta solicitação a US$ 0,05 e bloqueia estritamente em vez de exceder o orçamento
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

A resolução é uma função pura (`open-sse/services/autoCombo/requestControls.ts`); os
valores resolvidos alimentam as entradas `config.modePack` / `config.budgetCap` /
`config.budgetFallback` existentes do mecanismo. O `config.budgetFallback` armazenado de um combo ("strict" |
"cheapest") define a política persistente; o cabeçalho a substitui para uma única solicitação.

## Todas as estratégias de roteamento

O mecanismo de combos do OmniRoute oferece suporte a **19 estratégias de roteamento** (declaradas em `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). O próprio mecanismo de Auto Combo é disponibilizado pela estratégia `auto`; as demais estão disponíveis para combos persistidos.

| Estratégia          | Descrição                                                                                                                                                                                                                  |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Lista ordenada pelo primeiro alvo, com prioridade explícita                                                                                                                                                                |
| `weighted`          | Seleção aleatória ponderada pelo peso de cada alvo                                                                                                                                                                         |
| `round-robin`       | Percorre os alvos em ordem                                                                                                                                                                                                 |
| `context-relay`     | Transfere o contexto entre os alvos (conversas longas)                                                                                                                                                                     |
| `fill-first`        | Preenche a cota de cada alvo antes de passar para o próximo                                                                                                                                                                |
| `p2c`               | Balanceamento de carga aleatório pelo método de escolha entre 2 opções                                                                                                                                                     |
| `random`            | Seleção aleatória uniforme                                                                                                                                                                                                 |
| `least-used`        | Escolhe o alvo com a menor carga atual                                                                                                                                                                                     |
| `cost-optimized`    | Minimiza o custo por solicitação com base nos preços do catálogo                                                                                                                                                           |
| `reset-aware` ⭐    | Prioriza pelo horário de redefinição da cota — janelas de redefinição curtas recebem prioridade maior                                                                                                                      |
| `reset-window`      | Dá preferência aos alvos cuja janela de cota será redefinida primeiro                                                                                                                                                      |
| `headroom`          | Escolhe o alvo com a maior margem de cota restante                                                                                                                                                                         |
| `strict-random`     | Seleção aleatória sem eliminação de repetições                                                                                                                                                                             |
| `auto`              | Usa a pontuação do Auto Combo (16 fatores) — **recomendado**                                                                                                                                                               |
| `lkgp`              | Caminho da última execução bem-sucedida (fixa no último provedor bem-sucedido e, depois, recorre às regras)                                                                                                                |
| `context-optimized` | Escolhe o alvo com a melhor adequação ao tamanho atual do contexto                                                                                                                                                         |
| `cache-optimized`   | Reordena os alvos pela afinidade com o cache de prompts — a conexão com maior probabilidade de já conter o prefixo em cache dessa solicitação é tentada primeiro (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Envia a solicitação em paralelo para um painel de modelos e, depois, sintetiza uma única resposta por meio de um juiz (veja abaixo)                                                                                        |
| `pipeline`          | Executa os alvos sequencialmente, passando a saída de cada etapa para a entrada da próxima; somente a resposta final é retornada (#6396)                                                                                   |

⭐ = Novo na v3.8.0 · 🧬 = Novo na v3.8.36

### Semântica de `weighted`

`weighted` é um **sorteio aleatório proporcional por solicitação**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), e não um equalizador:

- Cada solicitação sorteia **uma** etapa com probabilidade `weight / totalWeight`; as etapas restantes
  são ordenadas por peso decrescente como a cadeia de fallback dessa solicitação.
- Uma etapa cujo peso é `0` (ou está ausente) **nunca é sorteada** enquanto qualquer outra etapa tiver
  peso > 0 — ela só pode atuar como fallback após a falha da etapa sorteada. Somente quando **todos**
  os pesos são 0 a seleção se torna uniforme.
- As etapas cujos alvos estão todos indisponíveis — circuit breaker do provedor em estado `OPEN`, cooldown
  da conexão, bloqueio do modelo — são removidas do sorteio antes que ele ocorra
  (`open-sse/services/combo/targetResolution.ts`), portanto, uma única etapa íntegra pode temporariamente
  vencer todas as solicitações.
- `stickyWeightedLimit` (configuração do combo, padrão `1` = desativado) fixa a etapa sorteada durante essa quantidade
  de sucessos consecutivos antes de realizar um novo sorteio.

Para uma rotação estrita, use `round-robin`; pesos iguais em `weighted` resultam em um equilíbrio estatístico — não
estrito.

## Estratégia Fusion

`fusion` é a única estratégia que **não** escolhe um único destino. Ela distribui o prompt
para **todos os modelos do painel em paralelo** e, em seguida, um **modelo julgador** configurável sintetiza
uma única resposta final a partir de todas as respostas do painel. Adaptada do projeto upstream `decolua/9router`
(design Fusion da OpenRouter); implementação em `open-sse/services/fusion.ts`.

Como funciona:

0. **Desvio para requisições com ferramentas** — uma requisição que contém um array `tools` não vazio com
   `tool_choice` não definido explicitamente como `"none"` ignora completamente o painel: ela é encaminhada diretamente para
   um único modelo (o julgador configurado ou `panel[0]`), com `tools`/`tool_choice`
   repassados sem modificações. Os membros do painel não têm acesso a ferramentas, e a
   diretiva de síntese do julgador desencoraja a emissão de chamadas de ferramentas, portanto clientes
   agênticos/que fazem chamadas de ferramentas recebem uma decisão real de chamada de ferramenta em vez de texto sintetizado (#6771).
1. **Distribuição** (somente para requisições sem ferramentas) — o prompt é enviado simultaneamente para todos os modelos
   do painel, com o modo sem streaming forçado e as ferramentas removidas (o julgador precisa de
   textos completos para realizar a síntese).
2. **Coleta com quórum e período de tolerância** — assim que `minPanel` respostas chegam, um breve temporizador
   de tolerância é iniciado para os retardatários; depois disso, a fusão prossegue com tudo o que foi coletado.
   Isso limita o impacto do modelo mais lento no tempo total, com um limite máximo rígido.
3. **Síntese pelo julgador** — as respostas do painel são anonimizadas (`Source 1`, `Source 2`, … — para que
   o julgador avalie o conteúdo, não a marca do modelo) e entregues ao julgador, que analisa
   consenso / contradições / cobertura parcial / insights exclusivos / pontos cegos e, então,
   produz **uma** resposta autoritativa. A chamada ao julgador mantém o valor original de
   `stream` + as ferramentas do cliente, portanto o streaming e o uso posterior de ferramentas continuam funcionando.
4. **Degradação graciosa** — 0 respostas do painel → `503`; exatamente 1 sobrevivente → essa resposta
   é retornada diretamente (não há nada para combinar); um painel com um único modelo responde diretamente.

Um membro do painel também pode ser uma etapa `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) que referencia
outro combo — ela é resolvida como **uma única voz de painel em caixa-preta** (um despacho recursivo completo para o
combo referenciado, não uma distribuição para os próprios destinos desse combo), com a mesma proteção contra profundidade/ciclos
que todas as outras estratégias que consomem combo-ref já utilizam (#6764).

### Configuração

Configurada no blob `config` do combo (sem migração de esquema — reutiliza a tabela
`combos` existente):

| Campo                                    | Tipo     | Padrão                    | Finalidade                                                                                                      |
| :--------------------------------------- | :------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | primeiro modelo do painel | Modelo que sintetiza a resposta final                                                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`                       | Respostas bem-sucedidas necessárias antes do início do temporizador de tolerância (limitado a `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                    | Tempo de espera pelos retardatários após o quórum ser atingido                                                  |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                   | Limite absoluto para que um único modelo travado não bloqueie a requisição                                      |

Os valores padrão ficam em `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Exemplo

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Depois, chame-o como qualquer outro combo: `{"model":"fusion-panel","messages":[...]}`.

## Fábrica Virtual de Auto-Combos

O mecanismo de Auto-Combo não exige combos predefinidos. Em vez disso, `open-sse/services/autoCombo/virtualFactory.ts` cria candidatos dinamicamente:

1. Obtém `getProviderConnections({ isActive: true })` (todas as conexões habilitadas)
2. Filtra aquelas com credenciais válidas (chave de API ou token OAuth não expirado por meio de `hasUsableOAuthToken()`)
3. Cruza os dados com `getProviderRegistry()` para obter disponibilidade de modelos + preços
4. Para cada tupla `(provider, model, connection)`, cria um `VirtualAutoComboCandidate`
5. Seleciona `connection.defaultModel` (ou o primeiro modelo do registro) como destino de despacho
6. Pontua cada candidato usando o `scorePool()` de 16 fatores e o pacote de pesos da variante
7. Retorna o `AutoComboConfig` resultante em memória para `handleComboChat()` — nunca persistido no banco de dados

Isso significa que **adicionar um novo provedor com `auto/*` habilitado expande automaticamente o conjunto de candidatos** — nenhuma edição manual de combos é necessária. O combo virtual é recriado a cada solicitação, portanto, conexões recém-adicionadas ou que voltaram a ficar saudáveis são consideradas imediatamente.

## Autorrecuperação

- **Exclusão temporária**: Pontuação < 0.2 → excluído por 5 min (recuo progressivo, máximo de 30 min)
- **Reconhecimento do circuit breaker**: OPEN → excluído automaticamente; HALF_OPEN → solicitações de sondagem
- **Modo de incidente**: >50% OPEN → desabilita a exploração, maximiza a estabilidade
- **Recuperação após cooldown**: Depois da exclusão, a primeira solicitação é uma "sondagem" com timeout reduzido

## Exploração por Bandit

5% das solicitações (configurável) são encaminhadas para provedores aleatórios para exploração. Desabilitada no modo de incidente.

## API

**Não existe um endpoint dedicado `POST /api/combos/auto`** — o Auto-Combo é utilizado de duas maneiras:

1. **Configuração zero (recomendado):** Envie qualquer solicitação de conclusão de chat com `model: "auto"` ou `model: "auto/<variant>"`. A fábrica virtual cria o combo a cada solicitação — sem persistência e sem necessidade de chamadas de API.

2. **Combo persistido com `strategy: "auto"`:** Crie um combo comum por meio de `POST /api/combos` e defina `strategy: "auto"`, além de `config.auto.weights` / `config.auto.candidatePool`. O mesmo mecanismo de pontuação é usado; o combo é armazenado em `combos` e pode ser reutilizado por ID.

Para descoberta, `GET /api/combos/auto` lista cada variante com seu conjunto de candidatos resolvido, além de `context_length` / `max_output_tokens` — o valor MÁXIMO entre as janelas do conjunto de candidatos. Os clientes (por exemplo, o plugin opencode) devem anunciar esses valores em vez de `0`: um contexto zero desabilita completamente a compactação automática do opencode, permitindo que as sessões cresçam até que a limpeza de histórico do gateway destrua o contexto. É seguro anunciar o valor MÁXIMO porque o pré-filtro de contexto do auto-combo encaminha solicitações grandes demais para candidatos com janelas amplas.

```bash
# Uso com configuração zero (sem criação de combo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combo automático persistido por meio do endpoint comum de combos
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Estratégias do roteador automático

Combos persistidos com `strategy: "auto"` podem definir `config.routerStrategy` (ou o legado
`config.auto.routerStrategy`) como uma das seguintes opções:

- `rules` — pontuação ponderada padrão
- `score` — seleciona a maior pontuação ponderada configurada. Empates exatos preservam a ordem
  configurada dos candidatos; o `explorationRate` existente realiza amostragens do conjunto classificado completo.
- `cost` / `eco` — provedor saudável mais barato
- `latency` / `fast` — menor latência p95 com penalidade de confiabilidade
- `sla-aware` / `sla` — dá preferência a candidatos que atendam aos SLOs de latência p95, taxa de erros e, opcionalmente,
  custo
- `lkgp` — prioriza o último provedor que se sabe estar funcionando corretamente

### Estratégias do roteador em detalhes

O mecanismo de auto-combo expõe 6 implementações conectáveis de **RouterStrategy** que
podem ser alternadas por meio de `config.routerStrategy` (ou do legado `config.auto.routerStrategy`).
Cada estratégia seleciona um provedor do conjunto de candidatos, dado um `RoutingContext`
(tipo de tarefa, indicações de ferramentas/visão, estimativa de tokens, política de SLA opcional, provedor
opcional que se sabe ter funcionado corretamente por último).

#### 1. `rules` (padrão) — pontuação ponderada de 16 fatores

Encapsula o mecanismo de pontuação existente. Filtra candidatos com circuit breaker
`OPEN` e, em seguida, executa `scorePool()` com o tipo de tarefa atual e `getTaskFitness()`,
selecionando o provedor com a maior pontuação.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Quando usar**: Padrão. Use quando quiser um equilíbrio entre todos os sinais.

**Alias**: `rules` (sem alias)

---

#### 2. `cost` / `eco` — provedor saudável mais barato

Ordena o conjunto de candidatos por `costPer1MTokens` (em ordem crescente) e seleciona o mais barato.
Primeiro, filtra os candidatos com estado `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quando usar**: Cargas de trabalho sensíveis a custos, processamento em lote ou tarefas em segundo plano.

**Aliases**: `cost`, `eco`

---

#### 3. `latency` / `fast` — menor latência p95 com penalidade de confiabilidade

Ordena por `p95LatencyMs + (errorRate * 1000)`. A penalidade da taxa de erros garante que
provedores não confiáveis tenham uma classificação inferior, mesmo que sua latência nominal seja baixa.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Quando usar**: Cargas de trabalho sensíveis à latência, como chat em tempo real, preenchimento automático ou
assistentes de programação interativos.

**Aliases**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — conformidade com SLOs de latência/erro/custo

Atribui uma pontuação a cada candidato de acordo com o quanto ele atende à política de SLO configurada:

| Fator                     | Peso | Fórmula                                            |
| ------------------------- | ---- | -------------------------------------------------- |
| Pontuação de latência     | 35%  | `threshold / max(value, ε)`                        |
| Pontuação de erro         | 35%  | `threshold / max(value, ε)`                        |
| Pontuação de integridade  | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)  |
| Pontuação de custo        | 10%  | `threshold / max(value, ε)` ou inversa normalizada |
| Pontuação de estabilidade | 5%   | desvio padrão de latência normalizado inversamente |

Quando `hardConstraints: true`, os candidatos são ordenados principalmente pela **pontuação de violação**
(o quanto excedem qualquer SLO) e, depois, pela pontuação composta. Caso contrário, usa-se apenas
a pontuação composta.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... pontua cada candidato em relação à política: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Campos de SLA** (definidos na configuração combinada):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Quando usar**: Cargas de trabalho de produção com orçamentos rígidos de latência, taxa de erros ou custo.

**Aliases**: `sla-aware`, `sla`

---

#### 5. `lkgp` — último provedor em bom estado conhecido primeiro

Tenta primeiro o **último provedor em bom estado conhecido** (se estiver definido) e, depois, recorre à
estratégia `rules`. Útil para afinidade de sessão — o mesmo provedor processa
as solicitações subsequentes de uma conversa.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Recorre à estratégia rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Quando usar**: Conversas com vários turnos nas quais você deseja que o mesmo provedor processe
as solicitações subsequentes (por exemplo, para cache, continuidade de contexto ou consistência de preços).

**Alias**: `lkgp` (sem alias)

---

### Estratégias personalizadas de roteamento

Você pode registrar sua própria implementação de `RouterStrategy` por meio da API pública:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Sua lógica de roteamento aqui
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Em seguida, use-a:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guia de seleção de estratégias de roteamento

| Caso de uso                   | Estratégia  | Motivo                                   |
| ----------------------------- | ----------- | ---------------------------------------- |
| Carga de trabalho equilibrada | `rules`     | Padrão — considera todos os fatores      |
| Minimizar custo               | `cost`      | Sempre escolhe o mais barato             |
| Minimizar latência            | `latency`   | Escolhe o provedor confiável mais rápido |
| SLOs rígidos                  | `sla-aware` | Filtra por limites de p95/erro/custo     |
| Chat com vários turnos        | `lkgp`      | Afinidade de sessão                      |

Campos para SLA-aware:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Adequação a tarefas

Mais de 30 modelos avaliados em 6 tipos de tarefa (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Oferece suporte a padrões curinga (por exemplo, `*-coder` → pontuação alta em programação).

## Recapitulação das variantes Auto

Incluindo o `auto` simples (padrão), além dos 6 valores de `AutoVariant` declarados em `autoPrefix.ts`, existem **7 IDs de modelo que podem ser invocados**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(O próprio `AutoVariant` enumera 6 valores; a 7ª opção é "sem variante" — o `auto` simples — tratada por `parseAutoPrefix()` como `variant: undefined`.)

## Como os níveis se encaixam no Auto-Combo

A função de pontuação de 16 fatores (`open-sse/services/autoCombo/scoring.ts`) trata a associação
a níveis como dois sinais: `tierPriority` (0.0476) e `tierAffinity` (0.0476). Consulte a
[tabela canônica de fatores de pontuação](#how-it-works-persisted-auto-combos) acima para ver o conjunto
completo de `DEFAULT_WEIGHTS` — as substituições por pacote (ship-fast/cost-saver/quality-first/
offline-friendly) estão listadas na tabela "Perfis de peso por pacote".

O nível, por si só, **não** força o Nível 1 a vir primeiro — se a latência do Nível 1 for ruim ou
a relação custo-qualidade não for ideal, o Nível 2 vence. Para forçar a ordenação por nível, use a
estratégia de combinação `priority` e organize os provedores por nível.

Para favorecer fortemente o Nível 1 (assinatura), aumente o peso de `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consulte `docs/marketing/TIERS.md` para ver as definições dos níveis e a classificação dos provedores.

## Testes e cobertura

### Matriz determinística de decisões de roteamento (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` comprova a **decisão** de roteamento de todas as 19
estratégias públicas de ponta a ponta, passando pelo pipeline real de combinação com um upstream simulado.
A cobertura inclui:

- Todas as 19 estratégias de `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (interna) de ponta a ponta: equidade DRR + redução de prioridade por saturação por meio do
  ponto de integração real `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Cobertura de transferência universal de `context-relay` para todas as quantidades de destinos.

Esse conjunto é executado na CI (job `test:integration`) com `--test-concurrency=1` e
`--test-force-exit`, portanto é determinístico e não exige credenciais reais.

### Smoke test real controlado (NÃO executado na CI — provedores reais)

| Comando                                | O que faz                                                                                                       |
| :------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Roteamento real no processo com `RUN_COMBO_LIVE=1`; captura um snapshot de um banco de dados ativo do OmniRoute |
| `npm run test:combo:live:vps`          | Chamadas HTTP para um servidor OmniRoute ativo (defina `COMBO_LIVE_BASE_URL`)                                   |
| `npm run test:combo:live:vps:failover` | O mesmo, com cenários deliberados de failover                                                                   |

Esses smoke tests exercitam o caminho real da comunicação (combinação → provedor → conclusão). Eles são
intencionalmente excluídos da CI porque exigem credenciais reais e acesso a VPS.

---

## Arquivos

| Arquivo                                                   | Finalidade                                                                                                |
| :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Função de pontuação com 16 fatores, `DEFAULT_WEIGHTS`, norma do pool                                      |
| `open-sse/services/autoCombo/taskFitness.ts`              | Consulta de adequação entre modelo × tarefa                                                               |
| `open-sse/services/autoCombo/engine.ts`                   | Lógica de seleção, bandit, limite de orçamento                                                            |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exclusão, sondagens, modo de incidente                                                                    |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 perfis de pesos (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analisador do prefixo `auto/` + 6 variantes                                                               |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Cria uma `AutoComboConfig` em memória a partir de conexões ativas                                         |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Gancho de teste para simular o registro de provedores                                                     |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 estratégias)                                                                |
| `src/sse/handlers/chat.ts`                                | Integração: curto-circuito do prefixo auto                                                                |
