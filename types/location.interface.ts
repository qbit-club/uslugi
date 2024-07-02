export interface Location {
  name: string | null;
  geo: {
    name: string | null;
    geo_lat: string | null;
    geo_lon: string | null;
    city_with_type: string | null;
    settlement_with_type: string | null;
    region_with_type: string | null;
    area_with_type: string | null;
    capital_marker: string | null;
  };
}
