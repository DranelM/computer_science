const boardDiv = document.querySelector('.board');
const maze = new Maze();
var theGame;

const refreshBoard = (boardDiv, maze) => {
    boardDiv.innerHTML = '';
    const size = maze.size;
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        boardDiv.appendChild(row);
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add('cell');
            switch (maze.maze[j][i].visitedBy) {
                case BY_A:
                    cell.classList.add('BY_A');
                    break;
                case BY_B:
                    cell.classList.add('BY_B');
                    break;
                case WALL:
                    cell.classList.add('WALL');
                    break;
                case 'x':
                    cell.classList.add('path');
                    break;
                case 'X':
                    cell.classList.add('solvedAB');
                    break;
                default:
                    break;
            }
            row.appendChild(cell);
        }
    }
    if (maze.solved) {
        clearInterval(theGame);
    }
}

refreshBoard(boardDiv, maze);

const refresh = () => {
    maze.step();
    refreshBoard(boardDiv, maze);
}

document
    .querySelector('.start')
    .addEventListener('click', function solveStep() {
        theGame = setInterval(refresh, 50)
    })



