"use client"
import LeftChatData from "./leftchatdata/LeftChatData";
import RightSidebar from "./rightsidebar/RightSidebar";
import AudioControl from "./audiocontrol/AudioControl";
import { useSidebarStore } from "../../../components/useSidebarStore";
import { useEffect, useState } from "react";

function useWindowSize() {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1920);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

export default function TranscribePage() {
  const { isCollapsed } = useSidebarStore();
  const width = useWindowSize();
  const showRightSidebar = width >= 1600 || isCollapsed;
  return (
    <div className="grid w-full max-h-[65.8125rem] overflow-y-auto lg:grid-cols-[62%_37%] gap-[1%] justify-between grid-cols-1">
      <div className="flex flex-col gap-3 h-full w-full">
        <LeftChatData />
        <AudioControl />
      </div>

      {showRightSidebar && (
        <div className="w-full">
          <RightSidebar />
        </div>
      )}
    </div>
  );
} 