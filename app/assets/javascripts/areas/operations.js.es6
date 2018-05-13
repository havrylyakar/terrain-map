//= require sweetalert/sweetalert.min

var AreaOperations = {
  deleteGroupElement: function (event) {
    event.preventDefault();
    event.stopPropagation();

    AreaOperations._destroyElementSwall(this, AreaOperations._destroySucessCallback);
  },

  _destroySucessCallback: function (result, element) {
    element.closest('.js-area-box').remove(); // eslint-disable-line  no-undef
    swal(I18n.t('helpers.titles.deleted'), result.notice, 'success');
  },

  _destroyElementSwall: function (button, successCallback) {
    var $buttonDelete = button;

    swal({
      title: I18n.t('helpers.links.confirm'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: I18n.t('helpers.links.yes_destroy'),
      closeOnConfirm: false
    }, function () {
      $.ajax({
        type: 'DELETE',
        url: $buttonDelete.href,
        dataType: 'json',
        success: (result) => { successCallback(result, $buttonDelete) }
      });
    });
  },
}
