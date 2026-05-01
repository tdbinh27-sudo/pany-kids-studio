"""
Deploy Pany Kids Studio to VPS via SSH (paramiko).
VPS: 61.14.233.122:2018, Ubuntu 22.04, root.

Usage: python deploy-vps.py [--anthropic-key=XXX]
"""
import sys, os, time, paramiko, getpass, argparse, re

VPS_HOST = "61.14.233.122"
VPS_PORT = 2018
VPS_USER = "root"
VPS_PASS = "qVTzg9yTuG"

REPO_URL = "https://github.com/tdbinh27-sudo/pany-kids-studio.git"
APP_DIR = "/opt/pany-kids-studio"
APP_PORT = 3000

def run(client, cmd, label=None, timeout=600, allow_fail=False, hide=False):
    if label:
        print(f"\n━━━ {label} ━━━")
    if not hide:
        # don't print full cmd if it contains secret
        safe = re.sub(r"sk-ant-[A-Za-z0-9_-]+", "sk-ant-***", cmd)
        print(f"$ {safe[:200]}{'...' if len(safe) > 200 else ''}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = ""
    for line in iter(stdout.readline, ""):
        if not line:
            break
        if not hide:
            sys.stdout.write(line)
            sys.stdout.flush()
        out += line
    code = stdout.channel.recv_exit_status()
    if code != 0 and not allow_fail:
        err = stderr.read().decode(errors="replace")
        print(f"❌ Exit code: {code}")
        if err:
            print(err)
        raise SystemExit(1)
    return out, code

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--anthropic-key", default=os.environ.get("ANTHROPIC_API_KEY", ""))
    parser.add_argument("--cron-secret", default=os.environ.get("CRON_SECRET", ""))
    parser.add_argument("--skip-system", action="store_true", help="Skip apt install if already done")
    args = parser.parse_args()

    if not args.anthropic_key:
        print("ERROR: ANTHROPIC_API_KEY not provided (use --anthropic-key=XXX or env var)")
        sys.exit(1)

    print(f"Connecting to {VPS_HOST}:{VPS_PORT} as {VPS_USER}...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(VPS_HOST, port=VPS_PORT, username=VPS_USER, password=VPS_PASS, timeout=30)
    print("✓ Connected\n")

    if not args.skip_system:
        # Disable interactive prompts globally for needrestart + apt
        run(client,
            "echo 'APT::Get::Assume-Yes \"true\";' > /etc/apt/apt.conf.d/90forceyes && "
            "mkdir -p /etc/needrestart/conf.d && "
            "echo \"\\$nrconf{restart} = 'a';\" > /etc/needrestart/conf.d/90-noninteractive.conf && "
            "echo \"\\$nrconf{kernelhints} = 0;\" >> /etc/needrestart/conf.d/90-noninteractive.conf",
            "Disable interactive prompts")
        run(client, "DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a apt-get -o Dpkg::Options::=--force-confold update -qq && DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a apt-get -o Dpkg::Options::=--force-confold install -y curl git build-essential ca-certificates", "Install base packages")

        # Node 22 via NodeSource
        run(client,
            "curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a apt-get -o Dpkg::Options::=--force-confold install -y nodejs",
            "Install Node 22")

        run(client, "node --version && npm --version", "Verify Node")

        # pnpm via corepack
        run(client, "corepack enable && corepack prepare pnpm@latest --activate && pnpm --version", "Install pnpm")

        # PM2
        run(client, "npm install -g pm2 && pm2 --version", "Install PM2")

        # Caddy
        run(client,
            "DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a apt-get -o Dpkg::Options::=--force-confold install -y debian-keyring debian-archive-keyring apt-transport-https && "
            "curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | tee /etc/apt/trusted.gpg.d/caddy-stable.asc && "
            "curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list && "
            "DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a apt-get -o Dpkg::Options::=--force-confold update -qq && DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a apt-get -o Dpkg::Options::=--force-confold install -y caddy",
            "Install Caddy")

    # Clone or pull
    run(client,
        f"if [ -d {APP_DIR}/.git ]; then "
        f"  cd {APP_DIR} && git fetch origin main && git reset --hard origin/main; "
        f"else "
        f"  rm -rf {APP_DIR} && git clone {REPO_URL} {APP_DIR}; "
        f"fi",
        "Clone/pull repo")

    # Install deps + build
    run(client, f"cd {APP_DIR}/apps/web && pnpm install --frozen-lockfile", "Install dependencies", timeout=900)

    # Write .env.production
    env_content = (
        f"ANTHROPIC_API_KEY={args.anthropic_key}\n"
        f"CRON_SECRET={args.cron_secret}\n"
        f"NODE_ENV=production\n"
        f"PORT={APP_PORT}\n"
    )
    write_env_cmd = f"cat > {APP_DIR}/apps/web/.env.production << 'PANYEOF'\n{env_content}PANYEOF\n"
    run(client, write_env_cmd, "Write .env.production", hide=True)
    run(client, f"chmod 600 {APP_DIR}/apps/web/.env.production && ls -la {APP_DIR}/apps/web/.env.production", "Lock .env perms")

    # Build
    run(client, f"cd {APP_DIR}/apps/web && pnpm build", "Build production", timeout=900)

    # PM2 ecosystem
    pm2_config = f"""module.exports = {{
  apps: [{{
    name: 'pany-kids-studio',
    cwd: '{APP_DIR}/apps/web',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p {APP_PORT}',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {{ NODE_ENV: 'production', PORT: '{APP_PORT}' }},
    error_file: '/var/log/pany-kids-error.log',
    out_file: '/var/log/pany-kids-out.log',
  }}]
}};
"""
    run(client, f"cat > {APP_DIR}/ecosystem.config.cjs << 'PANYPM2'\n{pm2_config}PANYPM2\n", "Write PM2 config")

    # Start or restart
    run(client,
        f"pm2 delete pany-kids-studio 2>/dev/null; pm2 start {APP_DIR}/ecosystem.config.cjs && pm2 save && pm2 startup systemd -u root --hp /root | tail -1 | bash || true",
        "Start app via PM2")

    # Caddyfile — reverse proxy port 80 → 3000
    caddyfile = f""":80 {{
    reverse_proxy 127.0.0.1:{APP_PORT}
    encode gzip
    header {{
        # Basic security headers
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        Referrer-Policy "strict-origin-when-cross-origin"
        # No HSTS until SSL
    }}
}}
"""
    run(client, f"cat > /etc/caddy/Caddyfile << 'PANYCADDY'\n{caddyfile}PANYCADDY\n", "Write Caddyfile")
    run(client, "systemctl restart caddy && systemctl enable caddy && sleep 1 && systemctl is-active caddy", "Restart Caddy")

    # Open firewall (ufw if installed)
    run(client, "ufw allow 80/tcp 2>/dev/null; ufw allow 443/tcp 2>/dev/null; true", "Open ports", allow_fail=True)

    # Verify
    print("\n━━━ Verification ━━━")
    run(client, "sleep 2 && curl -sI http://localhost:3000 | head -1 && curl -sI http://localhost:80 | head -1", "Health check")
    run(client, "pm2 list", "PM2 status")

    print(f"\n🎉 DEPLOY COMPLETE")
    print(f"   Internal: http://127.0.0.1:{APP_PORT}")
    print(f"   Public:   http://{VPS_HOST}/")
    print(f"   PM2:      pm2 logs pany-kids-studio")

    client.close()

if __name__ == "__main__":
    main()
