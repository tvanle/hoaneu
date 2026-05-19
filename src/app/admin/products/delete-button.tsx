"use client";

import { useTransition } from "react";
import { deleteProduct } from "./actions";

export function DeleteProductButton({ id, name }: { id: number; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Xóa sản phẩm "${name}"?`)) return;
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
