import { IEntityBlueprint, EntityBlueprint } from "./engine/entity-blueprint";
import { CellPositionComponent, RenderSquareComponent } from "./components";

interface CellPositionParam {
  x: number;
  y: number;
}

export interface BlueprintFactory {
  createTower(params: CellPositionParam): IEntityBlueprint;
}

export function createBlueprintFactory(): BlueprintFactory {
  return {
    createTower(position: CellPositionParam) {
      return new EntityBlueprint("Player")
        .addComponent(new CellPositionComponent(position))
        .addComponent(new RenderSquareComponent({
          color: 0xff0000,
          height: 50,
          width: 50
        }));
    }
  }
}