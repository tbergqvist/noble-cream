import "reflect-metadata";

function addComponentData(target: any, key: string, required: boolean) {
  let nodeClass: NodeClass<any> = target.constructor;
  if (!nodeClass.nodeConfig) {
    nodeClass.nodeConfig = [];
  }
  let metadata: new () => any = Reflect.getMetadata("design:type", target, key);

  nodeClass.nodeConfig.push({ id: metadata.name, propertyName: key, required });
}

export function requiredComponent(target: any, key: string): any {
  addComponentData(target, key, true);
}

export function optionalComponent(target: any, key: string): any {
  addComponentData(target, key, false);
}

export interface NodeClassComponent {
  id: string;
  propertyName: string;
  required: boolean;
}

export interface ComponentNode {
  entityId?: String;
  spaceId?: number;
  [key: string]: any; //all components with name as key
}

export interface NodeClass<T extends ComponentNode> {
  new (...params: any[]): T;
  nodeConfig?: NodeClassComponent[]; //HACK: not really optional but it is added by the "requiredComponent" or "optionalComponent" decorator
}
