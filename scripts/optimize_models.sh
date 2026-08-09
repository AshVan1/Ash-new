#!/bin/bash
# Convert portfolio STLs → optimized Draco GLBs in public/models/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/public"
OUT="$PUBLIC/models"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$OUT"

slugify() {
  echo "$1" | sed -E 's/\.stl$//I; s/[^a-zA-Z0-9]+/-/g; s/^-+|-+$//g' | tr '[:upper:]' '[:lower:]'
}

MODELS=(
  "engine.stl"
  "babylon.stl"
  "girl ring 01 f (~recovered).stl"
  "Fixed cross (~recovered).stl"
  "Bruno Size 7.75 US FINAL.stl"
  "jewelry-model.stl"
  "Miles Size 9 US.stl"
  "A ring.stl"
  "Isabel (Size 7.5).stl"
  "notre damn.stl"
  "Ring (~recovered).stl"
  "rng.stl"
  "sfg.stl"
  "Yay.stl"
  "TOS.stl"
  "Untitled.stl"
)

cd "$ROOT"

for src_name in "${MODELS[@]}"; do
  src="$PUBLIC/$src_name"
  if [[ ! -f "$src" ]]; then
    echo "SKIP missing: $src_name"
    continue
  fi

  base="$(slugify "$src_name")"
  raw="$TMP/$base.raw.glb"
  final="$OUT/$base.glb"
  size_mb=$(python3 -c "import os; print(f'{os.path.getsize(r\"$src\")/1e6:.1f}')")

  # Heavier files get more aggressive decimation
  if python3 -c "import sys; sys.exit(0 if float('$size_mb') >= 10 else 1)"; then
    ratio="0.08"
  elif python3 -c "import sys; sys.exit(0 if float('$size_mb') >= 3 else 1)"; then
    ratio="0.15"
  else
    ratio="0.35"
  fi

  echo ""
  echo "→ $src_name (${size_mb} MB)  simplify-ratio=$ratio"
  assimp export "$src" "$raw" >/dev/null

  npx --yes @gltf-transform/cli@4.2.1 optimize "$raw" "$final" \
    --compress draco \
    --texture-compress false \
    --simplify true \
    --simplify-ratio "$ratio" \
    --simplify-error 0.001 \
    --join false \
    --flatten false \
    --instance false \
    --palette false

  out_mb=$(python3 -c "import os; print(f'{os.path.getsize(r\"$final\")/1e6:.2f}')")
  echo "  wrote models/$base.glb (${out_mb} MB)"
done

echo ""
echo "Done. Optimized models:"
ls -lh "$OUT"
