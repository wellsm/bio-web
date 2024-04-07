/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ListX, PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { http } from "@/lib/api";
import { Paginate } from "@/app/components/pagination";
import { IPagination } from "@/app/interfaces/pagination";
import { useSearchParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
import { ICollection } from "@/app/interfaces/collection";
import { CollectionFilter } from "../components/collection-filter";
import { Collection } from "../components/collection";
import { AddCollection } from "../components/add-collection";

type CollectionResponse = {
  meta: IPagination;
  data: ICollection[];
};

export function Collections() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [response, setResponse] = useState<CollectionResponse>(
    {} as CollectionResponse
  );
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

  const onSaveCollection = () => {
    getCollections();
  };

  const getCollections = useCallback(() => {
    const query = Object.fromEntries(searchParams);

    http.get("collections", query).then(({ data }) => setResponse(data));
  }, [searchParams]);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 p-4 md:pl-8 gap-4">
      <div className="col-span-1 lg:col-span-2 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("Collections")}
          </h2>
        </div>
        <CollectionFilter onFilter={applyFilters} {...query} />
      </div>
      <div className="col-span-1 lg:col-span-5">
        <div className="flex flex-col justify-center items-center mx-auto max-w-screen-md lg:max-w-screen-lg">
          <AddCollection onSave={() => onSaveCollection()}>
            <Button className="w-full mb-2">
              <PlusCircle className="w-4 h-4 mr-2" />
              {t("Add Collection")}
            </Button>
          </AddCollection>
          <div className="collections w-full mt-2 grid grid-cols-2 gap-2">
            {response?.data?.length > 0 ? (
              response.data.map((collection: ICollection) => (
                <Collection key={`collection-${collection.id}`} {...collection} onChange={() => onSaveCollection()} />
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
