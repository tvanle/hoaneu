import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Sản Phẩm",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên sản phẩm",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      title: "Ngôn ngữ",
      type: "string",
      options: {
        list: [
          { title: "Tiếng Việt", value: "vi" },
          { title: "English", value: "en" },
        ],
      },
      initialValue: "vi",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Ảnh chính",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Mô tả ảnh",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Bộ sưu tập ảnh",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Mô tả ảnh",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Giá (VNĐ)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "priceNote",
      title: "Ghi chú giá",
      type: "string",
      description: 'VD: "Giá từ", "Liên hệ"',
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "category",
      title: "Danh mục",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "colorTones",
      title: "Tone màu",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Trắng", value: "trang" },
          { title: "Đỏ", value: "do" },
          { title: "Hồng", value: "hong" },
          { title: "Vàng", value: "vang" },
          { title: "Tím", value: "tim" },
          { title: "Xanh", value: "xanh" },
          { title: "Cam", value: "cam" },
          { title: "Pastel", value: "pastel" },
        ],
      },
    }),
    defineField({
      name: "flowerTypes",
      title: "Loại hoa chính",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Hồng (Rose)", value: "hong" },
          { title: "Lan (Orchid)", value: "lan" },
          { title: "Cúc (Chrysanthemum)", value: "cuc" },
          { title: "Tulip", value: "tulip" },
          { title: "Mẫu Đơn (Peony)", value: "mau-don" },
          { title: "Ly (Lily)", value: "ly" },
          { title: "Cẩm Tú Cầu (Hydrangea)", value: "cam-tu-cau" },
          { title: "Baby (Baby's Breath)", value: "baby" },
        ],
      },
    }),
    defineField({
      name: "isBestSeller",
      title: "Best Seller",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "bestSellerOrder",
      title: "Thứ tự Best Seller",
      type: "number",
      hidden: ({ document }) => !document?.isBestSeller,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      price: "price",
      language: "language",
    },
    prepare({ title, media, price, language }) {
      return {
        title: `${title} [${language?.toUpperCase()}]`,
        subtitle: price ? `${price.toLocaleString()}₫` : "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Tên A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Giá thấp → cao",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
  ],
});
