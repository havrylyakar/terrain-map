class Control {
  constructor(innerHTML, callback){
    this._element = this.setElement(innerHTML, callback)
  }

  static elementGet(...args) {
    return new Control(...args).element;
  }

  setElement (innerHtml, callback) {
    let control = document.createElement('div');

    control.innerHTML = innerHtml;
    control.index = 1;
    control.className = 'google-map-control';
    control.addEventListener('click', callback);
    control.style = this.styling();

    return control;
  }

  styling () {
    return {
      'padding-top': '10px'
    }
  }

  get element() {
    return this._element;
  }

  set element(value) {
    this.area = value;

  }
}
