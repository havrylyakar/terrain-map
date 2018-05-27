//= require iCheck/icheck.min

window.loadICheck = function () {
  $('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green'
  });
};

// Collapse ibox function in ibox-header click
$(document).on('click', '.ibox-title', function () {
    var ibox = $(this).parent();
    var button = $(this).find('i');
    var content = ibox.find('div.ibox-content');

    if ($(this).find('.collapse-link').length === 0 ) {
        return;
    }
    content.slideToggle(500);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
        ibox.resize();
        ibox.find('[id^=map-]').resize();
    }, 50);
});


// window.loadTabsLinks = function (event) {
//   $('.tabs').on('click', function () {
//     $(this).find('li').addClass('tab-current')
//   });
// }
