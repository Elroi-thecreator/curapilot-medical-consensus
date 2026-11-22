---
id: "DEV-003"
type: "development"
title: "Agent Authoring, Dynamic Discovery & Onboarding Standards"
domain: "development"
status: "APPROVED"
version: "1.0.0"
---

## Rule
All agent nodes and dynamically mounted services in the Open Agentic Web ecosystem must conform to the following onboarding and authoring standards:

1. **Dual-Interface Artifact Requirements**:
   Every agentic web node must publish the standard MVP Profile 0.3 endpoints alongside its human HTML UI:
   - `agent-manifest.json`: Root machine discovery manifest declaring node metadata, networks, front_man identifier, llm_router configuration, and registered `agentTools`.
   - `<network_name>.network.json`: Declarative Neuro SAN agent graph defining agent nodes, tool bindings, parameter input schemas, and grounded instructions.
   - `site-actions.js`: Grounded executable JavaScript actions under the `website_*` namespace.
   - `bridge/action-bridge.html`: Standard postMessage action bridge for sandboxed iframe execution.
   - `links.json`: Peer network resolution mapping symbolic network identifiers to concrete remote URLs.

2. **Action Tool Invariants (`website_*`)**:
   - Every tool declared in `actions.agentTools` must have a corresponding factory method in `site-actions.js`.
   - All tool arguments must specify strict JSON Schema schemas (`type: "object"`, `properties`, `required`, `additionalProperties: false`).
   - Read-only actions must declare `effect: "read"`.
   - State-modifying or irreversible actions must declare `effect: "irreversible"` and hook into `onActionConfirm` to require explicit visitor confirmation before execution.

3. **Dynamic On-The-Fly Swarm Mounting**:
   - The Orchestrator (`tripsteward-hub`) supports dynamic registration via `website_register_agent_node` and directory discovery via `website_discover_agent_nodes`.
   - Newly mounted nodes are assigned an active swarm chip with live status tracking (`●`), and can be unlinked at any time.
   - Cross-origin agent network fetches must be served with CORS enabled (`Access-Control-Allow-Origin: *`).

4. **Zero-Leakage Privacy & BYOK Inference**:
   - Personal traveler data, booking tokens, and preferences must remain strictly in the client's browser memory (RAM / local DOM).
   - Remote agent nodes must not harvest customer data or persist uncommitted personal profiles on external server databases.
   - Inference is funded client-side via Mozilla Otari BYOK (`alibaba/qwen3.8-flash`) or visitor-provided API keys ($0 inference cost to website hosts).

## Do
- Follow the declarative naming convention: prefix machine actions with `website_` (e.g. `website_reserve_dining_table`).
- Serve all static agent files (`agent-manifest.json`, `*.network.json`, `links.json`) with `Access-Control-Allow-Origin: *`.
- Validate tool parameters against JSON schemas before executing state mutations.
- Include automated conformance test assertions in `tests/conformance_test.mjs` for every new agent node.

## Dont
- Do NOT perform irreversible bookings without prompting the visitor through `onActionConfirm`.
- Do NOT hardcode API credentials or secrets in `agent-manifest.json` or client scripts.
- Do NOT bundle server-only Node modules (`fs`, `child_process`, `net`) into client-side browser scripts.

## Reason
Standardized agent authoring guarantees friction-free interoperability across heterogeneous web properties, enabling personal agents to discover, negotiate, and execute actions across disparate websites on the user's behalf without aggregator middleman friction.

## Related Items
- `PROD-001`: Open Agentic Web Challenge Specification & Submission Protocol
- `ARCH-002`: TripSteward Autonomous Federated Travel & Cross-Site Booking Architecture
- `DEV-001`: In-Browser Runtime, Site Actions & Otari BYOK Standards
- `DEV-002`: Production VM Deployment & Reverse Proxy Architecture
