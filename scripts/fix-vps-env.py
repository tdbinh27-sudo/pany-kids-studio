"""Fix corrupted ANTHROPIC_API_KEY on VPS by writing fresh, sanitized value."""
import paramiko, os, sys

# Read raw .env from Vercel pull
env_file = "C:/Users/PanyBinh/Projects/pany-kids-studio/apps/web/.env.production.tmp"
data = {}
with open(env_file, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        if '=' in line:
            k, v = line.split('=', 1)
            v = v.strip().strip('"').strip("'")
            data[k] = v

raw_akey = data.get('ANTHROPIC_API_KEY', '')
print(f"Raw key from Vercel (len {len(raw_akey)}): ...{repr(raw_akey[-15:])}")

# Strip any literal '\n' suffix (2 chars: backslash + n)
akey = raw_akey
while akey.endswith('\\n'):
    akey = akey[:-2]
akey = akey.rstrip()
print(f"Cleaned key (len {len(akey)}): ...{repr(akey[-15:])}")

if not akey.startswith('sk-ant-'):
    print("ERROR: doesn't look like Anthropic key")
    sys.exit(1)

csec = data.get('CRON_SECRET', '').rstrip()
while csec.endswith('\\n'):
    csec = csec[:-2]

# Write to VPS
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('61.14.233.122', port=2018, username='root', password='qVTzg9yTuG', timeout=15)

content = f"ANTHROPIC_API_KEY={akey}\nCRON_SECRET={csec}\nNODE_ENV=production\nPORT=3000\n"
sftp = c.open_sftp()
with sftp.open('/opt/pany-kids-studio/apps/web/.env.production', 'w') as f:
    f.write(content)
sftp.chmod('/opt/pany-kids-studio/apps/web/.env.production', 0o600)
sftp.close()

def r(cmd):
    _, o, _ = c.exec_command(cmd)
    return o.read().decode()

# Verify on disk
disk = r('cat /opt/pany-kids-studio/apps/web/.env.production')
first_line = disk.split('\n')[0]
print(f"On disk first line ends: {repr(first_line[-15:])}")
print(f"Has literal backslash-n: {'YES' if chr(92) + 'n' in disk else 'NO'}")

print("Restarting PM2...")
print(r('pm2 restart pany-kids-studio --update-env 2>&1 | grep -E "online|error|status" | head -3'))
c.close()
print("Done")
