/* eslint-disable no-underscore-dangle */
var Loader = {
  startLoader: function (selector) {
    $('.preview-area').fadeIn(200);
  },

  stopLoader: function () {
    $('.preview-area').fadeOut(200);
  },

  toggleLoader: function (bool) {
    if (bool) {
      this.startLoader();
    } else {
      this.stopLoader();
    }
  }
}
/* eslint-disable no-underscore-dangle */
