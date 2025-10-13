param(
    [string]$Repo = 'Lohithravi69/lohith-portfolio',
    [int]$PrNumber = 1,
    [int]$Attempts = 120,
    [int]$IntervalSec = 12
)

Write-Output "Starting auto-validate: poll PR #$PrNumber in $Repo (up to $Attempts attempts every $IntervalSec s)"

for ($i = 0; $i -lt $Attempts; $i++) {
    try {
        $merged = gh pr view $PrNumber --repo $Repo --json merged --jq .merged 2>$null
    } catch {
        $merged = $null
    }

    if ($merged -eq 'true') {
        Write-Output "PR #$PrNumber merged - proceeding to trigger Lighthouse CI on main"
        break
    }

    Write-Output "Not merged yet (attempt $($i+1)/$Attempts). Waiting $IntervalSec seconds..."
    Start-Sleep -Seconds $IntervalSec
}

if ($merged -ne 'true') {
    Write-Error "Timed out waiting for PR merge after $Attempts attempts. Exiting."
    exit 2
}

# Trigger Lighthouse CI workflow on main
Write-Output "Triggering Lighthouse workflow on 'main'"
gh workflow run lighthouse-ci.yml --repo $Repo --ref main

# Find the latest run for the workflow on main
Start-Sleep -Seconds 6
Write-Output "Locating the new workflow run..."
$runsJson = gh run list --repo $Repo --workflow "lighthouse-ci.yml" --limit 10 --json databaseId,headBranch,conclusion,status,createdAt
$runs = $runsJson | ConvertFrom-Json
$run = $runs | Where-Object { $_.headBranch -eq 'main' } | Sort-Object -Property createdAt -Descending | Select-Object -First 1

if (-not $run) {
    Write-Error "Could not find the workflow run on main. Exiting."
    exit 3
}

$runId = $run.databaseId
Write-Output "Found run ID: $runId - waiting for it to complete"

# Wait for run to finish
gh run watch --repo $Repo $runId

Write-Output "Run completed - downloading artifact 'lighthouse-report'"
try {
    gh run download --repo $Repo $runId --name lighthouse-report --dir .\tmp-lh-artifact-main
    Write-Output "Artifact downloaded to .\tmp-lh-artifact-main"
} catch {
    Write-Warning "Failed to download artifact via gh; attempting to list artifacts and pick latest..."
    $artifactsJson = gh api repos/$($Repo)/actions/runs/$runId/artifacts
    Write-Output "Artifacts JSON: $artifactsJson"
}

Write-Output "Auto-validate completed."
exit 0
