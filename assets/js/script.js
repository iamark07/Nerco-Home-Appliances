document.addEventListener('DOMContentLoaded', () => {
    // Category Scroller Logic
    const container = document.getElementById('category-scroll-container');
    const leftBtn = document.getElementById('category-scroll-left');
    const rightBtn = document.getElementById('category-scroll-right');

    if (container && leftBtn && rightBtn) {
        const getScrollAmount = () => {
            // Scroll by 3/4 of the container's visible width for a smoother experience
            return container.clientWidth * 0.75;
        };

        rightBtn.addEventListener('click', () => {
            container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        leftBtn.addEventListener('click', () => {
            container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // Product Discovery Tabs Logic
    const discoveryTabs = document.querySelectorAll('.discovery-tab');
    const discoveryContents = document.querySelectorAll('.discovery-content');

    if (discoveryTabs.length > 0 && discoveryContents.length > 0) {
        discoveryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-target');

                // Update Tabs Styling
                discoveryTabs.forEach(t => {
                    // Reset Tab
                    t.classList.remove('bg-brand-red', 'text-white', 'shadow-lg', 'shadow-red-200', 'border-transparent');
                    t.classList.add('bg-white', 'text-gray-600', 'hover:bg-white', 'hover:shadow-md', 'border-gray-100');
                    
                    // Reset Icon Box
                    const iconBox = t.querySelector('.icon-box');
                    iconBox.classList.remove('bg-white/20');
                    iconBox.classList.add('bg-gray-100', 'group-hover:bg-red-50');

                    // Reset Arrow
                    const arrow = t.querySelector('.arrow-icon');
                    arrow.classList.remove('opacity-100', 'text-white');
                    arrow.classList.add('opacity-0', 'group-hover:opacity-100', 'text-brand-red');
                });

                // Activate Clicked Tab
                tab.classList.remove('bg-white', 'text-gray-600', 'hover:bg-white', 'hover:shadow-md', 'border-gray-100');
                tab.classList.add('bg-brand-red', 'text-white', 'shadow-lg', 'shadow-red-200', 'border-transparent');
                
                const activeIconBox = tab.querySelector('.icon-box');
                activeIconBox.classList.remove('bg-gray-100', 'group-hover:bg-red-50');
                activeIconBox.classList.add('bg-white/20');

                const activeArrow = tab.querySelector('.arrow-icon');
                activeArrow.classList.remove('opacity-0', 'group-hover:opacity-100', 'text-brand-red');
                activeArrow.classList.add('opacity-100', 'text-white');

                // Update Content Visibility
                discoveryContents.forEach(content => {
                    if (content.id === `discovery-${target}`) {
                        content.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
                        content.classList.add('opacity-100', 'scale-100', 'z-20');
                    } else {
                        content.classList.remove('opacity-100', 'scale-100', 'z-20');
                        content.classList.add('opacity-0', 'scale-95', 'pointer-events-none', 'z-10');
                    }
                });
            });
        });
    }

    // Best Seller Slider Logic
    const sellerSlider = document.getElementById('seller-slider');
    const sellerThumbs = document.querySelectorAll('.seller-thumb');

    if (sellerSlider && sellerThumbs.length > 0) {
        sellerThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                // Update Slider Position
                sellerSlider.style.transform = `translateX(-${index * 100}%)`;

                // Update Active Thumb Styling
                sellerThumbs.forEach(t => {
                    t.classList.remove('border-brand-red');
                    t.classList.add('border-gray-200');
                });
                thumb.classList.remove('border-gray-200');
                thumb.classList.add('border-brand-red');
            });
        });
    }

    // You can add any page-specific or new JavaScript code here.
});