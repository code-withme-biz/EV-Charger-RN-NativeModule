export const TMAP_SEARCH_PARASMS = {
  roadType: {
    nearestRoad: 32,
    generalRoad: 16,
    underpass: 8,
    overpass: 4,
    urbanHighway: 2,
    expressway: 1,
    notSelected: 0,
  },
  directionOption: {
    priority: 1,
    nonPriority: 0,
  },
  carType: {
    notSelected: 0,
    passengerCar: 1,
    mediumVan: 2,
    largeVan: 3,
    specialVan: 5,
    lightVehicle: 6,
    twoWheeledVehicle: 7,
  },
  searchOption: {
    optimalTransportation: {
      recommendation: 0,
      freePriority: 1,
      minimumTime: 2,
      beginner: 3,
      highway: 4,
    },
    shortestDistance: 10,
    twoWheeledRoadwayLine: 12, //(If there is no general road, it is possible to guide to a car-only road.)
    optimalTraffic: 19,
  },
  trafficInfo: {
    YES: `Y`,
    NO: `N`,
  },
};
