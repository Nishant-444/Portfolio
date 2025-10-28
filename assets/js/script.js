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
	}

	mobileMenuButton.addEventListener('click', toggleMenu);
	closeMenu.addEventListener('click', toggleMenu);
	mobileMenuLinks.forEach((link) => link.addEventListener('click', toggleMenu));
});
