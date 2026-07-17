package main

import (
	"encoding/json"
	"net/http"
	"os"
	"os/exec"
	"runtime"
	"time"
)

// UpdateHandlers provides HTTP handlers for update operations
type UpdateHandlers struct {
	updater *Updater
}

// NewUpdateHandlers creates update handlers
func NewUpdateHandlers(updater *Updater) *UpdateHandlers {
	return &UpdateHandlers{updater: updater}
}

// Version returns current version info
func (h *UpdateHandlers) Version(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(h.updater.VersionInfo())
}

// Check checks for available updates
func (h *UpdateHandlers) Check(w http.ResponseWriter, r *http.Request) {
	info, err := h.updater.CheckForUpdate(r.Context())
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	json.NewEncoder(w).Encode(info)
}

// Apply downloads and applies update, then restarts
func (h *UpdateHandlers) Apply(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST required", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if err := h.updater.ApplyUpdate(r.Context()); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Update applied. Restarting...",
	})

	// Schedule restart
	go func() {
		time.Sleep(500 * time.Millisecond)
		restartSelf()
	}()
}

// restartSelf restarts the current process
func restartSelf() {
	exe, err := os.Executable()
	if err != nil {
		return
	}

	if runtime.GOOS == "windows" {
		// On Windows, start new process then exit
		cmd := exec.Command(exe, os.Args[1:]...)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		cmd.Start()
		os.Exit(0)
	} else {
		// On Unix, use exec to replace process
		execErr := exec.Command(exe, os.Args[1:]...).Start()
		if execErr == nil {
			os.Exit(0)
		}
	}
}

// UI serves a simple web UI for update management
func (h *UpdateHandlers) UI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write([]byte(updateUIHTML))
}

const updateUIHTML = `<!DOCTYPE html>
<html>
<head>
  <title>SLM Server Updates</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
           max-width: 600px; margin: 40px auto; padding: 20px; background: #f5f5f5; }
    .card { background: white; border-radius: 8px; padding: 24px; margin-bottom: 16px; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { margin: 0 0 8px; font-size: 24px; }
    .version { color: #666; font-size: 14px; }
    .status { padding: 12px; border-radius: 6px; margin: 16px 0; }
    .status.available { background: #e8f5e9; color: #2e7d32; }
    .status.current { background: #e3f2fd; color: #1565c0; }
    .status.error { background: #ffebee; color: #c62828; }
    button { background: #1976d2; color: white; border: none; padding: 12px 24px; 
             border-radius: 6px; cursor: pointer; font-size: 16px; margin-right: 8px; }
    button:hover { background: #1565c0; }
    button:disabled { background: #ccc; cursor: not-allowed; }
    button.secondary { background: #757575; }
    .info { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px; }
    .info dt { color: #666; }
    .info dd { margin: 0; font-weight: 500; }
    #log { background: #263238; color: #aed581; padding: 12px; border-radius: 6px; 
           font-family: monospace; font-size: 13px; max-height: 200px; overflow-y: auto; 
           display: none; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 SLM Server</h1>
    <p class="version">Version: <strong id="version">loading...</strong></p>
    <dl class="info" id="info"></dl>
  </div>
  <div class="card">
    <h2>Updates</h2>
    <div id="status" class="status">Checking for updates...</div>
    <button id="checkBtn" onclick="checkUpdate()">Check for Updates</button>
    <button id="updateBtn" onclick="applyUpdate()" disabled>Update Now</button>
    <div id="log"></div>
  </div>
  <script>
    let latestVersion = null;
    async function loadVersion() {
      const res = await fetch('/update/version');
      const data = await res.json();
      document.getElementById('version').textContent = data.version;
      document.getElementById('info').innerHTML = 
        '<dt>Commit</dt><dd>' + data.commit.slice(0,8) + '</dd>' +
        '<dt>Built</dt><dd>' + data.build_date + '</dd>' +
        '<dt>OS/Arch</dt><dd>' + data.os + '/' + data.arch + '</dd>' +
        '<dt>Go</dt><dd>' + data.go_version + '</dd>';
    }
    async function checkUpdate() {
      document.getElementById('checkBtn').disabled = true;
      document.getElementById('status').className = 'status';
      document.getElementById('status').textContent = 'Checking...';
      try {
        const res = await fetch('/update/check');
        const data = await res.json();
        if (data.error) {
          document.getElementById('status').className = 'status error';
          document.getElementById('status').textContent = 'Error: ' + data.error;
        } else if (data.update_available) {
          latestVersion = data.latest_version;
          document.getElementById('status').className = 'status available';
          document.getElementById('status').innerHTML = '✨ Update available: <strong>' + 
            data.latest_version + '</strong>';
          document.getElementById('updateBtn').disabled = false;
        } else {
          document.getElementById('status').className = 'status current';
          document.getElementById('status').textContent = '✓ You are on the latest version';
        }
      } catch(e) {
        document.getElementById('status').className = 'status error';
        document.getElementById('status').textContent = 'Failed to check: ' + e.message;
      }
      document.getElementById('checkBtn').disabled = false;
    }
    async function applyUpdate() {
      if (!confirm('Update to ' + latestVersion + '? The server will restart.')) return;
      document.getElementById('updateBtn').disabled = true;
      document.getElementById('log').style.display = 'block';
      log('Starting update to ' + latestVersion + '...');
      try {
        const res = await fetch('/update/apply', {method: 'POST'});
        const data = await res.json();
        if (data.error) { log('Error: ' + data.error); }
        else { log('Update applied! Server restarting...'); 
               setTimeout(() => location.reload(), 3000); }
      } catch(e) { log('Failed: ' + e.message); }
    }
    function log(msg) {
      const el = document.getElementById('log');
      el.textContent += new Date().toLocaleTimeString() + ' ' + msg + '\n';
      el.scrollTop = el.scrollHeight;
    }
    loadVersion(); checkUpdate();
  </script>
</body>
</html>`

