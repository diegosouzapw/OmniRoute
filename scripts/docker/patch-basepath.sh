#!/bin/sh
# Hard Rule #13 — OMNIROUTE_BASE_PATH must travel via the process environment.
# This wrapper never expands the subpath into sed/awk/shell script text; Node
# reads OMNIROUTE_BASE_PATH from env inside ensure-docker-base-path.mjs.
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
exec node "${SCRIPT_DIR}/ensure-docker-base-path.mjs"
