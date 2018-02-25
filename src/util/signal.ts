export interface Signal0<> {
  add(func: () => void): void;
  remove(func: () => void): void;
  dispatch(): void;
}

export interface Signal1<T> {
  add(func: (param: T) => void): void;
  remove(func: (param: T) => void): void;
  dispatch(param: T): void;
}

export interface Signal2<T, T2> {
  add(func: (param1: T, param2: T2) => void): void;
  remove(func: (param1: T, param2: T2) => void): void;
  dispatch(param1: T, param2: T2): void;
}

export interface Listener {
  (...params: any[]): void;
}

export class Signal implements Signal0, Signal1<any>, Signal2<any, any> {
  private _listeners = new Set<Listener>();

  add(listener: Listener) {
    this._listeners.add(listener);
  }

  remove(listener: Listener) {
    this._listeners.delete(listener);
  }

  dispatch(...params: any[]) {
    this._listeners.forEach(listener => listener(...params));
  }
}