export type LocationPoint = {
  label?: string;
  lat: number;
  lng: number;
};

export type SearchOption = {
  label: string;
  value: number;
};

export type RouteSearchParam = {
  startName?: string;
  endName?: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};
