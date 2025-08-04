import { Offer } from '@app-types/api';

export const MOCK_OFFERS: Offer[] = [
  {
    offer_id: '1',
    name: 'Microsoft Xbox One S 500GB Console - White (Dummy Data)',
    price: 249.99,
    currency_symbol: '£',
    link: 'https://www.google.com',
    image: 'https://images.fie.futurecdn.net/logos/models/7yla0fkngi3knrli-16019803836296-100-80.jpg.webp',
    merchant: {
      name: 'Mock Merchant 1',
      logo_url: 'https://images.pricerunner.com/images/logos/shop_312_logo.gif',
    },
  },
  {
    offer_id: '2',
    name: 'Xbox One S 1TB with a Second Controller',
    price: 299.0,
    currency_symbol: '£',
    link: 'https://www.google.com',
    image: 'https://images.pricerunner.com/product/200x200/3000958195/Xbox-One-S-1TB-Starter-Bundle.jpg',
    merchant: {
      name: 'Mock Merchant 2',
      logo_url: 'https://images.pricerunner.com/images/logos/shop_527_logo.gif',
    },
  },
];