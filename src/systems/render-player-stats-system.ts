import {ISystem} from "../engine/isystem";
import {ScoreComponent, HealthComponent} from "../components";
import {requiredComponent} from "../engine/node";
import {Space} from "../engine/space";
import { GameCanvas } from "../game-canvas";

export class PlayerStatsNode {
  entityId: string;
  @requiredComponent
  score: ScoreComponent;
  @requiredComponent
  health: HealthComponent;
}

export function createRenderPlayerStatsSystem(_gameCanvas: GameCanvas) : ISystem {
  let _space: Space;

  let _playerScoreText = new PIXI.Text("");
  let _playerHealthText = new PIXI.Text("");
  _playerScoreText.y = _playerHealthText.y = 10;
  _playerScoreText.x = 0;
  _playerHealthText.x = 200;
  _gameCanvas.guiLayer.addChild(_playerScoreText);
  _gameCanvas.guiLayer.addChild(_playerHealthText);
  return {
    start(space: Space) {
      _space = space;
    },

    enterFrame() {
      let player = _space.getNodeForEntity("player", PlayerStatsNode);
      _playerScoreText.text = `Score : ${player.score.score}`;
      _playerHealthText.text = `Health : ${player.health.healthLeft}`;
    }
  }
}