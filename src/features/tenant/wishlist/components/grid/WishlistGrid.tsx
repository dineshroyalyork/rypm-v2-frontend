"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  dummyWishlists,
  likedPropertiesData,
} from "../../utils/wishlistDummyData";
import LikedPropertiesBox from "./LikedPropertiesBox";
import WishlistBox from "./WishlistBox";
import {
  DeleteIcon,
  BackIcon,
  CreateIcon,
  MoreIcon,
  CloseIcon,
} from "@/ui/icons";
import type { Wishlist } from "../../types/wishlist.types";
const LOCAL_KEY = "localWishlists";

function getLocalWishlists() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(LOCAL_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalWishlists(wishlists: Wishlist[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(wishlists));
}

const WishlistGrid: React.FC = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wishlistName, setWishlistName] = useState("");
  const [error, setError] = useState("");
  const [localWishlists, setLocalWishlistsState] = useState<Wishlist[]>([]);

  // Load local wishlists on mount
  useEffect(() => {
    setLocalWishlistsState(getLocalWishlists());
  }, []);

  // Combine dummy and local wishlists, sorted
  const sortedWishlists = [...localWishlists, ...dummyWishlists].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleBack = () => {
    router.back();
  };

  const handleCreateWishlist = () => {
    setShowDropdown(false);
    setShowModal(true);
    setWishlistName("");
    setError("");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setWishlistName("");
    setError("");
  };

  const handleModalCreate = () => {
    if (!wishlistName.trim()) {
      setError("Please enter a wishlist name.");
      return;
    }
    const newWishlist = {
      id: `local-${Date.now()}`,
      name: wishlistName.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      properties: [],
    };
    const updated = [newWishlist, ...localWishlists];
    setLocalWishlistsState(updated);
    setLocalWishlists(updated);
    setShowModal(false);
    setWishlistName("");
    setError("");
  };

  const handleDeleteMode = () => {
    setShowDropdown(false);
    console.log("Enter delete mode");
  };

  const handleWishlistClick = (wishlistId: string) => {
    router.push(`/tenant/wishlist/${wishlistId}`);
  };

  const handleLikedPropertiesClick = () => {
    router.push("/tenant/wishlist/liked");
  };

  // Modal focus trap
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className="min-h-screen">
      <div className="bg-white py-4">
        <div className="flex items-center justify-between px-4 max-w-[480px] mx-auto">
          <button onClick={handleBack} className="p-2 -ml-2">
            <BackIcon />
          </button>
          <h1 className="text-lg font-semibold text-[#001D3D]">Wishlist</h1>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 -mr-2"
            >
              <MoreIcon className="w-6 h-6 text-[#001D3D]" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-45 bg-white rounded-lg z-10 shadow border border-gray-100">
                <button
                  onClick={handleCreateWishlist}
                  className="group flex items-center w-full px-4 py-2 text-left border-b border-gray-100 bg-white hover:bg-[#001D3D] transition"
                >
                  <CreateIcon className="mr-3 text-[#001D3D] group-hover:text-white transition" />
                  <span className="text-[#001D3D] group-hover:text-white transition">
                    Create Wishlist
                  </span>
                </button>
                <button
                  onClick={handleDeleteMode}
                  className="group flex items-center w-full px-4 py-2 text-left bg-white hover:bg-[#001D3D] transition"
                >
                  <DeleteIcon className="mr-3 text-[#001D3D] group-hover:text-white transition" />
                  <span className="text-[#001D3D] group-hover:text-white transition">
                    Delete
                  </span>
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

      {/* Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{
              backgroundColor: "rgba(0, 29, 61, 0.3)",
              backdropFilter: "blur(3.55px)",
              WebkitBackdropFilter: "blur(3.55px)",
            }}
            onClick={handleModalClose}
          />

          {/* Modal */}
          <div
            className="fixed z-50 left-1/2 top-1/2 w-[90vw] max-w-[361px] rounded-2xl bg-white shadow-xl p-6 flex flex-col items-center"
            style={{ transform: "translate(-50%, -80%)" }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-6 h-6 rounded-full p-1 flex items-center justify-center"
              style={{
                background: "rgba(0, 29, 61, 0.30)",
                backdropFilter: "blur(1.0666667222976685px)",
                WebkitBackdropFilter: "blur(1.0666667222976685px)",
              }}
              onClick={handleModalClose}
              aria-label="Close"
            >
              <CloseIcon width={10} height={10}/>
            </button>
            {/* Heading */}
            <h2 className="w-full text-center text-lg font-semibold text-[#001D3D] mb-4">
              Create Wishlist
            </h2>
            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-[#001D3D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#001D3D]"
              placeholder="Wishlist name"
              value={wishlistName}
              onChange={(e) => {
                setWishlistName(e.target.value);
                setError("");
              }}
              maxLength={40}
            />
            {/* Error */}
            {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
            {/* Create Button */}
            <button
              className="w-full bg-[#001D3D] text-white rounded-xl py-3 font-semibold text-base"
              onClick={handleModalCreate}
            >
              Create
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistGrid;
