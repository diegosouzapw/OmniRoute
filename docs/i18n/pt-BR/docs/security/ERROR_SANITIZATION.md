# Error Message Sanitization (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Fonte da verdade:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` e os construtores públicos em `open-sse/utils/error.ts`
> **Testes:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Última atualização:** 2026-09-02 — v3.8.51
> **Público-alvo:** Qualquer pessoa da engenharia que trabalhe com respostas de erro (rotas HTTP, fluxos SSE, executores, manipuladores MCP).
> **Status:** **OBRIGATÓRIO** para todo caminho de código que retorne uma mensagem de erro a um cliente.

## Por que isso existe

A regra `js/stack-trace-exposure` (CWE-209) do CodeQL sinaliza qualquer caminho de código no qual uma mensagem de erro originada de uma exceção em tempo de execução chega a uma resposta HTTP / SSE sem ser sanitizada. Rastreamentos de pilha e caminhos absolutos de arquivos em respostas de produção fornecem aos invasores:

- Estrutura interna de diretórios (`/srv/app/src/lib/...`) → reconhecimento para ataques posteriores.
- Versões de bibliotecas / frameworks inferidas por meio dos quadros da pilha → seleção de exploits direcionados.
- Valores confidenciais de tempo de execução que podem ter sido interpolados como strings nos erros (consultas ao banco de dados, valores de configuração).

O auxiliar `sanitizeErrorMessage` exportado por `open-sse/utils/error.ts` remove essas classes de
vazamento:

1. Trechos finais de quadros de pilha JavaScript físicos, serializados e inequivocamente embutidos.
2. Caminhos absolutos de sistema de arquivos POSIX, Windows, UNC e `file://`, preservando URLs HTTPS seguras
   e rotas de API explicitamente marcadas.
3. Atribuições de credenciais, formatos comuns de tokens de provedores, blocos PEM de chaves privadas e URLs
   de dados em base64.

O sanitizador limita o tamanho da entrada e falha de forma segura quando um valor lançado rejeita a coerção para string.
A sanitização recursiva de JSON upstream também remove chaves inseguras de credenciais/caminhos, aliases de sessão e
chaves de controle de protótipo antes que uma resposta seja serializada.

## O padrão obrigatório

### 1. Criação de uma resposta de erro (rotas HTTP / API)

Use `buildErrorBody()` — a sanitização já está integrada:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... lógica do manipulador ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Ou, para os wrappers de conveniência no mesmo módulo:

```ts
import {
  errorResponse, // objeto Response de uso único
  writeStreamError, // gravador SSE
  createErrorResult, // formato { success: false, status, response, ... }
  unavailableResponse, // adiciona Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Todos eles aplicam o limite canônico de erro público. `errorResponse`, `writeStreamError` e
`createErrorResult` passam por `buildErrorBody`; os três auxiliares especializados de repetição/circuito
projetam e sanitizam diretamente seu contexto público. **Você nunca precisa chamar
`sanitizeErrorMessage` manualmente** ao usar esses auxiliares.

### 2. Envelopes de erro personalizados (raro)

Quando não for possível usar os auxiliares acima (por exemplo, quando o formato da resposta for determinado por um protocolo upstream como o Connect-RPC), importe `sanitizeErrorMessage` diretamente:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Essa é a única forma autorizada de montar um corpo de erro personalizado. Consulte `open-sse/executors/cursor.ts::buildErrorResponse` para ver a implementação de referência.

### 3. Registro em log vs. resposta

Exceções internas confiáveis podem manter sua mensagem e pilha completas para que os operadores possam depurar. Valores
originados nos limites de provedores, validação, sessões de navegador ou áreas adjacentes a credenciais devem ser
sanitizados antes de entrarem na saída do console, em metadados de auditoria ou em logs persistentes de chamadas. Padrão:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "falha no manipulador"); // somente exceção interna confiável
  return errorResponse(500, getErrorMessage(err)); // sanitizado — enviado ao cliente
}
```

Para falhas controladas pelo provedor, projete também o valor registrado:

```ts
log.error({
  message: sanitizeErrorMessage(err) || "Falha na solicitação ao provedor",
});
```

### 4. Padrões proibidos

❌ **Nunca** coloque a saída bruta de uma exceção no corpo de uma Response:

```ts
// RUIM: o rastreamento de pilha e os caminhos de arquivos chegam ao cliente
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nunca** implemente seu próprio separador de primeira linha:

```ts
// RUIM: não remove caminhos absolutos e pode divergir do auxiliar canônico
const safe = String(err).split("\n")[0];
```

❌ **Nunca** sanitize na rota e se esqueça do caminho SSE. Tudo o que grava em um fluxo deve passar por `writeStreamError` (ou por seu `buildErrorBody` subjacente).

❌ **Nunca** inclua intencionalmente `process.cwd()`, `__filename`, `__dirname` ou caminhos derivados do ambiente
em mensagens de erro. O sanitizador cobre caminhos absolutos como defesa em profundidade, mas os chamadores não devem
criar mensagens que revelem a topologia do sistema.

## Cobertura no CI

`tests/unit/error-message-sanitization.test.ts` garante que:

- Toda rota em `/api/model-combo-mappings/*` retorne corpos sanitizados em respostas 4xx/5xx.
- `sanitizeErrorMessage` remova rastreamentos de pilha com várias linhas.
- `sanitizeErrorMessage` substitua caminhos absolutos POSIX e Windows por `<path>`.
- `sanitizeErrorMessage` trate entradas `null`/`undefined`/instâncias de `Error` com segurança.
- `buildErrorBody` nunca exponha rastreamentos de pilha em seu campo `message`.

Ao adicionar uma nova rota ou executor, copie o padrão de asserção desse arquivo. O critério de cobertura (`npm run test:coverage`) exige ≥60% de statements/linhas/funções/branches — os fluxos de erro devem ser cobertos.

### A verificação estática: `npm run check:error-helper`

`scripts/check/check-error-helper.mjs` verifica `open-sse/executors/`, `open-sse/handlers/`, `open-sse/mcp-server/` e cada `src/app/api/**/route.ts` em busca de um erro capturado bruto (`err.message` / `err.stack`) ou de um `body.error.message` bruto vindo de um serviço upstream que chegue a um corpo voltado ao cliente.

**A confiança é definida por chamada, nunca por arquivo** (G-03, #15159). A verificação costumava ignorar um arquivo inteiro assim que encontrava qualquer importação de um caminho `utils/error` — uma isenção no escopo do arquivo aplicada a um risco no escopo da chamada. Um único `import { sanitizeErrorMessage }` correto isentava permanentemente todos os outros pontos de saída no arquivo, e foi assim que um vazamento chegou à produção mesmo com a verificação aprovada. Agora, uma linha é considerada confiável somente quando realmente passa por um construtor ou sanitizador autorizado:

| Formato da linha                                                                                                     | Confiável?         |
| -------------------------------------------------------------------------------------------------------------------- | ------------------ |
| chama `sanitizeErrorMessage` / `buildErrorBody` / `createErrorResult` / `toSafeMcpErrorMessage` / …                  | sim                |
| chama um construtor canônico **que este arquivo importa** de `open-sse/utils/error` ou `src/lib/api/errorResponse`   | sim                |
| um construtor autorizado é chamado em **várias linhas**, de modo que o campo `message:` fique em uma linha posterior | sim                |
| chama uma `function errorResponse(...)` local ao arquivo cujo próprio corpo faz a sanitização                        | sim                |
| encaminha `err.message` / `err.stack` em qualquer outro lugar                                                        | **não — violação** |

Duas consequências importantes:

- Importar `errorResponse` _não_ concede confiança irrestrita. Um arquivo que define seu próprio `errorResponse` ainda é sinalizado no local da chamada, porque a verificação resolve a confiança por símbolo, não por arquivo. O mesmo vale para `createErrorResponse`.
- `const body = buildErrorBody(status, sanitizeErrorMessage(msg))` seguido por `error: body.error.message` é o idioma **sanitizado** usado nos executores `*-fetch.ts` e não é sinalizado.

Ambos os módulos de construtores autorizados são considerados: `open-sse/utils/error.ts` e `src/lib/api/errorResponse.ts`. O segundo é usado pelos cerca de 54 manipuladores de rota fora de `open-sse` e sanitiza ambas as suas exportações.

Dois formatos que **não** são violações, embora a verificação já os tenha reportado como vazamentos:

- um erro bruto dentro de um **registro de auditoria** — `saveCallLog({ error: err.message })`, `logToolCall(...)` ou um logger que recebe primeiro uma mensagem (`log.error("BATCHES", "sweep failed", { error: err.message })`). A resposta voltada ao cliente nas linhas seguintes pode perfeitamente ser um `buildErrorBody` estático.
- uma chamada **multilinha** a um construtor autorizado, em que o campo `message:` não menciona nenhum construtor:
  ```ts
  return createErrorResponse({
    status: 400,
    message: error.message,
  });
  ```

`KNOWN_MISSING_ERROR_HELPER` congela violações preexistentes para que a verificação bloqueie apenas as _novas_. `assertNoStale` remove automaticamente uma entrada assim que sua violação é corrigida, impedindo que o congelamento se cristalize. Proteções contra regressões: `tests/unit/check-error-helper.test.ts` e `tests/unit/check-error-helper-call-scope.test.ts`.

## Controles relacionados

- Os alertas `js/stack-trace-exposure` do CodeQL em `.github/security` devem sempre ser **corrigidos** por meio desses auxiliares **ou** descartados com um comentário que cite este documento.
- A configuração de redação do `pino` (`src/shared/utils/logRedaction.ts`) trata separadamente os logs estruturados confiáveis. Este documento aborda mensagens de resposta públicas e valores controlados pelo provedor que atravessam limites persistentes de logs de chamadas/proxy.
- A lista de bloqueio de cabeçalhos upstream (`src/shared/constants/upstreamHeaders.ts`) cobre o vazamento de cabeçalhos — mantenha ambos os arquivos alinhados ao adicionar uma nova preocupação de exfiltração.

## Repasse de detalhes upstream

`buildErrorBody` aceita um terceiro argumento opcional `upstreamDetails` (corpo bruto analisado proveniente do provedor upstream). Quando fornecido, ele é sanitizado por `sanitizeUpstreamDetails` antes de ser incluído na resposta como `upstream_details`.

Um quarto argumento opcional `classification` (`{ type?: string; code?: string; reason?: string }`) aceita uma classificação pública explícita. Cada campo é projetado no vocabulário limitado de identificadores públicos. Valores inseguros, com formato de credencial, que contenham caracteres de controle ou sejam excessivamente longos retornam ao tipo/código derivado do status; um motivo opcional inseguro é omitido. Identificadores de status HTTP de três dígitos (`100` a `599`) continuam válidos para contratos de provedores que exponham o status numérico upstream como um código legível por máquina. O mesmo intervalo limitado é aceito no formato de espaço reservado de status HTTP gerado localmente; números e nomes arbitrários de provedores permanecem fora do vocabulário.

Passe toda classificação explícita nesse quarto argumento. Nunca sobrescreva `body.error.code`, `body.error.type` ou `body.error.reason` depois que `buildErrorBody()` retornar; a mutação após a construção ignora a projeção pública.

Regras de sanitização aplicadas a `upstreamDetails`:

1. Folhas do tipo string: processadas por `sanitizeErrorMessage` (remove pilhas + caminhos absolutos).
2. Chaves inseguras de caminho, credencial, alias de sessão e controle de protótipo são removidas.
3. Limite de profundidade: níveis de aninhamento além de 4 são substituídos pela string `"[truncated]"`.
4. Arrays são limitados a 32 elementos.

Somente pontos de chamada com um corpo de erro do provedor já analisado devem passar `upstreamDetails`. Erros internos do OmniRoute (falhas de análise de SSE, conteúdo vazio, bloqueios de proteções) não devem incluí-lo.

NÃO passe `err.stack`, `err.message` brutos nem qualquer string proveniente de uma exceção de tempo de execução para `upstreamDetails`. Esses valores ainda devem passar por `errorResponse` / `buildErrorBody(code, msg)` sem um corpo upstream.

O repasse seletivo de respostas upstream 4xx preserva o formato JSON seguro e a redação do provedor exigidos para a recuperação automática do cliente, mas não é um repasse byte a byte: o sanitizador recursivo sempre é executado antes da serialização. Corpos cíclicos, contendo BigInt ou `toJSON()` hostil falham de forma segura e não são elegíveis para repasse. OCR e moderação aplicam a mesma regra; corpos upstream que não sejam JSON, estejam em branco ou estejam rotulados incorretamente são convertidos para o envelope de erro JSON canônico do OmniRoute.

## Limitação conhecida do CodeQL: sanitizadores personalizados não reconhecidos

A consulta do CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) usa uma lista fixa de padrões de sanitização permitidos (por exemplo, `.split("\n")[0]` inline, `String#replace` com formatos específicos de regex, acesso a `.message` em `Error`). Ela **não** reconhece indireção por meio de um auxiliar personalizado como o nosso `sanitizeErrorMessage()`.

Isso significa que locais de chamada que comprovadamente realizam a sanitização por meio deste módulo — por exemplo, `open-sse/utils/error.ts::errorResponse` e `open-sse/executors/cursor.ts::buildErrorResponse` — podem continuar gerando o alerta, embora o código seja funcionalmente seguro. Precedentes de alertas descartados: `#224`, `#231` (maio de 2026), ambos marcados como `false positive` com justificativa técnica.

**Como lidar com uma nova ocorrência:**

1. Confirme se o local de chamada realmente encaminha a mensagem por `sanitizeErrorMessage` / `buildErrorBody` / um dos wrappers documentados acima (leia toda a cadeia de chamadas, do início ao fim — não confie em um comentário).
2. Confirme se `tests/unit/error-message-sanitization.test.ts` cobre o caminho (ou adicione cobertura).
3. Descarte o alerta por meio de `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, referenciando este documento.
4. **Não** "corrija" inserindo `.split("\n")[0]` inline em todos os lugares — o auxiliar é a única fonte de verdade; duplicar o padrão enfraquece o sanitizador (elimina a remoção de caminhos, o limite de comprimento e a coerção de tipos) apenas para dar a impressão de satisfazer o scanner.

Adotar recursos opcionais, como a [configuração de sanitizador personalizado `@codeql/javascript-models` do CodeQL](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), é a solução de longo prazo; ela está fora do escopo deste documento.

## Referências

- [CWE-209: Exposição de informações por meio de uma mensagem de erro](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Folha de referência para tratamento de erros](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit que centraliza o auxiliar: `1a39c31f` — _fix(security): mascarar credenciais públicas do upstream + centralizar a sanitização de erros_
