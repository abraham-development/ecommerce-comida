"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fff8eb] px-4 text-center">
      <div>
        <p className="text-sm font-black tracking-[0.16em] text-[#b83a2d] uppercase">Algo salió mal</p>
        <h1 className="font-display mt-3 text-4xl font-black text-[#2d2118]">Volvamos a intentarlo.</h1>
        <button type="button" onClick={reset} className="mt-7 min-h-12 rounded-full bg-[#3f5b3b] px-7 font-black text-white">Reintentar</button>
      </div>
    </main>
  );
}
