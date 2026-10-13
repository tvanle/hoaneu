import { ProductCard } from "./product-card";

export interface ProductGridItem {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  priceNote?: string;
  mainImage?: { asset?: { url?: string }; alt?: string };
}

export function ProductGrid({ products }: { products: ProductGridItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 xl:grid-cols-3 2xl:gap-x-8">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          title={product.title}
          slug={product.slug.current}
          price={product.price}
          priceNote={product.priceNote}
          mainImage={product.mainImage}
        />
      ))}
    </div>
  );
}
