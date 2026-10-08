# Termux Headless Setup (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

O OmniRoute pode ser executado como um servidor headless no Android por meio do Termux. O aplicativo desktop Electron não é compatível com o Termux, mas o painel web e a API compatível com a OpenAI funcionam no navegador local ou em outros dispositivos na mesma rede.

## Pré-requisitos

Instale o Termux pelo F-Droid ou pelas versões publicadas no GitHub. Em seguida, atualize os pacotes e instale as ferramentas de compilação exigidas por dependências nativas, como `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Versão do Node.js:** o OmniRoute requer Node `>=22.22.2 <23 || >=24.0.0 <27` (corresponde a `engines` em `package.json` / `SUPPORTED_NODE_RANGE`). O `nodejs-lts` do Termux normalmente fornece o Node 20 LTS, que **não é mais compatível** — em vez disso, execute `pkg install nodejs` (versão atual) e verifique se `node --version` informa uma versão da linha 22.x/24.x+.

Se a compilação de pacotes nativos falhar, execute novamente o comando `pkg install` acima e tente reinstalar o OmniRoute.

## Instalação

Execute diretamente o pacote publicado mais recente:

```bash
npx -y omniroute@latest
```

Você também pode instalá-lo globalmente:

```bash
npm install -g omniroute
omniroute
```

## Execução

Inicie o OmniRoute no modo de servidor headless:

```bash
omniroute
```

ou:

```bash
npx omniroute
```

O painel fica disponível em:

```text
http://localhost:20128
```

Abra essa URL no navegador do Android. Se você executar clientes dentro do Termux, use o mesmo host e a mesma porta como URL base compatível com a OpenAI.

## Execução em segundo plano

Para um processo simples em segundo plano:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Para interrompê-lo:

```bash
pkill -f omniroute
```

Para iniciar automaticamente após a inicialização do dispositivo, instale o complemento Termux:Boot e crie um script de inicialização:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

A otimização de bateria do Android pode encerrar processos de longa duração em segundo plano. Desative a otimização de bateria para o Termux se o servidor precisar permanecer online.

## Acesso por outros dispositivos

Encontre o endereço IP do telefone na rede WiFi:

```bash
ip addr show wlan0
```

Em seguida, abra o painel em outro dispositivo:

```text
http://PHONE_IP:20128
```

Por exemplo:

```text
http://192.168.1.50:20128
```

Mantenha o telefone e o cliente na mesma rede confiável. Se você expuser o OmniRoute para fora do telefone, habilite chaves de API e a autenticação do painel.

## Diretório de dados

Por padrão, o OmniRoute armazena os dados no diretório inicial do Termux, seguindo o mesmo comportamento de caminho de dados do servidor usado no Linux. Para armazenar o banco de dados em um local específico:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Limitações

- O Electron não é executado no Termux.
- Não há bandeja do sistema nem integração com o desktop.
- Esta configuração funciona somente como servidor: use o painel no navegador.
- Dependências nativas podem precisar de compilação local.
- Dispositivos Android com pouca memória podem precisar de menos solicitações simultâneas.
- Recursos de certificado de sistema/MITM podem exigir alterações no armazenamento de certificados confiáveis do Android fora do Termux.

## Solução de problemas

### Plataforma não compatível: android (todas as solicitações retornam HTTP 500)

**Sintoma:** `omniroute` / `omniroute serve` exibe `✔ OmniRoute is running!`, mas todas as solicitações ao painel ou à API retornam apenas `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` permanece vazio, `APP_LOG_LEVEL=debug` não exibe nada útil e o corpo da resposta contém texto simples (`Internal Server Error`), sem detalhes em JSON.

**Causa:** algumas compilações do Termux/Node informam `process.platform === "android"`. A função `getCacheDirectory()` do Next.js não lida com essa plataforma: ela exige que `~/.cache` (ou um diretório temporário genérico) _já_ exista; caso contrário, ocorre uma falha durante o carregamento do hook de instrumentação com:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Como o hook nunca é carregado, o registro de logs nunca é iniciado — o erro 500 parece completamente impossível de diagnosticar. O OmniRoute cria `~/.cache` (e define `XDG_CACHE_HOME` quando ela não está definida) no ponto de entrada da CLI antes de o Next.js ser iniciado, para que essa verificação seja bem-sucedida no Android/Termux.

**Solução compatível (sem modificar o pacote):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Nas compilações atuais do OmniRoute, a CLI faz isso automaticamente no Android/Termux — uma nova instalação com `npx -y omniroute@latest` / instalação global não deve exigir essa etapa manual. Se o erro continuar aparecendo após a atualização, crie `~/.cache` uma vez conforme mostrado acima e reinicie.

**Não** modifique `dist/server.js` para forçar `process.platform = "linux"`. Esse tipo de modificação no pacote é sobrescrito em toda reinstalação/atualização e é desnecessário quando o diretório de cache existe.

### Erros de compilação do better-sqlite3

Instale o conjunto de ferramentas de compilação do Termux:

```bash
pkg install nodejs python build-essential
```

Em seguida, execute novamente:

```bash
npx -y omniroute@latest
```

### Porta já em uso

Verifique o que está escutando na porta padrão:

```bash
ss -ltnp | grep 20128
```

Interrompa o processo antigo:

```bash
pkill -f omniroute
```

### Não é possível acessar o painel por outro dispositivo

Verifique se os dois dispositivos estão na mesma rede WiFi e teste pelo Termux:

```bash
curl http://localhost:20128
```

Se o acesso local funcionar, mas o acesso pela LAN não, verifique o isolamento de hotspot/WiFi do Android e qualquer perfil de firewall ou VPN no telefone.
