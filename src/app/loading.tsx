export default function Loading() {
  return (
    <main className="app-bg flex items-center justify-center">
      <section className="app-container max-w-md">
        <article className="app-card flex flex-col items-center gap-4 py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-400" />
          <h2 className="text-base font-semibold text-slate-100">Carregando</h2>
          <p className="text-sm text-slate-400">Aguarde um instante...</p>
        </article>
      </section>
    </main>
  );
}
