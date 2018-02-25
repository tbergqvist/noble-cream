import {Signal, Signal1} from "../util/signal";

export class NodeList<T> {
  nodeAdded: Signal1<T> = new Signal();
  nodeRemoved: Signal1<T> = new Signal();
  nodes: T[] = [];

  add(node: T) {
    this.nodes.push(node);
    this.nodeAdded.dispatch(node);
  }

  remove(node: T) {
    let index = this.nodes.indexOf(node);
    this.nodes.splice(index, 1);
    this.nodeRemoved.dispatch(node);
  }

  get(index: number) {
    return this.nodes[index];
  }

  forEach(callbackfn: (value: T, index: number, array: T[]) => void) {
    this.nodes.forEach(callbackfn);
  }

  map<R>(callbackfn: (value: T, index: number, array: T[]) => R) {
    return this.nodes.map(callbackfn);
  }

  every(callbackfn: (value: T, index: number, array: T[]) => boolean): boolean {
    return this.nodes.every(callbackfn);
  }

  some(callbackfn: (value: T, index: number, array: T[]) => boolean): boolean {
    return this.nodes.some(callbackfn);
  }

  get length() {
    return this.nodes.length;
  }
}