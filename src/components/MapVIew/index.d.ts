import React from 'react';

type MapViewProps = {
  getZoom(): number;
  getCLat(): number;
  getCLon(): number;
  getDLat(): number;
  getDLon(): number;
  markers: Marker[];
  pathdata: number[];
};

type Marker = {
  id: number;
  name?: string;
  telNo?: number;
  frontLat?: number;
  frontLon?: number;
  noorLat?: number;
  noorLon?: number;
  upperAddrName?: number;
  middleAddrName?: number;
  lowerAddrName?: number;
  detailAddrName?: number;
  mlClass?: number;
  firstNo?: number;
  roadName?: string;
  buildingNo1?: number;
  buildingNo2?: number;
  rpFlag?: number;
  radius?: number;
  dataKind?: number;
  stId?: string;
  highHhSale?: number;
  minOilYn?: string;
  oilBaseSdt?: number;
  hhPrice?: number;
  ggPrice?: number;
  llPrice?: number;
  highHhPrice?: number;
};

export class MapView extends React.Component<MapViewProps> {}
