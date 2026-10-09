#!/usr/bin/env node
/** Validate .lakehouse/org.json domain / packageScope invariants. */
import { loadOrg, publicBaseUrl } from "./lib/org.mjs";

function main() {
  const org = loadOrg();
  if (/\.github\.io$/i.test(org.domain)) {
    console.error("org: domain must not be github.io");
    process.exit(1);
  }
  console.log(
    `OK org: brand=${org.brand} scope=${org.packageScope} domain=${publicBaseUrl(org)} ownerField=${org.orgName}`,
  );
}

main();
