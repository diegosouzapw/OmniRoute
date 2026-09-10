# Dokumentasi Server MCP OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server Model Context Protocol dengan 16 alat cerdas

## Instalasi

OmniRoute MCP sudah tersedia secara bawaan. Jalankan dengan:

```bash
omniroute --mcp
```

Atau melalui transport open-sse:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

## Konfigurasi IDE

Lihat [Konfigurasi IDE](integrations/ide-configs.md) untuk pengaturan Antigravity, Cursor, Copilot, dan Claude Desktop.

---

## Alat Esensial (8)

| Alat                            | Deskripsi                                       |
| :------------------------------ | :---------------------------------------------- |
| `omniroute_get_health`          | Kesehatan gateway, pemutus sirkuit, uptime      |
| `omniroute_list_combos`         | Semua combo yang dikonfigurasi beserta modelnya |
| `omniroute_get_combo_metrics`   | Metrik performa untuk combo tertentu            |
| `omniroute_switch_combo`        | Ganti combo aktif berdasarkan ID/nama           |
| `omniroute_check_quota`         | Status kuota per penyedia atau semua penyedia   |
| `omniroute_route_request`       | Kirim penyelesaian chat melalui OmniRoute       |
| `omniroute_cost_report`         | Analitik biaya untuk periode waktu tertentu     |
| `omniroute_list_models_catalog` | Katalog model lengkap beserta kemampuannya      |

## Alat Lanjutan (8)

| Alat                               | Deskripsi                                                              |
| :--------------------------------- | :--------------------------------------------------------------------- |
| `omniroute_simulate_route`         | Simulasi routing percobaan dengan pohon fallback                       |
| `omniroute_set_budget_guard`       | Anggaran sesi dengan tindakan degrade/block/alert                      |
| `omniroute_set_resilience_profile` | Terapkan preset conservative/balanced/aggressive                       |
| `omniroute_test_combo`             | Uji langsung semua model dalam combo melalui permintaan upstream nyata |
| `omniroute_get_provider_metrics`   | Metrik terperinci untuk satu penyedia                                  |
| `omniroute_best_combo_for_task`    | Rekomendasi kesesuaian tugas beserta alternatifnya                     |
| `omniroute_explain_route`          | Jelaskan keputusan routing yang lalu                                   |
| `omniroute_get_session_snapshot`   | Status sesi lengkap: biaya, token, kesalahan                           |

## Autentikasi

Alat MCP diautentikasi melalui lingkup kunci API. Setiap alat memerlukan lingkup tertentu:

| Lingkup        | Alat                                             |
| :------------- | :----------------------------------------------- |
| `read:health`  | get_health, get_provider_metrics                 |
| `read:combos`  | list_combos, get_combo_metrics                   |
| `write:combos` | switch_combo                                     |
| `read:quota`   | check_quota                                      |
| `write:route`  | route_request, simulate_route, test_combo        |
| `read:usage`   | cost_report, get_session_snapshot, explain_route |
| `write:config` | set_budget_guard, set_resilience_profile         |
| `read:models`  | list_models_catalog, best_combo_for_task         |

## Pencatatan Audit

Setiap pemanggilan alat dicatat ke `mcp_tool_audit` dengan:

- Nama alat, argumen, hasil
- Durasi (ms), berhasil/gagal
- Hash kunci API, cap waktu

## Berkas

| Berkas                                       | Tujuan                                     |
| :------------------------------------------- | :----------------------------------------- |
| `open-sse/mcp-server/server.ts`              | Pembuatan server MCP + pendaftaran 16 alat |
| `open-sse/mcp-server/transport.ts`           | Transportasi Stdio + HTTP                  |
| `open-sse/mcp-server/auth.ts`                | Validasi kunci API + lingkup               |
| `open-sse/mcp-server/audit.ts`               | Pencatatan audit pemanggilan alat          |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 pengendali alat lanjutan                 |
