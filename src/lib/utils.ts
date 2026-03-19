export function formatDateString(data: string): string {
  const dia = data.substring(0, 2);
  const mes = data.substring(2, 4);
  const ano = `20${data.substring(4, 6)}`;

  return `${dia}/${mes}/${ano}`;
}
