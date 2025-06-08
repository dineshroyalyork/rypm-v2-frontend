import React from 'react';
import Image from 'next/image';
import { MainInfoContainer } from '../styles/components/propertyCardStyles';

interface ImageSliderProps {
  image: string;
  text?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const FooterImageSlider: React.FC<ImageSliderProps> = ({ 
  image, 
  text, 
  isActive = false,
  onClick 
}) => {
  return (
    <div 
      className={`w-[25.45vw] h-[11.74vh] relative flex-shrink-0 scrollbar-hide cursor-pointer transition-all duration-300 ${
        isActive ? 'scale-105 shadow-lg' : 'scale-100'
      }`}
      onClick={onClick}
    >
      <Image 
        src={image} 
        alt={text || 'Property image'} 
        width={100} 
        height={100} 
        className="w-full h-full object-cover rounded-[8px]" 
      />
      <MainInfoContainer 
        className={`w-[25.45vw] h-[1.72vh] absolute bottom-0 rounded-b-[8px] flex items-center justify-center text-[#FFF] font-bold text-[10px] capitalize transition-all duration-300 ${
          isActive ? 'bg-[rgba(0,29,61,0.9)]' : 'bg-[rgba(0,29,61,0.7)]'
        }`}
      >
        {text}
      </MainInfoContainer>
    </div>
  );
};

export default FooterImageSlider;
