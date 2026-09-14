// Initialize Animate On Scroll (AOS)
document.addEventListener('DOMContentLoaded', () => {
    if (window.AOS && typeof AOS.init === 'function') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('#mainNav');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Blog search / filter 
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('blogSearch');
    const cards = Array.from(document.querySelectorAll('.blog-card'));

    if (!searchInput || cards.length === 0) return;

    const normalize = (s) => (s || '').toString().trim().toLowerCase();

    const applyFilter = () => {
        const q = normalize(searchInput.value);
        let visibleCount = 0;

        cards.forEach((card) => {
            const haystack = normalize(card.dataset.search || card.textContent);
            const matches = q.length === 0 || haystack.includes(q);
            card.closest('.col')?.classList.toggle('d-none', !matches);
            if (matches) visibleCount += 1;
        });

        const resultEl = document.getElementById('blogResultCount');
        if (resultEl) {
            resultEl.textContent = `${visibleCount} article${visibleCount === 1 ? '' : 's'} found`;
        }
    };

    searchInput.addEventListener('input', applyFilter);
    applyFilter();
});