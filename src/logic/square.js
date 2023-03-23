/**
 * A square on the Sudoku board that contains a number.
 * Value is a given number that's part of the problem and
 * not the solution. Pen is a solution found. Pencil
 * contains the possible numbers.
 */
const Square = class {
  constructor(square) {
    if (!square) {
      // New square
      this.value = null; // The default, given value of the square
      this.pen = null; // The solved value of the square
      this.pencil = []; // The potential values of the square
    } else {
      // Construct from existing square
      this.value = square.value;
      this.pen = square.pen;
      this.pencil = [...square.pencil];
    }
  }

  isValidNumber(n) {
    return !isNaN(n) && n >= 1 && n <= 9;
  }

  // Pencil in a potential value
  addPencil(n) {
    if (!this.isValidNumber(n)) {
      return false;
    }

    this.removePencil(n); // Make sure there are no duplicates
    this.pencil = [...this.pencil, n].sort();
    return true;
  }

  // Erase a pontential pencilled value
  removePencil(n) {
    if (n) {
      // Remove single value
      this.pencil = this.pencil.filter((v) => v != n);
    } else {
      // Remove all values
      this.pencil = [];
    }

    return true;
  }

  // Check whether a square has a value pencilled in
  hasPencil(n) {
    return this.pencil.includes(n);
  }

  // Add solved pen value
  addPen(n) {
    if (!this.isValidNumber(n)) {
      return false;
    }

    this.pen = n;

    return true;
  }

  // Remove solved pen value
  removePen() {
    this.pen = null;
    return true;
  }

  // Add a given starting value
  addValue(n) {
    if (!this.isValidNumber(n)) {
      return false;
    }

    this.value = n;

    return true;
  }

  // Remove a given starting value
  removeValue() {
    this.value = null;

    return true;
  }
};

module.exports = Square;
