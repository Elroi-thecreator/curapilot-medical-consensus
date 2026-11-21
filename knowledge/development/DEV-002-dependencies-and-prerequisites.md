# DEV-002: Hackathon Dependencies, Prerequisites & Submission Lifecycle

---
id: "DEV-002"
type: "development"
title: "Hackathon Dependencies, Prerequisites & Submission Lifecycle"
domain: "development"
status: "APPROVED"
version: "1.0.0"
---

## Rule
All builders participating in the Cognizant Open Agentic Web Challenge must identify and fulfill dependencies across both lifecycle stages:

### 1. Dependencies Before Joining (Prerequisites & Toolchain Setup)
- **Eligibility & Compliance**:
  - Legal age of majority in entrant's jurisdiction (18+).
  - Geographic compliance (must not be in sanctioned jurisdictions: Brazil, Quebec, Russia, Cuba, Iran, North Korea, Syria, Sudan, Belarus, Crimea).
- **Accounts & Registrations**:
  - Devpost account registered on [cognizant-agenticweb.devpost.com](https://cognizant-agenticweb.devpost.com/).
  - Public Git hosting account (GitHub, GitLab, or Bitbucket) for open-source code hosting.
  - Video hosting account (YouTube) for the demo video.
- **Inference & Credentials**:
  - Claim participant free credits for **Mozilla Otari** (provided upon Devpost registration) or bring API keys for OpenRouter, OpenAI, Groq, Anthropic, or local Ollama.
- **Local Developer Environment**:
  - Node.js 22 or newer (required for runtime test runners and `serve_site.mjs`).
  - Python 3.10+ (required if using `nsdeploy` via `pip install nsdeploy` to compile HOCON).
  - POSIX shell (Linux, macOS, or WSL).
- **Base Website**:
  - A functional HTML/CSS/JS frontend or web application to "agentify".

### 2. Dependencies After Joining (Architecture, Runtime & Submission)
- **Specification & Technical Architecture (MVP Profile 0.3)**:
  - **Client-Side Execution**: Agent networks must be declarative JSON and executed client-side in the browser via JavaScript. Site hosts must not bear inference bills.
  - **Public Artifacts**:
    - `agent-manifest.json` at root declaring network entry point (`front_man`) and HOCON/JSON path.
    - `*.network.json` containing resolved Neuro SAN multi-agent definitions.
    - `runtime/` client-side JS engine running inside the visitor's browser.
    - CORS enabled (`Access-Control-Allow-Origin: *`) on manifest and network JSON files.
  - **Interactive BYOK & Chat UI**:
    - Embedded UI allowing visitors to configure LLM provider endpoint, model, and API key.
    - Chat interface facilitating interaction between user/visitor and agent.
  - **Grounded Action Tools (`website_*`)**:
    - Expose site DOM operations as validated tools with confirmation modals for irreversible actions.
  - **Inter-Site Linking (`links.json`)**:
    - Secure peer-linking with user consent boundaries when making cross-agent requests.
- **Devpost Submission Deliverables (Deadline: January 11, 2027 at 8:00 AM PT / 16:00 UTC)**:
  - Publicly accessible deployed URL (HTTPS with CORS headers).
  - Public open-source code repository with a valid license.
  - Demonstration video: under 2 minutes, hosted on YouTube, with human voiceover (no AI-generated audio).
  - Text description, architectural overview, and screenshots.

## Do
- Claim free Otari credits from Devpost registration early to avoid inference expenses during testing.
- Verify CORS headers on all published JSON artifacts so external caller agents can access the manifest.
- Test client-side browser execution thoroughly across major modern browsers.
- Record human voiceover for the demonstration video to comply with competition regulations.

## Dont
- Do NOT deploy backend server-side agent execution runtimes.
- Do NOT hardcode API credentials into published client files.
- Do NOT use synthetic or AI-generated voiceovers in the demo video.
- Do NOT miss the submission deadline: January 11, 2027 (8:00 AM PT / 16:00 UTC).

## Reason
The Open Agentic Web relies on decentralized, browser-executable multi-agent standards where users retain data privacy and control their own inference budgets, while sites expose standardized machine-readable capabilities without server operational costs.

## Related Items
- `PROD-001`: Open Agentic Web Challenge Specification & Submission Protocol
- Devpost Challenge: `https://cognizant-agenticweb.devpost.com/`
- Spec Documentation: `https://github.com/cognizant-ai-labs/agentic-web`
