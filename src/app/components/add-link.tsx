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
import { ReactNode, useState } from "react";
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
import { useTranslation } from "react-i18next";

type AddLinkProps = {
  children: ReactNode;
  link?: ILink;
  onSave(): void;
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
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export function AddLink({ children, link, onSave }: AddLinkProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const { openToast } = useToastStore();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
      thumbnail: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof linkSchema>) => {
    setIsSaving(true);

    try {
      await http.upload(link ? "PUT" : "POST", "links", values);

      onSave();
    } catch (error: any) {
      const { data } = error.response;

      openToast("Save Failed", data.message);
    }

    form.reset();

    setIsSaving(false);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("Add Link")}</SheetTitle>
          <SheetDescription>
            {t("Add new link here. Click save when you're done.")}
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

              {link?.thumbnail && <img src={link.thumbnail} />}

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
