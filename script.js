document.addEventListener("DOMContentLoaded", function () {
	// Sections reveal on scroll
	const sections = document.querySelectorAll(".section");
	const revealSection = function (entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("active");
				observer.unobserve(entry.target);
			}
		});
	};

	const sectionObserver = new IntersectionObserver(revealSection, {
		root: null,
		threshold: 0.15,
	});

	sections.forEach((section) => {
		sectionObserver.observe(section);
		section.classList.remove("active");
	});

	// Scroll to top button
	const scrollTopBtn = document.createElement("a");
	scrollTopBtn.href = "#home";
	scrollTopBtn.className = "scroll-top";
	scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
	document.body.appendChild(scrollTopBtn);

	window.addEventListener("scroll", function () {
		if (window.pageYOffset > 500) {
			scrollTopBtn.classList.add("active");
		} else {
			scrollTopBtn.classList.remove("active");
		}
	});
});
