const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const board: boolean[][] = [];

for (let y = 0; y < BOARD_HEIGHT; y++) {
  board.push([]);
  for (let x = 0; x < BOARD_WIDTH; x++) {
    board[y].push(false);
  }
}
