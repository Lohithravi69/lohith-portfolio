# Fetch Lighthouse artifact

This folder contains a small script to fetch the Lighthouse HTML artifact produced by the CI workflow.

Prerequisites
- Node.js 18+ (the script uses global fetch present in Node 18+)
- A GitHub Personal Access Token (PAT) with repo access (or a token with `repo`/`actions:read` scope)

Usage

Set the token via environment variable `GITHUB_TOKEN` and run the script. Example:

```powershell
$env:GITHUB_TOKEN = 'ghp_...'
node scripts/fetch-lighthouse-artifact.js --owner Lohithravi69 --repo lohith-portfolio --workflow run-lighthouse.yml --branch blackboxai/fix-github-actions-versions
```

What it does
- Finds the latest successful (or most recent) workflow run for the specified workflow file on the branch.
- Looks for artifacts attached to that run and picks one containing "lighthouse" in its name (case-insensitive), or the first artifact if none match.
- Downloads the artifact ZIP to `./tmp-lh-artifact-download/`.

Notes
- The script is intentionally small and dependency-free. If your environment does not have Node 18+, install Node 18 or later.
- You can also download artifacts manually from the Actions UI if you prefer not to provide a token.
