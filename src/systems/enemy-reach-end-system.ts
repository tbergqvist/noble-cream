import {ISystem} from "../engine/isystem";
import {PositionComponent, HealthComponent} from "../components";
import {requiredComponent} from "../engine/node";
import {Space, NodeList} from "../engine/space";

export class MovementNode {
  entityId: string;
  @requiredComponent
  position: PositionComponent;
}

export function createEnemyReachEndSystem() : ISystem {
  let _nodes: NodeList<MovementNode>;
  let _space: Space;

  return {
    start(space: Space) {
      _space = space;
      _nodes = space.getNodes(MovementNode);     
    },

    enterFrame() {
      for (let i = 0; i < _nodes.length; ++i) {
        let  {entityId, position} = _nodes.get(i);

        if (position.x < 0) {
          let playerHealth = _space.getComponent("player", HealthComponent);
          playerHealth.healthLeft -= 10;
          _space.removeEntity(entityId);
        }
      }
    }
  }
}