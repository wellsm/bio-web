import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export enum IconStyle {
  Circle        = "circle",
  Square        = "square",
  RoundedSquare = "rounded-square"
}

type SocialIconProps = React.ComponentPropsWithoutRef<React.ElementType> & {
  url?: string;
  children: ReactNode;
  iconStyle: IconStyle;
  onClick(): void
};

export function SocialIcon({ url, children, iconStyle, onClick, ...props }: SocialIconProps) {
  return (
    <a
      {...props}
      href={url ?? "#"}
      onClick={onClick}
      className={cn(
        buttonVariants({
          variant: "link",
          size: "icon",
        }),
        iconStyle == IconStyle.Circle && "rounded-full",
        iconStyle == IconStyle.Square && "rounded-none",
        iconStyle == IconStyle.RoundedSquare && "rounded-lg",
        "w-9 h-9 hover:scale-110 text-[#333]"
      )}
    >
      {children}
    </a>
  );
}
