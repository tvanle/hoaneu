import { db } from "@db";
import { siteSettings } from "@db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function updateSettings(formData: FormData) {
  "use server";

  const data = {
    shopName: (formData.get("shopName") as string) || null,
    heroTitle: (formData.get("heroTitle") as string) || null,
    heroSubtitle: (formData.get("heroSubtitle") as string) || null,
    phone: (formData.get("phone") as string) || null,
    address: (formData.get("address") as string) || null,
    instagramUrl: (formData.get("instagramUrl") as string) || null,
    facebookUrl: (formData.get("facebookUrl") as string) || null,
    updatedAt: new Date(),
  };

  const existing = await db.query.siteSettings.findFirst();

  if (existing) {
    await db.update(siteSettings).set(data).where(eq(siteSettings.id, existing.id));
  } else {
    await db.insert(siteSettings).values(data);
  }

  revalidatePath("/");
  redirect("/admin/settings");
}

export default async function AdminSettingsPage() {
  const settings = await db.query.siteSettings.findFirst();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Cài đặt Website</h1>
      <form
        action={updateSettings}
        className="max-w-lg space-y-4 rounded-lg border border-gray-200 bg-white p-6"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium">Tên shop</label>
          <input
            name="shopName"
            defaultValue={settings?.shopName || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Tiêu đề Hero</label>
          <input
            name="heroTitle"
            defaultValue={settings?.heroTitle || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Phụ đề Hero</label>
          <input
            name="heroSubtitle"
            defaultValue={settings?.heroSubtitle || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Số điện thoại</label>
          <input
            name="phone"
            defaultValue={settings?.phone || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Địa chỉ</label>
          <input
            name="address"
            defaultValue={settings?.address || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Instagram URL</label>
          <input
            name="instagramUrl"
            defaultValue={settings?.instagramUrl || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Facebook URL</label>
          <input
            name="facebookUrl"
            defaultValue={settings?.facebookUrl || ""}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Lưu cài đặt
        </button>
      </form>
    </div>
  );
}
