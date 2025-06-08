"use client";

import React, { useState, useEffect, useRef } from "react";
import { BackIcon } from "@/ui/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MainInfoContainer } from "../styles/components/propertyCardStyles";
import FooterImageSlider from "../components/FooterImageSlider";
import { PhotoVideoData } from "../hooks/usePhotoVideoData";
import { VideoPlayIcon } from "@/ui/icons";
import ExteriorImageSection from "../components/ExteriorImageSection";
import BathroomImageSection from "../components/BathroomImageSection";
import KitchenImageSection from "../components/KitchenImageSection";
import LivingImageSection from "../components/LivingImageSection";
import {
  kitchenImageData,
  exteriorImageData,
  livingImageData,
  bathroomImageData,
} from "../hooks/useImagesData";

interface PhotoVideosProps {
  id: string;
}

const PhotosAndVideos: React.FC<PhotoVideosProps> = ({ id }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("mainImage");

  const bottomScrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const bottomSectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const headingRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const isMainScrolling = useRef(false);
  const isBottomScrolling = useRef(false);

  const handleBackClick = () => {
    router.back();
  };

  const handleNavigateVideo = () => {
    router.push(`/tenant/properties/${id}/video`);
  };

  const handleNavigatePhoto = () => {
    router.push(`/tenant/properties/${id}/photo`);
  };

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const setBottomSectionRef = (id: string) => (el: HTMLElement | null) => {
    bottomSectionRefs.current[id] = el;
  };

  const setHeadingRef = (id: string) => (el: HTMLElement | null) => {
    headingRefs.current[id] = el;
  };

  const syncBottomScroll = (sectionId: string) => {
    const bottomSection = bottomSectionRefs.current[sectionId];
    const bottomContainer = bottomScrollRef.current;
    
    if (bottomSection && bottomContainer) {
      isMainScrolling.current = true;
      
      const firstItem = bottomSectionRefs.current[PhotoVideoData[0].id.replace("#", "")];
      const containerStartOffset = firstItem ? firstItem.offsetLeft : 0;
      
      const scrollAmount = bottomSection.offsetLeft - containerStartOffset;
      
      bottomContainer.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      
      setTimeout(() => {
        isMainScrolling.current = false;
      }, 500);
    }
  };

  const handleBottomScroll = (sectionId: string) => {
    if (isMainScrolling.current) return;

    const mainSection = sectionRefs.current[sectionId];

    if (mainSection) {
      isBottomScrolling.current = true;

      const headerHeight = 100;
      const sectionTop = mainSection.offsetTop - headerHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });

      setActiveSection(sectionId);

      setTimeout(() => {
        isBottomScrolling.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isBottomScrolling.current) return;

      const headerHeight = 100;
      const tolerance = 20;
      const scrollY = window.scrollY;

      let newActiveSection = "mainImage";

      const videoSection = sectionRefs.current["mainImage"];
      if (
        videoSection &&
        scrollY >
          videoSection.offsetTop + videoSection.offsetHeight - headerHeight
      ) {
        const sections = ["exterior", "livingroom", "kitchen", "bathroom"];

        for (const sectionId of sections) {
          const headingElement = headingRefs.current[sectionId];
          if (headingElement) {
            const headingTop = headingElement.offsetTop - headerHeight;

            if (scrollY >= headingTop - tolerance) {
              newActiveSection = sectionId;
            } else {
              break;
            }
          }
        }
      }

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
        syncBottomScroll(newActiveSection);

        const footImg = document.querySelectorAll<HTMLAnchorElement>("footer .con a");
        footImg.forEach((link) => {
          link.classList.remove(
            "border-[1px]",
            "border-[#FFF]",
            "rounded-[8px]"
          );
          if (link.getAttribute("href") === `#${newActiveSection}`) {
            link.classList.add(
              "border-[1px]",
              "border-[#FFF]",
              "rounded-[8px]"
            );
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <>
      {/* Header */}
      <header className="flex flex-row items-center gap-[85px] mb-6.5 mt-4 mx-4 h-20 bg-white fixed top-[-20] left-0 right-0 z-1">
        <div onClick={handleBackClick}>
          <BackIcon />
        </div>
        <h1 className="text-[#001D3D] text-[18px] font-bold leading-[18px] capitalize">
          Photos & Videos
        </h1>
      </header>

      {/* Main Content */}
      <div className="pb-5.5 mt-22 px-4">
        <div
          id="mainImage"
          ref={setSectionRef("mainImage")}
          className="mt-7.5 relative w-[91.86vw] h-[26.41vh]"
          onClick={handleNavigateVideo}
        >
          <Image
            src="/images/exterior.png"
            alt="Exterior"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <VideoPlayIcon width={40} height={40} />
          </span>
        </div>

        <div className="mt-6">
          <section
            id="exterior"
            ref={setSectionRef("exterior")}
            className="mt-6"
            onClick={handleNavigatePhoto}
          >
            <h1
              ref={setHeadingRef("exterior")}
              className="text-[#001D3D] text-[16px] font-bold capitalize mb-5"
            >
              Exterior
            </h1>
            <ExteriorImageSection images={exteriorImageData} />
          </section>

          <section
            id="livingroom"
            ref={setSectionRef("livingroom")}
            className="mt-6"
            onClick={handleNavigatePhoto}
          >
            <h1
              ref={setHeadingRef("livingroom")}
              className="text-[#001D3D] text-[16px] font-bold capitalize mb-5"
            >
              Living Room
            </h1>
            <LivingImageSection images={livingImageData} />
          </section>

          <section
            id="kitchen"
            ref={setSectionRef("kitchen")}
            className="mt-6"
            onClick={handleNavigatePhoto}
          >
            <h1
              ref={setHeadingRef("kitchen")}
              className="text-[#001D3D] text-[16px] font-bold capitalize mb-5"
            >
              Kitchen
            </h1>
            <KitchenImageSection images={kitchenImageData} />
          </section>

          <section
            id="bathroom"
            ref={setSectionRef("bathroom")}
            className="mt-6 mb-28"
            onClick={handleNavigatePhoto}
          >
            <h1
              ref={setHeadingRef("bathroom")}
              className="text-[#001D3D] text-[16px] font-bold capitalize mb-5"
            >
              Bathroom
            </h1>
            <BathroomImageSection images={bathroomImageData} />
          </section>
        </div>

        {/* Footer */}
        <footer className="h-[14.08vh] fixed bottom-[-1] left-0 right-0 bg-[rgba(32,54,77,0.5)] backdrop-blur-[5px]">
          <a
            href="#mainImage"
            ref={setBottomSectionRef("mainImage")}
            onClick={(e) => {
              e.preventDefault();
              handleBottomScroll("mainImage");
            }}
          >
            <div className="h-[14.08vh] bg-[rgba(32,54,77,0.5)] backdrop-blur-[7.5px] w-[32.06vw] fixed left-0 bottom-0 py-2.5 pl-4 pr-2.5 float-left">
              <div
                className={`w-[25.45vw] h-[11.74vh] relative ${
                  activeSection === "mainImage"
                    ? "border-[1px] border-[#FFF] rounded-[8px]"
                    : ""
                }`}
              >
                <Image
                  src="/images/exterior.png"
                  alt=""
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-[8px]"
                />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <VideoPlayIcon />
                </span>
                <MainInfoContainer className="w-[25.45vw] h-[1.72vh] absolute bottom-0 rounded-b-[8px] flex items-center justify-center text-[#FFF] font-bold text-[10px] capitalize">
                  Video
                </MainInfoContainer>
              </div>
            </div>
          </a>

          <div
            ref={bottomScrollRef}
            className="h-[14.08vh] w-[67.94vw] flex flex-row gap-2.5 py-2.5 overflow-auto float-right pr-3 con scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
              paddingLeft: "12px",
            }}
          >
            {PhotoVideoData.map((item, index) => (
              <a
                href={item.id}
                key={index}
                ref={setBottomSectionRef(item.id.replace("#", ""))}
                onClick={(e) => {
                  e.preventDefault();
                  const sectionId = item.id.replace("#", "");
                  handleBottomScroll(sectionId);
                }}
                className={`flex-shrink-0 ${
                  activeSection === item.id.replace("#", "")
                    ? "border-[1px] border-[#FFF] rounded-[8px]"
                    : ""
                }`}
                style={{ minWidth: "25.45vw" }}
              >
                <FooterImageSlider
                  image={item.image}
                  text={item.text}
                />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
};

export default PhotosAndVideos;
