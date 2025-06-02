import React from "react";

interface LocalInfoButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const LocalInfoButton: React.FC<LocalInfoButtonProps> = ({
  isActive,
  onClick
}) => {
  return (
    <button
      className={`flex px-[10px] py-[5px] items-center gap-1 rounded-[16px] ${
        isActive 
          ? "bg-[#001D3D]" 
          : "bg-[rgba(32,54,77,0.30)]"
      }`}
      onClick={onClick}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="22" 
        viewBox="0 0 20 22" 
        fill="none"
      >
        <path 
          d="M10 6V12" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
        <path 
          d="M10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16Z" 
          fill="white"
        />
        <path 
          d="M5.843 2.802C7.872 1.601 8.886 1 10 1C11.114 1 12.128 1.6 14.157 2.802L14.843 3.208C16.872 4.41 17.886 5.011 18.443 6C19 6.99 19 8.19 19 10.594V11.406C19 13.809 19 15.011 18.443 16C17.886 16.989 16.872 17.59 14.843 18.791L14.157 19.198C12.128 20.399 11.114 21 10 21C8.886 21 7.872 20.4 5.843 19.198L5.157 18.791C3.128 17.591 2.114 16.989 1.557 16C1 15.01 1 13.81 1 11.406V10.594C1 8.19 1 6.989 1.557 6C2.114 5.011 3.128 4.41 5.157 3.208L5.843 2.802Z" 
          stroke="white" 
          strokeWidth="1.5"
        />
      </svg>
      <span className="text-white text-[10px] font-bold">Local Info</span>
    </button>
  );
};

export default LocalInfoButton;
