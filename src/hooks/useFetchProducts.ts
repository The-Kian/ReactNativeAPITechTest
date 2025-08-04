import { useState, useEffect } from "react";
import { ApiResponse } from "@app-types/api";
import { Offer } from "@app-types/internal";

const API_ENDPOINT =
  "https://search-api.fie.future.net.uk/widget.php?id=review&model_name=xbox_one_s&area=GB";
const model_name = API_ENDPOINT.split("model_name=")[1].split("&")[0];

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setTimeout(async () => {
        try {
          const response = await fetch(API_ENDPOINT);
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

          const json: ApiResponse = await response.json();

          const modelId = json.models[model_name]

          const mainImageUrl = json.widget.data.model_info[modelId]?.model_image_url;

          const rawOffers = json.widget.data.offers.slice(0, 4);

          const offers: Offer[] = rawOffers.map((item) => ({
            offer_id: item.match_id.toString(),
            name: item.offer.name,
            price: parseFloat(item.offer.price), 
            currency_symbol: item.offer.currency_symbol,
            link: item.offer.link,
            image: mainImageUrl,
            merchant: {
              name: item.merchant.name,
              logo_url: item.merchant.logo_url,
            },
          }));
          setProducts(offers);
        } catch (e) {
          setError(
            e instanceof Error ? e.message : "An unknown error occurred."
          );
          console.log(`🚀 - KP -  ~ fetchProducts ~ e.message:`, e.message);
        } finally {
          setIsLoading(false);
        }
      }, 1000); // Simulate a delay of 1 second
    };

    fetchProducts();
  }, []);
  return { products, isLoading, error };
};
