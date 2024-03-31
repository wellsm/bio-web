/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { http } from "@/lib/api";
import { useEffect, useState } from "react";
import { useBioStore } from "../stores/bio";
import { useTranslation } from "react-i18next";
import { Combobox } from "./combobox";
import { Input } from "@/components/ui/input";

enum ConfigType {
  Toggle = "toggle",
  Select = "select",
  InputText = "input:text",
}

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
          <div className="grid grid-cols-2" key={config.key}>
            <Label
              htmlFor={config.key}
              className="flex flex-col space-y-1 items-start"
            >
              <span>{t(config.name)}</span>
              <span className="font-normal leading-snug text-muted-foreground">
                {t(config.description)}
              </span>
            </Label>
            <div className="flex justify-end">
              {(config.type as ConfigType) == ConfigType.Toggle && (
                <Switch
                  id={config.key}
                  defaultChecked={config.value === "1"}
                  onCheckedChange={(checked) =>
                    onChangeConfig(config.key, checked)
                  }
                />
              )}

              {(config.type as ConfigType) == ConfigType.Select &&
                config.options &&
                config.options.length > 0 && (
                  <Combobox
                    selected={config.value}
                    values={config.options}
                    onChange={(value) => onChangeConfig(config.key, value)}
                  />
                )}

              {(config.type as ConfigType) == ConfigType.InputText && (
                <Input
                  className="w-full"
                  defaultValue={config.value}
                  onChange={({ target }) =>
                    onChangeConfig(config.key, target.value)
                  }
                />
              )}
            </div>
          </div>
        ))}
    </>
  );
}
