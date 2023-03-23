const Square = require("../src/logic/square");

test("pencils numbers in square", () => {
  const square = new Square();

  // Test hasPencil for each number
  for (let i = 1; i < 10; i++) {
    expect(square.hasPencil(i)).toBeFalsy();
  }

  // addPencil
  square.addPencil(1);
  square.addPencil(3);
  square.addPencil(7);

  // Test hasPencil for each number
  for (let i = 1; i < 10; i++) {
    if (i == 1 || i == 3 || i == 7) {
      expect(square.hasPencil(i)).toBeTruthy();
    } else {
      expect(square.hasPencil(i)).toBeFalsy();
    }
  }

  expect(square.pencil).toHaveLength(3);

  // Pencil in duplicates
  square.addPencil(7);
  expect(square.pencil).toHaveLength(3);

  // removePencil
  square.removePencil(7);
  expect(square.pencil).toHaveLength(2);
  expect(square.hasPencil(7)).toBeFalsy();

  square.removePencil();
  expect(square.pencil).toHaveLength(0);
  for (let i = 1; i < 10; i++) {
    expect(square.hasPencil(i)).toBeFalsy();
  }
});

test("pens in a value", () => {
  const square = new Square();
  expect(square.pen).toBeNull();

  square.addPen(3);
  expect(square.pen).toBe(3);

  // Invalid numbers should be ignored
  square.addPen(-1);
  expect(square.pen).toBe(3);
  square.addPen("abc");
  expect(square.pen).toBe(3);
  square.addPen(10);
  expect(square.pen).toBe(3);
  square.addPen(1000);
  expect(square.pen).toBe(3);

  // Remove number
  square.removePen();
  expect(square.pen).toBeNull();
});

test("set a value", () => {
  const square = new Square();
  expect(square.value).toBeNull();

  square.addValue(3);
  expect(square.value).toBe(3);

  // Invalid numbers should be ignored
  square.addValue(-1);
  expect(square.value).toBe(3);
  square.addValue("abc");
  expect(square.value).toBe(3);
  square.addValue(10);
  expect(square.value).toBe(3);
  square.addValue(1000);
  expect(square.value).toBe(3);

  // Remove number
  square.removeValue();
  expect(square.value).toBeNull();
});

test("copies a square", () => {
  const compareCopy = (square1, square2) => {
    if (square1.value !== square2.value || square1.pen !== square2.pen) {
      return false;
    }

    if (square1.pencil.length !== square2.pencil.length) {
      return false;
    }

    for (let i = 0; i < square1.pencil.length; i++) {
      if (square1.pencil[i] !== square2.pencil[i]) {
        return false;
      }
    }

    return true;
  };

  const square1 = new Square();
  expect(compareCopy(square1, new Square(square1))).toBeTruthy();

  const square2 = new Square();
  square2.addPencil(3);
  square2.addPencil(5);
  square2.addPen(5);
  square2.addValue(2);
  expect(compareCopy(square2, new Square(square2))).toBeTruthy();
});
