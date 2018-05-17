//= require three.min
//= require 3d_view/detector
//= require 3d_view/improved_noise
//= require 3d_view/first_person_controls
//= require 3d_view/helpers/events
//= require 3d_view/additional_elements
//= require 3d_view/helpers/search_events
//= require 3d_view/helpers/road_geometry
//= require 3d_view/THREE.Terrain

var Map = {
  container: null,
  camera: null,
  controls: null,
  scene: null,
  renderer: null,
  data: null,
  layers: {},
  arrayData: [],
  clock: new THREE.Clock(),
  raycaster: new THREE.Raycaster(),
  mouse: new THREE.Vector2(),
  additionalObjects: AdditionalElements,
  pinMode: false,
  worlSettings: {
    worldWidth: 20000,
    worldDepth: 20000,
    cameraPositionX: -1000,
    cameraPositionZ: 1000,
    color: 0xbfd1e5,
    elevationCoeficient: 10
  },
  geometryWidth: null,
  geometryHeight: null,
  INTERSECTED: null,

  _loaderClass: '.spinner-wrapper',

  setupСonfigs(configs) {
    if (configs.worldwidth != null) Map.worlSettings.worldWidth =configs.worldwidth;
    if (configs.worlddepth != null) Map.worlSettings.worldDepth = configs.worlddepth;
    if (configs.camerapositionx != null) Map.worlSettings.cameraPositionX = configs.camerapositionx;
    if (configs.camerapositionz != null) Map.worlSettings.cameraPositionZ = configs.camerapositionz;
  },

  setupData: function(data) {
    Map.data = data;

    $.each(Map.data, function(i, row){
      $.each(row, function(j, cell){
        Map.arrayData[(i* Map.data[i].length) + j] = cell;
      })
    });
  },

  cellSize: function() {
    return {
      width: (Map.worlSettings.worldWidth / Map.geometryWidth),
      height: (Map.worlSettings.worldDepth / Map.geometryHeight)
    }
  },

  runApp: function(id_block){
    if ( ! Detector.webgl ) {
      Detector.addGetWebGLMessage();
      document.getElementById(id_block).innerHTML = "";
    }
    Loader.toggleLoader(true);
    Map.setupСonfigs($(`#${id_block}`).data())

    SendAjaxData.send($(`#${id_block}`).attr('source'), Map._callbackRunAppWithData, null, 'GET');
  },

  _callbackRunAppWithData: function(result) {
    Map.setupData(result);
    Map._initMap();
    Loader.toggleLoader(false);
    AdditionalElements._initElements();
    Map._animate();
  },

  _terrainMaterial: function() {
    return THREE.Terrain.generateBlendedMaterial([
      { texture: THREE.ImageUtils.loadTexture('/assets/grass1.jpg'), levels: [0, 1000, 8000, 10000] },
      { texture: THREE.ImageUtils.loadTexture('/assets/stone1.jpg'), levels: [10000, 15000, 35000, 40000] },
      { texture: THREE.ImageUtils.loadTexture('/assets/snow1.jpg'), levels: [40000, 45000, 70000, 80000] }
      // { texture: THREE.ImageUtils.loadTexture('/assets/stone1.jpg'), glsl: 'slope > 0.7853981633974483 ? 0.2 : 1.0 - smoothstep(0.47123889803846897, 0.7853981633974483, slope) + 0.2' }
      // { texture: THREE.ImageUtils.loadTexture('/assets/snow1.jpg'), glsl: '1.0 - smoothstep(65.0 + smoothstep(-256.0, 256.0, vPosition.x) * 10.0, 80.0, vPosition.z)'},
    ]);
  },

  _initCamera: function() {
    Map.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
    Map.camera.position.y = (Math.max(...Map.arrayData)*Map.worlSettings.elevationCoeficient) + 100;
    Map.camera.position.x = Map.worlSettings.cameraPositionX;
    Map.camera.position.z = Map.worlSettings.cameraPositionZ;

    Map.light = new THREE.AmbientLight( '0x404040' )

    Map.scene.add(Map.light);
  },

  _initControls: function() {
    Map.controls = new THREE.FirstPersonControls( Map.camera );
    Map.controls.movementSpeed = 1000;
    Map.controls.lookSpeed = 0.1;
  },

  _animate: function () {
    requestAnimationFrame( Map._animate );
    Map.render();
    View3dEvents._intersectionEvent();
  },

  render: function () {
    Map.controls.update( Map.clock.getDelta() );

    Map.renderer.render( Map.scene, Map.camera );
  },

  _initGeometry: function () {
    Map.geometryWidth = Map.data[0].length,
    Map.geometryHeight = Map.data.length;
    Map.geometry = new THREE.PlaneBufferGeometry(Map.worlSettings.worldWidth, Map.worlSettings.worldDepth, Map.geometryWidth - 1, Map.geometryHeight - 1);
    Map.geometry.rotateX( - Math.PI / 2 );

    Map._setDataGeometryMap();
  },

  _setDataGeometryMap: function() {
    var vertices = Map.geometry.attributes.position.array;
    for ( var i = 0, j = 0, l = vertices.length/3; i < l; i ++, j += 3 ) {
      Map.geometry.attributes.position.setY(i, Map.arrayData[i]*Map.worlSettings.elevationCoeficient)
    }
  },

  _initRenderer: function() {
    Map.renderer = new THREE.WebGLRenderer({ antialias: true });
    Map.renderer.setClearColor( Map.worlSettings.color );
    Map.renderer.setPixelRatio( window.devicePixelRatio );
    Map.renderer.setSize( window.innerWidth, window.innerHeight );
  },

  _initMap: function(){
    Map.container = document.getElementById( 'container' );
    Map.scene = new THREE.Scene();

    Map._initCamera();
    Map._initControls();

    Map._initGeometry();

    // Map.texture = new THREE.CanvasTexture( Map.generateTexture( Map.arrayData, Map.geometryWidth, Map.geometryHeight ) );
    // Map.texture.wrapS = THREE.ClampToEdgeWrapping;
    // Map.texture.wrapT = THREE.ClampToEdgeWrapping;

    // Map.mesh = new THREE.Mesh( Map.geometry, new THREE.MeshBasicMaterial( { wireframe: true, color: 'blue' } ));
    // Map.mesh = new THREE.Mesh( Map.geometry, new THREE.MeshBasicMaterial( {map: Map.texture } ));
    Map.mesh = new THREE.Mesh( Map.geometry, Map._terrainMaterial());

    Map.mesh.position.setX(Map.worlSettings.worldWidth/2);
    Map.mesh.position.setZ(Map.worlSettings.worldDepth/2)

    Map.scene.add( Map.mesh );
    Map.raycaster.setFromCamera( Map.mouse, Map.camera );

    Map._initRenderer();

    container.innerHTML = "";
    container.appendChild( Map.renderer.domElement );

    // EVENTS
    window.addEventListener( 'resize', Map.onWindowResize, false );

    $('canvas').mousemove(View3dEvents.onMouseMove);
    $('canvas').mousedown(View3dEvents.onMouseDown);

    document.addEventListener( 'keydown', View3dEvents.onKeyDown, false );

  },

  onWindowResize: function () {
    Map.camera.aspect = window.innerWidth / window.innerHeight;
    Map.camera.updateProjectionMatrix();
    Map.renderer.setSize( window.innerWidth, window.innerHeight );
    Map.controls.handleResize();
  },

  generateTexture: function ( data, width, height ) {
    var canvas, canvasScaled, context, image, imageData,
    level, diff, vector3, sun, shade;
    vector3 = new THREE.Vector3( 0, 0, 0 );
    sun = new THREE.Vector3( 1, 1, 1 );
    sun.normalize();
    canvas = document.createElement( 'canvas' );
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext( '2d' );
    context.fillStyle = '#000';
    context.fillRect( 0, 0, width, height );
    image = context.getImageData( 0, 0, canvas.width, canvas.height );
    imageData = image.data;
    for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
      vector3.x = data[ j - 2 ] - data[ j + 2 ];
      vector3.y = 2;
      vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
      vector3.normalize();
      shade = vector3.dot( sun );
      imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
      imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
      imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
    }
    context.putImageData( image, 0, 0 );
    // Scaled 4x
    canvasScaled = document.createElement( 'canvas' );
    canvasScaled.width = width * 4;
    canvasScaled.height = height * 4;
    context = canvasScaled.getContext( '2d' );
    context.scale( 4, 4 );
    context.drawImage( canvas, 0, 0 );
    image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
    imageData = image.data;
    for ( var i = 0, l = imageData.length; i < l; i += 4 ) {
      var v = ~~ ( Math.random() * 5 );
      imageData[ i ] += v;
      imageData[ i + 1 ] += v;
      imageData[ i + 2 ] += v;
    }
    context.putImageData( image, 0, 0 );
    return canvasScaled;
  }
};
      // function generateHeight( width, height) {
      //   var size = width * height, data = new Uint8Array( size ),

      //   perlin = new ImprovedNoise(), quality = 1, z = 1;

      //   for ( var j = 0; j < 4; j ++ ) {
      //     for ( var i = 0; i < size; i ++ ) {
      //       var x = i % width, y = ~~ ( i / innerWidth );
      //       data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
      //     }
      //     quality *= 5;
      //   }
      //   // data = averageHeight(data);

      //   return data;
      // }

      // function averageHeight(data){
      //   var totalH = 0, l = data.length;
      //   for(var i = 0; i<l; i++){
      //     totalH += ~~data[i];
      //   }
      //   var averageH = totalH / data.length;

      //   for(var i = 0; i<l; i++){
      //     data[i] = data[i] - averageH*.8;
      //     if(data[i] < 0){
      //       data[i] = 0;
      //     }
      //   }

      //   return data;
      // }

      //
