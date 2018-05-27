class RoadGeometry {
  constructor(positions, color = 'yellow', yPlus = Pin.radius()) {
    this._geometry = new THREE.SphereBufferGeometry( Pin.radius() / 2, 9, 6 );
    this._positions = positions;
    this._group = new THREE.Group();
    this._material = new THREE.MeshBasicMaterial({color: color});
    this.yPlus = yPlus;
  }

  performGroup() {
    let geometry = this.geometry,
        material = this.material,
        group = this.group;

    this.positions.forEach((point) => {
      let mesh = new THREE.Mesh(geometry, material);

      mesh.position.setX(point.x);
      mesh.position.setY((point.z * Map.worlSettings.elevationCoeficient) + this.yPlus);
      mesh.position.setZ(point.y);

      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();

      group.add( mesh );
    });
  }

  get group() {
    return this._group;
  }

  get positions() {
    return this._positions;
  }

  get geometry() {
    return this._geometry;
  }

  get material() {
    return this._material;
  }

  get visible() {
    return this.group.visible;
  }

  hide() {
    this.group.visible = false
  }

  show() {
    this.group.visible = true
  }
}
