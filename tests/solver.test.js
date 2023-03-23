const Board = require("../src/logic/board");
const Solver = require("../src/logic/solver");
const {
  createTestBoard,
  createTestBoardHard,
  createTestBoardMedium,
} = require("./test-boards");

test("pencils in values on board", () => {
  const originalBoard = createTestBoard();

  const board = Solver.pencilValues(originalBoard);

  Solver.pencilValues(board);

  expect(board.hasValidState()).toBeTruthy();

  // Value given, should have no pencil
  const square40 = board.getSquare(4, 0);
  expect(square40.value).not.toBeNull();
  expect(square40.pencil).toHaveLength(0);

  // Value penned in, should have no pencil
  const square03 = board.getSquare(0, 3);
  expect(square03.pen).not.toBeNull();
  expect(square03.pencil).toHaveLength(0);

  // No value or pen, should have pencils
  const square41 = board.getSquare(4, 1);
  expect(square41.value).toBeNull();
  expect(square41.pen).toBeNull();
  expect(square41.pencil).toHaveLength(2);
  expect(square41.pencil).toContain(2);
  expect(square41.pencil).toContain(5);

  const square26 = board.getSquare(2, 6);
  expect(square26.value).toBeNull();
  expect(square26.pen).toBeNull();
  expect(square26.pencil).toHaveLength(4);
  expect(square26.pencil).toContain(3);
  expect(square26.pencil).toContain(4);
  expect(square26.pencil).toContain(5);
  expect(square26.pencil).toContain(7);
});

test("pens in single pencil values simple", () => {
  // A simple board, where only one value should be filled in
  const board = new Board();

  board.addPencil(0, 3, 3);
  board.addPencil(0, 3, 5);

  board.addPencil(7, 6, 1);

  const pennedBoard = Solver.penSinglePencilValues(board);

  const square03 = pennedBoard.getSquare(0, 3);
  const square76 = pennedBoard.getSquare(7, 6);

  // Square with two pencils
  expect(square03.pencil).toHaveLength(2);
  expect(square03.pen).toBeNull();
  expect(square03.value).toBeNull();

  // Square filled in
  expect(square76.pencil).toHaveLength(0);
  expect(square76.pen).toBe(1);
  expect(square76.value).toBeNull();
});

test("pens in single pencil values by row", () => {
  const board = new Board();

  board.addPencil(0, 0, 1);

  board.addPencil(0, 5, 1);
  board.addPencil(0, 5, 2);

  board.addPencil(0, 8, 1);
  board.addPencil(0, 8, 5);
  board.addPencil(0, 8, 8);

  const pennedBoard = Solver.penSinglePencilValues(board);

  const square00 = pennedBoard.getSquare(0, 0);
  const square05 = pennedBoard.getSquare(0, 5);
  const square08 = pennedBoard.getSquare(0, 8);

  expect(square00.pencil).toHaveLength(0);
  expect(square00.pen).toBe(1);
  expect(square00.value).toBeNull();

  expect(square05.pencil).toHaveLength(0);
  expect(square05.pen).toBe(2);
  expect(square05.value).toBeNull();

  expect(square08.pencil).toHaveLength(2);
  expect(square08.hasPencil(1)).toBeFalsy();
  expect(square08.hasPencil(5)).toBeTruthy();
  expect(square08.hasPencil(8)).toBeTruthy();
  expect(square08.pen).toBeNull();
  expect(square08.value).toBeNull();
});

test("pens in single pencil values by column", () => {
  const board = new Board();

  board.addPencil(0, 0, 1);

  board.addPencil(5, 0, 1);
  board.addPencil(5, 0, 2);

  board.addPencil(8, 0, 1);
  board.addPencil(8, 0, 5);
  board.addPencil(8, 0, 8);

  const pennedBoard = Solver.penSinglePencilValues(board);

  const square00 = pennedBoard.getSquare(0, 0);
  const square50 = pennedBoard.getSquare(5, 0);
  const square80 = pennedBoard.getSquare(8, 0);

  expect(square00.pencil).toHaveLength(0);
  expect(square00.pen).toBe(1);
  expect(square00.value).toBeNull();

  expect(square50.pencil).toHaveLength(0);
  expect(square50.pen).toBe(2);
  expect(square50.value).toBeNull();

  expect(square80.pencil).toHaveLength(2);
  expect(square80.hasPencil(1)).toBeFalsy();
  expect(square80.hasPencil(5)).toBeTruthy();
  expect(square80.hasPencil(8)).toBeTruthy();
  expect(square80.pen).toBeNull();
  expect(square80.value).toBeNull();
});

test("pens in single pencil values by block", () => {
  const board = new Board();

  board.addPencil(0, 0, 1);

  board.addPencil(1, 1, 1);
  board.addPencil(1, 1, 2);

  board.addPencil(2, 2, 1);
  board.addPencil(2, 2, 5);
  board.addPencil(2, 2, 8);

  const pennedBoard = Solver.penSinglePencilValues(board);

  const square00 = pennedBoard.getSquare(0, 0);
  const square11 = pennedBoard.getSquare(1, 1);
  const square22 = pennedBoard.getSquare(2, 2);

  expect(square00.pencil).toHaveLength(0);
  expect(square00.pen).toBe(1);
  expect(square00.value).toBeNull();

  expect(square11.pencil).toHaveLength(0);
  expect(square11.pen).toBe(2);
  expect(square11.value).toBeNull();

  expect(square22.pencil).toHaveLength(2);
  expect(square22.hasPencil(1)).toBeFalsy();
  expect(square22.hasPencil(5)).toBeTruthy();
  expect(square22.hasPencil(8)).toBeTruthy();
  expect(square22.pen).toBeNull();
  expect(square22.value).toBeNull();
});

test("pens in single pencil values with interdependent squares", () => {
  // A board where once values are filled in, other values depend on it too
  const board = new Board();

  // Should remain untouched
  board.addPencil(0, 3, 3);
  board.addPencil(0, 3, 5);

  // Same row
  board.addPencil(1, 1, 5);
  board.addPencil(1, 1, 9);

  // Same column
  board.addPencil(1, 7, 2);
  board.addPencil(1, 7, 5);

  // Multiple values, should have two pencils remaining
  board.addPencil(2, 7, 2);
  board.addPencil(2, 7, 3);
  board.addPencil(2, 7, 4);

  // Value should remain unchanged
  board.addValue(4, 0, 7);

  // Pen should remain unchanged
  board.addPen(5, 0, 8);

  // Same block
  board.addPencil(6, 7, 1);
  board.addPencil(6, 7, 2);

  // Single value
  board.addPencil(7, 6, 1);

  const pennedBoard = Solver.penSinglePencilValues(board);

  const square03 = pennedBoard.getSquare(0, 3);
  const square11 = pennedBoard.getSquare(1, 1);
  const square17 = pennedBoard.getSquare(1, 7);
  const square27 = pennedBoard.getSquare(2, 7);
  const square40 = pennedBoard.getSquare(4, 0);
  const square50 = pennedBoard.getSquare(5, 0);
  const square67 = pennedBoard.getSquare(6, 7);
  const square76 = pennedBoard.getSquare(7, 6);

  // Square with two pencils
  expect(square03.pencil).toHaveLength(2);
  expect(square03.pen).toBeNull();
  expect(square03.value).toBeNull();

  // Square filled in by same row, value from 4th pass
  expect(square11.pencil).toHaveLength(0);
  expect(square11.pen).toBe(9);
  expect(square11.value).toBeNull();

  // Square filled in by same column, value from 3rd pass
  expect(square17.pencil).toHaveLength(0);
  expect(square17.pen).toBe(5);
  expect(square17.value).toBeNull();

  // Square with two pencils remaining
  expect(square27.pencil).toHaveLength(2);
  expect(square27.hasPencil(2)).toBeFalsy();
  expect(square27.hasPencil(3)).toBeTruthy();
  expect(square27.hasPencil(4)).toBeTruthy();
  expect(square27.value).toBeNull();

  // Square with value, should be unchaged
  expect(square40.pencil).toHaveLength(0);
  expect(square40.value).toBe(7);
  expect(square40.pen).toBeNull();

  // Square with pen, should be unchaged
  expect(square50.pencil).toHaveLength(0);
  expect(square50.value).toBeNull();
  expect(square50.pen).toBe(8);

  // Square filled in by same column, value from 2nd pass
  expect(square67.pencil).toHaveLength(0);
  expect(square67.value).toBeNull();
  expect(square67.pen).toBe(2);

  // Square filled in
  expect(square76.pencil).toHaveLength(0);
  expect(square76.pen).toBe(1);
  expect(square76.value).toBeNull();
});

test("solves board", () => {
  const originalBoard = createTestBoard();

  const solvedBoard = Solver.solve(originalBoard);

  expect(originalBoard.isSolved()).toBeFalsy();
  expect(solvedBoard.isSolved()).toBeTruthy();
});

test("solves medium board", () => {
  const originalBoard = createTestBoardMedium();

  const solvedBoard = Solver.solve(originalBoard);

  expect(originalBoard.isSolved()).toBeFalsy();
  expect(solvedBoard.isSolved()).toBeTruthy();
});

test("solves hard board", () => {
  const originalBoard = createTestBoardHard();

  const solvedBoard = Solver.solve(originalBoard);

  console.log(originalBoard.stateToString());
  console.log(solvedBoard.stateToString());

  expect(originalBoard.isSolved()).toBeFalsy();
  expect(solvedBoard.isSolved()).toBeTruthy();
});

test("attempts to solve unsolvable board", () => {
  const originalBoard = createTestBoardMedium();

  originalBoard.addValue(2, 2, 7);

  const solvedBoard = Solver.solve(originalBoard);

  expect(originalBoard.isSolved()).toBeFalsy();
  expect(solvedBoard).toBe(false);
});
