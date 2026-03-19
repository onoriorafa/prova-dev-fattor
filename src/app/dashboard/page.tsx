"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import {
  type DetalheCNAB444,
  processCnabFile,
} from "@/functions/process-cnab-file";
import { authClient } from "@/lib/auth-client";
import Loading from "../loading";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [file, setFile] = useState<File>();
  const [detalhes, setDetalhes] = useState<DetalheCNAB444[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (isPending) {
    return <Loading />;
  }

  const userClient = session;

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    await processFileWithToast(selectedFile);
  }

  async function handleProcessFile() {
    if (!file) {
      toast.error("Por favor, selecione um arquivo antes de processar.");
      return;
    }

    await processFileWithToast(file);
  }

  async function processFileWithToast(fileToProcess: File) {
    setIsProcessing(true);
    const processPromise = (async () => {
      const result = await processCnabFile(fileToProcess);

      if (result.success) {
        const cnabData = result.values;
        setDetalhes(cnabData?.detalhes ?? []);
        return result.message;
      } else {
        throw new Error(result.message || "Falha ao processar arquivo.");
      }
    })();

    toast.promise(processPromise, {
      loading: "Processando arquivo CNAB...",
      success: (message) => message || "Arquivo processado com sucesso!",
      error: (error) =>
        error instanceof Error ? error.message : "Falha ao processar arquivo.",
    });

    try {
      await processPromise;
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <main className="app-bg flex items-start justify-center">
      <section className="app-container">
        <header className="app-card flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="app-title">Dashboard</h1>
            <p className="app-subtitle">
              Bem-vindo,{" "}
              <span className="font-semibold">
                {userClient?.user?.name || "User"}
              </span>
            </p>
            <p className="text-xs text-slate-400">{userClient?.user?.email}</p>
          </div>

          <button
            type="button"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => router.push("/"),
                },
              });
            }}
            className="app-button-secondary"
          >
            Sair
          </button>
        </header>

        <div className="flex w-full flex-col gap-6 md:flex-row">
          <article className="app-card flex w-full flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Upload de arquivo CNAB</h2>
              <p className="text-sm text-slate-400">
                Selecione arquivos com extensão{" "}
                <span className="font-medium">.txt</span> ou{" "}
                <span className="font-medium">.rem</span>.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3">
              <label
                htmlFor="upload-file"
                className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/40 p-6 text-center transition hover:border-blue-400 hover:bg-slate-800"
              >
                <span className="text-sm font-medium text-slate-200">
                  Clique para selecionar ou arraste o arquivo aqui
                </span>
                <span className="text-xs text-slate-400">
                  Apenas arquivos .txt ou .rem
                </span>
                {file && (
                  <span className="mt-2 rounded-md bg-slate-700/60 px-3 py-1 text-xs text-slate-200">
                    {file.name}
                  </span>
                )}
              </label>

              <input
                type="file"
                name="cnabFile"
                accept=".txt,.rem"
                id="upload-file"
                className="hidden"
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={handleProcessFile}
                disabled={!file || isProcessing}
                className="app-button-primary w-full"
              >
                {isProcessing ? "Processando..." : "Processar arquivo"}
              </button>
            </div>
          </article>
        </div>

        <article className="app-card flex w-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Detalhes processados</h2>
            <span className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {detalhes.length} registro(s)
            </span>
          </div>

          <div className="flex w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40 p-2">
            <div className="min-w-full">
              <DataTable columns={columns} data={detalhes} />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
