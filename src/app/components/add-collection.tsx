/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode, useState, useEffect, useCallback } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { http } from "@/lib/api";
import { useToastStore } from "@/app/stores/toast";
import { Loader, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { LinkPicker } from "./link-picker";
import { ICollectionLink } from "../interfaces/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { src } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type AddCollectionProps = {
  children: ReactNode;
  onSave(): void;
};

const collectionSchema = z.object({
  name: z.string().trim().min(3, "The name must be at least 3 characters."),
  description: z.string().trim(),
  links: z.number().array().min(1),
});

export function AddCollection({ children, onSave }: AddCollectionProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<ICollectionLink[]>([]);
  const [links, setLinks] = useState<ICollectionLink[]>([]);
  const { openToast } = useToastStore();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      description: "",
      links: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof collectionSchema>) => {
    setIsSaving(true);

    try {
      await http.post("collections", values);

      onSave();
    } catch (error: any) {
      const { data } = error.response;

      openToast("Save Failed", data.message);
    }

    form.reset();

    setIsSaving(false);
    setIsOpen(false);
  };

  const addLink = (link: ICollectionLink) => {
    const links = [
      ...selected.filter((l: ICollectionLink) => l.id !== link.id),
      link,
    ];

    form.setValue(
      "links",
      links.map((l) => l?.id ?? 0).filter((link) => link !== 0),
      { shouldValidate: true }
    );

    setSelected(links);

    console.log(form.getValues());
  };

  const removeLink = (link: ICollectionLink) => {
    const links = selected.filter((l) => l.id !== link.id);

    form.setValue(
      "links",
      links.map((l) => l?.id ?? 0).filter((l) => l),
      { shouldValidate: true }
    );

    setSelected(links);
  };

  const getLinks = useCallback(() => {
    http.get("collections/links").then(({ data }) => setLinks(data));
  }, []);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </SheetTrigger>
      <SheetContent className="overflow-y-auto scrollbar-thin dark:scrollbar-thumb-gray-50 dark:scrollbar-track-zinc-900">
        <SheetHeader>
          <SheetTitle>{t("Add Collection")}</SheetTitle>
          <SheetDescription>
            {t("Add new collection here. Click save when you're done.")}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Name")}</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isSaving}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Description")}</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        rows={4}
                        id="description"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isSaving}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {links.length !== 0 && (
                <LinkPicker
                  links={links}
                  onLinkSelect={(link: ICollectionLink) => addLink(link)}
                >
                  <Button variant="outline" type="button">
                    {t("Select Link")}
                  </Button>
                </LinkPicker>
              )}

              {selected.map((link: ICollectionLink) => (
                <Card
                  className="w-full bg-gray-200 dark:bg-zinc-950 cursor-pointer"
                  key={`collection-link-${link.id}`}
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
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeLink(link)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                className="w-full"
                disabled={isSaving || !form.formState.isValid}
              >
                {isSaving && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                {t("Save")}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
