import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="text-center">
        <h1 className="text-6xl font-serif mb-4">404</h1>
        <p className="text-hoa-gray mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-block bg-hoa-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-hoa-gray transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
