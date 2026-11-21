# AI Agent Operating Guidelines & Knowledge Base Protocol

Welcome to the **Aegis: Zero-Leakage Medical Consensus Room** repository.
All autonomous AI coding agents (Antigravity, Claude, Cursor, Gemini, Copilot, Codex, etc.) working in this repository must strictly follow this protocol.

---

## ⚡ MANDATORY STEP 1: Pre-Change Knowledge Inspection

**Before designing, planning, or modifying any code, configuration, or documentation in this repository:**

1. **Check the `knowledge/` folder** in the project root.
2. **Open and read `knowledge/index.yaml`** to identify the active architecture (`ARCH-*`), development (`DEV-*`), product (`PROD-*`), and decision (`ADR-*`) standards that apply to your task.
3. **Inspect the relevant standards**:
   - `knowledge/product/PROD-001-challenge-spec-and-rules.md`: Open Agentic Web specification & hackathon submission protocol.
   - `knowledge/architecture/ARCH-001-aegis-consensus-architecture.md`: Aegis decentralized multi-specialist clinical consensus architecture & zero-leakage invariant.
   - `knowledge/development/DEV-001-runtime-and-site-actions.md`: In-browser runtime conventions, site-actions (`website_*`), and Otari BYOK inference standards.
   - `knowledge/development/DEV-002-dependencies-and-prerequisites.md`: Hackathon dependencies, toolchain requirements, and submission lifecycle.
   - `knowledge/development/DEV-003-agent-instruction-and-knowledge-protocol.md`: AI agent workspace configuration and knowledge discovery standards.
4. **Ground all architectural and implementation decisions in these approved standards.** Never invent conflicting conventions or bypass existing specifications.

---

## 🔄 MANDATORY STEP 2: Post-Change Knowledge Synchronization

**Whenever you make modifications to code, schemas, routes, or behaviors:**

1. **Update the relevant knowledge units** in `knowledge/` to reflect changes (e.g. new action tools, updated parameters, schema adjustments).
2. **If introducing a new pattern or standard**, create a new markdown file in `knowledge/<domain>/` adhering to the required schema:
   - Frontmatter: `id`, `type`, `title`, `domain`, `status`, `version`
   - Sections: `## Rule`, `## Do`, `## Dont`, `## Reason`, `## Related Items`
3. **Update `knowledge/index.yaml`**:
   - Increment `knowledge_units_count`
   - Update `last_updated` date (YYYY-MM-DD)
   - Add the new unit under its appropriate domain (`product`, `architecture`, `development`, or `decision`).
4. **Verify knowledge base integrity**: Ensure the knowledge base always reflects the true, latest state of the codebase.

---

## 🧭 Repository Structure & Map

```
devpost-Cognizant/
├── AGENTS.md                  # Universal AI agent instructions (this file)
├── CLAUDE.md                  # Claude Code agent instructions
├── GEMINI.md                  # Gemini CLI & Antigravity agent instructions
├── .cursorrules               # Cursor IDE agent instructions
├── .github/
│   └── copilot-instructions.md# GitHub Copilot workspace instructions
├── knowledge/                 # ⭐️ Central knowledge base (Single Source of Truth)
│   ├── index.yaml             # Master index of all approved knowledge units
│   ├── product/               # Product standards & specifications (PROD-*)
│   ├── architecture/          # System design & privacy invariants (ARCH-*)
│   └── development/           # Runtime, site-actions, and setup (DEV-*)
├── sites/                     # 3 federated static agentic web nodes
│   ├── aegis-hub/             # Port 8080: Patient intake vault & Chief Physician Coordinator
│   ├── genomics-node/         # Port 8081: Rare Genomics Specialist Node
│   └── pharmasafe-node/       # Port 8082: PharmaSafe Drug Interaction Node
├── scripts/                   # Server runners and build utilities
│   ├── serve_all.mjs          # Concurrently boots all 3 nodes (8080, 8081, 8082)
│   ├── serve_site.mjs         # Static HTTP server with CORS enabled
│   └── build_network.mjs      # Neuro SAN HOCON/JSON resolution tool
├── tests/                     # Automated conformance test suite
│   └── conformance_test.mjs   # 54-point Open Agentic Web specification validator
├── assets/                    # Project thumbnails and diagrams
├── package.json               # Project manifest and scripts
└── README.md                  # Architectural overview & quickstart documentation
```

---

## 🛡️ Core Architectural Invariants

1. **100% In-Browser Execution (Zero-Leakage Privacy)**:
   - Confidential Electronic Health Records (EHR) and genomic variants reside **strictly in browser memory (RAM / client DOM)**.
   - Static hosting web servers receive **0 bytes** of patient health data.
   - Never implement backend server-side agent execution runtimes or server logging of patient records.
2. **Bring Your Own Key (BYOK) Inference**:
   - Powered by **Mozilla Otari** (`https://api.otari.ai/api/v1`) using default model `alibaba/qwen3.8-flash`, or OpenRouter/local models.
   - Website hosts pay **\$0 for inference**.
   - API keys are stored solely in client browser `localStorage` by the browser runtime; never hardcode or transmit keys.
3. **Decentralized Multi-Agent Federation**:
   - `aegis-hub` resolves peer specialist networks dynamically via `links.json`.
   - The user must be prompted with an interactive consent card (`onConsent`) prior to fetching and running any third-party agent graph.
   - All declarative agent networks (`*.network.json`) and manifests (`agent-manifest.json`) must be served with CORS headers (`Access-Control-Allow-Origin: *`).

---

## 🛠️ Essential Commands & Workflows

### Run Conformance Test Suite (Always run after any change)
```bash
npm test
```
*Validates JSON schemas, Neuro SAN graphs, agent manifests, peer link resolution, and site actions across all 3 nodes.*

### Start Local Federated Network (Boots ports 8080, 8081, 8082)
```bash
npm start
```

### Start Individual Nodes
```bash
npm run serve:hub       # Aegis Hub on http://localhost:8080
npm run serve:genomics  # Genomics Node on http://localhost:8081
npm run serve:pharma    # PharmaSafe Node on http://localhost:8082
```

---

## 📋 Coding & Modification Rules

- **Declarative Separation**: Keep agent graphs purely declarative in `*.network.json`. Ground tools strictly in `site-actions.js` under `website_*` namespaces.
- **Action Tool Schema Validation**: All tools in `site-actions.js` must specify JSON Schema parameters (`type`, `properties`, `required`).
- **Confirmation Modals**: Any action tool that modifies state or performs sensitive operations must hook into `onActionConfirm` for user approval.
- **No Server Dependencies in Frontend**: Never import server-only Node modules (`fs`, `child_process`, etc.) into client-side scripts under `sites/`.
- **Always Verify**: Run `npm test` and ensure all 54 checks pass without errors.
