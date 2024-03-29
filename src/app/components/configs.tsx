/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { http } from "@/lib/api";
import { useEffect, useState } from "react";
import { useBioStore } from "../stores/bio";
import { useTranslation } from "react-i18next";

export function Configs() {
  const [configs, setConfigs] = useState<any>();
  const { onBioChange } = useBioStore();
  const { t } = useTranslation();

  useEffect(() => {
    http.get("configs").then(({ data }) => setConfigs(data));
  }, []);

  const onChangeConfig = async (key: string, value: any) => {
    await http.put("configs", { key, value });

    onBioChange();
  };

  return (
    <>
      {configs &&
        configs.map((config: any) => (
          <div
            className="flex items-center justify-between space-x-2"
            key={config.key}
          >
            <Label htmlFor={config.key} className="flex flex-col space-y-1">
              <span>{t(config.name)}</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {t(config.description)}
              </span>
            </Label>
            <Switch
              id={config.key}
              defaultChecked={config.value === "1"}
              onCheckedChange={(checked) =>
                onChangeConfig(config.key, checked)
              }
            />
          </div>
        ))}
    </>
  );
}
