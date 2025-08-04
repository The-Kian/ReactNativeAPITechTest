

interface RawOfferDetails {
  name: string;
  price: string; 
  currency_symbol: string;
  link: string;
}
interface RawMerchant {
  id: number;
  name: string;
  logo_url: string;
}

interface RawApiOffer {
  match_id: number;
  image: string | null;
  offer: RawOfferDetails;
  merchant: RawMerchant;
}

interface ModelInfo {
  id: number;
  model_name: string;
  model_image_url: string;
}

export interface ApiResponse {
  widget: {
    data: {
      model_info: { [key: string]: ModelInfo };
      offers: RawApiOffer[];
    };
  };
  models: {
    [key: string]: number;
  };
}
