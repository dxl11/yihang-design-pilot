#!/usr/bin/env bash
# POSIX installer mirroring scripts/install/install.ps1 (fixture-safe defaults).
set -euo pipefail

HOST="${1:-}"
TARGET_ROOT="${2:-}"
SKILL_FILTER="${3:-}"

if [[ -z "$HOST" ]]; then
  echo "Usage: install.sh <cursor|claude|codex|all> [targetRoot] [skillName]" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SKILLS_ROOT="$ROOT/skills"

resolve_dest() {
  local host="$1"
  if [[ -n "$TARGET_ROOT" ]]; then
    echo "$TARGET_ROOT"
    return
  fi
  case "$host" in
    cursor) echo "$ROOT/tests/fixtures/host-compatibility/cursor-project/.cursor/skills" ;;
    claude) echo "$ROOT/tests/fixtures/host-compatibility/claude-code-project/.claude/skills" ;;
    codex) echo "$ROOT/tests/fixtures/host-compatibility/codex-project/.agents/skills" ;;
    *) echo "Unknown host: $host" >&2; exit 1 ;;
  esac
}

install_host() {
  local host="$1"
  local dest
  dest="$(resolve_dest "$host")"
  mkdir -p "$dest"
  echo "Host=$host Dest=$dest"

  find "$SKILLS_ROOT" -mindepth 2 -maxdepth 2 -type d | while read -r skill_dir; do
    local domain name
    domain="$(basename "$(dirname "$skill_dir")")"
    name="$(basename "$skill_dir")"
    [[ -f "$skill_dir/SKILL.md" ]] || continue
    if [[ -n "$SKILL_FILTER" && "$name" != "$SKILL_FILTER" ]]; then
      continue
    fi
    local out
    if [[ "$host" == "cursor" ]]; then
      out="$dest/$domain/$name"
    else
      out="$dest/$name"
    fi
    if [[ -e "$out" ]]; then
      echo "Refusing to overwrite $out (pass a free target or remove marker-managed dir)." >&2
      exit 2
    fi
    mkdir -p "$(dirname "$out")"
    cp -R "$skill_dir" "$out"
    printf '{"name":"%s","domain":"%s","project":"yihang-design-pilot"}\n' "$name" "$domain" >"$out/.ydp-installed.json"
    echo "  installed $name -> $out"
  done
}

if [[ "$HOST" == "all" ]]; then
  for h in cursor claude codex; do install_host "$h"; done
else
  install_host "$HOST"
fi

echo "Done. Source of truth remains: $SKILLS_ROOT"
