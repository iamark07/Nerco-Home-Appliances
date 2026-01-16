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
});
