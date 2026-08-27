#!/bin/bash
# Установка Pip-Boy на VPS (Debian/Ubuntu). Запускать под root:
#   bash install.sh
set -euo pipefail

REPO="https://github.com/Alexander12039409/fallout-2d20-pipboy.git"
APP_DIR="/opt/pipboy"
NODE_VER="v20.19.0"

if [ "$(id -u)" -ne 0 ]; then
  echo "Запустите от root: sudo bash $0"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git xz-utils

if ! command -v node >/dev/null 2>&1 || ! node -v | grep -q '^v20'; then
  echo "Ставлю Node.js $NODE_VER..."
  curl -fsSL "https://nodejs.org/dist/${NODE_VER}/node-${NODE_VER}-linux-x64.tar.xz" -o /tmp/node.tar.xz
  tar -xJf /tmp/node.tar.xz -C /usr/local --strip-components=1
  rm -f /tmp/node.tar.xz
fi

if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" fetch origin
  git -C "$APP_DIR" reset --hard origin/main
else
  rm -rf "$APP_DIR"
  git clone --depth 1 "$REPO" "$APP_DIR"
fi

mkdir -p "$APP_DIR/pipboy-sync/data/sessions"

PORT=80
if command -v ss >/dev/null 2>&1 && ss -tln | grep -q ':80 '; then
  PORT=8787
fi

cat >/etc/systemd/system/pipboy.service <<EOF
[Unit]
Description=Fallout 2d20 Pip-Boy
After=network.target

[Service]
Type=simple
WorkingDirectory=${APP_DIR}/pipboy-sync
ExecStart=/usr/local/bin/node server.js
Restart=always
RestartSec=3
Environment=NODE_ENV=production
Environment=PORT=${PORT}
Environment=HOST=0.0.0.0
Environment=DATA_DIR=${APP_DIR}/pipboy-sync/data/sessions

[Install]
WantedBy=multi-user.target
EOF

# Если node оказался в /usr/bin
if [ ! -x /usr/local/bin/node ] && [ -x /usr/bin/node ]; then
  sed -i 's|/usr/local/bin/node|/usr/bin/node|' /etc/systemd/system/pipboy.service
fi

systemctl daemon-reload
systemctl enable pipboy
systemctl restart pipboy
sleep 1
systemctl --no-pager --full status pipboy || true

if command -v ufw >/dev/null 2>&1; then
  ufw allow "${PORT}/tcp" || true
fi

IP="$(curl -fsSL --max-time 5 https://ifconfig.me || hostname -I | awk '{print $1}')"
echo
echo "  Pip-Boy установлен"
echo "  Мастер:  http://${IP}:${PORT}/master/"
if [ "$PORT" = "80" ]; then
  echo "  (порт 80: можно без :80 — http://${IP}/master/ )"
fi
echo "  Если страница не открывается — в панели adminvps откройте TCP ${PORT} в файрволе."
echo
