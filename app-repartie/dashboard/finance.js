console.log("FINANCE JS chargé");

// Responsable avec le + de km
fetch("http://localhost:5000/finance/responsable-plus-km")
  .then(r => r.json())
  .then(data => {
    document.getElementById("responsableKm").textContent = data.responsable;
    document.getElementById("km").textContent = data.kilometres;
  })
  .catch(err => console.error(err));

// Site avec le + de surveillance
fetch("http://localhost:5000/finance/site-surveillance-max")
  .then(r => r.json())
  .then(data => {
    document.getElementById("siteSurveillance").textContent = data.site;
    document.getElementById("nbReleves").textContent = data.nombreReleves;
  })
  .catch(err => console.error(err));
