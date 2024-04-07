/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardCheckIcon, Link, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Confirmation } from "./confirmation";
import { ICollection } from "@/app/interfaces/collection";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { EditCollection } from "./edit-collection";

type LinkProps = ICollection & {
  onChange(): void;
};

export function Collection({
  id,
  hash,
  name,
  description,
  links,
  onChange,
}: LinkProps) {
  const [inCopy, setInCopy] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { t } = useTranslation();

  const onCollectionChange = () => {
    setIsEditing(false);
    onChange();
  };

  const onCollectionDelete = () => {
    setIsDeleting(false);
    onChange();
  };

  const copyToClipboard = (hash: string, seconds: number = 3): void => {
    navigator.clipboard.writeText(
      window.location.origin.replace(/\/\s*$/, "").concat(`/collections/${hash}`)
    );

    setInCopy(true);

    setTimeout(() => setInCopy(false), seconds * 1000);
  };

  return (
    <Card className="mb-2 bg-zinc-50 dark:bg-zinc-900 col-span-1">
      <CardHeader className="w-[80%] px-4 pt-4 pb-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="truncate">
          {description ?? "-"}
        </CardDescription>
        <div className="text-xs flex items-center justify-start">
          {t("Links")}:{" "}
          <Badge variant="outline" className="text-xs ml-2">
            {links.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-1 flex items-center justify-end px-2 space-x-2">
        <Button variant="outline" onClick={() => copyToClipboard(hash)}>
          {inCopy ? (
            <ClipboardCheckIcon className="h-4 w-4" />
          ) : (
            <Link className="h-4 w-4 cursor-pointer text-blue-200" />
          )}
        </Button>
        <Button
          variant="outline"
          className="h-8 rounded-md px-3 text-xs xl:h-9 xl:px-4 xl:py-2"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-4 w-4 text-yellow-100" />
        </Button>
        <Button
          variant="outline"
          className="h-8 rounded-md px-3 text-xs xl:h-9 xl:px-4 xl:py-2"
          onClick={() => setIsDeleting(true)}
        >
          <Trash2 className="h-4 w-4 text-red-200" />
        </Button>
        {isDeleting && (
          <Confirmation
            onClose={() => setIsDeleting(false)}
            onConfirm={() => onCollectionDelete()}
            url={`collections/${id}`}
          />
        )}
        {isEditing && (
          <div>
            <EditCollection
              collection={{ id, hash, name, description, links }}
              onSave={() => onCollectionChange()}
              isOpen={true}
              onClose={() => setIsEditing(false)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
