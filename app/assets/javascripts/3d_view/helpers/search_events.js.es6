var SearchEvents = {
  sendCoordinates: function(event) {
    event.preventDefault();

    let data = {
      start: AdditionalElements.positionPinIndexCell(Map.additionalObjects.startPoint),
      end: AdditionalElements.positionPinIndexCell(Map.additionalObjects.endPoint)
    }

    Loader.toggleLoader(true);

    SendAjaxData.send(this.href, SearchEvents.searchSuccessCallback,
      SearchEvents.searchFailCallback, 'GET', data);
  },

  searchSuccessCallback(result) {
    Map.layers.way = new RoadGeometry(result);
    Map.layers.way.performGroup();
    Map.scene.add(Map.layers.way.group);
    Loader.toggleLoader(false);
    View3dEvents._offPinMode();
  },

  searchFailCallback(result) {
    parseAlerts(JSON.parse(result.responseText));
    Loader.toggleLoader(false);
  }
}
