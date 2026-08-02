/* =========================================================
   search.js — keyword search + category filtering
   Both filters combine: a chosen category narrows the set the
   search runs against.
   ========================================================= */

const filterState = {
  category: "all",
  keyword: ""
};

/** Apply the current filter state and re-render the grid. */
function applyFilters() {
  const keyword = filterState.keyword.trim().toLowerCase();

  const filtered = PRODUCTS.filter((product) => {
    const matchesCategory =
      filterState.category === "all" ||
      product.category.toLowerCase() === filterState.category.toLowerCase();

    const matchesKeyword =
      !keyword ||
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword);

    return matchesCategory && matchesKeyword;
  });

  displayProducts(filtered);

  const noResults = document.getElementById("noResults");
  if (noResults) noResults.hidden = filtered.length > 0;

  const subtitle = document.getElementById("productsSubtitle");
  if (subtitle) {
    subtitle.textContent =
      filterState.category === "all"
        ? "Browse our digital products"
        : `Showing ${filtered.length} item(s) in ${filterState.category}`;
  }

  // Reflect the active category in the nav pills.
  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.classList.toggle("active", link.dataset.category === filterState.category);
  });
  document.querySelectorAll(".category-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.category === filterState.category);
  });
}

/** Set the active category (pass "all" to reset). */
function filterByCategory(category) {
  filterState.category = category || "all";
  applyFilters();
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Called by the search field. */
function searchProducts(value) {
  filterState.keyword = value ?? document.getElementById("searchInput")?.value ?? "";
  applyFilters();
}

/** Small debounce helper so typing doesn't re-render on every keystroke. */
function debounce(fn, wait = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearch");

  input?.addEventListener(
    "input",
    debounce((event) => {
      if (clearBtn) clearBtn.hidden = !event.target.value;
      searchProducts(event.target.value);
    })
  );

  clearBtn?.addEventListener("click", () => {
    if (!input) return;
    input.value = "";
    clearBtn.hidden = true;
    searchProducts("");
    input.focus();
  });

  // Category cards, nav pills and footer links all filter the grid.
  document.querySelectorAll("[data-category]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (element.tagName === "A") event.preventDefault();
      filterByCategory(element.dataset.category);
      closeDrawer();
    });
  });
});
