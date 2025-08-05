import { transformApiData } from './apiDataTransformer';
import {
  getMockApiResponse,
  getMockApiResponseWithNoOffers,
  getMockApiResponseWithNoImage,
  getMockApiResponseWithEuroCurrency,
  mockModelName,
} from '../test-utils/mock-data';

describe('transformApiData', () => {
  it('should transform the API response correctly', () => {
    const apiResponse = getMockApiResponse();
    const { title, products } = transformApiData(apiResponse, mockModelName);

    expect(title).toBe('Microsoft Xbox One S');
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual({
      offer_id: '108853847',
      name: 'Amazon UK View Similar',
      price: 0,
      currency_symbol: '£',
      link: 'https://target.georiot.com/Proxy.ashx?tsid=8428&GR_URL=https%3A%2F%2Fwww.amazon.co.uk%2Fs%2Fref%3Dnb_sb_noss%3Fa%3Db%26field-keywords%3DMicrosoft+Xbox+One+S%26tag%3Dhawk-future-21%26ascsubtag%3Dhawk-custom-tracking-21',
      merchant: { name: 'Amazon', logo_url: 'https://images.fie.futurecdn.net/logos/merchants/amazon-uk-14606342093191-100-80.png.webp' },
      image: 'https://images.fie.futurecdn.net/logos/models/7yla0fkngi3knrli-16019803836296.jpg',
    });
  });

  it('should handle an empty offers array', () => {
    const apiResponse = getMockApiResponseWithNoOffers();
    const { products } = transformApiData(apiResponse, mockModelName);

    expect(products).toHaveLength(0);
  });

  it('should handle a missing model image URL', () => {
    const apiResponse = getMockApiResponseWithNoImage();
    const { products } = transformApiData(apiResponse, mockModelName);

    expect(products[0].image).toBe('');
  });

  it('should decode HTML entities in the currency symbol', () => {
    const apiResponse = getMockApiResponseWithEuroCurrency();
    const { products } = transformApiData(apiResponse, mockModelName);

    expect(products[0].currency_symbol).toBe('€');
  });

  it('should return an empty array if the model name is not found', () => {
    const apiResponse = getMockApiResponse();
    const { products } = transformApiData(apiResponse, 'non_existent_model');
    expect(products).toHaveLength(0);
  });
});