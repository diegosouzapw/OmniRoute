@echo off
rem OmniRoute — launch Claude Code pointed at the local OmniRoute server (Windows).
rem Wraps `omniroute launch` from the source checkout so no global install is needed.
rem Extra arguments are passed through to `omniroute launch` (e.g. --profile glm52).
setlocal
title Claude Code via OmniRoute
cd /d "%~dp0..\.."
node bin\omniroute.mjs launch %*
endlocal
pause
