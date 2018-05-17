class Pin {
  constructor(color, radius) {
    this._geometry = new THREE.ConeBufferGeometry(radius, radius, 100 );
    this._geometry.rotateX( Math.PI/2 );
    this._geometry.translate( 0, 0, radius/2 );
    this._color = color;
    this._element = new THREE.Mesh(this._geometry, this._material(color));

    this._active = false;
    this._scene = null;
  }

  static selectedColor() {
    return new THREE.Color( '#FFFF00' );
  }

  static moveColor() {
    return new THREE.Color( '#EAF7A5' );
  }

  static radius() {
    let size = Map.cellSize();

    return ((size.width * 2) + (size.height * 2))/8;
  }

  get currentColor() {
    if (this.active) {
      return this.selectedColor();
    }

    return this.moveColor();
  }

  defaultColor() {
    return this._color;
  }

  get element() {
    return this._element;
  }

  get geometry() {
    return this._geometry;
  }

  get active() {
   return this._active;
  }

  set active(value) {
    this._active = value;
  }

  set scene(value) {
   this._scene = value;
  }

  get material() {
   return this._element.material;
  }

  get scene() {
    return this._scene;
  }

  compare(element) {
    return this._element.uuid == element.uuid
  }

  _material(color) {
    let mesh = new THREE.MeshBasicMaterial({ color: color });

    return mesh;
  }

  onSelect () {
    this._active = true
    this.material.color = Pin.moveColor();
  }

  onLoose () {
    this._active = false
    this.defaultMode();
  }

  moveMode() {
    this._element.material.color = Pin.selectedColor();
  }

  defaultMode() {
    this._element.material.color = new THREE.Color(this._color);
  }

  setPosition(value) {
    this._element.position.set(...value)
  }

  get position() {
    return this._element.position;
  }

  onScene() {
    return this._scene != null;
  }
}
