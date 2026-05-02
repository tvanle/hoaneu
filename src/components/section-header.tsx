import { Link } from "@/i18n/navigation";

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function SectionHeader({
  title,
  viewAllHref,
  viewAllLabel,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 text-center md:mb-14">
      <h2 className="font-serif text-3xl text-black md:text-4xl">{title}</h2>
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/35">
        Curated floral work
      </p>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="mt-5 inline-flex text-[10px] font-bold uppercase tracking-[0.2em] text-hoa-gray transition-colors hover:text-hoa-black"
        >
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
}
