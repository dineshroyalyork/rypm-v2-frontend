import React, { useState, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import CloseIcon from "@/ui/icons/CloseIcon";
import { RatingIcon } from "@/ui/icons";
import { FallbackImage, getCategoryFallback } from "../../utils/imageFallbacks";

interface CategoryItem {
  id: string;
  title: string;
  address: string;
  rating: number;
  thumbnail: string;
  distance?: string;
}

interface CategoryBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  items: CategoryItem[];
  onItemClick?: (item: CategoryItem) => void;
  onPlaceDetailRequest?: (placeId: string) => Promise<void>;
  initialHeight?: number;
  minTopDistance?: number;
  backgroundColor?: "white" | "dark";
  textColor?: "light" | "dark";
  isContained?: boolean;
  isLocalInfoMap?: boolean;
}

const CategoryBottomSheet: React.FC<CategoryBottomSheetProps> = ({
  isOpen,
  onClose,
  category,
  items,
  onItemClick,
  onPlaceDetailRequest,
  initialHeight = 0.25,
  minTopDistance = 220,
  backgroundColor = "dark",
  textColor = "light",
  isContained = false,
  isLocalInfoMap = false,
}) => {
  const [dragY, setDragY] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const constraintsRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ✅ Use containerHeight consistently throughout
  const containerHeight = isContained
    ? 670
    : typeof window !== "undefined"
    ? window.innerHeight
    : 800;
  const minHeight = containerHeight * initialHeight;
  const maxHeight = containerHeight * 0.8;
  const currentHeight = isExpanded ? maxHeight : minHeight;
  const dragElasticity = isLocalInfoMap ? 0.01 : 0.05;

  // Dynamic styles based on props
  const bgClass =
    backgroundColor === "white"
      ? "bg-white"
      : "bg-[rgba(23,61,59,0.5)] backdrop-blur-[5px]";

  const titleTextClass =
    textColor === "dark" ? "text-[#001D3D]" : "text-[#FFF]";

  const itemTitleClass =
    textColor === "dark" ? "text-[#001D3D]" : "text-[#FFF]";

  const itemAddressClass =
    textColor === "dark" ? "text-[#6B7280]" : "text-[#E5E7EB]";

  const getSafeBottomPadding = () => {
    if (typeof window === "undefined") return 80;

    const originalMaxHeight = containerHeight * 0.8;
    const restrictedMaxHeight = containerHeight - minTopDistance;

    if (restrictedMaxHeight < originalMaxHeight) {
      const heightDifference = originalMaxHeight - restrictedMaxHeight;
      const calculatedPadding = Math.max(80, heightDifference * 0.4 + 60);
      return Math.min(calculatedPadding, 150);
    }

    return 80;
  };

  const bottomPadding = getSafeBottomPadding();

  const maxDragDistance = isLocalInfoMap
    ? 5
    : Math.min(
        currentHeight * 0.2,
        containerHeight - minTopDistance - currentHeight
      );

  const snapThreshold = minHeight * 0.5;

  const handleDragEnd = (event: any, info: PanInfo) => {
    const shouldClose = info.offset.y > snapThreshold;
    const shouldExpand = info.offset.y < -snapThreshold && !isExpanded;
    const shouldCollapse = info.offset.y > snapThreshold && isExpanded;

    if (shouldClose && !isExpanded) {
      onClose();
    } else if (shouldExpand) {
      setIsExpanded(true);
      setDragY(0);
    } else if (shouldCollapse) {
      setIsExpanded(false);
      setDragY(0);
    } else {
      setDragY(0);
    }
  };

  const handleDragStart = (event: any, info: any) => {
    if (contentRef.current && contentRef.current.contains(event.target)) {
      const isScrollable =
        contentRef.current.scrollHeight > contentRef.current.clientHeight;
      if (isScrollable) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (!isOpen) {
      setIsExpanded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {!isContained && backgroundColor === "dark" && <motion.div />}

      {/* Bottom Sheet */}
      <motion.div
        ref={constraintsRef}
        initial={{ y: "100%" }}
        animate={{ y: `${100 - (currentHeight / containerHeight) * 100}%` }} // ✅ Use containerHeight
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        drag="y"
        dragConstraints={{
          top: -maxDragDistance,
          bottom: containerHeight,
        }}
        dragElastic={dragElasticity}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`${
          isContained ? "absolute" : "fixed"
        } bottom-0 left-0 right-0 rounded-t-3xl shadow-2xl z-50 overflow-hidden flex flex-col ${bgClass}`}
        style={{
          height: `${currentHeight}px`,
        }}
      >
        {/* Drag Handle - Only this area should trigger sheet drag */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing flex-shrink-0"
          style={{ touchAction: "none" }}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header - Also draggable */}
        <div
          className="grid grid-cols-[1fr_auto_1fr] items-center px-4 flex-shrink-0"
          style={{ touchAction: "none" }}
        >
          {/* Empty left column */}
          <div></div>

          {/* Centered category title */}
          <h2
            className={`text-md font-bold ${titleTextClass} capitalize whitespace-nowrap`}
          >
            {category}
          </h2>

          {/* Close Button in right column */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              style={{ touchAction: "manipulation" }}
            >
              <CloseIcon
                width={16}
                height={16}
                color={textColor === "dark" ? "#99A1AF" : "white"}
              />
            </button>
          </div>
        </div>

        {/* Scrollable Content - This should NOT trigger sheet drag */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-2 py-2"
          style={{
            touchAction: "pan-y",
            overscrollBehavior: "contain",
          }}
        >
          {items.length > 0 ? (
            <div
              className="space-y-3"
              style={{
                paddingBottom: `${bottomPadding}px`,
              }}
            >
              {items.map((item) => (
                <CategoryItemCard
                  key={item.id}
                  item={item}
                  category={category}
                  textColor={textColor}
                  onItemClick={onItemClick}
                  onPlaceDetailRequest={onPlaceDetailRequest}
                  itemTitleClass={itemTitleClass}
                  itemAddressClass={itemAddressClass}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-gray-500">
                  No {category.toLowerCase()} found nearby
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Try zooming out or changing location
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

const CategoryItemCard: React.FC<{
  item: CategoryItem;
  category: string;
  textColor?: "dark" | "light";
  onItemClick?: (item: CategoryItem) => void;
  onPlaceDetailRequest?: (placeId: string) => Promise<void>;
  itemTitleClass: string;
  itemAddressClass: string;
}> = ({
  item,
  category,
  onItemClick,
  textColor = "light",
  onPlaceDetailRequest,
  itemTitleClass,
  itemAddressClass,
}) => {
  const handleCardClick = async () => {
    if (onItemClick) {
      onItemClick(item);
    }
    if (onPlaceDetailRequest) {
      await onPlaceDetailRequest(item.id);
    }
  };

  return (
    <div
      className="flex items-center p-1 hover:shadow-md hover:border-[#20364D]/20 transition-all duration-200 cursor-pointer active:scale-[0.98]"
      onClick={handleCardClick}
      style={{ touchAction: "manipulation" }}
    >
      {/* Thumbnail */}
      <div className="w-13 h-13 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        <FallbackImage
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
          category={category}
        />
      </div>

      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3
            className={`text-sm font-semibold ${itemTitleClass} truncate flex-1 mr-2`}
          >
            {item.title}
          </h3>
          <div className="flex items-center flex-shrink-0">
            <span className="mr-1">
              <RatingIcon color={textColor === "dark" ? "#99A1AF" : "#FFF"} />
            </span>
            <span className={`text-sm font-medium ${itemTitleClass}`}>
              {item.rating > 0 ? item.rating.toFixed(1) : "4.2"}
            </span>
          </div>
        </div>

        <p className={`text-xs ${itemAddressClass} line-clamp-2 mb-1`}>
          {item.address}
        </p>
      </div>
    </div>
  );
};

export default CategoryBottomSheet;
