$(document).ready(function() {
	/*  ====================== Smooth scroll for navigate menu ====================== */
	$("#menu").on("click", "a", function(event) {
		event.preventDefault();
		const id = $(this).attr("href"),
			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		//анимируем переход на расстояние - top(-30px) за 1500 мс
		$("body,html").animate({ scrollTop: top - 30 }, 1500);
	});

	/*  ================================== Modal ================================== */
	$("button").on("click", function() {
		$(".overlay, #thanks").fadeIn("slow");
	});
	$(".modal__close").on("click", function() {
		$(".overlay, #thanks").fadeOut("slow");
	});

	$(window).on("click", function(e) {
		if (e.target.classList.contains("overlay")) {
			$(".overlay, #thanks").fadeOut("slow");
		}
	});

	$(document).keyup(function(e) {
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
					minlength: 3
				},
				phone: "required",
				email: {
					required: true,
					email: true
				},
				msg: "required"
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
				msg: "Please enter your message"
			}
		});
	}

	validateForms("#consultation-form");
	validateForms("#contact-form");
	$("input[name=phone]").mask("+7 (999) 999-99-99");

	/*  ================================== Initializing Magnific popup ================================== */

	$(".zoom-gallery__row").magnificPopup({
		delegate: "a",
		type: "image",
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: "mfp-with-zoom mfp-img-mobile",
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return (
					item.el.attr("title") +
					' &middot; <a class="image-source-link" href="' +
					item.el.attr("data-source") +
					'" target="_blank">image source</a>'
				);
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find("img");
			}
		}
	});

	/*  ================================== Button VIEW ALL ================================== */
	$("body").on("click", ".button_mini", function() {
		$(".zoom-gallery_hidden").show("slow");
	});

	/*  ================================== Form data sending (AJAX) ================================== */
	$("#contact-form, #consultation-form").submit(function(event) {
		// Stop form from submitting normally
		event.preventDefault();
		// Get some values from elements on the page:
		const $form = $(this),
			userName = $form.find("[name='name']").val(),
			phone = $form.find("[name='phone']").val(),
			email = $form.find("[name='email']").val(),
			body = $form.find("[name='msg']").val();
		// Send the data using post
		const posting = $.post("https://jsonplaceholder.typicode.com/posts", {
			name: userName,
			phone,
			email,
			body
		});

		posting.done(function(data) {
			console.log(data);
			$($form)[0].reset();
		});
	});

	/*  ================================== Smooth scroll and pageup ================================== */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$(".pageup").fadeIn();
		} else {
			$(".pageup").fadeOut();
		}
	});

	$("a[href=#up]").click(function() {
		const _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});

	new WOW().init();
});
