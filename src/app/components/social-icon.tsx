import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SocialIconProps = {
  url?: string;
  children: ReactNode;
  onClick(): void
};

export function SocialIcon({ url, children, onClick }: SocialIconProps) {
  return (
    <a
      href={url ?? "#"}
      onClick={onClick}
      className={cn(
        buttonVariants({
          variant: "link",
          size: "icon",
        }),
        "rounded-full w-8 h-8 sm:w-12 sm:h-12 hover:scale-110 text-[#333]"
      )}
    >
      {children}
    </a>
  );
}
