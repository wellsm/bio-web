import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum IconStyle {
  Circle        = "circle",
  Square        = "square",
  RoundedSquare = "rounded-square"
}

type SocialIconProps = React.ComponentPropsWithoutRef<React.ElementType> & {
  url?: string;
  iconStyle: IconStyle;
  prefix: IconPrefix,
  icon: IconName,
  onClick(): void
};

export function SocialIcon({ url, iconStyle, prefix, icon, onClick, ...props }: SocialIconProps) {
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
      <FontAwesomeIcon
        icon={[prefix, icon]}
        className="h-5 w-5"
      />
    </a>
  );
}
