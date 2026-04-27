import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Danh Mục",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên danh mục",
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
      name: "description",
      title: "Mô tả",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Ảnh danh mục",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Mô tả ảnh",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "parentCategory",
      title: "Danh mục cha",
      type: "reference",
      to: [{ type: "category" }],
      description: 'Dùng cho subcategory (VD: "Tiệc anni" thuộc "Sản phẩm khác")',
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      language: "language",
    },
    prepare({ title, media, language }) {
      return {
        title: `${title} [${language?.toUpperCase()}]`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Thứ tự",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
