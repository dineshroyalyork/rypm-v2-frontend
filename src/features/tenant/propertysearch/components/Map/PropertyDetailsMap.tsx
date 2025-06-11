"use client";

import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box } from "@mui/material";
import LocationButton from "./controls/LocationButton";
import { useGooglePlaces } from "./hooks/useGooglePlaces";
import PlaceMarker from "./components/PlaceMarker";
import CategoryBottomSheet from "./features/LocalInfo/CategoryBottomSheet";
import { LocalInfoCategory } from "./features/LocalInfo/CategoryTabs";
import { PropertyIcon, ExpandIcon } from "@/ui/icons";

const MAPBOX_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  "pk.eyJ1IjoicHJpeWVzaGd1cmphciIsImEiOiJjbWFwMmliZnQwYnJsMmlzM3E2YzFhbnMyIn0.dgFK-9QjfR8H-f3YyLg28w";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

interface PropertyDetailsMapProps {
  propertyCoordinates: { lat: number; lng: number };
  propertyAddress: string;
  onExpandMap?: (placeItem?: any) => void;
  selectedCategory: LocalInfoCategory;
}

interface CategoryItem {
  id: string;
  title: string;
  address: string;
  rating: number;
  thumbnail: string;
  distance?: string;
}

const PropertyDetailsMap: React.FC<PropertyDetailsMapProps> = memo(
  ({ propertyCoordinates, propertyAddress, onExpandMap, selectedCategory }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const propertyMarkerRef = useRef<mapboxgl.Marker | null>(null);

    const [mapLoaded, setMapLoaded] = useState(false);
    const [showCategorySheet, setShowCategorySheet] = useState(false);

    const {
      places,
      loading: placesLoading,
      error: placesError,
      searchPlaces,
      clearPlaces,
    } = useGooglePlaces();

    const categoryItems: CategoryItem[] = places.map((place) => ({
      id: place.id,
      title: place.name,
      address: place.vicinity || place.address || "Address not available",
      rating: place.rating || 0,
      thumbnail: place.photoUrl || "/images/placeholder.png",
      distance: place.distance,
    }));

    useEffect(() => {
      if (!mapContainer.current || map.current) return;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [propertyCoordinates.lng, propertyCoordinates.lat],
        zoom: 13,
        interactive: true,
      });

      map.current.on("load", () => {
        setMapLoaded(true);
      });

      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    }, [propertyCoordinates.lat, propertyCoordinates.lng]);

    useEffect(() => {
  if (!map.current || !mapLoaded) return;

  if (propertyMarkerRef.current) {
    propertyMarkerRef.current.remove();
  }

  const propertyMarkerElement = document.createElement("div");
  propertyMarkerElement.style.zIndex = '9999';
  const root = ReactDOM.createRoot(propertyMarkerElement);
  root.render(<PropertyIcon />);

  propertyMarkerRef.current = new mapboxgl.Marker({
    element: propertyMarkerElement,
    anchor: 'bottom' 
  })
    .setLngLat([propertyCoordinates.lng, propertyCoordinates.lat])
    .addTo(map.current);

  const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
    <div style="padding: 8px;">
      <strong>Property Location</strong><br/>
      ${propertyAddress}
    </div>
  `);

  propertyMarkerRef.current.setPopup(popup);
}, [mapLoaded, propertyCoordinates, propertyAddress]);


    useEffect(() => {
      if (mapLoaded && selectedCategory !== "all") {
        searchPlaces(selectedCategory, propertyCoordinates);
        setShowCategorySheet(true);
      } else {
        clearPlaces();
        setShowCategorySheet(false);
      }
    }, [
      selectedCategory,
      mapLoaded,
      propertyCoordinates,
      searchPlaces,
      clearPlaces,
    ]);

    useEffect(() => {
      if (!map.current || !mapLoaded) return;

      const existingPlaceMarkers = document.querySelectorAll(
        "[data-place-marker]"
      );
      existingPlaceMarkers.forEach((marker) => marker.remove());

      if (placesLoading || !places || places.length === 0) {
        return;
      }

      places.forEach((place) => {
        const markerElement = document.createElement("div");
        markerElement.setAttribute("data-place-marker", "true");

        const root = ReactDOM.createRoot(markerElement);
        root.render(
          <PlaceMarker
            place={place}
            onClick={() => {}} 
            isSelected={false}
            searchCategory={selectedCategory}
          />
        );

        new mapboxgl.Marker(markerElement)
          .setLngLat([place.lng, place.lat])
          .addTo(map.current!);
      });
    }, [map.current, mapLoaded, places, placesLoading, selectedCategory]);

    const handleCategoryItemClick = async (item: CategoryItem) => {
      console.log("Category item clicked - expanding map:", item);

      if (onExpandMap) {
        onExpandMap(item);
      }
    };

    const handleCloseCategorySheet = () => {
      setShowCategorySheet(false);
    };

    return (
      <Box
        sx={{
          position: "relative",
          height: "670px",
          width: "100%",
          maxWidth: "360px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Map Container */}
        <div
          ref={mapContainer}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg"
        />
        {/* Expand Map Button */}
        <button
          onClick={() => onExpandMap && onExpandMap()}
          className="absolute top-4 right-4 z-20 rounded-full p-1 bg-[rgba(0,29,59,0.30)] backdrop-blur-[2px]"
          aria-label="Expand map to full screen"
        >
          <ExpandIcon width={30} height={30} />
        </button>
        {/* Location Button */}
        <div className="absolute bottom-15 right-4 z-20">
          <LocationButton map={map.current} />
        </div>
        {/* Loading Indicator */}
        {placesLoading && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center space-x-2">
              <svg
                className="animate-spin h-4 w-4 text-[#20364D]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-sm text-gray-700">
                Loading {selectedCategory}...
              </span>
            </div>
          </div>
        )}
        {/* Error Indicator */}
        {placesError && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg px-4 py-2 text-sm">
              {placesError}
            </div>
          </div>
        )}
        {showCategorySheet && (
          <div className="absolute inset-0 z-40">
            <CategoryBottomSheet
              isOpen={true}
              onClose={handleCloseCategorySheet}
              category={selectedCategory}
              items={categoryItems}
              onItemClick={handleCategoryItemClick}
              initialHeight={0.6}
              minTopDistance={50}
              backgroundColor="white"
              textColor="dark"
              isContained={true}
            />
          </div>
        )}
        <style>{`
  /* Hide Mapbox built-in geolocate button */
  .mapboxgl-ctrl-geolocate {
    display: none !important;
  }
  
  .mapboxgl-ctrl-group .mapboxgl-ctrl-geolocate {
    display: none !important;
  }
  
  /* Hide the entire control group if it only contains geolocate */
  .mapboxgl-ctrl-group:has(.mapboxgl-ctrl-geolocate):not(:has(*:not(.mapboxgl-ctrl-geolocate))) {
    display: none !important;
  }
`}</style>
      </Box>
    );
  }
);

PropertyDetailsMap.displayName = "PropertyDetailsMap";

export default PropertyDetailsMap;
