# PROD-001: Open Agentic Web Challenge Specification & Submission Protocol

---
id: "PROD-001"
type: "product"
title: "Open Agentic Web Challenge Specification & Submission Protocol"
domain: "product"
status: "APPROVED"
version: "1.0.0"
---

## Rule
All projects, architectures, and submissions developed in this workspace for the Cognizant Open Agentic Web Challenge must strictly adhere to the official hackathon rules and the Minimum Viable Specification for a Worldwide Agentic Web (MVP Profile 0.3):

1. **Client-Side Browser Execution (Zero-Server-Cost for Host)**: Agent networks must be described purely as declarative data (JSON / HOCON) and executed client-side in the browser via JavaScript. The site host must never be forced to pay for visitor LLM inference.
2. **Bring-Your-Own-Key (BYOK) Inference**: The runtime must support user-supplied LLM routers/keys (Mozilla Otari, OpenRouter, OpenAI-compatible endpoints) or an optional publisher default router.
3. **Public Spec Artifacts**:
   - `agent-manifest.json`: Publicly accessible manifest at the site base declaring networks, entry point (`front_man`), and HOCON/JSON path with CORS enabled.
   - `*.network.json`: Resolved, data-only Neuro SAN HOCON/JSON agent graph with build-time includes and substitutions expanded.
   - `runtime`: Browser JavaScript engine that boots and manages chat, tool execution, and peer network loading.
   - `links.json`: Peer-network link mappings for external cross-agent calls.
4. **Interactive Experience & Action Tools**:
   - Must provide a user interface allowing visitors or visiting agents to interact with the agent network.
   - Must expose website operations as validated tools (e.g. `website_*` site actions) with schema validation and user confirmation dialogs for irreversible/write actions.
5. **Submission Deliverables**:
   - Publicly accessible deployed URL containing the conforming JSON files and browser runtime.
   - Demonstration video: under 2 minutes, hosted on YouTube, showing the project running in a web browser, with the entrant verbally explaining the project (no AI-generated narration).
   - Text description and one or more screenshots.
   - Public open-source code repository.

## Do
- Design agent networks using declarative JSON (`tools`, `instructions`, `function.parameters`).
- Ground internal agents strictly in site data and operations via `website_*` action handlers.
- Enforce browser security boundaries, origin validation, and user consent prompts before dispatching calls to peer agent sites or external MCP servers.
- Provide clear setup instructions and model selection options (e.g. Otari `alibaba/qwen3.8-flash`, OpenRouter, etc.).
- Build reusable building blocks, libraries, or multi-agent networks that connect with other agentic sites.

## Dont
- Do NOT build server-side agent execution runtimes or require proprietary backend servers to run agent logic.
- Do NOT hardcode API credentials into published agent JSON or client-side bundles.
- Do NOT submit demonstration videos longer than 2 minutes or use AI-generated voiceovers.
- Do NOT bypass CORS or origin consent boundaries when communicating with peer sites.

## Reason
The Open Agentic Web Challenge is organized by Cognizant with partners (Mozilla Otari, MIT Media Lab NANDA, AWS, UT Austin) to establish an open, decentralized agentic web infrastructure where users own their agents, site owners expose standard agent capabilities without backend inference bills, and agents discover and collaborate peer-to-peer using standard web protocols (HTTPS, JSON, CORS, MCP).

## Related Items
- GitHub Repo: `https://github.com/cognizant-ai-labs/agentic-web`
- MVP Specification: `docs/worldwide_agentic_web_mvp_spec.md`
- Devpost Challenge: `https://cognizant-agenticweb.devpost.com/`
