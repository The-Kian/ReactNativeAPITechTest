// src/utils/apiDataTransformer.ts

import { ApiResponse } from "@app-types/api";
import { Offer } from "@app-types/internal";
import he from "he";

interface TransformedData {
  title: string;
  products: Offer[];
}

export const transformApiData = (
  apiResponse: ApiResponse,
  modelName: string
): TransformedData => {
  const { widget, models } = apiResponse;

  const title = widget.data.title;
  const modelId = models[modelName];
  const mainImageUrl = widget.data.model_info[modelId]?.model_image_url || "";

  const rawOffers = widget.data.offers;
  const products: Offer[] = rawOffers.slice(0, 4).map((item) => ({
    offer_id: item.match_id.toString(),
    name: item.offer.name,
    price: parseFloat(item.offer.price),
    currency_symbol: he.decode(item.offer.currency_symbol),
    link: item.offer.link,
    merchant: {
      name: item.merchant.name,
      logo_url: item.merchant.logo_url,
    },
    image: mainImageUrl,
  }));

  return { title, products };
};
