-- Migration 137: Auto-restart-adopted toggle for embedded services
--
-- When a supervisor's probeBeforeSpawn finds a healthy instance already
-- listening on its port, it adopts that process instead of spawning a new
-- one. An adopted process has no piped stdout/stderr (nothing was spawned to
-- pipe from), so the Logs panel stays empty for its entire lifetime unless
-- it's replaced with a real spawn.
--
-- `auto_restart_adopted` lets an operator opt in, per tool, to having the
-- supervisor kill an adopted process immediately and spawn a fresh one it
-- actually owns — trading one restart for working log capture going
-- forward. Defaults to 0 (off): adoption-without-restart is already the
-- safe, non-disruptive default behavior, and killing a process the operator
-- didn't ask to be killed should be opt-in, not automatic.
ALTER TABLE version_manager
  ADD COLUMN auto_restart_adopted INTEGER NOT NULL DEFAULT 0;
