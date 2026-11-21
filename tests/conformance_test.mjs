// Automated Conformance Test Suite for TripSteward Open Agentic Web Cluster
// Validates manifests, declarative JSON networks, peer link mappings, and site-action schemas across all 3 nodes.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

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
console.log("✈️  Running TripSteward Open Agentic Web Conformance Test Suite");
console.log("========================================================\n");

// 1. Validate Manifests
console.log("1. Validating Agent Manifests (agent-manifest.json)...");
const siteDirs = ["tripsteward-hub", "cityglide-node", "metropass-node"];

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
  { dir: "tripsteward-hub", file: "tripsteward_concierge.network.json", frontAgent: "travel_concierge" },
  { dir: "cityglide-node", file: "cityglide_transfer.network.json", frontAgent: "transfer_dispatcher" },
  { dir: "metropass-node", file: "metropass_experiences.network.json", frontAgent: "experience_curator" }
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
const linksPath = join(rootDir, "sites", "tripsteward-hub", "links.json");
assert(existsSync(linksPath), "tripsteward-hub contains links.json");
const links = JSON.parse(readFileSync(linksPath, "utf-8"));
assert(links.networks && links.networks.tripsteward_concierge, "links.json configures tripsteward_concierge network");
assert(links.networks.tripsteward_concierge.cityglide && links.networks.tripsteward_concierge.metropass, "links.json maps both cityglide and metropass peers");

// 4. Test Site Actions (Tool Execution & Schemas)
console.log("\n4. Testing Site Actions & Grounded Booking Vaults...");

// Mock minimal DOM for script.js / site-actions.js in Node
globalThis.window = {
  location: { origin: "http://localhost:8080" }
};
globalThis.document = {
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};

async function testActions() {
  // Test CityGlide Node Actions
  const cityglideActionsUrl = pathToFileURL(join(rootDir, "sites", "cityglide-node", "site-actions.js")).href;
  const { SiteActions: CityGlideActions } = await import(cityglideActionsUrl);

  const quoteTool = CityGlideActions.quoteTransferServiceAction();
  const quoteResult = await quoteTool.execute({
    destination: "HarborView Hotel, 450 Waterfront Blvd",
    pickup_time: "4:30 PM",
    flight_number: "UA 482",
    passengers: 2
  });
  assert(quoteResult.options.length >= 2, "CityGlide quotes multiple vehicle classes");
  assert(quoteResult.calculated_pickup_time.includes("5:00 PM"), "CityGlide computes 30-min arrival buffer");
  assert(quoteResult.options[0].fare_usd === 68, "CityGlide Executive EV Sedan has verified $68 direct rate");

  const scheduleTool = CityGlideActions.scheduleAirportTransferAction();
  const scheduleResult = await scheduleTool.execute({
    vehicle_class: "Executive EV Sedan",
    passenger_name: "Dr. Rachel Chen",
    pickup_location: "SFO Terminal 2 Curbside",
    dropoff_location: "HarborView Hotel, 450 Waterfront Blvd",
    pickup_time: "5:00 PM",
    flight_number: "UA 482"
  });
  assert(scheduleResult.success === true, "CityGlide schedules airport transfer");
  assert(scheduleResult.transfer_id.startsWith("CG-TRANS-"), "CityGlide issues unique transfer ID");
  assert(scheduleResult.driver_assigned.length > 0, "CityGlide assigns professional driver");

  const fleetTool = CityGlideActions.getFleetStatusAction();
  const fleetResult = await fleetTool.execute({});
  assert(fleetResult.fleet_inventory.length >= 4, "CityGlide reports 4 active standby vehicles");

  // Test MetroPass Node Actions
  const metroActionsUrl = pathToFileURL(join(rootDir, "sites", "metropass-node", "site-actions.js")).href;
  const { SiteActions: MetroPassActions } = await import(metroActionsUrl);

  const searchTool = MetroPassActions.searchExperiencesAction();
  const searchResult = await searchTool.execute({ city: "San Francisco", category: "sailing" });
  assert(searchResult.matched_count >= 1, "MetroPass searches experiences by city & category");
  assert(searchResult.experiences[0].title.includes("Sunset Catamaran"), "MetroPass returns sunset catamaran sail");

  const bookPassTool = MetroPassActions.bookExperiencePassAction();
  const passResult = await bookPassTool.execute({
    experience_id: "EXP-SF-01",
    attendee_name: "Dr. Rachel Chen",
    tickets: 2
  });
  assert(passResult.success === true, "MetroPass issues experience pass voucher");
  assert(passResult.pass_code.startsWith("MP-PASS-"), "MetroPass generates scannable pass code");
  assert(passResult.total_price_usd === 158, "MetroPass calculates direct total price correctly ($79 x 2 = $158)");

  // Test TripSteward Hub Actions
  const hubActionsUrl = pathToFileURL(join(rootDir, "sites", "tripsteward-hub", "site-actions.js")).href;
  const { SiteActions: HubActions } = await import(hubActionsUrl);

  const getPrefTool = HubActions.getTripPreferencesAction();
  const pref = await getPrefTool.execute();
  assert(pref.destination.includes("San Francisco"), "TripSteward retrieves active traveler preferences");
  assert(pref.target_budget_usd > 0, `TripSteward gets traveler target budget ($${pref.target_budget_usd})`);

  const hotelTool = HubActions.reserveHotelRoomAction();
  const hotelRes = await hotelTool.execute({
    room_tier: "Deluxe Bay-View Queen",
    nightly_rate_usd: 189,
    nights: 2,
    guest_names: "Dr. Rachel Chen",
    amenities_included: ["Complimentary Artisan Breakfast", "High-Speed Wi-Fi", "Late Check-out 1 PM"]
  });
  assert(hotelRes.ok === true, "TripSteward holds hotel room reservation");
  assert(hotelRes.total_stay_cost === 378, "TripSteward computes room charges ($189 x 2 = $378)");

  const bookTransferTool = HubActions.bookAirportTransferAction();
  const transRes = await bookTransferTool.execute({
    pickup_location: "SFO Terminal 2 - Flight UA 482",
    dropoff_location: "HarborView Hotel, 450 Waterfront Blvd",
    vehicle_class: "Executive EV Sedan",
    pickup_time: "5:00 PM (Flight buffer +30m)",
    fare_usd: 68
  });
  assert(transRes.ok === true, "TripSteward confirms partner airport transfer");
  assert(transRes.transfer_booking_id.startsWith("RIDE-"), "TripSteward registers ride booking reference ID");

  const bookExpTool = HubActions.bookCityExperienceAction();
  const expRes = await bookExpTool.execute({
    experience_name: "Golden Gate Sunset Catamaran Cruise",
    scheduled_slot: "Saturday, 6:00 PM - 8:00 PM",
    tickets_count: 2,
    total_price_usd: 158,
    special_notes: "Boarding at Pier 39, Marina Gate B"
  });
  assert(expRes.ok === true, "TripSteward confirms partner experience tickets");
  assert(expRes.experience_pass_id.startsWith("PASS-"), "TripSteward registers experience voucher reference ID");

  const masterTool = HubActions.compileMasterItineraryAction();
  const masterRes = await masterTool.execute({
    trip_title: "San Francisco Waterfront & Sunset Getaway",
    destination: "San Francisco, CA",
    dates: "Nov 27 - Nov 29, 2026",
    total_cost_usd: 604,
    direct_savings_usd: 142,
    itinerary_highlights: [
      "HarborView Hotel: Deluxe Bay-View Queen (2 nights)",
      "CityGlide Transfer: Executive EV Sedan from SFO",
      "MetroPass Experience: Golden Gate Sunset Catamaran Cruise (2 passes)"
    ],
    concierge_notes: "Curbside chauffeur will meet flight UA 482 at 5:00 PM. Sunset sail departs Saturday 6 PM from Pier 39."
  });
  assert(masterRes.ok === true && masterRes.status === "COMMITTED_TO_CLIENT_SESSION", "TripSteward compiles and seals master itinerary");
  assert(masterRes.itinerary_id.startsWith("ITIN-"), "TripSteward generates sealed itinerary ID");

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
