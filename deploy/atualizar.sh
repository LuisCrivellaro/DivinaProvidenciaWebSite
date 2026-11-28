#!/usr/bin/env bash
# Atualiza o site no servidor com a versão mais recente da branch de produção.
# Uso (no servidor, com o seu usuário administrador):  sudo bash /srv/divina-site/deploy/atualizar.sh
# Git, npm e build rodam como o usuário "divina" (dono dos arquivos); só o reinício do serviço usa root.
# O acervo de fotos (public/media) não está no git e não é tocado por este script.
# Durante o build (1 a 3 minutos) o site pode responder com erro: prefira horários de pouco acesso.
set -euo pipefail

APP_DIR="${APP_DIR:-/srv/divina-site}"
APP_USER="${APP_USER:-divina}"
BRANCH="${BRANCH:-main}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Rode com sudo: sudo bash $APP_DIR/deploy/atualizar.sh" >&2
  exit 1
fi

como_app() { sudo -u "$APP_USER" -H bash -c "cd '$APP_DIR' && $*"; }

echo "→ Buscando a versão mais recente ($BRANCH)…"
como_app "git fetch --prune origin && git checkout '$BRANCH' && git pull --ff-only origin '$BRANCH'"
echo "  Versão: $(como_app 'git log --oneline -1')"

if [ ! -d "$APP_DIR/public/media" ] || [ -z "$(ls -A "$APP_DIR/public/media" 2>/dev/null)" ]; then
  echo "⚠ public/media está vazio: envie o acervo de fotos antes (docs/DEPLOY.md, passo 3)." >&2
fi

echo "→ Instalando dependências…"
como_app "npm ci --no-audit --no-fund"

echo "→ Gerando a versão de produção…"
como_app "NEXT_TELEMETRY_DISABLED=1 npm run build"

echo "→ Reiniciando o serviço…"
systemctl restart divina-site
for _ in $(seq 1 20); do
  if curl -fsS -o /dev/null http://127.0.0.1:3000/; then
    echo "✓ Site no ar."
    exit 0
  fi
  sleep 1
done
echo "✗ O site não respondeu. Veja: sudo journalctl -u divina-site -n 80" >&2
exit 1
