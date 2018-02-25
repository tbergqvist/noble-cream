type EventKlass<T> = new (...args: any[]) => T;

export const enum Priority {
  High = 1,
  Medium = 2,
  Low = 3,
}

interface EventListener {
  callback: Function;
  priority: Priority;
}

export interface Event {
  canceled?: boolean;
}

export class SystemEventManager {
  private _eventQueue: Event[] = [];
  private _listeners = new Map<EventKlass<any>, EventListener[]>();

  addEventListener<T, T2>(params: { type: EventKlass<T>, priority?: Priority, callback: (data: T, node?: T2) => void }) {
    let priority = params.priority || Priority.Low;
    let list = this._listeners.get(params.type) || [];
    let listener = {
      callback: params.callback,
      priority
    };
    
    if (priority === Priority.Low) {
      list.push(listener); //Push back if low
    } else if (priority === Priority.High) {
      list.unshift(listener); //Push front if high
    } else {
      //Find first listener with equal or higer priority and push before it
      let i = list.findIndex(i => i.priority >= priority);
      if (i) {
        list.splice(i, 0, listener);
      } else {
        list.push(listener);
      }
    }
    this._listeners.set(params.type, list);
  }

  removeEventListener<T>(params: { type: EventKlass<T>, callback: (data: T, node?: any) => void }) {
    let list = this._listeners.get(params.type);
    if (!list) {
      return;
    }

    for (let i = 0; i < list.length; ++i){
      if (list[i].callback === params.callback) {
        list.splice(i, 1);
        break;
      }
    }
  }

  queueEvent<T> (event: T) {
    this._eventQueue.push(event);
  }

  processEvents() {
    while (this._eventQueue.length > 0) {
      let queue = this._eventQueue.splice(0, this._eventQueue.length);

      queue.forEach((queuedEvent) => {
        let listeners = this._listeners.get(<any>queuedEvent.constructor);
        if (listeners) {
          for (let i = 0; i < listeners.length; ++i) {
            let listener = listeners[i];
            listener.callback(queuedEvent);
            if (queuedEvent.canceled) {
              break;
            }
          }
        }
      });
    }
  }
}