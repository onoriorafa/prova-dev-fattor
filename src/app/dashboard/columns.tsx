"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { DetalheCNAB444 } from "@/functions/process-cnab-file";

export type DetalheComSituacao = DetalheCNAB444 & {
  situacao?: string;
  situacaoLoading?: boolean;
  situacaoErro?: boolean;
};

export const columns: ColumnDef<DetalheComSituacao>[] = [
  {
    accessorKey: "chave_nfe",
    header: "Chave",
  },
  {
    accessorKey: "tipo_registro",
    header: "Tipo Registro",
  },
  {
    accessorKey: "aceite",
    header: "Aceite",
  },
  {
    accessorKey: "pagador",
    header: "Pagador",
  },
  {
    accessorKey: "cidade",
    header: "Cidade",
  },
  {
    accessorKey: "uf",
    header: "UF",
  },
  {
    accessorKey: "cep",
    header: "CEP",
  },
  {
    accessorKey: "situacao",
    header: "Situação",

    cell: ({ row }) => {
      const valor = row.original.situacao;

      if (row.original.situacaoLoading) {
        return <span className="text-amber-300">Consultando...</span>;
      }

      if (row.original.situacaoErro) {
        return <span className="text-red-300">Erro ao consultar</span>;
      }

      if (!valor) {
        return <span className="text-slate-400">Aguardando</span>;
      }

      return valor;
    },
  },
];
