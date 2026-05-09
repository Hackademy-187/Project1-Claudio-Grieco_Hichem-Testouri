document.addEventListener("DOMContentLoaded", () => {
  fetch("../../teams.json")
    .then((res) => res.json())
    .then((data) => {
      const params = new URLSearchParams(window.location.search);
      const teamId = params.get("team") || "all";

      // ==============================
      // 🎯 GET ALL PRODUCTS (MASTER DATA)
      // ==============================
      const allProducts = data.teams.flatMap((team) => team.products || []);

      // ==============================
      // 🎯 SELECT TEAM (IF ANY)
      // ==============================
      const selectedTeam = data.teams.find((t) => t.id === teamId) || null;

      // ==============================
      // 🎯 PRODUCTS SOURCE (IMPORTANT)
      // ==============================
      let products =
        teamId === "all" ? allProducts : selectedTeam?.products || [];

      // ==============================
      // 🎨 HTML ELEMENTS
      // ==============================
      let navbarShop = document.querySelector("#main-nav");
      let secNav = document.querySelector("#secNav");
      let imgNav = document.querySelector("#logoNav");
      let headerPic = document.querySelector("#headerPic");
      let filterBtns = document.querySelectorAll(
        ".accordion-button:not(.collapsed)",
      );
      let teamRadios = document.querySelectorAll(".team-radio");
      let articleCards = document.querySelector(".articleCards");

      // ==============================
      // ✅ CREATE CARDS
      // ==============================
      function createArticles(array) {
        articleCards.innerHTML = "";

        if (!array || array.length === 0) {
          articleCards.innerHTML = "<p>No products found</p>";
          return;
        }

        array.forEach((product) => {
          let div = document.createElement("div");
          div.classList.add("cardCustom");

          div.innerHTML = `
            <img src="${product.img}" class="card-img-top"/>
            <div class="card-body w-100">
              <p class="card-text">${product.name}</p>
              <h5 class="card-title pCards">${product.price} €</h5>
            </div>
            <div class="buttonCard">
              <button class="costumButton">Add To Cart</button>
            </div>
          `;

          articleCards.appendChild(div);
        });
      }

      // ==============================
      // 🔘 TEAM RADIO NAVIGATION
      // ==============================
      teamRadios.forEach((radio) => {
        radio.addEventListener("change", (e) => {
          const selectedId = e.target.id;

          if (selectedId !== "all") {
            window.location.href = `shop.html?team=${selectedId}`;
          } else {
            window.location.href = `shop.html`;
          }
        });
      });

      // ==============================
      // ✅ KEEP RADIO SELECTED
      // ==============================
      const radio = document.getElementById(teamId);
      if (radio) radio.checked = true;

      // ==============================
      // 🎨 APPLY TEAM STYLE
      // ==============================
      if (selectedTeam) {
        let colorPrimary = selectedTeam.colors.primary;
        let colorSecondary = selectedTeam.colors.secondary;

        navbarShop.style.backgroundColor = colorPrimary;
        secNav.style.backgroundColor = colorSecondary;

        imgNav.src = selectedTeam.logo;
        headerPic.src = selectedTeam.headerpic;

        document.documentElement.style.setProperty(
          "--selection-color",
          colorPrimary,
        );
        document.documentElement.style.setProperty(
          "--selection2-color",
          colorSecondary,
        );

        filterBtns.forEach((btn) => {
          btn.style.backgroundColor = colorPrimary;
          btn.style.color = colorSecondary;
        });

        let imgAside = document.getElementById("AsideImg");
        if (imgAside) {
          imgAside.src = selectedTeam.asideImg;
        }
      }

      // ==============================
      // 🔍 FILTER FUNCTION
      // ==============================
      function filterCategories(category) {
        let filtered =
          category === "all"
            ? products
            : products.filter((p) => p.category === category);

        createArticles(filtered);
      }

      // ==============================
      // 🎯 CATEGORY FILTER EVENTS
      // ==============================
      let radioCategories = document.querySelectorAll(".form-check-input");

      radioCategories.forEach((radio) => {
        radio.addEventListener("click", () => {
          filterCategories(radio.id);
        });
      });

      // ==============================
      // 🚀 INITIAL LOAD
      // ==============================
      filterCategories("all");
    });

  // ==============================
  // 🌙 DARK MODE (FIXED MULTIPLE BUTTON BUG)
  // ==============================
  let btnDarkMode = document.querySelector(".btnDarkMode");
  let isClicked = false;

  function isDarkMode() {
    document.body.style.backgroundColor = "#494949";
    document.body.style.color = "#fff";
  }

  function isLightMode() {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
  }

  btnDarkMode.addEventListener("click", () => {
    isClicked = !isClicked;

    if (isClicked) {
      isLightMode();
      localStorage.setItem("mode", "light");
    } else {
      isDarkMode();
      localStorage.setItem("mode", "dark");
    }
  });

  let mode = localStorage.getItem("mode");
  mode === "dark" ? isDarkMode() : isLightMode();
});
