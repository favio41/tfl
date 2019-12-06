class App {
  constructor() {
    this.credentials = new TFLCredentials()
    this.tflRunner = new TFLRunner()
  }
  toggleExecution() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
      return this
    }
    this.interval = setInterval(async () => await this.tflRunner.tick(), 1000)
    this.tflRunner.tick()
    return this
  }
}

class TFLRunner {
  constructor() {
    this.tickCounter = 1
  }
  async tick() {
    this.tickCounter--
    if (this.tickCounter <= 0) {
      this.tickCounter = 30
      return this.load()
    }
  }
  async load() {
    this.stations = await Promise.all(
      Object.values(STATIONS)
        .map(station => new Tracknet(station).load())
    )
    new TracknetLoadedEvent(this).submit()
  }

  getStation(stationId) {
    return this.stations.find(station => station.station === stationId)
  }
}

class TFLCredentials {
  constructor() {
    if (localStorage.credentials) {
      const credentials = JSON.parse(localStorage.credentials)
      this.appId = credentials.appId
      this.appKey = credentials.appKey
      return
    }
    this.appId = prompt('Please add tfl appId')
    this.appKey = prompt('Please add tfl appKey')
    if (this.appId && this.appKey) {
      localStorage.credentials = JSON.stringify({
        appId: this.appId,
        appKey: this.appKey,
      })
    }
  }
}

class Tracknet {
  constructor(station) {
    this.station = station
  }

  async load() {
    const baseUrl = `https://api.tfl.gov.uk/TrackerNet/PredictionDetailed/C/${this.station.stationCode}`
    // const baseUrl = `http://localhost:8080/tmp/mocks/tracknet/${this.station.stationCode}.xml`
    const queryParams = `?app_id=${global.app.credentials.appId}&app_key=${global.app.credentials.appKey}`
    let { data } = await axios.get(baseUrl + queryParams)
    data = Utils.xmlParser(data)
    
    this.platforms = Utils.ensureArray(data.ROOT.S.P).map(rawPlatform => new Platform(rawPlatform))
    return this
  }
  getPlatform(trackCode) {
    return this.platforms.find(platform => platform.trackCode === trackCode)
  }
  toString() {
    return `${station.id} station`
  }
}

class Platform {
  constructor(rawPlatform) {
    this.name = rawPlatform._N
    this.trackCode = rawPlatform._TrackCode
    this.trains = Utils.ensureArray(rawPlatform.T)
      .map(rawTrain => new Train(rawTrain))
  }

  getTrainAtLocation(location) {
    return this.trains.filter(train => train.location === location).sort((tA, tB) => tA.departure.time - tB.departure.time)[0]
  }
  getTrainById(trainId){
    return this.trains.find(t => t.id === trainId)
  }
}

class Train {
  constructor(rawTrain) {
    this.id = rawTrain._SetNo
    this.location = rawTrain._Location
    this.departure = {
      time: rawTrain._DepartTime,
      arriveIn: rawTrain._TimeTo
    }
  }
}

class Utils {
  static ensureArray(element) {
    return element ? (!Array.isArray(element) ? [element] : element) : []
  }
  static xmlParser(xml) {
    return (new X2JS()).xml_str2json(xml);
//     return (new X2JS()).xml2js(xml);
  }
}
