export interface Genre {
  count: number;
  name: string;
}

export interface Platform {
  abbreviation: string;
}

export interface Game {
  id: number;
  name: string;
  cover: {url: string};
  genres: Genre[];
  release_dates: { human: string }[];
  platforms: Platform[];
  rating_star: number;
  summary: string;
  storyline: string;
  screenshots: { url: string}
  originalPrice: number;
  discount: number;
  discountedPrice: number;
}
