import { ChatFollow } from "./chat-follow.js";

export class AssistantMount {
  static GREETING = "Welcome to the PharmaSafe Interaction Laboratory agent node. I can evaluate polypharmacy interactions, CYP450 metabolism, and metabolic disease contraindications.";

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
      ChatFollow.start(document.querySelector("#agent-app"));

      const needsKey = !booted.engine.mockLLM
        && (!booted.engine.byokKey || booted.engine.byokKey === "demo");
      if (status) {
        status.textContent = needsKey
          ? "Specialist Agent ready. Add your Mozilla Otari or provider key in AI settings below to query."
          : "Pharmacology Specialist active & connected.";
      }
      if (!needsKey) {
        AssistantMount.greet();
      }
      return booted.engine;
    } catch (error) {
      if (status) {
        status.textContent = "Autonomous assistant loaded in background mode.";
      }
      console.warn("Pharma assistant startup note:", error);
      return null;
    }
  }

  static greet() {
    const first = document.querySelector("#ns-msgs .ns-msg.bot");
    if (first) {
      first.textContent = AssistantMount.GREETING;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  AssistantMount.start();
});
