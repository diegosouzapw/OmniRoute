#!/usr/bin/env bash

# Start DE
ulimit -c 0
export XCURSOR_THEME=breeze_cursors
export XCURSOR_SIZE=24
export XKB_DEFAULT_LAYOUT=us
export XKB_DEFAULT_RULES=evdev
export WAYLAND_DISPLAY=wayland-1

# OmniRoute: republish Chromium's loopback DevTools (127.0.0.1:9222) onto
# 0.0.0.0:9223 so the host can harvest cookies. Chromium must already be
# listening, so we delay a moment. Backgrounded; the DE takes over below.
( sleep 8; python3 /usr/local/bin/cdp-bridge.py >/proc/1/fd/2 2>&1 ) &

if [ "${SELKIES_DESKTOP,,}" == "true" ]; then
  labwc > /dev/null 2>&1 &
  sleep 1
  export WAYLAND_DISPLAY=wayland-0
  export DISPLAY=:0
  selkies-desktop
else
  labwc > /dev/null 2>&1
fi
