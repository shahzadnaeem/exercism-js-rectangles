import { count } from "./robstyle.js";

import _ from "colors";

function MxNRects(m, n) {
  return Math.floor((m * n * (n + 1) * (m + 1)) / 4);
}

function makeNxNPuzzle(n, pad = 0) {
  let grid = [];
  let row = `+${"-".repeat(pad)}`.repeat(n) + "+";
  let padRow = `|${" ".repeat(pad)}`.repeat(n) + "|";

  for (let i = 0; i <= n; i++) {
    grid.push(row);
    if (pad && i !== n) {
      for (let j = 0; j < Math.floor((pad + 1) / 2); j++) grid.push(padRow);
    }
  }

  return { grid: grid, answer: MxNRects(n, n) };
}

const puzzles = [
  { grid: [], answer: 0 },
  // { grid: ["++", "++"], answer: 1 },
  // { grid: ["+++", "+++", "+++"], answer: 9 },
  { grid: ["+-+--+", "| |  |", "+-+--+", "+-+--+"], answer: 9 },
  { grid: ["   +--+", "  ++  |", "+-++--+", "|  |  |", "+--+--+"], answer: 6 },
  makeNxNPuzzle(1, 1),
  makeNxNPuzzle(2, 1),
  makeNxNPuzzle(3, 2),
  // makeNxNPuzzle(5, 2),
  // makeNxNPuzzle(9, 2),
  // makeNxNPuzzle(150, 5),
];

let i = 1;
let allPassed = true;
let passes = 0;

const start = Date.now();

puzzles.forEach((puzzle) => {
  console.log(`\nPuzzle: #${i}`);

  if (puzzle.grid.length <= 25) {
    puzzle.grid.forEach((row) => {
      console.log(`\t${row}`);
    });
  } else {
    console.log(`Large puzzle: ${puzzle.grid.length} rows`);
  }

  const rectangles = count(puzzle.grid, true);

  const passed = rectangles === puzzle.answer;

  console.log(
    `${passed ? "✅" : "❌"} expected=${puzzle.answer}, actual=${rectangles}`
  );

  if (passed) {
    passes++;
  } else {
    allPassed = false;
  }

  i++;
});

const duration = Date.now() - start;

console.log(
  allPassed
    ? `\n✅ All ${puzzles.length} passed`
    : `\n❌ Only ${passes} of ${puzzles.length} passed`
);

console.log(`time: ${duration} ms`);
