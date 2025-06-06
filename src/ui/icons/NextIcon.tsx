import React from "react";

interface NextIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
  opacity?: number;
  backgroundColor?: string;
  showBackground?: boolean;
}

const NextIcon = ({
  width = 30,
  height = 30,
  className = "",
  color = "#001D3D",
  opacity = 0.3,
  backgroundColor = "#F6F7F8",
  showBackground = true,
}: NextIconProps) => {
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
          {/* <foreignObject x="-4" y="-4" width="38" height="38">
            <div
              style={{
                backdropFilter: "blur(2px)",
                clipPath: "url(#bgblur_prev_clip_path)",
                height: "100%",
                width: "100%",
              }}
            />
          </foreignObject> */}
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
      <path
        d="M12.8331 8.96913C13.2773 8.52494 13.9949 8.52494 14.4391 8.96913L19.6669 14.1969C20.1111 14.6411 20.1111 15.3587 19.6669 15.8028L14.4391 21.0306C13.9949 21.4748 13.2773 21.4748 12.8331 21.0306C12.389 20.5864 12.389 19.8689 12.8331 19.4247L17.2523 14.9942L12.8331 10.5751C12.389 10.1309 12.4003 9.40193 12.8331 8.96913Z"
        fill={color}
      />
      {showBackground && (
        <defs>
          <clipPath
            id="bgblur_prev_clip_path"
            transform="translate(4 4)"
          >
            <rect width="30" height="30" rx="15" />
          </clipPath>
        </defs>
      )}
    </svg>
  );
};

export default NextIcon;