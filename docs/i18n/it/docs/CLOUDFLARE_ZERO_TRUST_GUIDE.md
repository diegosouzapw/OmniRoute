# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Questa guida documenta lo standard di riferimento dell'infrastruttura di rete per proteggere**OmniRoute**ed esporre in modo sicuro la tua applicazione su Internet,**senza aprire alcuna porta (Zero Inbound)**.## What was done on your VM?

Abbiamo abilitato OmniRoute in modalità**Split-Port**tramite PM2:

-**Porta `20128`:**Esegue**solo l'API**`/v1`. -**Porta `20129`:**Esegue**solo il dashboard amministrativo**.

Inoltre, il servizio interno richiede `REQUIRE_API_KEY=true`, il che significa che nessun agente può utilizzare gli endpoint API senza inviare un "Bearer Token" legittimo generato nella scheda Chiavi API della Dashboard.

Questo ci permette di creare due regole di rete completamente indipendenti. È qui che entra in gioco il**Cloudflare Tunnel (cloudflared)**.---

## 1. How to Create the Tunnel in Cloudflare

L'utilità `cloudflared` è già installata sul tuo computer. Segui questi passaggi nel cloud:

1. Accedi alla dashboard di**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. Nel menu a sinistra, vai su**Reti > Tunnel**.
3. Fai clic su**Aggiungi un tunnel**, scegli**Cloudflared**e chiamalo `OmniRoute-VM`.
4. Verrà generato un comando sullo schermo chiamato "Installa ed esegui un connettore".**Devi solo copiare il Token (la lunga stringa dopo `--token`)**.
5. Accedi tramite SSH alla tua macchina virtuale (o Terminale Proxmox) ed esegui: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Sempre nella schermata Tunnel appena creata, vai alla scheda**Nomi host pubblici**e aggiungi i**due**percorsi, sfruttando la separazione che abbiamo effettuato:### Route 1: Secure API (Limited)

-**Sottodominio:**`api` -**Dominio:**`yourglobal.com` (scegli il tuo vero dominio) -**Tipo di servizio:**`HTTP` -**URL:**`127.0.0.1:20128` _(Porta API interna)_### Route 2: Zero Trust Dashboard (Closed)

-**Sottodominio:**`omniroute` o `panel` -**Dominio:**"yourglobal.com". -**Tipo di servizio:**`HTTP` -**URL:**`127.0.0.1:20129` _(App interna/porta visiva)_

A questo punto la connettività "Fisica" è risolta. Adesso proteggiamolo davvero.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Nessuna password locale protegge la tua dashboard meglio della rimozione completa dell'accesso ad essa dalla rete Internet aperta.

1. Nella dashboard di Zero Trust, vai su**Accesso > Applicazioni > Aggiungi un'applicazione**.
2. Seleziona**Self-hosted**.
3. In**Nome applicazione**, inserisci "Pannello OmniRoute".
4. In**Dominio applicazione**, inserisci `omniroute.yourglobal.com` (lo stesso utilizzato in "Route 2").
5. Fare clic su**Avanti**.
6. In**Azione regola**, scegli "Consenti". Per il nome della regola, inserisci "Solo amministratore".
7. In**Includi**, nel menu a discesa "Selettore", scegli "E-mail" e digita la tua email, ad esempio "admin@spgeo.com.br".
8. Salva ("Aggiungi applicazione").

> **Che cosa ha comportato:**Se provi ad aprire `omniroute.yourglobal.com`, non verrà più visualizzato sulla tua applicazione OmniRoute! Apparirà su un'elegante schermata Cloudflare chiedendoti di inserire la tua email. Solo se digiti lì te (o l'e-mail che hai inserito), riceverai un codice temporaneo di 6 cifre in Outlook/Gmail che sblocca il tunnel alla porta "20129".---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

La Zero Trust Dashboard non si applica al percorso API (`api.yourglobal.com`), perché si tratta di un accesso programmatico tramite strumenti automatizzati (agenti) senza browser. Per questo utilizzeremo il firewall principale di Cloudflare (WAF).

1. Accedi alla**Normale dashboard di Cloudflare**(dash.cloudflare.com) e vai al tuo dominio.
2. Nel menu a sinistra, vai su**Sicurezza > WAF > Regole di limitazione della velocità**.
3. Fare clic su**Crea regola**. 4.**Nome:**"OmniRoute API Anti-Abuso". 5.**Se le richieste in arrivo corrispondono...**
   - Scegli il campo: "Nome host".
   - Operatore: "uguale".
   - Valore: "api.yourglobal.com".
4. In**Con le stesse caratteristiche:**Mantieni "IP".
5. Per i limiti (Limite): -**Quando le richieste superano:**"50". -**Periodo:**"1 minuto".
6. Alla fine, sotto**Azione**: `Blocca` e decidi se il blocco dura 1 minuto o 1 ora. 9.**Distribuisci**.

> **Che cosa ha fatto:**nessuno può inviare più di 50 richieste in un periodo di 60 secondi al tuo URL API. Poiché esegui più agenti e il consumo dietro di essi raggiunge già i limiti di velocità e tiene traccia dei token, questa è solo una misura a livello Internet Edge che protegge la tua istanza locale dall'interruzione a causa dello stress termico prima ancora che il traffico passi attraverso il tunnel.---

## Finalization

1. La tua VM**non ha porte esposte**in `/etc/ufw`.
2. OmniRoute comunica solo con HTTPS in uscita ("cloudflared") e non riceve TCP diretto dal mondo.
3. Le tue richieste a OpenAI sono offuscate perché le abbiamo configurate a livello globale per passare attraverso un proxy SOCKS5 (il cloud non si preoccupa di SOCKS5 perché arriva in entrata).
4. La tua dashboard web ha l'autenticazione a 2 fattori con e-mail.
5. La tua API è limitata in termini di velocità da Cloudflare e traffica solo con token al portatore.
