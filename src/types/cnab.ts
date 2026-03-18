const LINE_LENGTH = 444;

export async function validateCnabContent(file: File) {
  const text = await file.text();
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    throw new Error("O arquivo está vazio.");
  }

  // 1 - Validar o tamanho de cada linha (deve ser exatamente 444 caracteres)
  const invalidLines = lines.some((line) => line.length !== LINE_LENGTH);

  if (invalidLines) {
    throw new Error(
      `O arquivo CNAB não é válido. Cada linha deve conter exatamente ${LINE_LENGTH} caracteres.`,
    );
  }

  // 2 - Verificar se tem o Header (primeira linha)
  const hasHeader = lines[0]?.startsWith("0");

  if (!hasHeader) {
    throw new Error("O arquivo CNAB não possui um header válido.");
  }

  // 3 - Verificar se tem o Trailer (última linha)
  const hasTrailer = lines[lines.length - 1]?.startsWith("9");

  if (!hasTrailer) {
    throw new Error("O arquivo CNAB não possui um trailer válido.");
  }

  return lines;
}
