import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, useGLTF, Stars } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import * as THREE from 'three'

function ModelLoader({ url, scale = 1 }) {
  // Loads a glTF model using useGLTF (drei). Should be wrapped in Suspense.
  const gltf = useGLTF(url)
  return <primitive object={gltf.scene} scale={[scale, scale, scale]} />
}

function RocketModel({ ignite, modelUrl, svgUrl, hasModel }) {
  // If a glTF model URL is provided and reachable (hasModel), prefer it. Otherwise fallback to the procedural mesh.
  if (hasModel && modelUrl) {
    // Render the glTF model with a small flame attached
    return (
      <group scale={[0.9, 0.9, 0.9]}>
        <Suspense fallback={null}>
          <ModelLoader url={modelUrl} scale={1.0} />
        </Suspense>
        <mesh position={[0, -0.28, 0]} visible={ignite}>
          <coneGeometry args={[0.08, 0.22, 16]} />
          <meshStandardMaterial emissive="#ff7a00" color="#ff4100" emissiveIntensity={1.4} transparent opacity={0.95} />
        </mesh>
      </group>
    )
  }

  // If no glTF model is available, render the procedural fallback rocket (keeps original look)
  return (
    <group scale={[0.8, 0.8, 0.8]}>
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.18, 0.5, 24]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.2} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.6, 24]} />
        <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.25} />
      </mesh>
      {/* fins */}
      <mesh rotation={[0, 0, Math.PI / 6]} position={[0.14, 0.05, 0]}> 
        <boxGeometry args={[0.02, 0.18, 0.36]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 6]} position={[-0.14, 0.05, 0]}> 
        <boxGeometry args={[0.02, 0.18, 0.36]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* simple flame using emissive material when ignite */}
      <mesh position={[0, -0.28, 0]} visible={ignite}>
        <coneGeometry args={[0.08, 0.22, 16]} />
        <meshStandardMaterial emissive="#ff7a00" color="#ff4100" emissiveIntensity={1.4} transparent opacity={0.95} />
      </mesh>
    </group>
  )
}

function SmokeTrail({ rocketRef, launching }) {
  const group = useRef()
  useFrame((_, delta) => {
    if (!group.current || !rocketRef.current) return
    // spawn more frequent, larger smoke puffs for a denser trail
    if (launching && Math.random() > 0.62) {
      const size = 0.06 + Math.random() * 0.12
      const puff = new THREE.Mesh(
        new THREE.SphereGeometry(size, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x1b1b1b, transparent: true, opacity: 0.36 })
      )
      const worldPos = new THREE.Vector3()
      rocketRef.current.getWorldPosition(worldPos)
      puff.position.copy(worldPos).add(new THREE.Vector3((Math.random() - 0.5) * 0.12, -0.12 - Math.random() * 0.06, (Math.random() - 0.5) * 0.12))
      puff.userData = { life: 1.0 + Math.random() * 0.8, vy: -0.02 + Math.random() * -0.04 }
      group.current.add(puff)
    }

    // animate existing puffs with gentle expansion and fade for motion-blur-like feel
    for (let i = group.current.children.length - 1; i >= 0; i--) {
      const p = group.current.children[i]
      p.position.y += p.userData.vy * (delta * 60)
      p.userData.life -= delta * 0.35
      p.material.opacity = Math.max(0, p.userData.life * 0.36)
      const grow = 1 + delta * (0.6 + (1 - p.userData.life) * 0.8)
      p.scale.multiplyScalar(grow)
      if (p.userData.life <= 0) {
        group.current.remove(p)
        p.geometry.dispose()
        p.material.dispose()
      }
    }
  })

  return <group ref={group} />
}

function RocketScene({ launching, ignite, progress, onArrive, modelUrl, svgUrl, hasSvg, hasModel }) {
  const rocketRef = useRef()
  const arrivedFlag = useRef(false)
  useFrame((state, delta) => {
    if (!rocketRef.current) return
    // Simple upward motion along y/x for a pleasing curve
    const t = Math.min(1, progress.current)
    rocketRef.current.position.y = -0.1 + t * 3.2
    rocketRef.current.position.x = (t - 0.5) * 1.4
    rocketRef.current.rotation.z = (t - 0.5) * 0.6
    rocketRef.current.rotation.x = t * 0.2

    if (t >= 1 && !arrivedFlag.current) {
      arrivedFlag.current = true
      // compute world position and pass to parent for explosion origin
      const wp = new THREE.Vector3()
      rocketRef.current.getWorldPosition(wp)
      onArrive && onArrive([wp.x, wp.y, wp.z])
    }
  })

  return (
    <group>
      <group ref={rocketRef} position={[0, -0.1, 0]}>
        <RocketModel ignite={ignite} modelUrl={modelUrl} svgUrl={svgUrl} hasModel={hasModel} />
        {/* Render SVG if available, otherwise emoji */}
        {hasSvg ? (
          <Html center style={{ pointerEvents: 'none' }}>
            <img src={svgUrl} className="rocket-sprite" alt="rocket svg" />
          </Html>
        ) : (
          <Html center style={{ pointerEvents: 'none' }}>
            <div className="rocket-emoji" aria-hidden>🚀</div>
          </Html>
        )}
      </group>
      <SmokeTrail rocketRef={rocketRef} launching={launching} />
    </group>
  )
}

function Particles({ emit, origin = [0, 0, 0], count = 80, mode = 'explosion' }) {
  // emit: boolean toggles creation of a burst
  const group = useRef()
  // re-create the burst when `emit` toggles to true by using a key
  useEffect(() => {
    if (!emit || !group.current) return
    // spawn particles at origin
    for (let i = 0; i < count; i++) {
      const color = ['#fff', '#ffd700', '#ff7a7a', '#7afcff'][i % 4]
      const geo = new THREE.SphereGeometry(0.035 * (Math.random() * 1.8 + 0.4), 6, 6)
      const mat = new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 1, emissive: color, emissiveIntensity: 0.9 })
      const m = new THREE.Mesh(geo, mat)
      m.position.set(origin[0], origin[1], origin[2])
      // velocities vary for explosion vs rain
      if (mode === 'explosion') {
        const speed = Math.random() * 6 + 2
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI * 0.8
        m.userData.vx = Math.cos(theta) * Math.sin(phi) * speed
        m.userData.vy = Math.cos(phi) * speed * 0.9
        m.userData.vz = Math.sin(theta) * Math.sin(phi) * speed
      } else {
        m.userData.vx = (Math.random() - 0.5) * 1.2
        m.userData.vy = -(Math.random() * 2 + 1)
        m.userData.vz = (Math.random() - 0.5) * 0.8
      }
      m.userData.life = 1 + Math.random() * 1.4
      group.current.add(m)
    }
    // add a bright flare plane for a single-frame bloom effect
    if (mode === 'explosion') {
      const flareGeo = new THREE.PlaneGeometry(0.8, 0.8)
      const flareMat = new THREE.MeshBasicMaterial({ color: 0xffe59e, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
      const flare = new THREE.Mesh(flareGeo, flareMat)
      flare.position.set(origin[0], origin[1], origin[2])
      flare.lookAt(new THREE.Vector3(0, 0, 0))
      flare.userData.life = 0.26
      group.current.add(flare)
    }
  }, [emit, origin, count, mode])

  useFrame((_, delta) => {
    if (!group.current) return
    for (let i = group.current.children.length - 1; i >= 0; i--) {
      const p = group.current.children[i]
      p.position.x += (p.userData.vx || 0) * delta
      p.position.y += (p.userData.vy || 0) * delta
      p.position.z += (p.userData.vz || 0) * delta
      // gravity
      p.userData.vy -= 3.2 * delta
      p.userData.life -= delta * 0.6
      // support flare planes (no material in userData) as well as spheres
      if (p.material) {
        p.material.opacity = Math.max(0, p.userData.life)
        const s = Math.max(0.01, p.scale.x * (1 - delta * 0.6))
        p.scale.setScalar(s)
      } else if (p.userData && p.userData.life !== undefined) {
        p.userData.life -= delta * 1.6
      }
      if (p.userData.life <= 0 || p.position.y < -6) {
        group.current.remove(p)
        try { p.geometry.dispose() } catch (e) {}
        try { p.material && p.material.dispose() } catch (e) {}
      }
    }
  })

  return <group ref={group} />
}

export default function RocketDownload() {
  // Paths (place your files in download-rocket-widget/public/)
  const modelUrl = '/rocket.gltf' // preferred high-res glTF model (sample provided)
  const svgUrl = '/rocket.svg' // optional SVG fallback for crisp vector sprite
  const [hasModel, setHasModel] = useState(false)
  const [hasSvg, setHasSvg] = useState(false)

  // detect presence of model/svg in public folder using HEAD requests
  useEffect(() => {
    let mounted = true
    if (modelUrl) {
      fetch(modelUrl, { method: 'HEAD' }).then(r => { if (mounted && r.ok) setHasModel(true) }).catch(() => {})
    }
    if (svgUrl) {
      fetch(svgUrl, { method: 'HEAD' }).then(r => { if (mounted && r.ok) setHasSvg(true) }).catch(() => {})
    }
    return () => { mounted = false }
  }, [])

  const [running, setRunning] = useState(false)
  const [ignite, setIgnite] = useState(false)
  const [arrived, setArrived] = useState(false)
  const [explosionOrigin, setExplosionOrigin] = useState([0, 1, 0])
  const progress = useRef(0)
  const [emitBurst, setEmitBurst] = useState(false)

  // reset emitBurst after short delay so Particles can re-fire next time
  useEffect(() => {
    if (!emitBurst) return
    const id = setTimeout(() => setEmitBurst(false), 120)
    return () => clearTimeout(id)
  }, [emitBurst])

  useEffect(() => {
    let raf
    if (running) {
      // progress from 0..1 over 1.6s (faster launch feels punchy)
      const start = performance.now()
      const duration = 1600
      function tick(now) {
        const t = Math.min(1, (now - start) / duration)
        progress.current = t
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      // ignite flames shortly after prelaunch to feel responsive
      setTimeout(() => setIgnite(true), 120)
    }
    return () => cancelAnimationFrame(raf)
  }, [running])

  function start() {
    setArrived(false)
    setIgnite(false)
    // brief prelaunch hold for 700ms (gives a satisfying "countdown" feel)
    setTimeout(() => setRunning(true), 700)
  }

  function handleArrive() {
    setArrived(true)
    setRunning(false)
    setIgnite(false)
    // explosion triggers: particles burst and then rain
    setEmitBurst(true)
  }

  return (
    <div className="rocket-demo">
      <div className="stage">
        <Canvas camera={{ position: [0, 0.8, 6], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <Stars radius={50} depth={20} count={200} factor={4} saturation={0} fade />
          <RocketScene launching={running} ignite={ignite} progress={progress} onArrive={(pos) => { setExplosionOrigin(pos); handleArrive() }} modelUrl={modelUrl} svgUrl={svgUrl} hasSvg={hasSvg} hasModel={hasModel} />
          {/* explosion burst when emitBurst toggles */}
          <Particles emit={emitBurst} origin={explosionOrigin} count={110} mode="explosion" />
          {/* rain after arrival (spawned with emitBurst true) */}
          <Particles emit={arrived} origin={[explosionOrigin[0], explosionOrigin[1] + 2.2, explosionOrigin[2]]} count={60} mode="rain" />
        </Canvas>

        {/* UI controls overlay */}
        <div className="controls">
          <button className="download-btn" onClick={start} aria-pressed={running}>
            <span className="label">Download Resume</span>
          </button>
          <div className="folder-icon" aria-hidden>
            📁
            {arrived && <div className="smile">😊</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
