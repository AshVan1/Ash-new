#!/usr/bin/env python3
"""Decimate STLs and export web-friendly GLBs into public/models/."""

from __future__ import annotations

import re
import sys
from pathlib import Path

import trimesh

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "models"
MAX_FACES = 60_000

# Homepage portfolio models (source STL -> output basename)
MODELS = [
    "engine.stl",
    "babylon.stl",
    "girl ring 01 f (~recovered).stl",
    "Fixed cross (~recovered).stl",
    "Bruno Size 7.75 US FINAL.stl",
    "jewelry-model.stl",
    "Miles Size 9 US.stl",
    "A ring.stl",
    "Isabel (Size 7.5).stl",
    "notre damn.stl",
    "Ring (~recovered).stl",
    "rng.stl",
    "sfg.stl",
    "Yay.stl",
    "TOS.stl",
    "Untitled.stl",
]


def slug(name: str) -> str:
    base = Path(name).stem
    base = re.sub(r"[^a-zA-Z0-9]+", "-", base).strip("-").lower()
    return base or "model"


def optimize_one(src_name: str) -> None:
    src = PUBLIC / src_name
    if not src.exists():
        print(f"SKIP missing: {src_name}")
        return

    out = OUT / f"{slug(src_name)}.glb"
    print(f"\n→ {src_name} ({src.stat().st_size / 1e6:.1f} MB)")

    mesh = trimesh.load(src, force="mesh")
    if isinstance(mesh, trimesh.Scene):
        mesh = trimesh.util.concatenate(tuple(mesh.geometry.values()))

    faces_before = len(mesh.faces)
    print(f"  faces: {faces_before:,}")

    if faces_before > MAX_FACES:
        target = MAX_FACES
        print(f"  decimating → {target:,} faces…")
        mesh = mesh.simplify_quadric_decimation(face_count=target)
        print(f"  faces after: {len(mesh.faces):,}")

    mesh.remove_unreferenced_vertices()
    OUT.mkdir(parents=True, exist_ok=True)
    mesh.export(out)
    print(f"  wrote {out.name} ({out.stat().st_size / 1e6:.2f} MB)")


def main() -> int:
    for name in MODELS:
        try:
            optimize_one(name)
        except Exception as exc:  # noqa: BLE001
            print(f"  FAILED: {exc}", file=sys.stderr)
            return 1
    print("\nDone.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
