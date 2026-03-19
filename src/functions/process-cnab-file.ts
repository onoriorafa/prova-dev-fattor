"use server";

import { formatDateString } from "@/lib/utils";

interface HeaderCNAB444 {
  tipo_registro?: string;
  operacao?: string;
  literal_remessa?: string;
  codigo_servico?: string;
  literal_servico?: string;
  agencia?: string;
  zeros?: string;
  conta?: string;
  dac?: string;
  brancos1?: string;
  nome_empresa?: string;
  codigo_banco?: string;
  data_geracao?: string;
  brancos2?: string;
  numero_sequencial?: string;
}

interface DetalheCNAB444 {
  linha: string;
  tipo_registro: string;
  cod_inscricao?: string;
  numero_inscricao?: string;
  agencia?: string;
  zeros?: string;
  conta?: string;
  dac?: string;
  brancos?: string;
  instrucao?: string;
  uso_empresa?: string;
  nosso_numero?: string;
  qntde_moeda?: string;
  numero_carteira?: string;
  uso_banco?: string;
  carteira?: string;
  cod_ocorrencia?: string;
  numero_documento?: string;
  vencimento?: string;
  valor_titulo?: string;
  codigo_banco?: string;
  agencia_cobradora?: string;
  especie?: string;
  aceite?: string;
  data_emissao?: string;
  instrucao1?: string;
  instrucao2?: string;
  juros?: string;
  desconto_ate?: string;
  desconto_valor?: string;
  valor_iof?: string;
  abatimento?: string;
  codigo_inscricao?: string;
  controle?: string;
  valor?: string;
  pagador?: string;
  cidade?: string;
  cep?: string;
  uf?: string;
  chave_nfe: string;
}

interface TrailerCNAB444 {
  quantidade?: string;
}

//processar o arquivo CNAB
export async function processCnabFile(file: File) {
  const content = await file.text();

  if (!content) {
    return {
      success: false,
      message: "Arquivo vazio ou inválido.",
    };
  }

  validateCnabContent(content);

  const parserData = parseCNAB444(content);

  return {
    success: true,
    values: parserData,
    message: `Arquivo ${file.name} processado com sucesso!`,
  };
}

function parseCNAB444(content: string) {
  const header: HeaderCNAB444 = {} as HeaderCNAB444;
  const detalhes: DetalheCNAB444[] = [];
  const trailer: TrailerCNAB444 = {} as TrailerCNAB444;

  const linhas = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const registros = linhas.map((linha, count) => {
    return {
      linha: count + 1,
      tipo: linha[0], // Tipo de registro (0, 1 ou 9)
      dados: linha.slice(1), // Dados do registro
    };
  });

  for (const registro of registros) {
    if (registro.tipo === "0") {
      // Processar header
      header.tipo_registro = registro.dados.substring(0, 1);
      header.literal_remessa = registro.dados.substring(3, 18);
      header.codigo_servico = registro.dados.substring(19, 20);
      header.literal_servico = registro.dados.substring(20, 31);
      header.nome_empresa = registro.dados.substring(45, 75);
      header.codigo_banco = registro.dados.substring(0, 3);
      header.data_geracao = formatDateString(
        registro.dados.substring(123, 131),
      );
      header.numero_sequencial = registro.dados.substring(135, 146);
    }
    if (registro.tipo === "1") {
      // Processar detalhe
      const detalhe: DetalheCNAB444 = {
        linha: registro.linha.toString(),
        chave_nfe: registro.dados.substring(399, 444),
        tipo_registro: registro.dados.substring(0, 1),
        aceite: registro.dados.substring(122, 126).trim(),
        pagador: registro.dados.substring(138, 188).trim().replace(/^0+/, ""),
        cidade: registro.dados.substring(246, 258).trim(),
        cep: registro.dados.substring(261, 271).trim(),
        uf: registro.dados.substring(277, 282).trim(),
      };
      detalhes.push(detalhe);
    }
    if (registro.tipo === "9") {
      // Processar trailer
      trailer.quantidade = registro.dados
        .substring(391, 400)
        .replace(/^0+/, "");
    }
  }
  return { header, detalhes, trailer };
}

function validateCnabContent(content: string) {
  const linhas = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  //verificar se o arquivo está vazio
  if (linhas.length === 0) {
    throw new Error("O arquivo está vazio.");
  }

  //verificar se tem o header (primeira linha deve começar com 0)
  const hasHeader = linhas[0]?.startsWith("0");

  if (!hasHeader) {
    throw new Error("O arquivo CNAB não possui um header válido.");
  }

  //verificar se tem o detalhe (linhas intermediárias devem começar com 1)
  const hasDetalhe = linhas.slice(1, -1).some((line) => line.startsWith("1"));

  if (!hasDetalhe) {
    throw new Error("O arquivo CNAB não possui um detalhe válido.");
  }

  //verificar se tem o trailer (última linha deve começar com 9)
  const hasTrailer = linhas[linhas.length - 1]?.startsWith("9");

  if (!hasTrailer) {
    throw new Error("O arquivo CNAB não possui um trailer válido.");
  }
}
