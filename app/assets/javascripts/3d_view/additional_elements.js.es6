//= require 3d_view/pin/pin

var AdditionalElements = {
  startPoint: null,
  endPoint: null,

  _initElements() {
    this.startPoint = new Pin('#00400E', Pin.radius());
    this.endPoint = new Pin('#FF0000', Pin.radius());
  },

  addStartPoint() {
    this.addPointToScene(this.startPoint, Map.scene);
  },

  addEndPoint() {
    this.addPointToScene(this.endPoint, Map.scene);
  },

  removeWay() {
    if (Map.layers.way){
      Map.scene.remove(Map.layers.way._group);
      Map.layers.way = null;
    }
  },

  removeTestWay() {
    if (Map.layers.testway){
      Map.scene.remove(Map.layers.testway._group);
      Map.layers.testway = null;
    }
  },

  addPointToScene(pin, scene) {
    let intersect = View3dEvents.firstMeshIntersect();

    if (intersect != null) {
      pin.element.position.copy(intersect.point);
      pin.element.lookAt( intersect.face.normal );
      pin.element.rotateX(Math.PI);

      scene.add(pin.element);
      pin.scene = scene;
    }
  },

  removePoint(pin) {
    pin.scene.remove(pin.element)
    pin.scene = null;
  },

  defaultMode() {
    this.startPoint.defaultMode();
    this.endPoint.defaultMode();
  },

  activePin(element) {
    return [this.startPoint, this.endPoint].find((el) => { return el.element.uuid == element.uuid });
  },

  someActive() {
   return [this.startPoint, this.endPoint].find((el) => { return el.active })
   // return (this.startPoint.active || this.endPoint.active);
  },

  positionPinIndexCell (pin) {
    if (!pin.onScene()) return {}

    return {
      i: Math.ceil(pin.position.x / Map.cellSize().width) - 1,
      j: Math.ceil(pin.position.z / Map.cellSize().height) - 1
    }
  }
}
