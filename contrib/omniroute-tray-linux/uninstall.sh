#!/usr/bin/env bash
# ==============================================================================
# OmniRoute Tray for Linux - Uninstaller
# Repository: https://github.com/Susanthakuri92/omniroute-tray-linux
# ==============================================================================

set -euo pipefail

BOLD="\033[1m"
GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
RESET="\033[0m"

INSTALL_DIR="${HOME}/.local/share/omniroute-tray"
BIN_PATH="${HOME}/.local/bin/omniroute-tray"
PLASMOID_DIR="${HOME}/.local/share/plasma/plasmoids/org.omniroute.plasmoid"
DESKTOP_ENTRY="${HOME}/.local/share/applications/omniroute-tray.desktop"
AUTOSTART_ENTRY="${HOME}/.config/autostart/omniroute-tray.desktop"
ICON_DIR="${HOME}/.local/share/icons/hicolor/scalable/apps"
CONFIG_DIR="${HOME}/.config/omniroute-tray"
STATE_DIR="${HOME}/.local/state/omniroute-tray"
SYSTEM_PLASMOID_DIR="/usr/share/plasma/plasmoids/org.omniroute.plasmoid"

PURGE=0
for arg in "$@"; do
    if [ "$arg" = "--purge" ]; then
        PURGE=1
    fi
done

echo -e "${BOLD}OmniRoute Tray Uninstaller${RESET}\n"

# 1. Stop running processes
if [ -x "${BIN_PATH}" ]; then
    echo -e "${BLUE}==>${RESET} Stopping running OmniRoute processes..."
    "${BIN_PATH}" --stop 2>/dev/null || true
fi
# Stop the tray by inspecting argv positions, rather than `pkill -f
# omniroute_tray.py`, which also signals unrelated processes that merely mention
# the filename (an editor, a pager, a shell running grep).
#
# The tray is launched either directly (`python3 …/omniroute_tray.py`) or through
# the installed symlink, whose path is what the interpreter receives as argv[1]
# (`python3 ~/.local/bin/omniroute-tray`), so both names are accepted.
stop_tray_processes() {
    local pid_dir pid host
    local -a argv
    for pid_dir in /proc/[0-9]*; do
        [ -r "${pid_dir}/cmdline" ] || continue
        pid="${pid_dir#/proc/}"
        [ "${pid}" = "$$" ] && continue
        mapfile -d '' -t argv < "${pid_dir}/cmdline" 2>/dev/null || continue
        [ "${#argv[@]}" -ge 2 ] || continue
        host="${argv[0]##*/}"
        case "${host}" in
            python|python3|python3.*) ;;
            *) continue ;;
        esac
        case "${argv[1]##*/}" in
            omniroute-tray|omniroute_tray.py) kill -TERM "${pid}" 2>/dev/null || true ;;
        esac
    done
}
stop_tray_processes

# 2. Purge configuration and logs if requested (done early so configs are removed
# before we delete the uninstaller script itself)
if [ "${PURGE}" -eq 1 ]; then
    echo -e "${BLUE}==>${RESET} Purging configuration and logs (--purge specified)..."
    rm -rf "${CONFIG_DIR}"
    rm -rf "${STATE_DIR}"
    echo -e "${GREEN}✓${RESET} Configuration and logs purged."
fi

# 3. Remove desktop & autostart entries
echo -e "${BLUE}==>${RESET} Removing desktop integrations..."
rm -f "${DESKTOP_ENTRY}"
rm -f "${AUTOSTART_ENTRY}"

# 4. Remove installed icons
rm -f "${ICON_DIR}/omniroute-tray.svg"
rm -f "${ICON_DIR}/omniroute-tray-symbolic.svg"
rm -f "${ICON_DIR}/omniroute-tray-active-symbolic.svg"

# 5. Remove CLI executable symlink
echo -e "${BLUE}==>${RESET} Removing executable..."
rm -f "${BIN_PATH}"

# 6. Remove KDE Plasma widget symlink
if [ -L "${PLASMOID_DIR}" ]; then
    echo -e "${BLUE}==>${RESET} Removing KDE Plasma widget symlink..."
    rm -f "${PLASMOID_DIR}"
    rm -rf "${HOME}/.cache/plasmashell/qmlcache" "${HOME}/.cache/qmlcache" 2>/dev/null || true
    if command -v kbuildsycoca6 &>/dev/null; then
        kbuildsycoca6 --noincremental 2>/dev/null || true
    fi
    if pgrep -x "plasmashell" &>/dev/null; then
        systemctl --user restart plasma-plasmashell 2>/dev/null || true
    fi
elif [ -d "${PLASMOID_DIR}" ]; then
    echo -e "${BLUE}==>${RESET} Removing KDE Plasma widget directory..."
    rm -rf "${PLASMOID_DIR}"
    rm -rf "${HOME}/.cache/plasmashell/qmlcache" "${HOME}/.cache/qmlcache" 2>/dev/null || true
    if command -v kbuildsycoca6 &>/dev/null; then
        kbuildsycoca6 --noincremental 2>/dev/null || true
    fi
    if pgrep -x "plasmashell" &>/dev/null; then
        systemctl --user restart plasma-plasmashell 2>/dev/null || true
    fi
fi

# 7. Remove repository clone
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-}")" 2>/dev/null && pwd || echo "")"
if [ -d "${INSTALL_DIR}" ]; then
    if [ "${SCRIPT_DIR}" != "${INSTALL_DIR}" ]; then
        echo -e "${BLUE}==>${RESET} Removing application files from ${INSTALL_DIR}..."
        rm -rf "${INSTALL_DIR}"
    else
        echo -e "${BLUE}==>${RESET} Scheduling removal of ${INSTALL_DIR} on exit..."
        trap 'rm -rf "'"${INSTALL_DIR}"'" 2>/dev/null || true' EXIT
    fi
fi

# 8. Notify about preserved config
if [ "${PURGE}" -eq 0 ]; then
    if [ -d "${CONFIG_DIR}" ] || [ -d "${STATE_DIR}" ]; then
        echo -e "${YELLOW}!${RESET} Configuration preserved in ${CONFIG_DIR}."
        echo -e "  To purge it later, run: ${BOLD}rm -rf ${CONFIG_DIR} ${STATE_DIR}${RESET}"
    fi
fi


# 8. Check for system-wide plasmoid
if [ -e "${SYSTEM_PLASMOID_DIR}" ] || [ -L "${SYSTEM_PLASMOID_DIR}" ]; then
    echo -e "\n${YELLOW}!${RESET} A system-wide plasmoid was found at ${SYSTEM_PLASMOID_DIR}"
    echo -e "  To remove it, run: ${BOLD}sudo rm -rf ${SYSTEM_PLASMOID_DIR}${RESET}"
fi

echo -e "\n${GREEN}${BOLD}OmniRoute Tray has been successfully uninstalled!${RESET}"
