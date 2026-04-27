import { type SchemaTypeDefinition } from "sanity";
import { productType } from "./product-type";
import { categoryType } from "./category-type";
import { siteSettingsType } from "./site-settings-type";

export const schemaTypes: SchemaTypeDefinition[] = [
  productType,
  categoryType,
  siteSettingsType,
];
