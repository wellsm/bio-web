/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageFileInput } from "@/app/components/image-file-input";
import { useEffect, useState } from "react";
import { http } from "@/lib/api";

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
import { useToastStore } from "../stores/toast";
import { Loader } from "lucide-react";
import { useBioStore } from "../stores/bio";
import { useTranslation } from "react-i18next";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const profileSchema = z.object({
  name: z.string().trim().min(3, "The title must be at least 3 characters."),
  avatar: z
    .any()
    .refine(
      (file: File) => (file ? ACCEPTED_IMAGE_TYPES.includes(file?.type) : true),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export function Profile() {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>({});
  const { openToast } = useToastStore();
  const { onBioChange } = useBioStore();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      avatar: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setIsSaving(true);

    try {
      await http.upload("PUT", "profile", values);
    } catch (error: any) {
      const { data } = error.response;

      openToast("Save Failed", data.message);
    }

    form.reset()
    form.setValue("name", values.name);

    setIsSaving(false);

    setProfile({ ...profile });
    onBioChange()
  };

  useEffect(() => {
    http.get("profile").then(({ data }) => {
      setProfile(data);

      form.setValue("name", data.name);
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Profile')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              defaultValue={profile?.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Name')}</FormLabel>
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
              name="avatar"
              render={() => (
                <FormItem>
                  <ImageFileInput
                    label="Avatar"
                    preview
                    avatar
                    onSelect={(file) => {
                      form.setValue("avatar", file);
                      form.clearErrors("avatar");
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
      </CardContent>
    </Card>
  );
}
