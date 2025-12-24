document.addEventListener("DOMContentLoaded", () => {
    console.log("DG JS chargé");

    const e1 = document.getElementById("totalEmployes");
    const e2 = document.getElementById("totalAchats");

    console.log("totalEmployes =", e1);
    console.log("totalAchats =", e2);

    fetch("http://localhost:4000/dg/dashboard")
        .then(r => r.json())
        .then(data => {
            console.log("DATA =", data);
            if (e1) e1.textContent = data.totalEmployes;
            if (e2) e2.textContent = data.totalAchats;
        })
        .catch(err => console.error(err));
});
