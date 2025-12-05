import { readFile } from "../utils.ts";

function part1(input: string): number {
  const [fresh, available] = input.split("\n\n").map((text, idx) =>
    idx === 0
      ? text.split("\n").map((range) => {
        return range.split("-").map(Number);
      })
      : text.split("\n").map(Number)
  ) as [number[][], number[]];

  fresh.sort((a, b) => a[0] - b[0]);

  // Compress ranges.
  for (let i = 0; i < fresh.length; i++) {
    for (let j = 1; j < (fresh.length - i); j++) {
      if (fresh[i][1] + 1 >= fresh[i + j][0]) {
        fresh[i][1] = Math.max(fresh[i][1], fresh[i + j][1]);
        fresh.splice(i + j, 1);
        j--;
      }
    }
  }

  return available.reduce(
    (acc, cur) =>
      fresh.some(([low, high]) => cur >= low && cur <= high) ? acc + 1 : acc,
    0,
  );
}

function part2(input: string): number {
  const fresh = input.split("\n\n")[0].split("\n").map((range) => {
    return range.split("-").map(Number);
  });

  fresh.sort((a, b) => a[0] - b[0]);

  // Compress ranges.
  for (let i = 0; i < fresh.length; i++) {
    for (let j = 1; j < (fresh.length - i); j++) {
      if (fresh[i][1] + 1 >= fresh[i + j][0]) {
        fresh[i][1] = Math.max(fresh[i][1], fresh[i + j][1]);
        fresh.splice(i + j, 1);
        j--;
      }
    }
  }

  return fresh.reduce((acc, [low, high]) => acc + high - low + 1, 0);
}

if (import.meta.main) {
  const input = readFile("day-5/input.txt");
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
}
