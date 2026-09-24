# Reasoning Routing (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Düşünmə marşrutlaşdırma qaydaları mövcud model və combo marşrutlaşdırmasını genişləndirir. Heç bir aktiv qayda uyğun gəlmədikdə,
mövcud düşünmə, suffiks, bağlantı üzrə standart və provayder transformasiyası davranışı
dəyişməz qalır.

## İdarəetmə

Qaydaların idarə edilməsi **Settings → Global Routing** bölməsində əlçatandır. API açarı redaktoru
seçilmiş açara görə filtrlənmiş eyni idarəetmə interfeysini təqdim edir.

İdarəetmə API-si bu marşrutlar vasitəsilə təqdim olunur:

- `/api/settings/reasoning-routing-rules` ünvanında `GET` və `POST`
- `/api/settings/reasoning-routing-rules/[id]` ünvanında `GET`, `PATCH` və `DELETE`
- `/api/settings/reasoning-routing-rules/simulate` ünvanında `POST`

Bütün marşrutlar `requireManagementAuth` istifadə edir. Girişlər
`src/shared/validation/schemas/reasoningRouting.ts` daxilindəki sxemlərlə yoxlanılır. Simulyator heç vaxt yuxarı axın sorğusu etmir.

## Qaydaların Həll Edilməsi

Erkən qiymətləndirmə dəqiq olaraq bir qayda seçir. Əhatə dairələri bu ardıcıllıqla yoxlanılır:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Əhatə dairəsi daxilində əvvəlcə daha yüksək `priority` qalib gəlir, sonra glob nümunəsi ilə müqayisədə dəqiq model uyğunluğu,
ardınca isə sabit `createdAt` və `id` sıralaması tətbiq olunur. `requestTags` yalnız `metadata.tags`-dən oxunur
və `any` və ya `all` uyğunlaşdırmasını dəstəkləyir.

`connection` qaydası yalnız heç bir erkən qayda qalib gəlmədikdə və konkret provayder bağlantısı
artıq seçildikdə qiymətləndirilir. O, yalnız səy və büdcəni dəyişə bilər.

## Səy və Büdcə

`sourceEffort` `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` və
`ultra` dəyərlərini qəbul edir. `missing` sorğunun nə diskret səy, nə düşünmə keçidi,
nə də düşünmə büdcəsi ehtiva etməsi deməkdir. Buna görə yalnız büdcə siqnalına yalnız `any` uyğun gəlir.

`effortMode` üç varianta malikdir:

- `inherit` modelin və ya combo-nun dəyişməsinə imkan verməklə yanaşı, müştərinin səy dəyərini saxlayır.
- `default` yalnız açıq düşünmə siqnalı olmadıqda `targetEffort` təyin edir.
- `force` diskret səy dəyərini `targetEffort` ilə əvəz edir.

Müstəqil olaraq, `budgetAction` `preserve`, `remove` və ya `set` ola bilər. `none` ilə birlikdə `force`
bütün tanınan səy və büdcə sahələrini silir. `none` ilə `set` kombinasiyası etibarsızdır.

Uyğunsuz olduğu məlum olan modelləri hədəfləyən sorğular yuxarı axın çağırışından əvvəl rədd edilir. Combo
hədəfləri üçün uyğunsuz elementlər silinir; heç biri qalmazsa, sorğu `400` statusu qaytarır.
Naməlum imkan məlumatları xəbərdarlıq yaradır və qaydanı aktiv saxlayır.

## Təhlükəsizlik və Nəqliyyatlar

Mənbə və hədəf model və ya mənbə və hədəf combo mövcud API açarı
siyasətinə tabe olaraq qalır. Düşünmə qaydası heç vaxt model, combo və ya kvota icazələrini genişləndirmir.

Mühərrik Chat Completions, Responses, Anthropic Messages və daxili
Codex WebSocket yoluna inteqrasiya edilib. WebSocket yolu yalnız Codex hədəf modellərini qəbul edir; combo hədəfləri
orada icra edilə bilməz. Qayda qərarı məxfi məlumatlar olmadan mövcud marşrut izləməsində saxlanılır.

## Davamlı Saxlama

`src/lib/db/migrations/126_reasoning_routing_rules.sql` miqrasiyası
`reasoning_routing_rules` cədvəlini yaradır. Qaydalar saxlanılan API açarlarına, combo-lara və provayder bağlantılarına istinad edir.
Silmə əməliyyatları əlaqəli qaydaları təmizləyir. `src/lib/db/reasoningRoutingRules.ts` daxilindəki
verilənlər bazasına giriş qatı sorğu yolu üçün etibarsızlaşdırıla bilən keş saxlayır.

Qaydalar SQLite ehtiyat nüsxələrinə, tam verilənlər bazası ixracına və konfiqurasiya sinxronizasiya paketinə daxildir.
`reconcileReasoningRulesForSync` çatışmayan istinadları olan idxal edilmiş qaydaları deaktiv edir və həmin
ziddiyyətlər barədə məlumat verir.
