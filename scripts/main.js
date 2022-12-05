/* --------------------
navigation menu starts
-----------------------*/
(() => {
	const sexyBtn = document.querySelector(".sexyButton"),
		navMenu = document.querySelector(".nav-menu"),
		closeNavBtn = navMenu.querySelector(".close-nav-menu");

	sexyBtn.addEventListener("click", showNavMenu);
	closeNavBtn.addEventListener("click", hideNavMenu);

	function showNavMenu() {
		navMenu.classList.add("open");
		bodyScrollingToggle();
	}
	function hideNavMenu() {
		navMenu.classList.remove("open");
		fadeOutEffect();
		bodyScrollingToggle();
	}
	function fadeOutEffect() {
		document.querySelector(".fade-out-effect").classList.add("active");
		setTimeout(() => {
			document.querySelector(".fade-out-effect").classList.remove("active");
		}, 300);
	}

	// attach an event handler to document
	document.addEventListener("click", (event) => {
		if (event.target.classList.contains("link-item")) {
			if (event.target.hash !== " ") {
				event.preventDefault();
				const hash = event.target.hash;
				console.log(hash);

				// deactivating existing section
				document.querySelector(".section.active").classList.add("hide");
				document.querySelector(".section.active").classList.remove("active");

				// activating required section
				document.querySelector(hash).classList.add("active");
				document.querySelector(hash).classList.remove("hide");

				// deactivating nav menus display
				navMenu
					.querySelector(".active")
					.classList.add("outerShadow", "hoverIn");
				navMenu
					.querySelector(".active")
					.classList.remove("active", "inner-shadow");

				//if clicked item is present inside navigation
				if (navMenu.classList.contains("open")) {
					// activating nav menu display
					event.target.classList.add("active", "inner-shadow");
					event.target.classList.remove("outerShadow", "hoverIn");
					// hide nav menu
					hideNavMenu();
				} else {
					let navItems = navMenu.querySelectorAll(".link-item");
					navItems.forEach((item) => {
						if (hash === item.hash) {
							item.classList.add("active", "inner-shadow");
							item.classList.remove("outerShadow", "hoverIn");
						}
					});
					fadeOutEffect();
				}

				// add hash to url
				window.location.hash = hash;
			}
		}
	});
})();
/* --------------------
navigation menu ends
-----------------------*/

/* --------------------
about tab section
-----------------------*/
(() => {
	const aboutSection = document.querySelector(".about-section"),
		tabsContainer = document.querySelector(".about-tabs");

	tabsContainer.addEventListener("click", (event) => {
		if (
			event.target.classList.contains("tab-item") &&
			!event.target.classList.contains("active")
		) {
			let target = event.target.getAttribute("data-target");

			tabsContainer
				.querySelector(".active")
				.classList.remove("outerShadow", "active");

			event.target.classList.add("active", "outerShadow");

			aboutSection
				.querySelector(".tab-content.active")
				.classList.remove("active");

			aboutSection.querySelector(target).classList.add("active");
		}
	});
})();

function bodyScrollingToggle() {
	document.body.classList.toggle("hidden-scrolling");
	
}
/* --------------------
portfolio filter and popup section
-----------------------*/
(() => {
	// variable declaration
	const filterContainer = document.querySelector(".portfolio-filter"),
		portfolioItemsContainer = document.querySelector(".portfolio-items"),
		portfolioItems = document.querySelectorAll(".portfolio-item"),
		popup = document.querySelector(".portfolio-popup"),
		prevBtn = popup.querySelector(".pp-prev"),
		nextBtn = popup.querySelector(".pp-next"),
		closeBtn = popup.querySelector(".pp-close"),
		projectDetailsContainer = popup.querySelector(".pp-details"),
		projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
	let itemIndex, slideIndex, screenshots;

	// filter section
	filterContainer.addEventListener("click", (event) => {
		if (
			event.target.classList.contains("filter-item") &&
			!event.target.classList.contains("active")
		) {
			filterContainer
				.querySelector(".active")
				.classList.remove("outerShadow", "active");

			event.target.classList.add("active", "outerShadow");

			const target = event.target.getAttribute("data-target");
			portfolioItems.forEach((item) => {
				console.log(item);
				if (target === item.getAttribute("data-category") || target === "all") {
					item.classList.remove("hide");
					item.classList.add("show");
				} else {
					item.classList.remove("show");
					item.classList.add("hide");
				}
			});
		}
	});

	portfolioItemsContainer.addEventListener("click", (event) => {
		console.log(event.target);
		if (event.target.closest(".portfolio-item-inner")) {
			const portfolioItem = event.target.closest(".portfolio-item-inner")
				.parentElement;

			itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
				portfolioItem
			);

			screenshots = portfolioItems[itemIndex]
				.querySelector(".portfolio-item-img img")
				.getAttribute("data-screenshots");

			// convert ss into an array
			screenshots = screenshots.split(",");
			if (screenshots.length === 1) {
				prevBtn.style.display = "none";
				nextBtn.style.display = "none";
			} else {
				prevBtn.style.display = "block";
				nextBtn.style.display = "block";
			}
			slideIndex = 0;
			popupToggle();
			popupSlideshow();
			popupDetails();
		}
	});

	closeBtn.addEventListener("click", () => {
		popupToggle();
		if (projectDetailsContainer.classList.contains("active")) {
			popupDetailsToggle();
		}
	});

	function popupToggle() {
		popup.classList.toggle("open");
		bodyScrollingToggle();
	}

	function popupSlideshow() {
		const imgSrc = screenshots[slideIndex];
		const popupImg = popup.querySelector(".pp-img");

		popup.querySelector(".pp-loader").classList.add("active");
		popupImg.src = imgSrc;
		popupImg.onload = () => {
			popup.querySelector(".pp-loader").classList.remove("active");
		};
		popup.querySelector(".pp-counter").innerHTML =
			slideIndex + 1 + " of " + screenshots.length;
	}

	// next button
	nextBtn.addEventListener("click", () => {
		if (slideIndex === screenshots.length - 1) {
			slideIndex = 0;
		} else {
			slideIndex++;
		}
		popupSlideshow();
	});

	// prev Button
	prevBtn.addEventListener("click", () => {
		if (slideIndex === 0) {
			slideIndex = screenshots.length - 1;
		} else {
			slideIndex--;
		}
		popupSlideshow();
	});

	function popupDetails() {
		if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
			projectDetailsBtn.style.display = "none";
			return;
		}
		projectDetailsBtn.style.display = "block";
		const details = portfolioItems[itemIndex].querySelector(
			".portfolio-item-details"
		).innerHTML;
		popup.querySelector(".pp-project-details").innerHTML = details;

		const title = portfolioItems[itemIndex].querySelector(
			".portfolio-item-title"
		).innerHTML;
		popup.querySelector(".pp-title h2").innerHTML = title;

		const category = portfolioItems[itemIndex].getAttribute("data-category");
		popup.querySelector(".pp-project-category").innerHTML = category
			.split("-")
			.join(" ");
	}

	projectDetailsBtn.addEventListener("click", () => {
		popupDetailsToggle();
	});

	function popupDetailsToggle() {
		if (projectDetailsContainer.classList.contains("active")) {
			projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
			projectDetailsBtn.querySelector("i").classList.add("fa-plus");
			projectDetailsContainer.classList.remove("active");
			projectDetailsContainer.style.maxHeight = 0 + "px";
		} else {
			projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
			projectDetailsBtn.querySelector("i").classList.add("fa-minus");
			projectDetailsContainer.classList.add("active");
			projectDetailsContainer.style.maxHeight =
				projectDetailsContainer.scrollHeight + "px";
			popup.scrollTo(0, projectDetailsContainer.offsetTop);
		}
	}
})();
/* --------------------
portfolio filter and popup section
-----------------------*/

/* --------------------
testimonial slider begins
-----------------------*/
(() => {
	const sliderContainer = document.querySelector(".testi-slider-container"),
		slides = sliderContainer.querySelectorAll(".testi-item"),
		slideWidth = sliderContainer.offsetWidth,
		prevBtn = document.querySelector(".testi-slider-nav .prev"),
		nextBtn = document.querySelector(".testi-slider-nav .next"),
		activeSlide = sliderContainer.querySelector(".testi-item.active");
	let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
		activeSlide
	);

	// width setting of slides
	slides.forEach((slide) => {
		slide.style.width = slideWidth + "px";
	});

	// width setting of slide container
	sliderContainer.style.width = slideWidth * slides.length + "px";

	// nav buttons
	nextBtn.addEventListener("click", () => {
		if (slideIndex === slides.length - 1) {
			slideIndex = 0;
		} else {
			slideIndex++;
		}
		slider();
	});
	prevBtn.addEventListener("click", () => {
		if (slideIndex === 0) {
			slideIndex = slides.length - 1;
		} else {
			slideIndex--;
		}
		slider();
	});

	// slider function
	function slider() {
		sliderContainer
			.querySelector(".testi-item.active")
			.classList.remove("active");
		slides[slideIndex].classList.add("active");
		sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
	}
	slider();
})();
/* --------------------
testimonial slider ends
-----------------------*/

/* *******************************
hide all section except active begins
********************************* */
(() => {
	const sections = document.querySelectorAll(".section");
	sections.forEach((section) => {
		if (!section.classList.contains("active")) {
			section.classList.add("hide");
		}
	});
})();

window.addEventListener("load", () => {
	document.querySelector(".preloader").classList.add("fade-out");
	setTimeout(() => {
		document.querySelector(".preloader").style.display = "none";
	}, 600);
});