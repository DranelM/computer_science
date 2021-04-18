class Board {

    constructor(size) {

        this.CELLTYPES = {
            EMPTY: 0,
            A: 1,
            B: 2,
            WALL: 4,
        }

        this.nrToCellType = {
            0: 'EMPTY',
            1: 'A',
            2: 'B',
            4: 'WALL',
            'x': 'path',
            'X': 'solvedAB'
        }

        this.size = size;
        this.boardMatrix = new Array(size).fill().map(() => Array(size).fill(0));

        this.pointA = [0, 0]
        this.pointB = [this.size - 1, this.size - 1]

        this.boardMatrix[this.pointA[0]][this.pointA[1]] = this.CELLTYPES['A']
        this.boardMatrix[this.pointB[0]][this.pointB[1]] = this.CELLTYPES['B']

        this.boardDiv = document.querySelector('.board');

        this.createBoard();

    }

    /**
     * Makes it possible to change the type of cell (selected with radio) by clicking on it
     */
    makeCellsClickable() {
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach((cell) => {
            cell.addEventListener('click', () => {
                const [r_idx, c_idx] = cell.id.split('_');
                const cellTypeRadio = Array.from(document.querySelectorAll('input[name=cellTypeRadio]'));
                const selectedRadio = cellTypeRadio.filter(radio => radio.checked)[0];
                if (!selectedRadio) {
                    console.log("none of the options are selected");
                    return;
                }

                const newCellType = selectedRadio.value;

                if (newCellType === "A") {
                    this.boardMatrix[this.pointA[0]][this.pointA[1]] = this.CELLTYPES['EMPTY'];
                    this.pointA = [r_idx, c_idx];
                } else if (newCellType === "B") {
                    this.boardMatrix[this.pointB[0]][this.pointB[1]] = this.CELLTYPES['EMPTY'];
                    this.pointB = [r_idx, c_idx];
                } else if (newCellType === "WALL") {
                    if (this.checkIfSameArrays(this.pointA, [r_idx, c_idx]) || this.checkIfSameArrays(this.pointB, [r_idx, c_idx])) {
                        console.log("Can't make wall from point A or B");
                        return;
                    }
                }

                this.boardMatrix[r_idx][c_idx] = this.CELLTYPES[newCellType];
                this.redrawBoard();
            })
        })
    }

    checkIfSameArrays(ar1, ar2) {
        return ar1.every((val, idx) => val == ar2[idx])
    }


    redrawBoard() {
        const allCells = document.querySelectorAll('.cell');
        allCells.forEach((cell) => {
            const [r_idx, c_idx] = cell.id.split('_');
            cell.classList.remove(...Array.from(cell.classList).filter(className => !['cell'].includes(className)));
            cell.classList.add(this.nrToCellType[this.boardMatrix[r_idx][c_idx]])
        })

        if (this.maze && this.maze.solved) {
            clearInterval(this.pathfinding);
        }
    }

    createBoard() {
        this.boardDiv.innerHTML = '';

        for (let r_idx = 0; r_idx < this.size; r_idx++) {
            const row = document.createElement('div');
            row.classList.add('row');
            this.boardDiv.appendChild(row);
            for (let c_idx = 0; c_idx < this.size; c_idx++) {
                const cell = document.createElement("div");
                cell.id = `${r_idx}_${c_idx}`
                cell.classList.add('cell');
                switch (this.boardMatrix[r_idx][c_idx]) {
                    case this.CELLTYPES['EMPTY']:
                        cell.classList.add('EMPTY');
                        break;
                    case this.CELLTYPES['A']:
                        cell.classList.add('A', 'startingPoint');
                        break;
                    case this.CELLTYPES['B']:
                        cell.classList.add('B', 'startingPoint');
                        break;
                    case this.CELLTYPES['WALL']:
                        cell.classList.add('WALL');
                        break;
                    default:
                        break;
                }
                row.appendChild(cell);
            }
        }
        this.makeCellsClickable();
    }

    /**
     * One iteration of the pathfinding algorythm, runs in a loop after runing this.run() function
     */
    iterate() {
        this.maze.step();
        this.boardMatrix = this.maze.getBoardArray();
        this.redrawBoard();
    }

    /**
     * runs the pathfinding algorythm, and changes "start" button to "restart" button 
     */
    run() {
        this.maze = new Maze(this.boardMatrix);

        const startButton = document.querySelector('.start');
        startButton.style.display = 'none';

        const restartButton = document.querySelector('.restart');
        restartButton.style.display = 'block';

        restartButton.addEventListener('click', () => {
            clearInterval(this.pathfinding);
            this.boardMatrix = this.boardMatrix.map((row, r_idx) => {
                return row.map((cell, c_idx) => {
                    if (this.checkIfSameArrays(this.pointA, [r_idx, c_idx])) {
                        return this.CELLTYPES['A']
                    } else if (this.checkIfSameArrays(this.pointB, [r_idx, c_idx])) {
                        return this.CELLTYPES['B']
                    } else {
                        return 0
                    }
                })
            })
            this.createBoard();
            startButton.style.display = 'block';
            restartButton.style.display = 'none';
        })

        this.pathfinding = setInterval(this.iterate.bind(this), 50)
    }

}

var board = new Board(10);

document.querySelector('.start').addEventListener('click', () => {
    board.run();
})

document.querySelector('.changeSize').addEventListener('click', () => {
    const newSize = document.querySelector('input[name=size]').value
    if (newSize) {
        board = new Board(Number(newSize));
    } else {
        console.log("Input new Size");
    }

})


