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
    <div className="flex items-end justify-between mb-8 md:mb-12">
      <h2 className="text-3xl md:text-4xl font-serif">{title}</h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm uppercase tracking-wider text-hoa-gray hover:text-hoa-black transition-colors"
        >
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
}
