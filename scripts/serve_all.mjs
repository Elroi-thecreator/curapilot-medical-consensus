// Multi-Site Local Development Server for Open Agentic Web Challenge
// Serves aegis-hub (8080), genomics-node (8081), and pharmasafe-node (8082) concurrently with CORS enabled.

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const serveScript = join(__dirname, "serve_site.mjs");

const sites = [
  { name: "Aegis Hub (Main App)", dir: join(rootDir, "sites", "aegis-hub"), port: 8080 },
  { name: "Rare Genomics Node", dir: join(rootDir, "sites", "genomics-node"), port: 8081 },
  { name: "PharmaSafe Lab Node", dir: join(rootDir, "sites", "pharmasafe-node"), port: 8082 }
];

console.log("=========================================================");
console.log("🛡️  Starting Aegis Multi-Site Open Agentic Web Cluster");
console.log("=========================================================\n");

const processes = [];

for (const site of sites) {
  console.log(`Starting ${site.name} on port ${site.port}...`);
  const proc = spawn(
    process.execPath,
    [serveScript, site.dir, "--port", String(site.port), "--host", "127.0.0.1"],
    { stdio: "inherit" }
  );

  processes.push(proc);
}

console.log("\nAll sites running:");
console.log("👉 Aegis Hub:       http://localhost:8080/");
console.log("👉 Genomics Node:   http://localhost:8081/");
console.log("👉 PharmaSafe Node: http://localhost:8082/");
console.log("\nPress Ctrl+C to terminate all servers.\n");

function cleanup() {
  console.log("\nShutting down servers...");
  for (const proc of processes) {
    proc.kill();
  }
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
