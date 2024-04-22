/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link2, Pencil, Pin, PinOff, Trash2 } from "lucide-react";
import { ILink } from "../interfaces/link";
import { EditLink } from "./edit-link";
import { useState } from "react";
import { http } from "@/lib/api";
import { useToastStore } from "../stores/toast";
import { Confirmation } from "./confirmation";
import { src } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useBioStore } from "../stores/bio";
import { useCopyToClipboard } from "usehooks-ts";

type LinkProps = ILink & {
  onChange(): void;
};

export function Link({
  id,
  title,
  url,
  short_url: shortUrl,
  thumbnail,
  active,
  fixed,
  onChange,
}: LinkProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(fixed);
  const [, copy] = useCopyToClipboard();

  const { t } = useTranslation();
  const { openToast } = useToastStore();
  const { onBioChange } = useBioStore();

  const onLinkChange = () => {
    setIsEditing(false);
    onChange();
  };

  const onLinkDelete = () => {
    setIsDeleting(false);
    onChange();
  };

  const onActiveChange = async () => {
    try {
      await http.put(`links/${id}/toggle`);

      onBioChange();
    } catch (error: any) {
      const { data } = error.response;

      openToast("Toggle Failed", data.message);
    }
  };

  const onFixedChange = async () => {
    try {
      await http.put(`links/${id}/toggle/fixed`);

      onBioChange();
      setIsFixed(!isFixed);
    } catch (error: any) {
      const { data } = error.response;

      openToast("Toggle Failed", data.message);
    }
  };

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        openToast(t("Copied"), t("Link copied to clipboard"));
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <Card className="mb-2 bg-zinc-50 dark:bg-zinc-900">
      <CardContent className="grid grid-cols-7 py-2 px-4 relative">
        <div className="col-span-7 xl:col-span-4">
          <div className="flex flex-col sm:flex-row sm:w-[90%] md:w-[85%]">
            <Avatar className="mr-4 mb-2 sm:mb-0">
              <AvatarImage src={src(thumbnail)} />
            </Avatar>
            <div className="w-full">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <a
                className="text-muted-foreground text-sm xl:text-base block truncate"
                href={url}
              >
                {url}
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-7 xl:col-span-3 flex items-center gap-1 justify-end mt-2 xl:mt-0 absolute right-4 sm:relative sm:right-0">
          {shortUrl && (
            <Link2
              className="w-6 h-6 mr-2 cursor-pointer "
              onClick={handleCopy(shortUrl)}
            />
          )}
          <div
            className="flex flex-col items-center mr-3 cursor-pointer"
            onClick={() => onFixedChange()}
          >
            {isFixed ? (
              <Pin className="w-6 h-6 fill-primary" />
            ) : (
              <PinOff className="w-6 h-6" />
            )}
          </div>
          <div className="flex flex-col items-center mr-2">
            <Switch
              id="active"
              defaultChecked={active}
              onCheckedChange={onActiveChange}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="xl:h-9"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4 text-yellow-100" />
          </Button>
          {isEditing && (
            <EditLink
              link={{ id, title, url, thumbnail, fixed }}
              onSave={() => onLinkChange()}
              isOpen={true}
              onClose={() => setIsEditing(false)}
            />
          )}
          <Button
            variant="outline"
            size="sm"
            className="xl:h-9"
            onClick={() => setIsDeleting(true)}
          >
            <Trash2 className="h-4 w-4 text-red-200" />
          </Button>
          {isDeleting && (
            <Confirmation
              onClose={() => setIsDeleting(false)}
              onConfirm={() => onLinkDelete()}
              url={`links/${id}`}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
