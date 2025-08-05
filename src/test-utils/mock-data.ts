import { ApiResponse } from '@app-types/api';
import fullApiResponse from './__mocks__/full-api-response.json';
import noOffersResponse from './__mocks__/no-offers-response.json';
import noImageResponse from './__mocks__/no-image-response.json';

import euroCurrencyResponse from './__mocks__/euro-currency-response.json';

export const mockModelName = 'xbox_one_s';

export const getMockApiResponse = (): ApiResponse => {
  return fullApiResponse as ApiResponse;
};

export const getMockApiResponseWithNoOffers = (): ApiResponse => {
  return noOffersResponse as ApiResponse;
};

export const getMockApiResponseWithNoImage = (): ApiResponse => {
  return noImageResponse as ApiResponse;
};

export const getMockApiResponseWithEuroCurrency = (): ApiResponse => {
  return euroCurrencyResponse as ApiResponse;
};