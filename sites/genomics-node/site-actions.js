// Genomics Node Site Actions
// Exposes genomic knowledge base and variant lookup capabilities.

const GENOMIC_CATALOG = {
  "PDHA1": {
    gene: "PDHA1",
    chromosome: "Xp22.12",
    condition: "Pyruvate Dehydrogenase E1-alpha Deficiency (PDHD)",
    inheritance: "X-linked dominant",
    variants: {
      "c.1145C>T": {
        hgvs_c: "c.1145C>T",
        hgvs_p: "p.Pro382Leu",
        rsid: "rs1555588320",
        classification: "Pathogenic",
        mechanism: "Disrupts thiamine pyrophosphate (TPP) cofactor binding domain, decreasing pyruvate dehydrogenase complex activity to <15% of normal.",
        metabolic_impact: "Impaired conversion of pyruvate to acetyl-CoA, triggering severe lactic acidosis, tricarboxylic acid cycle collapse, and energy starvation in neural tissues.",
        clinical_manifestations: "Neuromuscular weakness, developmental delay, intermittent ataxia, progressive encephalopathy.",
        pharmacogenomic_vulnerabilities: "Extreme vulnerability to metabolic stressors. General anesthesia and standard IV glucose infusions may precipitate life-threatening lactic crises. Ketogenic diet and thiamine supplementation are indicated.",
        evidence_citations: ["ClinVar:RCV000782319", "OMIM:312170", "GeneReviews:PDHA1"]
      }
    }
  },
  "DPYD": {
    gene: "DPYD",
    chromosome: "1p21.3",
    condition: "Dihydropyrimidine Dehydrogenase Deficiency",
    inheritance: "Autosomal recessive",
    variants: {
      "*2A": {
        hgvs_c: "c.1905+1G>A",
        hgvs_p: "Splice donor variant (Exon 14 skipping)",
        rsid: "rs3918290",
        classification: "Pathogenic (CPIC Level 1A)",
        mechanism: "Completely abolishes dihydropyrimidine dehydrogenase enzymatic activity.",
        metabolic_impact: "Inability to catabolize 5-fluorouracil (5-FU) and capecitabine, leading to lethal cytotoxic drug accumulation.",
        clinical_manifestations: "Severe myelosuppression, mucositis, neurotoxicity upon standard dose fluoropyrimidine administration.",
        pharmacogenomic_vulnerabilities: "Absolute contraindication to full-dose 5-FU/capecitabine. Requires >=50% dose reduction or alternative therapy.",
        evidence_citations: ["CPIC Guideline 2024", "ClinVar:RCV000008453"]
      }
    }
  },
  "CYP2C19": {
    gene: "CYP2C19",
    chromosome: "10q23.33",
    condition: "Cytochrome P450 2C19 Poor Metabolizer",
    inheritance: "Co-dominant",
    variants: {
      "*2": {
        hgvs_c: "c.681G>A",
        hgvs_p: "Aberrant splice site",
        rsid: "rs4244285",
        classification: "Pathogenic / Decreased Function",
        mechanism: "Produces truncated, non-functional CYP2C19 enzyme.",
        metabolic_impact: "Significantly decreased bioactivation of prodrugs (e.g. clopidogrel) and delayed clearance of substrates (e.g. omeprazole, diazepam, voriconazole).",
        clinical_manifestations: "High risk of adverse cardiovascular ischemic events due to clopidogrel resistance.",
        pharmacogenomic_vulnerabilities: "Recommend prasugrel or ticagrelor instead of clopidogrel.",
        evidence_citations: ["CPIC Guideline for Clopidogrel", "PharmGKB:PA124"]
      }
    }
  }
};

export class SiteActions {
  static registerActions(actions) {
    actions.register(SiteActions.lookupVariantAction());
    actions.register(SiteActions.getKnowledgeBaseAction());
  }

  static lookupVariantAction() {
    return {
      name: "lookup_genomic_variant",
      description: "Look up pathogenicity classification, metabolic mechanisms, affected enzymes, and clinical implications for a gene or specific genomic variant (e.g. PDHA1 c.1145C>T, DPYD *2A, CYP2C19 *2).",
      effect: "read",
      inputSchema: {
        type: "object",
        properties: {
          gene: {
            type: "string",
            description: "Official HGNC gene symbol (e.g. 'PDHA1', 'DPYD', 'CYP2C19')."
          },
          variant: {
            type: "string",
            description: "Optional HGVS cDNA or protein notation or star allele (e.g. 'c.1145C>T', '*2A')."
          }
        },
        required: ["gene"],
        additionalProperties: false
      },
      execute: async (args) => {
        const geneUpper = (args.gene || "").toUpperCase().trim();
        const geneEntry = GENOMIC_CATALOG[geneUpper];
        if (!geneEntry) {
          return {
            ok: false,
            found: false,
            reason: `Gene '${geneUpper}' not indexed in the curated Rare Genomics catalog. Available genes: ${Object.keys(GENOMIC_CATALOG).join(", ")}.`,
            available_genes: Object.keys(GENOMIC_CATALOG)
          };
        }

        if (args.variant) {
          const varTrimmed = args.variant.trim();
          const matchedVariant = geneEntry.variants[varTrimmed];
          if (matchedVariant) {
            return {
              ok: true,
              found: true,
              gene: geneEntry.gene,
              chromosome: geneEntry.chromosome,
              condition: geneEntry.condition,
              inheritance: geneEntry.inheritance,
              variant: matchedVariant
            };
          }
        }

        return {
          ok: true,
          found: true,
          gene: geneEntry.gene,
          chromosome: geneEntry.chromosome,
          condition: geneEntry.condition,
          inheritance: geneEntry.inheritance,
          catalogued_variants: geneEntry.variants
        };
      }
    };
  }

  static getKnowledgeBaseAction() {
    return {
      name: "get_genomics_knowledge_base",
      description: "List all indexed genes, metabolic disorder pathways, and reference authorities provided by the Rare Genomics Institute.",
      effect: "read",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false
      },
      execute: async () => {
        return {
          ok: true,
          institute: "Rare Genomics Institute",
          version: "2026.3",
          coverage: "Inborn Errors of Metabolism & High-Penetrance Pharmacogenomics",
          indexed_genes: Object.keys(GENOMIC_CATALOG).map(g => ({
            gene: g,
            condition: GENOMIC_CATALOG[g].condition,
            variants_count: Object.keys(GENOMIC_CATALOG[g].variants).length
          }))
        };
      }
    };
  }
}
