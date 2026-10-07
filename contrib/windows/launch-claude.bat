@echo off
rem OmniRoute — launch Claude Code pointed at the local OmniRoute server (Windows).
rem Wraps `omniroute launch` from the source checkout so no global install is needed.
rem
rem Usage:  launch-claude.bat [project-folder] [omniroute launch args...]
rem   - From a terminal inside your project: launch-claude.bat            (opens here)
rem   - Double-click: prompts for the project folder (Enter = current folder)
rem Claude Code is started in the PROJECT folder, never in the OmniRoute checkout —
rem otherwise it loads this repo's CLAUDE.md/AGENTS.md (~60k chars) into every session.
setlocal enabledelayedexpansion
title Claude Code via OmniRoute
set "OMNIROUTE_ROOT=%~dp0..\.."

if exist "%~1\" (
  cd /d "%~1"
  shift
) else (
  set "PROJ="
  set /p "PROJ=Project folder (Enter = current: %CD%): "
  if not "!PROJ!"=="" cd /d "!PROJ!"
)

set "ARGS="
:collect
if "%~1"=="" goto run
set "ARGS=!ARGS! %1"
shift
goto collect

:run
node "%OMNIROUTE_ROOT%\bin\omniroute.mjs" launch!ARGS!
endlocal
pause
