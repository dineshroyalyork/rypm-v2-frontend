import { HeartFillIcon } from "@/ui/icons";
import React from "react";

interface EmptyWishlistProps {
  name: string;
}

const EmptyWishlist: React.FC<EmptyWishlistProps> = ({ name }) => (
  <div className="flex flex-col items-center justify-center h-full pt-55">
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#001D3D] mb-6">
      <HeartFillIcon className="w-full h-full"/>
    </div>
    <h2 className="text-xl font-bold text-[#001D3D] mb-2">Start Liking</h2>
    <p className="text-center text-[#001D3D] text-base mb-1">
      Save properties to your<br />
      {name} wishlist
    </p>
    <span className="text-[#001D3D] font-bold cursor-pointer">
      Add to wishlist
    </span>
  </div>
);

export default EmptyWishlist;
