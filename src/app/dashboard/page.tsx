"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";
import {
  type DetalheCNAB444,
  processCnabFile,
} from "@/functions/process-cnab-file";
import { authClient } from "@/lib/auth-client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [file, setFile] = useState<File>();
  const [detalhes, setDetalhes] = useState<DetalheCNAB444[]>();
  const [header, setHeader] = useState<any>();
  const [trailer, setTrailer] = useState<any>();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  async function handleChange(
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      await processCnabFile(selectedFile)
        .then((result) => {
          if (result.success) {
            const cnabData = result.values;
            setDetalhes(cnabData?.detalhes);
            setHeader(cnabData?.header);
            setTrailer(cnabData?.trailer);
          } else {
            alert(`Error: ${result.message}`);
          }
        })
        .catch((err) => {
          alert(`Unexpected error: ${err.message}`);
        });
    }
  }

  return (
    <main className="h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name || "User"}!</p>
      <p>Email: {user.email}</p>
      <div>
        <form
          action={() => {
            //handle submit file
          }}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              name="cnabFile"
              accept=".txt,.rem"
              id="upload-file"
              className="hidden"
              onChange={(e) => handleChange(e)}
            />
            {!file ? (
              <label htmlFor="upload-file" className="cursor-pointer block">
                <span>Clique para selecionar ou arraste o arquivo aqui</span>
                <p className="text-sm text-gray-500 mt-2">
                  Apenas arquivos .txt ou .rem são permitidos
                </p>
              </label>
              //<span className="text-gray-500">Nenhum arquivo selecionado</span>
            ) : (
              <span className="text-gray-500 mt-2">{file.name}</span>
            )}
          </div>
        </form>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            if (!file) {
              alert("Por favor, selecione um arquivo antes de processar.");
              return;
            }
            const promise = processCnabFile(file).catch((err) => {
              alert(`Erro: ${err.message}`);
            });
            // promise.then((result) => {
            //   if (result.success) {
            //     alert("Arquivo processado com sucesso! :)");
            //   }
            // });
          }}
          className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Processar arquivo
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <DataTable columns={columns} data={detalhes ?? []} />
      </div>
      <div>
        <button
          type="button"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in"); // redirect to login page
                },
              },
            });
          }}
          className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Sign Out
        </button>{" "}
        {}
      </div>
    </main>
  );
}
