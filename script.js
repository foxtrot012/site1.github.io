const menuToggle = document.querySelector(".toggle_btn");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    siteNav.classList.remove("site-nav--open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
    siteNav.classList.toggle("site-nav--open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.matchMedia("(max-width: 900px)").matches) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}

const searchForm = document.querySelector("#category-search");
const searchInput = document.querySelector("#category-query");
const searchStatus = document.querySelector("#search-status");
const categoryCards = Array.from(document.querySelectorAll(".category-card"));

const normalizeText = (value) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");

if (searchForm && searchInput && searchStatus && categoryCards.length) {
  const filterCategories = () => {
    const query = normalizeText(searchInput.value.trim());
    let visibleCount = 0;

    categoryCards.forEach((card) => {
      const searchableText = normalizeText(
        card.dataset.search + " " + card.textContent
      );
      const isMatch = query === "" || searchableText.includes(query);
      card.hidden = !isMatch;
      if (isMatch) visibleCount += 1;
    });

    if (query === "") {
      searchStatus.textContent = "";
    } else if (visibleCount === 0) {
      searchStatus.textContent = "Aucune catégorie ne correspond à votre recherche.";
    } else {
      searchStatus.textContent = visibleCount === 1
        ? "1 catégorie correspond à votre recherche."
        : visibleCount + " catégories correspondent à votre recherche.";
    }
  };

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterCategories();
    document.querySelector("#categories").scrollIntoView({ behavior: "smooth" });
  });

  searchInput.addEventListener("input", filterCategories);
}

const year = document.querySelector("#current-year");
if (year) {
  year.textContent = new Date().getFullYear();
}
