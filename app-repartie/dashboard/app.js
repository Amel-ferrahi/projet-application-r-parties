console.log("JS dashboard chargé");

// Totaux
fetch("http://localhost:4000/dg/dashboard")
  .then(r => r.json())
  .then(data => {
    document.getElementById("totalEmployes").textContent = data.totalEmployes;
    document.getElementById("totalAchats").textContent = data.totalAchats;
  });

// Graphe achats par site
fetch("http://localhost:4000/dg/achats-par-site")
  .then(r => r.json())
  .then(data => {
    const labels = data.map(d => d.site.replace("http://localhost:", "Site "));
    const values = data.map(d => d.total);

    const ctx = document.getElementById("chartAchats").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Montant des achats (€)",
          data: values
        }]
      }
    });
  });
