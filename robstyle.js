import _ from "colors";

function showRectangle(grid, top, left, bottom, right) {
  const [lastRow, lastCol] = [grid.length - 1, grid[0].length - 1];

  let counter = 0;

  // scan from top left corner of grid

  for (let row = 0; row <= lastRow; row++) {
    for (let col = 0; col <= lastCol; col++) {
      if (row >= top && col >= left && row <= bottom && col <= right) {
        process.stdout.write(grid[row][col].red);
      } else {
        process.stdout.write(grid[row][col].reset);
      }
    }
    process.stdout.write("\n");
  }
}

// NOTE: All commented out code below runs slower (mainly due to use of regexp)

const isCorner = (str) => str === "+"; // /^[+]$/.test(str);

// const isHSide = (str) => /^[-+]$/.test(str);
// const isVSide = (str) => /^[|+]$/.test(str);

export function count(rows, debug = false) {
  if (rows.length === 0) return 0;

  const grid = rows.map((row) => [...row]);

  const [lastRow, lastCol] = [grid.length - 1, grid[0].length - 1];

  let counter = 0;

  // scan from top left corner of grid

  for (let top = 0; top < lastRow; top++) {
    for (let left = 0; left < lastCol; left++) {
      if (!isCorner(grid[top][left])) continue;

      findRectanglesFrom(top, left);
    }
  }

  function findRectanglesFrom(top, left) {
    for (let right = left + 1; right <= lastCol; right++) {
      //   if (!isHSide(grid[top][right])) break;

      if (!isCorner(grid[top][right])) continue;

      counter += countRectanglesDownFrom(top, left, right);
    }
  }

  function countRectanglesDownFrom(top, left, right) {
    let numFound = 0;

    for (let bottom = top + 1; bottom <= lastRow; bottom++) {
      if (isCorner(grid[bottom][left]) && isCorner(grid[bottom][right])) {
        numFound++;

        if (debug) {
          console.log(`(${top},${left}) (${bottom},${right})`);
          showRectangle(grid, top, left, bottom, right);
          console.log("\n");
        }
      }
      //    else if (
      //     !isVSide(grid[bottom][left]) ||
      //     !isVSide(grid[bottom][right])
      //   ) {
      //     break;
      //   }
    }

    if (debug) {
      console.log(
        `Found ${numFound} rectangles from: (${top}, ${left}->${right})`
      );
    }

    return numFound;
  }

  return counter;
}
