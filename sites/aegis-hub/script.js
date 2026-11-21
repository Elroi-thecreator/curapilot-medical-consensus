// Aegis Hub Sovereign Client Vault & UI Controller
// Operates 100% in browser memory. Zero data transmitted to any cloud backend.

export class AegisVault {
  constructor() {
    this.cases = {
      "case-1": {
        id: "case-1",
        code: "CASE #AG-8492 (24y Female)",
        title: "Intermittent Ataxia, Severe Lactic Flux & Seizures",
        demographics: { age: 24, sex: "Female", status: "Unresolved Differential" },
        clinical_presentation: "A 24-year-old female presents with recurrent episodic ataxia, profound post-exertional exhaustion, intermittent confusion, and refractory seizures. Standard epilepsy panels have been inconclusive.",
        biomarkers: [
          { name: "Venous Lactate", value: "4.8 mmol/L", status: "CRITICAL_HIGH", ref: "0.5 - 2.2 mmol/L" },
          { name: "Serum Pyruvate", value: "0.18 mmol/L", status: "HIGH", ref: "0.03 - 0.10 mmol/L" },
          { name: "Lactate/Pyruvate Ratio", value: "26.7", status: "ABNORMAL_HIGH", ref: "< 20.0" },
          { name: "Serum Creatinine", value: "0.85 mg/dL", status: "NORMAL", ref: "0.60 - 1.10 mg/dL" },
          { name: "Blood Glucose (Fasting)", value: "92 mg/dL", status: "NORMAL", ref: "70 - 99 mg/dL" }
        ],
        genomic_variants: [
          { gene: "PDHA1", variant: "c.1145C>T", protein: "p.Pro382Leu", zygosity: "Heterozygous (X-linked)", notes: "Variant of interest in pyruvate dehydrogenase complex E1-alpha subunit." }
        ],
        active_medications: [
          { name: "Valproic Acid", dosage: "250 mg BID", indication: "Prescribed for episodic migraine / seizure prophylaxis" },
          { name: "Metformin", dosage: "500 mg Daily", indication: "Mild insulin resistance" }
        ]
      },
      "case-2": {
        id: "case-2",
        code: "CASE #AG-3104 (58y Male)",
        title: "Post-PCI Refractory Ischemia on Dual Antiplatelet Therapy",
        demographics: { age: 58, sex: "Male", status: "Post-Stent Follow-up" },
        clinical_presentation: "A 58-year-old male with recent drug-eluting coronary stent placement reports recurrent exertional angina despite adherence to post-PCI pharmacotherapy.",
        biomarkers: [
          { name: "Troponin I", value: "0.03 ng/mL", status: "NORMAL", ref: "< 0.04 ng/mL" },
          { name: "P2Y12 Platelet Reactivity (PRU)", value: "248 PRU", status: "HIGH_RESISTANCE", ref: "< 180 PRU (Hypo-response)" },
          { name: "eGFR", value: "84 mL/min/1.73m²", status: "NORMAL", ref: "> 60 mL/min" }
        ],
        genomic_variants: [
          { gene: "CYP2C19", variant: "*2", protein: "c.681G>A", zygosity: "Heterozygous", notes: "CPIC Level 1A loss-of-function allele." }
        ],
        active_medications: [
          { name: "Clopidogrel", dosage: "75 mg Daily", indication: "Post-PCI Dual Antiplatelet" },
          { name: "Omeprazole", dosage: "20 mg Daily", indication: "Gastric ulcer prophylaxis" },
          { name: "Atorvastatin", dosage: "40 mg Daily", indication: "Lipid lowering" }
        ]
      }
    };

    this.activeCaseId = "case-1";
    this.flaggedContraindications = [];
    this.consensusDossier = null;
  }

  getActiveRecord() {
    const c = this.cases[this.activeCaseId];
    return {
      case_id: c.code,
      title: c.title,
      demographics: c.demographics,
      clinical_presentation: c.clinical_presentation,
      biomarkers: c.biomarkers,
      genomic_variants: c.genomic_variants,
      active_medications: c.active_medications,
      active_contraindications_count: this.flaggedContraindications.length,
      current_flagged_alerts: this.flaggedContraindications
    };
  }

  setActiveCase(caseId) {
    if (this.cases[caseId]) {
      this.activeCaseId = caseId;
      this.flaggedContraindications = [];
      this.consensusDossier = null;
      AegisApp.render();
    }
  }

  addContraindication(item) {
    const record = {
      id: "ALERT-" + (this.flaggedContraindications.length + 1),
      timestamp: new Date().toLocaleTimeString(),
      ...item
    };
    this.flaggedContraindications.unshift(record);
    AegisApp.renderAlerts();
    return {
      ok: true,
      alert_id: record.id,
      total_alerts: this.flaggedContraindications.length,
      message: `Contraindication for ${item.target} flagged in patient dashboard.`
    };
  }

  saveConsensusDossier(dossier) {
    this.consensusDossier = {
      generated_at: new Date().toISOString(),
      case_code: this.cases[this.activeCaseId].code,
      ...dossier
    };
    AegisApp.renderDossier();
    return {
      ok: true,
      status: "COMMITTED_TO_CLIENT_SESSION",
      message: "Multi-specialist consensus dossier synthesized and sealed in local browser session.",
      dossier_id: "DOSSIER-" + Math.floor(100000 + Math.random() * 900000)
    };
  }
}

export class AegisApp {
  static vault = new AegisVault();

  static init() {
    AegisApp.bindEvents();
    AegisApp.render();
  }

  static bindEvents() {
    const caseSelect = document.querySelector("#case-selector");
    if (caseSelect) {
      caseSelect.addEventListener("change", (e) => {
        AegisApp.vault.setActiveCase(e.target.value);
      });
    }

    const exportBtn = document.querySelector("#export-dossier-btn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        if (!AegisApp.vault.consensusDossier) {
          alert("No consensus dossier has been compiled yet. Ask the Chief Physician to synthesize the case first!");
          return;
        }
        AegisApp.downloadDossierText();
      });
    }
  }

  static render() {
    const c = AegisApp.vault.cases[AegisApp.vault.activeCaseId];
    if (!c) return;

    // Header info
    const caseTitle = document.querySelector("#active-case-title");
    const caseDemographics = document.querySelector("#active-case-demographics");
    const casePresentation = document.querySelector("#active-case-presentation");

    if (caseTitle) caseTitle.textContent = c.code + " — " + c.title;
    if (caseDemographics) {
      caseDemographics.textContent = `${c.demographics.age}y ${c.demographics.sex} • Status: ${c.demographics.status}`;
    }
    if (casePresentation) casePresentation.textContent = c.clinical_presentation;

    // Biomarkers Table
    const bioContainer = document.querySelector("#biomarkers-list");
    if (bioContainer) {
      bioContainer.innerHTML = c.biomarkers.map(b => `
        <div class="metric-row ${b.status.includes('HIGH') || b.status.includes('ABNORMAL') ? 'metric-alert' : ''}">
          <span class="metric-name">${b.name}</span>
          <span class="metric-val"><strong>${b.value}</strong> <small>(${b.ref})</small></span>
        </div>
      `).join("");
    }

    // Genomic Variants
    const genContainer = document.querySelector("#genomics-list");
    if (genContainer) {
      genContainer.innerHTML = c.genomic_variants.map(g => `
        <div class="genomic-pill">
          <span class="pill-gene">${g.gene}</span>
          <span class="pill-var">${g.variant} (${g.protein || ''})</span>
          <span class="pill-zyg">${g.zygosity}</span>
        </div>
      `).join("");
    }

    // Active Medications
    const medContainer = document.querySelector("#meds-list");
    if (medContainer) {
      medContainer.innerHTML = c.active_medications.map(m => `
        <div class="med-item">
          <strong>${m.name}</strong> — ${m.dosage}
          <div class="med-ind">${m.indication}</div>
        </div>
      `).join("");
    }

    AegisApp.renderAlerts();
    AegisApp.renderDossier();
  }

  static renderAlerts() {
    const container = document.querySelector("#flagged-alerts-container");
    const countBadge = document.querySelector("#alerts-count-badge");
    if (!container) return;

    const alerts = AegisApp.vault.flaggedContraindications;
    if (countBadge) {
      countBadge.textContent = alerts.length + " Critical Alert(s)";
      countBadge.style.display = alerts.length > 0 ? "inline-block" : "none";
    }

    if (alerts.length === 0) {
      container.innerHTML = `<div class="empty-state">No contraindications currently flagged. When agents identify risks during deliberation, they will appear here.</div>`;
      return;
    }

    container.innerHTML = alerts.map(a => `
      <div class="alert-box alert-${a.severity.toLowerCase()}">
        <div class="alert-top">
          <span class="alert-sev-tag">${a.severity}</span>
          <span class="alert-target">⚠️ ${a.target}</span>
          <span class="alert-time">${a.timestamp}</span>
        </div>
        <div class="alert-conflict"><strong>Conflicting Factor:</strong> ${a.conflict_with}</div>
        <p class="alert-desc">${a.clinical_rationale}</p>
        <div class="alert-rec"><strong>Required Action:</strong> ${a.recommended_action}</div>
      </div>
    `).join("");
  }

  static renderDossier() {
    const container = document.querySelector("#dossier-output");
    if (!container) return;

    const d = AegisApp.vault.consensusDossier;
    if (!d) {
      container.innerHTML = `
        <div class="empty-dossier">
          <p>Consensus dossier not yet compiled.</p>
          <small>Ask the Chief Physician to synthesize the consultation once specialist deliberations complete.</small>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="dossier-card">
        <div class="dossier-header">
          <div class="dossier-tag">SEALED CLINICAL DOSSIER</div>
          <h3>${d.primary_etiology}</h3>
          <div class="dossier-meta">
            Confidence: <span class="conf-badge conf-${d.diagnostic_confidence.toLowerCase()}">${d.diagnostic_confidence}</span>
            • Timestamp: ${new Date(d.generated_at).toLocaleString()}
          </div>
        </div>

        <div class="dossier-body">
          <div class="dossier-section">
            <h4>🧬 Genomic Consensus Evidence</h4>
            <p>${d.genomic_findings_summary}</p>
          </div>

          <div class="dossier-section">
            <h4>💊 Pharmacological & Toxicity Review</h4>
            <p>${d.pharmacological_findings_summary}</p>
          </div>

          <div class="dossier-section highlight-sec">
            <h4>🚨 Mandatory Clinical Interventions</h4>
            <ul>
              ${d.urgent_interventions.map(i => `<li>${i}</li>`).join("")}
            </ul>
          </div>

          <div class="dossier-section">
            <h4>📋 Notes for Attending Physician</h4>
            <p>${d.physician_discussion_notes}</p>
          </div>
        </div>
      </div>
    `;
  }

  static downloadDossierText() {
    const d = AegisApp.vault.consensusDossier;
    if (!d) return;

    const content = `=====================================================
AEGIS ZERO-LEAKAGE MEDICAL CONSENSUS REPORT
Case: ${d.case_code}
Generated: ${new Date(d.generated_at).toLocaleString()}
Consensus Confidence: ${d.diagnostic_confidence}
=====================================================

PRIMARY SUSPECTED ETIOLOGY:
${d.primary_etiology}

GENOMIC SPECIALIST SUMMARY:
${d.genomic_findings_summary}

PHARMACOLOGY & INTERACTION SUMMARY:
${d.pharmacological_findings_summary}

MANDATORY CLINICAL INTERVENTIONS:
${d.urgent_interventions.map((i, idx) => `${idx + 1}. ${i}`).join("\n")}

PHYSICIAN DISCUSSION NOTES:
${d.physician_discussion_notes}

=====================================================
PRIVACY VERIFICATION:
This consultation executed 100% inside the client browser.
Zero patient data was transmitted to any centralized cloud host.
Powered by Open Agentic Web (MVP Profile 0.3)
=====================================================`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Aegis_Consensus_${d.case_code.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  AegisApp.init();
});
