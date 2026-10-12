param(
  [ValidateRange(1024, 65535)]
  [int]$Port = 5173
)

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = Get-Command node -ErrorAction SilentlyContinue

if (-not $node) {
  Write-Error "Node.js 24 or newer is required. Install Node.js and try again."
  exit 1
}

Set-Location $projectRoot
$env:PORT = $Port
Write-Host "NexusCampus AI is available at http://localhost:$Port"
& node server.mjs
