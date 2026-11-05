#!/bin/bash
# setup.sh - Run this once on mobile browser to create .github/workflows folder
# Because requirement says no subfolders, but GitHub needs .github/workflows/render.yml
# This script creates it

echo "Setting up GitHub Actions workflow..."

mkdir -p .github/workflows
if [ -f "render.yml" ]; then
  cp render.yml .github/workflows/render.yml
  echo "Copied render.yml -> .github/workflows/render.yml"
else
  echo "render.yml not found in root!"
  exit 1
fi

echo "Done! Now you can git add .github/workflows/render.yml and push"
echo "Then go to GitHub -> Actions tab -> Run workflow"
