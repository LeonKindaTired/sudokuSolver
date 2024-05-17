function sudoku(puzzle) {
  function isValid(puzzle, row, col, num) {
    for(let x = 0; x < 9; x++) {
      if(puzzle[row][x] === num || puzzle[x][col] === num) return false;
    }

    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(puzzle[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  }

  function findEmpty(puzzle){
    for(let row = 0; row<9; row++) {
      for(let col = 0; col < 9; col++) {
        if(puzzle[row][col] === 0) return [row, col];
      }
    }
    return null;
  }

  function solver(puzzle) {
    const emptyPos = findEmpty(puzzle);

    if(!emptyPos) return true;

    const [row, col] = emptyPos;

    for(let num = 1; num <= 9; num++) {
      if(isValid(puzzle, row, col, num)) {
        puzzle[row][col] = num;
        if(solver(puzzle)) return true;
        puzzle[row][col] = 0;
      }
    }
    return false;
  }

  return (solver(puzzle)) ? puzzle : null;
}

const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Solve the puzzle
const solvedPuzzle = sudoku(puzzle);
if (solvedPuzzle) {
  console.log("Solved Puzzle:");
  solvedPuzzle.forEach(row => console.log(row.join(' ')));
} else {
  console.log("No Solution");
}