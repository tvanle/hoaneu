import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  inverted?: boolean;
  priority?: boolean;
  tone?: "black" | "red" | "white";
}

export function BrandLogo({
  className = "h-12 w-12",
  inverted = false,
  priority = false,
  tone = "black",
}: BrandLogoProps) {
  const toneClass =
    tone === "red"
      ? "[filter:brightness(0)_saturate(100%)_invert(15%)_sepia(91%)_saturate(3442%)_hue-rotate(340deg)_brightness(87%)_contrast(96%)]"
      : tone === "white" || inverted
        ? "invert"
        : "";

  return (
    <Image
      src="/logo.png"
      alt="Hoa Nêu"
      width={192}
      height={192}
      priority={priority}
      sizes="192px"
      className={`${className} object-contain ${toneClass}`}
    />
  );
}
