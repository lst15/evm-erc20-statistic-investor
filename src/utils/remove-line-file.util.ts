import fs from "fs/promises";

export async function removeLineFromFile(
  filePath: string,
  lineToRemove: string
) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const lines = content.split("\n");
    const indexToRemove = lines.findIndex((line) =>
      line.includes(lineToRemove)
    );
    if (indexToRemove !== -1) {
      lines.splice(indexToRemove, 1);
      const updatedContent = lines.join("\n");
      await fs.writeFile(filePath, updatedContent, "utf-8");
    } else {
      console.log("Linha não encontrada no arquivo.");
    }
  } catch (err) {
    throw err;
  }
}
