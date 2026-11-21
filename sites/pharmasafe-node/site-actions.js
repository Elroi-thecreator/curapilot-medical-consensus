// PharmaSafe Node Site Actions
// Exposes drug monographs and polypharmacy interaction screening.

const DRUG_CATALOG = {
  "METFORMIN": {
    name: "Metformin",
    class: "Biguanide Antidiabetic Agent",
    metabolism: "Renal excretion unchanged (not metabolized by CYP450)",
    black_box_warning: "Lactic Acidosis",
    contraindications: "Severe renal impairment, acute metabolic acidosis, severe hypoxemia, mitochondrial disease with impaired pyruvate oxidation."
  },
  "DICHLOROACETATE": {
    name: "Dichloroacetate (DCA)",
    class: "Pyruvate Dehydrogenase Kinase Inhibitor (Investigational / Metabolic Modifier)",
    metabolism: "Hepatic GSTZ1 pathway",
    target: "Inhibits PDK, locking PDH complex in active dephosphorylated state to stimulate pyruvate clearance.",
    toxicity_profile: "Reversible peripheral neuropathy with prolonged exposure."
  },
  "VALPROIC ACID": {
    name: "Valproic Acid / Sodium Valproate",
    class: "Anticonvulsant / Mood Stabilizer",
    metabolism: "Extensive hepatic glucuronidation and beta-oxidation",
    black_box_warning: "Fatal hepatotoxicity, pancreatitis, mitochondrial toxicity.",
    contraindications: "Mitochondrial disorders caused by mutations in POLG or pyruvate dehydrogenase complex (triggers acute liver failure and fulminant hyperammonemia)."
  },
  "CLOPIDOGREL": {
    name: "Clopidogrel",
    class: "Thienopyridine P2Y12 Inhibitor (Antiplatelet)",
    metabolism: "Prodrug requiring two-step hepatic bioactivation via CYP2C19, CYP1A2, CYP2B6, CYP3A4.",
    warning: "Reduced antiplatelet effect in CYP2C19 poor metabolizers (*2, *3)."
  },
  "OMEPRAZOLE": {
    name: "Omeprazole",
    class: "Proton Pump Inhibitor",
    metabolism: "CYP2C19 substrate and competitive inhibitor; CYP3A4 substrate.",
    interactions: "Competitively inhibits CYP2C19, reducing active clopidogrel metabolite formation by ~45%."
  }
};

const INTERACTION_RULES = [
  {
    drugs: ["METFORMIN", "DICHLOROACETATE"],
    severity: "High / Synergistic Risk",
    title: "Potentiation of Lactic Acid Flux",
    mechanism: "While Dichloroacetate lowers lactate by activating PDH, co-administration with Metformin in patients with baseline metabolic defects can paradoxically overwhelm renal clearance, exacerbating metabolic acidosis.",
    management: "Monitor serum venous lactate closely. Ensure adequate hydration and sodium bicarbonate reserves."
  },
  {
    drugs: ["METFORMIN"],
    condition_keyword: "PDHA1",
    severity: "High / Lactic Acidosis Risk",
    title: "Biguanide Exacerbation of Pyruvate Dehydrogenase Lactic Acidosis",
    mechanism: "Metformin inhibits hepatic gluconeogenesis and mitochondrial complex I, driving pyruvate conversion to lactate. In patients with PDHA1 deficiency who already have impaired pyruvate clearance, metformin directly precipitates refractory lactic acidosis.",
    management: "Discontinue metformin. Consider dietary management (ketogenic diet) or insulin if glycemic control is needed."
  },
  {
    drugs: ["VALPROIC ACID"],
    condition_keyword: "PDHA1",
    severity: "Critical / Life-Threatening",
    title: "Severe Mitochondrial Toxicity & Fatal Encephalopathy",
    mechanism: "Valproic acid depletes mitochondrial carnitine and impairs pyruvate metabolism. In patients with underlying Pyruvate Dehydrogenase (PDHA1) mutations, it can trigger catastrophic mitochondrial crisis, cerebral edema, and status epilepticus.",
    management: "ABSOLUTE CONTRAINDICATION. Immediately taper and switch to non-mitochondrial anticonvulsants (e.g. Levetiracetam)."
  },
  {
    drugs: ["CLOPIDOGREL", "OMEPRAZOLE"],
    severity: "Major / Pharmacokinetic Antagonism",
    title: "CYP2C19 Competitive Bioactivation Inhibition",
    mechanism: "Omeprazole competitively inhibits CYP2C19, significantly reducing the bioactivation of clopidogrel into its active antiplatelet thiol metabolite.",
    management: "Avoid combination. Substitute omeprazole with pantoprazole (minimal CYP2C19 affinity) or switch antiplatelet to prasugrel/ticagrelor."
  }
];

export class SiteActions {
  static registerActions(actions) {
    actions.register(SiteActions.checkInteractionsAction());
    actions.register(SiteActions.getMonographAction());
  }

  static checkInteractionsAction() {
    return {
      name: "check_drug_interactions",
      description: "Screen a list of medications against known pharmacokinetic and pharmacodynamic interactions, CYP450 enzyme conflicts, and disease contraindications.",
      effect: "read",
      inputSchema: {
        type: "object",
        properties: {
          medications: {
            type: "array",
            items: { type: "string" },
            description: "List of medication generic or brand names (e.g. ['Metformin', 'Valproic Acid', 'Omeprazole'])."
          },
          clinical_context: {
            type: "string",
            description: "Optional underlying genetic mutation, disease, or organ impairment (e.g. 'PDHA1 deficiency', 'CYP2C19 poor metabolizer')."
          }
        },
        required: ["medications"],
        additionalProperties: false
      },
      execute: async (args) => {
        const meds = (args.medications || []).map(m => m.toUpperCase().trim());
        const context = (args.clinical_context || "").toUpperCase().trim();
        const detectedAlerts = [];

        // Check multi-drug interactions
        for (const rule of INTERACTION_RULES) {
          const matchedDrugs = rule.drugs.filter(d => meds.includes(d));
          if (rule.drugs.length > 1 && matchedDrugs.length === rule.drugs.length) {
            detectedAlerts.push({
              title: rule.title,
              severity: rule.severity,
              involved_drugs: rule.drugs,
              mechanism: rule.mechanism,
              management: rule.management
            });
          } else if (rule.drugs.length === 1 && matchedDrugs.length === 1 && rule.condition_keyword) {
            if (context.includes(rule.condition_keyword)) {
              detectedAlerts.push({
                title: rule.title,
                severity: rule.severity,
                involved_drugs: rule.drugs,
                contraindicated_condition: rule.condition_keyword,
                mechanism: rule.mechanism,
                management: rule.management
              });
            }
          }
        }

        return {
          ok: true,
          screened_medications: meds,
          clinical_context: context || "Standard adult physiology",
          total_alerts: detectedAlerts.length,
          alerts: detectedAlerts,
          summary: detectedAlerts.length === 0
            ? "No severe pharmacodynamic or CYP450 interactions detected in the current catalog."
            : `Identified ${detectedAlerts.length} significant pharmacological alert(s). Review required before administration.`
        };
      }
    };
  }

  static getMonographAction() {
    return {
      name: "get_drug_monograph",
      description: "Retrieve complete pharmacokinetics, CYP450 metabolism profile, and black box warnings for a specific drug.",
      effect: "read",
      inputSchema: {
        type: "object",
        properties: {
          drug_name: {
            type: "string",
            description: "Generic drug name (e.g. 'Metformin', 'Valproic Acid', 'Clopidogrel')."
          }
        },
        required: ["drug_name"],
        additionalProperties: false
      },
      execute: async (args) => {
        const key = (args.drug_name || "").toUpperCase().trim();
        const entry = DRUG_CATALOG[key];
        if (!entry) {
          return {
            ok: false,
            found: false,
            reason: `Drug '${key}' not found. Catalog contains: ${Object.keys(DRUG_CATALOG).join(", ")}.`,
            catalog: Object.keys(DRUG_CATALOG)
          };
        }
        return {
          ok: true,
          found: true,
          monograph: entry
        };
      }
    };
  }
}
