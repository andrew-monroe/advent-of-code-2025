import { readFile } from "../utils.ts";

function part1(input: string): number {
  return input.length;
}

function part2(input: string): number {
  return input.length;
}

if (import.meta.main) {
  const input = readFile("day-9/sample.txt");
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
}
