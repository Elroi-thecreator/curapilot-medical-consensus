# Gemini & Antigravity Agent Guidelines — Aegis Medical Consensus Room

## ⚡ Mandatory Knowledge Base Protocol

**MANDATORY STEP 1: Pre-Change Knowledge Inspection**
- Before modifying or planning any changes in this workspace, open and read `knowledge/index.yaml`.
- Identify the relevant standards (`ARCH-*`, `DEV-*`, `PROD-*`, `ADR-*`).
- Ground all changes strictly in these approved specifications:
  - `knowledge/product/PROD-001-challenge-spec-and-rules.md` (Challenge specs)
  - `knowledge/architecture/ARCH-001-aegis-consensus-architecture.md` (Multi-agent architecture & zero-leakage invariant)
  - `knowledge/development/DEV-001-runtime-and-site-actions.md` (In-browser runtime & Otari BYOK)
  - `knowledge/development/DEV-002-dependencies-and-prerequisites.md` (Dependencies & submission checklist)
  - `knowledge/development/DEV-003-agent-instruction-and-knowledge-protocol.md` (Agent guidance protocol)

**MANDATORY STEP 2: Post-Change Knowledge Synchronization**
- When modifying code or configuration, immediately update the relevant knowledge units in `knowledge/`.
- If introducing a new pattern or rule, author a new knowledge unit following the required schema (`id`, `type`, `title`, `domain`, `status`, `version`, `rule`, `do`, `dont`, `reason`, `related_items`).
- Increment `knowledge_units_count`, update `last_updated`, and add the entry in `knowledge/index.yaml`.

---

## 🧭 Project Architecture & Sites
This repository implements the **Aegis Zero-Leakage Medical Consensus Room** adhering to the **Cognizant Open Agentic Web Challenge (MVP Profile 0.3)**:
- **`sites/aegis-hub` (Port 8080)**: Patient intake vault, Chief Physician Coordinator agent (`aegis_coordinator.network.json`), peer link resolution (`links.json`).
- **`sites/genomics-node` (Port 8081)**: Rare Genomics Specialist (`genomics_node.network.json`, PDHA1, DPYD variant analysis).
- **`sites/pharmasafe-node` (Port 8082)**: PharmaSafe Laboratory (`pharmasafe_node.network.json`, drug interaction & CYP450 contraindication detection).

---

## 🔒 Security & Privacy Invariants
1. **Zero-Leakage Privacy**: All patient data is strictly processed client-side in browser memory. Zero bytes transmitted to backend servers.
2. **BYOK Inference**: Mozilla Otari (`alibaba/qwen3.8-flash`) or visitor-provided keys. Website hosts pay \$0 for inference.
3. **User Consent**: Cross-site agent invocations must require interactive user confirmation (`onConsent`).
4. **CORS & Declarative JSON**: Declarative Neuro SAN networks served statically with CORS enabled (`*`).

---

## 🛠️ Verification & Run Commands
```bash
npm test            # Run 54-point Open Agentic Web conformance test
npm start           # Boot all 3 nodes (8080, 8081, 8082) concurrently
npm run serve:hub   # Boot Aegis Hub (8080)
npm run serve:genomics # Boot Genomics Node (8081)
npm run serve:pharma   # Boot PharmaSafe Node (8082)
```
