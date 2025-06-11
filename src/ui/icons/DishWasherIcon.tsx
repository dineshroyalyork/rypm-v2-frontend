import React from 'react';

interface DishWasherIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const DishWasherIcon = ({ 
  width = 24, 
  height = 24, 
  className = '',
  color = '#F8F9FB' 
}: DishWasherIconProps) => {
  return (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="12" fill={color}/>
<path d="M19.9995 8.3456H4.48242V5.44822C4.48242 4.91481 4.91481 4.48242 5.44822 4.48242H19.0337C19.5671 4.48242 19.9995 4.91481 19.9995 5.44822V8.3456Z" stroke="#001D3D" strokeWidth="0.965795" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.9995 8.3457H4.48242V19.0338C4.48242 19.5672 4.91481 19.9996 5.44822 19.9996H19.0337C19.5671 19.9996 19.9995 19.5672 19.9995 19.0338V8.3457Z" stroke="#001D3D" strokeWidth="0.965795" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.0684 18.0681V10.2773L6.41443 10.2773L6.41443 18.0681H18.0684Z" stroke="#001D3D" strokeWidth="0.965795" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.8833 4.48242H10.5996V6.41401H13.8833V4.48242Z" stroke="#001D3D" strokeWidth="0.965795" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.8501 18.0683H10.6308C9.56402 18.0683 8.69922 17.2035 8.69922 16.1367H15.7817C15.7817 17.2035 14.9169 18.0683 13.8501 18.0683Z" stroke="#001D3D" strokeWidth="0.965795" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.8501 16.1367H10.6308C9.56402 16.1367 8.69922 15.2719 8.69922 14.2051H15.7817C15.7817 15.2719 14.9169 16.1367 13.8501 16.1367Z" stroke="#001D3D" strokeWidth="0.965795" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.8501 14.205H10.6308C9.56402 14.205 8.69922 13.3402 8.69922 12.2734H15.7817C15.7817 13.3402 14.9169 14.205 13.8501 14.205Z" stroke="#001D3D" strokeWidth="0.965795" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
)};

export default DishWasherIcon;