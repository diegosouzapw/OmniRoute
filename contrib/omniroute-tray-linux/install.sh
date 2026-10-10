#!/usr/bin/env bash
# ==============================================================================
# OmniRoute Tray for Linux - One-Line Installer
# Repository: https://github.com/Susanthakuri92/omniroute-tray-linux
# ==============================================================================

set -euo pipefail

# Colors
BOLD="\033[1m"
GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
RESET="\033[0m"

REPO_URL="https://github.com/Susanthakuri92/omniroute-tray-linux.git"
INSTALL_DIR="${HOME}/.local/share/omniroute-tray"
BIN_DIR="${HOME}/.local/bin"
PLASMOID_DIR="${HOME}/.local/share/plasma/plasmoids/org.omniroute.plasmoid"
DESKTOP_DIR="${HOME}/.local/share/applications"
SYSTEM_PLASMOID_DIR="/usr/share/plasma/plasmoids/org.omniroute.plasmoid"

log_info() {
    echo -e "${BLUE}==>${RESET} ${BOLD}$1${RESET}"
}

log_success() {
    echo -e "${GREEN}✓${RESET} $1"
}

log_warn() {
    echo -e "${YELLOW}!${RESET} $1"
}

log_error() {
    echo -e "${RED}✗${RESET} $1" >&2
}

# Helper: safely remove a managed path (symlink, dir, or file) within known locations
remove_managed_path() {
    local path="$1"
    # Only operate inside known managed trees for safety
    case "$path" in
        "$HOME"/.local/share/*) ;;
        "$HOME"/.local/bin/*) ;;
        "$HOME"/.cache/*)
            # only allow qmlcache dirs
            case "$path" in
                "$HOME"/.cache/plasmashell/qmlcache|"$HOME"/.cache/qmlcache) ;;
                *) return 0 ;;
            esac
            ;;
        *)  # refuse anything else
            return 0
            ;;
    esac

    if [ -L "$path" ]; then
        rm -f "$path"
        log_info "Removed symlink: $path"
    elif [ -d "$path" ]; then
        rm -rf "$path"
        log_info "Removed directory: $path"
    elif [ -f "$path" ]; then
        rm -f "$path"
        log_info "Removed file: $path"
    fi
}

# Helper: true if DIR is a git clone of the omniroute-tray repo
is_omniroute_clone() {
    local dir="$1"
    if [ -d "$dir/.git" ]; then
        local remote
        remote=$(git -C "$dir" remote get-url origin 2>/dev/null) || return 1
        case "$remote" in
            *Susanthakuri92/omniroute-tray-linux.git|*github.com*:Susanthakuri92/omniroute-tray-linux.git)
                return 0
                ;;
        esac
    fi
    return 1
}

# Stop the tray by inspecting argv positions, rather than `pkill -f
# omniroute_tray.py`, which also signals unrelated processes that merely mention
# the filename (an editor, a pager, a shell running grep). The tray runs either
# directly (`python3 …/omniroute_tray.py`) or through the installed symlink, whose
# path the interpreter receives as argv[1] (`python3 ~/.local/bin/omniroute-tray`).
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

# Handle flags
DEV_MODE=0
for arg in "$@"; do
    case "$arg" in
        --help|-h)
            echo -e "${BOLD}OmniRoute Tray Installer${RESET}"
            echo -e "Usage: ./install.sh [OPTIONS]\n"
            echo "Options:"
            echo "  --dev         Install in development mode (symlink directly from current checkout)"
            echo "  --uninstall   Uninstall OmniRoute Tray and remove desktop / plasmoid entries"
            echo "  --help, -h    Show this help message"
            exit 0
            ;;
        --dev)
            DEV_MODE=1
            ;;
        --uninstall)
            SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-}")" 2>/dev/null && pwd || echo "")"
            if [ -f "${SCRIPT_DIR}/uninstall.sh" ]; then
                exec bash "${SCRIPT_DIR}/uninstall.sh" "${@:2}"
            fi
            log_info "Uninstalling OmniRoute Tray..."
            "${BIN_DIR}/omniroute-tray" --stop 2>/dev/null || true
            stop_tray_processes
            remove_managed_path "${BIN_DIR}/omniroute-tray"
            remove_managed_path "${PLASMOID_DIR}"
            remove_managed_path "${DESKTOP_DIR}/omniroute-tray.desktop"
            remove_managed_path "${HOME}/.config/autostart/omniroute-tray.desktop"
            remove_managed_path "${HOME}/.local/share/icons/hicolor/scalable/apps/omniroute-tray.svg"
            remove_managed_path "${HOME}/.local/share/icons/hicolor/scalable/apps/omniroute-tray-symbolic.svg"
            remove_managed_path "${HOME}/.local/share/icons/hicolor/scalable/apps/omniroute-tray-active-symbolic.svg"
            remove_managed_path "${INSTALL_DIR}"
            remove_managed_path "${HOME}/.cache/plasmashell/qmlcache"
            remove_managed_path "${HOME}/.cache/qmlcache" || true
            if command -v kbuildsycoca6 &>/dev/null; then
                kbuildsycoca6 --noincremental 2>/dev/null || true
            fi
            if pgrep -x "plasmashell" &>/dev/null; then
                systemctl --user restart plasma-plasmashell 2>/dev/null || true
            fi
            # Warn about system-wide plasmoid if present
            if [ -e "$SYSTEM_PLASMOID_DIR" ] || [ -L "$SYSTEM_PLASMOID_DIR" ]; then
                log_warn "System-wide plasmoid found at $SYSTEM_PLASMOID_DIR"
                echo "  To remove it (requires root): sudo rm -rf $SYSTEM_PLASMOID_DIR"
            fi
            log_success "OmniRoute Tray has been uninstalled."
            exit 0
            ;;
    esac
done

echo -e "${BOLD}"
cat << "EOF"
   ___                  _ ____             _         _____
  / _ \ _ __ ___  _ __ (_)  _ \ ___  _   _| |_ ___  |_   _| __ __ _ _   _
 | | | | '_ \` _ \| '_ \| | |_) / _ \| | | | __/ _ \   | || '__/ _\` | | | |
 | |_| | | | | | | | | | |  _ < (_) | |_| | ||  __/   | || | | (_| | |_| |_
  \___/|_| |_| |_|_|_|_|_|_| \_\___/ \__,_|\__\___|   |_||_|  \__,_|\__, ( )
                                                                    |___/|/
EOF
echo -e "${RESET}"
echo -e "Installing OmniRoute Tray for Linux...\n"

# 1. Check prerequisites
log_info "Checking prerequisites..."
if ! command -v python3 &>/dev/null; then
    log_error "Python 3 is required but was not found. Please install python3."
    exit 1
fi

if ! command -v git &>/dev/null; then
    log_error "git is required for installation and auto-updates. Please install git."
    exit 1
fi

PYSIDE_INSTALLED=1
python3 -c "import PySide6" &>/dev/null || PYSIDE_INSTALLED=0

# 2. Clone or Update Repository
log_info "Setting up repository..."
mkdir -p "${HOME}/.local/share"
mkdir -p "${BIN_DIR}"
mkdir -p "${DESKTOP_DIR}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-}")" 2>/dev/null && pwd || echo "")"
if [ "${DEV_MODE}" -eq 1 ]; then
    if [ -f "${SCRIPT_DIR}/omniroute_tray.py" ]; then
        SOURCE_DIR="${SCRIPT_DIR}"
    elif [ -f "./omniroute_tray.py" ]; then
        SOURCE_DIR="$(pwd)"
    else
        log_error "--dev was specified but omniroute_tray.py was not found in ${SCRIPT_DIR} or current directory."
        exit 1
    fi
    log_info "Installing in development mode (symlinking directly from ${SOURCE_DIR})..."
elif [ -n "${SCRIPT_DIR}" ] && [ -f "${SCRIPT_DIR}/omniroute_tray.py" ] && [ "${SCRIPT_DIR}" != "${INSTALL_DIR}" ]; then
    SOURCE_DIR="${SCRIPT_DIR}"
    log_info "Installing from local directory: ${SOURCE_DIR}"
else
    SOURCE_DIR="${INSTALL_DIR}"
    if [ -d "${INSTALL_DIR}/.git" ]; then
        log_info "Updating existing repository in ${INSTALL_DIR}..."
        git -C "${INSTALL_DIR}" fetch --quiet origin main 2>/dev/null || true
        git -C "${INSTALL_DIR}" reset --hard origin/main --quiet 2>/dev/null || git -C "${INSTALL_DIR}" pull --quiet || true
    else
        log_info "Cloning repository into ${INSTALL_DIR}..."
        rm -rf "${INSTALL_DIR}"
        git clone --quiet "${REPO_URL}" "${INSTALL_DIR}"
    fi
fi
log_success "Files ready."

# 3. Install CLI helper to ~/.local/bin
log_info "Setting up executable in ${BIN_DIR}/omniroute-tray..."
remove_managed_path "${BIN_DIR}/omniroute-tray"
ln -sf "${SOURCE_DIR}/omniroute_tray.py" "${BIN_DIR}/omniroute-tray"
chmod +x "${BIN_DIR}/omniroute-tray"
log_success "Executable linked."

# 4. Install KDE Plasma Plasmoid
log_info "Setting up KDE Plasma 6 widget..."
mkdir -p "${HOME}/.local/share/plasma/plasmoids"
remove_managed_path "${PLASMOID_DIR}"
ln -sfn "${SOURCE_DIR}/org.omniroute.plasmoid" "${PLASMOID_DIR}"
rm -rf "${HOME}/.cache/plasmashell/qmlcache" "${HOME}/.cache/qmlcache" 2>/dev/null || true
if command -v kbuildsycoca6 &>/dev/null; then
    kbuildsycoca6 --noincremental 2>/dev/null || true
fi
log_success "Plasmoid registered."

# 5. Create Desktop Launcher
log_info "Creating desktop application entry..."
cat > "${DESKTOP_DIR}/omniroute-tray.desktop" << EOF
[Desktop Entry]
Name=OmniRoute Tray
GenericName=AI Gateway Tray
Comment=System Tray Supervisor and Telemetry Monitor for OmniRoute
Exec=${BIN_DIR}/omniroute-tray
Icon=${SOURCE_DIR}/omniroute.svg
Terminal=false
Type=Application
Categories=Utility;Network;Development;
StartupNotify=false
X-GNOME-Autostart-enabled=true
EOF
chmod +x "${DESKTOP_DIR}/omniroute-tray.desktop"
log_success "Desktop launcher created."

# 6. Check PATH
if [[ ":$PATH:" != *":${BIN_DIR}:"* ]]; then
    log_warn "${BIN_DIR} is not in your current PATH."
    echo -e "  Add this line to your ~/.bashrc or ~/.zshrc:"
    echo -e "  ${BOLD}export PATH=\"\$HOME/.local/bin:\$PATH\"${RESET}\n"
fi

# 7. Desktop Environment & Dependency Checks
IS_KDE=0
if pgrep -x "plasmashell" &>/dev/null || [[ "${XDG_CURRENT_DESKTOP:-}" == *"KDE"* ]]; then
    IS_KDE=1
    log_success "KDE Plasma 6 detected! Native Plasmoid registered (runs with standard Python 3, PySide6 not required)."
    systemctl --user restart plasma-plasmashell 2>/dev/null || true
fi

if [ "${IS_KDE}" -eq 0 ]; then
    # Non-KDE desktops use the PySide6 standalone tray
    if [ "${PYSIDE_INSTALLED}" -eq 0 ]; then
        log_warn "PySide6 is not detected. Standalone system tray mode requires PySide6."
        echo -e "  Install it using your distribution package manager:"
        echo -e "  • Arch / CachyOS: ${BOLD}sudo pacman -S python-pyside6${RESET}"
        echo -e "  • Ubuntu / Debian: ${BOLD}sudo apt install python3-pyside6${RESET}"
        echo -e "  • Fedora:          ${BOLD}sudo dnf install python3-pyside6${RESET}"
        echo -e "  • Or via pip:      ${BOLD}pip install PySide6${RESET}\n"
    fi

    if [[ "${XDG_CURRENT_DESKTOP:-}" == *"GNOME"* ]]; then
        log_info "GNOME Shell detected."
        echo -e "  ${YELLOW}!${RESET} GNOME requires the ${BOLD}AppIndicator${RESET} extension to display tray icons in the top bar."
        echo -e "    Ubuntu includes this by default. On Fedora/Debian/Arch: ${BOLD}sudo apt/dnf/pacman install gnome-shell-extension-appindicator${RESET}\n"
    fi
fi

# 8. Warn about system-wide plasmoid duplicate
if [ -e "$SYSTEM_PLASMOID_DIR" ] || [ -L "$SYSTEM_PLASMOID_DIR" ]; then
    log_warn "System-wide plasmoid found at $SYSTEM_PLASMOID_DIR"
    echo "  This duplicates the user widget; to remove it (requires root): sudo rm -rf $SYSTEM_PLASMOID_DIR"
fi

# 9. Warn about duplicate panel registration (widget in both tray and as standalone applet)
APLETSRC="${HOME}/.config/plasma-org.kde.plasma.desktop-appletsrc"
if [ -f "$APLETSRC" ]; then
    dup_status=$(python3 -c '
import sys, re
try:
    with open(sys.argv[1], "r", errors="ignore") as f:
        content = f.read()
    sections = re.split(r"\n(?=\[)", content)
    standalone = 0
    tray = 0
    for s in sections:
        lines = s.strip().split("\n")
        h = lines[0].strip()
        if any(line.strip() == "plugin=org.omniroute.plasmoid" for line in lines[1:]):
            if re.match(r"^\[Containments\]\[\d+\]\[Applets\]\[\d+\]$", h):
                standalone += 1
            elif re.match(r"^\[Containments\]\[\d+\]\[Applets\]\[\d+\]\[Applets\]\[\d+\]$", h):
                tray += 1
    if standalone > 0 and tray > 0:
        print("PANEL_AND_TRAY")
    elif standalone > 1 or tray > 1:
        print("MULTIPLE")
    else:
        print("OK")
except Exception:
    print("OK")
' "$APLETSRC" 2>/dev/null || echo "OK")

    if [ "$dup_status" = "PANEL_AND_TRAY" ]; then
        log_warn "OmniRoute appears twice in your panel: once as a standalone widget and once in the system tray."
        echo "  To fix: right-click the duplicate icon → 'Remove from Panel' or edit the system tray settings."
    elif [ "$dup_status" = "MULTIPLE" ]; then
        log_warn "OmniRoute appears multiple times in your panel or system tray."
        echo "  To fix: right-click redundant widget(s) → 'Remove from Panel'."
    fi
fi

# 10. Handle possible stale duplicate clone at $INSTALL_DIR when installing from local source
if [ "$SOURCE_DIR" = "$SCRIPT_DIR" ] && [ "$SCRIPT_DIR" != "$INSTALL_DIR" ]; then
    if [ -d "$INSTALL_DIR" ] && is_omniroute_clone "$INSTALL_DIR"; then
        log_info "Removing stale clone at $INSTALL_DIR"
        remove_managed_path "$INSTALL_DIR"
    elif [ -d "$INSTALL_DIR" ]; then
        # Check if directory has non-empty contents other than runtime files
        non_runtime_files=$(find "$INSTALL_DIR" -mindepth 1 -maxdepth 1 -not -name "tray.lock" -not -name "tray.log" 2>/dev/null | head -n 1)
        if [ -n "$non_runtime_files" ]; then
            log_warn "Directory $INSTALL_DIR exists but is not a clone of this repo; leaving it untouched."
        fi
    fi
fi

# 11. Final verification step
log_info "Verifying installation..."
# Helper to check a path and print status
check_path() {
    local desc="$1"
    local path="$2"
    local check_cmd="$3"
    if eval "$check_cmd"; then
        echo -e "  [✓] $desc: OK"
        return 0
    else
        echo -e "  [✗] $desc: FAIL"
        return 1
    fi
}

all_good=0

# Plasmoid symlink
check_path "Plasmoid symlink" "$PLASMOID_DIR" "[ -L \"$PLASMOID_DIR\" ] && [ -d \"${PLASMOID_DIR}\" ]" || all_good=$((all_good+1))
# Plasmoid target exists
check_path "Plasmoid target" "${PLASMOID_DIR}" "[ -d \"${PLASMOID_DIR}/contents\" ] && [ -f \"${PLASMOID_DIR}/metadata.json\" ]" || all_good=$((all_good+1))
# Binary symlink
check_path "Binary symlink" "$BIN_DIR/omniroute-tray" "[ -L \"$BIN_DIR/omniroute-tray\" ] && [ -x \"${BIN_DIR}/omniroute-tray\" ]" || all_good=$((all_good+1))
# Binary target exists
check_path "Binary target" "$BIN_DIR/omniroute-tray" "[ -f \"${SOURCE_DIR}/omniroute_tray.py\" ]" || all_good=$((all_good+1))
# No nested plasmoid inside plasmoid dir (would indicate ln -sfn on a directory)
check_path "No nested plasmoid" "$PLASMOID_DIR/org.omniroute.plasmoid" "[ ! -e \"$PLASMOID_DIR/org.omniroute.plasmoid\" ]" || all_good=$((all_good+1))
# No second repo clone at $INSTALL_DIR unless it's the source we're using
if [ "$SOURCE_DIR" = "$INSTALL_DIR" ]; then
    check_path "Single repo clone" "$INSTALL_DIR" "[ -d \"$INSTALL_DIR/.git\" ]" || all_good=$((all_good+1))
else
    # When installing from local source, we expect INSTALL_DIR either absent or not a clone
    if [ -d "$INSTALL_DIR" ] && is_omniroute_clone "$INSTALL_DIR"; then
        echo -e "  [✗] Second repo clone present at $INSTALL_DIR"
        all_good=$((all_good+1))
    else
        echo -e "  [✓] No second repo clone: OK"
    fi
fi

if [ $all_good -eq 0 ]; then
    log_success "Install check passed."
else
    log_warn "Install check found $all_good issue(s). See above."
fi

echo -e "\n${GREEN}${BOLD}Installation completed successfully!${RESET}\n"
echo -e "${BOLD}Next steps:${RESET}"
echo -e "  • ${BOLD}KDE Plasma 6:${RESET} Right-click panel → ${BLUE}Add Widgets...${RESET} → search for ${BOLD}OmniRoute${RESET} and drag it to your panel."
echo -e "  • ${BOLD}GNOME / XFCE / Tiling WMs:${RESET} Run ${BOLD}omniroute-tray &${RESET} or launch it from your application menu."
echo -e "  • ${BOLD}In-App Updates:${RESET} Click ${BOLD}[Check for omniroute-tray updates]${RESET} in the tray or run ${BOLD}omniroute-tray --update-tray${RESET} anytime."