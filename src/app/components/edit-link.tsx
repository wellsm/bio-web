/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ImageFileInput } from "./image-file-input";
import { ILink } from "@/app/interfaces/link";
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
import { Loader } from "lucide-react";
import { src } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type EditLinkProps = {
  link: ILink;
  onSave(): void;
  onClose(): void;
  isOpen: boolean;
};

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const linkSchema = z.object({
  title: z.string().trim().min(3, "The title must be at least 3 characters."),
  url: z.string().trim().url("The URL must be a valid link."),
  thumbnail: z
    .any()
    .refine(
      (file: File) => (file ? ACCEPTED_IMAGE_TYPES.includes(file?.type) : true),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export function EditLink({
  link,
  onSave,
  onClose,
  isOpen: isDefaultOpen = true,
}: EditLinkProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const { openToast } = useToastStore();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
      thumbnail: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof linkSchema>) => {
    setIsSaving(true);

    try {
      await http.upload("PUT", `links/${link.id}`, values);

      onSave();
    } catch (error: any) {
      const { data } = error.response;

      openToast("Save Failed", data.message);
    }

    form.reset();

    setIsSaving(false);
    setIsOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open === false) {
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto scrollbar-thin dark:scrollbar-thumb-gray-50 dark:scrollbar-track-zinc-900">
        <SheetHeader>
          <SheetTitle>{t('Edit Link')}</SheetTitle>
          <SheetDescription>
            {t("Edit your link here. Click save when you're done.")}
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
                name="title"
                defaultValue={link?.title}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Title')}</FormLabel>
                    <FormControl>
                      <Input
                        id="title"
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
                name="url"
                defaultValue={link?.url}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('URL')}</FormLabel>
                    <FormControl>
                      <Input
                        id="url"
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

              {link?.thumbnail && <img src={src(link.thumbnail)} />}

              <FormField
                control={form.control}
                name="thumbnail"
                render={() => (
                  <FormItem>
                    <ImageFileInput
                      label="Thumbnail"
                      preview
                      onSelect={(file) => {
                        form.setValue("thumbnail", file);
                        form.clearErrors("thumbnail");
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <Button className="w-full" disabled={isSaving}>
                {isSaving && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                {t('Save')}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
