# GitHub Copilot Instructions — TripSteward Federated Travel Concierge

You are assisting in the development and maintenance of **TripSteward: Autonomous Federated Travel, Hotel & City Mobility Concierge** for the Cognizant Open Agentic Web Challenge.

## Mandatory Knowledge Base Protocol
1. **Pre-Change Knowledge Inspection**:
   - Always inspect `knowledge/index.yaml` before planning or modifying code.
   - Reference `knowledge/product/PROD-001-challenge-spec-and-rules.md`, `knowledge/architecture/ARCH-002-tripsteward-federated-architecture.md`, `knowledge/development/DEV-001-runtime-and-site-actions.md`, `knowledge/development/DEV-002-vm-production-deployment.md`, and `knowledge/development/DEV-003-agent-authoring-and-onboarding-guide.md`.
2. **Post-Change Knowledge Synchronization**:
   - Update `knowledge/` and `knowledge/index.yaml` after modifications.

## Rules & Invariants
- **Action-Driven Personal Agents**: Agents call real-world machine tools (`website_*`) across sites to execute bookings, eliminate aggregator markups, and synchronize flight buffers.
- **100% In-Browser Execution**: All traveler records and booking vouchers are processed client-side. Zero bytes to backend servers.
- **BYOK Inference**: Mozilla Otari (`alibaba/qwen3.8-flash`) or visitor keys. $0 host inference cost.
- **Verification**: Always run `npm test` and ensure all 69 checks pass.
