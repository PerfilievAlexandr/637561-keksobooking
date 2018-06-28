'use strict';
(function () {
  var ERROR_WINDOW = document.createElement('div');
  var similarListElement = document.querySelector('.map__pins');

  var onError = function (message) {
    ERROR_WINDOW.style.width = '400px';
    ERROR_WINDOW.style.height = '150px';
    ERROR_WINDOW.style.backgroundColor = 'red';
    ERROR_WINDOW.style.top = '200px';
    ERROR_WINDOW.style.right = '20px';
    ERROR_WINDOW.style.borderRadius = '20px';
    ERROR_WINDOW.style.position = 'absolute';

    similarListElement.appendChild(ERROR_WINDOW);
    ERROR_WINDOW.textContent = message;
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
