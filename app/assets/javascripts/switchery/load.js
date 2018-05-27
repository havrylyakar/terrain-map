var LoadSwitchery = {
  init: function () {
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

    elems.forEach(function (input) {
      new Switchery(input, { color: '#50808E'});
    });
  }
};

$(function () {
  LoadSwitchery.init();
});
