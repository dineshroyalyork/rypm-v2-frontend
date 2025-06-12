"use client";
import React from "react";
import { LikedPropertiesData } from "../../types/wishlist.types";
import Image from 'next/image';


interface Props {
  likedData: LikedPropertiesData;
  onClick: () => void;
}

const LikedPropertiesBox: React.FC<Props> = ({ likedData, onClick }) => {
const gridImages = likedData.properties.slice(0, 4);

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200 overflow-hidden aspect-square w-full max-w-[173px] mx-auto"
    >
      <div className="relative w-full h-full">
        {gridImages.length >= 4 ? (
          <>
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
              {gridImages.map((property, index) => (
                <div
                  key={property.id}
                  className="relative overflow-hidden w-full h-full"
                >
                  <Image
                    src={property.imageUrl}
                    alt={`Liked Property ${index + 1}`}
                    fill
                    sizes="85px"
                    className="object-cover"
                    priority={index < 2}
                  />
                </div>
              ))}
            </div>

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-0.5"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-0.5"></div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Liked Properties</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-[#001D3D4D] backdrop-blur-[3.55px] px-2 py-2">
          <div className="flex justify-between items-baseline text-white text-xs">
            <span className="text-sm font-bold leading-[1]">Liked</span>

            <span className="flex-shrink-0 text-[10px] font-normal leading-[1]">
              {likedData.count} properties
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedPropertiesBox;
