import {NodeClass, ComponentNode} from "./node";
import {NodeList} from "./node-list";
import { componentsMatch, buildNode } from "./util";

type ComponentContainer = { [componentId: string]: any };

export class Group<T extends ComponentNode> {
  nodeList = new NodeList<T>();
  private _nodeById = new Map<string, T>();

  constructor(
    private _groupClass: NodeClass<T>) {
    console.assert(!!_groupClass.nodeConfig, "Missing config on node!");
  }

  addEntityIfCompatible(entityId: string, components: ComponentContainer) {
    if (this.componentsMatch(components) && !this._nodeById.has(entityId)) {
      let node = buildNode(entityId, this._groupClass, components);

      this._nodeById.set(entityId, node);
      this.nodeList.add(node);
    }
  }

  removeEntity(entityId: string) {
    let node = this._nodeById.get(entityId);
    if (node) {
      this._nodeById.delete(entityId);
      this.nodeList.remove(node);
    }
  }

  componentRemoved(entityId: string, components: ComponentContainer) {
    if (!this.componentsMatch(components) && this._nodeById.has(entityId)) {
      this.removeEntity(entityId);
    }
  }

  private componentsMatch(components: ComponentContainer) {
    return componentsMatch(this._groupClass, components);
  }
}
