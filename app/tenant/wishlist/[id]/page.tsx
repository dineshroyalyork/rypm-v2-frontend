'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import WishlistDetail from '@/features/tenant/wishlist/components/detail/WishlistDetail';
import { dummyWishlists } from '@/features/tenant/wishlist/utils/wishlistDummyData';
import { Wishlist } from '@/features/tenant/wishlist/types/wishlist.types';

// Local storage helper (same as in WishlistGrid)
function getLocalWishlists(): Wishlist[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("localWishlists");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

const WishlistDetailPage: React.FC = () => {
  const params = useParams();
  const wishlistId = params.id as string;
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Combine local and dummy wishlists
    const localWishlists = getLocalWishlists();
    const allWishlists = [...localWishlists, ...dummyWishlists];
    
    // Find the specific wishlist
    const foundWishlist = allWishlists.find(w => w.id === wishlistId);
    
    setWishlist(foundWishlist || null);
    setLoading(false);
  }, [wishlistId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#001D3D]">Loading...</div>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#001D3D] mb-2">Wishlist Not Found</h2>
          <p className="text-[#001D3D]">The wishlist youre looking for doesnt exist.</p>
        </div>
      </div>
    );
  }

  return <WishlistDetail wishlist={wishlist} />;
};

export default WishlistDetailPage;
