/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Overview } from "@/app/components/overview";
import { useEffect, useState } from "react";
import { http } from "@/lib/api";
import { src } from "@/lib/utils";
import { Metric } from "../components/metric";

export function Dashboard() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    http.get("overview").then(({ data }) => setData(data));
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 pt-4 sm:px-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.views && <Metric title="Views" data={data.views} />}
        {data.clicks && <Metric title="Clicks" data={data.clicks} />}
        {data.ctr && (
          <Metric title="CTR" data={`${data.ctr}%`} format={false} />
        )}
        {data.medias && <Metric title="Social Medias" data={data.medias} />}

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <Mouse className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.clicks && format(data.clicks)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTR</CardTitle>
            <AreaChart className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.ctr && `${data.ctr}%`}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Social Medias</CardTitle>
            <UserRoundSearch className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.medias && format(data.medias)}</div>
          </CardContent>
        </Card> */}
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Overview (Clicks)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={data.overview} />
          </CardContent>
        </Card>
        <Card className="col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Out (Products)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.traffic &&
                data.traffic.clicks.map((link: any) => (
                  <div className="flex items-center w-full" key={link.id}>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={src(link.thumbnail)} alt="Avatar" />
                      <AvatarFallback>
                        {link.column
                          .split(" ")
                          .map((l: string) => l.substring(0, 1))
                          .join("")}
                      </AvatarFallback>
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
            <CardTitle>Traffic Out (Social Media)</CardTitle>
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
