import {ISystem} from "../engine/isystem";
import {FollowedPathComponent, PositionComponent, ObstacleComponent} from "../components";
import {requiredComponent} from "../engine/node";
import {Space, NodeList} from "../engine/space";

export class PathFindingNode {
  entityId: string;
  @requiredComponent
  path: FollowedPathComponent;
  @requiredComponent
  position: PositionComponent;
}

export class ObstacleNode {
  entityId: string;
  @requiredComponent
  obstacle: ObstacleComponent;
  @requiredComponent
  position: PositionComponent;
}

function updatePathFinding(node: PathFindingNode, space: Space) {
  let obstacles = space.getNodes(ObstacleNode);
  let board: any[] = [];
  for (let i = 0; i < 20; ++i) {
    board[i] = [];
    for (let j = 0; j < 20; ++j) {
      board[i][j] = {
        visited: false,
        obstacle: false,
        goal: false,
        score: j,
        x: j,
        y: i
      };
    }
    board[i][0].goal = true;
  }

  const cellSize = 30;
  obstacles.forEach((node)=> {
    let cellX = Math.floor(node.position.x / cellSize);
    let cellY = Math.floor(node.position.y / cellSize);
    console.log(cellY, cellX);
    board[cellY][cellX].obstacle = true;
  });

  console.log(board);

  let cellX = Math.floor(node.position.x / cellSize);
  let cellY = Math.floor(node.position.y / cellSize);
  let startCell = board[cellY][cellX];
  startCell.visited = true;
  let currentCell = startCell;
  let nextCells: any = [];
  while(currentCell) {
    cellX = currentCell.x;
    cellY = currentCell.y;
    let yolo = [
      board[cellY][cellX - 1],
      board[cellY + 1][cellX],
      board[cellY - 1][cellX],
      board[cellY][cellX + 1],
    ];

    nextCells = nextCells.concat(yolo).filter((bla: any) => !!bla && !bla.obstacle && !bla.visited).sort((bla: any, bla2: any) => bla.score - bla2.score);
    let nextCell = nextCells[0];
    nextCell.visited = true;
    nextCell.from = currentCell;
    if (nextCell.goal) {
      node.path.currentPath = 0;
      node.path.paths = [];
      node.path.paths.push({x: -cellSize, y: nextCell.y * cellSize});
      node.path.paths.push({x: nextCell.x * cellSize, y: nextCell.y * cellSize});
      while(nextCell.from) {
        node.path.paths.push({x: nextCell.from.x * cellSize, y: nextCell.from.y * cellSize});
        nextCell = nextCell.from;
      }
      node.path.paths = node.path.paths.reverse();
      node.path.paths = node.path.paths.splice(1);
      console.log(node.path.paths);
      currentCell = undefined;
    } else {
      currentCell = nextCell;
    }
  }
}

export function createPathFindingSystem() : ISystem {
  let _nodes: NodeList<PathFindingNode>;

  return {
    start(space: Space) {
      _nodes = space.getNodes(PathFindingNode);
      _nodes.nodeAdded.add((node)=>updatePathFinding(node, space));
    },

    enterFrame() {
      
    }
  }
}