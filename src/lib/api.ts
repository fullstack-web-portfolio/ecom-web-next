// lib/api.ts
import axios from "axios";

export async function api<T>(path: string): Promise<T> {
  // Choose base URL depending on environment
  const baseURL =
    typeof window === "undefined"
      ? "http://localhost:3000/api/emarket" // SSR (Node.js)
      : "/api/emarket";                     // Browser

  try {
    const res = await axios.get<T>(`${baseURL}${path}`, {
      // Equivalent to fetch(..., { cache: "no-store" })
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return res.data;
  } catch (err: any) {
    // Axios throws automatically on non-2xx, mimic your old Error(await res.text())
    throw new Error(
      err.response?.data?.message || err.message || "API request failed"
    );
  }
}
