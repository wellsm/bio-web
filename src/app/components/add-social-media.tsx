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
import { IconPicker } from "./icon-picker";
import { IIcon } from "../interfaces/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import { ColorGradientPicker } from "./color-gradient-picker";

type AddSocialMediaProps = {
  children: ReactNode;
  onSave(): void;
};

const mediaSchema = z.object({
  icon: z.string().trim(),
  url: z.string().trim().url("The URL must be a valid link."),
  text_color: z.string(),
  background: z.string(),
});

export function AddSocialMedia({ children, onSave }: AddSocialMediaProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState<IIcon>();
  const [textColor, setTextColor] = useState<string>("#000");
  const [background, setBackground] = useState<string>("#fff");
  const { openToast } = useToastStore();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof mediaSchema>>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      icon: "",
      url: "",
      text_color: textColor,
      background: background,
    },
  });

  const onSubmit = async (values: z.infer<typeof mediaSchema>) => {
    setIsSaving(true);

    try {
      await http.upload("POST", "social-medias", values);

      onSave();
    } catch (error: any) {
      const { data } = error.response;

      openToast("Save Failed", data.message);
    }

    form.reset();

    setIcon(undefined);
    setIsSaving(false);
    setIsOpen(false);
  };

  const onChangeIcon = (icon: IIcon) => {
    setIcon(icon);

    form.setValue("icon", `${icon.family} ${icon.icon}`);
  };

  const onChangeTextColor = (color: string) => {
    setTextColor(color);

    form.setValue("text_color", color);
  };

  const onChangeBackgroundColor = (color: string) => {
    setBackground(color);

    form.setValue("background", color);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("Add Social Media")}</SheetTitle>
          <SheetDescription>
            {t("Add new social media here. Click save when you're done.")}
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
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Icon")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        {icon && (
                          <FontAwesomeIcon
                            icon={[icon.family, icon.icon]}
                            className="absolute left-2 top-2.5 h-4 w-4"
                          />
                        )}
                        <Input
                          type="text"
                          id="icon"
                          readOnly
                          disabled={isSaving}
                          className="pl-8 py-4 w-full focus-visible:ring-0 border-zinc-200 focus-visible:outline-none"
                          {...field}
                          value={`${icon?.family ?? ""} ${
                            icon?.icon ?? ""
                          }`.trim()}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <IconPicker onIconSelect={onChangeIcon}>
                <Button variant="outline" className="-mt-2">
                  {t("Select Icon")}
                </Button>
              </IconPicker>

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("URL")}</FormLabel>
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

              <FormField
                control={form.control}
                name="text_color"
                render={() => (
                  <FormItem>
                    <FormLabel>{t("Icon Color")}</FormLabel>
                    <FormControl>
                      <ColorGradientPicker
                        color="#000"
                        onColorSelect={onChangeTextColor}
                      >
                        <div
                          className="flex items-center justify-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-center text-xs"
                          style={{
                            background: textColor,
                          }}
                        >
                          <p
                            style={{
                              WebkitTextStroke: "0.5px #000",
                            }}
                          >
                            {t("Clique here to change color")}
                          </p>
                        </div>
                      </ColorGradientPicker>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="background"
                render={() => (
                  <FormItem>
                    <FormLabel>{t("Background Icon Color")}</FormLabel>
                    <FormControl>
                      <ColorGradientPicker
                        color="#fff"
                        onColorSelect={onChangeBackgroundColor}
                      >
                        <div
                          className="flex items-center justify-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-center text-xs"
                          style={{
                            background: background,
                          }}
                        >
                          <p
                            style={{
                              WebkitTextStroke: "0.5px #000",
                            }}
                          >
                            {t("Clique here to change color")}
                          </p>
                        </div>
                      </ColorGradientPicker>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <Button className="w-full" disabled={isSaving}>
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
