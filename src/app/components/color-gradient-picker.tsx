import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ColorPicker from "react-best-gradient-color-picker";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type ColorPickerProps = {
  children: ReactNode;
  color: string;
  onColorSelect(color: string): void;
};

export function ColorGradientPicker({
  children,
  color: defaultColor,
  onColorSelect,
}: ColorPickerProps) {
  const [color, setColor] = useState(defaultColor);
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[350px] flex items-center justify-center bg-zinc-700">
        <div className="flex flex-col items-center justify-center max-w-screen-md">
          <ColorPicker
            value={color}
            onChange={setColor}
            hideOpacity={true}
            hideColorGuide={true}
            hideAdvancedSliders={true}
            hideInputType={true}
            hideInputs={true}
            height={200}
            presets={[
              "#000", //Black
              "#431407", //Orange950
              "#6441a5", //Twitch
              "#c026d3", //Fuchsia600
              "#1d4ed8", //Blue700
              "#4267B2", //Facebook
              "#7289da", //Discord
              "#1DA1F2", //Twitter
              "linear-gradient(0deg, rgba(0, 120, 255, 1) 15%, rgba(0, 198, 255, 1) 90%)", //Messenger
              "#128C7E", //WhatsApp Teal
              "#1DB954", //Spotify
              "#25D366", //WhatsApp
              "#FF4906", //Kwai
              "#eab308", //Yellow500
              "#FFFC00", //Snapchat
              "linear-gradient(45deg, #f09433 0%, #e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)", //Instagram
              "#E60023", //Pinterest
              "#FF0000", //Youtube
            ]}
          />
          <div className="w-full grid grid-cols-2 gap-2 mt-3">
            <DialogClose asChild>
              <Button variant="outline">{t("Cancel")}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={() => onColorSelect(color)}>{t("Continue")}</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
