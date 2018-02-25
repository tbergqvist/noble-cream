import { GameCanvas } from "./game-canvas";
import { SystemEventManager } from "./util/system-event-manager";
import { createSpace } from "./engine/space";
import { createRenderSquareSystem } from "./systems/render-square-system";
import { BlueprintFactory } from "./blueprint-factory";
import { guid } from "./util/guid";
import { createMovingSystem } from "./systems/moving-system";

export function createGame(_gameCanvas: GameCanvas, _systemEventManager: SystemEventManager, _blueprintFactory: BlueprintFactory) {
  let _isPaused = false;
  let _space = createSpace("game");

  _space.addSystem(createMovingSystem());
  _space.addSystem(createRenderSquareSystem(_gameCanvas));

  _space.createEntity(_blueprintFactory.createTower({x: 50, y: 100}), guid());
  _space.createEntity(_blueprintFactory.createEnemy({x: 500, y: 200}), guid());

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