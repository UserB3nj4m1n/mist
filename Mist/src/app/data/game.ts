// export interface Game {
//   id: number;
//   title: string;
//   genre: string;
//   releaseYear: number;
//   platform: string[];
//   price: number;
//   rating: number;
//   discount: number;
//   imageUrl: string;
// }

export interface Genre {
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