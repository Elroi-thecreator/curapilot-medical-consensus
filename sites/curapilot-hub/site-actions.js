// CuraPilot Hub Site Actions
// Exposes local EHR vault state, contraindication alerts, and dossier generation.
import { CuraPilotApp } from "./script.js";

export class SiteActions {
  static registerActions(actions) {
    actions.register(SiteActions.getPatientRecordAction());
    actions.register(SiteActions.flagContraindicationAction());
    actions.register(SiteActions.generateDossierAction());
  }

  static getPatientRecordAction() {
    return {
      name: "get_patient_clinical_record",
      description: "Retrieve the active patient case from the sovereign browser memory vault, including de-identified demographics, clinical presentation, laboratory biomarkers, genomic variants, and active medications. Data never leaves browser RAM.",
      effect: "read",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false
      },
      execute: async () => {
        return CuraPilotApp.vault.getActiveRecord();
      }
    };
  }

  static flagContraindicationAction() {
    return {
      name: "flag_clinical_contraindication",
      description: "Flag an urgent medication contraindication, genetic vulnerability, or life-threatening drug-disease interaction in the patient's local clinical dashboard.",
      effect: "write",
      inputSchema: {
        type: "object",
        properties: {
          severity: {
            type: "string",
            enum: ["CRITICAL", "MAJOR", "MODERATE"],
            description: "Clinical severity classification."
          },
          target: {
            type: "string",
            description: "Drug or intervention involved (e.g. 'Valproic Acid', 'IV Dextrose', 'Clopidogrel')."
          },
          conflict_with: {
            type: "string",
            description: "Contradictory mutation or condition (e.g. 'PDHA1 c.1145C>T deficiency', 'CYP2C19 *2 poor metabolizer')."
          },
          clinical_rationale: {
            type: "string",
            description: "Biochemical and physiological rationale for the contraindication."
          },
          recommended_action: {
            type: "string",
            description: "Recommended substitute medication or clinical management."
          }
        },
        required: ["severity", "target", "conflict_with", "clinical_rationale", "recommended_action"],
        additionalProperties: false
      },
      execute: async (args) => {
        return CuraPilotApp.vault.addContraindication(args);
      }
    };
  }

  static generateDossierAction() {
    return {
      name: "generate_consensus_dossier",
      description: "Compile and save the final multidisciplinary clinical consensus report into the patient's local session, complete with primary diagnosis, evidence citations, and recommended clinical actions.",
      effect: "irreversible",
      inputSchema: {
        type: "object",
        properties: {
          primary_etiology: {
            type: "string",
            description: "Primary suspected disease or syndrome name (e.g. 'Pyruvate Dehydrogenase E1-alpha Deficiency')."
          },
          diagnostic_confidence: {
            type: "string",
            enum: ["HIGH", "MODERATE", "PROVISIONAL"],
            description: "Consensus diagnostic confidence level."
          },
          genomic_findings_summary: {
            type: "string",
            description: "Summary of genomic specialist findings and mutation impact."
          },
          pharmacological_findings_summary: {
            type: "string",
            description: "Summary of pharmacology specialist interaction screening and contraindications."
          },
          urgent_interventions: {
            type: "array",
            items: { type: "string" },
            description: "Immediate clinical actions (e.g. ['Discontinue Valproic Acid immediately', 'Initiate ketogenic metabolic therapy', 'Order confirmatory blood pyruvate/lactate ratio'])."
          },
          physician_discussion_notes: {
            type: "string",
            description: "Key points for the patient or caregiver to present to their attending physician."
          }
        },
        required: ["primary_etiology", "diagnostic_confidence", "genomic_findings_summary", "pharmacological_findings_summary", "urgent_interventions", "physician_discussion_notes"],
        additionalProperties: false
      },
      execute: async (args) => {
        return CuraPilotApp.vault.saveConsensusDossier(args);
      }
    };
  }
}
