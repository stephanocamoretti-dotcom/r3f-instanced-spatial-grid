<p align="right">
  <a href="./README.es.md">🇪🇸 Leer en Español</a>
</p>

<p align="center">
  <img src="./assets/banner.svg" alt="R3F Instanced Spatial Grid Banner" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Three_Fiber-v9-38BDF8?style=for-the-badge&logo=react&logoColor=white" alt="R3F v9" />
  <img src="https://img.shields.io/badge/Three.js-InstancedMesh-34D399?style=for-the-badge&logo=threedotjs&logoColor=white" alt="InstancedMesh" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-818CF8?style=for-the-badge" alt="MIT License" />
</p>

# r3f-instanced-spatial-grid

A high-performance **React 19 + React Three Fiber v9** spatial 3D field rendering **5,000 to 12,000 pointer-reactive instances in a single GPU draw call** using `THREE.InstancedMesh`—with zero React `setState` inside `useFrame` and zero per-frame object allocations.

---

## Why InstancedMesh + Zero-GC Matters

<p align="center">
  <img src="./assets/drawcall-benchmark.svg" alt="Draw Call Comparison" width="100%" />
</p>

---

## Frame Loop Architecture

```mermaid
flowchart LR
    Pointer["3D Pointer & Viewport"] --> Frame["useFrame Render Loop"]
    Modes["Wave / Vortex / Helix Math"] --> Frame
    Frame --> Scratch["Pre-allocated Object3D & Color"]
    Scratch -->|"setMatrixAt & setColorAt"| Inst["Single THREE.InstancedMesh"]
    Inst -->|"1 GPU Draw Call"| Screen["60fps 100dvh Canvas"]
```

---

## Quick Start

```bash
git clone https://github.com/stephanocamoretti-dotcom/r3f-instanced-spatial-grid.git
cd r3f-instanced-spatial-grid
npm install
npm run dev
```

---

## Scaling Ideas for Production

1. **On-Demand Rendering (`frameloop="demand"`)**: For static data visualizations (like 3D heatmaps or warehouse digital twins), switch `<Canvas frameloop="demand">` and call `invalidate()` only on pointer or data updates to save laptop battery.
2. **Web Worker Physics Offload**: Move position/force integration into a Web Worker writing to a `Float32Array` `SharedArrayBuffer` so the main thread only uploads `instanceMatrix` buffers.
3. **Interactive Telemetry Mapping**: Bind each instance index to live AdTech spend, server latency, or IoT sensor metrics using `setColorAt` gradients.

---

## References

- [Three.js Docs — InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [React Three Fiber — Scaling Performance & Pitfalls](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [React Three Fiber — Performance Pitfalls (useFrame)](https://r3f.docs.pmnd.rs/advanced/pitfalls)
