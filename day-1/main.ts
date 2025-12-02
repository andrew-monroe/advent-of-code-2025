import { readFile } from "../utils.ts";

function part1(input: string): number {
  return input
    .split(/\s+/)
    .filter((v) => v)
    .map((line) => (line.startsWith("R") ? 1 : -1) * Number(line.slice(1)))
    .reduce(([count, position], rotation) => {
      position = (position + rotation + 100) % 100;
      return position === 0 ? [count + 1, position] : [count, position];
    }, [0, 50])
    .at(0)!;
}

function part2(input: string): number {
  return input
    .split(/\s+/)
    .filter((v) => v)
    .map((line) => (line.startsWith("R") ? 1 : -1) * Number(line.slice(1)))
    .flatMap((rotation) =>
      new Array(Math.abs(rotation)).fill(rotation < 0 ? -1 : 1)
    )
    .reduce(([count, position], rotation) => {
      position = (position + rotation + 100) % 100;
      return position === 0 ? [count + 1, position] : [count, position];
    }, [0, 50])
    .at(0)!;
}

if (import.meta.main) {
  const input = readFile("day-1/input.txt");
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
}
