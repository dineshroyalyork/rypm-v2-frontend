"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box } from "@mui/material";
import LocationButton from "./controls/LocationButton";
import CategoryTabs from "./features/LocalInfo/CategoryTabs";
import { useLocalInfo } from "./hooks/useLocalInfo";
import { useGooglePlaces } from "./hooks/useGooglePlaces";
import PlaceMarker from "./components/PlaceMarker";
import PlacePopup from "./components/PlacePopup";
import CategoryBottomSheet from "./features/LocalInfo/CategoryBottomSheet";
import PlaceDetailBottomSheet from "./features/LocalInfo/PlaceDetailBottomSheet";
import { LocalInfoCategory } from "./features/LocalInfo/CategoryTabs";
import { CloseIcon, PropertyIcon } from "@/ui/icons";
import { useRouter } from "next/navigation";

const MAPBOX_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  "pk.eyJ1IjoicHJpeWVzaGd1cmphciIsImEiOiJjbWFwMmliZnQwYnJsMmlzM3E2YzFhbnMyIn0.dgFK-9QjfR8H-f3YyLg28w";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

interface LocalInfoMapViewProps {
  initialLocation?: { lat: number; lng: number };
  zoom?: number;
  initialCategory?: LocalInfoCategory;
  propertyData?: {
    coordinates: { lat: number; lng: number };
    address: string;
  };
}

interface CategoryItem {
  id: string;
  title: string;
  address: string;
  rating: number;
  thumbnail: string;
  distance?: string;
}

const LocalInfoMapView: React.FC<LocalInfoMapViewProps> = ({
  initialLocation = { lat: 43.6532, lng: -79.3832 },
  zoom = 15,
  initialCategory = "education",
  propertyData,
}) => {
  const router = useRouter();
  const handleCloseMap = () => {
    router.back();
  };
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const propertyMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [showPlacePopup, setShowPlacePopup] = useState(false);
  const [showCategoryBottomSheet, setShowCategoryBottomSheet] = useState(false);
  const [showPlaceDetailSheet, setShowPlaceDetailSheet] = useState(false);
  const [selectedPlaceForDetails, setSelectedPlaceForDetails] =
    useState<any>(null);
  const [placeDetailsLoading, setPlaceDetailsLoading] = useState(false);

  const {
    isLocalInfoActive,
    selectedCategory,
    toggleLocalInfo,
    handleCategoryChange,
  } = useLocalInfo();

  const {
    places,
    loading: placesLoading,
    error: placesError,
    searchPlaces,
    getPlaceDetails,
    clearPlaces,
  } = useGooglePlaces();

  // Convert places to CategoryItem format
  const convertPlacesToCategoryItems = (places: any[]) => {
    return places.map((place) => ({
      id: place.id,
      title: place.name,
      address: place.vicinity || place.address || "Address not available",
      rating: place.rating || 0,
      thumbnail: place.photoUrl,
      distance: place.distance,
    }));
  };

  // Map initialization
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialLocation.lng, initialLocation.lat],
      zoom: zoom,
      doubleClickZoom: false,
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
  }, [initialLocation.lat, initialLocation.lng, zoom]);

  useEffect(() => {
    if (mapLoaded && !isLocalInfoActive) {
      toggleLocalInfo();
      handleCategoryChange(initialCategory);
    }
  }, [mapLoaded, initialCategory]);

  useEffect(() => {
    if (!map.current || !mapLoaded || !propertyData) return;

    if (propertyMarkerRef.current) {
      propertyMarkerRef.current.remove();
    }

    const propertyMarkerElement = document.createElement("div");
    const root = ReactDOM.createRoot(propertyMarkerElement);
    root.render(<PropertyIcon />);

    propertyMarkerRef.current = new mapboxgl.Marker(propertyMarkerElement)
      .setLngLat([propertyData.coordinates.lng, propertyData.coordinates.lat])
      .addTo(map.current);

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div style="padding: 8px;">
        <strong>Property Location</strong><br/>
        ${propertyData.address}
      </div>
    `);

    propertyMarkerRef.current.setPopup(popup);
  }, [mapLoaded, propertyData]);

  useEffect(() => {
    if (isLocalInfoActive && map.current) {
      const center = map.current.getCenter();
      searchPlaces(selectedCategory, { lat: center.lat, lng: center.lng });
    } else {
      clearPlaces();
    }
  }, [isLocalInfoActive, selectedCategory, searchPlaces, clearPlaces]);

  useEffect(() => {
    if (showPlacePopup) {
      setShowCategoryBottomSheet(false);
    } else if (selectedCategory !== "all" && isLocalInfoActive) {
      setShowCategoryBottomSheet(true);
    }
  }, [showPlacePopup, selectedCategory, isLocalInfoActive]);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const existingPlaceMarkers = document.querySelectorAll(
      "[data-place-marker]"
    );
    existingPlaceMarkers.forEach((marker) => marker.remove());

    if (placesLoading || !isLocalInfoActive || !places || places.length === 0) {
      return;
    }

    places.forEach((place) => {
      const markerElement = document.createElement("div");
      markerElement.setAttribute("data-place-marker", "true");

      const root = ReactDOM.createRoot(markerElement);
      root.render(
        <PlaceMarker
          place={place}
          onClick={handlePlaceClick}
          isSelected={selectedPlace?.id === place.id}
          searchCategory={selectedCategory}
        />
      );

      new mapboxgl.Marker(markerElement)
        .setLngLat([place.lng, place.lat])
        .addTo(map.current!);
    });
  }, [
    map.current,
    mapLoaded,
    places,
    placesLoading,
    isLocalInfoActive,
    selectedPlace?.id,
    selectedCategory,
  ]);

  // Event handlers
  const handlePlaceClick = (place: any) => {
    setSelectedPlace(place);
    setShowPlacePopup(true);
    console.log("Place clicked:", place);
  };

  const handlePlacePopupClose = () => {
    setShowPlacePopup(false);
    setSelectedPlace(null);
  };

  const handleCategoryTabClick = (category: LocalInfoCategory) => {
    handleCategoryChange(category);

    if (category !== "all") {
      setShowCategoryBottomSheet(true);
    } else {
      setShowCategoryBottomSheet(false);
    }
  };

  const handleCloseBottomSheet = () => {
    setShowCategoryBottomSheet(false);
  };

  const handlePlaceDetailRequest = async (placeId: string) => {
    setPlaceDetailsLoading(true);
    setShowPlaceDetailSheet(true);
    setShowCategoryBottomSheet(false);

    try {
      const placeDetails = await getPlaceDetails(placeId);
      setSelectedPlaceForDetails(placeDetails);
    } catch (error) {
      console.error("Error fetching place details:", error);
      setSelectedPlaceForDetails(null);
    } finally {
      setPlaceDetailsLoading(false);
    }
  };

  const handlePlaceDetailClose = () => {
    setShowPlaceDetailSheet(false);
    setSelectedPlaceForDetails(null);
  };

  const handlePlaceDetailBack = () => {
    setShowPlaceDetailSheet(false);
    setSelectedPlaceForDetails(null);
    // Keep the category bottom sheet open
  };

  const handlePlaceDetailFromPopup = async (placeId: string) => {
    setShowPlacePopup(false);
    setSelectedPlace(null);

    setPlaceDetailsLoading(true);
    setShowPlaceDetailSheet(true);

    try {
      const placeDetails = await getPlaceDetails(placeId);
      setSelectedPlaceForDetails(placeDetails);
    } catch (error) {
      console.error("Error fetching place details:", error);
      setSelectedPlaceForDetails(null);
    } finally {
      setPlaceDetailsLoading(false);
    }
  };

  return (
    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* Map Container */}
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />
      {/* Loading Overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-[5]">
          <p>Loading map...</p>
        </div>
      )}
      <div className="absolute top-2 left-0 right-0 z-20">
        {isLocalInfoActive && (
          <div className="relative">
            <div className="pl-2 pr-12 h-12">
              <CategoryTabs
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryTabClick}
              />
            </div>

            <button
              onClick={handleCloseMap}
              className="absolute top-5 right-4 p-2 bg-[rgba(0,29,61,0.30)] backdrop-blur-[2px] rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10" // Changed to top-5
            >
              <CloseIcon width={13} height={13} />
            </button>
          </div>
        )}
      </div>
      {mapLoaded && (
        <>
          <div className="fixed bottom-30 right-6 z-10">
            <LocationButton map={map.current} />
          </div>
        </>
      )}
      {/* Places Loading Indicator */}
      {isLocalInfoActive && placesLoading && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30">
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm text-gray-700">Loading places...</span>
          </div>
        </div>
      )}
      {/* Places Error Indicator */}
      {isLocalInfoActive && placesError && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg px-4 py-2 text-sm">
            {placesError}
          </div>
        </div>
      )}
      {/* Place Popup */}
      {showPlacePopup && selectedPlace && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-end justify-center pb-3">
          <div className="w-[94vw] max-w-[420px] h-[177px] bg-white rounded-2xl shadow-xl pointer-events-auto">
            <PlacePopup
              place={selectedPlace}
              onClose={handlePlacePopupClose}
              onViewDetails={handlePlaceDetailFromPopup}
            />
          </div>
        </div>
      )}
      {/* Category Bottom Sheet */}
      <CategoryBottomSheet
        isOpen={showCategoryBottomSheet && !showPlaceDetailSheet}
        onClose={handleCloseBottomSheet}
        category={selectedCategory}
        items={convertPlacesToCategoryItems(places)}
        onPlaceDetailRequest={handlePlaceDetailRequest}
        initialHeight={0.35}
        minTopDistance={300}
        backgroundColor="white"
        textColor="dark"
        isLocalInfoMap={true}
      />
      {/* Place Detail Bottom Sheet */}
      <PlaceDetailBottomSheet
        isOpen={showPlaceDetailSheet}
        onClose={handlePlaceDetailClose}
        onBack={handlePlaceDetailBack}
        place={selectedPlaceForDetails}
        loading={placeDetailsLoading}
        category={selectedCategory}
        minTopDistance={320}
        maxSheetHeight={600}
        backgroundColor="white"
        textColor="dark"
        isLocalInfoMap={true}
      />
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
};

export default LocalInfoMapView;
