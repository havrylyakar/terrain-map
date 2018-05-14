//= require three.min
//= require 3d_view/detector
//= require 3d_view/improved_noise
//= require 3d_view/first_person_controls

var Map = {
  container: null,
  camera: null,
  controls: null,
  scene: null,
  renderer: null,
  data: null,
  arrayData: [],
  clock: new THREE.Clock(),
  worlSettings: {
    worldWidth: 20000,
    worldDepth: 20000,
    color: 0xbfd1e5,
    elevationCoeficient: 20
  },
  geometryWidth: null,
  geometryHeight: null,

  _loaderClass: '.spinner-wrapper',

  setupData: function(data) {
    debugger;
    Map.data = data;

    $.each(Map.data, function(i, row){
      $.each(row, function(j, cell){
        Map.arrayData[(i* Map.data[i].length) + j] = cell;
      })
    });
  },

  runApp: function(id_block){
    if ( ! Detector.webgl ) {
      Detector.addGetWebGLMessage();
      document.getElementById(id_block).innerHTML = "";
    }
    Loader.toggleLoader(true, Map._loaderClass);
    SendAjaxData.send($(`#${id_block}`).attr('source'), Map._callbackRunAppWithData, null, 'GET');
  },

  _callbackRunAppWithData: function(result) {
    Map.setupData(result);
    Map._initMap();
    Loader.toggleLoader(false, Map._loaderClass);
    Map._animate();
  },

  _initCamera: function() {
    Map.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
    Map.camera.position.y = (Math.max(...Map.arrayData)*Map.worlSettings.elevationCoeficient) + 100;
    Map.camera.position.x = -1000;
    Map.camera.position.z = 1000;
  },

  _initControls: function() {
    Map.controls = new THREE.FirstPersonControls( Map.camera );
    Map.controls.movementSpeed = 1000;
    Map.controls.lookSpeed = 0.1;
  },

  _animate: function () {
    requestAnimationFrame( Map._animate );
    Map.render();
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
    Map.renderer = new THREE.WebGLRenderer();
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

    Map.mesh = new THREE.Mesh( Map.geometry, new THREE.MeshBasicMaterial( {wireframe: true, color: 'blue' } ));
    // Map.mesh = new THREE.Mesh( Map.geometry, new THREE.MeshBasicMaterial( {map: Map.texture } ));

    Map.scene.add( Map.mesh );

    Map._initRenderer();

    container.innerHTML = "";
    container.appendChild( Map.renderer.domElement );
    //
    window.addEventListener( 'resize', Map.onWindowResize, false );
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
