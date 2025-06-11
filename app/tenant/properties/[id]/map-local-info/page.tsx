"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import LocalInfoMapView from "@/features/tenant/propertysearch/components/Map/LocalInfoMapView";
import { usePropertyData } from "@/features/tenant/propertysearch/hooks/usePropertyData";
import { LocalInfoCategory } from "@/features/tenant/propertysearch/components/Map/features/LocalInfo/CategoryTabs";

export default function MapLocalInfoPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const propertyId = params.id as string;

  const { property } = usePropertyData(propertyId);
  const initialCategory = (searchParams.get("category") ||
    "education") as LocalInfoCategory;

  return (
    <div className="fixed inset-0 w-full h-full">
      <LocalInfoMapView
        initialLocation={
          property?.coordinates?.lat && property?.coordinates?.lng
            ? { lat: property.coordinates.lat, lng: property.coordinates.lng }
            : { lat: 43.6532, lng: -79.3832 }
        }
        zoom={15}
        initialCategory={initialCategory}
        propertyData={{
          coordinates:
            property?.coordinates?.lat && property?.coordinates?.lng
              ? { lat: property.coordinates.lat, lng: property.coordinates.lng }
              : { lat: 43.6532, lng: -79.3832 },
          address: property?.address || "",
        }}
      />
    </div>
  );
}
