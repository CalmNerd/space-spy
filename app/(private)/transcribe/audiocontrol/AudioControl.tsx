'use client';

import { useAudioControlStore } from './useAudioControlStore';
import AudioProcessingUI from './AudioProcessing';
import AudioPlayer from './AudioPlayer';
import { useEffect } from 'react';

export default function AudioControl() {
  const { variant, processingState, processingStatus } = useAudioControlStore();

  // For demo purposes, we can add this debug information
  useEffect(() => {
    console.log(`Audio Control - Current variant: ${variant}`);
    console.log(`Processing State: ${processingState}, Status: ${processingStatus}`);
  }, [variant, processingState, processingStatus]);

  return (
    <>
      {variant === 'processing' ? <AudioProcessingUI /> : <AudioPlayer />}
    </>
  );
}