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

    if (selectedTeam) {
      navbarShop.style.backgroundColor = colorPrimary;
      secNav.style.backgroundColor = colorSecondary;
      let teamLogo = selectedTeam.logo;
      imgNav.src = teamLogo;
      img.alt = `${selectedTeam.name} logo`;
    } else {
      navbarShop.style.backgroundColor = "#000";
      secNav.style.backgroundColor = "#0000ff";
    }
  });
