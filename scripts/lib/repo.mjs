import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..", "..");

export function readText(relPath) {
  return readFileSync(path.join(ROOT, relPath), "utf8");
}

export function git(args, { ignoreError = false } = {}) {
  try {
    return execFileSync("git", args, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    if (ignoreError) return "";
    const stderr = error.stderr?.toString?.() ?? "";
    throw new Error(`git ${args.join(" ")} failed: ${stderr || error.message}`);
  }
}

export function parseGithubRemote(url) {
  if (!url) return null;
  const cleaned = url.trim().replace(/\|.*$/, "");
  const ssh = cleaned.match(/^git@github\.com:([^/]+)\/([^/.]+)(?:\.git)?$/i);
  if (ssh) return { owner: ssh[1], name: ssh[2] };
  // https://github.com/owner/repo[.git]
  // https://x-access-token:token@github.com/owner/repo[.git]
  // https://token@github.com/owner/repo[.git]
  const https = cleaned.match(
    /^https?:\/\/(?:[^@/\s]+@)?github\.com\/([^/]+)\/([^/.]+)(?:\.git)?\/?$/i,
  );
  if (https) return { owner: https[1], name: https[2] };
  return null;
}

export function expectedRemoteFromEnvOrGit() {
  const fromEnv = process.env.EXPECTED_REMOTE?.trim();
  if (fromEnv) {
    const parsed = parseGithubRemote(fromEnv.includes("github.com") ? fromEnv : `https://github.com/${fromEnv}`);
    if (parsed) return parsed;
  }
  const serverOwner = process.env.GITHUB_REPOSITORY_OWNER;
  const serverRepo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (serverOwner && serverRepo) return { owner: serverOwner, name: serverRepo };

  const origin = git(["remote", "get-url", "origin"], { ignoreError: true });
  return parseGithubRemote(origin);
}
