import { ReactNode } from "react";

export default function TrancribeHeader({ children }: {children:ReactNode}) {
  return (
    <div className="relative w-full px-5">
      <svg
        className="w-full h-[155px] block"
        viewBox="0 0 1611 155"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <foreignObject x="-19.502" y="-19.5" width="1650.5" height="194">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              backdropFilter: 'blur(10px)',
              clipPath: 'url(#bgblur_0_2396_84892_clip_path)',
              height: '100%',
              width: '100%',
            }}
          ></div>
        </foreignObject> */}
        <g data-figma-bg-blur-radius="20">
          <path
            d="M5.5 80.5V36.5L1.5 33.5V16L17 1H292L1426.5 2L1431.5 5.5H1533.5L1538 2H1595.5L1610.5 18.5V136.5L1595.5 154H1547.5L1542.5 149L71 148L66 153H18.5L1.5 136.5L1 84.5L5.5 80.5Z"
            fill="#000714"
            fillOpacity="0.5"
          />
          <path
            d="M5.5 36.5V80.5L1 84.5L1.5 136.5L18.5 153H66L71 148L1542.5 149L1547.5 154H1595.5L1610.5 136.5V18.5L1595.5 2H1538L1533.5 5.5H1431.5L1426.5 2L292 1M5.5 36.5L1.5 33.5V16L17 1H292M5.5 36.5H283L292 25V1"
            stroke="#0C3766"
          />
        </g>
        <defs>
          <clipPath
            id="bgblur_0_2396_84892_clip_path"
            transform="translate(19.502 19.5)"
          >
            <path d="M5.5 80.5V36.5L1.5 33.5V16L17 1H292L1426.5 2L1431.5 5.5H1533.5L1538 2H1595.5L1610.5 18.5V136.5L1595.5 154H1547.5L1542.5 149L71 148L66 153H18.5L1.5 136.5L1 84.5L5.5 80.5Z" />
          </clipPath>
        </defs>
      </svg>
      {/* Render children (header data) over the SVG */}
      <div className="absolute top-0 left-0 w-full h-[155px] flex items-center justify-center text-white">
        {children}
      </div>
    </div>
  );
}