'use strict';
(function () {
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

    var closePopup = function () {
      errorWindowClose.remove();
      errorWindow.remove();
      document.removeEventListener('keydown', closePopup);
    };

    errorWindowClose.addEventListener('click', closePopup);

    document.addEventListener('keydown', function (e) {
      if (e.keyCode === window.map.KeyCodes.ESC) {
        closePopup();
      }
    });
  };

  var ajax = function (url, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          callback(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос' + xhr.status;
          break;
        case 401:
          error = 'Пользователь не авторизован' + xhr.status;
          break;
        case 404:
          error = 'Ничего не найдено' + xhr.status;
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
      onError('Произошла ошибка соедиения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open(method, url);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  };

  window.backend = {
    ajax: ajax,
    successSendForm: successSendForm
  };

})();
