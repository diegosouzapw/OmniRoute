# Error Message Sanitization (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Fonte de referência:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` e os construtores públicos em `open-sse/utils/error.ts`
> **Testes:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Última atualização:** 2026-09-02 — v3.8.51
> **Público-alvo:** Qualquer engenheiro que trabalhe com respostas de erro (rotas HTTP, streams SSE, executores, processadores MCP).
> **Estado:** **OBRIGATÓRIO** para todos os caminhos de código que devolvam uma mensagem de erro a um cliente.

## Por que motivo isto existe

A regra `js/stack-trace-exposure` (CWE-209) do CodeQL assinala qualquer caminho de código no qual uma mensagem de erro proveniente de uma exceção em tempo de execução chegue a uma resposta HTTP / SSE sem ser sanitizada. Os rastreios de pilha e os caminhos absolutos de ficheiros em respostas de produção fornecem aos atacantes:

- Estrutura de diretórios interna (`/srv/app/src/lib/...`) → reconhecimento para ataques posteriores.
- Versões de bibliotecas / frameworks inferidas a partir de frames da pilha → seleção direcionada de exploits.
- Valores sensíveis de tempo de execução que possam ter sido interpolados em strings de erro (consultas à BD, valores de configuração).

O auxiliar `sanitizeErrorMessage` exportado por `open-sse/utils/error.ts` remove estas classes de
fugas de informação:

1. Sufixos de frames de pilha JavaScript físicos, serializados e inequivocamente inline.
2. Caminhos absolutos de sistemas de ficheiros POSIX, Windows, UNC e `file://`, preservando URLs HTTPS seguras
   e rotas de API explicitamente assinaladas.
3. Atribuições de credenciais, formatos comuns de tokens de fornecedores, blocos PEM de chaves privadas e URLs
   de dados base64.

O sanitizador limita o comprimento da entrada e falha de forma segura quando um valor lançado rejeita a coerção para string.
A sanitização recursiva de JSON proveniente de sistemas a montante também remove chaves de credenciais/caminhos não seguras, aliases de sessão e
chaves de controlo de protótipos antes de uma resposta ser serializada.

## O padrão obrigatório

### 1. Criar uma resposta de erro (rotas HTTP / API)

Utilize `buildErrorBody()` — a sanitização está incorporada:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... lógica do processador ...
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
  errorResponse, // objeto Response de utilização única
  writeStreamError, // escritor SSE
  createErrorResult, // formato { success: false, status, response, ... }
  unavailableResponse, // adiciona Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Todos estes aplicam o limite canónico para erros públicos. `errorResponse`, `writeStreamError` e
`createErrorResult` passam por `buildErrorBody`; os três auxiliares especializados de repetição/circuito
projetam e sanitizam diretamente o respetivo contexto público. **Nunca é necessário chamar
`sanitizeErrorMessage` manualmente** ao utilizar estes auxiliares.

### 2. Envelopes de erro personalizados (raro)

Quando não for possível utilizar os auxiliares acima (por exemplo, quando o formato da resposta for ditado por um protocolo a montante, como o Connect-RPC), importe `sanitizeErrorMessage` diretamente:

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

Esta é a única forma autorizada de criar um corpo de erro personalizado. Consulte `open-sse/executors/cursor.ts::buildErrorResponse` para ver a implementação de referência.

### 3. Registo vs. resposta

As exceções internas fidedignas podem manter a respetiva mensagem e pilha completas para que os operadores possam efetuar a depuração. Os valores
provenientes de limites associados a fornecedores, validação, sessões de browser ou credenciais têm de ser
sanitizados antes de entrarem na saída da consola, nos metadados de auditoria ou nos registos persistentes de chamadas. Padrão:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // apenas exceção interna fidedigna
  return errorResponse(500, getErrorMessage(err)); // sanitizada — enviada ao cliente
}
```

Para falhas controladas por fornecedores, projete também o valor registado:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Padrões proibidos

❌ **Nunca** coloque a saída bruta de uma exceção no corpo de uma Response:

```ts
// MAU: o rastreio de pilha e os caminhos de ficheiros chegam ao cliente
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Nunca** implemente o seu próprio separador da primeira linha:

```ts
// MAU: não remove caminhos absolutos e pode divergir do auxiliar canónico
const safe = String(err).split("\n")[0];
```

❌ **Nunca** sanitize apenas na rota e se esqueça do caminho SSE. Tudo o que escrever num stream deve passar por `writeStreamError` (ou pelo respetivo `buildErrorBody` subjacente).

❌ **Nunca** inclua intencionalmente `process.cwd()`, `__filename`, `__dirname` ou caminhos derivados de variáveis de ambiente
em mensagens de erro. O sanitizador abrange caminhos absolutos como medida de defesa em profundidade, mas os chamadores não devem
criar, à partida, mensagens que exponham a topologia.

## Cobertura em CI

`tests/unit/error-message-sanitization.test.ts` garante que:

- Todas as rotas em `/api/model-combo-mappings/*` devolvem corpos sanitizados em respostas 4xx/5xx.
- `sanitizeErrorMessage` remove rastreios de pilha com várias linhas.
- `sanitizeErrorMessage` substitui caminhos absolutos POSIX e Windows por `<path>`.
- `sanitizeErrorMessage` trata de forma segura entradas `null`/`undefined`/instâncias de `Error`.
- `buildErrorBody` nunca expõe rastreios de pilha no respetivo campo `message`.

Ao adicionar uma nova rota ou executor, copie o padrão de asserção deste ficheiro. O limite de cobertura (`npm run test:coverage`) exige ≥60% de instruções/linhas/funções/ramificações — os caminhos de erro têm de estar cobertos.

## Controlos relacionados

- Os alertas do CodeQL `js/stack-trace-exposure` em `.github/security` devem ser sempre **ou** corrigidos através destes auxiliares **ou** dispensados com um comentário que mencione este documento.
- A configuração de redação do `pino` (`src/shared/utils/logRedaction.ts`) trata separadamente os registos estruturados fidedignos. Este documento abrange mensagens de resposta públicas e valores controlados pelo fornecedor que atravessam limites persistentes de chamadas/registos de proxy.
- A lista de exclusão de cabeçalhos upstream (`src/shared/constants/upstreamHeaders.ts`) abrange a fuga de cabeçalhos — mantenha ambos os ficheiros alinhados ao adicionar uma nova preocupação de exfiltração.

## Passagem de detalhes upstream

`buildErrorBody` aceita um terceiro argumento opcional, `upstreamDetails` (corpo bruto analisado proveniente do fornecedor upstream). Quando fornecido, é sanitizado por `sanitizeUpstreamDetails` antes de ser incluído na resposta como `upstream_details`.

Um quarto argumento opcional, `classification`
(`{ type?: string; code?: string; reason?: string }`), aceita uma classificação pública explícita.
Cada campo é projetado no vocabulário limitado de identificadores públicos. Valores não seguros, com formato de credencial, com carateres de controlo ou demasiado longos são substituídos pelo tipo/código derivado do estado; um motivo opcional não seguro é omitido. Os identificadores de estado HTTP de três dígitos (`100` a `599`) continuam a ser válidos para contratos de fornecedores que exponham o estado upstream numérico como código legível por máquina. O mesmo intervalo limitado é aceite no formato de marcador de posição de estado HTTP gerado localmente; números e nomes arbitrários de fornecedores permanecem fora do vocabulário.

Passe todas as classificações explícitas nesse quarto argumento. Nunca substitua
`body.error.code`, `body.error.type` ou `body.error.reason` após o retorno de `buildErrorBody()`;
a mutação posterior à construção contorna a projeção pública.

Regras de sanitização aplicadas a `upstreamDetails`:

1. Folhas de cadeia de carateres: são processadas por `sanitizeErrorMessage` (remove pilhas + caminhos absolutos).
2. Chaves de caminho não seguras, de credenciais, de aliases de sessão e de controlo de protótipos são removidas.
3. Limite de profundidade: o aninhamento para além de 4 níveis é substituído pela cadeia de carateres `"[truncated]"`.
4. Os arrays são limitados a 32 elementos.

Apenas os locais de chamada com um corpo de erro analisado do fornecedor devem passar `upstreamDetails`. Os erros internos do OmniRoute (falhas de análise de SSE, conteúdo vazio, bloqueios por barreiras de proteção) não o devem incluir.

NÃO passe `err.stack`, `err.message` em bruto, nem qualquer cadeia de carateres proveniente de uma exceção em tempo de execução para `upstreamDetails`. Estes valores têm ainda de passar por `errorResponse` / `buildErrorBody(code, msg)` sem um corpo upstream.

A passagem seletiva de respostas upstream 4xx preserva a estrutura JSON segura e a redação do fornecedor necessárias para a recuperação automática do cliente, mas não é uma passagem byte a byte: o sanitizador recursivo é sempre executado antes da serialização. Corpos cíclicos, que contenham BigInt ou com `toJSON()` hostil falham de forma segura e não são elegíveis para passagem. O OCR e a moderação aplicam a mesma regra; corpos upstream que não sejam JSON, estejam em branco ou tenham uma identificação incorreta são convertidos para o envelope de erro JSON canónico do OmniRoute.

## Limitação conhecida do CodeQL: sanitizadores personalizados não reconhecidos

A consulta do CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) utiliza uma lista de permissões fixa de padrões de sanitização (por exemplo, `.split("\n")[0]` inline, `String#replace` com formatos específicos de expressões regulares, acesso a `.message` em `Error`). **Não** reconhece a indireção através de uma função auxiliar personalizada como a nossa `sanitizeErrorMessage()`.

Isto significa que os locais de chamada que efetuem comprovadamente a sanitização através deste módulo — por exemplo, `open-sse/utils/error.ts::errorResponse` e `open-sse/executors/cursor.ts::buildErrorResponse` — podem continuar a gerar o alerta, apesar de o código ser funcionalmente seguro. Precedentes de alertas dispensados: `#224`, `#231` (maio de 2026), ambos marcados como `false positive` com justificação técnica.

**Como tratar uma nova ocorrência:**

1. Confirme que o local de chamada encaminha efetivamente a mensagem através de `sanitizeErrorMessage` / `buildErrorBody` / uma das funções wrapper documentadas acima (leia toda a cadeia de chamadas, do início ao fim — não confie num comentário).
2. Confirme que `tests/unit/error-message-sanitization.test.ts` testa esse caminho (ou adicione cobertura).
3. Dispense o alerta através de `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, referenciando este documento.
4. **Não** «corrija» o problema inserindo `.split("\n")[0]` inline em todo o lado — a função auxiliar é a única fonte de verdade; duplicar o padrão enfraquece o sanitizador (perde a ocultação de caminhos, o limite de comprimento e a coerção de tipos) apenas para aparentar satisfazer o analisador.

A adoção de funcionalidades opcionais, como a [configuração de sanitizadores personalizados `@codeql/javascript-models` do CodeQL](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), é a solução a longo prazo; está fora do âmbito deste documento.

## Referências

- [CWE-209: Exposição de informações através de uma mensagem de erro](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Guia de consulta rápida sobre tratamento de erros](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit que centraliza a função auxiliar: `1a39c31f` — _fix(security): ocultar credenciais públicas de serviços upstream + centralizar a sanitização de erros_
