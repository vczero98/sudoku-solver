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
          this.squares[i][j] = {
            ...board.squares[i][j],
            pencil: [...board.squares[i][j].pencil],
          };
        } else {
          // New board
          this.squares[i][j] = {
            value: null, // The default, given value of the square
            pen: null, // The solved value of the square
            pencil: [], // The potential values of the square
          };
        }
      }
    }
  }

  isValidNumber(n) {
    return !isNaN(n) && n >= 1 && n <= 9;
  }

  // Get the state of a given square on the board
  getSquare(x, y) {
    return this.squares[x][y];
  }

  // Pencil in a potential value
  addPencil(x, y, value) {
    if (
      !this.isValidNumber(value) ||
      !this.isValidNumber(x + 1) ||
      !this.isValidNumber(y + 1)
    ) {
      return false;
    }

    this.removePencil(x, y, value); // Make sure there are no duplicates
    this.squares[x][y].pencil = [...this.squares[x][y].pencil, value];

    return true;
  }

  // Erase a pontential penciled value
  removePencil(x, y, value) {
    if (value) {
      // Remove single value
      this.squares[x][y].pencil = this.squares[x][y].pencil.filter(
        (v) => v != value
      );
    } else {
      // Remove all values
      this.squares[x][y].pencil = [];
    }

    return true;
  }

  // Check whether a square has a value penciled in
  hasPencil(x, y, value) {
    return this.squares[x][y].pencil.includes(value);
  }

  // Add solved pen value
  addPen(x, y, value) {
    if (
      !this.isValidNumber(value) ||
      !this.isValidNumber(x + 1) ||
      !this.isValidNumber(y + 1)
    ) {
      return false;
    }

    this.squares[x][y].pen = value;

    return true;
  }

  // Remove solved pen value
  removePen(x, y) {
    this.squares[x][y].pen = null;
    return true;
  }

  // Add a given starting value
  addValue(x, y, value) {
    if (
      !this.isValidNumber(value) ||
      !this.isValidNumber(x + 1) ||
      !this.isValidNumber(y + 1)
    ) {
      return false;
    }

    if (!this.squares[x][y]) {
      console.log(x, y, this.squares[x][y]);
    }
    this.squares[x][y].value = value;

    return true;
  }

  // Remove a given starting value
  removeValue(x, y) {
    this.squares[x][y].value = null;

    return true;
  }

  // Whether each square has a value or pen
  isFullyFilled() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const square = this.squares[i][j];
        if (
          (square.value == null || !this.isValidNumber(square.value)) &&
          (square.pen == null || !this.isValidNumber(square.pen))
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
