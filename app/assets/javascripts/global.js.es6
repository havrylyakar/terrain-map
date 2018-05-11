//= require iCheck/icheck.min

window.loadICheck = function () {
  $('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green'
  });
};

// window.loadTabsLinks = function (event) {
//   $('.tabs').on('click', function () {
//     $(this).find('li').addClass('tab-current')
//   });
// }
