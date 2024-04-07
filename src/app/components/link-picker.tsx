import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ReactNode, useState } from "react";
import { ListX, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";
import { ICollectionLink } from "../interfaces/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { src } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type LinkPickerProps = {
  children: ReactNode;
  links: ICollectionLink[],
  onLinkSelect(link: ICollectionLink): void;
};

export function LinkPicker({ children, links, onLinkSelect }: LinkPickerProps) {
  const [search, setSearch] = useState<string>();
  const { t } = useTranslation();

  const items: ICollectionLink[] =
    search !== undefined
      ? links.filter((link: ICollectionLink) =>
          link.title.toString().toLowerCase().includes(search)
        )
      : links;

  const onTypeSearch = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>) => {
    setSearch(currentTarget.value.toLowerCase());
  };

  const selectLink = (link: ICollectionLink) => {
    onLinkSelect(link);
    setSearch("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex gap-2">
            <div className="relative grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("Search Link")}
                className="pl-8 py-4 w-full text-gray-900 dark:text-white focus-visible:ring-0 border-zinc-200 focus-visible:outline-none"
                onKeyUp={onTypeSearch}
                onChange={onTypeSearch}
              />
            </div>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => setTimeout(() => setSearch(""), 500)}
              >
                {t("Cancel")}
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center max-w-screen-md space-y-2">
          {items.length <= 10 ? (
            items.map((link: ICollectionLink) => (
              <DialogClose 
                key={`link-picker-${link.id}`}
                asChild
              >
                <Card
                  className="w-full bg-gray-200 dark:bg-zinc-950 cursor-pointer hover:bg-gray-300 dark:hover:bg-zinc-900"
                  onClick={() => selectLink(link)}
                >
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                      <Avatar className="mr-4 mb-2 sm:mb-0">
                        <AvatarImage src={src(link.thumbnail)} />
                      </Avatar>
                      <div className="w-full">
                        <CardTitle className="text-sm font-medium">
                          {link.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogClose>
            ))
          ) : (
            <Alert>
              <ListX className="h-4 w-4" />
              <AlertTitle>{t("Too much results")}</AlertTitle>
              <AlertDescription>
                {t("Use search input to filter results")}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
