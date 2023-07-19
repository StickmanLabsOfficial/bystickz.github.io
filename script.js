$(document).ready(function() {
    var preloadedImages = [];
  
    function preloadImage(path, callback) {
      var img = new Image();
      img.onload = function() {
        callback(img);
      };
      img.onerror = function() {
        callback(null);
      };
      img.src = path;
    }
  
    function fetchImages(i, category, callback) {
      var currentPath = './pictures/' + category + '/' + String(i) + '.jpg';
  
      preloadImage(currentPath, function(img) {
        if (img) {
          preloadedImages.push(img);
          fetchImages(i + 1, category, callback);
        } else {
          callback();
        }
      });
    }
  
    function appendImagesToGrid(images) {
      var grid = document.querySelector('.grid');
      grid.innerHTML = '';
  
      for (var i = 0; i < images.length; i++) {
        var img = images[i];
        var div = document.createElement('div');
        div.className = 'grid-item';
        div.appendChild(img);
        grid.appendChild(div);
      }
    }
  
    function changeImages(category) {
      path = './pictures/' + category + '/';
      preloadedImages = []; // Reset the preloaded images array
  
      fetchImages(0, category, function() {
        // All images have been preloaded
        appendImagesToGrid(preloadedImages);
      });
    }
  
    // Listen for click events on <li> elements
    $("li").click(function() {
      var liText = $(this).text();
      changeImages(liText);
    });

    $("li").hover(
        function() {
          // Hover-in function
          $(".grid-item img").css("filter", "blur(15px)");
        },
        function() {
          // Hover-out function
          $(".grid-item img").css("filter", "none");
        }
      );




    });

  