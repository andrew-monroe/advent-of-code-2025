import { readFile } from "../utils.ts";

function part1(input: string): number {
  return input
    .split(/\s+/)
    .map((line) =>
      line
        .split("")
        .map((val) => Number(val))
        .reduce(
          ([a, b], cur) => b > a ? [b, cur] : cur > b ? [a, cur] : [a, b],
          [0, 0],
        )
    ).reduce((acc, [tens, ones]) => acc + 10 * tens + ones, 0);
}

function part2(input: string): number {
  return input
    .split(/\s+/)
    .map((line) =>
      line
        .split("")
        .map((val) => Number(val))
        .reduce<number[]>((arr, cur) => {
          for (let i = 0; i < 11; i++) {
            if (arr[i] < arr[i + 1]) {
              arr.splice(i, 1);
              arr.push(cur);
              return arr;
            }
          }
          if (cur > arr[11]) {
            arr[11] = cur;
          }
          return arr;
        }, new Array(12).fill(0))
        .reduce((acc, cur, idx) => acc + cur * 10 ** (11 - idx), 0)
    ).reduce((acc, cur) => acc + cur, 0);
}

if (import.meta.main) {
  const input = readFile("day-3/input.txt");
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
}
