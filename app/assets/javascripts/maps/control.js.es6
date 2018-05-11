class Control {
  constructor(html, callback){
    this._element = this.setElement(html, callback)
  }

  static elementGet(...args) {
    return new Control(...args).element;
  }

  setElement (html, callback) {
    let control = document.createElement('div');
    control.innerHTML = html.trim();
    control.addEventListener('click', callback);

    return control;
  }

  get element() {
    return this._element;
  }

  set element(value) {
    this.area = value;
  }
}
