'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

  var avatarDownload = document.querySelector('.ad-form-header__input');
  var avatarShow = document.querySelector('.ad-form-header__preview img');
  var dropZone = document.querySelector('.ad-form__field');

  var photosDownload = document.querySelector('.ad-form__input');
  var photosShow = document.querySelector('.ad-form__photo-container');
  var dropZoneIMG = document.querySelector('.ad-form__upload');
  var fileCounter = 0;

  var downloadFile = function (files) {
    for (var i = 0; i < files.length; i++) {

      var file = files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          avatarShow.src = evt.currentTarget.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var downloadFileIMG = function (files) {
    for (var i = 0; i < files.length; i++) {

      var file = files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          var conteiner = document.createElement('div');
          var img = document.createElement('img');
          if (fileCounter === 0) {
            photosShow.querySelector('.ad-form__photo').remove();
          }
          conteiner.classList.add('ad-form__photo');
          img.style = 'width: 70px; height: 70px';
          img.src = evt.currentTarget.result;
          conteiner.appendChild(img);
          photosShow.appendChild(conteiner);
          fileCounter++;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  dropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  dropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    downloadFile(files);
  }, false);

  avatarDownload.addEventListener('change', function () {
    var files = avatarDownload.files;
    downloadFile(files);
  });

  photosDownload.addEventListener('change', function () {
    var files = photosDownload.files;
    downloadFileIMG(files);
  });

  dropZoneIMG.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  }, false);

  dropZoneIMG.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    downloadFileIMG(files);
  }, false);
})();
