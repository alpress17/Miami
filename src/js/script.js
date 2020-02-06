// for (let i = 1; i < 8; i++) {
// 	console.log(i);
// }

// function logging(a, b) {
// 	console.log( a + b )
// }
// logging(3, 5);
// logging(4, 11);

$(document).ready(function () {


	/*  ================================== Modal ================================== */
	// $("button").on("click", function () {
	// 	$(".overlay, #thanks").fadeIn("slow");
	// });
	$(".modal__close").on("click", function () {
		$(".overlay, #thanks").fadeOut("slow");
	});

	$(window).on("click", function (e) {
		if (e.target.classList.contains("overlay")) {
			$(".overlay, #thanks").fadeOut("slow");
		}
	});

	$(document).keyup(function (e) {
		if (e.keyCode === 27) {
			// esc
			$(".overlay, #thanks").fadeOut("slow");
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
				},
				msg: {
					required: true,
					maxlength: 500
				},
			},
			messages: {
				name: {
					required: "Please enter your name",
					minlength: jQuery.validator.format(
						"Enter at least {0} characters!"
					)
				},
				phone: "Please enter your phone number",
				email: {
					required: "Please enter your email",
					email: "Do not enter a valid address"
				},
				msg: "Please enter your message",
			},
		});
	}

	validateForms("#consultation-form");
	validateForms("#contact-form");
	$("input[name=phone]").mask("+7 (999) 999-99-99");

	/*  ================================== Initializing Magnific popup ================================== */
	$(document).ready(function () {
		$('.gallery__row').magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function (item) {
					return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
				}
			},
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function (element) {
					return element.find('img');
				}
			}

		});
	});
});
