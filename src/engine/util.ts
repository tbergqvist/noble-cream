import { NodeClass, ComponentNode } from "./node";

type ComponentContainer = { [componentId: string]: any };

export function componentsMatch(nodeClass: NodeClass<any>, components: ComponentContainer) {
  return nodeClass.nodeConfig!.filter(config => config.required).every(config => components[config.id]);
}

export function buildNode<T>(entityId: string, nodeClass: NodeClass<T>, entityComponents: ComponentContainer): T {
  let componentNode: ComponentNode = { entityId };
  let node: any = nodeClass.nodeConfig!.reduce((node, component) => {
    node[component.propertyName] = entityComponents[component.id];
    return node;
  }, componentNode);

  return node;
}