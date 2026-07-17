#!/usr/bin/env bash
set -euo pipefail
# Bifrost Prompt Adapter - Homebox Daemon Setup
# Run on Homebox host to start services as background daemons

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_NAME="bifrost-promptadapter"
SERVICE_USER="${SERVICE_USER:-bifrost}"
SERVICE_GROUP="${SERVICE_GROUP:-bifrost}"
INSTALL_DIR="/opt/bifrost"
LOG_DIR="/var/log/bifrost"
DATA_DIR="/var/lib/bifrost"

echo "🚀 Setting up Bifrost Prompt Adapter as Homebox daemon..."

# Create user and group if they don't exist
if ! id "$SERVICE_USER" &>/dev/null; then
    echo "📝 Creating service user: $SERVICE_USER"
    sudo useradd -r -s /bin/false "$SERVICE_USER" || true
fi

# Create directories
echo "📁 Creating directories..."
sudo mkdir -p "$INSTALL_DIR" "$LOG_DIR" "$DATA_DIR"
sudo chown -R "$SERVICE_USER:$SERVICE_GROUP" "$INSTALL_DIR" "$LOG_DIR" "$DATA_DIR"
sudo chmod 755 "$INSTALL_DIR" "$LOG_DIR" "$DATA_DIR"

# Copy application files
echo "📦 Installing application files..."
sudo cp -r "$SCRIPT_DIR/services/promptadapter" "$INSTALL_DIR/"
sudo cp -r "$SCRIPT_DIR/services/researchintel" "$INSTALL_DIR/"
sudo chown -R "$SERVICE_USER:$SERVICE_GROUP" "$INSTALL_DIR"

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
cd "$INSTALL_DIR/promptadapter"
sudo -u "$SERVICE_USER" python3 -m pip install --user -r requirements.txt

# Create systemd service file
echo "⚙️  Creating systemd service..."
sudo tee /etc/systemd/system/bifrost-promptadapter.service > /dev/null <<EOF
[Unit]
Description=Bifrost Prompt Adapter Service
After=network.target redis.service
Wants=redis.service

[Service]
Type=simple
User=$SERVICE_USER
Group=$SERVICE_GROUP
WorkingDirectory=$INSTALL_DIR/promptadapter
Environment="REDIS_URL=redis://localhost:6379"
Environment="LOG_LEVEL=INFO"
Environment="PYTHONUNBUFFERED=1"
ExecStart=/usr/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port 8090
Restart=on-failure
RestartSec=10
StandardOutput=append:$LOG_DIR/promptadapter.log
StandardError=append:$LOG_DIR/promptadapter.log

[Install]
WantedBy=multi-user.target
EOF

# Create Redis service file if needed
echo "⚙️  Creating Redis service..."
sudo tee /etc/systemd/system/bifrost-redis.service > /dev/null <<EOF
[Unit]
Description=Bifrost Redis Cache
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/redis-server --port 6379 --dir $DATA_DIR
Restart=on-failure
RestartSec=10
StandardOutput=append:$LOG_DIR/redis.log
StandardError=append:$LOG_DIR/redis.log

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd
echo "🔄 Reloading systemd..."
sudo systemctl daemon-reload

# Enable services
echo "✅ Enabling services..."
sudo systemctl enable bifrost-redis.service
sudo systemctl enable bifrost-promptadapter.service

# Start services
echo "🚀 Starting services..."
sudo systemctl start bifrost-redis.service
sleep 2
sudo systemctl start bifrost-promptadapter.service

# Check status
echo ""
echo "📊 Service Status:"
sudo systemctl status bifrost-redis.service --no-pager
echo ""
sudo systemctl status bifrost-promptadapter.service --no-pager

echo ""
echo "✨ Setup complete!"
echo ""
echo "📝 Useful commands:"
echo "  View logs:     sudo journalctl -u bifrost-promptadapter -f"
echo "  Stop service:  sudo systemctl stop bifrost-promptadapter"
echo "  Start service: sudo systemctl start bifrost-promptadapter"
echo "  Restart:       sudo systemctl restart bifrost-promptadapter"
echo ""
echo "🌐 Service available at: http://localhost:8090"

