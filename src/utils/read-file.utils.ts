import fs from "fs/promises";

export async function readFileUtil(file: string) {
  return await fs.readFile(file, { encoding: "utf8" });
}
