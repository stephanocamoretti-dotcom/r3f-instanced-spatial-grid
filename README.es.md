<p align="right">
  <a href="./README.md">🇺🇸 Read in English</a>
</p>

<p align="center">
  <img src="./assets/banner.svg" alt="Banner de R3F Instanced Spatial Grid" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Three_Fiber-v9-38BDF8?style=for-the-badge&logo=react&logoColor=white" alt="R3F v9" />
  <img src="https://img.shields.io/badge/Three.js-InstancedMesh-34D399?style=for-the-badge&logo=threedotjs&logoColor=white" alt="InstancedMesh" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-818CF8?style=for-the-badge" alt="Licencia MIT" />
</p>

# r3f-instanced-spatial-grid

Campo espacial 3D de alto rendimiento en **React 19 + React Three Fiber v9** que renderiza **entre 5,000 y 12,000 instancias reactivas al puntero en una sola llamada de dibujo GPU (1 draw call)** usando `THREE.InstancedMesh`, sin `setState` dentro de `useFrame` y sin asignaciones de memoria por frame.

---

## Por qué importa InstancedMesh + Cero GC

<p align="center">
  <img src="./assets/drawcall-benchmark.svg" alt="Comparativa de Draw Calls" width="100%" />
</p>

---

## Arquitectura del Render Loop

```mermaid
flowchart LR
    Pointer["Puntero 3D y Viewport"] --> Frame["Bucle useFrame"]
    Modes["Física Wave / Vortex / Helix"] --> Frame
    Frame --> Scratch["Object3D y Color Pre-asignados"]
    Scratch -->|"setMatrixAt y setColorAt"| Inst["Un solo THREE.InstancedMesh"]
    Inst -->|"1 Draw Call GPU"| Screen["Canvas 100dvh a 60fps"]
```

---

## Inicio rápido

```bash
git clone https://github.com/stephanocamoretti-dotcom/r3f-instanced-spatial-grid.git
cd r3f-instanced-spatial-grid
npm install
npm run dev
```

---

## Ideas de escalado para producción

1. **Renderizado bajo demanda (`frameloop="demand"`)**: Para visualizaciones estáticas o gemelos digitales, usa `frameloop="demand"` e `invalidate()` solo cuando cambien los datos para ahorrar batería.
2. **Simulación en Web Worker**: Mueve el cálculo de posiciones a un Web Worker escribiendo en un `Float32Array` para que el hilo principal solo actualice el buffer de matrices.
3. **Telemetría en vivo**: Mapea cada índice de instancia a métricas reales de campañas AdTech, latencia de servidores o sensores IoT mediante gradientes con `setColorAt`.

---

## Referencias

- [Three.js Docs — InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
- [React Three Fiber — Scaling Performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [React Three Fiber — Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)
