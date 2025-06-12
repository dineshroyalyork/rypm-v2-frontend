export interface Property {
  id: string;
  address: string;
  bedCount: number;
  bathCount: number;
  price: string;
  country: string;
  city: string;
  areaSqft: number;
  parking: number;
  
  furnished: boolean;
  basement: boolean;
  closets: boolean;
  fireplace: boolean;
  centralHVAC: boolean;
  washerDryer: boolean;
  airConditioning: boolean;
  dishwasher: boolean;
  refrigerator: boolean;
  microwave: boolean;
  
  imageUrl: string;
  videoUrl?: string;
}

export interface Wishlist {
  id: string;
  name: string;
  properties: Property[];
  createdAt: string;
  updatedAt: string;
}

export interface LikedPropertiesData {
  properties: Property[];
  count: number;
}
