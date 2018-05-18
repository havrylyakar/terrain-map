var Export = {
  save ( blob, filename ) {
    var link = document.createElement( 'a' );
        link.style.display = 'none';

    document.body.appendChild( link ); // Firefox workaround, see #6594

    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();
  },

  saveString( text, filename ) {
    Export.save( new Blob( [ text ], { type: 'text/plain' } ), filename );
  }
}
