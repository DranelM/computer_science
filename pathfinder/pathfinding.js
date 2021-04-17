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
        this.size = mazeArray.length;
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
        this.queueA = [this.pointA];
        this.queueB = [this.pointB];
        this.solved = false;
    }

    findNeighborsOf(point) {
        let [x, y] = point
        let neighbors = [];

        const from = this.maze[y][x].visitedBy

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
            return ![WALL, from].includes(this.maze[n[1]][n[0]].visitedBy);
        })

        return neighbors;
    }

    solve() {
        while (this.queue.length && !this.solved) {

            this.step()
        }
    }

    step() {
        if (this.queueA.length && !this.solved) {
            var originPoint = this.queueA.shift();
            var neighbors = this.findNeighborsOf(originPoint);
            for (let n of neighbors) {
                var nCell = this.maze[n[1]][n[0]]
                var originCell = this.maze[originPoint[1]][originPoint[0]]
                if (nCell.visitedBy !== BY_NOONE) {
                    this.printSolution(originCell, nCell)
                    this.solved = true
                    return
                }
                nCell.visitedBy = originCell.visitedBy;
                nCell.path = originCell.path.concat([[n[1], n[0]]]);
                nCell.distance += 1 + originCell.distance;
                this.queueA.push(n)
            }
        }

        if (this.queueB.length && !this.solved) {
            var originPoint = this.queueB.shift();
            var neighbors = this.findNeighborsOf(originPoint);
            for (let n of neighbors) {
                var nCell = this.maze[n[1]][n[0]]
                var originCell = this.maze[originPoint[1]][originPoint[0]]
                if (nCell.visitedBy !== BY_NOONE) {
                    this.printSolution(originCell, nCell)
                    this.solved = true
                    return
                }
                nCell.visitedBy = originCell.visitedBy;
                nCell.path = originCell.path.concat([[n[1], n[0]]]);
                nCell.distance += 1 + originCell.distance;
                this.queueB.push(n)
            }
            // console.log(this.toString());
        }
    }

    printSolution(originCell, nCell) {
        let wholePath = originCell.path.concat(nCell.path)
        for (let point of wholePath) {
            this.maze[point[0]][point[1]].visitedBy = 'x'
        }
        this.maze[this.pointA[1]][this.pointA[0]].visitedBy = 'X'
        this.maze[this.pointB[1]][this.pointB[0]].visitedBy = 'X'
        console.log("Solved");
        console.log(this.toString());
        return 1
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

    getBoardArray() {
        return this.maze.map((row) => {
            return row.map((cell) => {
                return cell.visitedBy
            })
        })
    }
}

// let maze = new Maze(fourByFour);
// console.log(maze.toString());
// maze.solve()

// let maze = new Maze(sixBySix);
// console.log(maze.toString());
// maze.solve()

// let maze = new Maze(fifteenByFifteen);
// console.log(maze.toString());
// maze.solve()