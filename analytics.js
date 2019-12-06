
function getNextTrainFromEaling(stations){
  const platform = stations.getStation(STATIONS.WEST_ACTON).getPlatform('TC2209')
  return platform.getTrainAtLocation('At Ealing Broadway')
}

function getNextEmptyTrainFromNorthActon(stations){
  const trainAtPlatform = stations
    .getStation(STATIONS.NOTH_ACTON)
    .getPlatform("TC2347")
    .getTrainAtLocation('At Platform')

  if(trainAtPlatform){
    return stations
      .getStation(STATIONS.EAST_ACTON)
      .getPlatform("TC2511")
      .getTrainById(trainAtPlatform.id)
  }
}

function getNextEmptyTrainFromWhiteCity(stations){
    const trainAtPlatform = stations
    .getStation(STATIONS.WHITE_CITY)
    .getPlatform("TC2743")
    .getTrainAtLocation('At Platform')

  if(trainAtPlatform){
    return stations
      .getStation(STATIONS.SHEPARDS_BUSH)
      .getPlatform("TC2819")
      .getTrainById(trainAtPlatform.id)
  }
}


class AnalyticsService {
  static EmptyTrainCalculation(stations){
    const emptyTrainAnalyticsEvent = new EmptyTrainAnalyticsEvent()

    emptyTrainAnalyticsEvent.nextTrainFromEaling = getNextTrainFromEaling(stations)
    
    emptyTrainAnalyticsEvent.nextEmptyTrainFromNorthActon = getNextEmptyTrainFromNorthActon(stations)
    
    emptyTrainAnalyticsEvent.nextEmptyTrainFromWhiteCity = getNextEmptyTrainFromWhiteCity(stations)
    
    emptyTrainAnalyticsEvent.submit()
  }
}
