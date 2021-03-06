//= require '2d_map/google_maps_helper'
//= require '2d_map/view_port'
//= require '2d_map/events/control'

function myMap() {
  ViewPort.setMap(new google.maps.Map(document.getElementById('map'), GoogleMapsHelper.initOptions()));

  ViewPort.setNewStyle(GoogleMapsHelper.STYLED_MAP, NewMapStyle());

  // ViewPort.addControl(google.maps.ControlPosition.TOP_CENTER, GoogleMapsHelper.areaControl());
  // ViewPort.addControl(google.maps.ControlPosition.TOP_CENTER, GoogleMapsHelper.sendCoordinateDataControl());
}

function NewMapStyle() {
  return new google.maps.StyledMapType(StyleTerrain, { name: 'Style Terrain' })
}

$(function(){
  $(document).on('click', '.js-control-mode-button', ControlEvents.changeMode);
  $(document).on('click', '.js-control-send-button', ControlEvents.createArea);
})

