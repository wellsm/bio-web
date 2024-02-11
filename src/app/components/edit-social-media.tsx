/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { IconPicker } from "./icon-picker";
import { IIcon } from "../interfaces/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISocialMedia } from "../interfaces/social-media";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CheckCircle, Circle, Loader } from "lucide-react";

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

type EditSocialMediaProps = {
  media: ISocialMedia;
  onSave(): void;
  onClose(): void;
  isOpen: boolean;
};

const mediaSchema = z.object({
  icon: z.string().trim(),
  url: z.string().trim().url("The URL must be a valid link."),
  active: z.string(),
});

export function EditSocialMedia({
  media,
  onSave,
  onClose,
  isOpen: isDefaultOpen = true,
}: EditSocialMediaProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const [icon, setIcon] = useState<IIcon | undefined>(media?.icon);
  const { openToast } = useToastStore();

  const form = useForm<z.infer<typeof mediaSchema>>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      icon: `${media.icon.family} ${media.icon.icon}`,
      url: media?.url,
      active: media?.active ? "1" : "0",
    },
  });

  const onSubmit = async (values: z.infer<typeof mediaSchema>) => {
    setIsSaving(true);

    try {
      await http.upload("PUT", `social-medias/${media.id}`, values);

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

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open === false) {
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{media ? "Edit" : "Add"} Social Media</SheetTitle>
          <SheetDescription>
            {media ? "Edit your" : "Add new"} social media here. Click save when
            you're done.
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
                    <FormLabel>Icon</FormLabel>
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
                  Select Icon
                </Button>
              </IconPicker>

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
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
                name="active"
                render={() => (
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <ToggleGroup
                      id="status"
                      type="single"
                      className="flex justify-betweenn mt-3"
                      variant="outline"
                      defaultValue={Number(media?.active).toString()}
                      onValueChange={(value: string) =>
                        form.setValue("active", value)
                      }
                    >
                      <ToggleGroupItem value="1" className="grow">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        Active
                      </ToggleGroupItem>
                      <ToggleGroupItem value="0" className="grow">
                        <Circle className="h-5 w-5 text-red-500 mr-3" />
                        Inactive
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                )}
              ></FormField>

              <Button className="w-full" disabled={isSaving}>
                {isSaving && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
