global = {
  model: new EventTarget(),
  app: new App()
}


function onLoad() {
  global.model.addEventListener(EmptyTrainAnalyticsEvent.name, (event) => {
    console.log('EmptyTrainAnalyticsEvent received', event)
    
    if(event.nextTrainFromEaling){
      nextTrainFromEaling.innerText = `Next train departs from Ealing Broadway at: ${event.nextTrainFromEaling.departure.time}`
    } else {
      nextTrainFromEaling.innerText = 'No trains waiting at Ealing Broadway'
    }

    if(event.nextEmptyTrainFromNorthActon){
      nextEmptyTrainFromNorthActon.innerText = `Empty train at North Acton departs at: ${event.nextEmptyTrainFromNorthActon.departure.time}`
    } else {
      nextEmptyTrainFromNorthActon.innerText = 'No empty trains at North Acton'
    }
    
    if(event.nextEmptyTrainFromWhiteCity){
      nextEmptyTrainFromWhiteCity.innerText = `Empty train at White City departs at: ${event.nextEmptyTrainFromWhiteCity.departure.time}`
    } else {
      nextEmptyTrainFromWhiteCity.innerText = 'No empty trains at White City'
    }  
  })

  global.model.addEventListener(TracknetLoadedEvent.name, (customEvent) => {
    AnalyticsService.EmptyTrainCalculation(customEvent.detail)
  })
  
  global.app.toggleExecution()
}
