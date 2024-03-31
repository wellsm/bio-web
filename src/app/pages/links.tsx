/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ListX, PlusCircle } from "lucide-react";
import { Link } from "@/app/components/link";
import { AddLink } from "@/app/components/add-link";
import { useCallback, useEffect, useState } from "react";
import { ILink } from "@/app/interfaces/link";
import { http } from "@/lib/api";
import { Paginate } from "@/app/components/pagination";
import { IPagination } from "@/app/interfaces/pagination";
import { LinkFilter } from "@/app/components/link-filter";
import { useSearchParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useBioStore } from "../stores/bio";
import { useTranslation } from "react-i18next";

type LinkResponse = {
  meta: IPagination;
  data: ILink[];
};

export function Links() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [response, setResponse] = useState<LinkResponse>({} as LinkResponse);
  const { onBioChange } = useBioStore();
  const { t } = useTranslation();

  const applyFilters = (values: any) => {
    const params = Object.keys(values)
      .map((v: string) => ({ key: v, value: values[v] }))
      .filter((v) => v.value)
      .reduce((acc, v) => ({ ...acc, [v.key]: v.value }), {});

    setSearchParams(new URLSearchParams({ ...params, page: page.toString() }));
  };

  const query = Object.fromEntries(searchParams);
  const page = query.page ?? 1;

  const changePage = (page: number) => {
    setSearchParams(new URLSearchParams({ ...query, page: page.toString() }));
  };

  const onSaveLink = () => {
    getLinks();
    onBioChange();
  };

  const getLinks = useCallback(() => {
    const query = Object.fromEntries(searchParams);

    http.get("links", query).then(({ data }) => setResponse(data));
  }, [searchParams]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 p-4 md:pl-8 gap-4">
      <div className="col-span-1 lg:col-span-2 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">{t("Links")}</h2>
        </div>
        <LinkFilter onFilter={applyFilters} {...query} />
      </div>
      <div className="col-span-1 lg:col-span-5">
        <div className="flex flex-col justify-center items-center mx-auto max-w-screen-md lg:max-w-screen-lg">
          <AddLink onSave={() => onSaveLink()}>
            <Button className="w-full mb-2">
              <PlusCircle className="w-4 h-4 mr-2" />
              {t("Add Link")}
            </Button>
          </AddLink>
          <div className="links w-full mt-2">
            {response?.data?.length > 0 ? (
              response.data.map((link) => (
                <Link key={link.id} {...link} onChange={() => onSaveLink()} />
              ))
            ) : (
              <Alert>
                <ListX className="h-4 w-4" />
                <AlertTitle>{t("No Results")}</AlertTitle>
                <AlertDescription>
                  {t(
                    "There are no records to display for the selected filters"
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <Paginate
            {...response.meta}
            onEachSide={1}
            onPageChange={(page) => changePage(page)}
          />
        </div>
      </div>
    </div>
  );
}
