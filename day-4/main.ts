import { readFile } from "../utils.ts";

function part1(input: string): number {
  const data = input
    .split("\n")
    .map((line) => line.split(""));

  let count = 0;
  for (const x in data) {
    for (const y in data[x]) {
      if (data[x][y] === ".") continue;

      let surroundingRollsCount = 0;

      for (const i of [-1, 0, 1]) {
        for (const j of [-1, 0, 1]) {
          if (i === 0 && j === 0) continue;
          const val = data?.[Number(x) + i]?.[Number(y) + j];
          if (val === "@") surroundingRollsCount++;
        }
      }

      if (surroundingRollsCount < 4) {
        count++;
      }
    }
  }
  return count;
}

function part2(input: string): number {
  const data = input
    .split("\n")
    .map((line) => line.split(""));

  let totalCount = 0;

  while (true) {
    let count = 0;

    for (const x in data) {
      for (const y in data[x]) {
        if (data[x][y] === ".") continue;

        let surroundingRollsCount = 0;

        for (const i of [-1, 0, 1]) {
          for (const j of [-1, 0, 1]) {
            if (i === 0 && j === 0) continue;
            const val = data?.[Number(x) + i]?.[Number(y) + j];
            if (val === "@" || val === "x") surroundingRollsCount++;
          }
        }

        if (surroundingRollsCount < 4) {
          data[x][y] = "x";
          count++;
        }
      }
    }

    if (count > 0) {
      totalCount += count;
      for (const x in data) {
        for (const y in data[x]) {
          if (data[x][y] === "x") data[x][y] = ".";
        }
      }
    } else {
      break;
    }
  }
  return totalCount;
}

if (import.meta.main) {
  const input = readFile("day-4/input.txt");
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
}
