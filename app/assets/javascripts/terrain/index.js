//= require 'maps/google_maps_helper'
//= require 'maps/view_port'

function myMap() {
  ViewPort.setMap(new google.maps.Map(document.getElementById('map'), GoogleMapsHelper.initOptions()));

  ViewPort.setNewStyle(GoogleMapsHelper.STYLED_MAP, NewMapStyle());

  ViewPort.addControl(google.maps.ControlPosition.TOP_CENTER, GoogleMapsHelper.areaControl());
  ViewPort.addControl(google.maps.ControlPosition.TOP_CENTER, GoogleMapsHelper.sendCoordinateDataControl());
}

function NewMapStyle() {
  return new google.maps.StyledMapType(StyleTerrain, { name: 'Style Terrain' })
}
