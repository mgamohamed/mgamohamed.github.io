/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanelInner, $navPanel;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

  // Play initial animations on page load.
    $window.on('load', function () {
      window.setTimeout(function () {
        $body.removeClass('is-preload')
      }, 100)

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
        .catch(error => console.error('Error loading copyright:', error))

      // Fetch the navbar content
      fetch('/assets/html/navbar.html')
        .then(response => response.text())
        .then(html => {
          // Inject the footer content into the placeholder
          document.getElementById('nav-placeholder').innerHTML = html
          // Highlight the active link
          var currentLocation = window.location.pathname
          var pages = document.querySelectorAll('nav a')
          pages.forEach(function (link) {
            if (link.getAttribute('href') === currentLocation) {
              link.parentNode.classList.add('active')
            }
          })
        })
        .catch(error => console.error('Error loading navPanel:', error))
    });

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
          			'<nav>' +
					    '<ul class="links">' +
					        '<li><a href="/index.html">Home</a></li>' +
					        '<li><a href="/research.html">Research</a></li>' +
					        '<li><a href="/publications.html">Publications</a></li>' +
					        '<li><a href="/resume.html">CV</a></li>' +
					        '<li><a href="/blog.html">Blog</a></li>' +
					    '</ul>' +
					    '<ul class="icons">' +
					        '<li><a href="https://www.linkedin.com/in/mgamohamed/" class="icon brands fa-linkedin" target="_blank"><span class="label">LinkedIn</span></a></li>' +
					        '<li><a href="https://scholar.google.com/citations?user=XSAE4BkAAAAJ&hl=en" class="icon brands fa-google" target="_blank"><span class="label">Google Scholar</span></a></li>' +
					        '<li><a href="https://www.researchgate.net/profile/Mohamed-Mohamed-46" class="icon brands fa-researchgate" target="_blank"><span class="label">Research Gate</span></a></li>' +
					        '<li><a href="https://github.com/mgamohamed" class="icon brands fa-github" target="_blank"><span class="label">GitHub</span></a></li>' +
					    '</ul>' +
          			'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				})


			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

            // Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

})(jQuery); 