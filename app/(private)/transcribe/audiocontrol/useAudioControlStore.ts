import { create } from 'zustand';

export type ProcessingState = 'transcription' | 'realTimeSummary' | 'coreInsights';
export type ProcessingStatus = 'processing' | 'finalizing';
export type AudioVariant = 'processing' | 'player';

interface AudioControlState {
  // General state
  variant: AudioVariant;
  setVariant: (variant: AudioVariant) => void;
  
  // Processing UI state
  processingState: ProcessingState;
  setProcessingState: (state: ProcessingState) => void;
  processingStatus: ProcessingStatus;
  setProcessingStatus: (status: ProcessingStatus) => void;
  slideCancel: number;
  setSlideCancel: (val: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  startedAt: string;
  monitoringTime: string;
  
  // Player state
  audioUrl: string;
  setAudioUrl: (url: string) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  playbackRate: number;
  setPlaybackRate: (speed: number) => void;
  autoScroll: boolean;
  setAutoScroll: (autoScroll: boolean) => void;
}

export const useAudioControlStore = create<AudioControlState>((set) => ({
  // General state
  variant: 'processing',
  setVariant: (variant) => set({ variant }),
  
  // Processing UI state
  processingState: 'transcription',
  setProcessingState: (state) => set({ processingState: state }),
  processingStatus: 'processing',
  setProcessingStatus: (status) => set({ processingStatus: status }),
  slideCancel: 0,
  setSlideCancel: (val) => set({ slideCancel: val }),
  isDragging: false,
  setIsDragging: (dragging) => set({ isDragging: dragging }),
  startedAt: "04/17/2025, 6:38 PM",
  monitoringTime: "2h, 40m late 4:19 PM",
  
  // Player state
  audioUrl: "/demo-audio.mp3", // Default URL
  setAudioUrl: (url) => set({ audioUrl: url }),
  currentTime: 0,
  setCurrentTime: (time) => set({ currentTime: time }),
  duration: 0,
  setDuration: (duration) => set({ duration: duration }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying: isPlaying }),
  volume: 1,
  setVolume: (volume) => set({ volume: volume }),
  playbackRate: 1.25,
  setPlaybackRate: (speed) => set({ playbackRate: speed }),
  autoScroll: true,
  setAutoScroll: (autoScroll) => set({ autoScroll: autoScroll }),
}));