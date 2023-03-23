const Square = require("./square");

const Board = class {
  // Construct new board
  constructor(board) {
    // The squares in the board
    this.squares = [];

    // Initialise the board
    for (let i = 0; i < 9; i++) {
      this.squares[i] = [];
      for (let j = 0; j < 9; j++) {
        if (board) {
          // Create from existing board
          this.squares[i][j] = new Square(board.squares[i][j]);
        } else {
          // New board
          this.squares[i][j] = new Square();
        }
      }
    }
  }

  isValidCoordinate(n) {
    return !isNaN(n) && n >= 0 && n < 9;
  }

  // Get the state of a given square on the board
  getSquare(x, y) {
    return this.squares[x][y];
  }

  // Pencil in a potential value
  addPencil(x, y, value) {
    if (!this.isValidCoordinate(x) || !this.isValidCoordinate(y)) {
      return false;
    }

    return this.squares[x][y].addPencil(value);
  }

  // Erase a pontential pencilled value
  removePencil(x, y, value) {
    if (!this.isValidCoordinate(x) || !this.isValidCoordinate(y)) {
      return false;
    }

    return this.squares[x][y].removePencil(value);
  }

  // Check whether a square has a value pencilled in
  hasPencil(x, y, value) {
    return this.squares[x][y].hasPencil(value);
  }

  // Add solved pen value
  addPen(x, y, value) {
    if (!this.isValidCoordinate(x) || !this.isValidCoordinate(y)) {
      return false;
    }

    return this.squares[x][y].addPen(value);
  }

  // Remove solved pen value
  removePen(x, y) {
    if (!this.isValidCoordinate(x) || !this.isValidCoordinate(y)) {
      return false;
    }

    return this.squares[x][y].removePen();
  }

  // Add a given starting value
  addValue(x, y, value) {
    if (!this.isValidCoordinate(x) || !this.isValidCoordinate(y)) {
      return false;
    }

    return this.squares[x][y].addValue(value);
  }

  // Remove a given starting value
  removeValue(x, y) {
    return this.squares[x][y].removeValue(x, y);
  }

  // Whether each square has a value or pen
  isFullyFilled() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const square = this.squares[i][j];
        if (
          (square.value == null || !square.isValidNumber(square.value)) &&
          (square.pen == null || !square.isValidNumber(square.pen))
        ) {
          return false;
        }
      }
    }

    return true;
  }

  // Get a row
  getRow(rowNumber) {
    const row = [];

    for (let i = 0; i < 9; i++) {
      row.push(this.getSquare(rowNumber, i));
    }

    return row;
  }

  // Get a column
  getColumn(columnNumber) {
    const column = [];

    for (let i = 0; i < 9; i++) {
      column.push(this.getSquare(i, columnNumber));
    }

    return column;
  }

  // Get the block of a square
  getBlock(x, y) {
    const block = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        block.push(
          this.getSquare(Math.floor(x / 3) * 3 + i, Math.floor(y / 3) * 3 + j)
        );
      }
    }

    return block;
  }

  // Check if the board is in a valid state
  hasValidState() {
    const hasDuplicates = (squares) => {
      for (let i = 1; i < 10; i++) {
        if (
          squares.filter(({ value, pen }) => value == i || pen == i).length > 1
        ) {
          return true;
        }
      }

      return false;
    };

    // Check rows
    for (let i = 0; i < 9; i++) {
      const row = this.getRow(i);

      if (hasDuplicates(row)) {
        return false;
      }
    }

    // Check columns
    for (let i = 0; i < 9; i++) {
      const column = this.getColumn(i);

      if (hasDuplicates(column)) {
        return false;
      }
    }

    // Check blocks
    for (let x = 0; x < 9; x += 3) {
      for (let y = 0; y < 9; y += 3) {
        const blocks = this.getBlock(x, y);

        if (hasDuplicates(blocks)) {
          return false;
        }
      }
    }

    return true;
  }

  isSolved() {
    return this.isFullyFilled() && this.hasValidState();
  }

  stateToString() {
    let string = "";

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        // Add value, or pen, or space
        if (this.squares[i][j].value != null) {
          string += this.squares[i][j].value;
        } else if (this.squares[i][j].pen != null) {
          string += this.squares[i][j].pen;
        } else {
          string += " ";
        }

        // Gridlines
        if (j == 2 || j == 5) {
          string += "|";
        }
      }

      // Gridlines
      if (i == 2 || i == 5) {
        string += "\n" + "-".repeat(11);
      }
      string += "\n";
    }

    return string;
  }
};

module.exports = Board;
