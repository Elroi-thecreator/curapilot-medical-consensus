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
        ],
        demo_script: {
          prompt: "Chief Physician, please review Case #AG-8492 in my private vault. Consult the Rare Genomics Institute on PDHA1 c.1145C>T and PharmaSafe on Valproic Acid & Metformin. Synthesize a complete clinical consensus dossier.",
          genomics_response: "Rare Genomics Institute confirmed: PDHA1 c.1145C>T (p.Pro382Leu) is classified as PATHOGENIC (ClinVar:RCV000782319, OMIM:312170). The mutation disrupts the thiamine pyrophosphate (TPP) cofactor binding domain, suppressing PDH catalytic activity to <15% of normal. This causes cellular lactic flux and brain energy starvation.",
          pharma_response: "PharmaSafe Laboratory Alert: CRITICAL CONTRAINDICATION DETECTED! Valproic acid depletes mitochondrial carnitine and halts beta-oxidation. In patients with underlying PDHA1 mutations, valproate precipitates fulminant mitochondrial crisis, cerebral edema, and status epilepticus. Furthermore, Metformin inhibits complex I, exacerbating lactic acidosis.",
          dossier: {
            primary_etiology: "Pyruvate Dehydrogenase E1-alpha Deficiency (PDHD)",
            diagnostic_confidence: "HIGH",
            genomic_findings_summary: "Confirmed pathogenic mutation PDHA1 c.1145C>T causing severe E1-alpha catalytic failure (<15% activity) and impaired pyruvate-to-acetyl-CoA conversion.",
            pharmacological_findings_summary: "Valproic Acid represents an acute, life-threatening mitochondrial toxin in PDH deficiency. Metformin exacerbates systemic lactic flux.",
            urgent_interventions: [
              "Immediately discontinue Valproic Acid; substitute non-mitochondrial Levetiracetam",
              "Discontinue Metformin to reduce lactic acidosis risk",
              "Strictly avoid standard IV dextrose/glucose infusions (triggers fatal lactic crises)",
              "Initiate medical ketogenic diet (4:1 ratio) with high-dose thiamine (100 mg/kg/day)"
            ],
            physician_discussion_notes: "Provide attending physician with emergency protocol letter; confirm baseline venous lactate/pyruvate ratio and schedule neurology metabolic consultation."
          }
        }
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
        ],
        demo_script: {
          prompt: "Chief Physician, examine Case #AG-3104. Review CYP2C19 variant status and analyze why the patient has clopidogrel hypo-responsiveness on dual antiplatelet therapy.",
          genomics_response: "Rare Genomics Institute confirmed: CYP2C19 *2 is a loss-of-function allele causing aberrant splicing. The patient is an Intermediate/Poor Metabolizer with impaired hepatic bioactivation of thienopyridine prodrugs.",
          pharma_response: "PharmaSafe Laboratory Alert: MAJOR PHARMACOKINETIC ANTAGONISM DETECTED! Omeprazole is a competitive CYP2C19 substrate and inhibitor. Co-administration in a CYP2C19 *2 carrier drops active clopidogrel thiol metabolite generation by ~45%, creating high stent thrombosis risk.",
          dossier: {
            primary_etiology: "CYP2C19 Poor Metabolizer Phenotype with Clopidogrel Resistance",
            diagnostic_confidence: "HIGH",
            genomic_findings_summary: "Confirmed CYP2C19 *2 loss-of-function allele impairing enzymatic prodrug activation.",
            pharmacological_findings_summary: "Omeprazole competitively blocks residual CYP2C19 activity, neutralizing clopidogrel antiplatelet protection.",
            urgent_interventions: [
              "Switch antiplatelet agent from Clopidogrel to Ticagrelor (90mg BID) or Prasugrel (10mg daily)",
              "Substitute Omeprazole with Pantoprazole (low CYP2C19 affinity) or H2-blocker",
              "Repeat P2Y12 PRU platelet assay in 14 days"
            ],
            physician_discussion_notes: "Alert interventional cardiologist immediately to adjust antiplatelet therapy to prevent in-stent thrombosis."
          }
        }
      },
      "case-3": {
        id: "case-3",
        code: "CASE #AG-5519 (62y Male)",
        title: "Stage III Colorectal Carcinoma — Pre-Chemotherapy Toxicity Screen",
        demographics: { age: 62, sex: "Male", status: "Pre-Chemotherapy" },
        clinical_presentation: "A 62-year-old male scheduled to initiate adjuvant fluoropyrimidine chemotherapy (FOLFOX regimen) undergoes baseline pharmacogenetic safety screening.",
        biomarkers: [
          { name: "Absolute Neutrophil Count", value: "3.8 x10^9/L", status: "NORMAL", ref: "2.0 - 7.5 x10^9/L" },
          { name: "Total Bilirubin", value: "0.7 mg/dL", status: "NORMAL", ref: "0.2 - 1.2 mg/dL" },
          { name: "Serum Creatinine", value: "1.0 mg/dL", status: "NORMAL", ref: "0.7 - 1.3 mg/dL" }
        ],
        genomic_variants: [
          { gene: "DPYD", variant: "*2A", protein: "c.1905+1G>A", zygosity: "Heterozygous", notes: "CPIC Level 1A splice-donor mutation abolishing DPD activity." }
        ],
        active_medications: [
          { name: "Capecitabine / 5-Fluorouracil", dosage: "Standard Body Surface Area Dose", indication: "Adjuvant Colorectal Protocol (Planned)" },
          { name: "Ondansetron", dosage: "8 mg Pre-infusion", indication: "Antiemetic" }
        ],
        demo_script: {
          prompt: "Chief Physician, evaluate Case #AG-5519. Check DPYD *2A variant pathogenicity and screen scheduled 5-FU/capecitabine chemotherapy for life-threatening toxicity.",
          genomics_response: "Rare Genomics Institute confirmed: DPYD *2A (c.1905+1G>A) causes complete exon 14 skipping and produces non-functional dihydropyrimidine dehydrogenase. DPD activity score is critically reduced (0.5-1.0).",
          pharma_response: "PharmaSafe Laboratory Alert: CRITICAL / LIFE-THREATENING TOXICITY WARNING! DPYD *2A carriers cannot catabolize 5-FU. Standard dosing triggers catastrophic myelosuppression, pancytopenia, mucositis, and fatal neurotoxicity (CPIC Level 1A).",
          dossier: {
            primary_etiology: "Dihydropyrimidine Dehydrogenase (DPD) Deficiency",
            diagnostic_confidence: "HIGH",
            genomic_findings_summary: "Confirmed DPYD *2A splice mutation eliminating normal clearance of fluoropyrimidine metabolites.",
            pharmacological_findings_summary: "Full-dose 5-FU or Capecitabine is an absolute contraindication due to lethal drug accumulation.",
            urgent_interventions: [
              "Reduce initial 5-FU / Capecitabine dose by at least 50% with therapeutic drug monitoring (TDM)",
              "Consider non-fluoropyrimidine alternative regimens (e.g. Irinotecan-based protocols)",
              "Ensure patient carries emergency DPD deficiency card"
            ],
            physician_discussion_notes: "Advise medical oncologist to consult CPIC guidelines for DPYD dosing before administering cycle 1."
          }
        }
      }
    };

    this.activeCaseId = "case-1";
    this.flaggedContraindications = [];
    this.consensusDossier = null;
    this.simulating = false;
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

  runDemoSimulation() {
    if (this.simulating) return;
    this.simulating = true;
    const c = this.cases[this.activeCaseId];
    const demo = c.demo_script;

    AegisApp.appendSimulatedMessage("user", demo.prompt);

    setTimeout(() => {
      AegisApp.appendSimulatedMessage("bot", `🩺 **Chief Physician:** Initiating zero-leakage clinical consensus review for ${c.code}. Accessing local private vault... Verified ${c.biomarkers.length} biomarkers, ${c.genomic_variants.length} genomic variants, and ${c.active_medications.length} active medications. Calling external specialist nodes via Open Agentic Web peer links...`);
    }, 600);

    setTimeout(() => {
      AegisApp.appendSimulatedMessage("genomics", `🧬 **Rare Genomics Institute (` + window.location.origin + `/genomics):** ${demo.genomics_response}`);
    }, 1800);

    setTimeout(() => {
      AegisApp.appendSimulatedMessage("pharma", `💊 **PharmaSafe Interaction Laboratory (` + window.location.origin + `/pharmasafe):** ${demo.pharma_response}`);
      
      // Auto-flag contraindication
      if (c.id === "case-1") {
        this.addContraindication({
          severity: "CRITICAL",
          target: "Valproic Acid",
          conflict_with: "PDHA1 c.1145C>T deficiency",
          clinical_rationale: "Valproic acid depletes mitochondrial carnitine and halts pyruvate oxidation, triggering catastrophic lactic crisis in PDH deficiency.",
          recommended_action: "Immediately discontinue Valproic Acid. Substitute non-mitochondrial Levetiracetam."
        });
      } else if (c.id === "case-2") {
        this.addContraindication({
          severity: "MAJOR",
          target: "Omeprazole + Clopidogrel",
          conflict_with: "CYP2C19 *2 loss of function",
          clinical_rationale: "Omeprazole competitively inhibits CYP2C19, preventing active metabolite formation for antiplatelet protection.",
          recommended_action: "Switch to Ticagrelor or Prasugrel; substitute Omeprazole with Pantoprazole."
        });
      } else if (c.id === "case-3") {
        this.addContraindication({
          severity: "CRITICAL",
          target: "5-Fluorouracil / Capecitabine",
          conflict_with: "DPYD *2A deficiency",
          clinical_rationale: "Complete lack of DPD enzyme clearance leads to toxic fluoropyrimidine accumulation and lethal pancytopenia.",
          recommended_action: "Reduce dose by >=50% with therapeutic monitoring or switch to non-fluoropyrimidine chemotherapy."
        });
      }
    }, 3200);

    setTimeout(() => {
      AegisApp.appendSimulatedMessage("bot", `🩺 **Chief Physician:** Cross-examination complete. Critical contradiction identified between patient's genetic defect and medication regimen! Synthesizing and sealing formal Consensus Dossier...`);
      this.saveConsensusDossier(demo.dossier);
      this.simulating = false;
    }, 4500);
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

    const demoSimBtn = document.querySelector("#demo-simulate-btn");
    if (demoSimBtn) {
      demoSimBtn.addEventListener("click", () => {
        AegisApp.vault.runDemoSimulation();
      });
    }

    const prefillBtn = document.querySelector("#demo-prefill-btn");
    if (prefillBtn) {
      prefillBtn.addEventListener("click", () => {
        const c = AegisApp.vault.cases[AegisApp.vault.activeCaseId];
        const input = document.querySelector("#ns-query-input") || document.querySelector("input[type='text'].ns-input");
        if (input) {
          input.value = c.demo_script.prompt;
          input.focus();
        } else {
          navigator.clipboard.writeText(c.demo_script.prompt);
          alert("Copied sample prompt to clipboard! Paste it into the chat input below.");
        }
      });
    }

    const resetBtn = document.querySelector("#demo-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        AegisApp.vault.setActiveCase(AegisApp.vault.activeCaseId);
        const chatMsgs = document.querySelector("#ns-msgs");
        if (chatMsgs) {
          chatMsgs.innerHTML = `<div class="ns-msg bot">I am the Chief Physician Coordinator. I operate entirely within your local browser memory to coordinate zero-leakage clinical second opinions. How can I assist with the active case?</div>`;
        }
      });
    }

    const exportBtn = document.querySelector("#export-dossier-btn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        if (!AegisApp.vault.consensusDossier) {
          alert("No consensus dossier has been compiled yet. Run the consensus deliberation first!");
          return;
        }
        AegisApp.downloadDossierText();
      });
    }
  }

  static appendSimulatedMessage(role, text) {
    const chatMsgs = document.querySelector("#ns-msgs");
    if (!chatMsgs) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = `ns-msg ${role} sim-msg-${role}`;
    msgDiv.innerHTML = text.replace(/\n/g, "<br>");
    chatMsgs.appendChild(msgDiv);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
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
        <div class="metric-row ${b.status.includes('HIGH') || b.status.includes('ABNORMAL') || b.status.includes('CRITICAL') ? 'metric-alert' : ''}">
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
          <small>Ask the Chief Physician to synthesize the consultation or click "⚡ Run Consensus Demo" above.</small>
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
