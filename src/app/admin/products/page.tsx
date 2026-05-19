import Link from "next/link";
import Image from "next/image";
import { db } from "@db";
import { products, productImages } from "@db/schema";
import { asc, desc } from "drizzle-orm";
import { DeleteProductButton } from "./delete-button";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const allProducts = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    with: {
      category: true,
      images: {
        orderBy: [asc(productImages.order)],
        limit: 1,
      },
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sản phẩm</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500">Ảnh</th>
              <th className="px-4 py-3 font-medium text-gray-500">Tên</th>
              <th className="px-4 py-3 font-medium text-gray-500">Giá</th>
              <th className="px-4 py-3 font-medium text-gray-500">Danh mục</th>
              <th className="px-4 py-3 font-medium text-gray-500">Best Seller</th>
              <th className="px-4 py-3 font-medium text-gray-500">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {allProducts.map((product) => {
              const thumb = product.images[0];
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {thumb ? (
                      <Image
                        src={thumb.url}
                        alt={product.title}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 text-gray-400">
                        —
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{product.title}</td>
                  <td className="px-4 py-3">
                    {product.price.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {product.category?.title || "—"}
                  </td>
                  <td className="px-4 py-3">
                    {product.isBestSeller ? (
                      <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                        Yes
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Sửa
                      </Link>
                      <DeleteProductButton id={product.id} name={product.title} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {allProducts.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            Chưa có sản phẩm nào.
          </p>
        )}
      </div>
    </div>
  );
}
