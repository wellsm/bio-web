import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

type MetricProps = {
  title: string;
  data: number | string;
  format?: boolean;
};

export function Metric({ title, data, format = true }: MetricProps) {
  const formatData = (total: number): string => {
    if (total > 1000) {
      return (total / 1000).toFixed(1) + "K";
    }

    return total.toString();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Eye className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {format ? formatData(Number(data)) : data}
        </div>
      </CardContent>
    </Card>
  );
}
