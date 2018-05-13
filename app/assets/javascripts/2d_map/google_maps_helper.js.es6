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
      center: { lat: 41.85, lng: -87.65 },
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
      zoom: 15,
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
  },

  areaControl: function () {
    return Control.elementGet($('.js-control-button').html(), () => {
      if (ViewPort.rectangle == null || ViewPort.rectangle.visible == false) {
        ViewPort.setRectangle();
        ViewPort.setTerrainMode();

        $(`.${GoogleMapsHelper.SEND_COORDINATE_CONTROL_CLASS}`).removeClass('non-active');
      }
      else {
        ViewPort.clearRectangle();
        ViewPort.setDefaultMode();

        $(`.${GoogleMapsHelper.SEND_COORDINATE_CONTROL_CLASS}`).addClass('non-active');
      }
    });
  },

  sendCoordinateDataControl: function() {
    return Control.elementGet($('.js-send-control-button').html(), function(event) {
      event.preventDefault();

      let url = new URL($(this).find('a')[0].href);

      Object.keys(ViewPort.rectangle.coordinates()).map(function(objectKey, index) {
        Object.keys(ViewPort.rectangle.coordinates()[objectKey]).map(function(coordinateKey, index) {
          url.searchParams.append(`${objectKey}[${coordinateKey}]`, ViewPort.rectangle.coordinates()[objectKey][coordinateKey]);
        })
      });

      url.searchParams.append('size[height]', ViewPort.rectangle.sizeHeight());
      url.searchParams.append('size[width]', ViewPort.rectangle.sizeWidth());
      url.searchParams.append('center[lat]', ViewPort.rectangle.center().lat());
      url.searchParams.append('center[lng]', ViewPort.rectangle.center().lng());

      openModalWindowAjax(url, '#modal-window');

    }, GoogleMapsHelper.SEND_COORDINATE_CONTROL_CLASS)
  }
}


// b = {lat: 0.4184582e2, lng: -0.87646985e2}
// a = {lat: 0.41841328e2, lng: -0.87646985e2}
// google.maps.geometry.spherical.computeDistanceBetween()
