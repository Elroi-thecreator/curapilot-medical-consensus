# GitHub Copilot Instructions — CuraPilot Medical Consensus Room

## ⚡ Mandatory Knowledge Base Protocol
Before planning, suggesting, or making any changes in this repository:
1. **Pre-Change Knowledge Inspection**:
   - Inspect `knowledge/index.yaml` to discover all active architecture (`ARCH-*`), development (`DEV-*`), product (`PROD-*`), and decision (`ADR-*`) standards.
   - Ground all implementation work in the approved standards:
     - `knowledge/product/PROD-001-challenge-spec-and-rules.md`
     - `knowledge/architecture/ARCH-001-curapilot-consensus-architecture.md`
     - `knowledge/development/DEV-001-runtime-and-site-actions.md`
     - `knowledge/development/DEV-002-vm-production-deployment.md`
2. **Post-Change Knowledge Synchronization**:
   - Keep `knowledge/` and `knowledge/index.yaml` synchronized with every codebase change.

## 🛡️ Architecture & Rules
- **CuraPilot Medical Consensus Room**: Built for the Cognizant Open Agentic Web Challenge (MVP Profile 0.3).
- **Zero-Leakage Privacy**: Patient EHR and genomic data are processed 100% in-browser in client RAM/DOM. Zero bytes sent to servers.
- **BYOK Inference**: Mozilla Otari (`alibaba/qwen3.8-flash`) or visitor-provided keys. Website hosts pay $0 for inference.
- **Federated Nodes**:
  - `sites/curapilot-hub` (8080 / `/curapilot/`): Chief physician coordinator & intake vault.
  - `sites/genomics-node` (8081 / `/genomics/`): Genomics specialist.
  - `sites/pharmasafe-node` (8082 / `/pharmasafe/`): PharmaSafe pharmacology specialist.
- **Verification**: Run `npm test` after any modifications to verify conformance.
