
import { create } from 'zustand';

interface RightSidebarState {
  activeMainTab: number;
  setActiveMainTab: (tab: number) => void;
  activeSummaryTab: number;
  setActiveSummaryTab: (tab: number) => void;
}

export const useRightSidebarStore = create<RightSidebarState>((set) => ({
  activeMainTab: 0,
  setActiveMainTab: (tab) => set({ activeMainTab: tab }),
  activeSummaryTab: 0,
  setActiveSummaryTab: (tab) => set({ activeSummaryTab: tab }),
})); 