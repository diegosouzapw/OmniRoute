# OmniRoute Auto-Combo Engine (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Para Utilizadores**: Procura uma forma de começar rapidamente? Consulte o [Guia do Utilizador do Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) para obter explicações e exemplos simples.

> Cadeias de modelos autogeridas com pontuação adaptativa + encaminhamento automático sem configuração

## Encaminhamento automático sem configuração (prefixo `auto/`)

> **NOVO:** Não é necessário criar um combo. Utilize o prefixo `auto/` diretamente em qualquer cliente.

### Exemplos rápidos

| ID do modelo   | Variante | Comportamento                                                                  |
| -------------- | -------- | ------------------------------------------------------------------------------ |
| `auto`         | default  | Todos os fornecedores ligados, estratégia LKGP, pesos equilibrados             |
| `auto/coding`  | coding   | Pesos que privilegiam a qualidade, adequados à geração de código               |
| `auto/fast`    | fast     | Seleção ponderada de baixa latência                                            |
| `auto/cheap`   | cheap    | Encaminhamento otimizado para custos (primeiro, o custo mais baixo)            |
| `auto/offline` | offline  | Favorece fornecedores com maior disponibilidade de quota                       |
| `auto/smart`   | smart    | Prioridade à qualidade + maior taxa de exploração (10%) para descobrir modelos |
| `auto/lkgp`    | lkgp     | LKGP explícito (igual ao `auto` predefinido)                                   |
| `auto/chaos`   | chaos    | Pesos de injeção de falhas para testes de resiliência (engenharia do caos)     |

### Composição de categoria × nível (`auto/<category>:<tier>`)

Os sufixos ao estilo do OpenRouter separam **o tipo de rota** (categoria) de **como a otimizar** (nível), permitindo combiná-los livremente (#4235 Fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorias** (filtram o conjunto de candidatos por capacidade): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` mantêm os modelos com capacidades de visão; `reasoning` mantém os modelos de raciocínio/reflexão.
- **Níveis** (selecionam os pesos da pontuação/o filtro do conjunto): `fast` (entrega rápida) · `cheap` (alias `floor`, poupança de custos) · `reliable` (estado do disjuntor + estabilidade da latência) · `free` / `pro` (filtram o conjunto por nível do modelo através de `classifyTier` — nível gratuito vs. premium).

| Exemplo                | Resolve para                                                               |
| ---------------------- | -------------------------------------------------------------------------- |
| `auto/coding:fast`     | conjunto de programação, pesos de baixa latência                           |
| `auto/coding:cheap`    | conjunto de programação, otimizado para custos (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | apenas modelos de raciocínio/reflexão, nível premium                       |
| `auto/vision`          | modelos com capacidades de visão (sem nível → pesos equilibrados)          |
| `auto/multimodal:free` | modelos com capacidades multimodais, apenas do nível gratuito              |

Qualquer `auto/<category>[:<tier>]` válido é resolvido a pedido; um subconjunto selecionado é apresentado em `/v1/models` e no painel (`AUTO_SUFFIX_VARIANTS` em `open-sse/services/autoCombo/builtinCatalog.ts`). A filtragem é **fail-open** — se uma restrição não corresponder a nenhum modelo ligado, é utilizado o conjunto completo, para que o encaminhamento nunca falhe. O sistema de pontuação principal (`combo.ts`) permanece inalterado; o filtro de categoria/nível é aplicado em `buildAutoCandidates`.

> **Informação dinâmica sobre modelos:** a adequação do encaminhamento automático é informada pelas classificações **Arena ELO** em tempo real + pelos dados de nível de **models.dev** quando o sinalizador `ARENA_ELO_SYNC_ENABLED` está ativo (caso contrário, recorre ao mapa de adequação estático).

**Como utilizar:**

```bash
# Qualquer IDE ou ferramenta CLI que suporte o formato OpenAI
URL base: http://localhost:20128/v1
Chave da API:  <your-endpoint-key>

# No seu código/configuração, defina o modelo como:
model: "auto"                 # predefinição equilibrada
model: "auto/coding"          # melhor para tarefas de programação
model: "auto/fast"            # opção disponível mais rápida
model: "auto/cheap"           # menor custo por token
```

**O que acontece:**

1. O OmniRoute deteta o prefixo `auto/` em `src/sse/handlers/chat.ts`
2. Consulta todas as **ligações ativas a fornecedores** na base de dados
3. Filtra as que têm credenciais válidas (chave de API ou token OAuth)
4. Determina o modelo por ligação (`connection.defaultModel` ou o primeiro modelo do fornecedor)
5. Cria um **combo virtual** em memória (não armazenado na BD)
6. Efetua o encaminhamento utilizando o perfil de pesos da variante selecionada + a estratégia LKGP

**Propriedades principais:**

- ✅ **Sempre ativo:** Não é necessário qualquer seletor, criação de combo ou configuração
- ✅ **Dinâmico:** Reflete automaticamente os fornecedores atualmente ligados
- ✅ **Persistência da sessão:** O LKGP garante que é dada prioridade ao último fornecedor bem-sucedido
- ✅ **Compatível com várias contas:** Cada ligação a um fornecedor torna-se um candidato separado
- ✅ **Sem escritas na BD:** O combo virtual existe apenas durante o pedido, sem qualquer sobrecarga de persistência

### Controlo de candidatos por chave (#7819, Nível 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = o sufixo após `auto/`, ou
o literal `auto` para o canal base) é um endpoint **só de leitura** que lista o
conjunto atual de candidatos de um canal `auto/*`, complementado com a acessibilidade
em tempo real, reutilizando as leituras de resiliência existentes (nunca o `state`
bruto do disjuntor):

- disjuntor do fornecedor — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- período de espera da ligação — `rateLimitedUntil` / `testStatus` na linha
  `provider_connections` resolvida
- bloqueio do modelo — `isModelLocked(provider, connectionId, model)`

Cada candidato também inclui o sinalizador `excluded` desta chave de API. As exclusões
são armazenadas por chave de API (tabela `auto_candidate_overrides`, migração `128`) —
o OmniRoute destina-se a um único inquilino e não possui uma tabela `users`, pelo que
`apiKeyId` é a identidade real por autor da chamada mais próxima — e são aplicadas no
ponto de estrangulamento do conjunto de candidatos em
`open-sse/services/autoCombo/virtualFactory.ts` através da função pura e testada por
testes unitários `filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
O filtro é **fail-open**: um apiKeyId/canal não definido ou uma falha na consulta à BD
deixam o conjunto sem filtragem, pelo que um operador sem substituições configuradas
vê um encaminhamento idêntico, byte a byte, ao existente antes desta funcionalidade.

**Adiado para uma issue de acompanhamento:** pesos por candidato + ordenação explícita (Nível 3
— integra-se nos caminhos existentes das estratégias ponderada/de prioridade) e associação de uma estratégia
`combo.ts` específica a cada canal `auto/*` (Nível 4). Consulte o plano da #7819 relativamente à questão em aberto
sobre se as substituições devem permanecer por chave de API ou tornar-se globais, dado o
modelo de inquilino único.

**Nos bastidores:**

```txt
Pedido: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts deteta o prefixo
   ↓
createVirtualAutoCombo('coding') → candidatePool a partir das ligações ativas
   ↓
handleComboChat (o mesmo motor utilizado pelas combinações persistidas)
   ↓
A pontuação automática seleciona o melhor fornecedor/modelo para cada pedido
```

**Ficheiros de implementação:**

| Ficheiro                                                  | Finalidade                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analisador de prefixos (`parseAutoPrefix`)                         |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Cria objetos `AutoComboConfig` virtuais                            |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Ponto de extensão para testes que simula o registo de fornecedores |
| `src/sse/handlers/chat.ts`                                | Integração: atalho para o prefixo automático                       |
| `src/shared/constants/providers.ts`                       | Entrada de sistema `SYSTEM_PROVIDERS.auto`                         |

## Nomes de combos que correspondem a um ID de modelo real

Um combo cujo `name` é idêntico a um ID de modelo simples (por exemplo, um combo chamado
`gpt-5.5`) é um **padrão intencional e suportado**, não um erro: é o
mecanismo para a contingência entre fornecedores por ID de modelo documentado em
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Como a resolução de
combos é verificada antes da resolução de IDs de modelo simples
(`getComboForModel()` em `src/sse/services/model.ts`), um pedido para o ID simples
`gpt-5.5` é encaminhado através dos destinos do combo (por exemplo,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`), em vez de ser enviado diretamente
para um único fornecedor — isto reutiliza a precedência de combo antes da reescrita criada para
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) e é
abrangido por testes de regressão em `tests/unit/responses-combo-resolution-3227.test.ts` e
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

A criação ou alteração do nome de um combo para um nome que oculta um ID de modelo real
**nunca é rejeitada** — fazê-lo interromperia este fluxo de trabalho documentado. Em vez
disso (#8530), `POST /api/combos` e `PUT /api/combos/[id]` adicionam um campo
`warning` não bloqueante à resposta quando o nome (novo) colide com um ID de
modelo real:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

No arranque, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) também regista um aviso `[STARTUP]` numa única linha,
enumerando todos os combos existentes que ocultam um ID de modelo, para que os operadores que
se deparem com esta situação por acidente (em vez de intencionalmente, conforme o #6940) recebam um alerta.
A função auxiliar de deteção encontra-se em `src/lib/combos/modelNameCollision.ts`.

## Chamar um combo personalizado a partir de um cliente

Os combos persistentes (Definições → Combos) só são utilizados quando o cliente envia o **nome exato** do combo no campo `model` — não existe correspondência aproximada ou parcial do nome do combo, nem está envolvido qualquer prefixo `auto/`. Ordem de resolução (`getComboForModel()` em `src/sse/services/model.ts`):

1. correspondência exata do nome do combo (`model: "my-combo"`),
2. prefixo `combo/<name>` (`model: "combo/my-combo"`),
3. mapeamentos modelo→combo com padrões glob (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dois problemas comuns:

- **`auto` não utiliza os seus combos.** `auto`/`auto/*` cria o seu próprio conjunto de candidatos sem necessidade de configuração e só consulta os combos persistentes se existir um combo chamado literalmente `auto` (não recomendado). Para encaminhar através de um combo, envie o respetivo nome exato — não `auto`.
- **`openrouter/auto` é um produto pago real da OpenRouter** ("Auto Best Available"), não um alias do OmniRoute. É a única entrada de modelo estática do registo da OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) e é faturado separadamente. Utilize Definições → Encaminhamento → Ocultar modelos pagos para o excluir dos conjuntos de `auto`.

Consulte [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) e [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) para conhecer a confusão original aqui documentada.

## Como Funciona (Auto-Combos Persistentes)

O Motor de Auto-Combo seleciona dinamicamente o melhor fornecedor/modelo para cada pedido, utilizando uma **função de pontuação com 16 fatores** (definida em `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). A soma dos pesos predefinidos é `1.0`; os pesos personalizados são renormalizados por `normalizeScoringWeights()`. Dois dos dezasseis — `cacheAffinity` e `resetWindowAffinity` — têm um peso predefinido de `0`; `reliability` tem `0` em `DEFAULT_WEIGHTS`, mas `0.03` nos pacotes genéricos e `0.04` em `reliability-first`, e `quality` tem `0.02` nos pacotes (`0.03` em `quality-first`): estes fatores continuam a ser calculados para cada candidato, e `cacheAffinity` controla a desduplicação da cache de prompts fora da pontuação, pelo que os fatores com valor predefinido igual a zero simplesmente não têm influência por predefinição, enquanto os pacotes têm.

![Pontuação de 16 fatores do Auto-Combo](../diagrams/exported/auto-combo-scoring.svg)

> Fonte: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regenere através de `npm run docs:render-diagrams`). O nome do ficheiro é histórico; o código-fonte e o diagrama renderizado mostram todos os 16 fatores declarados em `DEFAULT_WEIGHTS`.

| Fator                 | Peso Predefinido | Descrição                                                                                                                                                                                                                                                                           |
| :-------------------- | :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429           | Quota restante / margem do limite de pedidos [0..1]                                                                                                                                                                                                                                 |
| `health`              | 0.1605           | Pontuação de estado do disjuntor (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                                              |
| `costInv`             | 0.1429           | Custo **combinado** inverso (60% do preço dos tokens de entrada + 40% do preço dos tokens de saída, normalizado) — mais barato = pontuação mais elevada                                                                                                                             |
| `latencyInv`          | 0.1143           | Latência p95 inversa normalizada relativamente ao conjunto — mais rápido = pontuação mais elevada                                                                                                                                                                                   |
| `taskFit`             | 0.0762           | Adequação ao tipo de tarefa (programação, revisão, planeamento, análise, depuração, documentação)                                                                                                                                                                                   |
| `stability`           | 0.0476           | Estabilidade baseada na variância do desvio-padrão da latência — um candidato cujo tempo de resposta oscila obtém uma pontuação mais baixa                                                                                                                                          |
| `tierPriority`        | 0.0476           | Prioridade do nível da conta — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                                                         |
| `tierAffinity`        | 0.0476           | Afinidade entre o nível do candidato e o nível recomendado pelo manifesto                                                                                                                                                                                                           |
| `specificityMatch`    | 0.0476           | Correspondência entre a especificidade do pedido (indicação do manifesto) e o nível do modelo                                                                                                                                                                                       |
| `contextAffinity`     | 0.0476           | Afinidade entre a necessidade de janela de contexto do pedido e a janela de contexto do modelo                                                                                                                                                                                      |
| `sessionAvailability` | 0.0476           | Disponibilidade da sessão OAuth da ligação candidata para esta sessão (`getOAuthSessionAvailability()`; as ligações que não utilizam OAuth obtêm uma pontuação de 1.0)                                                                                                              |
| `connectionDensity`   | 0.0476           | Distribui a carga entre ligações do mesmo fornecedor (anticontenção)                                                                                                                                                                                                                |
| `cacheAffinity`       | 0.00             | Afinidade de hash rendezvous com a ligação que tem maior probabilidade de já conter o prefixo da cache de prompts deste pedido (`open-sse/services/combo/promptCacheAffinity.ts`); desativada por predefinição (#8008)                                                              |
| `resetWindowAffinity` | 0.00             | Favorece ligações cuja janela de reposição da quota seja favorável (desativada por predefinição)                                                                                                                                                                                    |
| `quality`             | 0.03             | Sinal de qualidade do resultado, orientado por feedback, proveniente do monitor de qualidade de eventos de encaminhamento; os candidatos sem observações recebem um valor neutro de 0.5                                                                                             |
| `reliability`         | 0.00             | Proporção de sucessos observada, `1 - failureRate`, com base em 24 horas de histórico de utilização e um mínimo de dez amostras (caso contrário, são utilizadas métricas em tempo real); os candidatos sem observações são considerados como tendo 1.0. Desativada por predefinição |

**Soma:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, conforme declarado em `DEFAULT_WEIGHTS`; os pesos configurados pelo utilizador são renormalizados numa distribuição por `normalizeScoringWeights()` antes do cálculo da pontuação.

## Pacotes de Modos

6 perfis de pesos predefinidos em `open-sse/services/autoCombo/modePacks.ts`. Cada pacote substitui integralmente os pesos predefinidos para orientar a seleção para um objetivo. A soma de cada pacote já é `1.0` (`0.9999` quando apresentada com quatro casas decimais), pelo que `normalizeScoringWeights()` não tem nada de significativo a corrigir quando um pacote está ativo — os valores abaixo são, salvo arredondamentos, os aplicados pelo sistema de pontuação.

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

Notas:

- **Os pacotes incluem `quality` e `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) e substituem integralmente o mapa de pesos (`weights = pack`, não se trata de uma intercalação). `DEFAULT_WEIGHTS` inclui `quality 0.03 / reliability 0`; selecionar `balanced`/`default` mantém estes valores predefinidos, enquanto selecionar um pacote utiliza os respetivos valores acima. Num conjunto sem dados iniciais (ainda sem observações, pelo que `quality 0.5` e `reliability 1`), estes dois fatores adicionam `+0.04` num pacote genérico (`0.03 + 0.01`), `+0.045` em `quality-first` e `+0.05` em `reliability-first`.
- `tierAffinity`, `specificityMatch` e `resetWindowAffinity` são explicitamente `0` em todos os pacotes.
- Resumo da ênfase de cada pacote:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (ligações saudáveis e de baixa latência)
  - **cost-saver** → costInv 0.3324 (os tokens mais baratos ganham)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, o valor mais elevado de todos os pacotes (melhor modelo para a tarefa, consistente)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (margem máxima, independentemente da velocidade/do custo)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, o valor mais elevado de todos os pacotes (menos surpresas)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (perfil de injeção de falhas)

### Controlos por Pedido (cabeçalhos) — #6023 / #6024 / #6025 / #3470

Uma combinação `auto` pode ser orientada **por pedido** através de três cabeçalhos, sem alterar a
configuração armazenada da combinação. Estes aplicam-se apenas à estratégia `auto` e apenas ao pedido
que os inclui; os valores `modePack`/`budgetCap`/`budgetFallback` guardados da combinação são utilizados
quando o cabeçalho está ausente.

| Cabeçalho                     | Aceita                                                                                                                                                                                                       | Efeito                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | um alias de predefinição (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ou um nome de pacote em bruto (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Substitui os pesos de pontuação para este pedido. `balanced`/`default` força os pesos predefinidos (sem pacote). Os valores desconhecidos são ignorados (a configuração é preservada).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `X-OmniRoute-Budget`          | um número positivo (máximo de USD por pedido)                                                                                                                                                                | Limite máximo rígido de custos: os candidatos cujo custo estimado o exceda são filtrados antes da seleção. O que acontece quando **todos** os candidatos o excedem é controlado por `X-OmniRoute-Budget-Fallback` abaixo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (predefinição, aliases: `cheapest-viable`, `soft`) ou `strict` (aliases: `block`, `hard`)                                                                                                         | `cheapest`: recorre ao candidato globalmente mais barato, embora este ainda exceda o limite (comportamento legado). `strict`: recusa efetuar a seleção — o pedido falha imediatamente com `HTTP 402`, em vez de exceder silenciosamente o orçamento. Os valores desconhecidos são ignorados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Effort`          | `auto` (outros valores reservados)                                                                                                                                                                           | Orçamento de raciocínio adaptativo: quando o pedido **não** contém qualquer campo de raciocínio, independentemente da forma (`reasoning_effort`, `reasoning`, `thinking`), o gateway resolve `auto` para `low`/`medium`/`high` com base em sinais determinísticos da estrutura do pedido (comprimento da última mensagem do utilizador, tamanho do contexto até à última mensagem do utilizador, resultados anteriores de ferramentas, profundidade do ciclo de ferramentas). Os sinais estão limitados ao turno atual — tudo o que vier depois da última mensagem do utilizador é ignorado — pelo que todos os pedidos num ciclo de ferramentas são resolvidos para o mesmo nível (fixação sem estado por turno, sem estado de sessão e sem escalada a meio do ciclo que quebraria os prefixos da cache de prompts a montante). Um campo de raciocínio explícito do cliente tem sempre precedência. Limitado a pedidos cujo encaminhamento a montante seja resolvido para o formato OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` é um campo com o formato OpenAI, pelo que o cabeçalho não tem efeito num pedido direcionado para Claude ou Gemini (consulte `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forçar o perfil mais rápido, limitar este pedido a $0.05 e bloquear estritamente em vez de exceder o orçamento
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

A resolução é uma função pura (`open-sse/services/autoCombo/requestControls.ts`); os
valores resolvidos alimentam as entradas existentes `config.modePack` / `config.budgetCap` /
`config.budgetFallback` do motor. O `config.budgetFallback` armazenado de uma combinação ("strict" |
"cheapest") define a política persistente; o cabeçalho substitui-a para um único pedido.

## Todas as estratégias de encaminhamento

O motor de combinações do OmniRoute suporta **19 estratégias de encaminhamento** (declaradas em `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). O próprio motor Auto Combo é disponibilizado através da estratégia `auto`; as restantes estão disponíveis para combinações persistidas.

| Estratégia          | Descrição                                                                                                                                                                                                                     |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Lista ordenada pelo primeiro destino, com prioridade explícita                                                                                                                                                                |
| `weighted`          | Seleção aleatória ponderada pelo peso de cada destino                                                                                                                                                                         |
| `round-robin`       | Percorre os destinos por ordem                                                                                                                                                                                                |
| `context-relay`     | Transfere o contexto entre destinos (conversas longas)                                                                                                                                                                        |
| `fill-first`        | Preenche a quota de cada destino antes de passar ao seguinte                                                                                                                                                                  |
| `p2c`               | Balanceamento de carga aleatório pelo método de escolha entre 2 opções                                                                                                                                                        |
| `random`            | Seleção aleatória uniforme                                                                                                                                                                                                    |
| `least-used`        | Escolhe o destino com a carga atual mais baixa                                                                                                                                                                                |
| `cost-optimized`    | Minimiza o custo em $ por pedido com base nos preços do catálogo                                                                                                                                                              |
| `reset-aware` ⭐    | Dá prioridade com base no momento de reposição da quota — os períodos de reposição mais curtos têm prioridade                                                                                                                 |
| `reset-window`      | Prefere os destinos cujo período de quota será reposto mais cedo                                                                                                                                                              |
| `headroom`          | Escolhe o destino com a maior margem de quota restante                                                                                                                                                                        |
| `strict-random`     | Seleção aleatória sem desduplicação de repetições                                                                                                                                                                             |
| `auto`              | Utiliza a pontuação Auto Combo (16 fatores) — **recomendado**                                                                                                                                                                 |
| `lkgp`              | Último Caminho Conhecido como Válido (fixa o último fornecedor bem-sucedido e, em seguida, recorre às regras como alternativa)                                                                                                |
| `context-optimized` | Escolhe o destino mais adequado ao tamanho do contexto atual                                                                                                                                                                  |
| `cache-optimized`   | Reordena os destinos por afinidade com a cache de prompts — a ligação com maior probabilidade de já conter o prefixo deste pedido em cache é experimentada primeiro (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Distribui o pedido em paralelo por um painel de modelos e, em seguida, sintetiza uma resposta através de um avaliador (ver abaixo)                                                                                            |
| `pipeline`          | Executa os destinos sequencialmente, passando a saída de cada etapa para a entrada da etapa seguinte; apenas a resposta final é devolvida (#6396)                                                                             |

⭐ = Novo na v3.8.0 · 🧬 = Novo na v3.8.36

### Semântica de `weighted`

`weighted` consiste numa **seleção aleatória proporcional por pedido**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), e não num mecanismo de equalização:

- Cada pedido seleciona **uma** etapa com a probabilidade `weight / totalWeight`; as restantes etapas
  são ordenadas por peso decrescente como cadeia de alternativas para esse pedido.
- Uma etapa cujo peso seja `0` (ou esteja em falta) **nunca é selecionada** enquanto qualquer outra etapa tiver
  um peso > 0 — só pode servir de alternativa após a etapa selecionada falhar. Apenas quando **todos**
  os pesos são 0 é que a seleção se torna uniforme.
- As etapas cujos destinos estejam todos indisponíveis — disjuntor do fornecedor `OPEN`, período de
  espera da ligação, bloqueio do modelo — são removidas da seleção antes de esta ocorrer
  (`open-sse/services/combo/targetResolution.ts`), pelo que uma única etapa operacional pode, temporariamente,
  ser selecionada em todos os pedidos.
- `stickyWeightedLimit` (configuração da combinação, predefinição `1` = desativado) fixa a etapa selecionada durante esse número de
  sucessos consecutivos antes de efetuar uma nova seleção.

Para uma rotação estrita, utilize `round-robin`; pesos iguais em `weighted` proporcionam um equilíbrio estatístico — não
estrito.

## Estratégia Fusion

`fusion` é a única estratégia que **não** escolhe um único destino. Distribui o prompt
por **todos os modelos do painel em paralelo** e, em seguida, um **modelo avaliador** configurável sintetiza
uma única resposta final a partir de todas as respostas do painel. Adaptada do projeto original `decolua/9router`
(design Fusion da OpenRouter); implementação em `open-sse/services/fusion.ts`.

Como funciona:

0. **Desvio para pedidos com ferramentas** — um pedido que contenha um array `tools` não vazio e
   cujo `tool_choice` não esteja explicitamente definido como `"none"` ignora totalmente o painel: é encaminhado diretamente para
   um único modelo (o avaliador configurado ou `panel[0]`), com `tools`/`tool_choice`
   transmitidos sem alterações. Os membros do painel não têm acesso a ferramentas e a
   diretiva de síntese do avaliador desencoraja a emissão de chamadas de ferramentas, pelo que os clientes
   agênticos/com suporte para chamadas de ferramentas obtêm uma decisão real de chamada de ferramenta em vez de prosa sintetizada (#6771).
1. **Distribuição em leque** (apenas pedidos sem ferramentas) — o prompt é enviado simultaneamente para todos os modelos
   do painel, forçando o modo sem streaming e removendo as ferramentas (o avaliador necessita de
   prosa completa para efetuar a síntese).
2. **Recolha com quórum e período de tolerância** — assim que chegam `minPanel` respostas, é iniciado um curto temporizador
   de tolerância para os modelos atrasados; em seguida, a fusão prossegue com tudo o que tiver sido recolhido.
   Isto limita a penalização do modelo mais lento no tempo total, dentro dos limites de um tempo limite rígido.
3. **Síntese pelo avaliador** — as respostas do painel são anonimizadas (`Source 1`, `Source 2`, … — para que
   o avaliador pondere o conteúdo, e não a marca do modelo) e entregues ao avaliador, que analisa
   consensos / contradições / cobertura parcial / perspetivas únicas / pontos cegos e, em seguida,
   redige **uma** resposta definitiva. A chamada ao avaliador mantém o sinalizador `stream` original
   do cliente + as ferramentas, pelo que o streaming e a utilização subsequente de ferramentas continuam a funcionar.
4. **Degradação controlada** — 0 respostas do painel → `503`; exatamente 1 resposta sobrevivente → essa resposta
   é devolvida diretamente (não há nada para fundir); um painel com um único modelo responde diretamente.

Um membro do painel também pode ser um passo `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) que referencia
outro combo — é resolvido como **uma única voz opaca do painel** (um despacho recursivo completo para o
combo referenciado, e não uma distribuição em leque pelos destinos desse combo), com a mesma proteção
contra profundidade/ciclos que todas as outras estratégias que utilizam combo-ref já usam (#6764).

### Configuração

Configurada no objeto `config` do combo (sem migração de esquema — reutiliza a tabela
`combos` existente):

| Campo                                    | Tipo     | Predefinição              | Finalidade                                                                                                      |
| :--------------------------------------- | :------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | primeiro modelo do painel | Modelo que sintetiza a resposta final                                                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`                       | Respostas bem-sucedidas necessárias antes de o temporizador de tolerância iniciar (limitado a `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                    | Tempo de espera pelos modelos atrasados após o quórum ser atingido                                              |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                   | Limite absoluto para impedir que um modelo bloqueado atrase o pedido                                            |

Os valores predefinidos encontram-se em `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

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

Depois, invoque-o como qualquer outro combo: `{"model":"fusion-panel","messages":[...]}`.

## Fábrica Virtual de Auto-Combo

O motor Auto Combo não requer combos predefinidos. Em vez disso, `open-sse/services/autoCombo/virtualFactory.ts` cria candidatos dinamicamente:

1. Obtém `getProviderConnections({ isActive: true })` (todas as ligações ativadas)
2. Filtra as que têm credenciais válidas (chave de API ou token OAuth não expirado através de `hasUsableOAuthToken()`)
3. Cruza os dados com `getProviderRegistry()` para determinar a disponibilidade dos modelos e os preços
4. Para cada tuplo `(provider, model, connection)`, cria um `VirtualAutoComboCandidate`
5. Escolhe `connection.defaultModel` (ou o primeiro modelo do registo) como destino de encaminhamento
6. Pontua cada candidato utilizando o `scorePool()` de 16 fatores e o conjunto de pesos da variante
7. Devolve o `AutoComboConfig` resultante em memória para `handleComboChat()` — nunca é guardado na BD

Isto significa que **adicionar um novo fornecedor com `auto/*` ativado expande automaticamente o conjunto de candidatos** — não é necessária qualquer edição manual do combo. O combo virtual é recriado em cada pedido, pelo que as ligações recentemente adicionadas ou que tenham recuperado são utilizadas imediatamente.

## Autorrecuperação

- **Exclusão temporária**: Pontuação < 0,2 → excluído durante 5 min (recuo progressivo, máximo de 30 min)
- **Deteção do disjuntor**: OPEN → excluído automaticamente; HALF_OPEN → pedidos de sondagem
- **Modo de incidente**: >50% OPEN → desativar a exploração, maximizar a estabilidade
- **Recuperação após o período de espera**: Após a exclusão, o primeiro pedido é uma "sondagem" com um tempo limite reduzido

## Exploração Bandit

5% dos pedidos (configurável) são encaminhados para fornecedores aleatórios para exploração. Desativada no modo de incidente.

## API

**Não existe um endpoint `POST /api/combos/auto` dedicado** — o Auto-Combo é utilizado de duas formas:

1. **Sem configuração (recomendado):** Envie qualquer pedido de conclusão de chat com `model: "auto"` ou `model: "auto/<variant>"`. A fábrica virtual cria o combo em cada pedido — sem persistência e sem necessidade de chamadas à API.

2. **Combo persistido com `strategy: "auto"`:** Crie um combo normal através de `POST /api/combos` e defina `strategy: "auto"`, bem como `config.auto.weights` / `config.auto.candidatePool`. É utilizado o mesmo motor de pontuação; o combo é guardado em `combos` e pode ser reutilizado por ID.

Para descoberta, `GET /api/combos/auto` apresenta todas as variantes com o respetivo conjunto de candidatos resolvido, juntamente com `context_length` / `max_output_tokens` — o valor MÁXIMO entre as janelas do conjunto de candidatos. Os clientes (por exemplo, o plugin opencode) devem anunciar estes valores em vez de `0`: um contexto com valor zero desativa por completo a compactação automática do opencode, permitindo que as sessões cresçam até que a limpeza do histórico do gateway destrua o contexto. É seguro anunciar o valor MÁXIMO porque o pré-filtro de contexto do auto-combo encaminha pedidos demasiado grandes para candidatos com janelas de contexto extensas.

```bash
# Utilização sem configuração (sem criação de combos)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combo automático persistido através do endpoint normal de combos
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Estratégias do router automático

Os combos persistidos com `strategy: "auto"` podem definir `config.routerStrategy` (ou a opção legada
`config.auto.routerStrategy`) com um dos seguintes valores:

- `rules` — pontuação ponderada predefinida
- `score` — seleciona a pontuação ponderada configurada mais elevada. Os empates exatos preservam a ordem
  configurada dos candidatos; o `explorationRate` existente efetua amostragens a partir de todo o conjunto ordenado.
- `cost` / `eco` — fornecedor saudável mais barato
- `latency` / `fast` — menor latência p95 com penalização de fiabilidade
- `sla-aware` / `sla` — dá preferência a candidatos que cumpram os SLO de latência p95, taxa de erros e, opcionalmente,
  custo
- `lkgp` — último fornecedor conhecido como funcional em primeiro lugar

### Estratégias do router em detalhe

O motor de auto-combo disponibiliza 6 implementações **RouterStrategy** modulares que
pode trocar através de `config.routerStrategy` (ou da opção legada `config.auto.routerStrategy`).
Cada estratégia escolhe um fornecedor do conjunto de candidatos, dado um `RoutingContext`
(tipo de tarefa, indicadores de ferramentas/visão, estimativa de tokens, política de SLA opcional e
último fornecedor conhecido como funcional opcional).

#### 1. `rules` (predefinida) — pontuação ponderada de 16 fatores

Encapsula o motor de pontuação existente. Filtra os candidatos cujo disjuntor se encontra no estado `OPEN`
e, em seguida, executa `scorePool()` com o tipo de tarefa atual e `getTaskFitness()`,
escolhendo o fornecedor com a pontuação mais elevada.

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

**Quando utilizar**: Predefinição. Utilize quando pretender um equilíbrio entre todos os sinais.

**Alias**: `rules` (sem alias)

---

#### 2. `cost` / `eco` — fornecedor saudável mais barato

Ordena o conjunto de candidatos por `costPer1MTokens` (ordem ascendente) e escolhe o mais barato.
Filtra primeiro os candidatos no estado `OPEN`.

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

**Quando utilizar**: Cargas de trabalho sensíveis ao custo, processamento em lote ou tarefas em segundo plano.

**Aliases**: `cost`, `eco`

---

#### 3. `latency` / `fast` — menor latência p95 com penalização de fiabilidade

Ordena por `p95LatencyMs + (errorRate * 1000)`. A penalização da taxa de erros garante
que os fornecedores pouco fiáveis ficam numa posição inferior, mesmo que a sua latência nominal seja baixa.

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

**Quando utilizar**: Cargas de trabalho sensíveis à latência, como conversação em tempo real, conclusão automática ou
assistentes de programação interativos.

**Aliases**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — conformidade com SLOs de latência/erros/custo

Atribui uma pontuação a cada candidato com base no grau de cumprimento da política de SLO configurada:

| Fator                     | Peso | Fórmula                                            |
| ------------------------- | ---- | -------------------------------------------------- |
| Pontuação de latência     | 35%  | `threshold / max(value, ε)`                        |
| Pontuação de erros        | 35%  | `threshold / max(value, ε)`                        |
| Pontuação de estado       | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)  |
| Pontuação de custo        | 10%  | `threshold / max(value, ε)` ou inversa normalizada |
| Pontuação de estabilidade | 5%   | desvio-padrão da latência normalizado inversamente |

Quando `hardConstraints: true`, os candidatos são ordenados principalmente pela **pontuação de violação**
(o quanto excedem qualquer SLO) e, em seguida, pela pontuação composta. Caso contrário, é utilizada apenas
a pontuação composta.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... atribui uma pontuação a cada candidato em relação à política: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Campos de SLA** (definidos na configuração da combinação):

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

**Quando utilizar**: Cargas de trabalho de produção com limites rigorosos de latência, taxa de erros ou custo.

**Aliases**: `sla-aware`, `sla`

---

#### 5. `lkgp` — último fornecedor conhecido como funcional primeiro

Tenta primeiro o **último fornecedor conhecido como funcional** (se estiver definido) e, em seguida, recorre à
estratégia `rules`. É útil para a afinidade de sessão — o mesmo fornecedor processa
os pedidos subsequentes numa conversa.

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

    // Recurso à estratégia rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Quando utilizar**: Conversas com vários turnos em que pretende que o mesmo fornecedor processe
os pedidos subsequentes (por exemplo, para colocação em cache, continuidade do contexto ou consistência de preços).

**Alias**: `lkgp` (sem alias)

---

### Estratégias personalizadas do router

Pode registar a sua própria implementação de `RouterStrategy` através da API pública:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // A sua lógica de encaminhamento aqui
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

Em seguida, utilize-a:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Guia de seleção da estratégia do router

| Caso de utilização            | Estratégia  | Motivo                                    |
| ----------------------------- | ----------- | ----------------------------------------- |
| Carga de trabalho equilibrada | `rules`     | Predefinição — considera todos os fatores |
| Minimizar o custo             | `cost`      | Escolhe sempre o mais barato              |
| Minimizar a latência          | `latency`   | Escolhe o fornecedor fiável mais rápido   |
| SLOs rigorosos                | `sla-aware` | Filtra por limites de p95/erros/custo     |
| Conversação com vários turnos | `lkgp`      | Afinidade de sessão                       |

Campos compatíveis com SLA:

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

## Adequação às tarefas

Mais de 30 modelos avaliados em 6 tipos de tarefas (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Suporta padrões com caracteres universais (por exemplo, `*-coder` → pontuação elevada em programação).

## Recapitulação das variantes Auto

Incluindo o `auto` simples (predefinição) e os 6 valores de `AutoVariant` declarados em `autoPrefix.ts`, existem **7 IDs de modelo invocáveis**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` propriamente dito enumera 6 valores; a 7.ª opção é «sem variante» — o `auto` simples — processada por `parseAutoPrefix()` como `variant: undefined`.)

## Como os níveis se integram no Auto-Combo

A função de pontuação com 16 fatores (`open-sse/services/autoCombo/scoring.ts`) trata a pertença a um nível como dois sinais: `tierPriority` (0.0476) e `tierAffinity` (0.0476). Consulte a [tabela canónica de fatores de pontuação](#how-it-works-persisted-auto-combos) acima para ver o conjunto completo de `DEFAULT_WEIGHTS` — as substituições específicas de cada pacote (ship-fast/cost-saver/quality-first/offline-friendly) estão indicadas na tabela «Perfis de pesos por pacote».

O nível, por si só, **não** força a utilização do Nível 1 em primeiro lugar — se a latência do Nível 1 for elevada ou a relação custo-qualidade não for ideal, o Nível 2 é selecionado. Para impor a ordenação por nível, utilize a estratégia de combinação `priority` e organize os fornecedores por nível.

Para favorecer fortemente o Nível 1 (subscrição), aumente o peso de `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Consulte `docs/marketing/TIERS.md` para obter as definições dos níveis e a classificação dos fornecedores.

## Testes e cobertura

### Matriz determinística de decisões de encaminhamento (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` comprova a **decisão** de encaminhamento das 19 estratégias públicas, de ponta a ponta, através do pipeline de combinação real com um serviço a montante simulado. A cobertura inclui:

- Todas as 19 estratégias `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (interna) de ponta a ponta: equidade DRR + despriorização por saturação através do ponto de integração real `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Cobertura da transferência universal de `context-relay` para todas as quantidades de destinos.

Este conjunto de testes é executado em CI (tarefa `test:integration`) com `--test-concurrency=1` e `--test-force-exit`, pelo que é determinístico e não requer credenciais reais.

### Smoke tests reais condicionados (NÃO incluídos em CI — fornecedores reais)

| Comando                                | O que faz                                                                                                    |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Encaminhamento real no processo com `RUN_COMBO_LIVE=1`; cria um snapshot de uma base de dados OmniRoute real |
| `npm run test:combo:live:vps`          | Chamadas HTTP a um servidor OmniRoute real (defina `COMBO_LIVE_BASE_URL`)                                    |
| `npm run test:combo:live:vps:failover` | O mesmo, com cenários de ativação pós-falha deliberados                                                      |

Estes smoke tests exercitam o percurso de comunicação real (combinação → fornecedor → conclusão). São intencionalmente excluídos de CI porque requerem credenciais reais e acesso a um VPS.

---

## Ficheiros

| Ficheiro                                                  | Finalidade                                                                                                     |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Função de pontuação com 16 fatores, `DEFAULT_WEIGHTS`, normalização do conjunto                                |
| `open-sse/services/autoCombo/taskFitness.ts`              | Consulta de adequação de modelo × tarefa                                                                       |
| `open-sse/services/autoCombo/engine.ts`                   | Lógica de seleção, bandit, limite orçamental                                                                   |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exclusão, sondas, modo de incidente                                                                            |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 perfis de ponderação (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analisador do prefixo `auto/` + 6 variantes                                                                    |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Cria uma `AutoComboConfig` em memória a partir de ligações ativas                                              |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Mecanismo de teste para simular o registo de fornecedores                                                      |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 estratégias)                                                                     |
| `src/sse/handlers/chat.ts`                                | Integração: curto-circuito do prefixo automático                                                               |
