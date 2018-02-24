// search listed in the last...
export enum SearchListedIn {
  '24h' = '24h',
  '3d' = '3d',
  '7d' = '7d',
  '30d' = '30d',
  'Forever' = ''
}

export class GPSLocation {
  latitude = 48.23261;
  longitude = 16.413773;
}

// sort search records by
export enum SearchSortBy {
  Distance = '',
  Date = 'Date',
  PriceAsc = 'PriceAsc',
  PriceDesc = 'PriceDesc'
}

// radius in kilometers, 0 = everywhere
export const SearchRadius = [
  1, 2, 3, 5, 7, 10, 20, 30, 60, 100, 200, 0
];

export enum SearchCategory {
  All = 'All',
  FashionAccessories = 'FashionAccessories',
  Electronics = 'Electronics',
  SportLeisureGames = 'SportLeisureGames',
  CarsMotors = 'CarsMotors',
  Services = 'Services',
  New = 'New',
  HomeGarden = 'HomeGarden',
  BabyChild = 'BabyChild',
  MoviesBooksMusic = 'MoviesBooksMusic',
  Property = 'Property',
  Other = 'Other'
}

export interface ISearchModel {
  // full test search
  search: string;
  listedIn: SearchListedIn;
  sortBy: SearchSortBy;
  categories: SearchCategory[];
  radius: number;
  onlyMyCountry: boolean;
  latitude: number;
  longitude: number;
  minPrice: number;
  maxPrice: number;
}

export class SearchModel implements ISearchModel {
  search = '';
  listedIn = SearchListedIn.Forever;
  sortBy = SearchSortBy.Distance;
  categories = [];
  radius = 1;
  onlyMyCountry = false;
  latitude: number;
  longitude: number;
  minPrice: number;
  maxPrice: number;

  constructor(lat: number, lon: number) {
    this.latitude = lat;
    this.longitude = lon;
  }
}
