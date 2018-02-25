import { IEntityBlueprint, EntityBlueprint } from "./engine/entity-blueprint";
import { PositionComponent, RenderSquareComponent, VelocityComponent } from "./components";

interface PositionParam {
  x: number;
  y: number;
}

export interface BlueprintFactory {
  createTower(params: PositionParam): IEntityBlueprint;
  createEnemy(params: PositionParam): IEntityBlueprint;
}

export function createBlueprintFactory(): BlueprintFactory {
  return {
    createTower(position: PositionParam) {
      return new EntityBlueprint("Player")
        .addComponent(new PositionComponent(position))
        .addComponent(new RenderSquareComponent({
          color: 0xff0000,
          height: 50,
          width: 50
        }));
    },
    createEnemy(position: PositionParam) {
      return new EntityBlueprint("Enemy")
        .addComponent(new PositionComponent(position))
        .addComponent(new RenderSquareComponent({
          color: 0x00ff00,
          height: 20,
          width: 20
        }))
        .addComponent(new VelocityComponent({
          x: -10,
          y: 0
        }));
    }
  }
}