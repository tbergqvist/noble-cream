import { GameCanvas } from "./game-canvas";
import { SystemEventManager } from "./util/system-event-manager";
import { createSpace } from "./engine/space";
import { createRenderSquareSystem } from "./systems/render-square-system";
import { BlueprintFactory } from "./blueprint-factory";

export function createGame(_gameCanvas: GameCanvas, _systemEventManager: SystemEventManager, _blueprintFactory: BlueprintFactory) {
  let _isPaused = false;
  let _space = createSpace("game");

  _space.addSystem(createRenderSquareSystem(_gameCanvas));
  _space.createEntity(_blueprintFactory.createTower({x: 1, y: 2}));

  return {
    enterFrame(frameDuration: number) {
      if (_isPaused) {
        return;
      }
      _space.enterFrame(frameDuration);
    },

    processEvents() {
      if (_isPaused) {
        return;
      }

      _space.processEvents();
    }
  };
}