export interface Genre {
  count: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  genres: Genre[];
  released: number;
  platform: string;
  rating: number;
  originalPrice: number;
  discount: number;
  discountedPrice: number;
}
