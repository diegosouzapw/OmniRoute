# Error Message Sanitization (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Nguồn chuẩn:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` và các hàm dựng công khai trong `open-sse/utils/error.ts`
> **Kiểm thử:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Cập nhật lần cuối:** 2026-09-02 — v3.8.51
> **Đối tượng:** Mọi kỹ sư xử lý phản hồi lỗi (tuyến HTTP, luồng SSE, trình thực thi, trình xử lý MCP).
> **Trạng thái:** **BẮT BUỘC** đối với mọi đường dẫn mã trả thông báo lỗi về máy khách.

## Lý do tồn tại

Quy tắc CodeQL `js/stack-trace-exposure` (CWE-209) đánh dấu mọi đường dẫn mã mà trong đó thông báo lỗi bắt nguồn từ một ngoại lệ thời gian chạy được đưa vào phản hồi HTTP / SSE mà chưa được làm sạch. Dấu vết ngăn xếp và đường dẫn tệp tuyệt đối trong phản hồi môi trường production cung cấp cho kẻ tấn công:

- Cấu trúc thư mục nội bộ (`/srv/app/src/lib/...`) → thăm dò để thực hiện các cuộc tấn công tiếp theo.
- Phiên bản thư viện / framework được suy ra từ các khung ngăn xếp → lựa chọn cách khai thác có chủ đích.
- Các giá trị nhạy cảm tại thời gian chạy có thể được nội suy chuỗi vào lỗi (truy vấn DB, giá trị cấu hình).

Hàm trợ giúp `sanitizeErrorMessage` được xuất bởi `open-sse/utils/error.ts` loại bỏ các nhóm rò rỉ sau:

1. Phần đuôi khung ngăn xếp JavaScript ở dạng vật lý, đã tuần tự hóa và nội tuyến rõ ràng.
2. Đường dẫn hệ thống tệp tuyệt đối POSIX, Windows, UNC và `file://`, đồng thời giữ nguyên các URL HTTPS an toàn và các tuyến API được đánh dấu rõ ràng.
3. Phép gán thông tin xác thực, các định dạng token phổ biến của nhà cung cấp, khối PEM khóa riêng tư và URL dữ liệu base64.

Bộ làm sạch giới hạn độ dài đầu vào và đóng an toàn khi một giá trị được ném ra từ chối việc ép kiểu thành chuỗi.
Quá trình làm sạch JSON ngược dòng theo kiểu đệ quy cũng loại bỏ các khóa thông tin xác thực/đường dẫn không an toàn, bí danh phiên và các khóa kiểm soát prototype trước khi phản hồi được tuần tự hóa.

## Mẫu bắt buộc

### 1. Tạo phản hồi lỗi (HTTP / tuyến API)

Sử dụng `buildErrorBody()` — tính năng làm sạch được tích hợp sẵn:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logic của trình xử lý ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Hoặc sử dụng các hàm bao tiện ích trong cùng mô-đun:

```ts
import {
  errorResponse, // đối tượng Response dùng một lần
  writeStreamError, // trình ghi SSE
  createErrorResult, // cấu trúc { success: false, status, response, ... }
  unavailableResponse, // thêm Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Tất cả các hàm này đều áp dụng ranh giới lỗi công khai chuẩn. `errorResponse`, `writeStreamError` và `createErrorResult` định tuyến qua `buildErrorBody`; ba hàm trợ giúp chuyên biệt về thử lại/ngắt mạch chiếu và làm sạch trực tiếp ngữ cảnh công khai của chúng. **Bạn không bao giờ cần gọi `sanitizeErrorMessage` theo cách thủ công** khi sử dụng các hàm trợ giúp này.

### 2. Phong bì lỗi tùy chỉnh (hiếm gặp)

Khi không thể sử dụng các hàm trợ giúp ở trên (ví dụ: cấu trúc phản hồi được quy định bởi một giao thức ngược dòng như Connect-RPC), hãy nhập trực tiếp `sanitizeErrorMessage`:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Đây là cách duy nhất được chấp thuận để tạo phần thân lỗi tùy chỉnh. Xem `open-sse/executors/cursor.ts::buildErrorResponse` để tham khảo cách triển khai chuẩn.

### 3. Ghi nhật ký so với phản hồi

Các ngoại lệ nội bộ đáng tin cậy có thể giữ nguyên toàn bộ thông báo và dấu vết ngăn xếp để nhân viên vận hành có thể gỡ lỗi. Các giá trị bắt nguồn từ ranh giới nhà cung cấp, xác thực, phiên trình duyệt hoặc khu vực liên quan đến thông tin xác thực phải được làm sạch trước khi đi vào đầu ra bảng điều khiển, siêu dữ liệu kiểm toán hoặc nhật ký cuộc gọi được lưu trữ. Mẫu:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // chỉ dành cho ngoại lệ nội bộ đáng tin cậy
  return errorResponse(500, getErrorMessage(err)); // đã làm sạch — gửi tới máy khách
}
```

Đối với các lỗi do nhà cung cấp kiểm soát, hãy chiếu cả giá trị được ghi nhật ký:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Các mẫu bị cấm

❌ **Không bao giờ** đưa đầu ra ngoại lệ thô vào phần thân Response:

```ts
// KHÔNG TỐT: dấu vết ngăn xếp + đường dẫn tệp đến được máy khách
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Không bao giờ** tự triển khai bộ tách dòng đầu tiên:

```ts
// KHÔNG TỐT: quên loại bỏ đường dẫn tuyệt đối, có thể sai lệch so với hàm trợ giúp chuẩn
const safe = String(err).split("\n")[0];
```

❌ **Không bao giờ** chỉ làm sạch trong tuyến mà bỏ quên đường dẫn SSE. Bất kỳ nội dung nào ghi vào luồng đều phải đi qua `writeStreamError` (hoặc `buildErrorBody` nền tảng của nó).

❌ **Không bao giờ** cố ý đưa `process.cwd()`, `__filename`, `__dirname` hoặc các đường dẫn bắt nguồn từ biến môi trường vào thông báo lỗi. Bộ làm sạch xử lý các đường dẫn tuyệt đối như một biện pháp phòng thủ nhiều lớp, nhưng ngay từ đầu bên gọi không được tạo các thông báo làm lộ cấu trúc hệ thống.

## Phạm vi kiểm thử trong CI

`tests/unit/error-message-sanitization.test.ts` đảm bảo:

- Mọi route thuộc `/api/model-combo-mappings/*` đều trả về body đã được làm sạch khi xảy ra lỗi 4xx/5xx.
- `sanitizeErrorMessage` loại bỏ stack trace nhiều dòng.
- `sanitizeErrorMessage` thay thế các đường dẫn tuyệt đối POSIX và Windows bằng `<path>`.
- `sanitizeErrorMessage` xử lý an toàn các đầu vào là `null`/`undefined`/instance của `Error`.
- `buildErrorBody` không bao giờ để lộ stack trace trong trường `message`.

Khi thêm route hoặc executor mới, hãy sao chép mẫu assertion từ tệp này. Cổng kiểm soát độ bao phủ (`npm run test:coverage`) yêu cầu ≥60% đối với câu lệnh/dòng/hàm/nhánh — các đường dẫn lỗi phải được kiểm thử.

## Các biện pháp kiểm soát liên quan

- Các cảnh báo CodeQL `js/stack-trace-exposure` trong `.github/security` phải luôn được **hoặc** khắc phục thông qua các helper này **hoặc** loại bỏ kèm theo nhận xét trích dẫn tài liệu này.
- Cấu hình che giấu dữ liệu của `pino` (`src/shared/utils/logRedaction.ts`) xử lý riêng các log có cấu trúc đáng tin cậy. Tài liệu này đề cập đến các thông báo phản hồi công khai và các giá trị do nhà cung cấp kiểm soát vượt qua ranh giới lưu trữ lâu dài của log cuộc gọi/proxy.
- Danh sách từ chối header phía upstream (`src/shared/constants/upstreamHeaders.ts`) ngăn rò rỉ header — hãy giữ hai tệp đồng bộ khi bổ sung một mối lo ngại mới về việc đánh cắp dữ liệu.

## Truyền tiếp chi tiết từ upstream

`buildErrorBody` chấp nhận đối số thứ ba tùy chọn `upstreamDetails` (body thô đã được phân tích cú pháp từ nhà cung cấp upstream). Khi được cung cấp, giá trị này được `sanitizeUpstreamDetails` làm sạch trước khi đưa vào phản hồi dưới dạng `upstream_details`.

Đối số thứ tư tùy chọn `classification`
(`{ type?: string; code?: string; reason?: string }`) chấp nhận một phân loại công khai tường minh.
Mỗi trường được ánh xạ vào tập từ vựng định danh công khai có giới hạn. Các giá trị không an toàn, có hình dạng giống thông tin xác thực, chứa ký tự điều khiển hoặc quá dài sẽ quay về type/code suy ra từ trạng thái; reason tùy chọn không an toàn sẽ bị bỏ qua. Các định danh trạng thái HTTP gồm ba chữ số (từ `100` đến `599`) vẫn hợp lệ đối với các hợp đồng nhà cung cấp để lộ trạng thái upstream dạng số làm mã mà máy có thể đọc được. Cùng phạm vi giới hạn này cũng được chấp nhận trong dạng placeholder trạng thái HTTP được tạo cục bộ; các số và tên tùy ý từ nhà cung cấp vẫn nằm ngoài tập từ vựng.

Hãy truyền mọi phân loại tường minh trong đối số thứ tư đó. Tuyệt đối không ghi đè
`body.error.code`, `body.error.type` hoặc `body.error.reason` sau khi `buildErrorBody()` trả về;
việc thay đổi sau bước dựng sẽ bỏ qua phép ánh xạ công khai.

Các quy tắc làm sạch áp dụng cho `upstreamDetails`:

1. Các giá trị lá dạng chuỗi: xử lý qua `sanitizeErrorMessage` (loại bỏ stack và đường dẫn tuyệt đối).
2. Các khóa không an toàn liên quan đến đường dẫn, thông tin xác thực, bí danh phiên và kiểm soát prototype sẽ bị loại bỏ.
3. Giới hạn độ sâu: cấu trúc lồng nhau vượt quá 4 cấp sẽ được thay thế bằng chuỗi `"[truncated]"`.
4. Mảng được giới hạn ở 32 phần tử.

Chỉ các vị trí gọi có body lỗi của nhà cung cấp đã được phân tích cú pháp mới nên truyền `upstreamDetails`. Các lỗi OmniRoute nội bộ (lỗi phân tích cú pháp SSE, nội dung trống, bị guardrail chặn) không được chứa giá trị này.

KHÔNG truyền trực tiếp `err.stack`, `err.message` hoặc bất kỳ chuỗi nào từ ngoại lệ runtime vào
`upstreamDetails`. Các giá trị đó vẫn phải đi qua `errorResponse` / `buildErrorBody(code, msg)`
mà không có body upstream.

Việc truyền tiếp có chọn lọc lỗi 4xx từ upstream sẽ bảo toàn cấu trúc JSON an toàn và cách diễn đạt của nhà cung cấp mà cơ chế tự động khôi phục phía client yêu cầu, nhưng đây không phải là truyền tiếp nguyên trạng từng byte: bộ làm sạch đệ quy luôn chạy trước khi tuần tự hóa. Các body có tham chiếu vòng, chứa BigInt hoặc có `toJSON()` nguy hiểm sẽ bị từ chối theo nguyên tắc an toàn và không đủ điều kiện để truyền tiếp. OCR và kiểm duyệt áp dụng cùng một quy tắc; các body upstream không phải JSON, trống hoặc bị gắn nhãn sai sẽ được chuyển đổi thành phong bì lỗi JSON OmniRoute chuẩn.

## Hạn chế đã biết của CodeQL: không nhận diện trình làm sạch tùy chỉnh

Truy vấn CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) sử dụng một danh sách cho phép cố định gồm các mẫu làm sạch (ví dụ: `.split("\n")[0]` nội tuyến, `String#replace` với các dạng biểu thức chính quy cụ thể, truy cập `.message` trên `Error`). Truy vấn này **không** nhận diện được việc gọi gián tiếp thông qua một hàm trợ giúp tùy chỉnh như `sanitizeErrorMessage()` của chúng ta.

Điều này có nghĩa là các vị trí gọi đã được chứng minh là thực hiện làm sạch thông qua mô-đun này — ví dụ như `open-sse/utils/error.ts::errorResponse` và `open-sse/executors/cursor.ts::buildErrorResponse` — vẫn có thể tiếp tục phát sinh cảnh báo mặc dù mã nguồn an toàn về mặt chức năng. Các lần loại bỏ cảnh báo trước đây: `#224`, `#231` (tháng 5 năm 2026), cả hai đều được đánh dấu là `false positive` kèm theo lý giải kỹ thuật.

**Cách xử lý khi xuất hiện trường hợp mới:**

1. Xác nhận rằng vị trí gọi thực sự chuyển thông báo qua `sanitizeErrorMessage` / `buildErrorBody` / một trong các hàm bao được ghi lại ở trên (đọc toàn bộ chuỗi gọi từ đầu đến cuối — đừng tin vào một chú thích).
2. Xác nhận rằng `tests/unit/error-message-sanitization.test.ts` kiểm thử đường dẫn đó (hoặc bổ sung phạm vi kiểm thử).
3. Loại bỏ cảnh báo thông qua `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`, đồng thời tham chiếu tài liệu này.
4. **Không** "sửa" bằng cách chèn `.split("\n")[0]` nội tuyến ở mọi nơi — hàm trợ giúp là nguồn thông tin chuẩn duy nhất; việc sao chép mẫu này làm suy yếu trình làm sạch (làm mất khả năng xóa đường dẫn, giới hạn độ dài và ép kiểu) chỉ để tạo cảm giác rằng trình quét đã được đáp ứng.

Việc áp dụng các tính năng chọn tham gia như [cấu hình trình làm sạch tùy chỉnh `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) của CodeQL là giải pháp lâu dài; nội dung đó nằm ngoài phạm vi tài liệu này.

## Tài liệu tham khảo

- [CWE-209: Làm lộ thông tin thông qua thông báo lỗi](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Bảng hướng dẫn xử lý lỗi](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit tập trung hóa hàm trợ giúp: `1a39c31f` — _fix(security): che thông tin xác thực công khai của hệ thống ngược dòng + tập trung hóa việc làm sạch lỗi_
