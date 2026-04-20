# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Esta guía documenta el estándar de oro de la infraestructura de red para proteger**OmniRoute**y exponer de forma segura su aplicación a Internet,**sin abrir ningún puerto (Zero Inbound)**.## What was done on your VM?

Habilitamos OmniRoute en modo**Puerto dividido**a través de PM2:

-**Puerto `20128`:**Ejecuta**solo la API**`/v1`. -**Puerto `20129`:**Ejecuta**solo el Panel administrativo**.

Además, el servicio interno requiere `REQUIRE_API_KEY=true`, lo que significa que ningún agente puede consumir los puntos finales API sin enviar un "Token portador" legítimo generado en la pestaña Claves API del Panel.

Esto nos permite crear dos reglas de red completamente independientes. Aquí es donde entra en juego el**Túnel Cloudflare (cloudflared)**.---

## 1. How to Create the Tunnel in Cloudflare

La utilidad `cloudflared` ya está instalada en su máquina. Sigue estos pasos en la nube:

1. Acceda a su panel de**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. En el menú de la izquierda, vaya a**Redes > Túneles**.
3. Haga clic en**Agregar un túnel**, elija**Cloudflared**y asígnele el nombre "OmniRoute-VM".
4. Generará un comando en la pantalla llamado "Instalar y ejecutar un conector".**Solo necesitas copiar el Token (la cadena larga después de `--token`)**.
5. Inicie sesión vía SSH en su máquina virtual (o Terminal Proxmox) y ejecute: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Aún en la pantalla del Túnel recién creada, vaya a la pestaña**Nombres de host públicos**y agregue las**dos**rutas, aprovechando la separación que hicimos:### Route 1: Secure API (Limited)

-**Subdominio:**`api` -**Dominio:**`yourglobal.com` (elige tu dominio real) -**Tipo de servicio:**`HTTP` -**URL:**`127.0.0.1:20128` _(Puerto API interno)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdominio:**`omniroute` o `panel` -**Dominio:**`tuglobal.com` -**Tipo de servicio:**`HTTP` -**URL:**`127.0.0.1:20129` _(Aplicación interna/puerto visual)_

En este punto, la conectividad "física" está resuelta. Ahora protejámoslo de verdad.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Ninguna contraseña local protege mejor su panel que eliminar por completo el acceso a él desde Internet.

1. En el panel de Zero Trust, vaya a**Acceso > Aplicaciones > Agregar una aplicación**.
2. Seleccione**Autohospedado**.
3. En**Nombre de la aplicación**, ingrese `OmniRoute Panel`.
4. En**Dominio de aplicación**, ingresa `omniroute.yourglobal.com` (El mismo que usaste en la "Ruta 2").
5. Haga clic en**Siguiente**.
6. En**Acción de regla**, elija "Permitir". Para el nombre de la regla, ingrese "Solo administrador".
7. En**Incluir**, en el menú desplegable "Selector", elija "Correos electrónicos" y escriba su correo electrónico, por ejemplo, "admin@spgeo.com.br".
8. Guardar ("Agregar aplicación").

> **Qué hizo esto:**Si intenta abrir `omniroute.yourglobal.com`, ¡ya no llega a su aplicación OmniRoute! Aterriza en una elegante pantalla de Cloudflare que le pide que ingrese su correo electrónico. Solo si usted (o el correo electrónico que ingresó) se escribe allí, recibirá un código temporal de 6 dígitos en Outlook/Gmail que desbloquea el túnel al puerto "20129".---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

El Zero Trust Dashboard no se aplica a la ruta API (`api.yourglobal.com`), porque es un acceso programático a través de herramientas automatizadas (agentes) sin navegador. Para ello utilizaremos el Firewall principal (WAF) de Cloudflare.

1. Acceda al**Panel de control normal de Cloudflare**(dash.cloudflare.com) y vaya a su dominio.
2. En el menú de la izquierda, vaya a**Seguridad > WAF > Reglas de limitación de velocidad**.
3. Haga clic en**Crear regla**. 4.**Nombre:**`OmniRoute API Anti-Abuse` 5.**Si las solicitudes entrantes coinciden...**
   - Elija el campo: `Nombre de host`
   - Operador: `igual`
   - Valor: `api.yourglobal.com`
4. En**Con las mismas características:**Mantener `IP`.
5. Para los límites (Limit): -**Cuando las solicitudes exceden:**`50` -**Periodo:**`1 minuto`
6. Al final, en**Acción**: `Bloquear` y decide si el bloqueo dura 1 minuto o 1 hora. 9.**Implementar**.

> **Qué hizo esto:**Nadie puede enviar más de 50 solicitudes en un período de 60 segundos a la URL de su API. Dado que ejecuta varios agentes y el consumo detrás de ellos ya alcanza los límites de velocidad y rastrea los tokens, esta es solo una medida en la capa perimetral de Internet que protege su instancia local contra caídas debido al estrés térmico incluso antes de que el tráfico baje por el túnel.---

## Finalization

1. Su VM**no tiene puertos expuestos**en `/etc/ufw`.
2. OmniRoute solo habla HTTPS saliente ("cloudflared") y no recibe TCP directo del mundo.
3. Sus solicitudes a OpenAI están ofuscadas porque las configuramos globalmente para pasar a través de un proxy SOCKS5 (a la nube no le importa SOCKS5 porque es entrante).
4. Su panel web tiene autenticación de dos factores con correo electrónico.
5. Cloudflare tiene una velocidad limitada en el borde de su API y solo realiza el tráfico de tokens de portador.
