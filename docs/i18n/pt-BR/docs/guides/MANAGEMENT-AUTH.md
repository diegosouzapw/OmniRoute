# Management Authentication (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute possui **quatro famílias de credenciais** que podem autorizar rotas de gerenciamento.
Elas não são intercambiáveis. Chaves de API de inferência (`sk-…`) **não** gerenciam o
servidor a menos que lhes tenha sido explicitamente concedido o escopo `manage` ou `admin`.

Implementação canônica: `src/lib/api/requireManagementAuth.ts`.

| Credencial                    | Formato típico                             | Criado onde                                                 | Uso pretendido                    | Capacidade de gerenciamento                                                                         |
| ----------------------------- | ------------------------------------------ | ----------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------- |
| Sessão JWT do Dashboard       | `auth_token` cookie                        | Login do Dashboard                                          | Interface do navegador            | Gerenciamento completo do dashboard, sujeito a regras de CSRF, localidade e rotas sempre protegidas |
| Token de ID de máquina da CLI | interno / local                            | Inicialização da CLI (`omniroute` na mesma máquina)         | CLI local                         | Apenas gerenciamento local                                                                          |
| Token de Acesso com Escopo    | `oma_live_…`                               | **Configurações → Tokens de Acesso** ou `omniroute connect` | CLI remota e API de gerenciamento | Deve satisfazer o escopo `read`, `write` ou `admin` exigido pela rota                               |
| Chave de API de Inferência    | `sk-…` (e outros prefixos de chave de API) | **Gerenciador de API / Chaves de API**                      | Inferência `/v1/*`                | **Nenhuma** a menos que os metadados da chave incluam `manage` ou `admin`                           |

As credenciais `oma_` são credenciais de gerenciamento/CLI. Elas **não** são chaves de API de inferência.

Se a autenticação por login/chave de API estiver desabilitada para o servidor, algumas rotas de gerenciamento podem aceitar chamadas não autenticadas. Rotas apenas locais e sempre protegidas ainda aplicam suas próprias regras. Apresentar uma dessas credenciais não é, portanto, universalmente obrigatório, e possuir uma não é universalmente suficiente sem o escopo e a localidade de rota exigidos.

Relacionado: [Modo Remoto](./REMOTE-MODE.md) (como `oma_live_…` é cunhado para uma CLI remota).

---

## Matrizes de escopo

Os escopos de gerenciamento de chave de API e os escopos de token de acesso são vocabulários diferentes.
Os escopos da ferramenta MCP são um terceiro vocabulário, verificado com `scopeMatches` em vez de
qualquer uma das funções nas tabelas abaixo. Lado a lado:
[Três namespaces de escopo](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Escopos de Token de Acesso (`oma_live_…`)

| Escopo  | Operações típicas                                                           |
| ------- | --------------------------------------------------------------------------- |
| `read`  | GETs de lista/status que o token tem permissão para ver                     |
| `write` | Mutações (criar/atualizar/excluir) abaixo de admin                          |
| `admin` | CLI remota completa / token de conexão (padrões de bootstrap de senha aqui) |

Um token com `read` não pode chamar uma rota `write`. Formato da mensagem em tempo de execução:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Escopos de gerenciamento de chave de API

| Escopo   | Significado                                                                            |
| -------- | -------------------------------------------------------------------------------------- |
| (nenhum) | Apenas inferência. As rotas de gerenciamento retornam 403.                             |
| `manage` | API de gerenciamento (mesmo gate que o branch de chave de API `requireManagementAuth`) |
| `admin`  | Também satisfaz `hasManageScope` (tratado como capaz de gerenciamento)                 |

Habilite `manage` na chave na UI de Chaves de API / Gerenciador de API. Não reutilize uma
chave de cliente de chat para automação, a menos que você tenha concedido deliberadamente esse escopo.

---

## Como criar e revogar

### Sessão JWT do dashboard

1. Abra `/login` e entre com a senha de gerenciamento (`INITIAL_PASSWORD` na primeira inicialização).
2. O cookie `auth_token` é HttpOnly. O dashboard do navegador o utiliza automaticamente.
3. Saia por meio de `/api/auth/logout`. Não há um segredo de longa duração para copiar.

### Token de machine-id da CLI

1. Execute `omniroute` no **mesmo host** que o servidor (loopback).
2. A CLI inicializa um token de machine-id em `~/.omniroute/` (chmod 600).
3. Isso **não** funciona em outra máquina. Use um Access Token para a CLI remota.

### Access Token com escopo (`oma_live_…`)

1. Dashboard: **Configurações → Access Tokens** → criar (nome + escopo). **O segredo é exibido uma única vez.**
2. Ou pela CLI: `omniroute connect <host>` (senha → token). Consulte [Modo Remoto](./REMOTE-MODE.md).
3. Cabeçalho: `Authorization: Bearer oma_live_…`
4. Revogue-o na mesma página de Access Tokens (ou exclua o contexto da CLI).
5. O servidor armazena apenas um hash. Trate o texto simples como uma senha.

### Chave de API com escopo de gerenciamento

1. Dashboard: **API Manager / API Keys** → crie ou edite uma chave → ative `manage` (ou `admin`).
2. Cabeçalho: `Authorization: Bearer sk-…` (o prefixo real da chave).
3. Revogue ou remova `manage` na mesma interface.
4. Para aplicar o menor privilégio em automações que não usam a CLI: prefira um Access Token com `read` para tarefas somente GET; use `manage` em uma chave de API apenas quando o cliente também precisar se comunicar com `/v1` e com o gerenciamento.

---

## Formato do cabeçalho

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Não coloque credenciais de gerenciamento no caminho da URL nem na string de consulta. A autenticação de gerenciamento deve ser fornecida somente por cabeçalho/cookie.

---

## Exemplos para copiar e colar

Somente leitura (listar provedores). Use um Access Token `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modificação (criar uma conexão de provedor). Use um Access Token `write`/`admin` ou uma chave de API com escopo `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferência (não gerenciamento). Chave de API comum, sem necessidade de `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Erros de tempo de execução atuais (não exiba segredos)

| Situação                                                 | Status típico | Mensagem (sanitizada)                                                                 |
| :------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------ |
| Nenhuma credencial                                       | 401           | `Authentication required`                                                             |
| `oma_live_…` inválido/expirado                           | 401           | `Invalid or expired access token`                                                     |
| Chave de API válida sem `manage`/`admin`                 | 403           | `A chave de API não possui o escopo 'manage'. Habilite-o no painel de Chaves de API.` |
| Chave de API comum inválida em uma rota de gerenciamento | 403           | `Invalid management token`                                                            |
| Escopo do Token de Acesso muito baixo                    | 403           | `O escopo do token de acesso '<have>' é insuficiente; '<need>' é necessário.`         |

"Invalid management token" significa que o portador **não** foi aceito como uma credencial de gerenciamento. Isso **não** informa qual família gerar. Use a tabela acima: chaves de inferência precisam do escopo `manage`; a CLI remota precisa de `oma_live_…`; o painel usa o cookie de sessão.

---

## Escolha recomendada de privilégio mínimo

| Chamador                                               | Uso                                               |
| :----------------------------------------------------- | :------------------------------------------------ |
| Navegador                                              | Sessão do painel                                  |
| CLI no host do servidor                                | Token de máquina                                  |
| CLI em um laptop se comunicando com um servidor remoto | `oma_live_…` de `omniroute connect`               |
| CI / scripts (somente gerenciamento)                   | `oma_live_…` com o menor escopo que funciona      |
| CI que deve chamar `/v1` e `/api`                      | Chave de API com `manage` **ou** duas credenciais |
