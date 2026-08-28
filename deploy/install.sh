#!/bin/bash
# Ставит Pip-Boy РЯДОМ с уже работающими сервисами (VPN и т.д.).
# Не трогает порт 80, не меняет файрвол, не переустанавливает ОС.
# Запуск:  bash install.sh
set -euo pipefail

REPO="https://github.com/Alexander12039409/fallout-2d20-pipboy.git"
APP_DIR="/opt/pipboy"
NODE_HOME="/opt/pipboy-node"
CADDY_HOME="/opt/pipboy-caddy"
NODE_VER="v20.19.0"
CADDY_VER="2.9.1"
PORT="${PORT:-8787}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Запустите от root: sudo bash $0"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git xz-utils tar

IP="$(curl -fsSL --max-time 8 https://ifconfig.me || hostname -I | awk '{print $1}')"
IP="${IP:-89.125.90.225}"
HTTPS_HOST="${HTTPS_HOST:-$(echo "$IP" | tr '.' '-').sslip.io}"

if [ ! -x "$NODE_HOME/bin/node" ]; then
  echo "Ставлю Node.js $NODE_VER в $NODE_HOME (системный Node не трогаю)..."
  mkdir -p "$NODE_HOME"
  curl -fsSL "https://nodejs.org/dist/${NODE_VER}/node-${NODE_VER}-linux-x64.tar.xz" -o /tmp/node.tar.xz
  tar -xJf /tmp/node.tar.xz -C "$NODE_HOME" --strip-components=1
  rm -f /tmp/node.tar.xz
fi

if [ ! -x "$CADDY_HOME/caddy" ]; then
  echo "Ставлю Caddy $CADDY_VER в $CADDY_HOME (HTTPS для Telegram Mini App, порт 443)..."
  mkdir -p "$CADDY_HOME"
  curl -fsSL "https://github.com/caddyserver/caddy/releases/download/v${CADDY_VER}/caddy_${CADDY_VER}_linux_amd64.tar.gz" -o /tmp/caddy.tgz
  tar -xzf /tmp/caddy.tgz -C "$CADDY_HOME" caddy
  rm -f /tmp/caddy.tgz
  chmod +x "$CADDY_HOME/caddy"
fi

if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" fetch origin
  git -C "$APP_DIR" reset --hard origin/main
else
  mkdir -p "$APP_DIR"
  git clone --depth 1 "$REPO" "$APP_DIR"
fi

mkdir -p "$APP_DIR/pipboy-sync/data/sessions"
mkdir -p "$CADDY_HOME/data" "$CADDY_HOME/config"
cp -f "$APP_DIR/deploy/Caddyfile" "$CADDY_HOME/Caddyfile"

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
EnvironmentFile=-${APP_DIR}/pipboy-sync/telegram.env

[Install]
WantedBy=multi-user.target
EOF

cat >/etc/systemd/system/pipboy-https.service <<EOF
[Unit]
Description=Fallout 2d20 Pip-Boy HTTPS (Caddy)
After=network.target pipboy.service
Wants=pipboy.service

[Service]
Type=simple
WorkingDirectory=${CADDY_HOME}
ExecStart=${CADDY_HOME}/caddy run --config ${CADDY_HOME}/Caddyfile --adapter caddyfile
Restart=always
RestartSec=5
TimeoutStopSec=15
KillMode=mixed
Environment=PIPBOY_HTTPS_HOST=${HTTPS_HOST}
Environment=XDG_DATA_HOME=${CADDY_HOME}/data
Environment=XDG_CONFIG_HOME=${CADDY_HOME}/config
Environment=HOME=${CADDY_HOME}

[Install]
WantedBy=multi-user.target
EOF

cat >/etc/systemd/system/pipboy-telegram.service <<EOF
[Unit]
Description=Fallout 2d20 Pip-Boy Telegram bot
After=network.target pipboy.service

[Service]
Type=simple
WorkingDirectory=${APP_DIR}/pipboy-sync
ExecStart=${NODE_HOME}/bin/node telegram-bot.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=DATA_DIR=${APP_DIR}/pipboy-sync/data/sessions
EnvironmentFile=-${APP_DIR}/pipboy-sync/telegram.env

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable pipboy pipboy-https
systemctl restart pipboy
systemctl reset-failed pipboy-https || true
systemctl restart pipboy-https || true

WEBAPP_URL="https://${HTTPS_HOST}/play/"
ENVF="${APP_DIR}/pipboy-sync/telegram.env"
if [ -f "$ENVF" ]; then
  if grep -q '^TELEGRAM_WEBAPP_URL=' "$ENVF"; then
    sed -i "s|^TELEGRAM_WEBAPP_URL=.*|TELEGRAM_WEBAPP_URL=${WEBAPP_URL}|" "$ENVF"
  else
    printf '\nTELEGRAM_WEBAPP_URL=%s\n' "$WEBAPP_URL" >> "$ENVF"
  fi
fi

if grep -qsE '^TELEGRAM_BOT_TOKEN=.+' "$ENVF" 2>/dev/null; then
  systemctl enable pipboy-telegram
  systemctl restart pipboy-telegram
  echo "  Telegram-бот включён (Mini App: ${WEBAPP_URL})."
else
  echo "  Telegram-бот пока выключен: нет токена в ${ENVF}"
fi

sleep 2
echo "Жду сертификат Let's Encrypt (TLS-ALPN, порт 443)..."
HTTPS_OK=0
for i in 1 2 3 4 5 6 7 8 9 10 11 12; do
  if curl -fsS --max-time 8 "https://${HTTPS_HOST}/api/health" >/dev/null 2>&1; then
    HTTPS_OK=1
    break
  fi
  sleep 5
done

systemctl --no-pager --full status pipboy || true
echo
echo "  VPN и порт 80 не трогал."
echo "  HTTP:    http://${IP}:${PORT}/master/"
echo "  Игрок:   http://${IP}:${PORT}/play/"
if [ "$HTTPS_OK" = 1 ]; then
  echo "  HTTPS:   https://${HTTPS_HOST}/play/"
  echo "  Mini App использует этот HTTPS-адрес."
else
  echo "  HTTPS пока не ответил на https://${HTTPS_HOST}/play/"
  echo "  В панели adminvps откройте входящий TCP 443 (как уже открыт 8787)."
  echo "  Лог: journalctl -u pipboy-https -n 50 --no-pager"
fi
echo "  В панели adminvps входящий TCP ${PORT} (и 443 для Mini App)."
echo
