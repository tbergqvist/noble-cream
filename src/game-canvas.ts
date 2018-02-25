export class ResizeEvent {
  width: number;
  height: number;

  constructor(obj: ResizeEvent) {
    Object.assign(this, obj);
  }
}

export interface CanvasSize {
  readonly width: number;
  readonly height: number;
}

export interface GameCanvas {
  readonly gameLayer: PIXI.Container,
  readonly guiLayer: PIXI.Container,
  readonly size: CanvasSize;
}

export function createGameCanvas(canvas: HTMLCanvasElement): GameCanvas {
  let app = new PIXI.Application({
    view: canvas,
    backgroundColor: 0xA6FFA3
  });

  app.renderer.resize(800, 600);
  
  let gameLayer = new PIXI.Container();
  let guiLayer = new PIXI.Container();

  app.stage.addChild(gameLayer);
  app.stage.addChild(guiLayer);

  return {
    gameLayer,
    guiLayer,
    get size() {
      return {
        width: app.renderer.width,
        height: app.renderer.height
      };
    }
  }
}