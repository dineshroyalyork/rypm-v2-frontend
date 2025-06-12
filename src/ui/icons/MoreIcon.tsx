import React from "react";

interface MoreIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
  opacity?: number;
  backgroundColor?: string;
  showBackground?: boolean;
}

const MoreIcon = ({
  width = 30,
  height = 30,
  className = "",
  color = "#001D3D",
  opacity = 0.3,
  backgroundColor = "#F6F7F8",
  showBackground = true,
}: MoreIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      className={className}
    >
      {showBackground && (
        <>
          <rect
            data-figma-bg-blur-radius="4"
            width="30"
            height="30"
            rx="15"
            fill={backgroundColor}
            fillOpacity={opacity}
          />
        </>
      )}
        <path d="M15 11C16.1 11 17 10.1 17 9C17 7.9 16.1 7 15 7C13.9 7 13 7.9 13 9C13 10.1 13.9 11 15 11ZM15 13C13.9 13 13 13.9 13 15C13 16.1 13.9 17 15 17C16.1 17 17 16.1 17 15C17 13.9 16.1 13 15 13ZM15 19C13.9 19 13 19.9 13 21C13 22.1 13.9 23 15 23C16.1 23 17 22.1 17 21C17 19.9 16.1 19 15 19Z" fill={color}/>

      {showBackground && (
        <defs>
    <clipPath id="bgblur_0_5113_7232_clip_path" transform="translate(4 4)"><circle cx="15" cy="15" r="14.25"/>
  </clipPath></defs>
      )}
    </svg>
  );
};

export default MoreIcon;