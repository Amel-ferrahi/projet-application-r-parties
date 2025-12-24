console.log("IT JS chargé");

// Formation motivation min
fetch("http://localhost:6000/it/formation-motivation-min")
    .then(r => r.json())
    .then(data => {
        document.getElementById("fid").textContent = data.id || "";
        document.getElementById("intitule").textContent = data.intitule || data.nomFormation || "";
        document.getElementById("motivation").textContent = data.motivation || data.engagement || "";
        document.getElementById("site").textContent = data.site || "";
    })
    .catch(err => console.error(err));

// Sites sans IT
fetch("http://localhost:6000/it/sites-sans-personnel-it")
    .then(r => r.json())
    .then(data => {
        document.getElementById("sitesSansIT").textContent =
            data.sitesSansIT.join(", ");
    })
    .catch(err => console.error(err));
