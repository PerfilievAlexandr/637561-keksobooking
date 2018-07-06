'use strict';
(function () {

  var URL_ADRESS_POST = 'https://js.dump.academy/keksobooking';
  var URL_ADRESS_GET = 'https://js.dump.academy/keksobooking/data';
  var XHR_TIMEOUT = 1e4;

  var Code = {
    SUCCESS: 200,
    UNCORRECT: 400,
    AUTHORIZATION_REQUIRED: 401,
    NON_FOUND: 404
  };

  var MistakesError = {
    STATUS_400: 'Неверный запрос',
    STATUS_401: 'Пользователь не авторизован',
    STATUS_404: 'Ничего не найдено',
    CONNECT_MISTAKE: 'Произошла ошибка соедиения',
    TIMEOUT_MISTAKE: 'Запрос не успел выполниться за '
  };

  var errorWindow = document.createElement('div');
  var errorWindowClose = document.createElement('div');
  var similarListElement = document.querySelector('.map__pins');
  var successSendForm = true;

  var onError = function (message) {

    errorWindow.style.width = '400px';
    errorWindow.style.height = '150px';
    errorWindow.style.backgroundColor = 'red';
    errorWindow.style.top = '200px';
    errorWindow.style.right = '20px';
    errorWindow.style.borderRadius = '20px';
    errorWindow.style.position = 'fixed';
    errorWindow.style.textAlign = 'center';
    errorWindow.classList.add('errorMasage');

    errorWindowClose.style.width = '80px';
    errorWindowClose.style.height = '20px';
    errorWindowClose.style.backgroundColor = 'white';
    errorWindowClose.style.top = '222px';
    errorWindowClose.style.right = '30px';
    errorWindowClose.style.position = 'fixed';
    errorWindowClose.style.cursor = 'pointer';
    errorWindowClose.textContent = 'Закрыть';
    errorWindowClose.style.textAlign = 'center';
    errorWindowClose.classList.add('errorMasageClose');

    similarListElement.appendChild(errorWindow);
    similarListElement.appendChild(errorWindowClose);
    errorWindow.textContent = message;

    var onClosePopup = function () {
      errorWindowClose.remove();
      errorWindow.remove();
      document.removeEventListener('keydown', onClosePopupESC);
    };

    var onClosePopupESC = function (evt) {
      if (evt.keyCode === window.map.KeyCodes.ESC) {
        onClosePopup();
      }
    };

    errorWindowClose.addEventListener('click', onClosePopup);

    document.addEventListener('keydown', onClosePopupESC);
  };

  var sendRequest = function (url, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          callback(xhr.response);
          break;
        case Code.UNCORRECT:
          error = MistakesError.STATUS_400 + xhr.status;
          break;
        case Code.AUTHORIZATION_REQUIRED:
          error = MistakesError.STATUS_401 + xhr.status;
          break;
        case Code.NON_FOUND:
          error = MistakesError.STATUS_404 + xhr.status;
          break;

        default:
          error = 'Статус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        successSendForm = false;
        onError(error);
      }

    });

    xhr.addEventListener('error', function () {
      onError(MistakesError.CONNECT_MISTAKE);
    });

    xhr.addEventListener('timeout', function () {
      onError(MistakesError.TIMEOUT_MISTAKE + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;
    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    sendRequest: sendRequest,
    successSendForm: successSendForm,
    URL_ADRESS_POST: URL_ADRESS_POST,
    URL_ADRESS_GET: URL_ADRESS_GET
  };

})();
