import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

type SelectItem = {
  key: string;
  value: string;
};

type ComboboxProps = {
  values: SelectItem[];
  selected: string;
  onChange: (value: string) => void
};

export function Combobox({ values, selected, onChange }: ComboboxProps) {
  const { t } = useTranslation();

  const placeholder = values.find((item) => item.key === selected)?.value;

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={placeholder && t(placeholder)}
          defaultValue={selected}
        />
      </SelectTrigger>
      <SelectContent>
        {values.map((item: SelectItem) => (
          <SelectItem key={item.key} value={item.key}>{t(item.value)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
