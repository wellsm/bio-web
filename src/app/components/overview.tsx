/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MONTHS: any = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

type OverviewProps = {
  data?: any
}

export function Overview({ data }: OverviewProps) {
  const overview = data?.map((d: any) => ({ ...d, name: MONTHS[d.month] }));

  return (
    data && (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={overview}
        >
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip wrapperClassName="text-gray-700 text-xs" />
          <Bar
           minPointSize={10} 
            dataKey="total"
            fill="currentColor"
            radius={[2, 2, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    )
  );
}
