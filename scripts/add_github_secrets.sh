#!/usr/bin/env bash
# Script to add required GitHub repository secrets using gh CLI
# Usage: set environment variables then run: ./scripts/add_github_secrets.sh
# Requires: gh (https://cli.github.com/) authenticated and has repo access

set -euo pipefail

REPO=${GITHUB_REPOSITORY:-}
if [ -z "$REPO" ]; then
  echo "No GITHUB_REPOSITORY environment variable set."
  echo "Set it to 'owner/repo' or run this script from the repo and it will use the current repository."
  echo "You can also set GITHUB_REPOSITORY=owner/repo and re-run."
  read -p "Use current checked-out repo? (y/N) " yn
  if [ "${yn,,}" != "y" ]; then
    echo "Aborting. Set GITHUB_REPOSITORY or run inside a git repo with gh configured." >&2
    exit 1
  fi
  REPO=$(git rev-parse --show-toplevel | xargs -I{} basename {})
fi

# Secrets to set
SECRETS=(
  VERCEL_TOKEN
  VERCEL_ORG_ID
  VERCEL_PROJECT_ID
  RENDER_API_KEY
  RENDER_SERVICE_ID
)

for s in "${SECRETS[@]}"; do
  val=${!s:-}
  if [ -z "$val" ]; then
    echo "Environment variable $s is not set. Skipping. To set, export $s before running this script." >&2
    continue
  fi
  echo "Setting secret: $s"
  echo -n "$val" | gh secret set "$s" --repo "$REPO" --body -
done

echo "Done. Verify secrets in your GitHub repository settings (Settings → Secrets & variables → Actions)."
