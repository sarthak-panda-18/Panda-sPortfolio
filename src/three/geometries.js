import * as THREE from 'three';

/**
 * Shared singleton geometry instances.
 * Never dispose these on unmount so they can be reused without GPU re-allocation.
 */

// Desktop standard quality geometries (low-to-moderate polygon count)
export const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
export const torusGeometry = new THREE.TorusGeometry(0.75, 0.25, 20, 36);
export const boxGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
export const cylinderGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1.4, 28);
export const coneGeometry = new THREE.ConeGeometry(0.8, 1.5, 28);
export const capsuleGeometry = new THREE.CapsuleGeometry(0.45, 0.8, 16, 24);

// Mobile & low-power optimized geometries (reduced segment count)
export const lowPolySphereGeometry = new THREE.SphereGeometry(1, 16, 10);
export const lowPolyTorusGeometry = new THREE.TorusGeometry(0.75, 0.25, 12, 20);
export const lowPolyBoxGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
export const lowPolyCylinderGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1.4, 16);
export const lowPolyCapsuleGeometry = new THREE.CapsuleGeometry(0.45, 0.8, 10, 14);

export const geometries = {
  sphere: sphereGeometry,
  torus: torusGeometry,
  box: boxGeometry,
  cylinder: cylinderGeometry,
  cone: coneGeometry,
  capsule: capsuleGeometry,
};
