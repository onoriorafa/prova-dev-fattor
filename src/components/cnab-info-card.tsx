import type {
  HeaderCNAB444,
  TrailerCNAB444,
} from "@/functions/process-cnab-file";

interface CnabInfoCardProps {
  header: HeaderCNAB444 | undefined;
  trailer: TrailerCNAB444 | undefined;
}

function InfoField({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-100">
        {value || <span className="text-slate-500 italic">—</span>}
      </span>
    </div>
  );
}

export function CnabInfoCard({ header, trailer }: CnabInfoCardProps) {
  if (!header && !trailer) return null;

  return (
    <div className="app-card flex w-full flex-col gap-4">
      <h2 className="text-lg font-semibold">Informações do arquivo</h2>

      {header && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Header
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg bg-slate-800/40 p-4 md:grid-cols-3">
            <InfoField label="Empresa" value={header.nome_empresa} />
            <InfoField label="Código do banco" value={header.codigo_banco} />
            <InfoField label="Data de geração" value={header.data_geracao} />
            <InfoField
              label="Literal de remessa"
              value={header.literal_remessa}
            />
            <InfoField
              label="Código do serviço"
              value={header.codigo_servico}
            />
            <InfoField
              label="Literal do serviço"
              value={header.literal_servico}
            />
            <InfoField label="Nº sequencial" value={header.numero_sequencial} />
          </div>
        </div>
      )}

      {trailer && (
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Trailer
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg bg-slate-800/40 p-4 md:grid-cols-3">
            <InfoField
              label="Quantidade de registros"
              value={trailer.quantidade}
            />
          </div>
        </div>
      )}
    </div>
  );
}
