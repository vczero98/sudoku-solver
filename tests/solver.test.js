const Board = require("../src/logic/board");
const Solver = require("../src/logic/solver");
const { createTestBoard } = require("./test-boards");

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

test("pens in single pencil values", () => {
  const board = new Board();

  // Squares with multiple pencils
  board.addPencil(0, 0, 1);
  board.addPencil(0, 0, 2);

  board.addPencil(4, 4, 4);
  board.addPencil(4, 4, 5);
  board.addPencil(4, 4, 7);

  // Squares with only one pencil
  board.addPencil(4, 5, 3);
  board.addPencil(6, 0, 2);

  const pennedBoard = Solver.penSinglePencilValues(board);

  const square00 = pennedBoard.getSquare(0, 0);
  const square44 = pennedBoard.getSquare(4, 4);
  const square45 = pennedBoard.getSquare(4, 5);
  const square60 = pennedBoard.getSquare(6, 0);
  const square82 = pennedBoard.getSquare(8, 2);

  // Squares with two pencils
  expect(square00.pencil).toHaveLength(2);
  expect(square00.pen).toBeNull();
  expect(square00.value).toBeNull();

  expect(square44.pencil).toHaveLength(3);
  expect(square44.pen).toBeNull();
  expect(square44.value).toBeNull();

  // Squares with only one pencil
  expect(square45.pencil).toHaveLength(0);
  expect(square45.pen).toBe(3);
  expect(square45.value).toBeNull();

  expect(square60.pencil).toHaveLength(0);
  expect(square60.pen).toBe(2);
  expect(square60.value).toBeNull();

  // Square with no pencil
  expect(square82.pencil).toHaveLength(0);
  expect(square82.pen).toBeNull();
  expect(square82.value).toBeNull();
});

test("solves board", () => {
  const originalBoard = createTestBoard();

  const board = Solver.solve(originalBoard);

  console.log(originalBoard.stateToString());
  console.log(board.stateToString());
  console.log(board.getSquare(0, 6));

  // TODO: Values not pencilled in?
});
