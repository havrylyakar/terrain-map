var ControlEvents = {
  SEND_COORDINATE_CONTROL_CLASS: '.js-control-send-button',

  changeMode(_event) {
    if (ViewPort.rectangle == null || ViewPort.rectangle.visible == false) {
      ViewPort.setRectangle();
      ViewPort.setTerrainMode();

      $(ControlEvents.SEND_COORDINATE_CONTROL_CLASS).attr('disabled', false);
    }
    else {
      ViewPort.clearRectangle();
      ViewPort.setDefaultMode();

      $(ControlEvents.SEND_COORDINATE_CONTROL_CLASS).attr('disabled', true);
    }
  },

  createArea(event) {
    event.preventDefault();

    let url = new URL(this.href);

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
  }
}
