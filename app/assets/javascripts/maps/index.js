//= require switchery/switchery
//= require switchery/load
//= require 3d_view/main

$(document).on('click', '.markers-way-js', SearchEvents.sendCoordinates);
$(document).on('click', '.js-download-object', SearchEvents.downloadMesh);
// $(document).on('click', '.mesh-nodes-js', SearchEvents.downloadMeshNodes);

$(document).on('change', '.js-mesh-switch', function () {
  if(this.checked) {
    Map.mesh.material = Map.getTerrainMaterial();
    Map.mesh.material.needsUpdate = true;
  }
  else {
    Map.mesh.material = Map.terrainMeshMaterial;
    Map.mesh.material.needsUpdate = true;
  };
});
