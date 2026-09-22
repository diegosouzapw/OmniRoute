# Management Authentication (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

O OmniRoute tem **quatro famílias de credenciais** que podem autorizar rotas de gestão.
Não são permutáveis. As chaves da API de inferência (`sk-…`) **não** gerem o
servidor, a menos que lhes tenha sido explicitamente concedido o âmbito `manage` ou `admin`.

Implementação canónica: `src/lib/api/requireManagementAuth.ts`.

| Credencial                    | Formato típico                              | Onde é criada                                            | Utilização prevista        | Capacidade de gestão                                                                               |
| ----------------------------- | ------------------------------------------- | -------------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------- |
| Sessão JWT do painel          | cookie `auth_token`                         | Início de sessão no painel                               | Interface Web              | Gestão completa através do painel, sujeita às regras de CSRF, localidade e rotas sempre protegidas |
| Token de ID de máquina da CLI | interno / local                             | Inicialização da CLI (`omniroute` na mesma máquina)      | CLI local                  | Apenas gestão local                                                                                |
| Token de Acesso com âmbito    | `oma_live_…`                                | **Definições → Tokens de Acesso** ou `omniroute connect` | CLI remota e API de gestão | Tem de satisfazer o âmbito `read`, `write` ou `admin` exigido pela rota                            |
| Chave da API de inferência    | `sk-…` (e outros prefixos de chaves da API) | **Gestor da API / Chaves da API**                        | Inferência em `/v1/*`      | **Nenhuma**, a menos que os metadados da chave incluam `manage` ou `admin`                         |

As credenciais `oma_` são credenciais de gestão/CLI. **Não** são chaves da API de inferência.

Se a autenticação por início de sessão/chave da API estiver desativada no servidor, algumas rotas de gestão poderão
aceitar chamadas não autenticadas. As rotas apenas locais e sempre protegidas continuam a aplicar
as suas próprias regras. Por conseguinte, apresentar uma destas credenciais não é universalmente
obrigatório, e possuir uma delas não é universalmente suficiente sem o âmbito e a
localidade da rota exigidos.

Relacionado: [Modo Remoto](./REMOTE-MODE.md) (como é emitido um `oma_live_…` para uma CLI remota).

---

## Matrizes de âmbitos

Estes dois vocabulários de âmbitos são **diferentes**. Não os misture.

### Âmbitos de Tokens de Acesso (`oma_live_…`)

| Âmbito  | Operações típicas                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------- |
| `read`  | Pedidos GET de listagem/estado que o token está autorizado a ver                                          |
| `write` | Alterações (criar/atualizar/eliminar) abaixo do nível de administrador                                    |
| `admin` | CLI remota completa/token de ligação (a inicialização por palavra-passe usa este âmbito por predefinição) |

Um token com `read` não pode chamar uma rota `write`. Formato da mensagem em tempo de execução:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Âmbitos de gestão de chaves da API

| Âmbito   | Significado                                                                                |
| -------- | ------------------------------------------------------------------------------------------ |
| (nenhum) | Apenas inferência. As rotas de gestão devolvem 403.                                        |
| `manage` | API de gestão (a mesma verificação que o ramo de chaves da API de `requireManagementAuth`) |
| `admin`  | Também satisfaz `hasManageScope` (tratado como tendo capacidade de gestão)                 |

Ative `manage` na chave na interface Chaves da API / Gestor da API. Não reutilize uma
chave de cliente de chat para automatização, a menos que tenha concedido deliberadamente esse âmbito.

---

## Como criar e revogar

### Sessão JWT do painel

1. Abra `/login` e inicie sessão com a palavra-passe de gestão (`INITIAL_PASSWORD` no primeiro arranque).
2. O cookie `auth_token` é HttpOnly. O painel no browser utiliza-o automaticamente.
3. Termine a sessão através de `/api/auth/logout`. Não existe nenhum segredo de longa duração para copiar.

### Token de ID de máquina da CLI

1. Execute `omniroute` no **mesmo anfitrião** que o servidor (loopback).
2. A CLI inicializa um token de ID de máquina em `~/.omniroute/` (chmod 600).
3. Isto **não** funciona a partir de outra máquina. Utilize um Token de Acesso para uma CLI remota.

### Token de Acesso com âmbito (`oma_live_…`)

1. Painel: **Definições → Tokens de Acesso** → criar (nome + âmbito). **O segredo é apresentado uma única vez.**
2. Ou através da CLI: `omniroute connect <host>` (palavra-passe → token). Consulte [Modo Remoto](./REMOTE-MODE.md).
3. Cabeçalho: `Authorization: Bearer oma_live_…`
4. Revogue-o na mesma página Tokens de Acesso (ou elimine o contexto da CLI).
5. O servidor armazena apenas um hash. Trate o texto simples como uma palavra-passe.

### Chave da API com âmbito de gestão

1. Painel: **Gestor da API / Chaves da API** → criar ou editar uma chave → ativar `manage` (ou `admin`).
2. Cabeçalho: `Authorization: Bearer sk-…` (o prefixo real da chave).
3. Revogue a chave ou remova `manage` na mesma interface.
4. Para automatização que não utilize a CLI, aplique o princípio do menor privilégio: prefira um Token de Acesso `read` para tarefas apenas com GET; utilize `manage` numa chave da API apenas quando o autor da chamada também precisar de comunicar com `/v1` e com a gestão.

---

## Formato do cabeçalho

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Não coloque credenciais de gestão no caminho do URL nem na cadeia de consulta. A autenticação de
gestão é feita apenas através de cabeçalho/cookie.

---

## Exemplos prontos a copiar e colar

Apenas leitura (listar fornecedores). Utilize um Access Token `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modificação (criar uma ligação a um fornecedor). Utilize um Access Token `write`/`admin` ou uma
chave de API com o âmbito `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferência (não é gestão). Chave de API normal, sem necessidade de `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Erros atuais de execução (não revele segredos)

| Situação                                         | Estado habitual | Mensagem (sanitizada)                                                |
| ------------------------------------------------ | --------------- | -------------------------------------------------------------------- |
| Sem credencial                                   | 401             | `Authentication required`                                            |
| `oma_live_…` inválido/expirado                   | 401             | `Invalid or expired access token`                                    |
| Chave de API válida sem `manage`/`admin`         | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Chave de API normal inválida numa rota de gestão | 403             | `Invalid management token`                                           |
| Âmbito insuficiente do Access Token              | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" significa que o token bearer **não** foi aceite como uma credencial de
gestão. Isto **não** indica que tipo deve criar. Utilize a tabela acima:
as chaves de inferência precisam do âmbito `manage`; a CLI remota precisa de `oma_live_…`; o dashboard
utiliza o cookie de sessão.

---

## Escolha recomendada segundo o princípio do menor privilégio

| Autor da chamada                                    | Utilizar                                          |
| --------------------------------------------------- | ------------------------------------------------- |
| Browser                                             | Sessão do dashboard                               |
| CLI no anfitrião do servidor                        | Token de máquina                                  |
| CLI num portátil a comunicar com um servidor remoto | `oma_live_…` de `omniroute connect`               |
| CI / scripts (apenas gestão)                        | `oma_live_…` com o menor âmbito que funcione      |
| CI que tenha de chamar tanto `/v1` como `/api`      | Chave de API com `manage` **ou** duas credenciais |
