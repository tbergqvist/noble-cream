import { SystemEventManager } from "./util/system-event-manager";

import { loadAnimations } from "./engine/animation-loader";
import { createGameCanvas } from "./game-canvas";
import { createGame } from "./game";
import { createBlueprintFactory } from "./blueprint-factory";

async function startGame() {
  let update = (() => {
    let lastFrameTime: Date = new Date();
    return () => {
      let now = new Date();
      let frameTime = now.getTime() - lastFrameTime.getTime();
      _game.enterFrame(frameTime);
      _game.processEvents();
      _systemEventManager.processEvents();
      requestAnimationFrame(update);
      lastFrameTime = now;
    };
  })();
  
  let _animations = await loadAnimations();
  let _systemEventManager = new SystemEventManager();

  let _gameCanvas = createGameCanvas(<HTMLCanvasElement>document.getElementById("mainCanvas"));

  let _blueprintFactory = createBlueprintFactory();
  
  let _game = createGame(_gameCanvas, _systemEventManager, _animations, _blueprintFactory);
  
  requestAnimationFrame(update);
}

startGame();