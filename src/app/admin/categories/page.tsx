import Link from "next/link";
import { db } from "@db";
import { categories, products } from "@db/schema";
import { asc, eq, count } from "drizzle-orm";
import { deleteCategory } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const allCategories = await db.query.categories.findMany({
    orderBy: [asc(categories.order)],
  });

  const productCounts = await db
    .select({ categoryId: products.categoryId, count: count() })
    .from(products)
    .groupBy(products.categoryId);

  const countMap = new Map(
    productCounts.map((pc) => [pc.categoryId, pc.count]),
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Danh mục</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Thêm danh mục
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500">Tên</th>
              <th className="px-4 py-3 font-medium text-gray-500">Slug</th>
              <th className="px-4 py-3 font-medium text-gray-500">Thứ tự</th>
              <th className="px-4 py-3 font-medium text-gray-500">Sản phẩm</th>
              <th className="px-4 py-3 font-medium text-gray-500">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {allCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{cat.title}</td>
                <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
                <td className="px-4 py-3">{cat.order}</td>
                <td className="px-4 py-3">{countMap.get(cat.id) || 0}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/categories/${cat.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Sửa
                    </Link>
                    {!countMap.get(cat.id) && (
                      <form
                        action={async () => {
                          "use server";
                          await deleteCategory(cat.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="text-red-600 hover:underline"
                        >
                          Xóa
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allCategories.length === 0 && (
          <p className="p-8 text-center text-gray-500">Chưa có danh mục nào.</p>
        )}
      </div>
    </div>
  );
}
