const express = require("express");
const fetch = require("node-fetch");

const app = express();

// CORS (OBLIGATOIRE pour le dashboard)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const PORT = 4000;


// data-servers (inter-sites)
const DATA_SERVERS = [
  "http://localhost:3001", // Égypte
  "http://localhost:3002", // France
  "http://localhost:3003", // Vietnam (mock)
];


// utilitaire fetch sécurisé
async function safeFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Erreur ${res.status} sur ${url}`);
  }
  return res.json();
}

// Dashboard DG : agrégation réelle multi-sites
app.get("/dg/dashboard", async (req, res) => {
  let totalEmployes = 0;
  let totalAchats = 0;
  let sitesOK = [];

  for (const site of DATA_SERVERS) {
    try {
      const personnel = await safeFetch(`${site}/personnel`);
      totalEmployes += personnel.length;

      const operations = await safeFetch(`${site}/operations`);
      for (const op of operations) {
        if (op.type === "Achat") {
          totalAchats += Number(op.marge || 0);
        }
      }

      sitesOK.push(site);
    } catch (e) {
      console.error(`Site ignoré : ${site}`);
    }
  }

  res.json({
    totalEmployes,
    totalAchats,
    sitesPrisEnCompte: sitesOK
  });
});

app.listen(PORT, () => {
  console.log(`Serveur métier DG lancé sur http://localhost:${PORT}`);
});
app.get("/dg/achats-par-site", async (req, res) => {
  const result = [];

  for (const site of DATA_SERVERS) {
    let total = 0;

    try {
      const ops = await safeFetch(`${site}/operations`);
      for (const op of ops) {
        if (op.type === "Achat") {
          total += Number(op.marge || 0);
        }
      }
      result.push({ site, total });
    } catch {
      result.push({ site, total: 0 });
    }
  }

  res.json(result);
});




