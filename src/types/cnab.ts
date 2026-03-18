const LINE_LENGTH = 444;

export async function validateCnabContent(file: File) {
  const text = await file.text();
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    throw new Error("O arquivo está vazio.");
  }

  //verificar se todas as linhas têm o tamanho correto
  const invalidLines = lines.some((line) => line.length !== LINE_LENGTH);

  if (invalidLines) {
    throw new Error(
      `O arquivo CNAB não é válido. Cada linha deve conter exatamente ${LINE_LENGTH} caracteres.`,
    );
  }

  return lines;
}
