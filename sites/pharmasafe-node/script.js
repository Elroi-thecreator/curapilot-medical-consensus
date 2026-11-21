// PharmaSafe Node UI Script
export class PharmaApp {
  static init() {
    const checkBtn = document.querySelector("#drug-check-btn");
    const medsInput = document.querySelector("#meds-input");
    const contextInput = document.querySelector("#context-input");
    const resultsBox = document.querySelector("#drug-results");

    if (checkBtn && medsInput && resultsBox) {
      checkBtn.addEventListener("click", () => {
        const rawMeds = medsInput.value.trim();
        const context = contextInput ? contextInput.value.trim() : "";
        if (!rawMeds) return;

        const medications = rawMeds.split(",").map(m => m.trim()).filter(Boolean);

        resultsBox.innerHTML = `
          <div class="result-card loading">
            <span class="spinner"></span> Screening ${medications.length} medication(s) against interaction database...
          </div>
        `;

        setTimeout(async () => {
          const { SiteActions } = await import("./site-actions.js");
          const tool = SiteActions.checkInteractionsAction();
          const data = await tool.execute({ medications, clinical_context: context });

          if (!data.ok) {
            resultsBox.innerHTML = `
              <div class="result-card error">
                <h4>Screening Error</h4>
                <p>Could not screen medications.</p>
              </div>
            `;
            return;
          }

          if (data.total_alerts > 0) {
            const alertsHtml = data.alerts.map(a => `
              <div class="alert-item ${a.severity.toLowerCase().includes('critical') ? 'alert-critical' : 'alert-warning'}">
                <div class="alert-badge">${a.severity}</div>
                <h4>${a.title}</h4>
                <p class="involved"><strong>Involved:</strong> ${a.involved_drugs.join(" + ")} ${a.contraindicated_condition ? `(Context: ${a.contraindicated_condition})` : ''}</p>
                <p class="mechanism"><strong>Mechanism:</strong> ${a.mechanism}</p>
                <p class="management"><strong>Clinical Action:</strong> ${a.management}</p>
              </div>
            `).join("");

            resultsBox.innerHTML = `
              <div class="result-card warning">
                <h3>⚠️ ${data.total_alerts} Interaction Warning(s) Detected</h3>
                <div class="alerts-list">${alertsHtml}</div>
              </div>
            `;
          } else {
            resultsBox.innerHTML = `
              <div class="result-card success">
                <h3>✅ No Major High-Risk Interactions Detected</h3>
                <p>Screened: ${data.screened_medications.join(", ")}</p>
                <p class="context-note">Clinical context: ${data.clinical_context}</p>
              </div>
            `;
          }
        }, 300);
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  PharmaApp.init();
});
