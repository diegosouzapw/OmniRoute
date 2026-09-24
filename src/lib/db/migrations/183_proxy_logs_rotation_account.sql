-- rotation_account: masked id of the rotation account that served the logged
-- request (multi-account anonymous rotation only). NULL for direct/legacy rows
-- and whenever the attribution flag is off. Never a full account id. No index:
-- not a query dimension.
ALTER TABLE proxy_logs ADD COLUMN rotation_account TEXT;
