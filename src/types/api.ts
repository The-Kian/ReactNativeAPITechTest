export interface Merchant {
  name: string;
  logo_url: string;
}

export interface Offer {
  offer_id: string;
  name: string;
  price: number;
  currency_symbol: string;
  link: string;
  image?: string;
  merchant: Merchant;
}