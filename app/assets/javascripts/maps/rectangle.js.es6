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
      this._element.setBounds(this._map.getBounds());
    // }
  }

  setMap () {
    if (this._element.getMap() == null) {
      this._element.setMap(this._map);
    }
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
