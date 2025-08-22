export type Money = { currency: "USD" | "VND"; amount: number };
export type Product = {
  id: string;
  name: string;
  slug?: string;
  price: Money;
  stock?: number;
  vendorId?: string;
};
export type ProductList = { data: Product[]; meta?: unknown };
export type Health = { status: string };
