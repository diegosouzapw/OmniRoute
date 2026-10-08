# Kiro Setup Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Este guia aborda a adição de contas Kiro (assistente de programação com IA alojado na AWS) ao OmniRoute,
com especial atenção à execução simultânea de várias contas sem conflitos de sessão.

---

## Contexto: por que motivo as contas Kiro podem entrar em conflito

O backend do Kiro utiliza registos de clientes OIDC do AWS SSO para acompanhar as sessões ativas.
A restrição crucial é: **cada registo de cliente OIDC suporta apenas uma sessão
ativa de cada vez**. Quando um segundo dispositivo ou utilizador se autentica utilizando o mesmo
cliente registado, o backend invalida o token de atualização da primeira conta.

Este é o mesmo mecanismo que causa problemas ao executar `kiro-cli login` numa
máquina onde já tenha sido iniciada sessão noutra conta Kiro — o novo início de sessão revoga o
token da primeira conta.

---

## Como o OmniRoute resolve este problema (v3.8.0+)

A partir da v3.8.0, o OmniRoute chama `registerClient()` (AWS SSO OIDC) durante cada
importação de ligação Kiro. Isto atribui a cada ligação do OmniRoute o seu próprio registo
de cliente OIDC dedicado. Como cada registo de cliente é independente, atualizar ou
voltar a autenticar uma conta não afeta o token de atualização de qualquer outra conta.

O isolamento aplica-se aos métodos de importação por token de atualização, enquanto a autenticação por chave de API
evita totalmente as sessões de atualização OIDC:

| Método de importação                                          | Estado de isolamento                                                                                                     |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Fluxo de código do dispositivo AWS Builder ID / IDC           | Isolado desde a introdução do fluxo de código do dispositivo                                                             |
| **Importar token** (colar manualmente o token de atualização) | Isolado desde a v3.8.0                                                                                                   |
| **Início de sessão social com Google / GitHub**               | Isolado desde a v3.8.0                                                                                                   |
| **Importação automática** (SQLite do kiro-cli)                | Isolado desde a v3.8.0 (o caminho SQLite já estava isolado; o método alternativo de cache SSO está agora também isolado) |
| **Chave de API** (chave CodeWhisperer de longa duração)       | Sem sessão de atualização; a chave é validada e armazenada como credencial bearer                                        |

---

## Nota de migração para ligações criadas antes da v3.8.0

As ligações importadas antes da v3.8.0 não têm um registo de cliente OIDC dedicado
armazenado em `providerSpecificData`. Estas ligações continuam a funcionar, mas utilizam o endpoint
de atualização partilhado da autenticação social, o que significa que duas ligações deste tipo ainda podem invalidar-se
mutuamente.

**Para obter isolamento:** elimine a ligação antiga em **Painel → Fornecedores** e
volte a importá-la utilizando qualquer um dos fluxos de importação suportados. Todas as ligações recém-criadas
receberão automaticamente o seu próprio registo de cliente.

---

## Adicionar duas contas Kiro lado a lado

### Pré-requisitos

- OmniRoute v3.8.0 ou posterior.
- Uma conta Kiro funcional (e-mail + palavra-passe ou início de sessão com Google ou GitHub).
- Opcionalmente, uma segunda conta Kiro.

### Passo 1: importar a primeira conta

1. Abra **Painel → Fornecedores → Adicionar fornecedor → Kiro**.
2. Escolha uma das seguintes opções:
   - **Importar token** — cole um token de atualização que comece por `aorAAAAAG`.
   - **Chave de API** — cole uma chave de API Kiro / CodeWhisperer de longa duração.
   - **Início de sessão com Google / GitHub** — conclua o fluxo OAuth no navegador.
   - **Importação automática** — clique no botão; o OmniRoute lê as credenciais da
     base de dados local do kiro-cli ou de `~/.aws/sso/cache`.
3. A ligação é guardada. Os fluxos de token de atualização registam automaticamente um cliente
   OIDC dedicado. Os fluxos de chave de API validam a chave junto da AWS e não armazenam um token de atualização.

### Passo 2: importar a segunda conta

Repita o passo 1 para a segunda conta. Como cada importação cria um registo de cliente
OIDC separado, as duas ligações ficam totalmente isoladas.

### Passo 3: verificar se ambas as ligações estão ativas

1. **Painel → Fornecedores** — ambas as ligações Kiro deverão apresentar o estado **Ativo**.
2. **Painel → Estado de funcionamento** — ambas as ligações deverão passar a respetiva verificação do estado do token.

### Passo 4: utilizar uma combinação para encaminhar entre contas

Crie uma combinação com ambas as ligações como destinos para distribuir a carga ou alternar para a ligação de contingência:

```
kiro/kiro-dev → kiro/kiro-pro
```

Consulte [FEATURES.md](./FEATURES.md) e a documentação de encaminhamento para obter informações sobre a configuração de combinações.

---

## Utilizadores empresariais / IDC

Para contas do AWS IAM Identity Center (IDC), utilize o fluxo de **código de dispositivo do AWS Builder ID / IDC**
em **Painel → Fornecedores → Kiro → Código de dispositivo**. O fluxo de código de dispositivo sempre esteve
totalmente isolado. Não é necessário voltar a importar estas ligações.

Os utilizadores empresariais que operam numa região AWS que não seja a predefinida podem especificar a região ao
importar através da API de importação de tokens:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

O campo `region` assume `us-east-1` por predefinição quando é omitido.

---

## Fluxo de importação de chaves de API

A autenticação por chave de API destina-se a credenciais bearer de longa duração do Kiro / AWS CodeWhisperer. Esta
não utiliza a atualização OAuth, evitando assim a invalidação de sessões OIDC partilhadas.

### Painel

1. Abra **Painel -> Fornecedores -> Kiro**.
2. Selecione **Chave de API**.
3. Cole a chave de API e, opcionalmente, a região AWS (`us-east-1` por predefinição).
4. O OmniRoute valida a chave e guarda a ligação.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Contrato interno

A rota da API valida a chave ao chamar `KiroService.validateApiKey()`, que
utiliza `ListAvailableProfiles` no endpoint do CodeWhisperer/Amazon Q correspondente
à região e determina um `profileArn`.

A ligação guardada utiliza:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Durante a execução, `KiroExecutor.buildHeaders()` envia a chave como
`Authorization: Bearer <key>` e adiciona `tokentype: API_KEY`. As chamadas de quota/perfil
utilizam o mesmo marcador para que a AWS trate o bearer como uma chave de API de longa duração, em vez de
um token de acesso OIDC ou social.

---

## Expiração do cliente OIDC

Os clientes públicos do AWS SSO OIDC expiram normalmente após 90 dias
(`clientSecretExpiresAt`). O OmniRoute armazena este carimbo de data/hora em `providerSpecificData`
para fins de observabilidade. Se uma ligação deixar de ser atualizada após ~90 dias, volte a
importar a ligação para obter um novo registo de cliente OIDC. O novo registo automático após
a expiração está registado como uma melhoria futura.

As ligações por chave de API não têm expiração de cliente OIDC, porque não são atualizadas
através do AWS SSO OIDC.

---

## Resolução de problemas

### A segunda conta continua a terminar sessão

- Verifique ambas as ligações em **Painel → Fornecedores** e confirme que cada uma apresenta um
  `clientId` não nulo no respetivo JSON em bruto (visível através do ícone de informação). Se faltar
  o `clientId` em qualquer uma das ligações, esta foi importada antes da v3.8.0 — volte a importá-la.

### A importação falha com "Falha na validação do token"

- Certifique-se de que o token de atualização começa por `aorAAAAAG`.
- Certifique-se de que o OmniRoute consegue aceder a `https://oidc.us-east-1.amazonaws.com` (ou à
  região configurada). Se estiver atrás de um proxy empresarial, configure um proxy ao nível do fornecedor em
  **Painel → Definições → Proxies**.

### A importação da chave de API falha

- Confirme que a chave é uma chave de API do Kiro / CodeWhisperer, e não um token de atualização.
- Confirme que a região AWS corresponde à chave/conta. `us-east-1` é a predefinição.
- A chave tem de conseguir chamar `ListAvailableProfiles`; caso contrário, o OmniRoute não consegue
  determinar o `profileArn` necessário.

Para outros problemas, consulte o ficheiro principal [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
