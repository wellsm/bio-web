import { toast } from 'sonner';
import { create } from "zustand";

type ToastStoreProps = {
    isToastOpen: boolean
    toastMessage: string
    toastDescription: string
    toastAction: ToastActionProps|null
    closeToast(): void
    openToast(title?: string, description?: string, action?: ToastActionProps): void
}

type ToastActionProps = {
  label: string;
  onClick(): void;
};

export const useToastStore = create<ToastStoreProps>((set) => ({
  isToastOpen: false,
  toastMessage: '',
  toastDescription: '',
  toastAction: null,
  closeToast: () => set(() => ({ isToastOpen: false })),
  openToast: (title?: string, description?: string, action?: ToastActionProps) => {
    toast(title, { description, action });
  },
}));
