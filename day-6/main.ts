import { readFile } from "../utils.ts";

function part1(input: string): number {
  const data = input.trim().split("\n")
    .map((row) =>
      row.trim().split(/\s+/)
        .map((val) => Number(val) ? Number(val) : val)
    );

  const operationsRow: string[] = data.pop() as string[];

  const answers = [];
  for (const colIdx in operationsRow) {
    const reduceFn = operationsRow[colIdx] === "+"
      ? (acc: number, cur: number) => acc + cur
      : (acc: number, cur: number) => acc * cur;
    answers.push(
      (data as number[][]).map((row) => row[colIdx]).reduce(reduceFn),
    );
  }

  return answers.reduce((acc, cur) => acc + cur);
}

function getNums(inputRows: string[], colIdxStart: number, width: number) {
  const result = [];
  for (let i = colIdxStart; i < colIdxStart + width; i++) {
    result.push(Number(inputRows.map((row) => row[i]).join("").trim()));
  }
  return result;
}

function part2(input: string): number {
  const inputRows = input.split("\n");

  // Format: [op, numDigitsForColumn]
  const operators = inputRows.pop()!.split(/\s/).reduce((acc, cur) => {
    if (cur.length) {
      acc.push([cur, 1]);
    } else {
      acc.at(-1)![1]++;
    }
    return acc;
  }, [] as Array<[string, number]>);

  const answers = [];
  let counter = 0;
  for (const [op, numWidth] of operators) {
    const reduceFn = op === "+"
      ? (acc: number, cur: number) => acc + cur
      : (acc: number, cur: number) => acc * cur;
    answers.push(getNums(inputRows, counter, numWidth).reduce(reduceFn));
    counter += numWidth + 1;
  }

  return answers.reduce((acc, cur) => acc + cur);
}

if (import.meta.main) {
  const input = readFile("day-6/input.txt");
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
}
