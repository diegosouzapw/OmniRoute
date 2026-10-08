# OmniRoute CLI Plugin System (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

핵심 코드를 수정하지 않고 `omniroute` CLI를 확장할 수 있습니다. 플러그인은 `gh extension` 또는 `kubectl plugin`과 유사하게 `omniroute-cmd-*` 명명 규칙을 따릅니다.

## 빠른 시작

```bash
# npm에서 플러그인 설치
omniroute plugin install stripe

# 개발 중인 로컬 플러그인 설치
omniroute plugin install ./my-plugin

# 설치된 플러그인 목록 표시
omniroute plugin list

# 새 플러그인 스캐폴딩
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## 플러그인 구조

플러그인은 `omniroute-cmd-<name>`(또는 `@scope/omniroute-cmd-<name>`)이라는 이름의 npm 패키지입니다.

```
omniroute-cmd-myplugin/
├── package.json     # "type": "module" 및 "main": "index.mjs"가 있어야 함
├── index.mjs        # register(program, ctx)와 선택적 meta 내보내기
└── README.md
```

### `package.json`

```json
{
  "name": "omniroute-cmd-myplugin",
  "version": "0.1.0",
  "type": "module",
  "main": "index.mjs",
  "engines": { "omniroute": ">=4.0.0" },
  "keywords": ["omniroute-plugin", "omniroute-cmd"]
}
```

### `index.mjs`

```js
export const meta = {
  name: "myplugin",
  version: "0.1.0",
  description: "OmniRoute용 내 플러그인",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("myplugin")
    .description(meta.description)
    .option("-n, --name <name>")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      const res = await ctx.apiFetch("/api/combos", {
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = await res.json();
      ctx.emit(data, gOpts);
    });
}
```

## 플러그인 컨텍스트 API

`register(program, ctx)`에 전달되는 `ctx` 객체:

| 속성                         | 타입             | 설명                                                 |
| ---------------------------- | ---------------- | ---------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | OmniRoute 서버에 인증된 fetch 요청                   |
| `ctx.emit(data, opts)`       | `function`       | `--output` 플래그에 따라 table/json/jsonl/csv로 출력 |
| `ctx.t(key)`                 | `async function` | i18n 번역 조회                                       |
| `ctx.withSpinner(label, fn)` | `async function` | 비동기 fn을 ora 스피너로 래핑                        |
| `ctx.baseUrl`                | `string`         | 확인된 기본 URL                                      |
| `ctx.apiKey`                 | `string \| null` | 제공된 경우 API 키                                   |

## 검색

플러그인은 다음 위치에서 검색됩니다.

1. `~/.omniroute/plugins/<name>/` — 사용자 로컬 설치
2. `OMNIROUTE_PLUGIN_PATH` 환경 변수 — 사용자 지정 디렉터리

둘 다 **CLI 전용**입니다. 서버 측 플러그인 런타임(프록시 내부에서 실행되는 marketplace/`plugin.json`
플러그인)은 자체 오버라이드인 `OMNIROUTE_PLUGINS_DIR`을 사용하는 별도의 스캐너를 갖습니다.
자세한 내용은 [PLUGIN_MARKETPLACE.md → 플러그인 디렉터리](./PLUGIN_MARKETPLACE.md#plugin-directory)를 참조하세요.
한쪽을 설정해도 다른 쪽에는 영향을 주지 않습니다.

로딩 오류는 포착되어 경고로 출력됩니다. 손상된 플러그인으로 인해 CLI가 중단되는 일은 없습니다.

## 보안

플러그인은 `omniroute`와 동일한 Node.js 프로세스 권한으로 실행됩니다. 신뢰할 수 있는 출처의 플러그인만 설치하세요. `omniroute plugin install`은 명시적인 경고를 표시하며 `--yes` 또는 대화형 확인을 요구합니다.

## 게시

1. `package.json`에 `"keywords": ["omniroute-plugin"]`이 있는지 확인
2. 평소와 같이 `npm publish` 실행
3. 사용자는 `omniroute plugin search <query>`를 통해 검색 가능(npm 레지스트리 검색)

## 예제 플러그인

`meta` + `register()`를 포함한 최소 동작 예제는 [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs)을 참조하세요.
