-- Migration 032: Add has_warnings to request_detail_logs
ALTER TABLE request_detail_logs ADD COLUMN has_warnings INTEGER NOT NULL DEFAULT 0;
