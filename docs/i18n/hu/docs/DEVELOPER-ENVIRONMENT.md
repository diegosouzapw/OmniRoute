# Developer environment notes (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Ez az oldal ismerteti a projekt helyi `.env`-viselkedését, valamint azt, hogyan kell kezelni a környezeti fájlokat és a titkos adatokat az OmniRoute fejlesztése során.

## Az .env postinstall viselkedése

A projekt fejlesztői kényelmi okokból létrehozhat egy helyi `.env` fájlt az `npm install` / `postinstall` során. Ez a fájl kizárólag helyi fejlesztésre és tesztelésre szolgál, és soha nem szabad verziókezelő rendszerbe beküldeni.

Főbb tudnivalók:

- A repository `.gitignore` fájlja már figyelmen kívül hagyja a `.env*` fájlokat (lásd a `.gitignore` bejegyzését). Ne távolítsa el és ne módosítsa ezt a szabályt, kivéve, ha szándékosan be kíván küldeni egy konkrét példafájlt, és ehhez dokumentált folyamattal rendelkezik.
- Ha véletlenül valódi titkos adat kerül a repóba, azonnal cserélje le vagy vonja vissza a hitelesítő adatot, és távolítsa el a repository előzményeiből (például a `git filter-repo` vagy egy azzal egyenértékű helyreállítási munkafolyamat használatával). Ha segítségre van szüksége, forduljon a biztonsági vagy kapcsolattartási felelőshöz.
- CI- és éles környezetben használja a CI titkosadat-kezelését vagy egy titkosadat-kezelő szolgáltatást (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault stb.) ahelyett, hogy titkos adatokat fájlokba küldene be.

## Ajánlott helyi munkafolyamat

- A `.env` fájlt kizárólag a helyi munkaterületén tartsa. A szükséges változók és az elfogadható példaértékek dokumentálásához használja a már verziókezelt `.env.example` fájlt.
- Ha helyileg olyan teszteket futtat, amelyek titkos adatokhoz hasonló értékeket igényelnek, valódi hitelesítő adatok helyett részesítse előnyben a szintetikus helyőrzőket vagy a futásidőben generált, rövid élettartamú kulcsokat.
- A helyőrzőket használó tesztekhez adjon rövid megjegyzést, hogy az ellenőrzők számára egyértelmű legyen: a tesztadat szintetikus.

## Megjegyzések az ellenőrzőkhöz

- Egyes lefordított vagy bináris erőforrások (például beágyazott base64 WASM-adatblokkok) tartalmazhatnak olyan ASCII-részsztringeket, amelyek hitelesítő adatoknak tűnnek, és aktiválhatják a szövegalapú titkosadat-ellenőrzőket. Ha ezek az erőforrások jogszerűek, vegye fel őket az ellenőrző engedélyezési listájára, vagy zárja ki a könyvtárakat az ellenőrző konfigurációjában.

## Ha adatszivárgást talál

1. Azonnal cserélje le vagy vonja vissza a kulcsot.
2. Távolítsa el a titkos adatot az előzményekből, és szükség esetén kényszerített feltöltéssel küldjön fel egy megtisztított ágat.
3. Értesítse a karbantartókat, és kövesse a szervezete incidenskezelési ellenőrzőlistáját.
