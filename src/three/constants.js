/**
 * Constants for the 3D Scene: Lighting intensities, colors, damping values,
 * and camera configuration.
 */

export const LIGHTING = {
  // Ambient light: Soft warm glow matching the sand tone (#EDE6DA)
  ambientIntensity: 1.4,
  ambientColor: '#EDE6DA',

  // Directional light: Warm key light angled from top-left (#FFF6EB)
  directionalIntensity: 1.6,
  directionalColor: '#FFF6EB',
  directionalPosition: [-4, 6, 5],
};

export const DAMPING = {
  mouse: 3.0,     // Damping factor for smooth mouse parallax
  scroll: 4.0,    // Damping factor for scroll-linked movement
  entrance: 3.5,  // Damping factor for entrance scale interpolation
  rotation: 1.5,  // Damping factor for gentle idle rotation
};

export const CAMERA = {
  fov: 45,
  position: [0, 0, 6.5],
  near: 0.1,
  far: 20,
};
