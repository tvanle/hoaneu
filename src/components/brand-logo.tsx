import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  inverted?: boolean;
  priority?: boolean;
}

export function BrandLogo({
  className = "h-12 w-12",
  inverted = false,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Hoa Nêu"
      width={192}
      height={192}
      priority={priority}
      sizes="192px"
      className={`${className} object-contain ${inverted ? "invert" : ""}`}
    />
  );
}
