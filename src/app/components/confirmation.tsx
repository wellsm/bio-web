/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { http } from "@/lib/api";
import { useState } from "react";
import { useToastStore } from "../stores/toast";
import { useTranslation } from "react-i18next";

type ConfirmationProps = {
  title?: string;
  description?: string;
  url?: string;
  onClose(): void;
  onConfirm(): void;
};

const DEFAULT_TITLE = "Are you absolutely sure?";
const DEFAULT_DESCRIPTION =
  "This action cannot be undone. This will permanently delete your resource";

export function Confirmation({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url,
  onClose,
  onConfirm,
}: ConfirmationProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { openToast } = useToastStore();
  const { t } = useTranslation();

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onClose();
  };

  const handleDelete = async () => {
    if (url === undefined) {
      return;
    }

    try {
      await http.delete(url);

      onConfirm();
    } catch (error: any) {
      const { data } = error.response;

      openToast("Delete Failed", data.message);
    }
  };

  const handleConfirm = async () => {
    await handleDelete();

    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t(title)}</AlertDialogTitle>
          <AlertDialogDescription>{t(description)}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleCancel()}>
            {t('Cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleConfirm()}>
            {t('Continue')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
