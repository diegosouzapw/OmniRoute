# Gamification & Leaderboard System (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **सत्याचा अधिकृत स्रोत:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **शेवटचे अद्यतन:** 2026-06-28 — v3.8.40

OmniRoute मध्ये स्थानिक-प्रथम गेमिफिकेशन स्तर समाविष्ट आहे, जो वापरकर्त्यांना
प्लॅटफॉर्मशी संवाद साधल्याबद्दल — विनंत्या करणे, प्रदाते बदलणे, कॉम्बो तयार
करणे, टोकन सामायिक करणे आणि समुदायात योगदान देणे — बक्षीस देतो. सर्व स्थिती
SQLite मध्ये असते; समुदाय सर्व्हरसह फेडरेशन पर्यायी आणि पुश-आधारित आहे.

ही प्रणाली **महत्त्वाच्या कार्यपथावर शून्य-विलंब** राखण्यासाठी तयार केली आहे —
गेमिफिकेशन इव्हेंट विनंती पाइपलाइनमधून फायर-अँड-फरगेट पद्धतीने पाठवले जातात
आणि LLM प्रतिसादाला कधीही अवरोधित करत नाहीत.

---

## आढावा

### उद्देश

दृश्यमान प्रगती (XP, स्तर, बॅज), सामाजिक मान्यता (लीडरबोर्ड) आणि आर्थिक
प्रोत्साहने (टोकन सामायिकरण, आमंत्रण बक्षिसे) प्रदान करून वापरकर्त्यांचा सहभाग
आणि टिकाव वाढवणे.

### व्याप्ती

| वैशिष्ट्य         | वर्णन                                                           |
| ----------------- | --------------------------------------------------------------- |
| XP आणि स्तर       | प्रत्येक कृतीसाठी XP मिळवा; बहुपदीय वक्रानुसार स्तर वाढवा       |
| बॅज               | 4 दुर्मिळता श्रेणींसह 5 प्रवर्गांमधील 20+ उपलब्धी               |
| सलग वापर          | सध्याच्या/सर्वाधिक सलग दिवसांसह दैनंदिन सक्रिय वापराचे ट्रॅकिंग |
| लीडरबोर्ड         | जागतिक, साप्ताहिक, मासिक, टोकन-सामायिकरण आणि योगदान व्याप्ती    |
| टोकन सामायिकरण    | दुहेरी-नोंद लेजरद्वारे वापरकर्त्यांमध्ये क्रेडिट हस्तांतरित करा |
| आमंत्रण आणि रिडीम | SHA-256 हॅश केलेल्या संचयनासह रेफरल कोड                         |
| समुदाय सर्व्हर    | बाह्य OmniRoute इन्स्टन्ससह फेडरेशन                             |
| फसवणूक-प्रतिबंध   | सर्व्हर-साइड स्कोअरिंग, दर मर्यादा आणि z-score विसंगती शोध      |

### डिझाइन तत्त्वे

1. **स्थानिक-प्रथम** — सर्व स्थिती SQLite मध्ये; कोणत्याही बाह्य सेवांची आवश्यकता नाही.
2. **अवरोधरहित** — इव्हेंट फायर-अँड-फरगेट पद्धतीचे आहेत; LLM प्रतिसादाचा कार्यपथ
   गेमिफिकेशन लॉजिकमुळे कधीही विलंबित होत नाही.
3. **सर्व्हर-अधिकृत** — XP फक्त सर्व्हर-साइडवर मोजला जातो; क्लायंट
   स्कोअर कृत्रिमरीत्या वाढवू शकत नाहीत.
4. **गोपनीयतेचा आदर करणारे** — लीडरबोर्ड सहभाग पर्यायी आहे; वापरकर्ते
   त्यांचे प्रोफाइल लपवू शकतात.
5. **फेडरेशन-सज्ज** — समुदाय सर्व्हर स्वाक्षरी केलेल्या API द्वारे स्कोअर पुश करू शकतात;
   सिंक अधिलिखित करते, बेरीज करत नाही.

---

## आर्किटेक्चर

### उच्च-स्तरीय प्रवाह

```
क्लायंट विनंती
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (विद्यमान पाइपलाइन) ...
      → अपस्ट्रीम प्रतिसाद क्लायंटला पाठवला
      → setImmediate (फायर-अँड-फरगेट):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

इव्हेंट एमिटर हा एकमेव एकत्रीकरण बिंदू आहे. प्रतिसाद पाठवल्यानंतर `chatCore.ts`
`emitGamificationEvent()` ला कॉल करते; इव्हेंट मॉड्यूल XP, सलग वापर, बॅज,
लीडरबोर्ड आणि फसवणूक-प्रतिबंध उपप्रणालींकडे इव्हेंट वितरित करते.

### मॉड्यूल अवलंबित्व आलेख

```
src/lib/gamification/
  events.ts          ← प्रवेश बिंदू (chatCore.ts मधून कॉल केला जातो)
    ├── xp.ts        ← XP गणना आणि स्तर निर्धारण
    ├── streaks.ts   ← दैनंदिन सक्रिय सलग वापराचे ट्रॅकिंग
    ├── badges.ts    ← बॅज निकषांचे मूल्यमापन
    ├── leaderboard.ts ← क्रमवारी गणना आणि SSE प्रसारण
    ├── antiCheat.ts ← दर मर्यादा आणि विसंगती शोध
    ├── sharing.ts   ← टोकन हस्तांतरण लेजर
    ├── invites.ts   ← आमंत्रण/रिडीम कोड व्यवस्थापन
    ├── servers.ts   ← समुदाय सर्व्हर फेडरेशन
    └── notifications.ts ← SSE सूचना प्रवाह

src/lib/db/
  gamification.ts    ← सर्व CRUD कार्ये (8 तक्ते)

src/app/api/gamification/
  leaderboard/       ← क्रमवारीसाठी GET, स्वहस्ते रीफ्रेशसाठी POST
  leaderboard/stream ← SSE रिअल-टाइम अद्यतने
  transfer/          ← इतिहासासाठी GET, टोकन पाठवण्यासाठी POST
  invite/            ← कोडसाठी GET/POST, रद्द करण्यासाठी DELETE
  invite/redeem/     ← कोड रिडीम करण्यासाठी POST
  servers/           ← समुदाय सर्व्हरसाठी GET/POST/DELETE
  federation/score/  ← सर्व्हरवर स्कोअर पुश करण्यासाठी POST
  federation/leaderboard/ ← सर्व्हरवरून लीडरबोर्ड पुल करण्यासाठी GET
  notifications/     ← SSE बॅज/स्तर-वाढ सूचना
  anomalies/         ← विसंगती अहवालांसाठी GET (प्रशासक)
  rotate/            ← आमंत्रण टोकन गुपिते बदलण्यासाठी POST
```

---

## डेटा स्तर

### डेटाबेस तक्ते

सर्व तक्ते मुख्य OmniRoute SQLite डेटाबेसमध्ये असतात आणि ते
`060_create_gamification.sql` माइग्रेशनद्वारे तयार केले जातात. WAL जर्नलिंग हे
`src/lib/db/core.ts` मधील सिंगलटन `getDbInstance()` कडून वारशाने मिळते.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
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
│     user_badges         │     │    badge_definitions      │
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

हे मानक OmniRoute पॅटर्नचे अनुसरण करते — `core.ts` मधून `getDbInstance()` आयात करते आणि टाइप केलेली CRUD फंक्शन्स निर्यात करते. रूट हँडलर्समध्ये कोणतेही रॉ SQL नाही.

प्रमुख फंक्शन्स:

| फंक्शन                     | वर्णन                                                               |
| -------------------------- | ------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | (api_key_id, scope, period) साठी स्कोअर समाविष्ट किंवा अद्ययावत करा |
| `getLeaderboard()`         | दिलेल्या scope/period साठी पृष्ठांकित क्रमवारी                      |
| `getUserLevel()`           | वापरकर्ता स्तराची नोंद मिळवा किंवा तयार करा                         |
| `updateUserLevel()`        | XP, level आणि title अणुरूप पद्धतीने सेट करा                         |
| `getBadgeDefinitions()`    | सर्व बॅज व्याख्या (पर्यायाने फिल्टर केलेल्या)                       |
| `getUserBadges()`          | वापरकर्त्याने मिळवलेले बॅज                                          |
| `awardBadge()`             | बॅज मिळाल्याची नोंद समाविष्ट करा (badge_id वर आयडेम्पोटंट)          |
| `logXpAction()`            | xp_audit_log मध्ये नोंद जोडा                                        |
| `getXpAuditLog()`          | वापरकर्त्यासाठी पृष्ठांकित ऑडिट इतिहास                              |
| `insertLedgerEntry()`      | दुहेरी-नोंद हस्तांतरण (व्यवहारामध्ये)                               |
| `getBalance()`             | वापरकर्त्यासाठी प्राप्त रकमेची बेरीज वजा पाठवलेली रक्कम             |
| `getTransferHistory()`     | पृष्ठांकित हस्तांतरण लॉग                                            |
| `createInviteToken()`      | आमंत्रण कोड + हॅश केलेले टोकन समाविष्ट करा                          |
| `redeemInviteToken()`      | कोडद्वारे शोधा, प्रमाणीकरण करा आणि uses वाढवा                       |
| `upsertCommunityServer()`  | फेडरेशन सर्व्हरची नोंदणी करा किंवा अद्ययावत करा                     |
| `getCommunityServers()`    | वापरकर्त्याचे सर्व्हर सूचीबद्ध करा                                  |
| `deleteCommunityServer()`  | सर्व्हर नोंदणी काढून टाका                                           |

---

## XP / स्तर प्रणाली

**फाइल:** `src/lib/gamification/xp.ts`

### स्तर वक्र

स्तर `n` गाठण्यासाठी आवश्यक XP बहुपदी वक्राचे अनुसरण करतो:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| स्तर | पुढील स्तरासाठी XP | एकत्रित XP | पदवी     |
| ---- | ------------------ | ---------- | -------- |
| 1    | 100                | 100        | नवशिक्या |
| 5    | 1,118              | 2,415      | नवशिक्या |
| 10   | 3,162              | 10,523     | अन्वेषक  |
| 25   | 12,500             | 86,024     | अन्वेषक  |
| 50   | 35,355             | 345,529    | तज्ज्ञ   |
| 75   | 64,952             | 948,683    | निष्णात  |
| 100  | 100,000            | 2,050,000  | दिग्गज   |

### पदव्या

| स्तर श्रेणी | पदवी     |
| ----------- | -------- |
| 1 – 9       | नवशिक्या |
| 10 – 24     | अन्वेषक  |
| 25 – 49     | तज्ज्ञ   |
| 50 – 74     | निष्णात  |
| 75 – 100    | दिग्गज   |

### XP बक्षिसे

| कृती              | XP  | वर्णन                                                         |
| ----------------- | --- | ------------------------------------------------------------- |
| `request`         | 1   | OmniRoute द्वारे मार्गित केलेल्या प्रत्येक API विनंतीसाठी     |
| `provider_switch` | 5   | वेगळ्या प्रदात्याकडे स्विच करणे                               |
| `model_switch`    | 3   | वेगळ्या मॉडेलकडे स्विच करणे                                   |
| `combo_create`    | 10  | नवीन कॉम्बो तयार करणे                                         |
| `combo_use`       | 2   | विनंतीसाठी कॉम्बो वापरणे                                      |
| `token_share`     | 1   | दुसऱ्या वापरकर्त्यासोबत शेअर केलेल्या प्रत्येक 1 000 टोकनसाठी |
| `invite_redeem`   | 50  | आमंत्रण कोड रिडीम करणे                                        |
| `daily_login`     | 5   | दैनंदिन सक्रिय वापर (दिवसातून एकदा)                           |
| `streak_bonus`    | 2   | प्रत्येक सलग स्ट्रीक दिवसासाठी (स्ट्रीकच्या लांबीने गुणिलेले) |
| `badge_unlock`    | 10  | बॅज अनलॉक करणे                                                |

### प्रदान करण्याचा प्रवाह

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. XP रक्कम मिळवण्यासाठी `XP_REWARDS[action]` शोधा.
2. `checkRateLimit()` मधून पाठवा (फसवणूक-प्रतिबंध: प्रत्येक कीसाठी कमाल 1000 XP/मिनिट).
3. ट्रान्झॅक्शन उघडा:
   - सध्याची `user_levels` पंक्ती वाचा.
   - XP जोडा; `levelFromXp(totalXp)` द्वारे स्तराची पुनर्गणना करा.
   - स्तर बदलला असल्यास, `levelUp = true` सेट करा.
   - `user_levels` पंक्ती अपडेट करा.
   - `xp_audit_log` मध्ये नोंद घाला.
4. निकाल परत करा. कॉलर सूचना हाताळतो.

### सहाय्यक: `levelFromXp(totalXp)`

एकत्रित XP ने `totalXp` ओलांडेपर्यंत `xp_for_level(n)` ची बेरीज करत,
स्तर 1..100 मधून पुनरावृत्ती करतो. ज्या सर्वोच्च स्तराचा उंबरठा गाठला आहे तो परत करतो.
हे O(100) आहे — स्तरांची कमाल मर्यादा 100 असल्याने स्वीकार्य आहे.

---

## बॅज प्रणाली

**फाइल:** `src/lib/gamification/badges.ts`

### श्रेण्या

| श्रेणी         | वर्णन                                       | उदाहरणार्थ बॅज                      |
| -------------- | ------------------------------------------- | ----------------------------------- |
| `usage`        | वापराच्या प्रमाणावर आधारित महत्त्वाचे टप्पे | पहिली विनंती, 1K विनंत्या, 100K     |
| `sharing`      | टोकन शेअरिंग आणि रेफरल                      | पहिले शेअर, उदार (10 शेअर)          |
| `contribution` | समुदायातील सहभाग                            | कॉम्बो निर्माता, प्रदाता अन्वेषक    |
| `streak`       | कालांतराने सातत्य                           | साप्ताहिक योद्धा, मासिक समर्पित     |
| `rare`         | मिळवण्यास कठीण किंवा लपवलेली कामगिरी        | प्रारंभिक स्वीकारकर्ता, बग रिपोर्टर |

### दुर्मिळता

| दुर्मिळता   | रंग    | संभाव्यतेचा संकेत |
| ----------- | ------ | ----------------- |
| `common`    | राखाडी | बहुतांश वापरकर्ते |
| `uncommon`  | हिरवा  | सक्रिय वापरकर्ते  |
| `rare`      | निळा   | समर्पित वापरकर्ते |
| `legendary` | सोनेरी | सर्वोच्च 1%       |

### निकषांचे प्रकार

| प्रकार         | फील्ड        | वर्णन                                             |
| -------------- | ------------ | ------------------------------------------------- |
| `action_count` | `count`      | कृती N वेळा करा (उदा., 1000 विनंत्या)             |
| `streak`       | `days`       | सलग N दिवस स्ट्रीक कायम ठेवा                      |
| `unique_count` | `field`, `n` | N अद्वितीय मूल्ये वापरा (उदा., 10 वेगवेगळी मॉडेल) |
| `rank`         | `scope`, `n` | लीडरबोर्डच्या व्याप्तीवर N क्रमांक गाठा           |
| `first`        | —            | एखादी कृती करणारे पहिले व्हा                      |
| `hidden`       | (बदलते)      | मिळवेपर्यंत निकष दाखवले जात नाहीत                 |

बॅजच्या व्याख्या `badge_definitions` मध्ये JSON `criteria` म्हणून संग्रहित केल्या जातात:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### मूल्यमापन प्रवाह

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # सर्व व्याख्या
    → getUserBadges(apiKeyId)         # आधीच मिळवलेले (वगळा)
    → न मिळवलेल्या प्रत्येक बॅजसाठी:
       → matchesCriteria(badge, event, userState)
       → जुळल्यास: awardBadge(apiKeyId, badgeId)
         → सूचना पेलोड परत करा
```

मूल्यमापन **इव्हेंट-आधारित** आहे — ते प्रत्येक गेमिफिकेशन इव्हेंटनंतर चालते, परंतु
फक्त अशा बॅजची तपासणी करते ज्यांचा `criteria.type` इव्हेंटच्या कृतीशी जुळतो. यामुळे
मूल्यमापन जलद राहते (बहुतांश इव्हेंटसाठी < 5ms).

### `matchesCriteria(badge, event, userState)`

| निकष प्रकार    | तपासणी                                             |
| -------------- | -------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`        |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`               |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`             |
| `rank`         | `getRank(apiKeyId, scope) <= n`                    |
| `first`        | या कृती प्रकारासाठी आधीची `xp_audit_log` नोंद नाही |
| `hidden`       | योग्य उप-तपासणीकडे सोपवते                          |

### अंगभूत बॅज (20+)

<details>
<summary>बॅजची संपूर्ण यादी</summary>

| बॅज                    | श्रेणी      | दुर्मिळता  | निकष                            |
| ---------------------- | ----------- | ---------- | ------------------------------- |
| पहिली पावले            | वापर        | सामान्य    | 1 विनंती                        |
| सरावाची सुरुवात        | वापर        | सामान्य    | 100 विनंत्या                    |
| प्रगत वापरकर्ता        | वापर        | असामान्य   | 1,000 विनंत्या                  |
| शतवीर                  | वापर        | दुर्मिळ    | 10,000 विनंत्या                 |
| सर्वशक्तिमान           | वापर        | दंतकथात्मक | 100,000 विनंत्या                |
| प्रदाता बदलकर्ता       | योगदान      | सामान्य    | 5 वेगवेगळे प्रदाते वापरा        |
| प्रदाता तज्ज्ञ         | योगदान      | असामान्य   | 20 वेगवेगळे प्रदाते वापरा       |
| कॉम्बो रचनाकार         | योगदान      | असामान्य   | 5 कॉम्बो तयार करा               |
| कॉम्बो महागुरू         | योगदान      | दुर्मिळ    | 25 कॉम्बो तयार करा              |
| पहिले सामायिकीकरण      | सामायिकीकरण | सामान्य    | 1 टोकन हस्तांतरण                |
| उदार                   | सामायिकीकरण | असामान्य   | 10 टोकन हस्तांतरणे              |
| परोपकारी               | सामायिकीकरण | दुर्मिळ    | एकूण 10,000 टोकन हस्तांतरित करा |
| संदर्भदाता             | सामायिकीकरण | सामान्य    | 1 यशस्वी संदर्भ                 |
| नेटवर्क निर्माता       | सामायिकीकरण | असामान्य   | 10 यशस्वी संदर्भ                |
| सप्ताह योद्धा          | सलगता       | असामान्य   | 7 दिवसांची सलगता                |
| मासिक समर्पित          | सलगता       | दुर्मिळ    | 30 दिवसांची सलगता               |
| अजिंक्य                | सलगता       | दंतकथात्मक | 365 दिवसांची सलगता              |
| प्रारंभिक स्वीकारकर्ता | दुर्मिळ     | दंतकथात्मक | बीटा कालावधीत सामील व्हा        |
| संक्षेपण प्रणेता       | दुर्मिळ     | असामान्य   | संक्षेपण 100 वेळा वापरा         |
| कौशल्य संग्राहक        | दुर्मिळ     | दुर्मिळ    | 10 वेगवेगळी कौशल्ये वापरा       |
| मॉडेल अन्वेषक          | योगदान      | असामान्य   | 15 वेगवेगळी मॉडेल वापरा         |

</details>

---

## स्ट्रीक ट्रॅकर

**फाइल:** `src/lib/gamification/streaks.ts`

### डेटा मॉडेल

स्ट्रीक्स `key_value` टेबलमध्ये (सामायिक युटिलिटी टेबल) नेमस्पेसयुक्त की अंतर्गत संग्रहित केल्या जातात:

| की                            | मूल्य                            | वर्णन               |
| ----------------------------- | -------------------------------- | ------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | सक्रिय स्ट्रीक डेटा |

### तर्कशास्त्र

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. `key_value` मधून स्ट्रीक रेकॉर्ड वाचा.
2. `{current}`, `{longest}`, `{lastDate}` (ISO दिनांक स्ट्रिंग) पार्स करा.
3. जर `lastDate === today` असेल — कोणताही बदल नाही (आज आधीच मोजले गेले आहे).
4. जर `lastDate === yesterday` असेल — `current` वाढवा; आवश्यक असल्यास `longest` अद्ययावत करा.
5. जर `lastDate < yesterday` असेल — `current = 1` वर रीसेट करा (स्ट्रीक खंडित झाली).
6. अद्ययावत रेकॉर्ड लिहा.
7. माइलस्टोन्स तपासा: 7, 14, 30, 60, 90, 180, 365 दिवस. एखादा माइलस्टोन पार केल्यास,
   `milestone = true` सेट करा (कॉलर XP प्रदान करतो आणि बॅज तपासतो).

### विशेष परिस्थिती

- **टाइमझोन**: स्ट्रीक्स UTC दिनांक वापरतात (`new Date().toISOString().slice(0, 10)`).
  हे हेतुपुरस्सर आहे — एकच प्रमाणित टाइमझोन वापरल्यामुळे टाइमझोन बदलून
  गैरफायदा घेता येत नाही.
- **नवीन वापरकर्ते**: कोणतेही स्ट्रीक रेकॉर्ड अस्तित्वात नसते; पहिली विनंती
  `current=1, longest=1, lastDate=today` सह ते तयार करते.
- **दररोज अनेक विनंत्या**: UTC दिवसातील केवळ पहिली विनंती
  स्ट्रीक वाढवते.

---

## लीडरबोर्ड

**फाइल:** `src/lib/gamification/leaderboard.ts`

### व्याप्ती

| व्याप्ती        | कालावधी | वर्णन                                                           |
| --------------- | ------- | --------------------------------------------------------------- |
| `global`        | `all`   | सर्व काळातील एकत्रित XP                                         |
| `weekly`        | `week`  | चालू UTC आठवड्यात (सोम-रवि) मिळवलेले XP                         |
| `monthly`       | `month` | चालू UTC महिन्यात मिळवलेले XP                                   |
| `tokens_shared` | `all`   | इतरांना हस्तांतरित केलेले एकूण टोकन्स                           |
| `contributions` | `all`   | तयार केलेले कॉम्बोज + वापरलेले प्रोव्हायडर्स + वापरलेली कौशल्ये |

### क्रमांकाची गणना

क्रमांक संग्रहित केले जात नाहीत, तर **वाचनाच्या वेळी मोजले जातात**. यामुळे कालबाह्य क्रमांक डेटा
टाळला जातो आणि नियतकालिक क्रमांक पुनर्गणना जॉब्सची आवश्यकता संपते.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

क्वेरी पॅटर्न:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### कालावधी रोटेशन

साप्ताहिक आणि मासिक लीडरबोर्ड आपोआप रोटेट होतात:

1. **संग्रहित करा**: कालावधीच्या सीमेवर, कालावधी लेबलसह चालू नोंदी
   `leaderboard_archive` मध्ये कॉपी करा.
2. **रीसेट करा**: कालबाह्य झालेल्या कालावधीच्या नोंदी हटवा.
3. **ट्रिगर**: प्रत्येक `updateLeaderboard()` कॉलवर तपासले जाते; नवीन कालावधीतील पहिली विनंती
   रोटेशन ट्रिगर करते.

यामुळे साप्ताहिक बोर्ड दर सोमवारी 00:00 UTC वाजता आणि मासिक बोर्ड
प्रत्येक महिन्याच्या 1 तारखेला रीसेट होतात.

### SSE रिअल-टाइम अद्यतने

**एंडपॉइंट:** `GET /api/gamification/stream`

```
क्लायंट → GET /api/gamification/stream
  → SSE कनेक्शन स्थापित झाले
  → सर्व्हर त्वरित शीर्ष-10 लीडरबोर्ड स्नॅपशॉट पाठवतो
  → दर 5 सेकंदांनी: बदल झाला असल्यास अद्ययावत शीर्ष-10 पाठवा
  → दर 15 सेकंदांनी: हार्टबीट टिप्पणी (": heartbeat\n\n")
  → क्लायंट डिस्कनेक्ट होतो → क्लीनअप (लिसनर काढून टाका)
```

इव्हेंट स्वरूप:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE मॅनेजर प्रत्येक व्याप्तीनुसार कनेक्ट केलेल्या क्लायंट्सचा मागोवा घेतो आणि शेवटच्या पुशनंतर
लीडरबोर्ड डेटा प्रत्यक्षात बदलला असेल तेव्हाच अद्यतने पाठवतो.

---

## टोकन सामायिकरण

**फाइल:** `src/lib/gamification/sharing.ts`

### दुहेरी-नोंद खातेवही

प्रत्येक हस्तांतरणामुळे `token_ledger` मध्ये दोन पंक्ती तयार होतात:

| पंक्ती  | `from_key_id` | `to_key_id`  | `amount` |
| ------- | ------------- | ------------ | -------- |
| डेबिट   | प्रेषक        | प्राप्तकर्ता | +रक्कम   |
| क्रेडिट | प्राप्तकर्ता  | प्रेषक       | -रक्कम   |

थांबा — प्रचलित पद्धत अशी आहे:

| पंक्ती       | `from_key_id` | `to_key_id`  | `amount` | अर्थ                   |
| ------------ | ------------- | ------------ | -------- | ---------------------- |
| पाठवणे       | प्रेषक        | प्राप्तकर्ता | +रक्कम   | प्रेषकाकडून बाहेर जाणे |
| प्राप्त करणे | प्राप्तकर्ता  | प्रेषक       | +रक्कम   | प्राप्तकर्त्याकडे येणे |

शिल्लक खालीलप्रमाणे मोजली जाते:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### हस्तांतरण प्रवाह

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **प्रमाणीकरण**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **पुनरावृत्ती-सुरक्षितता**: `idempotency_key` खातेवहीमध्ये आधीपासून अस्तित्वात आहे का ते तपासा.
   असल्यास, कॅश केलेला परिणाम परत करा.
3. **व्यवहार** (एकल SQLite व्यवहार):
   a. प्रेषकाची शिल्लक मोजा.
   b. `balance < amount` असल्यास, प्रक्रिया रद्द करा (अपुरा निधी).
   c. पाठवण्याची पंक्ती समाविष्ट करा (`from=sender,` परत करा.

### दर मर्यादा

- प्रत्येक API कीसाठी प्रति मिनिट कमाल 10 हस्तांतरणे.
- एका हस्तांतरणासाठी कमाल 10,000 टोकन.
- प्रत्येक API कीसाठी दररोज कमाल 100,000 टोकन हस्तांतरित करता येतील.

---

## आमंत्रण आणि टोकन रिडीम करणे

**फाइल:** `src/lib/gamification/invites.ts`

### कोड स्वरूप

- **कोड**: 8-वर्णांचा अक्षरांकयुक्त कोड (उदा., `A3K9-X7M2`), मानव-वाचनीय,
  वापरकर्त्याला प्रदर्शित केला जातो.
- **टोकन**: 32-बाइट यादृच्छिक टोकन, SHA-256 हॅश म्हणून संग्रहित केले जाते.
  प्रोग्रामद्वारे रिडेम्प्शन करण्यासाठी वापरले जाते (उदा., URL दुवे).

### संचयन

| स्तंभ        | मूल्य                            |
| ------------ | -------------------------------- |
| `code`       | `A3K9X7M2` (अद्वितीय, अनुक्रमित) |
| `token_hash` | SHA-256(raw_token)               |

निर्मितीच्या वेळी रॉ टोकन वापरकर्त्याला नेमके एकदाच परत केले जाते. OmniRoute
ते पुन्हा कधीही संग्रहित किंवा प्रदर्शित करत नाही — फक्त हॅश कायम राहतो.

### स्व-संदर्भ प्रतिबंध

वापरकर्ता एखादा कोड रिडीम करतो तेव्हा, प्रणाली खालील बाबी तपासते:

1. कोड वेगळ्या `api_key_id` चा आहे.
2. रिडीम करणाऱ्या वापरकर्त्याने यापूर्वी त्याच
   संदर्भकर्त्याचा कोणताही कोड रिडीम केलेला नाही (`invite_tokens` + रिडेम्प्शन लॉगवर जॉइन).

यापैकी कोणतीही तपासणी अयशस्वी झाल्यास, स्पष्ट त्रुटी संदेशासह रिडेम्प्शन नाकारले जाते.

### कालबाह्यता आणि मर्यादा

- डीफॉल्ट `max_uses`: 10 (निर्मितीच्या वेळी कॉन्फिगर करता येते).
- डीफॉल्ट `expires_at`: निर्मितीपासून 30 दिवस.
- कालबाह्य झालेले किंवा वापरमर्यादा संपलेले कोड HTTP 410 Gone परत करतात.

---

## समुदाय सर्व्हर फेडरेशन

**फाइल:** `src/lib/gamification/servers.ts`

### कनेक्ट करणे

रिमोट सर्व्हरने जारी केलेल्या आमंत्रण टोकनद्वारे समुदाय सर्व्हरची नोंदणी केली जाते. स्थानिक इन्स्टन्स:

1. आमंत्रण टोकन प्राप्त करते (उदा., डॅशबोर्डमध्ये पेस्ट केलेले).
2. टोकनची वैधता तपासण्यासाठी आणि सध्याचा लीडरबोर्ड मिळवण्यासाठी रिमोट सर्व्हरवरील `POST /api/gamification/federation/leaderboard` कॉल करते.
3. `status: connected` सह सर्व्हर रेकॉर्ड संग्रहित करते.

### समक्रमण मॉडेल

फेडरेशनमध्ये अतिरिक्त समक्रमणाऐवजी **ओव्हरराइट समक्रमण** वापरले जाते:

```
स्थानिक इन्स्टन्स               समुदाय सर्व्हर
     │                              │
     ├── स्कोअर पुश करा ──────────►│  POST /federation/score
     │   { api_key_id, score }      │  (सर्व्हर टोकन हॅशची वैधता तपासतो)
     │                              │
     ├── लीडरबोर्ड पुल करा ───────►│  GET /federation/leaderboard
     │◄── शीर्ष-N नोंदी ───────────┤  (स्थानिक कॅश ओव्हरराइट करते)
     │                              │
     └── आरोग्य तपासणी ───────────►│  GET /federation/health
         (दर 60s ने, टाइमआउट 5s)   │
```

### प्रमाणीकरण

फेडरेशन विनंत्यांमध्ये पुढील गोष्टी समाविष्ट असतात:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

रिमोट सर्व्हर टोकनचे हॅशिंग करतो आणि त्याच्याशी जुळणारी `community_servers` पंक्ती शोधतो. यामुळे संग्रहित हॅश पाठवणे टाळले जाते.

### आरोग्य निरीक्षण

प्रत्येक सर्व्हर रेकॉर्ड पुढील गोष्टींचा मागोवा ठेवते:

| फील्ड       | वर्णन                                      |
| ----------- | ------------------------------------------ |
| `status`    | `connected`, `degraded`, `unreachable`     |
| `last_sync` | शेवटच्या यशस्वी समक्रमणाचा ISO टाइमस्टॅम्प |
| `failures`  | सलग अयशस्वी आरोग्य तपासण्या                |

सलग 5 तपासण्या अयशस्वी झाल्यानंतर स्थिती `unreachable` मध्ये बदलते आणि मॅन्युअल आरोग्य तपासणी यशस्वी होईपर्यंत समक्रमण थांबवले जाते.

---

## फसवणूक-प्रतिबंध

**फाइल:** `src/lib/gamification/antiCheat.ts`

### सर्व्हर-साइड स्कोअरिंग

सर्व XP गणना `src/lib/gamification/xp.ts` मध्ये होतात. क्लायंट कधीही स्कोअर सबमिट करत नाहीत — ते कृती सबमिट करतात आणि सर्व्हर XP ची गणना करतो. `leaderboard.score` स्तंभात केवळ सर्व्हर-साइड कोडद्वारेच लिहिता येते.

### दर मर्यादा

| मर्यादा                    | मूल्य   | व्याप्ती               |
| -------------------------- | ------- | ---------------------- |
| प्रति मिनिट कमाल XP        | 1,000   | प्रत्येक API कीसाठी    |
| प्रति मिनिट कमाल ट्रान्सफर | 10      | प्रत्येक API कीसाठी    |
| कमाल ट्रान्सफर रक्कम       | 10,000  | प्रत्येक ट्रान्सफरसाठी |
| कमाल दैनिक ट्रान्सफर       | 100,000 | प्रत्येक API कीसाठी    |

दर मर्यादांसाठी इन-मेमरी स्लाइडिंग विंडो वापरली जाते (`open-sse/services/` मधील `RateLimitManager` प्रमाणेच पॅटर्न). प्रक्रिया रीस्टार्ट झाल्यास SQLite-समर्थित काउंटरचा पर्याय म्हणून वापर केला जातो.

### Z-स्कोअर विसंगती शोध

प्रत्येक API कीसाठी, प्रणाली दर तासाला मिळवलेल्या XP ची 7 दिवसांची रोलिंग विंडो राखते. प्रत्येक XP पुरस्काराच्या वेळी:

1. वापरकर्त्याचा सध्याचा ताशी XP दर मोजा.
2. लोकसंख्येची सरासरी आणि प्रमाणित विचलन मोजा.
3. `z = (user_rate - mean) / stddev` ची गणना करा.
4. `z > 3.0` (3 प्रमाणित विचलने) असल्यास, विसंगती म्हणून चिन्हांकित करा.

विसंगती `xp_audit_log` मध्ये `action = 'anomaly_detected'` सह लॉग केल्या जातात आणि अॅडमिन डॅशबोर्डवर दाखवल्या जातात.

### ऑडिट ट्रेल

प्रत्येक XP पुरस्कार, ट्रान्सफर, बॅज प्राप्ती आणि विसंगती शोध `xp_audit_log` मध्ये पुढील माहितीसह लॉग केला जातो:

| फील्ड        | वर्णन                                     |
| ------------ | ----------------------------------------- |
| `api_key_id` | कोणी                                      |
| `action`     | काय घडले (xp_award, transfer, anomaly, …) |
| `xp_awarded` | रक्कम (XP नसलेल्या इव्हेंटसाठी 0)         |
| `metadata`   | संदर्भासह JSON (कृतीचा प्रकार, लक्ष्य, …) |
| `created_at` | केव्हा (ISO 8601)                         |

अॅडमिन `GET /api/gamification/anomalies` द्वारे संपूर्ण ऑडिट ट्रेल क्वेरी करू शकतात.

---

## API मार्ग

सर्व मार्ग मानक OmniRoute नमुन्याचे अनुसरण करतात:

```
मार्ग → CORS प्रीफ्लाइट → मुख्य भागाचे प्रमाणीकरण (Zod) → प्रमाणीकरण (extractApiKey)
  → हँडलर
```

### एंडपॉइंट्स

| पद्धत  | मार्ग                                      | वर्णन                                          | प्रमाणीकरण |
| ------ | ------------------------------------------ | ---------------------------------------------- | ---------- |
| GET    | `/api/gamification/leaderboard`            | लीडरबोर्ड मिळवा (व्याप्ती, कालावधी, पृष्ठांकन) | पर्यायी    |
| POST   | `/api/gamification/leaderboard`            | लीडरबोर्ड कॅश सक्तीने रीफ्रेश करा              | आवश्यक     |
| GET    | `/api/gamification/stream`                 | SSE रिअल-टाइम लीडरबोर्ड अद्यतने                | पर्यायी    |
| GET    | `/api/gamification/transfer`               | हस्तांतरण इतिहास मिळवा (पृष्ठांकन)             | आवश्यक     |
| POST   | `/api/gamification/transfer`               | दुसऱ्या वापरकर्त्याला टोकन पाठवा               | आवश्यक     |
| GET    | `/api/gamification/invite`                 | माझ्या आमंत्रण कोडची सूची दाखवा                | आवश्यक     |
| POST   | `/api/gamification/invite`                 | नवीन आमंत्रण कोड तयार करा                      | आवश्यक     |
| DELETE | `/api/gamification/invite`                 | आमंत्रण कोड रद्द करा                           | आवश्यक     |
| POST   | `/api/gamification/invite/redeem`          | आमंत्रण कोड वापरा                              | आवश्यक     |
| GET    | `/api/gamification/servers`                | समुदाय सर्व्हरची सूची दाखवा                    | आवश्यक     |
| POST   | `/api/gamification/servers`                | समुदाय सर्व्हरशी कनेक्ट करा                    | आवश्यक     |
| DELETE | `/api/gamification/servers`                | समुदाय सर्व्हरपासून डिस्कनेक्ट करा             | आवश्यक     |
| POST   | `/api/gamification/federation/score`       | दूरस्थ सर्व्हरवर स्कोअर पाठवा                  | फेडरेशन    |
| GET    | `/api/gamification/federation/leaderboard` | दूरस्थ सर्व्हरवरून लीडरबोर्ड मिळवा             | फेडरेशन    |
| GET    | `/api/gamification/notifications`          | SSE बॅज/स्तर-वाढ सूचना                         | आवश्यक     |
| GET    | `/api/gamification/anomalies`              | विसंगती अहवाल पाहा (प्रशासक)                   | प्रशासक    |
| POST   | `/api/gamification/rotate`                 | आमंत्रण टोकनची गुपिते रोटेट करा                | आवश्यक     |

### विनंती/प्रतिसाद उदाहरणे

**POST /api/gamification/transfer**

```json
// विनंती
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// प्रतिसाद 200
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

// प्रतिसाद 400 (अपुरा निधी)
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

## MCP साधने (8)

विद्यमान साधनांसोबत `open-sse/mcp-server/` मध्ये नोंदणीकृत. `gamification` परवानगीच्या व्याप्तीअंतर्गत मर्यादित.

| साधन                       | वर्णन                                         | इनपुट स्कीमा                 |           |
| -------------------------- | --------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | एखाद्या व्याप्तीचा/कालावधीचा लीडरबोर्ड मिळवा  | `{ scope, period?, limit? }` |
| `gamification_rank`        | कॉल करणाऱ्याची रँक आणि जवळच्या रँक्स मिळवा    | `{ scope }`                  |
| `gamification_profile`     | XP, पातळी, शीर्षक आणि स्ट्रीकचा सारांश मिळवा  | `{}`                         |
| `gamification_badges`      | मिळवलेले बॅज किंवा सर्व व्याख्या सूचीबद्ध करा | `{ earned?: boolean }`       |
| `gamification_transfer`    | दुसऱ्या वापरकर्त्याला टोकन पाठवा              | `{ to, amount }`             |
| `gamification_invite`      | आमंत्रण कोड तयार करा किंवा सूचीबद्ध करा       | `{ action: "create"          | "list" }` |
| `gamification_servers`     | समुदाय सर्व्हर सूचीबद्ध करा किंवा कनेक्ट करा  | `{ action, token? }`         |
| `gamification_anomalies`   | विसंगती अहवाल पाहा (प्रशासक व्याप्ती)         | `{ limit?, since? }`         |

---

## डॅशबोर्ड पृष्ठे

### `/dashboard/leaderboard`

- पोडियम प्रदर्शन (अवतार आणि XP सह शीर्ष 3).
- व्याप्ती निवडक: जागतिक / साप्ताहिक / मासिक / शेअर केलेले टोकन / योगदान.
- रँक, नाव, गुण, पातळी आणि शीर्षक असलेले पृष्ठांकित टेबल (प्रति पृष्ठ 25).
- SSE रिअल-टाइम अद्यतने — रँकमधील बदल अॅनिमेट होतात.
- टेबलमध्ये वर्तमान वापरकर्ता "तुमची रँक" या स्थिर पंक्तीसह ठळकपणे दर्शवला जातो.

### `/dashboard/profile`

- वर्तमान पातळी आणि पुढील पातळीच्या मर्यादेसह XP प्रगती पट्टी.
- शीर्षकाचा बॅज ठळकपणे प्रदर्शित केला जातो.
- बॅज गॅलरी — मिळवलेल्या तारखेसह मिळवलेले बॅज, न मिळवलेले बॅज राखाडी रंगात
  (लपवलेले बॅज मिळेपर्यंत "???" दाखवतात).
- ज्वाला चिन्हासह स्ट्रीक मोजणी; स्ट्रीक दिनदर्शिका (मागील 30 दिवस).
- XP इतिहास आलेख (मागील 30 दिवसांतील दैनंदिन XP).

### `/dashboard/tokens`

- टोकन शिल्लक (ठळकपणे, पृष्ठाच्या शीर्षस्थानी).
- हस्तांतरण फॉर्म: प्राप्तकर्ता, रक्कम, पुष्टीकरण संवाद.
- फिल्टरसह हस्तांतरण इतिहास टेबल (पाठवलेले/प्राप्त झालेले/सर्व).
- आमंत्रण विभाग: सक्रिय कोड, नवीन कोड तयार करणे, लिंक शेअर करणे.
- समुदाय सर्व्हर: आरोग्य स्थितीसह सूची, कनेक्ट/डिस्कनेक्ट.

### `/dashboard/gamification/admin`

- तीव्रता, वापरकर्ता, टाइमस्टॅम्प आणि z-score सह विसंगतींची सूची.
- फिल्टरसह ऑडिट लॉग दर्शक (कृतीचा प्रकार, वापरकर्ता, तारीख श्रेणी).
- प्रणाली आकडेवारी: प्रदान केलेला एकूण XP, सक्रिय वापरकर्ते, बॅज मिळवण्याचे दर.
- फेडरेशन सर्व्हरच्या आरोग्याचा आढावा.

---

## पाइपलाइन एकत्रीकरण

### एकत्रीकरण बिंदू

गेमिफिकेशन `open-sse/handlers/chatCore.ts` मधील एकाच बिंदूवर विनंती पाइपलाइनमध्ये जोडले जाते:

```typescript
// क्लायंटला प्रतिसाद पाठवल्यानंतर:
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
    // पाठवा-आणि-विसरा: लॉग करा, परंतु क्लायंटपर्यंत कधीही पोहोचवू नका
  });
});
```

### इव्हेंट प्रकार

| इव्हेंट प्रकार      | कधी उत्सर्जित होतो                        |
| ------------------- | ----------------------------------------- |
| `request.completed` | यशस्वी LLM प्रतिसाद पाठवला                |
| `provider.switch`   | प्रदाता बदलला (कॉम्बो फॉलबॅक मोजले जातात) |
| `combo.created`     | नवीन कॉम्बो कॉन्फिगरेशन जतन केले          |
| `combo.used`        | कॉम्बो लक्ष्य यशस्वीपणे गाठले             |
| `badge.earned`      | बॅज मूल्यमापनाला जुळणारा परिणाम मिळाला    |
| `streak.milestone`  | स्ट्रीक मर्यादा ओलांडली                   |
| `transfer.sent`     | टोकन हस्तांतरण पूर्ण झाले                 |
| `referral.redeemed` | आमंत्रण कोड यशस्वीपणे वापरला              |
| `compression.used`  | प्रॉम्प्ट संक्षेप लागू केला               |
| `skill.executed`    | कौशल्य अंमलबजावणी पूर्ण झाली              |
| `model.first_use`   | मागील 7 दिवसांत मॉडेल वापरले गेले नाही    |

### नॉन-ब्लॉकिंग हमी

`setImmediate` + `.catch(() => {})` नमुना पुढील गोष्टी सुनिश्चित करतो:

1. गेमिफिकेशन चालण्यापूर्वी प्रतिसाद पूर्णपणे पाठवला जातो.
2. गेमिफिकेशनमधील त्रुटी क्लायंटसमोर कधीही येत नाहीत.
3. इव्हेंट प्रक्रिया इनलाइन न चालता पुढील मायक्रोटास्कमध्ये चालते.

---

## सुरक्षा

### धोक्यांचे मॉडेल

| धोका                      | प्रतिबंधात्मक उपाय                                                   |
| ------------------------- | -------------------------------------------------------------------- |
| गुणांची कृत्रिम वाढ       | XP ची गणना केवळ सर्व्हरवर; क्लायंट गुण नव्हे, तर कृती सबमिट करतात    |
| रिप्ले हल्ले              | हस्तांतरणांवर आयडेम्पोटन्सी कीज; ऑडिट लॉगचे डीडुप्लिकेशन             |
| हस्तांतरण फसवणूक          | दुहेरी-नोंद लेजर; अणुस्तरीय व्यवहार; दर मर्यादा                      |
| स्व-संदर्भ                | रिडेम्प्शनच्या वेळी `api_key_id` ची उलटतपासणी                        |
| लीडरबोर्डमध्ये फेरफार     | Z-स्कोअर विसंगती शोध; प्रशासकीय विसंगती डॅशबोर्ड                     |
| फेडरेशन टोकनची चोरी       | SHA-256 हॅश केलेले स्टोरेज; कच्चे टोकन फक्त एकदाच दाखवले जाते        |
| आमंत्रण कोडवर ब्रूट फोर्स | रिडेम्प्शन एंडपॉइंटवर दर मर्यादा; 8-वर्णांची एन्ट्रॉपी               |
| प्रदर्शन नावांमधील XSS    | प्रदर्शन नावे स्वच्छ केली जातात; लीडरबोर्ड नोंदी एस्केप केल्या जातात |
| हॅशवरील टाइमिंग हल्ले     | टोकन हॅशच्या तुलनेसाठी `crypto.timingSafeEqual`                      |

### प्रमाणीकरण आवश्यकता

- **सार्वजनिक** (प्रमाणीकरण नाही): `GET /leaderboard`, `GET /stream` (केवळ-वाचन
  लीडरबोर्ड).
- **API की आवश्यक**: सर्व लेखन क्रिया, प्रोफाइल, हस्तांतरणे, आमंत्रणे.
- **केवळ प्रशासक**: विसंगती डॅशबोर्ड, ऑडिट लॉग व्ह्यूअर.
- **फेडरेशन**: `Authorization` हेडरमध्ये कच्चे टोकन वापरणारा स्वतंत्र प्रमाणीकरण
  मार्ग, जो संचयित SHA-256 हॅशशी पडताळला जातो.

---

## चाचणी

### चाचणी फाइल्स

सर्व चाचण्या Node.js चा मूळ टेस्ट रनर (`node --import tsx/esm --test`) वापरतात.

| चाचणी फाइल                                    | समाविष्ट बाबी                                  | चाचण्या |
| --------------------------------------------- | ---------------------------------------------- | ------- |
| `tests/unit/gamification/xp.test.ts`          | XP गणना, स्तर वक्र, पदव्या                     | 8       |
| `tests/unit/gamification/badges.test.ts`      | बॅज निकष जुळवणे, प्रदान करणे                   | 10      |
| `tests/unit/gamification/streaks.test.ts`     | स्ट्रीक तर्क, टप्पे, सीमांत प्रकरणे            | 7       |
| `tests/unit/gamification/leaderboard.test.ts` | क्रमवारी गणना, पृष्ठांकन, रोटेशन               | 8       |
| `tests/unit/gamification/sharing.test.ts`     | हस्तांतरणे, शिल्लक, आयडेम्पोटन्सी              | 9       |
| `tests/unit/gamification/invites.test.ts`     | तयार करणे, रिडीम करणे, मुदतसमाप्ती, स्व-संदर्भ | 7       |
| `tests/unit/gamification/antiCheat.test.ts`   | दर मर्यादा, z-स्कोअर, ऑडिट लॉगिंग              | 6       |
| `tests/unit/gamification/events.test.ts`      | इव्हेंट उत्सर्जन, फॅन-आउट, त्रुटी हाताळणी      | 5       |

### चाचण्या चालवणे

```bash
# सर्व गेमिफिकेशन चाचण्या
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# एकच चाचणी फाइल
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### कव्हरेज आवश्यकता

`CONTRIBUTING.md` नुसार — सर्व नवीन मॉड्यूल्समध्ये पुढील गोष्टी असणे आवश्यक आहे:

- शाखा कव्हरेज >= 80%.
- प्रत्येक सार्वजनिक फंक्शनची किमान एकदा चाचणी केलेली असावी.
- त्रुटी मार्गांची चाचणी केलेली असावी (अपुरा शिल्लक, मुदत संपलेले कोड, दर मर्यादा).

---

## फाइल संरचना

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # सर्व 8 तक्ते + अनुक्रमणिका
      gamification.ts                  # डोमेन CRUD मॉड्यूल
    gamification/
      xp.ts                           # XP गणना, स्तर वक्र, पदव्या
      badges.ts                       # बॅज व्याख्या, निकष, मूल्यमापन
      streaks.ts                      # दैनंदिन सलगतेचा मागोवा
      leaderboard.ts                  # क्रमांक गणना, SSE, आवर्तन
      antiCheat.ts                    # दर मर्यादा, z-score, लेखापरीक्षण
      sharing.ts                      # टोकन हस्तांतरण खातेवही
      invites.ts                      # आमंत्रण/रिडीम कोड
      servers.ts                      # समुदाय सर्व्हर महासंघीकरण
      events.ts                       # इव्हेंट एमिटर (एकत्रीकरण बिंदू)
      notifications.ts                # SSE सूचना प्रवाह
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST क्रमवारी
        leaderboard/stream/route.ts   # SSE रिअल-टाइम अद्यतने
        transfer/route.ts             # GET/POST हस्तांतरणे
        invite/route.ts               # GET/POST/DELETE आमंत्रण कोड
        invite/redeem/route.ts        # POST रिडीम कोड
        servers/route.ts              # GET/POST/DELETE सर्व्हर
        federation/score/route.ts     # POST गुण पाठवा
        federation/leaderboard/route.ts # GET क्रमवारी प्राप्त करा
        notifications/route.ts        # SSE सूचना
        anomalies/route.ts            # GET विसंगती अहवाल
        rotate/route.ts               # POST गुपिते आवर्तित करा
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # क्रमवारी पृष्ठ
        profile/page.tsx               # XP/बॅज/सलगता पृष्ठ
        tokens/page.tsx                # शिल्लक/हस्तांतरणे/आमंत्रणे पृष्ठ
        gamification/admin/page.tsx    # प्रशासकीय विसंगती निरीक्षण
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
    GAMIFICATION.md                    # हा दस्तऐवज
```

---

## स्थलांतर धोरण

### टप्पा 1: बॅकएंड गाभा (PR 1)

- स्थलांतर `060_create_gamification.sql` (8 तक्ते).
- `src/lib/db/gamification.ts` (डोमेन मॉड्यूल).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- `chatCore.ts` मधील एकत्रीकरण बिंदू.
- XP, सलगता आणि इव्हेंट्ससाठी युनिट चाचण्या.

### टप्पा 2: बॅज आणि क्रमवारी (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- स्थिरांकांमधील बॅज व्याख्या.
- क्रमवारी API मार्ग + SSE प्रवाह.
- बॅज आणि क्रमवारीसाठी युनिट चाचण्या.

### टप्पा 3: सामायिकरण आणि आमंत्रणे (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- हस्तांतरण + आमंत्रण API मार्ग.
- सामायिकरण, आमंत्रणे आणि फसवणूक-प्रतिबंधासाठी युनिट चाचण्या.

### टप्पा 4: महासंघीकरण आणि डॅशबोर्ड (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- महासंघीकरण API मार्ग.
- डॅशबोर्ड पृष्ठे (क्रमवारी, प्रोफाइल, टोकन, प्रशासन).
- MCP साधनांची नोंदणी.

---

## भविष्यातील बाबी

- **हंगामी कार्यक्रम**: मर्यादित कालावधीसाठी बॅज संच आणि लीडरबोर्ड हंगाम.
- **संघ लीडरबोर्ड**: संस्था किंवा कॉम्बोनुसार वापरकर्त्यांचे गट तयार करा.
- **XP गुणक**: प्रचार कालावधीत XP वाढवा.
- **कामगिरी शेअर करणे**: शेअर करता येणारी बॅज कार्डे (OpenGraph प्रतिमा) तयार करा.
- **मोबाइल पुश**: बॅज/स्तर इव्हेंटसाठी webhook-आधारित सूचना.
- **लीडरबोर्ड API**: तृतीय-पक्ष एकत्रीकरणांसाठी सार्वजनिक API.
