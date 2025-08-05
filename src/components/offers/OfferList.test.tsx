import React from 'react';
import { render, screen } from '@testing-library/react-native';
import OfferList from './OfferList';
import { Offer } from '@app-types/internal';

const mockProducts: Offer[] = [
  { offer_id: '1', name: 'Offer 1', price: 100, currency_symbol: '£', link: '', merchant: { name: '', logo_url: '' }, image: '' },
  { offer_id: '2', name: 'Offer 2', price: 200, currency_symbol: '£', link: '', merchant: { name: '', logo_url: '' }, image: '' },
];

const mockTitle = 'Test Title';

jest.mock('./OfferCard', () => {
  const { View, Text } = require('react-native');
  return ({ offer }: { offer: Offer }) => (
    <View testID="mock-offer-card">
      <Text>{offer.name}</Text>
    </View>
  );
});

describe('OfferList', () => {
  it('should render the header and the correct number of offers', () => {
    render(<OfferList products={mockProducts} title={mockTitle} />);

    expect(screen.getByText(mockTitle)).toBeVisible();

    const offerCards = screen.getAllByTestId('mock-offer-card');
    expect(offerCards).toHaveLength(mockProducts.length);

    expect(screen.getByText('Offer 1')).toBeVisible();
    expect(screen.getByText('Offer 2')).toBeVisible();
  });

  it('should display a message when there are no offers', () => {
    render(<OfferList products={[]} title={mockTitle} />);

    expect(screen.getByText('No deals found at the moment.')).toBeVisible();
    expect(screen.queryByTestId('mock-offer-card')).toBeNull();
  });

  it('should use a default header if no title is provided', () => {
    render(<OfferList products={mockProducts} title="" />);

    expect(screen.getByText('Offers')).toBeVisible();
  });
});
