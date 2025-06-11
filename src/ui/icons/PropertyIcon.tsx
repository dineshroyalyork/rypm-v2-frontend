import React from "react";

interface PropertyIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const PropertyIcon = ({
  width = 95,
  height = 95,
  className = "",
}:PropertyIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 95 95"
      fill="none"
      className={className}
    >
      <circle
        cx="47.5"
        cy="47.5"
        r="46.75"
        fill="#001D3D"
        fillOpacity="0.2"
        stroke="#F6FDFF"
        strokeWidth="1.5"
      />
      <circle
        cx="48"
        cy="48"
        r="21.25"
        fill="#001D3D"
        stroke="#F6FDFF"
        strokeWidth="1.5"
      />
      <path
        d="M47.6963 37.9072C47.8659 37.7555 48.1282 37.7555 48.2979 37.9072V37.9062L57.9961 46.6416H55.6172V55.7607C55.6172 56.0041 55.4143 56.2061 55.1709 56.2061H51.584C51.3407 56.2059 51.1387 56.004 51.1387 55.7607V49.0322H44.8564V55.7607C44.8564 56.0041 44.6535 56.2061 44.4102 56.2061H40.8232C40.58 56.2059 40.3779 56.004 40.3779 55.7607V46.6416H37.998L47.6963 37.9072Z"
        fill="white"
        stroke="#F6FDFF"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default PropertyIcon;
