
function getNextTrainFromEaling(stations){
  const platform = stations.getStation(STATIONS.WEST_ACTON).getPlatform('TC2209')
  return platform.getTrainAtLocation('At Ealing Broadway')
}

function getNextTrainFrom(station, stations){
  return stations
    .getStation(station)
    .getPlatform(station.platforms.EASTBOUND[0])
    .trains
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
    
    emptyTrainAnalyticsEvent.nextEmptyTrainFromNorthActon = getNextEmptyTrainFromNorthActon(stations)
    
    emptyTrainAnalyticsEvent.nextEmptyTrainFromWhiteCity = getNextEmptyTrainFromWhiteCity(stations)
    
    emptyTrainAnalyticsEvent.submit()
  }

  static NextTrainCalculation(stations){
    const nextTrainAnalyticsEvent = new NextTrainAnalyticsEvent()

    const nextTrainFromEaling = getNextTrainFromEaling(stations)
    if(nextTrainFromEaling){
      nextTrainAnalyticsEvent.ealing = [nextTrainFromEaling]
    }

    Object.values(STATIONS).forEach(station => {
      if(station !== STATIONS.EALING){
        nextTrainAnalyticsEvent[station.id] = getNextTrainFrom(station, stations)
      }
    })
    nextTrainAnalyticsEvent.submit()
  }
}
