// Ideia

/* The above code is creating a tetris game. */
// const ROWS = 20;
// const COLS = 10;
// const BLOCK_SIZE = 30;

// const SHAPES = [
//   [1, 1, 1, 1],  // I
//   [1, 1, 0, 0, 1, 1],  // Z
//   [0, 1, 1, 1, 1],  // L
//   [1, 1, 1, 0, 0, 1],  // J
//   [0, 1, 1, 0, 1, 1],  // S
//   [1, 1, 1, 0, 1, 0, 0, 1],  // T
//   [1, 1, 0, 0, 1, 1]  // O
// ];

// class Tetris {
//   private canvas: HTMLCanvasElement;
//   private ctx: CanvasRenderingContext2D;
//   private board: number[][];
//   private activePiece: number[][];
//   private activePieceRow: number;
//   private activePieceCol: number;
//   private timer: number;
//   private isGameOver: boolean;

//   constructor() {
//     this.canvas = document.createElement('canvas');
//     this.canvas.width = COLS * BLOCK_SIZE;
//     this.canvas.height = ROWS * BLOCK_SIZE;
//     this.ctx = this.canvas.getContext('2d');

//     this.board = [];
//     for (let row = 0; row < ROWS; row++) {
//       this.board[row] = [];
//       for (let col = 0; col < COLS; col++) {
//         this.board[row][col] = 0;
//       }
//     }

//     this.activePiece = [];
//     this.newPiece();

//     this.timer = 0;
//     this.isGameOver = false;

//     document.body.appendChild(this.canvas);
//     requestAnimationFrame(this.loop.bind(this));
//   }

//   private newPiece() {
//     const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
//     this.activePiece = [];
//     for (let row = 0; row < shape.length; row += 2) {
//       this.activePiece.push(shape.slice(row, row + 2));
//     }

//     this.activePieceRow = 0;
//     this.activePieceCol = Math.floor(Math.random() * (COLS - this.activePiece[0].length + 1));
//   }

//   private moveDown() {
//     this.activePieceRow++;
//     if (this.collides()) {
//       this.activePieceRow--;
//       this.mergePiece();
//       this.newPiece();
//       if (this.collides()) {
//         this.isGameOver = true;
//       }
//     }
//   }

//   private moveRight() {
//     this.activePieceCol++;
//     if (this.collides()) {
//       this.activePieceCol--;
//     }
//   }

//   private moveLeft() {
//     this.activePieceCol--;
//     if (this.collides()) {
//       this.activePieceCol++;
//     }
//   }

//   private rotate() {
//     const rotatedPiece = [];
//     for (let col = 0; col < this.activePiece[0].length; col++) {
//       const newRow = [];
//       for (let row = this.activePiece.length - 1; row >= 0; row--) {
//         newRow.push(this.activePiece[row][col]);
//       }
//       rotatedPiece.push(newRow);
//     }
//     this.activePiece = rotatedPiece;
//     if (this.collides()) {
//       this.activePiece = this.activePiece[0].map((_, colIndex) => this.activePiece.map((row) => row[colIndex]).reverse());
//       if (this.collides()) {
//         this.activePiece = rotatedPiece;
//         }
//         }
//         }
        
//         private collides(): boolean {
//         for (let row = 0; row < this.activePiece.length; row++) {
//         for (let col = 0; col < this.activePiece[row].length; col++) {
//         if (this.activePiece[row][col] && (this.activePieceRow + row >= ROWS || this.activePieceCol + col < 0 || this.activePieceCol + col >= COLS || this.board[this.activePieceRow + row][this.activePieceCol + col])) {
//         return true;
//         }
//         }
//         }
//         return false;
//         }
        
//         private mergePiece() {
//         for (let row = 0; row < this.activePiece.length; row++) {
//         for (let col = 0; col < this.activePiece[row].length; col++) {
//         if (this.activePiece[row][col]) {
//         this.board[this.activePieceRow + row][this.activePieceCol + col] = 1;
//         }
//         }
//         }
//         this.clearRows();
//         }
        
//         private clearRows() {
//         let rowIdx = ROWS - 1;
//         while (rowIdx >= 0) {
//         if (this.board[rowIdx].every((cell) => cell)) {
//         for (let row = rowIdx; row > 0; row--) {
//         this.board[row] = this.board[row - 1];
//         }
//         this.board[0] = Array.from({ length: COLS }, () => 0);
//         } else {
//         rowIdx--;
//         }
//         }
//         }
        
//         private drawBlock(row: number, col: number) {
//         this.ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
//         this.ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
//         }
        
//         private drawBoard() {
//         for (let row = 0; row < ROWS; row++) {
//         for (let col = 0; col < COLS; col++) {
//         if (this.board[row][col]) {
//         this.ctx.fillStyle = 'black';
//         this.drawBlock(row, col);
//         } else {
//         this.ctx.fillStyle = 'white';
//         this.ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
//         this.ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
//         }
//         }
//         }
//         }
        
//         private drawPiece() {
//         this.ctx.fillStyle = 'black';
//         for (let row = 0; row < this.activePiece.length; row++) {
//         for (let col = 0; col < this.activePiece[row].length; col++) {
//         if (this.activePiece[row][col]) {
//         this.drawBlock(this.activePieceRow + row, this.activePieceCol + col);
//         }
//         }
//         }
//         }
        
//         private drawGameOver() {
//         this.ctx.fillStyle = 'red';
//         this.ctx.font = '48px sans-serif';
//         this.ctx.fillText('Game Over', this.canvas.width / 2 - 120, this.canvas.height / 2);
//         }
        
//         private loop(timestamp: number) {
//         if (!this.isGameOver) {
//         const elapsed = timestamp - this.timer;
//         if (elapsed > 500) {
//         this.timer = timestamp;
//         this.moveDown();
//         }
//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//         this.drawBoard();
//         this.drawPiece();
//         requestAnimationFrame(this.loop.bind(this));
//       } else {
//         this.drawGameOver();
//       }
