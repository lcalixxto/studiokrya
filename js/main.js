'use strict';

/******************
Template Name: Centrix
Description: Centrix - Personal CV/Resume HTML Template
Author: Paul
Author URI: http://themeforest.net/user/Paul_tf

1. Common
2. Inits
	2.1 Init parallax
	2.2 Init google map
	2.3 Animsition init
	2.4 AOS init
3. Header
4. Change opacity logo on scroll
5. Fixed footer
6. Mobile menu
7. Hint fields
8. Accordion
9. Carousels
	9.1 Carousel
	9.2 Team carousel
10. Animation of statistics
11. Tooltip pages
12. Masonry
13. Pagepiling
14. Animation of skills
15. Anchor
16. Projects listing

***************/

/*** 1. Common ***/

var body = $('body');
var DURATION = 300;
var preloader = $('.preloader');
var header = $('.header');
var mobileBreakpoint = 992;

function setOverlay(cb) {
	var overlay = $('<div class="overlay"></div>');
	overlay.on('click', cb);
	return overlay;
}

function getScrollbarWidth() {
	var block = $('<div>').css({
		'height': '50px',
		'width': '50px'
	});
	var indicator = $('<div>').css({
		'height': '200px'
	});

	$('body').append(block.append(indicator));

	var w1 = $('div', block).innerWidth();
	block.css('overflow-y', 'scroll');

	var w2 = $('div', block).innerWidth();
	$(block).remove();

	return (w1 - w2);
}

function animate({
	timing,
	draw,
	duration
}) {
	let start = performance.now();

	requestAnimationFrame(function animate(time) {
		let timeFraction = (time - start) / duration;

		if (timeFraction > 1) {
			timeFraction = 1;
		}

		let progress = timing(timeFraction);

		draw(progress);

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}
	});
}

/*** 2. Inits ***/

/* 2.1 Init parallax */
/*(function() {
	var images = document.querySelectorAll('.__js_parallax img');
	new simpleParallax(images, {
		scale: 1.3
	});
})();*/

/* 2.2 Init google map */
(function() {
	var map = '';

	function initMap() {
		map = new google.maps.Map(document.getElementById("map"), {
			center: {
				lat: -34.397,
				lng: 150.644
			},
			zoom: 8,
		});
	}
})();

/* 2.3 Animsition init */
(function() {
	$(".animsition").animsition({
		inClass: 'fade-in',
		outClass: 'fade-out',
		inDuration: 1500,
		outDuration: 1000,
		linkElement: '.animsition-link',
		// e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
		loading: true,
		loadingParentElement: 'body', //animsition wrapper element
		loadingClass: 'preloader', //'animsition-loading',
		loadingInner: `<div class="preloader__spinner">
			<span class="preloader__double-bounce"></span>
			<span class="preloader__double-bounce preloader__double-bounce--delay"></span>
		</div>`, // e.g '<img src="loading.svg" />
		timeout: false,
		timeoutCountdown: 5000,
		onLoadEvent: true,
		browser: ['animation-duration', '-webkit-animation-duration'],
		// "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
		// The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
		overlay: false,
		overlayClass: 'animsition-overlay-slide',
		overlayParentElement: 'body',
		transition: function(url) {
			window.location.href = url;
		}
	});
})();

/* 2.4 AOS init */
(function() {
	$('.animsition').on('animsition.inEnd', function() {
		AOS.init({
			duration: 1000
		});
	});
})();

/* 3. Header */
(function() {
	var header = $('.header');
	var leftward = $('.leftward-wrapper');
	var ModifierClass = {
		FIXED: 'header--fixed',
		IS_FIXED: 'is-fixed',
		ABSOLUTE: 'header--absolute',
		WHITE: 'header--white',
		BG_WHITE: 'header--bg-white',
		LEFTWARD: 'header--leftward'
	};
	if (header.length !== 0) {
		var headerClasses = header.hasClass(ModifierClass.BG_WHITE) || header.hasClass(ModifierClass.WHITE) ? ModifierClass.FIXED : ModifierClass.WHITE + ' ' + ModifierClass.FIXED;

		var windowWidth = $(window).width();
		var headerOffset = header.offset().top;
		var scroll = $(window).scrollTop();

		var isScroll = false;
		var isMobileWidth = windowWidth < mobileBreakpoint;
		var isStaticHeader = !header.hasClass(ModifierClass.ABSOLUTE);
		var isLeftwardHeader = header.hasClass(ModifierClass.LEFTWARD);

		$(window).on('animsition.inEnd', function() {
			var Height = {
				HEADER: header.outerHeight(),
				LEFTWARD: leftward.length !== 0 ? leftward.outerHeight() : 0
			};

			changeStateHandler();

			if (isLeftwardHeader && !isMobileWidth) {
				onScrollOne();
			}

			$(window).on('resize', function() {
				if ($(window).width() === mobileBreakpoint) {
					header.attr('hidden', 'true')

					setTimeout(function() {
						header.removeAttr('hidden');
					}, DURATION)
				}
				setTimeout(function() {
					Height.HEADER = header.outerHeight();
					Height.LEFTWARD = leftward.outerHeight();
					windowWidth = $(window).width();
					isMobileWidth = windowWidth < mobileBreakpoint;
					changeStateHandler();
				}, DURATION);
			});

			function changeStateHandler() {
				if (isLeftwardHeader && isMobileWidth || !isLeftwardHeader) {
					resetHeader();
					window.onscroll = onScrollTwo;

				} else {
					resetHeader();
					window.onscroll = onScrollOne;
				}
			}

			function onScrollOne() {
				scroll = $(window).scrollTop();

				if (scroll > Height.LEFTWARD - Height.HEADER) {
					header.css({
						'position': 'absolute',
						'top': 'auto',
						'left': '0',
						'bottom': '0'
					})
				} else {
					header.removeAttr('style');
				}
			}

			function onScrollTwo() {
				scroll = $(window).scrollTop();

				if (scroll >= headerOffset + Height.HEADER) {
					isScroll = true;

					header.addClass(headerClasses);
					Height.HEADER = isScroll ? header.outerHeight() : Height.HEADER;


					if (!header.hasClass(ModifierClass.IS_FIXED)) {
						header.css({
							'top': -Height.HEADER + 'px',
							'transform': ' translateY(' + Height.HEADER + 'px)'
						}).addClass(ModifierClass.IS_FIXED);

						if (isStaticHeader) {
							body.css('padding-top', Height.HEADER + 'px');
						}
					}
				} else {
					isScroll = false;
					header.removeClass(headerClasses + ' ' + ModifierClass.IS_FIXED).removeAttr('style');

					if (isStaticHeader) {
						body.css('padding-top', 0);
					}
				}
			}

			function resetHeader() {
				header.removeClass(headerClasses + ' ' + ModifierClass.IS_FIXED).removeAttr('style');
				body.css('padding-top', '0');
			}
		});
	}
})();

/* 4. Change opacity logo on scroll */
(function() {
	var logo = $('.vertical-logo');

	if (logo.length !== 0) {
		var logoLayer = logo.find('.vertical-logo__layer--yellow');
		var logoHeight = logo.outerHeight();
		var logoOffset = logo.offset().top;
		var shift = $('.header').outerHeight() * 2;
		var distance = (logoHeight + logoOffset) - shift;

		function changeOpacity(scroll) {
			var percent = scroll * 100 / distance;
			logoLayer.css('opacity', percent / 100);

			let opacity = logoLayer.css('opacity');

			if (scroll >= distance && opacity < 1) {
				logoLayer.css('opacity', '1');
			}
		}

		$(window).on('scroll', function() {
			var scroll = $(window).scrollTop();
			changeOpacity(scroll);
		});

		$(window).on('resize', function() {
			var scroll = $(window).scrollTop();

			logoHeight = logo.outerHeight();
			logoOffset = logo.offset().top;
			shift = $('.header').outerHeight() * 2;
			distance = (logoHeight + logoOffset) - shift;

			changeOpacity(scroll);
		});
	}

})();

/* 5. Fixed footer */
(function() {

	$(window).on('load', function() {
		var footer = $('.__js_fixed-footer');
		var footerHeight = footer.innerHeight();

		if (footer.length !== 0 && $(window).width() >= mobileBreakpoint) {
			if (footerHeight <= $(window).height()) {
				footer.css({
					'position': 'fixed',
					'left': '0',
					'right': '0',
					'bottom': '0'
				});
				body.css('padding-bottom', footerHeight);
			} else {
				body.css('padding-bottom', '0');
				footer.removeAttr('style')
			}

			$(window).on('resize', function() {
				footerHeight = footer.innerHeight();

				if (footerHeight <= $(window).height()) {
					footer.css({
						'position': 'fixed',
						'left': '0',
						'right': '0',
						'bottom': '0'
					});
					body.css('padding-bottom', footerHeight);
				} else {
					body.css('padding-bottom', '0');
					footer.removeAttr('style');
				}
			});
		}
	});
})();

/* 6. Mobile menu */
(function() {
	var menuOpenBtn = $('.menu-toggle');
	var menuCloseBtn = $('.mobile-canvas__close');
	var menu = $('.mobile-canvas');
	var header = $('.header');
	var menu2 = $('.header__menu');
	var headerContainer = $('.header__container');
	var mobileDropdownLinks = $('.navigation__link');

	var menuIsOpened = false;
	var isLeftwardHeader = $('.header').hasClass('header--leftward');

	var ModifierClass = {
		MOBILE_CANVAS: 'mobile-canvas--opened',
		MENU: 'header__menu--opened',
		TOGGLE: 'menu-toggle--opened',
		CURRENT_ITEM: 'navigation__item--current',
		ANIMSITION: 'animsition-link'
	};

	changeClassNavLink();

	menuOpenBtn.on('click', function() {
		if (isLeftwardHeader && $(window).width() < mobileBreakpoint || !isLeftwardHeader) {
			menuIsOpened ? closeMenu() : openMenu();
		} else {
			menuIsOpened ? closeLeftwardHeader() : openLeftwardHeader();
		}
	});

	if (menuCloseBtn.length > 0) {
		menuCloseBtn.on('click', closeMenu);
	}

	mobileDropdownLinks.on('click', openMobile);

	$(window).on('resize', function() {
		var windowWidth = $(window).width();

		if (windowWidth >= mobileBreakpoint && !isLeftwardHeader) {
			closeMenu();
		} else if (isLeftwardHeader) {
			closeLeftwardHeader();
		}

		changeClassNavLink();
	});

	$('main').on('transitionend', removeStyleAttrOnMain);

	function changeClassNavLink() {
		var isMob = $(window).width() < mobileBreakpoint;

		mobileDropdownLinks.each(function() {
			var link = $(this);
			var hasNext = link.next().length !== 0;
			var isActiveParent = link.parent().hasClass(ModifierClass.CURRENT_ITEM);

			if (((isLeftwardHeader || isMob) && hasNext) || isActiveParent) {
				link.removeClass(ModifierClass.ANIMSITION);
			} else if (!isLeftwardHeader && !isMob && !isActiveParent) {
				link.addClass(ModifierClass.ANIMSITION);
			}
		});


	}

	function openMobile(evt) {
		var link = $(this);
		var dropdown = link.next();
		var width = $(window).width();

		if (width < mobileBreakpoint || isLeftwardHeader) {
			if (dropdown.length !== 0) {
				evt.preventDefault();
				var targetParent = link.parent();

				targetParent.siblings().find('.navigation__dropdown').slideUp();
				dropdown.slideToggle();
			}

		}
	}

	function openMenu() {
		var overlay = setOverlay(closeMenu);
		headerContainer.append(overlay);
		menuIsOpened = true;

		setTimeout(function() {
			overlay.fadeIn(DURATION);

			menuOpenBtn.addClass(ModifierClass.TOGGLE);
			if (isLeftwardHeader) {
				menu2.addClass(ModifierClass.MENU);
			} else {
				menu.addClass(ModifierClass.MOBILE_CANVAS);
			}
		}, DURATION + 50);
	}

	function closeMenu() {
		if (isLeftwardHeader) {
			menu2.removeClass(ModifierClass.MENU);
		} else {
			menu.removeClass(ModifierClass.MOBILE_CANVAS);
		}

		menuOpenBtn.removeClass(ModifierClass.TOGGLE);
		var overlay = $('.overlay').fadeOut(DURATION);
		menuIsOpened = false;

		setTimeout(function() {
			overlay.remove();
		}, DURATION + 50);
	}

	function openLeftwardHeader() {
		menuOpenBtn.addClass(ModifierClass.TOGGLE);
		header.addClass('shifted');
		header.next().css('transform', 'translateX(300px)');
		body.css({
			'overflow': 'hidden',
			'margin-right': getScrollbarWidth() + 'px'
		});
		menuIsOpened = true;


		changeFixedElement(true);
	}

	function closeLeftwardHeader() {
		menuOpenBtn.removeClass(ModifierClass.TOGGLE);
		header.removeClass('shifted');
		header.next().css('transform', 'translateX(0)');

		setTimeout(function() {
			body.css({
				'overflow': '',
				'margin-right': '0'
			});
			menuIsOpened = false;
		}, DURATION + 50);


	}

	function changeFixedElement(isOpen) {
		var aside = $('.projects-listing__aside');

		if (aside.length !== 0) {
			var scroll = $(window).scrollTop();
			var parentOffsetTop = aside.parent().offset().top;
			var left = aside.parent().css('padding-left');
			var offsetTop = scroll > parentOffsetTop ? scroll - parentOffsetTop : scroll;

			if (isOpen) {
				aside.css({
					'position': 'absolute',
					'left': left,
					'top': offsetTop + 'px'
				})
			}
		}
	}

	function removeStyleAttrOnMain() {
		var style = $(this).attr('style');

		if (style === 'transform: translateX(0px);') {
			$(this).removeAttr('style');
		}
	}
})();

/* 7. Hint fields */
(function() {
	var fields = $('.field input, .field textarea');
	//var fields = $('.field input').add('.field textarea');
	var ModifierClass = 'field--filled';

	fields.on('focus', function() {
		$(this).parent().addClass(ModifierClass);
	});

	fields.on('blur', function() {
		if (!$(this).val()) {
			$(this).parent().removeClass(ModifierClass);
		}
	});
})();

/* 8. Accordion */
(function() {
	var btn = $('.accordion__item-header');
	var content = $('.accordion__item-body');
	var modifierClass = 'accordion__item-header--opened';

	btn.on('click', function() {
		$(this).toggleClass(modifierClass).next().slideToggle(DURATION);
	});
})();

/*** 9. Carousels ***/

/* 9.1 Carousel */
(function() {
	var carouselSelectors = ['.__js_carousel-latest-news', '.__js_carousel-latest-projects'];

	var carousel = new Swiper('.__js_carousel', {
		slidesPerView: 'auto',
		spaceBetween: 60,
		loop: true,
		navigation: {
			nextEl: '.carousel__btn--next',
			prevEl: '.carousel__btn--prev',
		},
	});

	carouselSelectors.forEach(function(selector) {
		new Swiper(selector, {
			slidesPerView: 'auto',
			spaceBetween: 60,
			loop: true,
			navigation: {
				nextEl: '.nav-btn--next[data-target="' + selector + '"]',
				prevEl: '.nav-btn--prev[data-target="' + selector + '"]',
			},
		});
	});
})();

/* 9.2 Team carousel */
(function() {
	var carouselSelector = '.__js_team-carousel-only-mobile';
	var carousel;

	if ($(carouselSelector).length > 0) {

		initTeamCarousel();

		$(window).resize(function() {
			initTeamCarousel();
		});
	}

	function initTeamCarousel() {
		if (window.matchMedia('(min-width: 576px)').matches && carousel) {
			carousel.destroy();
			carousel = null;

		} else if (window.matchMedia('(max-width: 575px)').matches && carousel !== null) {
			carousel = new Swiper(carouselSelector, {
				speed: 300,
				slidesPerView: 'auto',
				spaceBetween: 40,
				loop: true
			});
		}
	}
})();

/* 10. Animation of statistics */
(function() {
	$(window).on('load', function() {
		var statistics = $('.statistics');
		var numbers = $('.__js_number');
		var animationIsDone = false;
		var scroll = $(window).scrollTop() + $(window).height();

		if ($('*').is('.statistics')) {
			var offset = statistics.offset().top;

			if (!animationIsDone && scroll >= offset) {
				animateNumbers();
			}

			$(window).on('scroll', function() {
				scroll = $(window).scrollTop() + $(window).height();

				if (!animationIsDone && scroll >= offset) {
					animateNumbers();
				}
			});
		}

		function animateNumbers() {
			numbers.each(function() {
				var endValue = parseInt($(this).attr('data-end-value'), 10);

				$(this).easy_number_animate({
					start_value: 0,
					end_value: endValue,
					duration: 1800
				});

			});

			animationIsDone = true;
		}
	});
})();

/* 11. Tooltip pages */
(function() {
	var windowWidth = $(window).width();

	var marqueeSpeed = windowWidth < mobileBreakpoint ? 10000 : 25000;

	$('.__js-marquee').on('beforeStarting', function() {
		var item = $('.tooltip__item');
		item.on('mouseover', onMarqueeItemHover);
	}).marquee({
		//speed in milliseconds of the marquee
		duration: marqueeSpeed,
		//gap in pixels between the tickers
		gap: 0,
		//time in milliseconds before the marquee will start animating
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: 'left',
		//true or false - should the marquee be duplicated to show an effect of continues flow
		duplicated: true,
		startVisible: true
	});

	$('.__js-marquee--reverse').on('beforeStarting', function() {
		var item = $('.tooltip__item');
		item.on('mouseover', onMarqueeItemHover);
	}).marquee({
		//speed in milliseconds of the marquee
		duration: marqueeSpeed,
		//gap in pixels between the tickers
		gap: 0,
		//time in milliseconds before the marquee will start animating
		delayBeforeStart: 0,
		//'left' or 'right'
		direction: 'right',
		//true or false - should the marquee be duplicated to show an effect of continues flow
		duplicated: true,
		startVisible: true
	});

	function onMarqueeItemHover() {
		var current = $(this);
		var parent = current.closest('.tooltip__marquee');
		var imageData = {
			url: current.attr('data-image'),
			url2x: current.attr('data-image2x'),
			w: current.attr('data-image-w'),
			h: current.attr('data-image-h'),
			isWebp: current.attr('data-webp')
		};

		var itemCard = createItemCard(imageData);

		parent.marquee('pause');
		current.append(itemCard);
		var card = current.find('.tooltip__card');

		current.on('mousemove', function(evt) {
			var x = evt.pageX - current.offset().left;
			var y = evt.pageY - current.offset().top;
			card.css({
				'left': x + 'px',
				'top': y + 'px'
			});
		});

		current.on('mouseout', function() {
			parent.marquee('resume');
			card.remove();
		});
	}

	function createItemCard(imageData) {
		if (imageData.url) {
			var card = $('<div class="tooltip__card"></a>');
			var format = imageData.url.slice(imageData.url.lastIndexOf('.'));

			var path = {
				'1x': imageData.url.slice(0, -format.length),
				'2x': imageData.url2x ? imageData.url2x.slice(0, -format.length) : imageData.url.slice(0, -format.length)
			};

			if (imageData.isWebp) {

				var image = $('<picture><source type="image/webp" srcset="' + path['1x'] + '.webp 1x, ' + path['2x'] + '.webp 2x"><img src="' + path['1x'] + format + '" srcset="' + path['2x'] + format + ' 2x" width="' + imageData.w + '" height="' + imageData.h + '" alt=""></picture>');

			} else {

				var image = $('<img src="' + path['1x'] + format + '" srcset="' + path['2x'] + format + ' 2x" width="' + imageData.w + '" height="' + imageData.h + '" alt="">');

			}

			card.append(image);
			card.css({
				'position': 'absolute'
			})

			return card;
		}
	}
})();

/* 12. Masonry */
(function() {
	$(window).on('load', function() {
		var filterItem = $('.filter__item');
		var filterItemAll = $('.filter__item[data-filter="*"]');
		var filterActiveClass = 'filter__item--active';

		var grid = $('.__js_blog-grid, .__js_portfolio-section-masonry').isotope({
			itemSelector: '.__js_masonry-item',
			layoutMode: 'packery',
			packery: {
				gutter: 0
			},
		});

		filterItem.on('click', function() {
			var filterValue = $(this).attr('data-filter');

			$(this).addClass(filterActiveClass).siblings().removeClass(filterActiveClass);
			grid.isotope({
				filter: filterValue
			});
		});
	});
})();

/* 13. Pagepiling */
(function() {
	var headerClasses = $('.header').attr('class');

	initFullPage();

	if ($('#pagepiling .section.active').hasClass('dark')) {
		setDark();
	}

	function initFullPage() {
		if ($('#pagepiling') && $('#pagepiling').length > 0) {
			$('#pagepiling').pagepiling({
				scrollingSpeed: 280,
				loopBottom: true,
				navigation: false,
				afterRender: function() {
					$('.parallax-projects__nav span').height($('.parallax-projects__nav').height() / $('#pagepiling .section').length);
				},
				afterLoad: function(anchorLink, index) {
					var current = $('#pagepiling .section.active');

					if (current.hasClass('dark')) {
						setDark();
					} else {
						removeDark();
					}

					$('.fp-table.active .aos-init').addClass('aos-animate');

					$('.parallax-projects__nav span').height($('.parallax-projects__nav').height() / $('#pagepiling .section').length * index);
				}
			});
		}
	}

	function setDark() {
		$('.webpage').addClass('webpage--parallax-dark');
		$('.header').removeClass('header--white');
	}

	function removeDark() {
		$('.webpage').removeClass('webpage--parallax-dark');
		$('.header').addClass(headerClasses);
	}
})();

/* 14. Animation of skills */
(function() {
	$(window).on('load', function() {
		var skills = $('.skills');
		var skill = $('.skill');
		var numbers = $('.skill .__js_number');
		var animationIsDone = false;
		var scroll = $(window).scrollTop() + $(window).height();

		var duration = 1800;

		if ($('*').is('.skills')) {
			var offset = skills.offset().top;

			if (!animationIsDone && scroll >= offset) {
				animateNumbers();
				animateProgress();
			}

			$(window).on('scroll', function() {
				scroll = $(window).scrollTop() + $(window).height();

				if (!animationIsDone && scroll >= offset) {
					animateNumbers();
					animateProgress();
				}
			});
		}

		function animateNumbers() {
			numbers.each(function() {
				var endValue = parseInt($(this).parent().parent().parent().attr('data-percent'), 10);

				$(this).easy_number_animate({
					start_value: 0,
					end_value: endValue,
					duration: 1800
				});

			});

			animationIsDone = true;
		}

		function animateProgress() {
			skill.each(function() {
				var current = $(this);
				var progress = current.find('.skill__progress');
				var percent = parseInt(current.attr('data-percent'), 10);

				progress.attr('style', 'transform: scale(' + (percent / 100) + ', 1)')
			});
		}
	});
})();

/* 15. Anchor */
(function() {
	anchorScroll($('.anchor'));

	function anchorScroll(e) {
		e.on('click', function() {
			var link = $(this).attr('href'),
				to = $(link).offset().top;
			$('body, html').animate({
				scrollTop: to
			}, 800);
		});
	}
})();

/* 16. Projects listing */
(function() {
	var container = $('.projects-listing__container');

	if (container.length !== 0) {
		var aside = $('.projects-listing__aside');
		var title = $('.projects-listing__title');
		var category = $('.projects-listing__category');
		var btn = $('.projects-listing__more');
		var cards = $('.project-card');
		var isFixed = false;

		var currentCard = cards[0];
		var hideClass = 'd-none';
		var containerParams = {
			TOP: container.offset().top,
			LEFT: container.offset().left,
			HEIGHT: container.height(),
			WIDTH: container.width(),
			BOTTOM: container.offset().top + container.height(),
			LEFT_PADDING: parseInt(container.css('padding-left'), 10)
		};

		var maxTop = $(window).width() >= 768 ? $(cards[cards.length - 1]).offset().top - containerParams.TOP : containerParams.BOTTOM - aside.outerHeight();

		function changeProjectMeta() {
			title.html(currentCard.attr('data-title'));
			btn.attr('href', currentCard.attr('data-url'));

			if (currentCard.attr('data-category')) {
				category.removeClass(hideClass).text(currentCard.attr('data-category'));
			} else {
				category.addClass(hideClass).text('');
			}
		}

		function changeCurrentCard(index, item) {
			if (aside.offset().top >= item.offset().top) {
				currentCard = item;
				changeProjectMeta();
			}
		}

		$(window).on('scroll', function() {
			var scroll = $(window).scrollTop();
			isFixed = scroll > containerParams.TOP && scroll <= maxTop;

			if ($(window).width() >= 768) {
				if (isFixed) {
					aside.css({
						'position': 'fixed',
						'left': (containerParams.LEFT + containerParams.LEFT_PADDING) + 'px',
						'top': '0',
						'transform': 'translateY(' + containerParams.TOP + 'px)'
					});

				} else {
					var top = scroll >= maxTop ? maxTop : 0;
					var y = scroll >= maxTop ? containerParams.TOP + 'px' : 0;
					aside.css({
						'position': 'absolute',
						'left': containerParams.LEFT_PADDING + 'px',
						'top': top + 'px',
						'transform': 'translateY(' + y + ')'
					});
				}
			} else {
				var targetScroll = scroll + $(window).height() - aside.outerHeight();
				if (targetScroll >= maxTop) {
					var top = targetScroll >= maxTop ? maxTop - containerParams.TOP + 'px' : 0;
					aside.css({
						'position': 'absolute',
						'top': top,
						'bottom': 'auto',
						'right': ''
					})
				} else {
					aside.removeAttr('style');
				}
			}

			cards.each(function(index) {
				var i = index;
				changeCurrentCard(i, $(this));
			});
		});

		$(window).on('resize', function() {
			var scroll = $(window).scrollTop();
			containerParams = {
				TOP: container.offset().top,
				LEFT: container.offset().left,
				HEIGHT: container.height(),
				WIDTH: container.width(),
				BOTTOM: container.offset().top + container.height(),
				LEFT_PADDING: parseInt(container.css('padding-left'), 10)
			};

			maxTop = $(window).width() >= 768 ? $(cards[cards.length - 1]).offset().top - containerParams.TOP : containerParams.BOTTOM - aside.outerHeight();
			isFixed = scroll > containerParams.TOP && scroll <= maxTop;

			aside.removeAttr('style');
		});
	}
})();