
import { create } from 'zustand';

interface LeftChatDataState {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const useLeftChatDataStore = create<LeftChatDataState>((set) => ({
  activeTab: 0,

  setActiveTab: (tab) => set({ activeTab: tab })
})); 