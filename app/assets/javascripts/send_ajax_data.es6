let SendAjaxData = {
  send: function (
    action,
    successCallback,
    errorCallback,
    method = 'POST',
    data,
    type = 'JSON',
    unconditionalCallback,
    processData = true,
    contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
  ) {
    $.ajax({
      url: action,
      type: method,
      data: data,
      dataType: type,
      success: successCallback || this.defaultSuccessCallback,
      error: errorCallback || this.defaultErrorCallback,
      processData: processData,
      contentType: contentType
    }).always(unconditionalCallback || (() => {}));
  },

  defaultErrorCallback: function (result) {
    let alert = JSON.parse(result.responseText);

    parseAlerts(alert);
  },

  defaultSuccessCallback: function (result) {
    parseAlerts(result);
  }
};
