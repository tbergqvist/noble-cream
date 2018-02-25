import { IEntityBlueprint, EntityBlueprint } from "./engine/entity-blueprint";
import { PositionComponent, RenderSquareComponent, ScoreComponent, HealthComponent, FollowedPathComponent, SpeedComponent, ObstacleComponent } from "./components";

interface PositionParam {
  x: number;
  y: number;
}

export interface BlueprintFactory {
  createTower(params: PositionParam): IEntityBlueprint;
  createEnemy(params: PositionParam): IEntityBlueprint;
  createPlayer(): IEntityBlueprint;
}

export function createBlueprintFactory(): BlueprintFactory {
  return {
    createTower(position: PositionParam) {
      return new EntityBlueprint("Player")
        .addComponent(new PositionComponent(position))
        .addComponent(new ObstacleComponent({}))
        .addComponent(new RenderSquareComponent({
          color: 0xff0000,
          height: 30,
          width: 30
        }))
        ;
    },
    createEnemy(position: PositionParam) {
      return new EntityBlueprint("Enemy")
        .addComponent(new PositionComponent(position))
        .addComponent(new RenderSquareComponent({
          color: 0x00ff00,
          height: 30,
          width: 30
        }))
        .addComponent(new SpeedComponent({
          speed: 2
        }))
        .addComponent(new FollowedPathComponent({
          paths: [],
          currentPath: 0
        }));
    },
    createPlayer() {
      return new EntityBlueprint("Player")
        .addComponent(new ScoreComponent({
          score: 0
        }))
        .addComponent(new HealthComponent({
          healthLeft: 100
        }));
    }
  }
}