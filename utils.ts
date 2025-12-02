const decoder = new TextDecoder("utf-8");

export function readFile(fileName: string) {
  const data = Deno.readFileSync(new URL(fileName, import.meta.url));
  return decoder.decode(data);
}
