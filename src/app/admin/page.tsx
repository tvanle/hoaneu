import Link from "next/link";
import { db } from "@db";
import { products, categories } from "@db/schema";
import { count } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount] = await Promise.all([
    db.select({ count: count() }).from(products),
    db.select({ count: count() }).from(categories),
  ]);

  const stats = [
    {
      label: "Sản phẩm",
      value: productCount[0].count,
      href: "/admin/products",
    },
    {
      label: "Danh mục",
      value: categoryCount[0].count,
      href: "/admin/categories",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
