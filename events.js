
class AutoSubmitEvent extends CustomEvent {
  constructor(eventName, detail){
    super(eventName, {detail})
  }
  submit(){
    global.model.dispatchEvent(this)
  }
}

class EmptyTrainAnalyticsEvent extends AutoSubmitEvent {
  constructor(data){
    super('EmptyTrainAnalyticsEvent', data)
  }
}

class TracknetLoadedEvent extends AutoSubmitEvent {
  constructor(data){
    super('TracknetLoadedEvent', data)
  }
}