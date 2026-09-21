# Zed IDE Integration in Docker Environments (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Quando o OmniRoute é executado dentro do Docker, o fluxo padrão "Importar do Porta-chaves do Zed" falha
porque o contentor não consegue aceder ao daemon do porta-chaves do sistema operativo anfitrião (`libsecret` no Linux,
Porta-chaves no macOS, Gestor de Credenciais no Windows) e os diretórios de configuração do Zed no
sistema de ficheiros anfitrião não estão visíveis dentro do contentor por predefinição.

## Por que motivo a importação do porta-chaves falha no Docker

Ocorrem dois problemas impeditivos dentro de um contentor:

1. **Isolamento do sistema de ficheiros** — `isZedInstalled()` procura `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) ou o equivalente no Windows. Estes caminhos
   encontram-se no anfitrião e não estão disponíveis, a menos que sejam explicitamente montados como volumes.
2. **Isolamento de IPC** — Mesmo quando o diretório de configuração está montado, o módulo nativo
   `keytar` comunica com o serviço do porta-chaves do sistema operativo através de um socket Unix ou de uma sessão D-Bus.
   Nenhum deles é encaminhado para o contentor por predefinição, pelo que as leituras de credenciais falham sempre.

O OmniRoute deteta o ambiente Docker através de duas heurísticas:

- Presença de `/.dockerenv` (escrito pelo daemon do Docker ao iniciar o contentor).
- A cadeia `docker` presente em `/proc/1/cgroup` (cgroup v1 do Linux).

Quando uma destas heurísticas é acionada, a rota de importação devolve HTTP 422 com
`zedDockerEnvironment: true` e uma mensagem que indica que deve utilizar o separador Importação Manual de Token.

## Utilizar o separador Importação Manual de Token

1. Abra **Painel → Fornecedores → Zed**.
2. O painel **Importação Manual de Token** aparece por baixo do cartão de importação do porta-chaves. Quando
   o OmniRoute deteta o Docker, este painel é expandido automaticamente após a primeira tentativa falhada
   de importação do porta-chaves.
3. Selecione o fornecedor na lista pendente (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter ou DeepSeek).
4. Cole a chave de API no campo de palavra-passe.
5. Clique em **Importar**.

A chave é guardada como uma nova ligação de fornecedor com o nome
`Zed Manual Import (<provider>)`.

## Onde o Zed armazena as chaves de API no anfitrião

O Zed armazena as chaves dos fornecedores de IA no porta-chaves do sistema operativo, com nomes de serviço como
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, etc. Para as obter para importação
manual, consulte:

**Linux**

```
~/.config/zed/settings.json
```

A secção `language_models` contém as configurações dos fornecedores. As chaves guardadas no
porta-chaves através da interface do Zed não se encontram em texto simples no `settings.json`; obtenha-as através
de um visualizador de porta-chaves, como o GNOME Keyring / Seahorse, ou executando:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

As entradas do porta-chaves podem ser encontradas na aplicação **Keychain Access.app**, pesquisando por `zed`.

## Opção de montagem de volume (Avançado)

Opcionalmente, pode montar o diretório de configuração do Zed no contentor em modo só de leitura.
Isto não resolve o problema do porta-chaves, mas poderá ser útil para futuras funcionalidades que leiam
valores não confidenciais da configuração do Zed (por exemplo, preferências de modelos).

```yaml
# Excerto de docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Anfitrião Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Anfitrião macOS (remova o comentário desta linha em alternativa)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Futuro: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Nota: a substituição através de uma variável de ambiente `ZED_CONFIG_PATH` ainda não está implementada. Este
excerto é fornecido como referência para quando essa funcionalidade for adicionada.

## API de importação manual

O endpoint de importação manual também pode ser chamado diretamente:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "A minha chave OpenAI do Zed"   // opcional
}
```

Em caso de sucesso, devolve:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Resolução de problemas

| Sintoma                                    | Causa                                              | Solução                                               |
| ------------------------------------------ | -------------------------------------------------- | ----------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`         | Execução dentro do Docker                          | Utilize o separador Importação Manual de Token        |
| 404 + `zedInstalled: false`                | O Zed não está instalado no anfitrião              | Instale o Zed ou utilize a importação manual          |
| 403 + acesso ao porta-chaves negado        | O sistema operativo negou o acesso ao porta-chaves | Conceda permissão na solicitação do sistema operativo |
| 404 + serviço do porta-chaves indisponível | `libsecret` em falta no Linux                      | Instale `libsecret-1-dev`                             |
