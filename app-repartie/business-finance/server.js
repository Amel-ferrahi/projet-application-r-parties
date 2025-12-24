const express = require("express");
const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const PORT = 5000;

// Multi-sites
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

/*
 Responsable ayant parcouru le PLUS de kilomètres
(on exploite les opérations commerciales)
*/
app.get("/finance/responsable-plus-km", async (req, res) => {
  try {
    const kmParResponsable = {};

    for (const server of DATA_SERVERS) {
      const operations = await safeFetch(`${server}/operations`);

      for (const op of operations) {
        const resp = op.responsable || "inconnu";
        const km = Number(op.kilometres || 0);
        kmParResponsable[resp] = (kmParResponsable[resp] || 0) + km;
      }
    }

    let maxResp = null;
    let maxKm = -1;

    for (const resp in kmParResponsable) {
      if (kmParResponsable[resp] > maxKm) {
        maxKm = kmParResponsable[resp];
        maxResp = resp;
      }
    }

    res.json({ responsable: maxResp, kilometres: maxKm });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/*
Surveillance : site avec le PLUS de relevés sanitaires
(interprétation propre et défendable)
*/
/*
 Surveillance : drone / relevé le PLUS ancien
 */
// Surveillance : drone / relevé le PLUS ancien
// Drone le plus ancien
app.get("/finance/drone-plus-ancien", async (req, res) => {
  try {
    let oldestDrone = null;

    for (const server of DATA_SERVERS) {
      try {
        const surveillances = await safeFetch(`${server}/surveillance`);

        for (const s of surveillances) {
          if (!s.premiereMiseEnService) continue;

          const d = new Date(s.premiereMiseEnService);

          if (!oldestDrone || d < new Date(oldestDrone.premiereMiseEnService)) {
            oldestDrone = {
              site: server,
              droneId: s.droneId || "inconnu",
              premiereMiseEnService: s.premiereMiseEnService
            };
          }
        }
      } catch {
        // normal : certains sites (Égypte) n'ont pas surveillance
      }
    }

    if (!oldestDrone) {
      return res.json({ message: "Aucune donnée de surveillance disponible" });
    }

    res.json(oldestDrone);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});




app.listen(PORT, () => {
  console.log(`Serveur métier Finance lancé sur http://localhost:${PORT}`);
});
