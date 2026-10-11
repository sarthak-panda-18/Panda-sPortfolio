import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  sphereGeometry,
  torusGeometry,
  boxGeometry,
  cylinderGeometry,
  capsuleGeometry,
  lowPolySphereGeometry,
  lowPolyTorusGeometry,
  lowPolyBoxGeometry,
  lowPolyCylinderGeometry,
} from './geometries';
import {
  clayMaterial,
  forestMaterial,
  sandMaterial,
  surfaceMaterial,
  applyMaterialMode,
} from './materials';
import { DAMPING } from './constants';
import { scrollStore } from '../hooks/useScrollProgress';
import { mouseStore } from './mouseStore';
import { interactive3DStore } from './interactiveStore';

// Desktop cluster items configuration (right side of viewport)
const DESKTOP_ITEMS = [
  {
    geometry: sphereGeometry,
    material: forestMaterial,
    basePos: [2.2, -0.4, 0.1],
    baseRot: [0, 0, 0],
    scale: 0.88,
    parallaxFactor: 0.25,
    delay: 0.0,
  },
  {
    geometry: cylinderGeometry,
    material: clayMaterial, // Clay accent
    basePos: [1.3, -0.3, 0.4],
    baseRot: [0.15, 0.4, 0.1],
    scale: 0.72,
    parallaxFactor: 0.35,
    delay: 0.08,
  },
  {
    geometry: torusGeometry,
    material: surfaceMaterial,
    basePos: [2.7, 0.6, -0.2],
    baseRot: [0.75, 0.4, 0.2],
    scale: 0.78,
    parallaxFactor: 0.2,
    delay: 0.14,
  },
  {
    geometry: capsuleGeometry,
    material: clayMaterial, // Clay accent
    basePos: [3.3, -0.7, 0.2],
    baseRot: [-0.2, 0.15, 0.3],
    scale: 0.62,
    parallaxFactor: 0.3,
    delay: 0.2,
  },
  {
    geometry: boxGeometry,
    material: forestMaterial,
    basePos: [1.7, 0.85, -0.4],
    baseRot: [0.35, 0.65, -0.2],
    scale: 0.6,
    parallaxFactor: 0.15,
    delay: 0.25,
  },
  {
    geometry: sphereGeometry,
    material: sandMaterial,
    basePos: [0.95, -1.0, 0.6],
    baseRot: [0, 0, 0],
    scale: 0.36,
    parallaxFactor: 0.45,
    delay: 0.3,
  },
];

// Mobile cluster items configuration (3 shapes, smaller scale, shifted)
const MOBILE_ITEMS = [
  {
    geometry: lowPolySphereGeometry,
    material: forestMaterial,
    basePos: [1.1, 0.6, -0.5],
    baseRot: [0, 0, 0],
    scale: 0.55,
    parallaxFactor: 0.0,
    delay: 0.0,
  },
  {
    geometry: lowPolyCylinderGeometry,
    material: clayMaterial,
    basePos: [0.5, 0.4, -0.3],
    baseRot: [0.15, 0.3, 0.1],
    scale: 0.42,
    parallaxFactor: 0.0,
    delay: 0.08,
  },
  {
    geometry: lowPolyTorusGeometry,
    material: surfaceMaterial,
    basePos: [1.4, 1.1, -0.8],
    baseRot: [0.7, 0.4, 0.2],
    scale: 0.46,
    parallaxFactor: 0.0,
    delay: 0.14,
  },
];

/**
 * HeroCluster - Interactive 3D Spatial Geometry with physics,
 * real-time material morphing, Zero-G orbital modes, and click/hover reactions.
 */
export function HeroCluster({ isReady, isMobile, isLowPower, prefersReducedMotion }) {
  const groupRef = useRef(null);
  const itemsRef = useRef([]);
  const entranceProgressRef = useRef(prefersReducedMotion ? 1 : 0);
  const explodeOffsets = useRef([]);

  const items = isMobile || isLowPower ? MOBILE_ITEMS : DESKTOP_ITEMS;

  useEffect(() => {
    // Generate random radial vectors for explosion impulse
    explodeOffsets.current = items.map((_, i) => ({
      x: (Math.random() - 0.3) * 3.5 + 1.0,
      y: (Math.random() - 0.5) * 3.5,
      z: (Math.random() - 0.5) * 3.5,
      rotX: (Math.random() - 0.5) * 8,
      rotY: (Math.random() - 0.5) * 8,
    }));

    const unsubscribe = interactive3DStore.subscribe(() => {
      applyMaterialMode(interactive3DStore.materialMode);
    });

    return () => unsubscribe();
  }, [items.length]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. Entrance animation interpolation
    const targetEntrance = isReady || prefersReducedMotion ? 1 : 0;
    if (prefersReducedMotion) {
      entranceProgressRef.current = 1;
    } else {
      entranceProgressRef.current = THREE.MathUtils.damp(
        entranceProgressRef.current,
        targetEntrance,
        DAMPING.entrance,
        delta
      );
    }

    const entrance = entranceProgressRef.current;

    // 2. Read scroll store (Zero React re-render)
    const heroScroll = scrollStore.sectionProgress.hero || 0;

    // Scroll retreat effect: drift up, slightly back, rotate and scale down
    const scrollLift = heroScroll * 2.8;
    const scrollZ = -heroScroll * 2.2;
    const scrollScale = Math.max(0, 1 - heroScroll * 1.1);

    // 3. Mouse parallax (Desktop only)
    let mouseX = 0;
    let mouseY = 0;
    if (!isMobile && !isLowPower && !prefersReducedMotion) {
      mouseStore.x = THREE.MathUtils.damp(mouseStore.x, mouseStore.targetX, DAMPING.mouse, delta);
      mouseStore.y = THREE.MathUtils.damp(mouseStore.y, mouseStore.targetY, DAMPING.mouse, delta);
      mouseX = mouseStore.x;
      mouseY = mouseStore.y;
    }

    // 4. Subtle idle float & Zero-G motion
    const time = prefersReducedMotion ? 0 : state.clock.getElapsedTime();
    const motionMode = interactive3DStore.motionMode;

    const idleY = prefersReducedMotion ? 0 : Math.sin(time * 0.8) * 0.08;
    const idleRotY = prefersReducedMotion ? 0 : Math.sin(time * 0.4) * 0.05;

    // Apply transforms to main group
    groupRef.current.position.y = idleY + scrollLift;
    groupRef.current.position.z = scrollZ;
    groupRef.current.rotation.y =
      idleRotY + (motionMode === 'orbit' ? time * 0.6 : heroScroll * 0.4);
    groupRef.current.rotation.x = -heroScroll * 0.2;

    // Check explosion decay
    const isExploding = motionMode === 'exploded';
    const elapsedSinceImpulse = (Date.now() - interactive3DStore.impulseTime) / 1000;
    const explosionFactor = isExploding ? Math.max(0, Math.sin(Math.min(Math.PI, elapsedSinceImpulse * 1.4))) : 0;

    // 5. Update individual shape meshes
    items.forEach((item, index) => {
      const mesh = itemsRef.current[index];
      if (!mesh) return;

      const isHovered = interactive3DStore.hoveredShapeIndex === index;
      const hoverScaleMult = isHovered ? 1.32 : 1.0;

      // Staggered entrance scale
      const itemProgress = Math.max(0, Math.min(1, (entrance - item.delay) / (1 - item.delay || 1)));
      const finalScale = item.scale * itemProgress * scrollScale * hoverScaleMult;

      mesh.scale.set(finalScale, finalScale, finalScale);

      // Parallax & Orbit positioning
      const pFactor = item.parallaxFactor || 0.2;
      let targetX = item.basePos[0] + mouseX * pFactor * (1 - heroScroll);
      let targetY = item.basePos[1] + mouseY * pFactor * (1 - heroScroll);
      let targetZ = item.basePos[2];

      if (motionMode === 'orbit') {
        const orbitAngle = time * 0.9 + (index * Math.PI * 2) / items.length;
        const orbitRadius = 1.6 + Math.sin(time * 0.5 + index) * 0.4;
        targetX = 2.0 + Math.cos(orbitAngle) * orbitRadius;
        targetY = Math.sin(orbitAngle) * orbitRadius * 0.6;
        targetZ = Math.sin(orbitAngle * 2) * 0.5;
      }

      // Add explosion impulse
      if (explosionFactor > 0 && explodeOffsets.current[index]) {
        const exp = explodeOffsets.current[index];
        targetX += exp.x * explosionFactor * 1.8;
        targetY += exp.y * explosionFactor * 1.8;
        targetZ += exp.z * explosionFactor * 1.8;
      }

      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetX, 10, delta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, 10, delta);
      mesh.position.z = THREE.MathUtils.damp(mesh.position.z, targetZ, 10, delta);

      // Rotation
      if (!prefersReducedMotion) {
        const spinSpeed = isHovered ? 3.0 : 1.0;
        mesh.rotation.x = item.baseRot[0] + Math.sin(time * 0.6 * spinSpeed + index) * 0.08;
        mesh.rotation.y = item.baseRot[1] + Math.cos(time * 0.5 * spinSpeed + index) * 0.08;
        mesh.rotation.z = item.baseRot[2];
      }
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, index) => (
        <mesh
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
          geometry={item.geometry}
          material={item.material}
          position={item.basePos}
          rotation={item.baseRot}
          scale={prefersReducedMotion ? item.scale : 0}
          onPointerOver={() => interactive3DStore.setHoveredShape(index)}
          onPointerOut={() => interactive3DStore.setHoveredShape(null)}
          onClick={() => interactive3DStore.triggerExplode()}
        />
      ))}
    </group>
  );
}
