export class PositionComponent {
  x: number;
  y: number;

  constructor(obj: PositionComponent) {
    Object.assign(this, obj);
  }
}

export class VelocityComponent {
  x: number;
  y: number;

  constructor(obj: VelocityComponent) {
    Object.assign(this, obj);
  }
}

export class RenderSquareComponent {
  width: number;
  height: number;
  color: number;

  constructor(obj: RenderSquareComponent) {
    Object.assign(this, obj);
  }
}

export class RenderComponent {
  offset: {
    x: number;
    y: number;
  };
  zIndex: number;
  textureFrame: string;
  tiled: boolean;
  width: number;
  height: number;

  constructor(obj: RenderComponent) {
    Object.assign(this, obj);
  }
}

export class AnimationComponent {
  id: string;
  movingAnimation: string;
  idleAnimation: string;
  frameTimeMs: number;

  constructor(obj: AnimationComponent) {
    Object.assign(this, obj);
  }
}