import * as THREE from 'three';
import { PALETTE } from './palette';

/**
 * Shared singleton MeshStandardMaterial instances.
 * Matte ceramic / clay look: high roughness (0.88), zero metalness, zero emissive, no envMap.
 */

export const clayMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(PALETTE.clay),
  roughness: 0.88,
  metalness: 0.0,
  emissive: new THREE.Color(0x000000),
  envMap: null,
});

export const forestMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(PALETTE.forest),
  roughness: 0.88,
  metalness: 0.0,
  emissive: new THREE.Color(0x000000),
  envMap: null,
});

export const sandMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(PALETTE.sand),
  roughness: 0.88,
  metalness: 0.0,
  emissive: new THREE.Color(0x000000),
  envMap: null,
});

export const surfaceMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(PALETTE.surface),
  roughness: 0.88,
  metalness: 0.0,
  emissive: new THREE.Color(0x000000),
  envMap: null,
});

export function updateMaterialsTheme(isDark) {
  if (isDark) {
    clayMaterial.color.set('#E88058');
    forestMaterial.color.set('#35453B');
    sandMaterial.color.set('#D8CEBE');
    surfaceMaterial.color.set('#1C2520');
  } else {
    clayMaterial.color.set(PALETTE.clay);
    forestMaterial.color.set(PALETTE.forest);
    sandMaterial.color.set(PALETTE.sand);
    surfaceMaterial.color.set(PALETTE.surface);
  }
}

export const materials = {
  clay: clayMaterial,
  forest: forestMaterial,
  sand: sandMaterial,
  surface: surfaceMaterial,
};
