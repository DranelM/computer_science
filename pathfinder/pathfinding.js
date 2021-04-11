const BY_A = 1;
const BY_B = 2;
const BY_NOONE = 0;
const WALL = 4;

const fourByFour = [
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2]
]

const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 4, 4, 4, 4, 4],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0]
];

const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0,],
    [0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0,],
    [0, 0, 4, 4, 0, 0, 0, 4, 4, 4, 0, 0, 4, 4, 0,],
    [0, 0, 4, 0, 0, 4, 4, 0, 0, 0, 4, 0, 0, 4, 0,],
    [0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 4, 0,],
    [0, 0, 4, 0, 4, 0, 4, 4, 2, 4, 0, 4, 0, 4, 0,],
    [0, 0, 4, 0, 4, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0,],
    [0, 0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 4, 0, 4, 0,],
    [0, 0, 0, 4, 0, 0, 4, 4, 4, 4, 0, 4, 0, 4, 0,],
    [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0,],
    [0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 4, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
]

class Maze {
    constructor(mazeArray) {
        this.maze = mazeArray.map((row, y) => {
            return row.map((cell, x) => {
                if (cell === BY_A) this.pointA = [x, y]
                if (cell === BY_B) this.pointB = [x, y]
                return {
                    x: x,
                    y: y,
                    visitedBy: cell,
                    distance: 0,
                    path: []
                }
            })
        })
    }

    findNeighborsOf(point) {
        let [x, y] = point
        let neighbors = [];

        const from = this.maze[x][y].visitedBy

        if (x - 1 >= 0) {
            neighbors.push([x - 1, y]);
        }
        if (x + 1 < this.maze.length) {
            neighbors.push([x + 1, y]);
        }
        if (y - 1 >= 0) {
            neighbors.push([x, y - 1]);
        }
        if (y + 1 < this.maze[0].length) {
            neighbors.push([x, y + 1]);
        }

        neighbors = neighbors.filter((n) => {
            return ![WALL, from].includes(this.maze[n[0]][n[1]].visitedBy);
        })

        return neighbors;
    }

    solve() {
        const queue = [this.pointA, this.pointB];
        while (queue.length) {
            var originPoint = queue.shift();
            var neighbors = this.findNeighborsOf(originPoint);
            for (let n of neighbors) {
                var nCell = this.maze[n[0]][n[1]]
                var originCell = this.maze[originPoint[0]][originPoint[1]]
                if (nCell.visitedBy !== BY_NOONE) {
                    this.printSolution(originCell, nCell)
                    return
                }
                nCell.visitedBy = originCell.visitedBy;
                nCell.path = originCell.path.concat([[n[0], n[1]]]);
                nCell.distance += 1 + originCell.distance;
                queue.push(n)
            }
            console.log(this.toString());
        }
    }

    printSolution(originCell, nCell) {
        let wholePath = originCell.path.concat(nCell.path)
        for (let point of wholePath) {
            this.maze[point[0]][point[1]].visitedBy = 'x'
        }
        this.maze[this.pointA[0]][this.pointA[1]].visitedBy = 'X'
        this.maze[this.pointB[0]][this.pointB[1]].visitedBy = 'X'
        console.log(this.toString());
    }

    toString() {
        var result = '';
        for (let x = 0; x < this.maze.length; x++) {
            for (let y = 0; y < this.maze[0].length; y++) {
                result += this.maze[x][y].visitedBy + ' ';
            }
            result += '\n';
        }
        return result;
    }


}

// let maze = new Maze(fourByFour);
// console.log(maze.toString());
// maze.solve()

// let maze = new Maze(sixBySix);
// console.log(maze.toString());
// maze.solve()

let maze = new Maze(fifteenByFifteen);
console.log(maze.toString());
maze.solve()