// ─── Protobuf WS templates ──────────────────────────────────────────────────────
// Base64-encoded protobuf templates captured from Meta AI web client.
// These are mutated at specific field paths to inject conversation-id,
// prompt text, timestamps, and message IDs per conversation.
//
// Updated 2026-09-05 (issue #10727 fix): Replaced stale templates with fresh
// browser-captured ones. Critical structural changes vs old templates:
//   - field 1.1.12 (mode): now includes mode_thinking string (was bare varint 1000)
//   - field 1.7: now has flags {12:1, 13:1} (was empty bytes)
//   - field 1.26: new varint 0 (was absent)
//   - field 1.1.19.2: fixed32 1.0 vs old 2.0
//   - OS/UA: Windows Chrome 152 vs old Mac Chrome 146
// These changes fix the persistent WS timeout where gateway sent 4 messages then
// went silent. Root cause: gateway now validates mode_thinking presence.
//
// VERIFIED against live meta.ai WS captures from TWO independent accounts
// (2026-07-19). The following fields are confirmed STATIC (app-level
// constants sent by Meta's own client, not per-user secrets):
//   - 64-hex session token (3e64e7b0c282fb56... replaces old e2b88f98...)
//   - Actor numeric ID (867051314767696)
//   - Locale (zh-CN in live capture, but patching maintains flexibility)
//   - App ID (1522763855472543)
// The only user-variable field is the timezone (system TZ), which is
// low-signal for anti-fraud. No fingerprint randomization is warranted.

// Updated 2026-09-05: Replaced with browser-captured template that includes:
// - field 1.1.12 with mode_thinking string (was missing)
// - field 1.7 with flags {12:1, 13:1} (was empty)
// - field 1.26 varint 0 (was absent)
// These structural changes fix the persistent WS timeout (issue #10727).
export const META_WS_HOME_TEMPLATE_B64 =
  "CsAGCswDCiBLQURBQlJBX19IT01FX19VTklGSUVEX0lOUFVUX0JBUhIQMTUyMjc2Mzg1NTQ3MjU0MyInNWE1Yi04ZDRlLWYwNTQtOTllZi1iMmRlLWRiMDItMGQwNS01MmM3KigqJgokNWIxMzk4YmEtZDdmYi00ZjczLWI5MTYtY2JhMzE4ODBjODVmMAU6C0hVTUFOX0FHRU5UQiIKDzg2NzA1MTMxNDc2NzY5NhIPODY3MDUxMzE0NzY3Njk2UgVFQ1RPMVoRQWJyYSBXZWIgTWFpbiBLZXliGBoSCOkHEg1tb2RlX3RoaW5raW5nIgIIAWoHV2luZG93c3IKdXNlcl9pbnB1dHpvTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzE1Mi4wLjAuMCBTYWZhcmkvNTM3LjM2ggELZGVza3RvcF93ZWKaAUcKQDNlNjRlN2IwYzI4MmZiNTY3NzI0ODIxNTljZjAzMTcxNjkxYWQxYjM0ODBkNjk5M2E4NDJiMDQwMjIxZTM4YzEVAACAPxIUCPSTqtzR+oYCEPSTqtzR+oYCGAIaAiABIgAqDgip9tKHhzQY5/XSh4c0MiQ3NWExMDhlZS1hZjFiLTQyZTUtOTFhMi1jYjVkZmNhOTEwOTA6BGABaAFKBxIFemgtQ05ScgokZTc4ZWFhZjUtZTY3MC00MjczLWE1NjktZjgwMTkyNDc4MTNhGiRjZjQ4N2QyNi05MDBhLTQ3ZjYtODhjMS1iMmNkMGEwNjM4NWQiJDViMTM5OGJhLWQ3ZmItNGY3My1iOTE2LWNiYTMxODgwYzg1ZnoMIgpBc2lhL1Rva3lvggEDsAEBkgEMCgZzdG9ja3MSAggBkgENCgd3ZWF0aGVyEgIIAZIBJAoebWV0YV9rbm93bGVkZ2Vfc2VhcmNoX2Nhcm91c2VsEgIIAZIBIgocbWV0YV9jYXRhbG9nX3NlYXJjaF9jYXJvdXNlbBICCAGSARMKDW1lZGlhX2dhbGxlcnkSAggBogEBA9ABABJsCmEKJDM4NzlmMDJlLWZkNDUtNGJjNS04YjgyLTlhNDkxMDFkYjRjNhI3CiQ1YjEzOThiYS1kN2ZiLTRmNzMtYjkxNi1jYmEzMTg4MGM4NWYQqvbSh4c0GJ3ApOrrpY+OaCgBEgJIaSIDCgEw";
// Updated 2026-09-05: Derived from working HOME template (same structural fixes).
export const META_WS_CHAT_TEMPLATE_B64 =
  "CsAGCswDCiBLQURBQlJBX19DSEFUX19VTklGSUVEX0lOUFVUX0JBUhIQMTUyMjc2Mzg1NTQ3MjU0MyInNWE1Yi04ZDRlLWYwNTQtOTllZi1iMmRlLWRiMDItMGQwNS01MmM3KigqJgokNWIxMzk4YmEtZDdmYi00ZjczLWI5MTYtY2JhMzE4ODBjODVmMAU6C0hVTUFOX0FHRU5UQiIKDzg2NzA1MTMxNDc2NzY5NhIPODY3MDUxMzE0NzY3Njk2UgVFQ1RPMVoRQWJyYSBXZWIgTWFpbiBLZXliGBoSCOkHEg1tb2RlX3RoaW5raW5nIgIIAWoHV2luZG93c3IKdXNlcl9pbnB1dHpvTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzE1Mi4wLjAuMCBTYWZhcmkvNTM3LjM2ggELZGVza3RvcF93ZWKaAUcKQDNlNjRlN2IwYzI4MmZiNTY3NzI0ODIxNTljZjAzMTcxNjkxYWQxYjM0ODBkNjk5M2E4NDJiMDQwMjIxZTM4YzEVAACAPxIUCPSTqtzR+oYCEPSTqtzR+oYCGAIaAiABIgAqDgip9tKHhzQY5/XSh4c0MiQ3NWExMDhlZS1hZjFiLTQyZTUtOTFhMi1jYjVkZmNhOTEwOTA6BGABaAFKBxIFemgtQ05ScgokZTc4ZWFhZjUtZTY3MC00MjczLWE1NjktZjgwMTkyNDc4MTNhGiRjZjQ4N2QyNi05MDBhLTQ3ZjYtODhjMS1iMmNkMGEwNjM4NWQiJDViMTM5OGJhLWQ3ZmItNGY3My1iOTE2LWNiYTMxODgwYzg1ZnoMIgpBc2lhL1Rva3lvggEDsAEBkgEMCgZzdG9ja3MSAggBkgENCgd3ZWF0aGVyEgIIAZIBJAoebWV0YV9rbm93bGVkZ2Vfc2VhcmNoX2Nhcm91c2VsEgIIAZIBIgocbWV0YV9jYXRhbG9nX3NlYXJjaF9jYXJvdXNlbBICCAGSARMKDW1lZGlhX2dhbGxlcnkSAggBogEBA9ABABJsCmEKJDM4NzlmMDJlLWZkNDUtNGJjNS04YjgyLTlhNDkxMDFkYjRjNhI3CiQ1YjEzOThiYS1kN2ZiLTRmNzMtYjkxNi1jYmEzMTg4MGM4NWYQqvbSh4c0GJ3ApOrrpY+OaCgBEgJIaSIDCgEw";
