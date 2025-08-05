// src/hooks/useFetchProducts.ts

import { useState, useEffect } from "react";
import { Offer } from "@app-types/internal";
import { transformApiData } from "@utils/apiDataTransformer";

const API_BASE_URL =
  "https://search-api.fie.future.net.uk/widget.php?id=review&area=GB";

export const useFetchProducts = (modelName: string) => {
  const [products, setProducts] = useState<Offer[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!modelName) {
      setIsLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}&model_name=${modelName}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const json = await response.json();
        const { title: newTitle, products: newProducts } = transformApiData(
          json,
          modelName
        );

        setTitle(newTitle);
        setProducts(newProducts);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [modelName]);

  return { products, title, isLoading, error };
};
