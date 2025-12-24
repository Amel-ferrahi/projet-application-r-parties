const express = require("express");
const app = express();

// CORS (pour dashboard plus tard)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const PORT = 6000;

// Data-servers (multi-sites)
const DATA_SERVERS = [
  "http://localhost:3001", // Égypte
  "http://localhost:3002", // France
  "http://localhost:3003"  // Vietnam (mock)
];


async function safeFetch(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Erreur ${r.status} sur ${url}`);
  return r.json();
}

// Formation INFORMATIQUE avec la motivation la plus faible
app.get("/it/formation-motivation-min", async (req, res) => {
  try {
    let minFormation = null;

    for (const server of DATA_SERVERS) {
      const formations = await safeFetch(`${server}/formations`);

      for (const f of formations) {
        // on ne garde que les formations IT
        if (!f.sujet || !f.sujet.toLowerCase().includes("informatique")) continue;

        const motivation = Number(f.engagement);
        if (isNaN(motivation)) continue;

        if (!minFormation || motivation < minFormation.engagement) {
          minFormation = { ...f, site: server };
        }
      }
    }

    if (!minFormation) {
      return res.json({ message: "Aucune formation informatique trouvée" });
    }

    res.json(minFormation);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


/*
 Sites sans personnel informatique
*/
app.get("/it/sites-sans-personnel-it", async (req, res) => {
  try {
    const sitesSansIT = [];

    for (const server of DATA_SERVERS) {
      const personnel = await safeFetch(`${server}/personnel`);
      const hasIT = personnel.some(p =>
        p.service && p.service.toLowerCase().includes("informatique")
      );

      if (!hasIT) sitesSansIT.push(server);
    }

    res.json({ sitesSansIT });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur métier Informatique lancé sur http://localhost:${PORT}`);
});
