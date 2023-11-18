(function() {
    var currentPage = window.location.pathname.split("/").pop();
    console.log(currentPage);
    var menuItems = document.querySelectorAll('li')
    console.log(menuItems);
    menuItems.forEach(function(item) {
      var link = item.querySelector('a');
      var href = link.getAttribute('href');

      if (href === currentPage) {
        item.classList.add('active');
        console.log(item);
      }
    });
  })();
  