<#
.SYNOPSIS
  Uninstall Skills previously installed by yihang-design-pilot install.ps1.

.DESCRIPTION
  Only removes directories that contain .ydp-installed.json written by install.ps1.
  Never deletes unrelated user skills.
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
  [Parameter(Mandatory = $true)]
  [string]$TargetRoot,

  [string]$Skill = ""
)

$ErrorActionPreference = "Stop"
if (-not (Test-Path $TargetRoot)) {
  throw "TargetRoot not found: $TargetRoot"
}

$candidates = Get-ChildItem -Path $TargetRoot -Recurse -Filter ".ydp-installed.json" -File -ErrorAction SilentlyContinue
if (-not $candidates) {
  Write-Host "No yihang-design-pilot install markers found under $TargetRoot"
  exit 0
}

foreach ($marker in $candidates) {
  $skillDir = $marker.Directory.FullName
  $meta = Get-Content $marker.FullName -Raw | ConvertFrom-Json
  if ($Skill -and $meta.name -ne $Skill) { continue }
  if ($PSCmdlet.ShouldProcess($skillDir, "Remove ydp-installed skill")) {
    Remove-Item -LiteralPath $skillDir -Recurse -Force
    Write-Host "removed $skillDir"
  }
}
