import {Space} from "./space";

export interface ISystem {
  start?(space: Space): void;
  enterFrame?(timeInMs: number): void;
  stop?(): void;
}