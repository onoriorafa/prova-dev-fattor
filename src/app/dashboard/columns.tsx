"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { DetalheCNAB444 } from "@/functions/process-cnab-file";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Archive = {
//   id: string;
//   nfeKey: string;
//   status: "Pendente" | "Processando" | "Concluído" | "Falhou";
//   pagador: string;
// };

export const columns: ColumnDef<DetalheCNAB444>[] = [
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
];
