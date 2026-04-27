import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Cài Đặt Website",
  type: "document",
  fields: [
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
      name: "shopName",
      title: "Tên shop",
      type: "string",
      initialValue: "Hoa Nêu",
    }),
    defineField({
      name: "heroTitle",
      title: "Tiêu đề Hero",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Phụ đề Hero",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Ảnh Hero",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "phone",
      title: "Số điện thoại",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Địa chỉ",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "shopName",
      language: "language",
    },
    prepare({ title, language }) {
      return {
        title: `${title} [${language?.toUpperCase()}]`,
      };
    },
  },
});
