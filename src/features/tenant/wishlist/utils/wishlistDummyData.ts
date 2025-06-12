import { Property, Wishlist, LikedPropertiesData } from '../types/wishlist.types';

export const dummyProperties: Property[] = [
  {
    id: 'prop1',
    address: '704-75 Portland St., Toronto, ON, M5V 2M9, Canada',
    bedCount: 2,
    bathCount: 2,
    price: '$2,500/month',
    country: 'Canada',
    city: 'Toronto',
    areaSqft: 850,
    parking: 1,
    furnished: true,
    basement: false,
    closets: true,
    fireplace: true,
    centralHVAC: true,
    washerDryer: true,
    airConditioning: true,
    dishwasher: true,
    refrigerator: true,
    microwave: true,
    imageUrl: '/images/property5.png'
  },
  {
    id: 'prop2',
    address: '123 King St W, Toronto, ON, M5H 1A1, Canada',
    bedCount: 1,
    bathCount: 1,
    price: '$1,800/month',
    country: 'Canada',
    city: 'Toronto',
    areaSqft: 600,
    parking: 0,
    furnished: false,
    basement: true,
    closets: true,
    fireplace: false,
    centralHVAC: true,
    washerDryer: false,
    airConditioning: true,
    dishwasher: false,
    refrigerator: true,
    microwave: true,
    imageUrl: '/images/property2.png'
  },
  {
    id: 'prop3',
    address: '456 Bay St, Toronto, ON, M5G 2C2, Canada',
    bedCount: 3,
    bathCount: 2,
    price: '$3,200/month',
    country: 'Canada',
    city: 'Toronto',
    areaSqft: 1200,
    parking: 2,
    furnished: true,
    basement: false,
    closets: true,
    fireplace: true,
    centralHVAC: true,
    washerDryer: true,
    airConditioning: true,
    dishwasher: true,
    refrigerator: true,
    microwave: true,
    imageUrl: '/images/property3.png'
  },
  {
    id: 'prop4',
    address: '789 Queen St E, Toronto, ON, M4M 1H5, Canada',
    bedCount: 2,
    bathCount: 1,
    price: '$2,100/month',
    country: 'Canada',
    city: 'Toronto',
    areaSqft: 750,
    parking: 1,
    furnished: false,
    basement: true,
    closets: true,
    fireplace: false,
    centralHVAC: false,
    washerDryer: true,
    airConditioning: false,
    dishwasher: true,
    refrigerator: true,
    microwave: true,
    imageUrl: '/images/property4.png'
  }
];

export const likedPropertiesData: LikedPropertiesData = {
  properties: dummyProperties,
  count: 20 
};

export const dummyWishlists: Wishlist[] = [
  {
    id: 'wl1',
    name: 'Dream Homes',
    properties: [dummyProperties[0], dummyProperties[1]],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'wl2',
    name: 'Downtown Apartments',
    properties: [dummyProperties[2]],
    createdAt: '2024-01-12T15:30:00Z',
    updatedAt: '2024-01-12T15:30:00Z'
  },
  {
    id: 'wl3',
    name: 'Budget Friendly',
    properties: [dummyProperties[3], dummyProperties[1], dummyProperties[0]],
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z'
  }
];
