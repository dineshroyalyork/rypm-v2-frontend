'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveMainTab } from '@/features/tenant/tenantprofile/slices/tenantSlice';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HomeIcon, ChatsIcon, PercentageIcon } from './icons';
import { RootState } from '@/store/rootReducer';
import LogoIcon from './icons/Logo';

const BottomNavigation = () => {
  const dispatch = useDispatch();
  const activeMainTab = useSelector((state: RootState) => state.tenant.activeMainTab || 'Properties');
  const [prevTab, setPrevTab] = useState<string | null>(null);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const tabOrder = ['Properties', 'Discounts', 'Reels', 'Chats', 'Profile'];

  const handleTabChange = (tab: string) => {
    if (activeMainTab !== tab) {
      setPrevTab(activeMainTab);
      
      const currentIndex = tabOrder.indexOf(activeMainTab);
      const newIndex = tabOrder.indexOf(tab);
      
      if (currentIndex < newIndex) {
        setDirection('right');
      } else {
        setDirection('left');
      }
      
      dispatch(setActiveMainTab(tab));
    }
  };

  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => {
        setDirection(null);
      }, 500); 
      
      return () => clearTimeout(timer);
    }
  }, [direction]);

  const getNotchPosition = () => {
    const tabIndex = tabOrder.indexOf(activeMainTab);
    const positions = ['10%', '30%', '50%', '70%', '90%'];
    return positions[tabIndex] || '10%';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div 
        className="absolute bottom-0 left-0 right-0 h-[60px] max-w-[480px] mx-auto transition-all duration-300 "
        style={{
          borderRadius: '5px 5px 0 0',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0,29,61,0.5)',
          '--r': '12px',
          '--s': '30px',
          '--a': '8deg',
          '--p': getNotchPosition(),
          '--_m': 'var(--r), #000 calc(100% - 1px), transparent',
          '--_d': 'calc((var(--s) + var(--r)) * cos(var(--a)))',
          mask: `
            radial-gradient(var(--r) at calc(var(--p) + var(--_d)) var(--_m)),
            radial-gradient(var(--r) at calc(var(--p) - var(--_d)) var(--_m)),
            radial-gradient(var(--s) at var(--p) calc(-1 * sin(var(--a)) * var(--s)), transparent 100%, #000 calc(100% + 1px)) 0 calc(var(--r) * (1 - sin(var(--a)))) no-repeat,
            linear-gradient(90deg, #000 calc(var(--p) - var(--_d)), transparent 0 calc(var(--p) + var(--_d)), #000 0)
          `,
          WebkitMask: `
            radial-gradient(var(--r) at calc(var(--p) + var(--_d)) var(--_m)),
            radial-gradient(var(--r) at calc(var(--p) - var(--_d)) var(--_m)),
            radial-gradient(var(--s) at var(--p) calc(-1 * sin(var(--a)) * var(--s)), transparent 100%, #000 calc(100% + 1px)) 0 calc(var(--r) * (1 - sin(var(--a)))) no-repeat,
            linear-gradient(90deg, #000 calc(var(--p) - var(--_d)), transparent 0 calc(var(--p) + var(--_d)), #000 0)
          `
        } as React.CSSProperties}
      />

      {/* Navigation Content */}
      <div className="h-[70px] left-0 right-0 max-w-[480px] mx-auto flex relative z-10 ">
        
        {/* Properties Tab */}
        <div className='flex flex-col items-center justify-center text-gray-600 flex-1 h-full'>
          <button 
            className="flex justify-center items-center relative w-[46px] h-[46px]"
            style={{
              transform: activeMainTab === 'Properties' ? 'translateY(-18px)' : 'translateY(0px)',
              transition: 'transform 0.6s ease'
            }}
            onClick={() => handleTabChange('Properties')}
            aria-label="Properties"
          >
            {activeMainTab === 'Properties' && (
              <div className={`absolute -z-10 w-[46px] h-[46px] bg-[#001D3D] rounded-full opacity-90 transition-all duration-600 ${
                direction === 'left' ? 'animate-slide-from-right' : direction === 'right' ? 'animate-slide-from-left' : ''
              }`}></div>
            )}
            <HomeIcon className={activeMainTab === 'Properties' ? 'text-white' : 'text-gray-400'} />
          </button>
          {activeMainTab === 'Properties' && (
            <span className="text-[10px] mt-1 text-center font-bold leading-[160%] capitalize text-white absolute bottom-1">
              Properties
            </span>
          )}
        </div>

        {/* Discounts Tab */}
        <div className='flex flex-col items-center justify-center text-gray-600 flex-1 h-full'>
          <button 
            className="flex justify-center items-center relative w-[46px] h-[46px]"
            style={{
              transform: activeMainTab === 'Discounts' ? 'translateY(-18px)' : 'translateY(0px)',
              transition: 'transform 0.6s ease'
            }}
            onClick={() => handleTabChange('Discounts')}
            aria-label="Discounts"
          >
            {activeMainTab === 'Discounts' && (
              <div className={`absolute -z-10 w-[46px] h-[46px] bg-[#001D3D] rounded-full opacity-90 transition-all duration-600 ${
                direction === 'left' ? 'animate-slide-from-right' : direction === 'right' ? 'animate-slide-from-left' : ''
              }`}></div>
            )}
            <PercentageIcon 
              height={24} 
              width={24} 
              className={activeMainTab === 'Discounts' ? 'text-white' : 'text-gray-400'} 
            />
          </button>
          {activeMainTab === 'Discounts' && (
            <span className="text-[10px] mt-1 text-center font-bold leading-[160%] capitalize text-white absolute bottom-1">
              Discounts
            </span>
          )}
        </div>

        {/* Reels Tab */}
        <div className='flex flex-col items-center justify-center text-gray-600 flex-1 h-full'>
          <button 
            className="flex justify-center items-center relative w-[46px] h-[46px]"
            style={{
              transform: activeMainTab === 'Reels' ? 'translateY(-18px)' : 'translateY(0px)',
              transition: 'transform 0.6s ease'
            }}
            onClick={() => handleTabChange('Reels')}
            aria-label="Reels"
          >
            {activeMainTab === 'Reels' && (
              <div className={`absolute -z-10 w-[46px] h-[46px] bg-[#001D3D] rounded-full opacity-90 transition-all duration-600 ${
                direction === 'left' ? 'animate-slide-from-right' : direction === 'right' ? 'animate-slide-from-left' : ''
              }`}></div>
            )}
            <LogoIcon 
              height={24} 
              width={24} 
              className={activeMainTab === 'Reels' ? 'text-white' : 'text-gray-400'} 
            />
          </button>
          {activeMainTab === 'Reels' && (
            <span className="text-[10px] mt-1 text-center font-bold leading-[160%] capitalize text-white absolute bottom-1">
              Reels
            </span>
          )}
        </div>

        {/* Chats Tab */}
        <div className='flex flex-col items-center justify-center text-gray-600 flex-1 h-full'>
          <button 
            className="flex justify-center items-center relative w-[46px] h-[46px]"
            style={{
              transform: activeMainTab === 'Chats' ? 'translateY(-18px)' : 'translateY(0px)',
              transition: 'transform 0.6s ease'
            }}
            onClick={() => handleTabChange('Chats')}
            aria-label="Chats"
          >
            {activeMainTab === 'Chats' && (
              <div className={`absolute -z-10 w-[46px] h-[46px] bg-[#001D3D] rounded-full opacity-90 transition-all duration-600 ${
                direction === 'left' ? 'animate-slide-from-right' : direction === 'right' ? 'animate-slide-from-left' : ''
              }`}></div>
            )}
            <ChatsIcon className={activeMainTab === 'Chats' ? 'text-white' : 'text-gray-400'} />
          </button>
          {activeMainTab === 'Chats' && (
            <span className="text-[10px] mt-1 text-center font-bold leading-[160%] capitalize text-white absolute bottom-1">
              Chats
            </span>
          )}
        </div>

        {/* Profile Tab */}
        <div className='flex flex-col items-center justify-center text-gray-600 flex-1 h-full'>
          <button 
            className="flex justify-center items-center relative w-[46px] h-[46px]"
            style={{
              transform: activeMainTab === 'Profile' ? 'translateY(-18px)' : 'translateY(0px)',
              transition: 'transform 0.6s ease'
            }}
            onClick={() => handleTabChange('Profile')}
            aria-label="Profile"
          >
            {activeMainTab === 'Profile' && (
              <div className={`absolute -z-10 w-[46px] h-[46px] bg-[#001D3D] rounded-full opacity-90 transition-all duration-600 ${
                direction === 'left' ? 'animate-slide-from-right' : direction === 'right' ? 'animate-slide-from-left' : ''
              }`}></div>
            )}
            <div className={`w-[30px] h-[30px] rounded-full overflow-hidden border-2 ${
              activeMainTab === 'Profile' ? 'border-white' : 'border-gray-300'
            }`}>
              <Image 
                src="/images/testimonial-client-01 1.png" 
                alt="Profile" 
                width={30} 
                height={30} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </button>
          {activeMainTab === 'Profile' && (
            <span className="text-[10px] mt-1 text-center font-bold leading-[160%] capitalize text-white absolute bottom-1">
              Profile
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
