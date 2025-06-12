"use client";
import React from "react";
import { Wishlist } from "../../types/wishlist.types";
import Image from "next/image";

interface Props {
  wishlist: Wishlist;
  onClick: () => void;
}

const WishlistBox: React.FC<Props> = ({ wishlist, onClick }) => {
  const firstPropertyImage = wishlist.properties[0]?.imageUrl;
  const propertyCount = wishlist.properties.length;

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-lg overflow-hidden aspect-square w-full max-w-[173px] mx-auto"
    >
      <div className="relative w-full h-full">
        {firstPropertyImage ? (
          <Image
            src={firstPropertyImage}
            alt={wishlist.name}
            fill
            sizes="173px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Properties</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-[#001D3D4D] backdrop-blur-[3.55px] px-2 py-2">
          <div className="flex justify-between items-baseline text-white text-xs">
            <span className="text-sm font-bold truncate mr-2 leading-[1]">
              {wishlist.name}
            </span>
            <span className="flex-shrink-0 text-[10px] font-normal leading-[1]">
              {propertyCount} {propertyCount === 1 ? "property" : "properties"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistBox;
