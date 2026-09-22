# CLI Machine-ID Token (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Visão geral

Os comandos da CLI do OmniRoute autenticam-se junto da API de gestão local utilizando um token
`HMAC-SHA256(machine-id, salt)` enviado através do cabeçalho de pedido
`x-omniroute-cli-token`.

Isto permite que os subcomandos da CLI (`omniroute status`, `omniroute providers`, etc.)
chamem endpoints de gestão sem exigir que o utilizador forneça um JWT ou uma
palavra-passe em cada invocação.

## Como funciona

1. `getMachineTokenSync()` lê o ID de hardware da máquina através de `node-machine-id`
   (em caso de falha, recorre a uma cadeia de caracteres vazia, desativando a autenticação da CLI).
2. Calcula `HMAC-SHA256(machine_id, salt)` e devolve o resumo hexadecimal completo de
   64 caracteres — um token determinístico e não reversível associado a esta máquina.
3. A CLI envia o token como `x-omniroute-cli-token` apenas quando o destino
   resolvido é um URL de loopback explícito (`localhost`, `127.0.0.0/8` ou
   IPv6 de loopback). Os pedidos que transportam o token utilizam `redirect: error`, para que um
   redirecionamento local não possa reencaminhá-lo para outra origem. Os contextos remotos utilizam
   tokens de acesso com âmbito definido. Se a derivação não estiver disponível, a CLI omite o cabeçalho
   e `omniroute doctor` comunica a falha, em vez de tratar um token vazio
   como válido.
4. O servidor (`src/server/authz/policies/management.ts`) volta a calcular o
   token esperado com o mesmo salt e compara-o através de `timingSafeEqual` para
   impedir a extração baseada em temporização.

## Propriedades de segurança

| Propriedade                           | Detalhe                                                                                                                                                                                                                                  |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Apenas loopback**                   | Aceite apenas quando a marca de localidade do par de confiança do servidor (derivada do endereço real do par TCP) indica loopback. O cabeçalho `Host`, controlado pelo cliente, nunca é considerado fiável para determinar a localidade. |
| **Comparação em tempo constante**     | `crypto.timingSafeEqual` impede ataques de temporização.                                                                                                                                                                                 |
| **Não reversível**                    | O resultado do HMAC não permite recuperar o ID da máquina.                                                                                                                                                                               |
| **Sem contornar a proteção `always`** | `isAlwaysProtectedPath()` é avaliada antes da verificação do token da CLI. `/api/shutdown` e `/api/settings/database` exigem sempre JWT.                                                                                                 |
| **Não exportável**                    | O token nunca é gravado no disco nem registado em logs.                                                                                                                                                                                  |

## Salt predefinido (aleatório por instalação)

Quando `OMNIROUTE_CLI_SALT` não está definido, o salt é uma cadeia hexadecimal aleatória de
64 caracteres, gerada uma única vez e persistida em `<DATA_DIR>/cli-token-salt.json` (modo `0600`) —
e não o literal `omniroute-cli-auth-v1` incluído no código-fonte. Tanto `getActiveSalt()` em
`src/lib/machineToken.ts` como a respetiva implementação equivalente em `bin/cli/utils/cliToken.mjs` leem o
mesmo ficheiro, pelo que o servidor e cada invocação da CLI nesta instalação convergem para o
mesmo valor; o literal incluído no código-fonte é utilizado apenas como último recurso quando ainda não
é possível estabelecer um salt persistido ou proveniente do ambiente (por exemplo, numa instalação nova
apenas da CLI, antes de o servidor ter sido executado pela primeira vez). Isto corrige uma vulnerabilidade do antigo
valor literal predefinido fixo: `/etc/machine-id` é habitualmente legível por todos os utilizadores, pelo que qualquer utilizador local poderia,
caso contrário, derivar o mesmo token para todas as instalações que nunca tivessem definido
`OMNIROUTE_CLI_SALT`.

## Rotação do salt

Defina `OMNIROUTE_CLI_SALT` para rodar o token derivado sem alterações ao código — esta
variável tem sempre prioridade sobre o salt persistente por instalação. Após a rotação,
todos os processos da CLI nesta máquina utilizarão automaticamente o novo token. É útil
após uma fuga da lista de processos que possa ter exposto o valor derivado anterior.

```bash
# Rotação persistente (adicionar ao perfil da shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Verificar se o novo token está a ser utilizado
omniroute status
```

## Formato legado (SHA-256, 32 caracteres) — ainda aceite

Antes do formato HMAC acima, a CLI derivava o respetivo token como
`SHA-256(machineId + salt).hex[0..32]` (um prefixo de 32 caracteres) em
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` em `src/lib/machineToken.ts`).

Para efeitos de retrocompatibilidade, o servidor aceita **ambos** os formatos: o
verificador constrói `expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]`
e compara o cabeçalho recebido com cada um através de `timingSafeEqual`
(`src/server/authz/policies/management.ts` e `src/lib/middleware/cliTokenAuth.ts`).
Assim, um token é válido se corresponder **ou** ao resumo HMAC de 64 caracteres ou ao
prefixo SHA-256 legado de 32 caracteres.

**Desativação:** defina `OMNIROUTE_DISABLE_CLI_TOKEN=true` (no ambiente ou em `.env`)
para desativar totalmente o mecanismo de tokens da CLI; nesse caso, todo o acesso
requer uma chave de API explícita. Em sistemas com múltiplos utilizadores, isto é
recomendado, uma vez que `machine-id` é específico do dispositivo (não do utilizador)
e outro utilizador no mesmo sistema poderá calcular o mesmo token.

## Ficheiros

| Ficheiro                                  | Finalidade                                              |
| ----------------------------------------- | ------------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Derivação do token (`getMachineTokenSync`)              |
| `bin/cli/utils/cliToken.mjs`              | Implementação equivalente da derivação na CLI           |
| `<DATA_DIR>/cli-token-salt.json`          | Salt aleatório persistente por instalação               |
| `src/server/authz/headers.ts`             | Constante `CLI_TOKEN_HEADER`                            |
| `src/server/authz/policies/management.ts` | Verificação no lado do servidor                         |
| `src/server/authz/routeGuard.ts`          | Verificação do anfitrião de loopback (`isLoopbackHost`) |

## Consulte também

- `docs/security/ROUTE_GUARD_TIERS.md` — níveis de proteção de rotas
- `docs/architecture/AUTHZ_GUIDE.md` — fluxo completo de autorização
