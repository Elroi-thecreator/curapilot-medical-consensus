# DEV-002: Production VM Deployment & Reverse Proxy Architecture

---
id: "DEV-002"
type: "development"
title: "Production VM Deployment & Reverse Proxy Architecture"
domain: "development"
status: "APPROVED"
version: "1.0.0"
---

## Rule
Aegis is deployed on the production VM without disturbing any pre-existing workloads (such as Holy Bible FastAPI on port 8000 or OpenHands Gateway on port 8080/8443):

1. **Local Node Background Services**:
   - Managed via systemd service `aegis-consensus.service`.
   - Runs `node scripts/serve_vm.mjs` under the `ubuntu` system user.
   - Binds the 3 static Open Agentic Web sites to loopback-only ports:
     - `127.0.0.1:8880`: `sites/aegis-hub` (Hub & Chief Physician)
     - `127.0.0.1:8881`: `sites/genomics-node` (Rare Genomics Node)
     - `127.0.0.1:8882`: `sites/pharmasafe-node` (PharmaSafe Node)
2. **Nginx Reverse Proxy & SSL Integration**:
   - Uses `/etc/nginx/snippets/aegis.conf` included inside `/etc/nginx/sites-available/default`.
   - Routes incoming HTTPS traffic on `https://pnrs.is-a.dev` under dedicated subpaths:
     - `/aegis/` -> `http://127.0.0.1:8880/`
     - `/genomics/` -> `http://127.0.0.1:8881/`
     - `/pharmasafe/` -> `http://127.0.0.1:8882/`
   - Enforces `add_header Access-Control-Allow-Origin * always;` for worldwide agentic web compliance.
   - All other routes fall through to the pre-existing FastAPI Holy Bible service on `http://127.0.0.1:8000/`.

## Do
- Use loopback bindings (`127.0.0.1`) for local node servers.
- Ensure all static and declarative agent artifacts return `Access-Control-Allow-Origin: *`.
- Maintain systemd auto-restart (`Restart=always`, `RestartSec=5`) for persistent uptime.

## Dont
- Do NOT alter or kill existing processes (`holybible`, `openhands`, `ollama`).
- Do NOT expose unauthenticated internal HTTP ports directly to public interfaces.
- Do NOT modify root `/` location block which serves existing applications.

## Reason
Running the agent cluster via a dedicated systemd service proxied through specific Nginx location blocks guarantees 100% isolation, preventing interference with other production services while providing public SSL/HTTPS access required by the hackathon.

## Related Items
- `knowledge/index.yaml`
- `ARCH-001`: Aegis Zero-Leakage Multi-Specialist Consensus Architecture
- `DEV-001`: In-Browser Runtime, Site Actions & Otari BYOK Standards
