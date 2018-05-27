var View3dEvents = {
  onMouseMove(event) {
    Map.mouse.x = ( event.clientX / Map.renderer.domElement.clientWidth ) * 2 - 1;
    Map.mouse.y = - ( event.clientY / Map.renderer.domElement.clientHeight ) * 2 + 1;


    let intersect = View3dEvents.firstMeshIntersect();
    if (Map.pinMode && AdditionalElements.someActive()) {
      if ( intersect != null ){
        View3dEvents._intersectPoint(AdditionalElements.someActive().element, intersect);
        if(Map.layers.way) Map.layers.way.hide();
      }
    }
  },

  onMouseDown(event) {
    if (Map.pinMode){
      if (!Map.INTERSECTED && !AdditionalElements.someActive()) {
        if (Map.additionalObjects.startPoint.scene == null) {
          Map.additionalObjects.addStartPoint();
        } else if (Map.additionalObjects.startPoint.scene !== null && Map.additionalObjects.endPoint.scene == null) {
          Map.additionalObjects.addEndPoint();
        } else if (Map.additionalObjects.startPoint.scene !== null && Map.additionalObjects.endPoint.scene !== null) {
          Map.additionalObjects.removePoint(Map.additionalObjects.endPoint);
          Map.additionalObjects.removePoint(Map.additionalObjects.startPoint);
          Map.additionalObjects.removeWay();
        }
      } else {
        let pin = AdditionalElements.activePin(Map.INTERSECTED) || AdditionalElements.someActive();
        if (!pin.active) {
          pin.onSelect()
        }
        else {
          pin.onLoose()
          if (Map.layers.way) $('.markers-way-js').click();
        }
      }
    }
  },

  firstMeshIntersect() {
    let intersects = Map.raycaster.intersectObject(Map.mesh);

    return intersects[0];
  },

  onKeyDown(event) {
    switch ( event.keyCode ) {
      case 80: /*P*/ View3dEvents._triggerPinMode(); break;
    }
  },

  _triggerPinMode() {
    if (Map.pinMode ) {
      View3dEvents._offPinMode();
    }
    else View3dEvents._onPinMode();
  },

  _onPinMode () {
    Map.pinMode = true;
    $('.js-active-pin').show();
    View3dEvents.offActiveLook();
  },

  _offPinMode() {
    Map.pinMode = false;
    $('.js-active-pin').hide();
  },

  _intersectPoint(element, intersect) {
    element.position.set( 0, 0, 0 );
    element.lookAt( intersect.face.normal );
    element.position.copy( intersect.point );
  },

  _intersectionEvent() {
    Map.raycaster.setFromCamera( Map.mouse, Map.camera );

    let intersects = Map.raycaster.intersectObjects([Map.additionalObjects.startPoint.element, Map.additionalObjects.endPoint.element]);

    if (intersects.length > 0) {
      if ( Map.INTERSECTED != intersects[0].object ) {
        if ( Map.INTERSECTED ) Map.INTERSECTED.material.color = Map.INTERSECTED.currentHex;

        Map.INTERSECTED = intersects[ 0 ].object;
        Map.INTERSECTED.currentHex = Map.INTERSECTED.material.color;
        Map.INTERSECTED.material.color = Pin.selectedColor();
      }
    }
    else {
      if ( Map.INTERSECTED ) Map.INTERSECTED.material.color = Map.INTERSECTED.currentHex;
      Map.INTERSECTED = null;
    }
  },

  offActiveLook() {
    Map.controls.activeLook = false
    $('.js-active-look').hide();
  }
}
