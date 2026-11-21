// Aegis Hub Runtime Mount & Consent / Action Review Controller
import { ChatFollow } from "./chat-follow.js";

export class AssistantMount {
  static GREETING = "I am the Chief Physician Coordinator. I operate entirely within your local browser memory to coordinate zero-leakage clinical second opinions. I can analyze the patient case in your private vault, cross-examine hypotheses with external genomic and pharmacological specialist nodes, and compile a verified consensus dossier.";

  static DIALOGS = {
    "generate_consensus_dossier": {
      title: "Seal Clinical Consensus Dossier?",
      sentence: "This will compile the specialist findings and mandatory interventions into a sealed clinical consensus report for your medical records.",
      confirm: "Seal Consensus Dossier",
      decline: "Review Further"
    }
  };

  static async start() {
    const status = document.querySelector("#assistant-status");
    const siteBase = new URL("./", import.meta.url).href;
    try {
      const { boot } = await import("./runtime/index.js");
      const booted = await boot("#agent-app", {
        originUrl: siteBase,
        sandboxWorkerUrl: new URL("runtime/sandbox-worker.js", siteBase).href,
      });

      AssistantMount.engine = booted.engine;

      // Hook action review
      AssistantMount.defaultReview = booted.engine.onActionConfirm;
      booted.engine.onActionConfirm = AssistantMount.reviewAction;

      // Hook peer consent
      AssistantMount.defaultConsent = booted.engine.onConsent;
      booted.engine.onConsent = AssistantMount.reviewConsent;

      ChatFollow.start(document.querySelector("#agent-app"));

      const needsKey = !booted.engine.mockLLM
        && (!booted.engine.byokKey || booted.engine.byokKey === "demo");
      if (status) {
        status.textContent = needsKey
          ? "Aegis Coordinator ready. Enter your Mozilla Otari or AI provider key in the settings panel below."
          : "Aegis Chief Physician active & connected.";
      }
      if (!needsKey) {
        AssistantMount.greet();
      }
      return booted.engine;
    } catch (error) {
      if (status) {
        status.textContent = "Autonomous assistant loaded in fallback mode.";
      }
      console.warn("Aegis coordinator startup note:", error);
      return null;
    }
  }

  static greet() {
    const first = document.querySelector("#ns-msgs .ns-msg.bot");
    if (first) {
      first.textContent = AssistantMount.GREETING;
    }
  }

  static async reviewAction(items) {
    if (!Array.isArray(items) || items.length === 0) return true;
    for (const item of items) {
      const dialogDef = AssistantMount.DIALOGS[item.action];
      if (dialogDef) {
        const agreed = window.confirm(`${dialogDef.title}\n\n${dialogDef.sentence}`);
        if (!agreed) return false;
      }
    }
    return true;
  }

  static async reviewConsent(origin, details) {
    const orgName = origin.includes("8081") ? "Rare Genomics Institute"
                  : origin.includes("8082") ? "PharmaSafe Interaction Laboratory"
                  : origin;
    const msg = `🔒 Open Agentic Web Consent Request:\n\nChief Physician requests permission to consult specialist node:\n${orgName} (${origin})\n\nPurpose: Cross-examine case findings peer-to-peer.\nPrivacy: Executed in your browser. Zero patient records leave your device.\n\nApprove consultation?`;
    return window.confirm(msg);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  AssistantMount.start();
});
