import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Loader
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

const collectionFilterSchema = z.object({
  name: z.string(),
});

export type CollectionFilterFormProps = {
  name?: string;
};

type LinkFilterProps = CollectionFilterFormProps & {
  onFilter(filters: CollectionFilterFormProps): void;
};

export function CollectionFilter({
  name = "",
  onFilter,
}: LinkFilterProps) {
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof collectionFilterSchema>>({
    resolver: zodResolver(collectionFilterSchema),
    defaultValues: {
      name,
    },
  });

  async function onSubmit(values: z.infer<typeof collectionFilterSchema>) {
    onFilter(values);
  }

  return (
    <Card className="dark:bg-zinc-950">
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
                      disabled={isFiltering}
                      {...field}
                    />
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
