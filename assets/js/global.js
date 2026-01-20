document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-menu-backdrop");
  const closeBtn = document.getElementById("close-mobile-menu");
  const productsBtn = document.getElementById("products-dropdown-mobile");
  const productsMenu = document.getElementById("mobile-products-menu");
  const productsArrow = document.getElementById("products-arrow");

  function toggleMenu() {
    const isClosed = menu.classList.contains("-translate-x-full");
    if (isClosed) {
      menu.classList.remove("-translate-x-full");
      backdrop.classList.remove("hidden");
    } else {
      menu.classList.add("-translate-x-full");
      backdrop.classList.add("hidden");
    }
  }

  btn.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
  if (backdrop) backdrop.addEventListener("click", toggleMenu);

  if (productsBtn && productsMenu && productsArrow) {
    productsBtn.addEventListener("click", () => {
      productsMenu.classList.toggle("hidden");
      productsArrow.classList.toggle("rotate-180");
    });
  }

  // Close mobile menu on link click
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("-translate-x-full");
      backdrop.classList.add("hidden");
    });
  });


//  search popup logic
  const searchBtns = document.querySelectorAll(".search-btn");
  const searchPopup = document.getElementById("search-popup");
  const closeSearchBtn = document.getElementById("close-search-popup");
  const searchContainer = document.getElementById("search-container");
  const searchInput = searchPopup?.querySelector("input");
  const searchSuggestions = document.getElementById("search-suggestions");

  function openSearch() {
    if (!searchPopup) return;
    searchPopup.classList.remove("hidden");
    // Trigger reflow to enable transition
    void searchPopup.offsetWidth;
    searchPopup.classList.remove("opacity-0");

    if (searchContainer) {
      searchContainer.classList.remove("scale-95");
      searchContainer.classList.add("scale-100");
    }

    if (searchSuggestions) {
      searchSuggestions.classList.remove("translate-y-4", "opacity-0");
    }

    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
    document.body.style.overflow = "hidden";
  }

  function closeSearch() {
    if (!searchPopup) return;
    searchPopup.classList.add("opacity-0");

    if (searchContainer) {
      searchContainer.classList.remove("scale-100");
      searchContainer.classList.add("scale-95");
    }

    if (searchSuggestions) {
      searchSuggestions.classList.add("translate-y-4", "opacity-0");
    }
    document.body.style.overflow = "";

    setTimeout(() => {
      searchPopup.classList.add("hidden");
    }, 300);
  }

  if (searchBtns.length > 0) {
    searchBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          openSearch();
        });
    });
  }

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", closeSearch);
  }

  if (searchPopup) {
    searchPopup.addEventListener("click", (e) => {
      if (e.target === searchPopup) {
        closeSearch();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      searchPopup &&
      !searchPopup.classList.contains("hidden")
    ) {
      closeSearch();
    }
  });

  // Products dropdown (desktop)
  const productsDropdown = document.getElementById("products-dropdown");
  const productsDesktopBtn = document.getElementById("products-dropdown-btn");
  const productsPanel = document.getElementById("products-dropdown-panel");
  const productsDropdownArrow = document.getElementById("products-dropdown-arrow");
  const productsContainer = document.getElementById("products-dropdown-products");
  const categoryButtons = document.querySelectorAll(".category-btn");

  // Simple product data (re-using available category images)
  const PRODUCTS = {
    "cooler": [
      { title: "Desert Cooler", img: "assets/images/category-img/img-1.png" },
      { title: "Personal Cooler", img: "assets/images/category-img/img-2.png" },
      { title: "Tower Cooler", img: "assets/images/category-img/img-3.png" }
    ],
    "ceiling-fan": [
      { title: "Ceiling Fan Pro", img: "assets/images/category-img/img-1.png" },
      { title: "High Speed Fan", img: "assets/images/category-img/img-2.png" },
      { title: "Decorative Fan", img: "assets/images/category-img/img-3.png" }
    ],
    "pedestal-fan": [
      { title: "Stand Fan", img: "assets/images/category-img/img-2.png" },
      { title: "Table Fan", img: "assets/images/category-img/img-3.png" },
      { title: "Wall Fan", img: "assets/images/category-img/img-1.png" }
    ],
    "motors": [
      { title: "Water Pump", img: "assets/images/category-img/img-1.png" },
      { title: "Fan Motor", img: "assets/images/category-img/img-2.png" },
      { title: "Industrial Motor", img: "assets/images/category-img/img-3.png" }
    ]
  };

  function renderProducts(categoryKey) {
    if (!productsContainer) return;
    const items = PRODUCTS[categoryKey] || [];
    productsContainer.innerHTML = items
      .map(
        (p) => `
          <div class="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-brand-red hover:shadow-md transition-all duration-200 p-3 text-center cursor-pointer">
            <div class="h-28 flex items-center justify-center mb-2">
              <img src="${p.img}" alt="${p.title}" class="max-h-full object-contain">
            </div>
            <div class="text-sm text-gray-800">${p.title}</div>
          </div>
        `
      )
      .join("");
  }

  function updateDesktopCategoryState(targetBtn) {
    categoryButtons.forEach((btn) => {
      const isTarget = btn === targetBtn;
      const span = btn.querySelector('span');

      if (isTarget) {
        // Active State
        btn.classList.remove('opacity-60');
        btn.classList.add('opacity-100');
        if (span) {
          span.classList.remove('text-gray-700');
          span.classList.add('brand-red');
        }
      } else {
        // Inactive State
        btn.classList.add('opacity-60');
        btn.classList.remove('opacity-100');
        if (span) {
          span.classList.remove('brand-red');
          span.classList.add('text-gray-700');
        }
      }
    });

    if (targetBtn) {
      const key = targetBtn.getAttribute('data-category');
      renderProducts(key);
    }
  }

  function openProductsPanel() {
    if (!productsPanel) return;
    productsPanel.classList.remove("hidden");
    productsDropdownArrow.classList.add("rotate-180");
    
    // Default to first category active
    if (categoryButtons.length > 0) {
      updateDesktopCategoryState(categoryButtons[0]);
    }
  }

    function closeProductsPanel() {
    if (!productsPanel) return;
    productsPanel.classList.add("hidden");
    productsDropdownArrow.classList.remove("rotate-180");
  }

  if (productsDesktopBtn && productsPanel) {
    // Hover logic
    if (productsDropdown) {
      productsDropdown.addEventListener('mouseenter', openProductsPanel);
      productsDropdown.addEventListener('mouseleave', closeProductsPanel);
    }

    productsDesktopBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (productsPanel.classList.contains('hidden')) openProductsPanel();
      else closeProductsPanel();
    });

    // click category
    categoryButtons.forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        updateDesktopCategoryState(btn);
      });
    });

    // close when clicking outside
    document.addEventListener('click', (ev) => {
      if (!productsPanel.contains(ev.target) && !productsDesktopBtn.contains(ev.target)) {
        closeProductsPanel();
      }
    });
  }

  // Mobile Menu Sub-dropdown Logic
  const mobileCategoryBtns = document.querySelectorAll('.mobile-category-btn');

  mobileCategoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const category = btn.getAttribute('data-category');
      const list = btn.nextElementSibling;
      const icon = btn.querySelector('i');

      // Toggle visibility
      list.classList.toggle('hidden');

      // Toggle Icon and Populate
      if (list.classList.contains('hidden')) {
        icon.classList.remove('ri-subtract-line');
        icon.classList.add('ri-add-line');
      } else {
        icon.classList.remove('ri-add-line');
        icon.classList.add('ri-subtract-line');

        // Populate if empty
        if (list.innerHTML.trim() === '') {
          const products = PRODUCTS[category] || [];
          const itemsToShow = products.slice(0, 3); // Show first 3 items
          
          list.innerHTML = itemsToShow.map(p => `
            <a href="#products" class="block text-xs text-gray-500 hover:text-brand-red flex items-center gap-3 transition-colors cursor-pointer">
              <img src="${p.img}" alt="${p.title}" class="w-7 h-7 object-contain border border-gray-100 rounded p-0.5 bg-white">
              <span>${p.title}</span>
            </a>
          `).join('') + (products.length > 0 ? `
            <a href="#products" class="block py-1 text-xs font-semibold text-brand-red mt-1 hover:underline">View All ${category.replace('-', ' ')}</a>
          ` : '<span class="text-xs text-gray-400 italic px-1">No products available</span>');
        }
      }
    });
  });

});
