# GEMINI.md (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../GEMINI.md) · 🇪🇹 [am](../am/GEMINI.md) · 🇸🇦 [ar](../ar/GEMINI.md) · 🇦🇿 [az](../az/GEMINI.md) · 🇧🇬 [bg](../bg/GEMINI.md) · 🇧🇩 [bn](../bn/GEMINI.md) · 🇧🇦 [bs](../bs/GEMINI.md) · 🇨🇿 [cs](../cs/GEMINI.md) · 🇩🇰 [da](../da/GEMINI.md) · 🇩🇪 [de](../de/GEMINI.md) · 🇬🇷 [el](../el/GEMINI.md) · 🇪🇸 [es](../es/GEMINI.md) · 🇪🇪 [et](../et/GEMINI.md) · 🇮🇷 [fa](../fa/GEMINI.md) · 🇫🇮 [fi](../fi/GEMINI.md) · 🇫🇷 [fr](../fr/GEMINI.md) · 🇮🇪 [ga](../ga/GEMINI.md) · 🇮🇳 [gu](../gu/GEMINI.md) · 🇳🇬 [ha](../ha/GEMINI.md) · 🇮🇱 [he](../he/GEMINI.md) · 🇮🇳 [hi](../hi/GEMINI.md) · 🇭🇷 [hr](../hr/GEMINI.md) · 🇭🇺 [hu](../hu/GEMINI.md) · 🇦🇲 [hy](../hy/GEMINI.md) · 🇮🇩 [id](../id/GEMINI.md) · 🇳🇬 [ig](../ig/GEMINI.md) · 🇮🇹 [it](../it/GEMINI.md) · 🇯🇵 [ja](../ja/GEMINI.md) · 🇬🇪 [ka](../ka/GEMINI.md) · 🇰🇭 [km](../km/GEMINI.md) · 🇮🇳 [kn](../kn/GEMINI.md) · 🇰🇷 [ko](../ko/GEMINI.md) · 🇱🇹 [lt](../lt/GEMINI.md) · 🇱🇻 [lv](../lv/GEMINI.md) · 🇮🇳 [mr](../mr/GEMINI.md) · 🇲🇾 [ms](../ms/GEMINI.md) · 🇲🇹 [mt](../mt/GEMINI.md) · 🇲🇲 [my](../my/GEMINI.md) · 🇳🇵 [ne](../ne/GEMINI.md) · 🇳🇱 [nl](../nl/GEMINI.md) · 🇳🇴 [no](../no/GEMINI.md) · 🇮🇳 [or](../or/GEMINI.md) · 🇮🇳 [pa](../pa/GEMINI.md) · 🇵🇭 [phi](../phi/GEMINI.md) · 🇵🇱 [pl](../pl/GEMINI.md) · 🇵🇹 [pt](../pt/GEMINI.md) · 🇧🇷 [pt-BR](../pt-BR/GEMINI.md) · 🇷🇴 [ro](../ro/GEMINI.md) · 🇷🇺 [ru](../ru/GEMINI.md) · 🇱🇰 [si](../si/GEMINI.md) · 🇸🇰 [sk](../sk/GEMINI.md) · 🇸🇮 [sl](../sl/GEMINI.md) · 🇷🇸 [sr](../sr/GEMINI.md) · 🇸🇪 [sv](../sv/GEMINI.md) · 🇰🇪 [sw](../sw/GEMINI.md) · 🇮🇳 [ta](../ta/GEMINI.md) · 🇮🇳 [te](../te/GEMINI.md) · 🇹🇭 [th](../th/GEMINI.md) · 🇹🇷 [tr](../tr/GEMINI.md) · 🇺🇦 [uk-UA](../uk-UA/GEMINI.md) · 🇵🇰 [ur](../ur/GEMINI.md) · 🇺🇿 [uz](../uz/GEMINI.md) · 🇻🇳 [vi](../vi/GEMINI.md) · 🇳🇬 [yo](../yo/GEMINI.md) · 🇨🇳 [zh-CN](../zh-CN/GEMINI.md) · 🇹🇼 [zh-TW](../zh-TW/GEMINI.md)

---

> **സത്യത്തിന്റെ ഏക ഉറവിടം:** AI അസിസ്റ്റന്റുകൾക്കായുള്ള എല്ലാ പ്രോജക്റ്റ് നിയമങ്ങളും
> [`AGENTS.md`](AGENTS.md)-ലാണ് ഉള്ളത്. എന്തെങ്കിലും മാറ്റം വരുത്തുന്നതിന് മുമ്പ് അത് പൂർണ്ണമായി വായിക്കുക — ഈ ഫയലിൽ മുമ്പ് ഉണ്ടായിരുന്ന 23 കർശന നിയമങ്ങൾ,
> ഗുണനിലവാര പരിശോധനാ ഘട്ടങ്ങൾ, കോഡ് മാനദണ്ഡങ്ങൾ, ഫയൽ-പ്ലേസ്മെന്റ് / repo-root ശുചിത്വ നിയമങ്ങൾ, repository മാപ്പ്,
> ലോക്കൽ ഡെവലപ്മെന്റ് ആക്സസ് കുറിപ്പുകൾ എന്നിവ അതിൽ അടങ്ങിയിരിക്കുന്നു.

Gemini-യ്ക്കു മാത്രമുള്ള കുറിപ്പുകൾ:

- `activate_skill` ടൂൾ വഴിയാണ് Skills സജീവമാകുന്നത് (സെഷൻ ആരംഭിക്കുമ്പോൾ skill metadata ലോഡ് ചെയ്യപ്പെടുകയും
  ആവശ്യാനുസരണം പൂർണ്ണ ഉള്ളടക്കം സജീവമാക്കപ്പെടുകയും ചെയ്യുന്നു).
- നിലവിൽ Gemini-യ്ക്കു മാത്രമായി മറ്റ് നിയമങ്ങളൊന്നുമില്ല. പ്രോജക്റ്റ് നിയമങ്ങൾ ഇവിടെ വീണ്ടും ചേർക്കരുത് — പകരം
  `AGENTS.md` എഡിറ്റ് ചെയ്യുക, അതുവഴി എല്ലാ അസിസ്റ്റന്റുകൾക്കും ഒരേ നിർദ്ദേശങ്ങൾ ലഭിക്കും.
