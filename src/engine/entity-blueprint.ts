import { deepCopy } from "../util/copy";

type ComponentContainer = { [componentId: string]: any };

export class EntityBlueprint implements IEntityBlueprint {
  components: ComponentContainer = {};
  
  constructor(public id: string) {
  }

  addComponent<T>(properties: T) {
    this.components[properties.constructor.name] = properties;
    return this;
  }

  clone() {
    let clone = new EntityBlueprint(this.id + "clone");
    clone.components = deepCopy(this.components);
    return clone;
  }
}

export interface IEntityBlueprint {
  id: string;
  components: ComponentContainer;
}

