import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Circle,
  Loader,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
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
import { useTranslation } from "react-i18next";

const linkFilterSchema = z.object({
  title: z.string(),
  url: z.string(),
  active: z.string(),
  fixed: z.string(),
});

export type LinkFilterFormProps = {
  title?: string;
  url?: string;
  active?: string;
  fixed?: string;
};

type LinkFilterProps = LinkFilterFormProps & {
  onFilter(filters: LinkFilterFormProps): void;
};

export function LinkFilter({
  title = "",
  url = "",
  active = "",
  fixed = "",
  onFilter,
}: LinkFilterProps) {
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof linkFilterSchema>>({
    resolver: zodResolver(linkFilterSchema),
    defaultValues: {
      title,
      url,
      active,
      fixed,
    },
  });

  async function onSubmit(values: z.infer<typeof linkFilterSchema>) {
    onFilter(values);
  }

  return (
    <Card className="bg-zinc-950">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center justify-between">
          <span className="mt-0 lg:mt-2">{t("Filters")}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFiltering(!isFiltering)}
            className="lg:hidden"
          >
            {isFiltering === null || isFiltering ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          "space-y-4 p-4 xl:px-4 hidden lg:block",
          isFiltering === null ? "" : isFiltering ? "block" : "hidden"
        )}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Title")}</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isFiltering}
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("URL")}</FormLabel>
                  <FormControl>
                    <Input
                      id="url"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isFiltering}
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Status")}</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      id="active"
                      type="single"
                      className="flex flex-row lg:flex-col xl:flex-row justify-betweenn mt-2"
                      variant="outline"
                      {...field}
                      onValueChange={(value: string) =>
                        form.setValue("active", value)
                      }
                    >
                      <ToggleGroupItem value="1" className="grow w-full">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        <span className="text-xs">{t("Active")}</span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="0" className="grow w-full">
                        <Circle className="h-4 w-4 text-red-500 mr-3" />
                        <span className="text-xs">{t("Inactive")}</span>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="fixed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Fixed Link")}</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      id="fixed"
                      type="single"
                      className="flex flex-row lg:flex-col xl:flex-row justify-betweenn mt-2"
                      variant="outline"
                      {...field}
                      onValueChange={(value: string) =>
                        form.setValue("fixed", value)
                      }
                    >
                      <ToggleGroupItem value="1" className="grow w-full">
                        <ThumbsUp className="h-4 w-4 text-green-500 mr-3" />
                        <span className="text-xs">{t("Yes")}</span>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="0" className="grow w-full">
                        <ThumbsDown className="h-4 w-4 text-red-500 mr-3" />
                        <span className="text-xs">{t("No")}</span>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <Button className="w-full" disabled={isFiltering}>
              {isFiltering && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {t("Filter")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
