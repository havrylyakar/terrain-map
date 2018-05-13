var ViewPort = {
  map: null,
  rectangle: null,

  setRectangle: function() {
    if (ViewPort.rectangle == null) {
      ViewPort.rectangle = new Rectangle(ViewPort.map);
    }

    ViewPort.rectangle.show();
  },

  clearRectangle: function() {
    ViewPort.rectangle.hidde();
  },

  setMap: function(value) {
    ViewPort.map = value;
  },

  setTerrainMode: function () {
    ViewPort.map.setOptions(GoogleMapsHelper.terrainModeOptions());
    // ViewPort._setStyleTerrain();
  },

  setDefaultMode: function () {
   ViewPort.map.setOptions(GoogleMapsHelper.defaultModeOptions());
    // ViewPort._setDefaultStyle();
  },

  setNewStyle: function(key, value) {
    ViewPort.map.mapTypes.set(key, value);
  },

  _setStyleTerrain: function() {
    ViewPort.map.setMapTypeId(GoogleMapsHelper.STYLED_MAP);
  },

  _setDefaultStyle: function() {
    ViewPort.map.setMapTypeId(GoogleMapsHelper.DEFAULT_STYLE);
  },

  addControl: function(position, value) {
    ViewPort.map.controls[position].push(value)
  }
}
