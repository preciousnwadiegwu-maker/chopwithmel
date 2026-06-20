#!/usr/bin/env bash
# One-shot deploy for chopwithmel.com:
#   1. Commit anything staged (you commit yourself OR pass -m "message")
#   2. Push to origin/main  → Render auto-builds
#   3. Wait for Render rebuild (~3-6 min)
#   4. Purge Cloudflare cache so users see the new version instantly
#
# Usage: ./scripts/deploy.sh                       # use existing commit
#        ./scripts/deploy.sh -m "Your message"     # auto-commit staged changes
#        ./scripts/deploy.sh --skip-wait           # purge immediately (don't wait for Render)

set -euo pipefail

cd "$(dirname "$0")/.."

# 1. Auto-commit if -m flag given
MSG=""
SKIP_WAIT=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    -m) MSG="$2"; shift 2 ;;
    --skip-wait) SKIP_WAIT=true; shift ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

if [[ -n "$MSG" ]]; then
  if ! git diff --cached --quiet || ! git diff --quiet; then
    git add -A
    git commit -m "$MSG" || true
  fi
fi

# 2. Push
echo "📤 Pushing to origin/main…"
git push origin main

# 3. Wait for Render
if [[ "$SKIP_WAIT" = false ]]; then
  echo "⏳ Waiting 4 min for Render build (Render free tier averages 3-6 min)…"
  for i in {1..16}; do
    sleep 15
    printf '.'
  done
  echo ""
fi

# 4. Purge Cloudflare cache
echo "💨 Purging Cloudflare cache…"
"$(dirname "$0")/purge_cf.sh"

echo "🚀 Deploy complete → https://chopwithmel.com"
