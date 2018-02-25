import { NodeClass, ComponentNode } from "./node";
import { NodeList } from "./node-list";
import { ISystem } from "./isystem";
import { EntitiesManager, Class, ComponentContainer } from "./entities-manager";
import { IEntityBlueprint } from "./entity-blueprint";
import { EventManager, EventConstructor, IEventHandler } from "./event-manager";

export { NodeList } from "./node-list";
import { deepCopy } from "../util/copy";

export interface SystemClass {
  new (...args: any[]): ISystem;
}

interface addEventListenerParams<T, T2> {
  type: EventConstructor<T>;
  callback: (data: T, node: T2) => void;
  node?: NodeClass<T2>;
}

export class Entity {
  constructor(
    readonly space: Space,
    readonly id: string
  ) {
  }

  getComponent<T>(component: Class<T>): T {
    return this.space.getComponent(this.id, component);
  }

  setComponent(component: any) {
    return this.space.setComponent(this.id, component);
  }  
}

export interface Space {
  addSystem(system: ISystem): void;
  removeSystem(system: ISystem): void;
  createEntity(blueprint: IEntityBlueprint, entityId?:string): string;
  addEntity(entityId: string, components: ComponentContainer): void;
  removeEntity(entityId: string): void;
  enterFrame(timeInMs: number): void;
  processEvents(): void;
  addEventListener<T, T2>(params : addEventListenerParams<T, T2>): void;
  queueEvent<T>(event: T, entityId?: string): void;
  setComponent(entityId: string, component: any): void;
  removeComponent(entityId: string, componentClass: Function): void;
  getComponent<T>(entityId: string, component: Class<T>): T;
  getComponents(entityId: string): ComponentContainer;
  getNodeForEntity<T extends ComponentNode>(entity: string, klass: NodeClass<T>): T;
  getNodesForEntities<T extends ComponentNode>(entities: string[], klass: NodeClass<T>): T[];
  getNodes<T>(klass: NodeClass<T>): NodeList<T>;
  hasEntity(id: string): void;
  systems: Set<ISystem>;
}

export function createSpace(_id: string) {
  let _systems = new Set<ISystem>();
  let _entities: EntitiesManager = new EntitiesManager();
  let _eventManager: EventManager;
  
  let _space: Space = {
    addSystem(system: ISystem) {
      _systems.add(system);
      if (system.start) {
        system.start(_space);
      }
    },

    removeSystem(system: ISystem) {
      if (system.stop) {
        system.stop();
      }
      _systems.delete(system);
    },

    createEntity(blueprint: IEntityBlueprint, entityId:string): string {
      _space.addEntity(entityId, deepCopy(blueprint.components));
      return entityId;
    },

    addEntity(entityId: string, components: ComponentContainer) {
      _entities.addEntity(entityId, components);
    },

    removeEntity(entityId: string) {
      _entities.removeEntity(entityId);
    },

    enterFrame(timeInMs: number) {
      _systems.forEach(s => s.enterFrame && s.enterFrame(timeInMs));
    },

    processEvents() {
      _eventManager.processEvents();
    },

    addEventListener<T, T2>({type, callback} : {type: EventConstructor<T>, callback: (data: T, node: T2) => void}): IEventHandler {
      return _eventManager.addEventListener(type, callback);
    },

    queueEvent<T>(event: T) {
      _eventManager.queueEvent(event);
    },

    setComponent(entityId: string, component: any) {
      _entities.setComponent(entityId, component);
    },

    removeComponent(entityId: string, componentClass: Function) {
      _entities.removeComponent(entityId, componentClass);
    },

    getComponent<T>(entityId: string, component: Class<T>): T {
      return _entities.getComponent(entityId, component);
    },

    getComponents(entityId: string) {
      return _entities.getComponents(entityId);
    },

    getNodeForEntity<T extends ComponentNode>(entity: string, klass: NodeClass<T>): T {
      console.assert(!!_entities.componentsById[entity], "Entity not found!");
      return <T>_space.getNodesForEntities([entity], klass)[0];
    },

    getNodesForEntities<T extends ComponentNode>(entities: string[], klass: NodeClass<T>): T[] {
      console.assert(entities.every(entity => !!_entities.componentsById[entity]), "Entity not found!");
      return _entities.getNodesForEntities(klass, entities);
    },

    getNodes<T>(klass: NodeClass<T>): NodeList<T> {
      return _entities.getNodes(klass);
    },

    hasEntity(id: string) {
      return _entities.hasEntity(id);
    },

    get systems() {
      return _systems;
    }
  };

  _eventManager = new EventManager();

  return _space;
}