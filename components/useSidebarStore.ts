import { create } from 'zustand';

interface SidebarState {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: true,
  setIsCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
})); 