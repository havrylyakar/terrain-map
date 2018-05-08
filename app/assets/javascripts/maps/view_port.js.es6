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
  }
}
