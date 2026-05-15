"use client";

import { useState } from "react";
import Image from "next/image";
import { createProduct, updateProduct, addProductImage, deleteProductImage, setMainImage } from "@/app/admin/products/actions";

const COLOR_OPTIONS = [
  { value: "trang", label: "Trắng" },
  { value: "do", label: "Đỏ" },
  { value: "hong", label: "Hồng" },
  { value: "vang", label: "Vàng" },
  { value: "tim", label: "Tím" },
  { value: "xanh", label: "Xanh" },
  { value: "cam", label: "Cam" },
  { value: "pastel", label: "Pastel" },
];

const FLOWER_OPTIONS = [
  { value: "hong", label: "Hồng (Rose)" },
  { value: "lan", label: "Lan (Orchid)" },
  { value: "cuc", label: "Cúc" },
  { value: "tulip", label: "Tulip" },
  { value: "mau-don", label: "Mẫu Đơn" },
  { value: "ly", label: "Ly (Lily)" },
  { value: "cam-tu-cau", label: "Cẩm Tú Cầu" },
  { value: "baby", label: "Baby" },
];

interface ProductFormProps {
  product?: {
    id: number;
    title: string;
    slug: string;
    price: number;
    priceNote: string | null;
    description: string | null;
    categoryId: number;
    colorTones: string[] | null;
    flowerTypes: string[] | null;
    isBestSeller: boolean;
    bestSellerOrder: number | null;
    images: {
      id: number;
      url: string;
      alt: string | null;
      isMain: boolean;
      order: number;
    }[];
  };
  categories: { id: number; title: string; slug: string }[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const [title, setTitle] = useState(product?.title || "");
  const [uploading, setUploading] = useState(false);

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!product || !e.target.files?.length) return;
    setUploading(true);

    for (const file of Array.from(e.target.files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        const isMain = product.images.length === 0;
        await addProductImage(product.id, url, file.name, isMain);
      }
    }

    setUploading(false);
    window.location.reload();
  }

  const formAction = product
    ? updateProduct.bind(null, product.id)
    : createProduct;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <form action={formAction} className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Tên sản phẩm</label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Slug</label>
            <input
              name="slug"
              defaultValue={product?.slug || generateSlug(title)}
              key={title}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Giá (VNĐ)</label>
            <input
              name="price"
              type="number"
              defaultValue={product?.price || ""}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Ghi chú giá</label>
            <input
              name="priceNote"
              defaultValue={product?.priceNote || ""}
              placeholder='VD: "Giá từ"'
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Danh mục</label>
            <select
              name="categoryId"
              defaultValue={product?.categoryId || ""}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Mô tả</label>
          <textarea
            name="description"
            defaultValue={product?.description || ""}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Tone màu</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    name="colorTones"
                    value={opt.value}
                    defaultChecked={product?.colorTones?.includes(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Loại hoa</label>
            <div className="flex flex-wrap gap-2">
              {FLOWER_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    name="flowerTypes"
                    value={opt.value}
                    defaultChecked={product?.flowerTypes?.includes(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isBestSeller"
              defaultChecked={product?.isBestSeller}
            />
            Best Seller
          </label>
          <div>
            <label className="text-sm font-medium">Thứ tự BS</label>
            <input
              name="bestSellerOrder"
              type="number"
              defaultValue={product?.bestSellerOrder || ""}
              className="ml-2 w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          {product ? "Cập nhật" : "Tạo sản phẩm"}
        </button>
      </form>

      {product && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 font-medium">Ảnh sản phẩm</h3>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {product.images.map((img) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden rounded border">
                <Image
                  src={img.url}
                  alt={img.alt || product.title}
                  fill
                  className="object-cover"
                />
                {img.isMain && (
                  <span className="absolute left-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
                    Main
                  </span>
                )}
                <div className="absolute inset-0 hidden items-end justify-center gap-1 bg-black/40 pb-2 group-hover:flex">
                  {!img.isMain && (
                    <form action={setMainImage.bind(null, product.id, img.id)}>
                      <button className="rounded bg-white px-2 py-1 text-[10px] font-medium">
                        Set Main
                      </button>
                    </form>
                  )}
                  <form action={deleteProductImage.bind(null, img.id)}>
                    <button className="rounded bg-red-600 px-2 py-1 text-[10px] font-medium text-white">
                      Xóa
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
          <label className="block cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 hover:border-gray-400">
            {uploading ? "Đang upload..." : "Click để thêm ảnh"}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      )}
    </div>
  );
}
