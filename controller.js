global = {
  model: new EventTarget(),
  app: new App()
}


function onLoad() {
  global.model.addEventListener(TracknetLoadedEvent.name, (customEvent) => {
    AnalyticsService.EmptyTrainCalculation(customEvent.detail)
    AnalyticsService.NextTrainCalculation(customEvent.detail)
  })

  global.model.addEventListener(EmptyTrainAnalyticsEvent.name, (event) => {
    console.log('EmptyTrainAnalyticsEvent received', event)

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

  global.model.addEventListener(NextTrainAnalyticsEvent.name, (event) => {
    console.log('NextTrainAnalyticsEvent received', event)
    Object.values(STATIONS).forEach(station => {
      let message = `<pre>${station.id}: \n`;
      (event[station.id] || []).forEach(train => {
         message += `(${train.id})${train.location} ${train.departure.time} +${train.departure.arriveIn}\n`;
      })
      message += '</pre>'
      document.querySelector(`#nextTrainAt_${station.id}`).innerHTML = message
        
    })

  })

  global.app.toggleExecution()
}
