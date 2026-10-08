# Kiro Setup Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Este guia aborda como adicionar contas do Kiro (assistente de programação com IA hospedado na AWS) ao OmniRoute,
com foco na execução simultânea de várias contas sem conflitos de sessão.

---

## Contexto: por que as contas do Kiro podem entrar em conflito

O backend do Kiro usa registros de cliente OIDC do AWS SSO para rastrear sessões ativas.
A restrição crítica: **cada registro de cliente OIDC oferece suporte a apenas uma sessão
ativa por vez**. Quando um segundo dispositivo ou usuário se autentica usando o mesmo
cliente registrado, o backend invalida o token de atualização da primeira conta.

Esse é o mesmo mecanismo que causa problemas ao executar `kiro-cli login` em uma
máquina na qual outra conta do Kiro já está conectada — o novo login revoga o token
da primeira conta.

---

## Como o OmniRoute resolve isso (v3.8.0+)

A partir da v3.8.0, o OmniRoute chama `registerClient()` (AWS SSO OIDC) durante cada
importação de conexão do Kiro. Isso fornece a cada conexão do OmniRoute seu próprio
registro dedicado de cliente OIDC. Como cada registro de cliente é independente, atualizar
ou autenticar novamente uma conta não afeta o token de atualização de nenhuma outra conta.

O isolamento se aplica aos métodos de importação por token de atualização, enquanto a
autenticação por chave de API evita completamente as sessões de atualização OIDC:

| Método de importação                                        | Status de isolamento                                                                                        |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Fluxo de código de dispositivo do AWS Builder ID / IDC      | Isolado desde a introdução do fluxo de código de dispositivo                                                |
| **Importar token** (colagem manual do token de atualização) | Isolado desde a v3.8.0                                                                                      |
| **Login social com Google / GitHub**                        | Isolado desde a v3.8.0                                                                                      |
| **Importação automática** (SQLite do kiro-cli)              | Isolado desde a v3.8.0 (o caminho do SQLite já era isolado; o fallback do cache SSO agora também é isolado) |
| **Chave de API** (chave de longa duração do CodeWhisperer)  | Sem sessão de atualização; a chave é validada e armazenada como uma credencial bearer                       |

---

## Observação sobre a migração de conexões criadas antes da v3.8.0

As conexões importadas antes da v3.8.0 não têm um registro dedicado de cliente OIDC
armazenado em `providerSpecificData`. Essas conexões continuam funcionando, mas usam o
endpoint compartilhado de atualização de autenticação social, o que significa que duas
dessas conexões ainda podem invalidar uma à outra.

**Para obter isolamento:** exclua a conexão antiga em **Painel → Provedores** e
importe-a novamente usando qualquer um dos fluxos de importação compatíveis. Todas as
conexões recém-criadas receberão automaticamente seu próprio registro de cliente.

---

## Como adicionar duas contas do Kiro lado a lado

### Pré-requisitos

- OmniRoute v3.8.0 ou posterior.
- Uma conta funcional do Kiro (e-mail + senha ou login com Google ou GitHub).
- Opcionalmente, uma segunda conta do Kiro.

### Etapa 1: importe a primeira conta

1. Abra **Painel → Provedores → Adicionar provedor → Kiro**.
2. Escolha uma das opções:
   - **Importar token** — cole um token de atualização que comece com `aorAAAAAG`.
   - **Chave de API** — cole uma chave de API de longa duração do Kiro / CodeWhisperer.
   - **Login com Google / GitHub** — conclua o fluxo OAuth no navegador.
   - **Importação automática** — clique no botão; o OmniRoute lê as credenciais do
     banco de dados local do kiro-cli ou de `~/.aws/sso/cache`.
3. A conexão é salva. Os fluxos de token de atualização registram automaticamente um
   cliente OIDC dedicado. Os fluxos de chave de API validam a chave com a AWS e não armazenam um token de atualização.

### Etapa 2: importe a segunda conta

Repita a etapa 1 para a segunda conta. Como cada importação cria um registro de cliente
OIDC separado, as duas conexões ficam totalmente isoladas.

### Etapa 3: verifique se ambas as conexões estão ativas

1. **Painel → Provedores** — ambas as conexões do Kiro devem exibir o status **Ativo**.
2. **Painel → Integridade** — ambas as conexões devem passar na verificação de integridade dos respectivos tokens.

### Etapa 4: use um combo para rotear entre as contas

Crie um combo com ambas as conexões como destinos para balancear a carga ou alternar para a conexão de fallback entre elas:

```
kiro/kiro-dev → kiro/kiro-pro
```

Consulte [FEATURES.md](./FEATURES.md) e a documentação de roteamento para configurar o combo.

---

## Usuários Enterprise / IDC

Para contas do AWS IAM Identity Center (IDC), use o fluxo de **código de dispositivo do AWS Builder ID / IDC**
em **Painel → Provedores → Kiro → Código do dispositivo**. O fluxo de código de dispositivo
sempre foi totalmente isolado. Não é necessário importar novamente essas conexões.

Usuários empresariais que operam em uma região não padrão da AWS podem especificar a região ao
importar por meio da API de importação de token:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

O campo `region` usa `us-east-1` como padrão quando omitido.

---

## Fluxo de importação por chave de API

A autenticação por chave de API destina-se a credenciais de portador de longa duração do Kiro / AWS CodeWhisperer. Ela
não usa a atualização do OAuth, evitando assim a invalidação de sessões OIDC compartilhadas.

### Painel

1. Abra **Painel -> Provedores -> Kiro**.
2. Selecione **Chave de API**.
3. Cole a chave de API e, opcionalmente, a região da AWS (`us-east-1` por padrão).
4. O OmniRoute valida a chave e salva a conexão.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Contrato interno

A rota da API valida a chave chamando `KiroService.validateApiKey()`, que
usa `ListAvailableProfiles` no endpoint do CodeWhisperer/Amazon Q correspondente à região
e resolve um `profileArn`.

A conexão salva usa:

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
`Authorization: Bearer <key>` e adiciona `tokentype: API_KEY`. As chamadas de cota/perfil
usam o mesmo marcador para que a AWS trate o portador como uma chave de API de longa duração, em vez de
um token de acesso OIDC ou social.

---

## Expiração do cliente OIDC

Os clientes públicos OIDC do AWS SSO geralmente expiram após 90 dias
(`clientSecretExpiresAt`). O OmniRoute armazena esse carimbo de data/hora em `providerSpecificData`
para fins de observabilidade. Se uma conexão parar de ser atualizada após cerca de 90 dias, importe
a conexão novamente para obter um novo registro de cliente OIDC. O recadastramento automático após
a expiração está registrado como uma melhoria futura.

As conexões por chave de API não têm expiração do cliente OIDC porque não são atualizadas
por meio do OIDC do AWS SSO.

---

## Solução de problemas

### A segunda conta continua sendo desconectada

- Verifique ambas as conexões em **Painel → Provedores** e confirme se cada uma exibe um
  `clientId` não nulo em seu JSON bruto (visível por meio do ícone de informações). Se alguma das conexões não tiver
  `clientId`, ela foi importada antes da v3.8.0 — importe-a novamente.

### A importação falha com "Falha na validação do token"

- Certifique-se de que o token de atualização comece com `aorAAAAAG`.
- Certifique-se de que o OmniRoute consiga acessar `https://oidc.us-east-1.amazonaws.com` (ou a
  região configurada). Se você estiver atrás de um proxy corporativo, configure um proxy no nível do provedor em
  **Painel → Configurações → Proxies**.

### A importação por chave de API falha

- Confirme se a chave é uma chave de API do Kiro / CodeWhisperer, e não um token de atualização.
- Confirme se a região da AWS corresponde à chave/conta. `us-east-1` é o padrão.
- A chave deve ser capaz de chamar `ListAvailableProfiles`; caso contrário, o OmniRoute não poderá
  resolver o `profileArn` necessário.

Para outros problemas, consulte o arquivo principal [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
