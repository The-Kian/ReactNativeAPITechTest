import { useState, useEffect } from "react";
import { Offer, ApiResponse } from "@app-types/api";

const API_ENDPOINT =
  "https://search-api.fie.future.net.uk/widget.php?id=review&model_name=xbox_one_s&area=GB";

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
          const offers = json.widget.data.offers.slice(0, 4);
          setProducts(offers);
        } catch (e) {
          setError(
            e instanceof Error ? e.message : "An unknown error occurred."
          );
        } finally {
          setIsLoading(false);
        }
      }, 10000); // Simulate a delay of 1 second
    };

    fetchProducts();
  }, []);
  return { products, isLoading, error };
};
