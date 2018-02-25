export class PositionComponent {
  x: number;
  y: number;

  constructor(obj: PositionComponent) {
    Object.assign(this, obj);
  }
}

export class ObstacleComponent {
  constructor(obj: ObstacleComponent) {
    Object.assign(this, obj);
  }
}

export class SpeedComponent {
  speed: number;

  constructor(obj: SpeedComponent) {
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

export class ScoreComponent {
  score: number;

  constructor(obj: ScoreComponent) {
    Object.assign(this, obj);
  }
}

export class HealthComponent {
  healthLeft: number;

  constructor(obj: HealthComponent) {
    Object.assign(this, obj);
  }
}

interface Path {
  x: number;
  y: number;
}

export class FollowedPathComponent {
  currentPath: number;
  paths: Path[];

  constructor(obj: FollowedPathComponent) {
    Object.assign(this, obj);
  }
}