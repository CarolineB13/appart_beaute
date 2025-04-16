document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filtre-boutons button");
    const select = document.getElementById("filtre-select");
    const categories = document.querySelectorAll(".category");
  
    // Gestion boutons desktop
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
  
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        filterCategories(filter);
      });
    });
  
    // Gestion select mobile
    if (select) {
      select.addEventListener("change", () => {
        filterCategories(select.value);
      });
    }
  
    function filterCategories(filter) {
      categories.forEach(cat => {
        if (filter === "all" || cat.dataset.category === filter) {
          cat.style.display = "block";
        } else {
          cat.style.display = "none";
        }
      });
    }
  });
  // Dropdown mobile custom
document.addEventListener("DOMContentLoaded", () => {
    const selected = document.getElementById("dropdownSelected");
    const options = document.getElementById("dropdownOptions");
    const items = options.querySelectorAll("li");
    const categories = document.querySelectorAll(".category");
  
    selected?.addEventListener("click", () => {
      options.style.display = options.style.display === "block" ? "none" : "block";
    });
  
    items.forEach(item => {
      item.addEventListener("click", () => {
        const filter = item.dataset.value;
  
        // update label
        selected.textContent = item.textContent;
        options.style.display = "none";
  
        // update active state
        items.forEach(li => li.classList.remove("active"));
        item.classList.add("active");
  
        // filter categories
        categories.forEach(cat => {
          if (filter === "all" || cat.dataset.category === filter) {
            cat.style.display = "block";
          } else {
            cat.style.display = "none";
          }
        });
      });
    });
  
    // Hide dropdown if clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".custom-dropdown-mobile")) {
        options.style.display = "none";
      }
    });
  });
  