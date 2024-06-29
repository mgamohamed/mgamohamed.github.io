document.addEventListener('DOMContentLoaded', function () {
  // Fetch the footer content
  fetch('/assets/html/footer.html')
    .then(response => response.text())
    .then(html => {
      // Inject the footer content into the placeholder
      document.getElementById('footer-placeholder').innerHTML = html
    })
    .catch(error => console.error('Error loading footer:', error))

  // Fetch the copyright content
  fetch('/assets/html/copyright.html')
    .then(response => response.text())
    .then(html => {
      // Inject the copyright content into the placeholder
      document.getElementById('copyright-placeholder').innerHTML = html
    })
    .catch(error => console.error('Error loading footer:', error))

  // Fetch the navbar content
  fetch('/assets/html/navbar.html')
    .then(response => response.text())
    .then(html => {
      // Inject the footer content into the placeholder
      document.getElementById('nav-placeholder').innerHTML = html
      // document.getElementById('nav').innerHTML = html
      // Highlight the active link
      var currentLocation = window.location.pathname
      var pages = document.querySelectorAll('nav a')
      pages.forEach(function (link) {
        if (link.getAttribute('href') === currentLocation) {
          link.parentNode.classList.add('active')
        }
      })
    })
    .catch(error => console.error('Error loading footer:', error))
})
