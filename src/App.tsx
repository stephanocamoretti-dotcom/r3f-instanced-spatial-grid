import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Boxes, Layers, Sparkles } from 'lucide-react';
import { InstancedField, type SpatialMode } from './components/InstancedField';

export function App() {
  const [count, setCount] = useState(5000);
  const [mode, setMode] = useState<SpatialMode>('wave');
  const [repulsionRadius, setRepulsionRadius] = useState(2.6);

  return (
    <div style={{ position: 'relative', height: '100dvh', width: '100vw', overflow: 'hidden' }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 5.5, 11], fov: 48 }}>
        <color attach="background" args={['#050811']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 10, 6]} intensity={2.0} color="#e0f2fe" />
        <pointLight position={[-6, -4, 4]} intensity={1.5} color="#34d399" />

        <InstancedField count={count} mode={mode} repulsionRadius={repulsionRadius} />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>

      <header
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 14px',
            borderRadius: 12,
            background: 'rgba(15, 23, 42, 0.78)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
          }}
        >
          <Boxes size={16} color="#38bdf8" />
          <strong style={{ fontSize: 14 }}>R3F Instanced Spatial Grid</strong>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 12,
            background: 'rgba(15, 23, 42, 0.78)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <Layers size={14} color="#34d399" />
          <span>{count.toLocaleString()} Instances · 1 Draw Call</span>
        </div>
      </header>

      <aside
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          width: 290,
          padding: 16,
          borderRadius: 16,
          background: 'rgba(15, 23, 42, 0.82)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700 }}>
          <Sparkles size={14} color="#38bdf8" />
          <span>Spatial Field Controls</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {(['wave', 'vortex', 'helix'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '7px 6px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize',
                border: mode === m ? '1px solid #38bdf8' : '1px solid #334155',
                background: mode === m ? 'rgba(56, 189, 248, 0.16)' : '#0f172a',
                color: mode === m ? '#38bdf8' : '#cbd5e1',
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <label style={{ fontSize: 12, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>Instance Count ({count.toLocaleString()})</span>
          <input
            type="range"
            min={500}
            max={12000}
            step={500}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>

        <label style={{ fontSize: 12, color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>Pointer Repulsion ({repulsionRadius.toFixed(1)})</span>
          <input
            type="range"
            min={0.5}
            max={5.0}
            step={0.1}
            value={repulsionRadius}
            onChange={(e) => setRepulsionRadius(Number(e.target.value))}
          />
        </label>
      </aside>
    </div>
  );
}
