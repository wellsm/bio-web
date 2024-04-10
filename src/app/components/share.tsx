import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useTranslation } from "react-i18next";
import { Clipboard, ClipboardCheckIcon, Link, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMediaQuery } from "@/app/contexts/media-query";

type ShareProps = {
  link: string;
  onClose(): void;
  isOpen: boolean;
};

export function Share({
  link,
  onClose,
  isOpen: isDefaultOpen = true,
}: ShareProps) {
  const [inCopy, setInCopy] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const copyToClipboard = (text: string, seconds: number = 3): void => {
    navigator.clipboard.writeText(text);

    setInCopy(true);

    setTimeout(() => setInCopy(false), seconds * 1000);
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open === false) {
      onClose();
    }
  };

  const content = () => {
    return (
      <div className="flex flex-col mt-3">
        <p className="text-slate-900 mb-4">{t("Share this link via")}</p>
        <ul className="flex items-center justify-center gap-3 mb-4">
          <a href={`https://www.facebook.com/sharer.php?u=${link}`}>
            <li className="rounded-full border border-blue-300 text-blue-500 w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500">
              <FontAwesomeIcon
                icon={["fab", "facebook-f"]}
                className="h-6 w-6"
              />
            </li>
          </a>
          <a href={`https://x.com/intent/tweet?text=Check%20out%20this%20Page!%20-%20${link}`}>
            <li className="rounded-full border border-slate-300 text-slate-700 w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-slate-700 hover:text-white hover:border-slate-700">
              <FontAwesomeIcon
                icon={["fab", "x-twitter"]}
                className="h-6 w-6"
              />
            </li>
          </a>
          <a href={`https://wa.me/?text=Check%20out%20this%20Page!%20-%20${link}`}>
            <li className="rounded-full border border-green-300 text-green-500 w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-green-500 hover:text-white hover:border-green-500">
              <FontAwesomeIcon icon={["fab", "whatsapp"]} className="h-6 w-6" />
            </li>
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${link}`}>
            <li className="rounded-full border border-blue-300 text-blue-600 w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:text-white hover:border-blue-600">
              <FontAwesomeIcon
                icon={["fab", "linkedin-in"]}
                className="h-6 w-6"
              />
            </li>
          </a>
          <a href={`https://www.messenger.com/new`}>
            <li className="rounded-full border border-indigo-300 text-indigo-600 w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-indigo-600 hover:text-white hover:border-indigo-600">
              <FontAwesomeIcon
                icon={["fab", "facebook-messenger"]}
                className="h-6 w-6"
              />
            </li>
          </a>
          <a href={`mailto:?subject=Check out this Page!&body=Check%20out%20this%20Page! - ${link}`}>
            <li className="rounded-full border border-slate-300 text-slate-900 w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-slate-900 hover:text-white hover:border-slate-900">
              <FontAwesomeIcon
                icon={["fas", "envelope"]}
                className="h-6 w-6 "
              />
            </li>
          </a>
        </ul>
        <p className="text-slate-900 mb-4">{t("Or copy link")}</p>
        <div className="relative mb-3">
          <Link className="top-3.5 absolute left-2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            readOnly={true}
            defaultValue={link}
            className="h-11 pl-8 py-4 text-gray-900 focus-visible:ring-0 border-zinc-200 focus-visible:outline-none"
          />
          <Button
            className="absolute right-1 top-1.5"
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(link)}
          >
            {inCopy ? (
              <ClipboardCheckIcon className="mr-2 h-4 w-4" />
            ) : (
              <Clipboard className="mr-2 h-4 w-4" />
            )}
            {inCopy ? t("Copied") : t("Copy")}
          </Button>
        </div>
      </div>
    );
  };

  return isDesktop ? (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <div className="flex items-center justify-center relative">
            <DialogTitle className="text-slate-900">
              {t("Share this Page")}
            </DialogTitle>
            <DialogClose asChild className="absolute -right-2">
              <Button variant="link" size="icon">
                <X className="w-4 h-4 text-slate-900" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        {content()}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onOpenChange={onOpenChange} >
      <DrawerContent className="bg-white">
        <DrawerHeader className="text-left">
          <div className="flex items-center justify-center relative">
            <DrawerTitle className="text-slate-900">
              {t("Share this Page")}
            </DrawerTitle>
            <DrawerClose asChild className="absolute -right-2">
              <Button variant="link" size="icon">
                <X className="w-4 h-4 text-slate-900" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="px-4">
            {content()}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
