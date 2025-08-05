import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProductListScreen from './ProductListScreen';
import { useFetchProducts } from '@hooks/useFetchProducts';
import { getMockApiResponse, mockModelName } from '@test-utils/mock-data';
import { transformApiData } from '@utils/apiDataTransformer';

jest.mock('@hooks/useFetchProducts');
const mockUseFetchProducts = useFetchProducts as jest.Mock;

jest.mock('@components/offers/OfferList', () => {
  const { View, Text } = require('react-native');
  return ({ title }: { title: string }) => (
    <View testID="mock-offer-list">
      <Text>{title}</Text>
    </View>
  );
});


describe('ProductListScreen', () => {
  it('should render the loading indicator when isLoading is true', () => {
    mockUseFetchProducts.mockReturnValue({
      products: [],
      title: '',
      isLoading: true,
      error: null,
    });

    render(<ProductListScreen />);

    expect(screen.getByText('Loading...')).toBeVisible();
    expect(screen.queryByTestId('mock-offer-list')).toBeNull();
    expect(screen.queryByText(/error/i)).toBeNull();
  });

  it('should render the error indicator when an error is present', () => {
    const errorMessage = 'Failed to fetch data';
    mockUseFetchProducts.mockReturnValue({
      products: [],
      title: '',
      isLoading: false,
      error: errorMessage,
    });

    render(<ProductListScreen />);

    expect(screen.getByText(errorMessage)).toBeVisible();
    expect(screen.queryByTestId('mock-offer-list')).toBeNull();
    expect(screen.queryByText('Loading...')).toBeNull();
  });

  it('should render the OfferList with products when data is fetched successfully', () => {
    const apiResponse = getMockApiResponse();
    const { products, title } = transformApiData(apiResponse, mockModelName);

    mockUseFetchProducts.mockReturnValue({
      products,
      title,
      isLoading: false,
      error: null,
    });

    render(<ProductListScreen />);

    const offerList = screen.getByTestId('mock-offer-list');
    expect(offerList).toBeVisible();
    expect(screen.getByText(title)).toBeVisible();
    
    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.queryByText(/error/i)).toBeNull();
  });
});
