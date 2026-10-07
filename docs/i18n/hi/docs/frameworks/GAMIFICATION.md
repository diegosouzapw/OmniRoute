# Gamification & Leaderboard System (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **सत्य का स्रोत:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **अंतिम अपडेट:** 2026-06-28 — v3.8.40

OmniRoute में एक स्थानीय-प्रथम गेमिफ़िकेशन परत शामिल है, जो उपयोगकर्ताओं को
प्लेटफ़ॉर्म से जुड़ने—अनुरोध करने, प्रदाता बदलने, कॉम्बो बनाने,
टोकन साझा करने और समुदाय में योगदान देने—के लिए पुरस्कृत करती है। संपूर्ण स्थिति
SQLite में रहती है; समुदाय सर्वरों के साथ फ़ेडरेशन वैकल्पिक और पुश-आधारित है।

सिस्टम को **महत्वपूर्ण पथ पर शून्य-विलंबता** के लिए डिज़ाइन किया गया है—गेमिफ़िकेशन
इवेंट अनुरोध पाइपलाइन से फ़ायर-एंड-फ़ॉरगेट तरीके से डिस्पैच किए जाते हैं और कभी भी
LLM प्रतिक्रिया को अवरुद्ध नहीं करते।

---

## अवलोकन

### उद्देश्य

दृश्यमान प्रगति (XP, स्तर, बैज), सामाजिक प्रमाण (लीडरबोर्ड) और आर्थिक प्रोत्साहन (टोकन
साझाकरण, आमंत्रण पुरस्कार) प्रदान करके उपयोगकर्ता सहभागिता और प्रतिधारण बढ़ाना।

### दायरा

| सुविधा           | विवरण                                                                           |
| ---------------- | ------------------------------------------------------------------------------- |
| XP और स्तर       | प्रत्येक क्रिया पर XP अर्जित करें; बहुपद वक्र के अनुसार स्तर बढ़ाएँ             |
| बैज              | 4 दुर्लभता श्रेणियों के साथ 5 वर्गों में 20+ उपलब्धियाँ                         |
| स्ट्रीक          | वर्तमान/सबसे लंबी स्ट्रीक के साथ दैनिक सक्रिय उपयोग की ट्रैकिंग                 |
| लीडरबोर्ड        | वैश्विक, साप्ताहिक, मासिक, टोकन-साझाकरण और योगदान दायरे                         |
| टोकन साझाकरण     | दोहरी-प्रविष्टि लेज़र के माध्यम से उपयोगकर्ताओं के बीच क्रेडिट स्थानांतरित करें |
| आमंत्रण और रिडीम | SHA-256 हैश किए गए संग्रहण वाले रेफ़रल कोड                                      |
| समुदाय सर्वर     | बाहरी OmniRoute इंस्टेंस के साथ फ़ेडरेट करें                                    |
| धोखाधड़ी-रोधी    | सर्वर-साइड स्कोरिंग, दर सीमित करना, z-score विसंगति पहचान                       |

### डिज़ाइन सिद्धांत

1. **स्थानीय-प्रथम** — संपूर्ण स्थिति SQLite में रहती है; किसी बाहरी सेवा की आवश्यकता नहीं है।
2. **गैर-अवरुद्धकारी** — इवेंट फ़ायर-एंड-फ़ॉरगेट होते हैं; गेमिफ़िकेशन लॉजिक के कारण
   LLM प्रतिक्रिया पथ में कभी विलंब नहीं होता।
3. **सर्वर-प्रामाणिक** — XP की गणना केवल सर्वर-साइड की जाती है; क्लाइंट
   स्कोर कृत्रिम रूप से नहीं बढ़ा सकते।
4. **गोपनीयता-सम्मत** — लीडरबोर्ड में भागीदारी वैकल्पिक है; उपयोगकर्ता
   अपनी प्रोफ़ाइल छिपा सकते हैं।
5. **फ़ेडरेशन-तैयार** — समुदाय सर्वर हस्ताक्षरित API के माध्यम से स्कोर पुश कर सकते हैं;
   सिंक अधिलेखित करता है, जोड़ता नहीं।

---

## आर्किटेक्चर

### उच्च-स्तरीय प्रवाह

```
क्लाइंट अनुरोध
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (मौजूदा पाइपलाइन) ...
      → क्लाइंट को अपस्ट्रीम प्रतिक्रिया भेजी गई
      → setImmediate (फ़ायर-एंड-फ़ॉरगेट):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

इवेंट एमिटर एकमात्र एकीकरण बिंदु है। प्रतिक्रिया भेजे जाने के बाद `chatCore.ts`
`emitGamificationEvent()` को कॉल करता है; इवेंट मॉड्यूल इसे XP, स्ट्रीक, बैज,
लीडरबोर्ड और धोखाधड़ी-रोधी उप-प्रणालियों में वितरित करता है।

### मॉड्यूल निर्भरता ग्राफ़

```
src/lib/gamification/
  events.ts          ← प्रवेश बिंदु (chatCore.ts से कॉल किया जाता है)
    ├── xp.ts        ← XP गणना और स्तर निर्धारण
    ├── streaks.ts   ← दैनिक सक्रिय स्ट्रीक ट्रैकिंग
    ├── badges.ts    ← बैज मानदंड मूल्यांकन
    ├── leaderboard.ts ← रैंक गणना और SSE प्रसारण
    ├── antiCheat.ts ← दर सीमित करना और विसंगति पहचान
    ├── sharing.ts   ← टोकन स्थानांतरण लेज़र
    ├── invites.ts   ← आमंत्रण/रिडीम कोड प्रबंधन
    ├── servers.ts   ← समुदाय सर्वर फ़ेडरेशन
    └── notifications.ts ← SSE सूचना स्ट्रीम

src/lib/db/
  gamification.ts    ← सभी CRUD संचालन (8 तालिकाएँ)

src/app/api/gamification/
  leaderboard/       ← GET रैंकिंग, POST मैन्युअल रीफ़्रेश
  leaderboard/stream ← SSE रीयल-टाइम अपडेट
  transfer/          ← GET इतिहास, POST टोकन भेजें
  invite/            ← GET/POST कोड, DELETE निरस्त करें
  invite/redeem/     ← POST किसी कोड को रिडीम करें
  servers/           ← GET/POST/DELETE समुदाय सर्वर
  federation/score/  ← POST सर्वर पर स्कोर पुश करें
  federation/leaderboard/ ← GET सर्वर से लीडरबोर्ड पुल करें
  notifications/     ← SSE बैज/स्तर-वृद्धि सूचनाएँ
  anomalies/         ← GET विसंगति रिपोर्ट (व्यवस्थापक)
  rotate/            ← POST आमंत्रण टोकन सीक्रेट रोटेट करें
```

---

## डेटा लेयर

### डेटाबेस टेबल

सभी टेबल मुख्य OmniRoute SQLite डेटाबेस में मौजूद हैं, जिसे माइग्रेशन
`060_create_gamification.sql` द्वारा बनाया गया है। WAL जर्नलिंग `src/lib/db/core.ts`
में मौजूद सिंगलटन `getDbInstance()` से इनहेरिट की जाती है।

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions     │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### डोमेन मॉड्यूल: `src/lib/db/gamification.ts`

यह मानक OmniRoute पैटर्न का पालन करता है — `core.ts` से `getDbInstance()`
इम्पोर्ट करता है और टाइप किए गए CRUD फ़ंक्शन एक्सपोर्ट करता है। रूट हैंडलर में कोई रॉ SQL नहीं है।

प्रमुख फ़ंक्शन:

| फ़ंक्शन                    | विवरण                                                        |
| -------------------------- | ------------------------------------------------------------ |
| `upsertLeaderboardEntry()` | (api_key_id, scope, period) के लिए स्कोर डालें या अपडेट करें |
| `getLeaderboard()`         | दिए गए scope/period के लिए पृष्ठांकित रैंकिंग                |
| `getUserLevel()`           | उपयोगकर्ता लेवल रिकॉर्ड प्राप्त करें या बनाएँ                |
| `updateUserLevel()`        | XP, level और title को एटॉमिक रूप से सेट करें                 |
| `getBadgeDefinitions()`    | सभी बैज परिभाषाएँ (वैकल्पिक रूप से फ़िल्टर की गईं)           |
| `getUserBadges()`          | उपयोगकर्ता द्वारा अर्जित बैज                                 |
| `awardBadge()`             | बैज अर्जन दर्ज करें (badge_id पर आइडेम्पोटेंट)               |
| `logXpAction()`            | xp_audit_log में जोड़ें                                      |
| `getXpAuditLog()`          | उपयोगकर्ता के लिए पृष्ठांकित ऑडिट इतिहास                     |
| `insertLedgerEntry()`      | डबल-एंट्री ट्रांसफ़र (ट्रांज़ैक्शन के भीतर)                  |
| `getBalance()`             | उपयोगकर्ता के लिए प्राप्त राशि में से भेजी गई राशि घटाकर योग |
| `getTransferHistory()`     | पृष्ठांकित ट्रांसफ़र लॉग                                     |
| `createInviteToken()`      | आमंत्रण कोड + हैश किया गया टोकन डालें                        |
| `redeemInviteToken()`      | कोड से खोजें, सत्यापित करें और uses बढ़ाएँ                   |
| `upsertCommunityServer()`  | फ़ेडरेशन सर्वर को पंजीकृत या अपडेट करें                      |
| `getCommunityServers()`    | उपयोगकर्ता के सर्वरों की सूची बनाएँ                          |
| `deleteCommunityServer()`  | सर्वर पंजीकरण हटाएँ                                          |

---

## XP / लेवल सिस्टम

**फ़ाइल:** `src/lib/gamification/xp.ts`

### लेवल कर्व

लेवल `n` तक पहुँचने के लिए आवश्यक XP एक बहुपद कर्व का अनुसरण करता है:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| लेवल | अगले लेवल के लिए XP | संचयी XP  | उपाधि    |
| ---- | ------------------- | --------- | -------- |
| 1    | 100                 | 100       | शुरुआती  |
| 5    | 1,118               | 2,415     | शुरुआती  |
| 10   | 3,162               | 10,523    | अन्वेषक  |
| 25   | 12,500              | 86,024    | अन्वेषक  |
| 50   | 35,355              | 345,529   | विशेषज्ञ |
| 75   | 64,952              | 948,683   | मास्टर   |
| 100  | 100,000             | 2,050,000 | लीजेंड   |

### उपाधियाँ

| लेवल सीमा | उपाधि    |
| --------- | -------- |
| 1 – 9     | शुरुआती  |
| 10 – 24   | अन्वेषक  |
| 25 – 49   | विशेषज्ञ |
| 50 – 74   | मास्टर   |
| 75 – 100  | लीजेंड   |

### XP पुरस्कार

| कार्रवाई          | XP  | विवरण                                                                    |
| ----------------- | --- | ------------------------------------------------------------------------ |
| `request`         | 1   | OmniRoute के माध्यम से रूट किए गए प्रत्येक API अनुरोध पर                 |
| `provider_switch` | 5   | किसी दूसरे प्रदाता पर स्विच करना                                         |
| `model_switch`    | 3   | किसी दूसरे मॉडल पर स्विच करना                                            |
| `combo_create`    | 10  | नया कॉम्बो बनाना                                                         |
| `combo_use`       | 2   | किसी अनुरोध के लिए कॉम्बो का उपयोग करना                                  |
| `token_share`     | 1   | किसी अन्य उपयोगकर्ता के साथ साझा किए गए प्रत्येक 1 000 टोकन पर           |
| `invite_redeem`   | 50  | आमंत्रण कोड रिडीम करना                                                   |
| `daily_login`     | 5   | दैनिक सक्रिय उपयोग (दिन में एक बार)                                      |
| `streak_bonus`    | 2   | लगातार स्ट्रीक के प्रत्येक दिन पर (स्ट्रीक की अवधि से गुणा किया जाता है) |
| `badge_unlock`    | 10  | बैज अनलॉक करना                                                           |

### पुरस्कार प्रवाह

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. XP की मात्रा प्राप्त करने के लिए `XP_REWARDS[action]` देखें।
2. `checkRateLimit()` से गुज़ारें (एंटी-चीट: प्रति कुंजी अधिकतम 1000 XP/मिनट)।
3. एक ट्रांज़ैक्शन खोलें:
   - वर्तमान `user_levels` पंक्ति पढ़ें।
   - XP जोड़ें; `levelFromXp(totalXp)` के माध्यम से लेवल की दोबारा गणना करें।
   - यदि लेवल बदल गया है, तो `levelUp = true` सेट करें।
   - `user_levels` पंक्ति अपडेट करें।
   - `xp_audit_log` में प्रविष्टि जोड़ें।
4. परिणाम लौटाएँ। कॉलर नोटिफ़िकेशन संभालता है।

### सहायक: `levelFromXp(totalXp)`

यह लेवल 1..100 पर पुनरावृत्ति करते हुए `xp_for_level(n)` को तब तक जोड़ता है, जब तक संचयी XP
`totalXp` से अधिक न हो जाए। यह उस उच्चतम लेवल को लौटाता है जिसकी सीमा पूरी हो चुकी है।
यह O(100) है — स्वीकार्य है, क्योंकि लेवल की अधिकतम सीमा 100 है।

---

## बैज सिस्टम

**फ़ाइल:** `src/lib/gamification/badges.ts`

### श्रेणियाँ

| श्रेणी         | विवरण                                   | उदाहरण बैज                         |
| -------------- | --------------------------------------- | ---------------------------------- |
| `usage`        | उपयोग की मात्रा पर आधारित उपलब्धियाँ    | पहला अनुरोध, 1K अनुरोध, 100K       |
| `sharing`      | टोकन साझा करना और रेफ़रल                | पहला साझा, उदार (10 बार साझा करना) |
| `contribution` | सामुदायिक सहभागिता                      | कॉम्बो निर्माता, प्रदाता अन्वेषक   |
| `streak`       | समय के साथ निरंतरता                     | सप्ताह योद्धा, मासिक समर्पित       |
| `rare`         | कठिनाई से मिलने वाली या छिपी उपलब्धियाँ | शुरुआती अपनाने वाला, बग रिपोर्टर   |

### दुर्लभताएँ

| दुर्लभता    | रंग    | संभाव्यता संकेत    |
| ----------- | ------ | ------------------ |
| `common`    | स्लेटी | अधिकांश उपयोगकर्ता |
| `uncommon`  | हरा    | सक्रिय उपयोगकर्ता  |
| `rare`      | नीला   | समर्पित उपयोगकर्ता |
| `legendary` | सुनहरा | शीर्ष 1%           |

### मानदंड के प्रकार

| प्रकार         | फ़ील्ड             | विवरण                                                  |
| -------------- | ------------------ | ------------------------------------------------------ |
| `action_count` | `count`            | कार्रवाई N बार करें (उदा., 1000 अनुरोध)                |
| `streak`       | `days`             | लगातार N दिनों तक स्ट्रीक बनाए रखें                    |
| `unique_count` | `field`, `n`       | N अद्वितीय मानों का उपयोग करें (उदा., 10 अलग-अलग मॉडल) |
| `rank`         | `scope`, `n`       | किसी लीडरबोर्ड स्कोप पर रैंक N प्राप्त करें            |
| `first`        | —                  | कोई कार्रवाई करने वाले पहले व्यक्ति बनें               |
| `hidden`       | (भिन्न हो सकता है) | अर्जित होने तक मानदंड नहीं दिखाए जाते                  |

बैज की परिभाषाएँ `badge_definitions` में JSON `criteria` के रूप में संग्रहीत की जाती हैं:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### मूल्यांकन प्रवाह

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # सभी परिभाषाएँ
    → getUserBadges(apiKeyId)         # पहले से अर्जित (छोड़ दें)
    → प्रत्येक अनर्जित बैज के लिए:
       → matchesCriteria(badge, event, userState)
       → यदि मेल खाता है: awardBadge(apiKeyId, badgeId)
         → नोटिफ़िकेशन पेलोड लौटाएँ
```

मूल्यांकन **इवेंट-संचालित** है — यह प्रत्येक गेमिफ़िकेशन इवेंट के बाद चलता है, लेकिन
केवल उन बैज की जाँच करता है जिनका `criteria.type` इवेंट कार्रवाई के अनुरूप होता है। इससे
मूल्यांकन तेज़ रहता है (अधिकांश इवेंट के लिए < 5ms)।

### `matchesCriteria(badge, event, userState)`

| मानदंड का प्रकार | जाँच                                                              |
| ---------------- | ----------------------------------------------------------------- |
| `action_count`   | `getActionCount(apiKeyId, action) >= count`                       |
| `streak`         | `getCurrentStreak(apiKeyId) >= days`                              |
| `unique_count`   | `getUniqueCount(apiKeyId, field) >= n`                            |
| `rank`           | `getRank(apiKeyId, scope) <= n`                                   |
| `first`          | इस कार्रवाई प्रकार के लिए कोई पिछली `xp_audit_log` प्रविष्टि नहीं |
| `hidden`         | उपयुक्त उप-जाँच को सौंपता है                                      |

### अंतर्निहित बैज (20+)

<details>
<summary>बैज की पूरी सूची</summary>

| बैज                   | श्रेणी   | दुर्लभता | मानदंड                             |
| --------------------- | -------- | -------- | ---------------------------------- |
| पहला कदम              | उपयोग    | सामान्य  | 1 अनुरोध                           |
| शुरुआत हो गई          | उपयोग    | सामान्य  | 100 अनुरोध                         |
| पावर उपयोगकर्ता       | उपयोग    | असामान्य | 1,000 अनुरोध                       |
| सेंचुरियन             | उपयोग    | दुर्लभ   | 10,000 अनुरोध                      |
| ओम्नीपावर             | उपयोग    | पौराणिक  | 100,000 अनुरोध                     |
| प्रदाता अन्वेषक       | योगदान   | सामान्य  | 5 अलग-अलग प्रदाताओं का उपयोग करें  |
| प्रदाता विशेषज्ञ      | योगदान   | असामान्य | 20 अलग-अलग प्रदाताओं का उपयोग करें |
| कॉम्बो वास्तुकार      | योगदान   | असामान्य | 5 कॉम्बो बनाएँ                     |
| कॉम्बो ग्रैंडमास्टर   | योगदान   | दुर्लभ   | 25 कॉम्बो बनाएँ                    |
| पहला साझाकरण          | साझाकरण  | सामान्य  | 1 टोकन स्थानांतरण                  |
| उदार                  | साझाकरण  | असामान्य | 10 टोकन स्थानांतरण                 |
| परोपकारी              | साझाकरण  | दुर्लभ   | कुल 10,000 टोकन स्थानांतरित करें   |
| रेफ़रर                | साझाकरण  | सामान्य  | 1 सफल रेफ़रल                       |
| नेटवर्क निर्माता      | साझाकरण  | असामान्य | 10 सफल रेफ़रल                      |
| सप्ताह योद्धा         | निरंतरता | असामान्य | 7-दिन की निरंतरता                  |
| मासिक समर्पित         | निरंतरता | दुर्लभ   | 30-दिन की निरंतरता                 |
| अजेय                  | निरंतरता | पौराणिक  | 365-दिन की निरंतरता                |
| प्रारंभिक अपनाने वाला | दुर्लभ   | पौराणिक  | बीटा अवधि के दौरान शामिल हों       |
| संपीड़न अग्रणी        | दुर्लभ   | असामान्य | संपीड़न का 100 बार उपयोग करें      |
| कौशल संग्राहक         | दुर्लभ   | दुर्लभ   | 10 अलग-अलग कौशलों का उपयोग करें    |
| मॉडल अन्वेषक          | योगदान   | असामान्य | 15 अलग-अलग मॉडलों का उपयोग करें    |

</details>

---

## स्ट्रीक ट्रैकर

**फ़ाइल:** `src/lib/gamification/streaks.ts`

### डेटा मॉडल

स्ट्रीक्स को `key_value` तालिका (साझा उपयोगिता तालिका) में नेमस्पेस वाली कुंजियों के अंतर्गत संग्रहीत किया जाता है:

| कुंजी                         | मान                              | विवरण               |
| ----------------------------- | -------------------------------- | ------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | सक्रिय स्ट्रीक डेटा |

### लॉजिक

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. `key_value` से स्ट्रीक रिकॉर्ड पढ़ें।
2. `{current}`, `{longest}`, `{lastDate}` (ISO दिनांक स्ट्रिंग) को पार्स करें।
3. यदि `lastDate === today` — कोई बदलाव नहीं (आज के लिए पहले ही गिना जा चुका है)।
4. यदि `lastDate === yesterday` — `current` बढ़ाएँ; आवश्यकता होने पर `longest` अपडेट करें।
5. यदि `lastDate < yesterday` — `current = 1` रीसेट करें (स्ट्रीक टूट गई)।
6. अपडेट किया गया रिकॉर्ड लिखें।
7. माइलस्टोन जाँचें: 7, 14, 30, 60, 90, 180, 365 दिन। यदि कोई माइलस्टोन पार हो जाए, तो
   `milestone = true` सेट करें (कॉलर XP प्रदान करता है और बैज जाँचता है)।

### विशेष स्थितियाँ

- **टाइमज़ोन**: स्ट्रीक्स UTC दिनांकों (`new Date().toISOString().slice(0, 10)`) का उपयोग करती हैं।
  यह जानबूझकर किया गया है — एकल मानक टाइमज़ोन, टाइमज़ोन बदलकर अनुचित लाभ लेने से रोकता है।
- **नए उपयोगकर्ता**: कोई स्ट्रीक रिकॉर्ड मौजूद नहीं होता; पहला अनुरोध इसे
  `current=1, longest=1, lastDate=today` के साथ बनाता है।
- **प्रति दिन एकाधिक अनुरोध**: UTC दिन का केवल पहला अनुरोध
  स्ट्रीक को बढ़ाता है।

---

## लीडरबोर्ड

**फ़ाइल:** `src/lib/gamification/leaderboard.ts`

### स्कोप

| स्कोप           | अवधि    | विवरण                                                       |
| --------------- | ------- | ----------------------------------------------------------- |
| `global`        | `all`   | अब तक का संचयी XP                                           |
| `weekly`        | `week`  | वर्तमान UTC सप्ताह (सोमवार-रविवार) में अर्जित XP            |
| `monthly`       | `month` | वर्तमान UTC महीने में अर्जित XP                             |
| `tokens_shared` | `all`   | अन्य लोगों को स्थानांतरित किए गए कुल टोकन                   |
| `contributions` | `all`   | बनाए गए कॉम्बो + उपयोग किए गए प्रोवाइडर + उपयोग किए गए कौशल |

### रैंक की गणना

रैंक संग्रहीत नहीं की जातीं, बल्कि **पढ़ते समय उनकी गणना की जाती है**। इससे पुराना रैंक डेटा बनने से बचता है
और आवधिक रैंक पुनर्गणना जॉब्स की आवश्यकता समाप्त हो जाती है।

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

क्वेरी पैटर्न:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### अवधि रोटेशन

साप्ताहिक और मासिक लीडरबोर्ड स्वचालित रूप से रोटेट होते हैं:

1. **आर्काइव**: अवधि की सीमा पर, वर्तमान प्रविष्टियों को अवधि लेबल के साथ
   `leaderboard_archive` में कॉपी करें।
2. **रीसेट**: समाप्त हो चुकी अवधि की प्रविष्टियाँ हटाएँ।
3. **ट्रिगर**: प्रत्येक `updateLeaderboard()` कॉल पर जाँच की जाती है; नई अवधि का पहला अनुरोध
   रोटेशन को ट्रिगर करता है।

इससे यह सुनिश्चित होता है कि साप्ताहिक बोर्ड प्रत्येक सोमवार 00:00 UTC पर रीसेट हों और मासिक बोर्ड
प्रत्येक महीने की पहली तारीख को रीसेट हों।

### SSE रीयल-टाइम अपडेट

**एंडपॉइंट:** `GET /api/gamification/stream`

```
क्लाइंट → GET /api/gamification/stream
  → SSE कनेक्शन स्थापित हुआ
  → सर्वर तुरंत शीर्ष-10 लीडरबोर्ड स्नैपशॉट भेजता है
  → प्रत्येक 5 सेकंड में: बदलाव होने पर अपडेट किया गया शीर्ष-10 पुश करें
  → प्रत्येक 15 सेकंड में: हार्टबीट टिप्पणी (": heartbeat\n\n")
  → क्लाइंट डिस्कनेक्ट होता है → क्लीनअप (लिसनर हटाएँ)
```

इवेंट प्रारूप:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE मैनेजर प्रत्येक स्कोप के अनुसार कनेक्टेड क्लाइंट्स को ट्रैक करता है और अपडेट केवल तभी भेजता है
जब लीडरबोर्ड डेटा पिछले पुश के बाद वास्तव में बदल गया हो।

---

## टोकन साझा करना

**फ़ाइल:** `src/lib/gamification/sharing.ts`

### दोहरी-प्रविष्टि लेजर

प्रत्येक ट्रांसफ़र `token_ledger` में दो पंक्तियाँ बनाता है:

| पंक्ति  | `from_key_id` | `to_key_id`  | `amount` |
| ------- | ------------- | ------------ | -------- |
| डेबिट   | प्रेषक        | प्राप्तकर्ता | +राशि    |
| क्रेडिट | प्राप्तकर्ता  | प्रेषक       | -राशि    |

रुकिए — प्रचलित नियम यह है:

| पंक्ति   | `from_key_id` | `to_key_id`  | `amount` | अर्थ                     |
| -------- | ------------- | ------------ | -------- | ------------------------ |
| भेजना    | प्रेषक        | प्राप्तकर्ता | +राशि    | प्रेषक से बहिर्वाह       |
| प्राप्ति | प्राप्तकर्ता  | प्रेषक       | +राशि    | प्राप्तकर्ता को अंतर्वाह |

बैलेंस की गणना इस प्रकार की जाती है:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### ट्रांसफ़र प्रवाह

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **मान्य करें**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **आइडेम्पोटेंसी**: जाँचें कि `idempotency_key` लेजर में पहले से मौजूद है या नहीं।
   यदि हाँ, तो कैश किया गया परिणाम लौटाएँ।
3. **ट्रांज़ैक्शन** (एकल SQLite ट्रांज़ैक्शन):
   a. प्रेषक के बैलेंस की गणना करें।
   b. यदि `balance < amount` है, तो निरस्त करें (अपर्याप्त धनराशि)।
   c. भेजने की पंक्ति सम्मिलित करें (`from=sender,` लौटाएँ।

### दर सीमित करना

- प्रति API कुंजी प्रति मिनट अधिकतम 10 ट्रांसफ़र।
- एक ट्रांसफ़र में अधिकतम 10,000 टोकन।
- प्रति API कुंजी प्रति दिन अधिकतम 100,000 टोकन ट्रांसफ़र किए जा सकते हैं।

---

## टोकन आमंत्रित करना और रिडीम करना

**फ़ाइल:** `src/lib/gamification/invites.ts`

### कोड प्रारूप

- **कोड**: 8-वर्णों का अल्फ़ान्यूमेरिक कोड (जैसे, `A3K9-X7M2`), जिसे मनुष्य आसानी से पढ़ सके और
  उपयोगकर्ता को प्रदर्शित किया जाए।
- **टोकन**: 32-बाइट का रैंडम टोकन, जिसे SHA-256 हैश के रूप में संग्रहीत किया जाता है। इसका उपयोग
  प्रोग्रामेटिक रिडेम्प्शन (जैसे, URL लिंक) के लिए किया जाता है।

### संग्रहण

| कॉलम         | मान                                     |
| ------------ | --------------------------------------- |
| `code`       | `A3K9X7M2` (अद्वितीय, इंडेक्स किया हुआ) |
| `token_hash` | SHA-256(raw_token)                      |

निर्माण के समय रॉ टोकन उपयोगकर्ता को ठीक एक बार लौटाया जाता है। OmniRoute
इसे फिर कभी संग्रहीत या प्रदर्शित नहीं करता — केवल हैश बना रहता है।

### स्व-रेफ़रल की रोकथाम

जब कोई उपयोगकर्ता किसी कोड को रिडीम करता है, तो सिस्टम जाँचता है:

1. कोड किसी भिन्न `api_key_id` से संबंधित है।
2. रिडीम करने वाले उपयोगकर्ता ने पहले उसी
   रेफ़रर का कोई कोड रिडीम नहीं किया है (`invite_tokens` + रिडेम्प्शन लॉग पर जॉइन किया जाता है)।

यदि कोई भी जाँच विफल होती है, तो स्पष्ट त्रुटि संदेश के साथ रिडेम्प्शन अस्वीकार कर दिया जाता है।

### समाप्ति और सीमाएँ

- डिफ़ॉल्ट `max_uses`: 10 (निर्माण के समय कॉन्फ़िगर करने योग्य)।
- डिफ़ॉल्ट `expires_at`: निर्माण से 30 दिन।
- समय-सीमा समाप्त हो चुके या उपयोग-सीमा पूरी कर चुके कोड HTTP 410 Gone लौटाते हैं।

---

## कम्युनिटी सर्वर फ़ेडरेशन

**फ़ाइल:** `src/lib/gamification/servers.ts`

### कनेक्ट करना

कम्युनिटी सर्वर को रिमोट सर्वर द्वारा जारी किए गए इनवाइट टोकन के माध्यम से पंजीकृत किया जाता है। लोकल इंस्टेंस:

1. इनवाइट टोकन प्राप्त करता है (उदा., डैशबोर्ड में पेस्ट किया गया)।
2. टोकन को सत्यापित करने और वर्तमान लीडरबोर्ड प्राप्त करने के लिए रिमोट सर्वर पर `POST /api/gamification/federation/leaderboard` को कॉल करता है।
3. सर्वर रिकॉर्ड को `status: connected` के साथ संग्रहीत करता है।

### सिंक मॉडल

फ़ेडरेशन **ओवरराइट सिंक** का उपयोग करता है, एडिटिव सिंक का नहीं:

```
लोकल इंस्टेंस                कम्युनिटी सर्वर
     │                              │
     ├── स्कोर पुश करें ───────────►│  POST /federation/score
     │   { api_key_id, score }      │  (सर्वर टोकन हैश सत्यापित करता है)
     │                              │
     ├── लीडरबोर्ड पुल करें ───────►│  GET /federation/leaderboard
     │◄── शीर्ष-N प्रविष्टियाँ ─────┤  (लोकल कैश को ओवरराइट करता है)
     │                              │
     └── हेल्थ चेक ────────────────►│  GET /federation/health
         (हर 60 सेकंड, टाइमआउट 5 सेकंड) │
```

### प्रमाणीकरण

फ़ेडरेशन अनुरोधों में शामिल हैं:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

रिमोट सर्वर टोकन को हैश करता है और मेल खाने वाली `community_servers` पंक्ति खोजता है। इससे संग्रहीत हैश को प्रेषित करने की आवश्यकता नहीं रहती।

### स्वास्थ्य निगरानी

प्रत्येक सर्वर रिकॉर्ड निम्न जानकारी ट्रैक करता है:

| फ़ील्ड      | विवरण                                  |
| ----------- | -------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable` |
| `last_sync` | अंतिम सफल सिंक का ISO टाइमस्टैम्प      |
| `failures`  | लगातार विफल हुए हेल्थ चेक              |

लगातार 5 विफलताओं के बाद, स्थिति बदलकर `unreachable` हो जाती है और मैन्युअल हेल्थ चेक के सफल होने तक सिंक रोक दिया जाता है।

---

## एंटी-चीट

**फ़ाइल:** `src/lib/gamification/antiCheat.ts`

### सर्वर-साइड स्कोरिंग

सभी XP गणनाएँ `src/lib/gamification/xp.ts` में होती हैं। क्लाइंट कभी भी स्कोर सबमिट नहीं करते—वे कार्रवाइयाँ सबमिट करते हैं और सर्वर XP की गणना करता है। `leaderboard.score` कॉलम को केवल सर्वर-साइड कोड द्वारा लिखा जा सकता है।

### रेट लिमिटिंग

| सीमा                        | मान     | दायरा           |
| --------------------------- | ------- | --------------- |
| प्रति मिनट अधिकतम XP        | 1,000   | प्रति API कुंजी |
| प्रति मिनट अधिकतम ट्रांसफ़र | 10      | प्रति API कुंजी |
| अधिकतम ट्रांसफ़र राशि       | 10,000  | प्रति ट्रांसफ़र |
| अधिकतम दैनिक ट्रांसफ़र      | 100,000 | प्रति API कुंजी |

रेट लिमिट एक इन-मेमोरी स्लाइडिंग विंडो (`open-sse/services/` में `RateLimitManager` के समान पैटर्न) का उपयोग करती हैं। यदि प्रोसेस रीस्टार्ट होता है, तो SQLite-समर्थित काउंटरों का उपयोग फ़ॉलबैक के रूप में किया जाता है।

### Z-स्कोर विसंगति पहचान

प्रत्येक API कुंजी के लिए, सिस्टम प्रति घंटे अर्जित XP की एक रोलिंग 7-दिवसीय विंडो बनाए रखता है। प्रत्येक XP पुरस्कार पर:

1. उपयोगकर्ता की वर्तमान प्रति-घंटा XP दर की गणना करें।
2. समष्टि माध्य और मानक विचलन की गणना करें।
3. `z = (user_rate - mean) / stddev` की गणना करें।
4. यदि `z > 3.0` (3 मानक विचलन) हो, तो इसे विसंगति के रूप में चिह्नित करें।

विसंगतियों को `action = 'anomaly_detected'` के साथ `xp_audit_log` में लॉग किया जाता है और एडमिन डैशबोर्ड पर प्रदर्शित किया जाता है।

### ऑडिट ट्रेल

प्रत्येक XP पुरस्कार, ट्रांसफ़र, बैज अर्जन और विसंगति पहचान को निम्न जानकारी के साथ `xp_audit_log` में लॉग किया जाता है:

| फ़ील्ड       | विवरण                                            |
| ------------ | ------------------------------------------------ |
| `api_key_id` | कौन                                              |
| `action`     | क्या हुआ (xp_award, transfer, anomaly, …)        |
| `xp_awarded` | राशि (गैर-XP घटनाओं के लिए 0)                    |
| `metadata`   | संदर्भ वाला JSON (कार्रवाई का प्रकार, लक्ष्य, …) |
| `created_at` | कब (ISO 8601)                                    |

एडमिन `GET /api/gamification/anomalies` के माध्यम से संपूर्ण ऑडिट ट्रेल क्वेरी कर सकते हैं।

---

## API रूट्स

सभी रूट मानक OmniRoute पैटर्न का पालन करते हैं:

```
रूट → CORS प्रीफ़्लाइट → बॉडी सत्यापन (Zod) → प्रमाणीकरण (extractApiKey)
  → हैंडलर
```

### एंडपॉइंट्स

| विधि   | पथ                                         | विवरण                                           | प्रमाणीकरण |
| ------ | ------------------------------------------ | ----------------------------------------------- | ---------- |
| GET    | `/api/gamification/leaderboard`            | लीडरबोर्ड प्राप्त करें (दायरा, अवधि, पृष्ठांकन) | वैकल्पिक   |
| POST   | `/api/gamification/leaderboard`            | लीडरबोर्ड कैश को बलपूर्वक रीफ़्रेश करें         | आवश्यक     |
| GET    | `/api/gamification/stream`                 | SSE रीयल-टाइम लीडरबोर्ड अपडेट                   | वैकल्पिक   |
| GET    | `/api/gamification/transfer`               | ट्रांसफ़र इतिहास प्राप्त करें (पृष्ठांकन)       | आवश्यक     |
| POST   | `/api/gamification/transfer`               | किसी अन्य उपयोगकर्ता को टोकन भेजें              | आवश्यक     |
| GET    | `/api/gamification/invite`                 | मेरे आमंत्रण कोड सूचीबद्ध करें                  | आवश्यक     |
| POST   | `/api/gamification/invite`                 | नया आमंत्रण कोड जनरेट करें                      | आवश्यक     |
| DELETE | `/api/gamification/invite`                 | आमंत्रण कोड निरस्त करें                         | आवश्यक     |
| POST   | `/api/gamification/invite/redeem`          | आमंत्रण कोड रिडीम करें                          | आवश्यक     |
| GET    | `/api/gamification/servers`                | समुदाय सर्वर सूचीबद्ध करें                      | आवश्यक     |
| POST   | `/api/gamification/servers`                | समुदाय सर्वर से कनेक्ट करें                     | आवश्यक     |
| DELETE | `/api/gamification/servers`                | समुदाय सर्वर से डिस्कनेक्ट करें                 | आवश्यक     |
| POST   | `/api/gamification/federation/score`       | स्कोर को रिमोट सर्वर पर पुश करें                | फ़ेडरेशन   |
| GET    | `/api/gamification/federation/leaderboard` | रिमोट से लीडरबोर्ड पुल करें                     | फ़ेडरेशन   |
| GET    | `/api/gamification/notifications`          | SSE बैज/लेवल-अप सूचनाएँ                         | आवश्यक     |
| GET    | `/api/gamification/anomalies`              | विसंगति रिपोर्ट देखें (एडमिन)                   | एडमिन      |
| POST   | `/api/gamification/rotate`                 | आमंत्रण टोकन सीक्रेट्स रोटेट करें               | आवश्यक     |

### अनुरोध/प्रतिक्रिया के उदाहरण

**POST /api/gamification/transfer**

```json
// अनुरोध
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// प्रतिक्रिया 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// प्रतिक्रिया 400 (अपर्याप्त धनराशि)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP टूल्स (8)

मौजूदा टूल्स के साथ `open-sse/mcp-server/` में पंजीकृत। इन्हें
`gamification` अनुमति दायरे के अंतर्गत रखा गया है।

| टूल                        | विवरण                                             | इनपुट स्कीमा                 |           |
| -------------------------- | ------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | किसी दायरे/अवधि के लिए लीडरबोर्ड प्राप्त करें     | `{ scope, period?, limit? }` |
| `gamification_rank`        | कॉलर की रैंक और आस-पास की रैंक प्राप्त करें       | `{ scope }`                  |
| `gamification_profile`     | XP, स्तर, उपाधि और स्ट्रीक का सारांश प्राप्त करें | `{}`                         |
| `gamification_badges`      | अर्जित बैज या सभी परिभाषाएँ सूचीबद्ध करें         | `{ earned?: boolean }`       |
| `gamification_transfer`    | किसी अन्य उपयोगकर्ता को टोकन भेजें                | `{ to, amount }`             |
| `gamification_invite`      | आमंत्रण कोड बनाएँ या सूचीबद्ध करें                | `{ action: "create"          | "list" }` |
| `gamification_servers`     | सामुदायिक सर्वर सूचीबद्ध करें या उनसे कनेक्ट करें | `{ action, token? }`         |
| `gamification_anomalies`   | विसंगति रिपोर्ट देखें (एडमिन दायरा)               | `{ limit?, since? }`         |

---

## डैशबोर्ड पृष्ठ

### `/dashboard/leaderboard`

- पोडियम प्रदर्शन (अवतार और XP वाले शीर्ष 3)।
- दायरा चयनकर्ता: वैश्विक / साप्ताहिक / मासिक / साझा किए गए टोकन / योगदान।
- रैंक, नाम, स्कोर, स्तर और उपाधि वाली पृष्ठांकित तालिका (प्रति पृष्ठ 25)।
- SSE रियल-टाइम अपडेट — रैंक में बदलाव एनिमेट होते हैं।
- तालिका में मौजूदा उपयोगकर्ता को "आपकी रैंक" वाली स्टिकी पंक्ति के साथ हाइलाइट किया जाता है।

### `/dashboard/profile`

- मौजूदा स्तर और अगले स्तर की सीमा के साथ XP प्रगति बार।
- उपाधि बैज प्रमुखता से प्रदर्शित होता है।
- बैज गैलरी — अर्जित बैज अर्जन तिथि के साथ, अनर्जित बैज धूसर रंग में
  (छिपे हुए बैज अर्जित होने तक "???" दिखाते हैं)।
- ज्वाला आइकन वाला स्ट्रीक काउंटर; स्ट्रीक कैलेंडर (पिछले 30 दिन)।
- XP इतिहास चार्ट (पिछले 30 दिनों का दैनिक XP)।

### `/dashboard/tokens`

- टोकन बैलेंस (प्रमुखता से, पृष्ठ के शीर्ष पर)।
- ट्रांसफ़र फ़ॉर्म: प्राप्तकर्ता, राशि, पुष्टिकरण डायलॉग।
- फ़िल्टर वाली ट्रांसफ़र इतिहास तालिका (भेजे गए/प्राप्त हुए/सभी)।
- आमंत्रण अनुभाग: सक्रिय कोड, नया कोड बनाएँ, लिंक साझा करें।
- सामुदायिक सर्वर: स्वास्थ्य स्थिति सहित सूची, कनेक्ट/डिस्कनेक्ट।

### `/dashboard/gamification/admin`

- गंभीरता, उपयोगकर्ता, टाइमस्टैम्प और z-score वाली विसंगति सूची।
- फ़िल्टर वाला ऑडिट लॉग व्यूअर (कार्रवाई का प्रकार, उपयोगकर्ता, तिथि सीमा)।
- सिस्टम आँकड़े: प्रदान किया गया कुल XP, सक्रिय उपयोगकर्ता, बैज अर्जन दरें।
- फ़ेडरेशन सर्वर के स्वास्थ्य का अवलोकन।

---

## पाइपलाइन एकीकरण

### एकीकरण बिंदु

गेमिफ़िकेशन, `open-sse/handlers/chatCore.ts` में एक ही बिंदु पर अनुरोध पाइपलाइन
से जुड़ता है:

```typescript
// क्लाइंट को प्रतिक्रिया भेजे जाने के बाद:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // फ़ायर-एंड-फ़ॉरगेट: लॉग करें, लेकिन क्लाइंट तक कभी प्रसारित न करें
  });
});
```

### इवेंट के प्रकार

| इवेंट का प्रकार     | कब उत्सर्जित होता है                              |
| ------------------- | ------------------------------------------------- |
| `request.completed` | सफल LLM प्रतिक्रिया भेजे जाने पर                  |
| `provider.switch`   | प्रदाता बदलने पर (कॉम्बो फ़ॉलबैक की गणना होती है) |
| `combo.created`     | नया कॉम्बो कॉन्फ़िगरेशन सहेजे जाने पर             |
| `combo.used`        | कॉम्बो लक्ष्य सफलतापूर्वक हिट होने पर             |
| `badge.earned`      | बैज मूल्यांकन में मिलान मिलने पर                  |
| `streak.milestone`  | स्ट्रीक सीमा पार होने पर                          |
| `transfer.sent`     | टोकन ट्रांसफ़र पूरा होने पर                       |
| `referral.redeemed` | आमंत्रण कोड सफलतापूर्वक रिडीम होने पर             |
| `compression.used`  | प्रॉम्प्ट कम्प्रेशन लागू होने पर                  |
| `skill.executed`    | कौशल निष्पादन पूरा होने पर                        |
| `model.first_use`   | मॉडल का पिछले 7 दिनों में उपयोग न हुआ हो          |

### नॉन-ब्लॉकिंग गारंटी

`setImmediate` + `.catch(() => {})` पैटर्न यह सुनिश्चित करता है:

1. गेमिफ़िकेशन चलने से पहले प्रतिक्रिया पूरी तरह भेज दी जाती है।
2. गेमिफ़िकेशन की त्रुटियाँ कभी भी क्लाइंट के सामने नहीं आतीं।
3. इवेंट प्रोसेसिंग इनलाइन नहीं, बल्कि अगले माइक्रोटास्क में चलती है।

---

## सुरक्षा

### खतरा मॉडल

| खतरा                        | निवारण                                                                         |
| --------------------------- | ------------------------------------------------------------------------------ |
| स्कोर में कृत्रिम वृद्धि    | केवल सर्वर-साइड XP गणना; क्लाइंट स्कोर नहीं, कार्रवाइयाँ सबमिट करते हैं        |
| रीप्ले हमले                 | ट्रांसफ़र पर आइडेम्पोटेंसी कुंजियाँ; ऑडिट लॉग डीडुप्लीकेशन                     |
| ट्रांसफ़र धोखाधड़ी          | डबल-एंट्री लेजर; एटॉमिक ट्रांज़ैक्शन; दर सीमाएँ                                |
| स्वयं-रेफ़रल                | रिडेम्प्शन पर `api_key_id` की क्रॉस-जाँच                                       |
| लीडरबोर्ड में हेरफेर        | Z-स्कोर विसंगति पहचान; एडमिन विसंगति डैशबोर्ड                                  |
| फ़ेडरेशन टोकन की चोरी       | SHA-256 हैश किया हुआ स्टोरेज; रॉ टोकन केवल एक बार दिखाया जाता है               |
| आमंत्रण कोड पर ब्रूट फ़ोर्स | रिडेम्प्शन एंडपॉइंट पर दर सीमा; 8-वर्ण एंट्रॉपी                                |
| डिस्प्ले नामों में XSS      | डिस्प्ले नाम सैनिटाइज़ किए जाते हैं; लीडरबोर्ड प्रविष्टियाँ एस्केप की जाती हैं |
| हैश पर टाइमिंग हमले         | टोकन हैश की तुलना के लिए `crypto.timingSafeEqual`                              |

### प्रमाणीकरण आवश्यकताएँ

- **सार्वजनिक** (प्रमाणीकरण नहीं): `GET /leaderboard`, `GET /stream` (केवल-पढ़ने योग्य
  लीडरबोर्ड)।
- **API कुंजी आवश्यक**: सभी लेखन ऑपरेशन, प्रोफ़ाइल, ट्रांसफ़र, आमंत्रण।
- **केवल एडमिन**: विसंगति डैशबोर्ड, ऑडिट लॉग व्यूअर।
- **फ़ेडरेशन**: `Authorization` हेडर में रॉ टोकन का उपयोग करने वाला अलग प्रमाणीकरण
  पथ, जिसे संग्रहित SHA-256 हैश के विरुद्ध सत्यापित किया जाता है।

---

## परीक्षण

### परीक्षण फ़ाइलें

सभी परीक्षण Node.js के नेटिव टेस्ट रनर (`node --import tsx/esm --test`) का उपयोग करते हैं।

| परीक्षण फ़ाइल                                 | कवरेज                                    | परीक्षण |
| --------------------------------------------- | ---------------------------------------- | ------- |
| `tests/unit/gamification/xp.test.ts`          | XP गणना, स्तर वक्र, उपाधियाँ             | 8       |
| `tests/unit/gamification/badges.test.ts`      | बैज मानदंड मिलान, प्रदान करना            | 10      |
| `tests/unit/gamification/streaks.test.ts`     | स्ट्रीक लॉजिक, माइलस्टोन, सीमांत मामले   | 7       |
| `tests/unit/gamification/leaderboard.test.ts` | रैंक गणना, पेजिनेशन, रोटेशन              | 8       |
| `tests/unit/gamification/sharing.test.ts`     | ट्रांसफ़र, बैलेंस, आइडेम्पोटेंसी         | 9       |
| `tests/unit/gamification/invites.test.ts`     | बनाना, रिडीम करना, समाप्ति, स्वयं-रेफ़रल | 7       |
| `tests/unit/gamification/antiCheat.test.ts`   | दर सीमाएँ, Z-स्कोर, ऑडिट लॉगिंग          | 6       |
| `tests/unit/gamification/events.test.ts`      | इवेंट उत्सर्जन, फ़ैन-आउट, त्रुटि प्रबंधन | 5       |

### परीक्षण चलाना

```bash
# सभी गेमिफ़िकेशन परीक्षण
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# एकल परीक्षण फ़ाइल
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### कवरेज आवश्यकताएँ

`CONTRIBUTING.md` के अनुसार — सभी नए मॉड्यूल में निम्नलिखित होना चाहिए:

- ब्रांच कवरेज >= 80%।
- प्रत्येक सार्वजनिक फ़ंक्शन का कम-से-कम एक बार परीक्षण किया गया हो।
- त्रुटि पथों का परीक्षण किया गया हो (अपर्याप्त बैलेंस, समाप्त कोड, दर सीमाएँ)।

---

## फ़ाइल संरचना

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # सभी 8 टेबल + इंडेक्स
      gamification.ts                  # डोमेन CRUD मॉड्यूल
    gamification/
      xp.ts                           # XP गणना, लेवल कर्व, उपाधियाँ
      badges.ts                       # बैज परिभाषाएँ, मानदंड, मूल्यांकन
      streaks.ts                      # दैनिक स्ट्रीक ट्रैकिंग
      leaderboard.ts                  # रैंक गणना, SSE, रोटेशन
      antiCheat.ts                    # रेट लिमिटिंग, z-स्कोर, ऑडिट
      sharing.ts                      # टोकन ट्रांसफ़र लेजर
      invites.ts                      # आमंत्रण/रिडीम कोड
      servers.ts                      # कम्युनिटी सर्वर फ़ेडरेशन
      events.ts                       # इवेंट एमिटर (एकीकरण बिंदु)
      notifications.ts                # SSE नोटिफ़िकेशन स्ट्रीम
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST लीडरबोर्ड
        leaderboard/stream/route.ts   # SSE रियल-टाइम अपडेट
        transfer/route.ts             # GET/POST ट्रांसफ़र
        invite/route.ts               # GET/POST/DELETE आमंत्रण कोड
        invite/redeem/route.ts        # POST रिडीम कोड
        servers/route.ts              # GET/POST/DELETE सर्वर
        federation/score/route.ts     # POST स्कोर पुश करें
        federation/leaderboard/route.ts # GET लीडरबोर्ड पुल करें
        notifications/route.ts        # SSE नोटिफ़िकेशन
        anomalies/route.ts            # GET विसंगति रिपोर्ट
        rotate/route.ts               # POST सीक्रेट रोटेट करें
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # रैंकिंग पेज
        profile/page.tsx               # XP/बैज/स्ट्रीक पेज
        tokens/page.tsx                # बैलेंस/ट्रांसफ़र/आमंत्रण पेज
        gamification/admin/page.tsx    # एडमिन विसंगति निगरानी
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # यह दस्तावेज़
```

---

## माइग्रेशन रणनीति

### चरण 1: बैकएंड कोर (PR 1)

- माइग्रेशन `060_create_gamification.sql` (8 टेबल)।
- `src/lib/db/gamification.ts` (डोमेन मॉड्यूल)।
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`।
- `chatCore.ts` में एकीकरण बिंदु।
- XP, स्ट्रीक और इवेंट के लिए यूनिट टेस्ट।

### चरण 2: बैज और लीडरबोर्ड (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`।
- कॉन्स्टेंट्स में बैज परिभाषाएँ।
- लीडरबोर्ड API रूट + SSE स्ट्रीम।
- बैज और लीडरबोर्ड के लिए यूनिट टेस्ट।

### चरण 3: शेयरिंग और आमंत्रण (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`।
- ट्रांसफ़र + आमंत्रण API रूट।
- शेयरिंग, आमंत्रण और एंटी-चीट के लिए यूनिट टेस्ट।

### चरण 4: फ़ेडरेशन और डैशबोर्ड (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`।
- फ़ेडरेशन API रूट।
- डैशबोर्ड पेज (लीडरबोर्ड, प्रोफ़ाइल, टोकन, एडमिन)।
- MCP टूल्स का पंजीकरण।

---

## भविष्य के विचार

- **मौसमी इवेंट्स**: समय-सीमित बैज सेट और लीडरबोर्ड सीज़न।
- **टीम लीडरबोर्ड**: उपयोगकर्ताओं को संगठन या कॉम्बो के आधार पर समूहित करें।
- **XP गुणक**: प्रचार अवधियों के दौरान XP बढ़ाएँ।
- **उपलब्धि साझा करना**: साझा करने योग्य बैज कार्ड (OpenGraph इमेज) जनरेट करें।
- **मोबाइल पुश**: बैज/लेवल इवेंट्स के लिए webhook-आधारित सूचनाएँ।
- **लीडरबोर्ड API**: तृतीय-पक्ष इंटीग्रेशन के लिए सार्वजनिक API।
