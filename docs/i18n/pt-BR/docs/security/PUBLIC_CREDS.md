# Public Credentials Handling (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Fonte oficial:** `open-sse/utils/publicCreds.ts`
> **Testes:** `tests/unit/publicCreds.test.ts`
> **Última atualização:** 2026-08-07 — v3.8.50
> **Público-alvo:** Engenheiros integrando provedores que distribuem OAuth client_id / client_secret / chaves da API Web do Firebase em suas CLIs públicas.
> **Status:** **OBRIGATÓRIO** para todo código novo que incorpore identificadores upstream.

## Por que isso existe

- [OAuth 2.0 para aplicativos nativos (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret para aplicativos instalados são públicos; o PKCE fornece a segurança efetiva.
- [Chaves de API do Firebase](https://firebase.google.com/docs/projects/api-keys) — Os identificadores de clientes Web são públicos por definição.

O OmniRoute precisa incorporar esses valores para que usuários que não configuram o `.env` ainda tenham um fluxo OAuth funcional imediatamente. Sem um fallback incorporado, os provedores Gemini / Antigravity deixam de funcionar para qualquer usuário que siga o caminho de "apenas clonar e executar".

No entanto, valores literais como `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` são identificados pelo **GitHub Secret Scanning**, pelo **Semgrep** e por scanners de padrões semelhantes. Cada versão se torna um fluxo ruidoso de falsos positivos, a proteção contra push bloqueia commits legítimos e os operadores deixam de confiar no feed de alertas.

O helper `open-sse/utils/publicCreds.ts` resolve ambas as restrições ao mesmo tempo:

- Incorpora o identificador público como uma **sequência de bytes mascarada com XOR** (nenhum padrão de scanner no código-fonte).
- Decodifica em tempo de execução por meio de `decodePublicCred` / `resolvePublicCred`.
- Detecta valores brutos que já seguem prefixos conhecidos (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) e os repassa sem alterações, portanto, usuários com valores brutos no `.env` existente continuam funcionando com **migração zero**.

Isso é **ofuscação, não criptografia.** Qualquer pessoa que leia o código-fonte pode recuperar o valor — o que não é um problema, pois o valor é público por definição. O único objetivo é evitar correspondências com expressões regulares dos scanners.

## O padrão obrigatório

### 1. Adicionando uma nova credencial pública

Quando você precisar incorporar um novo valor fornecido pelo upstream que:

- venha de uma CLI pública / aplicativo para desktop / bundle de navegador, **e**
- o provedor upstream documente (ou trate) como um identificador de cliente público, **e**
- um scanner de padrões identificaria de outra forma (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` etc.),

…siga esta lista de verificação:

1. Gere a sequência de bytes mascarada:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Adicione uma nova entrada a `EMBEDDED_DEFAULTS` em `open-sse/utils/publicCreds.ts` com um **nome de chave neutro** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` etc.). **Não** use nomes como `client_secret` ou `api_key` no helper — essas palavras acionam regras genéricas de segredos do Semgrep.

3. Adicione um `keyof typeof EMBEDDED_DEFAULTS` à união pública de tipos (ele é inferido automaticamente).

4. No código consumidor, substitua o literal codificado por:

   ```ts
   // uma única substituição por variável de ambiente
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // vários aliases de variáveis de ambiente (o primeiro não vazio vence)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // sem substituição por variável de ambiente (sempre usa o padrão incorporado)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Remova o literal de `.env.example` (substitua-o por uma documentação composta apenas por comentários que direcione os leitores para este documento):

   ```dotenv
   # ── Provedor (Google / Firebase / etc.) ──
   # As credenciais OAuth públicas são incorporadas ao código por meio de
   # open-sse/utils/publicCreds.ts. Defina estas variáveis apenas para usar as suas próprias.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Atualize `tests/unit/publicCreds.test.ts` para adicionar uma asserção de formato para a nova chave (verifique o formato, não o valor literal — consulte os testes existentes para ver o padrão).

7. **Nunca** adicione literais `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` aos arquivos de teste. Use as constantes `FAKE_*` criadas a partir de fragmentos com `.join("")` (consulte os testes existentes).

### 2. Consumidores

- **Leia somente por meio de `resolvePublicCred()` / `resolvePublicCredMulti()`** — nunca chame `decodePublicCredBytes()` diretamente fora do helper.
- O helper é intencionalmente leve (XOR linear de bytes) e seguro para ser chamado durante o carregamento do módulo; os padrões são calculados uma única vez.
- A substituição por variável de ambiente sempre vence. Se um usuário definir `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, o helper repassará esse valor bruto diretamente.

### 3. Padrões proibidos

❌ **Nunca** faça nenhuma das ações a seguir no código de produção (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// RUIM: o valor literal aciona o Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// RUIM: base64 do literal — o GitHub ainda detecta desde fev/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// RUIM: concatenação de strings que remonta o padrão em tempo de execução
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// RUIM: codificação hex/ROT13 — ofuscação diferente, mesmo risco de detecção
clientSecret: hexDecode("474f4353..."),
```

Todos eles acabam acionando um scanner. Use `resolvePublicCred()`.

❌ **Nunca** adicione credenciais literais a `.env.example`. Os usuários que precisarem de valores upstream reais podem extraí-los da própria CLI pública ou usar seu próprio registro OAuth.

❌ **Nunca** descarte um novo alerta de verificação de segredos sem antes conferir se a credencial deve ser movida para este helper.

## Controles relacionados

- `RAW_VALUE_PATTERN` em `publicCreds.ts` enumera os prefixos que acionam o repasse direto (retrocompatibilidade). Estenda-o apenas para formatos documentados de credenciais públicas, nunca para segredos proprietários.
- `.env.example` faz parte do script `check-env-doc-sync` da CI — ao remover uma variável aqui, certifique-se de que a documentação corresponda à alteração.
- As suítes `npm run test:vitest` e `node --import tsx/esm --test tests/unit/publicCreds.test.ts` devem continuar passando.

## Quando NÃO usar este helper

Este helper deve ser usado **somente** para credenciais que sejam:

1. Distribuídas publicamente pelo provedor upstream (binário da CLI, bundle do navegador, documentação oficial).
2. Documentadas ou fortemente indicadas como não confidenciais (protegidas por PKCE, chave do Firebase Web ou similares).

Para todo o restante — tokens emitidos pelo operador, segredos por tenant, o client_secret do seu próprio aplicativo OAuth, chaves de criptografia, segredos JWT, senhas de banco de dados — use **somente variáveis de ambiente** (`process.env.FOO`, fallback com `||` para vazio / erro explícito). Esses valores devem ficar no `.env` e no [armazenamento criptografado de credenciais](./COMPLIANCE.md), não no código-fonte.

## Referências

- [Google: OAuth 2.0 para aplicativos nativos](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: chaves de API para identificação de clientes](https://firebase.google.com/docs/projects/api-keys)
- [Segredos compatíveis com o Secret Scanning do GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: detecção de tokens em base64 (fev. de 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit que introduziu este helper: `1a39c31f` — _fix(security): mascarar credenciais públicas upstream + centralizar a sanitização de erros_
