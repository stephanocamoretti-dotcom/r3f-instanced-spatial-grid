import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export type SpatialMode = 'wave' | 'vortex' | 'helix';

interface InstancedFieldProps {
  count: number;
  mode: SpatialMode;
  repulsionRadius: number;
}

const BASE_COLOR = new THREE.Color('#0ea5e9');
const HOT_COLOR = new THREE.Color('#34d399');

export function InstancedField({ count, mode, repulsionRadius }: InstancedFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { pointer, viewport } = useThree();

  // Pre-allocated scratch objects to guarantee 0 GC allocations inside useFrame
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const scratchColor = useMemo(() => new THREE.Color(), []);
  const pointerWorld = useMemo(() => new THREE.Vector3(), []);

  const gridSide = Math.ceil(Math.sqrt(count));

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  }, [count]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.getElapsedTime();
    pointerWorld.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );

    const spacing = 0.34;
    const half = (gridSide * spacing) / 2;

    for (let i = 0; i < count; i++) {
      const gx = i % gridSide;
      const gz = Math.floor(i / gridSide);

      let x = gx * spacing - half;
      let z = gz * spacing - half;
      let y = 0;

      if (mode === 'wave') {
        const dist = Math.hypot(x, z);
        y = Math.sin(dist * 0.85 - t * 2.4) * 0.65;
      } else if (mode === 'vortex') {
        const angle = Math.atan2(z, x) + t * 0.55;
        const radius = Math.hypot(x, z);
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        y = Math.cos(radius * 0.9 - t * 2.0) * 0.55;
      } else {
        const theta = i * 0.14 + t * 1.1;
        const r = 2.2 + Math.sin(i * 0.05 + t) * 1.4;
        x = Math.cos(theta) * r;
        z = Math.sin(theta) * r;
        y = ((i / count) - 0.5) * 9;
      }

      // Pointer repulsion impulse
      const dx = x - pointerWorld.x;
      const dy = y - pointerWorld.y;
      const pDist = Math.hypot(dx, dy);
      let energy = 0;

      if (pDist < repulsionRadius && pDist > 0.001) {
        const force = (1 - pDist / repulsionRadius) * 1.45;
        x += (dx / pDist) * force;
        y += (dy / pDist) * force;
        energy = Math.min(1, force);
      }

      const scale = 0.09 + energy * 0.11;
      dummy.position.set(x, y, z);
      dummy.rotation.set(t * 0.5 + i * 0.01, t * 0.3, 0);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      scratchColor.copy(BASE_COLOR).lerp(HOT_COLOR, Math.max(energy, (y + 1) * 0.4));
      mesh.setColorAt(i, scratchColor);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.25} metalness={0.75} />
    </instancedMesh>
  );
}
