"use client";
import React from "react";
import NearByButton from "./NearByButton";
import { LocalInfoCategory } from "./Map/features/LocalInfo/CategoryTabs";

export interface ButtonData {
  id: string;
  text: string;
  category: LocalInfoCategory;
}

const mockButtonData: ButtonData[] = [
  { id: "1", text: "Grocery & Stores", category: "grocery" },
  { id: "2", text: "Education & Schools", category: "education" },
  { id: "3", text: "Restaurant & Cafes", category: "restaurants" },
  { id: "4", text: "Healthcare", category: "healthcare" },
  { id: "5", text: "Fitness", category: "fitness" },
  { id: "6", text: "Shopping", category: "shopping" },
  { id: "7", text: "Businesses", category: "business" },
  { id: "8", text: "Travel", category: "travel" },
  { id: "9", text: "Services", category: "services" },
];

interface WhatsNearByButtonContainerProps {
  selectedCategory: LocalInfoCategory;
  onCategoryChange: (category: LocalInfoCategory) => void;
}

const WhatsNearByButtonContainer: React.FC<WhatsNearByButtonContainerProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const handleButtonClick = (category: LocalInfoCategory) => {
    onCategoryChange(category);
  };

  return (
    <div className="mt-5 flex flex-row gap-1.5 w-[89.82vw] h-[5vh] py-0.5 overflow-auto scroll-smooth justify-between items-center border-[#F8FBF9] border-[1.5px] rounded-[8px] hide-scrollbar">
      {mockButtonData.map((item) => (
        <NearByButton
          key={item.id}
          text={item.text}
          isActive={selectedCategory === item.category}
          onClick={() => handleButtonClick(item.category)}
        />
      ))}
    </div>
  );
};

export default WhatsNearByButtonContainer;
