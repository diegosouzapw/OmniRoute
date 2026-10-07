# CLAUDE.md (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Tất cả quy tắc của dự án nằm trong [`AGENTS.md`](AGENTS.md)** — nguồn thông tin chính xác duy nhất cho mọi trợ lý AI
(kiến trúc, quy ước, kiểm thử, các cổng chất lượng, quy trình git, 23 Quy tắc Cứng,
các bài học về PII). Hãy đọc toàn bộ; không thêm lại các quy tắc của dự án tại đây. Mọi nội dung bên dưới CHỈ áp dụng
cho Claude Code — các tinh chỉnh vận hành đối với những quy tắc đã được định nghĩa trong `AGENTS.md`.

## Cô lập worktree — các chi tiết dành riêng cho Claude Code

Giao thức worktree bắt buộc đầy đủ (xác nhận nhánh cơ sở, đường dẫn chuẩn
`.claude/worktrees/`, `cp -al` node_modules, quy tắc dọn dẹp) nằm trong `AGENTS.md` → Quy trình Git → "Cô lập
worktree". Các điểm dành riêng cho Claude Code:

- Xác nhận nhánh cơ sở với người vận hành thông qua `AskUserQuestion` (Quy tắc Cứng #19), trừ khi họ
  đã cho bạn biết.
- Ưu tiên công cụ gốc `EnterWorktree` — công cụ này đã tạo các worktree trong
  `.claude/worktrees/` (đường dẫn chuẩn). Tạo worktree bằng lệnh `git
worktree add` đã được ghi lại trong tài liệu, sau đó gọi `EnterWorktree` với `path` của nó.

## An toàn giữa các phiên — các chi tiết dành riêng cho Claude Code

Các Quy tắc Cứng #19/#21/#22 (trong `AGENTS.md`) chi phối các phiên song song. Lời nhắc vận hành cho môi trường
này:

- **Lặp lại nguyên văn lệnh cấm `git stash` trong prompt của mọi subagent có thao tác với git**
  (công cụ Agent / tập lệnh Workflow) — các subagent không kế thừa tệp này, và sự cố stash được ghi nhận
  đã tái diễn thông qua một subagent.
- Trước khi hợp nhất hoặc đẩy lên bất kỳ PR nào mà bạn không tạo _trong phiên này_, hãy chạy `git worktree list`
  và kiểm tra lại `gh pr view <N> --json state,headRefOid` (Quy tắc Cứng #22b).
- Kết thúc mọi phiên với checkout chính ở đúng nhánh mà nó đã bắt đầu.

## Superpowers / hiện vật lập kế hoạch — ghi đè đường dẫn

Quy ước `_tasks/` được định nghĩa trong `AGENTS.md` → "Hiện vật Lập kế hoạch & Nghiên cứu". Các
skill superpowers đi kèm với giá trị mặc định trỏ tới `docs/…` — những giá trị mặc định đó được **ghi đè
tại đây**. Khi một skill superpowers thông báo đường dẫn như "đã lưu vào `docs/superpowers/plans/…`",
hãy viết lại thành đường dẫn `_tasks/…` tương đương trước khi ghi:

| Hiện vật (skill)                     | Mặc định (KHÔNG sử dụng)  | Thay vào đó, lưu tại đây                                      |
| ------------------------------------ | ------------------------- | ------------------------------------------------------------- |
| Kế hoạch (`writing-plans`)           | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Đặc tả / thiết kế (`brainstorming`)  | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Nghiên cứu (`deep-research`, ad-hoc) | `docs/research/`          | `_tasks/research/…`                                           |
| Bàn giao (`/handoff`)                | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit các hiện vật đó bên trong repo `_tasks/` (`git -C _tasks …`), không bao giờ trong repo chính.

## Tệp nháp / tạm thời — sử dụng `_artifacts/`, không dùng `/tmp`

Dự án này ghi đè vùng nháp phiên mặc định của môi trường (`/tmp/claude-*/…`). Ghi
các tệp tạm thời/đang xử lý — bản xuất, tệp zip được tạo, đầu ra trung gian dùng một lần, bất kỳ thứ gì bạn
thường đặt trong `/tmp` — vào `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` là một đường dẫn `_*` ở thư mục gốc: đã được git bỏ qua (`AGENTS.md` → "Các đường dẫn `_*` ở thư mục gốc"), chỉ tồn tại
  trên đĩa và không bao giờ được theo dõi.
- Lý do: giữ đầu ra tạm thời bên trong dự án (thay vì `/tmp`) giúp người vận hành dễ dàng
  tìm và xóa mọi thứ tạm thời tại một nơi, thay vì phải tìm kiếm trong các thư mục `/tmp`
  theo từng phiên vốn sẽ biến mất hoặc tích tụ các tệp không được theo dõi.
- **Không** nhầm lẫn mục này với `_tasks/` (Quy tắc Cứng #23, repo git riêng tư độc lập dành cho
  các kế hoạch/đặc tả/nghiên cứu/bàn giao bền vững) — `_artifacts/` chỉ dành cho các tệp làm việc có thể loại bỏ, không có nội dung nào
  tại đây cần được duy trì hoặc quản lý phiên bản.

## Đảm bảo nhánh cơ sở xanh trước khi mở PR

Trước khi tách nhánh hoặc mở PR, hãy chạy kiểm tra trạng thái xanh của nhánh cơ sở (`AGENTS.md` → Quy trình Git →
"Kiểm tra trạng thái xanh của nhánh cơ sở"; các skill của dự án tham chiếu kiểm tra này dưới dạng `.agents/skills/_shared/base-green.md`). Một PR
được mở khi đầu nhánh cơ sở đang đỏ phải chứa `⚠️ base-red inherited: #<issue>` trong phần nội dung. Để
xử lý hết trạng thái đỏ tích tụ (đầu nhánh cơ sở + các PR đỏ), hãy sử dụng skill `/sweep-reds`.
