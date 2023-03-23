const Board = require("./board");

// Pencil in the potential values
const pencilValues = (originalBoard) => {
  const board = new Board(originalBoard);

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      // Remove previous pencils
      board.removePencil(x, y);

      const square = board.getSquare(x, y);

      // Check if the square is not filled in already
      if (square.value == null && square.pen == null) {
        const row = board.getRow(x);
        const column = board.getColumn(y);
        const block = board.getBlock(x, y);

        // The numbers that already exist in the row, column or block of the square
        const getUsedNumbers = (squares) =>
          squares.reduce((acc, current) => {
            if (current.value) {
              return [...acc, current.value];
            } else if (current.pen) {
              return [...acc, current.pen];
            }
            return acc;
          }, []);

        const usedNumbers = [
          ...getUsedNumbers(row),
          ...getUsedNumbers(column),
          ...getUsedNumbers(block),
        ];

        // Array from 1 to 9
        const oneToNine = Array.from({ length: 9 }, (_, i) => i + 1);

        // Numbers that don't include used values
        const potentialValues = oneToNine.filter(
          (n) => !usedNumbers.includes(n)
        );

        // Pencil in filtered
        potentialValues.forEach((n) => board.addPencil(x, y, n));
      }
    }
  }

  return board;
};

// Here we pen in squares that only have a single pencil value
const penSinglePencilValues = (originalBoard) => {
  const board = new Board(originalBoard);

  // We keep repeating this, until no single values remain
  let identifiedValue = true;

  while (identifiedValue) {
    identifiedValue = false;

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        const square = board.getSquare(x, y);

        if (
          square.value == null &&
          square.pen == null &&
          square.pencil.length == 1
        ) {
          const number = square.pencil[0];

          // Add pen
          board.addPen(x, y, number);

          // Remove this number from row, column and block
          board.getRow(x).forEach((square) => square.removePencil(number));
          board.getColumn(y).forEach((square) => square.removePencil(number));
          board.getBlock(x, y).forEach((square) => square.removePencil(number));

          // A value has changed, therefore we repeat this process
          identifiedValue = true;
        }
      }
    }
  }

  return board;
};

const solve = (originalBoard) => {
  const board = new Board(originalBoard);

  // Pencil in potential values
  const pencilledBoard = pencilValues(board);

  // Pen in values that only have one pencil
  const pennedBoard = penSinglePencilValues(pencilledBoard);

  return pennedBoard;

  /*
  // Check if the board is solved
  if (pennedBoard.isSolved()) {
    return pennedBoard;
  } else if (!pennedBoard.hasValidState()) {
    // If the board is not in a valid state, it is not solvable
    return false;
  }

  // Find the first pencilled square and split on it
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const square = pennedBoard.getSquare(x, y);
      if (square.value == null && square.pen == null) {
        const pencilledValues = square.pencil;

        // Here we create new boards by penning in the pencilled values
        const newPotentialBoards = pencilledValues.map((pencilledValue) => {
          const newPotentialBoard = new Board(board);
          board.removePencil(x, y);
          board.addPen(pencilledValue);
          return newPotentialBoard;
        });

        // We continue solving each potential boards, and if on ends up invalid we abondon it
        for (let i = 0; i < newPotentialBoards.length; i++) {
          const attempt = solve(newPotentialBoards[i]);

          if (attempt) {
            return attempt;
          }
        }

        // None of our attempts lead to a solved board, meaning it is unsolvable from current configuration
        return false;
      }
    }
  }

  return false;
  */
};

const Solver = { pencilValues, penSinglePencilValues, solve };

module.exports = Solver;
