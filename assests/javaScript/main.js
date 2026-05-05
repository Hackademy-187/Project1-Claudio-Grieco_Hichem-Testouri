fetch("../../teams.json")
  .then((res) => res.json())
  .then((data) => {
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get("team");
    const selectedTeam = data.teams.find((t) => t.id === teamId);
    console.log(teamId);

    let navbarShop = document.querySelector(".shop");
  });
