import React from "react";
import SearchCity from "./SearchCity";
import { IconButton } from "@mui/material";
import { FilterIcon, HeartFilledIcon, CalendarFilledIcon } from "@/ui/icons";
import { useRouter } from "next/navigation";

interface PropertySearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isMapView?: boolean;
  onMapToggle?: () => void;
  onClick?: () => void;
  onSearchSheetOpen?: () => void;
}

const PropertySearchBar: React.FC<PropertySearchBarProps> = ({
  searchTerm,
  onSearchChange,
  isMapView = false,
  onMapToggle,
  onClick,
  onSearchSheetOpen
}) => {
  const router = useRouter();
  
  const handleNavigateRentalPreference = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/tenant/PropertySearch/filter`);
    }
  };

    const handleNavigateToWishlist = () => {
    router.push('/tenant/wishlist');
  };

  return (
 <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between ${
      isMapView 
        ? 'p-2 gap-2' 
        : 'bg-white p-4 gap-2'
    } max-w-[480px] mx-auto`}>

        <SearchCity
        value={searchTerm}
        onChange={onSearchChange}
        onMapToggle={onMapToggle}
        isMapView={isMapView}
        onSearchSheetOpen={onSearchSheetOpen}
      />
      <div className="flex gap-2 ">
        <IconButton
          sx={{ padding: "1px" }}
          onClick={handleNavigateRentalPreference}
        >
          <FilterIcon width={40} height={40} color="#001D3D" />
        </IconButton>
        <IconButton aria-label="Favorites" sx={{ padding: "1px" }} onClick={handleNavigateToWishlist}>
          <HeartFilledIcon  />
        </IconButton>
        <IconButton aria-label="Calendar" sx={{ padding: "1px" }}>
          <CalendarFilledIcon color="#001D3D" />
        </IconButton>
      </div>
    </div>
  );
};

export default PropertySearchBar;
