import React from "react";

interface BedIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const BedIcon = ({
  width = 20,
  height = 20,
  className = "",
  color = "#EDF2FA",
}: BedIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <circle
        cx="10"
        cy="10"
        r="9.49324"
        stroke="white"
        strokeWidth="1.01351"
      />

      <g transform="translate(1.50, 1)">
        {" "}
        <path
          d="M12.5959 12.7607V12.8593H12.5217V12.7607H12.5959ZM4.09399 9.16693H11.9055C12.2667 9.16693 12.5958 9.48594 12.5959 9.92084V11.5488H3.40454V9.92084C3.40465 9.48611 3.73298 9.16718 4.09399 9.16693Z"
          fill={color}
          stroke="white"
          strokeWidth="0.675676"
        />
        <path
          d="M4.73511 6.03241H11.2644C11.5107 6.03241 11.7189 6.09659 11.8542 6.18182C11.9935 6.26963 12.0152 6.34788 12.0154 6.37909V7.82343H10.8933C10.8853 7.79301 10.8779 7.76229 10.866 7.7326L10.6492 7.18475C10.5475 6.92966 10.332 6.74689 10.0984 6.63202C9.8607 6.51521 9.5749 6.45233 9.2791 6.45233H6.72046C6.42453 6.45238 6.1387 6.51521 5.90112 6.63202C5.69668 6.73258 5.50666 6.88542 5.39429 7.09296L5.35132 7.18475H5.35034L5.13354 7.7326C5.12174 7.76218 5.1152 7.79312 5.10718 7.82343H3.98511V6.38007C3.98511 6.34886 4.00641 6.26996 4.14624 6.18182C4.28153 6.09662 4.48899 6.03247 4.73511 6.03241Z"
          fill={color}
          stroke="white"
          strokeWidth="0.675676"
        />
      </g>
    </svg>
  );
};

export default BedIcon;
