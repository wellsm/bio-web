import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import * as React from "react";
import { useTranslation } from "react-i18next";

type ImageFileInputProps = React.ComponentPropsWithoutRef<React.ElementType> & {
  label: string;
  preview?: boolean;
  avatar?: boolean;
  onSelect(file: File): void;
};

export function ImageFileInput({
  label,
  preview = false,
  avatar = false,
  onSelect,
  ...props
}: ImageFileInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const { t } = useTranslation();

  const url = file && URL.createObjectURL(file);

  return (
    <div {...props}>
      <Label htmlFor="thumbnail">{t(label)}</Label>
      <div className="flex items-center justify-center w-full mt-3">
        <label
          htmlFor="thumbnail"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-700 dark:bg-gray-600 hover:bg-gray-100 dark:border-gray-500 dark:hover:border-gray-400 dark:hover:bg-gray-500 relative"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="h-7 w-7 mb-2" />
            <p className="mb-2 text-sm text-gray-400 dark:text-gray-300">
              <span className="font-semibold">{t("Click to upload")}</span>{" "}
              {t("or drag and drop")}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, JPEG, WEBP
            </p>
          </div>
          <input
            id="thumbnail"
            type="file"
            className="cursor-pointer block opacity-0 w-full h-full p-10 z-50 absolute"
            accept="image/*"
            onChange={({ target }) => {
              const files = target.files;

              if (!files) {
                return;
              }

              setFile(files[0]);
              onSelect(files[0]);
            }}
          />
        </label>
      </div>
      <div className="flex items-center justify-center mt-3">
        {url && preview && (
          <img
            src={url}
            className={cn("max-w-64 max-h-64", avatar && "rounded-full")}
          />
        )}
      </div>
    </div>
  );
}
