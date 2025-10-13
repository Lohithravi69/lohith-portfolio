param(
    [string]$Repo = 'Lohithravi69/lohith-portfolio',
    [int]$PrNumber = 1,
    [int]$Attempts = 30,
    [int]$IntervalSec = 12
)
for ($i = 0; $i -lt $Attempts; $i++) {
    try {
        $merged = gh pr view $PrNumber --repo $Repo --json merged --jq .merged 2>$null
    } catch {
        $merged = $null
    }
    if ($merged -eq 'true') {
        Write-Output "MERGED"
        exit 0
    }
    Write-Output "Not merged yet (attempt $($i+1)/$Attempts). Waiting $IntervalSec seconds..."
    Start-Sleep -Seconds $IntervalSec
}
Write-Output "TIMED OUT: PR not merged after $Attempts attempts.";
exit 2
