'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { dummyWishlists, likedPropertiesData } from '../../utils/wishlistDummyData';
import LikedPropertiesBox from './LikedPropertiesBox';
import WishlistBox from './WishlistBox';
import { DeleteIcon,BackIcon, CreateIcon, MoreIcon } from '@/ui/icons';

const sortedWishlists = [...dummyWishlists].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

const WishlistGrid: React.FC = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleCreateWishlist = () => {
    setShowDropdown(false);
    console.log('Create new wishlist');
  };

  const handleDeleteMode = () => {
    setShowDropdown(false);
    console.log('Enter delete mode');
  };

  const handleWishlistClick = (wishlistId: string) => {
    router.push(`/tenant/wishlist/${wishlistId}`);
  };

  const handleLikedPropertiesClick = () => {
    router.push('/tenant/wishlist/liked');
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white py-4">
        <div className="flex items-center justify-between px-4 max-w-[480px] mx-auto">
          <button onClick={handleBack} className="p-2 -ml-2">
            <BackIcon />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-900">Wishlist</h1>
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 -mr-2"
            >
              <MoreIcon className="w-6 h-6 text-gray-700" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-45 bg-white rounded-lg z-10">
                <button
                  onClick={handleCreateWishlist}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100"
                >
                  <CreateIcon className="mr-3" />
                  <span className="text-[#001D3D]">Create Wishlist</span>
                </button>
                <button
                  onClick={handleDeleteMode}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  <DeleteIcon className="mr-3" />
                  <span className='"text-[#001D3D]"'>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 max-w-[480px] mx-auto">
        <div className="grid grid-cols-2 gap-4 justify-items-center">
          <LikedPropertiesBox 
            likedData={likedPropertiesData}
            onClick={handleLikedPropertiesClick}
          />
          
          {sortedWishlists.map((wishlist) => (
            <WishlistBox
              key={wishlist.id}
              wishlist={wishlist}
              onClick={() => handleWishlistClick(wishlist.id)}
            />
          ))}
        </div>
      </div>

      {showDropdown && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default WishlistGrid;