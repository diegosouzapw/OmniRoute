# Public Credentials Handling (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Fonte de referência:** `open-sse/utils/publicCreds.ts`
> **Testes:** `tests/unit/publicCreds.test.ts`
> **Última atualização:** 2026-08-07 — v3.8.50
> **Público-alvo:** Engenheiros que integrem fornecedores que disponibilizam OAuth client_id / client_secret / chaves da API Web do Firebase públicas nas respetivas CLIs públicas.
> **Estado:** **OBRIGATÓRIO** para todo o código novo que incorpore identificadores de terceiros.

## Por que motivo isto existe

- [OAuth 2.0 para aplicações nativas (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret para aplicações instaladas são públicos; o PKCE fornece a segurança efetiva.
- [Chaves de API do Firebase](https://firebase.google.com/docs/projects/api-keys) — Os identificadores de clientes Web são públicos por conceção.

O OmniRoute tem de incorporar estes valores para que os utilizadores que não configurem o `.env` continuem a dispor de um fluxo OAuth funcional imediatamente. Sem uma alternativa incorporada, os fornecedores Gemini / Antigravity deixam de funcionar para qualquer utilizador que siga o processo de «clonar e executar».

No entanto, valores literais como `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` são detetados pelo **GitHub Secret Scanning**, pelo **Semgrep** e por ferramentas semelhantes de análise baseada em padrões. Cada versão torna-se num fluxo ruidoso de falsos positivos, a proteção contra envios bloqueia commits legítimos e os operadores deixam de confiar no fluxo de alertas.

O utilitário `open-sse/utils/publicCreds.ts` resolve ambas as restrições em simultâneo:

- Incorpora o identificador público como uma **sequência de bytes mascarada com XOR** (sem padrões detetáveis no código-fonte).
- Descodifica-o em tempo de execução através de `decodePublicCred` / `resolvePublicCred`.
- Deteta valores em bruto que já seguem prefixos conhecidos (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) e transmite-os sem alterações, pelo que os utilizadores com valores em bruto nos respetivos `.env` existentes continuam a funcionar com **migração zero**.

Isto é **ofuscação, não encriptação.** Qualquer pessoa que leia o código-fonte pode recuperar o valor — o que não constitui um problema, porque o valor é público por conceção. O único objetivo é evitar correspondências com as expressões regulares dos analisadores.

## O padrão obrigatório

### 1. Adicionar uma nova credencial pública

Quando precisar de incorporar um novo valor fornecido por terceiros que:

- provenha de uma CLI pública / aplicação de ambiente de trabalho / pacote para navegador, **e**
- esteja documentado (ou seja tratado) pelo fornecedor como um identificador de cliente público, **e**
- seja, de outro modo, detetado por um analisador de padrões (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, etc.),

…siga esta lista de verificação:

1. Gere a sequência de bytes mascarada:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Adicione uma nova entrada a `EMBEDDED_DEFAULTS` em `open-sse/utils/publicCreds.ts` com um **nome de chave neutro** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, etc.). **Não** utilize nomes como `client_secret` ou `api_key` no utilitário — essas palavras acionam as regras genéricas de segredos do Semgrep.

3. Adicione um `keyof typeof EMBEDDED_DEFAULTS` à união pública de tipos (é inferido automaticamente).

4. No código consumidor, substitua o literal codificado por:

   ```ts
   // substituição através de uma única variável de ambiente
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // vários aliases de variáveis de ambiente (vence o primeiro não vazio)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // sem substituição através de variável de ambiente (utiliza sempre a predefinição incorporada)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Remova o literal de `.env.example` (substitua-o por documentação apenas em comentários que encaminhe os leitores para aqui):

   ```dotenv
   # ── Fornecedor (Google / Firebase / etc.) ──
   # As credenciais OAuth públicas estão incorporadas no código através de
   # open-sse/utils/publicCreds.ts. Defina estas variáveis apenas para utilizar as suas próprias credenciais.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Atualize `tests/unit/publicCreds.test.ts` para adicionar uma asserção de formato para a nova chave (verifique o formato, não o valor literal — consulte os testes existentes para conhecer o padrão).

7. **Nunca** adicione literais `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` aos ficheiros de teste. Utilize as constantes `FAKE_*` criadas a partir de fragmentos com `.join("")` (consulte os testes existentes).

### 2. Consumidores

- **Leia apenas através de `resolvePublicCred()` / `resolvePublicCredMulti()`** — nunca invoque `decodePublicCredBytes()` diretamente fora do utilitário.
- O utilitário é intencionalmente pouco dispendioso (XOR linear dos bytes) e pode ser invocado com segurança durante o carregamento do módulo; as predefinições são calculadas uma única vez.
- A substituição através de variável de ambiente tem sempre prioridade. Se um utilizador definir `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, o utilitário transmite esse valor em bruto sem alterações.

### 3. Padrões proibidos

❌ **Nunca** faça qualquer uma das seguintes operações no código de produção (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// MAU: o valor literal aciona o Secret Scanning e o Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// MAU: base64 do literal — o GitHub continua a detetá-lo desde fev./2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// MAU: concatenação de cadeias que volta a montar o padrão em tempo de execução
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// MAU: codificação hexadecimal/ROT13 — ofuscação diferente, mesmo risco de deteção
clientSecret: hexDecode("474f4353..."),
```

Todas estas abordagens acabam por acionar um analisador. Utilize `resolvePublicCred()`.

❌ **Nunca** adicione credenciais literais a `.env.example`. Os utilizadores que precisem de valores reais de terceiros podem extraí-los da própria CLI pública ou utilizar o seu próprio registo OAuth.

❌ **Nunca** ignore um novo alerta de análise de segredos sem verificar primeiro se a credencial deve ser movida para este utilitário.

## Controlos relacionados

- `RAW_VALUE_PATTERN` em `publicCreds.ts` enumera os prefixos que acionam a passagem direta (retrocompatibilidade). Expanda-o apenas para formatos de credenciais públicas documentados, nunca para segredos proprietários.
- `.env.example` é usado pelo script `check-env-doc-sync` da CI — ao remover uma variável aqui, certifique-se de que a documentação fica em conformidade.
- As suites `npm run test:vitest` e `node --import tsx/esm --test tests/unit/publicCreds.test.ts` devem continuar ambas a passar.

## Quando NÃO utilizar este auxiliar

Este auxiliar destina-se **apenas** a credenciais que sejam:

1. Distribuídas publicamente pelo fornecedor original (binário da CLI, bundle do navegador, documentação oficial).
2. Documentadas ou claramente indicadas como não confidenciais (protegidas por PKCE, chave Web do Firebase ou semelhantes).

Para tudo o resto — tokens emitidos pelo operador, segredos por inquilino, o `client_secret` da sua própria aplicação OAuth, chaves de encriptação, segredos JWT, palavras-passe de bases de dados — utilize **apenas variáveis de ambiente** (`process.env.FOO`, recurso a `||` para um valor vazio/erro explícito). Estes dados devem estar no `.env` e no [repositório de credenciais encriptadas](./COMPLIANCE.md), não no código-fonte.

## Referências

- [Google: OAuth 2.0 para aplicações nativas](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: chaves de API para identificação de clientes](https://firebase.google.com/docs/projects/api-keys)
- [Segredos suportados pela Análise de Segredos do GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: deteção de tokens em base64 (fev. de 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit que introduziu este auxiliar: `1a39c31f` — _fix(security): ocultar credenciais públicas de fornecedores + centralizar a sanitização de erros_
