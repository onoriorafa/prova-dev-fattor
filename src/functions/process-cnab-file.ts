//processar o arquivo CNAB
export async function processCnabFile(file: File) {
  return {
    success: true,
    message: `Arquivo ${file.name} processado com sucesso!`,
  };
}
