import {Space, NodeList} from "../engine/space";
import {ISystem} from "../engine/isystem";
import {requiredComponent} from "../engine/node";
import {GameCanvas} from "../game-canvas";
import { PositionComponent, RenderSquareComponent } from "../components";

const spriteSymbol = Symbol("pixi square sprite");

export class SquareNode {
  @requiredComponent
  cellPosition: PositionComponent;
  @requiredComponent
  square: RenderSquareComponent;
  [spriteSymbol]: PIXI.Graphics;
}

export function createRenderSquareSystem(_renderer: GameCanvas): ISystem {
  let _nodes: NodeList<SquareNode>;

  let _root = new PIXI.Container();
  _root.interactiveChildren = false;

  function addNode(node: SquareNode) {
    let sprite = new PIXI.Graphics();
    sprite.beginFill(node.square.color);
    sprite.drawRect(0, 0, node.square.width, node.square.height);
    node[spriteSymbol] = sprite;
    _root.addChild(sprite);
  }

  function removeNode(node: SquareNode) {
    let sprite = node[spriteSymbol];
    _root.removeChild(sprite);
    delete node[spriteSymbol];
  }

  return {
    start(space: Space) {
      _nodes = space.getNodes(SquareNode);

      _renderer.gameLayer.addChild(_root);
      _nodes.forEach(addNode);
      _nodes.nodeAdded.add(addNode);
      _nodes.nodeRemoved.add(removeNode);
    },

    enterFrame() {
      for (let i = 0; i < _nodes.length; ++i) {
        let node = _nodes.get(i);
        let pixiSprite = node[spriteSymbol];
        pixiSprite.x = node.cellPosition.x;
        pixiSprite.y = node.cellPosition.y;

      }
    },

    stop() {
      _renderer.gameLayer.removeChild(_root);
      _nodes.forEach(removeNode);
      _nodes.nodeAdded.remove(addNode);
      _nodes.nodeRemoved.remove(removeNode);
    }
  };
}