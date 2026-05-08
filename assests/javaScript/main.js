// Wait for the page to fully load (VERY important)
document.addEventListener("DOMContentLoaded", () => {
  // 📦 Fetch teams data
  fetch("../../teams.json")
    .then((res) => res.json())
    .then((data) => {
      // 📌 Get team from URL (example: shop.html?team=bulls)
      const params = new URLSearchParams(window.location.search);
      const teamId = params.get("team") || "all";

      // 🔍 Find selected team (can be undefined if "all")
      const selectedTeam =
        data.teams.find((t) => t.id === teamId) ||
        data.teams.find((t) => t.id === "all");

      // ==============================
      // 🎯 FILTER TEAMS
      // ==============================
      // 🎯 Decide what to show
      let filteredTeams;
      if (!teamId) {
        // 👉 If no team in URL → show ALL teams
        filteredTeams = data.teams;
      } else {
        // 👉 Show only selected team
        filteredTeams = data.teams.filter((t) => t.id === teamId);
      }

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
      // 🎨 APPLY TEAM STYLE (IF EXISTS)
      // ==============================

      // ==============================
      // ✅ CREATE ARTICLES CARDS
      // ==============================
      function createArticles(array) {
        array.forEach((product) => {
          if (!array) {
            console.log("array is undefined ❌");
            return;
          }
          let div = document.createElement("div");
          div.classList.add("cardCustom");
          div.innerHTML = `              <img
                src="${product.img}"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body w-100">
              <p class="card-text ">
              ${product.name}
              </p>
              <h5 class="card-title pCards">${product.price} &euro;</h5>
              </div>
              <div class="buttonCard">
                <button class="costumButton">Add To Cart</button>
              </div>`;
          articleCards.appendChild(div);
        });
      }

      createArticles(selectedTeam.products);
      // ==============================
      // 🔘 RADIO BUTTON NAVIGATION
      // ==============================
      teamRadios.forEach((radio) => {
        radio.addEventListener("change", (e) => {
          const selectedId = e.target.id;

          // 👉 Redirect based on selection
          if (selectedId !== "all") {
            window.location.href = `shop.html?team=${selectedId}`;
          } else {
            window.location.href = `shop.html`; // ALL = no param
          }
        });
      });
      let productsToShow = [];

      if (teamId === "all") {
        // 🔥 get ALL products from all teams
        data.teams.forEach((team) => {
          if (team.products) {
            productsToShow.push(...team.products);
          }
        });
      } else {
        // normal team
        const selectedTeam = data.teams.find((t) => t.id === teamId);
        productsToShow = selectedTeam.products;
      }

      createArticles(productsToShow);

      // ==============================
      // ✅ KEEP RADIO SELECTED AFTER RELOAD
      // ==============================
      if (!teamId) {
        document.getElementById("all").checked = true;
      } else {
        const radio = document.getElementById(teamId);
        if (radio) radio.checked = true;
      }
      if (selectedTeam) {
        // ✅ Only access colors if team exists (THIS FIXES YOUR BUG)
        let colorPrimary = selectedTeam.colors.primary;
        let colorSecondary = selectedTeam.colors.secondary;

        navbarShop.style.backgroundColor = colorPrimary;
        secNav.style.backgroundColor = colorSecondary;

        // Logo + header pic
        imgNav.src = selectedTeam.logo;
        imgNav.alt = `${selectedTeam.name} logo`;
        headerPic.src = selectedTeam.headerpic;

        // CSS variables
        document.documentElement.style.setProperty(
          "--selection-color",
          colorPrimary,
        );
        document.documentElement.style.setProperty(
          "--selection2-color",
          colorSecondary,
        );

        // Accordion buttons style
        filterBtns.forEach((btn) => {
          btn.style.backgroundColor = colorPrimary;
          btn.style.color = colorSecondary;
        });
      }
      console.log(selectedTeam.products);

      let imgAside = document.getElementById("AsideImg");
      imgAside.src = selectedTeam.asideImg;
      imgAside.alt = `${selectedTeam.name} logo`;
    });

  // ==============================
  // 🌙 DARK MODE
  // ==============================
  let btnDarkMode = document.querySelector(".btnDarkMode");
  let isClicked = false;
  function isDarkMode() {
    document.body.style.backgroundColor = "#494949";
    document.body.style.color = "#fff";
    document.querySelector(".whiteNav").style.backgroundColor = "#494949";
    document.querySelector(".whiteNav").style.color = "#fff";
    document.querySelector(".costumButton").style.backgroundColor = "#fff";
    document.querySelector(".costumButton").style.color = "#000000";
    btnDarkMode.innerHTML = `<i class="fa-sharp fa-solid fa-sun" style="color: rgb(219, 211, 4);"></i>`;
  }
  function isLightMode() {
    // 👉 Light mode
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    document.querySelector(".whiteNav").style.backgroundColor = "#fff";
    document.querySelector(".whiteNav").style.color = "#000";
    document.querySelector(".costumButton").style.backgroundColor = "#000";
    document.querySelector(".costumButton").style.color = "#fff";
    btnDarkMode.innerHTML = `<i class="fa-sharp fa-solid fa-moon" style="color: rgb(255, 255, 255);"></i>`;
  }

  btnDarkMode.addEventListener("click", () => {
    if (isClicked) {
      // 👉 Dark mode
      isDarkMode();
      isClicked = false;
      localStorage.setItem("mode", "dark");
    } else {
      isLightMode();
      isClicked = true;
      localStorage.setItem("mode", "light");
    }
  });

  let mode = localStorage.getItem("mode");
  if (mode === "dark") {
    isDarkMode();
  } else {
    isLightMode();
  }
  // ==============================
  // 🔢 COUNTER ANIMATION
  // ==============================
  function createInterval(element, maxNumber, timeFrequency) {
    let counter = 0;

    let interval = setInterval(() => {
      if (counter < maxNumber) {
        counter++;
        element.innerHTML = counter;
      } else {
        clearInterval(interval);
      }
    }, timeFrequency);
  }

  let isChecked = false;

  // 👀 Observe when element appears
  let observerNumber = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isChecked) {
        createInterval(firstNumber, 500, 10);
        createInterval(secondNumber, 999, 25);
        createInterval(thirdNumber, 999, 0);
        isChecked = true;
      }
    });
  });

  observerNumber.observe(thirdNumber);
});
// ==============================
// 🔢 COUNTDOWN ANIMATION
// ==============================
function formatTime(value) {
  return value < 10 ? "0" + value : value;
}
let countDown = new Date("may 31, 2026 23:59:59").getTime();
let x = setInterval(function () {
  let now = new Date().getTime();
  let distance = countDown - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("countdown").innerHTML =
    `Buy 3 and get 1 free ! PROMO VALID TILL :  
  ${formatTime(days)} : ${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)}s`;
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);
