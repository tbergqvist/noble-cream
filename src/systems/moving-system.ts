import {ISystem} from "../engine/isystem";
import {PositionComponent, VelocityComponent} from "../components";
import {requiredComponent} from "../engine/node";
import {Space, NodeList} from "../engine/space";

export class MovementNode {
  entityId: string;
  @requiredComponent
  position: PositionComponent;
  @requiredComponent
  velocity: VelocityComponent;
}

export function createMovingSystem() : ISystem {
  let _nodes: NodeList<MovementNode>;

  return {
    start(space: Space) {
      _nodes = space.getNodes(MovementNode);     
    },

    enterFrame() {
      for (let i = 0; i < _nodes.length; ++i) {
        let  {position, velocity} = _nodes.get(i);
        position.x += velocity.x;
        position.y += velocity.y;
      }
    }
  }
}