'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

  var avatarDownload = document.querySelector('.ad-form-header__input');
  var avatarShow = document.querySelector('.ad-form-header__preview img');

  // var photosDownload = document.querySelector('.ad-form__input');
  // var photosShow = document.querySelector('.ad-form__photo');

  avatarDownload.addEventListener('change', function () {
    var files = avatarDownload.files;


    for (var i = 0; i < files.length; i++) {

      var file = files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarShow.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
