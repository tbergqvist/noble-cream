import {ISystem} from "../engine/isystem";
import {FollowedPathComponent, PositionComponent, SpeedComponent} from "../components";
import {requiredComponent} from "../engine/node";
import {Space, NodeList} from "../engine/space";
import { Vector2 } from "../util/vector2";

export class FollowedPathNode {
  entityId: string;
  @requiredComponent
  path: FollowedPathComponent;
  @requiredComponent
  position: PositionComponent;
  @requiredComponent
  speed: SpeedComponent;
}

export function createFollowPathSystem() : ISystem {
  let _nodes: NodeList<FollowedPathNode>;

  return {
    start(space: Space) {
      _nodes = space.getNodes(FollowedPathNode);
    },

    enterFrame() {
      for (let i = 0; i < _nodes.length; ++i) {
        let  {path, speed, position} = _nodes.get(i);

        let currentPath = path.paths[path.currentPath];
        if (!currentPath) {
          return;
        }
        let diff = new Vector2(currentPath.x - position.x, currentPath.y - position.y);
        if (diff.sqrLength <= speed.speed * speed.speed) {
          position.x = currentPath.x;
          position.y = currentPath.y;
          path.currentPath++;
        } else {
          let velocity = diff.normalize().scale(speed.speed);
          position.x += velocity.x;
          position.y += velocity.y;
        }
      }
    }
  }
}