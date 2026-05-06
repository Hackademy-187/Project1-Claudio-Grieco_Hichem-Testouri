fetch("../../teams.json")
  .then((res) => res.json())
  .then((data) => {
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get("team");
    const selectedTeam = data.teams.find((t) => t.id === teamId);
    let colorPrimary = selectedTeam.colors.primary;
    let colorSecondary = selectedTeam.colors.secondary;
    /*HTML ELEMENTS CALL*/

    let navbarShop = document.querySelector("#main-nav");
    let secNav = document.querySelector("#secNav");
    let imgNav = document.querySelector("#logoNav");
    let headerPic = document.querySelector("#headerPic");

    if (selectedTeam) {
      navbarShop.style.backgroundColor = colorPrimary;
      secNav.style.backgroundColor = colorSecondary;
      let teamLogo = selectedTeam.logo;
      imgNav.src = teamLogo;
      imgNav.alt = `${selectedTeam.name} logo`;
      headerPic.src = selectedTeam.headerpic;
    } else {
      navbarShop.style.backgroundColor = "#000";
      secNav.style.backgroundColor = "#0000ff";
    }
  });
// DARK MODE SETTING
let btnDarkMode = document.querySelector(".btnDarkMode");
let isClicked = false;
let whiteNav = document.querySelector(".whiteNav");
let costumButton = document.querySelector(".costumButton");

btnDarkMode.addEventListener("click", () => {
  if (isClicked) {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";
    document.querySelector(".whiteNav").style.backgroundColor = "#000";
    document.querySelector(".whiteNav").style.color = "#fff";
    document.querySelector(".costumButton").style.backgroundColor = "#fff";
    document.querySelector(".costumButton").style.color = "#000";
    isClicked = false;
    btnDarkMode.innerHTML = `<i class="fa-sharp fa-solid fa-sun" style="color: rgb(219, 211, 4);"></i>`;
  } else {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    document.querySelector(".whiteNav").style.backgroundColor = "#fff";
    document.querySelector(".whiteNav").style.color = "#000";
    document.querySelector(".costumButton").style.backgroundColor = "#000";
    document.querySelector(".costumButton").style.color = "#fff";
    isClicked = true;
    btnDarkMode.innerHTML = `<i class="fa-sharp fa-solid fa-moon" style="color: rgb(255, 255, 255);"></i>`;   
  }
});
// 
