import { GameCanvas } from "./game-canvas";
import { SystemEventManager } from "./util/system-event-manager";
import { createSpace } from "./engine/space";
import { createRenderSquareSystem } from "./systems/render-square-system";
import { BlueprintFactory } from "./blueprint-factory";
import { guid } from "./util/guid";
import { createEnemyReachEndSystem } from "./systems/enemy-reach-end-system";
import { createRenderPlayerStatsSystem } from "./systems/render-player-stats-system";
import { createFollowPathSystem } from "./systems/follow-path-system";
import { createPathFindingSystem } from "./systems/pathfinding-system";

export function createGame(_gameCanvas: GameCanvas, _systemEventManager: SystemEventManager, _blueprintFactory: BlueprintFactory) {
  let _isPaused = false;
  let _space = createSpace("game");

  _space.addSystem(createEnemyReachEndSystem());
  _space.addSystem(createPathFindingSystem());
  _space.addSystem(createFollowPathSystem());
  _space.addSystem(createRenderSquareSystem(_gameCanvas));
  _space.addSystem(createRenderPlayerStatsSystem(_gameCanvas));
  _space.addSystem(createEnemyReachEndSystem());

  _space.createEntity(_blueprintFactory.createTower({x: 30, y: 90}), guid());
  _space.createEntity(_blueprintFactory.createEnemy({x: 500, y: 90}), guid());
  _space.createEntity(_blueprintFactory.createPlayer(), "player");

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