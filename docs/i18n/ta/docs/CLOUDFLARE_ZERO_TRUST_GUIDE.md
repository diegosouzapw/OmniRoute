# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

**OmniRoute**ஐப் பாதுகாக்கவும்,**எந்த போர்ட்களைத் திறக்காமல்,**உங்கள் பயன்பாட்டை இணையத்தில் பாதுகாப்பாக வெளிப்படுத்தவும் நெட்வொர்க் உள்கட்டமைப்பின் தங்கத் தரத்தை இந்த வழிகாட்டி ஆவணப்படுத்துகிறது (Zero Inbound)\*\*.## What was done on your VM?

PM2 வழியாக**Split-Port**முறையில் OmniRoute ஐ இயக்கினோம்:

-**போர்ட் `20128`:**இயங்கும்**API**`/v1` மட்டும். -**போர்ட் `20129`:**இயங்கும்**நிர்வாக டாஷ்போர்டை மட்டும்**.

மேலும், உள் சேவைக்கு `REQUIRE_API_KEY=true` தேவைப்படுகிறது, அதாவது டாஷ்போர்டின் API விசைகள் தாவலில் உருவாக்கப்பட்ட முறையான "Bearer Token" ஐ அனுப்பாமல், API இறுதிப் புள்ளிகளை எந்த முகவராலும் பயன்படுத்த முடியாது.

இது இரண்டு முற்றிலும் சுதந்திரமான பிணைய விதிகளை உருவாக்க அனுமதிக்கிறது. இங்குதான்**Cloudflare Tunnel (Cloudflared)**வருகிறது.---

## 1. How to Create the Tunnel in Cloudflare

உங்கள் கணினியில் `Cloudflared` பயன்பாடு ஏற்கனவே நிறுவப்பட்டுள்ளது. மேகக்கணியில் பின்வரும் படிகளைப் பின்பற்றவும்:

1. உங்கள்**Cloudflare Zero Trust**டாஷ்போர்டை அணுகவும் (one.dash.cloudflare.com).
2. இடதுபுற மெனுவில்,**நெட்வொர்க்குகள் > சுரங்கங்கள்**என்பதற்குச் செல்லவும். 3.**Add a Tunnel**என்பதைக் கிளிக் செய்து,**Cloudflared**என்பதைத் தேர்ந்தெடுத்து, அதற்கு `OmniRoute-VM` என்று பெயரிடவும்.
3. இது திரையில் "Install and run a connector" என்ற கட்டளையை உருவாக்கும்.**நீங்கள் டோக்கனை மட்டும் நகலெடுக்க வேண்டும் (`--டோக்கன்`க்குப் பிறகு நீண்ட சரம்)**.
4. SSH வழியாக உங்கள் மெய்நிகர் கணினியில் (அல்லது Proxmox டெர்மினல்) உள்நுழைந்து செயல்படுத்தவும்: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

புதிதாக உருவாக்கப்பட்ட சுரங்கப்பாதைத் திரையில்,**பொது ஹோஸ்ட்பெயர்கள்**தாவலுக்குச் சென்று,**இரண்டு**வழிகளைச் சேர்த்து, நாங்கள் செய்த பிரிவினையைப் பயன்படுத்திக் கொள்ளுங்கள்:### Route 1: Secure API (Limited)

-**துணை டொமைன்:**`api` -**டொமைன்:**`yourglobal.com` (உங்கள் உண்மையான டொமைனைத் தேர்வு செய்யவும்) -**சேவை வகை:**`HTTP` -**URL:**`127.0.0.1:20128` _(உள் API போர்ட்)_### Route 2: Zero Trust Dashboard (Closed)

-**துணை டொமைன்:**`ஓம்னிரூட்` அல்லது `பேனல்` -**டொமைன்:**`yourglobal.com` -**சேவை வகை:**`HTTP` -**URL:**`127.0.0.1:20129` _(உள் பயன்பாடு/விஷுவல் போர்ட்)_

இந்த கட்டத்தில், "உடல்" இணைப்பு தீர்க்கப்படுகிறது. இப்போது அதை உண்மையாகக் காப்போம்.---

## 3. Shielding the Dashboard with Zero Trust (Access)

திறந்த இணையத்திலிருந்து அணுகலை முழுவதுமாக அகற்றுவதை விட, எந்த உள்ளூர் கடவுச்சொல்லும் உங்கள் டாஷ்போர்டைப் பாதுகாக்காது.

1. ஜீரோ டிரஸ்ட் டாஷ்போர்டில்,**அணுகல் > பயன்பாடுகள் > ஒரு பயன்பாட்டைச் சேர்**என்பதற்குச் செல்லவும். 2.**Self-hosted**என்பதைத் தேர்ந்தெடுக்கவும். 3.**பயன்பாட்டின் பெயர்**இல், `OmniRoute Panel` ஐ உள்ளிடவும். 4.**பயன்பாட்டு டொமைனில்**, `omniroute.yourglobal.com` என்பதை உள்ளிடவும் ("வழி 2" இல் நீங்கள் பயன்படுத்திய அதே டொமைன்). 5.**அடுத்து**கிளிக் செய்யவும். 6.**விதி நடவடிக்கை**இல், `அனுமதி` என்பதைத் தேர்ந்தெடுக்கவும். விதியின் பெயருக்கு, `நிர்வாகம் மட்டும்' என்பதை உள்ளிடவும்.
7.**அடங்கும்**இல், "தேர்வு" கீழ்தோன்றும் கீழ், `மின்னஞ்சல்கள்' என்பதைத் தேர்ந்தெடுத்து உங்கள் மின்னஞ்சலை உள்ளிடவும், எடுத்துக்காட்டாக `admin@spgeo.com.br`.
2. சேமிக்கவும் (`பயன்பாட்டைச் சேர்`).

> **இது என்ன செய்தது:**நீங்கள் `omniroute.yourglobal.com` ஐ திறக்க முயற்சித்தால், அது இனி உங்கள் OmniRoute பயன்பாட்டில் வராது! இது ஒரு நேர்த்தியான Cloudflare திரையில் வந்து உங்கள் மின்னஞ்சலை உள்ளிடுமாறு கேட்கிறது. நீங்கள் (அல்லது நீங்கள் உள்ளிட்ட மின்னஞ்சலை) அங்கு தட்டச்சு செய்தால் மட்டுமே, அவுட்லுக்/ஜிமெயிலில் தற்காலிக 6 இலக்கக் குறியீட்டைப் பெறுவீர்கள், அது சுரங்கப்பாதையை `20129` துறைமுகத்திற்குத் திறக்கும்.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

ஜீரோ டிரஸ்ட் டாஷ்போர்டு API வழிக்கு (`api.yourglobal.com`) பொருந்தாது, ஏனெனில் இது உலாவி இல்லாமல் தானியங்கு கருவிகள் (முகவர்கள்) வழியாக ஒரு நிரல் அணுகல் ஆகும். இதற்கு, Cloudflare இன் முக்கிய ஃபயர்வாலை (WAF) பயன்படுத்துவோம்.

1.**இயல்பான Cloudflare டாஷ்போர்டை**(dash.cloudflare.com) அணுகி உங்கள் டொமைனுக்குச் செல்லவும். 2. இடதுபுற மெனுவில்,**பாதுகாப்பு > WAF > விகிதம் கட்டுப்படுத்தும் விதிகள்**என்பதற்குச் செல்லவும். 3.**விதியை உருவாக்கு**என்பதைக் கிளிக் செய்யவும். 4.**பெயர்:**`OmniRoute API Anti-Abuse` 5.**உள்வரும் கோரிக்கைகள் பொருந்தினால்...**

- புலத்தைத் தேர்ந்தெடுக்கவும்: `ஹோஸ்ட்பெயர்`
- ஆபரேட்டர்: `சமம்`
- மதிப்பு: `api.yourglobal.com`

6. கீழ்**அதே குணாதிசயங்களுடன்:**`IP` ஐ வைத்திருங்கள்.
7. வரம்புகளுக்கு (வரம்பு): -**கோரிக்கைகள் அதிகமாக இருக்கும்போது:**`50` -**காலம்:**`1 நிமிடம்`
8. முடிவில்,**செயல்**: `பிளாக்` என்பதன் கீழ், பிளாக் 1 நிமிடமா அல்லது 1 மணிநேரம் நீடிக்குமா என்பதை முடிவு செய்யுங்கள். 9.**வரிசைப்படுத்து**.

> **இது என்ன செய்தது:**உங்கள் API URL க்கு 60 வினாடிகளில் யாரும் 50 கோரிக்கைகளுக்கு மேல் அனுப்ப முடியாது. நீங்கள் பல ஏஜெண்டுகளை இயக்குவதால், அவற்றின் பின்னால் உள்ள நுகர்வு ஏற்கனவே விகித வரம்புகள் மற்றும் டோக்கன்களைக் கண்காணிப்பதால், இது இன்டர்நெட் எட்ஜ் லேயரில் உள்ள ஒரு நடவடிக்கையாகும், இது போக்குவரத்து சுரங்கப்பாதையில் இறங்குவதற்கு முன்பே வெப்ப அழுத்தத்தின் காரணமாக உங்கள் வளாகத்தில் உள்ள நிகழ்வைப் பாதுகாக்கிறது.---

## Finalization

1. `/etc/ufw` இல் உங்கள் VM**வெளிப்பட்ட போர்ட்கள் இல்லை**.
2. OmniRoute HTTPS வெளிச்செல்லும் (`Cloudflared`) பற்றி மட்டுமே பேசுகிறது மற்றும் உலகத்திலிருந்து நேரடி TCP பெறாது.
3. OpenAIக்கான உங்கள் கோரிக்கைகள் குழப்பமடைந்துள்ளன, ஏனெனில் உலகளவில் அவற்றை SOCKS5 ப்ராக்ஸி வழியாகச் செல்லும்படி நாங்கள் உள்ளமைத்துள்ளோம் (கிளவுட் SOCKS5 பற்றி கவலைப்படவில்லை, ஏனெனில் அது உள்வரும்).
4. உங்கள் இணைய டாஷ்போர்டில் மின்னஞ்சலுடன் 2-காரணி அங்கீகாரம் உள்ளது.
5. உங்கள் API ஆனது Cloudflare மூலம் விளிம்பில் விகிதமாக வரையறுக்கப்பட்டுள்ளது மற்றும் தாங்கி டோக்கன்களை மட்டுமே டிராஃபிக் செய்கிறது.
