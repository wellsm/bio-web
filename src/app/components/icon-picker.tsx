import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IIcon } from "@/app/interfaces/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";

const ICONS: IIcon[] = [
  { family: "fab", icon: "dribbble" },
  { family: "fab", icon: "square-dribbble" },
  { family: "fab", icon: "behance" },
  { family: "fab", icon: "square-behance" },
  { family: "fab", icon: "pinterest" },
  { family: "fab", icon: "square-pinterest" },
  { family: "fab", icon: "pinterest-p" },
  { family: "fab", icon: "reddit" },
  { family: "fab", icon: "square-reddit" },
  { family: "fab", icon: "threads" },
  { family: "fab", icon: "square-threads" },
  { family: "fab", icon: "google-play" },
  { family: "fab", icon: "app-store" },
  { family: "fab", icon: "app-store-ios" },
  { family: "fab", icon: "amazon" },
  { family: "fab", icon: "sketch" },
  { family: "fab", icon: "spotify" },
  { family: "fab", icon: "soundcloud" },
  { family: "fab", icon: "invision" },
  { family: "fas", icon: "envelope" },
  { family: "far", icon: "envelope" },
  { family: "fab", icon: "facebook" },
  { family: "fab", icon: "facebook-f" },
  { family: "fab", icon: "facebook-messenger" },
  { family: "fab", icon: "square-facebook" },
  { family: "fab", icon: "youtube" },
  { family: "fab", icon: "twitch" },
  { family: "fab", icon: "tiktok" },
  { family: "fab", icon: "x-twitter" },
  { family: "fab", icon: "twitter" },
  { family: "fab", icon: "google-plus-g" },
  { family: "fab", icon: "linkedin" },
  { family: "fab", icon: "linkedin-in" },
  { family: "fab", icon: "instagram" },
  { family: "fab", icon: "square-instagram" },
  { family: "fab", icon: "discord" },
  { family: "fab", icon: "telegram" },
  { family: "fab", icon: "whatsapp" },
  { family: "fab", icon: "square-whatsapp" },
  { family: "fab", icon: "signal-messenger" },
  { family: "fab", icon: "patreon" },
  { family: "fab", icon: "snapchat" },
  { family: "fab", icon: "square-snapchat" },
  { family: "fab", icon: "slack" },
  { family: "fab", icon: "stack-overflow" },
  { family: "fab", icon: "github" },
  { family: "fab", icon: "github-alt" },
  { family: "fab", icon: "square-github" },
  { family: "fab", icon: "gitlab" },
  { family: "fab", icon: "square-gitlab" },
  { family: "fab", icon: "bitbucket" },
];

type IconPickerProps = {
    children: ReactNode,
  onIconSelect(icon: IIcon): void;
};

export function IconPicker({ children, onIconSelect }: IconPickerProps) {
  const [icons, setIcons] = useState<IIcon[]>(ICONS);
  const { t } = useTranslation();

  function onTypeSearch({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>) {
    setIcons(
      ICONS.filter((item) =>
        item.icon
          .toString()
          .toLowerCase()
          .includes(currentTarget.value.toLowerCase())
      )
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex gap-2">
            <div className="relative grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("Search Icon")}
                className="pl-8 py-4 w-full text-gray-900 focus-visible:ring-0 border-zinc-200 focus-visible:outline-none"
                onKeyUp={onTypeSearch}
                onChange={onTypeSearch}
              />
            </div>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setTimeout(() => setIcons(ICONS), 500)}>{t('Cancel')}</Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center max-w-screen-md">
          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 col-span-1 max-w-screen-md">
            {icons.map((icon) => (
              <Card
                key={icon.family + "-" + icon.icon}
                className="h-12 w-12 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-zinc-900"
              >
                <CardContent className="p-0 m-0 border-0">
                  <DialogClose asChild>
                    <Button
                      size="icon"
                      variant="link"
                      className="text-gray-700 dark:text-white"
                      onClick={() => onIconSelect(icon)}
                    >
                      <FontAwesomeIcon
                        icon={[icon.family, icon.icon]}
                        className="h-6 w-6"
                      />
                    </Button>
                  </DialogClose>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
