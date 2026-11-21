# ARCH-001: CuraPilot Zero-Leakage Multi-Specialist Consensus Architecture

---
id: "ARCH-001"
type: "architecture"
title: "CuraPilot Zero-Leakage Multi-Specialist Consensus Architecture"
domain: "architecture"
status: "APPROVED"
version: "1.1.0"
---

## Rule
CuraPilot implements a decentralized multi-agent clinical consultation architecture adhering strictly to the Open Agentic Web MVP Profile 0.3 specification:

1. **Top-Level Hub (`curapilot-hub`)**:
   - Operates as the patient/clinician sovereign entry point.
   - Contains the client-side EHR / genomic / medication intake vault.
   - Hosts the `curapilot_coordinator` (Chief Physician Agent) which coordinates internal evaluation and external peer consensus.
   - Resolves peer specialist networks via `links.json` and obtains explicit user approval via interactive consent cards before peer composition.
2. **Genomics Specialist Node (`genomics-node`)**:
   - Standalone static agentic website publishing `agent-manifest.json` and `genomics_node.network.json`.
   - Specializes in genetic variants, phenotype mapping, and inborn metabolic disease etiology.
   - Exposes CORS headers allowing any caller origin to load its declarative agent definition.
3. **PharmaSafe Specialist Node (`pharmasafe-node`)**:
   - Standalone static agentic website publishing `agent-manifest.json` and `pharmasafe_node.network.json`.
   - Specializes in drug-drug interactions, CYP450 metabolic pathway inhibition, and toxicity prevention.
   - Exposes CORS headers allowing any caller origin to load its declarative agent definition.
4. **Zero-Leakage Privacy Invariant**:
   - Raw patient health data, EHR notes, and genomic sequences remain strictly within browser memory (RAM / client DOM).
   - Only non-identifiable, schema-validated clinical parameters necessary for consultation are shared with peer agents during in-browser cross-examination.
   - Host static web servers receive 0 bytes of patient data.

## Do
- Use client-side JavaScript execution via the official `nsdeploy` browser runtime.
- Maintain pure declarative separation: agent graphs in `*.network.json`, site capabilities in `site-actions.js`, manifest in `agent-manifest.json`.
- Enforce schema validation on all `website_*` action tools.
- Provide BYOK inference via Mozilla Otari with default model `alibaba/qwen3.8-flash`.

## Dont
- Do NOT upload patient medical records to any backend server.
- Do NOT embed API keys into client code or published network definitions.
- Do NOT allow cross-site agent calls without explicit user consent prompt.

## Reason
Centralized cloud healthcare AI violates medical privacy, HIPAA, and data protection laws, while placing massive inference bills on hospital servers. CuraPilot inverts this paradigm by executing the entire multi-specialist consultation in the visitor's browser for $0 host cost.

## Related Items
- `knowledge/index.yaml`
- `PROD-001`: Open Agentic Web Challenge Specification & Submission Protocol
- `DEV-001`: In-Browser Runtime, Site Actions & Otari BYOK Standards
- `DEV-002`: Production VM Deployment & Reverse Proxy Architecture
