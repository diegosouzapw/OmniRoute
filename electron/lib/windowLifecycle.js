/** Pure helpers for deciding and driving the Electron dashboard window lifecycle. */

// Electron 44 removed `openAsHidden`/`wasOpenedAsHidden` from
// `app.set/getLoginItemSettings()` (they only ever worked on macOS 12 and below, which
// Electron 44 no longer supports). The hidden-autostart contract is now carried solely by
// the `--hidden` argument registered with the login item.
function shouldStartHidden({ argv = [] } = {}) {
  return argv.includes("--hidden") || argv.includes("--minimized");
}

function showOrCreateWindow({ appReady, getWindow, createWindow }) {
  if (!appReady) return null;

  const currentWindow = getWindow();
  if (!currentWindow || currentWindow.isDestroyed()) {
    return createWindow();
  }

  if (currentWindow.isMinimized()) currentWindow.restore();
  currentWindow.show();
  currentWindow.focus();
  return currentWindow;
}

module.exports = {
  shouldStartHidden,
  showOrCreateWindow,
};
