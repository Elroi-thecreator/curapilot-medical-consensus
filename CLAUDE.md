# Claude Code Guidelines — Aegis Medical Consensus Room

## ⚡ Mandatory Knowledge Base Protocol

**CRITICAL RULE FOR ALL TASKS:**
1. **Pre-Change Knowledge Inspection (Step 1)**:
   - Before designing, planning, or editing any file, inspect `knowledge/index.yaml`.
   - Read the relevant architecture (`ARCH-*`), development (`DEV-*`), product (`PROD-*`), and decision (`ADR-*`) standards that apply to your task.
   - Ground all architectural and implementation decisions in these approved standards.
2. **Post-Change Knowledge Synchronization (Step 2)**:
   - When modifying code or configuration, immediately update the corresponding units in `knowledge/`.
   - When introducing new patterns or decisions, create a new document in `knowledge/<domain>/` following the required schema (`id`, `type`, `title`, `domain`, `status`, `version`, `rule`, `do`, `dont`, `reason`, `related_items`).
   - Update `knowledge/index.yaml` (`knowledge_units_count`, `last_updated`, and add the entry).

---

## 🧭 Knowledge Base Directory Reference
- `knowledge/index.yaml`: Master registry of all knowledge units.
- `knowledge/product/PROD-001-challenge-spec-and-rules.md`: Open Agentic Web specification & submission requirements.
- `knowledge/architecture/ARCH-001-aegis-consensus-architecture.md`: Decentralized clinical consensus architecture & zero-leakage privacy invariant.
- `knowledge/development/DEV-001-runtime-and-site-actions.md`: In-browser runtime, action tools (`website_*`), and BYOK Otari inference standards.
- `knowledge/development/DEV-002-dependencies-and-prerequisites.md`: Prerequisites, dependencies, and submission lifecycle.
- `knowledge/development/DEV-003-agent-instruction-and-knowledge-protocol.md`: AI agent workspace discovery and configuration protocol.

---

## 🛠️ Build, Test & Development Commands
- **Run Conformance Tests**: `npm test` (Runs `node tests/conformance_test.mjs`, must pass 54/54 tests)
- **Start All Federated Sites**: `npm start` (Runs `node scripts/serve_all.mjs`, serving ports 8080, 8081, 8082)
- **Serve Individual Sites**:
  - `npm run serve:hub`: Starts Aegis Hub on `http://localhost:8080/`
  - `npm run serve:genomics`: Starts Genomics Node on `http://localhost:8081/`
  - `npm run serve:pharma`: Starts PharmaSafe Node on `http://localhost:8082/`

---

## 🛡️ Core Architecture & Boundaries
- **Open Agentic Web MVP Profile 0.3**:
  - Client-side execution in the browser via `nsdeploy` runtime.
  - BYOK (Bring Your Own Key) inference via Mozilla Otari (`alibaba/qwen3.8-flash`) or local models. Hosts pay \$0.
  - Public JSON artifacts: `agent-manifest.json`, `*.network.json`, `links.json`, `bridge/action-bridge.html`.
- **Zero-Leakage Invariant**:
  - Raw patient records, EHR notes, and genomic sequences are stored purely in client-side RAM / DOM.
  - Zero bytes of patient data are sent to host servers.
  - Never introduce backend server-side agent execution runtimes or cloud databases for patient records.
- **Peer Linking & Consent**:
  - Interactive consent cards (`onConsent`) must guard third-party agent graph loading.
  - CORS headers (`Access-Control-Allow-Origin: *`) must be enabled on all published JSON files.
