# Feature: Codex Missing Input Parameter Fix

> GitHub Issue: #1805 — opened by @artemivchatov on 2026-04-30T07:42:38Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

Codex in Cursor gives `[ERROR] [400]: Missing required parameter: 'input'.`

## 💬 Community Discussion
Kilo Auto-Triage marked it as a duplicate of 1720, but the author clarified it's a different error message.

## 🎯 Refined Feature Description

Inject a dummy `input` parameter for Codex when it's missing to satisfy schema requirements.

> ℹ️ This issue has already been resolved in a previous PR/commit and exists in `release/v3.7.6`.
