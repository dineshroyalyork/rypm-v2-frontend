import React from "react";

interface DropDownIconProps {
  width?: number;
  height?: number; 
  className?: string;
  color?: string;
  viewBox?: string;
}

const DropDownIcon = ({
  width = 18,
  height = 18,
  className = "",
  color = "#001D3D",
  viewBox="0 0 18 18",
}: DropDownIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox={viewBox}
      fill="none"
    >
      <path d="M9 11.25L5.25 7.5H12.75L9 11.25Z" fill={color}/>

    </svg>
  );
};

export default DropDownIcon;
