// Automated Specification Conformance & Tool Verification Test
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log("\n========================================================");
console.log("🧪 Running Aegis Open Agentic Web Conformance Test Suite");
console.log("========================================================\n");

// 1. Validate Manifests
console.log("1. Validating Agent Manifests (agent-manifest.json)...");
const siteDirs = ["aegis-hub", "genomics-node", "pharmasafe-node"];

for (const dir of siteDirs) {
  const manifestPath = join(rootDir, "sites", dir, "agent-manifest.json");
  assert(existsSync(manifestPath), `${dir} has agent-manifest.json`);

  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  assert(Array.isArray(manifest.networks) && manifest.networks.length > 0, `${dir} declares at least one network`);

  const net = manifest.networks[0];
  assert(typeof net.name === "string" && net.name.length > 0, `${dir} network has a valid name (${net.name})`);
  assert(typeof net.front_man === "string" && net.front_man.length > 0, `${dir} network declares front_man (${net.front_man})`);
  assert(typeof net.hocon === "string", `${dir} network points to hocon/json path (${net.hocon})`);

  assert(manifest.llm_router && manifest.llm_router.base_url, `${dir} declares llm_router with base_url`);
  assert(manifest.actions && Array.isArray(manifest.actions.agentTools), `${dir} declares registered agentTools`);
  assert(existsSync(join(rootDir, "sites", dir, "bridge", "action-bridge.html")), `${dir} contains bridge/action-bridge.html`);
}

// 2. Validate Network JSON Definitions
console.log("\n2. Validating Declarative Network JSON Graphs...");
const networkFiles = [
  { dir: "aegis-hub", file: "aegis_coordinator.network.json", frontAgent: "chief_physician" },
  { dir: "genomics-node", file: "genomics_node.network.json", frontAgent: "genomics_specialist" },
  { dir: "pharmasafe-node", file: "pharmasafe_node.network.json", frontAgent: "pharmacology_specialist" }
];

for (const item of networkFiles) {
  const netPath = join(rootDir, "sites", item.dir, item.file);
  assert(existsSync(netPath), `${item.dir} contains ${item.file}`);

  const net = JSON.parse(readFileSync(netPath, "utf-8"));
  assert(Array.isArray(net.tools) && net.tools.length > 0, `${item.file} contains tools array`);

  const agent = net.tools.find(t => t.name === item.frontAgent);
  assert(agent !== undefined, `${item.file} defines front agent '${item.frontAgent}'`);
  assert(agent && typeof agent.instructions === "string" && agent.instructions.length > 50, `${item.frontAgent} has non-trivial grounded instructions`);
  assert(agent && agent.function && agent.function.parameters, `${item.frontAgent} declares input schema parameters`);
}

// 3. Validate Links Map
console.log("\n3. Validating Peer Links Mapping (links.json)...");
const linksPath = join(rootDir, "sites", "aegis-hub", "links.json");
assert(existsSync(linksPath), "aegis-hub contains links.json");
const links = JSON.parse(readFileSync(linksPath, "utf-8"));
assert(links.networks && links.networks.aegis_coordinator, "links.json configures aegis_coordinator network");
assert(links.networks.aegis_coordinator.genomics && links.networks.aegis_coordinator.pharmasafe, "links.json maps both genomics and pharmasafe peers");

// 4. Test Site Actions (Tool Execution & Schemas)
console.log("\n4. Testing Site Actions & Grounded Knowledge Bases...");

// Mock minimal DOM for script.js / site-actions.js in Node
globalThis.document = {
  querySelector: () => null,
  addEventListener: () => {}
};

async function testActions() {
  // Test Genomics Node Actions
  const genomicsActionsUrl = pathToFileURL(join(rootDir, "sites", "genomics-node", "site-actions.js")).href;
  const { SiteActions: GenomicsActions } = await import(genomicsActionsUrl);
  const lookupTool = GenomicsActions.lookupVariantAction();

  const pdha1Result = await lookupTool.execute({ gene: "PDHA1", variant: "c.1145C>T" });
  assert(pdha1Result.ok === true && pdha1Result.found === true, "Genomics tool successfully looks up PDHA1 c.1145C>T");
  assert(pdha1Result.variant.classification === "Pathogenic", "PDHA1 correctly classified as Pathogenic");
  assert(pdha1Result.variant.evidence_citations.length > 0, "PDHA1 provides citations");

  const dpydResult = await lookupTool.execute({ gene: "DPYD", variant: "*2A" });
  assert(dpydResult.ok === true && dpydResult.variant.classification.includes("Pathogenic"), "Genomics tool resolves DPYD *2A");

  // Test PharmaSafe Node Actions
  const pharmaActionsUrl = pathToFileURL(join(rootDir, "sites", "pharmasafe-node", "site-actions.js")).href;
  const { SiteActions: PharmaActions } = await import(pharmaActionsUrl);
  const drugCheckTool = PharmaActions.checkInteractionsAction();

  const drugResult = await drugCheckTool.execute({
    medications: ["Valproic Acid", "Metformin"],
    clinical_context: "PDHA1 deficiency"
  });
  assert(drugResult.ok === true, "PharmaSafe tool executes drug interaction screening");
  assert(drugResult.total_alerts >= 2, `PharmaSafe detected ${drugResult.total_alerts} alerts (Expected >= 2 for Valproate+PDHA1 and Metformin)`);
  assert(drugResult.alerts.some(a => a.severity.includes("Critical")), "PharmaSafe flags Critical severity for Valproate in PDHA1 context");

  // Test Aegis Hub Actions
  const hubActionsUrl = pathToFileURL(join(rootDir, "sites", "aegis-hub", "site-actions.js")).href;
  const { SiteActions: HubActions } = await import(hubActionsUrl);

  const getRecordTool = HubActions.getPatientRecordAction();
  const record = await getRecordTool.execute();
  assert(record.case_id.includes("AG-8492"), "Aegis Hub retrieves active patient record AG-8492 from vault");
  assert(record.biomarkers.length >= 4, "Active patient record contains rich laboratory biomarkers");
  assert(record.genomic_variants.length >= 1, "Active patient record contains genomic variants");

  const flagTool = HubActions.flagContraindicationAction();
  const flagResult = await flagTool.execute({
    severity: "CRITICAL",
    target: "Valproic Acid",
    conflict_with: "PDHA1 deficiency",
    clinical_rationale: "Impairs pyruvate oxidation and depletes mitochondrial carnitine.",
    recommended_action: "Discontinue immediately and substitute Levetiracetam."
  });
  assert(flagResult.ok === true, "Aegis Hub flags contraindication successfully");

  const dossierTool = HubActions.generateDossierAction();
  const dossierResult = await dossierTool.execute({
    primary_etiology: "Pyruvate Dehydrogenase E1-alpha Deficiency (PDHD)",
    diagnostic_confidence: "HIGH",
    genomic_findings_summary: "Confirmed pathogenic mutation PDHA1 c.1145C>T causing severe E1-alpha catalytic failure.",
    pharmacological_findings_summary: "Valproic acid poses acute life-threatening mitochondrial toxicity; Metformin exacerbates lactic flux.",
    urgent_interventions: [
      "Immediate cessation of Valproic Acid",
      "Avoid IV dextrose infusions",
      "Initiate ketogenic metabolic therapy with thiamine"
    ],
    physician_discussion_notes: "Discuss emergency protocol letter and confirm blood lactate/pyruvate ratio."
  });
  assert(dossierResult.ok === true && dossierResult.status === "COMMITTED_TO_CLIENT_SESSION", "Aegis Hub generates sealed consensus dossier");

  console.log("\n========================================================");
  console.log(`Test Summary: ${passed} passed, ${failed} failed.`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

testActions().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
