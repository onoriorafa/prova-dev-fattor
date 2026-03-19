"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { DetalheCNAB444 } from "@/functions/process-cnab-file";

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
