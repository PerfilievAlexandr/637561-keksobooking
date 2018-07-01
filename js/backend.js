'use strict';
(function () {
  var errorWindow = document.createElement('div');
  var similarListElement = document.querySelector('.map__pins');

  var onError = function (message) {
    errorWindow.style.width = '400px';
    errorWindow.style.height = '150px';
    errorWindow.style.backgroundColor = 'red';
    errorWindow.style.top = '200px';
    errorWindow.style.right = '20px';
    errorWindow.style.borderRadius = '20px';
    errorWindow.style.position = 'absolute';

    similarListElement.appendChild(errorWindow);
    errorWindow.textContent = message;
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
    xhr.send(data);
  };

  window.backend = {
    ajax: ajax
  };

})();
