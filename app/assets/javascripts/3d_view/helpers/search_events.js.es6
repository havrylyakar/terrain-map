//= require 3d_view/OBJExporter
//= require 3d_view/helpers/export
//= require 3d_view/helpers/mesh_nodes

var SearchEvents = {
  downloadMesh: function(event) {
    event.preventDefault();

    var exporter = new THREE.OBJExporter();

    Export.saveString( exporter.parse(Map.mesh), `${this.dataset.name}.obj` );
  },

  downloadMeshNodes: function(event) {
    event.preventDefault();

    SendAjaxData.send(this.href, SearchEvents.meshNodesSuccessCallback,
      SearchEvents.searchFailCallback, 'GET');
  },

  meshNodesSuccessCallback: function(result) {
    let service = new MeshNodes(result);
    service.performGroup();

    Map.scene.add(service.group);
  },

  sendCoordinates: function(event) {
    event.preventDefault();

    let data = {
      start: AdditionalElements.positionPinIndexCell(Map.additionalObjects.startPoint),
      end: AdditionalElements.positionPinIndexCell(Map.additionalObjects.endPoint)
    }

    Loader.toggleLoader(true);

    SendAjaxData.send(this.href, SearchEvents.searchSuccessCallback,
      SearchEvents.searchFailCallback, 'GET', data);

    // SendAjaxData.send(this.dataset.test, SearchEvents.testSearchCallback,
    //   SearchEvents.searchFailCallback, 'GET', data);
  },

  searchSuccessCallback(result) {
    AdditionalElements.removeWay()
    Map.layers.way = new RoadGeometry(result);
    Map.layers.way.performGroup();
    Map.scene.add(Map.layers.way.group);

    Loader.toggleLoader(false);
    View3dEvents._offPinMode();
  },

  testSearchCallback(result) {
    AdditionalElements.removeTestWay();
    Map.layers.testWay = new RoadGeometry(result, 'black', 1000);
    Map.layers.testWay.performGroup();
    Map.scene.add(Map.layers.testWay.group);

    Loader.toggleLoader(false);
    View3dEvents._offPinMode();
  },

  searchFailCallback(result) {
    parseAlerts(JSON.parse(result.responseText));
    Loader.toggleLoader(false);
  }
}
