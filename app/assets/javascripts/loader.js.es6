/* eslint-disable no-underscore-dangle */
var Loader = {
  _loader: undefined,
  _loaderBlock: undefined,

  _loader_html: `
    <div class="loader loading">
      <div class="loader-block"></div>
      <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>
    </div>
  `,

  loader: function () {
    if (!this._loader) {
      this._loader = $(this._loader_html);
    }

    return this._loader;
  },

  loaderBlock: function (selector) {
    if (!this._loaderBlock) {
      this._loaderBlock = $(selector);
    }

    return this._loaderBlock;
  },

  startLoader: function (selector) {
    this.loaderBlock(selector).append(this.loader());
  },

  stopLoader: function () {
    this.loader().remove();
  },

  toggleLoader: function (bool, loaderClass) {
    if (bool) {
      this.startLoader(loaderClass);
    } else {
      this.stopLoader();
    }
  }
}
/* eslint-disable no-underscore-dangle */
