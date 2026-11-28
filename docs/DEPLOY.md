# Deploy em servidor com disco (VPS)

> Escolha do usuário em 28/11/2026: **servidor com disco**. Vale para qualquer VPS Linux (Hostinger, Contabo, DigitalOcean, Locaweb, Hetzner…) com Ubuntu 22.04/24.04 ou Debian 12.
> **Testado:** uma instalação do zero (clone do GitHub + acervo enviado em `.tar` + `npm ci` + `npm run build` + `npm start`) passou no teste de independência — 111 páginas × desktop e celular, 0 requisições ao site antigo, 0 problemas. O que **não** foi testado aqui: os comandos de Linux (systemd, Caddy) e o Docker, por falta de um servidor Linux e de Docker na máquina de desenvolvimento.
> **Nada disto foi executado em produção.** Contratar o servidor, criar contas e mexer no DNS dependem de você.

## Arquivos de deploy no repositório
| Arquivo | Para quê |
|---|---|
| `deploy/divina-site.service` | Serviço systemd: mantém o site rodando e reinicia sozinho |
| `deploy/Caddyfile` | Caddy na frente do site: HTTPS automático, compressão, `www` → domínio |
| `deploy/Caddyfile.homologacao` | Mesmo Caddy para o subdomínio de teste, com `noindex` para o Google |
| `deploy/atualizar.sh` | Atualiza o site no servidor (git pull, npm ci, build, reinício, checagem) |
| `Dockerfile`, `docker-compose.yml`, `deploy/Caddyfile.docker`, `.dockerignore` | Alternativa em contêiner (não testada aqui) |
| `scripts/test-independencia.mjs` | Teste final contra o endereço publicado |

## Requisitos do servidor
- 2 GB de RAM (1 GB funciona com swap), 2 vCPU, **10 GB livres** (o acervo ocupa ~0,9 GB; o cache de imagens otimizadas cresce com o uso).
- Ubuntu/Debian com acesso SSH e um usuário com `sudo`.
- Node.js 20 ou mais novo, git e Caddy.

## Passo a passo

### 1. Preparar o servidor (uma vez)
```bash
sudo apt update && sudo apt install -y git curl
```
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs
```
```bash
sudo apt install -y caddy
```
```bash
sudo useradd --system --create-home --shell /bin/bash divina && sudo mkdir -p /srv/divina-site && sudo chown divina:divina /srv/divina-site
```
Se o pacote `caddy` não existir na sua versão, siga https://caddyserver.com/docs/install.

### 2. Baixar o site
O deploy usa a branch `main` (os PRs #1 e #2 já foram mesclados nela).
```bash
sudo -u divina git clone --branch main https://github.com/LuisCrivellaro/DivinaProvidenciaWebSite.git /srv/divina-site
```
Se o repositório for privado, crie no GitHub um *deploy key* (somente leitura) para o servidor.

### 3. Enviar o acervo de fotos (do seu computador)
O acervo (`public/media`, ~0,9 GB, 7.107 fotos) não está no git. No **PowerShell do seu computador**, na pasta do projeto:
```powershell
tar -cf acervo-midia.tar -C public media
```
```powershell
scp acervo-midia.tar USUARIO@IP-DO-SERVIDOR:/tmp/
```
No servidor:
```bash
sudo -u divina tar -xf /tmp/acervo-midia.tar -C /srv/divina-site/public && rm /tmp/acervo-midia.tar
```
```bash
find /srv/divina-site/public/media -type f | wc -l
```
Deve mostrar cerca de 7.100 arquivos. Se o seu computador já não tiver o acervo e o WordPress antigo ainda estiver no ar, gere-o direto no servidor com `sudo -u divina node scripts/migrate-media.mjs` (dentro de `/srv/divina-site`).

### 4. Instalar, gerar e ligar
```bash
cd /srv/divina-site && sudo -u divina npm ci --no-audit --no-fund && sudo -u divina npm run build
```
```bash
sudo cp deploy/divina-site.service /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable --now divina-site
```
```bash
curl -I http://127.0.0.1:3000/
```
Deve responder `HTTP/1.1 200 OK`.

### 5. HTTPS e domínio (primeiro em homologação)
1. Crie no DNS um registro de teste, por exemplo `novo.adivinaprovidencia.com.br` → `A` com o IP do servidor. Só esse registro: os do domínio principal e dos e-mails continuam como estão.
2. Use o Caddyfile de homologação (já vem com `novo.adivinaprovidencia.com.br`; se escolher outro nome, troque no arquivo). Ele manda o cabeçalho `X-Robots-Tag: noindex` para o Google não indexar a cópia de teste:
```bash
sudo cp /srv/divina-site/deploy/Caddyfile.homologacao /etc/caddy/Caddyfile && sudo systemctl reload caddy
```
3. Abra `https://novo.adivinaprovidencia.com.br`. O certificado é emitido sozinho em alguns segundos (portas 80 e 443 precisam estar liberadas: `sudo ufw allow 80,443/tcp`).
4. Rode o teste final do seu computador (precisa do Chromium do Playwright):
```powershell
node scripts/test-independencia.mjs https://novo.adivinaprovidencia.com.br
```

### 6. Virar o domínio (com autorização)
Siga `docs/MIGRACAO_DOMINIO.md` §5: backup do WordPress e dos pedidos, TTL baixo, troca **somente** dos registros `A`/`AAAA` (ou `CNAME`) de `adivinaprovidencia.com.br` e `www` para o IP do servidor, **sem mexer em `MX`, `SPF`, `DKIM` e `DMARC`** (e-mails `secretaria@` e `cterapeutica@`). Depois troque para o Caddyfile definitivo (sem o bloqueio do Google) e recarregue:
```bash
sudo cp /srv/divina-site/deploy/Caddyfile /etc/caddy/Caddyfile && sudo systemctl reload caddy
```
Os redirecionamentos 301 das URLs antigas já estão no código.

## Atualizações futuras
Depois de cada mudança aprovada e mesclada na `main`, com o seu usuário administrador:
```bash
sudo bash /srv/divina-site/deploy/atualizar.sh
```
O script busca a versão nova, instala e gera como o usuário `divina`, reinicia o serviço e confere se o site respondeu. Durante o build (1 a 3 minutos) o site pode dar erro: rode fora dos horários de mais acesso. Fotos novas: coloque os arquivos `.webp` em `public/media/AAAA/MM/` no servidor (ou rode `migrate-media` enquanto o WordPress existir).

## Backup
- **Acervo:** guarde `acervo-midia.tar` (ou a pasta `public/media`) fora do servidor, no Google Drive da comunidade ou num HD externo. É a única cópia das fotos depois que o WordPress for desligado.
- **Código:** está no GitHub.
- O site não tem banco de dados nem dados de usuários para guardar.

## Diagnóstico rápido
| Sintoma | Verifique |
|---|---|
| Site fora do ar | `sudo systemctl status divina-site` e `sudo journalctl -u divina-site -n 80` |
| Fotos não aparecem | `ls /srv/divina-site/public/media` (acervo enviado?) e permissões do usuário `divina` |
| Certificado não sai | DNS já aponta para o servidor? Portas 80 e 443 liberadas no firewall (`sudo ufw allow 80,443/tcp`) |
| Memória alta | `MALLOC_ARENA_MAX=2` já está no serviço; considere 2 GB de RAM ou swap |

## Alternativa em Docker (não testada aqui)
Com Docker e Docker Compose no servidor, depois dos passos 2 e 3:
```bash
cd /srv/divina-site && docker compose up -d --build
```
O acervo entra como volume (`./public/media`) e o Caddy do compose cuida do HTTPS (`deploy/Caddyfile.docker`).
