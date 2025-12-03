import { readFile } from "../utils.ts";

function isSameNumberTwice(num: number) {
  const numDigits = Math.floor(Math.log10(num)) + 1;
  if (numDigits % 2 === 1) return false;

  const halfNum = Math.floor(num / 10 ** (numDigits / 2));

  return num - halfNum === halfNum * 10 ** (numDigits / 2);
}

function part1(input: string): number {
  const data = input.split(",")
    .map((range) => range.split("-").map((val) => Number(val)));

  let count = 0;
  for (const [low, high] of data) {
    for (let i = low; i <= high; i++) {
      if (isSameNumberTwice(i)) {
        count += i;
      }
    }
  }

  return count;
}

function isSameNumberNTimes(num: number, factor: number) {
  const numDigits = Math.floor(Math.log10(num)) + 1;
  if (numDigits % factor !== 0) return false;

  const repeatingNum = num % 10 ** (numDigits / factor);

  let counter = num;
  for (let i = 1; i < num; i *= 10 ** (numDigits / factor)) {
    counter -= repeatingNum * i;
  }
  return counter === 0;
}

const PRIMES = [2, 3, 5, 7];

function part2(input: string): number {
  const data = input.split(",")
    .map((range) => range.split("-").map((val) => Number(val)));

  let count = 0;
  for (const [low, high] of data) {
    for (let i = low; i <= high; i++) {
      if (PRIMES.some((p) => isSameNumberNTimes(i, p))) {
        count += i;
      }
    }
  }

  return count;
}

if (import.meta.main) {
  const input = readFile("day-2/input.txt");
  console.log(`Part 1: ${part1(input)}`);
  console.log(`Part 2: ${part2(input)}`);
}
