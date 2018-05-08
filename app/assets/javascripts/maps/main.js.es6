//= require 'maps/google_maps_helper'
//= require 'maps/view_port'

function myMap() {
  ViewPort.setMap(new google.maps.Map(document.getElementById('map'), GoogleMapsHelper.initOptions()));

  GoogleMapsHelper.applyControlOfArea(ViewPort.map);
}

