// Genomics Node UI Script
export class GenomicsApp {
  static init() {
    const searchBtn = document.querySelector("#variant-search-btn");
    const geneInput = document.querySelector("#gene-input");
    const variantInput = document.querySelector("#variant-input");
    const resultsBox = document.querySelector("#variant-results");

    if (searchBtn && geneInput && resultsBox) {
      searchBtn.addEventListener("click", () => {
        const gene = geneInput.value.trim().toUpperCase();
        const variant = variantInput ? variantInput.value.trim() : "";
        if (!gene) return;

        resultsBox.innerHTML = `
          <div class="result-card loading">
            <span class="spinner"></span> Querying genomic registry for <strong>${gene} ${variant}</strong>...
          </div>
        `;

        setTimeout(async () => {
          const { SiteActions } = await import("./site-actions.js");
          const tool = SiteActions.lookupVariantAction();
          const data = await tool.execute({ gene, variant });

          if (!data.found) {
            resultsBox.innerHTML = `
              <div class="result-card error">
                <h4>No Record Found</h4>
                <p>${data.reason}</p>
              </div>
            `;
            return;
          }

          if (data.variant) {
            const v = data.variant;
            resultsBox.innerHTML = `
              <div class="result-card success">
                <div class="badge-row">
                  <span class="badge ${v.classification.toLowerCase().includes('pathogenic') ? 'badge-danger' : 'badge-info'}">${v.classification}</span>
                  <span class="badge badge-neutral">${data.chromosome}</span>
                  <span class="badge badge-neutral">${data.inheritance}</span>
                </div>
                <h3>${data.gene} (${v.hgvs_c} - ${v.hgvs_p})</h3>
                <p class="condition"><strong>Condition:</strong> ${data.condition}</p>
                <div class="detail-block">
                  <p><strong>Enzyme Mechanism:</strong> ${v.mechanism}</p>
                  <p><strong>Metabolic Pathway:</strong> ${v.metabolic_impact}</p>
                  <p><strong>Clinical Risk:</strong> ${v.clinical_manifestations}</p>
                  <p><strong>Pharmacogenomic Warning:</strong> ${v.pharmacogenomic_vulnerabilities}</p>
                </div>
                <div class="citations">Evidence: ${v.evidence_citations.join(" • ")}</div>
              </div>
            `;
          } else {
            resultsBox.innerHTML = `
              <div class="result-card info">
                <h3>${data.gene} (${data.condition})</h3>
                <p>Location: ${data.chromosome} | Inheritance: ${data.inheritance}</p>
                <p>Catalogued variants available for query: ${Object.keys(data.catalogued_variants).join(", ")}</p>
              </div>
            `;
          }
        }, 300);
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  GenomicsApp.init();
});
