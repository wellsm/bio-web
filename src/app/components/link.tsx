/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash } from "lucide-react";
import { ILink } from "../interfaces/link";
import { EditLink } from "./edit-link";
import { useState } from "react";
import { http } from "@/lib/api";
import { useToastStore } from "../stores/toast";
import { Confirmation } from "./confirmation";
import { src } from "@/lib/utils";

type LinkProps = ILink & {
  onChange(): void;
};

export function Link({
  id,
  title,
  url,
  thumbnail,
  active,
  onChange,
}: LinkProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { openToast } = useToastStore();

  const onLinkChange = () => {
    setIsEditing(false);
    onChange();
  };

  const onLinkDelete = () => {
    setIsDeleting(false);
    onChange();
  }

  const onActiveChange = async () => {
    try {
      await http.put(`links/${id}/toggle`);
    } catch (error: any) {
      const { data } = error.response;

      openToast("Toggle Failed", data.message);
    }
  };

  return (
    <Card className="mb-2 bg-zinc-50 dark:bg-zinc-900">
      <CardContent className="grid grid-cols-7 py-2 px-4 relative">
        <div className="col-span-7 xl:col-span-5">
          <div className="flex flex-col  sm:flex-row">
            <Avatar className="mr-4 mb-2 sm:mb-0">
              <AvatarImage src={src(thumbnail)} />
            </Avatar>
            <div>
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
        <div className="col-span-7 xl:col-span-2 flex items-center gap-1 flex-row-reverse justify-start mt-2 xl:mt-0 absolute right-4 sm:relative sm:right-0">
          <Button
            variant="outline"
            className="h-8 rounded-md px-3 text-xs xl:h-9 xl:px-4 xl:py-2"
            onClick={() => setIsDeleting(true)}
          >
            <Trash className="h-3 w-3" />
          </Button>
          {isDeleting && (
            <Confirmation
              onClose={() => setIsDeleting(false)}
              onConfirm={() => onLinkDelete()}
              url={`links/${id}`}
            />
          )}
          <Button
            variant="outline"
            className="h-8 rounded-md px-3 text-xs xl:h-9 xl:px-4 xl:py-2"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          {isEditing && (
            <EditLink
              link={{ id, title, url, thumbnail }}
              onSave={() => onLinkChange()}
              isOpen={true}
              onClose={() => setIsEditing(false)}
            />
          )}
          <div className="flex flex-col items-center mr-2">
            <Switch
              id="active"
              defaultChecked={active}
              onCheckedChange={onActiveChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
