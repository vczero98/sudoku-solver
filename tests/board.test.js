const Board = require("../src/logic/board");
const { createTestBoard, createSolvedTestBoard } = require("./test-boards");

test("pens in values", () => {
  const board = createTestBoard();

  expect(board.getSquare(0, 0).pen).toBeNull();

  board.addPen(0, 0, 5);

  expect(board.getSquare(0, 0).pen).toBe(5);
});

test("pencils in values", () => {
  const board = createTestBoard();

  expect(board.getSquare(2, 0).pencil).toHaveLength(0);

  // Pencil in three values
  board.addPencil(2, 0, 1);
  board.addPencil(2, 0, 2);
  board.addPencil(2, 0, 3);

  // Check if values have been penciled in correctly
  expect(board.hasPencil(2, 0, 1)).toBeTruthy();
  expect(board.hasPencil(2, 0, 2)).toBeTruthy();
  expect(board.hasPencil(2, 0, 3)).toBeTruthy();
  expect(board.hasPencil(2, 0, 4)).toBeFalsy();

  // Remove pencil
  board.removePencil(2, 0, 3);
  expect(board.hasPencil(2, 0, 3)).toBeFalsy();
});

test("copies a board", () => {
  const board = createTestBoard();

  board.addPencil(5, 5, 1);
  board.addPencil(5, 5, 2);
  board.addPencil(5, 5, 5);

  const copy = new Board(board);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const boardSquare = board.getSquare(i, j);
      const copySquare = copy.getSquare(i, j);

      // Check value
      expect(boardSquare.value).toBe(copySquare.value);

      // Check pen
      expect(boardSquare.pen).toBe(copySquare.pen);

      // Check pencil
      expect(boardSquare.pencil).toHaveLength(copySquare.pencil.length);
      for (let k = 0; k < boardSquare.pencil.length; k++) {
        expect(boardSquare.pencil[k]).toBe(copySquare.pencil[k]);
      }
    }
  }
});

test("creates board fully filled with values and pens", () => {
  const board = new Board();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (i % 2 == 1) {
        board.addValue(i, j, i + 1);
      } else {
        board.addPen(i, j, i + 1);
      }
    }
  }

  expect(board.isFullyFilled()).toBeTruthy();

  board.removeValue(6, 6);
  board.removePen(6, 6);
  expect(board.isFullyFilled()).toBeFalsy();

  board.addValue(6, 6, 1);
  expect(board.isFullyFilled()).toBeTruthy();

  board.addPen(6, 6, 2);
  expect(board.isFullyFilled()).toBeTruthy();

  board.removeValue(6, 6);
  expect(board.isFullyFilled()).toBeTruthy();

  board.removePen(6, 6);
  expect(board.isFullyFilled()).toBeFalsy();

  /**
   * Manually insert an invalid values. In practice, this should never
   * happen, as board.addValue() already filters out invalid values,
   * but it's still good to know if board.isFullyFilled() picks up on it
   * regardless.
   */
  board.squares[6][6].value = -1;
  expect(board.isFullyFilled()).toBeFalsy();
  board.squares[6][6].pen = -1;
  expect(board.isFullyFilled()).toBeFalsy();
  board.addValue(6, 6, 1);
  expect(board.isFullyFilled()).toBeTruthy();
  board.squares[6][6].value = -1;
  expect(board.isFullyFilled()).toBeFalsy();
  board.addPen(6, 6, 1);
  expect(board.isFullyFilled()).toBeTruthy();

  board.squares[8][8].value = -1;
  board.squares[8][8].pen = null;
  expect(board.isFullyFilled()).toBeFalsy();
});

test("creates board fully filled with pens", () => {
  const board = new Board();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board.addPen(i, j, i + 1);
    }
  }

  expect(board.isFullyFilled()).toBeTruthy();
});

test("creates board fully filled with values", () => {
  const board = new Board();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board.addValue(i, j, i + 1);
    }
  }

  expect(board.isFullyFilled()).toBeTruthy();
});

test("creates board not fully filled", () => {
  const board = createTestBoard();

  expect(board.isFullyFilled()).toBeFalsy();
});

test("gets blocks", () => {
  const board = createTestBoard();

  const isCentreBlock = (block) =>
    block[0].value == null &&
    block[1].value == 6 &&
    block[2].value == null &&
    block[3].value == 8 &&
    block[4].value == null &&
    block[5].value == 3 &&
    block[6].value == null &&
    block[7].value == 2 &&
    block[8].value == null;

  const isBottomRightBlock = (block) =>
    block[0].value == 2 &&
    block[1].value == 8 &&
    block[2].value == null &&
    block[3].value == null &&
    block[4].value == null &&
    block[5].value == 5 &&
    block[6].value == null &&
    block[7].value == 7 &&
    block[8].value == 9;

  for (var i = 3; i < 6; i++) {
    for (var j = 3; j < 6; j++) {
      expect(isCentreBlock(board.getBlock(i, j))).toBeTruthy();
      expect(isBottomRightBlock(board.getBlock(i, j))).toBeFalsy();
    }
  }

  expect(isCentreBlock(board.getBlock(0, 6))).toBeFalsy();
  expect(isCentreBlock(board.getBlock(3, 6))).toBeFalsy();
  expect(isCentreBlock(board.getBlock(3, 2))).toBeFalsy();

  for (var i = 6; i < 9; i++) {
    for (var j = 6; j < 9; j++) {
      expect(isBottomRightBlock(board.getBlock(i, j))).toBeTruthy();
      expect(isCentreBlock(board.getBlock(i, j))).toBeFalsy();
    }
  }

  expect(isBottomRightBlock(board.getBlock(0, 6))).toBeFalsy();
  expect(isBottomRightBlock(board.getBlock(3, 6))).toBeFalsy();
  expect(isBottomRightBlock(board.getBlock(3, 2))).toBeFalsy();
});

test("get rows", () => {
  const board = createTestBoard();

  const row0 = board.getRow(0);

  expect(row0[0].value == 5).toBeTruthy();
  expect(row0[3].value == null).toBeTruthy();
  expect(row0[4].value == 7).toBeTruthy();
  expect(row0[5].value == 8).toBeFalsy();

  const row4 = board.getRow(4);

  expect(row4[0].value == 4).toBeTruthy();
  expect(row4[3].value == 8).toBeTruthy();
  expect(row4[4].value == null).toBeTruthy();
  expect(row4[5].value == 7).toBeFalsy();
});

test("get columns", () => {
  const board = createTestBoard();

  const column0 = board.getColumn(0);

  expect(column0[0].value == 5).toBeTruthy();
  expect(column0[3].value == 8).toBeTruthy();
  expect(column0[4].value == 4).toBeTruthy();
  expect(column0[5].value == 9).toBeFalsy();

  const column4 = board.getColumn(4);

  expect(column4[0].value == 7).toBeTruthy();
  expect(column4[3].value == 6).toBeTruthy();
  expect(column4[4].value == null).toBeTruthy();
  expect(column4[5].value == null).toBeFalsy();
});

test("checks invalid state with row", () => {
  const board = createTestBoard();

  expect(board.hasValidState()).toBeTruthy();

  // Check repeating value in a row
  const invalidRowBoard = new Board(board);
  invalidRowBoard.addPen(5, 3, 7);
  expect(invalidRowBoard.hasValidState()).toBeFalsy();
  invalidRowBoard.removePen(5, 3);
  expect(invalidRowBoard.hasValidState()).toBeTruthy();
  // Only value and pen should be invalid, not pencil
  invalidRowBoard.addPencil(5, 3, 7);
  expect(invalidRowBoard.hasValidState()).toBeTruthy();
  invalidRowBoard.addValue(5, 3, 7);
  expect(invalidRowBoard.hasValidState()).toBeFalsy();
  invalidRowBoard.removeValue(5, 3);
  expect(invalidRowBoard.hasValidState()).toBeTruthy();
});

test("checks invalid state with column", () => {
  const board = createTestBoard();

  expect(board.hasValidState()).toBeTruthy();

  // Check repeating value in a column
  const invalidRowBoard = new Board(board);
  invalidRowBoard.addPen(8, 0, 5);
  expect(invalidRowBoard.hasValidState()).toBeFalsy();
  invalidRowBoard.removePen(8, 0);
  expect(invalidRowBoard.hasValidState()).toBeTruthy();
  // Only value and pen should be invalid, not pencil
  invalidRowBoard.addPencil(8, 0, 5);
  expect(invalidRowBoard.hasValidState()).toBeTruthy();
  invalidRowBoard.addValue(8, 0, 5);
  expect(invalidRowBoard.hasValidState()).toBeFalsy();
  invalidRowBoard.removeValue(8, 0);
  expect(invalidRowBoard.hasValidState()).toBeTruthy();
});

test("checks invalid state with square", () => {
  const board = createTestBoard();

  expect(board.hasValidState()).toBeTruthy();

  // Check repeating value in a square
  const invalidRowBoard = new Board(board);
  invalidRowBoard.addPen(5, 6, 3);
  expect(invalidRowBoard.hasValidState()).toBeFalsy();
  invalidRowBoard.removePen(5, 6);
  expect(invalidRowBoard.hasValidState()).toBeTruthy();
  // Only value and pen should be invalid, not pencil
  invalidRowBoard.addPencil(5, 6, 3);
  expect(invalidRowBoard.hasValidState()).toBeTruthy();
  invalidRowBoard.addValue(5, 6, 3);
  expect(invalidRowBoard.hasValidState()).toBeFalsy();
  invalidRowBoard.removeValue(5, 6);
  expect(invalidRowBoard.hasValidState()).toBeTruthy();
});

test("checks if a board is solved", () => {
  const board = createSolvedTestBoard();

  expect(board.isSolved()).toBeTruthy();
  board.removeValue(8, 8);
  expect(board.isSolved()).toBeFalsy();
  board.addPen(8, 8, 9);
  expect(board.isSolved()).toBeTruthy();
  board.addPen(8, 8, 1);
  expect(board.isSolved()).toBeFalsy();
  board.addPen(8, 8, 9);
  expect(board.isSolved()).toBeTruthy();
  board.removePen(8, 8, 9);
  expect(board.isSolved()).toBeFalsy();
  board.addValue(8, 8, 9);
  expect(board.isSolved()).toBeTruthy();

  /**
   * Manually insert an invalid value. In practice, this should never
   * happen, as board.addValue() already filters out invalid values,
   * but it's still good to know if board.isSolved() picks up on it
   * regardless.
   */
  board.squares[8][8].value = -1;
  expect(board.isFullyFilled()).toBeFalsy();
  board.addPen(8, 8, 9);
  expect(board.isSolved()).toBeTruthy();
});

test("pens in invalid number", () => {
  const board = new Board();

  const addedInvalidPenA = board.addPen(0, 0, "a");
  expect(addedInvalidPenA).toBeFalsy();
  expect(board.getSquare(0, 0).pen).toBeNull();

  const addedInvalidPen10 = board.addPen(0, 0, 10);
  expect(addedInvalidPen10).toBeFalsy();
  expect(board.getSquare(0, 0).pen).toBeNull();

  const addedInvalidPenMinus1 = board.addPen(0, 0, -1);
  expect(addedInvalidPenMinus1).toBeFalsy();
  expect(board.getSquare(0, 0).pen).toBeNull();

  const addedValidPen = board.addPen(0, 0, 7);
  expect(addedValidPen).toBeTruthy();
  expect(board.getSquare(0, 0).pen).toBe(7);

  // Invalid insertion should leave the state unaffected
  const addedInvalidPenMinus2 = board.addPen(0, 0, "-2");
  expect(addedInvalidPenMinus2).toBeFalsy();
  expect(board.getSquare(0, 0).pen).toBe(7);
});

test("pencils in invalid number", () => {
  const board = new Board();

  const addedInvalidPencilA = board.addPencil(0, 0, "a");
  expect(addedInvalidPencilA).toBeFalsy();
  expect(board.getSquare(0, 0).pencil).toHaveLength(0);

  const addedInvalidPencil10 = board.addPencil(0, 0, 10);
  expect(addedInvalidPencil10).toBeFalsy();
  expect(board.getSquare(0, 0).pencil).toHaveLength(0);

  const addedInvalidPencilMinus1 = board.addPencil(0, 0, -1);
  expect(addedInvalidPencilMinus1).toBeFalsy();
  expect(board.getSquare(0, 0).pencil).toHaveLength(0);

  const addedValidPencil = board.addPencil(0, 0, 7);
  expect(addedValidPencil).toBeTruthy();
  expect(board.getSquare(0, 0).pencil).toHaveLength(1);
  expect(board.getSquare(0, 0).pencil[0]).toBe(7);

  // Invalid insertion should leave the state unaffected
  const addedInvalidPencilMinus2 = board.addPencil(0, 0, "-2");
  expect(addedInvalidPencilMinus2).toBeFalsy();
  expect(board.getSquare(0, 0).pencil).toHaveLength(1);
  expect(board.getSquare(0, 0).pencil[0]).toBe(7);
});

test("adds invalid value", () => {
  const board = new Board();

  const addedInvalidValueA = board.addValue(0, 0, "a");
  expect(addedInvalidValueA).toBeFalsy();
  expect(board.getSquare(0, 0).value).toBeNull();

  const addedInvalidValue10 = board.addValue(0, 0, 10);
  expect(addedInvalidValue10).toBeFalsy();
  expect(board.getSquare(0, 0).value).toBeNull();

  const addedInvalidValueMinus1 = board.addValue(0, 0, -1);
  expect(addedInvalidValueMinus1).toBeFalsy();
  expect(board.getSquare(0, 0).value).toBeNull();

  const addedValidValue = board.addValue(0, 0, 7);
  expect(addedValidValue).toBeTruthy();
  expect(board.getSquare(0, 0).value).toBe(7);

  // Invalid insertion should leave the state unaffected
  const addedInvalidValueMinus2 = board.addValue(0, 0, "-2");
  expect(addedInvalidValueMinus2).toBeFalsy();
  expect(board.getSquare(0, 0).value).toBe(7);
});

test("pencils in duplicates", () => {
  const board = new Board();

  // No pencils to start off with
  expect(board.getSquare(0, 0).pencil).toHaveLength(0);
  expect(board.hasPencil(0, 0, 1)).toBeFalsy();
  expect(board.hasPencil(0, 0, 2)).toBeFalsy();

  // Pencil in 1
  board.addPencil(0, 0, 1);
  expect(board.getSquare(0, 0).pencil).toHaveLength(1);
  expect(board.getSquare(0, 0).pencil).toContain(1);
  expect(board.hasPencil(0, 0, 1)).toBeTruthy();
  expect(board.hasPencil(0, 0, 2)).toBeFalsy();

  // Pencil in 2
  board.addPencil(0, 0, 2);
  expect(board.getSquare(0, 0).pencil).toHaveLength(2);
  expect(board.getSquare(0, 0).pencil).toContain(1);
  expect(board.getSquare(0, 0).pencil).toContain(2);
  expect(board.hasPencil(0, 0, 1)).toBeTruthy();
  expect(board.hasPencil(0, 0, 2)).toBeTruthy();

  // Pencil in 2 again, should not be added again
  board.addPencil(0, 0, 2);
  expect(board.getSquare(0, 0).pencil).toHaveLength(2);
  expect(board.getSquare(0, 0).pencil).toContain(1);
  expect(board.getSquare(0, 0).pencil).toContain(2);
  expect(board.hasPencil(0, 0, 1)).toBeTruthy();
  expect(board.hasPencil(0, 0, 2)).toBeTruthy();

  // Remove 2, only 1 should remain
  board.removePencil(0, 0, 2);
  expect(board.getSquare(0, 0).pencil).toHaveLength(1);
  expect(board.getSquare(0, 0).pencil).toContain(1);
  expect(board.hasPencil(0, 0, 1)).toBeTruthy();
  expect(board.hasPencil(0, 0, 2)).toBeFalsy();

  // Remove 1, no pencil should remain
  board.removePencil(0, 0, 1);
  expect(board.getSquare(0, 0).pencil).toHaveLength(0);
  expect(board.hasPencil(0, 0, 1)).toBeFalsy();
  expect(board.hasPencil(0, 0, 2)).toBeFalsy();
});

test("removes multiple pencils at once", () => {
  const board = new Board();

  // No pencils to start off with
  expect(board.getSquare(0, 0).pencil).toHaveLength(0);
  expect(board.hasPencil(0, 0, 1)).toBeFalsy();
  expect(board.hasPencil(0, 0, 2)).toBeFalsy();

  // Pencil in 1
  board.addPencil(0, 0, 1);
  expect(board.getSquare(0, 0).pencil).toHaveLength(1);

  // Pencil in 2
  board.addPencil(0, 0, 2);
  expect(board.getSquare(0, 0).pencil).toHaveLength(2);

  // Pencil in 7
  board.addPencil(0, 0, 7);
  expect(board.getSquare(0, 0).pencil).toHaveLength(3);

  // Remove all pencils
  board.removePencil(0, 0);
  expect(board.getSquare(0, 0).pencil).toHaveLength(0);
});
