# Zed IDE Integration in Docker Environments (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Quando o OmniRoute é executado dentro do Docker, o fluxo padrão "Importar do Chaveiro do Zed" falha
porque o contêiner não consegue acessar o daemon do chaveiro do sistema operacional host (`libsecret` no Linux,
Keychain no macOS, Credential Manager no Windows), e os diretórios de configuração do Zed no
sistema de arquivos do host não ficam visíveis dentro do contêiner por padrão.

## Por que a importação do chaveiro falha no Docker

Dois problemas impeditivos ocorrem dentro de um contêiner:

1. **Isolamento do sistema de arquivos** — `isZedInstalled()` procura por `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) ou o equivalente no Windows. Esses caminhos
   ficam no host e não estão disponíveis, a menos que sejam explicitamente montados como volumes.
2. **Isolamento de IPC** — Mesmo quando o diretório de configuração está montado, o módulo nativo
   `keytar` se comunica com o serviço de chaveiro do sistema operacional por meio de um soquete Unix ou de uma sessão D-Bus.
   Nenhum deles é conectado ao contêiner por padrão, portanto as leituras de credenciais sempre falham.

O OmniRoute detecta o ambiente Docker por meio de duas heurísticas:

- Presença de `/.dockerenv` (gravado pelo daemon do Docker na inicialização do contêiner).
- A string `docker` presente em `/proc/1/cgroup` (cgroup v1 do Linux).

Quando qualquer uma das heurísticas é acionada, a rota de importação retorna HTTP 422 com
`zedDockerEnvironment: true` e uma mensagem direcionando você para a guia Importação Manual de Token.

## Como usar a guia Importação Manual de Token

1. Abra **Painel → Provedores → Zed**.
2. O painel **Importação Manual de Token** aparece abaixo do cartão de importação do chaveiro. Quando
   o OmniRoute detecta o Docker, esse painel é expandido automaticamente após a primeira tentativa
   malsucedida de importação do chaveiro.
3. Selecione o provedor no menu suspenso (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter ou DeepSeek).
4. Cole a chave da API no campo de senha.
5. Clique em **Importar**.

A chave é salva como uma nova conexão de provedor com o nome
`Zed Manual Import (<provider>)`.

## Onde o Zed armazena as chaves de API no host

O Zed armazena as chaves de provedores de IA no chaveiro do sistema operacional, sob nomes de serviço como
`zed-openai`, `ai.zed.openai`, `zed-anthropic` etc. Para recuperá-las para importação
manual, procure em:

**Linux**

```
~/.config/zed/settings.json
```

A seção `language_models` contém as configurações dos provedores. As chaves salvas no
chaveiro por meio da interface do Zed não ficam em texto simples em `settings.json`; recupere-as por meio
de um visualizador de chaveiro, como GNOME Keyring / Seahorse, ou executando:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

As entradas do chaveiro podem ser encontradas no **Keychain Access.app** pesquisando por `zed`.

## Opção de montagem de volume (avançada)

Opcionalmente, você pode montar o diretório de configuração do Zed no contêiner no modo somente leitura.
Isso não corrige o problema do chaveiro, mas pode ser útil para recursos futuros que leiam
valores não secretos da configuração do Zed (por exemplo, preferências de modelo).

```yaml
# Trecho de docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Host Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Host macOS (remova o comentário desta linha em vez da anterior)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Futuro: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Observação: a substituição por meio de uma variável de ambiente `ZED_CONFIG_PATH` ainda não foi implementada. Este
trecho é fornecido como referência para quando esse recurso for adicionado.

## API de importação manual

O endpoint de importação manual também pode ser chamado diretamente:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // opcional
}
```

Em caso de sucesso, ele retorna:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Solução de problemas

| Sintoma                                | Causa                         | Correção                                 |
| -------------------------------------- | ----------------------------- | ---------------------------------------- |
| 422 + `zedDockerEnvironment: true`     | Execução dentro do Docker     | Use a guia Importação Manual de Token    |
| 404 + `zedInstalled: false`            | Zed não instalado no host     | Instale o Zed ou use a importação manual |
| 403 + acesso ao chaveiro negado        | O SO negou acesso ao chaveiro | Conceda permissão na solicitação do SO   |
| 404 + serviço de chaveiro indisponível | `libsecret` ausente no Linux  | Instale `libsecret-1-dev`                |
