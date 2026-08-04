-- Phase 1 of the unified compression panel: the engines map + activeComboId become the
-- single source. The engines map is DERIVED on read (normalizeCompressionSettings) from the
-- legacy defaultMode + default-combo steps + caveman/rtk/ultra/aggressive config, so existing
-- installs keep their behavior. Here we only ensure activeComboId defaults to NULL ("default").
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('compression', 'activeComboId', 'null');
