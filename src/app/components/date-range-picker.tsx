import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getDateLocale, format } from "@/lib/date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";

type DateRangePickerProps = {
  onSelect: (range: DateRange) => void;
};

export function DateRangePicker({ onSelect }: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const { t } = useTranslation();

  const changeDate = (range: DateRange | undefined): void => {
    setDate(range);

    if (
      range === undefined ||
      range.from === undefined ||
      range.to === undefined
    ) {
      return;
    }

    onSelect(range);
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL y")} -{" "}
                  {format(date.to, "dd LLL y")}
                </>
              ) : (
                format(date.from, "dd LLL y")
              )
            ) : (
              <span>{t("Pick a date")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            locale={getDateLocale()}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => changeDate(range)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
