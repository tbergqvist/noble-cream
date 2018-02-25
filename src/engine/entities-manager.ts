import { NodeClass, ComponentNode } from "./node";
import { NodeList } from "./node-list";
import { Group } from "./group";

export {NodeList} from "./node-list";
import { buildNode } from "./util";

export interface Class<T> {
  new (...params: any[]): T;
}

export type ComponentContainer = { [componentId: string]: any };
type EntityContainer = { [entityId: string]: ComponentContainer };

/*
  This class is responsible for all systems and their cached nodes in a given space
*/
export class EntitiesManager {
  private _groups = new Map<Class<any>, Group<any>>();
  private _componentsById: EntityContainer = {};

  addEntity(entityId: string, components: ComponentContainer) {
    if (this._componentsById[entityId]) {
      throw `entity ${entityId} already exists!`;
    }

    this._componentsById[entityId] = components;
    this._groups.forEach(g => g.addEntityIfCompatible(entityId, components));
  }

  removeEntity(entityId: string) {
    if (!this._componentsById[entityId]) {
      throw `entity ${entityId} does not exists!`;
    }

    this._groups.forEach(g => g.removeEntity(entityId));
    delete this._componentsById[entityId];
  }

  getComponent<T>(entityId: string, component: Class<T>): T {
    return this._componentsById[entityId][component.name];
  }

  setComponent<T>(entityId: string, component: T) {
    if (!this._componentsById[entityId]) {
      throw `entity ${entityId} does not exists!`;
    }
    let components = this.getComponents(entityId);

    if (components[component.constructor.name]) {
      Object.assign(components[component.constructor.name], component);
    } else {
      components[component.constructor.name] = component;
      this._groups.forEach(g => g.addEntityIfCompatible(entityId, components));
    }
  }

  removeComponent(entityId: string, componentClass: Function) {
    let components = this.getComponents(entityId);
    delete components[componentClass.name];
    this._groups.forEach(g => g.componentRemoved(entityId, components));
  }

  getComponents(entityId: string) {
    return this._componentsById[entityId];
  }

  getNodesForEntities<T extends ComponentNode>(klass: NodeClass<T>, entities: string[]): T[] {
    return entities.map(entity => buildNode(entity, klass, this._componentsById[entity]));
  }

  getNodes<T extends ComponentNode>(klass: NodeClass<T>): NodeList<T> {
    let group = this._groups.get(klass);
    if (!group) {
      group = new Group(klass);
      this.addToGroup(group);
      this._groups.set(klass, group);
    }

    return group.nodeList;
  }

  hasEntity(id: string) {
    return !!this._componentsById[id];
  }

  private addToGroup(group: Group<any>) {
    for (let entityId in this._componentsById) {
      group.addEntityIfCompatible(entityId, this.getComponents(entityId));
    }
  }

  get componentsById() {
    return this._componentsById;
  }
}