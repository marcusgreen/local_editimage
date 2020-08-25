define(['local_editimage/cropper','jquery'], function(Cropper,$) {
  var cropper;
  var originalImageURL;

  return {

      init: function(srcimg) {


      //var Cropper = window.Cropper;
      debugger;
      var URL = window.URL || window.webkitURL;
      var uploadedImageURL;
      var $download = $('#download');

      var options;
      var image = document.getElementById('src-img');
      var actions = document.getElementById('actions');

        options = {
          aspectRatio: 800 / 200,
          autoCrop: false,
          dragMode: 'none',
          zoomOnWheel: false,
          ready: function(e) {},
        };

      cropper = new Cropper(image, options);
      originalImageURL = image.src;


      // Methods
      actions.querySelector('.docs-buttons').onclick = function(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var cropped;
        var result;
        var data;

        if (!cropper) {
          return;
        }
        while (target !== this) {
          if (target.getAttribute('data-method')) {
            break;
          }

          target = target.parentNode;
        }



        data = {
          method: target.getAttribute('data-method'),
          target: target.getAttribute('data-target'),
          option: target.getAttribute('data-option') || undefined,
          secondOption: target.getAttribute('data-second-option') || undefined
        };

        if (data.method === 'download') {
           // $download.download = $('#src-img')
           // $download.attr('href', result.toDataURL('png'));
           var base64data = cropper.getCroppedCanvas().toDataURL('image/png')
           var url =  '<a class="btn btn-primary" id="download" href="'+base64data+'" download="cropped.png">Download</a>';
           $('#download').append(url);
      }

        console.log(data.method + ', ' + data.target + ', ' + data.option + ', ' + data.secondOption);

        if (data.method) {
          debugger;
          if (data.method == 'restore') {
            try {
              image.src = originalImageURL;
              cropper.destroy();
              cropper = new Cropper(image, options);
            } catch (e) {
              console.log(e.message);
            }
          } else {
           // result = cropper[data.method](data.option, data.secondOption);
          }

          switch (data.method) {
            case 'crop':

            case 'scaleX':
            case 'scaleY':
              target.setAttribute('data-option', -data.option);
              break;

            case 'getCroppedCanvas':
              try {
                data.option = JSON.parse(data.option);
              } catch (e) {
                console.log(e.message);
              }

              if (uploadedImageType === 'image/jpeg') {
                if (!data.option) {
                  data.option = {};
                }

                data.option.fillColor = '#fff';
              }

          }
          if(data.method !=='download'){
            result = cropper[data.method](data.option, data.secondOption);
          } else{
            result = '';
          }
          switch (data.method) {
            case 'rotate':
              if (cropped) {
                cropper.crop();
              }

              break;

            case 'download':

            case 'scaleX':
            case 'scaleY':
              target.setAttribute('data-option', -data.option);
              break;

            case 'getCroppedCanvas':
              if (result) {
                // Bootstrap's Modal
                $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

                if (!download.disabled) {
                  download.href = result.toDataURL(uploadedImageType);
                }
              }

              break;

            case 'destroy':
              cropper = null;

              if (uploadedImageURL) {
                URL.revokeObjectURL(uploadedImageURL);
                uploadedImageURL = '';
                image.src = originalImageURL;
              }

              break;
          }

        }
      };

      // Keyboard
  $(document.body).on('keydown', function (e) {
    if (e.target !== this || !$image.data('cropper') || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper('move', -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper('move', 0, -1);
        break;

      case 39:
        e.preventDefault();
        $image.cropper('move', 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper('move', 0, 1);
        break;
    }
    e.preventDefault();

  });

            if (URL) {
              inputImage.onchange = function() {
                var files = this.files;
                var file;

                if (cropper && files && files.length) {
                  file = files[0];

                  if (/^image\/\w+/.test(file.type)) {
                    uploadedImageType = file.type;

                    if (uploadedImageURL) {
                      URL.revokeObjectURL(uploadedImageURL);
                    }

                    image.src = uploadedImageURL = URL.createObjectURL(file);
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                    inputImage.value = null;
                  } else {
                    window.alert('Please choose an image file.');
                  }
                }
              };
            } else {
              inputImage.disabled = true;
              inputImage.parentNode.className += ' disabled';
            }

        }

    }

});