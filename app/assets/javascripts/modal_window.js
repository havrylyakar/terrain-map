function closeModalWindow() { // eslint-disable-line no-unused-vars
  $('#modal-window button.close').click();
}

function openModalWindowAjax(href, id) {
  $.get(href, function (html) {
    $(html).appendTo('body');
    $(id).modal();
    openModalWindowAjaxCallback();
  });
}

function updateModalWindow(modalBody, id) { // eslint-disable-line no-unused-vars
  $(id).modal('hide');
  $(modalBody).appendTo('body');
  $(id).modal();
}

window.openModalWindowAjaxCallback = function () {
  $('#second-modal-window').on('hidden.bs.modal', function () {
    $(this).remove();
    $oldModal.modal().show();
  });
};

$(function () {
  $(document).on('click', '.modal-link', function (event) {
    openModalWindowAjax(this.href, '#modal-window');
    event.preventDefault();
  });

  $(document).on('hidden.bs.modal', '#modal-window', function () {
    $(this).remove();
  });

  $(document).on('click', '#modal-window button.close', function () {
    $(this).closest('#modal-window').remove();
  });

  $(document).on('click', '.modal-link-second', function (event) {
    event.preventDefault();

    window.$oldModal = $('.modal.in');
    window.$oldModal.modal('hide');
    openModalWindowAjax(this.href, '#second-modal-window');
  });
});
