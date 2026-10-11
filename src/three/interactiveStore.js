/**
 * Interactive 3D State Store.
 * Allows foreground UI controls to directly manipulate 3D shaders,
 * physics modes, and particle explosions without re-rendering the whole scene.
 */

export const interactive3DStore = {
  materialMode: 'ceramic', // 'ceramic' | 'chrome' | 'hologram' | 'obsidian'
  motionMode: 'float',     // 'float' | 'orbit' | 'exploded'
  impulseTime: 0,
  hoveredShapeIndex: null,
  listeners: new Set(),

  setMaterialMode(mode) {
    this.materialMode = mode;
    this.notify();
  },

  setMotionMode(mode) {
    this.motionMode = mode;
    this.notify();
  },

  triggerExplode() {
    this.impulseTime = Date.now();
    this.motionMode = 'exploded';
    this.notify();
    setTimeout(() => {
      this.motionMode = 'float';
      this.notify();
    }, 2400);
  },

  setHoveredShape(index) {
    this.hoveredShapeIndex = index;
    this.notify();
  },

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  },

  notify() {
    this.listeners.forEach((fn) => fn());
  },
};
