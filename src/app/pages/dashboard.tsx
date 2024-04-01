/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Overview } from "@/app/components/overview";
import { useEffect, useState } from "react";
import { http } from "@/lib/api";
import { fallback, src } from "@/lib/utils";
import { Metric } from "../components/metric";
import { useTranslation } from "react-i18next";
import { DateRangePicker } from "../components/date-range-picker";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { format } from "@/lib/date-fns";

export function Dashboard() {
  const [data, setData] = useState<any>({});
  const [range, setRange] = useState<DateRange | undefined>();
  const { t } = useTranslation();

  const getOverview = () => {
    const query: any = range
      ? {
          range: `${format(range.from as Date, "yyyy-MM-dd")} - ${format(
            range.to as Date,
            "yyyy-MM-dd"
          )}`.trim(),
        }
      : "";

    http.get("overview", query).then(({ data }) => setData(data));
  };

  useEffect(() => {
    getOverview();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 pt-4 sm:px-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("Dashboard")}</h2>
        <div className="flex items-center justify-between space-x-2">
          <DateRangePicker onSelect={(range) => setRange(range)} />
          <Button onClick={() => getOverview()} disabled={range === undefined}>
            {t("Filter")}
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Metric title="Views" data={data?.views ?? 0} />
        <Metric title="Clicks" data={data?.clicks ?? 0} />
        <Metric title="CTR" data={`${data?.ctr ?? 0}%`} format={false} />
        <Metric title="Social Medias" data={data?.medias ?? 0} />
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              {t("Overview")} ({t("Clicks")})
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={data.overview} />
          </CardContent>
        </Card>
        <Card className="col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Out (Links)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.traffic &&
                data.traffic.clicks.map((link: any) => (
                  <div className="flex items-center w-full" key={link.id}>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={src(link.thumbnail)} alt="Avatar" />
                      <AvatarFallback>{fallback(link.column)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 w-full">
                      <p className="text-sm text-muted-foreground leading-none">
                        {link.column}
                      </p>
                      <p className="text-sm font-medium">{link.total}</p>
                      <Progress value={3} />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Out ({t("Social Media")})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.traffic &&
                data.traffic.medias.map((media: any) => (
                  <div className="flex items-center w-full" key={media.id}>
                    <FontAwesomeIcon
                      icon={[media.icon.family, media.icon.icon]}
                    />
                    <div className="ml-4 space-y-1 w-full">
                      <p className="text-sm text-muted-foreground leading-none capitalize">
                        {media.column}
                      </p>
                      <p className="text-sm font-medium">{media.total}</p>
                      <Progress value={3} />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
