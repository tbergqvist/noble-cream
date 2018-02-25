export type EventConstructor<T> = new (...args: any[]) => T;

export interface IEventHandler {
  remove(): void;
}

export class EventManager {
  private _eventQueue: any[] = [];
  private _listeners = new Map<EventConstructor<any>, Set<Function>>();

  addEventListener<T, T2>(type: EventConstructor<T>, callback: (data: T, node: T2) => void): IEventHandler {
    let list = this._listeners.get(type) || new Set<Function>();
    list.add(callback);
    this._listeners.set(type, list);

    return {
      remove() {
        list.delete(callback);
      }
    };
  }

  queueEvent<T>(event: T) {
    this._eventQueue.push(event);
  }

  processEvents() {
    while (this._eventQueue.length > 0) {
    let queue = this._eventQueue.splice(0, this._eventQueue.length);

    queue.forEach((queuedEvent) => {
      let listeners = this._listeners.get(queuedEvent.constructor);
        if (listeners) {
          for (let callback of listeners) {
            callback(queuedEvent);
            continue;
          }
        }
      });
    }
  }
}