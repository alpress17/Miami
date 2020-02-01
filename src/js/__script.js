// for (let i = 1; i < 8; i++) {
// 	console.log(i);
// }

// function logging(a, b) {
// 	console.log( a + b )
// }
// logging(3, 5);
// logging(4, 11);

$(document).ready(function() {
	/*  ================================== Carousel slider js ================================== */
	$(".carousel__inner").slick({
		speed: 1200,
		adaptiveHeight: true,
		// dots: true,
		// slidesToShow: 1,
		// slidesToScroll: 1,
		prevArrow:
			'<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		nextArrow:
			'<button type="button" class="slick-next"><img src="icons/right.svg"></button>',

		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false
					// slidesToShow: 1,
					// slidesToScroll: 1,
				}
			}
			// 	{
			// 		breakpoint: 768,
			// 		settings: {
			// 			slidesToShow: 2,
			// 			slidesToScroll: 1,
			// 			// dots: true,
			// 			// arrows: false
			// 		}
			// 	},
			// 	{
			// 		breakpoint: 576,
			// 		settings: {
			// 			slidesToShow: 1,
			// 			slidesToScroll: 1
			// 		}
			// 	}
		]
	});
	/*  ================================== Catalog TAB js ================================== */
	$("ul.catalog__tabs").on(
		"click",
		"li:not(.catalog__tab_active)",
		function() {
			$(this)
				.addClass("catalog__tab_active")
				.siblings()
				.removeClass("catalog__tab_active")
				.closest("div.container")
				.find("div.catalog__content")
				.removeClass("catalog__content_active")
				.eq($(this).index())
				.addClass("catalog__content_active");
		}
	);
	/*  ================================== Catalog items js ================================== */
	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on("click", function(e) {
				e.preventDefault();
				$(".catalog-item__content")
					.eq(i)
					.toggleClass("catalog-item__content_active");

				$(".catalog-item__list")
					.eq(i)
					.toggleClass("catalog-item__list_active");

				$(".catalog-item__back")
					.eq(i)
					.toggleClass("catalog-item__back_active");
			});
		});
	}

	toggleSlide(".catalog-item__link");
	toggleSlide(".catalog-item__back");

	/*  ================================== Modal ================================== */
	$("[data-modal=consultation]").on("click", function() {
		$(".overlay, #consultation").fadeIn("slow");
	});
	$(".modal__close").on("click", function() {
		$(".overlay, #consultation, #thanks, #order").fadeOut("slow");
	});

	$(".button_mini").each(function(i) {
		$(this).on("click", function() {
			$("#order .modal__descr").text(
				$(".catalog-item__subtitle")
					.eq(i)
					.text()
			);
			$(".overlay, #order").fadeIn("slow");
		});
	});

	$(window).on("click", function(e) {
		if (e.target.classList.contains("overlay")) {
			$(".overlay, #consultation, #thanks, #order").fadeOut("slow");
		}
	});

	$(document).keyup(function(e) {
		if (e.keyCode === 27) {
			// esc
			$(".overlay, #consultation, #thanks, #order").fadeOut("slow");
		}
	});

	/*  ================================== Validate modal forms ================================== */
	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format(
						"Введите минимум {0} символа!"
					)
				},
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Не правильно введен адрес почты"
				}
			}
		});
	}

	validateForms("#consultation-form");
	validateForms("#consultation form");
	validateForms("#order form");

	$("input[name=phone]").mask("+7 (999) 999-99-99");
});
