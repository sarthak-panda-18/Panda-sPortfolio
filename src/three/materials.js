import * as THREE from 'three';
import { PALETTE } from './palette';

/**
 * Shared singleton MeshStandardMaterial instances with dynamic shader morphing.
 */

export const clayMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(PALETTE.clay),
  roughness: 0.88,
  metalness: 0.0,
  emissive: new THREE.Color(0x000000),
});

export const forestMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(PALETTE.forest),
  roughness: 0.88,
  metalness: 0.0,
  emissive: new THREE.Color(0x000000),
});

export const sandMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(PALETTE.sand),
  roughness: 0.88,
  metalness: 0.0,
  emissive: new THREE.Color(0x000000),
});

export const surfaceMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(PALETTE.surface),
  roughness: 0.88,
  metalness: 0.0,
  emissive: new THREE.Color(0x000000),
});

let currentThemeDark = false;
let currentMaterialMode = 'ceramic';

export function applyMaterialMode(mode, isDark = currentThemeDark) {
  currentMaterialMode = mode;
  currentThemeDark = isDark;

  if (mode === 'chrome') {
    // Liquid Silver Chrome
    clayMaterial.color.set('#E88058');
    clayMaterial.metalness = 0.95;
    clayMaterial.roughness = 0.08;
    clayMaterial.emissive.set('#000000');

    forestMaterial.color.set('#E0E5E2');
    forestMaterial.metalness = 0.98;
    forestMaterial.roughness = 0.05;
    forestMaterial.emissive.set('#000000');

    sandMaterial.color.set('#FFFFFF');
    sandMaterial.metalness = 0.95;
    sandMaterial.roughness = 0.06;
    sandMaterial.emissive.set('#000000');

    surfaceMaterial.color.set('#D0D8D4');
    surfaceMaterial.metalness = 0.92;
    surfaceMaterial.roughness = 0.1;
    surfaceMaterial.emissive.set('#000000');
  } else if (mode === 'hologram') {
    // Luminous Cyber Hologram
    clayMaterial.color.set('#FF7043');
    clayMaterial.metalness = 0.7;
    clayMaterial.roughness = 0.15;
    clayMaterial.emissive.set('#C26A4A');
    clayMaterial.emissiveIntensity = 0.35;

    forestMaterial.color.set('#26A69A');
    forestMaterial.metalness = 0.75;
    forestMaterial.roughness = 0.2;
    forestMaterial.emissive.set('#004D40');
    forestMaterial.emissiveIntensity = 0.3;

    sandMaterial.color.set('#FFCA28');
    sandMaterial.metalness = 0.6;
    sandMaterial.roughness = 0.25;
    sandMaterial.emissive.set('#FF8F00');
    sandMaterial.emissiveIntensity = 0.25;

    surfaceMaterial.color.set('#AB47BC');
    surfaceMaterial.metalness = 0.8;
    surfaceMaterial.roughness = 0.18;
    surfaceMaterial.emissive.set('#4A148C');
    surfaceMaterial.emissiveIntensity = 0.35;
  } else if (mode === 'obsidian') {
    // Deep Dark Obsidian Velvet
    clayMaterial.color.set('#C26A4A');
    clayMaterial.metalness = 0.3;
    clayMaterial.roughness = 0.2;
    clayMaterial.emissive.set('#000000');

    forestMaterial.color.set('#101713');
    forestMaterial.metalness = 0.5;
    forestMaterial.roughness = 0.25;
    forestMaterial.emissive.set('#000000');

    sandMaterial.color.set('#3D4E44');
    sandMaterial.metalness = 0.4;
    sandMaterial.roughness = 0.3;
    sandMaterial.emissive.set('#000000');

    surfaceMaterial.color.set('#17201B');
    surfaceMaterial.metalness = 0.6;
    surfaceMaterial.roughness = 0.15;
    surfaceMaterial.emissive.set('#000000');
  } else {
    // Default Matte Ceramic
    clayMaterial.metalness = 0.0;
    clayMaterial.roughness = 0.88;
    clayMaterial.emissive.set('#000000');
    clayMaterial.emissiveIntensity = 0.0;

    forestMaterial.metalness = 0.0;
    forestMaterial.roughness = 0.88;
    forestMaterial.emissive.set('#000000');
    forestMaterial.emissiveIntensity = 0.0;

    sandMaterial.metalness = 0.0;
    sandMaterial.roughness = 0.88;
    sandMaterial.emissive.set('#000000');
    sandMaterial.emissiveIntensity = 0.0;

    surfaceMaterial.metalness = 0.0;
    surfaceMaterial.roughness = 0.88;
    surfaceMaterial.emissive.set('#000000');
    surfaceMaterial.emissiveIntensity = 0.0;

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
}

export function updateMaterialsTheme(isDark) {
  applyMaterialMode(currentMaterialMode, isDark);
}

export const materials = {
  clay: clayMaterial,
  forest: forestMaterial,
  sand: sandMaterial,
  surface: surfaceMaterial,
};
