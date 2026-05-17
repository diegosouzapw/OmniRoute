-- Adds MCP accessibility filter settings to the compression key_value namespace.
INSERT INTO key_value (namespace, key, value)
VALUES (
  'compression',
  'mcpAccessibility',
  '{"enabled":true,"maxTextChars":50000,"collapseThreshold":30,"collapseKeepHead":10,"collapseKeepTail":5,"minLengthToProcess":2000}'
)
ON CONFLICT(namespace, key) DO NOTHING;
