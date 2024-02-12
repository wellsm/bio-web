import { create } from "zustand";

type BioStoreProps = {
  bioChanges: number;
  onBioChange(): void;
};

export const useBioStore = create<BioStoreProps>((set) => ({
  bioChanges: 0,
  onBioChange: () => set(({ bioChanges }) => ({ bioChanges: bioChanges + 1 })),
}));
