const Board = require("../src/logic/board");

// Create a board used for testing
const createTestBoard = () => {
  const board = new Board();

  board.addValue(0, 0, 5);
  board.addValue(0, 1, 3);
  board.addValue(0, 4, 7);
  board.addValue(1, 0, 6);
  board.addValue(1, 3, 1);
  board.addValue(1, 4, 9);
  board.addValue(1, 5, 5);
  board.addValue(2, 1, 9);
  board.addValue(2, 2, 8);
  board.addValue(2, 7, 6);
  board.addValue(3, 0, 8);
  board.addValue(3, 4, 6);
  board.addValue(3, 8, 3);
  board.addValue(4, 0, 4);
  board.addValue(4, 3, 8);
  board.addValue(4, 5, 3);
  board.addValue(4, 8, 1);
  board.addValue(5, 0, 7);
  board.addValue(5, 4, 2);
  board.addValue(5, 8, 6);
  board.addValue(6, 1, 6);
  board.addValue(6, 6, 2);
  board.addValue(6, 7, 8);
  board.addValue(7, 3, 4);
  board.addValue(7, 4, 1);
  board.addValue(7, 5, 9);
  board.addValue(7, 8, 5);
  board.addValue(8, 4, 8);
  board.addValue(8, 7, 7);
  board.addValue(8, 8, 9);

  board.addPen(0, 2, 4);
  board.addPen(0, 3, 6);
  board.addPen(8, 6, 1);

  board.addPencil(0, 2, 4);
  board.addPencil(3, 3, 5);
  board.addPencil(3, 3, 7);
  board.addPencil(3, 3, 9);
  board.addPencil(8, 0, 1);
  board.addPencil(8, 0, 2);
  board.addPencil(8, 0, 3);

  return board;
};

// Fill in the missing values of the test board
const createSolvedTestBoard = () => {
  const board = createTestBoard();

  // Pen in the missing values
  board.addPen(0, 2, 4);
  board.addPen(0, 3, 6);
  board.addPen(0, 5, 8);
  board.addPen(0, 6, 9);
  board.addPen(0, 7, 1);
  board.addPen(0, 8, 2);
  board.addPen(1, 1, 7);
  board.addPen(1, 2, 2);
  board.addPen(1, 6, 3);
  board.addPen(1, 7, 4);
  board.addPen(1, 8, 8);
  board.addPen(2, 0, 1);
  board.addPen(2, 3, 3);
  board.addPen(2, 4, 4);
  board.addPen(2, 5, 2);
  board.addPen(2, 6, 5);
  board.addPen(2, 8, 7);
  board.addPen(3, 1, 5);
  board.addPen(3, 2, 9);
  board.addPen(3, 3, 7);
  board.addPen(3, 5, 1);
  board.addPen(3, 6, 4);
  board.addPen(3, 7, 2);
  board.addPen(4, 1, 2);
  board.addPen(4, 2, 6);
  board.addPen(4, 4, 5);
  board.addPen(4, 6, 7);
  board.addPen(4, 7, 9);
  board.addPen(5, 1, 1);
  board.addPen(5, 2, 3);
  board.addPen(5, 3, 9);
  board.addPen(5, 5, 4);
  board.addPen(5, 6, 8);
  board.addPen(5, 7, 5);
  board.addPen(6, 0, 9);
  board.addPen(6, 2, 1);
  board.addPen(6, 3, 5);
  board.addPen(6, 4, 3);
  board.addPen(6, 5, 7);
  board.addPen(6, 8, 4);
  board.addPen(7, 0, 2);
  board.addPen(7, 1, 8);
  board.addPen(7, 2, 7);
  board.addPen(7, 6, 6);
  board.addPen(7, 7, 3);
  board.addPen(8, 0, 3);
  board.addPen(8, 1, 4);
  board.addPen(8, 2, 5);
  board.addPen(8, 3, 2);
  board.addPen(8, 5, 6);
  board.addPen(8, 6, 1);

  return board;
};

module.exports = { createTestBoard, createSolvedTestBoard };
