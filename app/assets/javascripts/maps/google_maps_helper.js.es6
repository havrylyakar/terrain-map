//= require 'maps/control'
//= require 'maps/rectangle'

var GoogleMapsHelper = {
  initOptions: function () {
    return {
      center: { lat: 41.85, lng: -87.65 },
      zoom: 10,
      mapTypeId: 'terrain'
    }
  },

  applyControlOfArea: function (map, position = google.maps.ControlPosition.TOP_CENTER) {
    let applyArreaControl = Control.elementGet('Control of Area', () => {
      if (ViewPort.rectangle == null || ViewPort.rectangle.visible == false) {
        ViewPort.setRectangle();
      }
      else {
        ViewPort.clearRectangle();
      }
    });
    map.controls[position].push(applyArreaControl);
  }
}
