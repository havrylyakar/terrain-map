class Rectangle {
  constructor(map, bounds) {
    this._map = map;
    this._bounds = bounds;
    this._element = new google.maps.Rectangle(this.defaultOptions());
  }

  show () {
    this.setBounds();
    this.setMap();
    this._element.setVisible(true);
  }

  hidde() {
    this._element.setVisible(false);
  }

  get visible() {
    return this._element.visible;
  }

  setBounds () {
    // if (this._element.getBounds() == null) {
      this._element.setBounds(Rectangle.calcBounds(this._map.center,
                                                   new google.maps.Size(500, 500)));
    // }
  }

  coordinates () {
    let bounds = this._element.getBounds();

    return {
      north_east: {
        lat: bounds.getNorthEast().lat(),
        lon: bounds.getNorthEast().lng()
      },
      south_west: {
        lat: bounds.getSouthWest().lat(),
        lon: bounds.getSouthWest().lng()
      }
    }
  }

  bounds() {
    return this._element.getBounds();
  }

  setMap () {
    if (this._element.getMap() == null) {
      this._element.setMap(this._map);
    }
  }

  static calcBounds(center, size){
    var n = google.maps.geometry.spherical.computeOffset(center, size.height/2, 0).lat(),
        s = google.maps.geometry.spherical.computeOffset(center, size.height/2, 180).lat(),
        e = google.maps.geometry.spherical.computeOffset(center, size.width/2, 90).lng(),
        w = google.maps.geometry.spherical.computeOffset(center, size.width/2, 270).lng();

    return  new google.maps.LatLngBounds(new google.maps.LatLng(s,w),
                                         new google.maps.LatLng(n,e))
  }

  center() {
    return this.bounds().getCenter();
  }

  sizeHeight() {
    let bound = this.bounds(),
        a = new google.maps.LatLng(bound.getSouthWest().lat(), bound.getNorthEast().lng()),
        b = bound.getNorthEast();

    return google.maps.geometry.spherical.computeDistanceBetween(a, b);
  }

  sizeWidth() {
    let bound = this.bounds(),
        a = new google.maps.LatLng(bound.getNorthEast().lat(), bound.getSouthWest().lng()),
        b = bound.getNorthEast();

    return google.maps.geometry.spherical.computeDistanceBetween(a, b);
  }

  defaultOptions () {
    return {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      draggable: true,
      editable: true
    }
  }
}
