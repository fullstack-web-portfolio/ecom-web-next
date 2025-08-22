export const dynamic = "force-dynamic";

import { api } from "@/lib/api";
import type { ProductList, Health } from "@/types";

export default async function Home() {
  // Hitting Prism via Next rewrite: /api/ecom/* → localhost:4010/*
  const [health, products] = await Promise.all([
    api<Health>("/health"),
    api<ProductList>("/products"),
  ]);

  const items = products?.data ?? [];

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">E-market</h1>
        <span className={`rounded px-2 py-1 text-sm ${health?.status === "ok" ? "bg-green-100" : "bg-red-100"}`}>
          API: {health?.status ?? "unknown"}
        </span>
      </header>

      <section>
        <h2 className="text-lg font-medium mb-2">Products ({items.length})</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">No products (mock). Add examples in spec.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-3">
            {items.map((p) => (
              <li key={p.id} className="rounded-lg border p-4">
                <div className="font-medium">{p.name}</div>
                {"price" in p && (
                  <div className="text-sm text-gray-600">
                    {p.price.currency} {p.price.amount}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
