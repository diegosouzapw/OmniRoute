-- 141_modality_bridge_settings.sql
-- Modality Bridge (PR-1): copy legacy visionBridge* settings to the new modalityBridge* keys.
-- Legacy keys are left in place for one release cycle (rollback window).
-- Idempotent: each INSERT only fires when the new key does not exist yet, so an
-- operator-set modalityBridge* value is never overwritten and re-runs are no-ops.

INSERT INTO key_value (namespace, key, value)
SELECT 'settings', 'modalityBridgeVisionEnabled', value FROM key_value
WHERE namespace = 'settings' AND key = 'visionBridgeEnabled'
  AND NOT EXISTS (SELECT 1 FROM key_value WHERE namespace = 'settings' AND key = 'modalityBridgeVisionEnabled');

INSERT INTO key_value (namespace, key, value)
SELECT 'settings', 'modalityBridgeVisionModel', value FROM key_value
WHERE namespace = 'settings' AND key = 'visionBridgeModel'
  AND NOT EXISTS (SELECT 1 FROM key_value WHERE namespace = 'settings' AND key = 'modalityBridgeVisionModel');

INSERT INTO key_value (namespace, key, value)
SELECT 'settings', 'modalityBridgeVisionPrompt', value FROM key_value
WHERE namespace = 'settings' AND key = 'visionBridgePrompt'
  AND NOT EXISTS (SELECT 1 FROM key_value WHERE namespace = 'settings' AND key = 'modalityBridgeVisionPrompt');

INSERT INTO key_value (namespace, key, value)
SELECT 'settings', 'modalityBridgeVisionTimeout', value FROM key_value
WHERE namespace = 'settings' AND key = 'visionBridgeTimeout'
  AND NOT EXISTS (SELECT 1 FROM key_value WHERE namespace = 'settings' AND key = 'modalityBridgeVisionTimeout');

INSERT INTO key_value (namespace, key, value)
SELECT 'settings', 'modalityBridgeVisionMaxImages', value FROM key_value
WHERE namespace = 'settings' AND key = 'visionBridgeMaxImages'
  AND NOT EXISTS (SELECT 1 FROM key_value WHERE namespace = 'settings' AND key = 'modalityBridgeVisionMaxImages');
