# CLI Machine-ID Token (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Visão geral

Os comandos da CLI do OmniRoute são autenticados na API de gerenciamento local usando um
token `HMAC-SHA256(machine-id, salt)` enviado pelo cabeçalho de requisição
`x-omniroute-cli-token`.

Isso permite que os subcomandos da CLI (`omniroute status`, `omniroute providers` etc.)
chamem endpoints de gerenciamento sem exigir que o usuário forneça um JWT ou uma
senha a cada execução.

## Como funciona

1. `getMachineTokenSync()` lê o ID de hardware da máquina por meio de `node-machine-id`
   (usa uma string vazia em caso de falha, desabilitando a autenticação da CLI).
2. Ele calcula `HMAC-SHA256(machine_id, salt)` e retorna o digest hexadecimal completo
   de 64 caracteres — um token determinístico e não reversível vinculado a esta máquina.
3. A CLI envia o token como `x-omniroute-cli-token` somente quando o destino
   resolvido é uma URL de loopback explícita (`localhost`, `127.0.0.0/8` ou
   IPv6 de loopback). As requisições que contêm o token usam `redirect: error`, para que um
   redirecionamento local não possa encaminhá-lo para outra origem. Contextos remotos usam
   tokens de acesso com escopo. Se a derivação não estiver disponível, a CLI omite o cabeçalho
   e `omniroute doctor` relata a falha, em vez de tratar um token vazio
   como válido.
4. O servidor (`src/server/authz/policies/management.ts`) recalcula o
   token esperado com o mesmo salt e faz a comparação usando `timingSafeEqual` para
   impedir a extração baseada em tempo.

## Propriedades de segurança

| Propriedade                           | Detalhe                                                                                                                                                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Somente loopback**                  | Aceito somente quando a marcação confiável de localidade do par do servidor (derivada do endereço real do par TCP) indica loopback. O cabeçalho `Host`, controlado pelo cliente, nunca é considerado confiável para determinar a localidade. |
| **Comparação em tempo constante**     | `crypto.timingSafeEqual` impede ataques de temporização.                                                                                                                                                                                     |
| **Não reversível**                    | A saída do HMAC não permite recuperar o machine-id.                                                                                                                                                                                          |
| **Sem contornar a proteção `always`** | `isAlwaysProtectedPath()` é avaliada antes da verificação do token da CLI. `/api/shutdown` e `/api/settings/database` sempre exigem JWT.                                                                                                     |
| **Não exportável**                    | O token nunca é gravado em disco nem registrado em logs.                                                                                                                                                                                     |

## Salt padrão (aleatório por instalação)

Quando `OMNIROUTE_CLI_SALT` não está definido, o salt é uma string hexadecimal aleatória
de 64 caracteres, gerada uma única vez e persistida em `<DATA_DIR>/cli-token-salt.json` (modo `0600`) —
e não o literal `omniroute-cli-auth-v1` incluído no código-fonte. Tanto `getActiveSalt()` em
`src/lib/machineToken.ts` quanto seu equivalente em `bin/cli/utils/cliToken.mjs` leem o
mesmo arquivo, de modo que o servidor e cada execução da CLI nesta instalação convergem para o
mesmo valor; o literal incluído no código-fonte é usado apenas como fallback de último recurso quando
ainda não é possível obter um salt persistido ou proveniente do ambiente (por exemplo, em uma nova
instalação somente da CLI antes de o servidor ter sido executado pela primeira vez). Isso corrige uma
fragilidade do antigo valor literal padrão fixo: `/etc/machine-id` normalmente pode ser lido por qualquer
usuário, portanto qualquer usuário local poderia, de outra forma, derivar o mesmo token para todas as
instalações que nunca definiram `OMNIROUTE_CLI_SALT`.

## Rotação do salt

Defina `OMNIROUTE_CLI_SALT` para rotacionar o token derivado sem alterações no código — essa variável sempre tem prioridade sobre o salt persistido por instalação. Após a rotação, todos os processos da CLI nesta máquina usarão o novo token automaticamente. Isso é útil após um vazamento da lista de processos que possa ter exposto o valor derivado anterior.

```bash
# Rotação persistente (adicione ao perfil do shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Verifique se o novo token está em uso
omniroute status
```

## Formato legado (SHA-256, 32 caracteres) — ainda aceito

Antes do formato HMAC acima, a CLI derivava seu token como
`SHA-256(machineId + salt).hex[0..32]` (um prefixo de 32 caracteres) em
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` em `src/lib/machineToken.ts`).

Para manter a compatibilidade com versões anteriores, o servidor aceita **ambos** os formatos: o verificador cria
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` e compara o
cabeçalho recebido com cada um deles usando `timingSafeEqual`
(`src/server/authz/policies/management.ts` e `src/lib/middleware/cliTokenAuth.ts`).
Portanto, um token é válido se corresponder **ou** ao resumo HMAC de 64 caracteres **ou** ao
prefixo SHA-256 legado de 32 caracteres.

**Desativação:** defina `OMNIROUTE_DISABLE_CLI_TOKEN=true` (no ambiente ou em `.env`) para desativar completamente o
mecanismo de token da CLI; nesse caso, todo acesso exigirá uma chave de API explícita. Em hosts com vários usuários,
isso é recomendado, pois `machine-id` é específico por dispositivo (não por usuário), e outro
usuário no mesmo host poderia calcular o mesmo token.

## Arquivos

| Arquivo                                   | Finalidade                                         |
| ----------------------------------------- | -------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Derivação do token (`getMachineTokenSync`)         |
| `bin/cli/utils/cliToken.mjs`              | Implementação equivalente da derivação na CLI      |
| `<DATA_DIR>/cli-token-salt.json`          | Salt aleatório persistido por instalação           |
| `src/server/authz/headers.ts`             | Constante `CLI_TOKEN_HEADER`                       |
| `src/server/authz/policies/management.ts` | Verificação no lado do servidor                    |
| `src/server/authz/routeGuard.ts`          | Verificação de host de loopback (`isLoopbackHost`) |

## Veja também

- `docs/security/ROUTE_GUARD_TIERS.md` — níveis de proteção de rotas
- `docs/architecture/AUTHZ_GUIDE.md` — pipeline completo de autorização
