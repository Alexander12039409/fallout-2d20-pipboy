#!/bin/bash
# Ставит Pip-Boy РЯДОМ с уже работающими сервисами (VPN и т.д.).
# Не трогает порт 80, не меняет файрвол, не переустанавливает ОС.
# Запуск:  bash install.sh
set -euo pipefail

REPO="https://github.com/Alexander12039409/fallout-2d20-pipboy.git"
APP_DIR="/opt/pipboy"
NODE_HOME="/opt/pipboy-node"
NODE_VER="v20.19.0"
PORT="${PORT:-8787}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Запустите от root: sudo bash $0"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git xz-utils

if [ ! -x "$NODE_HOME/bin/node" ]; then
  echo "Ставлю Node.js $NODE_VER в $NODE_HOME (системный Node не трогаю)..."
  mkdir -p "$NODE_HOME"
  curl -fsSL "https://nodejs.org/dist/${NODE_VER}/node-${NODE_VER}-linux-x64.tar.xz" -o /tmp/node.tar.xz
  tar -xJf /tmp/node.tar.xz -C "$NODE_HOME" --strip-components=1
  rm -f /tmp/node.tar.xz
fi

if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" fetch origin
  git -C "$APP_DIR" reset --hard origin/main
else
  mkdir -p "$APP_DIR"
  git clone --depth 1 "$REPO" "$APP_DIR"
fi

mkdir -p "$APP_DIR/pipboy-sync/data/sessions"

cat >/etc/systemd/system/pipboy.service <<EOF
[Unit]
Description=Fallout 2d20 Pip-Boy
After=network.target

[Service]
Type=simple
WorkingDirectory=${APP_DIR}/pipboy-sync
ExecStart=${NODE_HOME}/bin/node server.js
Restart=always
RestartSec=3
Environment=NODE_ENV=production
Environment=PORT=${PORT}
Environment=HOST=0.0.0.0
Environment=DATA_DIR=${APP_DIR}/pipboy-sync/data/sessions

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable pipboy
systemctl restart pipboy
sleep 1
systemctl --no-pager --full status pipboy || true

IP="$(curl -fsSL --max-time 5 https://ifconfig.me || hostname -I | awk '{print $1}')"
echo
echo "  VPN не трогал. Pip-Boy слушает порт ${PORT}."
echo "  Мастер:  http://${IP}:${PORT}/master/"
echo "  В панели adminvps откройте входящий TCP ${PORT} (остальные порты VPN не меняйте)."
echo
