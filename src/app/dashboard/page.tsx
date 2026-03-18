"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

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

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
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
            />
            <label htmlFor="upload-file" className="cursor-pointer block">
              <span>Clique para selecionar ou arraste o arquivo aqui</span>
              <p className="text-sm text-gray-500 mt-2">
                Apenas arquivos .txt ou .rem são permitidos
              </p>
            </label>
          </div>
        </form>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            //processar arquivo
          }}
          className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Processar arquivo
        </button>
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
