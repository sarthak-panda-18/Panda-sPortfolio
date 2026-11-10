/**
 * Interactive 3D State Store.
 * Allows foreground UI controls to directly manipulate 3D shaders,
 * physics modes, and particle explosions without re-rendering the whole scene.
 */

export const interactive3DStore = {
  materialMode: 'ceramic', // 'ceramic' | 'chrome' | 'hologram' | 'obsidian'
  motionMode: 'float',     // 'float' | 'orbit' | 'exploded'
  previousMotionMode: 'float',
  impulseTime: 0,
  explodeTimer: null,
  hoveredShapeIndex: null,
  listeners: new Set(),

  setMaterialMode(mode) {
    this.materialMode = mode;
    this.notify();
  },

  setMotionMode(mode) {
    if (mode !== 'exploded') {
      this.previousMotionMode = mode;
    }
    this.motionMode = mode;
    this.notify();
  },

  triggerExplode() {
    if (this.explodeTimer) {
      clearTimeout(this.explodeTimer);
    }
    if (this.motionMode !== 'exploded') {
      this.previousMotionMode = this.motionMode;
    }
    this.impulseTime = Date.now();
    this.motionMode = 'exploded';
    this.notify();
    this.explodeTimer = setTimeout(() => {
      this.explodeTimer = null;
      if (this.motionMode === 'exploded') {
        this.motionMode = this.previousMotionMode || 'float';
        this.notify();
      }
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
