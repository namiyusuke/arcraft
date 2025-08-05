import { create } from "zustand";

interface Model3DStore {
  isScreenClicked: boolean;
  isDumbbleClicked: boolean;
  setIsScreenClicked: (value: boolean) => void;
  setIsDumbbleClicked: (value: boolean) => void;
}
export const useModel3DStore = create<Model3DStore>((set) => ({
  isScreenClicked: false,
  isDumbbleClicked: false,
  setIsScreenClicked: (value) => set({ isScreenClicked: value }),
  setIsDumbbleClicked: (value) => set({ isDumbbleClicked: value }),
}));
