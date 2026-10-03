import React, { useRef } from 'react';
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
} from './geometries';
import {
  clayMaterial,
  forestMaterial,
  sandMaterial,
  surfaceMaterial,
} from './materials';
import { scrollStore } from '../hooks/useScrollProgress';

const SECTION_ACCENT_CONFIG = [
  {
    sectionId: 'about',
    items: [
      {
        geometry: capsuleGeometry,
        lowPolyGeometry: lowPolySphereGeometry,
        material: clayMaterial,
        basePos: [-3.4, 0.2, -0.2],
        baseRot: [0.3, 0.4, 0.2],
        scale: 0.55,
      },
      {
        geometry: sphereGeometry,
        lowPolyGeometry: lowPolySphereGeometry,
        material: forestMaterial,
        basePos: [-3.0, -0.6, 0.2],
        baseRot: [0, 0, 0],
        scale: 0.32,
      },
    ],
  },
  {
    sectionId: 'skills',
    items: [
      {
        geometry: cylinderGeometry,
        lowPolyGeometry: lowPolyBoxGeometry,
        material: forestMaterial,
        basePos: [3.4, 0.2, -0.1],
        baseRot: [0.2, 0.5, -0.1],
        scale: 0.5,
      },
      {
        geometry: torusGeometry,
        lowPolyGeometry: lowPolyTorusGeometry,
        material: clayMaterial,
        basePos: [3.0, -0.4, 0.3],
        baseRot: [0.8, 0.3, 0.4],
        scale: 0.45,
      },
    ],
  },
  {
    sectionId: 'projects',
    items: [
      {
        geometry: boxGeometry,
        lowPolyGeometry: lowPolyBoxGeometry,
        material: clayMaterial,
        basePos: [-3.4, 0.4, -0.3],
        baseRot: [0.4, 0.7, 0.2],
        scale: 0.48,
      },
      {
        geometry: sphereGeometry,
        lowPolyGeometry: lowPolySphereGeometry,
        material: surfaceMaterial,
        basePos: [-3.1, -0.3, 0.1],
        baseRot: [0, 0, 0],
        scale: 0.3,
      },
    ],
  },
  {
    sectionId: 'education',
    items: [
      {
        geometry: torusGeometry,
        lowPolyGeometry: lowPolyTorusGeometry,
        material: surfaceMaterial,
        basePos: [3.3, 0.1, -0.2],
        baseRot: [0.5, 0.6, 0.2],
        scale: 0.52,
      },
      {
        geometry: sphereGeometry,
        lowPolyGeometry: lowPolySphereGeometry,
        material: clayMaterial,
        basePos: [3.0, -0.5, 0.2],
        baseRot: [0, 0, 0],
        scale: 0.34,
      },
    ],
  },
  {
    sectionId: 'contact',
    items: [
      {
        geometry: capsuleGeometry,
        lowPolyGeometry: lowPolySphereGeometry,
        material: clayMaterial,
        basePos: [3.2, -0.3, 0.1],
        baseRot: [-0.2, 0.3, 0.4],
        scale: 0.58,
      },
      {
        geometry: sphereGeometry,
        lowPolyGeometry: lowPolySphereGeometry,
        material: forestMaterial,
        basePos: [2.7, -0.8, 0.3],
        baseRot: [0, 0, 0],
        scale: 0.32,
      },
    ],
  },
];

/**
 * SectionAccents - Renders small, unobtrusive matte shapes on the far screen perimeters
 * that gently drift in and out as their respective section passes through the viewport.
 */
export function SectionAccents({ isMobile, isLowPower, prefersReducedMotion }) {
  const groupsRef = useRef([]);

  useFrame((state) => {
    const time = prefersReducedMotion ? 0 : state.clock.getElapsedTime();

    SECTION_ACCENT_CONFIG.forEach((config, sectionIndex) => {
      const group = groupsRef.current[sectionIndex];
      if (!group) return;

      const progress = scrollStore.sectionProgress[config.sectionId] || 0;

      // Section is active in view roughly between progress 0.05 and 0.95
      // Bell curve visibility: peaks around 0.5
      let visibility = 0;
      if (progress > 0.05 && progress < 0.95) {
        // Smooth sine bell curve between 0.05 and 0.95
        const normalized = (progress - 0.05) / 0.9;
        visibility = Math.sin(normalized * Math.PI);
      }

      const idleOffset = prefersReducedMotion ? 0 : Math.sin(time * 0.7 + sectionIndex) * 0.08;
      const verticalDrift = (progress - 0.5) * 1.5;

      group.position.y = idleOffset + verticalDrift;

      // Scale up when in view, collapse when out of view
      const targetScale = visibility;
      group.scale.set(targetScale, targetScale, targetScale);
      group.visible = targetScale > 0.01;
    });
  });

  // On low power, render fewer accents (at most 1 per section)
  const maxItemsPerSection = isMobile || isLowPower ? 1 : 2;

  return (
    <group>
      {SECTION_ACCENT_CONFIG.map((config, sectionIndex) => (
        <group
          key={config.sectionId}
          ref={(el) => (groupsRef.current[sectionIndex] = el)}
          visible={false}
        >
          {config.items.slice(0, maxItemsPerSection).map((item, itemIndex) => (
            <mesh
              key={itemIndex}
              geometry={isMobile || isLowPower ? item.lowPolyGeometry : item.geometry}
              material={item.material}
              position={item.basePos}
              rotation={item.baseRot}
              scale={item.scale}
            />
          ))}
        </group>
      ))}
    </group>
  );
}
