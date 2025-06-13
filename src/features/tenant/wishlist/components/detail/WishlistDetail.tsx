'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { BackIcon, MoreIcon } from '@/ui/icons';
import EmptyWishlist from './EmptyWishlist';
import { Wishlist } from '../../types/wishlist.types';

interface WishlistDetailProps {
  wishlist: Wishlist;
}

const WishlistDetail: React.FC<WishlistDetailProps> = ({ wishlist }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleMore = () => {
    // TODO: Implement more actions (rename, delete, etc.)
    console.log('More actions for wishlist:', wishlist.id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white">
        <div className="flex items-center justify-between px-4 py-3 max-w-[480px] mx-auto">
          <button onClick={handleBack} className="p-2 -ml-2">
            <BackIcon />
          </button>
          
          <h1 className="text-lg font-semibold text-[#001D3D] truncate max-w-[200px]">
            {wishlist.name}
          </h1>
          
          <button onClick={handleMore} className="p-2 -mr-2">
            <MoreIcon className="w-6 h-6 text-[#001D3D]" />
          </button>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto">
        {wishlist.properties.length === 0 ? (
          <EmptyWishlist name={wishlist.name} />
        ) : (
          <div className="p-4">
            {/* TODO: Show properties list */}
            <p>Properties will be shown here ({wishlist.properties.length} properties)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDetail;
