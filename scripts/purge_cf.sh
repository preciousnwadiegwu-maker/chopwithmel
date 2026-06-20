#!/usr/bin/env bash
# Cloudflare cache purge for chopwithmel.com
# Reads token from ~/.cloudflare_token (chmod 600). Zone-scoped, cache-purge permission only.
# Usage: ./scripts/purge_cf.sh             → purge everything
#        ./scripts/purge_cf.sh url1 url2…  → purge specific URLs only (faster, no quota hit)

set -euo pipefail

TOKEN_FILE="${CF_TOKEN_FILE:-$HOME/.cloudflare_token}"
ZONE_FILE="${CF_ZONE_FILE:-$HOME/.cloudflare_zone}"

if [[ ! -f "$TOKEN_FILE" ]]; then
  echo "❌ Missing $TOKEN_FILE" >&2
  echo "   Create a Cloudflare API token (Zone → chopwithmel.com → Cache Purge)" >&2
  echo "   then: echo 'YOUR_TOKEN' > $TOKEN_FILE && chmod 600 $TOKEN_FILE" >&2
  exit 1
fi
if [[ ! -f "$ZONE_FILE" ]]; then
  echo "❌ Missing $ZONE_FILE (Cloudflare zone id for chopwithmel.com)" >&2
  echo "   Find at Cloudflare dashboard → site overview (right column)" >&2
  echo "   then: echo 'ZONE_ID' > $ZONE_FILE && chmod 600 $ZONE_FILE" >&2
  exit 1
fi

TOKEN=$(< "$TOKEN_FILE")
ZONE=$(< "$ZONE_FILE")

if [[ $# -eq 0 ]]; then
  # Purge everything
  BODY='{"purge_everything":true}'
  LABEL="purge_everything"
else
  # Purge specific URLs (max 30 per call). Build JSON array.
  URLS_JSON=$(printf '"%s",' "$@" | sed 's/,$//')
  BODY="{\"files\":[$URLS_JSON]}"
  LABEL="purge $# url(s)"
fi

RESP=$(curl -sS -X POST \
  "https://api.cloudflare.com/client/v4/zones/$ZONE/purge_cache" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  --data "$BODY")

if echo "$RESP" | grep -q '"success":true'; then
  echo "✅ Cloudflare $LABEL"
else
  echo "❌ Cloudflare purge failed:"
  echo "$RESP" | python3 -m json.tool 2>/dev/null || echo "$RESP"
  exit 1
fi
