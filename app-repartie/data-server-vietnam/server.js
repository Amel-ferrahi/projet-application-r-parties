const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3003;

// =======================
// PERSONNEL
// =======================
const personnel = [
  {
    id: "VN001",
    nomPrenom: "Tran Minh",
    etat: "actif",
    service: "informatique",
    frequenceCardiaque: 70,
    latitude: 10.8231,
    longitude: 106.6297
  },
  {
    id: "VN002",
    nomPrenom: "Nguyen Hoa",
    etat: "actif",
    service: "finance et gestion",
    frequenceCardiaque: 75,
    latitude: 10.8200,
    longitude: 106.6300
  }
];

// =======================
// OPERATIONS COMMERCIALES
// =======================
const operations = [
  {
    id: 1,
    type: "Achat",
    responsable: "VN002",
    marge: 2000,
    kilometres: 150,
    motCleResponsable: "budget",
    motCleClient: "fournisseur"
  }
];

// =======================
// FORMATIONS
// =======================
const formations = [
  {
    id: 1,
    nomFormation: "Cybersécurité",
    sujet: "informatique",
    date: "2023-04-10",
    engagement: 30,
    satisfaction: 60,
    motCleFormateur: "sécurité",
    motClePersonnel: "IT"
  }
];

// =======================
// SURVEILLANCE (pour Finance)
// =======================
const surveillance = [
  {
    zone: 900,
    droneId: "DR-VN-01",
    premiereMiseEnService: "2021-05-01",
    dronesActifs: 2,
    dronesEnPanne: 0,
    dronesEnRechargement: 1
  }
];

// =======================
// ROUTES
// =======================
app.get("/personnel", (req, res) => res.json(personnel));
app.get("/operations", (req, res) => res.json(operations));
app.get("/formations", (req, res) => res.json(formations));
app.get("/surveillance", (req, res) => res.json(surveillance));

app.listen(PORT, () => {
  console.log(`Data-server Vietnam mock lancé sur http://localhost:${PORT}`);
});
