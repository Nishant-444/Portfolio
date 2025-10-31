// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function () {
	// Force dark theme
	document.documentElement.classList.add('dark');

	// Career Section - Accordion functionality
	const careerEntries = document.querySelectorAll('.career-entry');

	careerEntries.forEach((entry) => {
		const button = entry.querySelector('div:first-child');
		const content = entry.querySelector('div:last-child');
		const toggleIcon = entry.querySelector('.toggle-icon');

		button.addEventListener('click', () => {
			// Close all other entries
			careerEntries.forEach((otherEntry) => {
				if (otherEntry !== entry) {
					otherEntry.querySelector('div:last-child').classList.add('hidden');
					otherEntry.querySelector('.toggle-icon').textContent = '▼';
				}
			});

			// Toggle current entry
			content.classList.toggle('hidden');
			toggleIcon.textContent = content.classList.contains('hidden') ? '▼' : '▲';
		});
	});

	// Mobile Menu functionality
	const mobileMenuButton = document.getElementById('mobileMenuButton');
	const mobileMenu = document.getElementById('mobileMenu');
	const closeMenu = document.getElementById('closeMenu');
	const mobileMenuLinks = mobileMenu.querySelectorAll('a');

	function toggleMenu() {
		mobileMenu.classList.toggle('hidden');
		const isHidden = mobileMenu.classList.contains('hidden');
		mobileMenuButton.setAttribute('aria-expanded', !isHidden);
		mobileMenu.setAttribute('aria-hidden', isHidden);
		
		// Prevent body scroll when menu is open
		if (!isHidden) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	mobileMenuButton.addEventListener('click', toggleMenu);
	closeMenu.addEventListener('click', toggleMenu);
	mobileMenuLinks.forEach((link) => link.addEventListener('click', toggleMenu));

	// Close menu on backdrop click
	const backdrop = mobileMenu.querySelector('.fixed.inset-0.bg-black');
	if (backdrop) {
		backdrop.addEventListener('click', toggleMenu);
	}

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href !== '#' && href !== '#socials') {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					const offset = 80; // Account for sticky nav
					const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth'
					});
				}
			}
		});
	});

	// Add touch feedback for mobile interactions
	if ('ontouchstart' in window) {
		document.querySelectorAll('a, button').forEach(element => {
			element.addEventListener('touchstart', function() {
				this.style.opacity = '0.7';
			});
			element.addEventListener('touchend', function() {
				this.style.opacity = '1';
			});
		});
	}
});
