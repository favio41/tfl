var STATIONS = {
  EALING: {
    id: 'ealing',
    stopPointId: '940GZZLUEBY',
    stationCode: 'EBY',
    platforms: {
      EASTBOUND: ["TC2012", "TC2007"],
    },
    nextStation: 'WEST_ACTON'
  },
  WEST_ACTON: {
    id: 'westActon',
    stopPointId: '940GZZLUWTA',
    stationCode: 'WAC',
    platforms: {
      EASTBOUND: ['TC2209'],
    },
    nextStation: 'NOTH_ACTON'
  },
  NOTH_ACTON: {
    id: 'nothActon',
    stopPointId: '940GZZLUNAN',
    stationCode: 'NAC',
    platforms: {
      EASTBOUND: ['TC2325', 'TC2347'],
      EMPTY_TRAIN: ['TC2347']
    },
    nextStation: 'EAST_ACTON'
  },
  EAST_ACTON: {
    id: 'eastActon',
    stopPointId: '940GZZLUEAN',
    stationCode: 'EAC',
    platforms: {
      EASTBOUND: ['TC2511'],
    },
    nextStation: 'WHITE_CITY'
  },
  WHITE_CITY: {
    id: 'whiteCity',
    stopPointId: '940GZZLUWCY',
    stationCode: 'WCT',
    platforms: {
      EASTBOUND: ['TC2627', 'TC2743'],
      EMPTY_TRAIN: ['TC2743']
    },
    nextStation: 'SHEPARDS_BUSH'
  },
  SHEPARDS_BUSH: {
    id: 'shepardsBush',
    stopPointId: '940GZZLUSBC',
    stationCode: 'SBC',
    platforms: {
      EASTBOUND: ['TC2819'],
    }
  },
}
