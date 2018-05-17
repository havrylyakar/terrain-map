//= require '2d_map/google_maps_helper'
//= require '2d_map/view_port'

function myMap() {
  ViewPort.setMap(new google.maps.Map(document.getElementById('map'), GoogleMapsHelper.initOptions()));

  ViewPort.setNewStyle(GoogleMapsHelper.STYLED_MAP, NewMapStyle());
}

function NewMapStyle() {
  return new google.maps.StyledMapType(StyleTerrain, { name: 'Style Terrain' })
}
