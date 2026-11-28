#!/usr/bin/env bash
# Atualiza o site no servidor com a versão mais recente da branch de produção.
# Uso (no servidor, como o usuário "divina"):  bash /srv/divina-site/deploy/atualizar.sh
# O acervo de fotos (public/media) não está no git e não é tocado por este script.
set -euo pipefail

APP_DIR="${APP_DIR:-/srv/divina-site}"
BRANCH="${BRANCH:-main}"
cd "$APP_DIR"

echo "→ Buscando a versão mais recente ($BRANCH)…"
git fetch --prune origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

if [ ! -d public/media ] || [ -z "$(ls -A public/media 2>/dev/null)" ]; then
  echo "⚠ public/media está vazio: envie o acervo de fotos antes (docs/DEPLOY.md, passo 4)." >&2
fi

echo "→ Instalando dependências…"
npm ci --no-audit --no-fund

echo "→ Gerando a versão de produção…"
npm run build

echo "→ Reiniciando o serviço…"
sudo systemctl restart divina-site
sleep 3
if curl -fsS -o /dev/null http://127.0.0.1:3000/; then
  echo "✓ Site no ar."
else
  echo "✗ O site não respondeu. Veja: sudo journalctl -u divina-site -n 80" >&2
  exit 1
fi
