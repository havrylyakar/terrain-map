//= require '2d_map/control'
//= require '2d_map/rectangle'
//= require '2d_map/style/terrain'
//= require '2d_map/style/default'

var GoogleMapsHelper = {
  STYLED_MAP: 'styled_map',
  DEFAULT_STYLE: 'terrain',
  SEND_COORDINATE_CONTROL_CLASS: 'js-coordinate-control',


  initOptions: function () {
    return {
      center: { lat: 48.16022491, lng: 24.49998093 },
      zoom: 12,
      mapTypeId: 'terrain',
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: GoogleMapsHelper.mapTypes()
      }
    }
  },

  terrainModeOptions: function () {
    return {
      zoomControl: false,
      scaleControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      zoom: 14,
      styles: StyleTerrain,
    }
  },

  defaultModeOptions: function () {
    return {
      zoomControl: true,
      scaleControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      styles: StyleDefault
    }
  },

  mapTypes: function() {
    return [
      GoogleMapsHelper.DEFAULT_STYLE,
      GoogleMapsHelper.STYLED_MAP
    ]
  }
}


// b = {lat: 0.4184582e2, lng: -0.87646985e2}
// a = {lat: 0.41841328e2, lng: -0.87646985e2}
// google.maps.geometry.spherical.computeDistanceBetween()
