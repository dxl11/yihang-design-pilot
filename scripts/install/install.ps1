<#
.SYNOPSIS
  Install yihang-design-pilot Skills into an Agent host skills directory.

.DESCRIPTION
  Copies Skills from the repository authoritative source (skills/) into a host
  discovery path. Never deletes foreign skills. Refuses to overwrite unless
  -ForceBackup is supplied (creates a timestamped backup first).

.PARAMETER HostName
  cursor | claude | codex | all

.PARAMETER TargetRoot
  Host skills root. If omitted, uses an isolated fixture under
  tests/fixtures/host-compatibility/<host>-project/ for safe testing.

.PARAMETER Skill
  Optional skill name filter (e.g. web-visual-direction). Default: all available.

.PARAMETER Domain
  Optional domain folder filter (e.g. web).

.PARAMETER WhatIf
  Preview only; do not write files.

.PARAMETER ForceBackup
  If destination exists, backup then overwrite. Without this flag, conflicts abort.
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("cursor", "claude", "codex", "all")]
  [string]$HostName,

  [string]$TargetRoot = "",

  [string]$Skill = "",

  [string]$Domain = "",

  [switch]$ForceBackup,

  [switch]$ProjectInstall
)

$ErrorActionPreference = "Stop"
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$SkillsRoot = Join-Path $RepoRoot "skills"

function Get-AvailableSkills {
  param([string]$DomainFilter, [string]$SkillFilter)
  $results = @()
  Get-ChildItem -Path $SkillsRoot -Directory | ForEach-Object {
    $domainDir = $_
    if ($DomainFilter -and $domainDir.Name -ne $DomainFilter) { return }
    Get-ChildItem -Path $domainDir.FullName -Directory -ErrorAction SilentlyContinue | ForEach-Object {
      $skillDir = $_
      $skillMd = Join-Path $skillDir.FullName "SKILL.md"
      if (-not (Test-Path $skillMd)) { return }
      if ($SkillFilter -and $skillDir.Name -ne $SkillFilter) { return }
      $results += [pscustomobject]@{
        Domain = $domainDir.Name
        Name   = $skillDir.Name
        Path   = $skillDir.FullName
      }
    }
  }
  return $results
}

function Get-DefaultFixtureRoot {
  param([string]$HostKey)
  $map = @{
    cursor = "cursor-project\.cursor\skills"
    claude = "claude-code-project\.claude\skills"
    codex  = "codex-project\.agents\skills"
  }
  return Join-Path $RepoRoot ("tests\fixtures\host-compatibility\" + $map[$HostKey])
}

function Get-ProjectHostRoot {
  param([string]$HostKey)
  switch ($HostKey) {
    "cursor" { return Join-Path $RepoRoot ".cursor\skills" }
    "claude" { return Join-Path $RepoRoot ".claude\skills" }
    "codex"  { return Join-Path $RepoRoot ".agents\skills" }
    default { throw "Unknown host $HostKey" }
  }
}

function Install-OneHost {
  param(
    [string]$HostKey,
    [string]$DestRoot,
    [object[]]$SkillList
  )

  # Cursor: keep domain nesting (official docs: recursive discovery).
  # Claude / Codex: install flat leaf folders (official examples are flat).
  $preserveDomain = ($HostKey -eq "cursor")

  Write-Host "Host=$HostKey Dest=$DestRoot Skills=$($SkillList.Count)"
  New-Item -ItemType Directory -Force -Path $DestRoot | Out-Null

  foreach ($s in $SkillList) {
    $dest = if ($preserveDomain) {
      Join-Path $DestRoot (Join-Path $s.Domain $s.Name)
    } else {
      Join-Path $DestRoot $s.Name
    }

    if (Test-Path $dest) {
      if (-not $ForceBackup) {
        throw "Refusing to overwrite existing skill at '$dest'. Pass -ForceBackup to backup and replace, or choose another -TargetRoot."
      }
      $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
      $backup = "$dest.bak-$stamp"
      if ($PSCmdlet.ShouldProcess($dest, "Backup to $backup")) {
        Move-Item -LiteralPath $dest -Destination $backup
        Write-Host "  backed up -> $backup"
      }
    }

    if ($PSCmdlet.ShouldProcess($s.Path, "Copy to $dest")) {
      New-Item -ItemType Directory -Force -Path (Split-Path $dest -Parent) | Out-Null
      Copy-Item -LiteralPath $s.Path -Destination $dest -Recurse -Force
      $marker = @{
        name       = $s.Name
        domain     = $s.Domain
        source     = $s.Path
        installedAt = (Get-Date).ToString("o")
        project    = "yihang-design-pilot"
      } | ConvertTo-Json
      Set-Content -LiteralPath (Join-Path $dest ".ydp-installed.json") -Value $marker -Encoding utf8
      Write-Host "  installed $($s.Name) -> $dest"
    }
  }
}

$hosts = if ($HostName -eq "all") { @("cursor", "claude", "codex") } else { @($HostName) }
$list = @(Get-AvailableSkills -DomainFilter $Domain -SkillFilter $Skill)
if ($list.Count -eq 0) {
  throw "No skills matched filters Domain='$Domain' Skill='$Skill' under $SkillsRoot"
}

foreach ($h in $hosts) {
  $destRoot = if ($TargetRoot) {
    $TargetRoot
  } elseif ($ProjectInstall) {
    Get-ProjectHostRoot -HostKey $h
  } else {
    Get-DefaultFixtureRoot -HostKey $h
  }
  Install-OneHost -HostKey $h -DestRoot $destRoot -SkillList $list
}

Write-Host "Done. Source of truth remains: $SkillsRoot"
