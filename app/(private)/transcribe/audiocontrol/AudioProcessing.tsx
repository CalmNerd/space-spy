import { useSidebarStore } from '@/components/useSidebarStore';
import { useAudioControlStore } from './useAudioControlStore';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const AudioProcessing: React.FC = () => {
    const {
        processingState,
        setProcessingState,
        processingStatus,
        setProcessingStatus,
        isDragging,
        setIsDragging,
        slideCancel,
        setSlideCancel,
        startedAt,
        monitoringTime,
        setVariant
    } = useAudioControlStore();
    
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { isCollapsed } = useSidebarStore();
    const [spinnerRotation, setSpinnerRotation] = React.useState(0);

    // Auto progression through states
    useEffect(() => {
        const stateSequence: Array<'transcription' | 'realTimeSummary' | 'coreInsights'> = [
            'transcription', 
            'realTimeSummary', 
            'coreInsights'
        ];
        const currentIndex = stateSequence.indexOf(processingState);

        if (currentIndex < stateSequence.length - 1) {
            const timer = setTimeout(() => {
                setProcessingState(stateSequence[currentIndex + 1]);
                // Set status to finalizing only for the last state
                if (currentIndex + 1 === stateSequence.length - 1) {
                    setProcessingStatus('finalizing');
                    
                    // Auto-transition to player after finalizing (after 3 seconds)
                    setTimeout(() => {
                        setVariant('player');
                    }, 3000);
                }
            }, 5000); // Change state every 5 seconds

            return () => clearTimeout(timer);
        }
    }, [processingState, setProcessingState, setProcessingStatus, setVariant]);

    // Reset slider position when letting go
    useEffect(() => {
        if (!isDragging && slideCancel > 0) {
            const resetTimer = setTimeout(() => {
                setSlideCancel(0);
            }, 300);

            return () => clearTimeout(resetTimer);
        }
    }, [isDragging, slideCancel, setSlideCancel]);

    // Handle mouse events for slider
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        if (processingState === 'coreInsights') return;
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current || processingState === 'coreInsights') return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width - 38; // Slider width

        const newPosition = Math.min(
            Math.max(0, e.clientX - containerRect.left - 19), // 19 is half slider width
            containerWidth
        );

        setSlideCancel(newPosition);

        // Cancel if dragged more than 80% of the way
        if (newPosition > containerWidth * 0.8) {
            setIsDragging(false);
            setSlideCancel(0);
            // Cancel processing logic here
            alert('Processing canceled!');
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        // Add global mouse event listeners
        const handleGlobalMouseMove = (e: MouseEvent) => {
            handleMouseMove(e as unknown as React.MouseEvent);
        };
        
        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSpinnerRotation(prev => (prev + 5) % 360);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Get the correct status label based on current state
    const getStatusLabel = () => {
        switch (processingState) {
            case 'transcription':
                return 'Transcription Status';
            case 'realTimeSummary':
                return 'Real Time Summary Status';
            case 'coreInsights':
                return 'Core Insights Status';
            default:
                return 'Processing Status';
        }
    };

    return (
        <div className='relative h-fit w-full'>
            <div className="absolute right-[-2.2%] top-0 h-[25.51%] w-[2.2%] bg-[#0BA0F9] origin-top-left rotate-90" />
            <div
                className={`relative w-full h-[6.125rem] font-geomGraphy bg-[url('/transcribe/transcription-status_bg.svg')] bg-no-repeat bg-cover backdrop-blur-[10px]
                // ${isCollapsed ? 'h-[7.175rem]' : 'h-[6.675rem]'}
                flex items-center justify-between px-5
            `}>

                {/* Left side - Status */}
                <div className="flex items-center space-x-1">
                    <div className="w-[2.375rem] h-[2.375rem] bg-[rgba(255,255,255,0.002)] border border-[#333333] rounded-full shadow-lg relative">
                        <div
                            className="absolute left-[14%] right-[14%] top-[14%] bottom-[14%] bg-[rgba(255,255,255,0.002)] border border-dashed border-[#444444] rounded-full"
                            style={{ boxShadow: "inset -1.27px -1.27px 6.33px 0.25px rgba(0,0,0,0.25), inset 1.27px 1.27px 8.87px 0.25px rgba(0,0,0,0.25)" }}
                        >
                            {/* Spinner line - rotates */}
                            <div
                                className="absolute left-[50%] top-[50%] w-[50%] border-t border-dashed border-white"
                                style={{ transform: `rotate(${spinnerRotation}deg)`, transformOrigin: 'left' }}
                            >
                                <div className="absolute left-[80%] top-0 w-[5px] h-[5px] bg-[#012A8A] blur-[3.8px]"></div>
                            </div>
                        </div>

                        {/* Inner circle */}
                        <div
                            className="absolute w-[13.17px] h-[13.17px] left-[12.42px] top-[12.42px] bg-[rgba(255,255,255,0.002)] border border-dashed border-[#444444] rounded-full"
                            style={{ boxShadow: "inset -1.27px -1.27px 6.33px 0.25px rgba(0,0,0,0.25), inset 1.27px 1.27px 8.87px 0.25px rgba(0,0,0,0.25)" }}
                        ></div>
                    </div>

                    <div>
                        <div className="text-[0.59rem] text-[#D1D5DC]">{getStatusLabel()}</div>
                        <div className="text-sm text-white">
                            {processingStatus === 'processing' ? 'Processing' : 'Finalizing'}
                        </div>
                    </div>
                </div>

                {/* Center - Message and slider */}
                <div className="flex flex-col items-center text-center gap-1 min-w-[22.5rem]">
                    <p className="text-[0.8125rem] font-medium">
                        The startup may take a few minutes, depending on the <br /> dynamics of this XSpace.
                    </p>

                    {processingState !== 'coreInsights' && (
                        <div
                            ref={containerRef}
                            className="relative min-w-48 h-4.5 bg-[rgba(29,155,240,0.1)] border border-white"
                        >
                            <div
                                ref={sliderRef}
                                className="absolute top-0 left-0 h-3.5 w-10 rounded-full cursor-pointer transform translate-y-[1px] translate-x-[1px]"
                                style={{
                                    left: `${slideCancel}px`,
                                    transition: isDragging ? 'none' : 'left 0.3s ease-out',
                                    background: 'linear-gradient(269.72deg, #FFFFFF 46.25%, #012A8A 98.46%)',
                                }}
                                onMouseDown={handleMouseDown}
                            />
                            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-[0.525rem] whitespace-nowrap">
                                Slide To Cancel
                            </div>
                        </div>
                    )}
                </div>

                {/* Right side - Time info */}
                <div className="flex flex-col items-end gap-5 pr-8">
                    <div className="flex flex-col">
                        <span className="text-white text-[10px] font-normal">Started At</span>
                        <span className="text-[#D1D5DC] text-[7px] font-mono">{startedAt}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white text-[10px] font-normal">Monitoring Initiated</span>
                        <span className="text-[#D1D5DC] text-[7px] font-mono">{monitoringTime}</span>
                    </div>
                </div>

                {/* Info icon */}
                <div className="absolute right-1.5 top-1 flex items-center justify-center">
                    <Image src="/icons/info.svg" height={15} width={16} alt='info icon' />
                </div>
            </div>
        </div>
    );
};

export default AudioProcessing;