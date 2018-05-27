class MeshNodes {
  constructor(nodes) {
    this._geometry = new THREE.SphereBufferGeometry( 1, 8, 6 );
    this._nodes = nodes;
    this._group = new THREE.Group();
    this._material = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff });
  }

  performGroup() {
   this._nodes.forEach((i_points) => {
      i_points.forEach((j_points) => {
        j_points.forEach((point) => {
          let mesh = new THREE.Mesh(this._geometry, this._material);

          mesh.position.setX(point.x);
          mesh.position.setY(point.z);
          mesh.position.setZ(point.y);

          mesh.matrixAutoUpdate = false;
          mesh.updateMatrix();

          this._group.add( mesh );
        });
      })
   });
  }

  get group() {
    return this._group;
  }
}
