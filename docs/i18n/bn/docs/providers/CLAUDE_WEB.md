# Providers — Claude Web (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` একটি প্রমাণীকৃত `claude.ai` ব্রাউজার সেশনের মাধ্যমে OpenAI-ফরম্যাটের চ্যাট অনুরোধ পাঠায়। এক্সিকিউটরটি সরবরাহ করা cookie স্বাভাবিকীকরণ করে, একটি প্রমাণীকৃত organization নির্ধারণ করে, conversation state প্রস্তুত করে, direct অথবা browser transport নির্বাচন করে এবং upstream SSE response কঠোরভাবে রূপান্তর করে। orchestration রয়েছে `open-sse/executors/claude-web.ts:320`-এ।

> **Web Cookie provider-এ নতুন?**
>
> এই provider-নির্দিষ্ট নির্দেশিকা অনুসরণ করার আগে সাধারণ setup প্রক্রিয়া, authentication নির্দেশনা, সীমাবদ্ধতা এবং troubleshooting-এর জন্য **`docs/getting-started/WEB-COOKIE-GUIDE.md`** পড়ুন।

### মডেল ক্যাটালগ

provider registry বর্তমানে ঠিক এই সাতটি static model ID প্রকাশ করে
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| মডেল ID                     | প্রদর্শিত নাম           |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

এই provider-এর জন্য dynamic model discovery বাস্তবায়িত নয়। উপরের তালিকাটিই runtime catalog।

### শংসাপত্র এবং organization নির্ধারণ

সম্পূর্ণ `claude.ai` Cookie header অথবা শুধু session value সরবরাহ করুন। শুধু value দিলে সেটিকে `sessionKey` হিসেবে স্বাভাবিকীকরণ করা হয়; অন্য cookie সরবরাহ করা হলে সেগুলো সংরক্ষিত থাকে। এক্সিকিউটরটি `cookie` অথবা `apiKey`-এর মাধ্যমে cookie গ্রহণ করে এবং connection data থেকে ঐচ্ছিক `deviceId` ও `orgId` value পড়ে
(`open-sse/executors/claude-web.ts:72`)।

`orgId` না থাকলে, এক্সিকিউটরটি `GET https://claude.ai/api/organizations` কল করে এবং প্রমাণীকৃত Claude Web session থেকে ফেরত পাওয়া প্রথম organization ব্যবহার করে
(`open-sse/executors/claude-web.ts:141`)। কোনো বৈধ organization ফেরত না এলে এটি নিরাপদভাবে ব্যর্থ হয়, প্রত্যাখ্যাত session authorization-কে 401 হিসেবে জানায় এবং Cloudflare challenge-কে authentication failure থেকে পৃথক করে।

### Conversation operation

ঐচ্ছিক top-level `claude_web` object-টি strict। অজানা field প্রত্যাখ্যান করা হয়। এর গৃহীত field-গুলো `open-sse/executors/claude-web/session.ts:50`-এ সংজ্ঞায়িত:

| Field                 | অর্থ                                                             |
| --------------------- | ---------------------------------------------------------------- |
| `operation`           | ডিফল্টভাবে `completion`; retry turn-এর জন্য `retry` ব্যবহার করুন |
| `conversation_id`     | বিদ্যমান conversation-এর জন্য explicit UUID                      |
| `parent_message_uuid` | parent assistant message-এর জন্য explicit UUID                   |
| `timezone`            | বৈধ IANA time-zone নাম                                           |
| `locale`              | গঠনগতভাবে বৈধ locale                                             |
| `tool_states`         | ঐচ্ছিক account tool-state array, সর্বোচ্চ 128টি entry            |

প্রস্তুত করা অনুরোধ দুটি upstream endpoint-এর একটিকে ব্যবহার করে
(`open-sse/executors/claude-web.ts:203`):

- একটি নতুন অথবা follow-up turn পাঠানো হয়
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`-এ।
- একটি retry পাঠানো হয়
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`-এ।

একটি নতুন turn-এ `create_conversation_params` অন্তর্ভুক্ত থাকে। cached অথবা explicitly linked follow-up-এ `parent_message_uuid` অন্তর্ভুক্ত থাকে এবং `create_conversation_params` বাদ দেওয়া হয়। Retry-এর জন্য conversation এবং parent-message state উভয়ই আবশ্যক এবং এতে কোনো prompt পাঠানো হয় না
(`open-sse/executors/claude-web/session.ts:254`)। নতুন conversation প্রমাণীকৃত UI-কে `/new`-এ খোলে; cached অথবা explicitly linked follow-up নির্দিষ্ট conversation page-টি খোলে
(`open-sse/executors/claude-web/session.ts:324`)।

Conversation state হলো SHA-256 account scope এবং canonical caller transcript দ্বারা key করা একটি in-memory cache। Entry-গুলোর মেয়াদ 30 মিনিট পর শেষ হয় এবং cache-টি সর্বোচ্চ 5,000টি entry-তে সীমাবদ্ধ
(`open-sse/executors/claude-web/session.ts:12`)। strict stream parser `message_stop` পর্যবেক্ষণ করার পরেই কেবল state commit করা হয়; process restart হলে তা বাতিল হয়ে যায়। cache miss হলে, আগের message-গুলো নীরবে বাদ না দিয়ে একটি multi-message request-কে একটি recovery prompt-এ serialize করা হয়।

Locale এবং time zone এই অগ্রাধিকার অনুসরণ করে: request-এর `claude_web` value, connection value, runtime value, তারপর locale-এর জন্য `en-US` অথবা time zone-এর জন্য `UTC`
(`open-sse/executors/claude-web/session.ts:218`)।

### Tool এবং request payload

Direct request কেবল caller-এর সরবরাহ করা গঠনগতভাবে বৈধ OpenAI function tool রূপান্তর করে। কোনো কৃত্রিম static default tool list নেই
(`open-sse/executors/claude-web/payload.ts:102`)।

এর পরিবর্তে browser request প্রমাণীকৃত UI request capture করে এবং এর account tool, tool state ও personalized style ধরে রাখে। প্রস্তুত করা conversation, model, reasoning, prompt এবং message UUID field তারপরও captured request-কে override করে
(`open-sse/executors/claude-web/browserTransport.ts:175`)। Browser template-গুলো account, organization, cookie, locale এবং time zone-এর hash অনুযায়ী scoped এবং 30 মিনিট পর মেয়াদোত্তীর্ণ হয়
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`)। কোনো direct request-এ caller tool না থাকলে, সেটি ওই scoped template পুনরায় ব্যবহার করতে পারে; explicit caller tool অগ্রাধিকার পায়
(`open-sse/executors/claude-web/browserTransport.ts:214`)।

### Transport নির্বাচন

ডিফল্ট path হলো `sendClaudeWebDirect()`, যা configured Chrome 146 profile এবং সরবরাহ করা cookie দিয়ে `tlsFetchClaude()` কল করে (`open-sse/services/claudeTlsClient.ts:23`)। এটি কোনো solver চালু করে না অথবা বিকল্প cookie তৈরি করে না।

অ্যাকাউন্ট-স্কোপড ব্রাউজার অ্যাডাপ্টারকে প্রাথমিক ট্রান্সপোর্ট করতে `WEB_COOKIE_USE_BROWSER`-কে `1`, `true`, অথবা `on`-এ সেট করুন। স্বীকৃত Cloudflare 403 চ্যালেঞ্জের ক্ষেত্রে সরাসরি ট্রান্সপোর্ট থেকে ব্রাউজার অ্যাডাপ্টারে ফলব্যাক করার অনুমতি দিতে `OMNIROUTE_BROWSER_POOL`-কে একই মানগুলোর যেকোনো একটিতে সেট করুন (`open-sse/executors/claude-web.ts:195`)। অন্যান্য HTTP ব্যর্থতা সেই ফলব্যাক ট্রিগার করে না।

ব্রাউজার অ্যাডাপ্টার একই পুলড Playwright কনটেক্সটের মধ্যে কুকি রাখে, উপরে বর্ণিত স্কোপড হ্যাশড কী ব্যবহার করে এবং সেই কনটেক্সট থেকেই কমপ্লিশন পাঠায় (`open-sse/executors/claude-web/browserTransport.ts:444`)। এটি কখনোই ব্রাউজারে সমাধান করা কোনো কুকি সরাসরি TLS ক্লায়েন্টে এক্সপোর্ট করে না। ব্রাউজার রিট্রাইয়ের জন্য একই প্রকৃত Playwright কনটেক্সটের সঙ্গে যুক্ত, মেয়াদোত্তীর্ণ নয় এমন একটি UI টেমপ্লেট প্রয়োজন (`open-sse/executors/claude-web/browserTransport.ts:467`)। ব্রাউজার রেসপন্স রিডগুলো প্রমাণীকৃত পেজে ক্রমবর্ধমানভাবে চলে, রিকোয়েস্ট বাতিলকরণ মেনে চলে এবং 16 MiB অতিক্রম করার সঙ্গে সঙ্গেই আপস্ট্রিম বডি বাতিল করে (`open-sse/executors/claude-web/browserTransport.ts:259`)।

এক্সিকিউটর শেয়ার করা রিকোয়েস্ট লগারে একটি সংবেদনশীল তথ্য-মোছা অডিট প্রজেকশন ফেরত দেয়: organization, conversation এবং message UUID, প্রম্পট টেক্সট, টুলের সংজ্ঞা, কুকি এবং ডিভাইস শনাক্তকারী বাদ দেওয়া হয় (`open-sse/executors/claude-web.ts:237`, `open-sse/executors/claude-web.ts:252`)। ট্রান্সপোর্ট এক্সসেপশনগুলোও নিক্ষিপ্ত মেসেজের পরিবর্তে একটি সাধারণ সংযোগ ত্রুটি ফেরত দেয়।

### SSE-এর আচরণ

`createClaudeWebResponse()` LF বা CRLF ফ্রেমিং এবং বহু-লাইনের `data:` ফিল্ড পরিচালনা করে। এটি টেক্সট ডেল্টাকে `content`-এ, চিন্তার ডেল্টাকে `reasoning_content`-এ এবং পরিচিত মেটাডেটা ইভেন্টকে `claude_web` রেসপন্স এক্সটেনশনে ম্যাপ করে। প্রতিটি মেটাডেটা ইভেন্টকে তার নিজস্ব ফিল্ড অ্যালাউলিস্টের মাধ্যমে প্রজেক্ট করা হয় (`open-sse/executors/claude-web/stream.ts:37`)। conversation, parent-message, assistant-message এবং operation মেটাডেটাও `X-OmniRoute-Claude-Web-*` হেডারে ফেরত দেওয়া হয় (`open-sse/executors/claude-web/stream.ts:364`)।

বিকৃত JSON, আপস্ট্রিম `error` ইভেন্ট, অজানা ইভেন্ট টাইপ, অবৈধ ক্রম, কনটেন্ট-ব্লক অমিল অথবা `message_stop`-এর আগে EOF ঘটলে পার্সার নিরাপদভাবে ব্যর্থ হয়। স্ট্রিমিং আউটপুট একটি ফিনিশ চাঙ্ক এবং একটি `[DONE]` নির্গত করে; বাফার করা আউটপুট একই পার্সার ব্যবহার করে। পার্সার `message_stop`-কে অবিলম্বে চূড়ান্ত হিসেবে বিবেচনা করে, পরবর্তী আপস্ট্রিম ডেটা বাতিল করে এবং ডাউনস্ট্রিম বাতিলকরণ আপস্ট্রিম রিডারে ছড়িয়ে দেয় (`open-sse/executors/claude-web/stream.ts:461`, `open-sse/executors/claude-web/stream.ts:563`)। অসমাপ্ত SSE লাইন এবং জমা হওয়া ইভেন্টগুলো 1 MiB-তে সীমাবদ্ধ রাখা হয় (`open-sse/executors/claude-web/stream.ts:17`, `open-sse/executors/claude-web/stream.ts:62`)।

### ফাইলসমূহ

| ফাইল                                                     | উদ্দেশ্য                               |
| -------------------------------------------------------- | -------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | স্ট্যাটিক প্রোভাইডার মডেল রেজিস্ট্রি   |
| `open-sse/executors/claude-web.ts`                       | এক্সিকিউটর অর্কেস্ট্রেশন               |
| `open-sse/executors/claude-web/payload.ts`               | পেলোড ও টুল রূপান্তর                   |
| `open-sse/executors/claude-web/session.ts`               | টার্ন স্টেট ও ট্রান্সক্রিপ্ট ক্যাশ     |
| `open-sse/executors/claude-web/transport.ts`             | সরাসরি ট্রান্সপোর্ট অ্যাডাপ্টার        |
| `open-sse/executors/claude-web/browserTransport.ts`      | অ্যাকাউন্ট-স্কোপড ব্রাউজার অ্যাডাপ্টার |
| `open-sse/executors/claude-web/stream.ts`                | কঠোর SSE অনুবাদ                        |
| `open-sse/services/claudeTlsClient.ts`                   | নেটিভ TLS ট্রান্সপোর্ট                 |
| `open-sse/services/browserPool.ts`                       | পুলড Playwright কনটেক্সট               |

### পরীক্ষা

প্রকৃত ক্রেডেনশিয়াল ছাড়াই নির্ধারিত Claude Web স্যুট চালান:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

`tests/unit/claude-web-auto-refresh.test.ts`-এর Playwright-নির্ভর কেসগুলো স্পষ্টভাবে এড়িয়ে যাওয়া হয়েছে। এই রিপোজিটরিতে বর্তমানে ক্রেডেনশিয়ালযুক্ত Claude Web লাইভ-টেস্ট স্ক্রিপ্ট সংজ্ঞায়িত নেই, তাই এড়িয়ে যাওয়া কেসগুলো রানটাইম প্রমাণ নয়।

### সেটআপ

1. `npm run dev` অথবা একটি বিল্ট ইনস্টলেশন দিয়ে OmniRoute চালু করুন।
2. Dashboard → Providers → Add Provider খুলুন।
3. Web Cookie ক্যাটাগরি এবং Claude Web নির্বাচন করুন।
4. প্রমাণীকৃত `claude.ai` রিকোয়েস্ট থেকে কপি করা সম্পূর্ণ Cookie হেডার পেস্ট করুন।
