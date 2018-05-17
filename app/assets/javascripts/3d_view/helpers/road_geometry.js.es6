class RoadGeometry {
  constructor(positions) {
    this._geometry = new THREE.SphereBufferGeometry( Pin.radius() / 2, 9, 6 );
    // this._geometry.rotateX( Math.PI / 2 );
    this._positions = positions;
    this._group = new THREE.Group();
    this._material = new THREE.MeshBasicMaterial({color: 'yellow'});
  }

  performGroup() {
    let geometry = this.geometry,
        material = this.material,
        group = this.group;

    this.positions.forEach((point) => {
      let mesh = new THREE.Mesh(geometry, material);

      mesh.position.setX(point.x);
      mesh.position.setY(point.z * Map.worlSettings.elevationCoeficient);
      mesh.position.setZ(point.y);

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

}
