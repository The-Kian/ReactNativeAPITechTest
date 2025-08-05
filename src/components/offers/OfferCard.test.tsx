import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import OfferCard from './OfferCard';
import { Offer } from '@app-types/internal';

const mockOffer: Offer = {
  offer_id: '123',
  name: 'Test Offer',
  price: 99.99,
  currency_symbol: '£',
  link: 'https://example.com/deal',
  merchant: {
    name: 'Test Merchant',
    logo_url: 'https://example.com/logo.png',
  },
  image: 'https://example.com/product.png',
};

const mockProductTitle = 'Test Product';

describe('OfferCard', () => {
  it('should render the offer details correctly', () => {
    render(<OfferCard offer={mockOffer} productTitle={mockProductTitle} />);

    expect(screen.getByText(mockProductTitle)).toBeVisible();
    expect(screen.getByText('Test Merchant')).toBeVisible();
    expect(screen.getByText('£99.99')).toBeVisible();
    expect(screen.getByText('View Deal')).toBeVisible();
  });

  it('should call Linking.openURL with the correct URL when the button is pressed', () => {
    const openURLSpy = jest.spyOn(Linking, 'openURL');
    openURLSpy.mockImplementation(() => Promise.resolve());

    render(<OfferCard offer={mockOffer} productTitle={mockProductTitle} />);

    const viewDealButton = screen.getByText('View Deal');
    fireEvent.press(viewDealButton);

    expect(openURLSpy).toHaveBeenCalledWith('https://example.com/deal');

    openURLSpy.mockRestore();
  });

  it('should handle prices that need rounding to two decimal places', () => {
    const offerWithDecimalPrice: Offer = { ...mockOffer, price: 49.5 };
    render(<OfferCard offer={offerWithDecimalPrice} productTitle={mockProductTitle} />);

    expect(screen.getByText('£49.50')).toBeVisible();
  });
});
