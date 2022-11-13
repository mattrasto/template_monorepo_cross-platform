// Creates a sequence from a specified range and step (interval)
// Source (modified from): https://stackoverflow.com/a/44957114/3748574
// Example: (0, 20, 5) -> [0, 5, 10, 15, 20]
export const createSequence = (start, stop, step = 1) => {
  return Array(1 + Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
};

export const rotateArrayLeft = (arr, numRotations = 1) => {
  const arrCopy = [...arr];
  return arrCopy.concat(arrCopy.splice(0, numRotations));
};

// Checks if two scalar arrays are equal
export const arrayEquals = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

export const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
