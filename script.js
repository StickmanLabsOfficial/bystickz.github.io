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
        preloadedImages.push({ img, path: currentPath });
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
      var { img, path } = images[i];
      var div = document.createElement('div');
      div.className = 'grid-item';

      // Create an <a> element with the same path as the image's src
      var link = document.createElement('a');
      link.href = path;
      link.appendChild(img);

      div.appendChild(link);
      grid.appendChild(div);
    }
  }

  function changeImages(category) {
    path = './pictures/' + category + '/';
    preloadedImages = []; // Reset the preloaded images array

    fetchImages(0, category, function() {
      // All images have been preloaded
      appendImagesToGrid(preloadedImages);

      // Initialize SimpleLightbox after the images are loaded and appended to the grid
      var lightbox = new SimpleLightbox('.grid a', { /* options */ });
    });
  }

  // Listen for click events on <li> elements
  $('li').click(function() {
    var liText = $(this).text();
    changeImages(liText);
  });

  $('li').hover(
    function() {
      // Hover-in function
      $('.grid-item img').css('filter', 'blur(15px)');
    },
    function() {
      // Hover-out function
      $('.grid-item img').css('filter', 'none');
    }
  );
});