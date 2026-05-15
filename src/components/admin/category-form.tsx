"use client";

import { useState } from "react";
import { createCategory, updateCategory } from "@/app/admin/categories/actions";

interface CategoryFormProps {
  category?: {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    order: number;
  };
}

export function CategoryForm({ category }: CategoryFormProps) {
  const [title, setTitle] = useState(category?.title || "");

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  const formAction = category
    ? updateCategory.bind(null, category.id)
    : createCategory;

  return (
    <form
      action={formAction}
      className="max-w-lg space-y-4 rounded-lg border border-gray-200 bg-white p-6"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium">Tên danh mục</label>
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
          defaultValue={category?.slug || generateSlug(title)}
          key={title}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Mô tả</label>
        <textarea
          name="description"
          defaultValue={category?.description || ""}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Thứ tự hiển thị</label>
        <input
          name="order"
          type="number"
          defaultValue={category?.order || 0}
          className="w-32 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
      >
        {category ? "Cập nhật" : "Tạo danh mục"}
      </button>
    </form>
  );
}
